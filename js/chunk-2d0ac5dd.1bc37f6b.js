(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ac5dd"],{"18dd":function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return l}));var o=r("a4ee"),s=r("ce50"),n=r("e694"),i=r("5815"),a=r("59b2"),c=(r("b50f"),r("c120"),r("cea0"),r("d386")),d=r("a6a3"),p=r("0db5");let u=class extends(Object(p["a"])(Object(n["a"])(d["a"]))){constructor(e){super(e),this.resourceInfo=null,this.type="unsupported"}initialize(){this.addResolvingPromise(new Promise((e,t)=>{Object(i["b"])(()=>{const e=this.resourceInfo&&(this.resourceInfo.layerType||this.resourceInfo.type);let r="Unsupported layer type";e&&(r+=" "+e),t(new s["a"]("layer:unsupported-layer-type",r,{layerType:e}))})}))}read(e,t){const r={resourceInfo:e};null!=e.id&&(r.id=e.id),null!=e.title&&(r.title=e.title),super.read(r,t)}write(e){return Object.assign(e||{},this.resourceInfo,{id:this.id})}};Object(o["a"])([Object(a["b"])({readOnly:!0})],u.prototype,"resourceInfo",void 0),Object(o["a"])([Object(a["b"])({type:["show","hide"]})],u.prototype,"listMode",void 0),Object(o["a"])([Object(a["b"])({json:{read:!1},readOnly:!0,value:"unsupported"})],u.prototype,"type",void 0),u=Object(o["a"])([Object(c["a"])("esri.layers.UnsupportedLayer")],u);const l=u}}]);
//# sourceMappingURL=chunk-2d0ac5dd.1bc37f6b.js.map