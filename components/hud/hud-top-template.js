vue_app.component('hud-top-template', {
    mounted: function () {
        hud_top = document.getElementById('hud-top');
        hud_top.style.zoom = clHeight;
    },
    unmounted: function () {
        switchTemplate(false, 'hud_top');
        clearInterval(Hud.timeInterval);
        hud_top = null;
    },
    template:
        /*html*/
        `<div id="hud-top">
        <div class="hud-logo-block">
            <img id="hud-logo" src="libs/img/logotypes/default.png">
            <div class="logo-text-block">
                <div class="left-ltb">
                    <div class="player-online">
                        ${hud_top_svgs.user}
                        <span id="player-online" style="font-size:14px"></span>
                    </div>
                    <div id="player-id" style="font-size:11px">ID:</div>
                </div>
                <div class="right-ltb">
                    <div id="hud-time"></div>
                    <div id="hud-date" style="font-size:10px"></div>
                </div>
            </div>
        </div>
      </div>`
})