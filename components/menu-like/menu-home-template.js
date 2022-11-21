vue_app.component('menu-home-template', {
    mounted: async function () {
        menuhome_tmpl = document.querySelector('#menu-home');
        await include_source(scripts.menu_home);
        resizeBigger(menuhome_tmpl);
        onRenderFinished('menu_home');
    },
    unmounted: function () {
        remove_source(scripts.menu_home);
        menuhome_tmpl = null;
        switchTemplate(false, 'menu_home')
    },
    template: /*html*/ `
    <div id="menu-home">
        <div>
            <div id="menu-home-title"></div>
            <div class="menu-home-options menu-home-line"></div>
        </div>
        <div>
            <div class="close-template" onclick="mp.trigger('MenuHome::Close')">${close_svg}</div>
            <div id="menuhome-0-container"></div>
            <div id="menuhome-0-extracontainer"></div>
            <div id="menuhome-1-container"></div>
            <div id="menuhome-2-container" style="width: 800px"></div>
            <div id="menuhome-3-container"></div>
        </div>    
    </div>`
})