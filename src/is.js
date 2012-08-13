/*
 * 基本判断函数
 */
xp.extend({
	/**
	 * 是否为未定义
	 * @param {Object} obj
	 * @return {Boolean}
	 */
	isUndefined : function (obj) {
		return typeof(obj) === "undefined";
	},
	/**
	 * 是否为空对象
	 * @param {Object} obj
	 * @return {Boolean}
	 */
	isNull : function (obj) {
		return obj === null;
	},
	/**
	 * 是否为布尔型
	 * @param {Object} obj
	 * @return {Boolean}
	 */
	isBoolean : function (obj) {
		return (obj === false || obj) && (obj.constructor === Boolean);
	},
	/**
	 * 是否为函数
	 * @param {Object} obj
	 * @return {Boolean}
	 */
	isFunction : function (obj) {
		return !!(obj && obj.constructor && obj.call);
	},
	/**
	 * 是否为函数内的参数
	 * @param {Object} obj
	 * @return {Boolean}
	 */
	isArgument : function (obj) {
		return obj && obj.callee && isNumber(o.length) ? true : false;
	},
	/**
	 * 是否为字符串
	 * @param {Object} obj
	 * @return {Boolean}
	 */
	isString : function (obj) {
		return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
	},
	/**
	 * 是否为数字
	 * @param {Object} obj
	 * @return {Boolean}
	 */
	isNumber : function (obj) {
		return TOSTRING.call(obj) === '[object Number]';
	},
	/**
	 * 是否为数组
	 * @param {Object} obj
	 * @return {Boolean}
	 */
	isArray : [].isArray || function (obj) {
		return TOSTRING.call(obj) === '[object Array]';
	},
	/**
	 * 是否为window
	 * @param {Object} obj
	 * @return {Boolean}
	 */
	isWindow : function (obj) {
		return obj != null && obj == obj.window;
	},
	/**
	 * 是否为对象
	 * @param {Object} obj
	 * @return {Boolean}
	 */
	isObject : function (obj) {
		return obj == null ? String(obj) == 'object' : TOSTRING.call(obj) === '[object Object]' || true;
	},
	/**
	 * 是否为节点
	 * @param {Object} obj
	 * @return {Boolean}
	 */
	isNode : function (obj) {
		return !!(obj && obj.nodeType);
	},
	/**
	 * 是否为节点集合
	 * @param {Object} obj
	 * @return {Boolean}
	 */
	isNodeList : function (obj) {
		return !!(obj && (obj.TOSTRING() == '[object NodeList]' ||
				obj.TOSTRING() == '[object HTMLCollection]' ||
				(obj.length && this.isNode(obj[0]))));
	},
	/**
	 * 是否为空
	 * @param {Object} obj
	 * @return {Boolean}
	 */
	isEmpty : function (obj) {
		return typeof(obj) == "undefined" || obj == null ||
		(!this.isNode(obj) && this.isArray(obj) && obj.length == 0 || (this.isString(obj) && obj == ""));
	},
	/**
	 * 是否为纯对象
	 * @param {Object} obj
	 * @return {Boolean}
	 */
	isPlainObject : function (obj) {
		if (!obj || xp.type(obj) !== "object" || obj.nodeType || xp.isWindow(obj)) {
			return false;
		}
		try {
			if (obj.constructor && !HASOWN.call(obj, "constructor") && !HASOWN.call(obj.constructor.prototype, "isPrototypeOf")) {
				return false;
			}
		} catch (e) {
			return false;
		}
		var key;
		for (key in obj) {}
		return key === undefined || HASOWN.call(obj, key);
	},
	/**
	 * 是否为空对象
	 * @param {Object} obj
	 * @return {Boolean}
	 */
	isEmptyObject : function (obj) {
		for (var name in obj) {
			return false;
		}
		return true;
	},
	/**
	 * 判断对象类型
	 * @param {Object} obj
	 * @return {String}
	 */
	type : function (obj) {
		if (this.isUndefined(obj)) {
			return "undefined";
		} else if (this.isNull(obj)) {
			return "null";
		} else if (this.isNumber(obj)) {
			return "number";
		} else if (this.isBoolean(obj)) {
			return "boolean";
		} else if (this.isString(obj)) {
			return "string";
		} else if (this.isObject(obj)) {
			return "object";
		} else if (this.isArray(obj)) {
			return "array";
		} else if (this.isArgument(obj)) {
			return "arguments";
		} else if (this.isFunction(obj)) {
			return "function";
		} else {
			return "other"
		}
	},
	/**
	 * 判断浏览器是否为IE，如果是将返回版本号，不是则返回undefined
	 */
	ie : /msie(\d+\.\d+)/i.test(UA) ? (DOC.documentMode || ( + RegExp['\x241'])) : undefined,
	/**
	 * 判断浏览器是否为firefox，如果是将返回版本号，不是则返回undefined
	 */
	firefox : /firefox\/(\d+\.\d+)/i.test(UA) ? ( + RegExp['\x241']) : undefined,
	/**
	 * 判断浏览器是否为chrome，如果是将返回版本号，不是则返回undefined
	 */
	chrome : /chrome\/(\d+\.\d+)/i.test(UA) ? ( + RegExp['\x241']) : undefined,
	/**
	 * 判断浏览器是否为Maxthon，如果是将返回版本号，不是则返回undefined
	 */
	Maxthon : /(\d+\.\d+)/.test(external.max_version) ? ( + RegExp['\x241']) : undefined,
	/**
	 * 判断浏览器是否为opera，如果是将返回版本号，不是则返回undefined
	 */
	opera : /opera(\/|)(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(UA) ?
	( + (RegExp["\x246"] || RegExp["\x242"])) : undefined,
	/**
	 * 判断浏览器是否为safari，如果是将返回版本号，不是则返回undefined
	 */
	safari : (/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(UA) &&
		!/chrome/i.test(UA)) ? ( + (RegExp['\x241'] || RegExp['\x242'])) : undefined,
	/**
	 * 判断浏览器是否为iesgecko内核
	 */
	isGecko : /gecko/i.test(UA) && !/like gecko/i.test(UA),
	/**
	 * 判断是否为标准渲染
	 */
	isStrict : _doc.compatMode == "CSS1Compat",
	/**
	 * 判断浏览器是否为webkit内核
	 */
	isWebkit : /webkit/i.test(UA)
	
});
