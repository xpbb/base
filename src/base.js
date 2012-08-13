/*
 *事先定义一些基础常量
 */
var WIN = window,
DOC = window.document,
UA = navigator.userAgent
TRIM = String.prototype.trim,
HASOWN = Object.prototype.hasOwnProperty,
TOSTRING = Object.prototype.toString,
PUSH = Array.prototype.push,
SLICE = Array.prototype.slice,
INDEXOF = Array.prototype.indexOf;
//核心的基础源于jquery
var xp = function (selector, context) {
	//通过xp.fn.init创建对象
	return new xp.fn.init(selector, context);
};
xp.fn = xp.prototype = {
	constructor : xp,
	//版本号
	xp : "0.2",
	init : function (selector, context) {
		if (!selector) {
			return this;
		}
		if (selector.nodeType) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;
		}
	}
};
xp.fn.init.prototype = xp.fn;
/**
 *
 * 在xp上扩展静态方法，如果传入两个或多个对象，所有对象的属性会被添加到第一个对象target
 * 如果只传入一个对象，则将对象的属性添加到xp对象中。
 * 用这种方式，我们可以为xp命名空间增加新的方法。
 * 如果不想改变传入的对象，可以传入一个空对象：$.extend({}, object1, object2);
 * 默认合并操作是不迭代的，即便target的某个属性是对象或属性，也会被完全覆盖而不是合并
 * 第一个参数是true，则会迭代合并
 * 从object原型继承的属性会被拷贝
 * undefined值不会被拷贝
 * avaScript自带类型的属性不会合并
 * 通过xp.fn.extend扩展的函数，大部分都会调用通过xp.extend扩展的同名函数
 *
 * @param {Object} receiver 接受者
 * @param {Object} supplier 提供者
 * @return  {Object} 目标对象
 */
xp.extend = xp.fn.extend = function () {
	var options, name, src, copy, copyIsArray, clone,
	target = arguments[0] || {},
	i = 1, length = arguments.length,
	deep = false;
	// 如果第一个参数是boolean型，可能是深度拷贝
	if (typeof target === "boolean") {
		deep = target;
		target = arguments[1] || {};
		// 跳过boolean和target，从第3个开始
		i = 2;
	}
	// target不是对象也不是函数，则强制设置为空对象
	if (typeof target !== "object" && !xp.isFunction(target)) {
		target = {};
	}
	// 如果只传入一个参数，则认为是对xp扩展
	if (length === i) {
		target = this;
		--i;
	}
	for (; i < length; i++) {
		 // 只处理非空参数
		if ((options = arguments[i]) != null) {
			for (name in options) {
				src = target[name];
				copy = options[name];
				 // 避免循环引用
				if (target === copy) {
					continue;
				}
				 // 深度拷贝且值是纯对象或数组，则递归
				if (deep && copy && (xp.isPlainObject(copy) || (copyIsArray = xp.isArray(copy)))) {
					// 如果copy是数组
					if (copyIsArray) {
						copyIsArray = false;
						clone = src && xp.isArray(src) ? src : [];
					} else {
						// 如果copy的是对象
						clone = src && xp.isPlainObject(src) ? src : {};
					}
					 // 递归调用extend
					target[name] = xp.extend(deep, clone, copy);
				} else if (copy !== undefined) {
					// 不能拷贝空值
					target[name] = copy;
				}
			}
		}
	}
	return target;
};
