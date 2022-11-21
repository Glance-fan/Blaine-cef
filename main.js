const vue_app = Vue.createApp({
    data() {
        return {
            show: {
                notifications: false,
                login: false,
                reg: false,
                char_selection: false,
                start_place: false,
                char_creation: false,
                hud_top: false,
                hud_quest: false,
                hud_help: false,
                hud_spd: false,
                hud_interact: false,
                hud_menu: false,
                hud_left: false,
                chat: false,
                char_interaction: false,
                ov_interaction: false,
                iv_interaction: false,
                pass_interaction: false,
                menu: false,
                menu_bank: false,
                menu_biz: false,
                menu_gar: false,
                menu_home: false,
                actionbox: false,
                inventory: false,
                crates_inventory: false,
                trade: false,
                shop: false,
                retail: false,
                death: false,
                docs: false,
                npc: false,
                anims: false,
                estate: true,
                est_agency: false,
                elevator: false,
                car_maint: false,
                blips: false,
                tuning: false,
                atm: false,
            },
            render: {
                notifications: false,
                login: false,
                reg: false,
                char_selection: false,
                start_place: false,
                char_creation: false,
                hud: false,
                chat: false,
                interaction: false,
                inter_drawed: false,
                menu: false,
                menu_biz: false,
                menu_gar: false,
                menu_bank: false,
                menu_home: false,
                actionbox: false,
                full_inventory: false,
                inv_drawed: false,
                shop: false,
                retail: false,
                death: false,
                docs: false,
                npc: false,
                anims: false,
                estate: true,
                est_agency: false,
                elevator: false,
                car_maint: false,
                blips: false,
                tuning: false,
                atm: false,
                colorpicker: false,
            }
        }
    },
    watch: {
        'render.hud': async function () {
            if (this.render.hud) {
                await include_source(scripts.hud);
                onRenderFinished('hud')
            } else remove_source(scripts.hud);
        },
        'show.inventory': function () {
            if (this.show.inventory) {
                inv_tmpl.style.display = 'flex'
                setTimeout(Inventory.position, 0, '.Inventory')
            } else inv_tmpl.style.display = 'none';
        },
        'show.crates_inventory': function () {
            if (this.show.crates_inventory) {
                crinv_tmpl.style.display = 'flex'
                setTimeout(Inventory.position, 0, '.crates-Inventory')
            } else crinv_tmpl.style.display = 'none';
        },
        'show.trade': function () {
            if (this.show.trade) {
                trade_tmpl.style.display = 'flex'
                setTimeout(Inventory.position, 0, '.trade')
            } else trade_tmpl.style.display = 'none';
        },

    }
})
vue_app.use(VueColor);

class mp {
    static args_str;
    static trigger(...args) {
        this.args_str = '';
        for (var index = 0; index < args.length; index++)
            this.args_str += args[index] + ' '
        console.log(this.args_str);
    }
}

function renderTemplate(isRender, template) {
    mountedApp.render[`${template}`] = isRender;
}

function switchTemplate(visibility, template) {
    mountedApp.show[`${template}`] = visibility;
}

function onRenderFinished(template) {
    mp.trigger("Browser::OnRenderFinished", template);
}

function resizeAll() {
    clWidth = (document.documentElement.clientWidth / 1920).toFixed(2);
    clHeight = (document.documentElement.clientHeight / 1080).toFixed(2);

    if (login_tmpl) resizeBigger(login_tmpl);
    if (reg_tmpl) resizeBigger(reg_tmpl);
    if (start_tmpl) {
        resizeSmaller(start_tmpl);
        AuthStart.resizeConfirm();
    }
    if (chselect_tmpl) resizeSmaller(chselect_tmpl);
    if (chcreate_tmpl) resizeBigger(chcreate_tmpl);
    if (hud_left) {
        hud_left.style.setProperty('left', `${document.body.clientWidth / 100 * (299/19.2)}px`)
        hud_left.style.setProperty('bottom', `${document.body.clientHeight / 100 * (13/10.8)}px`);
        resizeBigger(hud_left);
    }
    if (chinteract_tmpl) resizeBigger(chinteract_tmpl);
    if (ovinteract_tmpl) resizeBigger(ovinteract_tmpl);
    if (ivinteract_tmpl) resizeBigger(ivinteract_tmpl);
    if (passengers_tmpl) resizeBigger(ivinteract_tmpl);
    if (menu_tmpl) resizeBigger(menu_tmpl);
    if (menubank_tmpl) resizeBigger(menubank_tmpl);
    if (menubiz_tmpl) resizeBigger(menubiz_tmpl);
    if (menugar_tmpl) resizeBigger(menugar_tmpl);
    if (menuhome_tmpl) resizeBigger(menuhome_tmpl);
    if (actionbox) resizeBigger(actionbox);
    if (inv_tmpl) {
        resizeSmaller(inv_tmpl);
        resizeSmaller(crinv_tmpl);
        resizeBigger(trade_tmpl);
        resizeBigger(document.querySelector('.inv-help'));
    }
    if (shop_tmpl) resizeBigger(shop_tmpl);
    if (retail_tmpl) resizeBigger(retail_tmpl);
    if (death_tmpl) Death.resize(death_tmpl);
    if (hud_top) hud_top.style.zoom = clHeight;
    if (hud_menu) resizeBigger(hud_menu);
    if (hud_quest) {
        hud_quest.style.setProperty('margin-top', `${document.body.clientHeight / 100 * (224/10.8)}px`);
        hud_quest.style.zoom = clHeight;
    }
    if (hud_help) hud_help.style.zoom = clHeight;
    if (hud_spd) hud_spd.style.zoom = clHeight;
    if (hud_interact) hud_interact.style.bottom = (document.body.clientHeight / 100 * (312 / 10.8)) + 'px';
    if (npc_tmpl) {
    }
    if (notific_tmpl) resizeBigger(notific_tmpl);
    if (anims_tmpl) {
        anims_tmpl.style.bottom = (document.body.clientHeight / 100 * (300 / 10.8)) + 'px';
        resizeBigger(anims_tmpl);
    }
    if (estate_tmpl) resizeBigger(estate_tmpl);
    if (elevator_tmpl) resizeBigger(elevator_tmpl);
    if (carmaint_tmpl) resizeBigger(carmaint_tmpl);
    if (blips_tmpl) resizeBigger(blips_tmpl);
    if (docs_tmpl) resizeBigger(docs_tmpl);
    if (atm_tmpl) resizeBigger(atm_tmpl);
    if (estagency_tmpl) resizeBigger(estagency_tmpl);
}

function resizeSmaller(elem) {
    clZoom = clWidth < clHeight ? clWidth : clHeight;
    elem.style.zoom = clZoom;
}

function resizeBigger(elem) {
    clZoom = clWidth > clHeight ? clWidth : clHeight;
    elem.style.zoom = clZoom;
}

window.onmousemove = logMouseMove;

mousePos = {
    x: document.body.clientWidth / 2,
    y: document.body.clientHeight / 2
}

function logMouseMove(event) {
    mousePos = {
        x: event.clientX,
        y: event.clientY
    };
}

async function include_source(url) {
    for (var index = 0; index < url.length; index++) {
        if (url[index].includes('style')) {
            if (!document.querySelector(`link[href="${url[index]}"]`)) {
                await include_css(url[index]);
            }
        } else {
            if (!document.querySelector(`script[src="${url[index]}"]`)) {
                await include_js(url[index]);
            }
        }
    }
}

function include_css(file) {
    return new Promise(function (resolve, reject) {
        var script = document.createElement('link');
        script.href = file;
        script.rel = 'stylesheet';
        script.defer = true;

        document.head.appendChild(script);

        script.onload = function () {
            resolve()
        }
        script.onerror = function () {
            reject()
        }
    })
}

function include_js(file) {
    return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = file;
        script.defer = true;

        document.head.appendChild(script);

        script.onload = function () {
            resolve()
        }
        script.onerror = function () {
            reject()
        }
    })
}

function remove_source(url) {
    for (var index = 0; index < url.length; index++) {
        if (url[index].includes('style')) document.querySelector(`link[href="${url[index]}"]`).remove();
        else document.querySelector(`script[src="${url[index]}"]`).remove();
    }
}

function prettyUSD(text, countDay) {
    var num = parseInt(text);
    if (countDay) return `$${num.toLocaleString('ru')} / $${(num * 24).toLocaleString('ru')}`
    else return `$${num.toLocaleString('ru')}`
}
