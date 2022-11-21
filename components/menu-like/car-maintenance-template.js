vue_app.component('car-maintenance-template', {
    mounted: async function () {
        await include_source(scripts.car_maint);
        carmaint_tmpl = document.querySelector('#car-maintenance');
        resizeBigger(carmaint_tmpl);
        onRenderFinished('car_maint');
    },
    unmounted: function () {
        remove_source(scripts.car_maint);
        carmaint_tmpl = null;
        switchTemplate(false, 'car_maint')
    },
    template: /*html*/ `
    <div id="car-maintenance">
        <div></div>
        <div>
            <div id="close-carmaint" onclick="mp.trigger('CarMaint::Close')"></div>
            <div id="car-maintenance-wrapper">
                <div></div>
                <div id="car-maintenance-container"></div>
                <div id="car-maintenance-buttons"></div>
            </div>
        </div>    
    </div>`
})