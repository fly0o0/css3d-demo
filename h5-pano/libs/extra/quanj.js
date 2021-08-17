var w_width = window.innerWidth;
var w_height = window.innerHeight;
var url;
var spMain = window.spMain;
var frontPage;
var rightPage;
var leftPage;
var backPage;
var skyPage;
var groundPage;

window.creatScene = function() {
    var s;
    var curb;
    s = new C3D.Stage();
    s.size(window.innerWidth, window.innerHeight).material({
        color: '#cccccc'
    }).update();
    document.getElementById('main').appendChild(s.el);
    spMain = new C3D.Sprite();
    spMain.position(0, 0, -300).update();
    s.addChild(spMain);
    curb = new C3D.Skybox();
    curb.size(1024).position(0, 0, 0).material({
        front: 'images/bg1.jpg',
        back: 'images/bg3.jpg',
        left: 'images/bg4.jpg',
        right: 'images/bg2.jpg',
        up: 'images/bg6.jpg',
        down: 'images/bg5.jpg'
    }).update();
    spMain.addChild(curb);
    
    frontPage = new Front();
    rightPage = new Right();
    leftPage = new Left();
    backPage = new Back();
    skyPage = new Sky();
    groundPage = new Ground();
    return s;
};

window.updateWord = function() {
    skyPage.animate();
    frontPage.animate();
    rightPage.animate();
    backPage.animate();
    leftPage.animate();
    groundPage.animate();
};

var bindClick = function(el, cb) {
    var touchFlag;
    var _startX;
    var _moveX;
    el.on('touchstart', function (ev) {
        _startX = ev.targetTouches[0].pageX
        touchFlag = true
    });
    el.on('touchmove', function (ev) {
      _moveX = ev.targetTouches[0].pageX
      if (Math.abs(_moveX - _startX) > 10) {
        touchFlag = false
      }
    });
    el.on('touchend', function () {
      if (touchFlag) {
        touchFlag = false
        cb();
        _startX = 0
        _moveX = 0
      }
    });
};

var buildAnimate = function(el, fromObj, toObj) {
    var start = new TWEEN.Tween(el)
    start.to(fromObj || {}, fromObj.duration || 500);
    var end = new TWEEN.Tween(el)
    end.to(toObj || {}, toObj.duration || 0);
    start.chain(end);
    end.chain(start);
    start.start();
};

var buildStar = function(position, rotation) {
    var star = C3D.create({
        type: 'plane',
        size: [45, 45],
        position: position,
        material: [{
            image: 'images/star.png'
        }],
        rotation: rotation
    });
    spMain.addChild(star);
    buildAnimate(star, {
        alpha: 1,
        duration: 500
    }, {
        alpha: 0.3,
        duration: 500
    });
    return star;
}

var Sky = function() {
    var skyAirship;
    var skyLight
    var skyRedpacks;
    var leftTipSmall;

    var Constructor = function() {

        var skyAirshipX = -502 + 480 + 347 / 2;
        var skyAirshipZ = -502 + 300 + 242 / 2;
        skyAirship = C3D.create({
            type: 'plane',
            size: [347, 242],
            position: [skyAirshipX, -499, skyAirshipZ],
            material: [{
                image: 'images/sky/airship.png'
            }],
            rotation: [-90, 0, 0]
        });
        spMain.addChild(skyAirship);
        buildAnimate(skyAirship, {
            x: skyAirshipX - 20,
            duration: 1000
        }, {
            x: skyAirshipX,
            duration: 1000
        });
        bindClick(skyAirship, function() {
            showAlert(9);
        });

        const leftTipSmallZ = -502 + 480 + 242 / 2;
        leftTipSmall = C3D.create({
            type: 'plane',
            size: [86, 115],
            position: [-502 + 420 + 347 / 2, -499, leftTipSmallZ],
            material: [{
                image: 'images/tip_small.png'
            }],
            rotation: [-90, 0, 0]
        });
        spMain.addChild(leftTipSmall);
        buildAnimate(leftTipSmall, {
            z: leftTipSmallZ + 10,
            alpha: 1,
            duration: 1000
        }, {
            z: leftTipSmallZ,
            alpha: 0.7,
            duration: 0
        });

        var skyLightX = -502 + 620 + 352 / 2;
        var skyLightZ = -502 + 30 + 396 / 2;
        skyLight = C3D.create({
            type: 'plane',
            size: [352, 396],
            position: [skyLightX, -501, skyLightZ],
            material: [{
                image: 'images/sky/light.png'
            }],
            rotation: [-90, 0, 0]
        });
        spMain.addChild(skyLight);
        buildAnimate(skyLight, {
            x: skyLightX - 20,
            duration: 1000
        }, {
            x: skyLightX,
            duration: 1000
        });
        bindClick(skyLight, function() {
            showAlert(9);
        });

        var skyRedpacksX = -502 + 635 + 290 / 2;
        var skyRedpacksZ = -502 + 60 + 224 / 2;
        skyRedpacks = C3D.create({
            type: 'plane',
            size: [290, 224],
            position: [skyRedpacksX, -500, skyRedpacksZ],
            material: [{
                image: 'images/sky/redpacks.png'
            }],
            rotation: [-90, 0, 0]
        });
        spMain.addChild(skyRedpacks);
        buildAnimate(skyRedpacks, {
            x: skyRedpacksX - 150,
            z: skyRedpacksZ + 300,
            scaleX: 0,
            scaleY: 0,
            scaleZ: 0,
            duration: 1000
        }, {
            x: skyRedpacksX,
            z: skyRedpacksZ,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            duration: 0
        });
        bindClick(skyRedpacks, function() {
            showAlert(9);
        });
    };

    Constructor.prototype.animate = function() {
        skyAirship.update();
        skyRedpacks.update();
        skyLight.update();
        leftTipSmall.update();
    }

    return new Constructor();
};

var Front = function() {
    var frontStar;
    var frontStar2;
    var frontBubble;
    var frontMouth;
    var frontEyeIn;
    var frontGold3Mouth;
    var frontMoneyA;
    var frontMoneyB;
    var frontTipBig;
    var frontTipSmall;

    var Constructor = function() {
        frontStar = buildStar([-502 + 800 + 45 / 2, -502 + 50 + 45 / 2, -494], [0, 0, 0]);

        frontStar2 = buildStar([-502 + 100 + 45 / 2, -502 + 150 + 45 / 2, -494], [0, 0, 0]);

        var transBack = C3D.create({
            type: 'plane',
            size: [500, 500],
            position: [-502 + 250 + 500 / 2, -502 + 250 + 500 / 2, -489],
            material: [{
                color: 'transparent'
            }],
            rotation: [0, 0, 0]
        });
        spMain.addChild(transBack);
        bindClick(transBack, function() {
            showAlert(1);
        });

        var frontTipBigY = -502 + 50 + 342 / 2;
        frontTipBig = C3D.create({
            type: 'plane',
            size: [249, 342],
            position: [-502 + 400 + 249 / 2, frontTipBigY, -489],
            material: [{
                image: 'images/tip_big.png'
            }],
            rotation: [0, 0, 0]
        });
        spMain.addChild(frontTipBig);
        buildAnimate(frontTipBig, {
            y: frontTipBigY + 20,
            alpha: 1,
            duration: 1000
        }, {
            y: frontTipBigY,
            alpha: 0.7,
            duration: 0
        });

        const frontTipSmallY = -502 + 400 + 115 / 2;
        frontTipSmall = C3D.create({
            type: 'plane',
            size: [86, 115],
            position: [-502 + 800 + 86 / 2, frontTipSmallY, -494],
            material: [{
                image: 'images/tip_small.png'
            }],
            rotation: [0, 0, 0]
        });
        spMain.addChild(frontTipSmall);
        buildAnimate(frontTipSmall, {
            y: frontTipSmallY + 10,
            alpha: 1,
            duration: 1000
        }, {
            y: frontTipSmallY,
            alpha: 0.7,
            duration: 0
        });

        var transPerson = C3D.create({
            type: 'plane',
            size: [200, 350],
            position: [-502 + 750 + 200 / 2, -502 + 630 + 350 / 2, -489],
            material: [{
                color: 'transparent'
            }],
            rotation: [0, 0, 0]
        });
        spMain.addChild(transPerson);
        bindClick(transPerson, function() {
            showAlert(2);
        });

        var frontBubbleY = -502 + 520 + 123 / 2;
        frontBubble = C3D.create({
            type: 'plane',
            size: [154, 123],
            position: [-502 + 830 + 154 / 2, frontBubbleY, -494],
            material: [{
                image: 'images/p1/bubble.png'
            }],
            rotation: [0, 0, 0]
        });
        spMain.addChild(frontBubble);
        buildAnimate(frontBubble, {
            y: frontBubbleY - 10,
            duration: 1000
        }, {
            y: frontBubbleY,
            duration: 1000
        });
        
        frontMouth = C3D.create({
            type: 'plane',
            size: [46, 23],
            position: [-502 + 376 + 46 / 2, -502 + 736 + 23 / 2, -491],
            material: [{
                image: 'images/p1/gold1_mouth.png'
            }],
            rotation: [0, 0, 0]
        });
        spMain.addChild(frontMouth);
        buildAnimate(frontMouth, {
            scaleX: 0.7,
            scaleY: 0.7
        }, {
            scaleX: 1,
            scaleY: 1
        });
    
        var frontEyeInX = -502 + 364 + 63 / 2;
        var frontEyeInY = -502 + 714 + 10 / 2;
        frontEyeIn = C3D.create({
            type: 'plane',
            size: [63, 10],
            position: [frontEyeInX, frontEyeInY, -490],
            material: [{
                image: 'images/p1/gold1_eye_in.png'
            }],
            rotation: [0, 0, 0]
        });
        spMain.addChild(frontEyeIn);
        buildAnimate(frontEyeIn, {
            x: frontEyeInX + 3,
            y: frontEyeInY - 6,
            duration: 800
        }, {
            x: frontEyeInX,
            y: frontEyeInY,
            duration: 0
        });
    
        var frontEyeOut = C3D.create({
            type: 'plane',
            size: [80, 28],
            position: [-502 + 360 + 80 / 2, -502 + 706 + 28 / 2, -491],
            material: [{
                image: 'images/p1/gold1_eye_out.png'
            }],
            rotation: [0, 0, 0]
        });
        spMain.addChild(frontEyeOut);

        var frontGold3EyeIn = C3D.create({
            type: 'plane',
            size: [9, 8],
            position: [-502 + 734 + 9 / 2, -502 + 706 + 8 / 2, -490],
            material: [{
                image: 'images/p1/gold3_eye_in.png'
            }],
            rotation: [0, 0, 0]
        });
        spMain.addChild(frontGold3EyeIn);

        var frontGold3EyeOut = C3D.create({
            type: 'plane',
            size: [30, 30],
            position: [-502 + 730 + 30 / 2, -502 + 696 + 30 / 2, -491],
            material: [{
                image: 'images/p1/gold3_eye_out.png'
            }],
            rotation: [0, 0, 0]
        });
        spMain.addChild(frontGold3EyeOut);

        frontGold3Mouth = C3D.create({
            type: 'plane',
            size: [55, 32],
            position: [-502 + 706 + 55 / 2, -502 + 720 + 32 / 2, -491],
            material: [{
                image: 'images/p1/gold3_mouth.png'
            }],
            rotation: [0, 0, 0]
        });
        spMain.addChild(frontGold3Mouth);
        buildAnimate(frontGold3Mouth, {
            scaleX: 0.9,
            scaleY: 0.9,
            duration: 500
        }, {
            scaleX: 1,
            scaleY: 1,
            duration: 0
        });

        frontMoneyA = C3D.create({
            type: 'plane',
            size: [135, 81],
            position: [-502 + 390 + 135 / 2, -502 + 410 + 81 / 2, -491],
            material: [{
                image: 'images/p1/888.png'
            }],
            rotation: [0, 0, 0]
        });
        spMain.addChild(frontMoneyA);
        buildAnimate(frontMoneyA, {
            scaleX: 0.7,
            scaleY: 0.7,
            duration: 500
        }, {
            scaleX: 1,
            scaleY: 1,
            duration: 500
        });

        frontMoneyB = C3D.create({
            type: 'plane',
            size: [163, 91],
            position: [-502 + 550 + 163 / 2, -502 + 400 + 91 / 2, -491],
            material: [{
                image: 'images/p1/1888.png'
            }],
            rotation: [0, 0, 0]
        });
        spMain.addChild(frontMoneyB);
        buildAnimate(frontMoneyB, {
            scaleX: 0.7,
            scaleY: 0.7,
            duration: 500
        }, {
            scaleX: 1,
            scaleY: 1,
            duration: 500
        });
    }

    Constructor.prototype.animate = function() {
        frontStar.update();
        frontStar2.update();
        frontBubble.update();
        frontMouth.update();
        frontEyeIn.update();
        frontGold3Mouth.update();
        frontMoneyA.update();
        frontMoneyB.update();
        frontTipBig.update();
        frontTipSmall.update();
    }

    return new Constructor();
};

var Right = function() {
    var rightStar;
    var rightStar2;
    var rightBig;
    var rightEye;
    var rightIphone;
    var rightHuawei;
    var rightIpad;
    var rightTipBig;
    var rightTipSmall;

    var Constructor = function() {
        rightStar = buildStar([500, -502 + 100 + 45 / 2, -502 + 50 + 45 / 2], [0, 270, 0]);
        rightStar2 = buildStar([500, -502 + 50 + 45 / 2, -502 + 780 + 45 / 2], [0, 270, 0]);

        var transBack = C3D.create({
            type: 'plane',
            size: [500, 500],
            position: [497, -502 + 250 + 500 / 2, -502 + 250 + 500 / 2],
            material: [{
                color: 'transparent'
            }],
            rotation: [0, 270, 0]
        });
        spMain.addChild(transBack);
        bindClick(transBack, function() {
            showAlert(3);
        });

        var rightTipBigY = -502 + 50 + 342 / 2;
        rightTipBig = C3D.create({
            type: 'plane',
            size: [249, 342],
            position: [497, rightTipBigY, -502 + 400 + 249 / 2],
            material: [{
                image: 'images/tip_big.png'
            }],
            rotation: [0, 270, 0]
        });
        spMain.addChild(rightTipBig);
        buildAnimate(rightTipBig, {
            y: rightTipBigY + 20,
            alpha: 1,
            duration: 1000
        }, {
            y: rightTipBigY,
            alpha: 0.7,
            duration: 0
        });

        rightBig = C3D.create({
            type: 'plane',
            size: [160, 122],
            position: [499, -502 + 530 + 122 / 2, -502 + 430 + 160 / 2],
            material: [{
                image: 'images/p2/big.png'
            }],
            rotation: [0, 270, 0]
        });
        spMain.addChild(rightBig);
        buildAnimate(rightBig, {
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            duration: 500
        }, {
            scaleX: 0.5,
            scaleY: 0.5,
            scaleZ: 0.5,
            duration: 0
        });

        var rightIpadY = -502 + 860 + 98 / 2;
        var rightIpadZ = -502 + 650 + 182 / 2;
        rightIpad = C3D.create({
            type: 'plane',
            size: [182, 98],
            position: [498, rightIpadY, rightIpadZ],
            material: [{
                image: 'images/p2/ipad.png'
            }],
            rotation: [0, 270, 0]
        })
        spMain.addChild(rightIpad);
        buildAnimate(rightIpad, {
            y: rightIpadY - 10,
            z: rightIpadZ + 20,
            duration: 800
        }, {
            y: rightIpadY,
            z: rightIpadZ,
            duration: 800
        });

        var pensonBack = C3D.create({
            type: 'plane',
            size: [100, 300],
            position: [498, -502 + 680 + 300 / 2, -502 + 800 + 100 / 2],
            material: [{
                color: 'transparent'
            }],
            rotation: [0, 270, 0]
        })
        spMain.addChild(pensonBack);
        bindClick(pensonBack, function() {
            showAlert(4);
        });

        const rightTipSmallY = -502 + 550 + 115 / 2;
        rightTipSmall = C3D.create({
            type: 'plane',
            size: [86, 115],
            position: [499, rightTipSmallY, -502 + 800 + 86 / 2],
            material: [{
                image: 'images/tip_small.png'
            }],
            rotation: [0, 270, 0]
        });
        spMain.addChild(rightTipSmall);
        buildAnimate(rightTipSmall, {
            y: rightTipSmallY + 10,
            alpha: 1,
            duration: 1000
        }, {
            y: rightTipSmallY,
            alpha: 0.7,
            duration: 0
        });

        rightHuawei = C3D.create({
            type: 'plane',
            size: [156, 229],
            position: [500, -502 + 340 + 229 / 2, -502 + 20 + 156 / 2],
            material: [{
                image: 'images/p2/huawei.png'
            }],
            rotation: [0, 270, 0]
        })
        spMain.addChild(rightHuawei);
        buildAnimate(rightHuawei, {
            rotationZ: 5,
            duration: 500
        }, {
            rotationZ: -5,
            duration: 500
        });

        rightIphone = C3D.create({
            type: 'plane',
            size: [188, 285],
            position: [500, -502 + 300 + 285 / 2, -502 + 780 + 188 / 2],
            material: [{
                image: 'images/p2/iphone.png'
            }],
            rotation: [0, 270, 0]
        });
        spMain.addChild(rightIphone);
        buildAnimate(rightIphone, {
            rotationZ: 5,
            duration: 500
        }, {
            rotationZ: -5,
            duration: 500
        });

        var rightEyeY = -502 + 550 + 46 / 2;
        var rightEyeZ = -502 + 275 + 112 / 2;
        rightEye = C3D.create({
            type: 'plane',
            size: [112, 46],
            position: [498, rightEyeY, rightEyeZ],
            material: [{
                image: 'images/p2/eye.png'
            }],
            rotation: [0, 270, 0]
        })
        spMain.addChild(rightEye);
        buildAnimate(rightEye, {
            y: rightEyeY - 10,
            z: rightEyeZ + 20,
            duration: 800
        }, {
            y: rightEyeY,
            z: rightEyeZ,
            duration: 800
        });
    }

    Constructor.prototype.animate = function() {
        rightStar.update();
        rightStar2.update();
        rightBig.update();
        rightEye.update();
        rightHuawei.update();
        rightIphone.update();
        rightIpad.update();
        rightTipBig.update();
        rightTipSmall.update();
    }

    return new Constructor();
};

var Back = function() {
    var backStar;
    var backSweep;
    var backSmoke;
    var backFree;
    var backTipBig;
    var backTipSmall;
    var backTipSmall2;

    var Constructor = function () {
        backStar = buildStar([-502 + 400 + 45 / 2, -502 + 50 + 45 / 2, 497], [0, 180, 0]);

        var backTipBigY = -502 + 50 + 342 / 2;
        backTipBig = C3D.create({
            type: 'plane',
            size: [249, 342],
            position: [-502 + 400 + 249 / 2, backTipBigY, 497],
            material: [{
                image: 'images/tip_big.png'
            }],
            rotation: [0, 180, 0]
        });
        spMain.addChild(backTipBig);
        buildAnimate(backTipBig, {
            y: backTipBigY + 20,
            alpha: 1,
            duration: 1000
        }, {
            y: backTipBigY,
            alpha: 0.7,
            duration: 0
        });

        var transBack = C3D.create({
            type: 'plane',
            size: [500, 500],
            position: [-502 + 250 + 500 / 2, -502 + 250 + 500 / 2, 500],
            material: [{
                color: 'transparent'
            }],
            rotation: [0, 180, 0]
        });
        spMain.addChild(transBack);
        bindClick(transBack, function() {
            showAlert(3);
        });

        var backSweepX = 502 - 283 - 134 / 2;
        var backSweepY = -502 + 760 + 59 / 2;
        backSweep = C3D.create({
            type: 'plane',
            size: [134, 59],
            position: [backSweepX, backSweepY, 501],
            material: [{
                image: 'images/p3/sweep.png'
            }],
            rotation: [0, 180, 0]
        })
        spMain.addChild(backSweep);
        buildAnimate(backSweep, {
            x: backSweepX - 300,
            y: backSweepY + 20,
            duration: 1500
        }, {
            x: backSweepX,
            y: backSweepY,
            duration: 0
        });

        var backFreeX = 502 - 30 - 192 / 2;
        var backFreeY = -502 + 150 + 198 / 2;
        backFree = C3D.create({
            type: 'plane',
            size: [192, 198],
            position: [backFreeX, backFreeY, 494],
            material: [{
                image: 'images/p3/free.png'
            }],
            rotation: [0, 180, 0]
        })
        spMain.addChild(backFree);
        buildAnimate(backFree, {
            x: backFreeX - 10,
            y: backFreeY - 10,
            duration: 800
        }, {
            x: backFreeX,
            y: backFreeY,
            duration: 800
        });
        bindClick(backFree, function() {
            showAlert(5);
        });

        const backTipSmall2Y = -502 + 10 + 115 / 2;
        backTipSmall2 = C3D.create({
            type: 'plane',
            size: [86, 115],
            position: [502 - 100 - 86 / 2, backTipSmall2Y, 493],
            material: [{
                image: 'images/tip_small.png'
            }],
            rotation: [0, 180, 0]
        });
        spMain.addChild(backTipSmall2);
        buildAnimate(backTipSmall2, {
            y: backTipSmall2Y + 10,
            alpha: 1,
            duration: 1000
        }, {
            y: backTipSmall2Y,
            alpha: 0.7,
            duration: 0
        });
        
        var backSmokeX = 502 - 690 - 89 / 2;
        var backSmokeY = -502 + 460 + 120 / 2;
        backSmoke = C3D.create({
            type: 'plane',
            size: [89, 120],
            position: [backSmokeX, backSmokeY, 492],
            material: [{
                image: 'images/p3/smoke.png'
            }],
            rotation: [0, 180, 0]
        })
        spMain.addChild(backSmoke);
        buildAnimate(backSmoke, {
            x: backSmokeX - 30,
            y: backSmokeY - 30,
            alpha: 0,
            duration: 1000
        }, {
            x: backSmokeX,
            y: backSmokeY,
            alpha: 1,
            duration: 0
        });

        var backWoman = C3D.create({
            type: 'plane',
            size: [207, 330],
            position: [502 - 652 - 207 / 2, -502 + 660 + 330 / 2, 486],
            material: [{
                image: 'images/p3/woman.png'
            }],
            rotation: [0, 180, 0]
        })
        spMain.addChild(backWoman);
        bindClick(backWoman, function() {
            showAlert(5);
        });

        const backTipSmallY = -502 + 520 + 115 / 2;
        backTipSmall = C3D.create({
            type: 'plane',
            size: [86, 115],
            position: [-502 + 150 + 86 / 2, backTipSmallY, 499],
            material: [{
                image: 'images/tip_small.png'
            }],
            rotation: [0, 180, 0]
        });
        spMain.addChild(backTipSmall);
        buildAnimate(backTipSmall, {
            y: backTipSmallY + 10,
            alpha: 1,
            duration: 1000
        }, {
            y: backTipSmallY,
            alpha: 0.7,
            duration: 0
        });

        var backCleaner = C3D.create({
            type: 'plane',
            size: [281, 217],
            position: [502 - 566 - 281 / 2, -502 + 774 + 217 / 2, 485],
            material: [{
                image: 'images/p3/cleaner.png'
            }],
            rotation: [0, 180, 0]
        })
        spMain.addChild(backCleaner);
        bindClick(backCleaner, function() {
            showAlert(5);
        });

        var backSandX = 502 - 360 - 187 / 2;
        var backSandY = -502 + 940 + 48 / 2;
        backSand = C3D.create({
            type: 'plane',
            size: [187, 48],
            position: [backSandX, backSandY, 485],
            material: [{
                image: 'images/p3/sand.png'
            }],
            rotation: [0, 180, 0]
        })
        spMain.addChild(backSand);
        buildAnimate(backSand, {
            x: backSandX - 30,
            duration: 1000
        }, {
            x: backSandX,
            duration: 0
        });
    };

    Constructor.prototype.animate = function() {
        backStar.update();
        backSweep.update();
        backSmoke.update();
        backFree.update();
        backSand.update();
        backTipBig.update();
        backTipSmall.update();
        backTipSmall2.update();
    };

    return new Constructor();
};

var Left = function() {
    var leftStar;
    var leftNut;
    var leftBubble;
    var leftSmoke;
    var leftRedpackFly;
    var leftTipBig;
    var leftTipSmall;
    var leftTipSmall2;

    var Constructor = function () {
        leftStar = buildStar([-489, -502 + 40 + 45 / 2, -502 + 400 + 45 / 2], [0, 90, 0]);

        var leftTipBigY = -502 + 40 + 342 / 2;
        leftTipBig = C3D.create({
            type: 'plane',
            size: [249, 342],
            position: [-489, leftTipBigY, -502 + 400 + 249 / 2],
            material: [{
                image: 'images/tip_big.png'
            }],
            rotation: [0, 90, 0]
        });
        spMain.addChild(leftTipBig);
        buildAnimate(leftTipBig, {
            y: leftTipBigY + 20,
            alpha: 1,
            duration: 1000
        }, {
            y: leftTipBigY,
            alpha: 0.7,
            duration: 0
        });

        var transBack = C3D.create({
            type: 'plane',
            size: [500, 600],
            position: [-490, -502 + 200 + 500 / 2, -502 + 200 + 600 / 2],
            material: [{
                color: 'transparent'
            }],
            rotation: [0, 90, 0]
        });
        spMain.addChild(transBack);
        bindClick(transBack, function() {
            showAlert(3);
        });

        leftNut = C3D.create({
            type: 'plane',
            size: [158, 78],
            position: [-491, -502 + 700 + 78 / 2, -(-502 + 424 + 158 / 2)],
            material: [{
                image: 'images/p4/nut.png'
            }],
            rotation: [0, 90, 0]
        });
        spMain.addChild(leftNut);
        buildAnimate(leftNut, {
            rotationZ: 5,
            duration: 500
        }, {
            rotationZ: -5,
            duration: 500
        });
    
        var leftSmokeY = -502 + 536 + 198 / 2;
        leftSmoke = C3D.create({
            type: 'plane',
            size: [125, 146],
            position: [-500, leftSmokeY, -(-502 + 250 + 125 / 2)],
            material: [{
                image: 'images/p4/smoke.png'
            }],
            rotation: [0, 90, 0]
        })
        spMain.addChild(leftSmoke);
        buildAnimate(leftSmoke, {
            y: leftSmokeY - 10,
            alpha: 0.3,
            duration: 1000
        }, {
            y: leftSmokeY,
            alpha: 1,
            duration: 0
        });
        
        var leftBubbleY = -502 + 500 + 142 / 2;
        leftBubble = C3D.create({
            type: 'plane',
            size: [142, 116],
            position: [-500, leftBubbleY, -(-502 + 834 + 142 / 2)],
            material: [{
                image: 'images/p4/bubble.png'
            }],
            rotation: [0, 90, 0]
        })
        spMain.addChild(leftBubble);
        buildAnimate(leftBubble, {
            y: leftBubbleY - 10,
            duration: 1000
        }, {
            y: leftBubbleY,
            duration: 1000
        });

        const leftTipSmall2Y = -502 + 450 + 115 / 2;
        leftTipSmall2 = C3D.create({
            type: 'plane',
            size: [86, 115],
            position: [-494, leftTipSmall2Y, -(-502 + 680 + 254 / 2)],
            material: [{
                image: 'images/tip_small.png'
            }],
            rotation: [0, 90, 0]
        });
        spMain.addChild(leftTipSmall2);
        buildAnimate(leftTipSmall2, {
            y: leftTipSmall2Y + 10,
            alpha: 1,
            duration: 1000
        }, {
            y: leftTipSmall2Y,
            alpha: 0.7,
            duration: 0
        });

        var personBack = C3D.create({
            type: 'plane',
            size: [200, 400],
            position: [-500, -502 + 650 + 200 / 2, -(-502 + 650 + 400 / 2)],
            material: [{
                color: 'transparent'
            }],
            rotation: [0, 90, 0]
        })
        spMain.addChild(personBack);
        bindClick(personBack, function() {
            showAlert(7);
        });
    
        var leftRedpackFlyY = -502 + 150 + 299 / 2;
        leftRedpackFly = C3D.create({
            type: 'plane',
            size: [254, 299],
            position: [-500, leftRedpackFlyY, -(-502 + 680 + 254 / 2)],
            material: [{
                image: 'images/p4/redpack-fly.png'
            }],
            rotation: [0, 90, 0]
        })
        spMain.addChild(leftRedpackFly);
        buildAnimate(leftRedpackFly, {
            y: leftRedpackFlyY - 20,
            duration: 1000
        }, {
            y: leftRedpackFlyY,
            duration: 1000
        });
        bindClick(leftRedpackFly, function() {
            showAlert(8);
        });

        const leftTipSmallY = -502 + 10 + 115 / 2;
        leftTipSmall = C3D.create({
            type: 'plane',
            size: [86, 115],
            position: [-499, leftTipSmallY, -(-502 + 720 + 254 / 2)],
            material: [{
                image: 'images/tip_small.png'
            }],
            rotation: [0, 90, 0]
        });
        spMain.addChild(leftTipSmall);
        buildAnimate(leftTipSmall, {
            y: leftTipSmallY + 10,
            alpha: 1,
            duration: 1000
        }, {
            y: leftTipSmallY,
            alpha: 0.7,
            duration: 0
        });
    }

    Constructor.prototype.animate = function () {
        leftStar.update();
        leftNut.update();
        leftBubble.update();
        leftSmoke.update();
        leftRedpackFly.update();
        leftTipBig.update();
        leftTipSmall.update();
        leftTipSmall2.update();
    }

    return new Constructor();
};

var Ground = function() {
    var groundTipBig;

    var Constructor = function() {
        var transBack = C3D.create({
            type: 'plane',
            size: [700, 700],
            position: [-502 + 162 + 700 / 2, 499, -502 + 162 + 700 / 2],
            material: [{
                color: 'transparent'
            }],
            rotation: [90, 0, 0]
        });
        spMain.addChild(transBack);
        bindClick(transBack, function() {
            showAlert(9);
        });

        var groundTipBigZ = -502 + 80 + 342 / 2;
        groundTipBig = C3D.create({
            type: 'plane',
            size: [249, 342],
            position: [-502 + 400 + 249 / 2, 500 , groundTipBigZ],
            material: [{
                image: 'images/tip_big.png'
            }],
            rotation: [90, 0, 0]
        });
        spMain.addChild(groundTipBig);
        buildAnimate(groundTipBig, {
            z: groundTipBigZ + 20,
            alpha: 1,
            duration: 1000
        }, {
            z: groundTipBigZ,
            alpha: 0.7,
            duration: 0
        });
    };

    Constructor.prototype.animate = function() {
        groundTipBig.update();
    };

    return new Constructor();
};

function showAlert(num) {
    switch (num) {
    case 1:
        $('#alert1').attr({
            src: 'images/alert/p1_alert1.png'
        });
        url = 'http://ju.h5util.com/m/jusp/o/170108xhbh/mtp.htm?app=lv'
        break;
    case 2:
        $('#alert1').attr({
            src: 'images/alert/p1_alert2.png'
        });
        url = 'http://ju.h5util.com/m/jusp/o/170108dapai/mtp.htm?app=lv'
        break;
    case 3:
        $('#alert1').attr({
            src: 'images/alert/p1_alert3.png'
        });
        url = 'http://ju.h5util.com/m/jusp/o/170108qqjx/mtp.htm?app=lv'
        break;
    case 4:
        $('#alert1').attr({
            src: 'images/alert/p2_alert1.png'
        });
        url = 'http://ju.h5util.com/m/jusp/o/170108lf/mtp.htm?app=lv'
        break;
    case 5:
        $('#alert1').attr({
            src: 'images/alert/p3_alert1.png'
        });
        url = 'http://ju.h5util.com/m/jusp/o/170108dpnz/mtp.htm?app=lv'
        break;
    case 6:
        $('#alert1').attr({
            src: 'images/alert/p3_alert2.png'
        });
        url = 'http://ju.h5util.com/m/jusp/o/nhjnz/mtp.htm?app=lv'
        break;
    case 7:
        $('#alert1').attr({
            src: 'images/alert/p3_alert3.png'
        });
        url = 'http://ju.h5util.com/m/jusp/o/170108sjsm/mtp.htm?app=lv'
        break;
    case 8:
        $('#alert1').attr({
            src: 'images/alert/p4_alert1.png'
        });
        url = 'http://ju.h5util.com/m/jusp/o/170108spbj/mtp.htm?app=lv'
        break;
    case 9:
        $('#alert1').attr({
            src: 'images/alert/p4_alert2.png'
        });
        url = 'http://ju.h5util.com/m/jusp/o/170108tztx/mtp.htm?app=lv'
        break;
    case 10:
        $('#alert1').attr({
            src: 'images/alert/p4_alert3.png'
        });
        url = 'http://ju.h5util.com/m/jusp/o/170108dxjd/mtp.htm?app=lv'
        break
    }
    $('#maskDiv').css({
        display: 'block',
        position: 'absolute',
        width: w_width + 'px',
        height: w_height + 'px'
    });
    var snow_width = parseFloat($('#snow').css('width'))
    var snow_height = parseFloat($('#snow').css('height'))
    $('#snow').css({
        left: w_width / 2 - snow_width / 2 + 'px',
        top: w_height / 2 - snow_height / 2 + 'px',
        width: snow_width / 2,
        height: snow_height / 2
    });
    $('#snow').animate({
        width: snow_width + 'px',
        height: snow_height + 'px'
    }, 1000);
    if (st) {
        clearTimeout(st)
    }
    var st = setTimeout(showAlertContent, 300)
}
function showAlertContent() {
    $('#alertcontent').css({
        display: 'block',
        position: 'absolute'
    });
    $('#mask').click(function() {
        // window.location.href = url;
        // _czc.push(['_trackEvent', '遮罩', '点击跳转'])
    });
    var alert_width = parseFloat($('#alert1').css('width'))
    var alert_height = parseFloat($('#alert1').css('height'))
    var go_width = parseFloat($('#go').css('width'))
    var go_height = parseFloat($('#go').css('height'))
    var tri_width = parseFloat($('#triangle').css('width'))
    var tri_height = parseFloat($('#triangle').css('height'))
    var close_width = parseFloat($('#close').css('width'))
    var close_height = parseFloat($('#close').css('height'))
    $('#alert1').css({
        left: w_width / 2 - alert_width / 2 + 'px',
        top: w_height / 2 - alert_height / 2 + 'px'
    }).stop().animate({
        height: 0 + 'px',
        width: 0 + 'px',
        left: w_width / 2 + 'px',
        top: w_height / 2 + 'px'
    }, 0).stop().animate({
        height: alert_height + 'px',
        width: alert_width + 'px',
        left: w_width / 2 - alert_width / 2 + 'px',
        top: w_height / 2 - alert_height / 2 + 'px'
    }, 500).click(function() {
        // window.location.href = url;
        // _czc.push(['_trackEvent', '弹窗', '点击跳转'])
    });
    $('#go').click(function() {
        // window.location.href = url;
        // _czc.push(['_trackEvent', 'Go', '点击跳转'])
    }).css({
        left: w_width / 2 - go_width / 2 + 'px',
        top: w_height / 2 - go_height / 2 + alert_height / 2 + 40 + 'px'
    });
    var go_top = parseFloat($('#go').css('top'))
    var go_left = parseFloat($('#go').css('left'))
    $('#triangle').css({
        left: w_width / 2 - tri_width / 2 + 356 - 269 + 'px',
        top: go_top + tri_height / 2 + 'px'
    }).click(function() {
        // window.location.href = url;
        // _czc.push(['_trackEvent', '三角形', '点击跳转'])
    });
    var tri_left = parseFloat($('#triangle').css('left'))
    move();
    st = setInterval(move, 1100);
    function move() {
        $('#triangle').animate({
            left: tri_left + 10 + 'px'
        }, 1000).animate({
            left: tri_left + 'px'
        }, 0)
    }
    $('#close').click(function() {
        $('#maskDiv').css({
            display: 'none'
        });
        alert_width = 0;
        alert_height = 0;
        $('#alertcontent').css({
            display: 'none'
        });
        clearInterval(st)
    }).css({
        left: w_width / 2 - close_width / 2 + alert_width / 2 + 'px',
        top: w_height / 2 - close_height / 2 - alert_height / 2 + 'px'
    })
}
