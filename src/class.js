/**
 * 创建接口对象
 * @param name 接口名
 * @param methods 接口方法
 */
Interface = function (name, methods) {
	if (arguments.length != 2) {
		throw new Error('必须输入两个参数,当前个数' + arguments.length);
	}
	this.name = name;
	this.methods = [];
	for (var i = 0, len = methods.length; i < len; i++) {
		if (typeof methods[i] !== 'string') {
			throw new Error('方法名参数必须为string');
		}
		this.methods.push(methods[i]);
	}
};
/**
 * 接口实现
 * @param  object1 实现接口对象
 * @param  object2 对应接口
 * @return 实现错误抛出异常
 */
Interface.ensureImplements = function (object) {
	if (arguments.length < 2) {
		throw new Error('必须输入两个参数,当前个数' + arguments.length);
	}
	for (var i = 1, len = arguments.length; i < len; i++) {
		var interface = arguments[i];
		if (interface.constructor != Interface) {
			throw new Error("请实现接口");
		}
		for (var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
			var method = interface.methods[j];
			if (!object[method] || typeof object[method] !== 'function') {
				throw new Error("接口名:" + interface.name + "方法名：" + method + "没找到");
			}
		};
	}
};

//类式继承
xp.Class = function (subClass, superClass) {
	var F = function () {};
	F.prototype = superClass.prototype;
	subClass.prototype = new F();
	subClass.prototype.constructor = subClass;
	//加多了个属性指向父类本身以便调用父类函数
	subClass.superclass = superClass.prototype;
	if (superClass.prototype.constructor == Object.prototype.constructor) {
		superClass.prototype.constructor = superClass;
	}
};
/**
 * 调用父类的构造函数
 * @param subClass 子类函数名
 * @param subInstance 子类对象引用
 */
xp.callSuper = function (subClass, subInstance) {
	var argsArr = [];
	for (var i = 2, len = arguments.length; i < len; i++) {
		argsArr.push(arguments[i]);
	}
	subClass.superclass.constructor.apply(subInstance, argsArr);
};
/**
 * 子类中调用父类的函数
 * @param subClass 子类函数名
 * @param subInstance 子类对象引用
 * @param methodName 父类方法名
 */
xp.runSuperMethod = function (subClass, subInstance, methodName) {
	return subClass.superclass[methodName].call(subInstance);
};
/**
 * 定义类函数的prototype
 * @param func 类函数名
 * @param proto 函数的prototype
 */
xp.definePrototype = function (func, proto) {
	proto = proto || {};
	for (methodName in proto) {
		func.prototype[methodName] = proto[methodName];
	}
	func.constructor = func;
};
//原型式继承
xp.clone = function (obj) {
	var F = function () {};
	F.prototype = obj;
	var result = new F();
	F.prototype = null;
	return result;
};
//掺元类继承
xp.augment = function (receivingClass, givingClass) {
	if (arguments[2]) {
		for (var i = 2, len = arguments.length; i < len; i++) {
			receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
		}
	} else {
		for (methodName in givingClass.prototype) {
			receivingClass.prototype[methodName] = givingClass.prototype[methodName];
		}
	}
};
