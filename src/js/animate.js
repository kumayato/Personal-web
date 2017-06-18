/**
 * Created by Administrator on 2017/4/20 0020.
 * 滚动屏幕每个板块分别触发动画效果
 */
var base = require("./common/base");

// 数据
var sectionAnimateElement = {
    ".section-1" : [
        ".section-1__title",
        ".section-1__bgSwitch",
        ".section-1__sliderImg"
    ],

    ".section-2" : [
        ".section-2__title",
        ".section-2__description",
        ".section-2__photo",
        ".section-2__icon",
        ".section-2__content",
    ],

    ".section-3" : [
        ".section-3__title",
        ".section-3__description",
    ],

    ".section-4" : [
        ".section-4__title",
        ".section-4__description",
    ],

    ".section-5" : [
        ".section-5__title",
        ".section-5__description",
        ".section-5__touchMe"
    ]
};

// 第一步 初始化
function setAnimateInit(obj) {
    var sectionElements = sectionAnimateElement[obj];
    for (var i=0; i<sectionElements.length; i++) {
        var elements = base.getElem(sectionElements[i]);
        base.addClass(elements,sectionElements[i].substr(1)+"_animate_init");
    };
};
for(var k in sectionAnimateElement) {
    if (k == '.section-1') {
        continue;
    }
    setAnimateInit(k);
}

// 第二步 设置初始动画
function setAnimateDone(obj) {
    var sectionElements = sectionAnimateElement[obj];
    for (var i=0; i<sectionElements.length; i++){
        var elements = base.getElem(sectionElements[i]);
        var baseClass = base.getClass(elements);
        elements.setAttribute('class',baseClass.replace("_animate_init","_animate_done"));
    };
};
// 0.1秒后第一屏自动进行动画
setTimeout(function () {
    setAnimateDone('.section-1');
},100);


// 第三步 设置导航区域样式的变化
/*
 1.侧边导航栏，小火箭的显示和隐藏。
 2.点击导航栏的每一项，每一项的样式发生改变。
 */
var navItem = base.getAllElem(".section-2__nav-item"); // 得到主导航的每一项
var asideNav = base.getElem(".asideNav"); // 得到侧边导航栏
var asideItem = base.getAllElem(".asideNav__item"); // 得到侧边导航栏的每一项
var huojian = base.getElem(".backTop"); // 得到返回顶部小火箭

// 侧边导航高亮切换
function swicthActive(index) {
    for (var i=0; i<asideItem.length; i++) {
        base.removeClass(asideItem[i],"asideNav__item_status_active");
        base.removeClass(navItem[i],"section-2__nav-item_status_active");
    }
    base.addClass(asideItem[index],"asideNav__item_status_active");
    base.addClass(navItem[index],"section-2__nav-item_status_active")
}

var nav = base.getElem(".section-2__nav");
var navBg = base.getElem(".nav-bg");

// 屏幕滚动
window.addEventListener("scroll",function () {
    var topVal = base.scroll().top;

    // topVal大于10，侧边栏和小火箭显示，否则隐藏。
    if (topVal > 10) {
        base.removeClass(asideNav, "asideNav_animate_init");
        base.removeClass(huojian, "backTop_animate_init");
    } else {
        base.addClass(asideNav, "asideNav_animate_init");
        base.addClass(huojian, "backTop_animate_init");
    };

    // 主导航固定
    if (topVal > 750) {
        base.addClass(nav, "section-2__nav_status_fixed");
        base.addClass(navBg,"nav-bg_status_show");
    }else {
        base.removeClass(nav, "section-2__nav_status_fixed");
        base.removeClass(navBg,"nav-bg_status_show");
    }

    // 滚动到哪个区域，该区域进行动画并且导航栏相应的样式改变
    if (topVal < 700) {
        swicthActive(0)
    }
    if (topVal >= 700 && topVal < 1450) {
        setAnimateDone('.section-2')
        swicthActive(1)
    }
    if (topVal >= 1450 && topVal < 2300) {
        setAnimateDone('.section-3')
        swicthActive(2)
    }
    if (topVal >= 2300 && topVal < 3100) {
        setAnimateDone('.section-4')
        swicthActive(3)
    }
    if (topVal >= 3100) {
        setAnimateDone('.section-5')
        swicthActive(4)
    };

});

// 点击小火箭返回顶部
function huojianBack() {
    var leader;
    var target = 0,timer = null;

    window.addEventListener('scroll',function () {
        leader = base.scroll().top;
    });

    // leader 起始位置  target 目标位置
    huojian.addEventListener('click',function () {
        timer = setInterval(function () {
            var step = (target - leader) / 10;
            step =  step > 0 ? Math.ceil(step) : Math.floor(step);
            var result = leader + step;
            window.scrollTo(0,result);
            if (result == target){
                clearInterval(timer);
            }
        }, 20);
    })
};
huojianBack();


// 第四步 点击导航栏跳转相应区块，且点击当前高亮。
function clickScroll() {
    var sections = document.getElementsByTagName('section');
    for(var i=0; i<asideItem.length; i++){
        // 得到索引
        asideItem[i].index = i;
        navItem[i].index = i;

        // 点击侧边导航栏
        asideItem[i].onclick = function () {
            swicthActive(this.index); // 点击导航栏样式发生改变
            var scrollH = sections[this.index].offsetTop + 5;
            window.scrollTo(0,scrollH) // 跳转相应区块
        };

        // 点击主导航栏
        navItem[i].addEventListener('click',function () {
            swicthActive(this.index); // 点击导航栏样式发生改变
            var scrollH = sections[this.index].offsetTop + 5;
            window.scrollTo(0,scrollH) // 跳转相应区块
        });
    };
};
clickScroll();

// 第五步 主导航滑动门
var navTip = base.getElem(".section-2__nav-tip");
var navTipW = navTip.offsetWidth;
function navTipChange() {
    var currentIndex = 0;

    for (var i=0; i<navItem.length; i++) {
        navItem[i].index = i;

        navItem[i].onmouseover = function () {
            navTip.style.left = this.index*navTipW + 'px';
        };

        navItem[i].onmouseout = function () {
            for (var j = 0; j < navItem.length; j++) {
                if (base.getClass(navItem[j]).indexOf('section-2__nav-item_status_active') > -1) {
                    currentIndex = j;
                };
            };
            navTip.style.left = currentIndex*navTipW + 'px';
        };
    }
}
navTipChange();








