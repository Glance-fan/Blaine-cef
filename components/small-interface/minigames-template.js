vue_app.component('minigames-template', {
    mounted: async function () {
        mg_tmpl = document.getElementById('minigames');
        await include_source(scripts.mg);
        resizeSmaller(mg_tmpl);
        onRenderFinished('minigames');
    },
    unmounted: function () {
        remove_source(scripts.minigames);
        mg_tmpl = null;
        switchTemplate(false, 'minigames')
    },
    template: /*html*/ `
        <div id="minigames">
            <div id="orange-picking-game">
                <div>
                    Соберите все апельсины с дерева,<br>удерживая ПКМ<br>и перетаскивая их в корзину
                </div>
                <div style="display:flex;   position: absolute;width:100%;
                bottom: 0;">
                    <div>
                        <img style="
                        position: absolute;
                        bottom: 0;
                        left: 0;" src="libs/svgs/minigames/tree.svg">
                        <div class="tree"></div>
                    </div>
                    <div class="basket">
                        <img style="position: absolute;
                        bottom: 0;
                        right: 0;" src="libs/svgs/minigames/basket.svg">
                        <div id="basket-container"></div>
                    </div>
                </div>
            </div>
            <div id="lock-picking-game">
                <div>
                    Взломайте замок, вращая отмычку<br>и удерживая ПКМ в вероятно<br>верном месте
                </div>
                <div id="lock-picking-wrapper">
                    <div id="lockpick-elem"></div>
                    <div id="lock-wrapper">
                        <div id="lock-elem"></div>
                    </div>
                </div>
            </div>
        </div>`
})