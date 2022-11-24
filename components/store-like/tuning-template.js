vue_app.component('tuning-template', {
    mounted: async function () {
        tuning_tmpl = document.querySelector('#tuning');
        await include_source(scripts.tuning);
        // resizeBigger(blips_tmpl);
        onRenderFinished('tuning');
    },
    unmounted: function () {
        remove_source(scripts.tuning);
        tuning_tmpl = null;
        switchTemplate(false, 'tuning')
    },
    template: /*html*/ `
    <div id="tuning">
        <div id="tuning-left-side">
            <div class="tuning-bg"></div>
            <div>
                <div id="tuning-left-scrollable">
                    <div class="tuning-bg" id="tuning-container"></div>
                </div>
                <div class="tuning-nav"></div>
            </div>   
            <div class="tuning-bg"></div>
        </div>
        <div id="tuning-right-side">
            <div class="tuning-bg"></div>
            <div style="width: 305px">
                <div id="tuning-right-scrollable">
                    <div class="tuning-bg" id="tuningvar-container"></div>
                </div>
            </div>
            
        </div>    
    </div>`
})