!function(t){"use strict";var e,r=function t(r){r.setup=function(){e=r.createCanvas(window.innerWidth-80,window.innerHeight-160),r.background(20),r.fill("#fce414"),r.noLoop()},r.draw=function(){var t=r.round(r.random(64,96)),e=r.width/t,n=e/t*12,i=n,o=n,a=e+i,u=e/1.4,c=n/t*e,h=1.5*c,s=1.5*c,f=0,l=0;for(r.background(20);f<r.width;)l<r.height?(o>n&&s--,o<0&&s++,u=e+(o+=s),r.ellipse(f+a/2,l+u/2,.8*Math.min(a,u)),l+=u):(s=1.5*c,o=-n,l=0,i>n&&h--,i<0&&h++,f+=a=e+(i+=h))},r.windowResized=function(){r.resizeCanvas(window.innerWidth-80,window.innerHeight-160),r.redraw()},r.keyPressed=function(){r.save(e,"Yakoi-Kusama","jpg")},t.init_sketch=function(){return r.redraw()}};function n(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(i=n.key,o=void 0,"symbol"==typeof(o=function(t,e){if("object"!=typeof t||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,e||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(i,"string"))?o:String(o)),n)}var i,o}function i(t){return function(t){if(Array.isArray(t))return o(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return o(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var a=[].concat(i("0123456789"),i(":/*|&#@$!<>"),i("{}[]+-_^~%?;()")),u=function(){function t(e){var r=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.element=e.element,this.trueText=e.element.innerText||e.element.innerHTML,this.numChar=this.trueText.length,this.effect=e.effect,this.curChar=0,this.biteChar="";for(var n=0;n<this.numChar;n++){var i=this.trueText.substr(n,1);this.biteChar+=i&&" "===i?" ":a[Math.floor(Math.random()*a.length)]}this.element.innerHTML="replace"==this.effect?this.biteChar:"";for(var o=0;o<=this.numChar;o++)setTimeout((function(){"add"===r.effect?r.addChar():"replace"===r.effect&&r.replaceChar()}),45*o)}var e,r,i;return e=t,(r=[{key:"replaceChar",value:function(){var t;t=this.curChar+1<this.numChar?a[Math.floor(Math.random()*a.length)]:"";var e=this.trueText.substr(0,this.curChar),r=this.biteChar.substr(this.curChar,this.numChar);this.element.innerHTML=e+t+r,this.element.dataset.text=e+t+r,this.curChar++}},{key:"addChar",value:function(){var t;t=this.curChar+1<this.numChar?a[Math.floor(Math.random()*a.length)]:"";var e=this.trueText.substr(0,this.curChar);this.element.innerHTML=e+t,this.element.dataset.text=e+t,this.curChar++}}])&&n(e.prototype,r),i&&n(e,i),Object.defineProperty(e,"prototype",{writable:!1}),t}(),c=document.getElementById("windowFrame"),h=document.getElementById("loading");new t(r,c),c.removeChild(h),window.init_sketch=r.init_sketch,window.infobox=function(){var t=document.getElementById("infobox");null!=t&&t.classList.toggle("active")},function(){window.openOffFrame=function(){document.body.classList.toggle("openedOffWindow");var t=document.getElementById("projectTitle");new u({element:t,effect:"add"})};var t=document.querySelectorAll("[data-action]");if(void 0!==t)for(var e=function(){var e=t[r].getAttribute("data-action");t[r].addEventListener("click",(function(){var t=window[e];"function"!=typeof t?console.log(e," is not defined"):t()}),!1)},r=0;r<t.length;r++)e()}()}(p5);
