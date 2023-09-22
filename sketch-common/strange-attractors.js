/**
 * Attractors collection
 *
 * you need to setup an attractors object in the JS file which include this one
 * window.attractors = { a: 0.1, b: 1.2, c -1.2, d: -1.8 }
 * @param {obect} v 2D coordinates object with x & y (z will be ignored)
 * @param {float} amount the intensity of the displacement
 * @return {object} a 2D coordinates object object with x & y
 */

export default function () {
    const setConstants = (attractor) => {
        let a, b, c, d

        switch (attractor) {
            case 'redhead':
                a = Math.random() * 2 - 1
                b = Math.random() * 2 - 1
                break

            case 'clifford':
                a = Math.random() * 6 - 3
                b = Math.random() * 6 - 3
                c = Math.random() * 6 - 3
                d = Math.random() * 6 - 3
                break

            case 'de_jong':
                a = Math.random() * 2 - 1
                b = Math.random() * 2 - 1
                c = Math.random() * 2 - 1
                d = Math.random() * 2 - 1
                break

            case 'gumowski_mira':
                a = Math.random() * 2 - 1
                b = Math.random() * 2 - 1
                break

            case 'fractal_dream':
                a = Math.random() * 8 - 5
                b = Math.random() * 8 - 5
                c = Math.random() * 2 - 0.5
                d = Math.random() * 2 - 0.5
                break
        }
        window.attractors = { a, b, c, d }
    }

    const redhead = (v) => {
        if (window.attractors) {
            const { a, b } = window.attractors
            return {
                x: Math.sin((v.x * v.y) / b) * (v.y + Math.cos(a * v.x - v.y)),
                y: v.x + Math.sin(v.y) / b
            }
        } else {
            console.error('You need to setup window.attractors')
            return v
        }
    }
    const de_jong = (v) => {
        if (window.attractors) {
            const { a, b, c, d } = window.attractors
            return {
                x: Math.sin(a * v.y) - Math.cos(b * v.x),
                y: Math.sin(c * v.x) - Math.cos(d * v.y)
            }
        } else {
            console.error('You need to setup window.attractors')
            return v
        }
    }

    const clifford = (v) => {
        if (window.attractors) {
            const { a, b, c, d } = window.attractors
            return {
                x: Math.sin(a * v.x) + c * Math.cos(a * v.x),
                y: Math.sin(b * v.x) + d * Math.cos(b * v.y)
            }
        } else {
            console.error('You need to setup window.attractors')
            return v
        }
    }
    const fractal_dream = (v) => {
        if (window.attractors) {
            const { a, b, c, d } = window.attractors
            return {
                x: Math.sin(v.y * b) + c * Math.sin(v.x * b),
                y: Math.sin(v.x * a) + d * Math.cos(v.y * a)
            }
        } else {
            console.error('You need to setup window.attractors')
            return v
        }
    }

    const gumowski_mira = (v) => {
        if (window.attractors) {
            const { a, b } = window.attractors

            const t = v.x
            const w = a * v.x + ((1 - a) * 2 * v.x * v.x) / (1 + v.x + v.x)
            return { x: b * v.y + w, y: w - t }
        } else {
            console.error('You need to setup window.attractors')
            return v
        }
    }

    return {
        init: (attractor) => setConstants(attractor),
        attractors: {
            redhead,
            de_jong,
            clifford,
            fractal_dream,
            gumowski_mira
        }
    }
}
