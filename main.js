const vue_app = Vue.createApp({
    data() {
        return {
            show: {
                actionbox: false,
                autoschool: false,
                anims: false,
                atm: false,
                blips: false,
                car_maint: false,
                char_creation: false,
                char_interaction: false,
                char_selection: false,
                chat: false,
                crates_inventory: false,
                death: false,
                docs: false,
                elevator: false,
                est_agency: false,
                estate: false,
                hud_help: false,
                hud_interact: false,
                hud_left: false,
                hud_menu: false,
                hud_quest: false,
                hud_spd: false,
                hud_top: false,
                phone: false,
                inventory: false,
                iv_interaction: false,
                login: false,
                menu: false,
                menu_bank: false,
                menu_biz: false,
                menu_gar: false,
                menu_home: false,
                notifications: false,
                npc: false,
                ov_interaction: false,
                pass_interaction: false,
                reg: false,
                retail: false,
                shop: false,
                start_place: false,
                trade: false,
                workbench: false,
                tuning: false,
                salon: false,
                tattoo_salon: false,
                note: false,
                music_player: false,
            },
            render: {
                actionbox: false,
                autoschool: false,
                anims: false,
                atm: false,
                blips: false,
                car_maint: false,
                char_creation: false,
                char_selection: false,
                chat: false,
                colorpicker: false,
                death: false,
                docs: false,
                elevator: false,
                est_agency: false,
                estate: false,
                full_inventory: false,
                hud: false,
                phone: false,
                inter_drawed: false,
                interaction: false,
                inv_drawed: false,
                login: false,
                menu: false,
                menu_bank: false,
                menu_biz: false,
                menu_gar: false,
                menu_home: false,
                notifications: false,
                npc: false,
                reg: false,
                retail: false,
                shop: false,
                start_place: false,
                tuning: false,
                salon: false,
                tattoo_salon: false,
                note: false, 
                music_player: false,
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
        'show.workbench': function () {
            if (this.show.workbench) {
                wb_tmpl.style.display = 'flex'
                setTimeout(Inventory.position, 0, '.workbench')
            } else wb_tmpl.style.display = 'none';
        }

    }
})
vue_app.use(VueColor);

// class mp {
//     static args_str;
//     static trigger(...args) {
//         this.args_str = '';
//         for (var index = 0; index < args.length; index++)
//             this.args_str += args[index] + ' '
//         console.log(this.args_str);
//     }
// }

function renderTemplate(isRender, template) {
    mountedApp.render[`${template}`] = isRender;
}

var lastFocusElem;

setInterval(() => {
    var elem = document.querySelector(':focus');

    if (elem == lastFocusElem)
        return;

    lastFocusElem = elem;

    mp.trigger("Browser::OnFocusElem", elem == null ? null : elem.type);
}, 250);

function switchTemplate(visibility, template) {
    mountedApp.show[`${template}`] = visibility;

    if (!visibility) {
        var elem = document.querySelector(':focus');

        if (elem != null)
            elem.blur();
    }
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
        mp.trigger('Resize::UpdateLeftHudPos')
        resizeBigger(hud_left);
    }
    if (chat_tmpl) resizeBigger(chat_tmpl);
    if (chinteract_tmpl) resizeBigger(chinteract_tmpl);
    if (ovinteract_tmpl) resizeBigger(ovinteract_tmpl);
    if (ivinteract_tmpl) resizeBigger(ivinteract_tmpl);
    if (passengers_tmpl) resizeBigger(ivinteract_tmpl);
    if (menu_tmpl) resizeBigger(menu_tmpl);
    if (menubank_tmpl) resizeBigger(menubank_tmpl);
    if (menubiz_tmpl) resizeBigger(menubiz_tmpl);
    if (menugar_tmpl) resizeBigger(menugar_tmpl);
    if (menuhome_tmpl) resizeBigger(menuhome_tmpl);
    if (school_tmpl) resizeBigger(school_tmpl);
    if (mplayer_tmpl) resizeBigger(mplayer_tmpl);
    if (actionbox) resizeBigger(actionbox);
    if (inv_tmpl) {
        resizeSmaller(inv_tmpl);
        resizeSmaller(crinv_tmpl);
        resizeBigger(trade_tmpl);
        resizeBigger(wb_tmpl);
        resizeBigger(document.querySelector('.inv-help'));
    }
    // if (phone_tmpl) resizeBigger(phone_tmpl);
    if (shop_tmpl) resizeBigger(shop_tmpl);
    if (tuning_tmpl) resizeBigger(tuning_tmpl);
    if (salon_tmpl) resizeBigger(salon_tmpl);
    if (tattoo_tmpl) resizeBigger(tattoo_tmpl);
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
        npc_tmpl.firstElementChild.style.top = document.body.clientHeight / 100 * (572/10.8) + 'px';
        resizeBigger(npc_tmpl)
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
    if (note_tmpl) resizeBigger(note_tmpl);
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