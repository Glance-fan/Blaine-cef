vue_app.component('lock-picking-template', {
    mounted: async function () {
        lp_tmpl = document.getElementById('lock-picking-game');
        await include_source(scripts.mg);
        resizeSmaller(lp_tmpl);
        onRenderFinished('lock_picking');
    },
    unmounted: function () {
        remove_source(scripts.mg);
        lp_tmpl = null;
        switchTemplate(false, 'lock_picking')
    },
    template: /*html*/ `
        <div id="lock-picking-game" class="minigame-bg">
            <div>
                Взломайте замок, вращая отмычку<br>и удерживая ПКМ в вероятно<br>верном месте
            </div>
            <div id="lock-picking-wrapper">
                <div id="lockpick-elem"></div>
                <div id="lock-wrapper">
                    <div id="lock-elem"></div>
                </div>
            </div>
        </div>`
})