vue_app.component('menu-biz-template', {
    mounted: async function () {
        await include_source(scripts.menu_biz);
        menubiz_tmpl = document.querySelector('#menu-biz');
        resizeBigger(menubiz_tmpl);
        onRenderFinished('menu_biz');
    },
    unmounted: function () {
        remove_source(scripts.menu_biz);
        menubiz_tmpl = null;
        switchTemplate(false, 'menu_biz')
    },
    template: /*html*/ `
    <div id="menu-biz">
        <div>
            <div class="menu-biz-title"></div>
            <div class="menu-biz-options menu-biz-line"></div>
        </div>
        <div>
            <div class="close-template" onclick="mp.trigger('MenuBiz::Close')">${close_svg}</div>
            <div id="menubiz-0-container"></div>
            <div id="menubiz-1-container"></div>
            <div id="menubiz-2-container"></div>
        </div>    
    </div>`
})