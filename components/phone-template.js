vue_app.component('phone-template', {
    mounted: async function () {
        phone_tmpl = document.querySelector('#phone');
        await include_source(scripts.phone);
        // resizeBigger(docs_tmpl);
        onRenderFinished('phone');
    },
    unmounted: function () {
        remove_source(scripts.phone);
        phone_tmpl = null;
        clearInterval(Phone.timeInterval);
        switchTemplate(false, 'phone')
    },
    template: /*html*/ `
    <div id="phone">
        <div id="phone-top">
            <div id="phone-time"></div>
            <div><div></div></div>
            <div>
                <img src="libs/svgs/phone/wifi.svg">
                <img src="libs/svgs/phone/battery.svg">     
            </div>
        </div>
        <div id="phone-main-menu">
            <div id="phone-mm-apps"></div>
            <div id="phone-mm-fav-apps"></div>
        </div>
        <div id="phone-apps-container"></div>
    </div>`
})