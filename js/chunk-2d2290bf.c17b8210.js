(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2290bf"],{dc7a:function(t,e,n){"use strict";n.r(e),n.d(e,"loadGLTFMesh",(function(){return M}));var c=n("9ef0"),r=n("2eab"),o=n("28eb"),a=n("b2b2"),s=n("1c92"),i=n("dae5"),u=n("0b2d"),l=n("0fc4"),b=n("f0ba"),f=n("83fa"),O=n("88da"),j=n("f5e7"),d=n("8190"),p=n("668b"),m=n("e4c1"),g=n("7e2d"),x=n("e9ba"),w=n("2b60"),h=n("3c3b"),k=n("087c"),v=n("1038"),y=n("0613"),C=n("4c96"),B=n("1c20"),A=n("dc56");async function M(t,e,n){const c=new w["a"](T(n)),r=(await Object(h["a"])(c,e,n,!0)).model,o=r.lods.shift(),s=new Map,i=new Map;r.textures.forEach((t,e)=>s.set(e,E(t))),r.materials.forEach((t,e)=>i.set(e,J(t,s)));const u=S(o);for(const a of u.parts)R(u,a,i);const{position:l,normal:b,tangent:f,color:O,texCoord0:d}=u.vertexAttributes,p={position:l.typedBuffer,normal:Object(a["k"])(b)?b.typedBuffer:null,tangent:Object(a["k"])(f)?f.typedBuffer:null,uv:Object(a["k"])(d)?d.typedBuffer:null,color:Object(a["k"])(O)?O.typedBuffer:null},m=Object(x["c"])(p,t,n);return{transform:m.transform,components:u.components,spatialReference:t.spatialReference,vertexAttributes:new j["c"]({position:m.vertexAttributes.position,normal:m.vertexAttributes.normal,tangent:m.vertexAttributes.tangent,color:p.color,uv:p.uv})}}function T(t){return null!=t&&t.resolveFile?{busy:!1,request:async(e,n,c)=>{const o=t.resolveFile(e),s="image"===n?"image":"binary"===n?"array-buffer":"json";return(await Object(r["default"])(o,{responseType:s,signal:Object(a["k"])(c)?c.signal:null})).data}}:null}function $(t,e){if(Object(a["j"])(t))return"-";const n=t.typedBuffer;return`${Object(o["a"])(e,n.buffer,()=>e.size)}/${n.byteOffset}/${n.byteLength}`}function F(t){return Object(a["k"])(t)?t.toString():"-"}function S(t){let e=0;const n={color:!1,tangent:!1,normal:!1,texCoord0:!1},c=new Map,r=new Map,a=[];for(const s of t.parts){const{attributes:{position:t,normal:i,color:u,tangent:l,texCoord0:b}}=s,f=`\n      ${$(t,c)}/\n      ${$(i,c)}/\n      ${$(u,c)}/\n      ${$(l,c)}/\n      ${$(b,c)}/\n      ${F(s.transform)}\n    `;let O=!1;const j=Object(o["a"])(r,f,()=>(O=!0,{start:e,length:t.count}));O&&(e+=t.count),i&&(n.normal=!0),u&&(n.color=!0),l&&(n.tangent=!0),b&&(n.texCoord0=!0),a.push({gltf:s,writeVertices:O,region:j})}return{vertexAttributes:{position:Object(g["a"])(d["v"],e),normal:n.normal?Object(g["a"])(d["u"],e):null,tangent:n.tangent?Object(g["a"])(d["C"],e):null,color:n.color?Object(g["a"])(d["J"],e):null,texCoord0:n.texCoord0?Object(g["a"])(d["m"],e):null},parts:a,components:[]}}function E(t){return new O["a"]({data:t.data,wrap:N(t.parameters.wrap)})}function J(t,e){const n=new c["a"](D(t.color,t.opacity)),r=t.emissiveFactor?new c["a"](G(t.emissiveFactor)):null;return new f["a"]({color:n,colorTexture:Object(a["r"])(Object(a["c"])(t.textureColor,t=>e.get(t))),normalTexture:Object(a["r"])(Object(a["c"])(t.textureNormal,t=>e.get(t))),emissiveColor:r,emissiveTexture:Object(a["r"])(Object(a["c"])(t.textureEmissive,t=>e.get(t))),occlusionTexture:Object(a["r"])(Object(a["c"])(t.textureOcclusion,t=>e.get(t))),alphaMode:L(t.alphaMode),alphaCutoff:t.alphaCutoff,doubleSided:t.doubleSided,metallic:t.metallicFactor,roughness:t.roughnessFactor,metallicRoughnessTexture:Object(a["r"])(Object(a["c"])(t.textureMetallicRoughness,t=>e.get(t)))})}function R(t,e,n){e.writeVertices&&z(t,e);const c=e.gltf,r=I(c.indices||c.attributes.position.count,c.primitiveType),o=e.region.start;if(o)for(let a=0;a<r.length;a++)r[a]+=o;t.components.push(new b["a"]({faces:r,material:n.get(c.material),trustSourceNormals:!0}))}function z(t,e){const{position:n,normal:c,tangent:r,color:o,texCoord0:u}=t.vertexAttributes,l=e.region.start,{attributes:b,transform:f}=e.gltf,O=b.position.count;if(Object(p["e"])(n.slice(l,O),b.position,f),Object(a["k"])(b.normal)&&Object(a["k"])(c)){const t=Object(s["a"])(Object(i["b"])(),f);Object(p["a"])(c.slice(l,O),b.normal,t)}else Object(a["k"])(c)&&Object(C["b"])(c,0,0,1,{dstIndex:l,count:O});if(Object(a["k"])(b.tangent)&&Object(a["k"])(r)){const t=Object(s["a"])(Object(i["b"])(),f);Object(m["c"])(r.slice(l,O),b.tangent,t)}else Object(a["k"])(r)&&Object(B["b"])(r,0,0,1,1,{dstIndex:l,count:O});if(Object(a["k"])(b.texCoord0)&&Object(a["k"])(u)?Object(A["b"])(u.slice(l,O),b.texCoord0):Object(a["k"])(u)&&Object(A["a"])(u,0,0,{dstIndex:l,count:O}),Object(a["k"])(b.color)&&Object(a["k"])(o)){const t=b.color,e=o.slice(l,O);if(4===t.elementCount)t instanceof d["C"]?Object(m["b"])(e,t,255):t instanceof d["J"]?Object(B["a"])(e,t):t instanceof d["H"]&&Object(m["a"])(e,t,8);else{Object(B["b"])(e,255,255,255,255);const n=d["B"].fromTypedArray(e.typedBuffer,e.typedBufferStride);t instanceof d["u"]?Object(p["d"])(n,t,255):t instanceof d["B"]?Object(C["a"])(n,t):t instanceof d["z"]&&Object(p["b"])(n,t,8)}}else Object(a["k"])(o)&&Object(B["b"])(o.slice(l,O),255,255,255,255)}function I(t,e){switch(e){case 4:return Object(k["c"])(t,v["d"]);case 5:return Object(k["b"])(t);case 6:return Object(k["a"])(t)}}function L(t){switch(t){case"OPAQUE":return"opaque";case"MASK":return"mask";case"BLEND":return"blend"}}function N(t){return{horizontal:q(t.s),vertical:q(t.t)}}function q(t){switch(t){case 33071:return"clamp";case 33648:return"mirror";case 10497:return"repeat"}}function V(t){return t**(1/y["a"])*255}function D(t,e){return Object(l["c"])(V(t[0]),V(t[1]),V(t[2]),e)}function G(t){return Object(u["g"])(V(t[0]),V(t[1]),V(t[2]))}}}]);
//# sourceMappingURL=chunk-2d2290bf.c17b8210.js.map