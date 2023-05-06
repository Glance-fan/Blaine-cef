vue_app.component('casino-template', {
    mounted: async function () {
        casino_tmpl = document.getElementById('casino');
        await include_source(scripts.casino);
        resizeBigger(casino_tmpl);
        onRenderFinished('casino');
    },
    unmounted: function () {
        remove_source(scripts.casino);
        casino_tmpl = null;
        switchTemplate(false, 'casino')
    },
    template: /*html*/ `
        <div id="casino">
            <div id="casino-last-numbers"></div>
            <div id="casino-container">
                <div>
                    <div style="font-size: 20px;">Ваша ставка</div>
                    <div class="casino-input-block">
                        <div onclick="Casino.onminus()"><img src="libs/svgs/misc/minus.svg"></div>
                        <input oninput="Casino.oninput(this)" maxlength="4" autocomplete="false" spellcheck="false" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32"/>
                        <div onclick="Casino.onplus()"><img src="libs/svgs/misc/plus.svg"></div>
                    </div>
                </div>
                <div class="casino-balance">
                    <img src="libs/svgs/minigames/casino.svg">
                    <div id="casino-delta-bal">0</div>
                    <div id="casino-cur-bal">0</div>
                </div>
                <div>
                    <div style="font-size: 20px;white-space:nowrap">Статус игры</div>
                    <div id="casino-game-status">0</div>
                </div>
            </div>
        </div>`
})