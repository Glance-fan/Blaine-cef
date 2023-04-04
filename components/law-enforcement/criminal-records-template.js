vue_app.component('criminal-records-template', {
    mounted: async function () {
        crec_tmpl = document.querySelector('#criminal-records');
        await include_source(scripts.crecords);
        resizeBigger(crec_tmpl);
        onRenderFinished('criminal_records');
    },
    unmounted: function () {
        remove_source(scripts.crecords);
        crec_tmpl = null;
        switchTemplate(false, 'criminal_records')
    },
    template: /*html*/ `
    <div id="criminal-records">
        <div>
            <div id="crec-title">
                <img src="libs/svgs/law-enforcement/court.svg">база<br>судимостей
            </div>
        </div>
        <div>
            <div class="close-template" onclick="mp.trigger('CriminalRecords::Close')">${close_svg}</div>
            <div id="crec-0-container" style="margin-top:200px">
                <div>
                    Найдите запись об интересующем Вас человеке<br>в общей базе штата по судимостям
                </div>
                <div id="crec-search">
                    <input placeholder="Имя Фамилия / CID / ID / Номер телефона (+ в начале) / Гос. номер ТС">
                    <button onclick="CRecords.searchRequest(this.parentElement.firstChild.value)" class="red-button">поиск</button>
                </div>
            </div>
            <div id="crec-1-container">
                <h2>Информация о человеке</h2>
                <div id="crec-back" onclick="CRecords.backRequest()"><img src="libs/svgs/law-enforcement/back.svg"></div>
                <div id="crec-player-info"></div>
                <div id="crec-information">
                    <div class="crec-static-information crec-section" style="margin-top: 25px;">
                        <div style="margin-right: 120px;">Дата</div>
                        <div style="margin-right: 80px">Срок</div>
                        <div>Статьи</div>
                    </div>
                    <div style="width: 785px;" class="crec-scrollable">
                        <div style="width: 770px;height: 320px;">
                            <div id="crec-wrapper" class="crec-section"></div>
                        </div>
                    </div>
                </div>    
            </div>
        </div>    
    </div>`
})