vue_app.component('menu-arrest-template', {
    mounted: async function () {
        arrest_tmpl = document.querySelector('#menu-arrest');
        await include_source(scripts.menu_arrest);
        resizeBigger(arrest_tmpl);
        onRenderFinished('menu_arrest');
    },
    unmounted: function () {
        remove_source(scripts.menu_arrest);
        arrest_tmpl = null;
        switchTemplate(false, 'menu_arrest')
    },
    template: /*html*/ `
    <div id="menu-arrest">
        <div>
            <div id="menu-arrest-title">
                <img src="libs/svgs/law-enforcement/arrest.svg">аресты
            </div>
        </div>
        <div>
            <div class="close-template" onclick="mp.trigger('MenuArrest::Close')">${close_svg}</div>
            <div id="menuarrest-0-container">
                <h2>
                    <div>Список всех задержанных</div>
                    <div id="menu-arrest-search" onclick="this.lastElementChild.focus()">
                        <img src="libs/svgs/law-enforcement/search.svg">
                        <input placeholder="Поиск" oninput="MenuArrest.onsearch(this.value)" onfocus="MenuArrest.onfocus(this.parentElement)" onblur="MenuArrest.onblur(this.parentElement)">
                    </div>
                </h2>
                <div id="menu-arrests-information">
                    <div class="menu-arrest-static-info menu-arrest-section">
                        <div style="margin-right: 95px;">Дата</div>
                        <div style="margin-right: 265px">Имя</div>
                        <div>Сотрудник</div>
                    </div>
                    <div style="width: 785px;" class="menu-arrest-scrollable">
                        <div style="width: 770px;height: 485px;">
                            <div id="menu-arrest-arrests" class="menu-arrest-section"></div>
                        </div>
                    </div>
                </div>    
            </div>
            <div id="menuarrest-1-container">
                <h2>Подробные сведения</h2>
                <div id="menu-arrest-full-info" class="menu-arrest-section"></div>
                <div id="menu-arrests-buttons">
                    <div onclick="MenuArrest.buttonRequest(0)"><img src="libs/svgs/law-enforcement/back.svg"></div>
                    <button class="red-button" style="font-size: 12px" onclick="MenuArrest.buttonRequest(1)">Выпустить</button>
                    <button class="grey-button" onclick="MenuArrest.buttonRequest(2)">Изменить<br>срок</button>
                </div>
            </div>
        </div>    
    </div>`
})