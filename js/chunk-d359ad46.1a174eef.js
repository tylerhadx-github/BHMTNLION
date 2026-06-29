(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d359ad46"],{"0310":function(e,t,r){"use strict";r.d(t,"a",(function(){return B})),r.d(t,"b",(function(){return j}));var i=r("bd75"),n=r("17ca"),o=r("d272"),a=r("4db9"),s=r("d539"),c=r("c332"),l=r("b09a"),u=r("6cb2"),d=r("dfaf"),f=r("6d5b"),h=r("7d11"),p=r("17b0"),m=r("7e21"),v=r("d047"),b=r("0d7a"),g=r("7088"),x=r("ea4b"),y=r("c6d7"),T=r("aab5"),_=r("5d5f"),O=r("a7d7"),S=r("d017"),w=r("be24"),M=r("ebd5"),C=r("d56e"),A=r("3626"),E=r("3886"),P=r("690a");function j(e){const t=new P["a"],r=t.vertex.code,j=t.fragment.code;return t.include(C["a"],{name:"Default Material Shader",output:e.output}),t.vertex.uniforms.add("proj","mat4").add("view","mat4").add("camPos","vec3").add("localOrigin","vec3"),t.include(l["a"]),t.varyings.add("vpos","vec3"),t.include(w["a"],e),t.include(s["a"],e),t.include(p["a"],e),0!==e.output&&7!==e.output||(t.include(c["a"],e),t.include(a["a"],{linearDepth:!1}),0===e.normalType&&e.offsetBackfaces&&t.include(n["a"]),t.include(b["a"],e),t.include(h["a"],e),e.instancedColor&&t.attributes.add("instanceColor","vec4"),t.varyings.add("localvpos","vec3"),t.include(d["a"],e),t.include(i["a"],e),t.include(u["a"],e),t.include(f["a"],e),t.vertex.uniforms.add("externalColor","vec4"),t.varyings.add("vcolorExt","vec4"),e.multipassTerrainEnabled&&t.varyings.add("depth","float"),r.add(E["a"]`
      void main(void) {
        forwardNormalizedVertexColor();
        vcolorExt = externalColor;
        ${e.instancedColor?"vcolorExt *= instanceColor;":""}
        vcolorExt *= vvColor();
        vcolorExt *= getSymbolColor();
        forwardColorMixMode();

        if (vcolorExt.a < ${E["a"].float(M["c"])}) {
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        }
        else {
          vpos = calculateVPos();
          localvpos = vpos - view[3].xyz;
          vpos = subtractOrigin(vpos);
          ${0===e.normalType?E["a"]`
          vNormalWorld = dpNormal(vvLocalNormal(normalModel()));`:""}
          vpos = addVerticalOffset(vpos, localOrigin);
          ${e.vertexTangents?"vTangent = dpTransformVertexTangent(tangent);":""}
          gl_Position = transformPosition(proj, view, vpos);
          ${0===e.normalType&&e.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, camPos);":""}
        }

        ${e.multipassTerrainEnabled?"depth = (view * vec4(vpos, 1.0)).z;":""}
        forwardLinearDepth();
        forwardTextureCoordinates();
      }
    `)),7===e.output&&(t.include(o["a"],e),t.include(M["a"],e),e.multipassTerrainEnabled&&(t.fragment.include(v["a"]),t.include(y["b"],e)),t.fragment.uniforms.add("camPos","vec3").add("localOrigin","vec3").add("opacity","float").add("layerOpacity","float"),e.hasColorTexture&&t.fragment.uniforms.add("tex","sampler2D"),t.fragment.include(A["a"]),j.add(E["a"]`
      void main() {
        discardBySlice(vpos);
        ${e.multipassTerrainEnabled?"terrainDepthTest(gl_FragCoord, depth);":""}
        ${e.hasColorTexture?E["a"]`
        vec4 texColor = texture2D(tex, vuv0);
        ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
        discardOrAdjustAlpha(texColor);`:E["a"]`vec4 texColor = vec4(1.0);`}
        ${e.attributeColor?E["a"]`
        float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:E["a"]`
        float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));
        `}
        gl_FragColor = vec4(opacity_);
      }
    `)),0===e.output&&(t.include(o["a"],e),t.include(x["a"],e),t.include(g["a"],e),t.include(M["a"],e),e.receiveShadows&&t.include(S["a"],e),e.multipassTerrainEnabled&&(t.fragment.include(v["a"]),t.include(y["b"],e)),t.fragment.uniforms.add("camPos","vec3").add("localOrigin","vec3").add("ambient","vec3").add("diffuse","vec3").add("opacity","float").add("layerOpacity","float"),e.hasColorTexture&&t.fragment.uniforms.add("tex","sampler2D"),t.include(O["a"],e),t.include(_["a"],e),t.fragment.include(A["a"]),t.include(T["a"],e),j.add(E["a"]`
      void main() {
        discardBySlice(vpos);
        ${e.multipassTerrainEnabled?"terrainDepthTest(gl_FragCoord, depth);":""}
        ${e.hasColorTexture?E["a"]`
        vec4 texColor = texture2D(tex, vuv0);
        ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
        discardOrAdjustAlpha(texColor);`:E["a"]`vec4 texColor = vec4(1.0);`}
        shadingParams.viewDirection = normalize(vpos - camPos);
        ${3===e.normalType?E["a"]`
        vec3 normal = screenDerivativeNormal(localvpos);`:E["a"]`
        shadingParams.normalView = vNormalWorld;
        vec3 normal = shadingNormal(shadingParams);`}
        ${1===e.pbrMode?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse();
        ssao *= getBakedOcclusion();

        float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
        vec3 additionalLight = ssao * lightingMainIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
        ${e.receiveShadows?"float shadow = readShadowMap(vpos, linearDepth);":1===e.viewingMode?"float shadow = lightingGlobalFactor * (1.0 - additionalAmbientScale);":"float shadow = 0.0;"}
        vec3 matColor = max(ambient, diffuse);
        ${e.attributeColor?E["a"]`
        vec3 albedo_ = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
        float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:E["a"]`
        vec3 albedo_ = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
        float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));
        `}
        ${e.hasNormalTexture?E["a"]`
              mat3 tangentSpace = ${e.vertexTangents?"computeTangentSpace(normal);":"computeTangentSpace(normal, vpos, vuv0);"}
              vec3 shadedNormal = computeTextureNormal(tangentSpace, vuv0);`:"vec3 shadedNormal = normal;"}
        ${1===e.pbrMode||2===e.pbrMode?1===e.viewingMode?E["a"]`vec3 normalGround = normalize(vpos + localOrigin);`:E["a"]`vec3 normalGround = vec3(0.0, 0.0, 1.0);`:E["a"]``}
        ${1===e.pbrMode||2===e.pbrMode?E["a"]`
            float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * lightingMainIntensity[2];
            vec3 shadedColor = evaluateSceneLightingPBR(shadedNormal, albedo_, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:"vec3 shadedColor = evaluateSceneLighting(shadedNormal, albedo_, shadow, 1.0 - ssao, additionalLight);"}
        gl_FragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${e.OITEnabled?"gl_FragColor = premultiplyAlpha(gl_FragColor);":""}
      }
    `)),t.include(m["a"],e),t}const B=Object.freeze({__proto__:null,build:j})},"04f0":function(e,t,r){"use strict";r.d(t,"a",(function(){return y})),r.d(t,"b",(function(){return d})),r.d(t,"c",(function(){return z})),r.d(t,"d",(function(){return _})),r.d(t,"e",(function(){return f})),r.d(t,"f",(function(){return u}));var i=r("dae5"),n=r("b1390"),o=r("0b2d"),a=r("4212"),s=r("e431"),c=r("7577");function l(e){return e[0]=0,e[1]=0,e[2]=0,e[3]=1,e}function u(e,t,r){r*=.5;const i=Math.sin(r);return e[0]=i*t[0],e[1]=i*t[1],e[2]=i*t[2],e[3]=Math.cos(r),e}function d(e,t){const r=2*Math.acos(t[3]),i=Math.sin(r/2);return i>a["a"]?(e[0]=t[0]/i,e[1]=t[1]/i,e[2]=t[2]/i):(e[0]=1,e[1]=0,e[2]=0),r}function f(e,t,r){const i=t[0],n=t[1],o=t[2],a=t[3],s=r[0],c=r[1],l=r[2],u=r[3];return e[0]=i*u+a*s+n*l-o*c,e[1]=n*u+a*c+o*s-i*l,e[2]=o*u+a*l+i*c-n*s,e[3]=a*u-i*s-n*c-o*l,e}function h(e,t,r){r*=.5;const i=t[0],n=t[1],o=t[2],a=t[3],s=Math.sin(r),c=Math.cos(r);return e[0]=i*c+a*s,e[1]=n*c+o*s,e[2]=o*c-n*s,e[3]=a*c-i*s,e}function p(e,t,r){r*=.5;const i=t[0],n=t[1],o=t[2],a=t[3],s=Math.sin(r),c=Math.cos(r);return e[0]=i*c-o*s,e[1]=n*c+a*s,e[2]=o*c+i*s,e[3]=a*c-n*s,e}function m(e,t,r){r*=.5;const i=t[0],n=t[1],o=t[2],a=t[3],s=Math.sin(r),c=Math.cos(r);return e[0]=i*c+n*s,e[1]=n*c-i*s,e[2]=o*c+a*s,e[3]=a*c-o*s,e}function v(e,t){const r=t[0],i=t[1],n=t[2];return e[0]=r,e[1]=i,e[2]=n,e[3]=Math.sqrt(Math.abs(1-r*r-i*i-n*n)),e}function b(e,t,r,i){const n=t[0],o=t[1],s=t[2],c=t[3];let l,u,d,f,h,p=r[0],m=r[1],v=r[2],b=r[3];return u=n*p+o*m+s*v+c*b,u<0&&(u=-u,p=-p,m=-m,v=-v,b=-b),1-u>a["a"]?(l=Math.acos(u),d=Math.sin(l),f=Math.sin((1-i)*l)/d,h=Math.sin(i*l)/d):(f=1-i,h=i),e[0]=f*n+h*p,e[1]=f*o+h*m,e[2]=f*s+h*v,e[3]=f*c+h*b,e}function g(e){const t=Object(a["b"])(),r=Object(a["b"])(),i=Object(a["b"])(),n=Math.sqrt(1-t),o=Math.sqrt(t);return e[0]=n*Math.sin(2*Math.PI*r),e[1]=n*Math.cos(2*Math.PI*r),e[2]=o*Math.sin(2*Math.PI*i),e[3]=o*Math.cos(2*Math.PI*i),e}function x(e,t){const r=t[0],i=t[1],n=t[2],o=t[3],a=r*r+i*i+n*n+o*o,s=a?1/a:0;return e[0]=-r*s,e[1]=-i*s,e[2]=-n*s,e[3]=o*s,e}function y(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=t[3],e}function T(e,t){const r=t[0]+t[4]+t[8];let i;if(r>0)i=Math.sqrt(r+1),e[3]=.5*i,i=.5/i,e[0]=(t[5]-t[7])*i,e[1]=(t[6]-t[2])*i,e[2]=(t[1]-t[3])*i;else{let r=0;t[4]>t[0]&&(r=1),t[8]>t[3*r+r]&&(r=2);const n=(r+1)%3,o=(r+2)%3;i=Math.sqrt(t[3*r+r]-t[3*n+n]-t[3*o+o]+1),e[r]=.5*i,i=.5/i,e[3]=(t[3*n+o]-t[3*o+n])*i,e[n]=(t[3*n+r]+t[3*r+n])*i,e[o]=(t[3*o+r]+t[3*r+o])*i}return e}function _(e,t,r,i){const n=.5*Math.PI/180;t*=n,r*=n,i*=n;const o=Math.sin(t),a=Math.cos(t),s=Math.sin(r),c=Math.cos(r),l=Math.sin(i),u=Math.cos(i);return e[0]=o*c*u-a*s*l,e[1]=a*s*u+o*c*l,e[2]=a*c*l-o*s*u,e[3]=a*c*u+o*s*l,e}function O(e){return"quat("+e[0]+", "+e[1]+", "+e[2]+", "+e[3]+")"}const S=c["c"],w=c["k"],M=c["a"],C=f,A=c["b"],E=c["d"],P=c["i"],j=c["e"],B=j,F=c["f"],I=F,L=c["j"],z=c["g"],D=c["h"];function R(e,t,r){const i=Object(s["e"])(t,r);return i<-.999999?(Object(s["d"])(N,V,t),Object(s["u"])(N)<1e-6&&Object(s["d"])(N,k,t),Object(s["o"])(N,N),u(e,N,Math.PI),e):i>.999999?(e[0]=0,e[1]=0,e[2]=0,e[3]=1,e):(Object(s["d"])(N,t,r),e[0]=N[0],e[1]=N[1],e[2]=N[2],e[3]=1+i,L(e,e))}const N=Object(o["e"])(),V=Object(o["g"])(1,0,0),k=Object(o["g"])(0,1,0);function H(e,t,r,i,n,o){return b(U,t,n,o),b(W,r,i,o),b(e,U,W,2*o*(1-o)),e}const U=Object(n["b"])(),W=Object(n["b"])();function G(e,t,r,i){const n=q;return n[0]=r[0],n[3]=r[1],n[6]=r[2],n[1]=i[0],n[4]=i[1],n[7]=i[2],n[2]=-t[0],n[5]=-t[1],n[8]=-t[2],L(e,T(e,n))}const q=Object(i["b"])();Object.freeze({__proto__:null,identity:l,setAxisAngle:u,getAxisAngle:d,multiply:f,rotateX:h,rotateY:p,rotateZ:m,calculateW:v,slerp:b,random:g,invert:x,conjugate:y,fromMat3:T,fromEuler:_,str:O,copy:S,set:w,add:M,mul:C,scale:A,dot:E,lerp:P,length:j,len:B,squaredLength:F,sqrLen:I,normalize:L,exactEquals:z,equals:D,rotationTo:R,sqlerp:H,setAxes:G})},"0d7a":function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var i=r("7cb4"),n=r("3886");function o(e,t){const r=e.fragment;t.vertexTangents?(e.attributes.add("tangent","vec4"),e.varyings.add("vTangent","vec4"),2===t.doubleSidedMode?r.code.add(n["a"]`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = gl_FrontFacing ? vTangent.w : -vTangent.w;
vec3 tangent = normalize(gl_FrontFacing ? vTangent.xyz : -vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`):r.code.add(n["a"]`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = vTangent.w;
vec3 tangent = normalize(vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`)):(e.extensions.add("GL_OES_standard_derivatives"),r.code.add(n["a"]`mat3 computeTangentSpace(vec3 normal, vec3 pos, vec2 st) {
vec3 Q1 = dFdx(pos);
vec3 Q2 = dFdy(pos);
vec2 stx = dFdx(st);
vec2 sty = dFdy(st);
float det = stx.t * sty.s - sty.t * stx.s;
vec3 T = stx.t * Q2 - sty.t * Q1;
T = T - normal * dot(normal, T);
T *= inversesqrt(max(dot(T,T), 1.e-10));
vec3 B = sign(det) * cross(normal, T);
return mat3(T, B, normal);
}`)),0!==t.attributeTextureCoordinates&&(e.include(i["a"],t),r.uniforms.add("normalTexture","sampler2D"),r.uniforms.add("normalTextureSize","vec2"),r.code.add(n["a"]`
    vec3 computeTextureNormal(mat3 tangentSpace, vec2 uv) {
      vtc.uv = uv;
      ${t.supportsTextureAtlas?"vtc.size = normalTextureSize;":""}
      vec3 rawNormal = textureLookup(normalTexture, vtc).rgb * 2.0 - 1.0;
      return tangentSpace * rawNormal;
    }
  `))}},"17b0":function(e,t,r){"use strict";r.d(t,"a",(function(){return o})),r.d(t,"b",(function(){return a}));var i=r("3886");r("7c51");function n(e){e.vertex.code.add(i["a"]`float screenSizePerspectiveMinSize(float size, vec4 factor) {
float nonZeroSize = 1.0 - step(size, 0.0);
return (
factor.z * (
1.0 +
nonZeroSize *
2.0 * factor.w / (
size + (1.0 - nonZeroSize)
)
)
);
}`),e.vertex.code.add(i["a"]`float screenSizePerspectiveViewAngleDependentFactor(float absCosAngle) {
return absCosAngle * absCosAngle * absCosAngle;
}`),e.vertex.code.add(i["a"]`vec4 screenSizePerspectiveScaleFactor(float absCosAngle, float distanceToCamera, vec4 params) {
return vec4(
min(params.x / (distanceToCamera - params.y), 1.0),
screenSizePerspectiveViewAngleDependentFactor(absCosAngle),
params.z,
params.w
);
}`),e.vertex.code.add(i["a"]`float applyScreenSizePerspectiveScaleFactorFloat(float size, vec4 factor) {
return max(mix(size * factor.x, size, factor.y), screenSizePerspectiveMinSize(size, factor));
}`),e.vertex.code.add(i["a"]`float screenSizePerspectiveScaleFloat(float size, float absCosAngle, float distanceToCamera, vec4 params) {
return applyScreenSizePerspectiveScaleFactorFloat(
size,
screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params)
);
}`),e.vertex.code.add(i["a"]`vec2 applyScreenSizePerspectiveScaleFactorVec2(vec2 size, vec4 factor) {
return mix(size * clamp(factor.x, screenSizePerspectiveMinSize(size.y, factor) / size.y, 1.0), size, factor.y);
}`),e.vertex.code.add(i["a"]`vec2 screenSizePerspectiveScaleVec2(vec2 size, float absCosAngle, float distanceToCamera, vec4 params) {
return applyScreenSizePerspectiveScaleFactorVec2(size, screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params));
}`)}function o(e,t){const r=e.vertex.code;t.verticalOffsetEnabled?(e.vertex.uniforms.add("verticalOffset","vec4"),t.screenSizePerspectiveEnabled&&(e.include(n),e.vertex.uniforms.add("screenSizePerspectiveAlignment","vec4")),r.add(i["a"]`
    vec3 calculateVerticalOffset(vec3 worldPos, vec3 localOrigin) {
      float viewDistance = length((view * vec4(worldPos, 1.0)).xyz);
      ${1===t.viewingMode?i["a"]`vec3 worldNormal = normalize(worldPos + localOrigin);`:i["a"]`vec3 worldNormal = vec3(0.0, 0.0, 1.0);`}
      ${t.screenSizePerspectiveEnabled?i["a"]`
          float cosAngle = dot(worldNormal, normalize(worldPos - camPos));
          float verticalOffsetScreenHeight = screenSizePerspectiveScaleFloat(verticalOffset.x, abs(cosAngle), viewDistance, screenSizePerspectiveAlignment);`:i["a"]`
          float verticalOffsetScreenHeight = verticalOffset.x;`}
      // Screen sized offset in world space, used for example for line callouts
      float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * viewDistance, verticalOffset.z, verticalOffset.w);
      return worldNormal * worldOffset;
    }

    vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) {
      return worldPos + calculateVerticalOffset(worldPos, localOrigin);
    }
    `)):r.add(i["a"]`vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) { return worldPos; }`)}function a(e,t,r){if(!t.verticalOffset)return;const i=s(t.verticalOffset,r.camera.fovY,r.camera.fullViewport[3]),n=r.camera.pixelRatio||1;e.setUniform4f("verticalOffset",i.screenLength*n,i.perDistance,i.minWorldLength,i.maxWorldLength)}function s(e,t,r,i=c){return i.screenLength=e.screenLength,i.perDistance=Math.tan(.5*t)/(.5*r),i.minWorldLength=e.minWorldLength,i.maxWorldLength=e.maxWorldLength,i}const c={screenLength:0,perDistance:0,minWorldLength:0,maxWorldLength:0}},"17ca":function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var i=r("3886");function n(e){e.vertex.code.add(i["a"]`vec4 offsetBackfacingClipPosition(vec4 posClip, vec3 posWorld, vec3 normalWorld, vec3 camPosWorld) {
vec3 camToVert = posWorld - camPosWorld;
bool isBackface = dot(camToVert, normalWorld) > 0.0;
if (isBackface) {
posClip.z += 0.0000003 * posClip.w;
}
return posClip;
}`)}},"189c":function(e,t,r){"use strict";function i(e,t,r=32774,i=[0,0,0,0]){return{srcRgb:e,srcAlpha:e,dstRgb:t,dstAlpha:t,opRgb:r,opAlpha:r,color:{r:i[0],g:i[1],b:i[2],a:i[3]}}}function n(e,t,r,i,n=32774,o=32774,a=[0,0,0,0]){return{srcRgb:e,srcAlpha:t,dstRgb:r,dstAlpha:i,opRgb:n,opAlpha:o,color:{r:a[0],g:a[1],b:a[2],a:a[3]}}}r.d(t,"a",(function(){return N})),r.d(t,"b",(function(){return s})),r.d(t,"c",(function(){return l})),r.d(t,"d",(function(){return c})),r.d(t,"e",(function(){return g})),r.d(t,"f",(function(){return n})),r.d(t,"g",(function(){return i}));const o={face:1029,mode:2305},a={face:1028,mode:2305},s=e=>2===e?o:1===e?a:null,c={zNear:0,zFar:1},l={r:!0,g:!0,b:!0,a:!0};function u(e){return T.intern(e)}function d(e){return O.intern(e)}function f(e){return w.intern(e)}function h(e){return C.intern(e)}function p(e){return E.intern(e)}function m(e){return j.intern(e)}function v(e){return F.intern(e)}function b(e){return L.intern(e)}function g(e){return D.intern(e)}class x{constructor(e,t){this.makeKey=e,this.makeRef=t,this.interns=new Map}intern(e){if(!e)return null;const t=this.makeKey(e),r=this.interns;return r.has(t)||r.set(t,this.makeRef(e)),r.get(t)}}function y(e){return"["+e.join(",")+"]"}const T=new x(_,e=>({__tag:"Blending",...e}));function _(e){return e?y([e.srcRgb,e.srcAlpha,e.dstRgb,e.dstAlpha,e.opRgb,e.opAlpha,e.color.r,e.color.g,e.color.b,e.color.a]):null}const O=new x(S,e=>({__tag:"Culling",...e}));function S(e){return e?y([e.face,e.mode]):null}const w=new x(M,e=>({__tag:"PolygonOffset",...e}));function M(e){return e?y([e.factor,e.units]):null}const C=new x(A,e=>({__tag:"DepthTest",...e}));function A(e){return e?y([e.func]):null}const E=new x(P,e=>({__tag:"StencilTest",...e}));function P(e){return e?y([e.function.func,e.function.ref,e.function.mask,e.operation.fail,e.operation.zFail,e.operation.zPass]):null}const j=new x(B,e=>({__tag:"DepthWrite",...e}));function B(e){return e?y([e.zNear,e.zFar]):null}const F=new x(I,e=>({__tag:"ColorWrite",...e}));function I(e){return e?y([e.r,e.g,e.b,e.a]):null}const L=new x(z,e=>({__tag:"StencilWrite",...e}));function z(e){return e?y([e.mask]):null}const D=new x(R,e=>({blending:u(e.blending),culling:d(e.culling),polygonOffset:f(e.polygonOffset),depthTest:h(e.depthTest),stencilTest:p(e.stencilTest),depthWrite:m(e.depthWrite),colorWrite:v(e.colorWrite),stencilWrite:b(e.stencilWrite)}));function R(e){return e?y([_(e.blending),S(e.culling),M(e.polygonOffset),A(e.depthTest),P(e.stencilTest),B(e.depthWrite),I(e.colorWrite),z(e.stencilWrite)]):null}class N{constructor(e){this._pipelineInvalid=!0,this._blendingInvalid=!0,this._cullingInvalid=!0,this._polygonOffsetInvalid=!0,this._depthTestInvalid=!0,this._stencilTestInvalid=!0,this._depthWriteInvalid=!0,this._colorWriteInvalid=!0,this._stencilWriteInvalid=!0,this._stateSetters=e}setPipeline(e){(this._pipelineInvalid||e!==this._pipeline)&&(this.setBlending(e.blending),this.setCulling(e.culling),this.setPolygonOffset(e.polygonOffset),this.setDepthTest(e.depthTest),this.setStencilTest(e.stencilTest),this.setDepthWrite(e.depthWrite),this.setColorWrite(e.colorWrite),this.setStencilWrite(e.stencilWrite),this._pipeline=e),this._pipelineInvalid=!1}invalidateBlending(){this._blendingInvalid=!0,this._pipelineInvalid=!0}invalidateCulling(){this._cullingInvalid=!0,this._pipelineInvalid=!0}invalidatePolygonOffset(){this._polygonOffsetInvalid=!0,this._pipelineInvalid=!0}invalidateDepthTest(){this._depthTestInvalid=!0,this._pipelineInvalid=!0}invalidateStencilTest(){this._stencilTestInvalid=!0,this._pipelineInvalid=!0}invalidateDepthWrite(){this._depthWriteInvalid=!0,this._pipelineInvalid=!0}invalidateColorWrite(){this._colorWriteInvalid=!0,this._pipelineInvalid=!0}invalidateStencilWrite(){this._stencilTestInvalid=!0,this._pipelineInvalid=!0}setBlending(e){this._blending=this.setSubState(e,this._blending,this._blendingInvalid,this._stateSetters.setBlending),this._blendingInvalid=!1}setCulling(e){this._culling=this.setSubState(e,this._culling,this._cullingInvalid,this._stateSetters.setCulling),this._cullingInvalid=!1}setPolygonOffset(e){this._polygonOffset=this.setSubState(e,this._polygonOffset,this._polygonOffsetInvalid,this._stateSetters.setPolygonOffset),this._polygonOffsetInvalid=!1}setDepthTest(e){this._depthTest=this.setSubState(e,this._depthTest,this._depthTestInvalid,this._stateSetters.setDepthTest),this._depthTestInvalid=!1}setStencilTest(e){this._stencilTest=this.setSubState(e,this._stencilTest,this._stencilTestInvalid,this._stateSetters.setStencilTest),this._stencilTestInvalid=!1}setDepthWrite(e){this._depthWrite=this.setSubState(e,this._depthWrite,this._depthWriteInvalid,this._stateSetters.setDepthWrite),this._depthWriteInvalid=!1}setColorWrite(e){this._colorWrite=this.setSubState(e,this._colorWrite,this._colorWriteInvalid,this._stateSetters.setColorWrite),this._colorWriteInvalid=!1}setStencilWrite(e){this._stencilWrite=this.setSubState(e,this._stencilWrite,this._stencilWriteInvalid,this._stateSetters.setStencilWrite),this._stencilTestInvalid=!1}setSubState(e,t,r,i){return(r||e!==t)&&(i(e),this._pipelineInvalid=!0),e}}},1956:function(e,t,r){"use strict";r.d(t,"a",(function(){return d})),r.d(t,"b",(function(){return l})),r.d(t,"c",(function(){return u}));var i=r("ce50"),n=r("c120"),o=r("e92d");const a=o["a"].getLogger("esri/views/webgl");function s(e,t){switch(t){case e.INVALID_ENUM:return"Invalid Enum. An unacceptable value has been specified for an enumerated argument.";case e.INVALID_VALUE:return"Invalid Value. A numeric argument is out of range.";case e.INVALID_OPERATION:return"Invalid Operation. The specified command is not allowed for the current state.";case e.INVALID_FRAMEBUFFER_OPERATION:return"Invalid Framebuffer operation. The currently bound framebuffer is not framebuffer complete when trying to render to or to read from it.";case e.OUT_OF_MEMORY:return"Out of memory. Not enough memory is left to execute the command.";case e.CONTEXT_LOST_WEBGL:return"WebGL context has been lost";default:return"Unknown error"}}const c=!!Object(n["a"])("enable-feature:webgl-debug");function l(){return c}function u(){return c}function d(e){if(l()){const t=e.getError();if(t){const r=s(e,t),n=(new Error).stack;a.error(new i["a"]("webgl-error","WebGL error occured",{message:r,stack:n}))}}}},"2db0":function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var i=r("2eab");async function n(e,t){const{data:r}=await Object(i["default"])(e,{responseType:"image",...t});return r}},3626:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var i=r("3886");function n(e){e.code.add(i["a"]`vec4 premultiplyAlpha(vec4 v) {
return vec4(v.rgb * v.a, v.a);
}
vec3 rgb2hsv(vec3 c) {
vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);
float d = q.x - min(q.w, q.y);
float e = 1.0e-10;
return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), min(d / (q.x + e), 1.0), q.x);
}
vec3 hsv2rgb(vec3 c) {
vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
float rgb2v(vec3 c) {
return max(c.x, max(c.y, c.z));
}`)}function o(e){e.include(n),e.code.add(i["a"]`
    vec3 mixExternalColor(vec3 internalColor, vec3 textureColor, vec3 externalColor, int mode) {
      // workaround for artifacts in OSX using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      vec3 internalMixed = internalColor * textureColor;
      vec3 allMixed = internalMixed * externalColor;

      if (mode == ${i["a"].int(1)}) {
        return allMixed;
      }
      else if (mode == ${i["a"].int(2)}) {
        return internalMixed;
      }
      else if (mode == ${i["a"].int(3)}) {
        return externalColor;
      }
      else {
        // tint (or something invalid)
        float vIn = rgb2v(internalMixed);
        vec3 hsvTint = rgb2hsv(externalColor);
        vec3 hsvOut = vec3(hsvTint.x, hsvTint.y, vIn * hsvTint.z);
        return hsv2rgb(hsvOut);
      }
    }

    float mixExternalOpacity(float internalOpacity, float textureOpacity, float externalOpacity, int mode) {
      // workaround for artifacts in OSX using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      float internalMixed = internalOpacity * textureOpacity;
      float allMixed = internalMixed * externalOpacity;

      if (mode == ${i["a"].int(2)}) {
        return internalMixed;
      }
      else if (mode == ${i["a"].int(3)}) {
        return externalOpacity;
      }
      else {
        // multiply or tint (or something invalid)
        return allMixed;
      }
    }
  `)}},3886:function(e,t,r){"use strict";function i(e,...t){let r="";for(let i=0;i<t.length;i++)r+=e[i]+t[i];return r+=e[e.length-1],r}r.d(t,"a",(function(){return i})),function(e){function t(e){return Math.round(e).toString()}function r(e){return e.toPrecision(8)}e.int=t,e.float=r}(i||(i={}))},"47f8":function(e,t,r){"use strict";function i(){return new Float32Array(3)}function n(e){const t=new Float32Array(3);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t}function o(e,t,r){const i=new Float32Array(3);return i[0]=e,i[1]=t,i[2]=r,i}function a(e,t){return new Float32Array(e,t,3)}function s(){return i()}function c(){return o(1,1,1)}function l(){return o(1,0,0)}function u(){return o(0,1,0)}function d(){return o(0,0,1)}r.d(t,"a",(function(){return i})),r.d(t,"b",(function(){return o}));const f=s(),h=c(),p=l(),m=u(),v=d();Object.freeze({__proto__:null,create:i,clone:n,fromValues:o,createView:a,zeros:s,ones:c,unitX:l,unitY:u,unitZ:d,ZEROS:f,ONES:h,UNIT_X:p,UNIT_Y:m,UNIT_Z:v})},"4c96":function(e,t,r){"use strict";function i(e,t,r){const i=e.typedBuffer,n=e.typedBufferStride,o=t.typedBuffer,a=t.typedBufferStride,s=r?r.count:t.count;let c=(r&&r.dstIndex?r.dstIndex:0)*n,l=(r&&r.srcIndex?r.srcIndex:0)*a;for(let u=0;u<s;++u)i[c]=o[l],i[c+1]=o[l+1],i[c+2]=o[l+2],c+=n,l+=a}function n(e,t,r,i,n){var o,a;const s=e.typedBuffer,c=e.typedBufferStride,l=null!=(o=null==n?void 0:n.count)?o:e.count;let u=(null!=(a=null==n?void 0:n.dstIndex)?a:0)*c;for(let d=0;d<l;++d)s[u]=t,s[u+1]=r,s[u+2]=i,u+=c}r.d(t,"a",(function(){return i})),r.d(t,"b",(function(){return n}));Object.freeze({__proto__:null,copy:i,fill:n})},"4db9":function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var i=r("3886");function n(e,t){t.linearDepth?e.vertex.code.add(i["a"]`vec4 transformPositionWithDepth(mat4 proj, mat4 view, vec3 pos, vec2 nearFar, out float depth) {
vec4 eye = view * vec4(pos, 1.0);
depth = (-eye.z - nearFar[0]) / (nearFar[1] - nearFar[0]) ;
return proj * eye;
}`):e.vertex.code.add(i["a"]`vec4 transformPosition(mat4 proj, mat4 view, vec3 pos) {
return proj * (view * vec4(pos, 1.0));
}`)}},"501b":function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var i=r("3886");function n(e){e.code.add(i["a"]`const float MAX_RGBA_FLOAT =
255.0 / 256.0 +
255.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 / 256.0;
const vec4 FIXED_POINT_FACTORS = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);
vec4 float2rgba(const float value) {
float valueInValidDomain = clamp(value, 0.0, MAX_RGBA_FLOAT);
vec4 fixedPointU8 = floor(fract(valueInValidDomain * FIXED_POINT_FACTORS) * 256.0);
const float toU8AsFloat = 1.0 / 255.0;
return fixedPointU8 * toU8AsFloat;
}
const vec4 RGBA_2_FLOAT_FACTORS = vec4(
255.0 / (256.0),
255.0 / (256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0 * 256.0)
);
float rgba2float(vec4 rgba) {
return dot(rgba, RGBA_2_FLOAT_FACTORS);
}`)}},"5d5f":function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var i=r("3886");function n(e){const t=e.fragment.code;t.add(i["a"]`vec3 evaluateDiffuseIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float NdotNG)
{
return ((1.0 - NdotNG) * ambientGround + (1.0 + NdotNG) * ambientSky) * 0.5;
}`),t.add(i["a"]`float integratedRadiance(float cosTheta2, float roughness)
{
return (cosTheta2 - 1.0) / (cosTheta2 * (1.0 - roughness * roughness) - 1.0);
}`),t.add(i["a"]`vec3 evaluateSpecularIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float RdotNG, float roughness)
{
float cosTheta2 = 1.0 - RdotNG * RdotNG;
float intRadTheta = integratedRadiance(cosTheta2, roughness);
float ground = RdotNG < 0.0 ? 1.0 - intRadTheta : 1.0 + intRadTheta;
float sky = 2.0 - ground;
return (ground * ambientGround + sky * ambientSky) * 0.5;
}`)}var o=r("c51b");function a(e,t){const r=e.fragment.code;e.include(o["a"]),3===t.pbrMode||4===t.pbrMode?(r.add(i["a"]`
    struct PBRShadingWater
    {
        float NdotL;   // cos angle between normal and light direction
        float NdotV;   // cos angle between normal and view direction
        float NdotH;   // cos angle between normal and half vector
        float VdotH;   // cos angle between view direction and half vector
        float LdotH;   // cos angle between light direction and half vector
        float VdotN;   // cos angle between view direction and normal vector
    };

    float dtrExponent = ${t.useCustomDTRExponentForWater?"2.2":"2.0"};
    `),r.add(i["a"]`vec3 fresnelReflection(float angle, vec3 f0, float f90) {
return f0 + (f90 - f0) * pow(1.0 - angle, 5.0);
}`),r.add(i["a"]`float normalDistributionWater(float NdotH, float roughness)
{
float r2 = roughness * roughness;
float NdotH2 = NdotH * NdotH;
float denom = pow((NdotH2 * (r2 - 1.0) + 1.0), dtrExponent) * PI;
return r2 / denom;
}`),r.add(i["a"]`float geometricOcclusionKelemen(float LoH)
{
return 0.25 / (LoH * LoH);
}`),r.add(i["a"]`vec3 brdfSpecularWater(in PBRShadingWater props, float roughness, vec3 F0, float F0Max)
{
vec3  F = fresnelReflection(props.VdotH, F0, F0Max);
float dSun = normalDistributionWater(props.NdotH, roughness);
float V = geometricOcclusionKelemen(props.LdotH);
float diffusionSunHaze = mix(roughness + 0.045, roughness + 0.385, 1.0 - props.VdotH);
float strengthSunHaze  = 1.2;
float dSunHaze = normalDistributionWater(props.NdotH, diffusionSunHaze)*strengthSunHaze;
return ((dSun + dSunHaze) * V) * F;
}
vec3 tonemapACES(const vec3 x) {
return (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14);
}`)):1!==t.pbrMode&&2!==t.pbrMode||(e.include(n),r.add(i["a"]`struct PBRShadingInfo
{
float NdotL;
float NdotV;
float NdotH;
float VdotH;
float LdotH;
float NdotNG;
float RdotNG;
float NdotAmbDir;
float NdotH_Horizon;
vec3 skyRadianceToSurface;
vec3 groundRadianceToSurface;
vec3 skyIrradianceToSurface;
vec3 groundIrradianceToSurface;
float averageAmbientRadiance;
float ssao;
vec3 albedoLinear;
vec3 f0;
vec3 f90;
vec3 diffuseColor;
float metalness;
float roughness;
};`),r.add(i["a"]`float normalDistribution(float NdotH, float roughness)
{
float a = NdotH * roughness;
float b = roughness / (1.0 - NdotH * NdotH + a * a);
return b * b * INV_PI;
}`),r.add(i["a"]`const vec4 c0 = vec4(-1.0, -0.0275, -0.572,  0.022);
const vec4 c1 = vec4( 1.0,  0.0425,  1.040, -0.040);
const vec2 c2 = vec2(-1.04, 1.04);
vec2 prefilteredDFGAnalytical(float roughness, float NdotV) {
vec4 r = roughness * c0 + c1;
float a004 = min(r.x * r.x, exp2(-9.28 * NdotV)) * r.x + r.y;
return c2 * a004 + r.zw;
}`),r.add(i["a"]`vec3 evaluateEnvironmentIllumination(PBRShadingInfo inputs) {
vec3 indirectDiffuse = evaluateDiffuseIlluminationHemisphere(inputs.groundIrradianceToSurface, inputs.skyIrradianceToSurface, inputs.NdotNG);
vec3 indirectSpecular = evaluateSpecularIlluminationHemisphere(inputs.groundRadianceToSurface, inputs.skyRadianceToSurface, inputs.RdotNG, inputs.roughness);
vec3 diffuseComponent = inputs.diffuseColor * indirectDiffuse * INV_PI;
vec2 dfg = prefilteredDFGAnalytical(inputs.roughness, inputs.NdotV);
vec3 specularColor = inputs.f0 * dfg.x + inputs.f90 * dfg.y;
vec3 specularComponent = specularColor * indirectSpecular;
return (diffuseComponent + specularComponent);
}`),r.add(i["a"]`float gamutMapChanel(float x, vec2 p){
return (x < p.x) ? mix(0.0, p.y, x/p.x) : mix(p.y, 1.0, (x - p.x) / (1.0 - p.x) );
}`),r.add(i["a"]`vec3 blackLevelSoftCompression(vec3 inColor, PBRShadingInfo inputs){
vec3 outColor;
vec2 p = vec2(0.02 * (inputs.averageAmbientRadiance), 0.0075 * (inputs.averageAmbientRadiance));
outColor.x = gamutMapChanel(inColor.x, p) ;
outColor.y = gamutMapChanel(inColor.y, p) ;
outColor.z = gamutMapChanel(inColor.z, p) ;
return outColor;
}`))}},6415:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var i=r("e92d");const n=i["a"].getLogger("esri.views.3d.support.buffer.math")},"668b":function(e,t,r){"use strict";r.d(t,"a",(function(){return o})),r.d(t,"b",(function(){return c})),r.d(t,"c",(function(){return s})),r.d(t,"d",(function(){return a})),r.d(t,"e",(function(){return n}));var i=r("6415");function n(e,t,r){if(e.count!==t.count)return void i["a"].error("source and destination buffers need to have the same number of elements");const n=e.count,o=r[0],a=r[1],s=r[2],c=r[4],l=r[5],u=r[6],d=r[8],f=r[9],h=r[10],p=r[12],m=r[13],v=r[14],b=e.typedBuffer,g=e.typedBufferStride,x=t.typedBuffer,y=t.typedBufferStride;for(let i=0;i<n;i++){const e=i*g,t=i*y,r=x[t],n=x[t+1],T=x[t+2];b[e]=o*r+c*n+d*T+p,b[e+1]=a*r+l*n+f*T+m,b[e+2]=s*r+u*n+h*T+v}}function o(e,t,r){if(e.count!==t.count)return void i["a"].error("source and destination buffers need to have the same number of elements");const n=e.count,o=r[0],a=r[1],s=r[2],c=r[3],l=r[4],u=r[5],d=r[6],f=r[7],h=r[8],p=e.typedBuffer,m=e.typedBufferStride,v=t.typedBuffer,b=t.typedBufferStride;for(let i=0;i<n;i++){const e=i*m,t=i*b,r=v[t],n=v[t+1],g=v[t+2];p[e]=o*r+c*n+d*g,p[e+1]=a*r+l*n+f*g,p[e+2]=s*r+u*n+h*g}}function a(e,t,r){const i=Math.min(e.count,t.count),n=e.typedBuffer,o=e.typedBufferStride,a=t.typedBuffer,s=t.typedBufferStride;for(let c=0;c<i;c++){const e=c*o,t=c*s;n[e]=r*a[t],n[e+1]=r*a[t+1],n[e+2]=r*a[t+2]}}function s(e,t){const r=Math.min(e.count,t.count),i=e.typedBuffer,n=e.typedBufferStride,o=t.typedBuffer,a=t.typedBufferStride;for(let s=0;s<r;s++){const e=s*n,t=s*a,r=o[t],c=o[t+1],l=o[t+2],u=Math.sqrt(r*r+c*c+l*l);if(u>0){const t=1/u;i[e]=t*r,i[e+1]=t*c,i[e+2]=t*l}}}function c(e,t,r){const i=Math.min(e.count,t.count),n=e.typedBuffer,o=e.typedBufferStride,a=t.typedBuffer,s=t.typedBufferStride;for(let c=0;c<i;c++){const e=c*o,t=c*s;n[e]=a[t]>>r,n[e+1]=a[t+1]>>r,n[e+2]=a[t+2]>>r}}Object.freeze({__proto__:null,transformMat4:n,transformMat3:o,scale:a,normalize:s,shiftRight:c})},"690a":function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var i=r("e92d");const n=i["a"].getLogger("esri.views.3d.webgl-engine.core.shaderModules.shaderBuilder");class o{constructor(){this.includedModules=new Map}include(e,t){this.includedModules.has(e)?this.includedModules.get(e)!==t&&n.error("Trying to include shader module multiple times with different sets of options."):(this.includedModules.set(e,t),e(this.builder,t))}}class a extends o{constructor(){super(...arguments),this.vertex=new l,this.fragment=new l,this.attributes=new u,this.varyings=new d,this.extensions=new f,this.constants=new h}get fragmentUniforms(){return this.fragment.uniforms}get builder(){return this}generateSource(e){const t=this.extensions.generateSource(e),r=this.attributes.generateSource(e),i=this.varyings.generateSource(),n="vertex"===e?this.vertex:this.fragment,o=n.uniforms.generateSource(),a=n.code.generateSource(),s="vertex"===e?m:p,c=this.constants.generateSource().concat(n.constants.generateSource());return`\n${t.join("\n")}\n\n${s}\n\n${c.join("\n")}\n\n${o.join("\n")}\n\n${r.join("\n")}\n\n${i.join("\n")}\n\n${a.join("\n")}`}}class s{constructor(){this._entries=new Map}add(e,t,r){const i=`${e}_${t}_${r}`;return this._entries.set(i,{name:e,type:t,arraySize:r}),this}generateSource(){const e=e=>e?`[${e}]`:"";return Array.from(this._entries.values()).map(t=>`uniform ${t.type} ${t.name}${e(t.arraySize)};`)}get entries(){return Array.from(this._entries.values())}}class c{constructor(){this._entries=new Array}add(e){this._entries.push(e)}generateSource(){return this._entries}}class l extends o{constructor(){super(...arguments),this.uniforms=new s,this.code=new c,this.constants=new h}get builder(){return this}}class u{constructor(){this._entries=new Array}add(e,t){this._entries.push([e,t])}generateSource(e){return"fragment"===e?[]:this._entries.map(e=>`attribute ${e[1]} ${e[0]};`)}}class d{constructor(){this._entries=new Array}add(e,t){this._entries.push([e,t])}generateSource(){return this._entries.map(e=>`varying ${e[1]} ${e[0]};`)}}class f{constructor(){this._entries=new Set}add(e){this._entries.add(e)}generateSource(e){const t="vertex"===e?f.ALLOWLIST_VERTEX:f.ALLOWLIST_FRAGMENT;return Array.from(this._entries).filter(e=>t.includes(e)).map(e=>`#extension ${e} : enable`)}}f.ALLOWLIST_FRAGMENT=["GL_EXT_shader_texture_lod","GL_OES_standard_derivatives"],f.ALLOWLIST_VERTEX=[];class h{constructor(){this._entries=[]}add(e,t,r){let i="ERROR_CONSTRUCTOR_STRING";switch(t){case"float":i=h.numberToFloatStr(r);break;case"int":i=h.numberToIntStr(r);break;case"bool":i=r.toString();break;case"vec2":i=`vec2(${h.numberToFloatStr(r[0])},                            ${h.numberToFloatStr(r[1])})`;break;case"vec3":i=`vec3(${h.numberToFloatStr(r[0])},                            ${h.numberToFloatStr(r[1])},                            ${h.numberToFloatStr(r[2])})`;break;case"vec4":i=`vec4(${h.numberToFloatStr(r[0])},                            ${h.numberToFloatStr(r[1])},                            ${h.numberToFloatStr(r[2])},                            ${h.numberToFloatStr(r[3])})`;break;case"ivec2":i=`ivec2(${h.numberToIntStr(r[0])},                             ${h.numberToIntStr(r[1])})`;break;case"ivec3":i=`ivec3(${h.numberToIntStr(r[0])},                             ${h.numberToIntStr(r[1])},                             ${h.numberToIntStr(r[2])})`;break;case"ivec4":i=`ivec4(${h.numberToIntStr(r[0])},                             ${h.numberToIntStr(r[1])},                             ${h.numberToIntStr(r[2])},                             ${h.numberToIntStr(r[3])})`;break;case"mat2":case"mat3":case"mat4":i=`${t}(${Array.prototype.map.call(r,e=>h.numberToFloatStr(e)).join(", ")})`}return this._entries.push(`const ${t} ${e} = ${i};`),this}static numberToIntStr(e){return e.toFixed(0)}static numberToFloatStr(e){return Number.isInteger(e)?e.toFixed(1):e.toString()}generateSource(){return Array.from(this._entries)}}const p="#ifdef GL_FRAGMENT_PRECISION_HIGH\n  precision highp float;\n  precision highp sampler2D;\n#else\n  precision mediump float;\n  precision mediump sampler2D;\n#endif",m="precision highp float;\nprecision highp sampler2D;"},"6a07":function(e,t,r){"use strict";r.d(t,"a",(function(){return s})),r.d(t,"b",(function(){return c}));var i=r("0fc4"),n=r("3886");const o=Object(i["c"])(1,1,0,1),a=Object(i["c"])(1,0,1,1);function s(e){e.fragment.uniforms.add("depthTex","sampler2D"),e.fragment.uniforms.add("highlightViewportPixelSz","vec4"),e.fragment.constants.add("occludedHighlightFlag","vec4",o).add("unoccludedHighlightFlag","vec4",a),e.fragment.code.add(n["a"]`void outputHighlight() {
vec4 fragCoord = gl_FragCoord;
float sceneDepth = texture2D(depthTex, (fragCoord.xy - highlightViewportPixelSz.xy) * highlightViewportPixelSz.zw).r;
if (fragCoord.z > sceneDepth + 5e-7) {
gl_FragColor = occludedHighlightFlag;
}
else {
gl_FragColor = unoccludedHighlightFlag;
}
}`)}function c(e,t){e.bindTexture(t.highlightDepthTexture,"depthTex"),e.setUniform4f("highlightViewportPixelSz",0,0,t.inverseViewport[0],t.inverseViewport[1])}},"6a21":function(e,t,r){"use strict";r.d(t,"a",(function(){return o})),r.d(t,"b",(function(){return a}));var i=r("c120"),n=r("3886");function o({code:e},t){t.doublePrecisionRequiresObfuscation?e.add(n["a"]`vec3 dpPlusFrc(vec3 a, vec3 b) {
return mix(a, a + b, vec3(notEqual(b, vec3(0))));
}
vec3 dpMinusFrc(vec3 a, vec3 b) {
return mix(vec3(0), a - b, vec3(notEqual(a, b)));
}
vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 t1 = dpPlusFrc(hiA, hiB);
vec3 e = dpMinusFrc(t1, hiA);
vec3 t2 = dpMinusFrc(hiB, e) + dpMinusFrc(hiA, dpMinusFrc(t1, e)) + loA + loB;
return t1 + t2;
}`):e.add(n["a"]`vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 t1 = hiA + hiB;
vec3 e = t1 - hiA;
vec3 t2 = ((hiB - e) + (hiA - (t1 - e))) + loA + loB;
return t1 + t2;
}`)}function a(e){return!!Object(i["a"])("force-double-precision-obfuscation")||e.driverTest.doublePrecisionRequiresObfuscation}},"6cb2":function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var i=r("3886");function n(e){e.vertex.code.add(i["a"]`
    vec4 decodeSymbolColor(vec4 symbolColor, out int colorMixMode) {
      float symbolAlpha = 0.0;

      const float maxTint = 85.0;
      const float maxReplace = 170.0;
      const float scaleAlpha = 3.0;

      if (symbolColor.a > maxReplace) {
        colorMixMode = ${i["a"].int(1)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxReplace);
      } else if (symbolColor.a > maxTint) {
        colorMixMode = ${i["a"].int(3)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxTint);
      } else if (symbolColor.a > 0.0) {
        colorMixMode = ${i["a"].int(4)};
        symbolAlpha = scaleAlpha * symbolColor.a;
      } else {
        colorMixMode = ${i["a"].int(1)};
        symbolAlpha = 0.0;
      }

      return vec4(symbolColor.r, symbolColor.g, symbolColor.b, symbolAlpha);
    }
  `)}function o(e,t){t.symbolColor?(e.include(n),e.attributes.add("symbolColor","vec4"),e.varyings.add("colorMixMode","mediump float")):e.fragment.uniforms.add("colorMixMode","int"),t.symbolColor?e.vertex.code.add(i["a"]`int symbolColorMixMode;
vec4 getSymbolColor() {
return decodeSymbolColor(symbolColor, symbolColorMixMode) * 0.003921568627451;
}
void forwardColorMixMode() {
colorMixMode = float(symbolColorMixMode) + 0.5;
}`):e.vertex.code.add(i["a"]`vec4 getSymbolColor() { return vec4(1.0); }
void forwardColorMixMode() {}`)}},"6d5b":function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var i=r("3886");function n(e,t){t.attributeColor?(e.attributes.add("color","vec4"),e.varyings.add("vColor","vec4"),e.vertex.code.add(i["a"]`void forwardVertexColor() { vColor = color; }`),e.vertex.code.add(i["a"]`void forwardNormalizedVertexColor() { vColor = color * 0.003921568627451; }`)):e.vertex.code.add(i["a"]`void forwardVertexColor() {}
void forwardNormalizedVertexColor() {}`)}},7088:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var i=r("3886");function n(e,t){const r=e.fragment;t.receiveAmbientOcclusion?(r.uniforms.add("ssaoTex","sampler2D"),r.uniforms.add("viewportPixelSz","vec4"),r.code.add(i["a"]`float evaluateAmbientOcclusion() {
return 1.0 - texture2D(ssaoTex, (gl_FragCoord.xy - viewportPixelSz.xy) * viewportPixelSz.zw).a;
}
float evaluateAmbientOcclusionInverse() {
float ssao = texture2D(ssaoTex, (gl_FragCoord.xy - viewportPixelSz.xy) * viewportPixelSz.zw).a;
return viewportPixelSz.z < 0.0 ? 1.0 : ssao;
}`)):r.code.add(i["a"]`float evaluateAmbientOcclusion() { return 0.0; }
float evaluateAmbientOcclusionInverse() { return 1.0; }`)}},7438:function(e,t,r){"use strict";r.d(t,"a",(function(){return s})),r.d(t,"b",(function(){return d})),r.d(t,"c",(function(){return c})),r.d(t,"d",(function(){return a})),r.d(t,"e",(function(){return n})),r.d(t,"f",(function(){return u}));var i=r("189c");const n=Object(i["f"])(770,1,771,771),o=Object(i["g"])(1,1),a=Object(i["g"])(0,771);function s(e){return 2===e?null:1===e?a:o}const c=5e5,l={factor:-1,units:-2};function u(e){return e?l:null}function d(e){return 3===e||2===e?513:515}},"7c51":function(e,t,r){"use strict";r.d(t,"a",(function(){return j})),r.d(t,"b",(function(){return L})),r.d(t,"c",(function(){return B})),r.d(t,"d",(function(){return g})),r.d(t,"e",(function(){return F})),r.d(t,"f",(function(){return P}));var i=r("38a4"),n=r("b2b2"),o=r("e431"),a=r("0b2d"),s=r("4261");function c(e){return Math.abs(e*e*e)}function l(e,t,r){const i=r.parameters,n=r.paddingPixelsOverride;return h.scale=Math.min(i.divisor/(t-i.offset),1),h.factor=c(e),h.minPixelSize=i.minPixelSize,h.paddingPixels=n,h}function u(e,t){return 0===e?t.minPixelSize:t.minPixelSize*(1+2*t.paddingPixels/e)}function d(e,t){return Math.max(Object(i["k"])(e*t.scale,e,t.factor),u(e,t))}function f(e,t,r,i){return d(e,l(t,r,i))}Object(i["g"])(10),Object(i["g"])(12),Object(i["g"])(70),Object(i["g"])(40);const h={scale:0,factor:0,minPixelSize:0,paddingPixels:0};var p=r("1153"),m=(r("d791"),r("afe1"));r("9cc4");function v(e){return!!Object(n["k"])(e)&&!e.visible}new Float64Array(3),new Float32Array(6),Object(m["d"])();const b=Object(s["b"])();function g(e,t,r,i,n,o,a){if(!v(t))if(e.boundingInfo){Object(p["a"])(0===e.primitiveType);const t=r.tolerance;y(e.boundingInfo,i,n,t,o,a)}else{const t=e.indices.get("position"),r=e.vertexAttributes.get("position");_(i,n,0,t.length/3,t,r,void 0,o,a)}}const x=Object(a["e"])();function y(e,t,r,i,o,a){if(Object(n["j"])(e))return;const c=C(t,r,x);if(Object(s["l"])(b,e.getBBMin()),Object(s["k"])(b,e.getBBMax()),Object(n["k"])(o)&&o.applyToAabb(b),A(b,t,c,i)){const{primitiveIndices:n,indices:s,position:c}=e,l=n?n.length:s.length/3;if(l>z){const n=e.getChildren();if(void 0!==n){for(let e=0;e<8;++e)void 0!==n[e]&&y(n[e],t,r,i,o,a);return}}_(t,r,0,l,s,c,n,o,a)}}const T=Object(a["e"])();function _(e,t,r,i,o,a,s,c,l){if(s)return O(e,t,r,i,o,a,s,c,l);const u=a.data,d=a.stride||a.size,f=e[0],h=e[1],p=e[2],m=t[0]-f,v=t[1]-h,b=t[2]-p;for(let g=r,x=3*r;g<i;++g){let e=d*o[x++],t=u[e++],r=u[e++],i=u[e];e=d*o[x++];let a=u[e++],s=u[e++],y=u[e];e=d*o[x++];let _=u[e++],O=u[e++],S=u[e];Object(n["k"])(c)&&([t,r,i]=c.applyToVertex(t,r,i,g),[a,s,y]=c.applyToVertex(a,s,y,g),[_,O,S]=c.applyToVertex(_,O,S,g));const w=a-t,C=s-r,A=y-i,E=_-t,P=O-r,j=S-i,B=v*j-P*b,F=b*E-j*m,I=m*P-E*v,L=w*B+C*F+A*I;if(Math.abs(L)<=Number.EPSILON)continue;const z=f-t,D=h-r,R=p-i,N=z*B+D*F+R*I;if(L>0){if(N<0||N>L)continue}else if(N>0||N<L)continue;const V=D*A-C*R,k=R*w-A*z,H=z*C-w*D,U=m*V+v*k+b*H;if(L>0){if(U<0||N+U>L)continue}else if(U>0||N+U<L)continue;const W=(E*V+P*k+j*H)/L;W>=0&&l(W,M(w,C,A,E,P,j,T),g,!1)}}function O(e,t,r,i,o,a,s,c,l){const u=a.data,d=a.stride||a.size,f=e[0],h=e[1],p=e[2],m=t[0]-f,v=t[1]-h,b=t[2]-p;for(let g=r;g<i;++g){const e=s[g];let t=3*e,r=d*o[t++],i=u[r++],a=u[r++],x=u[r];r=d*o[t++];let y=u[r++],_=u[r++],O=u[r];r=d*o[t];let S=u[r++],w=u[r++],C=u[r];Object(n["k"])(c)&&([i,a,x]=c.applyToVertex(i,a,x,g),[y,_,O]=c.applyToVertex(y,_,O,g),[S,w,C]=c.applyToVertex(S,w,C,g));const A=y-i,E=_-a,P=O-x,j=S-i,B=w-a,F=C-x,I=v*F-B*b,L=b*j-F*m,z=m*B-j*v,D=A*I+E*L+P*z;if(Math.abs(D)<=Number.EPSILON)continue;const R=f-i,N=h-a,V=p-x,k=R*I+N*L+V*z;if(D>0){if(k<0||k>D)continue}else if(k>0||k<D)continue;const H=N*P-E*V,U=V*A-P*R,W=R*E-A*N,G=m*H+v*U+b*W;if(D>0){if(G<0||k+G>D)continue}else if(G>0||k+G<D)continue;const q=(j*H+B*U+F*W)/D;q>=0&&l(q,M(A,E,P,j,B,F,T),e,!1)}}const S=Object(a["e"])(),w=Object(a["e"])();function M(e,t,r,i,n,a,s){return Object(o["s"])(S,e,t,r),Object(o["s"])(w,i,n,a),Object(o["d"])(s,S,w),Object(o["o"])(s,s),s}function C(e,t,r){return Object(o["s"])(r,1/(t[0]-e[0]),1/(t[1]-e[1]),1/(t[2]-e[2]))}function A(e,t,r,i){return E(e,t,r,i,1/0)}function E(e,t,r,i,n){const o=(e[0]-i-t[0])*r[0],a=(e[3]+i-t[0])*r[0];let s=Math.min(o,a),c=Math.max(o,a);const l=(e[1]-i-t[1])*r[1],u=(e[4]+i-t[1])*r[1];if(c=Math.min(c,Math.max(l,u)),c<0)return!1;if(s=Math.max(s,Math.min(l,u)),s>c)return!1;const d=(e[2]-i-t[2])*r[2],f=(e[5]+i-t[2])*r[2];return c=Math.min(c,Math.max(d,f)),!(c<0)&&(s=Math.max(s,Math.min(d,f)),!(s>c)&&s<n)}function P(e,t,r,n,o){let a=(r.screenLength||0)*e.pixelRatio;o&&(a=f(a,n,t,o));const s=a*Math.tan(.5*e.fovY)/(.5*e.fullHeight);return Object(i["e"])(s*t,r.minWorldLength||0,null!=r.maxWorldLength?r.maxWorldLength:1/0)}function j(e,t,r){if(!e)return;const i=e.parameters,n=e.paddingPixelsOverride;t.setUniform4f(r,i.divisor,i.offset,i.minPixelSize,n)}function B(e,t){const r=t?B(t):{};for(const i in e){let t=e[i];t&&t.forEach&&(t=I(t)),null==t&&i in r||(r[i]=t)}return r}function F(e,t){let r=!1;for(const i in t){const n=t[i];void 0!==n&&(r=!0,Array.isArray(n)?e[i]=n.slice():e[i]=n)}return r}function I(e){const t=[];return e.forEach(e=>t.push(e)),t}const L={multiply:1,ignore:2,replace:3,tint:4},z=1e3},"7cb4":function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var i=r("dfaf"),n=r("3886");function o(e){e.extensions.add("GL_EXT_shader_texture_lod"),e.extensions.add("GL_OES_standard_derivatives"),e.fragment.code.add(n["a"]`#ifndef GL_EXT_shader_texture_lod
float calcMipMapLevel(const vec2 ddx, const vec2 ddy) {
float deltaMaxSqr = max(dot(ddx, ddx), dot(ddy, ddy));
return max(0.0, 0.5 * log2(deltaMaxSqr));
}
#endif
vec4 textureAtlasLookup(sampler2D texture, vec2 textureSize, vec2 textureCoordinates, vec4 atlasRegion) {
vec2 atlasScale = atlasRegion.zw - atlasRegion.xy;
vec2 uvAtlas = fract(textureCoordinates) * atlasScale + atlasRegion.xy;
float maxdUV = 0.125;
vec2 dUVdx = clamp(dFdx(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
vec2 dUVdy = clamp(dFdy(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
#ifdef GL_EXT_shader_texture_lod
return texture2DGradEXT(texture, uvAtlas, dUVdx, dUVdy);
#else
vec2 dUVdxAuto = dFdx(uvAtlas);
vec2 dUVdyAuto = dFdy(uvAtlas);
float mipMapLevel = calcMipMapLevel(dUVdx * textureSize, dUVdy * textureSize);
float autoMipMapLevel = calcMipMapLevel(dUVdxAuto * textureSize, dUVdyAuto * textureSize);
return texture2D(texture, uvAtlas, mipMapLevel - autoMipMapLevel);
#endif
}`)}function a(e,t){e.include(i["a"],t),e.fragment.code.add(n["a"]`
  struct TextureLookupParameter {
    vec2 uv;
    ${t.supportsTextureAtlas?"vec2 size;":""}
  } vtc;
  `),1===t.attributeTextureCoordinates&&e.fragment.code.add(n["a"]`vec4 textureLookup(sampler2D tex, TextureLookupParameter params) {
return texture2D(tex, params.uv);
}`),2===t.attributeTextureCoordinates&&(e.include(o),e.fragment.code.add(n["a"]`vec4 textureLookup(sampler2D tex, TextureLookupParameter params) {
return textureAtlasLookup(tex, params.size, params.uv, vuvRegion);
}`))}},"7d11":function(e,t,r){"use strict";r.d(t,"a",(function(){return d}));var i=r("c332"),n=r("dae5"),o=r("afe1"),a=r("0b2d"),s=r("b09a"),c=r("6a21"),l=r("3886");function u(e,t){e.include(s["a"]),e.vertex.include(c["a"],t),e.varyings.add("vPositionWorldCameraRelative","vec3"),e.varyings.add("vPosition_view","vec3"),e.vertex.uniforms.add("uTransform_WorldFromModel_RS","mat3"),e.vertex.uniforms.add("uTransform_WorldFromModel_TH","vec3"),e.vertex.uniforms.add("uTransform_WorldFromModel_TL","vec3"),e.vertex.uniforms.add("uTransform_WorldFromView_TH","vec3"),e.vertex.uniforms.add("uTransform_WorldFromView_TL","vec3"),e.vertex.uniforms.add("uTransform_ViewFromCameraRelative_RS","mat3"),e.vertex.uniforms.add("uTransform_ProjFromView","mat4"),e.vertex.code.add(l["a"]`vec3 positionWorldCameraRelative() {
vec3 rotatedModelPosition = uTransform_WorldFromModel_RS * positionModel();
vec3 transform_CameraRelativeFromModel = dpAdd(
uTransform_WorldFromModel_TL,
uTransform_WorldFromModel_TH,
-uTransform_WorldFromView_TL,
-uTransform_WorldFromView_TH
);
return transform_CameraRelativeFromModel + rotatedModelPosition;
}
vec3 position_view() {
return uTransform_ViewFromCameraRelative_RS * positionWorldCameraRelative();
}
void forwardPosition() {
vPositionWorldCameraRelative = positionWorldCameraRelative();
vPosition_view = position_view();
gl_Position = uTransform_ProjFromView * vec4(vPosition_view, 1.0);
}
vec3 positionWorld() {
return uTransform_WorldFromView_TL + vPositionWorldCameraRelative;
}`),e.fragment.uniforms.add("uTransform_WorldFromView_TL","vec3"),e.fragment.code.add(l["a"]`vec3 positionWorld() {
return uTransform_WorldFromView_TL + vPositionWorldCameraRelative;
}`)}function d(e,t){0===t.normalType||1===t.normalType?(e.include(i["a"],t),e.varyings.add("vNormalWorld","vec3"),e.varyings.add("vNormalView","vec3"),e.vertex.uniforms.add("uTransformNormal_GlobalFromModel","mat3"),e.vertex.uniforms.add("uTransformNormal_ViewFromGlobal","mat3"),e.vertex.code.add(l["a"]`void forwardNormal() {
vNormalWorld = uTransformNormal_GlobalFromModel * normalModel();
vNormalView = uTransformNormal_ViewFromGlobal * vNormalWorld;
}`)):2===t.normalType?(e.include(u,t),e.varyings.add("vNormalWorld","vec3"),e.vertex.code.add(l["a"]`
    void forwardNormal() {
      vNormalWorld = ${1===t.viewingMode?l["a"]`normalize(vPositionWorldCameraRelative);`:l["a"]`vec3(0.0, 0.0, 1.0);`}
    }
    `)):e.vertex.code.add(l["a"]`void forwardNormal() {}`)}!function(e){class t{constructor(){this.worldFromModel_RS=Object(n["b"])(),this.worldFromModel_TH=Object(a["e"])(),this.worldFromModel_TL=Object(a["e"])()}}e.ModelTransform=t;class r{constructor(){this.worldFromView_TH=Object(a["e"])(),this.worldFromView_TL=Object(a["e"])(),this.viewFromCameraRelative_RS=Object(n["b"])(),this.projFromView=Object(o["d"])()}}function i(e,t){e.setUniformMatrix3fv("uTransform_WorldFromModel_RS",t.worldFromModel_RS),e.setUniform3fv("uTransform_WorldFromModel_TH",t.worldFromModel_TH),e.setUniform3fv("uTransform_WorldFromModel_TL",t.worldFromModel_TL)}function s(e,t){e.setUniform3fv("uTransform_WorldFromView_TH",t.worldFromView_TH),e.setUniform3fv("uTransform_WorldFromView_TL",t.worldFromView_TL),e.setUniformMatrix4fv("uTransform_ProjFromView",t.projFromView),e.setUniformMatrix3fv("uTransform_ViewFromCameraRelative_RS",t.viewFromCameraRelative_RS)}e.ViewProjectionTransform=r,e.bindModelTransform=i,e.bindViewProjTransform=s}(u||(u={})),function(e){function t(e,t){e.setUniformMatrix4fv("viewNormal",t)}e.bindUniforms=t}(d||(d={}))},"7e21":function(e,t,r){"use strict";r.d(t,"a",(function(){return p}));var i=r("d272"),n=r("4db9"),o=r("c332"),a=r("dfaf"),s=r("7d11"),c=r("501b"),l=r("3886");function u(e,t){e.fragment.include(c["a"]),3===t.output?(e.extensions.add("GL_OES_standard_derivatives"),e.fragment.code.add(l["a"]`float _calculateFragDepth(const in float depth) {
const float SLOPE_SCALE = 2.0;
const float BIAS = 2.0 * .000015259;
float m = max(abs(dFdx(depth)), abs(dFdy(depth)));
float result = depth + SLOPE_SCALE * m + BIAS;
return clamp(result, .0, .999999);
}
void outputDepth(float _linearDepth) {
gl_FragColor = float2rgba(_calculateFragDepth(_linearDepth));
}`)):1===t.output&&e.fragment.code.add(l["a"]`void outputDepth(float _linearDepth) {
gl_FragColor = float2rgba(_linearDepth);
}`)}var d=r("6a07"),f=r("be24"),h=r("ebd5");function p(e,t){const r=e.vertex.code,c=e.fragment.code;1!==t.output&&3!==t.output||(e.include(n["a"],{linearDepth:!0}),e.include(a["a"],t),e.include(f["a"],t),e.include(u,t),e.include(i["a"],t),e.vertex.uniforms.add("cameraNearFar","vec2"),e.varyings.add("depth","float"),t.hasColorTexture&&e.fragment.uniforms.add("tex","sampler2D"),r.add(l["a"]`void main(void) {
vpos = calculateVPos();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPositionWithDepth(proj, view, vpos, cameraNearFar, depth);
forwardTextureCoordinates();
}`),e.include(h["a"],t),c.add(l["a"]`
      void main(void) {
        discardBySlice(vpos);
        ${t.hasColorTexture?l["a"]`
        vec4 texColor = texture2D(tex, vuv0);
        discardOrAdjustAlpha(texColor);`:""}
        outputDepth(depth);
      }
    `)),2===t.output&&(e.include(n["a"],{linearDepth:!1}),e.include(o["a"],t),e.include(s["a"],t),e.include(a["a"],t),e.include(f["a"],t),t.hasColorTexture&&e.fragment.uniforms.add("tex","sampler2D"),e.vertex.uniforms.add("viewNormal","mat4"),e.varyings.add("vPositionView","vec3"),r.add(l["a"]`
      void main(void) {
        vpos = calculateVPos();
        vpos = subtractOrigin(vpos);
        ${0===t.normalType?l["a"]`
        vNormalWorld = dpNormalView(vvLocalNormal(normalModel()));`:""}
        vpos = addVerticalOffset(vpos, localOrigin);
        gl_Position = transformPosition(proj, view, vpos);
        forwardTextureCoordinates();
      }
    `),e.include(i["a"],t),e.include(h["a"],t),c.add(l["a"]`
      void main() {
        discardBySlice(vpos);
        ${t.hasColorTexture?l["a"]`
        vec4 texColor = texture2D(tex, vuv0);
        discardOrAdjustAlpha(texColor);`:""}

        ${3===t.normalType?l["a"]`
            vec3 normal = screenDerivativeNormal(vPositionView);`:l["a"]`
            vec3 normal = normalize(vNormalWorld);
            if (gl_FrontFacing == false) normal = -normal;`}
        gl_FragColor = vec4(vec3(0.5) + 0.5 * normal, 1.0);
      }
    `)),4===t.output&&(e.include(n["a"],{linearDepth:!1}),e.include(a["a"],t),e.include(f["a"],t),t.hasColorTexture&&e.fragment.uniforms.add("tex","sampler2D"),r.add(l["a"]`void main(void) {
vpos = calculateVPos();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();
}`),e.include(i["a"],t),e.include(h["a"],t),e.include(d["a"]),c.add(l["a"]`
      void main() {
        discardBySlice(vpos);
        ${t.hasColorTexture?l["a"]`
        vec4 texColor = texture2D(tex, vuv0);
        discardOrAdjustAlpha(texColor);`:""}
        outputHighlight();
      }
    `))}},8190:function(e,t,r){"use strict";r.d(t,"a",(function(){return f})),r.d(t,"b",(function(){return y})),r.d(t,"c",(function(){return V})),r.d(t,"d",(function(){return W})),r.d(t,"e",(function(){return z})),r.d(t,"f",(function(){return v})),r.d(t,"g",(function(){return b})),r.d(t,"h",(function(){return g})),r.d(t,"i",(function(){return x})),r.d(t,"j",(function(){return A})),r.d(t,"k",(function(){return B})),r.d(t,"l",(function(){return S})),r.d(t,"m",(function(){return h})),r.d(t,"n",(function(){return T})),r.d(t,"o",(function(){return k})),r.d(t,"p",(function(){return G})),r.d(t,"q",(function(){return D})),r.d(t,"r",(function(){return E})),r.d(t,"s",(function(){return F})),r.d(t,"t",(function(){return w})),r.d(t,"u",(function(){return p})),r.d(t,"v",(function(){return _})),r.d(t,"w",(function(){return H})),r.d(t,"x",(function(){return q})),r.d(t,"y",(function(){return R})),r.d(t,"z",(function(){return P})),r.d(t,"A",(function(){return I})),r.d(t,"B",(function(){return M})),r.d(t,"C",(function(){return m})),r.d(t,"D",(function(){return O})),r.d(t,"E",(function(){return U})),r.d(t,"F",(function(){return $})),r.d(t,"G",(function(){return N})),r.d(t,"H",(function(){return j})),r.d(t,"I",(function(){return L})),r.d(t,"J",(function(){return C}));class i{constructor(e,t,r=0,i,n){this.TypedArrayConstructor=e,this.elementCount=9;const o=this.TypedArrayConstructor;void 0===i&&(i=9*o.BYTES_PER_ELEMENT);const a=0===t.byteLength?0:r;this.typedBuffer=null==n?new o(t,a):new o(t,a,(n-r)/o.BYTES_PER_ELEMENT),this.typedBufferStride=i/o.BYTES_PER_ELEMENT,this.count=Math.ceil(this.typedBuffer.length/this.typedBufferStride),this.stride=this.typedBufferStride*this.TypedArrayConstructor.BYTES_PER_ELEMENT}sliceBuffer(e,t,r=this.count-t){const i=this.typedBuffer.byteOffset+t*this.stride;return new e(this.buffer,i,this.stride,i+r*this.stride)}getMat(e,t){let r=e*this.typedBufferStride;for(let i=0;i<9;i++)t[i]=this.typedBuffer[r++];return t}setMat(e,t){let r=e*this.typedBufferStride;for(let i=0;i<9;i++)this.typedBuffer[r++]=t[i]}get(e,t){return this.typedBuffer[e*this.typedBufferStride+t]}set(e,t,r){this.typedBuffer[e*this.typedBufferStride+t]=r}copyFrom(e,t,r){const i=this.typedBuffer,n=t.typedBuffer;let o=e*this.typedBufferStride,a=r*t.typedBufferStride;for(let s=0;s<9;++s)i[o++]=n[a++]}get buffer(){return this.typedBuffer.buffer}}i.ElementCount=9;class n{constructor(e,t,r=0,i,n){this.TypedArrayConstructor=e,this.elementCount=16;const o=this.TypedArrayConstructor;void 0===i&&(i=16*o.BYTES_PER_ELEMENT);const a=0===t.byteLength?0:r;this.typedBuffer=null==n?new o(t,a):new o(t,a,(n-r)/o.BYTES_PER_ELEMENT),this.typedBufferStride=i/o.BYTES_PER_ELEMENT,this.count=Math.ceil(this.typedBuffer.length/this.typedBufferStride),this.stride=this.typedBufferStride*this.TypedArrayConstructor.BYTES_PER_ELEMENT}sliceBuffer(e,t,r=this.count-t){const i=this.typedBuffer.byteOffset+t*this.stride;return new e(this.buffer,i,this.stride,i+r*this.stride)}getMat(e,t){let r=e*this.typedBufferStride;for(let i=0;i<16;i++)t[i]=this.typedBuffer[r++];return t}setMat(e,t){let r=e*this.typedBufferStride;for(let i=0;i<16;i++)this.typedBuffer[r++]=t[i]}get(e,t){return this.typedBuffer[e*this.typedBufferStride+t]}set(e,t,r){this.typedBuffer[e*this.typedBufferStride+t]=r}copyFrom(e,t,r){const i=this.typedBuffer,n=t.typedBuffer;let o=e*this.typedBufferStride,a=r*t.typedBufferStride;for(let s=0;s<16;++s)i[o++]=n[a++]}get buffer(){return this.typedBuffer.buffer}}n.ElementCount=16;class o{constructor(e,t,r=0,i,n){this.TypedArrayConstructor=e,this.elementCount=1;const o=this.TypedArrayConstructor;void 0===i&&(i=o.BYTES_PER_ELEMENT);const a=0===t.byteLength?0:r;this.typedBuffer=null==n?new o(t,a):new o(t,a,(n-r)/o.BYTES_PER_ELEMENT),this.typedBufferStride=i/o.BYTES_PER_ELEMENT,this.count=Math.ceil(this.typedBuffer.length/this.typedBufferStride),this.stride=this.typedBufferStride*this.TypedArrayConstructor.BYTES_PER_ELEMENT}sliceBuffer(e,t,r=this.count-t){const i=this.typedBuffer.byteOffset+t*this.stride;return new e(this.buffer,i,this.stride,i+r*this.stride)}get(e){return this.typedBuffer[e*this.typedBufferStride]}set(e,t){this.typedBuffer[e*this.typedBufferStride]=t}get buffer(){return this.typedBuffer.buffer}}o.ElementCount=1;var a=r("3349");class s{constructor(e,t,r=0,i,n){this.TypedArrayConstructor=e,this.elementCount=2;const o=this.TypedArrayConstructor;void 0===i&&(i=2*o.BYTES_PER_ELEMENT);const a=0===t.byteLength?0:r;this.typedBuffer=null==n?new o(t,a):new o(t,a,(n-r)/o.BYTES_PER_ELEMENT),this.typedBufferStride=i/o.BYTES_PER_ELEMENT,this.count=Math.ceil(this.typedBuffer.length/this.typedBufferStride),this.stride=this.typedBufferStride*this.TypedArrayConstructor.BYTES_PER_ELEMENT}sliceBuffer(e,t,r=this.count-t){const i=this.typedBuffer.byteOffset+t*this.stride;return new e(this.buffer,i,this.stride,i+r*this.stride)}getVec(e,t){return e*=this.typedBufferStride,Object(a["m"])(t,this.typedBuffer[e],this.typedBuffer[e+1])}setVec(e,t){e*=this.typedBufferStride,this.typedBuffer[e++]=t[0],this.typedBuffer[e]=t[1]}get(e,t){return this.typedBuffer[e*this.typedBufferStride+t]}set(e,t,r){this.typedBuffer[e*this.typedBufferStride+t]=r}setValues(e,t,r){e*=this.typedBufferStride,this.typedBuffer[e++]=t,this.typedBuffer[e]=r}copyFrom(e,t,r){const i=this.typedBuffer,n=t.typedBuffer;let o=e*this.typedBufferStride,a=r*t.typedBufferStride;i[o++]=n[a++],i[o]=n[a]}get buffer(){return this.typedBuffer.buffer}}s.ElementCount=2;var c=r("e431");class l{constructor(e,t,r=0,i,n){this.TypedArrayConstructor=e,this.elementCount=3;const o=this.TypedArrayConstructor;void 0===i&&(i=3*o.BYTES_PER_ELEMENT);const a=0===t.byteLength?0:r;this.typedBuffer=null==n?new o(t,a):new o(t,a,(n-r)/o.BYTES_PER_ELEMENT),this.typedBufferStride=i/o.BYTES_PER_ELEMENT,this.count=Math.ceil(this.typedBuffer.length/this.typedBufferStride),this.stride=this.typedBufferStride*this.TypedArrayConstructor.BYTES_PER_ELEMENT}sliceBuffer(e,t,r=this.count-t){const i=this.typedBuffer.byteOffset+t*this.stride;return new e(this.buffer,i,this.stride,i+r*this.stride)}getVec(e,t){return e*=this.typedBufferStride,Object(c["s"])(t,this.typedBuffer[e],this.typedBuffer[e+1],this.typedBuffer[e+2])}setVec(e,t){e*=this.typedBufferStride,this.typedBuffer[e++]=t[0],this.typedBuffer[e++]=t[1],this.typedBuffer[e]=t[2]}get(e,t){return this.typedBuffer[e*this.typedBufferStride+t]}set(e,t,r){this.typedBuffer[e*this.typedBufferStride+t]=r}setValues(e,t,r,i){e*=this.typedBufferStride,this.typedBuffer[e++]=t,this.typedBuffer[e++]=r,this.typedBuffer[e]=i}copyFrom(e,t,r){const i=this.typedBuffer,n=t.typedBuffer;let o=e*this.typedBufferStride,a=r*t.typedBufferStride;i[o++]=n[a++],i[o++]=n[a++],i[o]=n[a]}get buffer(){return this.typedBuffer.buffer}}l.ElementCount=3;var u=r("7577");class d{constructor(e,t,r=0,i,n){this.TypedArrayConstructor=e,this.elementCount=4;const o=this.TypedArrayConstructor;void 0===i&&(i=4*o.BYTES_PER_ELEMENT);const a=0===t.byteLength?0:r;this.typedBuffer=null==n?new o(t,a):new o(t,a,(n-r)/o.BYTES_PER_ELEMENT),this.typedBufferStride=i/o.BYTES_PER_ELEMENT,this.count=Math.ceil(this.typedBuffer.length/this.typedBufferStride),this.stride=this.typedBufferStride*this.TypedArrayConstructor.BYTES_PER_ELEMENT}sliceBuffer(e,t,r=this.count-t){const i=this.typedBuffer.byteOffset+t*this.stride;return new e(this.buffer,i,this.stride,i+r*this.stride)}getVec(e,t){return e*=this.typedBufferStride,Object(u["k"])(t,this.typedBuffer[e++],this.typedBuffer[e++],this.typedBuffer[e++],this.typedBuffer[e])}setVec(e,t){e*=this.typedBufferStride,this.typedBuffer[e++]=t[0],this.typedBuffer[e++]=t[1],this.typedBuffer[e++]=t[2],this.typedBuffer[e]=t[3]}get(e,t){return this.typedBuffer[e*this.typedBufferStride+t]}set(e,t,r){this.typedBuffer[e*this.typedBufferStride+t]=r}setValues(e,t,r,i,n){e*=this.typedBufferStride,this.typedBuffer[e++]=t,this.typedBuffer[e++]=r,this.typedBuffer[e++]=i,this.typedBuffer[e]=n}copyFrom(e,t,r){const i=this.typedBuffer,n=t.typedBuffer;let o=e*this.typedBufferStride,a=r*t.typedBufferStride;i[o++]=n[a++],i[o++]=n[a++],i[o++]=n[a++],i[o]=n[a]}get buffer(){return this.typedBuffer.buffer}}d.ElementCount=4;class f extends o{constructor(e,t=0,r,i){super(Float32Array,e,t,r,i),this.elementType="f32"}static fromTypedArray(e,t){return new f(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}f.ElementType="f32";class h extends s{constructor(e,t=0,r,i){super(Float32Array,e,t,r,i),this.elementType="f32"}slice(e,t){return this.sliceBuffer(h,e,t)}static fromTypedArray(e,t){return new h(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}h.ElementType="f32";class p extends l{constructor(e,t=0,r,i){super(Float32Array,e,t,r,i),this.elementType="f32"}slice(e,t){return this.sliceBuffer(p,e,t)}static fromTypedArray(e,t){return new p(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}p.ElementType="f32";class m extends d{constructor(e,t=0,r,i){super(Float32Array,e,t,r,i),this.elementType="f32"}slice(e,t){return this.sliceBuffer(m,e,t)}static fromTypedArray(e,t){return new m(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}m.ElementType="f32";class v extends i{constructor(e,t=0,r,i){super(Float32Array,e,t,r,i),this.elementType="f32"}slice(e,t){return this.sliceBuffer(v,e,t)}static fromTypedArray(e,t){return new v(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}v.ElementType="f32";class b extends i{constructor(e,t=0,r,i){super(Float64Array,e,t,r,i),this.elementType="f64"}slice(e,t){return this.sliceBuffer(b,e,t)}static fromTypedArray(e,t){return new b(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}b.ElementType="f64";class g extends n{constructor(e,t=0,r,i){super(Float32Array,e,t,r,i),this.elementType="f32"}slice(e,t){return this.sliceBuffer(g,e,t)}static fromTypedArray(e,t){return new g(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}g.ElementType="f32";class x extends n{constructor(e,t=0,r,i){super(Float64Array,e,t,r,i),this.elementType="f64"}slice(e,t){return this.sliceBuffer(x,e,t)}static fromTypedArray(e,t){return new x(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}x.ElementType="f64";class y extends o{constructor(e,t=0,r,i){super(Float64Array,e,t,r,i),this.elementType="f64"}slice(e,t){return this.sliceBuffer(y,e,t)}static fromTypedArray(e,t){return new y(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}y.ElementType="f64";class T extends s{constructor(e,t=0,r,i){super(Float64Array,e,t,r,i),this.elementType="f64"}slice(e,t){return this.sliceBuffer(T,e,t)}static fromTypedArray(e,t){return new T(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}T.ElementType="f64";class _ extends l{constructor(e,t=0,r,i){super(Float64Array,e,t,r,i),this.elementType="f64"}slice(e,t){return this.sliceBuffer(_,e,t)}static fromTypedArray(e,t){return new _(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}_.ElementType="f64";class O extends d{constructor(e,t=0,r,i){super(Float64Array,e,t,r,i),this.elementType="f64"}slice(e,t){return this.sliceBuffer(O,e,t)}static fromTypedArray(e,t){return new O(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}O.ElementType="f64";class S extends o{constructor(e,t=0,r,i){super(Uint8Array,e,t,r,i),this.elementType="u8"}slice(e,t){return this.sliceBuffer(S,e,t)}static fromTypedArray(e,t){return new S(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}S.ElementType="u8";class w extends s{constructor(e,t=0,r,i){super(Uint8Array,e,t,r,i),this.elementType="u8"}slice(e,t){return this.sliceBuffer(w,e,t)}static fromTypedArray(e,t){return new w(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}w.ElementType="u8";class M extends l{constructor(e,t=0,r,i){super(Uint8Array,e,t,r,i),this.elementType="u8"}slice(e,t){return this.sliceBuffer(M,e,t)}static fromTypedArray(e,t){return new M(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}M.ElementType="u8";class C extends d{constructor(e,t=0,r,i){super(Uint8Array,e,t,r,i),this.elementType="u8"}slice(e,t){return this.sliceBuffer(C,e,t)}static fromTypedArray(e,t){return new C(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}C.ElementType="u8";class A extends o{constructor(e,t=0,r,i){super(Uint16Array,e,t,r,i),this.elementType="u16"}slice(e,t){return this.sliceBuffer(A,e,t)}static fromTypedArray(e,t){return new A(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}A.ElementType="u16";class E extends s{constructor(e,t=0,r,i){super(Uint16Array,e,t,r,i),this.elementType="u16"}slice(e,t){return this.sliceBuffer(E,e,t)}static fromTypedArray(e,t){return new E(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}E.ElementType="u16";class P extends l{constructor(e,t=0,r,i){super(Uint16Array,e,t,r,i),this.elementType="u16"}slice(e,t){return this.sliceBuffer(P,e,t)}static fromTypedArray(e,t){return new P(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}P.ElementType="u16";class j extends d{constructor(e,t=0,r,i){super(Uint16Array,e,t,r,i),this.elementType="u16"}slice(e,t){return this.sliceBuffer(j,e,t)}static fromTypedArray(e,t){return new j(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}j.ElementType="u16";class B extends o{constructor(e,t=0,r,i){super(Uint32Array,e,t,r,i),this.elementType="u32"}slice(e,t){return this.sliceBuffer(B,e,t)}static fromTypedArray(e,t){return new B(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}B.ElementType="u32";class F extends s{constructor(e,t=0,r,i){super(Uint32Array,e,t,r,i),this.elementType="u32"}slice(e,t){return this.sliceBuffer(F,e,t)}static fromTypedArray(e,t){return new F(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}F.ElementType="u32";class I extends l{constructor(e,t=0,r,i){super(Uint32Array,e,t,r,i),this.elementType="u32"}slice(e,t){return this.sliceBuffer(I,e,t)}static fromTypedArray(e,t){return new I(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}I.ElementType="u32";class L extends d{constructor(e,t=0,r,i){super(Uint32Array,e,t,r,i),this.elementType="u32"}slice(e,t){return this.sliceBuffer(L,e,t)}static fromTypedArray(e,t){return new L(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}L.ElementType="u32";class z extends o{constructor(e,t=0,r,i){super(Int8Array,e,t,r,i),this.elementType="i8"}slice(e,t){return this.sliceBuffer(z,e,t)}static fromTypedArray(e,t){return new z(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}z.ElementType="i8";class D extends s{constructor(e,t=0,r,i){super(Int8Array,e,t,r,i),this.elementType="i8"}slice(e,t){return this.sliceBuffer(D,e,t)}static fromTypedArray(e,t){return new D(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}D.ElementType="i8";class R extends l{constructor(e,t=0,r,i){super(Int8Array,e,t,r,i),this.elementType="i8"}slice(e,t){return this.sliceBuffer(R,e,t)}static fromTypedArray(e,t){return new R(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}R.ElementType="i8";class N extends d{constructor(e,t=0,r,i){super(Int8Array,e,t,r,i),this.elementType="i8"}slice(e,t){return this.sliceBuffer(N,e,t)}static fromTypedArray(e,t){return new N(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}N.ElementType="i8";class V extends o{constructor(e,t=0,r,i){super(Int16Array,e,t,r,i),this.elementType="i16"}slice(e,t){return this.sliceBuffer(V,e,t)}static fromTypedArray(e,t){return new V(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}V.ElementType="i16";class k extends s{constructor(e,t=0,r,i){super(Int16Array,e,t,r,i),this.elementType="i16"}slice(e,t){return this.sliceBuffer(k,e,t)}static fromTypedArray(e,t){return new k(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}k.ElementType="i16";class H extends l{constructor(e,t=0,r,i){super(Int16Array,e,t,r,i),this.elementType="i16"}slice(e,t){return this.sliceBuffer(H,e,t)}static fromTypedArray(e,t){return new H(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}H.ElementType="i16";class U extends d{constructor(e,t=0,r,i){super(Int16Array,e,t,r,i),this.elementType="i16"}slice(e,t){return this.sliceBuffer(U,e,t)}static fromTypedArray(e,t){return new U(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}U.ElementType="i16";class W extends o{constructor(e,t=0,r,i){super(Int32Array,e,t,r,i),this.elementType="i32"}slice(e,t){return this.sliceBuffer(W,e,t)}static fromTypedArray(e,t){return new W(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}W.ElementType="i32";class G extends s{constructor(e,t=0,r,i){super(Int32Array,e,t,r,i),this.elementType="i32"}slice(e,t){return this.sliceBuffer(G,e,t)}static fromTypedArray(e,t){return new G(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}G.ElementType="i32";class q extends l{constructor(e,t=0,r,i){super(Int32Array,e,t,r,i),this.elementType="i32"}slice(e,t){return this.sliceBuffer(q,e,t)}static fromTypedArray(e,t){return new q(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}q.ElementType="i32";class $ extends d{constructor(e,t=0,r,i){super(Int32Array,e,t,r,i),this.elementType="i32"}slice(e,t){return this.sliceBuffer($,e,t)}static fromTypedArray(e,t){return new $(e.buffer,e.byteOffset,t,e.byteOffset+e.byteLength)}}$.ElementType="i32"},"94a6":function(e,t,r){"use strict";r.r(t),r.d(t,"fetch",(function(){return Gr})),r.d(t,"gltfToEngineResources",(function(){return $r})),r.d(t,"parseUrl",(function(){return qr}));var i=r("49b8"),n=r("b2b2"),o=r("1c92"),a=r("dae5"),s=r("d791"),c=r("afe1"),l=r("e431"),u=r("0b2d"),d=r("4261"),f=r("8190"),h=r("668b"),p=r("e4c1"),m=r("7e2d"),v=r("2b60"),b=r("3c3b"),g=r("087c"),x=r("2eab"),y=r("792b"),T=r("ce50"),_=r("e92d"),O=r("f4cc"),S=r("549a"),w=r("2db0"),M=r("8a44"),C=r("1153");class A{constructor(e,t,r,i){this.primitiveIndices=e,this._numIndexPerPrimitive=t,this.indices=r,this.position=i,this.center=Object(u["e"])(),Object(C["a"])(e.length>=1),Object(C["a"])(r.length%this._numIndexPerPrimitive==0),Object(C["a"])(r.length>=e.length*this._numIndexPerPrimitive),Object(C["a"])(3===i.size||4===i.size);const{data:n,size:o}=i,a=e.length;let s=o*r[this._numIndexPerPrimitive*e[0]];E.clear(),E.push(s),this.bbMin=Object(u["g"])(n[s],n[s+1],n[s+2]),this.bbMax=Object(u["c"])(this.bbMin);for(let l=0;l<a;++l){const t=this._numIndexPerPrimitive*e[l];for(let e=0;e<this._numIndexPerPrimitive;++e){s=o*r[t+e],E.push(s);let i=n[s];this.bbMin[0]=Math.min(i,this.bbMin[0]),this.bbMax[0]=Math.max(i,this.bbMax[0]),i=n[s+1],this.bbMin[1]=Math.min(i,this.bbMin[1]),this.bbMax[1]=Math.max(i,this.bbMax[1]),i=n[s+2],this.bbMin[2]=Math.min(i,this.bbMin[2]),this.bbMax[2]=Math.max(i,this.bbMax[2])}}Object(l["f"])(this.center,this.bbMin,this.bbMax,.5),this.radius=.5*Math.max(Math.max(this.bbMax[0]-this.bbMin[0],this.bbMax[1]-this.bbMin[1]),this.bbMax[2]-this.bbMin[2]);let c=this.radius*this.radius;for(let l=0;l<E.length;++l){s=E.getItemAt(l);const e=n[s]-this.center[0],t=n[s+1]-this.center[1],r=n[s+2]-this.center[2],i=e*e+t*t+r*r;if(i<=c)continue;const o=Math.sqrt(i),a=.5*(o-this.radius);this.radius=this.radius+a,c=this.radius*this.radius;const u=a/o;this.center[0]+=e*u,this.center[1]+=t*u,this.center[2]+=r*u}E.clear()}getCenter(){return this.center}getBSRadius(){return this.radius}getBBMin(){return this.bbMin}getBBMax(){return this.bbMax}getChildren(){if(this._children)return this._children;if(Object(l["i"])(this.bbMin,this.bbMax)>1){const e=Object(l["f"])(Object(u["e"])(),this.bbMin,this.bbMax,.5),t=this.primitiveIndices.length,r=new Uint8Array(t),i=new Array(8);for(let c=0;c<8;++c)i[c]=0;const{data:n,size:o}=this.position;for(let c=0;c<t;++c){let t=0;const a=this._numIndexPerPrimitive*this.primitiveIndices[c];let s=o*this.indices[a],l=n[s],u=n[s+1],d=n[s+2];for(let e=1;e<this._numIndexPerPrimitive;++e){s=o*this.indices[a+e];const t=n[s],r=n[s+1],i=n[s+2];t<l&&(l=t),r<u&&(u=r),i<d&&(d=i)}l<e[0]&&(t|=1),u<e[1]&&(t|=2),d<e[2]&&(t|=4),r[c]=t,++i[t]}let a=0;for(let c=0;c<8;++c)i[c]>0&&++a;if(a<2)return;const s=new Array(8);for(let c=0;c<8;++c)s[c]=i[c]>0?new Uint32Array(i[c]):void 0;for(let c=0;c<8;++c)i[c]=0;for(let c=0;c<t;++c){const e=r[c];s[e][i[e]++]=this.primitiveIndices[c]}this._children=new Array(8);for(let c=0;c<8;++c)void 0!==s[c]&&(this._children[c]=new A(s[c],this._numIndexPerPrimitive,this.indices,this.position))}return this._children}static prune(){E.prune()}}const E=new M["a"]({deallocator:null});var P=r("f2e0");class j{constructor(){this.id=Object(P["a"])()}unload(){}}var B=r("1038");class F extends j{constructor(e,t=[],r=0,i=-1){super(),this._primitiveType=r,this.edgeIndicesLength=i,this.type=2,this._vertexAttributes=new Map,this._indices=new Map,this._boundingInfo=null;for(const[n,o]of e)o&&this._vertexAttributes.set(n,{...o});if(null==t||0===t.length){const e=I(this._vertexAttributes),t=Object(B["c"])(e);this.edgeIndicesLength=this.edgeIndicesLength<0?e:this.edgeIndicesLength;for(const r of this._vertexAttributes.keys())this._indices.set(r,t)}else for(const[n,o]of t)o&&(this._indices.set(n,L(o)),"position"===n&&(this.edgeIndicesLength=this.edgeIndicesLength<0?this._indices.get(n).length:this.edgeIndicesLength))}get vertexAttributes(){return this._vertexAttributes}getMutableAttribute(e){const t=this._vertexAttributes.get(e);return t&&!t.exclusive&&(t.data=Array.from(t.data),t.exclusive=!0),t}get indices(){return this._indices}get indexCount(){const e=this._indices.values().next().value;return e?e.length:0}get primitiveType(){return this._primitiveType}get faceCount(){return this.indexCount/3}get boundingInfo(){return Object(n["j"])(this._boundingInfo)&&(this._boundingInfo=this._calculateBoundingInfo()),this._boundingInfo}computeAttachmentOrigin(e){return 0===this.primitiveType?this.computeAttachmentOriginTriangles(e):this.computeAttachmentOriginPoints(e)}computeAttachmentOriginTriangles(e){const t=this.indices.get("position"),r=this.vertexAttributes.get("position");return Object(B["b"])(r,t,e)}computeAttachmentOriginPoints(e){const t=this.indices.get("position"),r=this.vertexAttributes.get("position");return Object(B["a"])(r,t,e)}invalidateBoundingInfo(){this._boundingInfo=null}_calculateBoundingInfo(){const e=this.indices.get("position");if(0===e.length)return null;const t=0===this.primitiveType?3:1;Object(C["a"])(e.length%t==0,"Indexing error: "+e.length+" not divisible by "+t);const r=Object(B["c"])(e.length/t),i=this.vertexAttributes.get("position");return new A(r,t,e,i)}}function I(e){const t=e.values().next().value;return null==t?0:t.data.length/t.size}function L(e){if(e.BYTES_PER_ELEMENT===Uint16Array.BYTES_PER_ELEMENT)return e;for(const t of e)if(t>=65536)return e;return new Uint16Array(e)}var z=r("6c97"),D=r("ce6d"),R=r("38a4"),N=r("a21b"),V=r("e041"),k=r("228a"),H=r("b2cd");function U(){if(Object(n["j"])(W)){const e=e=>Object(H["a"])("esri/libs/basisu/"+e);W=r.e("chunk-5ba1e7e0").then(r.bind(null,"a58f")).then(e=>e.b).then(({default:t})=>t({locateFile:e}).then(e=>(e.initializeBasis(),delete e.then,e)))}return W}let W;var G=r("a1ff"),q=r("8539");let $=null,X=null;async function Y(){return Object(n["j"])(X)&&(X=U(),$=await X),X}function K(e,t){if(Object(n["j"])($))return e.byteLength;const r=new $.BasisFile(new Uint8Array(e)),i=Q(r)?Z(r.getNumLevels(0),r.getHasAlpha(),r.getImageWidth(0,0),r.getImageHeight(0,0),t):0;return r.close(),r.delete(),i}function J(e,t){if(Object(n["j"])($))return e.byteLength;const r=new $.KTX2File(new Uint8Array(e)),i=ee(r)?Z(r.getLevels(),r.getHasAlpha(),r.getWidth(),r.getHeight(),t):0;return r.close(),r.delete(),i}function Z(e,t,r,i,n){const o=Object(q["b"])(t?37496:37492),a=n&&e>1?(4**e-1)/(3*4**(e-1)):1;return Math.ceil(r*i*o*a)}function Q(e){return e.getNumImages()>=1&&!e.isUASTC()}function ee(e){return e.getFaces()>=1&&e.isETC1S()}async function te(e,t,r){Object(n["j"])($)&&($=await Y());const i=new $.BasisFile(new Uint8Array(r));if(!Q(i))return null;i.startTranscoding();const o=ie(e,t,i.getNumLevels(0),i.getHasAlpha(),i.getImageWidth(0,0),i.getImageHeight(0,0),(e,t)=>i.getImageTranscodedSizeInBytes(0,e,t),(e,t,r)=>i.transcodeImage(r,0,e,t,0,0));return i.close(),i.delete(),o}async function re(e,t,r){Object(n["j"])($)&&($=await Y());const i=new $.KTX2File(new Uint8Array(r));if(!ee(i))return null;i.startTranscoding();const o=ie(e,t,i.getLevels(),i.getHasAlpha(),i.getWidth(),i.getHeight(),(e,t)=>i.getImageTranscodedSizeInBytes(e,0,0,t),(e,t,r)=>i.transcodeImage(r,e,0,0,t,0,-1,-1));return i.close(),i.delete(),o}function ie(e,t,r,i,n,o,a,s){const{compressedTextureETC:c,compressedTextureS3TC:l}=e.capabilities,[u,d]=c?i?[1,37496]:[0,37492]:l?i?[3,33779]:[2,33776]:[13,6408],f=t.hasMipmap?r:Math.min(1,r),h=[];for(let b=0;b<f;b++)h.push(new Uint8Array(a(b,u))),s(b,u,h[b]);const p=h.length>1,m=p?9987:9729,v={...t,samplingMode:m,hasMipmap:p,internalFormat:d,width:n,height:o};return new G["a"](e,v,{type:"compressed",levels:h})}const ne=_["a"].getLogger("esri.views.3d.webgl-engine.lib.DDSUtil"),oe=542327876,ae=131072,se=4;function ce(e){return e.charCodeAt(0)+(e.charCodeAt(1)<<8)+(e.charCodeAt(2)<<16)+(e.charCodeAt(3)<<24)}function le(e){return String.fromCharCode(255&e,e>>8&255,e>>16&255,e>>24&255)}const ue=ce("DXT1"),de=ce("DXT3"),fe=ce("DXT5"),he=31,pe=0,me=1,ve=2,be=3,ge=4,xe=7,ye=20,Te=21;function _e(e,t,r){const{textureData:i,internalFormat:n,width:o,height:a}=Oe(r,t.hasMipmap);return t.samplingMode=i.levels.length>1?9987:9729,t.hasMipmap=i.levels.length>1,t.internalFormat=n,t.width=o,t.height=a,new G["a"](e,t,i)}function Oe(e,t){const r=new Int32Array(e,0,he);if(r[pe]!==oe)return ne.error("Invalid magic number in DDS header"),null;if(!(r[ye]&se))return ne.error("Unsupported format, must contain a FourCC code"),null;const i=r[Te];let n,o;switch(i){case ue:n=8,o=33776;break;case de:n=16,o=33778;break;case fe:n=16,o=33779;break;default:return ne.error("Unsupported FourCC code:",le(i)),null}let a=1,s=r[ge],c=r[be];0==(3&s)&&0==(3&c)||(ne.warn("Rounding up compressed texture size to nearest multiple of 4."),s=s+3&-4,c=c+3&-4);const l=s,u=c;let d,f;r[ve]&ae&&!1!==t&&(a=Math.max(1,r[xe])),1===a||Object(R["j"])(s)&&Object(R["j"])(c)||(ne.warn("Ignoring mipmaps of non power of two sized compressed texture."),a=1);let h=r[me]+4;const p=[];for(let m=0;m<a;++m)f=(s+3>>2)*(c+3>>2)*n,d=new Uint8Array(e,h,f),p.push(d),h+=f,s=Math.max(1,s>>1),c=Math.max(1,c>>1);return{textureData:{type:"compressed",levels:p},internalFormat:o,width:l,height:u}}const Se=new Map([["position",0],["normal",1],["uv0",2],["color",3],["size",4],["tangent",4],["auxpos1",5],["symbolColor",5],["auxpos2",6],["featureAttribute",6],["instanceFeatureAttribute",6],["instanceColor",7],["model",8],["modelNormal",12],["modelOriginHi",11],["modelOriginLo",15]]),we=[{name:"position",count:2,type:5126,offset:0,stride:8,normalized:!1}],Me=[{name:"position",count:2,type:5126,offset:0,stride:16,normalized:!1},{name:"uv0",count:2,type:5126,offset:8,stride:16,normalized:!1}];var Ce=r("7ce4"),Ae=r("0fa6");function Ee(e,t=we,r=Se,i=-1,n=1){let o=null;return o=t===Me?new Float32Array([i,i,0,0,n,i,1,0,i,n,0,1,n,n,1,1]):new Float32Array([i,i,n,i,i,n,n,n]),new Ae["a"](e,r,{geometry:t},{geometry:Ce["a"].createVertex(e,35044,o)})}var Pe=r("d267"),je=r("c514");class Be extends j{constructor(e,t){super(),this.data=e,this.type=4,this._glTexture=null,this._powerOfTwoStretchInfo=null,this._loadingPromise=null,this._loadingController=null,this.events=new D["a"],this.params=t||{},this.params.mipmap=!1!==this.params.mipmap,this.params.noUnpackFlip=this.params.noUnpackFlip||!1,this.params.preMultiplyAlpha=this.params.preMultiplyAlpha||!1,this.params.wrap=this.params.wrap||{s:10497,t:10497},this.params.powerOfTwoResizeMode=this.params.powerOfTwoResizeMode||1,this.estimatedTexMemRequired=Be.estimateTexMemRequired(this.data,this.params),this.startPreload()}startPreload(){const e=this.data;Object(n["j"])(e)||(e instanceof HTMLVideoElement?this.startPreloadVideoElement(e):e instanceof HTMLImageElement&&this.startPreloadImageElement(e))}startPreloadVideoElement(e){Object(V["t"])(e.src)||"auto"===e.preload&&e.crossOrigin||(e.preload="auto",e.crossOrigin="anonymous",e.src=e.src)}startPreloadImageElement(e){Object(V["u"])(e.src)||Object(V["t"])(e.src)||e.crossOrigin||(e.crossOrigin="anonymous",e.src=e.src)}static getDataDimensions(e){return e instanceof HTMLVideoElement?{width:e.videoWidth,height:e.videoHeight}:e}static estimateTexMemRequired(e,t){if(Object(n["j"])(e))return 0;if(Object(N["c"])(e)||Object(N["k"])(e))return t.encoding===Be.KTX2_ENCODING?J(e,t.mipmap):t.encoding===Be.BASIS_ENCODING?K(e,t.mipmap):e.byteLength;const{width:r,height:i}=e instanceof Image||e instanceof ImageData||e instanceof HTMLCanvasElement||e instanceof HTMLVideoElement?Be.getDataDimensions(e):t;return(t.mipmap?4/3:1)*r*i*(t.components||4)||0}dispose(){this.data=void 0}get width(){return this.params.width}get height(){return this.params.height}createDescriptor(e){var t;return{target:3553,pixelFormat:6408,dataType:5121,wrapMode:this.params.wrap,flipped:!this.params.noUnpackFlip,samplingMode:this.params.mipmap?9987:9729,hasMipmap:this.params.mipmap,preMultiplyAlpha:this.params.preMultiplyAlpha,maxAnisotropy:null!=(t=this.params.maxAnisotropy)?t:this.params.mipmap?e.parameters.maxMaxAnisotropy:1}}get glTexture(){return this._glTexture}load(e,t){if(Object(n["k"])(this._glTexture))return this._glTexture;if(Object(n["k"])(this._loadingPromise))return this._loadingPromise;const r=this.data;return Object(n["j"])(r)?(this._glTexture=new G["a"](e,this.createDescriptor(e),null),this._glTexture):"string"==typeof r?this.loadFromURL(e,t,r):r instanceof Image?this.loadFromImageElement(e,t,r):r instanceof HTMLVideoElement?this.loadFromVideoElement(e,t,r):r instanceof ImageData||r instanceof HTMLCanvasElement?this.loadFromImage(e,r,t):(Object(N["c"])(r)||Object(N["k"])(r))&&this.params.encoding===Be.DDS_ENCODING?this.loadFromDDSData(e,r):(Object(N["c"])(r)||Object(N["k"])(r))&&this.params.encoding===Be.KTX2_ENCODING?this.loadFromKTX2(e,r):(Object(N["c"])(r)||Object(N["k"])(r))&&this.params.encoding===Be.BASIS_ENCODING?this.loadFromBasis(e,r):Object(N["k"])(r)?this.loadFromPixelData(e,r):Object(N["c"])(r)?this.loadFromPixelData(e,new Uint8Array(r)):null}get requiresFrameUpdates(){return this.data instanceof HTMLVideoElement}frameUpdate(e,t,r){if(!(this.data instanceof HTMLVideoElement)||Object(n["j"])(this._glTexture))return r;if(this.data.readyState<2||r===this.data.currentTime)return r;if(Object(n["k"])(this._powerOfTwoStretchInfo)){const{framebuffer:r,vao:i,sourceTexture:n}=this._powerOfTwoStretchInfo;n.setData(this.data),this.drawStretchedTexture(e,t,r,i,n,this._glTexture)}else{const{width:e,height:t}=this.data,{width:r,height:i}=this._glTexture.descriptor;e!==r||t!==i?this._glTexture.updateData(0,0,0,Math.min(e,r),Math.min(t,i),this.data):this._glTexture.setData(this.data)}return this._glTexture.descriptor.hasMipmap&&this._glTexture.generateMipmap(),this.data.currentTime}loadFromDDSData(e,t){return this._glTexture=_e(e,this.createDescriptor(e),t),this._glTexture}loadFromKTX2(e,t){return this.loadAsync(()=>re(e,this.createDescriptor(e),t).then(e=>(this._glTexture=e,e)))}loadFromBasis(e,t){return this.loadAsync(()=>te(e,this.createDescriptor(e),t).then(e=>(this._glTexture=e,e)))}loadFromPixelData(e,t){Object(C["a"])(this.params.width>0&&this.params.height>0);const r=this.createDescriptor(e);return r.pixelFormat=1===this.params.components?6409:3===this.params.components?6407:6408,r.width=this.params.width,r.height=this.params.height,this._glTexture=new G["a"](e,r,t),this._glTexture}loadFromURL(e,t,r){return this.loadAsync(async i=>{const n=await Object(w["a"])(r,{signal:i});return this.loadFromImage(e,n,t)})}loadFromImageElement(e,t,r){return r.complete?this.loadFromImage(e,r,t):this.loadAsync(async i=>{const n=await Object(k["a"])(r,r.src,!1,i);return this.loadFromImage(e,n,t)})}loadFromVideoElement(e,t,r){return r.readyState>=2?this.loadFromImage(e,r,t):this.loadFromVideoElementAsync(e,t,r)}loadFromVideoElementAsync(e,t,r){return this.loadAsync(i=>new Promise((o,a)=>{const s=()=>{r.removeEventListener("loadeddata",c),r.removeEventListener("error",l),Object(n["q"])(u)},c=()=>{r.readyState>=2&&(s(),o(this.loadFromImage(e,r,t)))},l=e=>{s(),a(e||new T["a"]("Failed to load video"))};r.addEventListener("loadeddata",c),r.addEventListener("error",l);const u=Object(O["p"])(i,()=>l(Object(O["d"])()))}))}loadFromImage(e,t,r){const i=Be.getDataDimensions(t);this.params.width=i.width,this.params.height=i.height;const n=this.createDescriptor(e);return n.pixelFormat=3===this.params.components?6407:6408,!this.requiresPowerOfTwo(e,n)||Object(R["j"])(i.width)&&Object(R["j"])(i.height)?(n.width=i.width,n.height=i.height,this._glTexture=new G["a"](e,n,t),this._glTexture):(this._glTexture=this.makePowerOfTwoTexture(e,t,i,n,r),this._glTexture)}loadAsync(e){const t=new AbortController;this._loadingController=t;const r=e(t.signal);this._loadingPromise=r;const i=()=>{this._loadingController===t&&(this._loadingController=null),this._loadingPromise===r&&(this._loadingPromise=null)};return r.then(i,i),r}requiresPowerOfTwo(e,t){const r=33071,i="number"==typeof t.wrapMode?t.wrapMode===r:t.wrapMode.s===r&&t.wrapMode.t===r;return!Object(je["a"])(e.gl)&&(t.hasMipmap||!i)}makePowerOfTwoTexture(e,t,r,i,n){const{width:o,height:a}=r,s=Object(R["l"])(o),c=Object(R["l"])(a);let l;switch(i.width=s,i.height=c,this.params.powerOfTwoResizeMode){case 2:i.textureCoordinateScaleFactor=[o/s,a/c],l=new G["a"](e,i),l.updateData(0,0,0,o,a,t);break;case 1:case null:case void 0:l=this.stretchToPowerOfTwo(e,t,i,n());break;default:Object(z["a"])(this.params.powerOfTwoResizeMode)}return i.hasMipmap&&l.generateMipmap(),l}stretchToPowerOfTwo(e,t,r,i){const n=new G["a"](e,r),o=new Pe["a"](e,{colorTarget:0,depthStencilTarget:0},n),a=new G["a"](e,{target:3553,pixelFormat:r.pixelFormat,dataType:5121,wrapMode:33071,samplingMode:9729,flipped:!!r.flipped,maxAnisotropy:8,preMultiplyAlpha:r.preMultiplyAlpha},t),s=Ee(e),c=e.getBoundFramebufferObject();return this.drawStretchedTexture(e,i,o,s,a,n),this.requiresFrameUpdates?this._powerOfTwoStretchInfo={vao:s,sourceTexture:a,framebuffer:o}:(s.dispose(!0),a.dispose(),o.detachColorTexture(),o.dispose()),e.bindFramebuffer(c),n}drawStretchedTexture(e,t,r,i,n,o){e.bindFramebuffer(r);const a=e.getViewport();e.setViewport(0,0,o.descriptor.width,o.descriptor.height);const s=t.program;e.useProgram(s),s.setUniform4f("color",1,1,1,1),s.bindTexture(n,"tex"),e.bindVAO(i),t.bindPipelineState(e),e.drawArrays(5,0,Object(q["e"])(i,"geometry")),e.bindFramebuffer(null),e.setViewport(a.x,a.y,a.width,a.height)}unload(){if(Object(n["k"])(this._powerOfTwoStretchInfo)){const{framebuffer:e,vao:t,sourceTexture:r}=this._powerOfTwoStretchInfo;t.dispose(!0),r.dispose(),e.dispose(),this._glTexture=null,this._powerOfTwoStretchInfo=null}if(Object(n["k"])(this._glTexture)&&(this._glTexture.dispose(),this._glTexture=null),Object(n["k"])(this._loadingController)){const e=this._loadingController;this._loadingController=null,this._loadingPromise=null,e.abort()}this.events.emit("unloaded")}}Be.DDS_ENCODING="image/vnd-ms.dds",Be.KTX2_ENCODING="image/ktx2",Be.BASIS_ENCODING="image/x.basis";var Fe=r("fc00"),Ie=r("ebd5");class Le{constructor(e){this._material=e.material,this._techniqueRep=e.techniqueRep,this._output=e.output}dispose(){this._techniqueRep.release(this._technique)}get technique(){return this._technique}ensureTechnique(e,t,r=this._output){return this._technique=this._techniqueRep.releaseAndAcquire(e,this._material.getTechniqueConfig(r,t),this._technique),this._technique}ensureResources(e){return 2}}class ze extends Le{constructor(e){super(e),this._numLoading=0,this._disposed=!1,this._textureRepository=e.textureRep,this._textureId=e.textureId,this._acquire(e.textureId).then(e=>this._texture=e),this._acquire(e.normalTextureId).then(e=>this._textureNormal=e),this._acquire(e.emissiveTextureId).then(e=>this._textureEmissive=e),this._acquire(e.occlusionTextureId).then(e=>this._textureOcclusion=e),this._acquire(e.metallicRoughnessTextureId).then(e=>this._textureMetallicRoughness=e)}dispose(){this._texture=Object(n["p"])(this._texture),this._textureNormal=Object(n["p"])(this._textureNormal),this._textureEmissive=Object(n["p"])(this._textureEmissive),this._textureOcclusion=Object(n["p"])(this._textureOcclusion),this._textureMetallicRoughness=Object(n["p"])(this._textureMetallicRoughness),this._disposed=!0}ensureResources(e){return 0===this._numLoading?2:1}updateTexture(e){(Object(n["j"])(this._texture)||e!==this._texture.id)&&(this._texture=Object(n["p"])(this._texture),this._textureId=e,this._acquire(this._textureId).then(e=>this._texture=e))}bindTextures(e){Object(n["k"])(this._texture)&&e.bindTexture(this._texture.glTexture,"tex"),Object(n["k"])(this._textureNormal)&&e.bindTexture(this._textureNormal.glTexture,"normalTexture"),Object(n["k"])(this._textureEmissive)&&e.bindTexture(this._textureEmissive.glTexture,"texEmission"),Object(n["k"])(this._textureOcclusion)&&e.bindTexture(this._textureOcclusion.glTexture,"texOcclusion"),Object(n["k"])(this._textureMetallicRoughness)&&e.bindTexture(this._textureMetallicRoughness.glTexture,"texMetallicRoughness")}bindTextureScale(e){const t=Object(n["k"])(this._texture)?this._texture.glTexture:null;Object(n["k"])(t)&&t.descriptor.textureCoordinateScaleFactor?e.setUniform2fv("textureCoordinateScaleFactor",t.descriptor.textureCoordinateScaleFactor):e.setUniform2f("textureCoordinateScaleFactor",1,1)}_acquire(e){return Object(n["j"])(e)?Promise.resolve(null):(++this._numLoading,this._textureRepository.acquire(e).then(e=>this._disposed?(Object(n["p"])(e),null):e).finally(()=>--this._numLoading))}}var De=r("7c51");class Re extends j{constructor(e,t){super(),this.type=3,this.supportsEdges=!1,this._visible=!0,this._renderPriority=0,this._insertOrder=0,this._vertexAttributeLocations=Se,this._parameters=Object(De["c"])(e,t),this.validateParameters(this._parameters)}dispose(){}get parameters(){return this._parameters}update(e){return!1}setParameters(e){Object(De["e"])(this._parameters,e)&&(this.validateParameters(this._parameters),this.parametersChanged())}validateParameters(e){}get visible(){return this._visible}set visible(e){e!==this._visible&&(this._visible=e,this.parametersChanged())}shouldRender(e){return this.isVisible()&&this.isVisibleInPass(e.pass)&&0!=(this.renderOccluded&e.renderOccludedMask)}isVisibleInPass(e){return!0}get renderOccluded(){return this.parameters.renderOccluded}get renderPriority(){return this._renderPriority}set renderPriority(e){e!==this._renderPriority&&(this._renderPriority=e,this.parametersChanged())}get insertOrder(){return this._insertOrder}set insertOrder(e){e!==this._insertOrder&&(this._insertOrder=e,this.parametersChanged())}get vertexAttributeLocations(){return this._vertexAttributeLocations}isVisible(){return this._visible}parametersChanged(){Object(n["k"])(this.repository)&&this.repository.materialChanged(this)}}const Ne={renderOccluded:1};var Ve=r("7438"),ke=r("04f0"),He=r("b1390"),Ue=r("47f8"),We=r("0fc4"),Ge=(r("c120"),r("7577")),qe=(r("b50f"),r("2119")),$e=r("7361");function Xe(e,t,r){const i=Object(l["e"])(e.direction,Object(l["g"])(r,t,e.origin));return Object(l["c"])(r,e.origin,Object(l["b"])(r,e.direction,i)),r}function Ye(){return{origin:null,direction:null}}new qe["a"](Ye);function Ke(e,t){const r=Object(l["e"])(e,t)/(Object(l["m"])(e)*Object(l["m"])(t));return-Object(R["b"])(r)}Object(u["e"])(),Object(u["e"])();const Je=_["a"].getLogger("esri.geometry.support.sphere");function Ze(){return Object(We["b"])()}function Qe(e,t=Ze()){return Object(Ge["c"])(t,e)}function et(e,t){return Object(We["c"])(e[0],e[1],e[2],t)}function tt(e){return e}function rt(e){e[0]=e[1]=e[2]=e[3]=0}function it(e){return e}function nt(e){return Array.isArray(e)?e[3]:e}function ot(e){return Array.isArray(e)?e:_t}function at(e,t,r,i){return Object(We["c"])(e,t,r,i)}function st(e,t,r){return e!==r&&Object(l["h"])(r,e),r[3]=e[3]+t,r}function ct(e,t,r){return Je.error("sphere.setExtent is not yet supported"),e===r?r:Qe(e,r)}function lt(e,t,r){if(Object(n["j"])(t))return!1;const{origin:i,direction:o}=t,a=ut;a[0]=i[0]-e[0],a[1]=i[1]-e[1],a[2]=i[2]-e[2];const s=o[0]*o[0]+o[1]*o[1]+o[2]*o[2],c=2*(o[0]*a[0]+o[1]*a[1]+o[2]*a[2]),l=c*c-4*s*(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]-e[3]*e[3]);if(l<0)return!1;const u=Math.sqrt(l);let d=(-c-u)/(2*s);const f=(-c+u)/(2*s);return(d<0||f<d&&f>0)&&(d=f),!(d<0)&&(r&&(r[0]=i[0]+o[0]*d,r[1]=i[1]+o[1]*d,r[2]=i[2]+o[2]*d),!0)}const ut=Object(u["e"])();function dt(e,t){return lt(e,t,null)}function ft(e,t,r){if(lt(e,t,r))return r;const i=ht(e,t,$e["b"].get());return Object(l["c"])(r,t.origin,Object(l["b"])($e["b"].get(),t.direction,Object(l["j"])(t.origin,i)/Object(l["m"])(t.direction))),r}function ht(e,t,r){const i=$e["b"].get(),n=$e["a"].get();Object(l["d"])(i,t.origin,t.direction);const o=nt(e);Object(l["d"])(r,i,t.origin),Object(l["b"])(r,r,1/Object(l["m"])(r)*o);const a=bt(e,t.origin),c=Ke(t.origin,r);return Object(s["f"])(n),Object(s["d"])(n,n,c+a,i),Object(l["n"])(r,r,n),r}function pt(e,t,r){return lt(e,t,r)?r:(Xe(t,ot(e),r),mt(e,r,r))}function mt(e,t,r){const i=Object(l["g"])($e["b"].get(),t,ot(e)),n=Object(l["b"])($e["b"].get(),i,e[3]/Object(l["m"])(i));return Object(l["c"])(r,n,ot(e))}function vt(e,t){const r=Object(l["g"])($e["b"].get(),t,ot(e)),i=Object(l["p"])(r),n=e[3]*e[3];return Math.sqrt(Math.abs(i-n))}function bt(e,t){const r=Object(l["g"])($e["b"].get(),t,ot(e)),i=Object(l["m"])(r),n=nt(e),o=n+Math.abs(n-i);return Object(R["b"])(n/o)}const gt=Object(u["e"])();function xt(e,t,r,i){const n=Object(l["g"])(gt,t,ot(e));switch(r){case 0:{const e=Object(R["d"])(n,gt)[2];return Object(l["s"])(i,-Math.sin(e),Math.cos(e),0)}case 1:{const e=Object(R["d"])(n,gt),t=e[1],r=e[2],o=Math.sin(t);return Object(l["s"])(i,-o*Math.cos(r),-o*Math.sin(r),Math.cos(t))}case 2:return Object(l["o"])(i,n);default:return}}function yt(e,t){const r=Object(l["g"])(Ot,t,ot(e));return Object(l["m"])(r)-e[3]}function Tt(e,t,r,i){const n=yt(e,t),o=xt(e,t,2,Ot),a=Object(l["b"])(Ot,o,r-n);return Object(l["c"])(i,t,a)}const _t=Object(u["e"])(),Ot=Object(u["e"])();Object.freeze({__proto__:null,create:Ze,copy:Qe,fromCenterAndRadius:et,wrap:tt,clear:rt,fromRadius:it,getRadius:nt,getCenter:ot,fromValues:at,elevate:st,setExtent:ct,intersectRay:lt,intersectsRay:dt,intersectRayClosestSilhouette:ft,closestPointOnSilhouette:ht,closestPoint:pt,projectPoint:mt,distanceToSilhouette:vt,angleToSilhouette:bt,axisAt:xt,altitudeAt:yt,setAltitudeAt:Tt});class St{constructor(e=0){this.offset=e,this.tmpVertex=Object(u["e"])()}applyToVertex(e,t,r){const i=e+this.localOrigin[0],n=t+this.localOrigin[1],o=r+this.localOrigin[2],a=this.offset/Math.sqrt(i*i+n*n+o*o);return this.tmpVertex[0]=e+i*a,this.tmpVertex[1]=t+n*a,this.tmpVertex[2]=r+o*a,this.tmpVertex}applyToAabb(e){const t=e[0]+this.localOrigin[0],r=e[1]+this.localOrigin[1],i=e[2]+this.localOrigin[2],n=e[3]+this.localOrigin[0],o=e[4]+this.localOrigin[1],a=e[5]+this.localOrigin[2],s=this.offset/Math.sqrt(t*t+r*r+i*i);e[0]+=t*s,e[1]+=r*s,e[2]+=i*s;const c=this.offset/Math.sqrt(n*n+o*o+a*a);return e[3]+=n*c,e[4]+=o*c,e[5]+=a*c,e}}class wt{constructor(e=0){this.offset=e,this.componentLocalOriginLength=0,this.tmpVertex=Object(u["e"])(),this.mbs=Object(We["b"])(),this.obb={center:Object(u["e"])(),halfSize:Object(Ue["a"])(),quaternion:null}}set localOrigin(e){this.componentLocalOriginLength=Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2])}applyToVertex(e,t,r){const i=e,n=t,o=r+this.componentLocalOriginLength,a=this.offset/Math.sqrt(i*i+n*n+o*o);return this.tmpVertex[0]=e+i*a,this.tmpVertex[1]=t+n*a,this.tmpVertex[2]=r+o*a,this.tmpVertex}applyToAabb(e){const t=e[0],r=e[1],i=e[2]+this.componentLocalOriginLength,n=e[3],o=e[4],a=e[5]+this.componentLocalOriginLength,s=this.offset/Math.sqrt(t*t+r*r+i*i);e[0]+=t*s,e[1]+=r*s,e[2]+=i*s;const c=this.offset/Math.sqrt(n*n+o*o+a*a);return e[3]+=n*c,e[4]+=o*c,e[5]+=a*c,e}applyToMbs(e){const t=Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]),r=this.offset/t;return this.mbs[0]=e[0]+e[0]*r,this.mbs[1]=e[1]+e[1]*r,this.mbs[2]=e[2]+e[2]*r,this.mbs[3]=e[3]+e[3]*this.offset/t,this.mbs}applyToObb(e){const t=e.center,r=this.offset/Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);this.obb.center[0]=t[0]+t[0]*r,this.obb.center[1]=t[1]+t[1]*r,this.obb.center[2]=t[2]+t[2]*r,Object(l["q"])(this.obb.halfSize,e.halfSize,e.quaternion),Object(l["c"])(this.obb.halfSize,this.obb.halfSize,e.center);const i=this.offset/Math.sqrt(this.obb.halfSize[0]*this.obb.halfSize[0]+this.obb.halfSize[1]*this.obb.halfSize[1]+this.obb.halfSize[2]*this.obb.halfSize[2]);return this.obb.halfSize[0]+=this.obb.halfSize[0]*i,this.obb.halfSize[1]+=this.obb.halfSize[1]*i,this.obb.halfSize[2]+=this.obb.halfSize[2]*i,Object(l["g"])(this.obb.halfSize,this.obb.halfSize,e.center),Object(ke["a"])(Et,e.quaternion),Object(l["q"])(this.obb.halfSize,this.obb.halfSize,Et),this.obb.halfSize[0]*=this.obb.halfSize[0]<0?-1:1,this.obb.halfSize[1]*=this.obb.halfSize[1]<0?-1:1,this.obb.halfSize[2]*=this.obb.halfSize[2]<0?-1:1,this.obb.quaternion=e.quaternion,this.obb}}class Mt{constructor(e=0){this.offset=e,this.sphere=Ze(),this.tmpVertex=Object(u["e"])()}applyToVertex(e,t,r){const i=this.objectTransform.transform;let n=i[0]*e+i[4]*t+i[8]*r+i[12],o=i[1]*e+i[5]*t+i[9]*r+i[13],a=i[2]*e+i[6]*t+i[10]*r+i[14];const s=this.offset/Math.sqrt(n*n+o*o+a*a);n+=n*s,o+=o*s,a+=a*s;const c=this.objectTransform.inverse;return this.tmpVertex[0]=c[0]*n+c[4]*o+c[8]*a+c[12],this.tmpVertex[1]=c[1]*n+c[5]*o+c[9]*a+c[13],this.tmpVertex[2]=c[2]*n+c[6]*o+c[10]*a+c[14],this.tmpVertex}applyToMinMax(e,t){const r=this.offset/Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]);e[0]+=e[0]*r,e[1]+=e[1]*r,e[2]+=e[2]*r;const i=this.offset/Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);t[0]+=t[0]*i,t[1]+=t[1]*i,t[2]+=t[2]*i}applyToAabb(e){const t=this.offset/Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]);e[0]+=e[0]*t,e[1]+=e[1]*t,e[2]+=e[2]*t;const r=this.offset/Math.sqrt(e[3]*e[3]+e[4]*e[4]+e[5]*e[5]);return e[3]+=e[3]*r,e[4]+=e[4]*r,e[5]+=e[5]*r,e}applyToBoundingSphere(e){const t=Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]),r=this.offset/t;return this.sphere[0]=e[0]+e[0]*r,this.sphere[1]=e[1]+e[1]*r,this.sphere[2]=e[2]+e[2]*r,this.sphere[3]=e[3]+e[3]*this.offset/t,this.sphere}}const Ct=new Mt;function At(e){return Object(n["k"])(e)?(Ct.offset=e,Ct):null}new wt;new St;const Et=Object(He["b"])();function Pt(e,t,r,i){const n=r.typedBuffer,o=r.typedBufferStride,a=e.length;i*=o;for(let s=0;s<a;++s){const r=2*e[s];n[i]=t[r],n[i+1]=t[r+1],i+=o}}function jt(e,t,r,i,n){const o=r.typedBuffer,a=r.typedBufferStride,s=e.length;if(i*=a,null==n||1===n)for(let c=0;c<s;++c){const r=3*e[c];o[i]=t[r],o[i+1]=t[r+1],o[i+2]=t[r+2],i+=a}else for(let c=0;c<s;++c){const r=3*e[c];for(let e=0;e<n;++e)o[i]=t[r],o[i+1]=t[r+1],o[i+2]=t[r+2],i+=a}}function Bt(e,t,r,i,n=1){const o=r.typedBuffer,a=r.typedBufferStride,s=e.length;if(i*=a,1===n)for(let c=0;c<s;++c){const r=4*e[c];o[i]=t[r],o[i+1]=t[r+1],o[i+2]=t[r+2],o[i+3]=t[r+3],i+=a}else for(let c=0;c<s;++c){const r=4*e[c];for(let e=0;e<n;++e)o[i]=t[r],o[i+1]=t[r+1],o[i+2]=t[r+2],o[i+3]=t[r+3],i+=a}}function Ft(e,t,r,i,n,o=1){if(!r)return void jt(e,t,i,n,o);const a=i.typedBuffer,s=i.typedBufferStride,c=e.length,l=r[0],u=r[1],d=r[2],f=r[4],h=r[5],p=r[6],m=r[8],v=r[9],b=r[10],g=r[12],x=r[13],y=r[14];if(n*=s,1===o)for(let T=0;T<c;++T){const r=3*e[T],i=t[r],o=t[r+1],c=t[r+2];a[n]=l*i+f*o+m*c+g,a[n+1]=u*i+h*o+v*c+x,a[n+2]=d*i+p*o+b*c+y,n+=s}else for(let T=0;T<c;++T){const r=3*e[T],i=t[r],c=t[r+1],_=t[r+2],O=l*i+f*c+m*_+g,S=u*i+h*c+v*_+x,w=d*i+p*c+b*_+y;for(let e=0;e<o;++e)a[n]=O,a[n+1]=S,a[n+2]=w,n+=s}}function It(e,t,r,i,n,o=1){if(!r)return void jt(e,t,i,n,o);const a=r,c=i.typedBuffer,l=i.typedBufferStride,u=e.length,d=a[0],f=a[1],h=a[2],p=a[4],m=a[5],v=a[6],b=a[8],g=a[9],x=a[10],y=!Object(s["g"])(a),T=1e-6,_=1-T;if(n*=l,1===o)for(let s=0;s<u;++s){const r=3*e[s],i=t[r],o=t[r+1],a=t[r+2];let u=d*i+p*o+b*a,O=f*i+m*o+g*a,S=h*i+v*o+x*a;if(y){const e=u*u+O*O+S*S;if(e<_&&e>T){const t=1/Math.sqrt(e);u*=t,O*=t,S*=t}}c[n+0]=u,c[n+1]=O,c[n+2]=S,n+=l}else for(let s=0;s<u;++s){const r=3*e[s],i=t[r],a=t[r+1],u=t[r+2];let O=d*i+p*a+b*u,S=f*i+m*a+g*u,w=h*i+v*a+x*u;if(y){const e=O*O+S*S+w*w;if(e<_&&e>T){const t=1/Math.sqrt(e);O*=t,S*=t,w*=t}}for(let e=0;e<o;++e)c[n+0]=O,c[n+1]=S,c[n+2]=w,n+=l}}function Lt(e,t,r,i,n,o=1){if(!r)return void Bt(e,t,i,n,o);const a=r,c=i.typedBuffer,l=i.typedBufferStride,u=e.length,d=a[0],f=a[1],h=a[2],p=a[4],m=a[5],v=a[6],b=a[8],g=a[9],x=a[10],y=!Object(s["g"])(a),T=1e-6,_=1-T;if(n*=l,1===o)for(let s=0;s<u;++s){const r=4*e[s],i=t[r],o=t[r+1],a=t[r+2],u=t[r+3];let O=d*i+p*o+b*a,S=f*i+m*o+g*a,w=h*i+v*o+x*a;if(y){const e=O*O+S*S+w*w;if(e<_&&e>T){const t=1/Math.sqrt(e);O*=t,S*=t,w*=t}}c[n+0]=O,c[n+1]=S,c[n+2]=w,c[n+3]=u,n+=l}else for(let s=0;s<u;++s){const r=4*e[s],i=t[r],a=t[r+1],u=t[r+2],O=t[r+3];let S=d*i+p*a+b*u,w=f*i+m*a+g*u,M=h*i+v*a+x*u;if(y){const e=S*S+w*w+M*M;if(e<_&&e>T){const t=1/Math.sqrt(e);S*=t,w*=t,M*=t}}for(let e=0;e<o;++e)c[n+0]=S,c[n+1]=w,c[n+2]=M,c[n+3]=O,n+=l}}function zt(e,t,r,i,n,o=1){const a=i.typedBuffer,s=i.typedBufferStride,c=e.length;if(n*=s,1===o){if(4===r)for(let l=0;l<c;++l){const r=4*e[l];a[n]=t[r],a[n+1]=t[r+1],a[n+2]=t[r+2],a[n+3]=t[r+3],n+=s}else if(3===r)for(let l=0;l<c;++l){const r=3*e[l];a[n]=t[r],a[n+1]=t[r+1],a[n+2]=t[r+2],a[n+3]=255,n+=s}}else if(4===r)for(let l=0;l<c;++l){const r=4*e[l];for(let e=0;e<o;++e)a[n]=t[r],a[n+1]=t[r+1],a[n+2]=t[r+2],a[n+3]=t[r+3],n+=s}else if(3===r)for(let l=0;l<c;++l){const r=3*e[l];for(let e=0;e<o;++e)a[n]=t[r],a[n+1]=t[r+1],a[n+2]=t[r+2],a[n+3]=255,n+=s}}function Dt(e,t,r,i,n,o){for(const a of t.fieldNames){const t=e.vertexAttributes.get(a),s=e.indices.get(a);if(t&&s)switch(a){case"position":{Object(C["a"])(3===t.size);const e=n.getField(a,f["u"]);e&&Ft(s,t.data,r,e,o);break}case"normal":{Object(C["a"])(3===t.size);const e=n.getField(a,f["u"]);e&&It(s,t.data,i,e,o);break}case"uv0":{Object(C["a"])(2===t.size);const e=n.getField(a,f["m"]);e&&Pt(s,t.data,e,o);break}case"color":{Object(C["a"])(3===t.size||4===t.size);const e=n.getField(a,f["J"]);e&&zt(s,t.data,t.size,e,o);break}case"symbolColor":{Object(C["a"])(3===t.size||4===t.size);const e=n.getField(a,f["J"]);e&&zt(s,t.data,t.size,e,o);break}case"tangent":{Object(C["a"])(4===t.size);const e=n.getField(a,f["C"]);e&&Lt(s,t.data,i,e,o);break}}}}var Rt=r("a4ee"),Nt=r("d272"),Vt=r("d539"),kt=r("17b0"),Ht=r("6a07"),Ut=r("c6d7"),Wt=r("a7d7"),Gt=r("d017"),qt=r("be24"),$t=r("6a21"),Xt=r("970c");function Yt(e,t,r){e.setUniform3f("camPos",r[3]-t[0],r[7]-t[1],r[11]-t[2])}function Kt(e,t){e.setUniformMatrix4fv("proj",t)}function Jt(e,t,r){Object(s["a"])(Zt,r,t),e.setUniform3fv("localOrigin",t),e.setUniformMatrix4fv("view",Zt)}const Zt=Object(Xt["a"])();class Qt{constructor(e,t){this._module=e,this._loadModule=t}get(){return this._module}async reload(){return this._module=await this._loadModule(),this._module}}class er{constructor(e,t,r=(()=>this.dispose())){this.release=r,t&&(this._config=t.snapshot()),this._program=this.initializeProgram(e),this._pipeline=this.initializePipeline(e)}dispose(){this._program=Object(n["f"])(this._program),this._pipeline=this._config=null}reload(e){Object(n["f"])(this._program),this._program=this.initializeProgram(e)}get program(){return this._program}get key(){return this._config.key}get configuration(){return this._config}bindPass(e,t){}bindMaterial(e,t){}bindDraw(e){}bindPipelineState(e,t=null,r){e.setPipelineState(this.getPipelineState(t,r))}ensureAttributeLocations(e){this.program.assertCompatibleVertexAttributeLocations(e)}get primitiveType(){return 4}getPipelineState(e,t){return this._pipeline}}class tr{constructor(){this._key="",this._keyDirty=!1,this._parameterBits=this._parameterBits?this._parameterBits.map(()=>0):[],this._parameterNames||(this._parameterNames=[])}get key(){return this._keyDirty&&(this._keyDirty=!1,this._key=String.fromCharCode.apply(String,this._parameterBits)),this._key}snapshot(){const e=this._parameterNames,t={key:this.key};for(const r of e)t[r]=this[r];return t}}function rr(e={}){return(t,r)=>{var i,n;t._parameterNames=null!=(i=t._parameterNames)?i:[],t._parameterNames.push(r);const o=t._parameterNames.length-1,a=e.count||2,s=Math.ceil(Math.log2(a)),c=null!=(n=t._parameterBits)?n:[0];let l=0;for(;c[l]+s>16;)l++,l>=c.length&&c.push(0);t._parameterBits=c;const u=c[l],d=(1<<s)-1<<u;c[l]+=s,Object.defineProperty(t,r,{get(){return this[o]},set(e){if(this[o]!==e&&(this[o]=e,this._keyDirty=!0,this._parameterBits[l]=this._parameterBits[l]&~d|+e<<u&d,"number"!=typeof e&&"boolean"!=typeof e))throw"Configuration value for "+r+" must be boolean or number, got "+typeof e}})}}var ir=r("1956"),nr=r("8e37");class or extends nr["a"]{constructor(e,t,r){super(e,t.generateSource("vertex"),t.generateSource("fragment"),r),this._textures=new Map,this._freeTextureUnits=new M["a"]({deallocator:null}),this._fragmentUniforms=Object(ir["b"])()?t.fragmentUniforms.entries:null}stop(){this._textures.clear(),this._freeTextureUnits.clear()}bindTexture(e,t){if(Object(n["j"])(e)||null==e.glName){const e=this._textures.get(t);return e&&(this._context.bindTexture(null,e.unit),this._freeTextureUnit(e),this._textures.delete(t)),null}let r=this._textures.get(t);return null==r?(r=this._allocTextureUnit(e),this._textures.set(t,r)):r.texture=e,this._context.useProgram(this),this.setUniform1i(t,r.unit),this._context.bindTexture(e,r.unit),r.unit}rebindTextures(){this._context.useProgram(this),this._textures.forEach((e,t)=>{this._context.bindTexture(e.texture,e.unit),this.setUniform1i(t,e.unit)}),Object(n["k"])(this._fragmentUniforms)&&this._fragmentUniforms.forEach(e=>{if(("sampler2D"===e.type||"samplerCube"===e.type)&&!this._textures.has(e.name))throw new Error(`Texture sampler ${e.name} has no bound texture`)})}_allocTextureUnit(e){return{texture:e,unit:0===this._freeTextureUnits.length?this._textures.size:this._freeTextureUnits.pop()}}_freeTextureUnit(e){this._freeTextureUnits.push(e.unit)}}const ar={mask:255},sr={function:{func:519,ref:2,mask:2},operation:{fail:7680,zFail:7680,zPass:0}},cr={function:{func:519,ref:2,mask:2},operation:{fail:7680,zFail:7680,zPass:7681}};var lr=r("0310"),ur=r("189c");class dr extends er{initializeProgram(e){const t=dr.shader.get(),r=this.configuration,i=t.build({OITEnabled:0===r.transparencyPassType,output:r.output,viewingMode:e.viewingMode,receiveShadows:r.receiveShadows,slicePlaneEnabled:r.slicePlaneEnabled,sliceHighlightDisabled:r.sliceHighlightDisabled,sliceEnabledForVertexPrograms:!1,symbolColor:r.symbolColors,vvSize:r.vvSize,vvColor:r.vvColor,vvInstancingEnabled:!0,instanced:r.instanced,instancedColor:r.instancedColor,instancedDoublePrecision:r.instancedDoublePrecision,pbrMode:r.usePBR?r.isSchematic?2:1:0,hasMetalnessAndRoughnessTexture:r.hasMetalnessAndRoughnessTexture,hasEmissionTexture:r.hasEmissionTexture,hasOcclusionTexture:r.hasOcclusionTexture,hasNormalTexture:r.hasNormalTexture,hasColorTexture:r.hasColorTexture,receiveAmbientOcclusion:r.receiveAmbientOcclusion,useCustomDTRExponentForWater:!1,normalType:r.normalsTypeDerivate?3:0,doubleSidedMode:r.doubleSidedMode,vertexTangents:r.vertexTangents,attributeTextureCoordinates:r.hasMetalnessAndRoughnessTexture||r.hasEmissionTexture||r.hasOcclusionTexture||r.hasNormalTexture||r.hasColorTexture?1:0,textureAlphaPremultiplied:r.textureAlphaPremultiplied,attributeColor:r.vertexColors,screenSizePerspectiveEnabled:r.screenSizePerspective,verticalOffsetEnabled:r.verticalOffset,offsetBackfaces:r.offsetBackfaces,doublePrecisionRequiresObfuscation:Object($t["b"])(e.rctx),alphaDiscardMode:r.alphaDiscardMode,supportsTextureAtlas:!1,multipassTerrainEnabled:r.multipassTerrainEnabled,cullAboveGround:r.cullAboveGround});return new or(e.rctx,i,Se)}bindPass(e,t){var r,i;Kt(this.program,t.camera.projectionMatrix);const n=this.configuration.output;(1===this.configuration.output||t.multipassTerrainEnabled||3===n)&&this.program.setUniform2fv("cameraNearFar",t.camera.nearFar),t.multipassTerrainEnabled&&(this.program.setUniform2fv("inverseViewport",t.inverseViewport),Object(Ut["a"])(this.program,t)),7===n&&(this.program.setUniform1f("opacity",e.opacity),this.program.setUniform1f("layerOpacity",e.layerOpacity),this.program.setUniform4fv("externalColor",e.externalColor),this.program.setUniform1i("colorMixMode",De["b"][e.colorMixMode])),0===n?(t.lighting.setUniforms(this.program,!1),this.program.setUniform3fv("ambient",e.ambient),this.program.setUniform3fv("diffuse",e.diffuse),this.program.setUniform4fv("externalColor",e.externalColor),this.program.setUniform1i("colorMixMode",De["b"][e.colorMixMode]),this.program.setUniform1f("opacity",e.opacity),this.program.setUniform1f("layerOpacity",e.layerOpacity),this.configuration.usePBR&&Object(Wt["b"])(this.program,e,this.configuration.isSchematic)):4===n&&Object(Ht["b"])(this.program,t),Object(qt["b"])(this.program,e),Object(kt["b"])(this.program,e,t),Object(De["a"])(e.screenSizePerspective,this.program,"screenSizePerspectiveAlignment"),2!==e.textureAlphaMode&&3!==e.textureAlphaMode||this.program.setUniform1f("textureAlphaCutoff",e.textureAlphaCutoff),null==(r=t.shadowMap)||r.bind(this.program),null==(i=t.ssaoHelper)||i.bind(this.program,t.camera)}bindDraw(e){const t=this.configuration.instancedDoublePrecision?Object(u["g"])(e.camera.viewInverseTransposeMatrix[3],e.camera.viewInverseTransposeMatrix[7],e.camera.viewInverseTransposeMatrix[11]):e.origin;Jt(this.program,t,e.camera.viewMatrix),this.program.rebindTextures(),(0===this.configuration.output||7===this.configuration.output||1===this.configuration.output&&this.configuration.screenSizePerspective||2===this.configuration.output&&this.configuration.screenSizePerspective||4===this.configuration.output&&this.configuration.screenSizePerspective)&&Yt(this.program,t,e.camera.viewInverseTransposeMatrix),2===this.configuration.output&&this.program.setUniformMatrix4fv("viewNormal",e.camera.viewInverseTransposeMatrix),this.configuration.instancedDoublePrecision&&Vt["a"].bindCustomOrigin(this.program,t),Object(Nt["b"])(this.program,this.configuration,e.slicePlane,t),0===this.configuration.output&&Object(Gt["b"])(this.program,e,t)}setPipeline(e,t){const r=this.configuration,i=3===e,n=2===e;return Object(ur["e"])({blending:0!==r.output&&7!==r.output||!r.transparent?null:i?Ve["e"]:Object(Ve["a"])(e),culling:fr(r)&&Object(ur["b"])(r.cullFace),depthTest:{func:Object(Ve["b"])(e)},depthWrite:i||n?r.writeDepth&&ur["d"]:null,colorWrite:ur["c"],stencilWrite:r.sceneHasOcludees?ar:null,stencilTest:r.sceneHasOcludees?t?cr:sr:null,polygonOffset:i||n?null:Object(Ve["f"])(r.enableOffset)})}initializePipeline(){return this._occludeePipelineState=this.setPipeline(this.configuration.transparencyPassType,!0),this.setPipeline(this.configuration.transparencyPassType,!1)}getPipelineState(e,t){return t?this._occludeePipelineState:super.getPipelineState(e,t)}}function fr(e){return e.cullFace?0!==e.cullFace:!e.slicePlaneEnabled&&!e.transparent&&!e.doubleSidedMode}dr.shader=new Qt(lr["a"],()=>r.e("chunk-2d0cb6c5").then(r.bind(null,"4a35")));class hr extends tr{constructor(){super(...arguments),this.output=0,this.alphaDiscardMode=1,this.doubleSidedMode=0,this.isSchematic=!1,this.vertexColors=!1,this.offsetBackfaces=!1,this.symbolColors=!1,this.vvSize=!1,this.vvColor=!1,this.verticalOffset=!1,this.receiveShadows=!1,this.slicePlaneEnabled=!1,this.sliceHighlightDisabled=!1,this.receiveAmbientOcclusion=!1,this.screenSizePerspective=!1,this.textureAlphaPremultiplied=!1,this.hasColorTexture=!1,this.usePBR=!1,this.hasMetalnessAndRoughnessTexture=!1,this.hasEmissionTexture=!1,this.hasOcclusionTexture=!1,this.hasNormalTexture=!1,this.instanced=!1,this.instancedColor=!1,this.instancedDoublePrecision=!1,this.vertexTangents=!1,this.normalsTypeDerivate=!1,this.writeDepth=!0,this.sceneHasOcludees=!1,this.transparent=!1,this.enableOffset=!0,this.cullFace=0,this.transparencyPassType=3,this.multipassTerrainEnabled=!1,this.cullAboveGround=!1}}Object(Rt["a"])([rr({count:8})],hr.prototype,"output",void 0),Object(Rt["a"])([rr({count:4})],hr.prototype,"alphaDiscardMode",void 0),Object(Rt["a"])([rr({count:3})],hr.prototype,"doubleSidedMode",void 0),Object(Rt["a"])([rr()],hr.prototype,"isSchematic",void 0),Object(Rt["a"])([rr()],hr.prototype,"vertexColors",void 0),Object(Rt["a"])([rr()],hr.prototype,"offsetBackfaces",void 0),Object(Rt["a"])([rr()],hr.prototype,"symbolColors",void 0),Object(Rt["a"])([rr()],hr.prototype,"vvSize",void 0),Object(Rt["a"])([rr()],hr.prototype,"vvColor",void 0),Object(Rt["a"])([rr()],hr.prototype,"verticalOffset",void 0),Object(Rt["a"])([rr()],hr.prototype,"receiveShadows",void 0),Object(Rt["a"])([rr()],hr.prototype,"slicePlaneEnabled",void 0),Object(Rt["a"])([rr()],hr.prototype,"sliceHighlightDisabled",void 0),Object(Rt["a"])([rr()],hr.prototype,"receiveAmbientOcclusion",void 0),Object(Rt["a"])([rr()],hr.prototype,"screenSizePerspective",void 0),Object(Rt["a"])([rr()],hr.prototype,"textureAlphaPremultiplied",void 0),Object(Rt["a"])([rr()],hr.prototype,"hasColorTexture",void 0),Object(Rt["a"])([rr()],hr.prototype,"usePBR",void 0),Object(Rt["a"])([rr()],hr.prototype,"hasMetalnessAndRoughnessTexture",void 0),Object(Rt["a"])([rr()],hr.prototype,"hasEmissionTexture",void 0),Object(Rt["a"])([rr()],hr.prototype,"hasOcclusionTexture",void 0),Object(Rt["a"])([rr()],hr.prototype,"hasNormalTexture",void 0),Object(Rt["a"])([rr()],hr.prototype,"instanced",void 0),Object(Rt["a"])([rr()],hr.prototype,"instancedColor",void 0),Object(Rt["a"])([rr()],hr.prototype,"instancedDoublePrecision",void 0),Object(Rt["a"])([rr()],hr.prototype,"vertexTangents",void 0),Object(Rt["a"])([rr()],hr.prototype,"normalsTypeDerivate",void 0),Object(Rt["a"])([rr()],hr.prototype,"writeDepth",void 0),Object(Rt["a"])([rr()],hr.prototype,"sceneHasOcludees",void 0),Object(Rt["a"])([rr()],hr.prototype,"transparent",void 0),Object(Rt["a"])([rr()],hr.prototype,"enableOffset",void 0),Object(Rt["a"])([rr({count:3})],hr.prototype,"cullFace",void 0),Object(Rt["a"])([rr({count:4})],hr.prototype,"transparencyPassType",void 0),Object(Rt["a"])([rr()],hr.prototype,"multipassTerrainEnabled",void 0),Object(Rt["a"])([rr()],hr.prototype,"cullAboveGround",void 0);var pr=r("b0ab");class mr extends dr{initializeProgram(e){const t=mr.shader.get(),r=this.configuration,i=t.build({OITEnabled:0===r.transparencyPassType,output:r.output,viewingMode:e.viewingMode,receiveShadows:r.receiveShadows,slicePlaneEnabled:r.slicePlaneEnabled,sliceHighlightDisabled:r.sliceHighlightDisabled,sliceEnabledForVertexPrograms:!1,symbolColor:r.symbolColors,vvSize:r.vvSize,vvColor:r.vvColor,vvInstancingEnabled:!0,instanced:r.instanced,instancedColor:r.instancedColor,instancedDoublePrecision:r.instancedDoublePrecision,pbrMode:r.usePBR?1:0,hasMetalnessAndRoughnessTexture:!1,hasEmissionTexture:!1,hasOcclusionTexture:!1,hasNormalTexture:!1,hasColorTexture:r.hasColorTexture,receiveAmbientOcclusion:r.receiveAmbientOcclusion,useCustomDTRExponentForWater:!1,normalType:0,doubleSidedMode:2,vertexTangents:!1,attributeTextureCoordinates:r.hasColorTexture?1:0,textureAlphaPremultiplied:r.textureAlphaPremultiplied,attributeColor:r.vertexColors,screenSizePerspectiveEnabled:r.screenSizePerspective,verticalOffsetEnabled:r.verticalOffset,offsetBackfaces:r.offsetBackfaces,doublePrecisionRequiresObfuscation:Object($t["b"])(e.rctx),alphaDiscardMode:r.alphaDiscardMode,supportsTextureAtlas:!1,multipassTerrainEnabled:r.multipassTerrainEnabled,cullAboveGround:r.cullAboveGround});return new or(e.rctx,i,Se)}}mr.shader=new Qt(pr["a"],()=>r.e("chunk-2d0ab897").then(r.bind(null,"1662")));class vr extends Re{constructor(e){super(e,gr),this.supportsEdges=!0,this.techniqueConfig=new hr,this.vertexBufferLayout=yr(this.parameters),this.instanceBufferLayout=e.instanced?Tr(this.parameters):null}isVisibleInPass(e){return 4!==e&&6!==e&&7!==e||this.parameters.castShadows}isVisible(){const e=this.parameters;if(!super.isVisible()||0===e.layerOpacity)return!1;const t=e.instanced,r=e.vertexColors,i=e.symbolColors,n=!!t&&t.indexOf("color")>-1,o=e.vvColorEnabled,a="replace"===e.colorMixMode,s=e.opacity>0,c=e.externalColor&&e.externalColor[3]>0;return r&&(n||o||i)?!!a||s:r?a?c:s:n||o||i?!!a||s:a?c:s}getTechniqueConfig(e,t){return this.techniqueConfig.output=e,this.techniqueConfig.hasNormalTexture=!!this.parameters.normalTextureId,this.techniqueConfig.hasColorTexture=!!this.parameters.textureId,this.techniqueConfig.vertexTangents=this.parameters.vertexTangents,this.techniqueConfig.instanced=!!this.parameters.instanced,this.techniqueConfig.instancedDoublePrecision=this.parameters.instancedDoublePrecision,this.techniqueConfig.vvSize=this.parameters.vvSizeEnabled,this.techniqueConfig.verticalOffset=null!==this.parameters.verticalOffset,this.techniqueConfig.screenSizePerspective=null!==this.parameters.screenSizePerspective,this.techniqueConfig.slicePlaneEnabled=this.parameters.slicePlaneEnabled,this.techniqueConfig.sliceHighlightDisabled=this.parameters.sliceHighlightDisabled,this.techniqueConfig.alphaDiscardMode=this.parameters.textureAlphaMode,this.techniqueConfig.normalsTypeDerivate="screenDerivative"===this.parameters.normals,this.techniqueConfig.transparent=this.parameters.transparent,this.techniqueConfig.writeDepth=this.parameters.writeDepth,this.techniqueConfig.sceneHasOcludees=this.parameters.sceneHasOcludees,this.techniqueConfig.cullFace=this.parameters.slicePlaneEnabled?0:this.parameters.cullFace,this.techniqueConfig.multipassTerrainEnabled=t.multipassTerrainEnabled,this.techniqueConfig.cullAboveGround=t.cullAboveGround,0!==e&&7!==e||(this.techniqueConfig.vertexColors=this.parameters.vertexColors,this.techniqueConfig.symbolColors=this.parameters.symbolColors,this.parameters.treeRendering?this.techniqueConfig.doubleSidedMode=2:this.techniqueConfig.doubleSidedMode=this.parameters.doubleSided&&"normal"===this.parameters.doubleSidedType?1:this.parameters.doubleSided&&"winding-order"===this.parameters.doubleSidedType?2:0,this.techniqueConfig.instancedColor=!!this.parameters.instanced&&this.parameters.instanced.indexOf("color")>-1,this.techniqueConfig.receiveShadows=this.parameters.receiveShadows&&this.parameters.shadowMappingEnabled,this.techniqueConfig.receiveAmbientOcclusion=!!t.ssaoEnabled&&this.parameters.receiveSSAO,this.techniqueConfig.vvColor=this.parameters.vvColorEnabled,this.techniqueConfig.textureAlphaPremultiplied=!!this.parameters.textureAlphaPremultiplied,this.techniqueConfig.usePBR=this.parameters.usePBR,this.techniqueConfig.hasMetalnessAndRoughnessTexture=!!this.parameters.metallicRoughnessTextureId,this.techniqueConfig.hasEmissionTexture=!!this.parameters.emissiveTextureId,this.techniqueConfig.hasOcclusionTexture=!!this.parameters.occlusionTextureId,this.techniqueConfig.offsetBackfaces=!(!this.parameters.transparent||!this.parameters.offsetTransparentBackfaces),this.techniqueConfig.isSchematic=this.parameters.usePBR&&this.parameters.isSchematic,this.techniqueConfig.transparencyPassType=t.transparencyPassType,this.techniqueConfig.enableOffset=t.camera.relativeElevation<Ve["c"]),this.techniqueConfig}intersect(e,t,r,i,n,o,a){if(null!==this.parameters.verticalOffset){const e=i.camera;Object(l["s"])(Cr,r[12],r[13],r[14]);let t=null;switch(i.viewingMode){case 1:t=Object(l["o"])(wr,Cr);break;case 2:t=Object(l["h"])(wr,Sr)}let a=0;if(null!==this.parameters.verticalOffset){const r=Object(l["g"])(Ar,Cr,e.eye),i=Object(l["m"])(r),n=Object(l["b"])(r,r,1/i);let o=null;this.parameters.screenSizePerspective&&(o=Object(l["e"])(t,n)),a+=Object(De["f"])(e,i,this.parameters.verticalOffset,o,this.parameters.screenSizePerspective)}Object(l["b"])(t,t,a),Object(l["t"])(Mr,t,i.transform.inverseRotation),n=Object(l["g"])(_r,n,Mr),o=Object(l["g"])(Or,o,Mr)}Object(De["d"])(e,t,i,n,o,At(i.verticalOffset),a)}requiresSlot(e){return e===(this.parameters.transparent?this.parameters.writeDepth?4:7:2)||20===e}createGLMaterial(e){return 0===e.output||7===e.output||1===e.output||2===e.output||3===e.output||4===e.output?new br(e):null}createBufferWriter(){return new xr(this.vertexBufferLayout,this.instanceBufferLayout)}}class br extends ze{constructor(e){super({...e,...e.material.parameters})}updateParameters(e){const t=this._material.parameters;return this.updateTexture(t.textureId),this.ensureTechnique(t.treeRendering?mr:dr,e)}_updateShadowState(e){e.shadowMappingEnabled!==this._material.parameters.shadowMappingEnabled&&this._material.setParameters({shadowMappingEnabled:e.shadowMappingEnabled})}_updateOccludeeState(e){e.hasOccludees!==this._material.parameters.sceneHasOcludees&&this._material.setParameters({sceneHasOcludees:e.hasOccludees})}beginSlot(e){return 0!==this._output&&7!==this._output||(this._updateShadowState(e),this._updateOccludeeState(e)),this.updateParameters(e)}bind(e,t){t.bindPass(this._material.parameters,e),this.bindTextures(t.program)}}const gr={textureId:void 0,initTextureTransparent:!1,isSchematic:!1,usePBR:!1,normalTextureId:void 0,vertexTangents:!1,occlusionTextureId:void 0,emissiveTextureId:void 0,metallicRoughnessTextureId:void 0,emissiveFactor:[0,0,0],mrrFactors:[0,1,.5],ambient:[.2,.2,.2],diffuse:[.8,.8,.8],externalColor:[1,1,1,1],colorMixMode:"multiply",opacity:1,layerOpacity:1,vertexColors:!1,symbolColors:!1,doubleSided:!1,doubleSidedType:"normal",cullFace:2,instanced:void 0,instancedDoublePrecision:!1,normals:"default",receiveSSAO:!0,receiveShadows:!0,castShadows:!0,shadowMappingEnabled:!1,verticalOffset:null,screenSizePerspective:null,slicePlaneEnabled:!1,sliceHighlightDisabled:!1,offsetTransparentBackfaces:!1,vvSizeEnabled:!1,vvSizeMinSize:[1,1,1],vvSizeMaxSize:[100,100,100],vvSizeOffset:[0,0,0],vvSizeFactor:[1,1,1],vvSizeValue:[1,1,1],vvColorEnabled:!1,vvColorValues:[0,0,0,0,0,0,0,0],vvColorColors:[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],vvSymbolAnchor:[0,0,0],vvSymbolRotationMatrix:Object(a["b"])(),transparent:!1,writeDepth:!0,textureAlphaMode:0,textureAlphaCutoff:Ie["b"],textureAlphaPremultiplied:!1,sceneHasOcludees:!1,...Ne};class xr{constructor(e,t){this.vertexBufferLayout=e,this.instanceBufferLayout=t}allocate(e){return this.vertexBufferLayout.createBuffer(e)}elementCount(e){return e.indices.get("position").length}write(e,t,r,i){Dt(t,this.vertexBufferLayout,e.transformation,e.invTranspTransformation,r,i)}}function yr(e){const t=e.textureId||e.normalTextureId||e.metallicRoughnessTextureId||e.emissiveTextureId||e.occlusionTextureId,r=Object(Fe["a"])().vec3f("position").vec3f("normal");return e.vertexTangents&&r.vec4f("tangent"),t&&r.vec2f("uv0"),e.vertexColors&&r.vec4u8("color"),e.symbolColors&&r.vec4u8("symbolColor"),r}function Tr(e){let t=Object(Fe["a"])();return t=e.instancedDoublePrecision?t.vec3f("modelOriginHi").vec3f("modelOriginLo").mat3f("model").mat3f("modelNormal"):t.mat4f("model").mat4f("modelNormal"),e.instanced&&e.instanced.indexOf("color")>-1&&(t=t.vec4f("instanceColor")),e.instanced&&e.instanced.indexOf("featureAttribute")>-1&&(t=t.vec4f("instanceFeatureAttribute")),t}const _r=Object(u["e"])(),Or=Object(u["e"])(),Sr=Object(u["g"])(0,0,1),wr=Object(u["e"])(),Mr=Object(u["e"])(),Cr=Object(u["e"])(),Ar=Object(u["e"])(),Er=_["a"].getLogger("esri.views.3d.layers.graphics.objectResourceUtils");async function Pr(e,t){const r=await jr(e,t);return{resource:r,textures:await Dr(r.textureDefinitions,t)}}async function jr(e,t){const r=Object(n["k"])(t)&&t.streamDataRequester;if(r)return Br(e,r,t);const i=await Object(y["c"])(Object(x["default"])(e,Object(n["r"])(t)));if(!0===i.ok)return i.value.data;Object(O["t"])(i.error),Fr(i.error)}async function Br(e,t,r){const i=await Object(y["c"])(t.request(e,"json",r));if(!0===i.ok)return i.value;Object(O["t"])(i.error),Fr(i.error.details.url)}function Fr(e){throw new T["a"]("","Request for object resource failed: "+e)}function Ir(e){const t=e.params,r=t.topology;let i=!0;switch(t.vertexAttributes||(Er.warn("Geometry must specify vertex attributes"),i=!1),t.topology){case"PerAttributeArray":break;case"Indexed":case null:case void 0:{const e=t.faces;if(e){if(t.vertexAttributes)for(const r in t.vertexAttributes){const t=e[r];t&&t.values?(null!=t.valueType&&"UInt32"!==t.valueType&&(Er.warn(`Unsupported indexed geometry indices type '${t.valueType}', only UInt32 is currently supported`),i=!1),null!=t.valuesPerElement&&1!==t.valuesPerElement&&(Er.warn(`Unsupported indexed geometry values per element '${t.valuesPerElement}', only 1 is currently supported`),i=!1)):(Er.warn(`Indexed geometry does not specify face indices for '${r}' attribute`),i=!1)}}else Er.warn("Indexed geometries must specify faces"),i=!1;break}default:Er.warn(`Unsupported topology '${r}'`),i=!1}e.params.material||(Er.warn("Geometry requires material"),i=!1);const n=e.params.vertexAttributes;for(const o in n)n[o].values||(Er.warn("Geometries with externally defined attributes are not yet supported"),i=!1);return i}function Lr(e,t){const r=[],i=[],o=[],a=[],s=e.resource,c=S["a"].parse(s.version||"1.0","wosr");Vr.validate(c);const l=s.model.name,d=s.model.geometries,f=s.materialDefinitions,h=e.textures;let p=0;const m=new Map;for(let v=0;v<d.length;v++){const e=d[v];if(!Ir(e))continue;const s=Nr(e),c=e.params.vertexAttributes,l=[];for(const t in c){const e=c[t],r=e.values;l.push([t,{data:r,size:e.valuesPerElement,exclusive:!0}])}const b=[];if("PerAttributeArray"!==e.params.topology){const t=e.params.faces;for(const e in t)b.push([e,new Uint32Array(t[e].values)])}const g=h&&h[s.texture];if(g&&!m.has(s.texture)){const{image:e,params:t}=g,r=new Be(e,t);a.push(r),m.set(s.texture,r)}const x=m.get(s.texture),y=x?x.id:void 0;let T=o[s.material]?o[s.material][s.texture]:null;if(!T){const e=f[s.material.substring(s.material.lastIndexOf("/")+1)].params;1===e.transparency&&(e.transparency=0);const r=g&&g.alphaChannelUsage,i=e.transparency>0||"transparency"===r||"maskAndTransparency"===r,a=g?Rr(g.alphaChannelUsage):void 0,c={ambient:Object(u["f"])(e.diffuse),diffuse:Object(u["f"])(e.diffuse),opacity:1-(e.transparency||0),transparent:i,textureAlphaMode:a,textureAlphaCutoff:.33,textureId:y,initTextureTransparent:!0,doubleSided:!0,cullFace:0,colorMixMode:e.externalColorMixMode||"tint",textureAlphaPremultiplied:!!g&&!!g.params.preMultiplyAlpha};Object(n["k"])(t)&&t.materialParamsMixin&&Object.assign(c,t.materialParamsMixin),T=new vr(c),o[s.material]||(o[s.material]={}),o[s.material][s.texture]=T}i.push(T);const _=new F(l,b);p+=b.position?b.position.length:0,r.push(_)}return{name:l,stageResources:{textures:a,materials:i,geometries:r},pivotOffset:s.model.pivotOffset,boundingBox:zr(r),numberOfVertices:p,lodThreshold:null}}function zr(e){const t=Object(d["c"])();return e.forEach(e=>{const r=e.boundingInfo;Object(n["k"])(r)&&(Object(d["g"])(t,r.getBBMin()),Object(d["g"])(t,r.getBBMax()))}),t}async function Dr(e,t){const r=[];for(const a in e){const i=e[a],o=i.images[0].data;if(!o){Er.warn("Externally referenced texture data is not yet supported");continue}const s=i.encoding+";base64,"+o,c="/textureDefinitions/"+a,l="rgba"===i.channels?i.alphaChannelUsage||"transparency":"none",u={noUnpackFlip:!0,wrap:{s:10497,t:10497},preMultiplyAlpha:1!==Rr(l)},d=Object(n["k"])(t)&&t.disableTextures?Promise.resolve(null):Object(w["a"])(s,t);r.push(d.then(e=>({refId:c,image:e,params:u,alphaChannelUsage:l})))}const i=await Promise.all(r),o={};for(const n of i)o[n.refId]=n;return o}function Rr(e){switch(e){case"mask":return 2;case"maskAndTransparency":return 3;case"none":return 1;default:return 0}}function Nr(e){const t=e.params;return{id:1,material:t.material,texture:t.texture,region:t.texture}}const Vr=new S["a"](1,2,"wosr");var kr=r("0613"),Hr=r("dc56"),Ur=r("1c20"),Wr=r("4c96");async function Gr(e,t){const r=qr(Object(i["a"])(e));if("wosr"===r.fileType){const e=await(t.cache?t.cache.loadWOSR(r.url,t):Pr(r.url,t)),i=Lr(e,t);return{lods:[i],referenceBoundingBox:i.boundingBox,isEsriSymbolResource:!1,isWosr:!0,remove:e.remove}}const o=await(t.cache?t.cache.loadGLTF(r.url,t,t.usePBR):Object(b["a"])(new v["a"](t.streamDataRequester),r.url,t,t.usePBR)),a=Object(n["i"])(o.model.meta,"ESRI_proxyEllipsoid");o.meta.isEsriSymbolResource&&Object(n["k"])(a)&&-1!==o.meta.uri.indexOf("/RealisticTrees/")&&Kr(o,a);const s=o.meta.isEsriSymbolResource?{usePBR:t.usePBR,isSchematic:!1,treeRendering:o.customMeta.esriTreeRendering,mrrFactors:[0,1,.2]}:{usePBR:t.usePBR,isSchematic:!1,mrrFactors:[0,1,.5]},c={...t.materialParamsMixin,treeRendering:o.customMeta.esriTreeRendering};if(null!=r.specifiedLodIndex){const e=$r(o,s,c,r.specifiedLodIndex);let t=e[0].boundingBox;return 0!==r.specifiedLodIndex&&(t=$r(o,s,c,0)[0].boundingBox),{lods:e,referenceBoundingBox:t,isEsriSymbolResource:o.meta.isEsriSymbolResource,isWosr:!1,remove:o.remove}}const l=$r(o,s,c);return{lods:l,referenceBoundingBox:l[0].boundingBox,isEsriSymbolResource:o.meta.isEsriSymbolResource,isWosr:!1,remove:o.remove}}function qr(e){const t=e.match(/(.*\.(gltf|glb))(\?lod=([0-9]+))?$/);return t?{fileType:"gltf",url:t[1],specifiedLodIndex:null!=t[4]?Number(t[4]):null}:e.match(/(.*\.(json|json\.gz))$/)?{fileType:"wosr",url:e,specifiedLodIndex:null}:{fileType:"unknown",url:e,specifiedLodIndex:null}}function $r(e,t,r,i){const s=e.model,c=Object(a["b"])(),l=new Array,u=new Map,v=new Map;return s.lods.forEach((e,a)=>{if(void 0!==i&&a!==i)return;const b={name:e.name,stageResources:{textures:new Array,materials:new Array,geometries:new Array},lodThreshold:Object(n["k"])(e.lodThreshold)?e.lodThreshold:null,pivotOffset:[0,0,0],numberOfVertices:0,boundingBox:Object(d["c"])()};l.push(b),e.parts.forEach(e=>{const i=e.material+(e.attributes.normal?"_normal":"")+(e.attributes.color?"_color":"")+(e.attributes.texCoord0?"_texCoord0":"")+(e.attributes.tangent?"_tangent":""),a=s.materials.get(e.material),l=Object(n["k"])(e.attributes.texCoord0),g=Object(n["k"])(e.attributes.normal),x=Xr(a.alphaMode);if(!u.has(i)){if(l){if(Object(n["k"])(a.textureColor)&&!v.has(a.textureColor)){const e=s.textures.get(a.textureColor),t={...e.parameters,preMultiplyAlpha:1!==x};v.set(a.textureColor,new Be(e.data,t))}if(Object(n["k"])(a.textureNormal)&&!v.has(a.textureNormal)){const e=s.textures.get(a.textureNormal);v.set(a.textureNormal,new Be(e.data,e.parameters))}if(Object(n["k"])(a.textureOcclusion)&&!v.has(a.textureOcclusion)){const e=s.textures.get(a.textureOcclusion);v.set(a.textureOcclusion,new Be(e.data,e.parameters))}if(Object(n["k"])(a.textureEmissive)&&!v.has(a.textureEmissive)){const e=s.textures.get(a.textureEmissive);v.set(a.textureEmissive,new Be(e.data,e.parameters))}if(Object(n["k"])(a.textureMetallicRoughness)&&!v.has(a.textureMetallicRoughness)){const e=s.textures.get(a.textureMetallicRoughness);v.set(a.textureMetallicRoughness,new Be(e.data,e.parameters))}}const o=a.color[0]**(1/kr["a"]),c=a.color[1]**(1/kr["a"]),d=a.color[2]**(1/kr["a"]),f=a.emissiveFactor[0]**(1/kr["a"]),h=a.emissiveFactor[1]**(1/kr["a"]),p=a.emissiveFactor[2]**(1/kr["a"]),m=Object(n["k"])(a.textureColor)&&l?v.get(a.textureColor):null;u.set(i,new vr({...t,transparent:0===x,textureAlphaMode:x,textureAlphaCutoff:a.alphaCutoff,diffuse:[o,c,d],ambient:[o,c,d],opacity:a.opacity,doubleSided:a.doubleSided,doubleSidedType:"winding-order",cullFace:a.doubleSided?0:2,vertexColors:!!e.attributes.color,vertexTangents:!!e.attributes.tangent,normals:g?"default":"screenDerivative",castShadows:!0,receiveSSAO:!0,textureId:Object(n["k"])(m)?m.id:void 0,colorMixMode:a.colorMixMode,normalTextureId:Object(n["k"])(a.textureNormal)&&l?v.get(a.textureNormal).id:void 0,textureAlphaPremultiplied:Object(n["k"])(m)&&!!m.params.preMultiplyAlpha,occlusionTextureId:Object(n["k"])(a.textureOcclusion)&&l?v.get(a.textureOcclusion).id:void 0,emissiveTextureId:Object(n["k"])(a.textureEmissive)&&l?v.get(a.textureEmissive).id:void 0,metallicRoughnessTextureId:Object(n["k"])(a.textureMetallicRoughness)&&l?v.get(a.textureMetallicRoughness).id:void 0,emissiveFactor:[f,h,p],mrrFactors:[a.metallicFactor,a.roughnessFactor,t.mrrFactors[2]],isSchematic:!1,...r}))}const y=Yr(e.indices||e.attributes.position.count,e.primitiveType),T=e.attributes.position.count,_=Object(m["a"])(f["u"],T);Object(h["e"])(_,e.attributes.position,e.transform);const O=[["position",{data:_.typedBuffer,size:_.elementCount,exclusive:!0}]],S=[["position",y]];if(Object(n["k"])(e.attributes.normal)){const t=Object(m["a"])(f["u"],T);Object(o["a"])(c,e.transform),Object(h["a"])(t,e.attributes.normal,c),O.push(["normal",{data:t.typedBuffer,size:t.elementCount,exclusive:!0}]),S.push(["normal",y])}if(Object(n["k"])(e.attributes.tangent)){const t=Object(m["a"])(f["C"],T);Object(o["a"])(c,e.transform),Object(p["c"])(t,e.attributes.tangent,c),O.push(["tangent",{data:t.typedBuffer,size:t.elementCount,exclusive:!0}]),S.push(["tangent",y])}if(Object(n["k"])(e.attributes.texCoord0)){const t=Object(m["a"])(f["m"],T);Object(Hr["b"])(t,e.attributes.texCoord0),O.push(["uv0",{data:t.typedBuffer,size:t.elementCount,exclusive:!0}]),S.push(["uv0",y])}if(Object(n["k"])(e.attributes.color)){const t=Object(m["a"])(f["J"],T);if(4===e.attributes.color.elementCount)e.attributes.color instanceof f["C"]?Object(p["b"])(t,e.attributes.color,255):e.attributes.color instanceof f["J"]?Object(Ur["a"])(t,e.attributes.color):e.attributes.color instanceof f["H"]&&Object(p["b"])(t,e.attributes.color,1/256);else{Object(Ur["b"])(t,255,255,255,255);const r=new f["B"](t.buffer,0,4);e.attributes.color instanceof f["u"]?Object(h["d"])(r,e.attributes.color,255):e.attributes.color instanceof f["B"]?Object(Wr["a"])(r,e.attributes.color):e.attributes.color instanceof f["z"]&&Object(h["d"])(r,e.attributes.color,1/256)}O.push(["color",{data:t.typedBuffer,size:t.elementCount,exclusive:!0}]),S.push(["color",y])}const w=new F(O,S);b.stageResources.geometries.push(w),b.stageResources.materials.push(u.get(i)),l&&(Object(n["k"])(a.textureColor)&&b.stageResources.textures.push(v.get(a.textureColor)),Object(n["k"])(a.textureNormal)&&b.stageResources.textures.push(v.get(a.textureNormal)),Object(n["k"])(a.textureOcclusion)&&b.stageResources.textures.push(v.get(a.textureOcclusion)),Object(n["k"])(a.textureEmissive)&&b.stageResources.textures.push(v.get(a.textureEmissive)),Object(n["k"])(a.textureMetallicRoughness)&&b.stageResources.textures.push(v.get(a.textureMetallicRoughness))),b.numberOfVertices+=T;const M=w.boundingInfo;Object(n["k"])(M)&&(Object(d["g"])(b.boundingBox,M.getBBMin()),Object(d["g"])(b.boundingBox,M.getBBMax()))})}),l}function Xr(e){switch(e){case"BLEND":return 0;case"MASK":return 2;case"OPAQUE":case null:case void 0:return 1}}function Yr(e,t){switch(t){case 4:return Object(g["c"])(e);case 5:return Object(g["b"])(e);case 6:return Object(g["a"])(e)}}function Kr(e,t){for(let r=0;r<e.model.lods.length;++r){const i=e.model.lods[r];e.customMeta.esriTreeRendering=!0;for(const o of i.parts){const i=o.attributes.normal;if(Object(n["j"])(i))return;const a=o.attributes.position,d=a.count,h=Object(u["e"])(),p=Object(u["e"])(),v=Object(u["e"])(),b=Object(m["a"])(f["J"],d),g=Object(m["a"])(f["u"],d),x=Object(s["b"])(Object(c["d"])(),o.transform);for(let n=0;n<d;n++){a.getVec(n,p),i.getVec(n,h),Object(l["n"])(p,p,o.transform),Object(l["g"])(v,p,t.center),Object(l["a"])(v,v,t.radius);const s=v[2],c=Object(l["m"])(v),u=Math.min(.45+.55*c*c,1);Object(l["a"])(v,v,t.radius),Object(l["n"])(v,v,x),Object(l["o"])(v,v),r+1!==e.model.lods.length&&e.model.lods.length>1&&Object(l["f"])(v,v,h,s>-1?.2:Math.min(-4*s-3.8,1)),g.setVec(n,v),b.set(n,0,255*u),b.set(n,1,255*u),b.set(n,2,255*u),b.set(n,3,255)}o.attributes.normal=g,o.attributes.color=b}}}},"9cc4":function(e,t,r){"use strict";function i(e,t,r){for(let i=0;i<r;++i)t[2*i]=e[i],t[2*i+1]=e[i]-t[2*i]}function n(e,t,r,n){for(let s=0;s<n;++s)o[0]=e[s],i(o,a,1),t[s]=a[0],r[s]=a[1]}r.d(t,"a",(function(){return i})),r.d(t,"b",(function(){return n}));const o=new Float64Array(1),a=new Float32Array(2)},a1ff:function(e,t,r){"use strict";r.d(t,"a",(function(){return l}));var i=r("38a4"),n=r("b2b2"),o=r("1956"),a=r("d17d"),s=r("c514");const c=4;class l{constructor(e,t,r=null){this._context=e,this.type="texture",this._glName=null,this._descriptor=void 0,this._samplingModeDirty=!1,this._wrapModeDirty=!1,e.instanceCounter.increment(a["c"].Texture,this),this._descriptor={target:3553,samplingMode:9729,wrapMode:10497,flipped:!1,hasMipmap:!1,isOpaque:!1,unpackAlignment:4,preMultiplyAlpha:!1,...t},34067===this._descriptor.target?this.setDataCubeMap(r):this.setData(r)}get glName(){return this._glName}get descriptor(){return this._descriptor}get isDirty(){return this._samplingModeDirty||this._wrapModeDirty}dispose(){this._context.gl&&this._glName&&(this._context.unbindTextureAllUnits(this),this._context.gl.deleteTexture(this._glName),this._glName=null,this._context.instanceCounter.decrement(a["c"].Texture,this))}release(){this.dispose()}resize(e,t){const r=this._descriptor;r.width===e&&r.height===t||(r.width=e,r.height=t,34067===this._descriptor.target?this.setDataCubeMap(null):this.setData(null))}setDataCubeMap(e=null){for(let t=34069;t<=34074;t++)this.setData(e,t)}setData(e,t=3553){if(!this._context||!this._context.gl)return;const r=this._context.gl;this._glName||(this._glName=r.createTexture()),void 0===e&&(e=null),null===e&&(this._descriptor.width=this._descriptor.width||c,this._descriptor.height=this._descriptor.height||c);const i=this._context.bindTexture(this,l.TEXTURE_UNIT_FOR_UPDATES),a=this._descriptor;l._validateTexture(this._context,a),r.pixelStorei(r.UNPACK_ALIGNMENT,a.unpackAlignment),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,a.flipped?1:0),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,a.preMultiplyAlpha?1:0);const s=a.pixelFormat;let d=a.internalFormat?a.internalFormat:this._deriveInternalFormat(s,a.dataType);if(e instanceof ImageData||e instanceof HTMLImageElement||e instanceof HTMLCanvasElement||e instanceof HTMLVideoElement){let i=e.width,n=e.height;e instanceof HTMLVideoElement&&(i=e.videoWidth,n=e.videoHeight),a.width&&a.height,r.texImage2D(t,0,d,s,a.dataType,e),Object(o["a"])(r),a.hasMipmap&&this.generateMipmap(),void 0===a.width&&(a.width=i),void 0===a.height&&(a.height=n)}else{null!=a.width&&null!=a.height||console.error("Width and height must be specified!"),r.DEPTH24_STENCIL8&&d===r.DEPTH_STENCIL&&(d=r.DEPTH24_STENCIL8);let i=a.width,c=a.height;if(u(e)){const n=Math.round(Math.log(Math.max(i,c))/Math.LN2)+1;a.hasMipmap=a.hasMipmap&&n===e.levels.length;for(let o=0;;++o){const n=e.levels[Math.min(o,e.levels.length-1)];if(r.compressedTexImage2D(t,o,d,i,c,0,n),1===i&&1===c||!a.hasMipmap)break;i=Math.max(1,i>>1),c=Math.max(1,c>>1)}}else if(Object(n["k"])(e))r.texImage2D(t,0,d,i,c,0,s,a.dataType,e),Object(o["a"])(r),a.hasMipmap&&this.generateMipmap();else for(let e=0;r.texImage2D(t,e,d,i,c,0,s,a.dataType,null),Object(o["a"])(r),(1!==i||1!==c)&&a.hasMipmap;++e)i=Math.max(1,i>>1),c=Math.max(1,c>>1)}l._applySamplingMode(r,this._descriptor),l._applyWrapMode(r,this._descriptor),l._applyAnisotropicFilteringParameters(this._context,this._descriptor),Object(o["a"])(r),this._context.bindTexture(i,l.TEXTURE_UNIT_FOR_UPDATES)}updateData(e,t,r,i,n,o,a=3553){o||console.error("An attempt to use uninitialized data!"),this._glName||console.error("An attempt to update uninitialized texture!");const s=this._context.gl,c=this._descriptor,u=this._context.bindTexture(this,l.TEXTURE_UNIT_FOR_UPDATES);(t<0||r<0||i>c.width||n>c.height||t+i>c.width||r+n>c.height)&&console.error("An attempt to update out of bounds of the texture!"),s.pixelStorei(s.UNPACK_ALIGNMENT,c.unpackAlignment),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,c.flipped?1:0),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,c.preMultiplyAlpha?1:0),o instanceof ImageData||o instanceof HTMLImageElement||o instanceof HTMLCanvasElement||o instanceof HTMLVideoElement?s.texSubImage2D(a,e,t,r,c.pixelFormat,c.dataType,o):s.texSubImage2D(a,e,t,r,i,n,c.pixelFormat,c.dataType,o),this._context.bindTexture(u,l.TEXTURE_UNIT_FOR_UPDATES)}generateMipmap(){const e=this._descriptor;e.hasMipmap||(e.hasMipmap=!0,this._samplingModeDirty=!0,l._validateTexture(this._context,e)),9729===e.samplingMode?(this._samplingModeDirty=!0,e.samplingMode=9985):9728===e.samplingMode&&(this._samplingModeDirty=!0,e.samplingMode=9984);const t=this._context.bindTexture(this,l.TEXTURE_UNIT_FOR_UPDATES);this._context.gl.generateMipmap(e.target),this._context.bindTexture(t,l.TEXTURE_UNIT_FOR_UPDATES)}setSamplingMode(e){e!==this._descriptor.samplingMode&&(this._descriptor.samplingMode=e,this._samplingModeDirty=!0)}setWrapMode(e){e!==this._descriptor.wrapMode&&(this._descriptor.wrapMode=e,l._validateTexture(this._context,this._descriptor),this._wrapModeDirty=!0)}applyChanges(){const e=this._context.gl,t=this._descriptor;this._samplingModeDirty&&(l._applySamplingMode(e,t),this._samplingModeDirty=!1),this._wrapModeDirty&&(l._applyWrapMode(e,t),this._wrapModeDirty=!1)}_deriveInternalFormat(e,t){if("webgl"===this._context.webglVersion)return e;if(5126===t)switch(e){case 6408:return 34836;case 6407:return 34837;default:throw new Error("Unable to derive format")}return e}static _validateTexture(e,t){(t.width<0||t.height<0)&&console.error("Negative dimension parameters are not allowed!");const r=Object(i["j"])(t.width)&&Object(i["j"])(t.height);Object(s["a"])(e.gl)||r||("number"==typeof t.wrapMode?33071!==t.wrapMode&&console.error("Non-power-of-two textures must have a wrap mode of CLAMP_TO_EDGE!"):33071===t.wrapMode.s&&33071===t.wrapMode.t||console.error("Non-power-of-two textures must have a wrap mode of CLAMP_TO_EDGE!"),t.hasMipmap&&console.error("Mipmapping requires power-of-two textures!"))}static _applySamplingMode(e,t){let r=t.samplingMode,i=t.samplingMode;9985===r||9987===r?(r=9729,t.hasMipmap||(i=9729)):9984!==r&&9986!==r||(r=9728,t.hasMipmap||(i=9728)),e.texParameteri(t.target,e.TEXTURE_MAG_FILTER,r),e.texParameteri(t.target,e.TEXTURE_MIN_FILTER,i)}static _applyWrapMode(e,t){"number"==typeof t.wrapMode?(e.texParameteri(t.target,e.TEXTURE_WRAP_S,t.wrapMode),e.texParameteri(t.target,e.TEXTURE_WRAP_T,t.wrapMode)):(e.texParameteri(t.target,e.TEXTURE_WRAP_S,t.wrapMode.s),e.texParameteri(t.target,e.TEXTURE_WRAP_T,t.wrapMode.t))}static _applyAnisotropicFilteringParameters(e,t){var r;const i=e.capabilities.textureFilterAnisotropic;i&&e.gl.texParameterf(t.target,i.TEXTURE_MAX_ANISOTROPY,null!=(r=t.maxAnisotropy)?r:1)}}function u(e){return Object(n["k"])(e)&&"type"in e&&"compressed"===e.type}l.TEXTURE_UNIT_FOR_UPDATES=0},a7d7:function(e,t,r){"use strict";r.d(t,"a",(function(){return a})),r.d(t,"b",(function(){return s}));var i=r("47f8"),n=r("7cb4"),o=r("3886");Object(i["b"])(0,.6,.2);function a(e,t){const r=e.fragment,i=t.hasMetalnessAndRoughnessTexture||t.hasEmissionTexture||t.hasOcclusionTexture;1===t.pbrMode&&i&&e.include(n["a"],t),2!==t.pbrMode?(0===t.pbrMode&&r.code.add(o["a"]`float getBakedOcclusion() { return 1.0; }`),1===t.pbrMode&&(r.uniforms.add("emissionFactor","vec3"),r.uniforms.add("mrrFactors","vec3"),r.code.add(o["a"]`vec3 mrr;
vec3 emission;
float occlusion;`),t.hasMetalnessAndRoughnessTexture&&(r.uniforms.add("texMetallicRoughness","sampler2D"),t.supportsTextureAtlas&&r.uniforms.add("texMetallicRoughnessSize","vec2"),r.code.add(o["a"]`void applyMetallnessAndRoughness(TextureLookupParameter params) {
vec3 metallicRoughness = textureLookup(texMetallicRoughness, params).rgb;
mrr[0] *= metallicRoughness.b;
mrr[1] *= metallicRoughness.g;
}`)),t.hasEmissionTexture&&(r.uniforms.add("texEmission","sampler2D"),t.supportsTextureAtlas&&r.uniforms.add("texEmissionSize","vec2"),r.code.add(o["a"]`void applyEmission(TextureLookupParameter params) {
emission *= textureLookup(texEmission, params).rgb;
}`)),t.hasOcclusionTexture?(r.uniforms.add("texOcclusion","sampler2D"),t.supportsTextureAtlas&&r.uniforms.add("texOcclusionSize","vec2"),r.code.add(o["a"]`void applyOcclusion(TextureLookupParameter params) {
occlusion *= textureLookup(texOcclusion, params).r;
}
float getBakedOcclusion() {
return occlusion;
}`)):r.code.add(o["a"]`float getBakedOcclusion() { return 1.0; }`),r.code.add(o["a"]`
    void applyPBRFactors() {
      mrr = mrrFactors;
      emission = emissionFactor;
      occlusion = 1.0;
      ${i?"vtc.uv = vuv0;":""}
      ${t.hasMetalnessAndRoughnessTexture?t.supportsTextureAtlas?"vtc.size = texMetallicRoughnessSize; applyMetallnessAndRoughness(vtc);":"applyMetallnessAndRoughness(vtc);":""}
      ${t.hasEmissionTexture?t.supportsTextureAtlas?"vtc.size = texEmissionSize; applyEmission(vtc);":"applyEmission(vtc);":""}
      ${t.hasOcclusionTexture?t.supportsTextureAtlas?"vtc.size = texOcclusionSize; applyOcclusion(vtc);":"applyOcclusion(vtc);":""}
    }
  `))):r.code.add(o["a"]`const vec3 mrr = vec3(0.0, 0.6, 0.2);
const vec3 emission = vec3(0.0);
float occlusion = 1.0;
void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`)}function s(e,t,r=!1){r||(e.setUniform3fv("mrrFactors",t.mrrFactors),e.setUniform3fv("emissionFactor",t.emissiveFactor))}},aab5:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var i=r("3886");function n(e,t){const r=e.fragment;r.code.add(i["a"]`struct ShadingNormalParameters {
vec3 normalView;
vec3 viewDirection;
} shadingParams;`),1===t.doubleSidedMode?r.code.add(i["a"]`vec3 shadingNormal(ShadingNormalParameters params) {
return dot(params.normalView, params.viewDirection) > 0.0 ? normalize(-params.normalView) : normalize(params.normalView);
}`):2===t.doubleSidedMode?r.code.add(i["a"]`vec3 shadingNormal(ShadingNormalParameters params) {
return gl_FrontFacing ? normalize(params.normalView) : normalize(-params.normalView);
}`):r.code.add(i["a"]`vec3 shadingNormal(ShadingNormalParameters params) {
return normalize(params.normalView);
}`)}},afe1:function(e,t,r){"use strict";function i(){return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}function n(e){return[e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],e[12],e[13],e[14],e[15]]}function o(e,t,r,i,n,o,a,s,c,l,u,d,f,h,p,m){return[e,t,r,i,n,o,a,s,c,l,u,d,f,h,p,m]}function a(e,t){return new Float64Array(e,t,16)}r.d(t,"a",(function(){return s})),r.d(t,"b",(function(){return a})),r.d(t,"c",(function(){return n})),r.d(t,"d",(function(){return i}));const s=i();Object.freeze({__proto__:null,create:i,clone:n,fromValues:o,createView:a,IDENTITY:s})},b09a:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var i=r("3886");function n(e){e.attributes.add("position","vec3"),e.vertex.code.add(i["a"]`vec3 positionModel() { return position; }`)}},b0ab:function(e,t,r){"use strict";r.d(t,"a",(function(){return A})),r.d(t,"b",(function(){return C}));var i=r("bd75"),n=r("17ca"),o=r("d272"),a=r("4db9"),s=r("d539"),c=r("c332"),l=r("b09a"),u=r("6cb2"),d=r("dfaf"),f=r("6d5b"),h=r("17b0"),p=r("7e21"),m=r("d047"),v=r("7088"),b=r("ea4b"),g=r("c6d7"),x=r("5d5f"),y=r("a7d7"),T=r("d017"),_=r("be24"),O=r("ebd5"),S=r("3626"),w=r("3886"),M=r("690a");function C(e){const t=new M["a"],r=t.vertex.code,C=t.fragment.code;return t.vertex.uniforms.add("proj","mat4").add("view","mat4").add("camPos","vec3").add("localOrigin","vec3"),t.include(l["a"]),t.varyings.add("vpos","vec3"),t.include(_["a"],e),t.include(s["a"],e),t.include(h["a"],e),0!==e.output&&7!==e.output||(t.include(c["a"],e),t.include(a["a"],{linearDepth:!1}),e.offsetBackfaces&&t.include(n["a"]),e.instancedColor&&t.attributes.add("instanceColor","vec4"),t.varyings.add("vNormalWorld","vec3"),t.varyings.add("localvpos","vec3"),e.multipassTerrainEnabled&&t.varyings.add("depth","float"),t.include(d["a"],e),t.include(i["a"],e),t.include(u["a"],e),t.include(f["a"],e),t.vertex.uniforms.add("externalColor","vec4"),t.varyings.add("vcolorExt","vec4"),r.add(w["a"]`
        void main(void) {
          forwardNormalizedVertexColor();
          vcolorExt = externalColor;
          ${e.instancedColor?"vcolorExt *= instanceColor;":""}
          vcolorExt *= vvColor();
          vcolorExt *= getSymbolColor();
          forwardColorMixMode();

          if (vcolorExt.a < ${w["a"].float(O["c"])}) {
            gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          }
          else {
            vpos = calculateVPos();
            localvpos = vpos - view[3].xyz;
            vpos = subtractOrigin(vpos);
            vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPosition(proj, view, vpos);
            ${e.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, camPos);":""}
          }
          ${e.multipassTerrainEnabled?w["a"]`depth = (view * vec4(vpos, 1.0)).z;`:""}
          forwardLinearDepth();
          forwardTextureCoordinates();
        }
      `)),7===e.output&&(t.include(o["a"],e),t.include(O["a"],e),e.multipassTerrainEnabled&&(t.fragment.include(m["a"]),t.include(g["b"],e)),t.fragment.uniforms.add("camPos","vec3").add("localOrigin","vec3").add("opacity","float").add("layerOpacity","float"),t.fragment.uniforms.add("view","mat4"),e.hasColorTexture&&t.fragment.uniforms.add("tex","sampler2D"),t.fragment.include(S["a"]),C.add(w["a"]`
      void main() {
        discardBySlice(vpos);
        ${e.multipassTerrainEnabled?w["a"]`terrainDepthTest(gl_FragCoord, depth);`:""}
        ${e.hasColorTexture?w["a"]`
        vec4 texColor = texture2D(tex, vuv0);
        ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
        discardOrAdjustAlpha(texColor);`:w["a"]`vec4 texColor = vec4(1.0);`}
        ${e.attributeColor?w["a"]`
        float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:w["a"]`
        float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));
        `}

        gl_FragColor = vec4(opacity_);
      }
    `)),0===e.output&&(t.include(o["a"],e),t.include(b["a"],e),t.include(v["a"],e),t.include(O["a"],e),e.receiveShadows&&t.include(T["a"],e),e.multipassTerrainEnabled&&(t.fragment.include(m["a"]),t.include(g["b"],e)),t.fragment.uniforms.add("camPos","vec3").add("localOrigin","vec3").add("ambient","vec3").add("diffuse","vec3").add("opacity","float").add("layerOpacity","float"),t.fragment.uniforms.add("view","mat4"),e.hasColorTexture&&t.fragment.uniforms.add("tex","sampler2D"),t.include(y["a"],e),t.include(x["a"],e),t.fragment.include(S["a"]),C.add(w["a"]`
      void main() {
        discardBySlice(vpos);
        ${e.multipassTerrainEnabled?w["a"]`terrainDepthTest(gl_FragCoord, depth);`:""}
        ${e.hasColorTexture?w["a"]`
        vec4 texColor = texture2D(tex, vuv0);
        ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
        discardOrAdjustAlpha(texColor);`:w["a"]`vec4 texColor = vec4(1.0);`}
        vec3 viewDirection = normalize(vpos - camPos);
        ${1===e.pbrMode?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse();
        ssao *= getBakedOcclusion();

        float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
        vec3 additionalLight = ssao * lightingMainIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
        ${e.receiveShadows?"float shadow = readShadowMap(vpos, linearDepth);":1===e.viewingMode?"float shadow = lightingGlobalFactor * (1.0 - additionalAmbientScale);":"float shadow = 0.0;"}
        vec3 matColor = max(ambient, diffuse);
        ${e.attributeColor?w["a"]`
        vec3 albedo_ = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
        float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:w["a"]`
        vec3 albedo_ = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
        float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));
        `}
        ${w["a"]`
        vec3 shadedNormal = normalize(vNormalWorld);
        albedo_ *= 1.2;
        vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
        float alignmentLightView = clamp(dot(viewForward, -lightingMainDirection), 0.0, 1.0);
        float transmittance = 1.0 - clamp(dot(viewForward, shadedNormal), 0.0, 1.0);
        float treeRadialFalloff = vColor.r;
        float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
        additionalLight += backLightFactor * lightingMainIntensity;`}
        ${1===e.pbrMode||2===e.pbrMode?1===e.viewingMode?w["a"]`vec3 normalGround = normalize(vpos + localOrigin);`:w["a"]`vec3 normalGround = vec3(0.0, 0.0, 1.0);`:w["a"]``}
        ${1===e.pbrMode||2===e.pbrMode?w["a"]`
            float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * lightingMainIntensity[2];
            vec3 shadedColor = evaluateSceneLightingPBR(shadedNormal, albedo_, shadow, 1.0 - ssao, additionalLight, viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:"vec3 shadedColor = evaluateSceneLighting(shadedNormal, albedo_, shadow, 1.0 - ssao, additionalLight);"}
        gl_FragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${e.OITEnabled?"gl_FragColor = premultiplyAlpha(gl_FragColor);":""}
      }
    `)),t.include(p["a"],e),t}const A=Object.freeze({__proto__:null,build:C})},b1390:function(e,t,r){"use strict";function i(){return[0,0,0,1]}function n(e){return[e[0],e[1],e[2],e[3]]}function o(e,t,r,i){return[e,t,r,i]}function a(e,t){return new Float64Array(e,t,4)}r.d(t,"a",(function(){return s})),r.d(t,"b",(function(){return i})),r.d(t,"c",(function(){return n})),r.d(t,"d",(function(){return a}));const s=i();Object.freeze({__proto__:null,create:i,clone:n,fromValues:o,createView:a,IDENTITY:s})},bd75:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var i=r("3886");function n(e,t){0===t.output&&t.receiveShadows?(e.varyings.add("linearDepth","float"),e.vertex.code.add(i["a"]`void forwardLinearDepth() { linearDepth = gl_Position.w; }`)):1===t.output||3===t.output?(e.varyings.add("linearDepth","float"),e.vertex.uniforms.add("cameraNearFar","vec2"),e.vertex.code.add(i["a"]`void forwardLinearDepth() {
linearDepth = (-position_view().z - cameraNearFar[0]) / (cameraNearFar[1] - cameraNearFar[0]);
}`)):e.vertex.code.add(i["a"]`void forwardLinearDepth() {}`)}},be24:function(e,t,r){"use strict";r.d(t,"a",(function(){return n})),r.d(t,"b",(function(){return a}));var i=r("3886");function n(e,t){t.vvInstancingEnabled&&(t.vvSize||t.vvColor)&&e.attributes.add("instanceFeatureAttribute","vec4"),t.vvSize?(e.vertex.uniforms.add("vvSizeMinSize","vec3"),e.vertex.uniforms.add("vvSizeMaxSize","vec3"),e.vertex.uniforms.add("vvSizeOffset","vec3"),e.vertex.uniforms.add("vvSizeFactor","vec3"),e.vertex.uniforms.add("vvSymbolRotationMatrix","mat3"),e.vertex.uniforms.add("vvSymbolAnchor","vec3"),e.vertex.code.add(i["a"]`vec3 vvScale(vec4 _featureAttribute) {
return clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize);
}
vec4 vvTransformPosition(vec3 position, vec4 _featureAttribute) {
return vec4(vvSymbolRotationMatrix * ( vvScale(_featureAttribute) * (position + vvSymbolAnchor)), 1.0);
}`),e.vertex.code.add(i["a"]`
      const float eps = 1.192092896e-07;
      vec4 vvTransformNormal(vec3 _normal, vec4 _featureAttribute) {
        vec3 vvScale = clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize + eps, vvSizeMaxSize);
        return vec4(vvSymbolRotationMatrix * _normal / vvScale, 1.0);
      }

      ${t.vvInstancingEnabled?i["a"]`
      vec4 vvLocalNormal(vec3 _normal) {
        return vvTransformNormal(_normal, instanceFeatureAttribute);
      }

      vec4 localPosition() {
        return vvTransformPosition(position, instanceFeatureAttribute);
      }`:""}
    `)):e.vertex.code.add(i["a"]`vec4 localPosition() { return vec4(position, 1.0); }
vec4 vvLocalNormal(vec3 _normal) { return vec4(_normal, 1.0); }`),t.vvColor?(e.vertex.constants.add("vvColorNumber","int",8),e.vertex.code.add(i["a"]`
      uniform float vvColorValues[vvColorNumber];
      uniform vec4 vvColorColors[vvColorNumber];

      vec4 vvGetColor(vec4 featureAttribute, float values[vvColorNumber], vec4 colors[vvColorNumber]) {
        float value = featureAttribute.y;
        if (value <= values[0]) {
          return colors[0];
        }

        for (int i = 1; i < vvColorNumber; ++i) {
          if (values[i] >= value) {
            float f = (value - values[i-1]) / (values[i] - values[i-1]);
            return mix(colors[i-1], colors[i], f);
          }
        }
        return colors[vvColorNumber - 1];
      }

      ${t.vvInstancingEnabled?i["a"]`
      vec4 vvColor() {
        return vvGetColor(instanceFeatureAttribute, vvColorValues, vvColorColors);
      }`:""}
    `)):e.vertex.code.add(i["a"]`vec4 vvColor() { return vec4(1.0); }`)}function o(e,t){t.vvSizeEnabled&&(e.setUniform3fv("vvSizeMinSize",t.vvSizeMinSize),e.setUniform3fv("vvSizeMaxSize",t.vvSizeMaxSize),e.setUniform3fv("vvSizeOffset",t.vvSizeOffset),e.setUniform3fv("vvSizeFactor",t.vvSizeFactor)),t.vvColorEnabled&&(e.setUniform1fv("vvColorValues",t.vvColorValues),e.setUniform4fv("vvColorColors",t.vvColorColors))}function a(e,t){o(e,t),t.vvSizeEnabled&&(e.setUniform3fv("vvSymbolAnchor",t.vvSymbolAnchor),e.setUniformMatrix3fv("vvSymbolRotationMatrix",t.vvSymbolRotationMatrix))}},c332:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var i=r("3886");function n(e){const t=i["a"]`vec3 decodeNormal(vec2 f) {
float z = 1.0 - abs(f.x) - abs(f.y);
return vec3(f + sign(f) * min(z, 0.0), z);
}`;e.fragment.code.add(t),e.vertex.code.add(t)}function o(e,t){0===t.normalType&&(e.attributes.add("normal","vec3"),e.vertex.code.add(i["a"]`vec3 normalModel() {
return normal;
}`)),1===t.normalType&&(e.include(n),e.attributes.add("normalCompressed","vec2"),e.vertex.code.add(i["a"]`vec3 normalModel() {
return decodeNormal(normalCompressed);
}`)),3===t.normalType&&(e.extensions.add("GL_OES_standard_derivatives"),e.fragment.code.add(i["a"]`vec3 screenDerivativeNormal(vec3 positionView) {
return normalize(cross(dFdx(positionView), dFdy(positionView)));
}`))}},c514:function(e,t,r){"use strict";function i(e){return window.WebGL2RenderingContext&&e instanceof window.WebGL2RenderingContext}r.d(t,"a",(function(){return i}))},c51b:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var i=r("3886");function n(e){e.vertex.code.add(i["a"]`const float PI = 3.141592653589793;`),e.fragment.code.add(i["a"]`const float PI = 3.141592653589793;
const float LIGHT_NORMALIZATION = 1.0 / PI;
const float INV_PI = 0.3183098861837907;
const float HALF_PI = 1.570796326794897;`)}},c6d7:function(e,t,r){"use strict";r.d(t,"a",(function(){return o})),r.d(t,"b",(function(){return n}));var i=r("3886");function n(e,t){e.fragment.uniforms.add("terrainDepthTexture","sampler2D"),e.fragment.uniforms.add("cameraNearFar","vec2"),e.fragment.uniforms.add("inverseViewport","vec2"),e.fragment.code.add(i["a"]`
    // Compare the linearized depths of fragment and terrain. Discard fragments on the wrong side of the terrain.
    void terrainDepthTest(vec4 fragCoord, float fragmentDepth){

      float terrainDepth = linearDepthFromTexture(terrainDepthTexture, fragCoord.xy * inverseViewport, cameraNearFar);
      if(fragmentDepth ${t.cullAboveGround?">":"<="} terrainDepth){
        discard;
      }
    }
  `)}function o(e,t){t.multipassTerrainEnabled&&t.terrainLinearDepthTexture&&e.bindTexture(t.terrainLinearDepthTexture,"terrainDepthTexture")}},d017:function(e,t,r){"use strict";r.d(t,"a",(function(){return o})),r.d(t,"b",(function(){return a}));var i=r("501b"),n=r("3886");function o(e){e.fragment.include(i["a"]),e.fragment.uniforms.add("uShadowMapTex","sampler2D"),e.fragment.uniforms.add("uShadowMapNum","int"),e.fragment.uniforms.add("uShadowMapDistance","vec4"),e.fragment.uniforms.add("uShadowMapMatrix","mat4",4),e.fragment.uniforms.add("uDepthHalfPixelSz","float"),e.fragment.code.add(n["a"]`int chooseCascade(float _linearDepth, out mat4 mat) {
vec4 distance = uShadowMapDistance;
float depth = _linearDepth;
int i = depth < distance[1] ? 0 : depth < distance[2] ? 1 : depth < distance[3] ? 2 : 3;
mat = i == 0 ? uShadowMapMatrix[0] : i == 1 ? uShadowMapMatrix[1] : i == 2 ? uShadowMapMatrix[2] : uShadowMapMatrix[3];
return i;
}
vec3 lightSpacePosition(vec3 _vpos, mat4 mat) {
vec4 lv = mat * vec4(_vpos, 1.0);
lv.xy /= lv.w;
return 0.5 * lv.xyz + vec3(0.5);
}
vec2 cascadeCoordinates(int i, vec3 lvpos) {
return vec2(float(i - 2 * (i / 2)) * 0.5, float(i / 2) * 0.5) + 0.5 * lvpos.xy;
}
float readShadowMapDepth(vec2 uv, sampler2D _depthTex) {
return rgba2float(texture2D(_depthTex, uv));
}
float posIsInShadow(vec2 uv, vec3 lvpos, sampler2D _depthTex) {
return readShadowMapDepth(uv, _depthTex) < lvpos.z ? 1.0 : 0.0;
}
float filterShadow(vec2 uv, vec3 lvpos, float halfPixelSize, sampler2D _depthTex) {
float texSize = 0.5 / halfPixelSize;
vec2 st = fract((vec2(halfPixelSize) + uv) * texSize);
float s00 = posIsInShadow(uv + vec2(-halfPixelSize, -halfPixelSize), lvpos, _depthTex);
float s10 = posIsInShadow(uv + vec2(halfPixelSize, -halfPixelSize), lvpos, _depthTex);
float s11 = posIsInShadow(uv + vec2(halfPixelSize, halfPixelSize), lvpos, _depthTex);
float s01 = posIsInShadow(uv + vec2(-halfPixelSize, halfPixelSize), lvpos, _depthTex);
return mix(mix(s00, s10, st.x), mix(s01, s11, st.x), st.y);
}
float readShadowMap(const in vec3 _vpos, float _linearDepth) {
mat4 mat;
int i = chooseCascade(_linearDepth, mat);
if (i >= uShadowMapNum) { return 0.0; }
vec3 lvpos = lightSpacePosition(_vpos, mat);
if (lvpos.z >= 1.0) { return 0.0; }
if (lvpos.x < 0.0 || lvpos.x > 1.0 || lvpos.y < 0.0 || lvpos.y > 1.0) { return 0.0; }
vec2 uv = cascadeCoordinates(i, lvpos);
return filterShadow(uv, lvpos, uDepthHalfPixelSz, uShadowMapTex);
}`)}function a(e,t,r){t.shadowMappingEnabled&&t.shadowMap.bindView(e,r)}},d047:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var i=r("501b"),n=r("3886");function o(e){e.include(i["a"]),e.code.add(n["a"]`float linearDepthFromFloat(float depth, vec2 nearFar) {
return -(depth * (nearFar[1] - nearFar[0]) + nearFar[0]);
}
float linearDepthFromTexture(sampler2D depthTex, vec2 uv, vec2 nearFar) {
return linearDepthFromFloat(rgba2float(texture2D(depthTex, uv)), nearFar);
}`)}},d17d:function(e,t,r){"use strict";r.d(t,"a",(function(){return i})),r.d(t,"b",(function(){return o})),r.d(t,"c",(function(){return n}));const i=33984;var n;!function(e){e[e.Texture=0]="Texture",e[e.Buffer=1]="Buffer",e[e.VAO=2]="VAO",e[e.VertexShader=3]="VertexShader",e[e.FragmentShader=4]="FragmentShader",e[e.Program=5]="Program",e[e.Framebuffer=6]="Framebuffer",e[e.Renderbuffer=7]="Renderbuffer",e[e.COUNT=8]="COUNT"}(n||(n={}));const o=33306},d272:function(e,t,r){"use strict";r.d(t,"a",(function(){return s})),r.d(t,"b",(function(){return c}));var i=r("b2b2"),n=r("e431"),o=r("0b2d"),a=r("3886");function s(e,t){if(t.slicePlaneEnabled){e.extensions.add("GL_OES_standard_derivatives"),t.sliceEnabledForVertexPrograms&&(e.vertex.uniforms.add("slicePlaneOrigin","vec3"),e.vertex.uniforms.add("slicePlaneBasis1","vec3"),e.vertex.uniforms.add("slicePlaneBasis2","vec3")),e.fragment.uniforms.add("slicePlaneOrigin","vec3"),e.fragment.uniforms.add("slicePlaneBasis1","vec3"),e.fragment.uniforms.add("slicePlaneBasis2","vec3");const r=a["a"]`struct SliceFactors {
float front;
float side0;
float side1;
float side2;
float side3;
};
SliceFactors calculateSliceFactors(vec3 pos) {
vec3 rel = pos - slicePlaneOrigin;
vec3 slicePlaneNormal = -cross(slicePlaneBasis1, slicePlaneBasis2);
float slicePlaneW = -dot(slicePlaneNormal, slicePlaneOrigin);
float basis1Len2 = dot(slicePlaneBasis1, slicePlaneBasis1);
float basis2Len2 = dot(slicePlaneBasis2, slicePlaneBasis2);
float basis1Dot = dot(slicePlaneBasis1, rel);
float basis2Dot = dot(slicePlaneBasis2, rel);
return SliceFactors(
dot(slicePlaneNormal, pos) + slicePlaneW,
-basis1Dot - basis1Len2,
basis1Dot - basis1Len2,
-basis2Dot - basis2Len2,
basis2Dot - basis2Len2
);
}
bool sliceByFactors(SliceFactors factors) {
return factors.front < 0.0
&& factors.side0 < 0.0
&& factors.side1 < 0.0
&& factors.side2 < 0.0
&& factors.side3 < 0.0;
}
bool sliceEnabled() {
return dot(slicePlaneBasis1, slicePlaneBasis1) != 0.0;
}
bool sliceByPlane(vec3 pos) {
return sliceEnabled() && sliceByFactors(calculateSliceFactors(pos));
}
#define rejectBySlice(_pos_) sliceByPlane(_pos_)
#define discardBySlice(_pos_) { if (sliceByPlane(_pos_)) discard; }`,i=a["a"]`vec4 applySliceHighlight(vec4 color, vec3 pos) {
SliceFactors factors = calculateSliceFactors(pos);
if (sliceByFactors(factors)) {
return color;
}
const float HIGHLIGHT_WIDTH = 1.0;
const vec4 HIGHLIGHT_COLOR = vec4(0.0, 0.0, 0.0, 0.3);
factors.front /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.front);
factors.side0 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side0);
factors.side1 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side1);
factors.side2 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side2);
factors.side3 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side3);
float highlightFactor = (1.0 - step(0.5, factors.front))
* (1.0 - step(0.5, factors.side0))
* (1.0 - step(0.5, factors.side1))
* (1.0 - step(0.5, factors.side2))
* (1.0 - step(0.5, factors.side3));
return mix(color, vec4(HIGHLIGHT_COLOR.rgb, color.a), highlightFactor * HIGHLIGHT_COLOR.a);
}`,n=t.sliceHighlightDisabled?a["a"]`#define highlightSlice(_color_, _pos_) (_color_)`:a["a"]`
        ${i}
        #define highlightSlice(_color_, _pos_) (sliceEnabled() ? applySliceHighlight(_color_, _pos_) : (_color_))
      `;t.sliceEnabledForVertexPrograms&&e.vertex.code.add(r),e.fragment.code.add(r),e.fragment.code.add(n)}else{const r=a["a"]`#define rejectBySlice(_pos_) false
#define discardBySlice(_pos_) {}
#define highlightSlice(_color_, _pos_) (_color_)`;t.sliceEnabledForVertexPrograms&&e.vertex.code.add(r),e.fragment.code.add(r)}}function c(e,t,r,a){t.slicePlaneEnabled&&(Object(i["k"])(r)?(a?(Object(n["g"])(l,r.origin,a),e.setUniform3fv("slicePlaneOrigin",l)):e.setUniform3fv("slicePlaneOrigin",r.origin),e.setUniform3fv("slicePlaneBasis1",r.basis1),e.setUniform3fv("slicePlaneBasis2",r.basis2)):(e.setUniform3fv("slicePlaneBasis1",o["b"]),e.setUniform3fv("slicePlaneBasis2",o["b"]),e.setUniform3fv("slicePlaneOrigin",o["b"])))}const l=Object(o["e"])()},d539:function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));var i=r("0b2d"),n=r("6a21"),o=r("3886"),a=r("9cc4");function s(e,t){t.instanced&&t.instancedDoublePrecision&&(e.attributes.add("modelOriginHi","vec3"),e.attributes.add("modelOriginLo","vec3"),e.attributes.add("model","mat3"),e.attributes.add("modelNormal","mat3")),t.instancedDoublePrecision&&(e.vertex.include(n["a"],t),e.vertex.uniforms.add("viewOriginHi","vec3"),e.vertex.uniforms.add("viewOriginLo","vec3"));const r=[o["a"]`
    vec3 calculateVPos() {
      ${t.instancedDoublePrecision?"return model * localPosition().xyz;":"return localPosition().xyz;"}
    }
    `,o["a"]`
    vec3 subtractOrigin(vec3 _pos) {
      ${t.instancedDoublePrecision?o["a"]`
          vec3 originDelta = dpAdd(viewOriginHi, viewOriginLo, -modelOriginHi, -modelOriginLo);
          return _pos - originDelta;`:"return vpos;"}
    }
    `,o["a"]`
    vec3 dpNormal(vec4 _normal) {
      ${t.instancedDoublePrecision?"return normalize(modelNormal * _normal.xyz);":"return normalize(_normal.xyz);"}
    }
    `,o["a"]`
    vec3 dpNormalView(vec4 _normal) {
      ${t.instancedDoublePrecision?"return normalize((viewNormal * vec4(modelNormal * _normal.xyz, 1.0)).xyz);":"return normalize((viewNormal * _normal).xyz);"}
    }
    `,t.vertexTangents?o["a"]`
    vec4 dpTransformVertexTangent(vec4 _tangent) {
      ${t.instancedDoublePrecision?"return vec4(modelNormal * _tangent.xyz, _tangent.w);":"return _tangent;"}

    }
    `:o["a"]``];e.vertex.code.add(r[0]),e.vertex.code.add(r[1]),e.vertex.code.add(r[2]),2===t.output&&e.vertex.code.add(r[3]),e.vertex.code.add(r[4])}!function(e){class t{}function r(e,t){Object(a["b"])(t,c,l,3),e.setUniform3fv("viewOriginHi",c),e.setUniform3fv("viewOriginLo",l)}e.Uniforms=t,e.bindCustomOrigin=r}(s||(s={}));const c=Object(i["e"])(),l=Object(i["e"])()},d56e:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var i=r("3886"),n=r("1956");function o(e,t){const r=i["a"]`
  /*
  *  ${t.name}
  *  ${0===t.output?"RenderOutput: Color":1===t.output?"RenderOutput: Depth":3===t.output?"RenderOutput: Shadow":2===t.output?"RenderOutput: Normal":4===t.output?"RenderOutput: Highlight":""}
  */
  `;Object(n["c"])()&&(e.fragment.code.add(r),e.vertex.code.add(r))}},dae5:function(e,t,r){"use strict";function i(){return[1,0,0,0,1,0,0,0,1]}function n(e){return[e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8]]}function o(e,t,r,i,n,o,a,s,c){return[e,t,r,i,n,o,a,s,c]}function a(e,t){return new Float64Array(e,t,9)}r.d(t,"a",(function(){return a})),r.d(t,"b",(function(){return i}));Object.freeze({__proto__:null,create:i,clone:n,fromValues:o,createView:a})},dfaf:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var i=r("3886");function n(e,t){1===t.attributeTextureCoordinates&&(e.attributes.add("uv0","vec2"),e.varyings.add("vuv0","vec2"),e.vertex.code.add(i["a"]`void forwardTextureCoordinates() {
vuv0 = uv0;
}`)),2===t.attributeTextureCoordinates&&(e.attributes.add("uv0","vec2"),e.varyings.add("vuv0","vec2"),e.attributes.add("uvRegion","vec4"),e.varyings.add("vuvRegion","vec4"),e.vertex.code.add(i["a"]`void forwardTextureCoordinates() {
vuv0 = uv0;
vuvRegion = uvRegion;
}`)),0===t.attributeTextureCoordinates&&e.vertex.code.add(i["a"]`void forwardTextureCoordinates() {}`)}},ea4b:function(e,t,r){"use strict";r.d(t,"a",(function(){return u}));var i=r("3886");function n(e,t){const r=e.fragment,n=void 0!==t.lightingSphericalHarmonicsOrder?t.lightingSphericalHarmonicsOrder:2;0===n?(r.uniforms.add("lightingAmbientSH0","vec3"),r.code.add(i["a"]`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
return ambientLight * (1.0 - ambientOcclusion);
}`)):1===n?(r.uniforms.add("lightingAmbientSH_R","vec4"),r.uniforms.add("lightingAmbientSH_G","vec4"),r.uniforms.add("lightingAmbientSH_B","vec4"),r.code.add(i["a"]`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec4 sh0 = vec4(
0.282095,
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y
);
vec3 ambientLight = vec3(
dot(lightingAmbientSH_R, sh0),
dot(lightingAmbientSH_G, sh0),
dot(lightingAmbientSH_B, sh0)
);
return ambientLight * (1.0 - ambientOcclusion);
}`)):2===n&&(r.uniforms.add("lightingAmbientSH0","vec3"),r.uniforms.add("lightingAmbientSH_R1","vec4"),r.uniforms.add("lightingAmbientSH_G1","vec4"),r.uniforms.add("lightingAmbientSH_B1","vec4"),r.uniforms.add("lightingAmbientSH_R2","vec4"),r.uniforms.add("lightingAmbientSH_G2","vec4"),r.uniforms.add("lightingAmbientSH_B2","vec4"),r.code.add(i["a"]`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
vec4 sh1 = vec4(
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y,
1.092548 * normal.x * normal.y
);
vec4 sh2 = vec4(
1.092548 * normal.y * normal.z,
0.315392 * (3.0 * normal.z * normal.z - 1.0),
1.092548 * normal.x * normal.z,
0.546274 * (normal.x * normal.x - normal.y * normal.y)
);
ambientLight += vec3(
dot(lightingAmbientSH_R1, sh1),
dot(lightingAmbientSH_G1, sh1),
dot(lightingAmbientSH_B1, sh1)
);
ambientLight += vec3(
dot(lightingAmbientSH_R2, sh2),
dot(lightingAmbientSH_G2, sh2),
dot(lightingAmbientSH_B2, sh2)
);
return ambientLight * (1.0 - ambientOcclusion);
}`),1!==t.pbrMode&&2!==t.pbrMode||r.code.add(i["a"]`const vec3 skyTransmittance = vec3(0.9, 0.9, 1.0);
vec3 calculateAmbientRadiance(float ambientOcclusion)
{
vec3 ambientLight = 1.2 * (0.282095 * lightingAmbientSH0) - 0.2;
return ambientLight *= (1.0 - ambientOcclusion) * skyTransmittance;
}`))}var o=r("7088");function a(e){const t=e.fragment;t.uniforms.add("lightingMainDirection","vec3"),t.uniforms.add("lightingMainIntensity","vec3"),t.uniforms.add("lightingFixedFactor","float"),t.code.add(i["a"]`vec3 evaluateMainLighting(vec3 normal_global, float shadowing) {
float dotVal = clamp(dot(normal_global, lightingMainDirection), 0.0, 1.0);
dotVal = mix(dotVal, 1.0, lightingFixedFactor);
return lightingMainIntensity * ((1.0 - shadowing) * dotVal);
}`)}var s=r("5d5f"),c=r("c51b"),l=r("d017");function u(e,t){const r=e.fragment;e.include(a),e.include(o["a"],t),0!==t.pbrMode&&e.include(s["a"],t),e.include(n,t),t.receiveShadows&&e.include(l["a"],t),r.uniforms.add("lightingGlobalFactor","float"),r.uniforms.add("ambientBoostFactor","float"),e.include(c["a"]),r.code.add(i["a"]`
    const float GAMMA_SRGB = 2.1;
    const float INV_GAMMA_SRGB = 0.4761904;
    ${0===t.pbrMode?"":"const vec3 GROUND_REFLECTANCE = vec3(0.2);"}
  `),r.code.add(i["a"]`
    float additionalDirectedAmbientLight(vec3 vPosWorld) {
      float vndl = dot(${1===t.viewingMode?i["a"]`normalize(vPosWorld)`:i["a"]`vec3(0.0, 0.0, 1.0)`}, lightingMainDirection);
      return smoothstep(0.0, 1.0, clamp(vndl * 2.5, 0.0, 1.0));
    }
  `),r.code.add(i["a"]`vec3 evaluateAdditionalLighting(float ambientOcclusion, vec3 vPosWorld) {
float additionalAmbientScale = additionalDirectedAmbientLight(vPosWorld);
return (1.0 - ambientOcclusion) * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor * lightingMainIntensity;
}`),0===t.pbrMode||4===t.pbrMode?r.code.add(i["a"]`vec3 evaluateSceneLighting(vec3 normalWorld, vec3 albedo, float shadow, float ssao, vec3 additionalLight)
{
vec3 mainLighting = evaluateMainLighting(normalWorld, shadow);
vec3 ambientLighting = calculateAmbientIrradiance(normalWorld, ssao);
vec3 albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
vec3 totalLight = mainLighting + ambientLighting + additionalLight;
totalLight = min(totalLight, vec3(PI));
vec3 outColor = vec3((albedoLinear / PI) * totalLight);
return pow(outColor, vec3(INV_GAMMA_SRGB));
}`):1!==t.pbrMode&&2!==t.pbrMode||(r.code.add(i["a"]`const float fillLightIntensity = 0.25;
const float horizonLightDiffusion = 0.4;
const float additionalAmbientIrradianceFactor = 0.02;
vec3 evaluateSceneLightingPBR(vec3 normal, vec3 albedo, float shadow, float ssao, vec3 additionalLight, vec3 viewDir, vec3 normalGround, vec3 mrr, vec3 _emission, float additionalAmbientIrradiance)
{
vec3 viewDirection = -viewDir;
vec3 mainLightDirection = lightingMainDirection;
vec3 h = normalize(viewDirection + mainLightDirection);
PBRShadingInfo inputs;
inputs.NdotL = clamp(dot(normal, mainLightDirection), 0.001, 1.0);
inputs.NdotV = clamp(abs(dot(normal, viewDirection)), 0.001, 1.0);
inputs.NdotH = clamp(dot(normal, h), 0.0, 1.0);
inputs.VdotH = clamp(dot(viewDirection, h), 0.0, 1.0);
inputs.NdotNG = clamp(dot(normal, normalGround), -1.0, 1.0);
vec3 reflectedView = normalize(reflect(viewDirection, normal));
inputs.RdotNG = clamp(dot(reflectedView, normalGround), -1.0, 1.0);
inputs.albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
inputs.ssao = ssao;
inputs.metalness = mrr[0];
inputs.roughness = clamp(mrr[1] * mrr[1], 0.001, 0.99);`),r.code.add(i["a"]`inputs.f0 = (0.16 * mrr[2] * mrr[2]) * (1.0 - inputs.metalness) + inputs.albedoLinear * inputs.metalness;
inputs.f90 = vec3(clamp(dot(inputs.f0, vec3(50.0 * 0.33)), 0.0, 1.0));
inputs.diffuseColor = inputs.albedoLinear * (vec3(1.0) - inputs.f0) * (1.0 - inputs.metalness);`),r.code.add(i["a"]`vec3 ambientDir = vec3(5.0 * normalGround[1] - normalGround[0] * normalGround[2], - 5.0 * normalGround[0] - normalGround[2] * normalGround[1], normalGround[1] * normalGround[1] + normalGround[0] * normalGround[0]);
ambientDir = ambientDir != vec3(0.0)? normalize(ambientDir) : normalize(vec3(5.0, -1.0, 0.0));
inputs.NdotAmbDir = abs(dot(normal, ambientDir));
vec3 mainLightIrradianceComponent = inputs.NdotL * (1.0 - shadow) * lightingMainIntensity;
vec3 fillLightsIrradianceComponent = inputs.NdotAmbDir * lightingMainIntensity * fillLightIntensity;
vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(normal, ssao) + additionalLight;
inputs.skyIrradianceToSurface = ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;
inputs.groundIrradianceToSurface = GROUND_REFLECTANCE * ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;`),r.code.add(i["a"]`vec3 horizonRingDir = inputs.RdotNG * normalGround - reflectedView;
vec3 horizonRingH = normalize(viewDirection + horizonRingDir);
inputs.NdotH_Horizon = dot(normal, horizonRingH);
vec3 mainLightRadianceComponent = normalDistribution(inputs.NdotH, inputs.roughness) * lightingMainIntensity * (1.0 - shadow);
vec3 horizonLightRadianceComponent = normalDistribution(inputs.NdotH_Horizon, min(inputs.roughness + horizonLightDiffusion, 1.0)) * lightingMainIntensity * fillLightIntensity;
vec3 ambientLightRadianceComponent = calculateAmbientRadiance(ssao) + additionalLight;
inputs.skyRadianceToSurface = ambientLightRadianceComponent + mainLightRadianceComponent + horizonLightRadianceComponent;
inputs.groundRadianceToSurface = GROUND_REFLECTANCE * (ambientLightRadianceComponent + horizonLightRadianceComponent) + mainLightRadianceComponent;
inputs.averageAmbientRadiance = ambientLightIrradianceComponent[1] * (1.0 + GROUND_REFLECTANCE[1]);`),r.code.add(i["a"]`
        vec3 reflectedColorComponent = evaluateEnvironmentIllumination(inputs);
        vec3 additionalMaterialReflectanceComponent = inputs.albedoLinear * additionalAmbientIrradiance;
        vec3 emissionComponent = pow(_emission, vec3(GAMMA_SRGB));
        vec3 outColorLinear = reflectedColorComponent + additionalMaterialReflectanceComponent + emissionComponent;
        ${2===t.pbrMode?i["a"]`vec3 outColor = pow(max(vec3(0.0), outColorLinear - 0.005 * inputs.averageAmbientRadiance), vec3(INV_GAMMA_SRGB));`:i["a"]`vec3 outColor = pow(blackLevelSoftCompression(outColorLinear, inputs), vec3(INV_GAMMA_SRGB));`}
        return outColor;
      }
    `))}},ebd5:function(e,t,r){"use strict";r.d(t,"a",(function(){return a})),r.d(t,"b",(function(){return n})),r.d(t,"c",(function(){return o}));var i=r("3886");const n=.1,o=.001;function a(e,t){const r=e.fragment;switch(t.alphaDiscardMode){case 0:r.code.add(i["a"]`
        #define discardOrAdjustAlpha(color) { if (color.a < ${i["a"].float(o)}) { discard; } }
      `);break;case 1:r.code.add(i["a"]`void discardOrAdjustAlpha(inout vec4 color) {
color.a = 1.0;
}`);break;case 2:r.uniforms.add("textureAlphaCutoff","float"),r.code.add(i["a"]`#define discardOrAdjustAlpha(color) { if (color.a < textureAlphaCutoff) { discard; } else { color.a = 1.0; } }`);break;case 3:e.fragment.uniforms.add("textureAlphaCutoff","float"),e.fragment.code.add(i["a"]`#define discardOrAdjustAlpha(color) { if (color.a < textureAlphaCutoff) { discard; } }`)}}},fc00:function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));var i=r("8190"),n=r("c6ac");class o{constructor(e,t){this.layout=e,this.buffer="number"==typeof t?new ArrayBuffer(t*e.stride):t;for(const r of e.fieldNames){const t=e.fields.get(r);this[r]=new t.constructor(this.buffer,t.offset,this.stride)}}get stride(){return this.layout.stride}get count(){return this.buffer.byteLength/this.stride}get byteLength(){return this.buffer.byteLength}getField(e,t){const r=this[e];return r&&r.elementCount===t.ElementCount&&r.elementType===t.ElementType?r:null}slice(e,t){return new o(this.layout,this.buffer.slice(e*this.stride,t*this.stride))}copyFrom(e,t,r,i){const n=this.stride;if(n%4==0){const o=new Uint32Array(e.buffer,t*n,i*n/4);new Uint32Array(this.buffer,r*n,i*n/4).set(o)}else{const o=new Uint8Array(e.buffer,t*n,i*n);new Uint8Array(this.buffer,r*n,i*n).set(o)}}}class a{constructor(){this.stride=0,this.fields=new Map,this.fieldNames=[]}vec2f(e,t){return this.appendField(e,i["m"],t),this}vec2f64(e,t){return this.appendField(e,i["n"],t),this}vec3f(e,t){return this.appendField(e,i["u"],t),this}vec3f64(e,t){return this.appendField(e,i["v"],t),this}vec4f(e,t){return this.appendField(e,i["C"],t),this}vec4f64(e,t){return this.appendField(e,i["D"],t),this}mat3f(e,t){return this.appendField(e,i["f"],t),this}mat3f64(e,t){return this.appendField(e,i["g"],t),this}mat4f(e,t){return this.appendField(e,i["h"],t),this}mat4f64(e,t){return this.appendField(e,i["i"],t),this}vec4u8(e,t){return this.appendField(e,i["J"],t),this}f32(e,t){return this.appendField(e,i["a"],t),this}f64(e,t){return this.appendField(e,i["b"],t),this}u8(e,t){return this.appendField(e,i["l"],t),this}u16(e,t){return this.appendField(e,i["j"],t),this}i8(e,t){return this.appendField(e,i["e"],t),this}vec2i8(e,t){return this.appendField(e,i["q"],t),this}vec2i16(e,t){return this.appendField(e,i["o"],t),this}vec2u8(e,t){return this.appendField(e,i["t"],t),this}vec4u16(e,t){return this.appendField(e,i["H"],t),this}u32(e,t){return this.appendField(e,i["k"],t),this}appendField(e,t,r){const i=t.ElementCount*Object(n["a"])(t.ElementType),o=this.stride;this.fields.set(e,{size:i,constructor:t,offset:o,optional:r}),this.stride+=i,this.fieldNames.push(e)}alignTo(e){return this.stride=Math.floor((this.stride+e-1)/e)*e,this}hasField(e){return this.fieldNames.indexOf(e)>=0}createBuffer(e){return new o(this,e)}createView(e){return new o(this,e)}clone(){const e=new a;return e.stride=this.stride,e.fields=new Map,this.fields.forEach((t,r)=>e.fields.set(r,t)),e.fieldNames=this.fieldNames.slice(),e.BufferType=this.BufferType,e}}function s(){return new a}}}]);
//# sourceMappingURL=chunk-d359ad46.1a174eef.js.map