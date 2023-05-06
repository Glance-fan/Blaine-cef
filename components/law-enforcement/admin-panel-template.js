vue_app.component('admin-panel-template', {
    mounted: async function () {
        admpanel_tmpl = document.querySelector('#admin-panel');
        await include_source(scripts.admin_panel);
        resizeBigger(admpanel_tmpl);
        onRenderFinished('admin_panel');
    },
    unmounted: function () {
        remove_source(scripts.admin_panel);
        admpanel_tmpl = null;
        switchTemplate(false, 'admin_panel')
    },
    template: /*html*/ `
    <div id="admin-panel">
        <div id="admin-panel-top">
            <div class="admin-panel-title">Меню администратора</div>
            <div id="admin-panel-search">
                <input placeholder="Имя Фамилия / CID / ID">
                <button onclick="AdminPanel.searchRequest(this.parentElement.firstChild.value)" class="red-button">поиск</button>
            </div>
        </div>
        <div id="admin-panel-containers">
            <div id="admin-panel-main"  class="admin-panel-bg">
                <div id="admin-panel-moderator"></div>
                <div id="admin-panel-actions"></div>
            </div>
            <div id="admin-panel-action-information">
                <div class="admin-panel-title" style="margin-bottom: 25px"></div>
                <div class="admin-panel-static-information admin-panel-section">
                </div>
                <div class="admin-panel-scrollable" style="width:100%">
                    <div id="admin-panel-information" class="admin-panel-section"></div>
                </div>
            </div>
            <div id="admin-panel-player-information" class="admin-panel-bg">
                <div style="width:220px"></div>
                <div style="width:210px"></div>
                <div style="width:270px"></div>
                <div id="admin-panel-btn-wrapper"></div>
            </div>
            <div id="admin-panel-current-report">
                <div class="admin-panel-title" style="margin-bottom: 25px"></div>
                <div class="admin-panel-scrollable" style="width:100%; height:245px;">
                    <div id="admin-panel-messages" class="admin-panel-section"></div>
                </div>
                <div id="admin-panel-textarea-container">
                    <div>
                        <button class="red-button">Телепорт</button>
                        <button class="grey-button">Телепорт (к себе)</button>
                    </div>
                    <textarea placeholder="Введите текст..." onkeypress="AdminPanel.onkeypress(event)"></textarea>
                </div>
                <div id="admin-panel-report-btns">
                    <button class="red-button" onclick="AdminPanel.sendMessage()">Отправить</button>
                    <button class="grey-button">Завершить</button>
                </div>
            </div>
        </div>
        <div id="admin-panel-bottom" class="bottom-default">
            <div onclick="AdminPanel.backRequest()" class="admin-panel-img-anim"><img src="libs/svgs/law-enforcement/back.svg"></div> 
        </div>
    </div>`
})
