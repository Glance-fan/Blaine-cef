vue_app.component('death-match-template', {
    mounted: async function () {
        dm_tmpl = document.getElementById('death-match');
        await include_source(scripts.dm);
        resizeBigger(dm_tmpl);
        onRenderFinished('death-match');
    },
    unmounted: function () {
        remove_source(scripts.dm);
        dm_tmpl = null;
        switchTemplate(false, 'death-match')
    },
    template: /*html*/ `
        <div id="death-match">
            <div>
                <div class="dm-team-name">T1</div>
                <div class="dm-team-score">0</div>
            </div>
            <div>
                <div class="dm-team-score">0</div>
                <div class="dm-team-name">T2</div>
            </div>
        </div>`
})