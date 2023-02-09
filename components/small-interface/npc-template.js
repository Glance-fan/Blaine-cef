vue_app.component('npc-template', {
    mounted: async function () {
        npc_tmpl = document.getElementById('npc-wrapper');
        await include_source(scripts.npc);
        resizeBigger(npc_tmpl);
        onRenderFinished('npc');
    },
    unmounted: function () {
        remove_source(scripts.npc);
        npc_tmpl = null;
        switchTemplate(false, 'npc')
    },
    template: /*html*/ `
        <div id="npc-wrapper">
            <div id="npc-choice-container">
                <div style="padding:0 0 40px 100px;justify-content:center;"><img src="libs/svgs/misc/npc.svg"></div>
            </div>
            <div></div>
        </div>`
})