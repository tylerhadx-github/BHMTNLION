(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-490f651e"],{"008c":function(t,e,n){"use strict";n.d(e,"a",(function(){return G})),n.d(e,"b",(function(){return j})),n.d(e,"c",(function(){return u})),n.d(e,"d",(function(){return A})),n.d(e,"e",(function(){return M})),n.d(e,"f",(function(){return T})),n.d(e,"g",(function(){return R}));var r=n("b2b2"),i=n("a9ab");const o=(t,e,n)=>[e,n],s=(t,e,n)=>[e,n,t[2]],a=(t,e,n)=>[e,n,t[2],t[3]];function u(t){return t?{originPosition:"upper-left"===t.originPosition?"upperLeft":"lower-left"===t.originPosition?"lowerLeft":t.originPosition,scale:t.tolerance?[t.tolerance,t.tolerance]:[1,1],translate:Object(r["k"])(t.extent)?[t.extent.xmin,t.extent.ymax]:[0,0]}:null}function c({scale:t,translate:e},n){return Math.round((n-e[0])/t[0])}function h({scale:t,translate:e},n){return Math.round((e[1]-n)/t[1])}function l(t,e,n){const r=[];let i,o,s,a;for(let u=0;u<n.length;u++){const l=n[u];u>0?(s=c(t,l[0]),a=h(t,l[1]),s===i&&a===o||(r.push(e(l,s-i,a-o)),i=s,o=a)):(i=c(t,l[0]),o=h(t,l[1]),r.push(e(l,i,o)))}return r.length>0?r:null}function f(t,e,n,r){return l(t,n?r?a:s:r?s:o,e)}function d(t,e,n,r){const i=[],u=n?r?a:s:r?s:o;for(let o=0;o<e.length;o++){const n=l(t,u,e[o]);n&&n.length>=3&&i.push(n)}return i.length?i:null}function p(t,e,n,r){const i=[],u=n?r?a:s:r?s:o;for(let o=0;o<e.length;o++){const n=l(t,u,e[o]);n&&n.length>=2&&i.push(n)}return i.length?i:null}function m({scale:t,translate:e},n){return n*t[0]+e[0]}function y({scale:t,translate:e},n){return e[1]-n*t[1]}function g(t,e,n){const r=new Array(n.length);if(!n.length)return r;const[i,o]=t.scale;let s=m(t,n[0][0]),a=y(t,n[0][1]);r[0]=e(n[0],s,a);for(let u=1;u<n.length;u++){const t=n[u];s+=t[0]*i,a-=t[1]*o,r[u]=e(t,s,a)}return r}function b(t,e,n){const r=new Array(n.length);for(let i=0;i<n.length;i++)r[i]=g(t,e,n[i]);return r}function P(t,e,n,r){return g(t,n?r?a:s:r?s:o,e)}function x(t,e,n,r){return b(t,n?r?a:s:r?s:o,e)}function C(t,e,n,r){return b(t,n?r?a:s:r?s:o,e)}function w(t,e,n,r,i){return e.xmin=c(t,n.xmin),e.ymin=h(t,n.ymin),e.xmax=c(t,n.xmax),e.ymax=h(t,n.ymax),e!==n&&(r&&(e.zmin=n.zmin,e.zmax=n.zmax),i&&(e.mmin=n.mmin,e.mmax=n.mmax)),e}function k(t,e,n,r,i){return e.points=f(t,n.points,r,i),e}function j(t,e,n,r,i){return e.x=c(t,n.x),e.y=h(t,n.y),e!==n&&(r&&(e.z=n.z),i&&(e.m=n.m)),e}function O(t,e,n,r,i){const o=d(t,n.rings,r,i);return o?(e.rings=o,e):null}function v(t,e,n,r,i){const o=p(t,n.paths,r,i);return o?(e.paths=o,e):null}function G(t,e){return t&&e?Object(i["f"])(e)?j(t,{},e,!1,!1):Object(i["h"])(e)?v(t,{},e,!1,!1):Object(i["g"])(e)?O(t,{},e,!1,!1):Object(i["e"])(e)?k(t,{},e,!1,!1):Object(i["d"])(e)?w(t,{},e,!1,!1):null:null}function A(t,e,n,i,o){return Object(r["k"])(n)&&(e.points=P(t,n.points,i,o)),e}function M(t,e,n,i,o){return Object(r["j"])(n)||(e.x=m(t,n.x),e.y=y(t,n.y),e!==n&&(i&&(e.z=n.z),o&&(e.m=n.m))),e}function T(t,e,n,i,o){return Object(r["k"])(n)&&(e.rings=C(t,n.rings,i,o)),e}function R(t,e,n,i,o){return Object(r["k"])(n)&&(e.paths=x(t,n.paths,i,o)),e}},"01bf":function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return j}));var r=n("6c97"),i=n("b2b2"),o=n("f2e0"),s=n("5996"),a=n("b0f5"),u=(n("f0b9"),n("c120"),n("a21b"),n("4261")),c=n("9180"),h=(n("008c"),n("74e2"),n("a1f3"));class l{constructor(t,e,n){this.uid=t,this.geometry=e,this.attributes=n,this.visible=!0,this.objectId=null,this.centroid=null}}class f{constructor(){this.exceededTransferLimit=!1,this.features=[],this.fields=[],this.hasM=!1,this.hasZ=!1,this.geometryType=null,this.objectIdFieldName=null,this.globalIdFieldName=null,this.geometryProperties=null,this.geohashFieldName=null,this.spatialReference=null,this.transform=null}}Object(u["b"])(),Object(c["h"])();var d=n("6655");function p(t,e){return e}function m(t,e,n,r){switch(n){case 0:return P(t,e+r,0);case 1:return"lowerLeft"===t.originPosition?P(t,e+r,1):x(t,e+r,1)}}function y(t,e,n,r){return 2===n?P(t,e,2):m(t,e,n,r)}function g(t,e,n,r){return 2===n?P(t,e,3):m(t,e,n,r)}function b(t,e,n,r){return 3===n?P(t,e,3):y(t,e,n,r)}function P({translate:t,scale:e},n,r){return t[r]+n*e[r]}function x({translate:t,scale:e},n,r){return t[r]-n*e[r]}class C{constructor(t){this.options=t,this.geometryTypes=["point","multipoint","polyline","polygon"],this.previousCoordinate=[0,0],this.transform=null,this.applyTransform=p,this.lengths=[],this.currentLengthIndex=0,this.toAddInCurrentPath=0,this.vertexDimension=0,this.coordinateBuffer=null,this.coordinateBufferPtr=0,this.AttributesConstructor=function(){}}createFeatureResult(){return new f}finishFeatureResult(t){if(this.options.applyTransform&&(t.transform=null),this.AttributesConstructor=function(){},this.coordinateBuffer=null,this.lengths.length=0,!t.hasZ)return;const e=Object(a["a"])(t.geometryType,this.options.sourceSpatialReference,t.spatialReference);if(!Object(i["j"])(e))for(const n of t.features)e(n.geometry)}createSpatialReference(){return new s["a"]}addField(t,e){t.fields.push(h["a"].fromJSON(e));const n=t.fields.map(t=>t.name);this.AttributesConstructor=function(){for(const t of n)this[t]=null}}addFeature(t,e){const n=this.options.maxStringAttributeLength?this.options.maxStringAttributeLength:0;if(n>0)for(const r in e.attributes){const t=e.attributes[r];"string"==typeof t&&t.length>n&&(e.attributes[r]="")}t.features.push(e)}addQueryGeometry(t,e){const{queryGeometry:n,queryGeometryType:r}=e,i=Object(d["z"])(n.clone(),n,!1,!1,this.transform),o=Object(d["k"])(i,r,!1,!1);let s=null;switch(r){case"esriGeometryPoint":s="point";break;case"esriGeometryPolygon":s="polygon";break;case"esriGeometryPolyline":s="polyline";break;case"esriGeometryMultipoint":s="multipoint"}o.type=s,t.queryGeometryType=r,t.queryGeometry=o}prepareFeatures(t){switch(this.transform=t.transform,this.options.applyTransform&&t.transform&&(this.applyTransform=this.deriveApplyTransform(t)),this.vertexDimension=2,t.hasZ&&this.vertexDimension++,t.hasM&&this.vertexDimension++,t.geometryType){case"point":this.addCoordinate=(t,e,n)=>this.addCoordinatePoint(t,e,n),this.createGeometry=t=>this.createPointGeometry(t);break;case"polygon":this.addCoordinate=(t,e,n)=>this.addCoordinatePolygon(t,e,n),this.createGeometry=t=>this.createPolygonGeometry(t);break;case"polyline":this.addCoordinate=(t,e,n)=>this.addCoordinatePolyline(t,e,n),this.createGeometry=t=>this.createPolylineGeometry(t);break;case"multipoint":this.addCoordinate=(t,e,n)=>this.addCoordinateMultipoint(t,e,n),this.createGeometry=t=>this.createMultipointGeometry(t);break;case"mesh":case"extent":break;default:Object(r["a"])(t.geometryType)}}createFeature(){return this.lengths.length=0,this.currentLengthIndex=0,this.previousCoordinate[0]=0,this.previousCoordinate[1]=0,new l(Object(o["a"])(),null,new this.AttributesConstructor)}allocateCoordinates(){const t=this.lengths.reduce((t,e)=>t+e,0);this.coordinateBuffer=new Float64Array(t*this.vertexDimension),this.coordinateBufferPtr=0}addLength(t,e,n){0===this.lengths.length&&(this.toAddInCurrentPath=e),this.lengths.push(e)}createPointGeometry(t){const e={type:"point",x:0,y:0,spatialReference:t.spatialReference,hasZ:!!t.hasZ,hasM:!!t.hasM};return e.hasZ&&(e.z=0),e.hasM&&(e.m=0),e}addCoordinatePoint(t,e,n){switch(e=this.applyTransform(this.transform,e,n,0),n){case 0:t.x=e;break;case 1:t.y=e;break;case 2:t.hasZ?t.z=e:t.m=e;break;case 3:t.m=e}}transformPathLikeValue(t,e){let n=0;return e<=1&&(n=this.previousCoordinate[e],this.previousCoordinate[e]+=t),this.applyTransform(this.transform,t,e,n)}addCoordinatePolyline(t,e,n){this.dehydratedAddPointsCoordinate(t.paths,e,n)}addCoordinatePolygon(t,e,n){this.dehydratedAddPointsCoordinate(t.rings,e,n)}addCoordinateMultipoint(t,e,n){0===n&&t.points.push([]);const r=this.transformPathLikeValue(e,n);t.points[t.points.length-1].push(r)}createPolygonGeometry(t){return{type:"polygon",rings:[[]],spatialReference:t.spatialReference,hasZ:!!t.hasZ,hasM:!!t.hasM}}createPolylineGeometry(t){return{type:"polyline",paths:[[]],spatialReference:t.spatialReference,hasZ:!!t.hasZ,hasM:!!t.hasM}}createMultipointGeometry(t){return{type:"multipoint",points:[],spatialReference:t.spatialReference,hasZ:!!t.hasZ,hasM:!!t.hasM}}dehydratedAddPointsCoordinate(t,e,n){0===n&&0==this.toAddInCurrentPath--&&(t.push([]),this.toAddInCurrentPath=this.lengths[++this.currentLengthIndex]-1,this.previousCoordinate[0]=0,this.previousCoordinate[1]=0);const r=this.transformPathLikeValue(e,n),i=t[t.length-1];0===n&&i.push(new Float64Array(this.coordinateBuffer.buffer,this.coordinateBufferPtr*Float64Array.BYTES_PER_ELEMENT,this.vertexDimension)),this.coordinateBuffer[this.coordinateBufferPtr++]=r}deriveApplyTransform(t){const{hasZ:e,hasM:n}=t;return e&&n?b:e?y:n?g:m}}var w=n("072f");class k{_parseFeatureQuery(t){const e=Object(w["a"])(t.buffer,new C(t.options)),n={...e,spatialReference:e.spatialReference.toJSON(),fields:e.fields?e.fields.map(t=>t.toJSON()):void 0};return Promise.resolve(n)}}function j(){return new k}},f0b9:function(t,e,n){"use strict";function r(t){return 32+t.length}function i(){return 16}function o(t){if(!t)return 0;let e=32;for(const n in t)if(t.hasOwnProperty(n)){const o=t[n];switch(typeof o){case"string":e+=r(o);break;case"number":e+=i();break;case"boolean":e+=4}}return e}function s(t,e){return 32+t.length*e}n.d(e,"a",(function(){return o})),n.d(e,"b",(function(){return s}))}}]);
//# sourceMappingURL=chunk-490f651e.30f2ced3.js.map