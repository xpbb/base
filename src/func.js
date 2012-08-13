/*
 * 本文件定义了基本的函数操作
 */
xp.extend({
	trim : function (text) {
		if (text == null || text === undefined) {
			return "";
		} else {
			var trimer = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g"),
			trim = String.prototype.trim;
			if (trim) {
				return trim.call(text);
			} else {
				return text.toString().replace(trimer, "");
			}
		}
	},
	indexOf : [].indexOf ?
	function (array, item) {
		return array.indexOf(item);
	}
	 :
	function (array, item) {
		for (var i = array.length - 1;
			(i != -1) && (item != array[i]);
			i--);
		return i;
	},
	unique : function (arr) {
		var ret = [arr[0]],
		i = 1,
		len = arr.length;
		for (; i < len; i++) {
			if (arr[i] !== ret[ret.length - 1]) {
				ret.push(arr[i]);
			}
		}
		arr.length = 0;
		return ret;
	},
	keys : ({}).keys ||
	function (obj) {
		var ret = [];
		for (var key in obj) {
			ret.push(key)
		}
		return ret
	},
	values : function (obj) {
		var ret = [];
		for (var key in obj) {
			ret.push(obj[key])
		}
		return ret
	},
	unique : function (arr) {
		var ret = [],
		i = 0,
		len = arr.length;
		for (; i < len; i++) {
			!RegExp(arr[i], "g").test(ret.join(",")) && (ret.push(arr[i]))
		}
		return ret
	},
	map : [].map ?
	function (array, cb) {
		return array.map(cb)
	}
	 : function (array, cb) {
		var ret = [],
		i = 0,
		len = array.length;
		for (; i < len; i++) {
			ret.push(cb(array[i], i))
		}
		return ret
	},
	eachArr : [].forEach ?
	function (obj, cb) {
		obj.forEach(cb)
	}
	 : function (obj, cb) {
		for (var i = 0, len = obj.length; i < len; i++) {
			cb(obj[i], i)
		}
	},
	
	// results is for internal usage only
	makeArray : function (arr, results) {
		var type,
		ret = results || [];
		
		if (arr != null) {
			// The window, strings (and functions) also have 'length'
			// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
			type = jQuery.type(arr);
			
			if (arr.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow(arr)) {
				core_push.call(ret, arr);
			} else {
				jQuery.merge(ret, arr);
			}
		}
		
		return ret;
	},
	
	inArray : function (elem, arr, i) {
		var len;
		
		if (arr) {
			if (core_indexOf) {
				return core_indexOf.call(arr, elem, i);
			}
			
			len = arr.length;
			i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
			
			for (; i < len; i++) {
				// Skip accessing in sparse arrays
				if (i in arr && arr[i] === elem) {
					return i;
				}
			}
		}
		
		return -1;
	},
	
	merge : function (first, second) {
		var l = second.length,
		i = first.length,
		j = 0;
		
		if (typeof l === "number") {
			for (; j < l; j++) {
				first[i++] = second[j];
			}
			
		} else {
			while (second[j] !== undefined) {
				first[i++] = second[j++];
			}
		}
		
		first.length = i;
		
		return first;
	},
	
	grep : function (elems, callback, inv) {
		var retVal,
		ret = [],
		i = 0,
		length = elems.length;
		inv = !!inv;
		for (; i < length; i++) {
			retVal = !!callback(elems[i], i);
			if (inv !== retVal) {
				ret.push(elems[i]);
			}
		}
		
		return ret;
	},
	
	map : function (elems, callback, arg) {
		var value,
		key,
		ret = [],
		i = 0,
		length = elems.length;
		if (xp.isArray(elems)) {
			for (; i < length; i++) {
				value = callback(elems[i], i, arg);
				
				if (value != null) {
					ret[ret.length] = value;
				}
			}
		} else {
			for (key in elems) {
				value = callback(elems[key], key, arg);
				if (value != null) {
					ret[ret.length] = value;
				}
			}
		}
		return ret.concat.apply([], ret);
	},
	
	bind : doc.addEventListener ?
	function (target, eventType, handle) {
		target.addEventListener(eventType, handle, false)
	}
	 : function (target, eventType, handle) {
		target.attachEvent("on" + eventType, handle)
	},
	unbind : doc.removeEventListener ?
	function (target, eventType) {
		target.removeEventListener(eventType, handle, false)
	}
	 : function (target, eventType) {
		target.detachEvent("on" + eventType, handle)
	},
	getLength : function (obj) {
		var p,
		count = 0;
		for (p in obj) {
			if (obj.hasOwnProperty(p)) {
				count++
			}
		}
		return count
	},
	noop : function () {}
});
