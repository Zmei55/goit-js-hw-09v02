const t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")};t.startBtn.addEventListener("click",(()=>{e.start()})),t.stopBtn.addEventListener("click",(()=>{e.stop()})),r();const e={intervalId:null,isActive:!1,start(){this.isActive||(t.startBtn.setAttribute("disabled",!0),t.stopBtn.removeAttribute("disabled",!0),this.intervalId=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3))},stop(){clearInterval(this.intervalId),t.startBtn.removeAttribute("disabled",!0),r(),document.body.removeAttribute("style")}};function r(){t.stopBtn.setAttribute("disabled",!0)}
//# sourceMappingURL=01-color-switcher.23839762.js.map