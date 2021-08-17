var s = creatScene()
function resize () {
  s.size(window.innerWidth, window.innerHeight).update()
}
window.onresize = function () {
  resize()
}
resize()

requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
function (callback) {
  setTimeout(callback, 1000 / 60)
}

var rotateSpeed = 10
var startX, startY
var RotateY = 0
var spa = window['spMain']
window.init = function() {
  var main = document.getElementById('main')
  main.style.display = 'block'
  main.addEventListener('touchstart', function (ev) {
    ev.preventDefault()
    startX = ev.targetTouches[0].pageX
    startY = ev.targetTouches[0].pageY
  }, false)

  main.addEventListener('touchmove', function (ev) {
    if (rotateSpeed == 0) {
      ev.preventDefault()

      var rotateY = (ev.targetTouches[0].pageY - startY) / 10
      if (Math.abs((RotateY + rotateY) % 360) >= 100) {
        rotateY = 0
      }
      RotateY += rotateY
      spa.rotate(rotateY, -(ev.targetTouches[0].pageX - startX) / 10, 0).updateT()

      startX = ev.targetTouches[0].pageX
      startY = ev.targetTouches[0].pageY
    }
  }, false)

  var u = navigator.userAgent
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android??
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios??

  window.addEventListener('devicemotion', motionHandler, false)

  function permission () {
    if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
        // (optional) Do something before API request prompt.
        DeviceMotionEvent.requestPermission()
            .then( response => {
            // (optional) Do something after API prompt dismissed.
            if ( response == "granted" ) {
                window.addEventListener( "devicemotion", (e) => {
                  console.log('xxxxlll')
                    // do something for 'e' here.
                })
            }
        })
              .catch( console.error )
      } else {
          alert( "请使用手机浏览器" );
      }
  }
  if (isiOS) {
    permission()
  }

  function motionHandler (event) {
    if (rotateSpeed == 0) {
      var rotationRate = event.rotationRate
      var db = rotationRate.beta
      var sY = rotationRate.alpha
      if (isiOS) {
        db = db / 100
        sY = sY / 100
      } else {
        db = db / 100
        sY = sY / 100
      }
      // 减少抖动
      if (Math.abs(sY) > 0.01) {
        var rotateY = sY * 4
        if (Math.abs((RotateY + rotateY) % 360) >= 100) {
          rotateY = 0
        }
        RotateY += rotateY
        spa.rotate(rotateY, 0, 0).updateT()
      }

      if (Math.abs(db) > 0.01) {
        spa.rotate(0, -db * 4, 0).updateT()
      }
    }
  }

  resize()
}
var du = 0
render()
function render () {
  TWEEN.update()
  updateWord()
  requestAnimationFrame(render)
  // checkArr()
  if (rotateSpeed != 0) {
    du += 1.5
    spa.rotate(0, 1.5, 0).updateT()
    if (du >= 360) {
      rotateSpeed = 0
    }
  }
}
