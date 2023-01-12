vue_app.component('salon-template', {
    mounted: async function () {
        salon_tmpl = document.querySelector('#salon');
        await include_source(scripts.salon);
        resizeBigger(salon_tmpl);
        onRenderFinished('salon');
    },
    unmounted: function () {
        remove_source(scripts.salon);
        salon_tmpl = null;
        switchTemplate(false, 'salon')
    },
    template: /*html*/ `
    <div id="salon">
        <div id="salon-left-side">
            <div class="salon-bg"></div>
            <div>
                <div id="salon-left-scrollable">
                    <div class="salon-bg" id="salon-container"></div>
                </div>
                <div class="salon-nav"></div>
            </div>   
        </div>
        <div id="salon-right-side">
            <div style="width: 305px">
                <div id="salon-right-scrollable">
                    <div class="salon-bg" id="salonvar-container"></div>
                </div>
            </div>
            <div id="salon-menu">
                <div>
                    <div class="red-button" onclick=""></div>
                    <div class="grey-button" onclick=""></div>
                </div>
                <div>
                     <div class="dark-gray" onclick="mp.trigger('Shop::Close')"></div>
                </div>
            </div>
        </div>    
    </div>`
})