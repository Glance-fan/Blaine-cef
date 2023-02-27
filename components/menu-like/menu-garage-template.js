vue_app.component('menu-garage-template', {
    mounted: async function () {
        menugar_tmpl = document.querySelector('#menu-garage');
        await include_source(scripts.menu_gar);
        resizeBigger(menugar_tmpl);
        onRenderFinished('menu_gar');
    },
    unmounted: function () {
        remove_source(scripts.menu_gar);
        menugar_tmpl = null;
        switchTemplate(false, 'menu_gar')
    },
    template: /*html*/ `
    <div id="menu-garage">
        <div></div>
        <div>
            <div class="close-template" onclick="mp.trigger('MenuGar::Close')">${close_svg}</div>
            <div id="menugar-wrapper">
                <div>
                    <div style="font-weight:700" id="menugar-amount"></div>
                    <div id="menugar-scrollable">
                        <div id="menugar-container"></div>
                    </div>
                </div>
                <div>
                    <div id="menugar-info-wrapper-1">
                        <div style="font-weight:700" id="menugar-garage"></div>
                        <div><div id="menugar-info"></div></div>
                    </div>
                    <div id="menugar-info-wrapper-2"></div>
                </div>
            </div>
        </div>    
    </div>`
})