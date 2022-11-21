vue_app.component('atm-template', {
    mounted: async function () {
        atm_tmpl = document.getElementById('atm');
        await include_source(scripts.atm);
        resizeBigger(atm);
		onRenderFinished('atm');
    },
    unmounted: function () {
        remove_source(scripts.atm);
        switchTemplate(false, 'atm');
        atm_tmpl = null;
    },
    template:
        /*html*/`
        <div id="atm">
            <div></div>
            <div>
                <div id="atm-wrapper">
                    <div>
                        <span>У вас на счете - </span>
                        <span id="atm-cur-money"></span>
                    </div>
                    <div id="atm-container">
                        <div>Количество</div>
                        <div>
                            $
                            <input oninput="ATM.oninput(this)" onfocus="ATM.onfocus(this)" onblur="this.parentElement.style.animation = '';" value="" maxlength="10" autocomplete="false" spellcheck="false" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32"/>
                        </div>
                        <div>
                            <button class="red-button" onclick="ATM.onbutton('deposit')">Пополнить</button>
                            <button class="grey-button" onclick="ATM.onbutton('withdraw')">Снять</button>
                        </div>
                    </div>
                    <div>
                        <span>Комиссия за снятие наличных - </span>
                        <span id="atm-commis"></span>
                    </div>
                </div>
            </div>
        </div>`
})