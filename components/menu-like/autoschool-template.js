vue_app.component('autoschool-template', {
    mounted: async function () {
        school_tmpl = document.querySelector('#autoschool');
        await include_source(scripts.autoschool);
        resizeBigger(school_tmpl);
        onRenderFinished('autoschool');
    },
    unmounted: function () {
        remove_source(scripts.autoschool);
        school_tmpl = null;
        switchTemplate(false, 'autoschool')
    },
    template: /*html*/ `
    <div id="autoschool">
        <div>
            <div id="autoschool-title">
                <img src="libs/svgs/autoschool/main.svg">автошкола
            </div>
            <div class="autoschool-options autoschool-line">
                <div>
                    <a id="autoschool-0" onclick="AutoSchool.navigate(this)" href="#"><img src="libs/svgs/autoschool/0.svg">Правила</a>
                </div>
                <div>
                    <a id="autoschool-1" onclick="AutoSchool.navigate(this)" href="#"><img src="libs/svgs/autoschool/1.svg">Тест</a>
                </div>
            </div>
        </div>
        <div>
            <div class="close-template" onclick="mp.trigger('AutoSchool::Close')">${close_svg}</div>
            <div id="autoschool-0-container">
                <h2>Правила дорожного движения</h2>
            </div>
            <div id="autoschool-1-container">
                <h2>Тест на знание ПДД</h2>
                <div class="autoschool-section" style="justify-content: space-between"></div>
                <div><button id="autoschool-test" class="red-button" onclick="AutoSchool.onbutton(this.innerText)">Далее</button></div>
            </div>
        </div>    
    </div>`
})