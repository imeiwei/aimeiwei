/**
* 工具库
**/
(function(){
    var unf = "undefined",btype=navigator.userAgent.toLowerCase();
    //if(typeof _SYFW!=unf){return}
	if(typeof SY_sol==unf){SY_sol=0;} //sol启用 标识
	_SYFW = function(){};
	_SYFW.extend=function(c,d){
		for(var e in d){c[e]=d[e]}
		return c;
	};
	_SYFW.extend(_SYFW,{
        $:function(c){
            return typeof c=="string"?document.getElementById(c):c;
        },
		feature:{
			compatMode:document.compatMode,
			isFixed:!(window.ActiveXObject&&document.compatMode=="BackCompat"||window.ActiveXObject&&btype.match(/msie[ ]([\d.]+)/)[1]<=6)
		},
        FLASH:function(u,w,h,i,wm,v){
            var g = "";
            if(window.ActiveXObject){
				g='<OBJECT classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0" id="'+i+'" name="'+i+'" border="0" width="'+w+'" height="'+h+'"><param name="movie" value="'+u+'" /><param name="quality" value="high" /><param name="allowScriptAccess" value="always" /><param name="menu" value="false" /><param name="allowFullScreen" value="true" /><param name="wmode" value="'+wm+'" /><param name="flashvars" value="'+v+'" /></OBJECT>'
            }else{
				g='<embed id="'+i+'" name="'+i+'" width="'+w+'" height="'+h+'" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" allowScriptAccess="always" allowFullScreen="true" quality="high" menu="false" wmode="'+wm+'" flashvars="'+v+'" src="'+u+'"></embed>';
	       }
		   return g;
        },
		IMG:function(u,w,h){
			var g="";
			g='<img src="'+u+'" style="width:'+w+'px; height:'+h+'px;" />';
			return g;
		},
		HTML:function(u,w,h){
			var g="";
			g='<iframe src="'+u+'" width="'+w+'" height="'+h+'" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>';
			return g;
		},
		//输入 素材地址集，点击跳转地址集，返回随机一组[素材地址，点击地址]
		getResURL:function($r,$c){
			var _ar = $r.split("$");
			var _ac = $c.split("$");
			var theNum = Math.random() * _ar.length >> 0;
			var _arr = [_ar[theNum],_ac[theNum]];
			return _arr;
		},
		createA:function(u,c){
			var d=document.createElement("a");
			if(u){d.href=u;d.target="_blank";}
			if(c){_SYFW.setStyle(d,c)}
			try{return d}
			finally{d=null}
		},
		createImg:function(u,c){
			var d=document.createElement("img");
			if(u){d.src=u}
			if(c){_SYFW.setStyle(d,c)}
			try{return d}
			finally{d=null}
		},
		createDiv:function(e,c,tag){
			var tagStr = "div";
			if(typeof tag!=unf)tagStr=tag;
			var d=document.createElement(tagStr);
			if(e){d.id=e}
			if(c){_SYFW.setStyle(d,c)}
			try{return d}
			finally{d=null}
		},
		createIco:function(u,w,h,fx,fy){
			var s={
				display:"block",
				backgroundImage:"url("+u+")",
				backgroundPosition:fx+"px "+fy+"px",
				width:w+"px",
				height:h+"px",
				fontSize:"0",
				lineHeight:"normal",
				marginLeft:"auto",
				marginRight:"auto"
			};
			var d=_SYFW.createDiv(0,s);
			return d;
		},
		createJs:function(i,u){
			var d=document.createElement("script");
			if(u){d.type="text/javascript";d.id=i;d.src=u;}
			try{return d}
			finally{d=null}
		},
		removeDom:function(o){
			var obj=_SYFW.$(o);
			if(!obj)return;
			var p=obj.parentNode; 
			if(p){
				setTimeout(function(){p.removeChild(obj);},10); 
			}
		},
		//设置样式 e: id或DOM对象  d: {xxx:"",yyy:""}
		setStyle:function(e,d){
			var f=_SYFW.$(e);
			for(var c in d){
				f.style[c]=d[c];
			}
		},
		//获取DOM 的样式属性值   getStyle("main","backgroundColor")
		getStyle:function(e,c){
			var f=_SYFW.$(e),d=null;
			if(f.style[c]){d=f.style[c]}
			if(!d&&f.currentStyle){d=f.currentStyle[c]}
			if(!d&&window.getComputedStyle){d=document.defaultView.getComputedStyle(f,null)[c]}
			return d=="auto"?null:d;
		},
		loadUrl:function(url,callback){
			var s = document.createElement("img");
			s.src = url;
			if(typeof callback=="function"){
				if (s.readyState){ //IE
					s.onreadystatechange = function(){
						if (s.readyState == "loaded" || s.readyState == "complete"){
							s.onreadystatechange = null;
							callback();
						}
					};
				}else{ //Others
					s.onload = function(){
						callback();
					};
				}
			}
		},
		//height width
		getClient:function(c){
			c=c.charAt(0).toUpperCase()+c.substr(1).toLowerCase();
			return _SYFW.feature.compatMode=="CSS1Compat"?document.documentElement["client"+c]:document.body["client"+c];
		},
		//滚动栏的值 top left Heigth Width
		getScroll:function(c){
			c=c.charAt(0).toUpperCase()+c.substr(1).toLowerCase();
			var d=Math.max(document.documentElement["scroll"+c],document.body["scroll"+c]);
			return d;
		},
		//设置滚动栏的值 top left Heigth Width
		setScroll:function(c,v){
			c=c.charAt(0).toUpperCase()+c.substr(1).toLowerCase();
			if(_SYFW.feature.compatMode=="CSS1Compat"){
				eval("document.documentElement.scroll"+c+"="+v);	
				if(window.MessageEvent && !document.getBoxObjectFor){//兼容Google
					eval("document.body.scroll"+c+"="+v);	
				}
			}else{
				eval("document.body.scroll"+c+"="+v);	
			}
		},
		//得到dom的绝对坐标 [nn,nn]
		getCoor:function(d){
			d=_AC.$(d);
			var e=[d.offsetLeft,d.offsetTop];
			var c=d.offsetParent;
			while(c){
				e[0]+=c.offsetLeft;
				e[1]+=c.offsetTop;
				c=c.offsetParent;
			}
			return e;
		},
		addEvent:function(obj,e,fn){
			if(obj.addEventListener){
				obj.addEventListener(e,fn,false)
			}else if(obj.attachEvent){
				obj.attachEvent("on"+e,fn);
			}
		},
		removeEvent:function(obj,e,fn){
			if(obj.removeEventListener){
				obj.removeEventListener(e,fn,false)
			}else if(obj.detachEvent){
				obj.detachEvent("on"+e,fn);
			}
		},
		//type,url,width,height,clickUrl,id,wmode,param  clickUrl为0时无a
		createAD:function(type,u,w,h,a,i,wm,v){
			var s="";
			switch(type){
				case "PIC":
					s=_SYFW.IMG(u,w,h);
				break;
				case "SWF":
					s=_SYFW.FLASH(u,w,h,i,wm,v);
					s='<div style="border:0px solid black; margin:0pt auto; padding:0pt;position:absolute;width:'+w+'px; height:'+h+'px;left:0px;top:0px;">'+s+'</div>';
				break;
				case "HTML":
					s=_SYFW.HTML(u,w,h);
				break;
			}
			if(a){
				var pu = window.ActiveXObject?_SYADSHOW.res.blank:"data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEHAAEALAAAAAABAAEAAAICTAEAOw==";
				if(a!=0)s += '<a href="'+a+'" target="_blank">';
				s += '<img id="blank'+i+'" src='+pu+' style="border:0px solid black; margin:0pt auto; padding:0pt; display:block;position:absolute;width:'+w+'px; height:'+h+'px;left:0px;top:0px;">';
				if(a!=0)s += '</a>';
			}
			return s;
		},
		delegateCreate:function (o, f) {
			var a = new Array() ;
			var l = arguments.length ;
			for(var i = 2 ; i < l ; i++) a[i - 2] = arguments[i] ;
			return function() {
				var aP = [].concat(arguments, a) ;
				f.apply(o, aP);
			}
		},
		//DOM对象或ID,九宫格1～9，层级，偏移数组[x,y] var ff1=new _SYFW.floating("test0",2,1000,[-660,100]);
		floating:function(a,b,c,d){
			this.init(a,b,c,d);
		},
		//var t = new _SYFW.tween(i.style, 'left', _SYFW.tween.backEaseIn, 0, 500, 1, 'px'); t.start();
		tween:function(obj, prop, func, begin, finish, duration, suffixe,compfun){
			this.init(obj, prop, func, begin, finish, duration, suffixe,compfun);
		}
    });
/**
*******************************************************************************************浮动实现代码 Start
**/
	_SYFW.floating.prototype = {
		init:function(a,b,c,d){
			var o=this;
			o.obj=_SYFW.$(a);
			o.grid=b;
			o.index=c;
			o.offset=typeof d==unf?[0,0]:d;
			o.isFix=_SYFW.feature.isFixed;
			o.shiftX=null;
			o.shiftY=null;
			o.loadhand=function(){o.loadHandler()};
			o.scrollHand=function(){o.scrollHandler()};
			o.resizeHand=function(){o.resizeHandler()};
			o.obj.style.position = o.isFix?"fixed":"absolute";
			o.obj.style.right="";
    		o.obj.style.bottom="";
			o.obj.style.zIndex=o.index;
			
			o.loadhand();
			//_SYFW.addEvent(window,"load",o.loadhand);
		},
		loadHandler:function(){
			var o=this;
			if(!o.isFix&&_SYFW.getStyle(document.body,"backgroundImage")=="none"){
				document.body.style.backgroundImage = "url(about:blank)";
				document.body.style.backgroundAttachment = "fixed";
			}
			o.scrollHand();
			_SYFW.addEvent(window,"scroll",o.scrollHand);
			_SYFW.addEvent(window,"resize",o.resizeHand);
		//	_SYFW.removeEvent(window,"load",o.loadhand);
		},
		//position fun
		scrollHandler:function(){
			var o=this,_top,_left,oh,ow,ch,cw;
			oh=o.obj.offsetHeight;
			ow=o.obj.offsetWidth;
			if(oh==0)oh=_SYFW.getStyle(o.obj,"height");
			if(ow==0)ow=_SYFW.getStyle(o.obj,"width");
			ch=_SYFW.getClient("height");
			cw=_SYFW.getClient("width");
			switch(o.grid){
				 case 1:
					_top = 0;
					_left = 0;
				 break;
				 case 2:
					_top = 0;
					_left = (parseInt(cw,10)-parseInt(ow,10))*0.5;
				 break;
				 case 3:
					_top = 0;
					_left = parseInt(cw,10)-parseInt(ow,10);
				 break;
				 case 4:
					_top = (parseInt(ch,10)-parseInt(oh,10))*0.5;
					_left = 0;
				 break;
				 case 5:
					_top = (parseInt(ch,10)-parseInt(oh,10))*0.5;
					_left = (parseInt(cw,10)-parseInt(ow,10))*0.5;
				 break;
				 case 6:
					_top = (parseInt(ch,10)-parseInt(oh,10))*0.5;
					_left = parseInt(cw,10)-parseInt(ow,10);
				 break;
				 case 7:
					_top = parseInt(ch,10)-parseInt(oh,10);
					_left = 0;
				 break;
				 case 8:
					_top = parseInt(ch,10)-parseInt(oh,10);
					_left = (parseInt(cw,10)-parseInt(ow,10))*0.5;
				 break;
				 case 9:
					_top = parseInt(ch,10)-parseInt(oh,10);
					_left = parseInt(cw,10)-parseInt(ow,10);
				 break;
			}
			if(o.isFix){
				o.obj.style.left = _left+o.offset[0] + "px";
				o.obj.style.top = _top+o.offset[1] + "px";
			}else{
				o.shiftX=_SYFW.getScroll("left");
				o.shiftX +=_left+o.offset[0];
				o.shiftY=_SYFW.getScroll("top");
				o.shiftY +=_top+o.offset[1];
				if (o.currentX != o.shiftX || o.currentY != o.shiftY)
				{
					o.currentX = o.shiftX;
					o.currentY = o.shiftY;
					_top=o.currentY-_SYFW.getScroll("top");
					_left=o.currentX-_SYFW.getScroll("left");
					o.obj.style.setExpression("left", "eval((document.documentElement.scrollLeft || document.body.scrollLeft) + " + _left + ") + 'px'");
                 	o.obj.style.setExpression("top", "eval((document.documentElement.scrollTop || document.body.scrollTop) + " + _top + ") + 'px'");
				} 
			}
		},
		resizeHandler:function(){
			setTimeout(this.scrollHand, 10);
		},
		//必须闭包调用 (function(){......})()
		destroy:function(){
			_SYFW.removeEvent(window,"scroll",this.scrollHand);
			_SYFW.removeEvent(window,"resize",this.resizeHand);
		}
	};
/**
************************************************************************************浮动实现代码 End
**/

/**
***********************************************************************************Tween Start
**/
	_SYFW.tween.prototype={
		init:function(obj, prop, func, begin, finish, duration, suffixe,compfun){
			if (!arguments.length) return;
			this._listeners = new Array();
			this.addListener(this);
			if(suffixe) this.suffixe = suffixe;
			this.obj = obj;
			this.prop = prop;
			this.begin = begin;
			this._pos = begin;
			this.setDuration(duration);
			this.compfun = (typeof compfun=="function")?compfun:0;
			if (func!=null && func!='') {
				this.func = func;
			}
			this.setFinish(finish);
		},
		obj:new Object(),
		prop:'',
		func:function (t, b, c, d) { return c*t/d + b; },
		begin:0,
		change:0,
		prevTime:0,
		prevPos:0,
		looping:false,
		_duration:0,
		_time:0,
		_pos:0,
		_position:0,
		_startTime:0,
		_finish:0,
		name:'',
		suffixe:'',
		_listeners:new Array(),
		setTime:function(t){
			var o=this;
			o.prevTime = o._time;
			if (t > o.getDuration()) {
				if (o.looping) {
					o.rewind (t - o._duration);
					o.update();
					o.broadcastMessage('onMotionLooped',{target:o,type:'onMotionLooped'});
				} else {
					o._time = o._duration;
					o.update();
					o.stop();
					o.broadcastMessage('onMotionFinished',{target:o,type:'onMotionFinished'});
				}
			} else if (t < 0) {
				o.rewind();
				o.update();
			} else {
				o._time = t;
				o.update();
			}
		},
		getTime:function(){
			return this._time;
		},
		setDuration:function(d){
			this._duration = (d == null || d <= 0) ? 100000 : d;
		},
		getDuration:function(){
			return this._duration;
		},
		setPosition:function(p){
			var o=this;
			o.prevPos = o._pos;
			var a = o.suffixe != '' ? o.suffixe : '';
			o.obj[o.prop] = Math.round(p) + a;
			o._pos = p;
			o.broadcastMessage('onMotionChanged',{target:o,type:'onMotionChanged'});
		},
		getPosition:function(t){
			if (t == undefined) t = this._time;
			return this.func(t, this.begin, this.change, this._duration);
		},
		setFinish:function(f){
			this.change = f - this.begin;
		},
		geFinish:function(){
			return this.begin + this.change;
		},
		start:function(){
			this.rewind();
			this.startEnterFrame();
			this.broadcastMessage('onMotionStarted',{target:this,type:'onMotionStarted'});
		},
		rewind:function(t){
			this.stop();
			this._time = (t == undefined) ? 0 : t;
			this.fixTime();
			this.update();
		},
		fforward:function(){
			this._time = this._duration;
			this.fixTime();
			this.update();
		},
		update:function(){
			this.setPosition(this.getPosition(this._time));
		},
		startEnterFrame:function(){
			this.stopEnterFrame();
			this.isPlaying = true;
			this.onEnterFrame();
		},
		onEnterFrame:function(){
			if(this.isPlaying) {
				this.nextFrame();
				setTimeout(_SYFW.delegateCreate(this, this.onEnterFrame), 0);
			}else if(this.compfun){
				this.compfun();
			}
		},
		nextFrame:function(){
			this.setTime((this.getTimer() - this._startTime) / 1000);
		},
		stop:function(){
			this.stopEnterFrame();
			this.broadcastMessage('onMotionStopped',{target:this,type:'onMotionStopped'});
		},
		stopEnterFrame:function(){
			this.isPlaying = false;
		},
		continueTo:function(finish, duration){
			this.begin = this._pos;
			this.setFinish(finish);
			if (this._duration != undefined)
				this.setDuration(duration);
			this.start();
		},
		resume:function(){
			this.fixTime();
			this.startEnterFrame();
			this.broadcastMessage('onMotionResumed',{target:this,type:'onMotionResumed'});
		},
		yoyo:function (){
			this.continueTo(this.begin,this._time);
		},
		addListener:function(o){
			this.removeListener (o);
			return this._listeners.push(o);
		},
		removeListener:function(o){
			var a = this._listeners;	
			var i = a.length;
			while (i--) {
				if (a[i] == o) {
					a.splice (i, 1);
					return true;
				}
			}
			return false;
		},
		broadcastMessage:function(){
			var arr = new Array();
			for(var i = 0; i < arguments.length; i++){
				arr.push(arguments[i])
			}
			var e = arr.shift();
			var a = this._listeners;
			var l = a.length;
			for (var i=0; i<l; i++){
				if(a[i][e])
				a[i][e].apply(a[i], arr);
			}
		},
		fixTime:function(){
			this._startTime = this.getTimer() - this._time * 1000;
		},
		getTimer:function(){
			return new Date().getTime() - this._time;
		}
	};
	_SYFW.tween.bounceEaseOut = function(t,b,c,d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	};
	_SYFW.tween.regularEaseOut = function(t,b,c,d){
		return -c *(t/=d)*(t-2) + b;
	};
	_SYFW.tween.regularEaseInOut = function(t,b,c,d){
		if ((t/=d/2) < 1) 
		{return c/2*t*t + b;}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	};
	_SYFW.tween.strongEaseOut = function(t,b,c,d){
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	};
	_SYFW.tween.strongEaseInOut = function(t,b,c,d){
		if ((t/=d/2) < 1) 
		{return c/2*t*t*t*t*t + b;}
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	};
/**
**********************************************************Tween END
**/
})();
/**
* ad_show
**/
(function(){
    var unf="undefined",btype=navigator.userAgent.toLowerCase(),btypeMix=navigator.userAgent,appv=navigator.appVersion,navp=navigator.platform,navv=navigator.vendor;
   // if(typeof _SYADSHOW!=unf){return}
	var head="http://";
	//var host="ipagent.igalive.com/";
	//var resource="resource.igalive.com/as/js/res/";
	var host="wxh.in-gamemedia.com/released/";
	var resHost="http://wxh.in-gamemedia.com/released/resource/";
	var tpHost="http://wxh.in-gamemedia.com/released/js/template/";
	_SYADSHOW = function(){};
	_SYADSHOW.extend=function(c,d){
		for(var e in d){c[e]=d[e]}
		return c;
	};
	_SYADSHOW.extend(_SYADSHOW,{
		uset:{
			u_resHost:resHost,
			u_tpHost:tpHost,
			u_get:head+host+ "s.aspx",
			u_click:head+host + "c.aspx",
			u3_click:head+host + "cg.aspx",
			u_report:head+host + "d.aspx"
		},
		res:{
			sol:resHost+"sol.swf",
			blank:resHost+"blank.gif",
			pic1:resHost+"pic1.gif",
			pic2:resHost+"pic2.gif",
			pic3:resHost+"pic3.gif"
		},
		dataBrowser:[
			{string: btypeMix,subString: "Chrome",identity: "Chrome"},
			{string: btypeMix,subString: "OmniWeb",versionSearch: "OmniWeb/",identity: "OmniWeb"},
			{string: navv,subString: "Apple",identity: "Safari",versionSearch: "Version"},
			{prop: window.opera,identity: "Opera"},
			{string: navv,subString: "iCab",identity: "iCab"},
			{string: navv,subString: "KDE",identity: "Konqueror"},
			{string: btypeMix,subString: "Firefox",identity: "Firefox"},
			{string: navv,subString: "Camino",identity: "Camino"},
			{string: btypeMix,subString: "Netscape",identity: "Netscape"},
			{string: btypeMix,subString: "MSIE",identity: "Explorer",versionSearch: "MSIE"},
			{string: btypeMix,subString: "Gecko",identity: "Mozilla",versionSearch: "rv"},
			{string: btypeMix,subString: "Mozilla",identity: "Netscape",versionSearch: "Mozilla"}
		],
		dataOS:[
			{string: navp,subString: "Win",identity: "Windows"},
			{string: navp,subString: "Mac",identity: "Mac"},
			{string: btypeMix,subString: "iPhone",identity: "iPhone/iPod"},
			{string: navp,subString: "Linux",identity: "Linux"}
		],
		sySolTrue:function(){
			SY_sol = 1;
		},
		searchString:function(d){
			for (var i=0;i<d.length;i++)	{
				var ds = d[i].string;
				var dataProp = d[i].prop;
				versionSearchString = d[i].versionSearch || d[i].identity;
				if (ds) {
					if (ds.indexOf(d[i].subString) != -1)
						return d[i].identity;
				}
				else if (dataProp)
					return d[i].identity;
			}
		},
		searchVersion:function (d) {
			var index = d.indexOf(versionSearchString);
			if (index == -1) return;
			return parseFloat(d.substring(index+versionSearchString.length+1));
		},
		getCookieEnabled:function(){
			return navigator.cookieEnabled?true:false
		},
		createCookie:function(name,value,days){
			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
			}
			else var expires = "";
			document.cookie = name+"="+value+expires+"; path=/";
		},
		readCookie:function(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;
		}, 
		removeCookie:function(name) {
			_SYADSHOW.createCookie(name,"",-1);
		},
		getSolObj:function(movieName){
			if(window.document[movieName]){
				return window.document[movieName];
			}
			if (navigator.appName.indexOf("Microsoft Internet")==-1){
				if (document.embeds && document.embeds[movieName])
				return document.embeds[movieName];
			}
			else{
				return document.getElementById(movieName);
			}
		},
		createSol:function(name,value){
			if(SY_sol){
				_SYADSHOW.getSolObj("SOLHand").writeCookies(name,value);
			}
		},
		readSol:function(name){
			var val=0;
			if(SY_sol){
				var obj = _SYADSHOW.getSolObj("SOLHand");
				val = obj.redCookies(name);
			}
			return String(val);
		},
		removeSol:function(){
			
		},
		forTPLTPam:function(_target3,_target,_issueID,_linkURL,_t3c){
			var st;
			var pmo={issueID:_issueID,linkURL:escape(_linkURL)}; //需要追加的参数集
			if(_t3c!=""){
				pmo.dcClick = escape(_t3c+"&misc="+_SYADSHOW.createCache());
				st=_target3 +"&"+_SYADSHOW.joinParameters(pmo,"&");
			}else{
				st=_target +"&"+_SYADSHOW.joinParameters(pmo,"&");
			}
			return st;
		},
		evalJs:function(u,id){
			if(_SYFW.$(id))return;
			var s=document.createElement('script');
			s.type='text/javascript';
			s.src=u;
			s.id = id;
			document.getElementsByTagName('head')[0].appendChild(s);
		},
		//等目标js加载完成才移除
		removeJs:function(c){
			var b=_SYADSHOW.$(c);
			if(b){
				if(window.ActiveXObject){
					b.onreadystatechange=function(){
						if(b.readyState=="complete"){
							if(b&&b.parentNode)
							b.parentNode.removeChild(b);
						}
					}
				}else{
					b.onload=function(){
						if(b&&b.parentNode){
							b.parentNode.removeChild(b);
							b=null;
						}
					}
				}
			}
		},
		createCache:function(){
			return (new Date()).getTime()+Math.round(Math.random()*10000);
		},
		createSession:function(){
			var getS,ck=_SYADSHOW.getCookieEnabled();
			if(ck){
				getS=_SYADSHOW.readCookie("__sy_ipa_SessionID");
				if(getS==null){
					getS=_SYADSHOW.createCache();
					_SYADSHOW.createCookie("__sy_ipa_SessionID",getS);
				}
			}else{
				getS="none";
			}
			return getS;
		},
		//send 
		sendToUrl:function(c,b){
			if(c){
				c+=(c.indexOf("?")>-1?"&_ts=":"?_ts=")+new Date().getTime();
				var d=document.createElement("img");
				d.style.display="none";
				document.body.insertBefore(d,document.body.firstChild);
				if(b){
					setTimeout(function(){d.src=c},b)
				}else{
					d.src=c;
				}
			}
		},
		//var ttttt={name:"emment",sey:"boy"};var kkk=_SYADSHOW.joinParameters(ttttt,"&/,");  name=emment&sey=boy | emment,boy
		joinParameters:function(f,e){
			var b=[];
			if(e==","){
				for(var d in f){
					if(typeof f[d]!="function"){
						b[b.length]=f[d];
					}
				}
			}else{
				if(e=="&"){
					for(var c in f){
						if(typeof f[c]!="function"){
							b[b.length]=c+"="+f[c];
						}
					}
				}
			}
			return b.join(e);
		},
		//获取FLASHPlayer版本号 10 9 8 
		getFlashVersion:function(){
			var b="0,0,0,0";
			if(navigator.plugins&&navigator.plugins["Shockwave Flash"]){
				b=navigator.plugins["Shockwave Flash"].description;
			}else{
				if(typeof ActiveXObject!=unf){
					if(new ActiveXObject("ShockwaveFlash.ShockwaveFlash")){
						b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version");
					}
				}
			}
			b=b.match(/\d+/g);
			return b[0];
		},
		//获取操作系统 Windows  Mac  iPhone/iPod  Linux
		getOS:function(){
			var OS = _SYADSHOW.searchString(_SYADSHOW.dataOS) || "unknown";
			return OS;
		},
		//获取浏览器版本 返回obj 
		getBrowserVersion:function(){
			var obj={};
			obj.browser=_SYADSHOW.searchString(_SYADSHOW.dataBrowser) || "unknown";
			obj.browserVersion=_SYADSHOW.searchVersion(btypeMix)||_SYADSHOW.searchVersion(appv)|| "unknown";
			return obj;
		},
		//插入script标签到指定DOM对象之前，并加载完成回调
		loadScript:function(url,targetObj,callback){
			var ta = _SYFW.$(targetObj),fat;
			var s = document.createElement("script");
			s.type = "text/javascript";
			s.src = url;
			if(typeof callback=="function"){
				if (s.readyState){ //IE
					s.onreadystatechange = function(){
						if (s.readyState == "loaded" || s.readyState == "complete"){
							s.onreadystatechange = null;
							callback();
						}
					};
				}else{ //Others
					s.onload = function(){
						callback();
					};
				}
			}
			if(ta.parentNode)fat = ta.parentNode;
			fat.insertBefore(s,ta);
		},
		//限制次数策略 【1】  2次/8小时   【2】 2次/100次刷新    【1】 2次/周期     
		ctrlTimes:function(i,type,arr,recordShow){//recordShow 是否记录显示 0 1
			var SY=_SYADSHOW,getS,ret,sht;
			if(!SY.getCookieEnabled())return;
			var bool=1;
			var tt = (typeof arr == "number")?arr:arr[0];
			var minute= arr[1];
			
			switch(type){ 
				case 1: //【1】  2次/8小时   sy_ipa_times=[1,[3,10]];   a=(d2.getTime()-d1.getTime())/(24*1000);
					var now=new Date();
					var nm=now.getTime()/1000;
					getS=SY.readSol("syTimes-type1"+i); 
					if(String(getS)=="undefined"){ //判断是否为空
						getS="0-0-"+nm;
						firstT = nm;
					}else{
						//拆分getS
						firstT = parseInt(getS.split("-")[2]); //初始种的时间
						if(nm - firstT >= minute*60){//如果当前时间-初始时间 大于等于指定时长,则初始化sol
							getS="0-0-"+nm;
							firstT = nm;
						}
					}
					ret = parseInt(getS.split("-")[0]); //刷新次数
					sht = parseInt(getS.split("-")[1]); //显示次数
					if(recordShow){//记录显示
						if(!sht||sht<tt){
							bool = 1;
							sht++;
							SY.createSol("syTimes-type1"+i,ret+"-"+sht+"-"+firstT);
						}else{
							bool = 0;
						}	
					}else{//记录刷新
						if(!ret||ret<tt){
							bool = 1;
							ret++;
							SY.createSol("syTimes-type1"+i,ret+"-"+sht+"-"+firstT);
						}else{
							bool = 0;
						}	
					}
				break;
				case 2: //【2】 2次/100次刷新 
					//getS=SY.readCookie("syTimes-type2"+i);
					getS=SY.readSol("syTimes-type2"+i); 
					if(String(getS)=="undefined")getS="0-0";
					ret = parseInt(getS.split("-")[0]); //刷新次数
					sht = parseInt(getS.split("-")[1]); //显示次数
					if(recordShow){//记录显示
						if(!sht||sht<tt){
							bool = 1;
							sht++;
							SY.createSol("syTimes-type2"+i,ret+"-"+sht);
						}else{
							bool = 0;
						}	
					}else{
						if(ret<tt){
							bool = 1;
						}else{
							bool = 0;
							if(ret==minute-1){SY.createSol("syTimes-type2"+i,"0-0");return;}
						}
						ret++;
						SY.createSol("syTimes-type2"+i,ret+"-"+sht);
					}					
				break;
				case 3: //【1】 2次/周期    sy_ipa_times=[3,[3,1]];
					getS=SY.readCookie("syTimes-type3"+i);
					if(!getS)getS="0-0";
					ret = parseInt(getS.split("-")[0]); //刷新次数
					sht = parseInt(getS.split("-")[1]); //显示次数
					if(recordShow){//记录显示
						if(!sht||sht<tt){
							bool = 1;
							sht++;
							SY.createCookie("syTimes-type3"+i,ret+"-"+sht,minute/60/24);
						}else{
							bool = 0;
						}	
					}else{
						if(ret<tt){
							bool = 1;
							ret++;
							SY.createCookie("syTimes-type3"+i,ret+"-"+sht);
						}else{
							bool = 0;
						}
					}			
				break;
			}
			return bool;
		},
		//限制分辨率策略 new _SYADSHOW.ctrlDPI(1024,fun);
		ctrlDPI:function(w,f){
			this.init(w,f);
		},
		//参数对象，模板地址，自定义参数对象 ex：sy_ipa_custom={sense:1000,pageWidth:1000,marginTop:100};,限次
		ADhand:function(a,b,c,d){
			this.init(a,b,c,d);
		}
    });
	_SYADSHOW.ADhand.prototype = {
		uget:"",
		uclick:"",
		init:function(pam,cm,tl,tm){
			var o = this,L=_SYADSHOW;
			o.id = pam.spotID;
			o.pam = pam;//参数对象组
			o.ctPam=cm;
			o.uget = L.uset.u_get;
			o.uclick = L.uset.u_click;
			o.u3click = L.uset.u3_click;
			o.isTime = tl;
			o.times = tm; //是否请求和主动展示判断
			//拼接地址  
			o.uget+="?"+L.joinParameters(o.pam,"&");
			o.pam.reportType = 1;
			o.uclick+="?"+L.joinParameters(o.pam,"&");
			o.u3click+="?"+L.joinParameters(o.pam,"&");
		},
		//汇报类型，扩展参数对象
		getUreport:function(rpType,ext){
			var r=_SYADSHOW.uset.u_report;
			this.pam.reportType = rpType;
			r+="?"+_SYADSHOW.joinParameters(this.pam,"&");
			if(typeof ext!=unf){
				r+="&"+_SYADSHOW.joinParameters(ext,"&");
			}
			return r;
		},
		runShowTimes:function(){
			var o = this;
			if(o.times!=0)
			_SYADSHOW.ctrlTimes(o.id,o.times[1],o.times[2],1);
		},
		showTimes:function(){
			var o = this;
			var t,getS,arr,tt,sht;
			if(o.times==0)return 1; //如果没有限次 返回真
			arr = o.times[2];
			var typet=o.times[1];
			if(typet==3){//如果是 1 和 3 基于SOL的限次
				//判断刷新层面上是否已经失效 删除所有对应cookies
				getS=_SYADSHOW.readCookie("syTimes-type"+o.times[1]+o.id);
				if(!getS)getS="0-0";
			}else{
				getS=_SYADSHOW.readSol("syTimes-type"+o.times[1]+o.id); 
				if(String(getS)=="undefined")getS="0-0";
			}
			sht = parseInt(getS.split("-")[1]); //显示的次数
			tt = (typeof arr == "number")?arr:arr[0]; //允许显示的总次数	
			if((!sht)||sht<tt){
				t = 1;
			}else{
				t = 0;
			}
			return t;
		},
		FunHand:function(){
			var o = this;
			_SYADSHOW.loadScript(o.uget,"sy_adShow_hd_"+ o.id,function(){return;});
		}
	};
	_SYADSHOW.ctrlDPI.prototype = {
		isShow:false,
		init:function(w,f){
			var o=this;
			o.w=w;
			o.f=f;
			o.resizeHand=function(){o.resizeHandler()};
			o.loadHand=function(){o.loadHandler()};
			o.loadHand();
			//_SYADSHOW.addEvent(window,"load",o.loadHand);
		},
		loadHandler:function(){
			var o=this;
			var cw=_SYFW.getClient("width");
			//_SYADSHOW.removeEvent(window,"load",o.loadHand);
			if(cw>o.w){o.f();return;}
			_SYFW.addEvent(window,"resize",o.resizeHand);
		},
		resizeHandler:function(){
			var o=this;
			var cw=_SYFW.getClient("width");
			if(!o.isShow&&cw>o.w){
				o.f();o.isShow = true;
				_SYFW.removeEvent(window,"resize",o.resizeHand);
			}
		}
	};
	
})();
/************************
参数说明 
sy_ipa_spotID --------广告位id  必要
sy_ipa_isRePv-----------是否请求+PV 默认1  可选
sy_ipa_isRequest-----------是否请求 可选
可选参数！
sy_ipa_times----------------------限制次数策略 【1】  2次/8小时   【2】 2次/100次刷新    【1】 2次/周期   sy_ipa_times=[1,[2,8]];
**************************/
(function(){
	var unf="undefined",L=_SYADSHOW,b="",d="",custom=0,tpu="",i=0,DPI=0,times=0,Tlimit=1,getURl,isReq=1,iii=1,isRePv=1;
	if(typeof sy_ipa_spotID!=unf){i=sy_ipa_spotID;delete sy_ipa_spotID;}else{return;}
	if(typeof i != "number") i = i.join('_');
	if(typeof sy_ipa_isRePv!=unf){isRePv=sy_ipa_isRePv;delete sy_ipa_isRePv;}
	if(typeof sy_ipa_isRequest!=unf){isReq=sy_ipa_isRequest;delete sy_ipa_isRequest;}
	if(typeof sy_ipa_custom!=unf){custom=sy_ipa_custom; delete sy_ipa_custom;}
	
	//单独存在的全局参数一定要用后删除
	if(typeof sy_ipa_times!=unf){times=sy_ipa_times; delete sy_ipa_times;}
	//对联
	if(typeof custom!=unf&&typeof custom.sense!=unf){DPI=custom.sense;}
	//写入hd
	(function(){
		var q=document.getElementsByTagName("script"),p=q.length;
		q[p-1].id="sy_adShow_hd_"+ i;
	})();
	//1限流,2限主动,3限展示次数
	if(times!=0){
		//种solSWF
		(function(){
			if(_SYFW.$("SOLHand"))return;
			//var s={position:"absolute"};
			//var fd=_SYFW.createDiv(0,s);
			var F = _SYFW.FLASH(_SYADSHOW.res.sol,1,1,"SOLHand","Opaque","");
			var soldiv="<div style=\"position:absolute;\">"+F+"</div>";
			//fd.innerHTML = F;
			document.write(soldiv);
			//document.body.insertBefore(fd, document.body.childNodes[0]);
		})();
		(function(){
			if(SY_sol){
				try{
					Tlimit = L.ctrlTimes(i,times[1],times[2],0);
				}catch(e){
					Tlimit = 1;
				}
				if(times[0]==1){
					if(!Tlimit)
					return;
				}
				contiueFun();
			}else{
				if(iii>2000)return;
				iii++;
				setTimeout(arguments.callee,20);
			}
		})();
	}else{
		contiueFun();
	}
	function contiueFun(){
		var get_pam={
			spotID:i,
			adid:i,
			sessionID:L.createSession(),
			browserType:L.getBrowserVersion().browser,
			BrowserVersion:L.getBrowserVersion().browserVersion,
			osType:L.getOS(),
			flashVersion:L.getFlashVersion(),
			reportType:isRePv?4:16,
			reportSpans:0,
			misc:_SYADSHOW.createCache()
		};
		//生产广告位配置实例
		window["__adhand"+i] = new L.ADhand(get_pam,custom,Tlimit,times);
		getURl = window["__adhand"+i].uget;
		d="sy_ad_template"+i;
		var cw=_SYFW.getClient("width");
		if(DPI==0 || cw>=DPI){
			if(isReq){
				var ta = _SYFW.$("sy_adShow_hd_"+ i);
				if(ta.parentNode)var fat = ta.parentNode;
				var getJsObj=_SYFW.createJs(d,getURl);
				fat.insertBefore(getJsObj,ta);
			}
		}else{
			new L.ctrlDPI(DPI,function(){if(isReq)window["__adhand"+i].FunHand()});
		}	
	}
})();