// import '../framed-canvas.css'
// import '../framed-two-columns.css'
import './style.css'
import {
    getRandSeed,
    saveSeed,
    cleanSavedSeed
} from '../../sketch-common/random-seed'

import { resolveState } from './state'
import Notification from '../../sketch-common/Notification'
import strangeAttractor from '../../sketch-common/strange-attractors'
import { group, svgDoc, asSvg } from '@thi.ng/geom'
import infobox from '../../sketch-common/infobox'
import handleAction from '../../sketch-common/handle-action'
import {
    downloadCanvas,
    downloadWithMime,
    canvasRecorder
} from '@thi.ng/dl-asset'
import { draw } from '@thi.ng/hiccup-canvas'
import { convert, mul, quantity, NONE, mm, dpi, DIN_A3 } from '@thi.ng/units'
import { sdBox } from './sdf'
import { iterMenu } from './iter-menu'
import { operate } from './operator'
import { trace, traceLoadScreen } from './trace'

const DPI = quantity(96, dpi),
    // TWOK_16_9 = quantity([1080, 607], mm),
    // TWOK_9_16 = quantity([607, 1080], mm),
    // IG_SQ = quantity([700, 700], mm),
    // IG_4BY5 = quantity([600, 755], mm),
    SIZE = mul(DIN_A3, DPI).deref(),
    MARGIN = convert(mul(quantity(40, mm), DPI), NONE),
    ROOT = document.getElementById('windowFrame'),
    CANVAS = document.createElement('canvas'),
    CTX = CANVAS.getContext('2d'),
    ATTRACT_ENGINE = strangeAttractor(),
    ITER_LIST = document.createElement('div'),
    NUM_ITER = 70


let STATE,
    seed = false,
    drawElems = [],
    currFrame = 0,
    frameReq = null,
    isRecording = false,
    isAnimated = false,
    recorder = null

const init = async () => {
    if (!seed) return
    if (frameReq) cancelAnimationFrame(frameReq)
    if (isRecording) startRecording()

    STATE = resolveState({
        width: SIZE[0],
        height: SIZE[1],
        margin: MARGIN,
        seed
    })
    CANVAS.width = SIZE[0]
    CANVAS.height = SIZE[1]
    if (isAnimated) {
        currFrame = 0
        update()
    } else {
        draw(CTX, traceLoadScreen(STATE))
        for (let i = 0; i < NUM_ITER; i++) {
            iterate()
        }
        draw(CTX, group({}, trace(STATE, 'pixel')))
    }
}

const iterate = () => {
    const { prtcls, trails, attractor, operator, noise } = STATE
    for (let j = 0; j < prtcls.length; j++) {
        const pos = ATTRACT_ENGINE.attractors[attractor]({
                x: prtcls[j][0],
                y: prtcls[j][1]
            }),
            k = noise.fbm(pos.x * 900, pos.y * 900),
            l = Math.atan2(pos.y, pos.x),
            m = operate(operator, l, k, j),
            d = sdBox(prtcls[j], [0, 0], [0.4, 0.2]),
            r = d > 0 ? m : Math.atan2(0-pos.x, 0-pos.y),
            n = [
                prtcls[j][0] + Math.cos(r) * 0.002 * k,
                prtcls[j][1] + Math.sin(r) * 0.002 * k
            ]
        trails[j].push(n)
        prtcls[j] = n
    }
}

const update = () => {
    if (currFrame < NUM_ITER) {
        frameReq = requestAnimationFrame(update)
        iterate()
        drawElems = trace(STATE, 'pixel')
        draw(CTX, group({}, drawElems))
        currFrame++
    } else {
        if (isRecording) stopRecording()
        new Notification('Edition drawn', ROOT, 'light')
    }
}

window['init'] = () => {
    seed = getRandSeed()
    init()
}
window['exportJPG'] = () =>
    downloadCanvas(CANVAS, `2024 10 60-${seed}`, 'jpeg', 1)

window['exportSVG'] = () => 
    downloadWithMime(
        `2024-10-06-${seed}.svg`,
        asSvg(
            svgDoc(
                {
                    width: SIZE[0],
                    height: SIZE[1],
                    viewBox: `0 0 ${SIZE[0]} ${SIZE[1]}`
                },
                group({}, trace(STATE, 'vector'))
            )
        )
    )

window.onkeydown = (e) => {
    switch (e.key.toLowerCase()) {
        case 'n':
            seed = getRandSeed()
            init()
            break
        // save the seed
        case 's':
            saveSeed(seed)
            iterMenu(ITER_LIST, STATE)
            break

        case 'c':
            cleanSavedSeed()
            iterMenu(ITER_LIST, STATE)
            break

        case 'r':
            isRecording = !isRecording
            init()
            break
    }
}

const startRecording = () => {
    if (!isRecording) return
    recorder = canvasRecorder(CANVAS, `${seed}-${new Date().toISOString()}`, {
        mimeType: 'video/webm;codecs=vp9',
        fps: 60
    })
    recorder.start()
    console.log('%c Record started ', 'background: tomato; color: white')
}

const stopRecording = () => {
    if (!isRecording) return
    recorder.stop()
    console.log('%c Record stopped ', 'background: limegreen; color: black')
}

window.infobox = infobox

ROOT.removeChild(document.getElementById('loading'))
ROOT.appendChild(CANVAS)
ROOT.appendChild(ITER_LIST)

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
if (urlParams.has('seed')) {
    seed = urlParams.get('seed')
} else {
    seed = getRandSeed()
}
init()

console.log(
    `seed : ${STATE.seed}
theme: ${STATE.theme}
attractor: ${STATE.attractor}
operate: ${STATE.operator}`
)
iterMenu(ITER_LIST, STATE)
handleAction()
