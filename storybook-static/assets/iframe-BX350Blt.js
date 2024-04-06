function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./Configure-XPSFviZs.js","./index-BBkUAzwr.js","./index-z5U8iC57.js","./index-CjuFu3ws.js","./index-PqR-_bA4.js","./index-B_J8iUie.js","./index-DrlA5mbP.js","./index-DrFu-skq.js","./TinymceEditor.stories-Bk3Ueivt.js","./index-_4_hgnnR.js","./entry-preview-kGuIN3g4.js","./react-18-B-OKcmzb.js","./entry-preview-docs-Cr_CTjF-.js","./preview-DzbRFJg_.js","./preview-CwqMn10d.js","./preview-BAz7FMXc.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import"../sb-preview/runtime.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();const f="modulepreload",R=function(_,s){return new URL(_,s).href},O={},o=function(s,c,l){let e=Promise.resolve();if(c&&c.length>0){const t=document.getElementsByTagName("link"),r=document.querySelector("meta[property=csp-nonce]"),E=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));e=Promise.all(c.map(i=>{if(i=R(i,l),i in O)return;O[i]=!0;const u=i.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(!!l)for(let m=t.length-1;m>=0;m--){const a=t[m];if(a.href===i&&(!u||a.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${p}`))return;const n=document.createElement("link");if(n.rel=u?"stylesheet":f,u||(n.as="script",n.crossOrigin=""),n.href=i,E&&n.setAttribute("nonce",E),document.head.appendChild(n),u)return new Promise((m,a)=>{n.addEventListener("load",m),n.addEventListener("error",()=>a(new Error(`Unable to preload CSS for ${i}`)))})}))}return e.then(()=>s()).catch(t=>{const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=t,window.dispatchEvent(r),!r.defaultPrevented)throw t})},{createBrowserChannel:P}=__STORYBOOK_MODULE_CHANNELS__,{addons:T}=__STORYBOOK_MODULE_PREVIEW_API__,d=P({page:"preview"});T.setChannel(d);window.__STORYBOOK_ADDONS_CHANNEL__=d;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=d);const L={"./stories/Configure.mdx":async()=>o(()=>import("./Configure-XPSFviZs.js"),__vite__mapDeps([0,1,2,3,4,5,6,7]),import.meta.url),"./stories/TinymceEditor.stories.jsx":async()=>o(()=>import("./TinymceEditor.stories-Bk3Ueivt.js"),__vite__mapDeps([8,1,9]),import.meta.url)};async function w(_){return L[_]()}const{composeConfigs:v,PreviewWeb:h,ClientApi:I}=__STORYBOOK_MODULE_PREVIEW_API__,A=async()=>{const _=await Promise.all([o(()=>import("./entry-preview-kGuIN3g4.js"),__vite__mapDeps([10,1,11,4]),import.meta.url),o(()=>import("./entry-preview-docs-Cr_CTjF-.js"),__vite__mapDeps([12,6,1,9,7]),import.meta.url),o(()=>import("./preview-DzbRFJg_.js"),__vite__mapDeps([13,5]),import.meta.url),o(()=>import("./preview-Dt8i0IY8.js"),[],import.meta.url),o(()=>import("./preview-DbT1mggi.js"),[],import.meta.url),o(()=>import("./preview-CwqMn10d.js"),__vite__mapDeps([14,7]),import.meta.url),o(()=>import("./preview-B4GcaC1c.js"),[],import.meta.url),o(()=>import("./preview-Db4Idchh.js"),[],import.meta.url),o(()=>import("./preview-BAz7FMXc.js"),__vite__mapDeps([15,7]),import.meta.url),o(()=>import("./preview-Cv3rAi2i.js"),[],import.meta.url),o(()=>import("./preview-D2d-74FL.js"),[],import.meta.url),o(()=>import("./preview-CIRcjyVj.js"),[],import.meta.url)]);return v(_)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new h(w,A);window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;export{o as _};