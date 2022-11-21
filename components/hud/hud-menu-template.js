vue_app.component('hud-menu-template', {
    mounted: function () {
        hud_menu = document.getElementById('hud-menu');
        resizeBigger(hud_menu);
    },
    unmounted: function () {
        switchTemplate(false, 'hud_menu');
        hud_menu = null;
    },
    template:
        /*html*/
        `<div id="hud-menu"></div>`
})