vue_app.component('interaction-template', {
    mounted: async function () {
        await include_source(scripts.interaction);
        chinteract_tmpl = document.getElementById('character-interaction');
        ovinteract_tmpl = document.getElementById('out-veh-interaction');
        ivinteract_tmpl = document.getElementById('in-veh-interaction');
        passengers_tmpl = document.getElementById('pass-interaction');
        resizeBigger(chinteract_tmpl);
        resizeBigger(ovinteract_tmpl);
        resizeBigger(ivinteract_tmpl);
        resizeBigger(passengers_tmpl);
        drawFullInteraction();
        onRenderFinished("interaction");
    },
    updated: function () {
        if (mountedApp.show['char_interaction']) chinteract_tmpl.style.display = 'block';
        else if (!mountedApp.show['char_interaction']) chinteract_tmpl.style.display = 'none';
        if (mountedApp.show['ov_interaction']) ovinteract_tmpl.style.display = 'block';
        else if (!mountedApp.show['ov_interaction']) ovinteract_tmpl.style.display = 'none';
        if (mountedApp.show['iv_interaction']) ivinteract_tmpl.style.display = 'block';
        else if (!mountedApp.show['iv_interaction']) ivinteract_tmpl.style.display = 'none';
        if (mountedApp.show['pass_interaction']) passengers_tmpl.style.display = 'block';
        else if (!mountedApp.show['pass_interaction']) passengers_tmpl.style.display = 'none';
    },
    unmounted: function () {
        remove_source(scripts.interaction);
        switchTemplate(false, 'char_interaction');
        switchTemplate(false, 'iv_interaction');
        switchTemplate(false, 'ov_interaction');
        switchTemplate(false, 'pass_interaction');
        chinteract_tmpl = null;
        ovinteract_tmpl = null;
        ivinteract_tmpl = null;
        passengers_tmpl = null;
    },
    template:
        /*html*/
        `<div style="height: 100%">
            <div id="character-interaction" onmouseleave="onCharMOnone()">
                <div id="char-sections"></div>
                <div id="char-extra-sections"></div>
                <div id="char-interaction"></div>
                <div class="text-pics" id="char-text-pics"></div>
            </div>
            <div id="out-veh-interaction" onmouseleave="onOVMOnone()">
                <div id="ov-sections"></div>
                <div id="ov-extra-sections"></div>
                <div id="ov-interaction"></div>
                <div class="text-pics" id="ov-text-pics"></div>
            </div>
            <div id="in-veh-interaction" onmouseleave="onIVMOnone()">
                <div id="iv-sections"></div>
                <div id="iv-extra-sections"></div>
                <div id="iv-interaction"></div>
                <div class="text-pics" id="iv-text-pics"></div>
            </div>
            <div id="pass-interaction" style="position: absolute;top: calc(50% - 230px);left: calc(50% - 300px);">
                <div id="passengers-interaction">
                    <div></div>
                    <div>
                        <div class="passengers-wrapper">
                            <div id="passengers-container"><div></div></div>
                            <div class="passengers-buttons">
                                <button class="red-button" onclick="Passengers.onbutton(0)">Взаимодействие</button>
                                <button class="grey-button" onclick="Passengers.onbutton(1)">Высадить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>`
})