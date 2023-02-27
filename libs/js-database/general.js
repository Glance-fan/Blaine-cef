var death_tmpl, login_tmpl, chselect_tmpl, reg_tmpl, start_tmpl, shop_tmpl, actionbox, inv_tmpl, chat_tmpl, crinv_tmpl, trade_tmpl, wb_tmpl, chcreate_tmpl, menu_tmpl, menubank_tmpl, menubiz_tmpl, menugar_tmpl, menuhome_tmpl, retail_tmpl, chinteract_tmpl, ovinteract_tmpl, ivinteract_tmpl, passengers_tmpl, hud_left, hud_top, hud_quest, hud_help, hud_spd, hud_interact, npc_tmpl, notific_tmpl, anims_tmpl, hud_menu, estate_tmpl, estagency_tmpl, elevator_tmpl, tattoo_tmpl, carmaint_tmpl, blips_tmpl, docs_tmpl, tuning_tmpl, salon_tmpl, atm_tmpl, whoInvoked, picker_tmpl, phone_tmpl, note_tmpl, mplayer_tmpl, school_tmpl;

var clHeight, clWidth;

var scripts = {
    /*auth*/
    login: ['script/auth/login.js', 'style/auth/auth.css'],
    reg: ['libs/rules-text.js', 'script/auth/registration.js', 'style/auth/auth.css', 'style/auth/registration.css'],
    char_selection: ['script/auth/char-selection.js', 'style/auth/auth.css', 'style/auth/char-selection.css'],
    start_place: ['libs/svgs/start-place.js', 'script/auth/start-place.js', 'style/auth/start-place.css'],

    /*chat*/
    chat: ['script/chat/chat.js', 'script/chat/messages.js', 'style/chat.css'],

    /*interaction*/
    interaction: ['libs/svgs/interaction.js', 'libs/js-database/interaction.js', 'libs/frameworks/interaction-chart.js', 'script/interaction/char.js', 'script/interaction/out-veh.js', 'script/interaction/in-veh.js', 'script/interaction/passengers.js', 'style/interaction/interaction.css', 'style/interaction/circles.css', 'style/interaction/sections.css', 'style/interaction/passengers.css'],

    /*menu-like*/
    anims: ['libs/svgs/animations.js', 'script/menu-like/animations.js', 'style/menu-like/animations.css'],
    autoschool: ['libs/js-database/autoschool.js', 'script/menu-like/autoschool.js', 'style/menu-like/autoschool.css'],
    blips: ['libs/svgs/blips.js', 'script/menu-like/blips.js', 'style/menu-like/blips.css'],
    car_maint: ['libs/svgs/car-maintenance.js', 'script/menu-like/car-maintenance.js', 'style/menu-like/car-maintenance.css'],
    est_agency: ['libs/svgs/estate-agency.js', 'script/menu-like/estate-agency.js', 'style/menu-like/estate-agency.css'],
    estate: ['libs/svgs/estate.js', 'script/menu-like/estate.js', 'style/menu-like/estate.css'],
    menu_bank: ['libs/svgs/menu-bank.js', 'script/menu-like/menu-bank.js', 'style/menu-like/menu-bank.css'],
    menu_biz: ['libs/svgs/menu-biz.js', 'script/menu-like/menu-biz.js', 'style/menu-like/menu-biz.css'],
    menu_gar: ['script/menu-like/menu-garage.js', 'style/menu-like/menu-garage.css'],
    menu_home: ['libs/svgs/menu-home.js', 'libs/svgs/inventory/inventory.js', 'script/menu-like/menu-home.js', 'style/menu-like/menu-home.css'],
    menu: ['libs/svgs/menu.js', 'script/menu-like/menu.js', 'style/quest-grads.css', 'style/menu-like/menu.css'],
    music_player: ['script/menu-like/music-player.js', 'style/menu-like/music-player.css'],

    /*small-interface*/
    actionbox: ['script/small-interface/action-box.js', 'style/small-interface/action-box.css'],
    atm: ['script/small-interface/atm.js', 'style/small-interface/atm.css'],
    death: ['script/small-interface/death.js', 'style/small-interface/death.css'],
    documents: ['libs/svgs/documents.js', 'script/small-interface/documents.js', 'style/small-interface/documents.css'],
    elevator: ['script/small-interface/elevator.js', 'style/small-interface/elevator.css'],
    note: ['script/small-interface/note.js', 'style/small-interface/note.css'],
    notifications: ['libs/svgs/notification.js', 'script/small-interface/notifications.js', 'style/small-interface/notifications.css'],
    npc: ['script/small-interface/npc.js', 'style/small-interface/npc.css'],

    /*store-like*/
    char_creation: ['libs/js-database/char-creation.js', 'script/store-like/char-creation.js', 'style/store-like/char-creation.css'],
    retail: ['libs/svgs/retail.js', 'libs/svgs/inventory/inventory.js', 'libs/js-database/retail.js', 'script/store-like/retail.js', 'style/store-like/retail.css'],
    shop: ['libs/svgs/shop.js', 'libs/js-database/shop.js', 'script/store-like/shop.js', 'style/store-like/shop.css'],
    tuning: ['libs/svgs/tuning.js', 'script/store-like/tuning.js', 'style/store-like/tuning.css'],
    salon: ['libs/svgs/salon.js', 'script/store-like/salon.js', 'style/store-like/salon.css'],
    tattoo_salon: ['libs/svgs/salon.js', 'script/store-like/tattoo-salon.js', 'style/store-like/tattoo-salon.css'],

    /*no category*/
    hud: ['libs/frameworks/speedometer.js', 'script/hud.js', 'style/quest-grads.css', 'style/hud.css'],
    inventory: ['libs/svgs/inventory/inventory.js', 'libs/svgs/inventory/weapon.js', 'libs/js-database/inventory.js', 'script/inventory.js', 'style/inventory/inventory.css', 'style/inventory/inventory-item.css'],
    phone: ['script/phone.js', 'style/phone.css'],
}