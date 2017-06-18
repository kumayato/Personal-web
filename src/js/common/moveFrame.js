/**
 * Created by Administrator on 2017/5/20 0020.
 * 封装一个运动框架
 */

var moveFrame = {
    moveFrame : function (obj,json,fn) {
        var timer = null;

        clearInterval(obj.timer);

        var getStyle = function (target,attr) {
            if (target.currentStyle) {
                return target.currentStyle[attr]; // ie浏览器
            } else {
                return window.getComputedStyle(target,null)[attr]; // 其他浏览器
            }
        };

        obj.timer = setInterval(function () {
            // 用来判断是否停止定时器
            var flag = true
            // 遍历json;
            for (var attr in json) {
                // 得到当前的属性值
                var current = 0;
                if (attr == 'opacity'){
                    // *100方便计算
                    current = parseInt(getStyle(obj,attr)*100);
                } else {
                    current = parseInt(getStyle(obj,attr));
                }

                // json[attr] 目标值
                if (attr == 'opacity'){
                    var step = (json[attr]*100 - current) / 10;
                    step = step > 0? Math.ceil(step): Math.floor(step);
                }else {
                    var step = (json[attr] - current) / 10;
                    step = step > 0? Math.ceil(step): Math.floor(step);
                }


                if(attr == 'opacity') {
                    // 判断浏览器是否支持opacity
                    if ("opacity" in obj.style) {
                        obj.style.opacity = parseFloat((current + step) / 100);
                    }else {
                        // filter : alpha(opacity = 50);
                        obj.style.filter = "alpha(opacity = "+ (current + step) +")";
                    }
                }
                else if(attr == "zIndex")
                {
                    obj.style.zIndex = json[attr];
                }
                else {
                    obj.style[attr] = current + step + 'px'; // 当前值+步长
                };

                // 只要有一个的当前值不等于目标值，就不能停止定时器
                if (current != json[attr]) {
                    flag = false;
                };
            };

            // 回调 + 清空定时器
            if (flag){
                clearInterval(obj.timer);
                // 回调函数
                if (fn){
                    fn();
                }
            };
        },30);
    },
}
module.exports = moveFrame;
