vue_app.component('passengers-template', {
    mounted: async function () {
        await include_source(scripts.passengers);
        passengers_tmpl = document.getElementById('pass-interaction');
        resizeBigger(passengers_tmpl);
        onRenderFinished("passengers");
    },
    unmounted: function () {
        remove_source(scripts.passengers);
        switchTemplate(false, 'pass_interaction');
        passengers_tmpl = null;
    },
    template: /*html*/ `
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
    </div>`
})