(()=>{"use strict";var e={91:e=>{e.exports=function(e,t){return t||(t={}),e?(e=String(e.__esModule?e.default:e),t.hash&&(e+=t.hash),t.maybeNeedQuotes&&/[\t\n\f\r "'=<>`]/.test(e)?'"'.concat(e,'"'):e):e}},749:(e,t,E)=>{e.exports=E.p+"assets/08b7126e7eb6e893875a.png"}},t={};function E(s){var n=t[s];if(void 0!==n)return n.exports;var l=t[s]={exports:{}};return e[s](l,l.exports,E),l.exports}E.m=e,E.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return E.d(t,{a:t}),t},E.d=(e,t)=>{for(var s in t)E.o(t,s)&&!E.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},E.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),E.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;E.g.importScripts&&(e=E.g.location+"");var t=E.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var s=t.getElementsByTagName("script");if(s.length)for(var n=s.length-1;n>-1&&!e;)e=s[n--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),E.p=e})(),E.b=document.baseURI||self.location.href,(()=>{var e,t,s,n;!function(e){e.MAIN="main",e.SECTION_HEADER="section-header",e.CSS_VIEWER_BUTTON="css-viewer__button",e.CSS_VIEWER_BUTTON_ENTER="css-viewer__button-enter",e.BOARD="board",e.BOARD_WRAPPER="board__wrapper",e.BOARD_LEVEL_ORDER="board__level-order",e.BOARD_ITEM_CONTAINER="board__item-container",e.TABLE_ITEM="table-item",e.TABLE_ITEM_PICKLE="table-item__pickle",e.TABLE_ITEM_ORANGE="table-item__orange",e.TABLE_ITEM_PLATE="table-item__plate",e.TABLE_ITEM_BENTO="table-item__bento",e.TABLE_ITEM_TABLE="table-item__table",e.TABLE_ITEM_TABLE_IMAGE="table-item__table-image",e.TABLE_ITEM_SELECTABLE="table__item_selectable",e.TABLE_ITEM_SELECTED="table__item_selected",e.TABLE_ITEM_ACTIVE="table__item_active",e.TABLE_ITEM_GO_AWAY="table__item_go_away",e.LEVEL_VIEWER="level-viewer",e.LEVEL_VIEWER_CONTENT="level-viewer__content",e.LEVEL_VIEWER_LIST="level-viewer__list",e.LEVEL_VIEWER_LIST_ITEM="level-viewer__list-item",e.LEVEL_DONE="level_done",e.LEVEL_DONE_WITH_HELP="level_done-with-help",e.CSS_VIEWER="css-viewer",e.CSS_VIEWER_CONTROLS="css-viewer__controls",e.CSS_VIEWER_INPUT="css-viewer__input",e.CSS_VIEWER_INPUT_ERROR="css-viewer__input_error",e.CSS_VIEWER_HELP="css-viewer__help",e.HTML_VIEWER="html-viewer",e.HTML_VIEWER_CODE="html-viewer__code",e.SELECTABLE_CODE="selectable-code",e.CODE_SELECTED="code_selected",e.EDITOR_VIEWER="editor-viewer",e.TOOLTIP="tooltip",e.SELECTED="selected",e.PADDING_LEFT="padding-left",e.SIZE_SMALL="size-small"}(e||(e={})),function(e){e.MAIN="main",e.H1="h1",e.H2="h2",e.DIV="div",e.SECTION="section",e.SECTION_HEADER="div",e.SECTION_TITLE="label",e.TABLE_ITEM="div",e.EDITOR_VIEWER="div",e.LEVEL_VIEWER="div",e.LEVEL_LIST="ul",e.LEVEL_LIST_ITEM="li",e.CSS_VIEWER_CONTROLS="div",e.INPUT="input",e.BUTTON="button",e.BOARD_LEVEL_ORDER="h2",e.IMAGE="img",e.TOOLTIP="label"}(t||(t={}));class l{constructor(){this.htmlElement=this.createHtml()}getHtmlElement(){return this.htmlElement}}!function(e){e.DATA_ITEM_ID="data-item-id",e.DATA_ITEM_TOOLTIP="data-item-tooltip",e.DATA_LEVEL_ID="data-level-id",e.PLACEHOLDER="placeholder",e.TYPE="type",e.BUTTON="button",e.SRC="src",e.STYLE="style"}(s||(s={}));class i{static ElementFromHTML(e){const t=document.createElement("template");return t.innerHTML=e,t.content}static CreateElement(e,t,E){const s=document.createElement(e);if(void 0!==t&&(s.textContent=t),void 0!==E){const e=Array.from(Object.entries(E));for(let t=0;t<e.length;t+=1){const[E,n]=e[t];s.setAttributeNode(document.createAttribute(E)),s.setAttribute(E,n)}}return s}}class r extends l{constructor(){super(),this.HEADER_TITLE="CSS Viewer",this.HEADER_FILENAME="style.css",this.BUTTON_ENTER_CAPTION="Enter",this.BUTTON_HELP_CAPTION="Help",this.INPUT_PLACEHOLDER="Type in CSS selector",this.configureHtml()}configureHtml(){this.addHeader(),this.addControls(),this.addHelpBlock()}addControls(){const E=document.createElement(t.CSS_VIEWER_CONTROLS);E.classList.add(e.CSS_VIEWER_CONTROLS);const n=document.createElement(t.INPUT);n.setAttribute(s.PLACEHOLDER,this.INPUT_PLACEHOLDER),n.classList.add(e.CSS_VIEWER_INPUT);const l=document.createElement(t.BUTTON);l.setAttribute(s.TYPE,s.BUTTON),l.classList.add(e.CSS_VIEWER_BUTTON,e.CSS_VIEWER_BUTTON_ENTER),l.textContent=this.BUTTON_ENTER_CAPTION;const i=document.createElement(t.BUTTON);i.setAttribute(s.TYPE,s.BUTTON),i.classList.add(e.CSS_VIEWER_BUTTON),i.textContent=this.BUTTON_HELP_CAPTION,E.append(n,l,i),this.htmlElement.append(E)}addHeader(){const E=document.createElement(t.SECTION_HEADER);E.classList.add(e.SECTION_HEADER);const s=document.createElement(t.SECTION_TITLE);s.textContent=this.HEADER_TITLE;const n=document.createElement(t.SECTION_TITLE);n.textContent=this.HEADER_FILENAME,E.append(s,n),this.htmlElement.append(E)}addHelpBlock(){const E=document.createElement(t.EDITOR_VIEWER);E.classList.add(e.CSS_VIEWER_HELP);const s=i.ElementFromHTML('<div> {<br> /* Styles would go here. */<br> } <br> /* <br> Type a number to skip to a level.<br> Ex → "5" for level 5 <br>*/ </div>');E.append(s),this.htmlElement.append(E)}createHtml(){const E=document.createElement(t.SECTION);return E.classList.add(e.CSS_VIEWER),E}}!function(e){e.CODE_SELECTED="codeSelected",e.CODE_UNSELECTED="codeUnselected",e.HTML_SELECTED="htmlSelected",e.HTML_UNSELECTED="htmlUnselected",e.LEVEL_SELECTED="levelSelected",e.CLICK="click",e.KEY_DOWN="keydown",e.POINTER_ENTER="pointerenter",e.POINTER_LEAVE="pointerleave"}(n||(n={}));class c{constructor(){return this.items=new Map,this._listeners=new Map,c.storage}static getInstance(){return this.storage}setState(e,t){this.items.set(e,t),this.notify(e,t)}getState(e){return this.items.has(e)?this.items.get(e):null}subscribe(e,t){let E=this._listeners.get(e);E||(E=new Set,this._listeners.set(e,E)),E.add(t)}unsubscribe(e,t){const E=this._listeners.get(e);E&&E.delete(t)}notify(e,t){const E=this._listeners.get(e);E&&E.forEach((e=>e(t)))}}c.storage=new c;const T=c;class _{constructor(e){this.element=this.createElement(e)}getHtmlElement(){return this.element}createElement(E){const n=document.createElement(t.TOOLTIP);n.textContent=E.getAttribute(s.DATA_ITEM_TOOLTIP)||"";const l=E.getBoundingClientRect();return n.style.top=l.top-40+"px",n.style.left=(l.left+l.right)/2+"px",n.classList.add(e.TOOLTIP),n}}class o extends l{constructor(){super(),this.HEADER_TITLE="HTML Viewer",this.HEADER_FILENAME="table.html",this.mediator=T.getInstance(),this.configureHtml()}selectHandler(t){if(this instanceof HTMLElement){this.classList.add(e.CODE_SELECTED);const E=`.${e.TABLE_ITEM_SELECTABLE}[${s.DATA_ITEM_ID}="${t}"]`,n=document.querySelector(E);if(n instanceof HTMLElement){n.classList.add(e.TABLE_ITEM_SELECTED);const t=new _(n);document.body.append(t.getHtmlElement())}}}unselectHandler(t){this instanceof HTMLElement&&this.classList.remove(e.CODE_SELECTED);const E=`.${e.TABLE_ITEM_SELECTABLE}[${s.DATA_ITEM_ID}="${t}"]`,n=document.querySelector(E);if(n){n.classList.remove(e.TABLE_ITEM_SELECTED);const t=document.querySelector(`.${e.TOOLTIP}`);t&&t.remove()}}setEditorContent(t){const E=`.${e.HTML_VIEWER} .${e.EDITOR_VIEWER}`,s=document.querySelector(E);s&&s.replaceChildren(t),this.addEventListeners()}addEventListeners(){const t=`.${e.SELECTABLE_CODE}`;document.querySelectorAll(t).forEach((e=>{const t=e.getAttribute("data-item-id");e.addEventListener(n.POINTER_ENTER,this.selectHandler.bind(e,t)),e.addEventListener(n.POINTER_LEAVE,this.unselectHandler.bind(e,t))}))}configureHtml(){const E=document.createElement(t.SECTION_HEADER);E.classList.add(e.SECTION_HEADER);const s=document.createElement(t.SECTION_TITLE);s.textContent=this.HEADER_TITLE;const n=document.createElement(t.SECTION_TITLE);n.textContent=this.HEADER_FILENAME,E.append(s,n);const l=document.createElement(t.EDITOR_VIEWER);l.classList.add(e.EDITOR_VIEWER),this.htmlElement.append(E,l)}createHtml(){const E=document.createElement(t.SECTION);return E.classList.add(e.HTML_VIEWER),E}}class a extends l{constructor(e){super(),this.HEADER_TITLE="LEVELS",this.HEADER_FILENAME="",this.levels=e,this.configureHtml()}fillLevelsList(){const E=document.createElement(t.LEVEL_LIST);E.classList.add(e.LEVEL_VIEWER_LIST),E.addEventListener("click",this.selectLevel.bind(this)),this.levels.forEach((n=>{const l=document.createElement(t.LEVEL_LIST_ITEM);l.setAttribute(s.DATA_LEVEL_ID,String(n.id)),l.classList.add(e.LEVEL_VIEWER_LIST_ITEM),n.helpUsed?l.classList.add(e.LEVEL_DONE_WITH_HELP):n.done&&l.classList.add(e.LEVEL_DONE),l.textContent=`Level ${n.id}`,E.append(l)}));const n=`.${e.LEVEL_VIEWER} .${e.LEVEL_VIEWER_CONTENT}`,l=document.querySelector(n);l&&l.replaceChildren(E)}selectLevel(t){if(t.target instanceof HTMLElement&&t.target.classList.contains(e.LEVEL_VIEWER_LIST_ITEM)){const e=new CustomEvent(String(n.LEVEL_SELECTED),{bubbles:!0,detail:t.target.getAttribute(s.DATA_LEVEL_ID)});this.htmlElement.dispatchEvent(e)}}configureHtml(){const E=document.createElement(t.SECTION_HEADER);E.classList.add(e.SECTION_HEADER);const s=document.createElement(t.SECTION_TITLE);s.textContent=this.HEADER_TITLE;const n=document.createElement(t.SECTION_TITLE);n.textContent=this.HEADER_FILENAME,E.append(s,n);const l=document.createElement(t.LEVEL_VIEWER);l.classList.add(e.LEVEL_VIEWER_CONTENT),this.htmlElement.append(E,l)}createHtml(){const E=document.createElement(t.SECTION);return E.classList.add(e.LEVEL_VIEWER),E}}class L extends l{constructor(){super(),this.configureHtml()}selectHandler(t){if(this instanceof HTMLElement){this.classList.add(e.TABLE_ITEM_SELECTED);const E=`.${e.SELECTABLE_CODE}[${s.DATA_ITEM_ID}="${t}"]`,n=document.querySelector(E);if(n instanceof HTMLElement){n.classList.add(e.CODE_SELECTED);const t=new _(this);document.body.append(t.getHtmlElement())}}}unselectHandler(t){this instanceof HTMLElement&&this.classList.remove(e.TABLE_ITEM_SELECTED);const E=`.${e.SELECTABLE_CODE}[${s.DATA_ITEM_ID}="${t}"]`,n=document.querySelector(E);if(n){n.classList.remove(e.CODE_SELECTED);const t=document.querySelector(`.${e.TOOLTIP}`);t&&t.remove()}}setLevelOrder(t){const E=document.querySelector(`.${e.BOARD_LEVEL_ORDER}`);E&&(E.textContent=t)}hideActiveElement(){const t=`.${e.TABLE_ITEM_ACTIVE}`;this.htmlElement.querySelectorAll(t).forEach((t=>{t.classList.remove(e.TABLE_ITEM_ACTIVE),t.classList.add(e.TABLE_ITEM_GO_AWAY)}))}fillTable(t){const E=document.querySelector(`.${e.BOARD_ITEM_CONTAINER}`);E&&E.replaceChildren(t),this.addEventListeners()}addEventListeners(){const t=`.${e.TABLE_ITEM_SELECTABLE}`;document.querySelectorAll(t).forEach((e=>{const t=e.getAttribute("data-item-id");e.addEventListener(n.POINTER_ENTER,this.selectHandler.bind(e,t)),e.addEventListener(n.POINTER_LEAVE,this.unselectHandler.bind(e,t))}))}configureHtml(){const E=document.createElement(t.DIV);E.classList.add(e.BOARD_WRAPPER);const s=document.createElement(t.BOARD_LEVEL_ORDER);s.classList.add(e.BOARD_LEVEL_ORDER);const n=document.createElement(t.DIV);n.classList.add(e.BOARD_ITEM_CONTAINER),E.append(s,n),this.htmlElement.append(E)}createHtml(){const E=document.createElement(t.SECTION);return E.classList.add(e.BOARD),E}}var d=E(91),I=E.n(d),m=new URL(E(749),E.b),A=I()(m);const h='<div class="{{TABLE_ITEM}} {{TABLE_ITEM_SELECTABLE}}" {{DATA_ITEM_ID}}="0" {{DATA_ITEM_TOOLTIP}}="&lt;plate /&gt;"> <img class="{{TABLE_ITEM}} {{TABLE_ITEM_PLATE}} {{TABLE_ITEM_ACTIVE}}" src="'+A+'"> </div> <div class="{{TABLE_ITEM}} {{TABLE_ITEM_SELECTABLE}}" {{DATA_ITEM_ID}}="1" {{DATA_ITEM_TOOLTIP}}="&lt;plate /&gt;"> <img class="{{TABLE_ITEM}} {{TABLE_ITEM_PLATE}} {{TABLE_ITEM_ACTIVE}}" src="'+A+'"> </div>';class u{constructor(){this.LEVEL_TITLE="",this.viewElement=document.createDocumentFragment(),this.helpElement=document.createDocumentFragment(),this.answers=[]}getHelpElement(){return this.helpElement}getViewElement(){return this.viewElement}getLevelTitle(){return this.LEVEL_TITLE}getAnswer(){return this.answers}}class S extends u{constructor(){super(),this.LEVEL_TITLE="Select the plates",this.helpElement=this.createHelpElement('<div class="{{HTML_CODE}}"> &lt;div class="table"&gt; <div class="{{PADDING_LEFT}} {{SELECTABLE_CODE}}" {{DATA_ITEM_ID}}="0"> &lt;plate /&gt; </div> <div class="{{PADDING_LEFT}} {{SELECTABLE_CODE}}" {{DATA_ITEM_ID}}="1"> &lt;plate /&gt; </div> &lt;/div&gt; </div>'),this.viewElement=this.createViewElement(h),this.answers=["plate"]}createHelpElement(t){return i.ElementFromHTML(t.replace(/{{HTML_CODE}}/g,e.HTML_VIEWER_CODE).replace(/{{PADDING_LEFT}}/g,e.PADDING_LEFT).replace(/{{SELECTABLE_CODE}}/g,e.SELECTABLE_CODE).replace(/{{DATA_ITEM_ID}}/g,s.DATA_ITEM_ID))}createViewElement(t){return i.ElementFromHTML(t.replace(/{{DATA_ITEM_ID}}/g,s.DATA_ITEM_ID).replace(/{{DATA_ITEM_TOOLTIP}}/g,s.DATA_ITEM_TOOLTIP).replace(/{{TABLE_ITEM_SELECTABLE}}/g,e.TABLE_ITEM_SELECTABLE).replace(/{{TABLE_ITEM}}/g,e.TABLE_ITEM).replace(/{{TABLE_ITEM_PLATE}}/g,e.TABLE_ITEM_PLATE).replace(/{{TABLE_ITEM_ACTIVE}}/g,e.TABLE_ITEM_ACTIVE))}}class C{constructor(){this.storage=[],this.storage.push({id:1,done:!1,helpUsed:!1})}get length(){return this.storage.length}levelDone(e){console.log("levelId: ",e),this.storage[e-1].done=!0,this.storage[e-1].helpUsed=!1}getStorage(){return this.storage}getLevel(e){return 1===e?new S:null}}var O;!function(e){e.ENTER="Enter",e.NUMPAD_ENTER="NumpadEnter"}(O||(O={}));class D extends l{constructor(){super(),this.currentLevel=1,this.levelStorage=new C,this.levelView=new a(this.levelStorage.storage),this.boardView=new L,this.htmlViewerView=new o,this.cssViewerView=new r,this.htmlElement.append(this.boardView.getHtmlElement(),this.levelView.getHtmlElement(),this.htmlViewerView.getHtmlElement(),this.cssViewerView.getHtmlElement()),document.body.addEventListener(n.LEVEL_SELECTED,this.onSelectLevel.bind(this))}onSelectLevel(e){if(e instanceof CustomEvent){const t=Number(e.detail);this.loadLevel(t)}}onCheckCss(t){if(t instanceof MouseEvent||t instanceof KeyboardEvent&&(t.code===O.ENTER||t.code===O.NUMPAD_ENTER)){const t=document.querySelector(`.${e.CSS_VIEWER_INPUT}`);if(t instanceof HTMLInputElement){const E=this.levelStorage.getLevel(this.currentLevel);E&&(E.getAnswer().includes(t.value.trim())?(t.value="",this.levelStorage.levelDone(this.currentLevel),this.levelView.fillLevelsList(),this.boardView.hideActiveElement(),this.levelStorage.length<this.currentLevel?setTimeout((()=>{this.loadLevel(this.currentLevel+1)}),1e3):this.showCongrats()):(t.classList.add(e.CSS_VIEWER_INPUT_ERROR),setTimeout((()=>t.classList.remove(e.CSS_VIEWER_INPUT_ERROR)),1e3)))}}}showCongrats(){}initGame(){const t=this.onCheckCss.bind(this),E=document.querySelector(`.${e.CSS_VIEWER_BUTTON_ENTER}`);E&&(E.addEventListener(n.CLICK,t),this.loadLevel(this.currentLevel));const s=document.querySelector(`.${e.CSS_VIEWER_INPUT}`);s&&s.addEventListener(n.KEY_DOWN,t)}loadLevel(e){this.levelView.fillLevelsList();const t=this.levelStorage.getLevel(e);t&&(this.currentLevel=e,this.boardView.setLevelOrder(t.getLevelTitle()),this.htmlViewerView.setEditorContent(t.getHelpElement()),this.boardView.fillTable(t.getViewElement()))}createHtml(){const E=document.createElement(t.MAIN);return E.classList.add(e.MAIN),E}}new class{constructor(){this.init()}init(){const e=new D;document.body.append(e.getHtmlElement()),e.initGame()}}})()})();