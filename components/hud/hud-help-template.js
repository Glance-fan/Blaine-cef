vue_app.component('hud-help-template', {
    data() {
        return {
            loading: true
        }
    },
    mounted: function () {
        hud_help = document.getElementById('hud-help');
        hud_help.style.zoom = clHeight;
    },
    updated: function () {
        if (this.loading && mountedApp.show['hud_help']) {
            Hud.drawHelp();
            this.loading = false;
        }
    },
    unmounted: function () {
        switchTemplate(false, 'hud_help');
        this.loading = true;
        hud_help = null;
    },
    template:
        /*html*/
        `<div id="hud-help"></div>`
})