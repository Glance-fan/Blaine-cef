vue_app.component('npc-template', {
    mounted: async function () {
        npc_tmpl = document.getElementById('npc');
        await include_source(scripts.npc);
        resizeBigger(npc_tmpl);
        onRenderFinished('npc');
    },
    updated: function () {
        document.documentElement.onkeydown = null;
    },
    unmounted: function () {
        remove_source(scripts.npc);
        npc_tmpl = null;
        switchTemplate(false, 'npc')
    },
    template: /*html*/ `
        <div id="npc">
            <div id="npc-wrapper">
                <div style="padding:0 0 40px 100px;justify-content:center;"><img src="libs/svgs/misc/npc.svg"></div>
                <div id="npc-choice-container"></div>
            </div>
            <div></div>
        </div>`
})