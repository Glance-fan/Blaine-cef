vue_app.component('hud-left-template', {
    mounted: function () {
        hud_left = document.getElementById('hud-left');
        hud_left.style.setProperty('left', `${document.body.clientWidth / 100 * (299/19.2)}px`)
        hud_left.style.setProperty('bottom', `${document.body.clientHeight / 100 * (13/10.8)}px`);
    },
    unmounted: function () {
        switchTemplate(false, 'hud_left');
        hud_left = null;
    },
    template:
        /*html*/
        `<div id="hud-left">
            <div class="hud-left-row hud-states-wrapper">
            ${hud_left_svgs.food}${hud_left_svgs.mood}${hud_left_svgs.sick}${hud_left_svgs.wounded}${hud_left_svgs.snorkel}
            </div>
            <div class="hud-left-row" style="margin: 10px 0">
                <div class="hl-money">
                    <div>
                        ${hud_left_svgs.cash}
                        <span id="hud-cash">$0</span>
                    </div>
                    <div>
                        ${hud_left_svgs.bank}
                        <span id="hud-bank">$0</span>
                    </div>
                </div>
                <div class="hud-states-wrapper" style="display:flex">
                ${hud_left_svgs.shield}${hud_left_svgs.fish}
                </div>
            </div>
            <div class="hud-left-row">
                <div class="hl-location">
                    <div id="hud-street"></div>
                    <div id="hud-city"></div>
                </div>
                <div class="hl-ammo">
                    ${hud_left_svgs.ammo}
                    <span id="hud-ammo">0</span>
                </div>
                <div class="hl-micro">
                    ${hud_left_svgs.microOff}
                </div>
            </div>
        </div>`
})