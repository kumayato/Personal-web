/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var base = {
    // 获取元素
    getElem: function getElem(selector) {
        return document.querySelector(selector);
    },
    // 获取元素数组
    getAllElem: function getAllElem(selector) {
        return document.querySelectorAll(selector);
    },
    // 获取元素的样式
    getClass: function getClass(elem) {
        return elem.getAttribute('class');
    },
    // 设置元素的样式
    setClass: function setClass(elem, clas) {
        return elem.setAttribute('class', clas);
    },
    //为元素添加样式
    addClass: function addClass(elem, clas) {
        var baseClass = this.getClass(elem);
        if (baseClass.indexOf(clas) === -1) {
            this.setClass(elem, baseClass + ' ' + clas);
        }
        return;
    },
    // 移除元素的样式
    removeClass: function removeClass(elem, clas) {
        var baseClass = this.getClass(elem);
        if (baseClass.indexOf(clas) > -1) {
            this.setClass(elem, baseClass.split(clas).join(' ').replace(/\s+/g, ' '));
        }
        return;
    },
    // 屏幕滚动事件兼容性
    scroll: function scroll() {
        if (window.pageYOffset != null) //  ie9+ 和其他浏览器
            {
                return {
                    left: window.pageXOffset,
                    top: window.pageYOffset
                };
            } else if (document.compatMode == "CSS1Compat") // 声明的了 DTD
            // 检测是不是怪异模式的浏览器 -- 就是没有 声明<!DOCTYPE html>
            {
                return {
                    left: document.documentElement.scrollLeft,
                    top: document.documentElement.scrollTop
                };
            }
        return { //  剩下的肯定是怪异模式的
            left: document.body.scrollLeft,
            top: document.body.scrollTop
        };
    },
    // 隐藏和显示
    show: function show(obj) {
        obj.style.display = "block";
    },
    hide: function hide(obj) {
        obj.style.display = "none";
    }
};

module.exports = base;

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by Administrator on 2017/5/24 0024.
 */
// 引入base和moveFrame运动框架
var base = __webpack_require__(0);

// 点击图标更换背景
var bgSrc = ["url('dist/imgs/bg1.png')", "url('dist/imgs/bg2.gif')", "url('dist/imgs/bg3.jpg')", "url('dist/imgs/bg4.png')"];
function bgSwitch() {
    var spansBox = document.getElementById("section-1__bgSwitch");
    var spans = spansBox.getElementsByTagName('span');
    var tips = spansBox.getElementsByTagName('div')[0];
    for (var i = 0; i < spans.length; i++) {
        spans[i].index = i;
        spans[i].onclick = function () {
            document.body.style.backgroundImage = bgSrc[this.index];
        };
        spans[i].onmouseover = function () {
            base.addClass(tips, 'section-1__bgSwitch-tips__status_animate');
        };
        spans[i].onmouseout = function () {
            base.removeClass(tips, 'section-1__bgSwitch-tips__status_animate');
        };
    }
}
bgSwitch();

// 第二板块tab栏的切换
function tabs() {
    var icons = document.getElementById("section-2__icon").children;
    var imgs = document.getElementById("section-2__content").children;
    for (var i = 0; i < icons.length; i++) {
        icons[i].index = i;
        icons[i].onclick = function () {
            for (var j = 0; j < icons.length; j++) {
                imgs[j].className = "";
                base.removeClass(icons[j], "current");
            }
            imgs[this.index].className = "show";
            base.addClass(this, "current");
        };
    }
}
tabs();

// 第三板块图钉特效
function tuding() {
    var content = document.getElementById("section-3__content");
    var tuding = document.getElementById("tuding2");
    var tips = content.getElementsByTagName('p')[0];
    var main = content.getElementsByTagName("div")[0];
    content.onmouseover = function () {
        base.addClass(tuding, "section-3__tuding-2__status_animate");
        base.addClass(tips, "section-3__content__tips__status_animate");
        base.addClass(main, "section-3__content__main__status_animate");
    };
    content.onmouseout = function () {
        base.removeClass(tuding, "section-3__tuding-2__status_animate");
        base.removeClass(tips, "section-3__content__tips__status_animate");
        base.removeClass(main, "section-3__content__main__status_animate");
    };
}
tuding();

// 第四板块 carrousel
// 运动框架
function moveFrame(obj, json, fn) {
    var timer = null;

    clearInterval(obj.timer);

    var getStyle = function getStyle(target, attr) {
        return target.style[attr];
    };

    obj.timer = setInterval(function () {
        // 用来判断是否停止定时器
        var flag = true;
        // 遍历json;
        for (var attr in json) {
            // 得到当前的属性值
            var current = 0;
            if (attr == 'opacity') {
                // *100方便计算
                current = parseInt(getStyle(obj, attr) * 100);
            } else {
                current = parseInt(getStyle(obj, attr));
            }

            // json[attr] 目标值
            if (attr == 'opacity') {
                var step = (json[attr] * 100 - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
            } else {
                var step = (json[attr] - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
            }

            if (attr == 'opacity') {
                // 判断浏览器是否支持opacity
                if ("opacity" in obj.style) {
                    obj.style.opacity = parseFloat((current + step) / 100);
                } else {
                    // filter : alpha(opacity = 50);
                    obj.style.filter = "alpha(opacity = " + (current + step) + ")";
                }
            } else if (attr == "zIndex") {
                obj.style.zIndex = json[attr];
            } else {
                obj.style[attr] = current + step + 'px'; // 当前值+步长
            };

            // 只要有一个的当前值不等于目标值，就不能停止定时器
            if (current != json[attr]) {
                flag = false;
            };
        };

        // 回调 + 清空定时器
        if (flag) {
            clearInterval(obj.timer);
            // 回调函数
            if (fn) {
                fn();
            }
        };
    }, 30);
}

var itemDate = [{ //  1
    width: 350,
    top: 0,
    left: 419,
    opacity: 0.4,
    z: 2
}, { //  2
    width: 400,
    top: 50,
    left: 50,
    opacity: 0.6,
    z: 3
}, { // 3
    width: 500,
    top: 100,
    left: 0,
    opacity: 0.9,
    z: 4
}, { // 4
    width: 600,
    top: 150,
    left: 294,
    opacity: 1,
    z: 5
}, { // 5
    width: 500,
    top: 100,
    left: 687,
    opacity: 0.9,
    z: 4
}, { // 6
    width: 400,
    top: 50,
    left: 737,
    opacity: 0.6,
    z: 3
}];

function carrousel() {
    var items = document.querySelectorAll(".section-4__carrousel-item");
    var prev = base.getElem(".arrow-prev");
    var next = base.getElem(".arrow-next");

    for (var i = 0; i < itemDate.length; i++) {

        items[i].style.width = itemDate[i].width + 'px';
        items[i].style.top = itemDate[i].top + 'px';
        items[i].style.left = itemDate[i].left + 'px';
        items[i].style.opacity = itemDate[i].opacity;
        items[i].style.zIndex = itemDate[i].z;
    };

    // 点击左侧按钮，移除第一个放到最后一个。
    prev.onclick = function () {
        change(false);
    };
    // 点击右侧按钮，移除最后一个放到第一个。
    next.onclick = function () {
        change(true);
    };

    function change(flag) {
        if (flag) {
            itemDate.unshift(itemDate.pop());
        } else {
            itemDate.push(itemDate.shift());
        };

        for (var i = 0; i < itemDate.length; i++) {
            moveFrame(items[i], {
                width: itemDate[i].width,
                top: itemDate[i].top,
                left: itemDate[i].left,
                opacity: itemDate[i].opacity,
                zIndex: itemDate[i].z
            });
        };
    };
};
carrousel();

/***/ })

/******/ });