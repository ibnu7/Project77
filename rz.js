const{readFileSync}=require("fs");const path=require("path");const readlineSync=require("readline-sync");var Tea={};Tea.encrypt=function(e,r){if(e.length==0)return"";var n=Tea.strToLongs(Utf8.encode(e));if(n.length<=1)n[1]=0;var t=Tea.strToLongs(Utf8.encode(r).slice(0,16));var o=n.length;var a=n[o-1],c=n[0],i=-1703701580;var f,d,s=Math.floor(6+52/o),l=0;while(s-- >0){l+=i;d=l>>>2&3;for(var h=0;h<o;h++){c=n[(h+1)%o];f=(a>>>5^c<<2)+(c>>>3^a<<4)^(l^c)+(t[h&3^d]^a);a=n[h]+=f}}var u=Tea.longsToStr(n);return Base64.encode(u)};Tea.decrypt=function(e,r){if(e.length==0)return"";var n=Tea.strToLongs(Base64.decode(e));var t=Tea.strToLongs(Utf8.encode(r).slice(0,16));var o=n.length;var a=n[o-1],c=n[0],i=-1703701580;var f,d,s=Math.floor(6+52/o),l=s*i;while(l!=0){d=l>>>2&3;for(var h=o-1;h>=0;h--){a=n[h>0?h-1:o-1];f=(a>>>5^c<<2)+(c>>>3^a<<4)^(l^c)+(t[h&3^d]^a);c=n[h]-=f}l-=i}var u=Tea.longsToStr(n);u=u.replace(/\0+$/,"");return Utf8.decode(u)};Tea.strToLongs=function(e){var r=new Array(Math.ceil(e.length/4));for(var n=0;n<r.length;n++){r[n]=e.charCodeAt(n*4)+(e.charCodeAt(n*4+1)<<8)+(e.charCodeAt(n*4+2)<<16)+(e.charCodeAt(n*4+3)<<24)}return r};Tea.longsToStr=function(e){var r=new Array(e.length);for(var n=0;n<e.length;n++){r[n]=String.fromCharCode(e[n]&255,e[n]>>>8&255,e[n]>>>16&255,e[n]>>>24&255)}return r.join("")};module.exports=Tea;var Base64={};Base64.code="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";Base64.encode=function(e,r){r=typeof r=="undefined"?false:r;var n,t,o,a,c,i,f,d,s=[],l="",h,u,g;var v=Base64.code;u=r?Utf8.encode(e):e;h=u.length%3;if(h>0){while(h++<3){l+="=";u+="\0"}}for(h=0;h<u.length;h+=3){n=u.charCodeAt(h);t=u.charCodeAt(h+1);o=u.charCodeAt(h+2);a=n<<16|t<<8|o;c=a>>18&63;i=a>>12&63;f=a>>6&63;d=a&63;s[h/3]=v.charAt(c)+v.charAt(i)+v.charAt(f)+v.charAt(d)}g=s.join("");g=g.slice(0,g.length-l.length)+l;return g};Base64.decode=function(e,r){r=typeof r=="undefined"?false:r;var n,t,o,a,c,i,f,d,s=[],l,h;var u=Base64.code;h=r?Utf8.decode(e):e;for(var g=0;g<h.length;g+=4){a=u.indexOf(h.charAt(g));c=u.indexOf(h.charAt(g+1));i=u.indexOf(h.charAt(g+2));f=u.indexOf(h.charAt(g+3));d=a<<18|c<<12|i<<6|f;n=d>>>16&255;t=d>>>8&255;o=d&255;s[g/4]=String.fromCharCode(n,t,o);if(f==64)s[g/4]=String.fromCharCode(n,t);if(i==64)s[g/4]=String.fromCharCode(n)}l=s.join("");return r?Utf8.decode(l):l};var Utf8={};Utf8.encode=function(e){var r=e.replace(/[\u0080-\u07ff]/g,function(e){var r=e.charCodeAt(0);return String.fromCharCode(192|r>>6,128|r&63)});r=r.replace(/[\u0800-\uffff]/g,function(e){var r=e.charCodeAt(0);return String.fromCharCode(224|r>>12,128|r>>6&63,128|r&63)});return r};Utf8.decode=function(e){var r=e.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,function(e){var r=(e.charCodeAt(0)&15)<<12|(e.charCodeAt(1)&63)<<6|e.charCodeAt(2)&63;return String.fromCharCode(r)});r=r.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g,function(e){var r=(e.charCodeAt(0)&31)<<6|e.charCodeAt(1)&63;return String.fromCharCode(r)});return r};try{const filePath=readlineSync.question(" [•] Put File Path .rez: ");if(!isValidFileExtension(filePath)){console.log("Invalid file extension. Exiting.");process.exit(1)}const encryptedData=readFileSync(filePath).toString();const decryptedData=Tea.decrypt(encryptedData,"@technore24 2022");const jsonData=extractJson(decryptedData);displayConfig(jsonData)}catch(e){console.error("An error occurred:",e.message);process.exit(1)}function isValidFileExtension(e){const r=[".rez",".rezl",".tvt"];return r.includes(path.parse(e).ext)}function extractJson(e){const r=e.indexOf("}")+1;return JSON.parse(e.slice(0,r))}function displayConfig(e){console.log("\n💻 Read Config By ENZO™ Tools\n* t.me/EstebanZxx\n* t.me/XDecrytorID\n==========================");for(const r in e){console.log(`[</>] [${r}] : ${e[r]}`)}console.log("==========================")}