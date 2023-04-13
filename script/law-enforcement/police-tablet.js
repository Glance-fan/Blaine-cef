var PoliceTablet = class PoliceTablet {
    static draw(title, data) {
        this.switchContainer(-1);
        this.updateTabletTitle(title);
        this.fillEmployee(...data[0]);
        this.fillActions();
    }

    static updateTabletTitle(text) {
        document.getElementById('police-tablet-title').firstElementChild.innerText = text;
    }

    //arguments = ['fullname', 'position', on_duty(t|f), fines, arrests]
    static fillEmployee() {
        var parent = document.getElementById('police-tablet-employee-info'),
            static_info = ['Имя Фамилия', 'Должность', 'Приступил к службе', 'Штрафов выписано', 'Арестов совершено'];
        for (var index = 0; index < static_info.length; index++) {
            if (!index) {
                var text = arguments[index].split(' ');
                parent.innerHTML += /*html*/ `
                    <div>
                        <span style="color: #868686">${static_info[index]}</span>
                        <span style="color: #FFFFFF; text-transform:uppercase;">${text[0]}</span>
                        <span style="color: #FFFFFF; text-transform:uppercase;">${text[1]}</span>
                    </div>`
            } else parent.innerHTML += /*html*/ `
                <div>
                    <span style="color: #868686">${static_info[index]}</span>
                    <span style="color: #FFFFFF">${typeof arguments[index] == 'boolean' ? arguments[index] ? 'Да' : 'Нет' : arguments[index]}</span>
                </div>`
        }
    }

    static updateEmployee(index, value) {
        var parent = document.getElementById('police-tablet-employee-info').children[index];
        switch (index) {
            case 0:
                var text = value.split(' ');
                parent.children[1].innerText = text[0];
                parent.children[2].innerText = text[1];
                break;
            case 2:
                parent.lastElementChild.innerText = value ? 'Да' : 'Нет';
                break;
            default:
                parent.lastElementChild.innerText = value;
                break;
        }
    }

    static fillActions() {
        var parent = document.getElementById('police-tablet-actions'),
            static_info = ['вызовы', 'база штрафов', 'ориентировки', 'уведомления', 'gps-маячки'];
        for (var index = 0, row = 2; index < static_info.length; index++, row++) {
            if (row == 2) {
                parent.innerHTML += /*html*/ `<div class="police-tablet-action-row"></div>`;
                row = 0;
            }
            parent.lastElementChild.innerHTML += /*html*/ `
                <button class="police-tablet-action grey-button" onclick="PoliceTablet.actionRequest(${index})">
                    <img src="libs/svgs/law-enforcement/${index}.svg">
                    ${static_info[index]}
                </button>`;
        }
    }

    static action_titles = ['Активные вызовы', 'База штрафов (за сегодняшний день)', '<div>Активные ориентировки</div><button onclick="PoliceTablet.editRequest(true)" class="red-button">Добавить</button>', 'Уведомления', 'GPS-трекеры'];
    static action_statics = [
        [ //calls
            ['Время', 40],
            ['Тип', 50],
            ['Отправитель', 200],
            ['Расстояние', 70],
            ['Сообщение', 0],
            [
                [80, 2],
                [70, 4],
                [280, 3],
                [140, 4],
                [300, 6]
            ]
        ],
        [ //fines
            ['Время', 40],
            ['Сумма', 45],
            ['Сотрудник', 230],
            ['Нарушитель', 210],
            ['Причина', 0],
            [
                [80, 4],
                [85, 2],
                [295, 3],
                [290, 0],
                [145, 2]
            ]
        ],
        [ //arrests
            ['Дата', 95],
            ['Разыскиваемый', 98],
            ['Сотрудник', 260],
            ['Информация', 0],
            [
                [125, 2],
                [200, 2],
                [325, 3],
                [225, 1]
            ]
        ],
        [ //notifs
            ['Время', 90],
            ['Содержание', 455],
            ['Расстояние', 0],
            [
                [130, 2],
                [535, 1],
                [220, 1],
            ]
        ],
        [ //GPS
            ['ID', 70],
            ['Транспорт', 220],
            ['Установил сотрудник', 160],
            ['Расстояние', 117],
            ['Опции', 0],
            [
                [80, 4],
                [285, 3],
                [295, 2],
                [190, 1],
                // [190, 1],
            ]
        ]
    ]
    static fillActionInformation(which, data) {
        document.getElementById('police-tablet-action-title').innerHTML = this.action_titles[which];
        this.switchContainer(0);
        this.fillActionStatic(this.action_statics[which]);
        this.fillActionDynamic(data, which);
    }

    static fillActionStatic(data) {
        var parent = document.querySelector('.police-tablet-static-information');
        parent.innerHTML = '';
        data.slice(0, data.length - 1).forEach(el => parent.innerHTML += /*html*/ `<div style="margin-right: ${el[1]}px;">${el[0]}</div>`);
    }

    static fillActionDynamic(data, which) {
        var parent = document.getElementById('police-tablet-information');
        parent.innerHTML = '';
        load(data, which);

        async function load(data) {
            data.forEach(el => PoliceTablet.addElem(...el, which));
        }
    }
    
    /*
    possible args (not in array) all end with given below number:
    - calls: uid, 'time', 'type', 'sender', distance, 'message', 0
    - fines: uid, 'time', sum, 'employee', 'criminal', 'reason', 1
    - arrests: uid, 'date', criminal, 'employee', 'information', 2
    - notifs: uid, 'time', 'content', distance, 3
    - GPS: uid, id, 'veh', 'employee', distance, 4
    */
    static addElem() {
        var parent = document.getElementById('police-tablet-information'),
            elem = document.createElement('div'),
            args = Array.from(arguments),
            which = args.at(-1),
            dims = this.action_statics[which].at(-1);

        elem.id = `${args[0]}-tablet-elem`;
        elem.className = 'police-tablet-action-elem';
        args.slice(1, args.length - 1).forEach((arg, idx) => {
            if (idx == 1 && which == 1) arg = prettyUSD(arg);
            if (idx == 3 && which == 0 || idx == 2 && which == 3 || idx == 3 && which == 4) arg += ' м.';
            elem.innerHTML += /*html*/ `<div id="${args[0]}-${which}-action-${idx}" style="width: ${dims[idx][0]}px; margin-right: ${dims[idx][1]}px">${arg}</div>`
        })
        switch (which) {
            case 0:
            case 3:
                elem.innerHTML += /*html*/ `<div style="height:15px" onclick="PoliceTablet.markerRequest(${args[0]})"><img src="libs/svgs/law-enforcement/marker.svg"></div>`;
                break;
            case 2:
                elem.innerHTML += /*html*/ `<div style="height:15px" onclick="PoliceTablet.editRequest(false, ${args[0]})"><img src="libs/svgs/law-enforcement/inspect.svg"></div>`;
                break;
            case 4:
                elem.innerHTML += /*html*/ `
                    <div style="display: flex;width:45px;justify-content:space-between;">
                        <div style="height:15px" onclick="PoliceTablet.markerRequest(${args[0]})"><img src="libs/svgs/law-enforcement/marker.svg"></div>
                        <div style="height:15px" onclick="PoliceTablet.removeRequest(${args[0]})"><img src="libs/svgs/law-enforcement/close.svg"></div>
                    </div>`;
                break;
        }
        parent.append(elem);
    }

    //id = uid; which = number of container 0,1,2,3,4; idx = index of changeable value; 
    //example: change distance of first notification -> 3000, 3, 2, value  
    static updateElem(id, which, idx, value) {
        if (idx == 1 && which == 1) value = prettyUSD(value);
        if (idx == 3 && which == 0 || idx == 2 && which == 3 || idx == 3 && which == 4) value += ' м.';
        document.getElementById(`${id}-${which}-action-${idx}`).innerHTML = value;
    }

    //args same as update
    static removeElem(id, which, idx) {
        document.getElementById(`${id}-${which}-action-${idx}`).remove();
    }

    //args = [show, arrest-from-date, cid, employee, short-info, full-info]
    static showArrestEdit(show) {
        if (!show) {
            this.switchContainer(0);
            return;
        }
        this.switchContainer(1);

        var args = Array.from(arguments).slice(2, arguments.length),
            inputs = document.querySelectorAll('.police-tablet-input-block'),
            btn = document.getElementById('police-tablet-arrest-btn');
        document.getElementById('police-tablet-arrest-title').innerHTML = !args.length ? 'Добавление новой ориентировки' : `Просмотр ориентировки от ${arguments[1]}`;
        btn.innerText = !args.length ? 'Добавить' : 'Исполнить';
        !args.length ? btn.setAttribute('onclick', `PoliceTablet.arrestRequest('add')`) : btn.setAttribute('onclick', `PoliceTablet.arrestRequest('exec')`);
        if (!args.length) {
            inputs.forEach(i => {
                i.style = '';
                i.lastElementChild.value = ''
            });
            inputs[1].style.visibility = 'hidden';
            return;
        }
        inputs[1].style = '';
        inputs.forEach(i => i.style = 'pointer-events: none');
        args.forEach((arg, idx) => inputs[idx].lastElementChild.value = arg);
    }

    //args -> 'fullname', id, 'birthday', sex(t|f), accessLS(t|f), phonenum, 'house', 'app', 'org', 'gos', [['name','reg', 'hex'], ] 
    static showPlayerInfo() {
        this.switchContainer(2);
        var parent = document.getElementById('police-tablet-player-info'),
            static_info = ['Имя Фамилия', 'Идентификационный номер', 'Дата рождения', 'Пол', 'Въезд в Лос-Сантос', 'Номер телефона', 'Дом', 'Квартира', 'Организация', 'Гос. структура'],
            cont = parent.children[0],
            args = Array.from(arguments);
        cont.innerHTML = ``;
        for (var index = 0; index < args.length - 1; index++) {
            cont.innerHTML += /*html*/ ` <div><span style="color: #868686">${static_info[index]}</span></div>`;
            switch (index) {
                case 0:
                case 5:
                    var text = args[index].toString().split(' ');
                    cont.lastChild.innerHTML += /*html*/ `
                        <span style="text-transform:uppercase;">${text[0]}</span>
                        <span style="height:17px;text-transform:uppercase;">${text[1] || ''}</span>`;
                    break;
                case 1:
                    cont.lastChild.innerHTML += /*html*/ `<span>#${args[index]}</span>`;
                    break;
                case 3:
                    cont.lastChild.innerHTML += /*html*/ `<span>${args[index] ? 'Мужской': 'Женский'}</span>`;
                    break;
                case 4:
                    cont.lastChild.innerHTML += /*html*/ `<span>${args[index] ? 'Разрешен' : 'Запрещен'}</span>`;
                    cont = parent.children[1];
                    cont.innerHTML = ``;
                    break;
                case 6:
                case 7:
                case 8:
                    cont.lastChild.innerHTML += /*html*/ `<span style="display: flex;height: 17px;">${args[index] ? `${args[index]}<div onclick="PoliceTablet.locationRequest(${index - 6}, ${args[1]})"><img style="margin-left: 10px" src="libs/svgs/law-enforcement/marker.svg"></div>` : 'Отсутствует'}</span>`;
                    break;
                case 9:
                    cont.lastChild.innerHTML += /*html*/ `<span>${args[index] ? args[index] : 'Не состоит'}</span>`;
                    break;
                default:
                    cont.lastChild.innerHTML += /*html*/ `<span>${args[index]}</span>`;
                    break;
            }
        }

        parent = document.getElementById('police-tablet-player-veh');
        parent.innerHTML = '';
        args.at(-1).forEach(el => parent.innerHTML += /*html*/ `<div class="police-tablet-veh-elem"><div><div>${el[0]}</div><div style="color: #D7D7D7">${el[1] ? el[1] : 'Регистрация отсутствует'}</div></div><div class="police-tablet-veh-circle" style="background: ${el[2]}"></div></div>`);
        if (parent.innerHTML.length == 0) 
            parent.innerHTML = /*html*/ `<div style="text-align: center;position: absolute;top: 50%;transform: translateY(-50%);width: 100%;">${args[0]}<br>не владеет<br>ни одним транспортом</div>`
    }
    static updatePlayer() {

    }

    /*misc*/
    static cur_cont;
    /*
    idx explanation
    - -1: default
    - 0: calls, fines, arrests, notifs, GPS
    - 1: arrests_edit
    - 2: player_info
    */
    static switchContainer(idx) {
        this.cur_cont = idx;
        idx++;
        var parent = document.getElementById('police-tablet-containers');
        Array.from(parent.children).forEach(child => {
            child.style.display = 'none';
        })
        parent.children[idx].style.display = 'flex';
        var back = document.getElementById('police-tablet-bottom').firstElementChild;
        if (idx == 0) back.style = 'visibility:hidden;pointer-events:none;';
        else back.style = '';
    }



    /*requests*/
    static actionRequest(id) {
        mp.trigger('PoliceTablet::Action', id);
        // -> PoliceTablet.fillActionInformation(id, data);
    }

    static codeRequest(code) {
        mp.trigger('PoliceTablet::Code', code);
    }

    static searchRequest(string) {
        mp.trigger('PoliceTablet::SearchPlayer', string);
    }

    static markerRequest(uid) {
        mp.trigger('PoliceTablet::ShowGPS', uid);
    }

    static removeRequest(uid) {
        mp.trigger('PoliceTablet::RemoveGPS', uid);
    }

    static locationRequest(which, pid) {
        mp.trigger('PoliceTablet::ResidenceLocation', which, pid);
    }

    static editRequest() {
        mp.trigger('PoliceTablet::ArrestShow', ...Array.from(arguments));
        // arguments[0] == true -> PoliceTablet.showArrestEdit(true)
        // arguments[0] == false -> PoliceTablet.showArrestEdit(true, arrest-from, text, text, text, text)
    }

    static arrestRequest(action) {
        var arr = [];
        if (action == 'add') {
            document.querySelectorAll('.police-tablet-input-block').forEach(i => arr.push(i.lastElementChild.value));
            arr.splice(1, 1);
        }
        mp.trigger('PoliceTablet::ArrestButton', action, ...arr);
    }
    
    static backRequest() {
        mp.trigger('PoliceTablet::Back', this.cur_cont);
        // PoliceTablet.switchContainer(need_idx); -> explained in definition
    }
}

var tablet_data = [
    ['star butterfly', 'Детектив [6]', false, 0, 0],
]
var player_data = ['Star Butterfly', 3000, '03.03.1990', false, false, 123123123, `#123, Палето-Бэй Пацифик Стрит`, null, null, null, [
]]
var fines_data = [
    [3000, "23:59", 13001, "Annlynn Recanter", "Annlynn Recanter", "2.4 п. ПДД"],
    [3001, "23:59", 13002, "Annlynn Recanter", "Annlynn Recanter", "2.4 п. ПДД"],
    [3002, "23:59", 13003, "Annlynn Recanter", "Annlynn Recanter", "2.4 п. ПДД"],
]
var arrests_data = [
    [3000, "17.03.2023 23:59", "123123123", "Annlynn Recanter", "УБИЙЦА"],
    [3001, "17.03.2023 23:59", "123123123", "Annlynn Recanter", "УБИЙЦА"],
    [3002, "17.03.2023 23:59", "123123123", "Annlynn Recanter", "УБИЙЦА"],
]
var phone_data = [
    [3000, "23:59", "Вызов", "Annlynn Recanter", 2405.4, "Нужна помощь"],
    [3001, "23:59", "Вызов", "Annlynn Recanter", 2405.4, "Нужна помощь"],
    [3002, "23:59", "Вызов", "Annlynn Recanter", 2405.4, "Нужна помощь"],
]
var notifs_data = [
    [3000, "23:59", "Вызов", 2405.4],
    [3001, "23:59", "Вызов", 2405.4],
    [3002, "23:59", "Вызов", 2405.4],
]
var gps_data = [
    [3000, 10, "Bravado Buffalo", "Annlynn Recanter", 2405.4],
    [3001, 10, "Bravado Buffalo", "Annlynn Recanter", 2405.4],
    [3002, 10, "Bravado Buffalo", "Annlynn Recanter", 2405.4],
]
// PoliceTablet.draw('Полиция Палето-Бэй', tablet_data);