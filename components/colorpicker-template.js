vue_app.component('colorpicker-template', {
    data() {
        return {
            app: mountedApp,
            loading: true,
            colors: '#ffffff',
            hideAlpha: true,
            alive: true,
            parent: null,
        }
    },
    mounted: function () {
        this.parent = whoInvoked.getAttribute('parent');
        this.colors = whoInvoked.getAttribute('hex');
        if (this.parent == 'menu') this.hideAlpha = false;
        this.position();
        document.body.addEventListener('mouseup', this.outClick);
    },
    updated: function (){
        if (picker_tmpl.getAttribute('alive') == 'false') renderTemplate(false, 'colorpicker');
    },
    unmounted: function () {
        whoInvoked = null;
    },
    methods: {
        position() {
            var pos = whoInvoked.getBoundingClientRect();
            var scale = parseFloat(whoInvoked.scale);
            picker_tmpl = document.querySelector('.vc-chrome');
            picker_tmpl.style.left = whoInvoked.id.includes('shop') ? `${pos.x * scale + pos.width * scale - 190}px` : `${pos.x * scale}px`;
            picker_tmpl.style.top = `${pos.top * scale + pos.height * scale + 5 * scale}px`;
        },
        outClick(e) {
            var el = picker_tmpl,
                target = e.target;
            if (el !== target && !el.contains(target)) this.hidePicker()
        },
        hidePicker() {
            document.body.removeEventListener('mouseup', this.outClick);
            renderTemplate(false, 'colorpicker');
        },
        requestColor(hex, alpha) {
            this.trigger(hex, alpha)
            if (this.parent != 'menu_home') {
                if (alpha == 1) whoInvoked.setAttribute('hex', hex);
                else {
                    hex = parseInt(hex.slice(1, 7), 16)
                    whoInvoked.setAttribute('hex', `rgba(${(hex >> 16) & 255}, ${(hex >> 8) & 255}, ${hex & 255}, ${alpha})`);
                }
            }
        },
        trigger(hex, alpha) {
            switch (this.parent) {
                case 'menu':
                    mp.trigger('Menu::UpdateAimColor', hex, alpha)
                    break;
                case 'menu_home':
                    mp.trigger('HomeMenu::UpdateLightColor', whoInvoked.getAttribute('source-id'), hex)
                    break;
                case 'shop':
                    mp.trigger('Shop::UpdateColor', whoInvoked.getAttribute('source-id'), hex)
                    break;
                default:
                    mp.trigger('ColourPicker::Update', hex, alpha)
                    break;
            }
        },
    },
    watch: {
        colors(val) {
            if (this.loading == true) {
                this.loading = false;
                return;
            }
            if (val.rgba.a == 1) {
                whoInvoked.style.background = val.hex;
                whoInvoked.setAttribute('cur-hex', val.hex);
            } else whoInvoked.style.background = `rgba(${val.rgba.r}, ${val.rgba.g}, ${val.rgba.b}, ${val.rgba.a})`;
            this.requestColor(val.hex, val.rgba.a);
        },
    },
    template: /*html*/ `<Chrome v-model="colors" :disableAlpha="hideAlpha" :alive="app.show[parent]"></Chrome>`
})