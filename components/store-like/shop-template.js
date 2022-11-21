vue_app.component('shop-template', {
    mounted: async function () {
        await include_source(scripts.shop);
        shop_tmpl = document.getElementById('in-game-shop');
        resizeBigger(shop_tmpl);
        onRenderFinished("shop");
    },
    unmounted: function () {
        remove_source(scripts.shop);
        switchTemplate(false, 'shop');
        shop_tmpl = null;
    },
    template:
        /*html*/
        `<div id="in-game-shop">
            <div class="shop-left-side">
                <div class="top-rect blur-gray">
                    <div class="rect-inside"></div>
                </div>
                <div>
                    <div class="shop-selection">
                        <div class="shop-containers" style="direction: rtl;">
                            <div class="blur-gray" style="height:525px; width:300px"></div>
                        </div>
                        <div class="shop-nav"></div>
                    </div>
                    <p class="shop-search-block dark-gray" onclick="Shop.focusSearch(this)"><input /></p>
                </div>
                <div class="shop-help">
                    Сменить ракурс - V <br>
                    Повернуть персонажа - CTRL + двигать мышью <br>
                    Масштаб - CTRL + колесико мыши
                </div>
            </div>
            <div class="shop-right-side">
                <div class="top-rect blur-gray">
                    <div class="rect-inside"></div>
                </div>
                <div class="shop-containers" style="padding-right: 5px;margin-right: 10px;">
                    <div class="blur-gray" style="height:525px; width:300px;">
                        <div id="variants-container" name="1-choice"></div>
                    </div>
                </div>
                <div class="shop-veh-rect blur-gray" style="display: none"></div>
                <div class="shop-colorpicker blur-gray" style="display: none">
                    <div>
                        <span style="color:white">Основной цвет</span>
                        <div hex="#ffffff"  class="colorpicker" id="shop-main-colorpicker" source-id="main" parent="shop" onclick="Shop.oncolorcircle(this)"></div>
                    </div>
                    <div>
                        <span style="color:white">Дополнительный цвет</span>
                        <div hex="#ffffff" class="colorpicker" id="shop-extra-colorpicker" source-id="extra" parent="shop" onclick="Shop.oncolorcircle(this)"></div>
                    </div>
                </div>
                <div class="shop-menu">
                    <div class="shop-menu-left">
                        <div id="shop-cash" class="red-button" onclick="Shop.payRequest(true)"></div>
                        <div id="shop-bank" class="grey-button" onclick="Shop.payRequest(false)"></div>
                    </div>
                    <div class="shop-menu-right">
                        <button id="shop-quit" class="dark-gray" onclick="Shop.quitRequest()"></button>
                    </div>
                </div>
            </div>
        </div>`
})