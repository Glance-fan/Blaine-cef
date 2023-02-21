vue_app.component('creation-template', {
    mounted: async function () {
        chcreate_tmpl = document.getElementById('char-creation');
        await include_source(scripts.char_creation);
        resizeBigger(chcreate_tmpl);
        onRenderFinished('char_creation');
    },
    unmounted: function () {
        remove_source(scripts.char_creation);
        chcreate_tmpl = null;
        switchTemplate(false, 'char_creation')
    },
    template: /*html*/ `<div id="char-creation">
        <div id="chcreate-left">
            <div class="chcreate-nav-row" id="chcreate-left-nav"></div>
            <div class="chcreate-left-containers">
                <div id="chcreate-data-container">
                    <div class="chcreate-background">
                        <div>Выбор пола</div>
                        <div class="chcreate-sex-select">
                            <button onclick="ChCreate.sexRequest('boy')" id="chcreate-boy" class="chcreate-sex-bg">♂</button>
                            <button onclick="ChCreate.sexRequest('girl')" id="chcreate-girl" class="chcreate-sex-bg">♀</button>
                        </div>
                    </div>
                    <div class="chcreate-background">
                        <div>Персональные данные</div>
                        <div class="chcreate-inputs">
                            <div class="chcreate-input" onclick="ChCreate.onfocus(this)">
                                <img src="libs/svgs/char-creation/name.svg">
                                <input id="name-chcreate" placeholder="Ввод..." onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : isNaN(Number(event.key)) && event.keyCode!=32" onblur="ChCreate.onblur(this)" maxlength="16">
                            </div>
                            <div class="chcreate-input" onclick="ChCreate.onfocus(this)">
                                <img src="libs/svgs/char-creation/surname.svg">
                                <input id="surname-chcreate" placeholder="Ввод..." onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : isNaN(Number(event.key)) && event.keyCode!=32" onblur="ChCreate.onblur(this)" maxlength="16">
                            </div>
                            <div class="chcreate-input" onclick="ChCreate.onfocus(this)"> 
                                <img src="libs/svgs/char-creation/age.svg">
                                <input id="age-chcreate" placeholder="Ввод..." onblur="ChCreate.onblur(this)" 
                                maxlength="2" autocomplete="false" spellcheck="false" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="chcreate-parents-container"></div>
                <div id="chcreate-hair-container">
                    <div class="chcreate-hair-wrapper">
                        <div id="chcreate-hair_sel-container"></div>
                        <div id="chcreate-eyebrows_sel-container"></div>
                        <div id="chcreate-beard_sel-container"></div>
                        <div id="chcreate-chest_sel-container"></div>
                    </div>
                    <div class="chcreate-nav-col" id="chcreate-hair-nav"></div>
                </div>
                <div id="chcreate-colors-container"></div>
                <div id="chcreate-appearance-container">
                    <div>
                        <div id="chcreate-features-container"></div>
                        <div id="chcreate-makeup-container"></div>
                    </div>
                    <div class="chcreate-nav-col" id="chcreate-appearance-nav"></div>
                </div>
                <div id="chcreate-clothes-container"></div>
            </div>
            <div class="chcreate-help">
				Сменить ракурс - V <br>
				Повернуть персонажа - CTRL + двигать мышью <br>
				Масштаб - CTRL + колесико мыши
			</div>
        </div>
        <div id="chcreate-right">
            <div class="chcreate-nav-row" id="chcreate-right-nav"></div>
            <div class="sliders-container" id="chcreate-right-container"></div>
            <div class="chcreate-menu">
                <button onclick="ChCreate.onrandom()">
                    <img src="libs/svgs/char-creation/random.svg">
                </button>
                <button class="red-button" onclick="ChCreate.playRequest()">Создать</button>
                <button class="grey-button" onclick="ChCreate.quitRequest()">
                    <img src="libs/svgs/char-creation/quit.svg">
                </button>
            </div>
        </div>
    </div>`
})