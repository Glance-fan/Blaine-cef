vue_app.component('elevator-template', {
    mounted: async function () {
        elevator_tmpl = document.querySelector('#elevator');
        await include_source(scripts.elevator);
        Elevator.draw();
        resizeBigger(elevator_tmpl);
        onRenderFinished('elevator');
    },
    unmounted: function () {
        remove_source(scripts.elevator);
        elevator_tmpl = null;
        switchTemplate(false, 'elevator')
    },
    template: /*html*/ `
    <div id="elevator">
        <div></div>
        <div>
            <div id="elevator-wrapper">
                <div></div>
                <div id="elevator-container"></div>
                <button onclick="Elevator.sendfloor()" class="red-button">Принять</button>
            </div>
        </div>    
    </div>`
})