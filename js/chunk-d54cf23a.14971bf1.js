(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d54cf23a"],{"334f":function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return d})),n.d(t,"c",(function(){return g})),n.d(t,"d",(function(){return h})),n.d(t,"e",(function(){return m})),n.d(t,"f",(function(){return b})),n.d(t,"g",(function(){return y})),n.d(t,"h",(function(){return x}));var i=n("f57e"),r=n("b2b2"),l=n("a915"),s=n("1219"),a=n("9180"),o=n("f70f"),u=n("32dd"),c=n("8c81"),f=n("1b4a");const d=512,p=50;function m(e,t){if(!t.isWrappable)return null;const[n,i]=Object(o["c"])(t);return e[2]>i?[Object(a["h"])([e[0],e[1],i,e[3]]),Object(a["h"])([n,e[1],n+e[2]-i,e[3]])]:e[0]<n?[Object(a["h"])([n,e[1],e[2],e[3]]),Object(a["h"])([i-(n-e[0]),e[1],i,e[3]])]:null}function y(e){return"text"===e||"esriTS"===e}function b(e){return"simple-marker"===e||"picture-marker"===e||"esriSMS"===e||"esriPMS"===e}function h(e){switch(Object(r["r"])(e.geometry).type){case"point":case"multipoint":return 0;case"polyline":return 1;case"polygon":case"extent":return 2}return 0}function g(e,t,n){var r,s,a;if(!n||0===n.glyphMosaicItems.length)return e;const o=Object(i["a"])(t.text)[1],d=n.glyphMosaicItems,p=Object(f["a"])(d,o,{scale:Object(l["c"])(t.font.size)/c["o"],angle:null!=(r=t.angle)?r:0,xOffset:null!=(s=t.xoffset)?s:0,yOffset:null!=(a=t.yoffset)?a:0,hAlign:Object(u["e"])(t.horizontalAlignment||"center"),vAlign:Object(u["g"])(t.verticalAlignment||"baseline"),maxLineWidth:Math.max(32,Math.min(t.lineWidth||512,512)),lineHeight:c["r"]*Math.max(.25,Math.min(t.lineHeight||1,4)),decoration:t.font.decoration||"none",isCIM:!1}).bounds;return e[0]=Object(l["c"])(p.x-p.halfWidth),e[1]=Object(l["c"])(p.y-p.halfHeight),e[2]=Object(l["c"])(p.width),e[3]=Object(l["c"])(p.height),e}function x(e){if(!e)return null;const{xmin:t,ymin:n,xmax:i,ymax:r,spatialReference:l}=e;return new s["a"]({rings:[[[t,n],[t,r],[i,r],[i,n],[t,n]]],spatialReference:l})}},"45a5":function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return l}));var i=n("fa8a");const r=new i["a"]({esriGeometryPoint:"point",esriGeometryMultipoint:"multipoint",esriGeometryPolyline:"polyline",esriGeometryPolygon:"polygon",esriGeometryMultiPatch:"multipatch",mesh:"mesh"});function l(e){return r.toJSON(e)}function s(e){const{bandCount:t,attributeTable:n,colormap:i,pixelType:r}=e.rasterInfo;return 1===t&&(null!=n||null!=i||"u8"===r||"s8"===r)}},"6f36":function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return f}));var i=n("a915"),r=n("793f3"),l=n("0eee"),s=n("8c81"),a=n("334f"),o=n("f47d");const u={"simple-marker":1,"picture-marker":1,text:0,"simple-line":0,"simple-fill":0,"picture-fill":0,cim:1,"web-style":1},c=.707;function f(e){if(!("visualVariables"in e))return 0;if(!e.hasVisualVariables("size"))return 0;const t=e.getVisualVariablesForType("size");if(!t[0])return 0;const n=t[0];if("outline"===n.target)return 0;if("stops"===n.transformationType)return n.stops.map(e=>e.size).reduce(S,0);if("clamped-linear"===n.transformationType){let e=-1/0,t=-1/0;return e="number"==typeof n.maxSize?n.maxSize:n.maxSize.stops.map(e=>e.size).reduce(S,0),t="number"==typeof n.minSize?n.minSize:n.minSize.stops.map(e=>e.size).reduce(S,0),Math.max(e,t)}return"real-world-size"===n.transformationType?30:void 0}function d(e){return e.type in u}async function p(e,t,n,r,l,s){if(!e||s&&"cluster"===s.type)return 0;if("heatmap"===e.type)return Math.round(3*e.blurRadius);if("dot-density"===e.type)return 0;if("dictionary"===e.type)return"esriGeometryPoint"===t||"esriGeometryMultipoint"===t?100:200;const a=e.getSymbols(),o=f(e),u=[];for(const i of a)u.push(v(i,o,n,t,r,l));const c=await Promise.all(u);return Object(i["c"])(c.reduce(S,0))}const m=[0,0,0,0];function y(e,t){return null==e?t:e}function b(e,t){return null==e.outline?t:y(e.outline.width,t)}const h={sdf:!0,code:99,metrics:s["c"].metrics,rect:new l["a"](0,0,24,24),page:0,textureBinding:2};function g(e){const t=e.text&&e.text.length;if(!t)return{glyphMosaicItems:[h]};const n=[];for(let i=0;i<t;i++)n.push({...h,code:e.text.charCodeAt(i)});return{glyphMosaicItems:n}}async function x(e,t,n,i,l,s){if("simple-marker"===e.type){const n=Math.max(y(e.size,12),t);return w(e)+n*c}if("picture-marker"===e.type){const n=Math.max(y(e.height,12),t),i=y(e.width,12)*(n/y(e.height,12))/2,r=n/2;return w(e)+Math.sqrt(i*i+r*r)}if("text"===e.type){const t=g(e);Object(a["c"])(m,e.toJSON(),t);const n=Math.abs(m[0]),i=Math.abs(m[1]),r=m[2],l=m[3];return Math.max(n,i)+Math.max(r,l)}if("simple-line"===e.type){const n=e,i=Math.max(y(n.width,.75),t)/2;return n.marker?Math.max(6*n.width,2*t):i}if("simple-fill"===e.type||"picture-fill"===e.type)return Math.max(b(e,0),t)/2;if("cim"===e.type){const a={geometryType:i,fields:l,spatialReference:s},u={type:"cim",rendererKey:0,data:e.data,maxVVSize:t};await Object(o["b"])(u,a,n);const c=r["b"].getEnvelope(e.data,n);return c?Math.sqrt(c.width*c.width+c.height*c.height):0}return"web-style"===e.type?x(await e.fetchCIMSymbol(),t,n,i,l,s):0}async function v(e,t,n,i,r,l){return d(e)?Math.min(await x(e,t,n,i,r,l),75):0}function w(e){const t=y(e.xoffset,0),n=y(e.yoffset,0);return Math.sqrt(t*t+n*n)}function S(e,t){return Math.max(e,t)}},"7efa":function(e,t,n){"use strict";n.d(t,"a",(function(){return g})),n.d(t,"b",(function(){return i}));const i={Base64:0,Hex:1,String:2,Raw:3},r=8,l=(1<<r)-1;function s(e,t){const n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}function a(e){const t=[];for(let n=0,i=e.length*r;n<i;n+=r)t[n>>5]|=(e.charCodeAt(n/r)&l)<<n%32;return t}function o(e){const t=[];for(let n=0,i=32*e.length;n<i;n+=r)t.push(String.fromCharCode(e[n>>5]>>>n%32&l));return t.join("")}function u(e){const t="0123456789abcdef",n=[];for(let i=0,r=4*e.length;i<r;i++)n.push(t.charAt(e[i>>2]>>i%4*8+4&15)+t.charAt(e[i>>2]>>i%4*8&15));return n.join("")}function c(e){const t="=",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",i=[];for(let r=0,l=4*e.length;r<l;r+=3){const l=(e[r>>2]>>r%4*8&255)<<16|(e[r+1>>2]>>(r+1)%4*8&255)<<8|e[r+2>>2]>>(r+2)%4*8&255;for(let s=0;s<4;s++)8*r+6*s>32*e.length?i.push(t):i.push(n.charAt(l>>6*(3-s)&63))}return i.join("")}function f(e,t){return e<<t|e>>>32-t}function d(e,t,n,i,r,l){return s(f(s(s(t,e),s(i,l)),r),n)}function p(e,t,n,i,r,l,s){return d(t&n|~t&i,e,t,r,l,s)}function m(e,t,n,i,r,l,s){return d(t&i|n&~i,e,t,r,l,s)}function y(e,t,n,i,r,l,s){return d(t^n^i,e,t,r,l,s)}function b(e,t,n,i,r,l,s){return d(n^(t|~i),e,t,r,l,s)}function h(e,t){e[t>>5]|=128<<t%32,e[14+(t+64>>>9<<4)]=t;let n=1732584193,i=-271733879,r=-1732584194,l=271733878;for(let a=0;a<e.length;a+=16){const t=n,o=i,u=r,c=l;n=p(n,i,r,l,e[a+0],7,-680876936),l=p(l,n,i,r,e[a+1],12,-389564586),r=p(r,l,n,i,e[a+2],17,606105819),i=p(i,r,l,n,e[a+3],22,-1044525330),n=p(n,i,r,l,e[a+4],7,-176418897),l=p(l,n,i,r,e[a+5],12,1200080426),r=p(r,l,n,i,e[a+6],17,-1473231341),i=p(i,r,l,n,e[a+7],22,-45705983),n=p(n,i,r,l,e[a+8],7,1770035416),l=p(l,n,i,r,e[a+9],12,-1958414417),r=p(r,l,n,i,e[a+10],17,-42063),i=p(i,r,l,n,e[a+11],22,-1990404162),n=p(n,i,r,l,e[a+12],7,1804603682),l=p(l,n,i,r,e[a+13],12,-40341101),r=p(r,l,n,i,e[a+14],17,-1502002290),i=p(i,r,l,n,e[a+15],22,1236535329),n=m(n,i,r,l,e[a+1],5,-165796510),l=m(l,n,i,r,e[a+6],9,-1069501632),r=m(r,l,n,i,e[a+11],14,643717713),i=m(i,r,l,n,e[a+0],20,-373897302),n=m(n,i,r,l,e[a+5],5,-701558691),l=m(l,n,i,r,e[a+10],9,38016083),r=m(r,l,n,i,e[a+15],14,-660478335),i=m(i,r,l,n,e[a+4],20,-405537848),n=m(n,i,r,l,e[a+9],5,568446438),l=m(l,n,i,r,e[a+14],9,-1019803690),r=m(r,l,n,i,e[a+3],14,-187363961),i=m(i,r,l,n,e[a+8],20,1163531501),n=m(n,i,r,l,e[a+13],5,-1444681467),l=m(l,n,i,r,e[a+2],9,-51403784),r=m(r,l,n,i,e[a+7],14,1735328473),i=m(i,r,l,n,e[a+12],20,-1926607734),n=y(n,i,r,l,e[a+5],4,-378558),l=y(l,n,i,r,e[a+8],11,-2022574463),r=y(r,l,n,i,e[a+11],16,1839030562),i=y(i,r,l,n,e[a+14],23,-35309556),n=y(n,i,r,l,e[a+1],4,-1530992060),l=y(l,n,i,r,e[a+4],11,1272893353),r=y(r,l,n,i,e[a+7],16,-155497632),i=y(i,r,l,n,e[a+10],23,-1094730640),n=y(n,i,r,l,e[a+13],4,681279174),l=y(l,n,i,r,e[a+0],11,-358537222),r=y(r,l,n,i,e[a+3],16,-722521979),i=y(i,r,l,n,e[a+6],23,76029189),n=y(n,i,r,l,e[a+9],4,-640364487),l=y(l,n,i,r,e[a+12],11,-421815835),r=y(r,l,n,i,e[a+15],16,530742520),i=y(i,r,l,n,e[a+2],23,-995338651),n=b(n,i,r,l,e[a+0],6,-198630844),l=b(l,n,i,r,e[a+7],10,1126891415),r=b(r,l,n,i,e[a+14],15,-1416354905),i=b(i,r,l,n,e[a+5],21,-57434055),n=b(n,i,r,l,e[a+12],6,1700485571),l=b(l,n,i,r,e[a+3],10,-1894986606),r=b(r,l,n,i,e[a+10],15,-1051523),i=b(i,r,l,n,e[a+1],21,-2054922799),n=b(n,i,r,l,e[a+8],6,1873313359),l=b(l,n,i,r,e[a+15],10,-30611744),r=b(r,l,n,i,e[a+6],15,-1560198380),i=b(i,r,l,n,e[a+13],21,1309151649),n=b(n,i,r,l,e[a+4],6,-145523070),l=b(l,n,i,r,e[a+11],10,-1120210379),r=b(r,l,n,i,e[a+2],15,718787259),i=b(i,r,l,n,e[a+9],21,-343485551),n=s(n,t),i=s(i,o),r=s(r,u),l=s(l,c)}return[n,i,r,l]}function g(e,t=i.Hex){const n=t||i.Base64,l=h(a(e),e.length*r);switch(n){case i.Raw:return l;case i.Hex:return u(l);case i.String:return o(l);case i.Base64:return c(l)}}},"9bae":function(e,t,n){"use strict";n.d(t,"a",(function(){return O})),n.d(t,"b",(function(){return v})),n.d(t,"c",(function(){return w})),n.d(t,"d",(function(){return z}));var i,r=n("ce50"),l=n("c120"),s=n("e92d"),a=n("b2b2"),o=n("7efa"),u=n("c3fc"),c=n("9a81"),f=n("a4ee"),d=n("7ffa"),p=n("59b2"),m=(n("cea0"),n("d386")),y=n("09db"),b=n("86f2");let h=i=class extends u["a"]{writeLevels(e,t,n){for(const i in e){const e=this.levels[i];return void(t.stops=e)}}clone(){return new i({axis:this.axis,field:this.field,valueExpression:this.valueExpression,valueExpressionTitle:this.valueExpressionTitle,maxDataValue:this.maxDataValue,maxSize:Object(b["c"])(this.maxSize)?this.maxSize.clone():this.maxSize,minDataValue:this.minDataValue,minSize:Object(b["c"])(this.minSize)?this.minSize.clone():this.minSize,normalizationField:this.normalizationField,stops:this.stops&&this.stops.map(e=>e.clone()),target:this.target,useSymbolValue:this.useSymbolValue,valueRepresentation:this.valueRepresentation,valueUnit:this.valueUnit,legendOptions:this.legendOptions&&this.legendOptions.clone(),levels:Object(d["a"])(this.levels)})}};Object(f["a"])([Object(p["b"])()],h.prototype,"levels",void 0),Object(f["a"])([Object(y["a"])("levels")],h.prototype,"writeLevels",null),h=i=Object(f["a"])([Object(m["a"])("esri.views.2d.engine.LevelDependentSizeVariable")],h);const g=s["a"].getLogger("esri.views.2d.layers.support.clusterUtils");l["a"].add("esri-cluster-arcade-enabled",!0);const x=Object(l["a"])("esri-cluster-arcade-enabled"),v=(e,t,n,i)=>{const r=t.clone();if(!z(r))return r;if(n.fields)for(const l of n.fields)j(e,l);if("visualVariables"in r){const t=(r.visualVariables||[]).filter(e=>"$view.scale"!==e.valueExpression),l=w(t);t.forEach(t=>{"rotation"===t.type?t.field?t.field=E(e,t.field,"avg_angle"):t.valueExpression&&(t.field=F(e,t.valueExpression,"avg_angle"),t.valueExpression=null):t.normalizationField?(t.field=E(e,t.field,"norm",t.normalizationField),t.normalizationField=null):t.field?t.field=E(e,t.field,"avg"):(t.field=F(e,t.valueExpression,"avg"),t.valueExpression=null)}),Object(a["j"])(l)&&!S(t)&&(t.push(O(n,i)),r.dynamicClusterSize=!0),r.visualVariables=t}switch(r.type){case"simple":break;case"unique-value":r.field?r.field=E(e,r.field,"mode"):r.valueExpression&&(r.field=F(e,r.valueExpression,"mode"),r.valueExpression=null);break;case"class-breaks":r.normalizationField?(r.field=E(e,r.field,"norm",r.normalizationField),r.normalizationField=null):r.field?r.field=E(e,r.field,"avg"):(r.field=F(e,r.valueExpression,"avg"),r.valueExpression=null)}return r},w=e=>{for(const t of e)if("size"===t.type)return t;return null},S=e=>{for(const t of e)if("cluster_count"===t.field)return!0;return!1},O=(e,t)=>{const n=[new c["a"]({value:0,size:0}),new c["a"]({value:1})];if(Object(a["j"])(t))return new u["a"]({field:"cluster_count",stops:[...n,new c["a"]({value:2,size:0})]});const i=Object.keys(t).reduce((i,r)=>({...i,[r]:[...n,new c["a"]({value:Math.max(2,t[r].minValue),size:e.clusterMinSize}),new c["a"]({value:Math.max(3,t[r].maxValue),size:e.clusterMaxSize})]}),{});return new h({field:"cluster_count",levels:i})},z=e=>{const t=t=>g.error(new r["a"]("Unsupported-renderer",t,{renderer:e}));if("unique-value"===e.type){if(e.field2||e.field3)return t("FeatureReductionCluster does not support multi-field UniqueValueRenderers"),!1}else if("class-breaks"===e.type){if(e.normalizationField){const n=e.normalizationType;if("field"!==n)return t("FeatureReductionCluster does not support a normalizationType of "+n),!1}}else if("simple"!==e.type)return t("FeatureReductionCluster does not support renderers of type "+e.type),!1;if(!x){if("valueExpression"in e&&e.valueExpression)return t("FeatureReductionCluster does not currently support renderer.valueExpression. Support will be added in a future release"),!1;if(("visualVariables"in e&&e.visualVariables||[]).some(e=>!(!("valueExpression"in e)||!e.valueExpression)))return t("FeatureReductionCluster does not currently support visualVariables with a valueExpression. Support will be added in a future release"),!1}return!0};function V(e,t,n){switch(e){case"avg":case"avg_angle":return"cluster_avg_"+t;case"mode":return"cluster_type_"+t;case"norm":{const e=n,i="field",r=t.toLowerCase()+",norm:"+i+","+e.toLowerCase();return"cluster_avg_"+Object(o["a"])(r)}}}function j(e,t){const{name:n,outStatistic:i}=t,{onStatisticField:l,onStatisticValueExpression:s,statisticType:a}=i;if(s){const t=Object(o["a"])(s.toLowerCase());e.push({name:n,outStatistic:{onStatisticField:t,onStatisticValueExpression:s,statisticType:a}})}else l?e.push({name:n,outStatistic:{onStatisticField:l,statisticType:a}}):g.error(new r["a"]("mapview-unsupported-field","Unable to handle field",{field:t}))}function F(e,t,n){const i=Object(o["a"])(t),r="mode"===n?"cluster_type_"+i:"cluster_avg_"+i;return e.some(e=>e.name===r)||e.push({name:r,outStatistic:{onStatisticField:i,onStatisticValueExpression:t,statisticType:n}}),r}function E(e,t,n,i){if("cluster_count"===t||e.some(e=>e.name===t))return t;const r=V(n,t,i);return e.some(e=>e.name===r)||("norm"===n?e.push({name:r,outStatistic:{onStatisticField:t,onStatisticNormalizationField:i,statisticType:n}}):e.push({name:r,outStatistic:{onStatisticField:t,statisticType:n}})),r}},a305:function(e,t,n){"use strict";n.r(t),n.d(t,"addAggregateFields",(function(){return W})),n.d(t,"createMatcherSchema",(function(){return Z})),n.d(t,"createSchema",(function(){return L})),n.d(t,"createSymbolSchema",(function(){return F})),n.d(t,"createSymbolSchemaOptions",(function(){return j}));n("b423"),n("261a"),n("b48d"),n("478c"),n("667b");var i=n("ff57"),r=(n("da00"),n("f976"),n("ce50")),l=n("c120"),s=n("7ffa"),a=n("e92d"),o=n("b2b2"),u=n("a915"),c=n("6174"),f=n("c84e"),d=n("c8dd"),p=n("18c6"),m=n("3484");function y(e){if(!e)return f["e"].NONE;let t=0;for(const n of e)if("size"===n.type){const e=Object(m["a"])(n);t|=e,"outline"===n.target&&(t|=e<<4)}else"color"===n.type?t|=f["e"].COLOR:"opacity"===n.type?t|=f["e"].OPACITY:"rotation"===n.type&&(t|=f["e"].ROTATION);return t}var b=n("6f36"),h=n("b433"),g=n("9bae"),x=n("45a5");const v=a["a"].getLogger("esri.views.2d.layers.features.schemaUtils"),w="ValidationError",S={esriGeometryPoint:["above-right","above-center","above-left","center-center","center-left","center-right","below-center","below-left","below-right"],esriGeometryPolygon:["always-horizontal"],esriGeometryPolyline:["center-along"],esriGeometryMultipoint:null};function O(e){return Object(p["h"])(e)}function z(e){return e}function V(e){var t;return"line-marker"===e.type?{type:"line-marker",color:null==(t=e.color)?void 0:t.toJSON(),placement:e.placement,style:e.style}:Object(c["a"])(e.toJSON()).toJSON()}function j(e){let t=0,n=0,i=!1,r=!0,l=!0;if(Object(o["k"])(e)&&(n=Object(b["b"])(e),"visualVariables"in e&&(t=y(e.visualVariables||[]),i="dot-density"===e.type),!i)){const t=e.getSymbols();"backgroundFillSymbol"in e&&e.backgroundFillSymbol&&t.push(e.backgroundFillSymbol);for(const e of t)if("cim"===e.type&&(r=!1),"simple-fill"===e.type||"picture-fill"===e.type){const t=e.outline;t&&"none"!==t.style&&"solid"!==t.style&&(l=!1);const n=t&&"none"!==t.style&&"solid"!==t.style,i="simple-fill"===e.type&&"none"!==e.style&&"solid"!==e.style;("picture-fill"===e.type||i||n)&&(r=!1)}}return i&&(l=!1),{vvFlags:t,maxVVSize:n,supportsOutlineFills:l,stride:{fill:i?"dot-density":r?"simple":"default"}}}function F(e,t,n){return E(e,j(t),n)}function E(e,t,n){if(!e)return null;switch(e.type){case"simple-fill":case"picture-fill":return M(e,t,n);case"simple-marker":case"picture-marker":return T(e,t,n);case"simple-line":return I(e,t,n);case"text":return k(e,t,n);case"label":return C(e,t,n);case"cim":return{type:"cim",rendererKey:t.vvFlags,data:e.data,maxVVSize:t.maxVVSize};case"CIMSymbolReference":return{type:"cim",rendererKey:t.vvFlags,data:e,maxVVSize:t.maxVVSize};case"web-style":return{...V(e),type:"web-style",hash:e.hash(),rendererKey:t.vvFlags,maxVVSize:t.maxVVSize};default:throw new Error("symbol not supported "+e.type)}}function M(e,t,n){const i=t.supportsOutlineFills,r=Object(p["g"])(f["d"].FILL,{...t,isOutlinedFill:i}),l=n?O(r):r,s=e.clone(),a=s.outline;t.supportsOutlineFills||(s.outline=null);const o={materialKey:l,hash:s.hash(),isOutlinedFill:!!t.supportsOutlineFills,...V(s)};if(t.supportsOutlineFills)return o;const u=[];if(u.push(o),a){const e=Object(p["g"])(f["d"].LINE,{...t,isOutline:!0}),i={materialKey:n?O(e):e,hash:a.hash(),...V(a)};u.push(i)}return{type:"composite-symbol",layers:u,hash:u.reduce((e,t)=>t.hash+e,"")}}function I(e,t,n){const i=Object(p["g"])(f["d"].LINE,t),r=n?O(i):i,l=e.clone(),s=l.marker;l.marker=null;const a=[];if(a.push({materialKey:r,hash:l.hash(),...V(l)}),s){var o;const e=Object(p["g"])(f["d"].MARKER,t),i=n?O(e):e;s.color=null!=(o=s.color)?o:l.color,a.push({materialKey:i,hash:s.hash(),lineWidth:l.width,...V(s)})}return{type:"composite-symbol",layers:a,hash:a.reduce((e,t)=>t.hash+e,"")}}function T(e,t,n){const i=Object(p["g"])(f["d"].MARKER,t),r=n?O(i):i,l=V(e);return{materialKey:r,hash:e.hash(),...l,angle:e.angle,maxVVSize:t.maxVVSize}}function k(e,t,n){const i=Object(p["g"])(f["d"].TEXT,t),r=n?O(i):i,l=V(e);return{materialKey:r,hash:e.hash(),...l,angle:e.angle,maxVVSize:t.maxVVSize}}function R(e,t){const n=e.labelPlacement,i=S[t];if(!e.symbol)return v.warn("No ILabelClass symbol specified."),!0;if(!i)return v.error(new r["a"]("mapview-labeling:unsupported-geometry-type",`Unable to create labels for Feature Layer, ${t} is not supported`)),!0;if(!i.some(e=>e===n)){const r=i[0];n&&v.warn(`Found invalid label placement type ${n} for ${t}. Defaulting to ${r}`),e.labelPlacement=r}return!1}function N(e,t){const n=Object(s["a"])(e);return n.some(e=>R(e,t))?[]:n}function C(e,t,n){const i=e.toJSON(),r=Object(p["g"])(f["d"].LABEL,{...t,placement:i.labelPlacement});return{materialKey:n?O(r):r,hash:e.hash(),...i,labelPlacement:i.labelPlacement}}function L(e){return Object(l["a"])("esri-2d-update-debug")&&console.debug("Created new schema",P(e,!0)),P(e)}function P(e,t=!1){try{var n,i;const r=q(e,t),l={};return r.map(t=>A(l,e,t)),{source:{definitionExpression:e.definitionExpression,fields:e.fields.map(e=>e.toJSON()),gdbVersion:e.gdbVersion,historicMoment:null==(n=e.historicMoment)?void 0:n.getTime(),outFields:e.availableFields,pixelBuffer:e.pixelBuffer,spatialReference:e.spatialReference.toJSON(),timeExtent:null==(i=e.timeExtent)?void 0:i.toJSON(),customParameters:e.customParameters},attributes:{fields:{},indexCount:0},processors:r,targets:l}}catch(r){if(r.fieldName===w)return v.error(r),null;throw r}}function A(e,t,n){switch(n.target){case"feature":return void J(e,B(t),n);case"aggregate":{if(!("featureReduction"in t))return;const i=t.featureReduction;if("selection"===i.type)throw new r["a"](w,"Mapview does not support `selection` reduction type",i);return J(e,B(t),n),void K(e,i,n)}}}function _(e,t){for(const n in t){const i=t[n];if(i.target!==e.name)continue;const r=e.attributes[n];r?(r.context.mesh=r.context.mesh||i.context.mesh,r.context.storage=r.context.storage||i.context.storage):e.attributes[n]=i}return e}function B(e){var t,n,i,r,l;return[null!=(t=null==(n=Object(o["r"])(e.filter))?void 0:n.toJSON())?t:null,null!=(i=null==(r=Object(o["r"])(null==(l=Object(o["r"])(e.featureEffect))?void 0:l.filter))?void 0:r.toJSON())?i:null]}function J(e,t,n){return e.feature||(e.feature={name:"feature",input:"source",filters:t,attributes:{}}),_(e.feature,n.attributes.fields),e}function K(e,t,n){return e.aggregate||(e.aggregate={name:"aggregate",input:"feature",filters:null,attributes:{},params:{clusterRadius:Object(u["c"])(t.clusterRadius/2),clusterPixelBuffer:64*Math.ceil(Object(u["c"])(t.clusterMaxSize)/64),fields:n.aggregateFields}}),_(e.aggregate,n.attributes.fields),e}function D(e,t){return t.field?G(e,{...t,type:"field",field:t.field}):t.valueExpression?G(e,{...t,type:"expression",valueExpression:t.valueExpression}):{field:null,fieldIndex:null}}function G(e,t){switch(t.type){case"expression":{const n=z(t.valueExpression);if(!e.fields[n]){const i=e.indexCount++;e.fields[n]={...t,name:n,fieldIndex:i}}return{fieldIndex:e.fields[n].fieldIndex}}case"label-expression":{const n=z(JSON.stringify(t.label));if(!e.fields[n]){const i=e.indexCount++;e.fields[n]={...t,name:n,fieldIndex:i}}return{fieldIndex:e.fields[n].fieldIndex}}case"field":{const n=t.field;return"aggregate"===t.target&&e.fields[n]||(e.fields[n]={...t,name:n}),{field:n}}case"statistic":return e.fields[t.name]={...t},{field:t.name}}}function q(e,t=!1){const n=new Array;let i=0;return n.push($(e,i++,t)),n}function U(e,t,n,i,r,l=!1){const s=G(t,{type:"label-expression",target:i,context:{mesh:!0},resultType:"string",label:{labelExpression:n.labelExpression,labelExpressionInfo:n.labelExpressionInfo?{expression:n.labelExpressionInfo.expression}:null,symbol:!!n.symbol,where:n.where}}),{fieldIndex:a}=s;return{...F(n,e,l),fieldIndex:a,target:i,index:r}}function $(e,t,n=!1){const l={indexCount:0,fields:{}},s="featureReduction"in e&&e.featureReduction,a=s?"aggregate":"feature";if("sublayers"in e){const t={type:"subtype",subtypeField:e.subtypeField,renderers:{},stride:{fill:"default"}},i={type:"subtype",mapping:{},target:"feature"},s={type:"subtype",classes:{}},u={type:"symbol",target:"feature",aggregateFields:[],attributes:l,storage:i,mesh:{matcher:t,aggregateMatcher:null,labels:s,sortKey:null}},c=new Set;let f=0;for(const{renderer:d,subtypeCode:p,labelingInfo:m,labelsVisible:y}of e.sublayers){const e=Z(l,a,d,n),u=X(l,a,d),b=y&&m;if("visualVariables"in d&&d.visualVariables&&d.visualVariables.length)throw new r["a"](w,"Visual variables are currently not supported for subtype layers");if("dictionary"===e.type)throw new r["a"](w,"Dictionary renderer is not supported in subtype layers");if("subtype"===e.type)throw new r["a"](w,"Nested subtype renderers is not supported");if(Object(o["k"])(u)&&"subtype"===u.type)throw new r["a"](w,"Nested subtype storage is not supported");if(Object(o["k"])(u)&&"dot-density"===u.type)throw new r["a"](w,"Dot density attributes are not supported in subtype layers");if(c.has(p))throw new r["a"](w,"Subtype codes for sublayers must be unique");c.add(p),t.renderers[p]=e,i.mapping[p]=u,b&&(s.classes[p]=b.map(e=>U(d,l,e,"feature",f++,n)))}return u}if("heatmap"===e.renderer.type){const{blurRadius:t,fieldOffset:n,field:i}=e.renderer;return{type:"heatmap",aggregateFields:[],attributes:l,target:a,storage:null,mesh:{blurRadius:t,fieldOffset:n,field:D(l,{target:a,field:i,resultType:"numeric"}).field}}}{const t=[],o="aggregate"===a?Object(g["b"])(t,e.renderer,s,null):e.renderer;W(l,t);const u=Z(l,a,o,n);let c=null;const f=X(l,a,o),d=Object(x["b"])(e.geometryType);let p=e.labelsVisible&&e.labelingInfo||[],m=[];if(s){if("selection"===s.type)throw new r["a"](w,"Mapview does not support `selection` reduction type",s);if(s.symbol){const e=new i["a"]({symbol:s.symbol,visualVariables:"visualVariables"in o?o.visualVariables:null});c=Z(l,a,e,n)}m=s&&s.labelsVisible&&s.labelingInfo||[]}p=N(p,d),m=N(m,d);let y=0;const b=[...p.map(e=>U(o,l,e,"feature",y++,n)),...m.map(e=>U(o,l,e,"aggregate",y++,n))],h=H(l,e.orderBy);return{type:"symbol",target:a,attributes:l,aggregateFields:t,storage:f,mesh:{matcher:u,labels:{type:"simple",classes:b},aggregateMatcher:c,sortKey:h}}}}function H(e,t){if(Object(o["j"])(t)||!t.length)return null;t.length>1&&v.warn(`Layer rendering currently only supports ordering by 1 orderByInfo, but found ${t.length}. All but the first will be discarded`);const n=t[0],i="ascending"===n.order?"asc":"desc";return n.field?{field:n.field,order:i}:n.valueExpression?{fieldIndex:G(e,{type:"expression",target:"feature",valueExpression:n.valueExpression,resultType:"numeric"}).fieldIndex,order:i}:(v.error(new r["a"](w,"Expected to find a field or valueExpression for OrderByInfo",n)),null)}function W(e,t){const n={mesh:!0,storage:!0};for(const i of t){const{name:t,outStatistic:r}=i,{statisticType:l,onStatisticField:s}=r;let a=null,o=null,u=null;const c="numeric",f="feature";"onStatisticValueExpression"in r?o=G(e,{type:"expression",target:f,valueExpression:r.onStatisticValueExpression,resultType:c}).fieldIndex:"onStatisticNormalizationField"in r?(a=G(e,{type:"field",target:f,field:s,resultType:c}).field,u=r.onStatisticNormalizationField):a=G(e,{type:"field",target:f,field:s,resultType:c}).field,G(e,{type:"statistic",target:"aggregate",name:t,context:n,inField:a,inNormalizationField:u,inFieldIndex:o,statisticType:l})}}function X(e,t,n){switch(n.type){case"dot-density":return Y(e,t,n.attributes);case"simple":case"class-breaks":case"unique-value":case"dictionary":return Q(e,t,n.visualVariables);case"heatmap":return null}}function Y(e,t,n){return n&&n.length?{type:"dot-density",mapping:n.map((n,i)=>{const{field:r,fieldIndex:l}=D(e,{valueExpression:n.valueExpression,field:n.field,resultType:"numeric",target:t});return{binding:i,field:r,fieldIndex:l}}),target:t}:{type:"dot-density",mapping:[],target:t}}function Q(e,t,n){if(!n||!n.length)return{type:"visual-variable",mapping:[],target:t};const i={storage:!0},r="numeric";return{type:"visual-variable",mapping:Object(h["b"])(n).map(n=>{var l;const s=Object(d["p"])(n.type),{field:a,fieldIndex:o}=D(e,{target:t,valueExpression:n.valueExpression,field:n.field,context:i,resultType:r});switch(n.type){case"size":return"$view.scale"===n.valueExpression?null:{type:"size",binding:s,field:a,fieldIndex:o,normalizationField:D(e,{target:t,field:n.normalizationField,context:i,resultType:r}).field,valueRepresentation:null!=(l=n.valueRepresentation)?l:null};case"color":return{type:"color",binding:s,field:a,fieldIndex:o,normalizationField:D(e,{target:t,field:n.normalizationField,context:i,resultType:r}).field};case"opacity":return{type:"opacity",binding:s,field:a,fieldIndex:o,normalizationField:D(e,{target:t,field:n.normalizationField,context:i,resultType:r}).field};case"rotation":return{type:"rotation",binding:s,field:a,fieldIndex:o}}}).filter(e=>e),target:t}}function Z(e,t,n,i=!1){const r=Object(o["s"])(e,{indexCount:0,fields:{}});switch(n.type){case"simple":case"dot-density":return ee(r,n,i);case"class-breaks":return te(r,t,n,i);case"unique-value":return ne(r,t,n,i);case"dictionary":return ie(r,n,i)}}function ee(e,t,n=!1){const i=t.getSymbols(),r=i.length?i[0]:null,{stride:l}=j(t);return{type:"simple",symbol:F(r,t,n),stride:l}}function te(e,t,n,i=!1){const r={mesh:!0,use:"renderer.field"},l=n.backgroundFillSymbol,{field:s,fieldIndex:a}=D(e,{target:t,field:n.field,valueExpression:n.valueExpression,resultType:"numeric",context:r}),o=n.normalizationType,u="log"===o?"esriNormalizeByLog":"percent-of-total"===o?"esriNormalizeByPercentOfTotal":"field"===o?"esriNormalizeByField":null,c=j(n),f=n.classBreakInfos.map(e=>({symbol:E(e.symbol,c,i),min:e.minValue,max:e.maxValue})).sort((e,t)=>e.min-t.min);return{type:"interval",attributes:e.fields,field:s,fieldIndex:a,backgroundFillSymbol:E(l,c,i),defaultSymbol:E(n.defaultSymbol,c,i),intervals:f,normalizationField:n.normalizationField,normalizationTotal:n.normalizationTotal,normalizationType:u,isMaxInclusive:n.isMaxInclusive,stride:c.stride}}function ne(e,t,n,i=!1){const l=[],s=n.backgroundFillSymbol,a={target:t,context:{mesh:!0},resultType:"string"};if(n.field&&"string"!=typeof n.field)throw new r["a"](w,"Expected renderer.field to be a string",n);const{field:o,fieldIndex:u}=D(e,{...a,field:n.field,valueExpression:n.valueExpression}),c=j(n);for(const r of n.uniqueValueInfos)l.push({value:""+r.value,symbol:E(r.symbol,c,i)});return{type:"map",attributes:e.fields,field:o,fieldIndex:u,field2:D(e,{...a,field:n.field2}).field,field3:D(e,{...a,field:n.field3}).field,fieldDelimiter:n.fieldDelimiter,backgroundFillSymbol:E(s,c),defaultSymbol:E(n.defaultSymbol,c),map:l,stride:c.stride}}function ie(e,t,n=!1){return{type:"dictionary",renderer:t.toJSON(),stride:{fill:"default"}}}},b433:function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return u}));var i=n("e92d"),r=n("a915");const l=8,s=l-2,a=i["a"].getLogger("esri.renderers.visualVariables.support.utils"),o=e=>{if(!("visualVariables"in e)||!e.visualVariables||!e.visualVariables.length)return e;const t=e.clone(),n=t.visualVariables.map(e=>c(e)?f(e):e);return t.visualVariables=n,t};function u(e){return e.map(e=>c(e)?f(e.clone()):e)}function c(e){return("size"===e.type||"color"===e.type||"opacity"===e.type)&&null!=e.stops}function f(e){return e.stops=y(e.type,e.stops),e}function d(e,t,n){return(1-n)*e+n*t}function p(e,t){const[n,...i]=t,l=i.pop(),a=i[0].value,o=i[i.length-1].value,u=(o-a)/s,c=[];for(let s=a;s<o;s+=u){let n=0;for(;s>=i[n].value;)n++;const l=i[n],a=t[n-1],o=s-a.value,u=l.value===a.value?1:o/(l.value-a.value);if("color"===e){const e=i[n],r=t[n-1],l=e.color.clone();l.r=d(r.color.r,l.r,u),l.g=d(r.color.g,l.g,u),l.b=d(r.color.b,l.b,u),l.a=d(r.color.a,l.a,u),c.push({value:s,color:l,label:e.label})}else if("size"===e){const e=i[n],l=t[n-1],a=Object(r["e"])(e.size),o=d(Object(r["e"])(l.size),a,u);c.push({value:s,size:o,label:e.label})}else{const e=i[n],r=d(t[n-1].opacity,e.opacity,u);c.push({value:s,opacity:r,label:e.label})}}return[n,...c,l]}function m(e){const[t,...n]=e,i=n.pop();for(;n.length>s;){let e=0,t=0;for(let i=1;i<n.length;i++){const r=n[i-1],l=n[i],s=Math.abs(l.value-r.value);s>t&&(t=s,e=i)}n.splice(e,1)}return[t,...n,i]}function y(e,t){return t.length<=l?t:(a.warn(`Found ${t.length} Visual Variable stops, but MapView only supports ${l}. Displayed stops will be simplified.`),t.length>2*l?p(e,t):m(t))}}}]);
//# sourceMappingURL=chunk-d54cf23a.14971bf1.js.map