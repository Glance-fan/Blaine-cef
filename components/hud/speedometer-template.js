vue_app.component('speedometer-template', {
    mounted: function () {
        hud_spd = document.getElementById('speedometer');
        hud_spd.style.zoom = clHeight;
    },
    unmounted: function () {
        switchTemplate(false, 'hud_spd');
        hud_spd = null;
    },
    template:
        /*html*/
        `<div id="speedometer">
            <canvas id="spd-canvas">spd</canvas>
            <div class="speed-vars-wrapper">
                <div class="speed-vars">
                    <div class="speed">
                    <p>
                        <span id="speed-first">0</span>
                        <span id="speed-second">0</span>
                        <span id="speed-third">0</span>
                        <br>
                        <span style="font-size: 30px;color: white;">КМ/Ч</span>
                    </p>
                    </div>
                    <div class="spd-fuel">
                        ${hud_spd_svgs.fuel}
                        <span id="spd-fuel-amount"> 0 л</span>
                    </div>
                    <div class="mileage">
                        <span style="color: white;" id="mileage-left">345</span>
                        <span style="color: #595959;" id="mileage-right">000</span>
                    </div>
                    ${hud_spd_svgs.cruise}
                    <div class="speed-conditions">
                        ${hud_spd_svgs.larrow}${hud_spd_svgs.rarrow}${hud_spd_svgs.doors}${hud_spd_svgs.lights}${hud_spd_svgs.belt}${hud_spd_svgs.engine}
                    </div>
                </div>
            </div>
        </div>`
})