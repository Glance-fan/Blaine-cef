vue_app.component('tattoo-template', {
    mounted: async function () {
        tattoo_tmpl = document.querySelector('#tattoo');
        await include_source(scripts.tattoo_salon);
        resizeBigger(tattoo_tmpl);
        onRenderFinished('tattoo_salon');
    },
    unmounted: function () {
        remove_source(scripts.tattoo_salon);
        tattoo_tmpl = null;
        switchTemplate(false, 'tattoo_salon')
    },
    template: /*html*/ `
    <div id="tattoo">
        <div id="tattoo-left-side">
            <div class="tattoo-bg"></div>
            <div>
                <div id="tattoo-left-scrollable">
                    <div class="tattoo-bg" id="tattoo-container"></div>
                </div>
                <div class="tattoo-nav"></div>
            </div>   
        </div>
        <div id="tattoo-right-side">
            <div>
                <p class="shop-search-block dark-gray" onclick="Tattoo.focusSearch(this)"><input /></p>
            </div>
            <div style="width: 305px;">
                <div id="tattoo-right-scrollable">
                    <div class="tattoo-bg" id="tattoovar-container"></div>
                </div>
            </div>
            <div id="tattoo-menu">
                <div>
                    <div class="red-button" onclick="Tattoo.payRequest(true)"></div>
                    <div class="grey-button" onclick="Tattoo.payRequest(false)"></div>
                </div>
                <div>
                     <div class="dark-gray" onclick="mp.trigger('Shop::Close')"></div>
                </div>
            </div>
        </div>    
    </div>`
})