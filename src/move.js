/**
 * xp动画类
 * 本类是基于anim的常用方法封装 
 * @time 2012/10/04 完成基本封装
 */
xp.move = function(){
	var dom = xp.dom, 
		fw = dom.width,
		fh = dom.height,
		set = xp.anim.set,
	/**
	 * 宽度动画
	 * @param {String} el
	 * @param {String} width
	 * @param {Number} flag
	 */
	width = function(el,width, flag){
		var flag = flag || 1;
		set(el,{'width':width}, flag);
	},
	/**
	 * 高度动画
	 * @param {String} el
	 * @param {String} height
	 * @param {Number} flag
	 */
	height = function(el, height, flag){
		flag = flag || 1;
		set(el,{'height':height}, flag, 50, 20);
		
	},
	/**
	 * 向右移动
	 * @param {String} el
	 * @param {String} left
	 * @param {Number} flag
	 */
	left = function(el, left, flag){
		flag = flag || 1;
		set(el,{'margin-left':left},1,50,20);
	},
	/**
	 * 向左移动
	 * @param {String} el
	 * @param {String} right
	 * @param {Number} flag
	 */
	right = function(el, right, flag){
		flag = flag || 1;
		set(el,{'margin-right':right},1,50,20);
	},
	/**
	 * 渐隐动画
	 * @param {String} el
	 * @param {Number} opacity 0到1的数字
	 * @param {Number} flag
	 */
	fade = function(el,opacity, flag){
		flag = flag || 1;
		set(el,{'opacity':opacity} , flag);
	};
	
	return {
		mwidth : width,
		mheight : height,
		mleft : left,
		mright : right,
		mfade : fade
	}
}();
