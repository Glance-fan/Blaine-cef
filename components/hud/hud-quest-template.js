vue_app.component('hud-quest-template', {
    mounted: function () {
        hud_quest = document.getElementById('hud-quest');
        hud_quest.style.setProperty('margin-top', `${document.body.clientHeight / 100 * (224/10.8)}px`);
        hud_quest.style.zoom = clHeight;
    },
    unmounted: function () {
        switchTemplate(false, 'hud_quest');
        hud_quest = null;
    },
    template:
        /*html*/
        `<div id="hud-quest">
            <div class="hud-quest-content"></div>
            <div class="hud-quest-line"></div>
        </div>`
})