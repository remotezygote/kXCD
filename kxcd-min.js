var kXCD=(function(){var a={options:{id:"kXCD_"+Math.round(Math.random()*2147483647),swfUrl:"http://www.kosmix.com/flash/kxcd.swf"},availability:false,get:function(c,g,b){var f=0;try{this.callback=g;this.url=c;this.data=false;this.req_options=b;f++;if(b.data&&b.method&&b.method.toLowerCase()=="post"){this.data=b.data}f++;if(!this.fl){f+=99;this.fl=this.FlashLoader(this.options)}if(this.availability){if(b.data){this.fl.get(this.url,b.data);f+=32}else{this.fl.get(this.url);f++}}}catch(d){}},setAvailability:function(){try{window.kXCD._setAvailability_r.apply(window.kXCD,arguments)}catch(b){}},_setAvailability_r:function(b){if(b==true){this.availability=true;if(this.req_options.data){this.fl.get(this.url,this.req_options.data)}else{this.fl.get(this.url)}}},onComplete:function(b){if(this.callback){this.callback(unescape(b))}},init:function(b){if(b){for(var c in b){this.options[c]=b[c]}}window.kXCD=this;return(this)},FlashLoader:function(c){var b={options:{isIE:(navigator.userAgent.match(/MSIE/i)),isSafari:(navigator.userAgent.match(/safari/i)),isGecko:(navigator.userAgent.match(/gecko/i))},init:function(d){if(d){for(var e in d){this.options[e]=d[e]}}if(this.getMovie()){return(this.getMovie())}return(this.createSWF())},getDocument:function(){return(document.body?document.body:(document.documentElement?document.documentElement:document.getElementsByTagName("div")[0]))},getMovie:function(){return this.options.isIE?window[this.options.id]:(this.options.isSafari?document.getElementById(this.options.id)||document[this.options.id]:document.getElementById(this.options.id))},createSWF:function(h){var h=this.options;var l=null;if(h.isIE){l=document.createElement("div")}else{l=document.createElement("embed");var g={id:h.id,src:h.swfUrl,width:"100%",height:"100%",allowScriptAccess:"always",pluginspage:"http://www.macromedia.com/go/getflashplayer",type:"application/x-shockwave-flash"};for(var i in g){l.setAttribute(i,g[i])}}var d=this.getDocument();if(d){this.container=document.createElement("div");this.container.id=h.id+"-i";this.container.className=h.id+"-m";var f=null;var j={position:"absolute",width:"1px",height:"1px",top:"-999px",left:"-999px"};for(x in j){if(j.hasOwnProperty(x)){this.container.style[x]=j[x]}}try{if(!h.isIE){this.container.appendChild(l)}d.appendChild(this.container);if(h.isIE){f=this.container.appendChild(document.createElement("div"));f.className=h.id+"-c";f.innerHTML='<object id="'+h.id+'" data="'+h.swfUrl+'" type="application/x-shockwave-flash" width="100%" height="100%"><param name="movie" value="'+h.swfUrl+'" /><param name="AllowScriptAccess" value="always" /><!-- --></object>'}return(this.getMovie())}catch(k){return(false)}}return(false)}};if(!c){var c={}}return(b.init(c))}};return(a.init())})();