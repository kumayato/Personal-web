/**
 * Created by Administrator on 2017/5/13 0013.
 * 第三板块的天体运动效果
 */
import Konva from 'konva'
// 用面对对象封装一个实心圆模型
function circleMove (option) {
    this._init(option)
};
circleMove.prototype = {
    _init : function (option) {
        // 第一步 设置初始化的信息
        // 每个圆由内部的圆和外部的圆环组合而成
        // 设置圆的中心点坐标
        this.x = option.x || 0;
        this.y = option.y || 0;
        // 设置内圆的半径和外圆的半径
        this.innerRadius = option.innerRadius || 0; // 内圆半径
        this.outerRadius = option.outerRadius || 0; // 外部圆环半径
        // 设置圆里面的文字
        this.text = option.text || "canvas";
        // 设置圆的填充样式
        this.innerStyle = option.innerStyle || 'red';  // 内圆填充色
        this.outerStyle = option.outerStyle || 'yellow'; // 外部圆环填充色

        // 第二步 创建一个组，每个组里面包括（一个内圆，一个外部圆环，和圆里面的文字）
        this.group = new Konva.Group({
            //设置组的x，y坐标，组的内部元素会按照组内的新坐标系定位。
            x : this.x,
            y : this.y
        });

        // 第三步 创建一个内圆并把它加到组里面去
        var innerCircle = new Konva.Circle({
            // 设置圆心的坐标
            // 因为前面设置了组的坐标为this.x和this.y
            // 组的内部元素会按照组内的新坐标系定位
            // 所有这里要将圆心的坐标设置为0,0
            x : 0,
            y : 0,
            radius : this.innerRadius, // 设置半径
            fill : this.innerStyle, // 设置圆的填充颜色
            opacity : .8 // 设置透明度
        });
        this.group.add(innerCircle) // 添加到组里面去

        // 第四步 创建一个外部圆环并把它加到组里面去
        var outerRing = new Konva.Ring({
            x : 0,
            y : 0,
            innerRadius : this.innerRadius, // 圆环圆心到内圆的半径
            outerRadius : this.outerRadius, // 圆环圆心到外圆的半径
            fill : this.outerStyle, // 圆环的填充色
            opacity : .5 // 设置圆环的透明度
        })
        this.group.add(outerRing);

        // 第五步 创建一个文字并把它加到组里面去
        var text = new Konva.Text({
            x : 0 - this.outerRadius,
            y : 0 - 7,  // 上下还有行高，所有减去的值比字体大小的一半稍微小一点，刚好居中
            width : this.outerRadius*2,
            fontSize : 16,  // 字体大小
            fontStyle : 'bold', // 文字字体
            text : this.text, // 文字内容
            align : 'center', // 文字居中
            fill : '#fff' // 文字颜色
        })
        this.group.add(text);
    },

    //第六步 把组添加到层或者其他组中
    addToGroupOrLayer: function(layer) {
        layer.add( this.group );
    }
}


// 创建舞台
var stage = new Konva.Stage({
    container : "section-3__circle",
    width : 600,
    height : 600
})

// 创建背景层 背景层开始
var bgLayer = new Konva.Layer();
stage.add(bgLayer);

// 中心点坐标
var centerX = stage.width()/2;
var centerY = stage.height()/2;

// 绘制背景
var innerRadius = 252 / 2;	// 内环的半径
var outerRadius = 220;		// 外环的半径

// 创建背景内环的虚线圆
var innerCircle = new Konva.Circle({
    x : centerX, // 原点坐标
    y : centerY,
    radius : innerRadius, //半径
    stroke : '#ccc', // 填充颜色
    strokeWidth : 4,
    dash : [10,4]  // 设置10像素的实线 4像素的虚线
})
bgLayer.add(innerCircle);

// 创建背景外环的虚线框
var outerCircle = new Konva.Circle({
    x : centerX,
    y : centerY,
    radius : outerRadius,
    stroke : '#ccc',
    strokeWidth : 4,
    dash : [10,4]  // 设置10像素的实线 4像素的虚线
})
bgLayer.add(outerCircle)

// 创建背景中心的实心圆
var centerCircle = new circleMove({
    x : centerX,
    y : centerY,
    innerRadius : 132 / 2,
    outerRadius : 80,
    innerStyle: '#525A82',
    outerStyle: '#E1E1E1',
    text : 'WEB前端开发'
})
// 把group添加到层上面去
centerCircle.addToGroupOrLayer(bgLayer);

//绘制层
bgLayer.draw();
// 背景层结束

// 创建动画层 动画层开始
var animateLayer = new Konva.Layer();
stage.add(animateLayer);

// 创建内环的一个组
var L2Group = new Konva.Group({
    x : centerX,
    y : centerY
})
//把L2Group这个组添加到动画层上去
animateLayer.add( L2Group );

// 计算圆心的坐标算法，加入组之后
// 内部的坐标系会变成组内坐标系，不是centerX,centerY变成0,0
var x0 = innerRadius*Math.cos( -60 * Math.PI / 180 );
var y0 = innerRadius*Math.sin( -60 * Math.PI / 180 );

// 创建内环上的第一个圆
var L2_circle1 = new circleMove({
    x : innerRadius*Math.cos( -90 * Math.PI / 180 ),
    y : innerRadius*Math.sin( -90 * Math.PI / 180 ),
    innerRadius: 30,  					//内圆半径
    outerRadius: 40,  					//外圆的半径
    innerStyle: '#FACED6', 				//内圆填充的颜色呢
    outerStyle: '#E1E1E1',				//外圆环填充的颜色
    text: 'CSS3'
})
L2_circle1.addToGroupOrLayer(L2Group);

// 创建内环上的第二个圆
var L2_circle2 = new circleMove({
    x : innerRadius*Math.cos( 30 * Math.PI / 180 ),
    y : innerRadius*Math.sin( 30 * Math.PI / 180 ),
    innerRadius: 30,  					//内圆半径
    outerRadius: 40,  					//外圆的半径
    innerStyle: '#f1fa06', 				//内圆填充的颜色呢
    outerStyle: '#E1E1E1',				//外圆环填充的颜色
    text: 'HTML5'
})
L2_circle2.addToGroupOrLayer(L2Group);

// 创建内环上的第三个圆
var L2_circle3 = new circleMove({
    x :  innerRadius*Math.cos( 150 * Math.PI / 180 ),
    y :  innerRadius*Math.sin( 150 * Math.PI / 180 ),
    innerRadius: 30,  					//内圆半径
    outerRadius: 40,  					//外圆的半径
    innerStyle: '#88d0fa', 				//内圆填充的颜色呢
    outerStyle: '#E1E1E1',				//外圆环填充的颜色
    text: 'canvas'
})
L2_circle3.addToGroupOrLayer(L2Group);

// 创建外环的一个组
var L3Group = new Konva.Group({
    x : centerX,
    y : centerY
})
animateLayer.add(L3Group);

// 创建外环上的第一个圆
var L3_circle1 = new circleMove({
    x : outerRadius*Math.cos( 250 * Math.PI / 180 ),
    y : outerRadius*Math.sin( 250 * Math.PI / 180 ),
    innerRadius: 30,  					//内圆半径
    outerRadius: 40,  					//外圆的半径
    innerStyle: '#faca5a', 				//内圆填充的颜色呢
    outerStyle: '#E1E1E1',				//外圆环填充的颜色
    text: 'JS'
})
L3_circle1.addToGroupOrLayer(L3Group);

// 创建外环上的第二个圆
var L3_circle2 = new circleMove({
    x : outerRadius*Math.cos( -20 * Math.PI / 180 ),
    y : outerRadius*Math.sin( -20 * Math.PI / 180 ),
    innerRadius: 30,  					//内圆半径
    outerRadius: 40,  					//外圆的半径
    innerStyle: '#8972fa', 				//内圆填充的颜色呢
    outerStyle: '#E1E1E1',				//外圆环填充的颜色
    text: 'jQuery'
})
L3_circle2.addToGroupOrLayer(L3Group);

// 创建外环上的第三个圆
var L3_circle3 = new circleMove({
    x : outerRadius*Math.cos( 45 * Math.PI / 180 ),
    y : outerRadius*Math.sin( 45 * Math.PI / 180 ),
    innerRadius: 30,  					//内圆半径
    outerRadius: 40,  					//外圆的半径
    innerStyle: '#81fa87', 				//内圆填充的颜色呢
    outerStyle: '#E1E1E1',				//外圆环填充的颜色
    text: 'Boot'
})
L3_circle3.addToGroupOrLayer(L3Group);

// 创建外环上的第四个圆
var L3_circle4 = new circleMove({
    x : outerRadius*Math.cos( 110 * Math.PI / 180 ),
    y : outerRadius*Math.sin( 110 * Math.PI / 180 ),
    innerRadius: 30,  					//内圆半径
    outerRadius: 40,  					//外圆的半径
    innerStyle: '#c9b7fa', 				//内圆填充的颜色呢
    outerStyle: '#E1E1E1',				//外圆环填充的颜色
    text: 'Sass'
})
L3_circle4.addToGroupOrLayer(L3Group);

// 创建外环上的第五个圆
var L3_circle5 = new circleMove({
    x : outerRadius*Math.cos( 175 * Math.PI / 180 ),
    y : outerRadius*Math.sin( 175 * Math.PI / 180 ),
    innerRadius: 30,  					//内圆半径
    outerRadius: 40,  					//外圆的半径
    innerStyle: '#fa350a', 				//内圆填充的颜色呢
    outerStyle: '#E1E1E1',				//外圆环填充的颜色
    text: 'Vue'
})
L3_circle5.addToGroupOrLayer(L3Group);

// 绘制动画层
animateLayer.draw();
// 动画层结束

// 开始做动画
var rotateAngleSecond = 60; //设置每秒钟旋转60°
//Konva的帧动画系统
var animate = new Konva.Animation(function (frame) {
    //每隔一会执行此方法，类似 setInterval
    //timeDiff: 是两帧之间的时间差。是变化的，根据电脑性能和浏览器的状态动态变化。

    //计算当前帧需要旋转的角度。
    var rotateAngle =  frame.timeDiff*rotateAngleSecond/1000;

    // 内环正向旋转且内环上的圆同时进行反向旋转，类似于地球自转的同时公转。
    L2Group.rotate(rotateAngle);
    L2Group.getChildren().each(function (item,index) {
        item.rotate(-rotateAngle);
    });

    // 外环反向旋转同时外环上的圆正向旋转
    L3Group.rotate(-rotateAngle);
    L3Group.getChildren().each(function (item,index) {
        item.rotate(rotateAngle);
    });
},animateLayer);

// 启动动画
animate.start();
// 动画结束

// 是Konva的事件系统，jQuery一样的
// 给动画层绑定一个鼠标移上去的事件
animateLayer.on('mouseover',function () {
    // 设置旋转的角度使旋转变慢
    rotateAngleSecond = 10;
});
// 鼠标离开后回复原来的速度
animateLayer.on('mouseout',function () {
    rotateAngleSecond = 60;
})

