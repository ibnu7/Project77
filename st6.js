const{readFileSync,existsSync,writeFileSync}=require("fs");const readlineSync=require("readline-sync");var Tea={};Tea.encrypt=function(e,r){if(e.length==0)return"";var o=Tea.strToLongs(Utf8.encode(e));if(o.length<=1)o[1]=0;var t=Tea.strToLongs(Utf8.encode(r).slice(0,16));var a=o.length;var n=o[a-1],c=o[0],l=-1703701580;var i,s,d=Math.floor(6+52/a),f=0;while(d-- >0){f+=l;s=f>>>2&3;for(var h=0;h<a;h++){c=o[(h+1)%a];i=(n>>>5^c<<2)+(c>>>3^n<<4)^(f^c)+(t[h&3^s]^n);n=o[h]+=i}}var g=Tea.longsToStr(o);return Base64.encode(g)};Tea.decrypt=function(e,r){if(e.length==0)return"";var o=Tea.strToLongs(Base64.decode(e));var t=Tea.strToLongs(Utf8.encode(r).slice(0,16));var a=o.length;var n=o[a-1],c=o[0],l=-1703701580;var i,s,d=Math.floor(6+52/a),f=d*l;while(f!=0){s=f>>>2&3;for(var h=a-1;h>=0;h--){n=o[h>0?h-1:a-1];i=(n>>>5^c<<2)+(c>>>3^n<<4)^(f^c)+(t[h&3^s]^n);c=o[h]-=i}f-=l}var g=Tea.longsToStr(o);g=g.replace(/\0+$/,"");return Utf8.decode(g)};Tea.strToLongs=function(e){var r=new Array(Math.ceil(e.length/4));for(var o=0;o<r.length;o++){r[o]=e.charCodeAt(o*4)+(e.charCodeAt(o*4+1)<<8)+(e.charCodeAt(o*4+2)<<16)+(e.charCodeAt(o*4+3)<<24)}return r};Tea.longsToStr=function(e){var r=new Array(e.length);for(var o=0;o<e.length;o++){r[o]=String.fromCharCode(e[o]&255,e[o]>>>8&255,e[o]>>>16&255,e[o]>>>24&255)}return r.join("")};module.exports=Tea;var Base64={};Base64.code="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";Base64.encode=function(e,r){r=typeof r=="undefined"?false:r;var o,t,a,n,c,l,i,s,d=[],f="",h,g,u;var p=Base64.code;g=r?Utf8.encode(e):e;h=g.length%3;if(h>0){while(h++<3){f+="=";g+="\0"}}for(h=0;h<g.length;h+=3){o=g.charCodeAt(h);t=g.charCodeAt(h+1);a=g.charCodeAt(h+2);n=o<<16|t<<8|a;c=n>>18&63;l=n>>12&63;i=n>>6&63;s=n&63;d[h/3]=p.charAt(c)+p.charAt(l)+p.charAt(i)+p.charAt(s)}u=d.join("");u=u.slice(0,u.length-f.length)+f;return u};Base64.decode=function(e,r){r=typeof r=="undefined"?false:r;var o,t,a,n,c,l,i,s,d=[],f,h;var g=Base64.code;h=r?Utf8.decode(e):e;for(var u=0;u<h.length;u+=4){n=g.indexOf(h.charAt(u));c=g.indexOf(h.charAt(u+1));l=g.indexOf(h.charAt(u+2));i=g.indexOf(h.charAt(u+3));s=n<<18|c<<12|l<<6|i;o=s>>>16&255;t=s>>>8&255;a=s&255;d[u/4]=String.fromCharCode(o,t,a);if(i==64)d[u/4]=String.fromCharCode(o,t);if(l==64)d[u/4]=String.fromCharCode(o)}f=d.join("");return r?Utf8.decode(f):f};var Utf8={};Utf8.encode=function(e){var r=e.replace(/[\u0080-\u07ff]/g,function(e){var r=e.charCodeAt(0);return String.fromCharCode(192|r>>6,128|r&63)});r=r.replace(/[\u0800-\uffff]/g,function(e){var r=e.charCodeAt(0);return String.fromCharCode(224|r>>12,128|r>>6&63,128|r&63)});return r};Utf8.decode=function(e){var r=e.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,function(e){var r=(e.charCodeAt(0)&15)<<12|(e.charCodeAt(1)&63)<<6|e.charCodeAt(2)&63;return String.fromCharCode(r)});r=r.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g,function(e){var r=(e.charCodeAt(0)&31)<<6|e.charCodeAt(1)&63;return String.fromCharCode(r)});return r};const fileName=__filename.split("/").pop();if(fileName!=="st6.js"||require.main!==module){console.log("Don't change the name or modify it; you will get an error");process.exit()}const filePath=readlineSync.question(" [•] Put File Path .stk: ");if(!filePath){console.log("[ERROR] Unspecified path/file/rez-link");process.exit(1)}if(!existsSync(filePath)){console.log("The specified file does not exist.");process.exit(1)}const date=Tea.decrypt(readFileSync(filePath).toString(),"Bgw34Nmk");const Ave=date.replace(/\n/g,"\n").replace(/{/g,"").replace(/,/g,"\n").replace(/}/g,"").replace(/"/g,"").replace(/\\/g,"").replace(/.*config:/g,"").replace(/connection_mode:/g,"[</>][ConnectionMode] = ").replace(/server_port:/g,"[</>][ServerPort] = ").replace(/use_proxy:/g,"[</>][UseProxy] = ").replace(/use_v2ray_mod:/g,"[</>][Usev2raymod] = ").replace(/proxy_host:/g,"[</>][ProxyHost] = ").replace(/proxy_port:/g,"[</>][ProxyHost] = ").replace(/custom_payload:/g,"[</>][CustomPayload] = ").replace(/custom_host:/g,"[</>][CustomHost] = ").replace(/custom_sni:/g,"[</>][CustomSni] = ").replace(/custom_resolver:/g,"[</>][CustomResolver] = ").replace(/expiry:/g,"[</>][Expiry] = ").replace(/lock_hwid:/g,"[</>][LockHwid] = ").replace(/mobile_data:/g,"[</>][MobilData] = ").replace(/block_root:/g,"[</>][BlockRoot] = ").replace(/creator_note:/g,"[</>][CreatorNote] = ");console.log("\n┌─[ https://t.me/ENZ0101 ]─[~]\n└──╼[ Powered by: XDecrytorId 2023]");console.log(Ave);console.log("==============================");const header="\n┌─[ https://t.me/ENZ0101 ]─[~]\n└──╼[ Powered by: XDecrytorId 2023]";const footer="==============================\n";const result=`${header}\n${Ave}\n${footer}`;const savePath="xxx";writeFileSync(savePath,result);console.log(`Result saved to ${savePath}`);