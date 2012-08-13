(function(){
	var _xp = _xp || {},
		ua = navigator.userAgent,
		_doc = document,
		_trim = String.prototype.trim,
		trimer = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g");
	_xp = {
		isUndefined: function( obj ) { return typeof(obj) === "undefined"; },
    	isNull: function( obj ) { return obj === null; },
    	isBoolean: function( obj ) { return (obj === false || obj) && (obj.constructor === Boolean); },
    	isFun: function( obj ) { return !!(obj && obj.constructor && obj.call) },
    	isArg: function( obj ) {return obj && obj.callee && isNumber(o.length) ? true : false; },
    	isStr: function( obj ) { return !!(obj === '' || (obj && obj.charCodeAt && obj.substr)) },
    	isNum: function( obj ) { return toString.call(obj) === '[object Number]' },
    	isArr: [].isArray || function(obj) { return toString.call(obj) === '[object Array]' },
    	isWindow: function( obj ) { return obj != null && obj == obj.window; },
        isObj: function(obj) { return obj == null ? String(obj) == 'object': toString.call(obj) === '[object Object]' || true },
        isNode : function(obj) { return !!(obj && obj.nodeType); },//是否是节点
        isNodeList : function(obj) {return !!(obj && (obj.toString() == '[object NodeList]' || obj.toString() == '[object HTMLCollection]' || (obj.length && this.isNode(obj[0]))));},
        isEmpty : function(obj) {return typeof (obj) == "undefined" || obj == null || (!this.isNode(obj) && this.isArr(obj) && obj.length == 0 || (this.isStr(obj) && obj == ""));},
		browser: {
            ie: /msie(\d+\.\d+)/i.test(ua) ? (doc.documentMode || ( + RegExp['\x241'])) : undefined,
            firefox: /firefox\/(\d+\.\d+)/i.test(ua) ? ( + RegExp['\x241']) : undefined,
            chrome: /chrome\/(\d+\.\d+)/i.test(ua) ? ( + RegExp['\x241']) : undefined,
            Maxthon: /(\d+\.\d+)/.test(external.max_version) ? ( + RegExp['\x241']) : undefined,
            opera: /opera(\/|)(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(ua) ? ( + (RegExp["\x246"] || RegExp["\x242"])) : undefined,
            safari: (/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(ua) && !/chrome/i.test(ua)) ? ( + (RegExp['\x241'] || RegExp['\x242'])) : undefined,
            isGecko: /gecko/i.test(ua) && !/like gecko/i.test(ua),
            isStrict: _doc.compatMode == "CSS1Compat",
            isWebkit: /webkit/i.test(ua)
        },
		trim : function( text ) {
			if( text == null || text === undefined) { return ""; }
			else {
				if( _trim ) { return _trim.call( text ); }
				else { return text.toString().replace( trimer, "" ); }
			}
		},
		indexOf : [].indexOf ? 
	    	function(array, item) { 
	        	return array.indexOf(item);
	    	} :
	    	function(array, item) {
	        	for(var i = array.length - 1; 
	            	(i != -1) && (item != array[i]);
	            	i--
	        	);
	        	return i;
	    	},
	    unique : function( arr ) {
			var ret = [ arr[0] ],
				i = 1,
				len = arr.length;
			for( ; i < len; i++ )
			{
				if( arr[i] !== ret[ret.length - 1] )
				{
					ret.push(arr[i]);
				}
			}
			arr.length = 0;
			return ret;
		},
		dom : [],
		len : 0,
		g : function( id ) {
			return document.getElementById( id );
		},
		node : function( selector, doc ) {
			/*
			* @简单的过滤器
			* css3选择器的五种查找方法
			* 	“,” 并联关系符（优先级最高），“div,span”表示div或span
			* 	“ ” 后代关系符，“div span”表示div的span后代
			* 	“>” 亲子关系符，“div>span”表示div的span儿子
			* 	“+” 相邻兄弟关系符，“div+span”表示div的相邻的span弟弟
			* 	“~” 兄弟关系符，“A~B”表示div的span弟弟
			* 本过滤器定义的查找关系
			* 	# 查找id 相当于document.getElementById
			* 	_ 查找tagname 相当于document.getElementsByTagName
			* 	. 查找classname 相当于document.getElementsByClassName
			*   [attr] 查找attribute 相当于document.querySelectorAll("[attr]")
			*	> 查找对象子集 相当于node.childsNode 参数有'all','first','last','odd'奇数,even偶数,'1','2'...
			*   < 查找对象的父亲 相当于node.parentNode 参数有'1','2'...
			*   = 查找对象的兄弟 相当于element.nextSibling参数有'1','2'...和previousSibling参数有'-1','-2'...和'all'
			* ID _tag .class @attribute >0/1/2.. <0,1,2,3,4,5.. =0,1,2,3,4,5..
			*/
			if( this.isEmpty( selector ) ) {
				return null;
			}
			if( this.isNode( selector ) || this.isNodeList( selector ) ) {
				this.dom = selector;
			}
			if( !this.isStr( selector ) ) {
				return null;
			}
			var doc = doc || this.dom[0] || document,
				elector = this.trim(selector),
				nodeStr = selector.substring( 1 ),
				adapter = selector.substring( 0, 1 );
			this.len = this.dom.length;
			//by id
			if ( adapter === "#" ) {
				this.dom[0] = document.getElementById( nodeStr );
			}
			//by tagname获取标签
			else if ( adapter === "_" ) {
				if( this.dom.length == 0 ) {
					this.dom = doc.getElementsByTagName( nodeStr );
				}else {
					var domCache = [], i = 0, uid = 0;
					for( ; this.dom[i]; i++ ) {
						var doms = this.dom[i].getElementsByTagName( nodeStr ), j = 0;
						for( ; doms[j]; j++ ) {
							//此处借用给dom设置一个额外标签来排除重复的dom
							if( doms[j].hasAttribute("__xp_uniqueNumber") ) {
									continue;
							}else {
								doms[j].setAttribute( "__xp_uniqueNumber", uid++ );
								domCache.push(doms[j]);
							}
						}
					}
					this.dom = [];
					this.dom = this.removeDomsUid( domCache );
					domCache = [];
				}			
			}
			//by classname 获取classname
			else if ( adapter === "." ) {
				if (document.getElementsByClassName) {
					if( this.dom.length == 0 ) {
						this.dom = doc.getElementsByClassName( nodeStr );
					} else {
						var domCache = [], i = 0, uid = 0;
						for(var i = 0; this.dom[i]; i++ ) {
							var doms = this.dom[i].getElementsByClassName( nodeStr ), j = 0;
							for( ; doms[j]; j++ ) {
								if( doms[j].hasAttribute("__xp_uniqueNumber") ) {
									continue;
								}else {
									doms[j].setAttribute( "__xp_uniqueNumber", uid++ );
									domCache.push(doms[j]);
								}
							}
						}
						this.dom.length = 0;
						this.dom = this.removeDomsUid( domCache );
						domCache = [];
					}
	                
	            } else {
	            	if( this.dom.length == 0 ) {
	            		var doms = doc.getElementsByTagName( "*" ), i = 0;
		                for ( ; doms[i]; i++ ) {
		                    doms[i].className === nodeStr && this.dom.push(doms[i]);
		                }
	            	} else {
	            		var domCache = [], i = 0, uid = 0;
	            		for( ; i < this.dom[i]; i++ ) {
	            			var doms = this.dom[i].getElementsByTagName( "*" ), j = 0;
			                for ( ; doms[j]; j++ ) {
			                    if( doms[j].hasAttribute("__xp_uniqueNumber") ) {
									continue;
								}else {
									if( doms[j].className === nodeStr ) {
										doms[j].setAttribute( "__xp_uniqueNumber", uid++ );
										domCache.push(doms[j]);
									}
								}
			                }
						}
						this.dom.length = 0;
						this.dom = this.removeDomsUid( domCache );
						domCache = [];
	            		
	            	}
	                
	            }
			}
			//by attribute 获取自定义属性 包含name
			else if ( adapter === "[" ) {
				if ( document.querySelectorAll ) {
					
					if( this.dom.length == 0 ) {
						this.dom = doc.querySelectorAll( selector );
					} else {
						var domCache = [], i = 0, uid = 0;
						for(var i = 0; this.dom[i]; i++ ) {
							var doms = this.dom[i].querySelectorAll( selector ), j = 0;
							for( ; doms[j]; j++ ) {
								//此处借用给dom设置一个额外标签来排除重复的dom
								if( doms[j].hasAttribute("__xp_uniqueNumber") ) {
									continue;
								}else {
									doms[j].setAttribute( "__xp_uniqueNumber", uid++ );
									domCache.push(doms[j]);
								}
								
							}
						}
						this.dom.length = 0;
						this.dom = this.removeDomsUid( domCache );
						
					}
	                //return doc.querySelectorAll("[" + nodeStr + "]");
	            } else {
	            	nodeStr = nodeStr.replace( "]", "" );
	            	if( this.dom.length == 0 ) {
	            	    var doms = _doc.getElementsByTagName( "*" ),
			                len = doms.length,
			                i = 0;
			                for (; doms[i] && doms[i].hasAttribute( nodeStr ); i++) {
			                     this.dom.push( doms[i] );
			                }
		            	} else{
		            		var domCache = [], i = 0, uid = 0;
							for(var i = 0; this.dom[i]; i++ ) {
								var doms = this.dom[i].getElementsByTagName( "*" ), j = 0;
								for( ; doms[j]; j++ ) {
									//此处借用给dom设置一个额外标签来排除重复的dom
									if( doms[j].hasAttribute("__xp_uniqueNumber") ) {
										continue;
									}else {
										if( doms[j].hasAttribute( nodeStr ) ) {
											doms[j].setAttribute( "__xp_uniqueNumber", uid++ );
											domCache.push(doms[j]);
										} 
										
									}
									
								}
							}
							this.dom.length = 0;
							this.dom = this.removeDomsUid( domCache );
							domCache = [];
	            	}
	               
	            }
			}
			//by childs 1,2,3,4,5..获取所有的子集
			else if ( adapter === ">" ) {
				var nodeStr = this.trim( nodeStr );
				if( nodeStr === "all" ) {
					if( this.dom.length == 0 ) {
						this.dom = doc.childNodes;
					} else {
						var domCache = [], i = 0, len = this.dom.length, uid = 0;
						
						for(var i = 0; i < len; i++ ) {
							var doms = this.dom[i].childNodes, j = 0, lens = doms.length;
							//console.log(doms);
							for( ; j < lens; j++ ) {
								if( doms[j].nodeType == 1 ) {
									if( doms[j].hasAttribute("__xp_uniqueNumber") ) {
										continue;
									}else {
										doms[j].setAttribute( "__xp_uniqueNumber", uid++ );
										domCache.push(doms[j]);
									}
								}
							}
						}
						this.dom.length = 0;
						this.dom = this.removeDomsUid( domCache );
						domCache = [];
						
					}
					
				} 
				else if( nodeStr === "first" ) {
					if( this.dom.length == 0 ) {
						if( doc.firstChild && 
							( doc.firstChild.nodeType == 1 ) 
						  ) {
							this.dom[0] = doc.firstChild;
						}
						
					} else {
						var domCache = [], i = 0, len = this.dom.length, uid = 0;
						for(var i = 0; i < len; i++ ) {
							var childs = this.dom[i].childNodes,
							j = 0, lens = childs.length;
							for( ; j < lens; j++ ) {
								if( childs[j].nodeType == 1 ) {
									var first = childs[j];
									break;
								}
							}
							if( first ) {
								if( first.hasAttribute("__xp_uniqueNumber") ) {
									continue;
								}else {
									first.setAttribute( "__xp_uniqueNumber", uid++ );
									domCache.push( first );
								}
							}
							
						}
						this.dom.length = 0;
						this.dom = domCache;
						domCache = [];
					}
					
				}
				else if( nodeStr === "last" ) {
					if( this.dom.length == 0 ) {
						if( doc.lastChild && 
							( doc.lastChild.nodeType == 1 || doc.lastChild.nodeType == 9 ) 
						  ) {
							this.dom[0] = doc.lastChild;
						}
						
					} else {
						var domCache = [], i = 0, len = this.dom.length, uid = 0;
						for(var i = 0; i < len; i++ ) {
							var childs = this.dom[i].childNodes,
								lens = childs.length,
								j = lens;
							for( ; j > 0; j-- ) {
								if(childs[j] && ( childs[j].nodeType == 1 ) ) {
									var last = childs[j];
									break;
								}
							}
							if( last ) {
								if( last.hasAttribute("__xp_uniqueNumber") ) {
									continue;
								}else {
									last.setAttribute( "__xp_uniqueNumber", uid++ );
									domCache.push( last );
								}
							}
							
						}
						this.dom.length = 0;
						this.dom = domCache;
						domCache = [];
					}
				}
				//偶数
				else if( nodeStr === "even" ) {
					this.dom[0] = doc.lastChild;
				}
				//奇数
				else if( nodeStr === "odd" ) {
					this.dom[0] = doc.lastChild;
				}
				else {
					//取单个数字
					if( nodeStr.indexOf(",") === -1 ) {
						nodeStr = nodeStr*1 + 1;
						if( this.dom.length == 0 ) {
							var childs = doc.childNodes;
							childs[ nodeStr ] && ( this.dom[0] = childs[ nodeStr ] );	
						} else {
							var domCache = [], i = 0;
							for(var i = 0; this.dom[i]; i++ ) {
								var childs = this.dom[i].childNodes;
								childs[ nodeStr ] && domCache.push( childs[ nodeStr ] );
							}
							this.dom.length = 0;
							this.dom = domCache;
							domCache = [];
						}
					} else {
						//多个子集的情况
						
					}
						
				}

				
			}
			//by father 0,1,2,3,4,5..
			else if ( adapter === "<" ) {
			/*
				var i = 0,
					nodeStr = nodeStr*1;
				while( doc.parentNode ) {
					this.dom[i++] = doc.parentNode;
				}
			*/
			}
			//by brothor 0,1,2,3,4,5..
			else if ( adapter === "=" ) {
				//return doc.getElementById( selector );
			}
			else {
				this.dom[0] = doc.getElementById( selector );
			}
			this.len = this.dom.length;
			return this;
		},
		removeDomsUid : function( doms ) {
			for( var i = 0; doms[i]; i++ )	{
				if( dom[i].nodeType === 1 && doms[i].hasAttribute("__xp_uniqueNumber") ) {
					doms[i].removeAttribute("__xp_uniqueNumber");
				}
				
			}
			return doms;
		},
		_getChilds : function( doms ) {
			var cache = [], 
				childs = doms.childNodes,
				len = childs.length,
				i = 0;
			for( ; i < len; i++ ) {
				if( childs[i].nodeType === 1 ) {
					cache.push( childs[i] );
				}
			}
			
		},
		_getFirst : function( doms ) {
			var childs = this._getChilds( doms );
			if(childs[0]) {
				return childs[0];
			} else {
				return null;
			}
		},
		_getLast : function( doms ) {
			var childs = this._getChilds( doms ),
				last = childs.slice( 0, -1 );
			if(last) {
				return last;
			} else {
				return null;
			}
		
		},
		hasClass: function( cls ) {
			for( var i = 0; i < this.len; i++ ) {
				if( RegExp("^(.+\\s)?" + cls + "(\\s.+)?$").test( this.dom[i].className ) ) {
					return true;
				}
			}
			return false;
            
        },
        addClass: function( cls ) {
        	for( var i = 0; i < this.len; i++ ) {
				if( this.dom[i].className.indexOf( cls ) === -1 ) {
					this.dom[i].className += " " + cls;
					this.dom[i].className = this.trim(this.dom[i].className);
				}
			}
        	return this;
        },
        removeClass: function( cls ) {
            !this.hasClass( cls ) && 
            (this.element.className = this.element.className.replace(new RegExp('(\\s|^)' + cls + '(\\s|$)'), ""));
            return this;
        },
        replaceClass: function( oldClassName, newClassName ) {
            this.removeClass( this.element, oldClassName );
            this.addClass( this.element, newClassName );
            return this;
        },
        removeDom: function() {
            while ( this.element.firstChild ) {
                this.element.removeChild( this.element.firstChild );
            }
            return this;
        },
        removeSelf: function() {
            this.element && this.element.parentNode.removeChild(this.element);
        },
        setAttr: function( attrObj ) {
            var mapObj = {
                "class": function() {
                    element.className = attrObj["class"]
                },
                "style": function() {
                    xp.setCssText(element, attrObj["style"])
                }
            }
            for (p in attrObj) {
                if (mapObj[p]) {
                    mapObj[p]()
                } else {
                    element.setAttribute(p, attrObj[p])
                }
            }
        },
        getAttr: function(element, value) {
            return element.getAttribute(value)
        }
	
	};
	window.xp = _xp;
	//_xp._node = _xp.clone(_xp);
	/*
	_xp._node.prototype = {
		constructor : _node,
		
		
	};
	window.node = function( selector, doc ) {
		return new _node( selector, doc );
	};
	*/
})();