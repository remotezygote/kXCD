var kXCD2 = (function() {
	var core = {
		options: {
			id: "kXCD2_"+Math.round(Math.random()*2147483647),
			swfUrl: "http://local.kosmix.com:7773/kxcd2.swf"
		},
		callbacks: [],
		availability: false,
		get: function(url,callback,options) {
			var ecnt=0;
			try {
				options.trackid = this.callbacks.length;
				this.callbacks[this.callbacks.length] = callback;
				this.url = url;
				this.data = false;
				this.req_options = options;
				ecnt++;
				if(options.data && options.method && options.method.toLowerCase()=="post") this.data = options.data;
				ecnt++;
				if(!this.fl) {
					ecnt+=99;
					this.fl = this.FlashLoader(this.options);
				};
				if(this.availability) {
					if(options.data) {
						this.fl.get(options.trackid,this.url,options.data);
						ecnt+=32;
					} else {
						this.fl.get(options.trackid,this.url);
						ecnt++;
					};
				};
			}catch(e){/*throw({"message":e.message+" at "+ecnt,"name":e.name});*/};
		},
		setAvailability: function() {
			try {
				window.kXCD2._setAvailability_r.apply(window.kXCD2,arguments);
			} catch(e){/*throw({"message":e.message+" in setAvailability","name":e.name});*/};
		},
		_setAvailability_r: function(val) {
			if(val==true) {
				this.availability = true;
				if(this.req_options.data) {
					this.fl.get(this.req_options.trackid,this.url,this.req_options.data);
				} else {
					this.fl.get(this.req_options.trackid,this.url);
				};
			};
		},
		onComplete: function(trackid,data) {
			if(this.callback[trackid]) this.callback[trackid](unescape(data));
		},
		init: function(options) {
			if(options) {
				for(var key in options) {
					this.options[key] = options[key];
				};
			};
			window.kXCD2 = this;
			return(this);
		},
		// FlashLoader adapted loosely from Scott Schiller's Soundmanager2 library
		FlashLoader: function(options) {
			var core = {
				options: {
					isIE: (navigator.userAgent.match(/MSIE/i)),
					isSafari: (navigator.userAgent.match(/safari/i)),
					isGecko: (navigator.userAgent.match(/gecko/i))
	 			},
				init: function(options) {
					if(options) {
						for(var key in options) {
							this.options[key] = options[key];
						};
					};
					if(this.getMovie()) return(this.getMovie());
					return(this.createSWF());
				},
				getDocument: function() {
					return(document.body?document.body:(document.documentElement?document.documentElement:document.getElementsByTagName('div')[0]));
				},
				getMovie: function() {
			    return this.options.isIE?window[this.options.id]:(this.options.isSafari?document.getElementById(this.options.id)||document[this.options.id]:document.getElementById(this.options.id));
			  },
				createSWF: function() {
					var options = this.options;
					var oMovie = null;
					if(options.isIE) {
						// IE is "special".
						oMovie = document.createElement('div');
					} else {
						oMovie = document.createElement('embed');
						var attrs = {id: options.id, src: options.swfUrl,width: '100%',height: '100%',allowScriptAccess: 'always',pluginspage: 'http://www.macromedia.com/go/getflashplayer',type: 'application/x-shockwave-flash'};
						for(var t in attrs) {
							oMovie.setAttribute(t,attrs[t]);
						};
					};
					var oTarget = this.getDocument();
					if(oTarget) {
						this.container = document.createElement('div');
						this.container.id = options.id+'-i';
						this.container.className = options.id+'-m';
						// "hide" flash movie
						var oEl = null;
						var s = {
							position: 'absolute',
							width: '1px',
							height: '1px',
							top: '-999px',
							left: '-999px'
						};
						for (x in s) {
							if (s.hasOwnProperty(x)) {
								this.container.style[x] = s[x];
							};
						};
						try {
							if (!options.isIE) {
								this.container.appendChild(oMovie);
							}
							oTarget.appendChild(this.container);
							if (options.isIE) {
								oEl = this.container.appendChild(document.createElement('div'));
								oEl.className = options.id+'-c';
								oEl.innerHTML = '<object id="'+options.id+'" data="'+options.swfUrl+'" type="application/x-shockwave-flash" width="100%" height="100%"><param name="movie" value="'+options.swfUrl+'" /><param name="AllowScriptAccess" value="always" /><!-- --></object>';
							}
							return(this.getMovie());
						} catch(e) { return(false);/* Eventually will want to catch this and report error to server via logParam */};
					};
					return(false);
				}
			};
			if(!options) options = {};
			return(core.init(options));
		}
	};
	return(core.init());
})();