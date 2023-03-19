vue_app.component('orange-picking-template', {
    mounted: async function () {
        op_tmpl = document.getElementById('orange-picking-game');
        await include_source(scripts.mg);
        resizeSmaller(op_tmpl);
        onRenderFinished('orange_picking');
    },
    unmounted: function () {
        remove_source(scripts.mg);
        op_tmpl = null;
        switchTemplate(false, 'orange_picking')
    },
    template: /*html*/ `
        <div id="orange-picking-game" class="minigame-bg">
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
                    <div class="orange-tree"></div>
                </div>
                <div class="basket">
                    <img style="position: absolute;
                    bottom: 0;
                    right: 0;" src="libs/svgs/minigames/basket.svg">
                    <div id="basket-container"></div>
                </div>
            </div>
        </div>`
    })