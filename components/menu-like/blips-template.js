vue_app.component('blips-template', {
    mounted: async function () {
        blips_tmpl = document.querySelector('#blips');
        await include_source(scripts.blips);
        resizeBigger(blips_tmpl);
        Blips.draw();
        onRenderFinished('blips');
    },
    unmounted: function () {
        remove_source(scripts.blips);
        blips_tmpl = null;
        switchTemplate(false, 'blips')
    },
    template: /*html*/ `
    <div id="blips">
        <div></div>
        <div>
            <div class="close-template" onclick="mp.trigger('BlipMenu::Close')">${close_svg}</div>
            <div id="blips-wrapper">
                <div>
                    <div style="font-weight:700" id="blips-amount"></div>
                    <div id="blips-scrollable">
                        <div id="blips-container" class="blips-bg"></div>
                    </div>
                </div>
                <div>
                    <div id="blips-color-wrapper">
                        <div style="font-weight:700">Цвет</div>
                        <div class="blips-bg"></div>
                    </div>
                    <div id="blips-icon-wrapper">
                        <div style="font-weight:700">Иконка</div>
                        <div id="blips-icon-scrollable">
                            <div id="blips-icon-container" class="blips-bg"></div>
                        </div>
                    </div>
                    <div id="blips-settings-wrapper" class="blips-bg"></div>
                </div>
            </div>
            <div id="blips-button-wrapper"></div>
        </div>    
    </div>`
})