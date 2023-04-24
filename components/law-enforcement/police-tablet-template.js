vue_app.component('police-tablet-template', {
    mounted: async function () {
        pt_tmpl = document.getElementById('police-tablet');
        await include_source(scripts.police_tablet);
        resizeBigger(pt_tmpl);
		onRenderFinished('police_tablet');
    },
    unmounted: function () {
        remove_source(scripts.police_tablet);
        switchTemplate(false, 'police_tablet');
        pt_tmpl = null;
    },
    template:
        /*html*/`
        <div id="police-tablet">
            <div id="police-tablet-top">
                <div id="police-tablet-title">
                    <span style="color: #FFFFFF"></span><br><span style="color: #868686;">Служебный планшет</span>
                </div>
                <div id="police-tablet-search">
                    <input placeholder="Имя Фамилия / CID / ID / Номер телефона (+ в начале) / Гос. номер ТС">
                    <button onclick="PoliceTablet.searchRequest(this.parentElement.firstChild.value)" class="red-button">поиск</button>
                </div>
            </div>
            <div id="police-tablet-containers">
                <div id="police-tablet-main" class="police-tablet-bg">
                    <div id="police-tablet-employee-info"></div>
                    <div id="police-tablet-actions"></div>
                </div>
                <div id="police-tablet-action-information">
                    <div id="police-tablet-action-title"></div>
                    <div class="police-tablet-static-information police-tablet-section">
                    </div>
                    <div class="police-tablet-scrollable" style="width:100%">
                        <div id="police-tablet-information" class="police-tablet-section"></div>
                    </div>
                </div>
                <div id="police-tablet-arrest-form" class="police-tablet-bg">
                    <div id="police-tablet-arrest-title"></div>
                    <div style="margin-right: 155px">
                        <div class="police-tablet-input-block">
                            <div>Разыскиваемый</div>
                            <input placeholder="Ввод">
                        </div>
                        <div class="police-tablet-input-block">
                            <div>Сотрудник</div>
                            <input placeholder="Ввод">
                        </div>
                        <div class="police-tablet-input-block">
                            <div>Краткая информация</div>
                            <input placeholder="Ввод">
                        </div>
                    </div>
                    <button id="police-tablet-arrest-btn" class="red-button">Добавить</button>
                    <div class="police-tablet-input-block">
                        <div style="margin-bottom:25px">Подробная информация</div>
                        <textarea style="width:355px;height:225px" placeholder="Введите текст"></textarea>
                    </div>
                </div>
                <div id="police-tablet-player-info" class="police-tablet-bg">
                    <div style="width:290px"></div>
                    <div style="width:395px"></div>
                    <div>
                        <div style="color: #868686">Транспорт в собственности</div>
                        <div style="width: 310px;" class="police-tablet-scrollable">
                            <div style="width: 295px;height: 265px;">
                                <div id="police-tablet-player-veh"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="police-tablet-bottom">
                <div onclick="PoliceTablet.backRequest()" class="police-tablet-img-anim"><img src="libs/svgs/law-enforcement/back.svg"></div>
                <div id="police-btn-wrapper">
                    <button class="red-button" onclick="PoliceTablet.codeRequest(0)">код 0</button>
                    <button class="grey-button" onclick="PoliceTablet.codeRequest(1)">код 1</button>
                    <button class="grey-button" onclick="PoliceTablet.codeRequest(2)">код 2</button>
                    <button class="green-button" onclick="PoliceTablet.codeRequest(3)">код 3</button>
                </div>
            </div>
        </div>`
})