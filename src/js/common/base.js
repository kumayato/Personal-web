var base = {
    // 获取元素
    getElem : function (selector) {
        return document.querySelector(selector);
    },
    // 获取元素数组
    getAllElem : function (selector) {
        return document.querySelectorAll(selector);
    },
    // 获取元素的样式
    getClass : function (elem) {
        return elem.getAttribute('class');
    },
    // 设置元素的样式
    setClass : function (elem,clas) {
        return elem.setAttribute('class',clas)
    },
    //为元素添加样式
    addClass : function (elem,clas) {
        var baseClass = this.getClass(elem);
        if (baseClass.indexOf(clas) === -1) {
            this.setClass(elem,baseClass + ' ' + clas);
        }
        return;
    },
    // 移除元素的样式
    removeClass : function (elem,clas) {
        var baseClass = this.getClass(elem);
        if (baseClass.indexOf(clas) > -1) {
            this.setClass(elem,baseClass.split(clas).join(' ').replace(/\s+/g,' '));
        }
        return;
    },
    // 屏幕滚动事件兼容性
    scroll : function () {
        if (window.pageYOffset != null)  //  ie9+ 和其他浏览器
        {
            return {
                left: window.pageXOffset,
                top: window.pageYOffset
            }
        }
        else if (document.compatMode == "CSS1Compat")  // 声明的了 DTD
        // 检测是不是怪异模式的浏览器 -- 就是没有 声明<!DOCTYPE html>
        {
            return {
                left: document.documentElement.scrollLeft,
                top: document.documentElement.scrollTop
            }
        }
        return { //  剩下的肯定是怪异模式的
            left: document.body.scrollLeft,
            top: document.body.scrollTop
        }
    },
    // 隐藏和显示
    show : function (obj) {
        obj.style.display = "block";
    },
    hide : function (obj) {
        obj.style.display = "none";
    }
};

module.exports = base;











