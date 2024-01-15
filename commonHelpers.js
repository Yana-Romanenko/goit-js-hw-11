import{i as l,S as p}from"./assets/vendor-46aac873.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const c=document.querySelector(".picture-search-form"),m=document.querySelector(".picture-search-name"),f=document.querySelector(".loader-container"),d="41764451-f0ee5e8d00846e21c9f97a054";function h(){f.style.display="block"}function y(){f.style.display="none"}let u={key:d,q:"",image_type:"photo",orientation:"horizontal",safesearch:!0};function g(a){u.q=a;const o=new URLSearchParams(u);h(),fetch(`https://pixabay.com/api/?${o}`).then(r=>{if(y(),!r.ok)throw new Error("Sorry, there are no images matching your search query. Please try again!");return r.json()}).then(({hits:r})=>{const i=document.querySelector(".gallery");if(r.length===0){l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const e=new p(".gallery a",{captionDelay:250,captionsData:"alt",close:!0});i.innerHTML="";const t=r.reduce((n,s)=>n+`<a class="gallery-link" href="${s.largeImageURL}">
            <img
                class="gallery-image"
                src="${s.webformatURL}"
                alt="${s.tags}"
            />
           <ul class="info-list">
              <li class="info-item">
                  <p class="info-title">Likes</p>
                  <p class="info-value">${s.likes}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Views</p>
                  <p class="info-value">${s.views}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Comments</p>
                  <p class="info-value">${s.comments}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Downloads</p>
                  <p class="info-value">${s.downloads}</p>
              </li>
            </ul>
        </a>`,"");i.insertAdjacentHTML("beforeend",t),e.refresh()}).catch(r=>{l.error({title:"Error",message:r.message,position:"topRight"})})}c.addEventListener("submit",a=>{a.preventDefault();const o=m.value.trim();g(o),c.reset()});
//# sourceMappingURL=commonHelpers.js.map
