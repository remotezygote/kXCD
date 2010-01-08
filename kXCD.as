/*
   kXCD is a product of Kosmix.com - written by John Bragg in 2009
   Allows cross-domain communication when a crossdomain.xml file is available on the destination domain.
   to generate: mxmlc -use-network=false -o kxcd.swf -file-specs "kXCD.as"
*/
package {
	import flash.system.*;
	import flash.events.*;
	import flash.display.Sprite;
	import flash.system.Security;
	import flash.net.*;
	import flash.external.ExternalInterface;
	public class kXCD extends Sprite {
		public var baseJSController:String = "kXCD";
		public var loader:URLLoader = new URLLoader();
		public function kXCD() {
			Security.allowDomain('*');
			ExternalInterface.addCallback('get', get);
			ExternalInterface.call("window.kXCD.setAvailability",true);
		}
		public function spit(event:Event):void {
			ExternalInterface.call(baseJSController+".onComplete",escape(loader.data));
		}
		public function get(url:String, data:String = null):void {
			var request:URLRequest = new URLRequest();
			request.url = url;
			if(data) {
				request.method = URLRequestMethod.POST;
				request.data = new URLVariables(data);
			};
			loader.addEventListener(Event.COMPLETE, spit);
			loader.load(request);
		}
	}
}