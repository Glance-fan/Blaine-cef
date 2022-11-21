vue_app.component('menu-bank-template', {
    mounted: async function () {
        menubank_tmpl = document.querySelector('#menu-bank');
        await include_source(scripts.menu_bank);
        resizeBigger(menubank_tmpl);
        onRenderFinished('menu_bank');
    },
    unmounted: function () {
        remove_source(scripts.menu_bank);
        menubank_tmpl = null;
        switchTemplate(false, 'menu_bank')
    },
    template: /*html*/ `
    <div id="menu-bank">
        <div>
            <div id="menu-bank-title"></div>
            <div class="menu-bank-options menu-bank-line"></div>
        </div>
        <div>
            <div class="close-template" onclick="mp.trigger('MenuBank::Close')">${close_svg}</div>
            <div id="menubank-0-container"></div>
            <div id="menubank-1-container"></div>
            <div id="menubank-2-container"></div>
        </div>    
    </div>`
})