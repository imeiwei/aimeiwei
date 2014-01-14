/**
 * ...
 * @author 
 */
 var amw = {};;
(function() {
	var a = amw;
	/*tips*/
	var tips = function(width,height){
		o = this;
		o.width = width;
		o.height = height;
		
		o.htmlStr = '<div id="tips-addphone" class="float-tips" style="width:'+width+'px;height:'+height+'px;">';
		o.htmlStr += '<div class="contenter">sss</div>';
		o.htmlStr += '<div class="close"></div>';
		o.htmlStr += '<b class="up"></b>';
		o.htmlStr += '</div>';
		
		o.border = $(this.htmlStr);
		o.closer = this.border.find(".close");
		o.contenter = this.border.find(".contenter");
		o.closer.click(function(){
			o.hide();
		});
	};
	tips.prototype = {
		width:100,
		height:100,
		has:false,
		isShow:false,
		_EventHander:function(){
			o.hide();
			console.log(1);
		},
		setContent:function(obj){
			o = this;
			o.contenter.html(obj);
		},
		show:function(x,y){
			o = this;
			o.border.css("left",x).css("top",y);
			if(!o.has){
				$("body").append(o.border);
				o.has = true;
				
			}
			if(!o.isShow){
				o.border.show();
				//绑定事件
				$(window).resize(o._EventHander);
				o.isShow = true;
			}
		},
		hide:function(){
			o = this;
			if(o.isShow){
				o.border.hide();
				//移除事件
				$(window).unbind("resize",o._EventHander);
				o.isShow = false;
			}
		}
	};
	//a.tips = tips;
	
	/*tips - 输入自定义选项*/
	var tipsCustomInput = function(width,height){
		this.tips = new tips(width,height);
		//加入内部表单
		var formHtml = '<input type="text" class="b-addCustom-input" id="addCustomInput" name="addCustomInput" /><br/><br/>';
			formHtml += '<input type="button" name="submit-addCustom" class="submit-addCustom submit-mix" value="确定" />';
		this.tips.setContent(formHtml);
	};
	tipsCustomInput.prototype = {
		show:function(x,y){
			o = this;
			o.tips.show(x,y);
		},
		hide:function(){
			o = this;
			o.tips.hide();
		}
	};
	a.tipsCustomInput = tipsCustomInput;
	//console.log(tipsCustomInput);
})();