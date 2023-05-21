(()=>{"use strict";class e{static CreateElement({tag:e="div",text:t="",attr:s={}}={}){const i=document.createElement(e);t&&(i.textContent=t);const n=Array.from(Object.entries(s));for(let e=0;e<n.length;e+=1){const[t,s]=n[e];i.setAttributeNode(document.createAttribute(t)),i.setAttribute(t,s)}return i}static ElementFromHTML(e){const t=document.createElement("template");return t.innerHTML=e,t.content.firstChild}static getCssWidth(e){const{width:t}=e.getBoundingClientRect(),{paddingLeft:s,paddingRight:i}=getComputedStyle(e),{borderLeftWidth:n,borderRightWidth:l}=getComputedStyle(e);return t-Number.parseInt(s,10)-Number.parseInt(i,10)-Number.parseFloat(n)-Number.parseFloat(l)}}const t=['<link rel="apple-touch-icon" sizes="180x180" href="favicon-180x180.ico">','<link rel="icon" sizes="32x32" href="favicon-32x32.ico">','<link rel="icon" sizes="64x64" href="favicon-64x64.ico">','<link rel="icon" sizes="128x128" href="favicon-128x128.ico">','<link rel="icon" href="favicon.ico"></link>'].map((t=>e.ElementFromHTML(t))),s=1e3,i=({htmlElement:t,className:s=null})=>{const i=e.ElementFromHTML('<div class="popup"></div>');return i.addEventListener("wheel",(e=>e.preventDefault())),i.addEventListener("click",(e=>{e.target===i&&i.replaceWith("")})),t instanceof HTMLElement&&i.append(t),s&&s.split(" ").forEach((e=>i.classList.add(e))),i},n=({onClick:t=null,title:s,className:i=null})=>{const n=e.ElementFromHTML('<button class="button"></button>');return t&&n.addEventListener("click",t),n.innerHTML=s,i&&i.split(" ").forEach((e=>n.classList.add(e))),n};class l{constructor(t){this.element=e.ElementFromHTML('<div class="mine-selector">\n  <label class="mine-selector__label">\n    <div class="mine-selector__caption">\n      Mines:&nbsp;<span class="mine-selector__value"></span>\n    </div>\n    <input class="mine-selector__input" type="range" min="10" max="99" step="1">\n  </label>\n</div>'),this.element.addEventListener("input",this.onInput.bind(this)),this.inputElement=this.element.querySelector(".mine-selector__input"),this.valueElement=this.element.querySelector(".mine-selector__value"),this.value=t}getElement(){return this.element}get value(){return+this.inputElement.value}set value(e){this.valueElement.textContent=e,this.inputElement.value=e}onInput(e){this.valueElement.textContent=e.target.value}}class a{constructor(t){this.element=e.ElementFromHTML('<div class="size-selector">\n  <label class="size-selector__label">\n    <input class="size-selector__input size-selector-easy" name="size" type="radio" value="10">\n    easy (10x10)\n  </label>\n  <label class="size-selector__label">\n    <input class="size-selector__input size-selector-medium" name="size" type="radio" value="15">\n    medium (15x15)\n  </label>\n  <label class="size-selector__label">\n    <input class="size-selector__input size-selector-hard" name="size" type="radio" value="25">\n    hard (25x25)\n  </label>\n</div>'),this.value=t,this.init()}init(){Array.from(this.element.querySelectorAll(".size-selector__input")).forEach((e=>{this.value===+e.value&&e.setAttribute("checked",""),e.addEventListener("change",this.onChange.bind(this))}))}onChange(e){this.value=+e.target.value}getElement(){return this.element}}class o{constructor(){this.ID={NEWGAME:"newgame",WIN:"win",LOSE:"lose",PAUSE:"pause"}}getEvent(e,t){const s=Array.from(Object.entries(this.ID));for(let i=0;i<s.length;i+=1){const[,n]=s[i];if(n===e)return new CustomEvent(e,{bubbles:!0,detail:t})}return null}}class r{constructor(){this.sizeSelector=new a(10),this.mineSelector=new l(10),this.buttonOK=n({onClick:this.onClickOk.bind(this),title:"OK",className:"button-OK"}),this.events=new o,this.init()}init(){const t=e.ElementFromHTML('<div class="new-game">\n  <p class="new-game__title">New game</p>\n</div>');t.append(this.sizeSelector.getElement()),t.append(this.mineSelector.getElement()),this.element=i({htmlElement:t}),t.append(this.buttonOK)}getElement(){return this.element}onClickOk(){const e=this.mineSelector.value,t=this.sizeSelector.value;this.element.dispatchEvent(this.events.getEvent(this.events.ID.NEWGAME,{mines:e,size:t})),this.element.replaceWith("")}}class h{constructor(){this.element=e.ElementFromHTML('<header class="header wrapper"></header>'),this.buttonNewGame=n({onClick:this.showNewGamePopup.bind(this),title:"New game",className:"button-start"}),this.buttonRestore=n({title:"Restore",className:"button_disabled button-restore"}),this.buttonSave=n({title:"Save",className:"button-save"}),this.buttonResults=n({title:"Top 10",className:"button-results"}),this.newGame=new r,this.init()}init(){this.element.append(this.buttonNewGame),this.element.append(this.buttonRestore),this.element.append(this.buttonSave),this.element.append(this.buttonResults)}getElement(){return this.element}showNewGamePopup(){document.body.append(this.newGame.getElement())}}class d{constructor(){this.element=e.ElementFromHTML('<div class="field" data-id="0"></div>')}getElement(e,t){const s=this.element.cloneNode({deep:!0});switch(s.dataset.id=t,e){case 0:s.classList.add("field_hidden");break;case 1:s.classList.add("field_open");break;case 2:s.classList.add("field_marked");break;case 3:s.classList.add("field_mine");break;case 4:s.classList.add("field_explosion");break;case 5:s.classList.add("field_question")}return s}static setColor(e,t){e.classList.add(`field_mines${t}`)}}class c{static getElement(){return e.ElementFromHTML('<div class="playground wrapper"></div>')}}class u{init(e,t){this.element=c.getElement(),this.field=new d,this.size=e,this.minesCount=t,this.fields=[],this.mines=[],this.openedField=0,this.markedField=0,this.initContent(),this.getResizedElement(),this.fillPlaygroundElement(this.element)}restoreState(e){Object.assign(this.fields,e),this.size=this.fields.length,this.mines.length=0,this.openedField=0,this.markedField=0,this.mines=e.flat().filter((({state:e,content:t})=>(1===e&&(this.openedField+=1),2===e&&(this.markedField+=1),t>=s))).map((({id:e})=>this.getPosition(e))),this.minesCount=this.mines.length}initContent(){for(let e=0;e<this.size;e+=1)this.fields.push(Array.from({length:this.size}).map(((t,s)=>({state:0,content:0,id:e*this.size+s}))))}getResizedElement(){switch(this.size){case 15:this.element.classList.add("playground_medium");break;case 25:this.element.classList.add("playground_hard");break;default:this.element.classList.add("playground_easy")}}initMines(e){for(let t=0;t<this.minesCount;t+=1){const t=this.getExcludeRandom(0,this.fields.length**2-1,+e),i=this.getPosition(t);this.fields[i.row][i.column].content=s,this.mines.push(i)}this.countMineNeighbors(),this.openedField=0,this.markedField=0}fillPlaygroundElement(e){for(let t=0;t<this.size**2;t+=1)e.append(this.field.getElement(0,t))}isWinPosition(){return this.size**2-this.openedField===this.markedField}getPosition(e){const t=+e%this.size;return{row:Math.floor(+e/this.size),column:t}}countMineNeighbors(){for(let e=0;e<this.mines.length;e+=1)this.getFieldHeighbors(this.mines[e]).forEach((e=>{this.fields[e.row][e.column].content+=1}))}getFieldHeighbors({row:e,column:t}){const s=[];return e>0&&t>0&&s.push({row:e-1,column:t-1}),e>0&&s.push({row:e-1,column:t}),e>0&&t<this.size-1&&s.push({row:e-1,column:t+1}),t>0&&s.push({row:e,column:t-1}),t>0&&e<this.size-1&&s.push({row:e+1,column:t-1}),e<this.size-1&&s.push({row:e+1,column:t}),e<this.size-1&&t<this.size-1&&s.push({row:e+1,column:t+1}),t<this.size-1&&s.push({row:e,column:t+1}),s}getExcludeRandom(e,t,s){if(+s<e||+s>t)return null;let i;do{i=Math.floor(e+Math.random()*(t-e+1))}while(i===+s||this.mines.map((({row:e,column:t})=>e*this.size+t)).includes(i));return i}getFieldData(e){const{row:t,column:s}=this.getPosition(+e);return this.fields[t][s]}setFieldState(e,t){const{row:s,column:i}=this.getPosition(+e);this.fields[s][i].state=t,1===t&&(this.openedField+=1),2===t&&(this.markedField+=1)}getMines(){return this.mines}getField(){return this.fields}}class m{constructor({title:e,className:t=null}){this.title=e,this.className=t,this.init()}init(){this.element=e.ElementFromHTML('<div class="counter">\n  <span class="counter__title"></span>\n  <span class="counter__value">0</span>\n</div>'),this.element.querySelector(".counter__title").innerHTML=this.title,this.className&&this.className.split(" ").forEach((e=>this.element.classList.add(e)))}getElement(){return this.element}get value(){const e=this.element.querySelector(".counter__value").textContent;return Number.isFinite(+e)?+e:e}set value(e){this.element.querySelector(".counter__value").textContent=e}}class p{constructor(){this.intervalID=null,this.startTime=null,this.passedTime=0,this.resumedTime=0,this.element=new m({title:"Time",className:"counter-time"}),this.element.value="00:00"}restoreState(e){this.resumedTime=e}getElement(){return this.element.getElement()}get value(){return this.passedTime}set value(e){this.element.value=e}reset(){this.intervalID&&(clearInterval(this.intervalID),this.intervalID=0,this.startTime=null,this.passedTime=0,this.resumedTime=0,this.value=this.toString())}start(){this.startTime=Date.now(),this.intervalID=setInterval((()=>{this.passedTime=Date.now()-this.startTime+this.resumedTime,this.value=this.toString()}),1e3)}stop(){this.intervalID&&clearInterval(this.intervalID)}toString(){const e=Math.trunc(.001*this.passedTime),t=Math.trunc(e/3600),s=Math.trunc((e-3600*t)/60),i=e%60;return`${s<10?`0${s}`:s} : ${i<10?`0${i}`:i}`}}class g{constructor(){this.counterMines=new m({title:"Mines",className:"counter-mines"}),this.counterFlags=new m({title:"Flags",className:"counter-flags"}),this.counterSteps=new m({title:"Steps",className:"counter-steps"}),this.counterTime=new p,this.init()}init(){this.element=e.ElementFromHTML('<section class="statistics wrapper"></section>'),this.element.append(this.counterMines.getElement()),this.element.append(this.counterFlags.getElement()),this.element.append(this.counterSteps.getElement()),this.element.append(this.counterTime.getElement())}getElement(){return this.element}}class v{constructor(){this.audioStep=new Audio("./assets/audio/step.mp3"),this.audioWin=new Audio("./assets/audio/win.mp3"),this.audioLose=new Audio("./assets/audio/lose.mp3"),this.audioFlag=new Audio("./assets/audio/flag.mp3"),this.init()}init(){this.element=e.ElementFromHTML('<div class="sound">\n  <div class="sound__label">\n    sound\n    <input class="sound__switch" type="checkbox" checked>\n  </div>\n</div>');const t=this.element.querySelector(".sound__switch");this.soundOn=t.checked,t.addEventListener("change",this.onChange.bind(this))}onChange(e){this.soundOn=e.target.checked}getElement(){return this.element}restoreState(e){this.element.querySelector(".sound__switch").checked=e}}class b{constructor(){this.sound=new v,this.init()}init(){this.element=e.ElementFromHTML('<footer class="footer wrapper"></footer>'),this.element.append(this.sound.getElement())}getElement(){return this.element}}const E={loseRound:"Game over. Try again!",winRound:"Hooray! You found all mines in %1 seconds and %2 moves!"};class y{static RestoreState(){return JSON.parse(JSON.parse(localStorage.getItem("minesweeper")))}static SaveState(e){localStorage.setItem("minesweeper",JSON.stringify(e))}}class f{constructor(){this.playground=new u,this.field=new d,this.events=new o,this.statistics=new g,this.footer=new b,this.sound=this.footer.sound,this.timer=this.statistics.counterTime}init(e,t){this.playground.init(e,t),this.header=new h,f.clearBody(),document.body.append(this.header.getElement()),document.body.append(this.statistics.getElement()),document.body.append(this.playground.element),document.body.append(this.footer.getElement()),this.playground.element.addEventListener("click",this.onPlaygroundClick.bind(this)),this.playground.element.addEventListener("contextmenu",this.onPlaygroundRightClick.bind(this)),document.body.addEventListener(this.events.ID.WIN,this.onWin.bind(this)),document.body.addEventListener(this.events.ID.LOSE,this.onLose.bind(this)),document.body.addEventListener(this.events.ID.NEWGAME,this.onNewGame.bind(this)),this.header.buttonSave.addEventListener("click",this.onSaveState.bind(this)),this.header.buttonRestore.addEventListener("click",this.onRestoreState.bind(this)),this.checkStorage()}checkStorage(){y.RestoreState()&&this.enableRestore()}enableRestore(){this.header.buttonRestore.classList.remove("button_disabled")}enableSave(){this.header.buttonSave.classList.remove("button_disabled")}disableSave(){this.header.buttonSave.classList.add("button_disabled")}onRestoreState(){const{fields:e,steps:t,time:s,sound:i,results:n}=y.RestoreState();this.timer.stop(),this.statistics.counterSteps.value=t,this.sound.restoreState(i),this.playground.restoreState(e),this.restorePlayground(),this.timer.restoreState(s),this.timer.start()}restorePlayground(){const e=Array.from(this.playground.element.querySelectorAll(".field"));for(let t=0;t<e.length;t+=1){const s=e[t],{state:i,content:n}=this.playground.getFieldData(+s.dataset.id);this.changeFieldState(s,n,i,!0)}this.statistics.counterFlags.value=this.playground.markedField,this.statistics.counterMines.value=this.playground.mines.length-this.playground.markedField}onSaveState(){const e={fields:this.playground.fields,steps:this.statistics.counterSteps.value,time:this.timer.value,sound:this.sound.soundOn,result:{}};y.SaveState(JSON.stringify(e)),this.enableRestore()}static clearBody(){document.body.replaceWith(document.createElement("body"))}onPlaygroundRightClick(e){if(e.preventDefault(),!e.target.classList.contains("field"))return;const t=e.target,s=+t.dataset.id,{state:i,content:n}=this.playground.getFieldData(s);switch(1!==i&&this.playSound(this.sound.audioFlag),i){case 0:this.incrementFlag(),this.changeFieldState(t,n,2),this.playground.isWinPosition()&&document.body.dispatchEvent(this.events.getEvent(this.events.ID.WIN));break;case 2:this.decrementFlag(),this.changeFieldState(t,n,5);break;case 5:this.changeFieldState(t,n,0)}}onPlaygroundClick(e){if(!e.target.classList.contains("field"))return;this.playSound(this.sound.audioStep);const t=e.target,i=+t.dataset.id;this.playground.mines.length||this.startRound(i);const{state:n,content:l}=this.playground.getFieldData(i);if(0===n){if(this.incrementStep(),l>=s)return this.changeFieldState(t,l,4),void document.body.dispatchEvent(this.events.getEvent(this.events.ID.LOSE));this.changeFieldState(t,l,1),l||this.openHeighbors(t),this.playground.isWinPosition()&&document.body.dispatchEvent(this.events.getEvent(this.events.ID.WIN))}}playSound(e){this.sound.soundOn&&e.play()}incrementStep(){this.statistics.counterSteps.value+=1}incrementFlag(){this.statistics.counterFlags.value+=1,this.statistics.counterMines.value-=1}decrementFlag(){this.statistics.counterFlags.value-=1,this.statistics.counterMines.value+=1}openHeighbors(e){const t=this.playground.getFieldHeighbors(this.playground.getPosition(+e.dataset.id));for(let e=0;e<t.length;e+=1){const{row:s,column:i}=t[e],{state:n,content:l}=this.playground.fields[s][i],a=this.playground.size*s+i,o=this.playground.element.querySelector(`[data-id="${a}"]`);0===n&&(this.changeFieldState(o,l||"",1),l||this.openHeighbors(o))}}changeFieldState(e,t,s,i){i||this.playground.setFieldState(+e.dataset.id,s);const n=this.field.getElement(s,+e.dataset.id);n.textContent=t||"",t&&1===s&&d.setColor(n,t),e.replaceWith(n)}openPlayground(){const e=Array.from(this.playground.element.querySelectorAll(".field"));for(let t=0;t<e.length;t+=1){const i=e[t],{state:n,content:l}=this.playground.getFieldData(+i.dataset.id);0!==n&&2!==n&&5!==n||this.changeFieldState(i,l,l<s?1:3)}}onNewGame(e){const{mines:t,size:s}=e.detail;this.init(s,t),this.statistics.counterMines.value=0,this.statistics.counterSteps.value=0,this.statistics.counterFlags.value=0,this.timer.reset()}startRound(e){this.playground.initMines(+e),this.statistics.counterMines.value=this.playground.mines.length,this.statistics.counterSteps.value=0,this.timer.reset(),this.timer.start()}onWin(){this.timer.stop(),this.playSound(this.sound.audioWin),this.openPlayground();const t=E.winRound.replace("%1",Math.trunc(this.timer.value/1e3)).replace("%2",this.statistics.counterSteps.value),s=e.CreateElement({text:t,attr:{class:"popup__title_win popup__title"}}),n=i({htmlElement:s});document.body.append(n)}onLose(){this.timer.stop(),this.playSound(this.sound.audioLose),this.openPlayground();const t=e.CreateElement({text:E.loseRound,attr:{class:"popup__title_lose popup__title"}}),s=i({htmlElement:t});document.body.append(s)}}t.forEach((e=>document.head.append(e))),(new f).init(10,10)})();
//# sourceMappingURL=app.7e24fa1602e7c8d09892.js.map