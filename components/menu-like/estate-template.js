vue_app.component('estate-template', {
    mounted: async function () {
        await include_source(scripts.estate);
        estate_tmpl = document.querySelector('#estate');
        resizeBigger(estate_tmpl);
        onRenderFinished('estate');
    },
    unmounted: function () {
        remove_source(scripts.estate);
        estate_tmpl = null;
        switchTemplate(false, 'estate')
    },
    template: /*html*/ `
    <div id="estate">
        <div></div>
        <div>
            <div id="estate-wrapper">
                <div id="estate-container"></div>
                <div id="estate-buttons">
                    <button onclick="Estate.onbutton('accept')" class="red-button">Принять</button>
                    <button onclick="Estate.onbutton('decline')" class="grey-button">Отказаться</button>
                </div>
            </div>
        </div>    
    </div>`
})