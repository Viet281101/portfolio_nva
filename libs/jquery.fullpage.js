;(function(global,$){
	'use strict';
	var Fullpage = (function(){
		function Fullpage (el,options) {
			this.$el = el;
			this.currIndex = 0;
			this.animating = false;
			this.options = options;
			this.init();
		}

		var utils = {
			throttle:function(callback,delayTime,maxTime){
				var timer = null;
				var prevTime = 0;

				return function(){
					var context = this;
					var argument = arguments;
					var currTime = Date.now();
					if(maxTime && currTime - prevTime >= maxTime){
						prevTime = currTime;
						callback.apply(context,argument);
					}else{
						if(timer) clearTimeout(timer);
						timer = setTimeout(function(){
							callback.apply(context,argument);
						},delayTime);
					}
				}
			}
		};

		Fullpage.prototype = {
			constructor:Fullpage,
			init:function(){
				this.initHTML();
				this.bindEvent();
			},
			initHTML:function(){
				this.$el.children().css({
					'height':'100vh',
					'transition':'all 0.7s',
					'-webkit-transition':'all 0.7s'
				});
			},
			bindEvent:function(){
				var that = this;
				var targetIndex,x0,y0,xDiff,yDiff,delta;

				$(window).on('wheel DOMMouseScroll',utils.throttle(function(){
					var e = arguments[0].originalEvent;
					delta = e.wheelDelta?e.wheelDelta:-e.detail;
					targetIndex = that.currIndex + (delta>0?-1:1);
					that.gotoTarget(targetIndex);
				},100));

				this.$el.on('touchstart',function(e){     
					x0 = e.touches[0].clientX;
					y0 = e.touches[0].clientY;
				});

				this.$el.on('touchmove',utils.throttle(function(){
					console.log('move')
					var e = arguments[0];
					if (!x0 || !y0) return;
					xDiff = e.touches[0].clientX - x0;
					yDiff = e.touches[0].clientY - y0;

					targetIndex = that.currIndex + (yDiff>0?-1:1);
					that.gotoTarget(targetIndex);
				},16));
			},
			gotoTarget:function(targetIndex){
				var children = this.$el.children();
				var that = this;
				var translateY;
			
				if(this.animating || targetIndex < 0 || targetIndex > this.$el.children().length - 1) return;
			
				// Call onLeave callback if defined
				if(typeof this.options.onLeave === 'function'){
					this.options.onLeave.call(this, this.currIndex, targetIndex, targetIndex > this.currIndex ? 'down' : 'up');
				}
			
				translateY = 'translateY(-' + targetIndex * 100 + '%)';
				this.animating = true;
				$(children[0]).on('transitionend', function callback() {
					this.removeEventListener('transitionend', callback);
					that.animating = false;
			
					// Call afterLoad callback if defined
					if(typeof that.options.afterLoad === 'function'){
						that.options.afterLoad.call(that, targetIndex + 1, targetIndex + 1);
					}
				});
				children.css({
					'transform':translateY,
					'-webkit-transform':translateY
				});
			
				this.currIndex = targetIndex;
			}
		};

		Fullpage.prototype.moveTo = function(sectionIndex) {
			if (sectionIndex < 1 || sectionIndex > this.$el.children().length) {
				console.error('Section index out of bounds');
				return;
			}
			var targetIndex = sectionIndex - 1;
			this.gotoTarget(targetIndex);
		};
		

		return Fullpage;
	})();

	$.fn.fullpage = function(options){
		this.each(function(){
			var fullpage = new Fullpage($(this), options);
			$(this).data('fullpage', fullpage);
		});
		return this;
	};
})(this,this.jQuery);