vue_app.component('menu-frac-template', {
    mounted: async function () {
        menufrac_tmpl = document.querySelector('#menu-frac');
        await include_source(scripts.menu_frac);
        resizeBigger(menufrac_tmpl);
        onRenderFinished('menu_frac');
    },
    unmounted: function () {
        remove_source(scripts.menu_frac);
        menufrac_tmpl = null;
        switchTemplate(false, 'menu_frac')
    },
    template: /*html*/ `
    <div id="menu-frac">
        <div>
            <div id="menu-frac-title">
                <img src="libs/svgs/menu-frac/1.svg">меню<br>фракции
            </div>
            <div class="menu-frac-options menu-frac-line"></div>
        </div>
        <div>
            <div class="close-template" onclick="mp.trigger('MenuFrac::Close')">${close_svg}</div>
        </div>    
    </div>`
})