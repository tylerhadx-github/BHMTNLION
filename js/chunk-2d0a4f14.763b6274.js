(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0a4f14"],{"091f":function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return T}));var r=a("a4ee"),o=a("2eab"),i=a("ce50"),l=a("fa8a"),s=a("b2b2"),n=a("e694"),b=a("59b2"),c=(a("b50f"),a("c120"),a("cea0"),a("d386")),u=a("5996"),d=a("3af1"),p=a("9180"),g=a("a6a3"),y=a("997b"),h=a("8e17"),j=a("5a62"),O=a("dff3");const v={id:"0/0/0",level:0,row:0,col:0,extent:null};let m=class extends(Object(y["a"])(Object(j["a"])(Object(h["a"])(g["a"])))){constructor(){super(...arguments),this.tileInfo=O["a"].create({spatialReference:u["a"].WebMercator,size:256}),this.type="base-tile",this.fullExtent=new d["a"](-20037508.342787,-20037508.34278,20037508.34278,20037508.342787,u["a"].WebMercator),this.spatialReference=u["a"].WebMercator}getTileBounds(e,t,a,r){const o=r||Object(p["h"])();return v.level=e,v.row=t,v.col=a,v.extent=o,this.tileInfo.updateTileInfo(v),v.extent=null,o}fetchTile(e,t,a,r={}){const{signal:i}=r,l=this.getTileUrl(e,t,a),s={responseType:"image",signal:i,query:{...this.refreshParameters}};return Object(o["default"])(l,s).then(e=>e.data)}getTileUrl(){throw new i["a"]("basetilelayer:gettileurl-not-implemented","getTileUrl() is not implemented")}};Object(r["a"])([Object(b["b"])({type:O["a"]})],m.prototype,"tileInfo",void 0),Object(r["a"])([Object(b["b"])({type:["show","hide"]})],m.prototype,"listMode",void 0),Object(r["a"])([Object(b["b"])({readOnly:!0,value:"base-tile"})],m.prototype,"type",void 0),Object(r["a"])([Object(b["b"])({nonNullable:!0})],m.prototype,"fullExtent",void 0),Object(r["a"])([Object(b["b"])()],m.prototype,"spatialReference",void 0),m=Object(r["a"])([Object(c["a"])("esri.layers.BaseTileLayer")],m);const M=m;var f=a("b911");const w=new l["a"]({BingMapsAerial:"aerial",BingMapsRoad:"road",BingMapsHybrid:"hybrid"}),S="https://dev.virtualearth.net";let k=class extends(Object(y["a"])(Object(f["a"])(Object(n["a"])(M)))){constructor(e){super(e),this.type="bing-maps",this.tileInfo=new O["a"]({size:[256,256],dpi:96,origin:{x:-20037508.342787,y:20037508.342787,spatialReference:u["a"].WebMercator},spatialReference:u["a"].WebMercator,lods:[{level:1,resolution:78271.5169639999,scale:295828763.795777},{level:2,resolution:39135.7584820001,scale:147914381.897889},{level:3,resolution:19567.8792409999,scale:73957190.948944},{level:4,resolution:9783.93962049996,scale:36978595.474472},{level:5,resolution:4891.96981024998,scale:18489297.737236},{level:6,resolution:2445.98490512499,scale:9244648.868618},{level:7,resolution:1222.99245256249,scale:4622324.434309},{level:8,resolution:611.49622628138,scale:2311162.217155},{level:9,resolution:305.748113140558,scale:1155581.108577},{level:10,resolution:152.874056570411,scale:577790.554289},{level:11,resolution:76.4370282850732,scale:288895.277144},{level:12,resolution:38.2185141425366,scale:144447.638572},{level:13,resolution:19.1092570712683,scale:72223.819286},{level:14,resolution:9.55462853563415,scale:36111.909643},{level:15,resolution:4.77731426794937,scale:18055.954822},{level:16,resolution:2.38865713397468,scale:9027.977411},{level:17,resolution:1.19432856685505,scale:4513.988705},{level:18,resolution:.597164283559817,scale:2256.994353},{level:19,resolution:.298582141647617,scale:1128.497176},{level:20,resolution:.1492910708238085,scale:564.248588}]}),this.key=null,this.style="road",this.culture="en-US",this.region=null,this.portalUrl=null,this.hasAttributionData=!0}get bingMetadata(){return this._get("bingMetadata")}set bingMetadata(e){this._set("bingMetadata",e)}get copyright(){return Object(s["k"])(this.bingMetadata)?this.bingMetadata.copyright:null}get operationalLayerType(){return w.toJSON(this.style)}get bingLogo(){return Object(s["k"])(this.bingMetadata)?this.bingMetadata.brandLogoUri:null}load(e){return this.key?this.addResolvingPromise(this._getMetadata()):this.portalUrl?this.addResolvingPromise(this._getPortalBingKey().then(()=>this._getMetadata())):this.addResolvingPromise(Promise.reject(new i["a"]("bingmapslayer:load","Bing layer must have bing key."))),Promise.resolve(this)}getTileUrl(e,t,a){if(!this.loaded||Object(s["j"])(this.bingMetadata))return null;const r=this.bingMetadata.resourceSets[0].resources[0],o=r.imageUrlSubdomains[t%r.imageUrlSubdomains.length],i=this._getQuadKey(e,t,a);return r.imageUrl.replace("{subdomain}",o).replace("{quadkey}",i)}async fetchAttributionData(){return this.load().then(()=>Object(s["j"])(this.bingMetadata)?null:{contributors:this.bingMetadata.resourceSets[0].resources[0].imageryProviders.map(e=>({attribution:e.attribution,coverageAreas:e.coverageAreas.map(e=>({zoomMin:e.zoomMin,zoomMax:e.zoomMax,score:1,bbox:[e.bbox[0],e.bbox[1],e.bbox[2],e.bbox[3]]}))}))})}_getMetadata(){const e={road:"roadOnDemand",aerial:"aerial",hybrid:"aerialWithLabelsOnDemand"}[this.style];return Object(o["default"])(`${S}/REST/v1/Imagery/Metadata/${e}`,{responseType:"json",query:{include:"ImageryProviders",uriScheme:"https",key:this.key,suppressStatus:!0,output:"json",culture:this.culture,userRegion:this.region}}).then(e=>{const t=e.data;if(200!==t.statusCode)throw new i["a"]("bingmapslayer:getmetadata",t.statusDescription);if(this.bingMetadata=t,0===this.bingMetadata.resourceSets.length)throw new i["a"]("bingmapslayer:getmetadata","no bing resourcesets");if(0===this.bingMetadata.resourceSets[0].resources.length)throw new i["a"]("bingmapslayer:getmetadata","no bing resources")}).catch(e=>{throw new i["a"]("bingmapslayer:getmetadata",e.message)})}_getPortalBingKey(){return Object(o["default"])(this.portalUrl,{responseType:"json",authMode:"no-prompt",query:{f:"json"}}).then(e=>{if(!e.data.bingKey)throw new i["a"]("bingmapslayer:getportalbingkey","The referenced Portal does not contain a valid bing key");this.key=e.data.bingKey}).catch(e=>{throw new i["a"]("bingmapslayer:getportalbingkey",e.message)})}_getQuadKey(e,t,a){let r="";for(let o=e;o>0;o--){let e=0;const i=1<<o-1;0!=(a&i)&&(e+=1),0!=(t&i)&&(e+=2),r+=e.toString()}return r}};Object(r["a"])([Object(b["b"])({json:{read:!1,write:!1},value:null})],k.prototype,"bingMetadata",null),Object(r["a"])([Object(b["b"])({json:{read:!1,write:!1},value:"bing-maps",readOnly:!0})],k.prototype,"type",void 0),Object(r["a"])([Object(b["b"])({type:O["a"]})],k.prototype,"tileInfo",void 0),Object(r["a"])([Object(b["b"])({type:String,readOnly:!0,json:{read:!1,write:!1}})],k.prototype,"copyright",null),Object(r["a"])([Object(b["b"])({type:String,json:{write:!1,read:!1}})],k.prototype,"key",void 0),Object(r["a"])([Object(b["b"])({type:w.apiValues,nonNullable:!0,json:{read:{source:"layerType",reader:w.read}}})],k.prototype,"style",void 0),Object(r["a"])([Object(b["b"])({type:["BingMapsAerial","BingMapsHybrid","BingMapsRoad"]})],k.prototype,"operationalLayerType",null),Object(r["a"])([Object(b["b"])({type:String,json:{write:!1,read:!1}})],k.prototype,"culture",void 0),Object(r["a"])([Object(b["b"])({type:String,json:{write:!1,read:!1}})],k.prototype,"region",void 0),Object(r["a"])([Object(b["b"])({type:String,json:{write:!0,read:!0}})],k.prototype,"portalUrl",void 0),Object(r["a"])([Object(b["b"])({type:Boolean,json:{write:!1,read:!1}})],k.prototype,"hasAttributionData",void 0),Object(r["a"])([Object(b["b"])({type:String,readOnly:!0})],k.prototype,"bingLogo",null),k=Object(r["a"])([Object(c["a"])("esri.layers.BingMapsLayer")],k);const T=k}}]);
//# sourceMappingURL=chunk-2d0a4f14.763b6274.js.map