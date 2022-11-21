vue_app.component('estate-agency-template', {
    mounted: async function () {
        estagency_tmpl = document.querySelector('#estate-agency');
        await include_source(scripts.est_agency);
        resizeBigger(estagency_tmpl);
        onRenderFinished('est_agency');
    },
    unmounted: function () {
        remove_source(scripts.est_agency);
        estagency_tmpl = null;
        switchTemplate(false, 'est_agency')
    },
    template: /*html*/ `
    <div id="estate-agency">
        <div>
            <div id="estate-agency-title"></div>
            <div class="estate-agency-options estate-agency-line"></div>
        </div>
        <div>
            <div class="close-template" onclick="mp.trigger('EstAgency::Close')">${close_svg}</div>
            <div id="estagency-info-wrapper" style="flex-direction:column;"></div>
            <div id="estagency-wrapper">
                <div>
                    <div class="estagency-section-title">Свободные</div>
                    <div id="estagency-scrollable">
                        <div id="estagency-container" class="estagency-section"></div>
                    </div>
                </div>
                <div>
                    <div class="estagency-section-title">Фильтр</div>
                    <div id="estagency-filter" class="estagency-section"></div>
                    <div id="estagency-output-wrapper" class="estagency-section"></div>
                </div>
            </div>
        </div>    
    </div>`
})