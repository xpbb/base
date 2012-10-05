/**
 * xp动画基础类
 * @time 2012/10/04 完成单dom和多dom的动画，单个dom支持循环 
 */
xp.anim = function() {
	/*
	 * 动画缓动类
	 * @from http://www.cnblogs.com/ljchow/archive/2010/06/09/1754352.html
	 * t:currentCount 当前执行第t次
	 * b:initPos 初始值
	 * c:targetPos - initPos 发生偏移的距离值
	 * d:count 一共执行d次
	 * 效果：http://www.robertpenner.com/easing/easing_demo.html
	 * JavaScript Tween算法及缓动效果 http://www.cnblogs.com/cloudgamer/archive/2009/01/06/tween.html
	 */
	var tween = {
		//Linear
		1 : function(initPos, targetPos, currentCount, count) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			return c * t / d + b;
		},
		//Quad easeIn
		2 : function(initPos, targetPos, currentCount, count) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			return c * (t /= d) * t + b;
		},
		//Quad easeOut
		3 : function(initPos, targetPos, currentCount, count) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			return -c * (t /= d) * (t - 2) + b;
		},
		//Quad easeInOut
		4 : function(initPos, targetPos, currentCount, count) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			if ((t /= d / 2) < 1)
				return c / 2 * t * t + b;
			return -c / 2 * ((--t) * (t - 2) - 1) + b;
		},
		//Cubic easeIn
		5 : function(initPos, targetPos, currentCount, count) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			return c * (t /= d) * t * t + b;
		},
		//Cubic easeOut
		6 : function(initPos, targetPos, currentCount, count) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			return c * (( t = t / d - 1) * t * t + 1) + b;
		},
		//Cubic easeInOut
		7 : function(initPos, targetPos, currentCount, count) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			if ((t /= d / 2) < 1)
				return c / 2 * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t + 2) + b;
		},
		//Quart easeIn
		8 : function(initPos, targetPos, currentCount, count) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			return c * (t /= d) * t * t * t + b;
		},
		//Quart easeOut
		9 : function(initPos, targetPos, currentCount, count) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			return -c * (( t = t / d - 1) * t * t * t - 1) + b;
		},
		//Quart easeInOut
		10 : function(initPos, targetPos, currentCount, count) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			if ((t /= d / 2) < 1)
				return c / 2 * t * t * t * t + b;
			return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
		},
		//Quint easeIn
		11 : function(initPos, targetPos, currentCount, count) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			return c * (t /= d) * t * t * t * t + b;
		},
		//Quint easeOut
		12 : function(initPos, targetPos, currentCount, count) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			return c * (( t = t / d - 1) * t * t * t * t + 1) + b;
		},
		//Quint easeInOut
		13 : function(initPos, targetPos, currentCount, count) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			if ((t /= d / 2) < 1)
				return c / 2 * t * t * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
		},

		//Sine easeIn
		14 : function(initPos, targetPos, currentCount, count) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
		},
		//Sine easeOut
		15 : function(initPos, targetPos, currentCount, count) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			return c * Math.sin(t / d * (Math.PI / 2)) + b;
		},
		//Sine easeInOut
		16 : function(initPos, targetPos, currentCount, count) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
		},

		//Expo easeIn
		17 : function(initPos, targetPos, currentCount, count) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
		},
		//Expo easeOut
		18 : function(initPos, targetPos, currentCount, count) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
		},
		//Expo easeInOut
		19 : function(initPos, targetPos, currentCount, count) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			if (t == 0)
				return b;
			if (t == d)
				return b + c;
			if ((t /= d / 2) < 1)
				return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
		//Circ easeIn
		20 : function(initPos, targetPos, currentCount, count) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
		},
		//Circ easeOut
		21 : function(initPos, targetPos, currentCount, count) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			return c * Math.sqrt(1 - ( t = t / d - 1) * t) + b;
		},
		//Circ easeInOut
		22 : function(initPos, targetPos, currentCount, count) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			if ((t /= d / 2) < 1)
				return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
			return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
		},
		//Elastic easeIn
		23 : function(initPos, targetPos, currentCount, count, a, p) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			if (t == 0)
				return b;
			if ((t /= d) == 1)
				return b + c;
			if (!p)
				p = d * .3;
			if (!a || a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else
				var s = p / (2 * Math.PI) * Math.asin(c / a);
			return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		},
		//Elastic easeOut
		24 : function(initPos, targetPos, currentCount, count, a, p) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			if (t == 0)
				return b;
			if ((t /= d) == 1)
				return b + c;
			if (!p)
				p = d * .3;
			if (!a || a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else
				var s = p / (2 * Math.PI) * Math.asin(c / a);
			return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
		},
		//Elastic easeInOut
		25 : function(initPos, targetPos, currentCount, count, a, p) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			if (t == 0)
				return b;
			if ((t /= d / 2) == 2)
				return b + c;
			if (!p)
				p = d * (.3 * 1.5);
			if (!a || a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else
				var s = p / (2 * Math.PI) * Math.asin(c / a);
			if (t < 1)
				return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
		},
		//Back easeIn
		26 : function(initPos, targetPos, currentCount, count, s) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			if (s == undefined)
				s = 1.70158;
			return c * (t /= d) * t * ((s + 1) * t - s) + b;
		},
		//Back easeOut
		27 : function(initPos, targetPos, currentCount, count, s) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			if (s == undefined)
				s = 1.70158;
			return c * (( t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
		},
		//Back easeInOut
		28 : function(initPos, targetPos, currentCount, count, s) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			if (s == undefined)
				s = 1.70158;
			if ((t /= d / 2) < 1)
				return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
			return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
		},
		//Bounce easeIn
		29 : function(initPos, targetPos, currentCount, count) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
		},
		//Bounce easeOut
		30 : function(initPos, targetPos, currentCount, count) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			if ((t /= d) < (1 / 2.75)) {
				return c * (7.5625 * t * t) + b;
			} else if (t < (2 / 2.75)) {
				return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
			} else if (t < (2.5 / 2.75)) {
				return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
			} else {
				return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
			}
		},
		//Bounce easeInOut
		31 : function(initPos, targetPos, currentCount, count) {
			var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
			if (t < d / 2)
				return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
			else
				return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
		}
	}, 
	//dom简写
	dom = xp.dom, css = dom.css, 
	//每隔多少毫秒执行一次
	baseTimer = 20, 
	/**
	 * 根据缓动函数获取每个步长的css属性 
	 */
	getCss = function(el, target, count, func) {
		var //初始时的css属性
			init = css(el, target), 
			//总步数
			//count = count || 50, 
			//需要的缓动函数
			func = tween[func] || tween[1], 
			//缓存
			result = {};
		for ( var i = 1; i <= count; i++) {
			var val = {};
			for ( var p in target ) {
				val[p] = func(init[p], target[p], i, count);
			}
			result[i] = val;
		}
		return result;
	},
	//触发循环用
	cssCache = {};//触发的css缓存
	/**
	 * 动画设置，适合单个dom动画的场景
	 * @param {Sring} obj 需要运行的动画
	 * @param {Object} target 动画的classname属性键值对
	 * @param {Number} count 运行的次数
	 * @param {Sring} func 支持的函数
	 * @param {Number} timer 多少毫秒运行一次
	 * @param {Number} loop 是否循环 1为触发循环 2为自动循环
	 */
	set = function(name, target, loop, count, func, timer) {
		obj = dom.id(name);
		//当前计数
		var currentCount = 0,
			//总步数
			count = Math.abs(count) || 50,
			//是否循环
			//loop = loop || false,
			//初始时的css属性
			init = css(obj, target), 
			//需要的缓动函数
			func = tween[func] || tween[1],
			//每隔多久执行
			timer = timer || baseTimer,
			//纠正px
			px = dom.px,
			//纠正渐隐的效果
			fix = function(n){
				return parseFloat(n).toFixed(2)*1;
			};
			
			//获取每个步长的css属性 
			//csss = getCss(obj, target, count, func);	
			//console.log(init);
		if(loop === 1 && cssCache[name]){
			//console.log(cssCache);
			target = cssCache[name];
		}	
		var flag = window.setInterval(function() {
			if (currentCount < count) {
				currentCount++;
				//css(obj, target, csss[currentCount]);
				
				var val = {};
				
				if( !('opacity' in target) ){
					for ( var p in target ) {
						var t = px(init[p]), b = px(target[p]), tmp = func(t, b, currentCount, count);
						if(typeof target[p] == 'string' && ~target[p].indexOf("px")){
							val[p] = tmp + "px";
						}else{
							val[p] = tmp;
						}
					}
				}else{
					for ( var p in target ) {
						var t = fix(init[p]), b = fix(target[p]), tmp = func(t, b, currentCount, count);
						val[p] = fix(tmp);
					}
				}
				//console.log(val);
				css(obj, target, val);
				
				
			} else {
				clearInterval(flag);
				//修正
				css(obj, target, target);
				if(loop){
					if( loop === 1 ){
						cssCache[name] = init;
					}
					if(loop === 2){
						set(name, init, loop, count, func, timer);
					}
				}
				
			}
		}, timer);
		
		return flag;
	}, 
	/**
	 * 停止动画 
	 */
	stop = function(t) {
		window.clearInterval(t);
	},
	/**
	 * 动画设置，适合多个dom元素动画的场景,支持单个dom动画的动态添加、删除、暂停、开始
	 * @param {Array} obj 需要运行的动画
	 * 		obj = [{
	 * 			"id" : "example",
	 * 			"target" : {"width":"200","height":"100"}
	 * 			"count" : 50,
	 * 			"func" : 1
	 * 			}]
	 * 		@param {Sring} id dom的id
	 * 		@param {Object} target 动画的classname属性键值对
	 * 		@param {Number} count 运行的次数
	 * 		@param {Sring} func 支持的函数
	 * @param {Number} timer 多少毫秒运行一次
	 */
	sets = function(obj, timer) {
		timer = timer || baseTimer;
		var id = 0, flags, request_handlers = {};
		//解析单个执行
		var parseFunc = function(el,id){
			var fn = {};
			fn.id = id;
			fn.el = dom.id(el.id);
			fn.target = el.target;
			fn.count = el.count || 50;
			fn.csss = getCss(fn.el, fn.target, fn.count, el.func);
			fn.currentCount = 0;
			fn.stop = "close";
			fn.flag = function(){
				if (fn.currentCount < fn.count) {
					fn.currentCount++;
					css(fn.el, fn.target, fn.csss[fn.currentCount]);
					
				} else {
					//修正
					css(fn.el, fn.target, fn.target);
					//return;
				}
			};
			return fn;
				
		};
		var add = function(el){
			id++;
			var fn = parseFunc(el,id);
			request_handlers[id] = fn;
			return id;
		};
		obj.forEach(function(el){
			add(el);
		});
		//console.log(request_handlers);
		var playAll = function() {
			for(var p in request_handlers){
				var fn = request_handlers[p];
				if (fn.stop != "open") {
					fn.flag();
				}
			}
		}

		flags = window.setInterval(playAll, timer);

		return {
			//添加
			add : add,
			//删除
			rm : function(id) {
				request_handlers[id] = null;
				delete request_handlers[id];
			},
			//开始
			start : function(id){
				if(request_handlers[id]){
					request_handlers[id].stop = "close";
				}
			},
			//停止
			stop : function(id) {
				if(request_handlers[id]){
					request_handlers[id].stop = "open";
				}
			},
			//返回一组的计时标识
			flag : flags
		};
	}, 
	/**
	 * 设置容器大小（测试用）
	 * @param {Object} obj
	 * @param {Object} target
	 * @param {Object} count
	 * @param {Object} Func
	 */
	size = function(obj, target, loop, count, Func) {
		var tt = target.split(",");
		var t = {
			'width' : tt[0],
			'height' : tt[1]
		};
		set(obj, t, loop, count, Func);
	};
	return {
		set : set,
		stop : stop,
		sets : sets,
		size : size
	}

	//console.log(base);
}();
