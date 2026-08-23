import{a as n,j as r}from"./markdown-BdcIOpox.js";import{D as Et,n as Tt,B as jt,f as po,b as fo}from"./browserSidebarConfig-DUSi3o8L.js";import{u as Kt,h as bo,f as Nt,g as At,b as Ke,c as mo,i as ho,j as wo,k as yo,I as go,m as $r,n as vo,o as xo,p as Rt,q as Co,r as D,s as So,t as Lt,v as ko}from"./index-BjcJq6d8.js";import"./charts-XgdcywhF.js";import"./monaco-XTqzb4M9.js";import"./xterm-ChHEYabQ.js";function Eo(l){return JSON.stringify(l).replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029").replace(/<\/script/gi,"<\\/script")}function To(l){return!l||Object.keys(l).length===0?null:`(function(){
'use strict';
var __patch=${Eo(l)};
var __key='__asyncShellFp_'+Object.keys(__patch).sort().join('|');
if(window[__key])return;
window[__key]=true;

function makeNative(fn,name){
var nativeToString=function(){return 'function '+name+'() { [native code] }';};
Object.defineProperty(nativeToString,'name',{value:'toString'});
fn.toString=nativeToString;
return fn;
}
function overrideGetter(obj,prop,value){
try{
var desc=Object.getOwnPropertyDescriptor(obj,prop)||Object.getOwnPropertyDescriptor(Object.getPrototypeOf(obj),prop);
if(desc&&desc.get){
var newGet=makeNative(function(){return value;},'get '+prop);
Object.defineProperty(obj,prop,{get:newGet,configurable:true});
}else{
Object.defineProperty(obj,prop,{value:value,writable:false,configurable:true});
}
}catch(e){}
}

function mulberry32(seed){
return function(){
seed|=0;seed=seed+0x6D2B79F5|0;
var t=Math.imul(seed^seed>>>15,1|seed);
t=t+Math.imul(t^t>>>7,61|t)^t;
return((t^t>>>14)>>>0)/4294967296;
};
}

if(__patch.maskWebdriver){
try{
Object.defineProperty(navigator,'webdriver',{get:makeNative(function(){return false;},'get webdriver'),configurable:true});
}catch(e){}
try{
var cdcKeys=Object.keys(window).filter(function(k){
return k.indexOf('cdc_')===0||k.indexOf('__webdriver')===0||k.indexOf('__selenium')===0||k.indexOf('__fxdriver')===0;
});
for(var ci=0;ci<cdcKeys.length;ci++){
try{delete window[cdcKeys[ci]];}catch(e2){}
}
}catch(e){}
try{
if(!navigator.plugins||navigator.plugins.length<5){
var pluginNames=[
{name:'Chrome PDF Plugin',filename:'internal-pdf-viewer',description:'Portable Document Format'},
{name:'Chrome PDF Viewer',filename:'mhjfbmdgcfjbbpaeojofohoefgiehjai',description:''},
{name:'Native Client',filename:'internal-nacl-plugin',description:''},
{name:'Chromium PDF Plugin',filename:'internal-pdf-viewer',description:'Portable Document Format'},
{name:'Chromium PDF Viewer',filename:'mhjfbmdgcfjbbpaeojofohoefgiehjai',description:''}
];
var fakePlugins=[];
for(var pi=0;pi<pluginNames.length;pi++){
var meta=pluginNames[pi];
var item={name:meta.name,filename:meta.filename,description:meta.description,length:1,item:makeNative(function(){return null;},'item'),namedItem:makeNative(function(){return null;},'namedItem')};
fakePlugins.push(item);
}
var pluginArray=fakePlugins;
pluginArray.item=makeNative(function(i){return fakePlugins[i]||null;},'item');
pluginArray.namedItem=makeNative(function(name){
for(var ni=0;ni<fakePlugins.length;ni++){if(fakePlugins[ni].name===name)return fakePlugins[ni];}
return null;
},'namedItem');
Object.defineProperty(pluginArray,'length',{value:fakePlugins.length,configurable:true});
Object.defineProperty(navigator,'plugins',{get:makeNative(function(){return pluginArray;},'get plugins'),configurable:true});
}
}catch(e){}
}

if(__patch.platform!=null)overrideGetter(navigator,'platform',__patch.platform);

if(__patch.languages&&__patch.languages.length){
var langs=Object.freeze(__patch.languages.slice());
overrideGetter(navigator,'languages',langs);
overrideGetter(navigator,'language',langs[0]);
}

if(__patch.hardwareConcurrency!=null)overrideGetter(navigator,'hardwareConcurrency',__patch.hardwareConcurrency);
if(__patch.deviceMemory!=null)overrideGetter(navigator,'deviceMemory',__patch.deviceMemory);

if(__patch.screenWidth!=null)overrideGetter(screen,'width',__patch.screenWidth);
if(__patch.screenHeight!=null){
overrideGetter(screen,'height',__patch.screenHeight);
var off=typeof __patch.availHeightOffset==='number'?__patch.availHeightOffset:40;
var aw=__patch.screenWidth!=null?__patch.screenWidth:screen.width;
var ah=Math.max(0,__patch.screenHeight-off);
overrideGetter(screen,'availWidth',aw);
overrideGetter(screen,'availHeight',ah);
}else if(__patch.screenWidth!=null){
overrideGetter(screen,'availWidth',__patch.screenWidth);
}
if(__patch.colorDepth!=null){
overrideGetter(screen,'colorDepth',__patch.colorDepth);
overrideGetter(screen,'pixelDepth',__patch.colorDepth);
}

if(__patch.devicePixelRatio!=null)overrideGetter(window,'devicePixelRatio',__patch.devicePixelRatio);

try{
if(!window.chrome)window.chrome={};
if(!window.chrome.app){
window.chrome.app={
isInstalled:false,
getDetails:makeNative(function(){return null;},'getDetails'),
getIsInstalled:makeNative(function(){return false;},'getIsInstalled'),
runningState:makeNative(function(){return 'cannot_run';},'runningState')
};
}
if(!window.chrome.runtime){
window.chrome.runtime={
connect:makeNative(function(){return {onMessage:{addListener:makeNative(function(){},'addListener')},postMessage:makeNative(function(){},'postMessage')};},'connect'),
sendMessage:makeNative(function(){},'sendMessage'),
id:undefined
};
}
if(!window.chrome.csi){
window.chrome.csi=makeNative(function(){return {startE:Date.now(),onloadT:Date.now(),pageT:Date.now(),tran:15};},'csi');
}
if(!window.chrome.loadTimes){
window.chrome.loadTimes=makeNative(function(){return {requestTime:Date.now()/1000,startLoadTime:Date.now()/1000,commitLoadTime:Date.now()/1000,finishDocumentLoadTime:Date.now()/1000,finishLoadTime:Date.now()/1000,firstPaintTime:Date.now()/1000,firstPaintAfterLoadTime:0,navigationType:'Other',wasFetchedViaSpdy:false,wasNpnNegotiated:true,npnNegotiatedProtocol:'h2',wasAlternateProtocolAvailable:false,connectionInfo:'h2'};},'loadTimes');
}
}catch(e){}

if(__patch.timezone){
try{
var origDTF=Intl.DateTimeFormat;
var tz=__patch.timezone;
var newDTF=makeNative(function(locales,options){
var instance=new origDTF(locales,options);
var origResolved=instance.resolvedOptions.bind(instance);
instance.resolvedOptions=makeNative(function(){
var opts=origResolved();
opts.timeZone=tz;
return opts;
},'resolvedOptions');
return instance;
},'DateTimeFormat');
newDTF.prototype=origDTF.prototype;
newDTF.supportedLocalesOf=origDTF.supportedLocalesOf;
Intl.DateTimeFormat=newDTF;
}catch(e){}
}

if(__patch.timezoneOffsetMinutes!=null){
try{
var tzm=__patch.timezoneOffsetMinutes;
Date.prototype.getTimezoneOffset=makeNative(function(){return tzm;},'getTimezoneOffset');
}catch(e){}
}

if(__patch.canvasNoiseSeed!=null){
try{
var canvasRng=mulberry32(__patch.canvasNoiseSeed|0);
var origToDataURL=HTMLCanvasElement.prototype.toDataURL;
HTMLCanvasElement.prototype.toDataURL=makeNative(function(){
try{
var ctx=this.getContext('2d');
if(ctx&&this.width*this.height<2000000){
var imageData=ctx.getImageData(0,0,this.width,this.height);
var data=imageData.data;
for(var i=0;i<data.length;i+=4){
data[i]=data[i]+Math.floor((canvasRng()-0.5)*2);
data[i+1]=data[i+1]+Math.floor((canvasRng()-0.5)*2);
}
ctx.putImageData(imageData,0,0);
}
}catch(e){}
return origToDataURL.apply(this,arguments);
},'toDataURL');
var origToBlob=HTMLCanvasElement.prototype.toBlob;
HTMLCanvasElement.prototype.toBlob=makeNative(function(){
try{
var ctx=this.getContext('2d');
if(ctx&&this.width*this.height<2000000){
var imageData=ctx.getImageData(0,0,this.width,this.height);
var data=imageData.data;
for(var i=0;i<data.length;i+=4){
data[i]=data[i]+Math.floor((canvasRng()-0.5)*2);
}
ctx.putImageData(imageData,0,0);
}
}catch(e){}
return origToBlob.apply(this,arguments);
},'toBlob');
}catch(e){}
}

if(__patch.webglVendor!=null||__patch.webglRenderer!=null){
try{
var VEND=__patch.webglVendor;
var REND=__patch.webglRenderer;
var origGetParam=WebGLRenderingContext.prototype.getParameter;
WebGLRenderingContext.prototype.getParameter=makeNative(function(pname){
var UNMASKED_VENDOR=0x9245;
var UNMASKED_RENDERER=0x9246;
if(pname===UNMASKED_VENDOR&&VEND!=null)return VEND;
if(pname===UNMASKED_RENDERER&&REND!=null)return REND;
return origGetParam.call(this,pname);
},'getParameter');
if(typeof WebGL2RenderingContext!=='undefined'){
var origGetParam2=WebGL2RenderingContext.prototype.getParameter;
WebGL2RenderingContext.prototype.getParameter=makeNative(function(pname){
var UNMASKED_VENDOR=0x9245;
var UNMASKED_RENDERER=0x9246;
if(pname===UNMASKED_VENDOR&&VEND!=null)return VEND;
if(pname===UNMASKED_RENDERER&&REND!=null)return REND;
return origGetParam2.call(this,pname);
},'getParameter');
}
}catch(e){}
}

if(__patch.audioNoiseSeed!=null){
try{
var audioRng=mulberry32(__patch.audioNoiseSeed|0);
var origCreateOscillator=AudioContext.prototype.createOscillator;
AudioContext.prototype.createOscillator=makeNative(function(){
var osc=origCreateOscillator.call(this);
var origConnect=osc.connect.bind(osc);
osc.connect=makeNative(function(dest){
var args=Array.prototype.slice.call(arguments,1);
if(dest instanceof AnalyserNode){
var gainNode=osc.context.createGain();
gainNode.gain.value=1+(audioRng()-0.5)*0.0001;
origConnect(gainNode);
gainNode.connect(dest);
return dest;
}
return origConnect.apply(null,arguments);
},'connect');
return osc;
},'createOscillator');
}catch(e){}
}

if(__patch.webrtcPolicy==='block'){
try{
window.RTCPeerConnection=makeNative(function(){
throw new DOMException('WebRTC is disabled','NotAllowedError');
},'RTCPeerConnection');
window.webkitRTCPeerConnection=window.RTCPeerConnection;
}catch(e){}
}

})();`}const jo=String.raw`
(function(){
	if (window.__asyncHookInstalled) {
		return;
	}
	Object.defineProperty(window, '__asyncHookInstalled', { value: true, writable: false, configurable: false });

	var QUEUE_CAP = 600;
	var queue = [];
	window.__asyncHookQueue = queue;
	window.__asyncDrainHooks = function() {
		var snapshot = queue.splice(0, queue.length);
		return snapshot;
	};

	function nowMs() { return Date.now(); }

	function safeStringify(value, max) {
		try {
			if (value === undefined) return '';
			if (typeof value === 'string') return value.length > max ? value.slice(0, max) + '…' : value;
			if (typeof value === 'number' || typeof value === 'boolean' || value === null) return String(value);
			if (value instanceof ArrayBuffer) return arrayBufferToHex(value, max / 2);
			if (ArrayBuffer.isView(value)) return arrayBufferToHex(value.buffer, max / 2);
			if (value instanceof Uint8Array || value instanceof Uint8ClampedArray) return arrayBufferToHex(value.buffer, max / 2);
			if (value instanceof Blob) return '[Blob ' + value.size + 'b ' + (value.type || 'unknown') + ']';
			if (value instanceof FormData) {
				var entries = [];
				value.forEach(function(v, k) { entries.push(k + '=' + (typeof v === 'string' ? v.slice(0, 80) : '[Blob]')); });
				return entries.join('&').slice(0, max);
			}
			if (value instanceof URLSearchParams) return value.toString().slice(0, max);
			var seen = new WeakSet();
			var out = JSON.stringify(value, function(k, v) {
				if (typeof v === 'object' && v !== null) {
					if (seen.has(v)) return '[circular]';
					seen.add(v);
				}
				if (typeof v === 'string' && v.length > 800) return v.slice(0, 800) + '…';
				return v;
			});
			return out && out.length > max ? out.slice(0, max) + '…' : (out || '');
		} catch (_) {
			try { return String(value).slice(0, max); } catch (__) { return ''; }
		}
	}

	function arrayBufferToHex(buffer, maxBytes) {
		try {
			var view = new Uint8Array(buffer, 0, Math.min(buffer.byteLength, maxBytes || 256));
			var hex = '';
			for (var i = 0; i < view.length; i++) {
				var b = view[i].toString(16);
				hex += b.length === 1 ? ('0' + b) : b;
			}
			if (buffer.byteLength > view.length) hex += '…';
			return hex;
		} catch (_) { return ''; }
	}

	function callStack() {
		try {
			var lines = (new Error()).stack || '';
			lines = lines.split('\n');
			var trimmed = [];
			for (var i = 0; i < lines.length; i++) {
				var line = lines[i].trim();
				if (!line) continue;
				if (line.indexOf('__asyncHook') >= 0) continue;
				if (line.indexOf('asyncDrainHooks') >= 0) continue;
				trimmed.push(line);
				if (trimmed.length >= 6) break;
			}
			return trimmed.join('\n');
		} catch (_) { return ''; }
	}

	function pushEvent(category, label, args, result) {
		try {
			if (queue.length >= QUEUE_CAP) {
				queue.splice(0, queue.length - QUEUE_CAP + 1);
			}
			queue.push({
				ts: nowMs(),
				url: location && location.href ? location.href : '',
				category: category,
				label: label,
				args: args || null,
				result: result || null,
				stack: callStack(),
			});
		} catch (_) { /* ignore */ }
	}

	// --- fetch ---
	try {
		var originalFetch = window.fetch;
		if (typeof originalFetch === 'function') {
			window.fetch = function(input, init) {
				var url = '';
				var method = 'GET';
				try {
					if (typeof input === 'string') { url = input; }
					else if (input instanceof URL) { url = input.href; }
					else if (input && typeof input === 'object') { url = input.url || ''; method = input.method || method; }
					if (init && init.method) method = init.method;
				} catch (_) {}
				var requestId = '__h' + Math.random().toString(36).slice(2, 8);
				pushEvent('fetch', 'fetch', { id: requestId, method: method, url: url, body: init && init.body ? safeStringify(init.body, 800) : '' }, null);
				try {
					var promise = originalFetch.apply(this, arguments);
					promise.then(function(res) {
						pushEvent('fetch', 'fetch.response', { id: requestId, method: method, url: url }, { status: res.status });
					}).catch(function(err) {
						pushEvent('fetch', 'fetch.error', { id: requestId, method: method, url: url }, { error: safeStringify(err, 200) });
					});
					return promise;
				} catch (e) {
					pushEvent('fetch', 'fetch.error', { id: requestId, method: method, url: url }, { error: safeStringify(e, 200) });
					throw e;
				}
			};
		}
	} catch (_) {}

	// --- XHR ---
	try {
		var XHRProto = XMLHttpRequest.prototype;
		var origOpen = XHRProto.open;
		var origSend = XHRProto.send;
		var origSetHeader = XHRProto.setRequestHeader;
		XHRProto.open = function(method, url) {
			try {
				this.__asyncHookMethod = method;
				this.__asyncHookUrl = typeof url === 'string' ? url : (url && url.href) || '';
				this.__asyncHookHeaders = {};
			} catch (_) {}
			return origOpen.apply(this, arguments);
		};
		XHRProto.setRequestHeader = function(name, value) {
			try { (this.__asyncHookHeaders || (this.__asyncHookHeaders = {}))[name] = value; } catch (_) {}
			return origSetHeader.apply(this, arguments);
		};
		XHRProto.send = function(body) {
			var self = this;
			var requestId = '__h' + Math.random().toString(36).slice(2, 8);
			pushEvent('xhr', 'XMLHttpRequest.send', {
				id: requestId,
				method: self.__asyncHookMethod || 'GET',
				url: self.__asyncHookUrl || '',
				headers: self.__asyncHookHeaders || {},
				body: body == null ? '' : safeStringify(body, 800),
			}, null);
			try {
				self.addEventListener('loadend', function() {
					pushEvent('xhr', 'XMLHttpRequest.response', {
						id: requestId,
						method: self.__asyncHookMethod || 'GET',
						url: self.__asyncHookUrl || '',
					}, { status: self.status });
				});
			} catch (_) {}
			return origSend.apply(this, arguments);
		};
	} catch (_) {}

	// --- crypto.subtle ---
	try {
		if (window.crypto && window.crypto.subtle) {
			var subtle = window.crypto.subtle;
			['sign', 'verify', 'digest', 'encrypt', 'decrypt', 'deriveKey', 'deriveBits', 'importKey', 'exportKey', 'wrapKey', 'unwrapKey'].forEach(function(method) {
				if (typeof subtle[method] !== 'function') return;
				var orig = subtle[method].bind(subtle);
				subtle[method] = function() {
					var args = Array.prototype.slice.call(arguments);
					var preview = args.map(function(a) { return safeStringify(a, 200); });
					pushEvent('crypto.subtle', 'crypto.subtle.' + method, { args: preview }, null);
					try {
						var result = orig.apply(null, args);
						if (result && typeof result.then === 'function') {
							result.then(function(value) {
								pushEvent('crypto.subtle', 'crypto.subtle.' + method + '.result', { args: preview }, { value: safeStringify(value, 200) });
							}).catch(function(err) {
								pushEvent('crypto.subtle', 'crypto.subtle.' + method + '.error', { args: preview }, { error: safeStringify(err, 200) });
							});
						}
						return result;
					} catch (e) {
						pushEvent('crypto.subtle', 'crypto.subtle.' + method + '.error', { args: preview }, { error: safeStringify(e, 200) });
						throw e;
					}
				};
			});
		}
	} catch (_) {}

	// --- third-party crypto libs ---
	function wrapMethod(target, method, label) {
		try {
			if (!target || typeof target[method] !== 'function') return;
			var orig = target[method];
			target[method] = function() {
				var args = Array.prototype.slice.call(arguments);
				var preview = args.map(function(a) { return safeStringify(a, 200); });
				pushEvent('crypto.lib', label + '.' + method, { args: preview }, null);
				try {
					var result = orig.apply(this, args);
					if (result && typeof result === 'object' && typeof result.toString === 'function' && result.toString !== Object.prototype.toString) {
						pushEvent('crypto.lib', label + '.' + method + '.result', { args: preview }, { value: safeStringify(result.toString(), 200) });
					}
					return result;
				} catch (e) {
					pushEvent('crypto.lib', label + '.' + method + '.error', { args: preview }, { error: safeStringify(e, 200) });
					throw e;
				}
			};
		} catch (_) {}
	}

	function hookCryptoJS(lib) {
		if (!lib || lib.__asyncHooked) return;
		try { lib.__asyncHooked = true; } catch (_) { return; }
		['AES', 'DES', 'TripleDES', 'Rabbit', 'RC4', 'Blowfish'].forEach(function(name) {
			if (lib[name]) {
				wrapMethod(lib[name], 'encrypt', 'CryptoJS.' + name);
				wrapMethod(lib[name], 'decrypt', 'CryptoJS.' + name);
			}
		});
		['MD5', 'SHA1', 'SHA224', 'SHA256', 'SHA384', 'SHA512', 'SHA3', 'RIPEMD160'].forEach(function(name) {
			if (typeof lib[name] === 'function') {
				var orig = lib[name];
				lib[name] = function() {
					var args = Array.prototype.slice.call(arguments);
					pushEvent('crypto.lib', 'CryptoJS.' + name, { args: args.map(function(a) { return safeStringify(a, 200); }) }, null);
					var result = orig.apply(this, args);
					if (result && result.toString) {
						pushEvent('crypto.lib', 'CryptoJS.' + name + '.result', null, { value: safeStringify(result.toString(), 200) });
					}
					return result;
				};
			}
		});
		['HmacMD5', 'HmacSHA1', 'HmacSHA256', 'HmacSHA512'].forEach(function(name) {
			if (typeof lib[name] === 'function') {
				var orig = lib[name];
				lib[name] = function() {
					var args = Array.prototype.slice.call(arguments);
					pushEvent('crypto.lib', 'CryptoJS.' + name, { args: args.map(function(a) { return safeStringify(a, 200); }) }, null);
					var result = orig.apply(this, args);
					if (result && result.toString) {
						pushEvent('crypto.lib', 'CryptoJS.' + name + '.result', null, { value: safeStringify(result.toString(), 200) });
					}
					return result;
				};
			}
		});
		if (lib.PBKDF2 && typeof lib.PBKDF2 === 'function') {
			var origPbkdf2 = lib.PBKDF2;
			lib.PBKDF2 = function() {
				var args = Array.prototype.slice.call(arguments);
				pushEvent('crypto.lib', 'CryptoJS.PBKDF2', { args: args.map(function(a) { return safeStringify(a, 200); }) }, null);
				var result = origPbkdf2.apply(this, args);
				if (result && result.toString) {
					pushEvent('crypto.lib', 'CryptoJS.PBKDF2.result', null, { value: safeStringify(result.toString(), 200) });
				}
				return result;
			};
		}
		if (lib.enc) {
			['Base64', 'Hex', 'Utf8', 'Latin1'].forEach(function(name) {
				if (lib.enc[name]) {
					wrapMethod(lib.enc[name], 'stringify', 'CryptoJS.enc.' + name);
					wrapMethod(lib.enc[name], 'parse', 'CryptoJS.enc.' + name);
				}
			});
		}
	}

	function hookJSEncrypt(klass) {
		if (!klass || klass.__asyncHooked) return;
		try { klass.__asyncHooked = true; } catch (_) { return; }
		if (klass.prototype) {
			['encrypt', 'decrypt', 'sign', 'verify', 'setPublicKey', 'setPrivateKey'].forEach(function(method) {
				wrapMethod(klass.prototype, method, 'JSEncrypt');
			});
		}
	}

	function hookForge(forge) {
		if (!forge || forge.__asyncHooked) return;
		try { forge.__asyncHooked = true; } catch (_) { return; }
		if (forge.pki) {
			wrapMethod(forge.pki, 'publicKeyFromPem', 'forge.pki');
			wrapMethod(forge.pki, 'privateKeyFromPem', 'forge.pki');
			wrapMethod(forge.pki, 'certificateFromPem', 'forge.pki');
		}
		if (forge.cipher) {
			wrapMethod(forge.cipher, 'createCipher', 'forge.cipher');
			wrapMethod(forge.cipher, 'createDecipher', 'forge.cipher');
		}
		if (forge.md) {
			['md5', 'sha1', 'sha256', 'sha512'].forEach(function(alg) {
				if (forge.md[alg]) wrapMethod(forge.md[alg], 'create', 'forge.md.' + alg);
			});
		}
		if (forge.util) {
			wrapMethod(forge.util, 'encode64', 'forge.util');
			wrapMethod(forge.util, 'decode64', 'forge.util');
		}
		if (forge.hmac) wrapMethod(forge.hmac, 'create', 'forge.hmac');
	}

	function hookSm(name, obj) {
		if (!obj || obj.__asyncHooked) return;
		try { obj.__asyncHooked = true; } catch (_) { return; }
		['doEncrypt', 'doDecrypt', 'doSignature', 'doVerifySignature', 'encrypt', 'decrypt'].forEach(function(method) {
			wrapMethod(obj, method, name);
		});
	}

	function trapGlobal(name, hook) {
		try {
			if (window[name]) { hook(window[name]); return; }
			var stash;
			Object.defineProperty(window, name, {
				configurable: true,
				enumerable: true,
				get: function() { return stash; },
				set: function(value) {
					stash = value;
					if (value) {
						try { hook(value); } catch (_) {}
					}
				},
			});
		} catch (_) {}
	}

	trapGlobal('CryptoJS', hookCryptoJS);
	trapGlobal('JSEncrypt', hookJSEncrypt);
	trapGlobal('forge', hookForge);
	trapGlobal('sm2', function(obj) { hookSm('sm2', obj); });
	trapGlobal('sm3', function(obj) { hookSm('sm3', obj); });
	trapGlobal('sm4', function(obj) { hookSm('sm4', obj); });

	// --- btoa / atob ---
	try {
		var origBtoa = window.btoa;
		var origAtob = window.atob;
		window.btoa = function(s) { pushEvent('crypto.lib', 'btoa', { input: safeStringify(s, 200) }, null); return origBtoa.apply(this, arguments); };
		window.atob = function(s) { pushEvent('crypto.lib', 'atob', { input: safeStringify(s, 200) }, null); return origAtob.apply(this, arguments); };
	} catch (_) {}
})();
`;function No(){return jo}const Ao=new Set(["accounts.google.com","signin.google.com","myaccount.google.com"]);function Ro(l){const o=String(l??"").trim().toLowerCase().replace(/\.$/,"");if(!o)return!1;for(const d of Ao)if(o===d||o.endsWith(`.${d}`))return!0;return!1}function _t(l){try{const o=new URL(String(l??"").trim());return o.protocol!=="https:"&&o.protocol!=="http:"?!1:Ro(o.hostname)}catch{return!1}}function Lo(){return`
(() => {
	if (typeof window === 'undefined') return;
	if (window.__asyncAiCursor && window.__asyncAiCursor.__installed) return;

	const STATE = {
		x: window.innerWidth / 2,
		y: window.innerHeight / 2,
		visible: false,
		container: null,
		cursor: null,
		halo: null,
		labelEl: null,
		styleEl: null,
		moveAnim: null,
		labelTimer: null,
		keyHud: null,
		keyPills: [],
		keyHudTimer: null,
	};

	function ensureRoot() {
		if (STATE.container && document.documentElement.contains(STATE.container)) {
			return;
		}
		if (!document.documentElement) {
			// DOMContentLoaded 之前先把节点缓存，等就绪再 append。
			document.addEventListener('DOMContentLoaded', ensureRoot, { once: true });
			return;
		}

		const style = document.createElement('style');
		style.setAttribute('data-async-ai-cursor', '1');
		style.textContent = [
			'.async-ai-cursor-root{position:fixed;inset:0;pointer-events:none;z-index:2147483646;contain:layout style;}',
			'.async-ai-cursor{position:absolute;width:24px;height:24px;transform:translate(-3px,-2px);transition:opacity .2s ease;will-change:transform;}',
			'.async-ai-cursor[data-visible="0"]{opacity:0;}',
			'.async-ai-cursor[data-visible="1"]{opacity:1;}',
			'.async-ai-cursor[data-pressed="1"] .async-ai-cursor-svg{transform:scale(.82);}',
			'.async-ai-cursor-svg{transition:transform .14s cubic-bezier(.4,0,.2,1);width:100%;height:100%;display:block;filter:drop-shadow(0 1px 1px rgba(0,0,0,.35)) drop-shadow(0 6px 16px rgba(99,102,241,.45));}',
			'.async-ai-cursor-glow{position:absolute;left:0;top:0;width:24px;height:24px;border-radius:50%;background:radial-gradient(circle at 30% 30%,rgba(129,140,248,.55),rgba(129,140,248,0) 65%);transform:translate(-12px,-12px) scale(1);opacity:.55;animation:async-ai-glow 2.4s ease-in-out infinite;pointer-events:none;}',
			'@keyframes async-ai-glow{0%,100%{opacity:.4;transform:translate(-12px,-12px) scale(.9);}50%{opacity:.65;transform:translate(-12px,-12px) scale(1.15);}}',
			'.async-ai-cursor-halo{position:absolute;width:18px;height:18px;border-radius:50%;border:1.5px solid rgba(129,140,248,.9);background:radial-gradient(circle,rgba(129,140,248,.18),rgba(129,140,248,0) 70%);transform:translate(-9px,-9px) scale(.5);opacity:0;pointer-events:none;}',
			'@keyframes async-ai-ripple{0%{opacity:.95;transform:translate(-9px,-9px) scale(.4);border-width:2px;}70%{opacity:.0;transform:translate(-9px,-9px) scale(3);border-width:.6px;}100%{opacity:0;border-width:.5px;}}',
			'.async-ai-cursor-halo[data-active="1"]{animation:async-ai-ripple .6s cubic-bezier(.16,.78,.3,1) forwards;}',
			'.async-ai-cursor-label{position:absolute;padding:5px 11px;border-radius:999px;font:600 11.5px/1.3 ui-sans-serif,system-ui,-apple-system,"SF Pro Text","Segoe UI",Roboto,sans-serif;color:#fff;background:linear-gradient(135deg,rgba(15,23,42,.94),rgba(30,41,59,.94));white-space:nowrap;transform:translate(14px,8px);box-shadow:0 8px 24px rgba(15,23,42,.45),0 0 0 1px rgba(255,255,255,.08) inset;pointer-events:none;opacity:0;transition:opacity .2s ease,transform .2s ease;letter-spacing:.01em;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);}',
			'.async-ai-cursor-label[data-visible="1"]{opacity:1;}',
			'.async-ai-keyhud{position:fixed;left:50%;bottom:36px;transform:translateX(-50%);display:flex;gap:8px;align-items:center;justify-content:center;pointer-events:none;font:600 17px/1 ui-sans-serif,system-ui,-apple-system,"SF Pro Text","Segoe UI",Roboto,sans-serif;max-width:90vw;flex-wrap:nowrap;overflow:hidden;z-index:2147483646;}',
			'.async-ai-keyhud-pill{display:inline-flex;align-items:center;justify-content:center;min-width:38px;height:44px;padding:0 14px;border-radius:12px;color:#f8fafc;background:linear-gradient(180deg,rgba(30,41,59,.95),rgba(15,23,42,.95));box-shadow:0 10px 30px rgba(15,23,42,.55),0 0 0 1px rgba(255,255,255,.09) inset,0 -1px 0 rgba(0,0,0,.4) inset;letter-spacing:.02em;animation:async-ai-keypop .2s cubic-bezier(.16,.78,.3,1);will-change:transform,opacity;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);text-shadow:0 1px 2px rgba(0,0,0,.4);}',
			'.async-ai-keyhud-pill[data-fading="1"]{transition:opacity .4s ease,transform .4s ease;opacity:0;transform:translateY(10px) scale(.9);}',
			'.async-ai-keyhud-pill[data-mod="1"]{background:linear-gradient(180deg,rgba(99,102,241,.95),rgba(79,70,229,.95));box-shadow:0 10px 30px rgba(79,70,229,.55),0 0 0 1px rgba(165,180,252,.4) inset,0 -1px 0 rgba(30,27,75,.5) inset;}',
			'@keyframes async-ai-keypop{0%{opacity:0;transform:translateY(14px) scale(.82);}60%{opacity:1;transform:translateY(-2px) scale(1.04);}100%{opacity:1;transform:translateY(0) scale(1);}}',
		].join('\\n');
		document.documentElement.appendChild(style);
		STATE.styleEl = style;

		const root = document.createElement('div');
		root.className = 'async-ai-cursor-root';
		root.setAttribute('aria-hidden', 'true');

		const halo = document.createElement('div');
		halo.className = 'async-ai-cursor-halo';

		const cursor = document.createElement('div');
		cursor.className = 'async-ai-cursor';
		cursor.setAttribute('data-visible', '0');
		cursor.innerHTML = [
			'<div class="async-ai-cursor-glow"></div>',
			'<svg class="async-ai-cursor-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">',
			'<defs>',
			'<linearGradient id="async-ai-cursor-grad" x1="0%" y1="0%" x2="80%" y2="100%">',
			'<stop offset="0%" stop-color="#a5b4fc"/>',
			'<stop offset="55%" stop-color="#818cf8"/>',
			'<stop offset="100%" stop-color="#6366f1"/>',
			'</linearGradient>',
			'<linearGradient id="async-ai-cursor-shine" x1="0%" y1="0%" x2="0%" y2="60%">',
			'<stop offset="0%" stop-color="rgba(255,255,255,.7)"/>',
			'<stop offset="100%" stop-color="rgba(255,255,255,0)"/>',
			'</linearGradient>',
			'</defs>',
			// 现代瘦削箭头：平滑收尾、圆角连接，带白色描边在亮暗背景都清晰
			'<path d="M3.4 2.6 L3.4 18.6 Q3.4 19.7 4.5 19.1 L8.4 17 L11.1 21.7 Q11.5 22.4 12.3 22 L13.9 21.1 Q14.6 20.7 14.2 19.9 L11.6 15.4 L16.4 14.2 Q17.5 13.9 16.7 13 L4.7 2.1 Q3.4 1.0 3.4 2.6 Z" fill="url(#async-ai-cursor-grad)" stroke="#fff" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"/>',
			// 顶部高光：让箭头有立体感
			'<path d="M4.4 3.5 L4.4 9 Q4.4 9.5 4.9 9.3 L7.5 8 Q8 7.8 7.5 7.3 L5 4.0 Q4.4 3.3 4.4 3.5 Z" fill="url(#async-ai-cursor-shine)" opacity=".55"/>',
			'</svg>',
		].join('');

		const label = document.createElement('div');
		label.className = 'async-ai-cursor-label';
		label.setAttribute('data-visible', '0');

		root.appendChild(halo);
		root.appendChild(cursor);
		root.appendChild(label);
		document.documentElement.appendChild(root);

		const keyHud = document.createElement('div');
		keyHud.className = 'async-ai-keyhud';
		document.documentElement.appendChild(keyHud);

		STATE.container = root;
		STATE.cursor = cursor;
		STATE.halo = halo;
		STATE.labelEl = label;
		STATE.keyHud = keyHud;
		applyPosition(STATE.x, STATE.y);
	}

	const KEY_GLYPHS = {
		'Enter': '↵ Enter',
		'Tab': '⇥ Tab',
		'Backspace': '⌫',
		'Delete': '⌦',
		'Escape': 'Esc',
		'Esc': 'Esc',
		'ArrowUp': '↑',
		'ArrowDown': '↓',
		'ArrowLeft': '←',
		'ArrowRight': '→',
		'Shift': '⇧ Shift',
		'Control': 'Ctrl',
		'Ctrl': 'Ctrl',
		'Alt': 'Alt',
		'Meta': '⌘ Cmd',
		'Cmd': '⌘ Cmd',
		'Space': '␣ Space',
		' ': '␣',
		'CapsLock': '⇪ Caps',
		'PageUp': 'PgUp',
		'PageDown': 'PgDn',
		'Home': 'Home',
		'End': 'End',
	};

	const MAX_KEY_PILLS = 8;

	function pushKey(label) {
		ensureRoot();
		if (!STATE.keyHud) return;
		const raw = String(label == null ? '' : label);
		if (!raw) return;
		// Composite shortcut like "Control+Shift+A": split into individual pills.
		const parts = raw.includes('+') && raw.length > 1
			? raw.split('+').map((s) => s.trim()).filter(Boolean)
			: [raw];
		for (const part of parts) {
			const isMod = ['Shift', 'Control', 'Ctrl', 'Alt', 'Meta', 'Cmd'].indexOf(part) !== -1;
			const display = KEY_GLYPHS[part] !== undefined ? KEY_GLYPHS[part] : part;
			const pill = document.createElement('span');
			pill.className = 'async-ai-keyhud-pill';
			if (isMod) pill.setAttribute('data-mod', '1');
			pill.textContent = display;
			STATE.keyHud.appendChild(pill);
			STATE.keyPills.push(pill);
			while (STATE.keyPills.length > MAX_KEY_PILLS) {
				const old = STATE.keyPills.shift();
				if (old && old.parentNode) old.parentNode.removeChild(old);
			}
			// Auto-fade after a short window so a steady stream of keys keeps the latest visible.
			setTimeout(() => {
				if (!pill.parentNode) return;
				pill.setAttribute('data-fading', '1');
				setTimeout(() => {
					if (pill.parentNode) pill.parentNode.removeChild(pill);
					const idx = STATE.keyPills.indexOf(pill);
					if (idx !== -1) STATE.keyPills.splice(idx, 1);
				}, 380);
			}, 1100);
		}
	}

	function applyPosition(x, y) {
		STATE.x = x;
		STATE.y = y;
		if (STATE.cursor) {
			STATE.cursor.style.left = x + 'px';
			STATE.cursor.style.top = y + 'px';
		}
		if (STATE.halo) {
			STATE.halo.style.left = x + 'px';
			STATE.halo.style.top = y + 'px';
		}
		if (STATE.labelEl) {
			STATE.labelEl.style.left = x + 'px';
			STATE.labelEl.style.top = y + 'px';
		}
	}

	function easeInOutCubic(t) {
		return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
	}

	function bezier(p0, p1, p2, p3, t) {
		const u = 1 - t;
		return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
	}

	function moveTo(targetX, targetY, durationMs) {
		ensureRoot();
		if (!STATE.cursor) return Promise.resolve();
		if (STATE.moveAnim && STATE.moveAnim.cancel) STATE.moveAnim.cancel();
		const startX = STATE.x;
		const startY = STATE.y;
		const dx = targetX - startX;
		const dy = targetY - startY;
		const distance = Math.hypot(dx, dy);
		// 自适应速度：短距离更快，长距离仍然有上限。
		const dur = typeof durationMs === 'number'
			? Math.max(80, durationMs)
			: Math.min(900, Math.max(180, distance * 1.4));

		// 用三阶贝塞尔曲线产生轻微弯曲的轨迹（不是直线），更像人手。
		const perpX = -dy / (distance || 1);
		const perpY = dx / (distance || 1);
		const sag = Math.min(80, distance * 0.18) * (Math.random() > 0.5 ? 1 : -1);
		const c1x = startX + dx * 0.3 + perpX * sag * 0.6;
		const c1y = startY + dy * 0.3 + perpY * sag * 0.6;
		const c2x = startX + dx * 0.7 + perpX * sag * 0.9;
		const c2y = startY + dy * 0.7 + perpY * sag * 0.9;

		showInternal();
		return new Promise((resolve) => {
			const t0 = performance.now();
			let cancelled = false;
			function frame(now) {
				if (cancelled) return;
				const raw = Math.min(1, (now - t0) / dur);
				const t = easeInOutCubic(raw);
				const x = bezier(startX, c1x, c2x, targetX, t);
				const y = bezier(startY, c1y, c2y, targetY, t);
				// 轻微抖动，仅前 70%
				const jitter = raw < 0.7 ? (Math.random() - 0.5) * 0.6 : 0;
				applyPosition(x + jitter, y + jitter);
				if (raw < 1) {
					requestAnimationFrame(frame);
				} else {
					applyPosition(targetX, targetY);
					STATE.moveAnim = null;
					resolve();
				}
			}
			STATE.moveAnim = { cancel: () => { cancelled = true; STATE.moveAnim = null; resolve(); } };
			requestAnimationFrame(frame);
		});
	}

	function showInternal() {
		ensureRoot();
		STATE.visible = true;
		if (STATE.cursor) STATE.cursor.setAttribute('data-visible', '1');
	}

	function hideInternal() {
		STATE.visible = false;
		if (STATE.cursor) STATE.cursor.setAttribute('data-visible', '0');
		if (STATE.labelEl) STATE.labelEl.setAttribute('data-visible', '0');
	}

	function ripple(x, y) {
		ensureRoot();
		if (!STATE.halo) return;
		applyPosition(x, y);
		// 重置动画
		STATE.halo.removeAttribute('data-active');
		// 触发 reflow 让 keyframe 重启
		void STATE.halo.offsetWidth;
		STATE.halo.setAttribute('data-active', '1');
	}

	function click(x, y) {
		ensureRoot();
		if (!STATE.cursor) return Promise.resolve();
		applyPosition(x, y);
		showInternal();
		STATE.cursor.setAttribute('data-pressed', '1');
		ripple(x, y);
		return new Promise((resolve) => {
			setTimeout(() => {
				if (STATE.cursor) STATE.cursor.removeAttribute('data-pressed');
				resolve();
			}, 130);
		});
	}

	function typeIndicator() {
		ripple(STATE.x, STATE.y + 14);
	}

	function setLabel(text, ms) {
		ensureRoot();
		if (!STATE.labelEl) return;
		if (STATE.labelTimer) {
			clearTimeout(STATE.labelTimer);
			STATE.labelTimer = null;
		}
		if (!text) {
			STATE.labelEl.setAttribute('data-visible', '0');
			return;
		}
		STATE.labelEl.textContent = String(text).slice(0, 80);
		STATE.labelEl.setAttribute('data-visible', '1');
		const dur = typeof ms === 'number' && ms > 0 ? ms : 1600;
		STATE.labelTimer = setTimeout(() => {
			if (STATE.labelEl) STATE.labelEl.setAttribute('data-visible', '0');
		}, dur);
	}

	const api = {
		__installed: true,
		show: showInternal,
		hide: hideInternal,
		moveTo,
		click,
		ripple,
		typeIndicator,
		label: setLabel,
		key: pushKey,
		getState: () => ({ x: STATE.x, y: STATE.y, visible: STATE.visible }),
	};

	Object.defineProperty(window, '__asyncAiCursor', {
		value: api,
		configurable: true,
	});

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', ensureRoot, { once: true });
	} else {
		ensureRoot();
	}
})();
`.trim()}const Wt="about:blank",Pt="async.browser.captureDock.expanded.v1",Bt="async.browser.captureDock.height.v1",Ht="async.browser.captureDock.tab.v1",Dt="async.browser.captureDock.detailVisible.v1",Jt=320,Vt=190,Yt=560,_o=80;function Po({t:l,hasPlan:o,openView:d,closeSidebar:b,extraActions:w}){return r.jsxs("div",{className:"ref-right-icon-tabs","aria-label":l("app.rightSidebarViews"),children:[o?r.jsx("button",{type:"button","aria-label":l("app.tabPlan"),title:l("app.tabPlan"),className:"ref-right-icon-tab",onClick:()=>d("plan"),children:r.jsx(ko,{})}):null,w,r.jsx("button",{type:"button","aria-label":l("common.close"),title:l("common.close"),className:"ref-right-icon-tab",onClick:b,children:r.jsx(Ke,{})})]})}function Bo(l){if(!l||typeof l!="object")return!1;const o=l;if(typeof o.commandId!="string"||typeof o.type!="string")return!1;switch(o.type){case"navigate":return typeof o.target=="string";case"closeSidebar":return!0;case"reload":case"stop":case"goBack":case"goForward":case"closeTab":return o.tabId===void 0||typeof o.tabId=="string";case"readPage":return(o.tabId===void 0||typeof o.tabId=="string")&&(o.selector===void 0||typeof o.selector=="string")&&(o.includeHtml===void 0||typeof o.includeHtml=="boolean")&&(o.maxChars===void 0||typeof o.maxChars=="number")&&(o.waitForLoad===void 0||typeof o.waitForLoad=="boolean");case"screenshotPage":return(o.tabId===void 0||typeof o.tabId=="string")&&(o.waitForLoad===void 0||typeof o.waitForLoad=="boolean");case"clickElement":return(o.tabId===void 0||typeof o.tabId=="string")&&typeof o.selector=="string"&&(o.waitForLoad===void 0||typeof o.waitForLoad=="boolean");case"inputText":return(o.tabId===void 0||typeof o.tabId=="string")&&typeof o.selector=="string"&&typeof o.text=="string"&&(o.pressEnter===void 0||typeof o.pressEnter=="boolean")&&(o.waitForLoad===void 0||typeof o.waitForLoad=="boolean");case"waitForSelector":return(o.tabId===void 0||typeof o.tabId=="string")&&typeof o.selector=="string"&&(o.visible===void 0||typeof o.visible=="boolean")&&(o.waitForLoad===void 0||typeof o.waitForLoad=="boolean")&&(o.timeoutMs===void 0||typeof o.timeoutMs=="number");case"applyConfig":return!!(o.config&&typeof o.config=="object");default:return!1}}function te(l){if(!l)return"";try{return String(l.getURL?.()??"").trim()}catch{return""}}function Ho(l){return!!(/^[a-zA-Z]:[\\/]/.test(l)||/^\\\\/.test(l)||/^\/[^/]/.test(l)||/\\/.test(l)&&!/^[a-zA-Z][a-zA-Z\d+\-.]+:\/\//.test(l))}function Do(l){return/^[a-zA-Z][a-zA-Z\d+\-.]+:/.test(l)?!0:/^(localhost|(?:\d{1,3}\.){3}\d{1,3}|(?:[\w-]+\.)+[a-z]{2,})(?::\d+)?(?:[/?#].*)?$/i.test(l)}function Gr(l){const o=l.trim();return o?Ho(o)?`https://www.bing.com/search?q=${encodeURIComponent(o)}`:Do(o)?/^[a-zA-Z][a-zA-Z\d+\-.]+:/.test(o)?o:`https://${o}`:`https://www.bing.com/search?q=${encodeURIComponent(o)}`:Wt}function Mo(l,o){const d=String(l??"").replace(/\r/g,"").replace(/\u00a0/g," ").replace(/[ \t]+\n/g,`
`).replace(/\n{3,}/g,`

`).replace(/[ \t]{2,}/g," ").trim();return d.length>o?`${d.slice(0,o)}

... (truncated)`:d}function hr(l){const o=l&&typeof l=="object"?l:{},d=Array.isArray(o.tabs)?o.tabs.map(b=>{if(!b||typeof b!="object")return null;const w=b;return{attached:w.attached===!0,lastError:typeof w.lastError=="string"&&w.lastError?w.lastError:null}}).filter(b=>!!b):[];return{capturing:o.capturing===!0,requestCount:Math.max(0,Math.floor(Number(o.requestCount)||0)),pendingRequestCount:Math.max(0,Math.floor(Number(o.pendingRequestCount)||0)),hookEventCount:Math.max(0,Math.floor(Number(o.hookEventCount)||0)),storageHostCount:Math.max(0,Math.floor(Number(o.storageHostCount)||0)),tabs:d,note:typeof o.note=="string"?o.note:void 0}}function Mt(l){if(!l||typeof l!="object")return{};const o={};for(const[d,b]of Object.entries(l))o[d]=typeof b=="string"?b:String(b??"");return o}function Xt(l){if(!l||typeof l!="object")return null;const o=l,d=typeof o.id=="string"?o.id:"";if(!d)return null;const b=Number(o.status),w=Number(o.durationMs);return{id:d,seq:Math.max(0,Math.floor(Number(o.seq)||0)),tabId:typeof o.tabId=="string"?o.tabId:"",source:o.source==="proxy"?"proxy":"browser",method:(typeof o.method=="string"&&o.method.trim()?o.method:"GET").toUpperCase(),url:typeof o.url=="string"?o.url:"",status:Number.isFinite(b)?b:null,contentType:typeof o.contentType=="string"&&o.contentType?o.contentType:null,resourceType:typeof o.resourceType=="string"&&o.resourceType?o.resourceType:null,startedAt:Math.max(0,Math.floor(Number(o.startedAt)||0)),durationMs:Number.isFinite(w)?w:null,hasRequestBody:o.hasRequestBody===!0,requestBodyTruncated:o.requestBodyTruncated===!0,hasResponseBody:o.hasResponseBody===!0,responseBodyTruncated:o.responseBodyTruncated===!0,responseBodyOmittedReason:typeof o.responseBodyOmittedReason=="string"&&o.responseBodyOmittedReason?o.responseBodyOmittedReason:null,errorText:typeof o.errorText=="string"&&o.errorText?o.errorText:null}}function zr(l){const o=l&&typeof l=="object"?l:{},d=Array.isArray(o.localAddresses)?o.localAddresses.filter(E=>typeof E=="string"&&!!E.trim()):[],b=Number(o.port),w=Number(o.startedAt),h=Number(o.requestCount);return{running:o.running===!0,port:Number.isFinite(b)&&b>0?Math.floor(b):8888,ownerHostId:typeof o.ownerHostId=="number"&&Number.isFinite(o.ownerHostId)?Math.floor(o.ownerHostId):null,localAddresses:d,primaryAddress:typeof o.primaryAddress=="string"&&o.primaryAddress.trim()?o.primaryAddress.trim():d[0]??"127.0.0.1",proxyUrl:typeof o.proxyUrl=="string"?o.proxyUrl:"",caDownloadUrl:typeof o.caDownloadUrl=="string"?o.caDownloadUrl:"",caCertPath:typeof o.caCertPath=="string"?o.caCertPath:"",caReady:o.caReady===!0,caInstalled:o.caInstalled===!0,systemProxyEnabled:o.systemProxyEnabled===!0,httpsMitm:o.httpsMitm!==!1,startedAt:Number.isFinite(w)&&w>0?Math.floor(w):null,requestCount:Number.isFinite(h)&&h>0?Math.floor(h):0,lastError:typeof o.lastError=="string"&&o.lastError?o.lastError:null}}function Io(l){const o=l&&typeof l=="object"?l:{},d=Array.isArray(o.items)?o.items.map(Xt).filter(b=>!!b):[];return{total:Math.max(0,Math.floor(Number(o.total)||d.length)),offset:Math.max(0,Math.floor(Number(o.offset)||0)),limit:Math.max(0,Math.floor(Number(o.limit)||d.length)),items:d}}function Qt(l){const o=Xt(l);if(!o||!l||typeof l!="object")return null;const d=l;return{...o,requestHeaders:Mt(d.requestHeaders),requestBody:typeof d.requestBody=="string"?d.requestBody:null,responseHeaders:Mt(d.responseHeaders),responseBody:typeof d.responseBody=="string"?d.responseBody:null}}function Fo(l){return Array.isArray(l)?l.map(Qt).filter(o=>!!o):[]}function Uo(l,o){const d=new Map;for(const b of l)d.set(b.id,b);for(const b of o)d.set(b.id,b);return Array.from(d.values()).sort((b,w)=>b.seq-w.seq)}function It(l){try{return new URL(l).host}catch{return""}}function Oo(l){try{const o=new URL(l);return`${o.pathname}${o.search}`}catch{return l}}function Wr(l){return l==null?"--":l>=1e3?`${(l/1e3).toFixed(1)}s`:`${Math.round(l)}ms`}function gr(l){if(!l)return"";const o=l.trim();if(!o)return"";if(o.startsWith("{")||o.startsWith("["))try{return JSON.stringify(JSON.parse(o),null,2)}catch{return l}return l}function Ft(l){return Object.entries(l).sort(([o],[d])=>o.localeCompare(d)).map(([o,d])=>`${o}: ${d}`).join(`
`)}function yr(l,o){const d=o.toLowerCase();for(const[b,w]of Object.entries(l))if(b.toLowerCase()===d)return w;return""}function Ut(l){return Object.entries(l).sort(([o],[d])=>o.localeCompare(d)).map(([o,d])=>({name:o,value:d}))}function qo(l){try{const o=new URL(l);return Array.from(o.searchParams.entries()).map(([d,b])=>({name:d,value:b}))}catch{return[]}}function Kr(l){return`'${String(l??"").replace(/'/g,"'\\''")}'`}function Ot(l){const o=l.method.toUpperCase(),d=[`curl ${Kr(l.url)}`];o&&o!=="GET"&&d.push(`  -X ${o}`);for(const[b,w]of Object.entries(l.requestHeaders).sort(([h],[E])=>h.localeCompare(E)))b.toLowerCase()!=="content-length"&&d.push(`  -H ${Kr(`${b}: ${w}`)}`);return l.requestBody&&d.push(`  --data-raw ${Kr(l.requestBody)}`),d.join(` \\
`)}const $o=16,Go=1200;function qt(l,o=Go){const d=String(l??"").trim();return d?d.length<=o?d:`${d.slice(0,o).trimEnd()}
[truncated ${d.length-o} chars]`:""}function zo(l,o,d){const b=l.slice(0,$o),w=[d("app.browserCaptureAgentDraftIntro"),"",d("app.browserCaptureAgentDraftScope",{scope:o}),d("app.browserCaptureAgentDraftTotal",{count:String(l.length)}),""];return b.forEach((h,E)=>{const F=h.status==null?h.errorText?"ERR":"pending":String(h.status),t=h.contentType??yr(h.responseHeaders,"content-type"),c=qt(gr(h.requestBody),900),C=qt(gr(h.responseBody));w.push(`${E+1}. #${h.seq} ${h.method.toUpperCase()} ${F} ${Wr(h.durationMs)}`),w.push(`   URL: ${h.url}`),w.push(`   Source: ${h.source==="proxy"?"external-device proxy":"built-in browser"}; Type: ${h.resourceType??"--"}${t?`; ${t}`:""}`),h.errorText&&w.push(`   Error: ${h.errorText}`),c&&w.push(`   Request body:
${c}`),C?w.push(`   Response body:
${C}`):h.responseBodyOmittedReason&&w.push(`   Response body: ${h.responseBodyOmittedReason}`),w.push("")}),l.length>b.length&&w.push(d("app.browserCaptureAgentDraftOmitted",{count:String(l.length-b.length)})),w.join(`
`).trim()}function Ko(l,o){return JSON.stringify({version:1,source:"Async browser capture",exportedAt:new Date().toISOString(),requestCount:l.length,scope:o,requests:l},null,2)}function Wo(l){return JSON.stringify({log:{version:"1.2",creator:{name:"Async browser capture",version:"1.0"},pages:[],entries:l.map(o=>{const d=o.requestBody??"",b=o.responseBody??"",w=o.contentType??yr(o.responseHeaders,"content-type"),h=yr(o.requestHeaders,"content-type"),E=o.durationMs??0;return{startedDateTime:new Date(o.startedAt||Date.now()).toISOString(),time:E,request:{method:o.method,url:o.url,httpVersion:"HTTP/1.1",cookies:[],headers:Ut(o.requestHeaders),queryString:qo(o.url),headersSize:-1,bodySize:d.length,...d?{postData:{mimeType:h,text:d}}:{}},response:{status:o.status??0,statusText:o.errorText??"",httpVersion:"HTTP/1.1",cookies:[],headers:Ut(o.responseHeaders),content:{size:b.length,mimeType:w,...b?{text:b}:{}},redirectURL:yr(o.responseHeaders,"location"),headersSize:-1,bodySize:b.length},cache:{},timings:{blocked:-1,dns:-1,connect:-1,send:0,wait:E,receive:0,ssl:-1},...o.errorText?{comment:o.errorText}:{}}})}},null,2)}function $t(l,o,d){const b=new Blob([d],{type:o}),w=URL.createObjectURL(b),h=document.createElement("a");h.href=w,h.download=l,h.rel="noopener",document.body.appendChild(h),h.click(),h.remove(),window.setTimeout(()=>{URL.revokeObjectURL(w)},1e3)}function Jo(l){return`async-browser-capture-${new Date().toISOString().replace(/[:.]/g,"-")}.${l}`}function Gt(l,o=Yt){const d=Number.isFinite(l)?l:Jt;return Math.min(Math.max(Math.round(d),Vt),o)}async function ge(l,o){if(l)try{await l.invoke("browser:commandResult",o)}catch{}}let zt=0;function wr(l=Wt){return zt+=1,{id:`browser-tab-${Date.now().toString(36)}-${zt}`,requestedUrl:l,currentUrl:l,draftUrl:l,pageTitle:"",isLoading:!0,canGoBack:!1,canGoForward:!1,loadError:null}}const Vo=n.memo(function({tab:o,partition:d,userAgent:b,fingerprintScript:w,active:h,hookEnabled:E,hookScript:F,onHookEvents:t,onStorageSnapshot:c,t:C,onNavigate:U,onTitle:ie,onLoading:ve,onFailLoad:O,onRegisterWebview:T}){const S=n.useRef(null),V=n.useRef(null);V.current=w;const Y=n.useRef(F);Y.current=F;const G=n.useRef(Lo()),He=n.useRef(E);He.current=E;const de=n.useRef(t);de.current=t;const De=n.useRef(c);De.current=c;const q=n.useRef(o.id),[le,We]=n.useState(null);q.current=o.id;const _=n.useCallback(()=>{const m=S.current,N=m?.parentElement;if(!m||!(N instanceof HTMLElement))return;const P=Math.max(1,Math.round(N.clientWidth)),A=Math.max(1,Math.round(N.clientHeight));We(y=>y&&y.width===P&&y.height===A?y:{width:P,height:A})},[]),xe=n.useCallback(m=>{S.current=m;try{T(q.current,m)}catch(N){console.error("[BrowserTab] error in onRegisterWebview:",N)}},[T]);n.useEffect(()=>{const m=S.current;if(!m)return;const N=()=>{try{return{canGoBack:!!m.canGoBack?.(),canGoForward:!!m.canGoForward?.()}}catch{return{canGoBack:!1,canGoForward:!1}}},P=()=>{ve(q.current,!0);const W=V.current;W&&m.executeJavaScript(W,!1).catch(()=>{}),m.executeJavaScript(G.current,!1).catch(()=>{})},A=()=>{ve(q.current,!1,te(m))},y=W=>{const v=W;if(v.isMainFrame===!1)return;const ae=String(v.url??te(m)??"").trim(),{canGoBack:oe,canGoForward:vr}=N();U(q.current,{currentUrl:ae,canGoBack:oe,canGoForward:vr})},R=W=>{ie(q.current,String(W.title??"").trim())},X=()=>{const{canGoBack:W,canGoForward:v}=N();U(q.current,{currentUrl:te(m),canGoBack:W,canGoForward:v});const ae=V.current;ae&&m.executeJavaScript(ae,!1).catch(()=>{}),m.executeJavaScript(G.current,!1).catch(()=>{}),He.current&&Y.current&&m.executeJavaScript(Y.current,!1).catch(()=>{})},ce=W=>{const v=W;if(v.isMainFrame===!1||v.errorCode===-3)return;const ae=String(v.validatedURL??te(m)??"").trim();O(q.current,{message:String(v.errorDescription??C("app.browserLoadFailed")),url:ae})};return m.addEventListener("dom-ready",X),m.addEventListener("did-start-loading",P),m.addEventListener("did-stop-loading",A),m.addEventListener("did-navigate",y),m.addEventListener("did-navigate-in-page",y),m.addEventListener("page-title-updated",R),m.addEventListener("did-fail-load",ce),()=>{m.removeEventListener("dom-ready",X),m.removeEventListener("did-start-loading",P),m.removeEventListener("did-stop-loading",A),m.removeEventListener("did-navigate",y),m.removeEventListener("did-navigate-in-page",y),m.removeEventListener("page-title-updated",R),m.removeEventListener("did-fail-load",ce)}},[d,ve,U,ie,O]),n.useEffect(()=>{if(!E)return;let m=!1;const N=async()=>{const A=S.current;if(!(!A||m))try{const y=await A.executeJavaScript("(function(){ try { return window.__asyncDrainHooks ? window.__asyncDrainHooks() : []; } catch(_) { return []; } })()",!1);if(m)return;Array.isArray(y)&&y.length>0&&de.current(q.current,y)}catch{}},P=window.setInterval(N,1500);return N(),()=>{m=!0,window.clearInterval(P)}},[E,o.id]),n.useEffect(()=>{if(!E)return;let m=!1;const N=`(function(){
			try {
				var url = location && location.href || '';
				var host = '';
				try { host = new URL(url).hostname; } catch(_) {}
				var collect = function(store) {
					var out = [];
					if (!store) return out;
					try {
						for (var i = 0; i < store.length; i++) {
							var key = store.key(i);
							if (!key) continue;
							var value = '';
							try { value = store.getItem(key) || ''; } catch(_) {}
							out.push({ key: key, value: value });
							if (out.length > 200) break;
						}
					} catch(_) {}
					return out;
				};
				return {
					url: url,
					host: host,
					ts: Date.now(),
					cookies: typeof document !== 'undefined' ? (document.cookie || '') : '',
					localStorage: collect(window.localStorage),
					sessionStorage: collect(window.sessionStorage),
				};
			} catch(_) { return null; }
		})()`,P=async()=>{const R=S.current;if(!(!R||m))try{const X=await R.executeJavaScript(N,!1);if(m||!X)return;De.current(q.current,X)}catch{}},A=window.setInterval(P,5e3),y=window.setTimeout(P,800);return()=>{m=!0,window.clearInterval(A),window.clearTimeout(y)}},[E,o.id]),n.useEffect(()=>{const m=S.current,N=m?.parentElement;if(!m||!(N instanceof HTMLElement))return;_();let P=window.requestAnimationFrame(()=>{_()});const A=typeof ResizeObserver>"u"?null:new ResizeObserver(()=>{_()});A?.observe(N);const y=()=>{_()};return window.addEventListener("resize",y),()=>{window.cancelAnimationFrame(P),A?.disconnect(),window.removeEventListener("resize",y)}},[h,_,o.id]);const M={ref:xe,className:`ref-browser-webview${h?"":" is-hidden"}`,src:o.requestedUrl,partition:d,useragent:b,style:le?{width:`${le.width}px`,height:`${le.height}px`}:{width:"100%",height:"100%"},onLoad:()=>console.log("[BrowserTab] webview onLoad event fired"),allowpopups:"true"};return r.jsx("webview",{...M})},(l,o)=>{const d={tabIdSame:l.tab.id===o.tab.id,requestedUrlSame:l.tab.requestedUrl===o.tab.requestedUrl,currentUrlSame:l.tab.currentUrl===o.tab.currentUrl,isLoadingSame:l.tab.isLoading===o.tab.isLoading,canGoBackSame:l.tab.canGoBack===o.tab.canGoBack,canGoForwardSame:l.tab.canGoForward===o.tab.canGoForward,partitionSame:l.partition===o.partition,userAgentSame:l.userAgent===o.userAgent,fingerprintScriptSame:l.fingerprintScript===o.fingerprintScript,activeSame:l.active===o.active};return Object.values(d).every(Boolean)}),Yo=n.memo(function({hasAgentPlanSidebarContent:o,closeSidebar:d,openView:b,onOpenBrowserSettings:w,pendingCommand:h,onCommandHandled:E,variant:F="sidebar"}){const{t,shell:c}=Kt(),C=n.useRef(new Map),U=n.useRef(null),ie=n.useRef(""),ve=n.useMemo(()=>wr(),[]),[O,T]=n.useState([ve]),[S,V]=n.useState(ve.id),Y=n.useRef(O);Y.current=O;const G=n.useRef(S);G.current=S;const[He,de]=n.useState(""),[De,q]=n.useState(!1),[le,We]=n.useState(Et),[_,xe]=n.useState(null),[M,m]=n.useState(null),[N,P]=n.useState(null),[A,y]=n.useState(null),[R,X]=n.useState(()=>{try{const e=window.localStorage.getItem(Pt);return e==null?!1:e!=="0"}catch{return!1}}),[ce,W]=n.useState(()=>{try{return Gt(Number(window.localStorage.getItem(Bt)))}catch{return Jt}}),[v,ae]=n.useState(()=>{try{const e=window.localStorage.getItem(Ht);return e==="devices"||e==="hooks"||e==="storage"?e:"requests"}catch{return"requests"}}),[oe,vr]=n.useState(""),[fe,Zt]=n.useState("all"),[be,Jr]=n.useState("all"),[me,ea]=n.useState("all"),[he,ra]=n.useState("all"),[$,Vr]=n.useState([]),[we,Yr]=n.useState(0),[Je,xr]=n.useState(!1),[Xr,Qr]=n.useState(null),Ve=n.useRef([]),Me=n.useRef(0),[z,Ye]=n.useState(()=>new Set),[Ce,Xe]=n.useState(null),[x,Ie]=n.useState(null),[ta,Zr]=n.useState(!1),[Qe,aa]=n.useState("headers"),[ee,Se]=n.useState(null),[et,se]=n.useState(null),[ke,re]=n.useState(null),k=n.useRef(null),Cr=n.useRef(null),[Q,Sr]=n.useState(null),[j,ue]=n.useState(null),[Ze,K]=n.useState(null),[pe,oa]=n.useState(()=>{try{const e=window.localStorage.getItem(Dt);return e==null?!0:e!=="0"}catch{return!0}}),[er,Fe]=n.useState(!1),rt=n.useRef(null),[tt,sa]=n.useState([]),[at,na]=n.useState(0),[rr,ia]=n.useState("all"),[Ue,la]=n.useState(""),[tr,ca]=n.useState([]),[Ee,kr]=n.useState(null),[ot,ua]=n.useState([]),[ar,or]=n.useState(!1),[Er,st]=n.useState(""),[ne,Te]=n.useState(null),nt=n.useRef(null),[sr,je]=n.useState(!1),[Oe,it]=n.useState(!1),lt=n.useRef(null),[ct,pa]=n.useState([]),da=n.useMemo(()=>No(),[]),[fa,Tr]=n.useState(!1),[Ne,ut]=n.useState(!1),[pt,nr]=n.useState(null),I=_?.capturing===!0,ir=n.useCallback((e,a)=>{let s=Et;We(u=>(s=Tt(e,u),s)),typeof a=="string"&&(ie.current=a.trim());const i=s.userAgent.trim()||ie.current;C.current.forEach(u=>{if(i)try{u.setUserAgent(i)}catch{}try{u.reload()}catch{}}),T(u=>u.map(p=>({...p,loadError:null})))},[]),qe=n.useCallback(async()=>{if(c)try{const e=await c.invoke("browserCapture:getState");e?.ok&&(xe(hr(e.state)),P(null))}catch(e){P(e instanceof Error?e.message:String(e))}},[c]),jr=n.useCallback(async e=>{if(!(!c||M)){m(e),P(null);try{const a=e==="start"?"browserCapture:start":e==="stop"?"browserCapture:stop":"browserCapture:clear",s=await c.invoke(a,e==="start"?{clear:!0}:void 0);if(!s?.ok)throw new Error(String(s?.error??t("app.browserCaptureFailed")));xe(hr(s.state)),e==="start"&&X(!0),(e==="clear"||e==="start")&&(Me.current+=1,Ve.current=[],Vr([]),Yr(0),xr(!1),Ye(new Set),Xe(null),Ie(null),se(null))}catch(a){P(a instanceof Error?a.message:String(a))}finally{m(null)}}},[M,c,t]),ye=n.useCallback(async()=>{if(c)try{await c.invoke("browserCapture:proxyCaRefresh").catch(()=>{});const e=await c.invoke("browserCapture:proxyStatus");if(!e?.ok)throw new Error(String(e?.error??t("app.browserCaptureProxyFailed")));Sr(zr(e.status)),K(null)}catch(e){K(e instanceof Error?e.message:String(e))}},[c,t]),Nr=n.useCallback(async(e,a)=>{if(!(!c||j||M)){ue(e),K(null);try{if(e==="start"&&!I){const i=await c.invoke("browserCapture:start",{clear:!1});if(!i?.ok)throw new Error(String(i?.error??t("app.browserCaptureFailed")));xe(hr(i.state))}const s=await c.invoke(e==="start"?"browserCapture:proxyStart":"browserCapture:proxyStop",e==="start"?{port:Q?.port??8888,systemProxy:a?.systemProxy===!0}:void 0);if(!s?.ok)throw new Error(String(s?.error??t("app.browserCaptureProxyFailed")));Sr(zr(s.status)),typeof s.systemProxyError=="string"&&s.systemProxyError&&K(s.systemProxyError),X(!0),await qe()}catch(s){K(s instanceof Error?s.message:String(s))}finally{ue(null)}}},[M,I,j,Q?.port,qe,c,t]),ba=n.useCallback(async e=>{if(!(!c||j)){ue("refresh"),K(null);try{const a=await c.invoke("browserCapture:proxySystemProxyToggle",{enable:e});if(!a?.ok)throw new Error(String(a?.error??t("app.browserCaptureProxyFailed")));a.status&&Sr(zr(a.status))}catch(a){K(a instanceof Error?a.message:String(a))}finally{ue(null)}}},[j,c,t]),ma=n.useCallback(async(e=!1,a="user")=>{if(!c||j)return;const s=e?"app.browserCaptureCaUninstallConfirm":a==="machine"?"app.browserCaptureCaInstallMachineConfirm":"app.browserCaptureCaInstallConfirm",i=e?"Remove the Async capture root certificate from the trust store?":a==="machine"?"Install the Async capture root CA system-wide? This requires administrator rights.":"Install the Async capture root CA into your user trust store? Windows/macOS will ask you to confirm.",u=(()=>{const p=t(s);return p&&p!==s?p:i})();if(!(typeof window<"u"&&typeof window.confirm=="function"&&!window.confirm(u))){ue("ca"),K(null);try{const p=e?"browserCapture:proxyCaUninstall":"browserCapture:proxyCaInstall",f=await c.invoke(p,{scope:a});if(!f?.ok)throw new Error(String(f?.error??t("app.browserCaptureProxyCaFailed")));await ye()}catch(p){K(p instanceof Error?p.message:String(p))}finally{ue(null)}}},[j,ye,c,t]),ha=n.useCallback(async e=>{if(c)try{const a=await c.invoke("browserCapture:proxyCopySnippet",{kind:e});if(!a?.ok)throw new Error(String(a?.error??"copy failed"));re(`snippet:${e}`),k.current!=null&&window.clearTimeout(k.current),k.current=window.setTimeout(()=>{re(null),k.current=null},1400)}catch(a){K(a instanceof Error?a.message:String(a))}},[c]),wa=n.useCallback(async()=>{if(!(!c||j)){ue("ca"),K(null);try{const e=await c.invoke("browserCapture:proxyExportCa");if(!e?.ok||!e.ca||typeof e.ca!="object")throw new Error(String(e?.error??t("app.browserCaptureProxyCaFailed")));const a=e.ca,s=typeof a.pem=="string"?a.pem:"";if(!s)throw new Error(t("app.browserCaptureProxyCaFailed"));$t(typeof a.fileName=="string"&&a.fileName?a.fileName:"async-capture-ca.pem",typeof a.mimeType=="string"&&a.mimeType?a.mimeType:"application/x-pem-file",s),re("ca"),k.current!=null&&window.clearTimeout(k.current),k.current=window.setTimeout(()=>{re(null),k.current=null},1400),await ye()}catch(e){K(e instanceof Error?e.message:String(e))}finally{ue(null)}}},[j,ye,c,t]),ya=n.useCallback((e,a)=>{!c||!a.length||c.invoke("browserCapture:hookIngest",{tabId:e,events:a}).catch(()=>{})},[c]),ga=n.useCallback((e,a)=>{!c||!a||typeof a!="object"||c.invoke("browserCapture:storageIngest",{tabId:e,snapshot:a}).catch(()=>{})},[c]),$e=n.useCallback(async()=>{if(c)try{const e=await c.invoke("browserCapture:sessionsList");e?.ok&&Array.isArray(e.sessions)&&ua(e.sessions.filter(a=>!!(a&&typeof a=="object")).map(a=>({id:String(a.id??""),name:typeof a.name=="string"?a.name:"(untitled)",createdAt:Number(a.createdAt)||0,updatedAt:Number(a.updatedAt)||0,requestCount:Number(a.requestCount)||0,hookEventCount:Number(a.hookEventCount)||0,storageHostCount:Number(a.storageHostCount)||0,note:typeof a.note=="string"?a.note:null})))}catch{}},[c]),va=n.useCallback(async()=>{if(!(!c||ne)){Te("save");try{const e=`Capture ${new Date().toLocaleString()}`,a=Er.trim()||e;(await c.invoke("browserCapture:sessionsSave",{name:a}))?.ok&&(st(""),await $e())}catch{}finally{Te(null)}}},[ne,Er,$e,c]),xa=n.useCallback(async e=>{if(!(!c||ne)){Te("load");try{const a=await c.invoke("browserCapture:sessionsLoad",{id:e});a?.ok&&(a.state&&xe(hr(a.state)),or(!1),X(!0))}catch{}finally{Te(null)}}},[ne,c]),Ca=n.useCallback(async e=>{if(!(!c||ne)){Te("delete");try{await c.invoke("browserCapture:sessionsDelete",{id:e}),await $e()}catch{}finally{Te(null)}}},[ne,$e,c]),Ar=n.useCallback(async()=>{if(c)try{const e=await c.invoke("browserCapture:storageList");if(e?.ok&&Array.isArray(e.snapshots)){const a=e.snapshots.map(s=>{const i=s&&typeof s=="object"?s:{},u=Array.isArray(i.localStorage)?i.localStorage:[],p=Array.isArray(i.sessionStorage)?i.sessionStorage:[];return{id:typeof i.id=="string"?i.id:`storage:${Math.random()}`,tabId:typeof i.tabId=="string"?i.tabId:null,host:typeof i.host=="string"?i.host:"",url:typeof i.url=="string"?i.url:"",ts:typeof i.ts=="number"?i.ts:0,cookies:typeof i.cookies=="string"?i.cookies:"",localStorage:u.filter(f=>f&&typeof f=="object").map(f=>({key:typeof f.key=="string"?f.key:"",value:typeof f.value=="string"?f.value:""})),sessionStorage:p.filter(f=>f&&typeof f=="object").map(f=>({key:typeof f.key=="string"?f.key:"",value:typeof f.value=="string"?f.value:""}))}});ca(a),a.length>0&&(!Ee||!a.some(s=>s.host===Ee))?kr(a[0].host):a.length===0&&kr(null)}}catch{}},[Ee,c]),Rr=n.useCallback(async()=>{if(c)try{const e=await c.invoke("browserCapture:hookList",{offset:0,limit:200,category:rr,query:Ue.trim()||void 0});if(e?.ok&&e.result){const a=Array.isArray(e.result.items)?e.result.items:[];sa(a.map(s=>{const i=s&&typeof s=="object"?s:{};return{id:typeof i.id=="string"?i.id:`hook-${Math.random()}`,seq:typeof i.seq=="number"?i.seq:0,tabId:typeof i.tabId=="string"?i.tabId:null,ts:typeof i.ts=="number"?i.ts:0,url:typeof i.url=="string"?i.url:"",category:typeof i.category=="string"?i.category:"unknown",label:typeof i.label=="string"?i.label:"event",args:typeof i.args=="string"?i.args:"",result:typeof i.result=="string"?i.result:null,stack:typeof i.stack=="string"?i.stack:""}})),na(typeof e.result.total=="number"?e.result.total:a.length)}}catch{}},[rr,Ue,c]),Lr=n.useCallback(async(e="replace")=>{if(!c)return;const a=e==="append",s=++Me.current,i=a?Ve.current.length:0;xr(!0),Qr(null);try{const u=await c.invoke("browserCapture:listRequests",{query:oe,statusGroup:fe==="all"?void 0:fe,source:be==="all"?void 0:be,method:me==="all"?void 0:me,resourceType:he==="all"?void 0:he,offset:i,limit:_o});if(!u?.ok)throw new Error(String(u?.error??t("app.browserCaptureListFailed")));const p=Io(u.result);if(s!==Me.current)return;const f=a?Uo(Ve.current,p.items):p.items;Ve.current=f,Vr(f),Yr(p.total),Ye(L=>{if(L.size<=0)return L;const J=new Set(f.map(ze=>ze.id)),Be=new Set(Array.from(L).filter(ze=>J.has(ze)));return Be.size===L.size?L:Be}),Xe(L=>L&&f.some(J=>J.id===L)?L:f[0]?.id??null)}catch(u){s===Me.current&&Qr(u instanceof Error?u.message:String(u))}finally{s===Me.current&&xr(!1)}},[me,oe,he,be,fe,c,t]),dt=n.useCallback(async e=>{if(!c||!e){Ie(null);return}Zr(!0);try{const a=await c.invoke("browserCapture:getRequest",{requestId:e});if(!a?.ok)throw new Error(String(a?.error??t("app.browserCaptureRequestNotFound")));Ie(Qt(a.request))}catch{Ie(null)}finally{Zr(!1)}},[c,t]),Sa=n.useCallback(async()=>{if(!(!c||Ne)){ut(!0),nr(null);try{const e=await c.invoke("browser:clearData");if(!e?.ok)throw new Error(String(e?.error??t("app.browserClearDataFailed")));Tr(!1),T(a=>a.map(s=>({...s,isLoading:!0,loadError:null}))),C.current.forEach(a=>{try{a.reload()}catch{}})}catch(e){nr(e instanceof Error?e.message:String(e))}finally{ut(!1)}}},[Ne,c,t]),ft=n.useCallback((e,a=1e4)=>{const s=Date.now();return new Promise((i,u)=>{const p=()=>{const f=C.current.get(e);if(f){i(f);return}if(Date.now()-s>=a){u(new Error("Timed out waiting for browser tab to become ready."));return}window.setTimeout(p,50)};p()})},[]),lr=n.useCallback((e,a,s=15e3)=>Y.current.find(u=>u.id===a)?.isLoading?new Promise((u,p)=>{const f=()=>{window.clearTimeout(Be),e.removeEventListener("did-stop-loading",L),e.removeEventListener("did-fail-load",J)},L=()=>{f(),u()},J=ze=>{const qr=ze;qr.isMainFrame===!1||qr.errorCode===-3||(f(),p(new Error(String(qr.errorDescription??t("app.browserLoadFailed")))))},Be=window.setTimeout(()=>{f(),p(new Error("Timed out waiting for page load to finish."))},s);e.addEventListener("did-stop-loading",L),e.addEventListener("did-fail-load",J)}):Promise.resolve(),[t]),bt=n.useCallback(async(e,a)=>{const s=Math.min(Math.max(500,Math.floor(a.maxChars??12e3)),5e4),i=`
				(() => {
					const args = ${JSON.stringify({selector:a.selector??"",includeHtml:a.includeHtml===!0,maxChars:s})};
					const root = args.selector ? document.querySelector(args.selector) : (document.body || document.documentElement);
					if (!root) {
						return {
							ok: false,
							error: args.selector ? 'Selector did not match any element.' : 'Page body is unavailable.',
						};
					}
					const rawText = String(root.innerText || root.textContent || '');
					const htmlText = args.includeHtml
						? String(root.outerHTML || root.innerHTML || '').slice(0, Math.min(args.maxChars, 30000))
						: '';
					const headings = Array.from(document.querySelectorAll('h1, h2, h3'))
						.map((el) => String(el.textContent || '').trim())
						.filter(Boolean)
						.slice(0, 20);
					const links = Array.from(root.querySelectorAll('a[href]'))
						.map((el) => ({
							text: String(el.textContent || '').trim(),
							href: String(el.getAttribute('href') || '').trim(),
						}))
						.filter((item) => item.href)
						.slice(0, 20);
					const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
					return {
						ok: true,
						url: location.href,
						title: document.title || '',
						lang: document.documentElement?.lang || '',
						selector: args.selector || null,
						metaDescription: metaDescription || '',
						text: rawText,
						totalTextLength: rawText.length,
						headings,
						links,
						html: htmlText || undefined,
					};
				})()
			`,u=await e.executeJavaScript(i,!0);if(u?.ok===!1)throw new Error(String(u.error??"Failed to read page content."));const p=Mo(String(u?.text??""),s);return{url:String(u?.url??te(e)),title:String(u?.title??""),lang:String(u?.lang??""),selector:u?.selector??null,metaDescription:String(u?.metaDescription??""),totalTextLength:Number(u?.totalTextLength??p.length)||p.length,text:p,headings:Array.isArray(u?.headings)?u.headings:[],links:Array.isArray(u?.links)?u.links:[],...a.includeHtml?{html:String(u?.html??"")}:{}}},[]),mt=n.useCallback(async(e,a)=>{const s=`
				(() => {
					const args = ${JSON.stringify({selector:a.selector})};
					const target = document.querySelector(args.selector);
					if (!target) {
						return { ok: false, error: 'Selector did not match any element.' };
					}
					if (!(target instanceof HTMLElement)) {
						return { ok: false, error: 'Matched node is not an HTMLElement.' };
					}
					target.scrollIntoView({ block: 'center', inline: 'center', behavior: 'instant' });
					const rect = target.getBoundingClientRect();
					const cx = Math.round(rect.left + rect.width / 2);
					const cy = Math.round(rect.top + rect.height / 2);
					try {
						const cursor = window.__asyncAiCursor;
						if (cursor && typeof cursor.moveTo === 'function') {
							const labelText = String(target.innerText || target.textContent || target.getAttribute('aria-label') || target.tagName.toLowerCase()).trim().slice(0, 40);
							if (typeof cursor.label === 'function') cursor.label('点击 ' + (labelText || '元素'), 1800);
							cursor.show();
							// fire-and-forget; 渲染器侧 sleep 再发 click 脚本
							Promise.resolve(cursor.moveTo(cx, cy)).then(() => cursor.click(cx, cy)).catch(() => {});
						}
					} catch { /* decorative */ }
					return { ok: true, cx, cy };
				})()
			`,i=await e.executeJavaScript(s,!1);if(i?.ok===!1)throw new Error(String(i.error??"Failed to locate element."));await new Promise(f=>setTimeout(f,850));const u=`
				(() => {
					const args = ${JSON.stringify({selector:a.selector})};
					const target = document.querySelector(args.selector);
					if (!target || !(target instanceof HTMLElement)) {
						return { ok: false, error: 'Element no longer present.' };
					}
					target.focus?.();
					const rect = target.getBoundingClientRect();
					const cx = Math.round(rect.left + rect.width / 2);
					const cy = Math.round(rect.top + rect.height / 2);
					const beforeUrl = location.href;
					const beforeTitle = document.title || '';
					if (typeof target.click === 'function') {
						target.click();
					} else {
						target.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
					}
					return {
						ok: true,
						selector: args.selector,
						tagName: target.tagName.toLowerCase(),
						text: String(target.innerText || target.textContent || '').trim().slice(0, 500),
						href: target instanceof HTMLAnchorElement ? target.href : '',
						x: cx,
						y: cy,
						urlBefore: beforeUrl,
						titleBefore: beforeTitle,
						urlAfter: location.href,
						titleAfter: document.title || '',
					};
				})()
			`,p=await e.executeJavaScript(u,!0);if(p?.ok===!1)throw new Error(String(p.error??"Failed to click element."));return{url:String(p?.urlAfter??te(e)),title:String(p?.titleAfter??""),selector:String(p?.selector??a.selector),tagName:String(p?.tagName??""),text:String(p?.text??""),href:String(p?.href??""),clickPoint:{x:Number(p?.x??0)||0,y:Number(p?.y??0)||0},urlBefore:String(p?.urlBefore??""),urlAfter:String(p?.urlAfter??te(e))}},[]),ht=n.useCallback(async(e,a)=>{const s=`
				(() => {
					const args = ${JSON.stringify({selector:a.selector})};
					const target = document.querySelector(args.selector);
					if (!target) return { ok: false, error: 'Selector did not match any element.' };
					if (!(target instanceof HTMLElement)) return { ok: false, error: 'Matched node is not an HTMLElement.' };
					target.scrollIntoView({ block: 'center', inline: 'center', behavior: 'instant' });
					const rect = target.getBoundingClientRect();
					const cx = Math.round(rect.left + rect.width / 2);
					const cy = Math.round(rect.top + rect.height / 2);
					try {
						const cursor = window.__asyncAiCursor;
						if (cursor && typeof cursor.moveTo === 'function') {
							const labelHint = target.getAttribute('placeholder') || target.getAttribute('aria-label') || target.getAttribute('name') || target.tagName.toLowerCase();
							if (typeof cursor.label === 'function') cursor.label('填写 ' + String(labelHint).slice(0, 40), 2000);
							cursor.show();
							Promise.resolve(cursor.moveTo(cx, cy)).then(() => cursor.click(cx, cy)).catch(() => {});
						}
					} catch { /* decorative */ }
					return { ok: true, cx, cy };
				})()
			`,i=await e.executeJavaScript(s,!1);if(i?.ok===!1)throw new Error(String(i.error??"Failed to locate input."));await new Promise(f=>setTimeout(f,850));const u=`
				(() => {
					const args = ${JSON.stringify({selector:a.selector,text:a.text,pressEnter:a.pressEnter===!0})};
					const target = document.querySelector(args.selector);
					if (!target) {
						return { ok: false, error: 'Selector did not match any element.' };
					}
					if (!(target instanceof HTMLElement)) {
						return { ok: false, error: 'Matched node is not an HTMLElement.' };
					}
					const dispatchInput = (el) => {
						el.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
						el.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
					};
					const setNativeValue = (el, value) => {
						const proto =
							el instanceof HTMLTextAreaElement
								? HTMLTextAreaElement.prototype
								: el instanceof HTMLInputElement
									? HTMLInputElement.prototype
									: el instanceof HTMLSelectElement
										? HTMLSelectElement.prototype
										: null;
						const descriptor = proto ? Object.getOwnPropertyDescriptor(proto, 'value') : null;
						if (descriptor?.set) {
							descriptor.set.call(el, value);
						} else {
							el.value = value;
						}
					};
					const cursor = window.__asyncAiCursor;
					target.focus?.();
					let mode = 'unknown';
					const isFormControl =
						target instanceof HTMLInputElement ||
						target instanceof HTMLTextAreaElement ||
						target instanceof HTMLSelectElement;
					const useEditable = !isFormControl && target.isContentEditable;
					mode = isFormControl
						? target instanceof HTMLTextAreaElement
							? 'textarea'
							: target instanceof HTMLSelectElement
								? 'select'
								: 'input'
						: useEditable
							? 'contenteditable'
							: 'value' in target
								? 'value-property'
								: 'textContent';
					if (isFormControl) {
						setNativeValue(target, args.text);
						dispatchInput(target);
					} else if (useEditable) {
						target.textContent = args.text;
						dispatchInput(target);
					} else if ('value' in target) {
						try { target.value = args.text; dispatchInput(target); }
						catch { target.textContent = args.text; dispatchInput(target); }
					} else {
						target.textContent = args.text;
						dispatchInput(target);
					}
					// HUD 逐字滚出来（fire-and-forget；脚本同步返回，不阻塞 IPC）
					try {
						if (cursor && typeof cursor.key === 'function' && args.text.length > 0) {
							const stagger = args.text.length > 60 ? 35 : 70;
							for (let i = 0; i < args.text.length; i++) {
								const ch = args.text.charAt(i);
								setTimeout(() => { try { cursor.key(ch); } catch { /* */ } }, i * stagger);
							}
						}
					} catch { /* decorative */ }
					if (args.pressEnter) {
						const keyboardInit = {
							key: 'Enter',
							code: 'Enter',
							keyCode: 13,
							which: 13,
							bubbles: true,
							cancelable: true,
						};
						try {
							if (cursor && typeof cursor.key === 'function') {
								const enterDelay = args.text.length * (args.text.length > 60 ? 35 : 70);
								setTimeout(() => { try { cursor.key('Enter'); } catch { /* */ } }, enterDelay);
							}
						} catch { /* decorative */ }
						target.dispatchEvent(new KeyboardEvent('keydown', keyboardInit));
						target.dispatchEvent(new KeyboardEvent('keypress', keyboardInit));
						target.dispatchEvent(new KeyboardEvent('keyup', keyboardInit));
						const form = target.closest('form');
						if (form instanceof HTMLFormElement) {
							if (typeof form.requestSubmit === 'function') {
								form.requestSubmit();
							} else {
								form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
							}
						}
					}
					const value =
						target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement
							? target.value
							: target.isContentEditable
								? String(target.textContent || '')
								: 'value' in target
									? String(target.value ?? '')
									: String(target.textContent || '');
					return {
						ok: true,
						selector: args.selector,
						mode,
						tagName: target.tagName.toLowerCase(),
						value,
						pressEnter: args.pressEnter,
						url: location.href,
						title: document.title || '',
					};
				})()
			`,p=await e.executeJavaScript(u,!0);if(p?.ok===!1)throw new Error(String(p.error??"Failed to input text."));return{url:String(p?.url??te(e)),title:String(p?.title??""),selector:String(p?.selector??a.selector),mode:String(p?.mode??""),tagName:String(p?.tagName??""),value:String(p?.value??a.text),pressEnter:p?.pressEnter===!0}},[]),wt=n.useCallback(async(e,a)=>{const s=Math.min(Math.max(500,Math.floor(a.timeoutMs??2e4)),6e4),i=`
				(() => {
					const args = ${JSON.stringify({selector:a.selector,visible:a.visible===!0,timeoutMs:s})};
					const root = document.documentElement || document.body;
					if (!root) {
						return Promise.resolve({
							ok: false,
							error: 'Document root is unavailable.',
						});
					}
					const isVisible = (el) => {
						if (!(el instanceof HTMLElement)) {
							return false;
						}
						const style = window.getComputedStyle(el);
						if (!style || style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
							return false;
						}
						const rect = el.getBoundingClientRect();
						return rect.width > 0 && rect.height > 0;
					};
					const snapshot = (el) => {
						const rect = el instanceof HTMLElement ? el.getBoundingClientRect() : { width: 0, height: 0 };
						return {
							ok: true,
							selector: args.selector,
							tagName: el instanceof Element ? el.tagName.toLowerCase() : '',
							text: el instanceof Element ? String(el.innerText || el.textContent || '').trim().slice(0, 500) : '',
							visible: isVisible(el),
							url: location.href,
							title: document.title || '',
							width: Math.round(rect.width || 0),
							height: Math.round(rect.height || 0),
						};
					};
					const findMatch = () => {
						const el = document.querySelector(args.selector);
						if (!el) {
							return null;
						}
						if (args.visible && !isVisible(el)) {
							return null;
						}
						return el;
					};
					const immediate = findMatch();
					if (immediate) {
						return Promise.resolve(snapshot(immediate));
					}
					return new Promise((resolve) => {
						const observer = new MutationObserver(() => {
							const match = findMatch();
							if (!match) {
								return;
							}
							cleanup();
							resolve(snapshot(match));
						});
						const cleanup = () => {
							window.clearTimeout(timer);
							observer.disconnect();
						};
						const timer = window.setTimeout(() => {
							cleanup();
							resolve({
								ok: false,
								error: args.visible
									? 'Timed out waiting for a visible element matching the selector.'
									: 'Timed out waiting for an element matching the selector.',
							});
						}, args.timeoutMs);
						observer.observe(root, {
							childList: true,
							subtree: true,
							attributes: true,
							attributeFilter: ['class', 'style', 'hidden', 'aria-hidden'],
						});
					});
				})()
			`,u=await e.executeJavaScript(i,!0);if(u?.ok===!1)throw new Error(String(u.error??"Failed while waiting for selector."));return{url:String(u?.url??te(e)),title:String(u?.title??""),selector:String(u?.selector??a.selector),tagName:String(u?.tagName??""),text:String(u?.text??""),visible:u?.visible===!0,size:{width:Number(u?.width??0)||0,height:Number(u?.height??0)||0},timeoutMs:s}},[]),yt=n.useCallback(async e=>{const a=await e.capturePage(),s=a.getSize();return{url:te(e),title:Y.current.find(i=>C.current.get(i.id)===e)?.pageTitle??"",width:s.width,height:s.height,dataUrl:a.toDataURL()}},[]);n.useEffect(()=>{let e=!1;return c?(c.invoke("browser:getConfig").then(a=>{if(e)return;const s=a;if(s.ok&&s.partition){const i=Tt(s.config);de(s.partition),We(i),ie.current=String(s.defaultUserAgent??"").trim()}else de("async-agent-browser-fallback");q(!0)}).catch(()=>{e||(de("async-agent-browser-fallback"),q(!0))}),()=>{e=!0}):(de("async-agent-browser-fallback"),q(!0),()=>{e=!0})},[c]),n.useEffect(()=>{qe();const e=window.setInterval(()=>{qe()},_?.capturing?1200:4e3);return()=>{window.clearInterval(e)}},[_?.capturing,qe]),n.useEffect(()=>{if(ye(),!Q?.running)return;const e=window.setInterval(()=>{ye()},15e3);return()=>{window.clearInterval(e)}},[Q?.running,ye]),n.useEffect(()=>{try{window.localStorage.setItem(Pt,R?"1":"0")}catch{}},[R]),n.useEffect(()=>{try{window.localStorage.setItem(Bt,String(ce))}catch{}},[ce]),n.useEffect(()=>{try{window.localStorage.setItem(Ht,v)}catch{}},[v]),n.useEffect(()=>{try{window.localStorage.setItem(Dt,pe?"1":"0")}catch{}},[pe]),n.useEffect(()=>{if(!er)return;const e=s=>{const i=rt.current;i&&s.target instanceof Node&&!i.contains(s.target)&&Fe(!1)},a=s=>{s.key==="Escape"&&Fe(!1)};return window.addEventListener("mousedown",e),window.addEventListener("keydown",a),()=>{window.removeEventListener("mousedown",e),window.removeEventListener("keydown",a)}},[er]),n.useEffect(()=>{if(!ar)return;const e=s=>{const i=nt.current;i&&s.target instanceof Node&&!i.contains(s.target)&&or(!1)},a=s=>{s.key==="Escape"&&or(!1)};return window.addEventListener("mousedown",e),window.addEventListener("keydown",a),()=>{window.removeEventListener("mousedown",e),window.removeEventListener("keydown",a)}},[ar]),n.useEffect(()=>{if(!sr)return;const e=s=>{const i=lt.current;i&&s.target instanceof Node&&!i.contains(s.target)&&je(!1)},a=s=>{s.key==="Escape"&&je(!1)};return window.addEventListener("mousedown",e),window.addEventListener("keydown",a),()=>{window.removeEventListener("mousedown",e),window.removeEventListener("keydown",a)}},[sr]),n.useEffect(()=>()=>{k.current!=null&&window.clearTimeout(k.current)},[]),n.useEffect(()=>{if(!R||v!=="requests")return;const e=window.setTimeout(()=>{Lr()},oe.trim()?180:0);return()=>{window.clearTimeout(e)}},[R,v,oe,_?.pendingRequestCount,_?.requestCount,Lr]),n.useEffect(()=>{if(!R||v!=="storage")return;Ar();const e=window.setInterval(()=>{Ar()},3e3);return()=>{window.clearInterval(e)}},[R,v,_?.storageHostCount,Ar]),n.useEffect(()=>{if(!R||v!=="hooks")return;const e=window.setTimeout(()=>{Rr()},Ue.trim()?180:0),a=window.setInterval(()=>{Rr()},1500);return()=>{window.clearTimeout(e),window.clearInterval(a)}},[R,v,Ue,rr,_?.hookEventCount,Rr]),n.useEffect(()=>{if(!Ce){Ie(null);return}dt(Ce)},[dt,Ce]);const H=n.useCallback(async(e,a)=>{const s=String(a??"").trim();if(!s)return;let i=!1;try{i=(await c?.invoke("clipboard:writeText",s))?.ok===!0}catch{}if(!i)try{await navigator.clipboard.writeText(s),i=!0}catch{}i&&(re(e),k.current!=null&&window.clearTimeout(k.current),k.current=window.setTimeout(()=>{re(null),k.current=null},1200))},[c]),Ae=n.useCallback(async()=>{if(!c)return{requests:[],scope:{}};const e=Array.from(z),a=e.length>0?{requestIds:e}:{query:oe.trim(),statusGroup:fe==="all"?void 0:fe,source:be==="all"?void 0:be,method:me==="all"?void 0:me,resourceType:he==="all"?void 0:he},s=await c.invoke("browserCapture:exportRequests",{...a,offset:0,limit:500});if(!s?.ok)throw new Error(String(s?.error??t("app.browserCaptureExportFailed")));return{requests:Fo(s.requests),scope:a}},[me,oe,he,be,fe,z,c,t]),ka=n.useCallback(async()=>{if(!ee){Se("curl"),se(null);try{const{requests:e}=await Ae();if(e.length<=0)throw new Error(t("app.browserCaptureNoExportableRequests"));await H("curl",e.map(Ot).join(`

`))}catch(e){se(e instanceof Error?e.message:String(e))}finally{Se(null)}}},[ee,H,Ae,t]),gt=n.useCallback(async e=>{if(!ee){Se(e),se(null);try{const{requests:a,scope:s}=await Ae();if(a.length<=0)throw new Error(t("app.browserCaptureNoExportableRequests"));const i=e==="har"?Wo(a):Ko(a,s);$t(Jo(e),e==="har"?"application/har+json":"application/json",i)}catch(a){se(a instanceof Error?a.message:String(a))}finally{Se(null)}}},[ee,Ae,t]),Ea=n.useCallback(async()=>{if(!(ee||!c)){Se("agent"),se(null);try{const{requests:e}=await Ae();if(e.length<=0)throw new Error(t("app.browserCaptureNoExportableRequests"));const a=z.size>0?t("app.browserCaptureSelectedCount",{count:String(z.size)}):t("app.browserCaptureFilteredCount",{count:String(we)}),s=zo(e,a,t),i=await c.invoke("composer:appendDraft",{text:s});if(!i?.ok)throw new Error(String(i?.error??t("app.browserCaptureSendFailed")));re("agent"),k.current!=null&&window.clearTimeout(k.current),k.current=window.setTimeout(()=>{re(null),k.current=null},1200)}catch(e){se(e instanceof Error?e.message:String(e))}finally{Se(null)}}},[ee,we,Ae,z,c,t]),Ta=n.useCallback(async e=>{if(!(!c||Oe)){it(!0),se(null);try{const a=z.size>0?Array.from(z):void 0,s=await c.invoke("browserCapture:analyze",{mode:e,requestIds:a,deliver:!0});if(!s?.ok)throw new Error(String(s?.error??t("app.browserCaptureSendFailed")));je(!1),re(`analyze:${e}`),k.current!=null&&window.clearTimeout(k.current),k.current=window.setTimeout(()=>{re(null),k.current=null},1400),window.setTimeout(()=>{Ge()},600)}catch(a){se(a instanceof Error?a.message:String(a))}finally{it(!1)}}},[Oe,z,c,t]),Ge=n.useCallback(async()=>{if(c)try{const e=await c.invoke("browserCapture:analysisList");e?.ok&&Array.isArray(e.entries)&&pa(e.entries.filter(a=>!!(a&&typeof a=="object")).map(a=>({id:String(a.id??""),threadId:String(a.threadId??""),mode:typeof a.mode=="string"?a.mode:"auto",title:typeof a.title=="string"?a.title:"Capture analysis",sourceUrl:typeof a.sourceUrl=="string"?a.sourceUrl:"",createdAt:Number(a.createdAt)||0})))}catch{}},[c]);n.useEffect(()=>{Ge()},[Ge]);const ja=n.useCallback(async e=>{if(!(!c||!e.threadId))try{await c.invoke("threads:select",e.threadId).catch(()=>{}),window.dispatchEvent(new CustomEvent("async-shell:focusThread",{detail:{threadId:e.threadId}}))}catch{}},[c]),Na=n.useCallback(async e=>{if(!(!c||!e))try{await c.invoke("browserCapture:analysisRemove",{id:e}),await Ge()}catch{}},[Ge,c]),_r=n.useCallback((e,a)=>{Ye(s=>{const i=new Set(s);return a?i.add(e):i.delete(e),i})},[]),Aa=n.useCallback(()=>{Ye(e=>{const a=$.map(u=>u.id);if(a.length<=0)return e;const s=a.every(u=>e.has(u)),i=new Set(e);for(const u of a)s?i.delete(u):i.add(u);return i})},[$]),Ra=n.useCallback(e=>{e.preventDefault(),X(!0);const a=e.clientY,s=ce,i=e.currentTarget.closest(".ref-browser-panel"),u=i instanceof HTMLElement?i.clientHeight:window.innerHeight,p=Math.min(Yt,Math.max(Vt,Math.round(u*.62))),f=J=>{const Be=a-J.clientY;W(Gt(s+Be,p))},L=()=>{window.removeEventListener("pointermove",f),window.removeEventListener("pointerup",L),document.body.classList.remove("is-resizing-browser-capture-dock")};document.body.classList.add("is-resizing-browser-capture-dock"),window.addEventListener("pointermove",f),window.addEventListener("pointerup",L)},[ce]),La=n.useCallback((e,a)=>{if(a){if(C.current.set(e,a),!ie.current)try{ie.current=String(a.getUserAgent?.()??"").trim()}catch{}}else C.current.delete(e)},[]),_a=n.useCallback((e,a)=>{const s=typeof document<"u"&&document.activeElement===U.current,i=e===G.current&&s;T(u=>u.map(p=>{if(p.id!==e)return p;const f=a.currentUrl||p.currentUrl;return{...p,currentUrl:f,draftUrl:i?p.draftUrl:f,canGoBack:a.canGoBack,canGoForward:a.canGoForward,loadError:null}}))},[]),Pa=n.useCallback((e,a)=>{T(s=>s.map(i=>i.id===e?{...i,pageTitle:a}:i))},[]),Ba=n.useCallback((e,a,s)=>{T(i=>i.map(u=>{if(u.id!==e)return u;const p={...u,isLoading:a};if(a)p.loadError=null;else if(s&&s!==u.currentUrl){const f=typeof document<"u"&&document.activeElement===U.current,L=e===G.current&&f;p.currentUrl=s,L||(p.draftUrl=s)}return p}))},[]),Ha=n.useCallback((e,a)=>{T(s=>s.map(i=>i.id!==e?i:{...i,isLoading:!1,currentUrl:a.url||i.currentUrl,loadError:a}))},[]),vt=n.useCallback(e=>{const a=String(e.error??"").trim();if(a){y({kind:"error",message:a});return}const s=String(e.url??"").trim();s&&y({kind:"info",url:s})},[]),cr=n.useCallback(async e=>{const a=Gr(String(e??"").trim());if(!_t(a))return!1;if(!c?.invoke)return y({kind:"error",message:t("app.browserGoogleLoginExternalFailed")}),!0;try{const s=await c.invoke("shell:openExternalUrl",a);return!s||s.ok===!1?(y({kind:"error",message:String(s?.error??t("app.browserGoogleLoginExternalFailed"))}),!0):(y({kind:"info",url:a}),!0)}catch(s){return y({kind:"error",message:s instanceof Error?s.message:t("app.browserGoogleLoginExternalFailed")}),!0}},[c,t]),ur=n.useCallback(e=>{const a=String(e??"").trim();a&&(async()=>{if(await cr(a))return;const s=wr(a);T(i=>[...i,s]),V(s.id)})()},[cr]),pr=n.useCallback((e,a)=>{(async()=>{const s=Gr(a);if(await cr(s)){T(p=>p.map(f=>f.id===e?{...f,isLoading:!1,loadError:null,draftUrl:f.currentUrl||f.draftUrl}:f));return}const u=(Y.current.find(p=>p.id===e)??null)?.requestedUrl===s;V(e),T(p=>p.map(f=>f.id!==e?f:{...f,requestedUrl:s,currentUrl:s,draftUrl:s,pageTitle:"",isLoading:!0,canGoBack:!1,canGoForward:!1,loadError:null})),u&&C.current.get(e)?.reload()})()},[cr]);n.useEffect(()=>{const e=c?.subscribeBrowserNewWindow;if(!e)return;const a=e(s=>{ur(String(s?.url??""))});return()=>{a?.()}},[c,ur]),n.useEffect(()=>{const e=c?.subscribeGoogleLoginExternal;if(!e)return;const a=e(s=>{vt({url:String(s?.url??""),error:s?.error??null})});return()=>{a?.()}},[c,vt]);const Pr=n.useCallback(()=>{const e=wr();T(a=>[...a,e]),V(e.id),window.setTimeout(()=>{U.current?.focus(),U.current?.select()},50)},[]),Re=n.useCallback(e=>{const a=Y.current,s=a.findIndex(u=>u.id===e);if(s<0)return;if(C.current.delete(e),a.length<=1){const u=wr();T([u]),V(u.id),window.setTimeout(()=>{U.current?.focus(),U.current?.select()},50);return}const i=a.filter(u=>u.id!==e);if(T(i),G.current===e){const u=i[Math.min(s,i.length-1)];V(u.id)}},[]),xt=n.useCallback(e=>{V(e)},[]),g=O.find(e=>e.id===S)??O[0],Br=()=>g?C.current.get(g.id)??null:null,Da=n.useCallback(e=>{T(a=>a.map(s=>s.id===S?{...s,draftUrl:e}:s))},[S]),Ma=n.useCallback(e=>{e.preventDefault(),g&&(U.current?.blur(),pr(S,g.draftUrl))},[g,S,pr]),Ia=n.useCallback(e=>{e.key==="Escape"&&(e.preventDefault(),g&&T(a=>a.map(s=>s.id===S?{...s,draftUrl:s.currentUrl}:s)),e.currentTarget.blur())},[g,S]);n.useEffect(()=>{const e=a=>{const s=a.key.toLowerCase(),i=a.ctrlKey||a.metaKey;if(i&&s==="l"){a.preventDefault(),U.current?.focus(),U.current?.select();return}const u=a.target;if(!(u instanceof HTMLElement&&(u.closest("input, textarea, select")||u.isContentEditable))){if(i&&s==="t"){a.preventDefault(),Pr();return}if(i&&s==="w"){a.preventDefault();const f=G.current;f&&Re(f);return}if(i&&s==="r"||a.key==="F5"){a.preventDefault();const f=G.current;if(!f)return;T(L=>L.map(J=>J.id===f?{...J,loadError:null}:J)),C.current.get(f)?.reload();return}if(a.altKey&&a.key==="ArrowLeft"){a.preventDefault();const f=C.current.get(G.current);f?.canGoBack()&&f.goBack();return}if(a.altKey&&a.key==="ArrowRight"){a.preventDefault();const f=C.current.get(G.current);f?.canGoForward()&&f.goForward()}}};return window.addEventListener("keydown",e),()=>{window.removeEventListener("keydown",e)}},[Pr,Re]),n.useEffect(()=>{const e=a=>{const s=fo(a);s&&ir(s.config,s.defaultUserAgent)};return window.addEventListener(jt,e),()=>{window.removeEventListener(jt,e)}},[ir]),n.useEffect(()=>{if(!c)return;const e={activeTabId:S,tabs:O.map(s=>({id:s.id,requestedUrl:s.requestedUrl,currentUrl:s.currentUrl,pageTitle:s.pageTitle,isLoading:s.isLoading,canGoBack:s.canGoBack,canGoForward:s.canGoForward,loadError:s.loadError})),guestBindings:O.map(s=>{const i=C.current.get(s.id);if(!i?.getWebContentsId)return null;try{const u=Number(i.getWebContentsId());return!Number.isInteger(u)||u<=0?null:{tabId:s.id,webContentsId:u}}catch{return null}}).filter(s=>!!s),updatedAt:Date.now()},a=window.setTimeout(()=>{c.invoke("browser:syncState",e).catch(()=>{})},40);return()=>{window.clearTimeout(a)}},[S,c,O]),n.useEffect(()=>{if(!h)return;const e=h,a=()=>E(e.commandId);if(e.type==="navigate"){const s=G.current,i=!!(s&&Y.current.some(u=>u.id===s));e.newTab||!i||!s?ur(Gr(e.target)):pr(s,e.target),a();return}if(e.type==="applyConfig"){ir(e.config,e.defaultUserAgent),a();return}if(e.type==="closeSidebar"){a();return}(async()=>{const s=e.tabId&&Y.current.some(u=>u.id===e.tabId)?e.tabId:G.current;if(!s){(e.type==="readPage"||e.type==="screenshotPage"||e.type==="clickElement"||e.type==="inputText"||e.type==="waitForSelector")&&await ge(c,{commandId:e.commandId,ok:!1,error:"No active browser tab is available."}),a();return}if(e.type==="closeTab"){Re(s),a();return}if(V(s),e.type==="readPage"||e.type==="screenshotPage"||e.type==="clickElement"||e.type==="inputText"||e.type==="waitForSelector"){try{const u=await ft(s);if(e.waitForLoad!==!1&&await lr(u,s),e.type==="readPage"){const p=await bt(u,{selector:e.selector,includeHtml:e.includeHtml,maxChars:e.maxChars});await ge(c,{commandId:e.commandId,ok:!0,result:p})}else if(e.type==="clickElement"){const p=await mt(u,{selector:e.selector});e.waitForLoad!==!1&&(await new Promise(f=>window.setTimeout(f,60)),await lr(u,s)),await ge(c,{commandId:e.commandId,ok:!0,result:p})}else if(e.type==="inputText"){const p=await ht(u,{selector:e.selector,text:e.text,pressEnter:e.pressEnter});e.waitForLoad!==!1&&e.pressEnter&&(await new Promise(f=>window.setTimeout(f,60)),await lr(u,s)),await ge(c,{commandId:e.commandId,ok:!0,result:p})}else if(e.type==="waitForSelector"){const p=await wt(u,{selector:e.selector,visible:e.visible,timeoutMs:e.timeoutMs});await ge(c,{commandId:e.commandId,ok:!0,result:p})}else{const p=await yt(u);await ge(c,{commandId:e.commandId,ok:!0,result:p})}}catch(u){await ge(c,{commandId:e.commandId,ok:!1,error:u instanceof Error?u.message:String(u)})}finally{a()}return}const i=C.current.get(s);e.type==="reload"?(T(u=>u.map(p=>p.id===s?{...p,loadError:null}:p)),i?.reload()):e.type==="stop"?i?.stop():e.type==="goBack"?i?.canGoBack()&&i.goBack():e.type==="goForward"&&i?.canGoForward()&&i.goForward(),a()})()},[ir,yt,mt,Re,ht,pr,E,ur,h,bt,c,wt,ft,lr]);const Fa=g?g.isLoading?t("app.browserLoading"):g.pageTitle||g.currentUrl.replace(/^https?:\/\//i,"")||t("app.tabBrowser"):t("app.tabBrowser"),Ua=g?.currentUrl??"",Oa=le.userAgent.trim()||void 0,qa=n.useMemo(()=>JSON.stringify(le.fingerprint),[le.fingerprint]),$a=n.useMemo(()=>{const e=po(le.fingerprint);return To(e)},[qa]),Ga=_?.requestCount??0,za=_?.pendingRequestCount??0,dr=Ga+za,Ka=_?.tabs.filter(e=>e.attached).length??0,Wa=_?.tabs.length??0,Ja=!!_?.tabs.some(e=>e.lastError),Va=t("app.browserTabsCount",{count:String(O.length)}),B=Q?.running===!0,fr=Q?.primaryAddress||"127.0.0.1",Hr=Q?.port??8888,br=Q?.proxyUrl||`http://${fr}:${Hr}`,Dr=Q?.caDownloadUrl||`${br.replace(/\/$/,"")}/__async_capture/ca.pem`,Ya=Ze||t(B?"app.browserCaptureProxyRunning":"app.browserCaptureProxyStopped"),Le=Q?.caInstalled===!0,_e=Q?.systemProxyEnabled===!0,Ct=pt||t("app.browserClearData"),Xa=(Ce?$.find(e=>e.id===Ce):null)??null,Z=x??Xa,St=Xr||(Je?t("app.browserCaptureLoadingRequests"):t("app.browserCaptureShowingRequests",{count:String($.length),total:String(we)})),mr=$.reduce((e,a)=>e+(z.has(a.id)?1:0),0),Qa=$.length>0&&mr===$.length,Mr=z.size,Za=Mr>0?t("app.browserCaptureSelectedCount",{count:String(Mr)}):t("app.browserCaptureFilteredCount",{count:String(we)}),kt=et||Za,Pe=!!ee||Mr<=0&&we<=0,eo=$.length<we,ro=Math.max(0,we-$.length),to=n.useMemo(()=>[{key:"all",label:t("app.browserCaptureFilterAll")},{key:"pending",label:t("app.browserCaptureFilterPending")},{key:"2xx",label:"2xx"},{key:"3xx",label:"3xx"},{key:"4xx",label:"4xx"},{key:"5xx",label:"5xx"},{key:"error",label:t("app.browserCaptureFilterError")}],[t]),ao=n.useMemo(()=>[{key:"all",label:t("app.browserCaptureFilterAll")},{key:"GET",label:"GET"},{key:"POST",label:"POST"},{key:"PUT",label:"PUT"},{key:"PATCH",label:"PATCH"},{key:"DELETE",label:"DELETE"},{key:"OPTIONS",label:"OPTIONS"},{key:"OTHER",label:t("app.browserCaptureFilterOther")}],[t]),oo=n.useMemo(()=>[{key:"all",label:t("app.browserCaptureFilterAll")},{key:"browser",label:t("app.browserCaptureSourceBrowserShort")},{key:"proxy",label:t("app.browserCaptureSourceProxyShort")}],[t]),so=n.useMemo(()=>[{key:"all",label:t("app.browserCaptureFilterAll")},{key:"document",label:t("app.browserCaptureResourceDocument")},{key:"xhr",label:"XHR"},{key:"fetch",label:"Fetch"},{key:"script",label:t("app.browserCaptureResourceScript")},{key:"stylesheet",label:t("app.browserCaptureResourceStylesheet")},{key:"image",label:t("app.browserCaptureResourceImage")},{key:"other",label:t("app.browserCaptureFilterOther")}],[t]),no=n.useMemo(()=>[{key:"headers",label:t("app.browserCaptureTabHeaders")},{key:"request",label:t("app.browserCaptureTabRequest")},{key:"response",label:t("app.browserCaptureTabResponse")}],[t]),io=n.useMemo(()=>[{key:"requests",label:t("app.browserCaptureTabRequests")},{key:"hooks",label:t("app.browserCaptureTabHooks")},{key:"storage",label:t("app.browserCaptureTabStorage")},{key:"devices",label:t("app.browserCaptureTabDevices")}],[t]);n.useEffect(()=>{Cr.current&&(Cr.current.indeterminate=mr>0&&mr<$.length)},[$.length,mr]);const lo=n.useCallback((e,a)=>{if(e.key==="Enter"){e.preventDefault(),Xe(a);return}e.key===" "&&(e.preventDefault(),_r(a,!z.has(a)))},[z,_r]),co={"--ref-browser-capture-dock-height":`${ce}px`},Ir=x?Object.entries(x.requestHeaders).sort(([e],[a])=>e.localeCompare(a)):[],Fr=x?Object.entries(x.responseHeaders).sort(([e],[a])=>e.localeCompare(a)):[],Ur=x?gr(x.requestBody):"",Or=x?gr(x.responseBody):"",uo=x?.responseBodyOmittedReason?t("app.browserCaptureResponseBodyOmitted",{reason:x.responseBodyOmittedReason}):"";return r.jsxs("div",{className:`ref-agent-review-shell ref-browser-shell ref-browser-shell--${F}`,children:[r.jsxs("div",{className:"ref-agent-review-head",children:[r.jsxs("div",{className:"ref-browser-head-main",children:[r.jsxs("div",{className:"ref-agent-review-title-stack ref-browser-title-stack",children:[r.jsxs("span",{className:"ref-agent-review-kicker",children:[r.jsx("span",{className:`ref-browser-live-dot${g?.isLoading?" is-loading":""}`,"aria-hidden":"true"}),t("app.tabBrowser")]}),r.jsx("span",{className:"ref-agent-review-title",title:Ua,children:Fa})]}),r.jsxs("div",{className:"ref-browser-head-meta","aria-label":t("app.tabBrowser"),children:[r.jsx("span",{className:"ref-browser-status-chip",children:Va}),F==="window"?null:r.jsx("span",{className:`ref-browser-status-chip${I?" is-active":""}`,children:I?t("app.browserCaptureRequestsShort",{count:String(dr)}):t("app.browserCaptureReady")})]})]}),F==="window"?r.jsx("div",{className:"ref-agent-review-actions",children:r.jsx("button",{type:"button","aria-label":t("app.browserOpenSettingsInMain"),title:t("app.browserOpenSettingsInMain"),className:"ref-right-icon-tab",onClick:w,children:r.jsx(Nt,{})})}):r.jsx(Po,{t,hasPlan:o,openView:b,closeSidebar:d,extraActions:r.jsx("button",{type:"button","aria-label":t("app.browserSettings"),title:t("app.browserSettings"),className:"ref-right-icon-tab",onClick:w,children:r.jsx(Nt,{})})})]}),r.jsx("div",{className:"ref-right-panel-stage",children:r.jsxs("div",{className:`ref-right-panel-view ref-right-panel-view--agent ref-browser-panel ref-browser-panel--${F}`,children:[De?r.jsxs("div",{className:"ref-browser-tabstrip",role:"tablist","aria-label":t("app.tabBrowser"),children:[r.jsx("div",{className:"ref-browser-tabstrip-scroll",children:O.map(e=>{const a=e.id===S,s=e.pageTitle&&e.pageTitle.trim()||(e.currentUrl?e.currentUrl.replace(/^https?:\/\//i,""):"")||t("app.browserUntitled");return r.jsxs("div",{role:"tab","aria-selected":a,tabIndex:0,className:`ref-browser-tab${a?" is-active":""}`,title:e.currentUrl||s,onClick:()=>xt(e.id),onKeyDown:i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),xt(e.id))},onMouseDown:i=>{i.button===1&&(i.preventDefault(),Re(e.id))},children:[r.jsx("span",{className:"ref-browser-tab-indicator","aria-hidden":"true",children:e.isLoading?r.jsx("span",{className:"ref-browser-tab-spinner"}):r.jsx(At,{className:"ref-browser-tab-favicon"})}),r.jsx("span",{className:"ref-browser-tab-label",children:s}),r.jsx("button",{type:"button",className:"ref-browser-tab-close","aria-label":t("app.browserCloseTab"),title:t("app.browserCloseTab"),onClick:i=>{i.stopPropagation(),Re(e.id)},children:r.jsx(Ke,{})})]},e.id)})}),r.jsx("button",{type:"button",className:"ref-browser-tabstrip-add","aria-label":t("app.browserNewTab"),title:t("app.browserNewTab"),onClick:Pr,children:r.jsx(mo,{})})]}):null,r.jsxs("div",{className:"ref-right-toolbar ref-browser-toolbar",children:[r.jsxs("div",{className:"ref-browser-toolbar-group ref-browser-toolbar-group--nav",children:[r.jsx("button",{type:"button",className:"ref-icon-tile ref-browser-tool-btn","aria-label":t("common.back"),title:t("common.back"),disabled:!g?.canGoBack,onClick:()=>{const e=Br();e?.canGoBack()&&e.goBack()},children:r.jsx(ho,{})}),r.jsx("button",{type:"button",className:"ref-icon-tile ref-browser-tool-btn","aria-label":t("app.browserForward"),title:t("app.browserForward"),disabled:!g?.canGoForward,onClick:()=>{const e=Br();e?.canGoForward()&&e.goForward()},children:r.jsx(wo,{})}),r.jsx("button",{type:"button",className:"ref-icon-tile ref-browser-tool-btn","aria-label":g?.isLoading?t("app.browserStop"):t("common.refresh"),title:g?.isLoading?t("app.browserStop"):t("common.refresh"),onClick:()=>{const e=Br();if(e){if(g?.isLoading){e.stop();return}T(a=>a.map(s=>s.id===S?{...s,loadError:null}:s)),e.reload()}},children:g?.isLoading?r.jsx(yo,{}):r.jsx(go,{})}),r.jsxs("div",{className:"ref-browser-clear-wrap",children:[r.jsx("button",{type:"button",className:"ref-icon-tile ref-browser-tool-btn","aria-label":Ct,title:Ct,disabled:Ne,onClick:()=>{Tr(e=>!e),nr(null)},children:r.jsx($r,{})}),fa?r.jsxs("div",{className:"ref-browser-clear-confirm",role:"dialog","aria-label":t("app.browserClearData"),children:[r.jsx("span",{className:"ref-browser-clear-confirm-copy",children:pt||t("app.browserClearDataConfirm")}),r.jsxs("div",{className:"ref-browser-clear-confirm-actions",children:[r.jsx("button",{type:"button",className:"ref-browser-mini-btn ref-browser-mini-btn--danger",disabled:Ne,onClick:()=>void Sa(),children:t(Ne?"app.browserClearingData":"app.browserClearDataAction")}),r.jsx("button",{type:"button",className:"ref-browser-mini-btn",disabled:Ne,onClick:()=>{Tr(!1),nr(null)},children:t("common.cancel")})]})]}):null]})]}),r.jsxs("form",{className:"ref-browser-address-form",onSubmit:Ma,children:[r.jsx(At,{className:"ref-browser-address-icon"}),r.jsx("input",{ref:U,type:"text",className:"ref-browser-address-input",value:g?.draftUrl??"",placeholder:t("app.browserAddressPlaceholder"),spellCheck:!1,autoCapitalize:"none",autoCorrect:"off",onChange:e=>Da(e.target.value),onFocus:e=>e.currentTarget.select(),onKeyDown:Ia}),r.jsx("button",{type:"submit",className:"ref-browser-address-go","aria-label":t("app.browserGo"),title:t("app.browserGo"),disabled:!String(g?.draftUrl??"").trim(),children:r.jsx(vo,{})})]})]}),A?r.jsxs("div",{className:`ref-browser-capture-banner ref-browser-google-login-notice${A.kind==="info"?" ref-browser-capture-banner--info":""}`,role:A.kind==="error"?"alert":"status",children:[r.jsx("span",{children:A.kind==="error"?A.message:`${t("app.browserGoogleLoginExternalTitle")} — ${t("app.browserGoogleLoginExternalBody")}`}),r.jsx("button",{type:"button",className:"ref-browser-capture-banner-dismiss","aria-label":t("common.close"),title:t("common.close"),onClick:()=>y(null),children:r.jsx(Ke,{})})]}):null,r.jsxs("div",{className:"ref-browser-webview-wrap",children:[De&&He?O.map(e=>r.jsx(Vo,{tab:e,partition:He,userAgent:Oa,fingerprintScript:$a,active:e.id===S,hookEnabled:I&&!_t(e.currentUrl||e.requestedUrl),hookScript:da,onHookEvents:ya,onStorageSnapshot:ga,t,onNavigate:_a,onTitle:Pa,onLoading:Ba,onFailLoad:Ha,onRegisterWebview:La},e.id)):r.jsxs("div",{className:"ref-browser-preparing",children:[r.jsx("div",{className:"ref-agent-plan-status-title",children:t("app.browserPreparing")}),r.jsx("p",{className:"ref-agent-plan-status-body",children:t("app.browserSettingsDescription")})]}),g?.loadError?r.jsxs("div",{className:"ref-browser-error-card",role:"status",children:[r.jsx("div",{className:"ref-browser-error-title",children:t("app.browserLoadFailed")}),r.jsx("p",{className:"ref-browser-error-body",children:g.loadError.message}),g.loadError.url?r.jsx("p",{className:"ref-browser-error-url",title:g.loadError.url,children:g.loadError.url}):null,r.jsx("button",{type:"button",className:"ref-browser-error-btn",onClick:()=>{const e=S;T(a=>a.map(s=>s.id===e?{...s,loadError:null}:s)),C.current.get(e)?.reload()},children:t("common.refresh")})]}):null]}),r.jsxs("div",{className:`ref-browser-capture-dock${R?" is-expanded":" is-collapsed"}${I?" is-active":""}`,children:[r.jsxs("div",{className:"ref-browser-capture-dock-summary",children:[r.jsxs("button",{type:"button",className:"ref-browser-capture-dock-toggle","aria-expanded":R,"aria-label":t(R?"app.browserCaptureCollapse":"app.browserCaptureExpand"),title:t(R?"app.browserCaptureCollapse":"app.browserCaptureExpand"),onClick:()=>X(e=>!e),children:[r.jsx("span",{className:"ref-browser-capture-dot","aria-hidden":"true"}),r.jsx("span",{className:"ref-browser-capture-dock-title",children:t(I?"app.browserCaptureCapturing":"app.browserCaptureReady")}),r.jsx("span",{className:"ref-browser-capture-dock-metric",children:t("app.browserCaptureRequestsShort",{count:String(dr)})}),r.jsx("span",{className:`ref-browser-capture-dock-metric${Ja?" is-warning":""}`,children:t("app.browserCaptureTabsShort",{attached:String(Ka),total:String(Wa||O.length)})}),r.jsx("span",{className:`ref-browser-capture-dock-metric${B?" is-active":""}`,children:t(B?"app.browserCaptureProxyShortOn":"app.browserCaptureProxyShortOff")}),r.jsx(xo,{className:"ref-browser-capture-dock-chevron"})]}),r.jsxs("div",{className:"ref-browser-capture-dock-quick-actions",onClick:e=>e.stopPropagation(),children:[r.jsx("button",{type:"button",className:`ref-browser-capture-btn${I?" ref-browser-capture-btn--danger":" ref-browser-capture-btn--primary"}`,disabled:!!M,onClick:()=>void jr(I?"stop":"start"),title:t(I?"app.browserCaptureStop":"app.browserCaptureStart"),children:t(M==="start"?"app.browserCaptureStarting":M==="stop"?"app.browserCaptureStopping":I?"app.browserCaptureStop":"app.browserCaptureStart")}),r.jsx("button",{type:"button",className:`ref-browser-capture-btn ref-browser-capture-btn--ghost${B?" is-active":""}`,disabled:!!(j||M),onClick:()=>void Nr(B?"stop":"start"),title:t(B?"app.browserCaptureProxyStop":"app.browserCaptureProxyStart"),children:t(j==="start"?"app.browserCaptureProxyStarting":j==="stop"?"app.browserCaptureProxyStopping":B?"app.browserCaptureProxyStop":"app.browserCaptureProxyStart")}),r.jsx("button",{type:"button",className:"ref-browser-capture-btn ref-browser-capture-btn--ghost",disabled:!!M||dr<=0,onClick:()=>void jr("clear"),title:t("app.browserCaptureClear"),children:t(M==="clear"?"app.browserCaptureClearing":"app.browserCaptureClear")}),r.jsxs("div",{className:"ref-browser-capture-sessions-menu",ref:nt,children:[r.jsx("button",{type:"button",className:"ref-browser-capture-btn ref-browser-capture-btn--ghost",title:t("app.browserCaptureSessionsTitle"),"aria-haspopup":"menu","aria-expanded":ar,onClick:()=>{or(e=>{const a=!e;return a&&$e(),a})},children:t("app.browserCaptureSessionsLabel")}),ar?r.jsxs("div",{className:"ref-browser-capture-sessions-popover",role:"menu",children:[r.jsxs("div",{className:"ref-browser-capture-sessions-popover-head",children:[r.jsx("input",{type:"text",className:"ref-browser-capture-search",value:Er,placeholder:t("app.browserCaptureSessionsSavePlaceholder"),"aria-label":t("app.browserCaptureSessionsSavePlaceholder"),onChange:e=>st(e.target.value)}),r.jsx("button",{type:"button",className:"ref-browser-capture-mini-btn ref-browser-capture-mini-btn--primary",disabled:ne==="save"||dr<=0,onClick:()=>void va(),children:t(ne==="save"?"app.browserCaptureSendingToAgent":"app.browserCaptureSessionsSave")})]}),r.jsx("div",{className:"ref-browser-capture-sessions-popover-list",children:ot.length>0?ot.map(e=>r.jsxs("div",{className:"ref-browser-capture-sessions-row",children:[r.jsxs("button",{type:"button",className:"ref-browser-capture-sessions-row-main",disabled:ne==="load",onClick:()=>void xa(e.id),title:`${e.name}
${new Date(e.updatedAt).toLocaleString()}`,children:[r.jsx("span",{className:"ref-browser-capture-sessions-row-name",children:e.name}),r.jsxs("span",{className:"ref-browser-capture-sessions-row-meta",children:[t("app.browserCaptureRequestsShort",{count:String(e.requestCount)})," · ",new Date(e.updatedAt).toLocaleDateString()]})]}),r.jsx("button",{type:"button",className:"ref-browser-copy-icon-btn","aria-label":t("app.browserCaptureSessionsDelete"),title:t("app.browserCaptureSessionsDelete"),onClick:()=>void Ca(e.id),children:r.jsx($r,{})})]},e.id)):r.jsx("div",{className:"ref-browser-capture-inline-empty",children:t("app.browserCaptureSessionsEmpty")})})]}):null]})]})]}),R?r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"ref-browser-capture-dock-resize",role:"separator","aria-orientation":"horizontal",title:t("app.browserCaptureResizeDock"),onPointerDown:Ra,children:r.jsx("span",{"aria-hidden":"true"})}),r.jsxs("div",{className:"ref-browser-capture-dock-body",style:co,children:[N?r.jsxs("div",{className:"ref-browser-capture-banner ref-browser-capture-banner--error",role:"alert",children:[r.jsx("span",{children:N}),r.jsx("button",{type:"button",className:"ref-browser-capture-banner-dismiss","aria-label":t("common.close"),title:t("common.close"),onClick:()=>P(null),children:r.jsx(Ke,{})})]}):null,Ze?r.jsxs("div",{className:"ref-browser-capture-banner ref-browser-capture-banner--error",role:"alert",children:[r.jsx("span",{children:Ze}),r.jsx("button",{type:"button",className:"ref-browser-capture-banner-dismiss","aria-label":t("common.close"),title:t("common.close"),onClick:()=>K(null),children:r.jsx(Ke,{})})]}):null,r.jsx("div",{className:"ref-browser-capture-mode-tabs",role:"tablist","aria-label":t("app.browserCapturePanel"),children:io.map(e=>r.jsx("button",{type:"button",role:"tab","aria-selected":v===e.key,className:`ref-browser-capture-mode-tab${v===e.key?" is-active":""}`,onClick:()=>ae(e.key),children:e.label},e.key))}),v==="requests"?r.jsxs("div",{className:`ref-browser-capture-network${pe?"":" is-detail-collapsed"}`,children:[r.jsxs("div",{className:"ref-browser-capture-list",children:[r.jsxs("div",{className:"ref-browser-capture-list-toolbar",children:[r.jsxs("div",{className:"ref-browser-capture-list-toolbar-row",children:[r.jsxs("label",{className:"ref-browser-capture-search-wrap",children:[r.jsx(Rt,{className:"ref-browser-capture-search-icon"}),r.jsx("input",{type:"search",className:"ref-browser-capture-search",value:oe,placeholder:t("app.browserCaptureSearchPlaceholder"),"aria-label":t("app.browserCaptureSearchPlaceholder"),onChange:e=>vr(e.target.value)})]}),r.jsxs("div",{className:"ref-browser-capture-bulk-actions",children:[r.jsx("span",{className:`ref-browser-capture-bulk-status${et?" has-error":""}`,title:kt,children:kt}),r.jsxs("div",{className:"ref-browser-capture-analyze-menu",ref:lt,children:[r.jsxs("button",{type:"button",className:"ref-browser-capture-mini-btn ref-browser-capture-mini-btn--primary",disabled:Pe||!c||Oe,onClick:()=>je(e=>!e),"aria-haspopup":"menu","aria-expanded":sr,title:t("app.browserCaptureAnalyzeLabel"),children:[r.jsx(Co,{}),r.jsx("span",{children:Oe?t("app.browserCaptureAnalyzing"):ke?.startsWith("analyze:")?t("app.browserCaptureSentToAgent"):t("app.browserCaptureAnalyzeLabel")})]}),sr?r.jsxs("div",{className:"ref-browser-capture-analyze-popover",role:"menu",children:[r.jsx("div",{className:"ref-browser-capture-analyze-popover-head",children:t("app.browserCaptureAnalyzeHeading")}),[["auto","app.browserCaptureAnalyzeAuto","app.browserCaptureAnalyzeAutoHint"],["api-reverse","app.browserCaptureAnalyzeApi","app.browserCaptureAnalyzeApiHint"],["security-audit","app.browserCaptureAnalyzeSecurity","app.browserCaptureAnalyzeSecurityHint"],["performance","app.browserCaptureAnalyzePerf","app.browserCaptureAnalyzePerfHint"],["crypto-reverse","app.browserCaptureAnalyzeCrypto","app.browserCaptureAnalyzeCryptoHint"]].map(([e,a,s])=>r.jsxs("button",{type:"button",role:"menuitem",disabled:Oe,onClick:()=>void Ta(e),children:[r.jsx("strong",{children:t(a)}),r.jsx("span",{children:t(s)})]},e)),r.jsx("div",{className:"ref-browser-capture-analyze-popover-divider"}),r.jsxs("button",{type:"button",role:"menuitem",disabled:Pe||!c,onClick:()=>{je(!1),Ea()},children:[r.jsx("strong",{children:t("app.browserCaptureSendToAgent")}),r.jsx("span",{children:t("app.browserCaptureSendToAgentHint")})]}),ct.length>0?r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"ref-browser-capture-analyze-popover-divider"}),r.jsx("div",{className:"ref-browser-capture-analyze-popover-head",children:t("app.browserCaptureRecentAnalyses")}),r.jsx("div",{className:"ref-browser-capture-analyze-recents",children:ct.map(e=>r.jsxs("div",{className:"ref-browser-capture-analyze-recent",children:[r.jsxs("button",{type:"button",className:"ref-browser-capture-analyze-recent-main",onClick:()=>{je(!1),ja(e)},title:`${e.title}
${new Date(e.createdAt).toLocaleString()}`,children:[r.jsx("strong",{children:e.title}),r.jsxs("span",{children:[e.mode," · ",new Date(e.createdAt).toLocaleTimeString()]})]}),r.jsx("button",{type:"button",className:"ref-browser-copy-icon-btn","aria-label":t("app.browserCaptureSessionsDelete"),title:t("app.browserCaptureSessionsDelete"),onClick:()=>void Na(e.id),children:r.jsx($r,{})})]},e.id))})]}):null]}):null]}),r.jsx("button",{type:"button",className:"ref-browser-capture-mini-btn ref-browser-capture-mini-btn--icon",disabled:Pe,onClick:()=>void ka(),"aria-label":t("app.browserCaptureCopyCurl"),title:t(ke==="curl"?"app.browserCaptureCopied":ee==="curl"?"app.browserCaptureExporting":"app.browserCaptureCopyCurl"),children:r.jsx(D,{})}),r.jsxs("div",{className:"ref-browser-capture-export-menu",ref:rt,children:[r.jsx("button",{type:"button",className:"ref-browser-capture-mini-btn ref-browser-capture-mini-btn--icon",disabled:Pe,"aria-haspopup":"menu","aria-expanded":er,onClick:()=>Fe(e=>!e),title:t("app.browserCaptureExportMenuLabel"),children:r.jsx(So,{})}),er?r.jsxs("div",{className:"ref-browser-capture-export-popover",role:"menu",children:[r.jsx("button",{type:"button",role:"menuitem",disabled:Pe,onClick:()=>{Fe(!1),gt("json")},children:t(ee==="json"?"app.browserCaptureExporting":"app.browserCaptureExportJson")}),r.jsx("button",{type:"button",role:"menuitem",disabled:Pe,onClick:()=>{Fe(!1),gt("har")},children:t(ee==="har"?"app.browserCaptureExporting":"app.browserCaptureExportHar")})]}):null]})]})]}),r.jsxs("div",{className:"ref-browser-capture-filter-row","aria-label":t("app.browserCaptureFilterLabel"),children:[r.jsxs("div",{className:"ref-browser-capture-filter-strip","aria-label":t("app.browserCaptureStatusFilterLabel"),children:[r.jsxs("span",{className:"ref-browser-capture-filter-label",children:[r.jsx(Lt,{className:"ref-browser-capture-filter-icon"}),t("app.browserCaptureStatus")]}),to.map(e=>r.jsx("button",{type:"button",className:`ref-browser-capture-filter-chip${fe===e.key?" is-active":""}`,onClick:()=>Zt(e.key),children:e.label},e.key))]}),r.jsxs("div",{className:"ref-browser-capture-filter-strip","aria-label":t("app.browserCaptureMethodFilterLabel"),children:[r.jsx("span",{className:"ref-browser-capture-filter-label",children:t("app.browserCaptureColumnMethod")}),ao.map(e=>r.jsx("button",{type:"button",className:`ref-browser-capture-filter-chip${me===e.key?" is-active":""}`,onClick:()=>ea(e.key),children:e.label},e.key))]}),r.jsxs("div",{className:"ref-browser-capture-filter-strip","aria-label":t("app.browserCaptureSourceFilterLabel"),children:[r.jsx("span",{className:"ref-browser-capture-filter-label",children:t("app.browserCaptureColumnSource")}),oo.map(e=>r.jsx("button",{type:"button",className:`ref-browser-capture-filter-chip${be===e.key?" is-active":""}`,onClick:()=>Jr(e.key),children:e.label},e.key))]}),r.jsxs("div",{className:"ref-browser-capture-filter-strip","aria-label":t("app.browserCaptureResourceFilterLabel"),children:[r.jsx("span",{className:"ref-browser-capture-filter-label",children:t("app.browserCaptureResourceType")}),so.map(e=>r.jsx("button",{type:"button",className:`ref-browser-capture-filter-chip${he===e.key?" is-active":""}`,onClick:()=>ra(e.key),children:e.label},e.key))]}),r.jsx("span",{className:"ref-browser-capture-list-count",title:St,children:St}),r.jsx("button",{type:"button",className:`ref-browser-capture-detail-toggle${pe?" is-active":""}`,onClick:()=>oa(e=>!e),title:t(pe?"app.browserCaptureHideDetail":"app.browserCaptureShowDetail"),"aria-pressed":pe,children:t(pe?"app.browserCaptureHideDetail":"app.browserCaptureShowDetail")})]})]}),r.jsxs("div",{className:"ref-browser-capture-table",role:"table","aria-label":t("app.browserCaptureRequests"),children:[r.jsxs("div",{className:"ref-browser-capture-table-head",role:"row",children:[r.jsx("label",{className:"ref-browser-capture-check-cell",title:t("app.browserCaptureToggleVisible"),children:r.jsx("input",{ref:Cr,type:"checkbox",checked:Qa,disabled:$.length<=0,"aria-label":t("app.browserCaptureToggleVisible"),onChange:Aa})}),r.jsx("span",{children:t("app.browserCaptureColumnSeq")}),r.jsx("span",{children:t("app.browserCaptureColumnSource")}),r.jsx("span",{children:t("app.browserCaptureColumnMethod")}),r.jsx("span",{children:t("app.browserCaptureColumnStatus")}),r.jsx("span",{children:t("app.browserCaptureColumnHost")}),r.jsx("span",{children:t("app.browserCaptureColumnPath")}),r.jsx("span",{children:t("app.browserCaptureColumnTime")})]}),r.jsx("div",{className:"ref-browser-capture-table-body",children:$.length>0?r.jsxs(r.Fragment,{children:[$.map(e=>{const a=e.id===Ce,s=z.has(e.id);return r.jsxs("div",{role:"row",tabIndex:0,className:`ref-browser-capture-row${a?" is-selected":""}${e.errorText?" has-error":""}${s?" is-checked":""}`,onClick:()=>Xe(e.id),onKeyDown:i=>lo(i,e.id),children:[r.jsx("label",{className:"ref-browser-capture-check-cell",title:t("app.browserCaptureToggleRequest"),onClick:i=>i.stopPropagation(),children:r.jsx("input",{type:"checkbox",checked:s,"aria-label":t("app.browserCaptureToggleRequest"),onChange:i=>_r(e.id,i.currentTarget.checked)})}),r.jsxs("span",{className:"ref-browser-capture-cell ref-browser-capture-seq",children:["#",e.seq]}),r.jsx("span",{className:`ref-browser-capture-source ref-browser-capture-source--${e.source}`,title:e.source==="proxy"?t("app.browserCaptureSourceProxy"):t("app.browserCaptureSourceBrowser"),children:e.source==="proxy"?t("app.browserCaptureSourceProxyShort"):t("app.browserCaptureSourceBrowserShort")}),r.jsx("span",{className:"ref-browser-capture-method","data-method":e.method,children:e.method}),r.jsx("span",{className:"ref-browser-capture-status","data-status":e.status==null?"pending":String(Math.floor(e.status/100)),children:e.status??"--"}),r.jsx("span",{className:"ref-browser-capture-host",title:It(e.url),children:It(e.url)||"--"}),r.jsx("span",{className:"ref-browser-capture-path",title:e.url,children:Oo(e.url)}),r.jsx("span",{className:"ref-browser-capture-time",children:Wr(e.durationMs)})]},e.id)}),eo?r.jsx("div",{className:"ref-browser-capture-load-more",children:r.jsxs("button",{type:"button",className:"ref-browser-capture-load-more-btn",disabled:Je,onClick:()=>void Lr("append"),children:[r.jsx("span",{children:t(Je?"app.browserCaptureLoadingRequests":"app.browserCaptureLoadMore")}),r.jsx("span",{className:"ref-browser-capture-load-more-count",children:t("app.browserCaptureRemainingCount",{count:String(ro)})})]})}):null]}):r.jsx("div",{className:"ref-browser-capture-empty ref-browser-capture-empty--list",children:Je?r.jsx("span",{children:t("app.browserCaptureLoadingRequests")}):r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"ref-browser-capture-empty-title",children:t("app.browserCaptureNoRequests")}),r.jsx("div",{className:"ref-browser-capture-empty-hint",children:t(I?"app.browserCaptureEmptyHintActive":"app.browserCaptureEmptyHintIdle")}),r.jsxs("div",{className:"ref-browser-capture-empty-actions",children:[I?null:r.jsx("button",{type:"button",className:"ref-browser-capture-btn ref-browser-capture-btn--primary",disabled:!!M,onClick:()=>void jr("start"),children:t(M==="start"?"app.browserCaptureStarting":"app.browserCaptureStart")}),B?null:r.jsx("button",{type:"button",className:"ref-browser-capture-btn ref-browser-capture-btn--ghost",disabled:!!j,onClick:()=>void Nr("start"),children:t(j==="start"?"app.browserCaptureProxyStarting":"app.browserCaptureProxyStart")})]})]})})})]})]}),pe?r.jsx("div",{className:"ref-browser-capture-detail",children:Z?r.jsxs(r.Fragment,{children:[r.jsxs("div",{className:"ref-browser-capture-detail-head",children:[r.jsxs("div",{className:"ref-browser-capture-detail-meta",children:[r.jsx("span",{className:"ref-browser-capture-method","data-method":Z.method,children:Z.method}),r.jsx("span",{className:"ref-browser-capture-status","data-status":Z.status==null?"pending":String(Math.floor(Z.status/100)),children:Z.status??"--"}),r.jsx("span",{className:"ref-browser-capture-detail-time",children:Wr(Z.durationMs)})]}),r.jsxs("div",{className:"ref-browser-capture-detail-actions",children:[r.jsxs("button",{type:"button",className:"ref-browser-copy-btn",disabled:!x,onClick:()=>{x&&H("curl",Ot(x))},children:[r.jsx(D,{}),r.jsx("span",{children:t(ke==="curl"?"app.browserCaptureCopied":"app.browserCaptureCopyCurl")})]}),r.jsxs("button",{type:"button",className:"ref-browser-copy-btn",disabled:!Z.url,onClick:()=>void H("url",Z.url),children:[r.jsx(D,{}),r.jsx("span",{children:t(ke==="url"?"app.browserCaptureCopied":"app.browserCaptureCopyUrl")})]})]})]}),r.jsx("div",{className:"ref-browser-capture-detail-url",title:Z.url,children:Z.url}),ta?r.jsx("div",{className:"ref-browser-capture-empty",children:t("app.browserCaptureLoadingRequest")}):x?r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"ref-browser-capture-detail-tabs",role:"tablist",children:no.map(e=>r.jsx("button",{type:"button",role:"tab","aria-selected":Qe===e.key,className:`ref-browser-capture-detail-tab${Qe===e.key?" is-active":""}`,onClick:()=>aa(e.key),children:e.label},e.key))}),r.jsx("div",{className:"ref-browser-capture-detail-scroll",children:Qe==="headers"?r.jsxs(r.Fragment,{children:[r.jsxs("div",{className:"ref-browser-capture-detail-section",children:[r.jsxs("div",{className:"ref-browser-capture-section-head",children:[r.jsx("div",{className:"ref-browser-capture-section-title",children:t("app.browserCaptureRequestHeaders")}),r.jsx("button",{type:"button",className:"ref-browser-copy-icon-btn","aria-label":t("app.browserCaptureCopyRequestHeaders"),title:t("app.browserCaptureCopyRequestHeaders"),disabled:Ir.length<=0,onClick:()=>void H("requestHeaders",Ft(x.requestHeaders)),children:r.jsx(D,{})})]}),r.jsx("div",{className:"ref-browser-capture-kv-list",children:Ir.length>0?Ir.map(([e,a])=>r.jsxs("div",{className:"ref-browser-capture-kv",children:[r.jsx("span",{children:e}),r.jsx("code",{children:a})]},`req-${e}`)):r.jsx("div",{className:"ref-browser-capture-inline-empty",children:t("app.browserCaptureEmptyBody")})})]}),r.jsxs("div",{className:"ref-browser-capture-detail-section",children:[r.jsxs("div",{className:"ref-browser-capture-section-head",children:[r.jsx("div",{className:"ref-browser-capture-section-title",children:t("app.browserCaptureResponseHeaders")}),r.jsx("button",{type:"button",className:"ref-browser-copy-icon-btn","aria-label":t("app.browserCaptureCopyResponseHeaders"),title:t("app.browserCaptureCopyResponseHeaders"),disabled:Fr.length<=0,onClick:()=>void H("responseHeaders",Ft(x.responseHeaders)),children:r.jsx(D,{})})]}),r.jsx("div",{className:"ref-browser-capture-kv-list",children:Fr.length>0?Fr.map(([e,a])=>r.jsxs("div",{className:"ref-browser-capture-kv",children:[r.jsx("span",{children:e}),r.jsx("code",{children:a})]},`res-${e}`)):r.jsx("div",{className:"ref-browser-capture-inline-empty",children:t("app.browserCaptureEmptyBody")})})]})]}):Qe==="request"?r.jsxs("div",{className:"ref-browser-capture-detail-section",children:[r.jsxs("div",{className:"ref-browser-capture-section-head",children:[r.jsx("div",{className:"ref-browser-capture-section-title",children:t("app.browserCaptureRequestBody")}),r.jsx("button",{type:"button",className:"ref-browser-copy-icon-btn","aria-label":t("app.browserCaptureCopyRequestBody"),title:t("app.browserCaptureCopyRequestBody"),disabled:!Ur,onClick:()=>void H("requestBody",Ur),children:r.jsx(D,{})})]}),r.jsx("pre",{className:"ref-browser-capture-body-block ref-browser-capture-body-block--large",children:Ur||t("app.browserCaptureEmptyBody")}),x.requestBodyTruncated?r.jsx("div",{className:"ref-browser-capture-note",children:t("app.browserCaptureBodyTruncated")}):null]}):r.jsxs("div",{className:"ref-browser-capture-detail-section",children:[r.jsxs("div",{className:"ref-browser-capture-meta-grid",children:[r.jsx("span",{children:t("app.browserCaptureColumnSource")}),r.jsx("strong",{children:x.source==="proxy"?t("app.browserCaptureSourceProxy"):t("app.browserCaptureSourceBrowser")}),r.jsx("span",{children:t("app.browserCaptureColumnStatus")}),r.jsx("strong",{children:x.status??"--"}),r.jsx("span",{children:t("app.browserCaptureContentType")}),r.jsx("strong",{children:x.contentType??"--"}),r.jsx("span",{children:t("app.browserCaptureResourceType")}),r.jsx("strong",{children:x.resourceType??"--"})]}),r.jsxs("div",{className:"ref-browser-capture-section-head",children:[r.jsx("div",{className:"ref-browser-capture-section-title",children:t("app.browserCaptureResponseBody")}),r.jsx("button",{type:"button",className:"ref-browser-copy-icon-btn","aria-label":t("app.browserCaptureCopyResponseBody"),title:t("app.browserCaptureCopyResponseBody"),disabled:!Or,onClick:()=>void H("responseBody",Or),children:r.jsx(D,{})})]}),r.jsx("pre",{className:"ref-browser-capture-body-block ref-browser-capture-body-block--large",children:Or||uo||t("app.browserCaptureEmptyBody")}),x.responseBodyTruncated?r.jsx("div",{className:"ref-browser-capture-note",children:t("app.browserCaptureBodyTruncated")}):null]})})]}):r.jsx("div",{className:"ref-browser-capture-empty",children:t("app.browserCaptureRequestNotFound")})]}):r.jsx("div",{className:"ref-browser-capture-empty",children:t("app.browserCaptureSelectRequest")})}):null]}):v==="hooks"?r.jsxs("div",{className:"ref-browser-capture-hooks-panel",children:[r.jsxs("div",{className:"ref-browser-capture-list-toolbar",children:[r.jsxs("div",{className:"ref-browser-capture-list-toolbar-row",children:[r.jsxs("label",{className:"ref-browser-capture-search-wrap",children:[r.jsx(Rt,{className:"ref-browser-capture-search-icon"}),r.jsx("input",{type:"search",className:"ref-browser-capture-search",value:Ue,placeholder:t("app.browserCaptureHookSearchPlaceholder"),"aria-label":t("app.browserCaptureHookSearchPlaceholder"),onChange:e=>la(e.target.value)})]}),r.jsx("span",{className:"ref-browser-capture-bulk-status",title:t("app.browserCaptureHookCount",{count:String(at)}),children:t("app.browserCaptureHookCount",{count:String(at)})})]}),r.jsx("div",{className:"ref-browser-capture-filter-row","aria-label":t("app.browserCaptureHookCategoryLabel"),children:r.jsxs("div",{className:"ref-browser-capture-filter-strip","aria-label":t("app.browserCaptureHookCategoryLabel"),children:[r.jsxs("span",{className:"ref-browser-capture-filter-label",children:[r.jsx(Lt,{className:"ref-browser-capture-filter-icon"}),t("app.browserCaptureHookCategoryLabel")]}),["all","fetch","xhr","crypto.subtle","crypto.lib"].map(e=>r.jsx("button",{type:"button",className:`ref-browser-capture-filter-chip${rr===e?" is-active":""}`,onClick:()=>ia(e),children:e==="all"?t("app.browserCaptureFilterAll"):e},e))]})})]}),r.jsx("div",{className:"ref-browser-capture-hooks-list",children:tt.length>0?tt.slice().reverse().map(e=>r.jsxs("div",{className:"ref-browser-capture-hook-row","data-category":e.category,children:[r.jsxs("div",{className:"ref-browser-capture-hook-row-head",children:[r.jsx("span",{className:"ref-browser-capture-hook-category",children:e.category}),r.jsx("span",{className:"ref-browser-capture-hook-label",children:e.label}),r.jsx("span",{className:"ref-browser-capture-hook-time",children:new Date(e.ts).toLocaleTimeString()}),r.jsx("button",{type:"button",className:"ref-browser-copy-icon-btn","aria-label":t("app.browserCaptureCopied"),title:t("app.browserCaptureCopied"),onClick:()=>{const a=`${e.label}
${e.url}
args: ${e.args}
result: ${e.result??""}
${e.stack}`;H(`hook:${e.id}`,a)},children:r.jsx(D,{})})]}),e.url?r.jsx("div",{className:"ref-browser-capture-hook-url",title:e.url,children:e.url}):null,e.args?r.jsx("pre",{className:"ref-browser-capture-hook-args",children:e.args}):null,e.result?r.jsxs("pre",{className:"ref-browser-capture-hook-result",children:["→ ",e.result]}):null,e.stack?r.jsxs("details",{className:"ref-browser-capture-hook-stack",children:[r.jsx("summary",{children:t("app.browserCaptureHookStack")}),r.jsx("pre",{children:e.stack})]}):null]},e.id)):r.jsxs("div",{className:"ref-browser-capture-empty ref-browser-capture-empty--list",children:[r.jsx("div",{className:"ref-browser-capture-empty-title",children:t("app.browserCaptureHookEmptyTitle")}),r.jsx("div",{className:"ref-browser-capture-empty-hint",children:t(I?"app.browserCaptureHookEmptyHintActive":"app.browserCaptureHookEmptyHintIdle")})]})})]}):v==="storage"?r.jsxs("div",{className:"ref-browser-capture-storage-panel",children:[r.jsx("div",{className:"ref-browser-capture-storage-host-list",role:"tablist",children:tr.length>0?tr.map(e=>r.jsxs("button",{type:"button",role:"tab","aria-selected":Ee===e.host,className:`ref-browser-capture-storage-host${Ee===e.host?" is-active":""}`,onClick:()=>kr(e.host),children:[r.jsx("span",{className:"ref-browser-capture-storage-host-name",children:e.host}),r.jsxs("span",{className:"ref-browser-capture-storage-host-meta",children:[e.cookies?`${e.cookies.split(";").filter(Boolean).length}c`:"0c"," · ",e.localStorage.length,"L · ",e.sessionStorage.length,"S"]})]},e.id)):r.jsxs("div",{className:"ref-browser-capture-empty ref-browser-capture-empty--list",children:[r.jsx("div",{className:"ref-browser-capture-empty-title",children:t("app.browserCaptureStorageEmptyTitle")}),r.jsx("div",{className:"ref-browser-capture-empty-hint",children:t(I?"app.browserCaptureStorageEmptyHintActive":"app.browserCaptureStorageEmptyHintIdle")})]})}),r.jsx("div",{className:"ref-browser-capture-storage-detail",children:(()=>{const e=tr.find(a=>a.host===Ee)??tr[0];return e?r.jsxs(r.Fragment,{children:[r.jsxs("div",{className:"ref-browser-capture-storage-section",children:[r.jsxs("div",{className:"ref-browser-capture-section-head",children:[r.jsx("div",{className:"ref-browser-capture-section-title",children:t("app.browserCaptureStorageCookies")}),r.jsx("button",{type:"button",className:"ref-browser-copy-icon-btn","aria-label":t("app.browserCaptureCopied"),title:t("app.browserCaptureCopied"),onClick:()=>void H(`storage:cookies:${e.host}`,e.cookies),children:r.jsx(D,{})})]}),e.cookies?r.jsx("pre",{className:"ref-browser-capture-body-block",children:e.cookies}):r.jsx("div",{className:"ref-browser-capture-inline-empty",children:t("app.browserCaptureEmptyBody")})]}),r.jsxs("div",{className:"ref-browser-capture-storage-section",children:[r.jsxs("div",{className:"ref-browser-capture-section-head",children:[r.jsxs("div",{className:"ref-browser-capture-section-title",children:["localStorage (",e.localStorage.length,")"]}),r.jsx("button",{type:"button",className:"ref-browser-copy-icon-btn","aria-label":t("app.browserCaptureCopied"),title:t("app.browserCaptureCopied"),onClick:()=>void H(`storage:local:${e.host}`,JSON.stringify(e.localStorage,null,2)),children:r.jsx(D,{})})]}),e.localStorage.length>0?r.jsx("div",{className:"ref-browser-capture-kv-list",children:e.localStorage.map(a=>r.jsxs("div",{className:"ref-browser-capture-kv",children:[r.jsx("span",{children:a.key}),r.jsx("code",{children:a.value})]},`local-${a.key}`))}):r.jsx("div",{className:"ref-browser-capture-inline-empty",children:t("app.browserCaptureEmptyBody")})]}),r.jsxs("div",{className:"ref-browser-capture-storage-section",children:[r.jsxs("div",{className:"ref-browser-capture-section-head",children:[r.jsxs("div",{className:"ref-browser-capture-section-title",children:["sessionStorage (",e.sessionStorage.length,")"]}),r.jsx("button",{type:"button",className:"ref-browser-copy-icon-btn","aria-label":t("app.browserCaptureCopied"),title:t("app.browserCaptureCopied"),onClick:()=>void H(`storage:session:${e.host}`,JSON.stringify(e.sessionStorage,null,2)),children:r.jsx(D,{})})]}),e.sessionStorage.length>0?r.jsx("div",{className:"ref-browser-capture-kv-list",children:e.sessionStorage.map(a=>r.jsxs("div",{className:"ref-browser-capture-kv",children:[r.jsx("span",{children:a.key}),r.jsx("code",{children:a.value})]},`session-${a.key}`))}):r.jsx("div",{className:"ref-browser-capture-inline-empty",children:t("app.browserCaptureEmptyBody")})]})]}):r.jsx("div",{className:"ref-browser-capture-empty",children:t("app.browserCaptureStorageSelect")})})()})]}):r.jsx("div",{className:"ref-browser-capture-device-panel",children:r.jsxs("div",{className:"ref-browser-capture-device-main",children:[r.jsxs("div",{className:"ref-browser-capture-device-head",children:[r.jsxs("div",{className:"ref-browser-capture-device-title",children:[r.jsx("span",{className:`ref-browser-capture-device-dot${B?" is-active":""}`}),r.jsxs("div",{children:[r.jsx("strong",{children:t("app.browserCaptureDeviceTitle")}),r.jsx("span",{children:Ya})]})]}),r.jsxs("div",{className:"ref-browser-capture-device-actions",children:[r.jsx("button",{type:"button",className:`ref-browser-capture-btn${B?" ref-browser-capture-btn--danger":" ref-browser-capture-btn--primary"}`,disabled:!!(j||M),onClick:()=>void Nr(B?"stop":"start"),children:t(j==="start"?"app.browserCaptureProxyStarting":j==="stop"?"app.browserCaptureProxyStopping":B?"app.browserCaptureProxyStop":"app.browserCaptureProxyStart")}),r.jsx("button",{type:"button",className:"ref-browser-capture-btn ref-browser-capture-btn--ghost",onClick:()=>{Jr("proxy"),ae("requests")},children:t("app.browserCaptureShowProxyRequests")})]})]}),r.jsxs("div",{className:"ref-browser-capture-device-stepgrid",children:[r.jsxs("div",{className:`ref-browser-capture-device-card${B?" is-done":""}`,children:[r.jsxs("div",{className:"ref-browser-capture-device-card-head",children:[r.jsx("span",{className:"ref-browser-capture-device-card-step",children:"1"}),r.jsx("strong",{children:t("app.browserCaptureProxyAddress")}),r.jsx("span",{className:`ref-browser-capture-device-badge${B?" is-on":""}`,children:t(B?"app.browserCaptureProxyShortOn":"app.browserCaptureProxyShortOff")})]}),r.jsxs("div",{className:"ref-browser-capture-device-fields",children:[r.jsxs("div",{className:"ref-browser-capture-device-field",children:[r.jsx("span",{children:t("app.browserCaptureProxyHost")}),r.jsx("code",{title:fr,children:fr}),r.jsx("button",{type:"button",className:"ref-browser-copy-icon-btn","aria-label":t("app.browserCaptureCopyProxyHost"),title:t("app.browserCaptureCopyProxyHost"),onClick:()=>void H("proxyHost",fr),children:r.jsx(D,{})})]}),r.jsxs("div",{className:"ref-browser-capture-device-field",children:[r.jsx("span",{children:t("app.browserCaptureProxyPort")}),r.jsx("code",{children:Hr}),r.jsx("button",{type:"button",className:"ref-browser-copy-icon-btn","aria-label":t("app.browserCaptureCopyProxyPort"),title:t("app.browserCaptureCopyProxyPort"),onClick:()=>void H("proxyPort",String(Hr)),children:r.jsx(D,{})})]}),r.jsxs("div",{className:"ref-browser-capture-device-field ref-browser-capture-device-field--wide",children:[r.jsx("span",{children:t("app.browserCaptureProxyAddress")}),r.jsx("code",{title:br,children:br}),r.jsx("button",{type:"button",className:"ref-browser-copy-icon-btn","aria-label":t("app.browserCaptureCopyProxyAddress"),title:t("app.browserCaptureCopyProxyAddress"),onClick:()=>void H("proxyUrl",br),children:r.jsx(D,{})})]})]}),r.jsx("p",{className:"ref-browser-capture-device-card-hint",children:t("app.browserCaptureDeviceStepWifi")})]}),r.jsxs("div",{className:`ref-browser-capture-device-card${_e?" is-done":""}`,children:[r.jsxs("div",{className:"ref-browser-capture-device-card-head",children:[r.jsx("span",{className:"ref-browser-capture-device-card-step",children:"2"}),r.jsx("strong",{children:t("app.browserCaptureSystemProxy")}),r.jsx("span",{className:`ref-browser-capture-device-badge${_e?" is-on":""}`,children:t(_e?"app.browserCaptureSystemProxyOn":"app.browserCaptureSystemProxyOff")})]}),r.jsx("p",{className:"ref-browser-capture-device-card-hint",children:t("app.browserCaptureSystemProxyHint")}),r.jsx("div",{className:"ref-browser-capture-device-card-actions",children:r.jsx("button",{type:"button",className:`ref-browser-capture-btn${_e?" ref-browser-capture-btn--ghost is-active":" ref-browser-capture-btn--primary"}`,disabled:!B||!!j,onClick:()=>void ba(!_e),children:t(j==="refresh"?"app.browserCaptureProxyStarting":_e?"app.browserCaptureSystemProxyDisable":"app.browserCaptureSystemProxyEnable")})})]}),r.jsxs("div",{className:`ref-browser-capture-device-card${Le?" is-done":""}`,children:[r.jsxs("div",{className:"ref-browser-capture-device-card-head",children:[r.jsx("span",{className:"ref-browser-capture-device-card-step",children:"3"}),r.jsx("strong",{children:t("app.browserCaptureCaTitle")}),r.jsx("span",{className:`ref-browser-capture-device-badge${Le?" is-on":""}`,children:t(Le?"app.browserCaptureCaInstalled":"app.browserCaptureCaNotInstalled")})]}),r.jsx("p",{className:"ref-browser-capture-device-card-hint",children:t("app.browserCaptureCaHint")}),r.jsxs("div",{className:"ref-browser-capture-device-card-actions",children:[r.jsx("button",{type:"button",className:`ref-browser-capture-btn${Le?" ref-browser-capture-btn--ghost":" ref-browser-capture-btn--primary"}`,disabled:!!j,onClick:()=>void ma(Le),children:t(j==="ca"?"app.browserCaptureExporting":Le?"app.browserCaptureCaUninstall":"app.browserCaptureCaInstall")}),r.jsx("button",{type:"button",className:"ref-browser-capture-btn ref-browser-capture-btn--ghost",disabled:j==="ca",onClick:()=>void wa(),children:t(ke==="ca"?"app.browserCaptureProxyCaDownloaded":"app.browserCaptureProxyDownloadCa")}),r.jsx("button",{type:"button",className:"ref-browser-capture-btn ref-browser-capture-btn--ghost",onClick:()=>{c?.invoke("browserCapture:proxyOpenCaPath").catch(()=>{})},children:t("app.browserCaptureCaShowFile")})]}),r.jsxs("div",{className:"ref-browser-capture-device-field ref-browser-capture-device-field--wide",children:[r.jsx("span",{children:t("app.browserCaptureProxyCaUrl")}),r.jsx("code",{title:Dr,children:Dr}),r.jsx("button",{type:"button",className:"ref-browser-copy-icon-btn","aria-label":t("app.browserCaptureCopyProxyCaUrl"),title:t("app.browserCaptureCopyProxyCaUrl"),onClick:()=>void H("proxyCaUrl",Dr),children:r.jsx(D,{})})]})]}),r.jsxs("div",{className:"ref-browser-capture-device-card",children:[r.jsxs("div",{className:"ref-browser-capture-device-card-head",children:[r.jsx("span",{className:"ref-browser-capture-device-card-step",children:"4"}),r.jsx("strong",{children:t("app.browserCaptureSnippetsTitle")})]}),r.jsx("p",{className:"ref-browser-capture-device-card-hint",children:t("app.browserCaptureSnippetsHint")}),r.jsx("div",{className:"ref-browser-capture-device-card-actions ref-browser-capture-device-card-actions--snippets",children:["curl","wget","python","node","env"].map(e=>r.jsxs("button",{type:"button",className:"ref-browser-capture-mini-btn",disabled:!B,onClick:()=>void ha(e),children:[r.jsx(D,{}),r.jsx("span",{children:ke===`snippet:${e}`?t("app.browserCaptureCopied"):e==="env"?t("app.browserCaptureSnippetEnv"):e.toUpperCase()})]},e))})]})]}),r.jsx("div",{className:"ref-browser-capture-device-note",children:t("app.browserCaptureDeviceLimit")})]})})]})]}):null]})]})})]})}),as=n.memo(function(){const{shell:o}=Kt(),[d,b]=n.useState([]),w=n.useCallback(()=>{o?.invoke("app:requestOpenSettings",{nav:"browser"}).catch(()=>{})},[o]);n.useEffect(()=>{bo()},[]);const h=n.useCallback(()=>{o?.invoke("app:windowClose").catch(()=>{})},[o]);n.useEffect(()=>{const F=o?.subscribeBrowserControl;if(!F)return;const t=F(c=>{if(Bo(c)){if(c.type==="closeSidebar"){h();return}b(C=>[...C,c])}});return()=>{t?.()}},[h,o]),n.useEffect(()=>{o&&o.invoke("browser:windowReady").catch(()=>{})},[o]);const E=n.useCallback(F=>{b(t=>t.filter(c=>c.commandId!==F))},[]);return r.jsx("div",{className:"ref-browser-window-root",children:r.jsx(Yo,{hasAgentPlanSidebarContent:!1,closeSidebar:h,openView:()=>{},onOpenBrowserSettings:w,pendingCommand:d[0]??null,onCommandHandled:E,variant:"window"})})});export{as as AgentBrowserWindowSurface};
