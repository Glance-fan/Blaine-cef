vue_app.component('interaction-template', {
    mounted: async function () {
        inter_tmpl = document.querySelector('#interaction-container');
        await include_source(scripts.interaction);
        resizeBigger(inter_tmpl);
        onRenderFinished('interaction');
    },
    unmounted: function () {
        remove_source(scripts.interaction);
        inter_tmpl = null;
        switchTemplate(false, 'interaction')
    },
    template: /*html*/ `
    <div id="interaction-container">
        <div id="inter-wheel" data-wheelnav></div>
        <div class="close-interaction">Закрыть<br>меню</div>
    </div>`
})