(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f1516bda"],{"0c00":function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return x}));n("e06a");var r=n("b2b2"),o=n("84e3"),a=n("3e27"),s=n("1451"),i=n("9dee"),c=n("b4e0"),l=n("19db"),f=n("8c6a"),u=n("7220"),m=n("2616"),p=n("3af1");class x{convertVectorFieldData(e){const t=a["a"].fromJSON(e.pixelBlock),n=Object(l["a"])(t,e.type);return Promise.resolve(Object(r["k"])(n)&&n.toJSON())}async decode(e){const t=await Object(s["a"])(e.data,e.options);return t&&t.toJSON()}symbolize(e){e.pixelBlock=a["a"].fromJSON(e.pixelBlock),e.extent=e.extent?p["a"].fromJSON(e.extent):null;const t=this.symbolizer.symbolize(e);return Promise.resolve(Object(r["k"])(t)&&t.toJSON())}async updateSymbolizer(e){var t;this.symbolizer=u["a"].fromJSON(e.symbolizerJSON),e.histograms&&"rasterStretch"===(null==(t=this.symbolizer)?void 0:t.rendererJSON.type)&&(this.symbolizer.rendererJSON.histograms=e.histograms)}stretch(e){const t=this.symbolizer.simpleStretch(a["a"].fromJSON(e.srcPixelBlock),e.stretchParams);return Promise.resolve(Object(r["k"])(t)&&t.toJSON())}estimateStatisticsHistograms(e){const t=Object(i["g"])(a["a"].fromJSON(e.srcPixelBlock));return Promise.resolve(t)}split(e){const t=Object(i["o"])(a["a"].fromJSON(e.srcPixelBlock),e.tileSize,e.maximumPyramidLevel);return t&&t.forEach((e,n)=>{t.set(n,null==e?void 0:e.toJSON())}),Promise.resolve(t)}async mosaicAndTransform(e){const t=e.srcPixelBlocks.map(e=>e?new a["a"](e):null),n=Object(i["k"])(t,e.srcMosaicSize,{blockWidths:e.blockWidths,alignmentInfo:e.alignmentInfo});if(!e.coefs)return n&&n.toJSON();const r=Object(i["a"])(n,e.destDimension,e.coefs,e.sampleSpacing,e.interpolation);return r&&r.toJSON()}async createStreamlinesMesh(e,t){const n={data:new Float32Array(e.flowData.buffer),width:e.flowData.width,height:e.flowData.height},{vertexData:r,indexData:o}=await Object(m["a"])(e.rendererSettings,n,t.signal);return{result:{vertexBuffer:r.buffer,indexBuffer:o.buffer},transferList:[r.buffer,o.buffer]}}async getProjectionOffsetGrid(e){const t=p["a"].fromJSON(e.projectedExtent),n=p["a"].fromJSON(e.srcBufferExtent);let r=null;e.datumTransformationStemps&&(r=new o["a"]({steps:e.datumTransformationStemps})),Object(c["k"])(t.spatialReference,n.spatialReference,r)&&await Object(c["g"])();const a=e.rasterTransform?Object(f["b"])(e.rasterTransform):null;return Object(c["c"])({...e,projectedExtent:t,srcBufferExtent:n,datumTransformation:r,rasterTransform:a})}}},"0f1d":function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n("a4ee"),o=n("6a0e"),a=n("59b2"),s=(n("b50f"),n("c120"),n("cea0"),n("d386"));let i=class extends o["a"]{get affectsPixelSize(){return!1}forwardTransform(e){return e}inverseTransform(e){return e}};Object(r["a"])([Object(a["b"])()],i.prototype,"affectsPixelSize",null),Object(r["a"])([Object(a["b"])({json:{write:!0}})],i.prototype,"spatialReference",void 0),i=Object(r["a"])([Object(s["a"])("esri.layers.support.rasterTransforms.BaseRasterTransform")],i);const c=i},"773d":function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var r=n("a4ee"),o=n("59b2"),a=(n("b50f"),n("c120"),n("cea0"),n("448d")),s=n("d386"),i=n("0f1d");let c=class extends i["a"]{constructor(){super(...arguments),this.type="gcs-shift",this.tolerance=1e-8}forwardTransform(e){return"point"===(e=e.clone()).type?(e.x>180+this.tolerance&&(e.x-=360),e):(e.xmin>=180-this.tolerance?(e.xmax-=360,e.xmin-=360):e.xmax>180+this.tolerance&&(e.xmin=-180,e.xmax=180),e)}inverseTransform(e){return"point"===(e=e.clone()).type?(e.x<-this.tolerance&&(e.x+=360),e):(e.xmin<-this.tolerance&&(e.xmin+=360,e.xmax+=360),e)}};Object(r["a"])([Object(a["a"])({GCSShiftXform:"gcs-shift"})],c.prototype,"type",void 0),Object(r["a"])([Object(o["b"])()],c.prototype,"tolerance",void 0),c=Object(r["a"])([Object(s["a"])("esri.layers.support.rasterTransforms.GCSShiftTransform")],c);const l=c},"7fb1":function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));var r=n("a4ee"),o=(n("e06a"),n("59b2")),a=(n("b50f"),n("c120"),n("cea0"),n("448d")),s=n("afcf"),i=n("d386"),c=n("09db"),l=n("0f1d"),f=n("4ae5"),u=n("3af1");function m(e,t,n){const{x:r,y:o}=t;if(n<2)return{x:e[0]+r*e[2]+o*e[4],y:e[1]+r*e[3]+o*e[5]};if(2===n){const t=r*r,n=o*o,a=r*o;return{x:e[0]+r*e[2]+o*e[4]+t*e[6]+a*e[8]+n*e[10],y:e[1]+r*e[3]+o*e[5]+t*e[7]+a*e[9]+n*e[11]}}const a=r*r,s=o*o,i=r*o,c=a*r,l=a*o,f=r*s,u=o*s;return{x:e[0]+r*e[2]+o*e[4]+a*e[6]+i*e[8]+s*e[10]+c*e[12]+l*e[14]+f*e[16]+u*e[18],y:e[1]+r*e[3]+o*e[5]+a*e[7]+i*e[9]+s*e[11]+c*e[13]+l*e[15]+f*e[17]+u*e[19]}}function p(e,t,n){const{xmin:r,ymin:o,xmax:a,ymax:s,spatialReference:i}=t;let c=[];if(n<2)c.push({x:r,y:s}),c.push({x:a,y:s}),c.push({x:r,y:o}),c.push({x:a,y:o});else{let e=10;for(let t=0;t<e;t++)c.push({x:r,y:o+(s-o)*t/(e-1)}),c.push({x:a,y:o+(s-o)*t/(e-1)});e=8;for(let t=1;t<=e;t++)c.push({x:r+(a-r)*t/e,y:o}),c.push({x:r+(a-r)*t/e,y:s})}c=c.map(t=>m(e,t,n));const l=c.map(e=>e.x),f=c.map(e=>e.y);return new u["a"]({xmin:Math.min.apply(null,l),xmax:Math.max.apply(null,l),ymin:Math.min.apply(null,f),ymax:Math.max.apply(null,f),spatialReference:i})}function x(e){const[t,n,r,o,a,s]=e,i=r*s-a*o,c=a*o-r*s;return[(a*n-t*s)/i,(r*n-t*o)/c,s/i,o/c,-a/i,-r/c]}let h=class extends l["a"]{constructor(){super(...arguments),this.polynomialOrder=1,this.type="polynomial"}readForwardCoefficients(e,t){const{coeffX:n,coeffY:r}=t;if(null==n||!n.length||null==r||!r.length||n.length!==r.length)return null;const o=[];for(let a=0;a<n.length;a++)o.push(n[a]),o.push(r[a]);return o}writeForwardCoefficients(e,t,n){const r=[],o=[];for(let a=0;a<(null==e?void 0:e.length);a++)a%2==0?r.push(e[a]):o.push(e[a]);t.coeffX=r,t.coeffY=o}get inverseCoefficients(){let e=this._get("inverseCoefficients");const t=this._get("forwardCoefficients");return!e&&t&&this.polynomialOrder<2&&(e=x(t)),e}set inverseCoefficients(e){this._set("inverseCoefficients",e)}readInverseCoefficients(e,t){const{inverseCoeffX:n,inverseCoeffY:r}=t;if(null==n||!n.length||null==r||!r.length||n.length!==r.length)return null;const o=[];for(let a=0;a<n.length;a++)o.push(n[a]),o.push(r[a]);return o}writeInverseCoefficients(e,t,n){const r=[],o=[];for(let a=0;a<(null==e?void 0:e.length);a++)a%2==0?r.push(e[a]):o.push(e[a]);t.inverseCoeffX=r,t.inverseCoeffY=o}get affectsPixelSize(){return this.polynomialOrder>0}forwardTransform(e){if("point"===e.type){const t=m(this.forwardCoefficients,e,this.polynomialOrder);return new f["a"]({x:t.x,y:t.y,spatialReference:e.spatialReference})}return p(this.forwardCoefficients,e,this.polynomialOrder)}inverseTransform(e){if("point"===e.type){const t=m(this.inverseCoefficients,e,this.polynomialOrder);return new f["a"]({x:t.x,y:t.y,spatialReference:e.spatialReference})}return p(this.inverseCoefficients,e,this.polynomialOrder)}};Object(r["a"])([Object(o["b"])({json:{write:!0}})],h.prototype,"polynomialOrder",void 0),Object(r["a"])([Object(o["b"])()],h.prototype,"forwardCoefficients",void 0),Object(r["a"])([Object(s["a"])("forwardCoefficients",["coeffX","coeffY"])],h.prototype,"readForwardCoefficients",null),Object(r["a"])([Object(c["a"])("forwardCoefficients")],h.prototype,"writeForwardCoefficients",null),Object(r["a"])([Object(o["b"])({json:{write:!0}})],h.prototype,"inverseCoefficients",null),Object(r["a"])([Object(s["a"])("inverseCoefficients",["inverseCoeffX","inverseCoeffY"])],h.prototype,"readInverseCoefficients",null),Object(r["a"])([Object(c["a"])("inverseCoefficients")],h.prototype,"writeInverseCoefficients",null),Object(r["a"])([Object(o["b"])()],h.prototype,"affectsPixelSize",null),Object(r["a"])([Object(a["a"])({PolynomialXform:"polynomial"})],h.prototype,"type",void 0),h=Object(r["a"])([Object(i["a"])("esri.layers.support.rasterTransforms.PolynomialTransform")],h);const d=h},"8c6a":function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return x}));var r=n("773d"),o=n("a4ee"),a=(n("e92d"),n("cea0"),n("b50f"),n("c120"),n("2dd4"),n("448d")),s=n("d386"),i=n("0f1d");let c=class extends i["a"]{constructor(){super(...arguments),this.type="identity"}};Object(o["a"])([Object(a["a"])({IdentityXform:"identity"})],c.prototype,"type",void 0),c=Object(o["a"])([Object(s["a"])("esri.layers.support.rasterTransforms.IdentityTransform")],c);const l=c;var f=n("7fb1");const u={GCSShiftXform:r["a"],IdentityXform:l,PolynomialXform:f["a"]},m=Object.keys(u);function p(e){const t=null==e?void 0:e.type;return!e||m.includes(t)}function x(e){if(!(null==e?void 0:e.type))return null;const t=u[null==e?void 0:e.type];if(t){const n=new t;return n.read(e),n}return null}},b4e0:function(e,t,n){"use strict";n.d(t,"a",(function(){return X})),n.d(t,"b",(function(){return b})),n.d(t,"c",(function(){return P})),n.d(t,"d",(function(){return z})),n.d(t,"e",(function(){return R})),n.d(t,"f",(function(){return k})),n.d(t,"g",(function(){return y})),n.d(t,"h",(function(){return M})),n.d(t,"i",(function(){return g})),n.d(t,"j",(function(){return O})),n.d(t,"k",(function(){return f})),n.d(t,"l",(function(){return B})),n.d(t,"m",(function(){return I}));n("e06a");var r=n("ce50"),o=n("b2b2"),a=n("8048"),s=n("8188"),i=n("3af1"),c=n("4ae5");const l=5e-4;function f(e,t,n){return!Object(s["b"])(e,t,n)}function u(e,t,n){const o=f(e,t,n);if(o&&!Object(s["f"])())throw new r["a"]("rasterprojectionhelper-project","projection engine is not loaded");return o}const m=function(e,t,n){const r=(e[0]+e[4]+e[4*t.cols]+e[4*t.cols+4])/4,o=(e[1]+e[5]+e[4*t.rows+1]+e[4*t.rows+5])/4,a=(e[4*t.cols]-e[0]+e[4*t.cols+4]-e[4])/n[0]*.5,s=(e[4*t.cols+1]-e[1]+e[4*t.cols+5]-e[5])/n[1]*.5;return[0===a||isNaN(a)?0:Math.abs(r-e[2*t.rows+2])/Math.abs(a),0===s||isNaN(s)?0:Math.abs(o-e[2*t.rows+3])/Math.abs(s)]},p={3395:20037508.342789244,3410:17334193.943686873,3857:20037508.342788905,3975:17367530.445161372,4087:20037508.342789244,4088:20015108.787169147,6933:17367530.445161372,32662:20037508.342789244,53001:20015086.79602057,53002:10007543.39801029,53003:20015086.79602057,53004:20015086.79602057,53016:14152803.599503474,53017:17333573.624304302,53034:20015086.79602057,53079:20015114.352186374,53080:20015114.352186374,54001:20037508.342789244,54002:10018754.171394624,54003:20037508.342789244,54004:20037508.342789244,54016:14168658.027268292,54017:17367530.44516137,54034:20037508.342789244,54079:20037508.342789244,54080:20037508.342789244,54100:20037508.342789244,54101:20037508.342789244},x=32,h=4,d=h;async function y(){if(Object(s["f"])())return null;await Object(s["g"])()}function b(e,t,n){return u(e.spatialReference,t)?n?Object(s["d"])(t,e.spatialReference,e):Object(s["d"])(e.spatialReference,t,e):null}function O(e,t,n,r=null){if(e.spatialReference.equals(t))return e;u(e.spatialReference,t,r);const a=n.center,c=new i["a"]({xmin:a.x-e.x/2,xmax:a.x+e.x/2,ymin:a.y-e.y/2,ymax:a.y+e.y/2,spatialReference:e.spatialReference}),l=Object(s["h"])(c,t,r);return Object(o["j"])(l)?null:{x:l.xmax-l.xmin,y:l.ymax-l.ymin}}function j(e,t=.01){return Object(a["d"])(e)?t/Object(a["d"])(e):0}function g(e,t,n=null,r=!0){const o=e.spatialReference;if(o.equals(t))return e;u(o,t,n);const a=Object(s["h"])(e,t,n);if(r&&t.isGeographic){const[t,n]=C(o,!0),r=j(o);r&&null!=t&&null!=n&&(Math.abs(e.x-t)<r&&Math.abs(180-a.x)<l?a.x-=360:Math.abs(e.x-n)<r&&Math.abs(180+a.x)<l&&(a.x+=360))}return a}function w(e,t,n=null){const r=e[0].spatialReference;return r.equals(t)?e:(u(r,t,n),Object(s["h"])(e,t,n))}function v(e){const t=R(e[0].spatialReference);if(e.length<2||!Object(o["k"])(t))return e[0];let{xmin:n,xmax:r,ymin:a,ymax:s}=e[0];for(let o=1;o<e.length;o++){const n=e[o];r=n.xmax+t*o,a=Math.min(a,n.ymin),s=Math.max(s,n.ymax)}return new i["a"]({xmin:n,xmax:r,ymin:a,ymax:s,spatialReference:e[0].spatialReference})}function M(e,t,n=null,r=!0){if(e.spatialReference.equals(t))return e;const a=k(e),s=R(e.spatialReference,!0);return Object(o["k"])(s)&&0!==a?v(e.clone().normalize().map(e=>S(e,t,n,r))):S(e,t,n,r)}function S(e,t,n=null,r=!0){const o=e.spatialReference;if(o.equals(t))return e;u(o,t,n);const a=Object(s["h"])(e,t,n);let[i,f]=C(o,!0);if(a&&r&&o.isWebMercator&&t.isGeographic&&null!=i&&null!=f){const r=.001,s=1e3;if(Math.abs(e.xmin-i)<r&&Math.abs(f-e.xmax)>s&&Math.abs(180-a.xmax)<l){a.xmin=-180;const r=[];r.push(new c["a"](e.xmax,e.ymin,o)),r.push(new c["a"](e.xmax,(e.ymin+e.ymax)/2,o)),r.push(new c["a"](e.xmax,e.ymax,o));const s=r.map(e=>g(e,t,n)).filter(e=>!isNaN(null==e?void 0:e.x)).map(e=>e.x);a.xmax=Math.max.apply(null,s)}if(Math.abs(e.xmax-f)<r&&Math.abs(i-e.xmin)>s&&Math.abs(180+a.xmin)<l){a.xmax=180;const r=[];r.push(new c["a"](e.xmin,e.ymin,o)),r.push(new c["a"](e.xmin,(e.ymin+e.ymax)/2,o)),r.push(new c["a"](e.xmin,e.ymax,o));const s=r.map(e=>g(e,t,n)).filter(e=>!isNaN(null==e?void 0:e.x)).map(e=>e.x);a.xmin=Math.min.apply(null,s)}}[i,f]=C(t,!0);const m=j(t);return m&&null!=i&&null!=f&&a&&(Math.abs(a.xmin-i)<m&&(a.xmin=i),Math.abs(a.xmax-f)<m&&(a.xmax=f)),a}function R(e,t=!1){const n=t?20037508.342787:20037508.342788905;return e.isWebMercator?2*n:e.wkid&&e.isGeographic?360:2*p[e.wkid]||null}function C(e,t=!1){const n=[],r=R(e,t);return Object(o["k"])(r)&&(n.push(-r/2),n.push(r/2)),n}function N(e,t,n,r){let o=(e-t)/n;return o-Math.floor(o)!=0?o=Math.floor(o):r&&(o-=1),o}function k(e,t=!1){const n=R(e.spatialReference);if(!Object(o["k"])(n))return 0;const r=t?0:-n/2;return N(e.xmax,r,n,!0)-N(e.xmin,r,n,!1)}function z(e){const t=e.storageInfo.origin.x,n=R(e.spatialReference,!0);if(!Object(o["k"])(n))return{originX:t,halfWorldWidth:null,pyramidsInfo:null};const r=n/2,{nativePixelSize:a,storageInfo:s,extent:i}=e,{maximumPyramidLevel:c,blockWidth:l,pyramidScalingFactor:f}=s;let u=a.x;const m=[],p=Object(o["k"])(e.transform)&&"gcs-shift"===e.transform.type,x=t+(p?0:r),h=p?n-t:r-t;for(let o=0;o<=c;o++){const e=(i.xmax-t)/u/l,n=e-Math.floor(e)==0?e:Math.ceil(e),r=h/u/l,o=r-Math.floor(r)==0?r:Math.ceil(r),a=Math.floor(x/u/l),s=Math.round(x/u)%l,c=(l-Math.round(h/u)%l)%l;m.push({resolutionX:u,blockWidth:l,datsetColumnCount:n,worldColumnCountFromOrigin:o,leftMargin:s,rightPadding:c,originColumnOffset:a}),u*=f}return{originX:t,halfWorldWidth:r,pyramidsInfo:m,hasGCSSShiftTransform:p}}function P(e){const t=e.isAdaptive&&null==e.spacing,n=e.spacing||[x,x];let r=T(e),o={cols:r.size[0]+1,rows:r.size[1]+1},a=m(r.offsets,o,n);const s=(a[0]+a[1])/2,i=r.outofBoundPointCount>0&&r.outofBoundPointCount<r.offsets.length/2;return t&&(i||s>d)&&(r=T({...e,spacing:[h,h]}),o={cols:r.size[0]+1,rows:r.size[1]+1},a=m(r.offsets,o,n)),r.error=a,r.coefficients=J(r.offsets,o,i),r}function T(e){const{projectedExtent:t,srcBufferExtent:n,pixelSize:r,datumTransformation:a,rasterTransform:s}=e,i=t.spatialReference,l=n.spatialReference;u(i,l);const{xmin:f,ymin:m,xmax:p,ymax:h}=t,d=R(l),y=e.hasWrapAround||"gcs-shift"===(null==s?void 0:s.type),b=e.spacing||[x,x],O={x:b[0]*r.x,y:b[1]*r.y},j={cols:Math.ceil((p-f)/O.x-.1/b[0])+1,rows:Math.ceil((h-m)/O.y-.1/b[1])+1},g=O.x,v=O.y,M=[];let S,C=0;const N=[];for(let o=0;o<j.cols;o++)for(let e=0;e<j.rows;e++)N.push(new c["a"]({x:f+g*o,y:h-v*e,spatialReference:i}));const k=w(N,l,a);for(let c=0;c<j.cols;c++){const e=[];for(let t=0;t<j.rows;t++){let r=k[c*j.rows+t];s&&(r=s.inverseTransform(r)),e.push(r),c>0&&y&&r&&S[t]&&Object(o["k"])(d)&&r.x<S[t].x&&(r.x+=d),r?(M.push((r.x-n.xmin)/(n.xmax-n.xmin)),M.push((n.ymax-r.y)/(n.ymax-n.ymin))):(M.push(NaN),M.push(NaN),C++)}S=e}return{offsets:M,error:null,coefficients:null,outofBoundPointCount:C,spacing:b,size:[j.cols-1,j.rows-1]}}function J(e,t,n){const{cols:r,rows:o}=t,a=new Float32Array((r-1)*(o-1)*2*6),s=new Float32Array([-0,-1,1,-1,1,-0,1,-0,-0]),i=new Float32Array([-1,1,0,0,-1,1,1,0,0]);for(let c=0;c<r-1;c++){for(let t=0;t<o-1;t++){let n=c*o*2+2*t;const l=e[n],f=e[n+1],u=e[n+2],m=e[n+3];n+=2*o;const p=e[n],x=e[n+1],h=e[n+2],d=e[n+3];let y=0,b=12*(t*(r-1)+c);for(let e=0;e<3;e++)a[b++]=s[y++]*l+s[y++]*u+s[y++]*h;y=0;for(let e=0;e<3;e++)a[b++]=s[y++]*f+s[y++]*m+s[y++]*d;y=0;for(let e=0;e<3;e++)a[b++]=i[y++]*l+i[y++]*p+i[y++]*h;y=0;for(let e=0;e<3;e++)a[b++]=i[y++]*f+i[y++]*x+i[y++]*d}if(n)for(let e=0;e<a.length;e++)isNaN(a[e])&&(a[e]=-1)}return a}function B(e){const t=e.clone().normalize();return 1===t.length?t[0]:v(t)}function I(e,t,n){const{storageInfo:r,pixelSize:a}=t;let s,i=!1;const{pyramidResolutions:l}=r;if(Object(o["k"])(l)&&l.length){const r=(e.x+e.y)/2,o=l[l.length-1],f=(o.x+o.y)/2,u=(a.x+a.y)/2;if(r<=u)s=0;else if(r>=f)s=l.length,i=r/f>8;else{let e,t=u;for(let o=1;o<=l.length;o++){if(e=(l[o-1].x+l[o-1].y)/2,r<=e){r===e?s=o:"down"===n?(s=o-1,i=r/t>8):s="up"===n||r-t>e-r||r/t>2?o:o-1;break}t=e}}const m=0===s?a:l[s-1];return{pyramidLevel:s,pyramidResolution:new c["a"]({x:m.x,y:m.y,spatialReference:t.spatialReference}),excessiveReading:i}}const f=Math.log(e.x/a.x)/Math.LN2,u=Math.log(e.y/a.y)/Math.LN2,m=t.storageInfo.maximumPyramidLevel||0;s="down"===n?Math.floor(Math.min(f,u)):"up"===n?Math.ceil(Math.max(f,u)):Math.round((f+u)/2),s<0?s=0:s>m&&(i=s>m+3,s=m);const p=2**s;return{pyramidLevel:s,pyramidResolution:new c["a"]({x:p*t.nativePixelSize.x,y:p*t.nativePixelSize.y,spatialReference:t.spatialReference}),excessiveReading:i}}function X(e,t,n=512,r=!0){const{extent:o,spatialReference:s,pixelSize:i}=e,l=O(new c["a"]({x:i.x,y:i.y,spatialReference:s}),t,o);if(null==l)return{projectedPixelSize:null,scales:null,srcResolutions:null,isCustomTilingScheme:!1};const f=(l.x+l.y)/2,u=Object(a["d"])(t),m=f*u*96*39.37,p=t.isGeographic?256/n*295828763.7958547:256/n*591657527.591555;let x="vector-magdir"===e.dataType||"vector-uv"===e.dataType;const h=M(o,t);x||r&&(t.isGeographic||t.isWebMercator)&&(x=h.xmin*h.xmax<0);let d,y=m;const b=1.001;if(x){y=p;const e=t.isGeographic?1341104507446289e-21:.29858214164761665,n=e*(96*u*39.37),r=t.isGeographic?4326:3857;d=O(new c["a"]({x:e,y:e,spatialReference:{wkid:r}}),s,h),d.x*=y/n,d.y*=y/n}else{d={x:i.x,y:i.y};const t=Math.ceil(Math.log(Math.min(e.width,e.height)/32)/Math.LN2);let n=0;for(;y<p*(b/2)&&n<t;)n++,y*=2,d.x*=2,d.y*=2;Math.max(y,p)/Math.min(y,p)<=b&&(y=p)}const j=[y],g=[{x:d.x,y:d.y}],w=70.5310735,v=Math.min(w,m)/b;for(;y>=v;)y/=2,d.x/=2,d.y/=2,j.push(y),g.push({x:d.x,y:d.y});return{projectedPixelSize:l,scales:j,srcResolutions:g,isCustomTilingScheme:!x}}}}]);
//# sourceMappingURL=chunk-f1516bda.0ca79ffc.js.map