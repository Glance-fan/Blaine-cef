vue_app.component('npc-template', {
    mounted: async function () {
        await include_source(scripts.npc);
        npc_tmpl = document.getElementById('NPC-container');
        resizeBigger(npc_tmpl);
        onRenderFinished('NPC');
    },
    unmounted: function () {
        remove_source(scripts.npc);
        npc_tmpl = null;
        switchTemplate(false, 'npc')
    },
    template: /*html*/ `<div id="NPC-container"></div>`
})