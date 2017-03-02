;(function($,window,document,undefined){
    var slideDownLoad = function(obj,options,callback){
        this.ele = $(obj) ;
        this.defaults = {
            offset:45,
            time:1500
        }
        this.parms = $.extend({},this.defaults, options);
        this.callback = callback ;
    }
    var start = 0,
        end = 0,
        freshing = false,   //判断是否正在刷新中
        moving = false,     //判断滚动条状态是否在移动
        isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
        hasTouch = 'ontouchstart' in window && !isTouchPad;

    slideDownLoad.prototype = {
        // 设置动画
        setTranslate:function(dif){
            this.ele.css({
                        "transform": "translate(0," + dif + "px)"
                    });
        },
        //设置动画时间
        setTranslition: function (time) {
            this.ele.css({
                "transition": "transform " + time + "s"
            });
        },
        // 判断是否需要刷新
        needFresh:function(){
            return  $(window).scrollTop() <= 0 ? true : false ;
        },
        //返回到初始位置
        setBack: function () {
            this.setTranslate(0);
            //标识操作完成
            freshing = false;
        },
        // 绑定事件
        addEvent:function(){
            var self = this ;
            //滑动开始
            this.ele.on("touchstart", function (e) {
                if ( self.needFresh() && !freshing) {
                    var even = typeof event == "undefined" ? e : event;
                    //标识操作进行中
                    freshing = true;
                    moving = true;
                    //保存当前鼠标Y坐标
                    start = hasTouch ? even.touches[0].pageY : even.pageY;
                    //消除滑块动画时间
                    self.setTranslition(0);
                }
            });

            //滑动中
            this.ele.on("touchmove", function (e) {
                if ( self.needFresh() && moving) {

                    var even = typeof event == "undefined" ? e : event;

                    //保存当前鼠标Y坐标
                    end = hasTouch ? even.touches[0].pageY : even.pageY;

                    if (start < end) {
                        even.preventDefault();
                        //消除滑块动画时间
                        self.setTranslition(0);
                        //移动滑块
                        // fn.setTranslate(end - start + self.parms.offset);
                        self.setTranslate(end - start);

                    }

                }
            });


            //滑动结束
            this.ele.on("touchend", function (e) {
                if (moving) {
                    moving = false;
                    //判断滑动距离是否大于等于指定值
                    if (end - start >= self.parms.offset) {
                        //设置滑块回弹时间
                        self.setTranslition(1);
                        //保留提示部分
                        self.setTranslate(self.parms.offset);
                        //执行回调函数
                        if (typeof self.callback == "function") {
                            setTimeout(function () {
                                self.callback.call();
                                self.setBack();
                            }, self.parms.time);
                        }
                        else{
                            setTimeout(function () {
                                self.setBack();
                            }, self.parms.time);
                        }
                    } else {
                        //返回初始状态
                        self.setBack();
                    }
                }
            });
            return this.ele ;
        }
    }

    $.fn.slideLoader = function(options,callback) {
        //slideDownLoad
        var slider = new slideDownLoad(this, options,callback);
        //调用其方法
        return slider.addEvent();
    }
})(jQuery,window,document);
