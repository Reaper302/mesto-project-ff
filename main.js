(()=>{"use strict";var t="wff-cohort-14",e="https://nomoreparties.co/v1/".concat(t,"/users/me"),n="https://nomoreparties.co/v1/".concat(t,"/cards"),r={authorization:"6f573362-5f06-4f70-8bea-df09e2f16ca1","Content-Type":"application/json"};function o(e,n,r,o){var c=document.getElementById("card-template").content.cloneNode(!0),u=c.querySelector(".card__like-button"),a=c.querySelector(".card__delete-button"),i=c.querySelector(".card__image"),l=c.querySelector(".card__title"),s=c.querySelector(".like-container"),p=c.querySelector(".card");return i.src=e.link,i.alt=e.name,l.textContent=e.name,s.textContent=e.likes.length,e.likes.some((function(t){return t._id===n}))&&u.classList.add("card__like-button_is-active"),e.owner._id!==n&&a.remove(),i.addEventListener("click",r),a&&a.addEventListener("click",(function(t){t.preventDefault(),o(e._id,p)})),u.addEventListener("click",(function(n){!function(e,n,r,o){(function(e,n){var r=n?"PUT":"DELETE";return fetch("https://nomoreparties.co/v1/".concat(t,"/cards/likes/").concat(e),{method:r,headers:{authorization:"6f573362-5f06-4f70-8bea-df09e2f16ca1"}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))})(n,!o.classList.contains("card__like-button_is-active")).then((function(t){r.textContent=t.likes.length,o.classList.toggle("card__like-button_is-active")})).catch((function(t){return console.error("Error:",t)}))}(0,e._id,s,u)})),c}function c(t){t.classList.add("popup_is-animated"),setTimeout((function(){t.classList.add("popup_is-opened")}),1),document.addEventListener("keydown",a)}function u(t){t.removeAttribute("style"),setTimeout((function(){t.classList.remove("popup_is-opened")}),1),document.removeEventListener("keydown",a)}function a(t){if("Escape"===t.key){var e=document.querySelector(".popup_is-opened");e&&u(e)}}var i=function(t,e,n,r){var o=t.querySelector(".".concat(e.name,"-error"));o&&(e.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass))},l=function(t,e,n){var r=t.querySelector(".".concat(e.name,"-error"));r&&(e.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent="")},s=function(t,e,n){p(t)?(e.classList.add(n.inactiveButtonClass),e.disabled=!0):(e.classList.remove(n.inactiveButtonClass),e.disabled=!1)},p=function(t){var e=/^[a-zA-Zа-яА-ЯёЁ\s-]+$/;return t.some((function(t){return!t.validity.valid||"url"!==t.type&&"avatar"!==t.name&&!e.test(t.value)}))},d=function(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);n.forEach((function(n){l(t,n,e)})),s(n,r,e)};function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var m,_,y,v=document.querySelector(".popup_type_edit"),h=document.querySelector(".popup_type_new-card"),S=document.querySelector(".popup__input_type_name"),b=document.querySelector(".popup__input_type_description"),q=document.querySelector(".profile__title"),E=document.querySelector(".profile__description"),C=document.querySelector(".popup_type_image"),g=document.querySelector(".popup__image"),k=document.querySelector(".popup__caption"),L=document.querySelector(".places__list"),x=h.querySelector(".popup__form"),j=v.querySelector(".popup__form"),A=document.querySelector(".popup_type_confirm"),T=document.querySelector(".profile__image"),P=document.querySelector(".popup_type_avatar-edit"),w=P.querySelector('.popup__form[name="avatar-edit"]'),D=w.querySelector(".popup__input_type_avatar-link");function O(t){c(C),g.src=t.currentTarget.src,g.alt=t.currentTarget.alt,k.textContent=t.currentTarget.alt}function B(t,e){c(A),m=t,y=e}T.addEventListener("click",(function(){d(w,J),c(P)})),w.addEventListener("submit",(function(t){t.preventDefault();var n,o=D.value,c=w.querySelector(".popup__button"),a=c.textContent;c.textContent="Сохранение...",c.disabled=!0,(n=o,fetch("".concat(e,"/avatar"),{method:"PATCH",headers:r,body:JSON.stringify({avatar:n})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(t){document.querySelector(".profile__image").style.backgroundImage="url(".concat(t.avatar,")"),u(P),d(w,J)})).catch((function(t){return console.error("Error:",t)})).finally((function(){c.textContent=a,c.disabled=!1}))})),A.querySelector(".popup__form").addEventListener("submit",(function(t){var e;t.preventDefault(),(e=m,fetch("".concat(n,"/").concat(e),{method:"DELETE",headers:r}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(){y&&y.remove(),u(A)})).catch((function(t){return console.error("Error:",t)}))})),x.addEventListener("submit",(function(t){t.preventDefault();var e=x.querySelector(".popup__input_type_card-name").value,c=x.querySelector(".popup__input_type_url").value,a=x.querySelector(".popup__button"),i=a.textContent;a.textContent="Сохранение...",a.disabled=!0,function(t,e){return fetch(n,{method:"POST",headers:r,body:JSON.stringify({name:t,link:e})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}(e,c).then((function(t){var e=o(t,_,O,B);L.prepend(e),x.reset(),d(x,J),u(h)})).catch((function(t){return console.error("Error:",t)})).finally((function(){a.textContent=i,a.disabled=!1}))}));var I=document.querySelector(".profile__edit-button"),z=document.querySelector(".profile__add-button"),M=document.querySelectorAll(".popup__close");z.addEventListener("click",(function(){d(x,J),c(h)})),I.addEventListener("click",(function(){d(j,J),c(v),S.value=q.textContent,b.value=E.textContent})),document.addEventListener("click",(function(t){t.target.classList.contains("popup")&&u(t.target)})),M.forEach((function(t){t.addEventListener("click",(function(){u(t.closest(".popup"))}))})),j.addEventListener("submit",(function(t){t.preventDefault();var n=S.value,o=b.value,c=j.querySelector(".popup__button"),a=c.textContent;c.textContent="Сохранение...",c.disabled=!0,function(t,n){return fetch(e,{method:"PATCH",headers:r,body:JSON.stringify({name:t,about:n})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}(n,o).then((function(t){q.textContent=t.name,E.textContent=t.about,u(v),d(j,J)})).catch((function(t){return console.error("Error:",t)})).finally((function(){c.textContent=a,c.disabled=!1}))}));var N,J={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};N=J,Array.from(document.querySelectorAll(N.formSelector)).forEach((function(t){t.addEventListener("submit",(function(t){t.preventDefault()})),function(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);s(n,r,e),n.forEach((function(o){o.addEventListener("input",(function(){!function(t,e,n){e.validity.valid?"url"===e.type||"avatar"===e.name||/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(e.value)?l(t,e,n):i(t,e,"Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.",n):e.validity.valueMissing?i(t,e,"Вы пропустили это поле.",n):e.validity.tooShort?i(t,e,"Минимальное количество символов: ".concat(e.minLength,". Длина текста сейчас: ").concat(e.value.length," символ."),n):e.validity.typeMismatch&&"url"===e.type?i(t,e,"Введите адрес сайта.",n):i(t,e,e.validationMessage,n)}(t,o,e),s(n,r,e)}))}))}(t,N)})),Promise.all([fetch(e,{headers:r}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})),fetch(n,{headers:r}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))]).then((function(t){var e,n,r=(n=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==e);i=!0);}catch(t){l=!0,o=t}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(e,n)||function(t,e){if(t){if("string"==typeof t)return f(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(t,e):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=r[0],u=r[1];_=c._id,q.textContent=c.name,E.textContent=c.about,document.querySelector(".profile__image").style.backgroundImage="url(".concat(c.avatar,")"),u.forEach((function(t){var e=o(t,_,O,B);L.appendChild(e)}))})).catch((function(t){return console.error("Error:",t)}))})();