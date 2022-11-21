vue_app.component('actionbox-template', {
    mounted: async function () {
        await include_source(scripts.actionbox);
        actionbox = document.getElementById('action-box-resize');
        resizeBigger(actionbox);
		onRenderFinished('actionbox');
    },
    unmounted: function () {
        remove_source(scripts.actionbox);
        switchTemplate(false, 'actionbox');
        actionbox = null;
    },
    template:
        /*html*/`
        <div class="need-actionbox-bg">
            <div id="action-box-resize">
                <div id="action-box">
                    <div></div>
                    <div>
                        <div class="action-box-wrapper">
                            <div id="action-box-container"><div></div></div>
                            <div class="action-box-buttons">
                                <button class="red-button" onclick="ActionBox.onbutton(0)">Принять</button>
                                <button class="grey-button" onclick="ActionBox.onbutton(1)">Отменить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
})