vue_app.component('hud-interact-template', {
    mounted: function () {
        hud_interact = document.getElementById('hud-interact');
        hud_interact.style.bottom = (document.body.clientHeight / 100 * (312 / 10.8)) + 'px';
    },
    updated: function () {
        if (!mountedApp.show['hud_interact']) document.body.removeAttribute('onkeyup');
    },
    unmounted: function () {
        switchTemplate(false, 'hud_interact');
        hud_interact = null;
    },
    template:
        /*html*/
        `<div id="hud-interact" style="left: calc(50% - 150px)">
            Нажмите
            <div class="hud-interact-btn">E</div>
            <div class="hud-interact-text"></div>
        </div>`
})