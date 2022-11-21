vue_app.component('animations-template', {
    mounted: async function () {
        anims_tmpl = document.querySelector('#animations');
        await include_source(scripts.anims);
        anims_tmpl.style.bottom = (document.body.clientHeight / 100 * (300 / 10.8)) + 'px';
        resizeBigger(anims_tmpl);
        onRenderFinished('anims');
    },
    unmounted: function () {
        remove_source(scripts.anims);
        anims_tmpl = null;
        switchTemplate(false, 'anims')
    },
    template: /*html*/ `
    <div id="animations">
        <div>
            <div></div>
            <div class="anims-line anims-options"></div>
        </div>
        <div>
            <div id="animations-left-wrapper" style="display: none">
                <div></div>
                <div id="animations-scrollable">
                    <div id="animations-container"></div>
                </div>
            </div>
        </div>    
    </div>`
})