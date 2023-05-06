var AdminPanel = class AdminPanel {
    static draw(moderator) {
        this.switchContainer(-1);
        this.fillModerator(...moderator);
        this.fillActions();
    }


    /*main-container*/
    //args = ['lvl', admin_amount]
    static fillModerator() {
        var parent = document.getElementById('admin-panel-moderator'),
            static_info = ['Уровень', 'Администраторов в сети'];
        for (var index = 0; index < static_info.length; index++)
            parent.innerHTML += /*html*/ `
                <div>
                    <span style="color: #868686">${static_info[index]}</span>
                    <span style="color: #FFFFFF">${arguments[index]}</span>
                </div>`;
    }

    static updateModerator(index, value) {
        document.getElementById('admin-panel-moderator').children[index].lastElementChild.innerText = value;
    }

    static fillActions() {
        var parent = document.getElementById('admin-panel-actions'),
            static_info = ['репорты', 'текущий репорт', 'античит', 'администрация', 'список команд'];
        for (var index = 0, row = 2; index < static_info.length; index++, row++) {
            if (row == 2) {
                parent.innerHTML += /*html*/ `<div class="admin-panel-action-row"></div>`;
                row = 0;
            }
            parent.lastElementChild.innerHTML += /*html*/ `
                <button class="admin-panel-action grey-button" onclick="AdminPanel.actionRequest(${index})">
                    <img src="libs/svgs/law-enforcement/admin/${index}.svg">
                    ${static_info[index]}
                </button>`;
        }
    }


    /*actions-container*/
    static action_titles = ['Активные репорты', 'История наказаний ', 'Уведомления античита', 'Список администраторов', 'Список команд'];
    static action_statics = [
        [ //reports
            ['Время', 50],
            ['Отправитель', 280],
            ['Работает администратор', 0],
            [
                [90, 2],
                [360, 3],
                [430, 4]
            ]
        ],
        [ //history
            ['', 0],
            ['Тип', 60],
            ['Дата', 130],
            ['Администратор', 200],
            ['Причина', 236],
            ['Амнистия', 0],
            [
                [],
                [80, 4],
                [160, 0],
                [300, 2],
                [290, 30],
            ]
        ],
        [ //anticheat
            ['Время', 50],
            ['Подозреваемый', 215],
            ['Сведения', 310],
            ['Опции', 0],
            [
                [90, 2],
                [320, 0],
                [370, 3],
                [119, 0],
            ]
        ],
        [ //administration
            ['Статус', 35],
            ['Сотрудник', 190],
            ['Последний вход', 50],
            ['Должность', 85],
            ['Опции', 0],
            [
                [75, 1],
                [255, 3],
                [155, 0],
                [155, 1],
                [65, 0]
            ]
        ],
        [ //commands
            ['Команда, алиасы', 200],
            ['Параметры', 240],
            ['Описание', 0],
            [
                [305, 4],
                [310, 3],
                [280, 2],
            ]
        ],
    ];
    static fillActionInformation(which, data, title) {
        document.querySelectorAll('.admin-panel-title')[1].innerHTML = this.action_titles[which] + (title == null ? '' : title);
        this.switchContainer(0);
        this.fillActionStatic(this.action_statics[which]);
        this.fillActionDynamic(data, which);
    }

    static fillActionStatic(data) {
        var parent = document.querySelector('.admin-panel-static-information');
        parent.innerHTML = '';
        data.slice(0, data.length - 1).forEach(el => parent.innerHTML += /*html*/ `<div style="margin-right: ${el[1]}px;">${el[0]}</div>`);
    }

    static fillActionDynamic(data, which) {
        var parent = document.getElementById('admin-panel-information');
        parent.innerHTML = '';
        load();

        async function load() {
            data.forEach(el => AdminPanel.addElem(which, ...el));
        }
    }

    /*
    possible args (not in array) all start with given below number, possible end with boolean to inesrt to the beginning:
    - reports: 0, uid, 'time', 'sender', 'admin', (t|f)
    // - history: 1, uid, is_active(t|f), 'type', 'admin', 'reason', (t|f)
    - anticheat: 2, uid, 'time', 'suspect', 'info', (t|f)
    - administration: 3, uid, online(t|f), 'admin', 'date', 'position'
    - commands: 4, uid, 'command', 'params', 'description', (t|f)
    */
    static addElem() {
        var parent = document.getElementById('admin-panel-information'),
            elem = document.createElement('div'),
            args = Array.from(arguments),
            which = args[0],
            uid = args[1],
            dims = this.action_statics[which].at(-1);
        elem.id = `${uid}-admpanel-elem`;
        elem.className = 'admin-panel-action-elem';

        var elem_args = typeof args.at(-1) == 'boolean' ? args.slice(2, args.length - 1) : args.slice(2, args.length);
        elem_args.forEach((arg, idx) => {
            if (which == 1 && idx == 0 ) {
                elem.innerHTML += /*html*/ `<div style="position:absolute; left:10px;"><div id="${uid}-${which}-action-${idx}" class="admin-panel-circle ${arg ? 'admin-green' : 'admin-red'}"></div></div>`;
                return;
            }
            if (which == 3 && idx == 0 ) {
                elem.innerHTML += /*html*/ `<div style="width: ${dims[idx][0]}px; margin-right: ${dims[idx][1]}px"><div id="${uid}-${which}-action-${idx}" class="admin-panel-circle ${arg ? 'admin-green' : 'admin-red'}"></div></div>`;
                return;
            }
            elem.innerHTML += /*html*/ `<div id="${uid}-${which}-action-${idx}" style="width: ${dims[idx][0]}px; margin-right: ${dims[idx][1]}px">${arg}</div>`
        })
        switch (which) {
            case 0:
                elem.innerHTML += /*html*/ `<div style="height:15px" class="admin-panel-img-anim" onclick="AdminPanel.reportRequest(${uid})"><img src="libs/svgs/law-enforcement/inspect.svg"></div>`;
                break;
            case 1:
                elem.innerHTML += /*html*/ `<div style="height:15px" class="admin-panel-img-anim" onclick="AdminPanel.reportRequest(${uid})"><img src="libs/svgs/law-enforcement/court.svg"></div>`;
                break;
            case 2:
                elem.innerHTML += /*html*/ `
                <div id="admin-panel-anticheat-options">
                    <button class="red-button" onclick="AdminPanel.anticheatRequest(0, ${uid})">TP</button>
                    <button class="red-button" onclick="AdminPanel.anticheatRequest(1, ${uid})">TPH</button>
                    <div style="height:15px" class="admin-panel-img-anim" onclick="AdminPanel.anticheatRequest(2, ${uid})"><img src="libs/svgs/law-enforcement/inspect.svg"></div>
                </div>`;
                break;
            case 3:
                elem.innerHTML += /*html*/ `
                <div id="admin-panel-administrators-options">
                    <div class="admin-panel-img-anim" style="height:15px" onclick="AdminPanel.employeeRequest(0, ${uid})"><img src="libs/svgs/law-enforcement/up.svg"></div>
                    <div class="admin-panel-img-anim" style="height:15px" onclick="AdminPanel.employeeRequest(1, ${uid})"><img src="libs/svgs/law-enforcement/down.svg"></div>
                    <div class="admin-panel-img-anim" style="height:15px" onclick="AdminPanel.employeeRequest(2, ${uid})"><img src="libs/svgs/law-enforcement/close.svg"></div>
                </div>`;
                break;
        }

        typeof args.at(-1) == 'boolean' && args.at(-1) ? parent.insertBefore(elem, parent.firstElementChild) : parent.append(elem);
    }

    //id = uid; which = number of container 0,1,2,3,4; idx = index of changeable value; 
    static updateElem(id, which, idx, value) {
        var elem = document.getElementById(`${id}-${which}-action-${idx}`);
        if ([1,3].includes(which) && idx == 0) elem.className = "admin-panel-circle " + (value ? 'admin-green' : 'admin-red');
        else elem.innerHTML = value;
    }

    static removeElem(id) {
        document.getElementById(`${id}-admpanel-elem`).remove();
    }



    /*player-container*/
    static showPlayerInfo() {
        this.switchContainer(1);
        var parent = document.getElementById('admin-panel-player-information'),
            static_info = ['Имя Фамилия', 'CID', 'Дата создания', 'В сети', 'Дата последнего входа', 'IP / рег. IP', 'Фракция', 'Организация', 'Наличные / Банк'], 
            cont = parent.children[0],
            args = Array.from(arguments);
        cont.innerHTML = ``;
        
        const addText = (cont, index) => cont.lastChild.innerHTML += /*html*/ `<span>${args[index]}</span>`;
        for (var index = 0, cont_idx = 1; index < static_info.length; index++) {
            cont.innerHTML += /*html*/ ` <div><span style="color: #868686">${static_info[index]}</span></div>`;
            switch (index) {
                case 0:
                case 5:
                case 8:
                    var text = args[index].toString().split(' ');
                    if (index == 8) text = text.map(t => prettyUSD(t))
                    cont.lastChild.innerHTML += /*html*/ `
                        <span style="text-transform:uppercase;">${text[0]}</span>
                        <span style="height:17px;text-transform:uppercase;">${text[1] || ''}</span>`;
                    break;
                case 3:
                    args[index] = args[index] == null ? 'Нет' : `Да, RID: ${args[index]}`;
                    addText(cont, index);
                    break;
                case 4:
                case 7:
                    addText(cont, index);
                    cont = parent.children[cont_idx++];
                    cont.innerHTML = ``;
                    break;
                default:
                    addText(cont, index)
                    break;
            }
        }

        this.fillPlayerActions(args[1].substr(1, args[1].length));
    }

    static player_actions = [
        [0, 'Кикнуть', 'red-button'],
        [1, 'Забанить', 'red-button'],

        [2, 'Кикнуть (тихо)', 'grey-button'],
        [3, 'Забанить (HARD)', 'grey-button'],

        [4, 'Выдать варн', 'red-button'],
        [5, 'В тюрьму', 'red-button'],

        [6, 'Check GM', 'grey-button'],
        [7, 'Check GM<br>(транспорт)', 'grey-button'],

        [8, 'Сообщение', 'red-button'],
        [9, 'История<br>наказаний', 'grey-button'],

        [10, 'Телепорт', 'red-button'],
        [11, 'Телепорт (к себе)', 'grey-button'],
    ]
    static fillPlayerActions(cid) {
        var parent = document.getElementById('admin-panel-btn-wrapper');
        for (var index = 0; index < this.player_actions.length; index++) {
            if (index % 2 == 0) parent.innerHTML += `<p></p>`
            var btn = this.player_actions[index];
            parent.lastElementChild.append(newButton(...btn));
        }

        function newButton(idx, text, btn_class) {
            var btn = document.createElement('button');
            btn.innerHTML = text;
            btn.className = btn_class;
            btn.setAttribute('onclick', `AdminPanel.playerRequest(${idx}, ${cid})`)
            return btn;
        }
    }

    
    
    /*current-report*/
    static showCurrentReport(title) {
        this.switchContainer(2);
        document.querySelectorAll('.admin-panel-title')[2].innerHTML = `Репорт №${title[0]} от ${title[1]}, отправитель: ${title[2]}`;
        this.setReportButtons(title[0]);
    }
    
    static newHelpMessage(isAdmin, time, name, fulltext) {
        var classTemp = isAdmin ? 'admin-panel-adminmsg' : 'admin-panel-usermsg';
        var message = document.createElement('p');
        message.innerHTML = /*html*/ `<span class="${classTemp}">${name}</span>(${time})</br></br>${fulltext.replaceAll('<', '&lt;').replaceAll('>', '&gt;')}`;
        document.getElementById('admin-panel-messages').append(message)
    }

    static clearHelpMessages() {
        document.getElementById('admin-panel-messages').innerHTML = '';
    }

    static updateTextarea(value){
        admpanel_tmpl.querySelector('textarea').value = value;
    }

    static onkeypress(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            AdminPanel.sendMessage();
            event.target.blur();
        }
    }

    static sendMessage() {
        var help_text = admpanel_tmpl.getElementsByTagName('textarea')[0].value.replace(/\s+/g, ' ').trim();
        if (help_text == '') return;
        mp.trigger('AdminPanel::Report::Send', help_text);
    }
    
    static setReportButtons(report_number) {
        var btns = document.getElementById('admin-panel-textarea-container').querySelectorAll('button');
        btns[0].setAttribute('onclick', `AdminPanel.playerRequest(10, ${report_number})`);
        btns[1].setAttribute('onclick', `AdminPanel.playerRequest(11, ${report_number})`);
        document.getElementById('admin-panel-report-btns').lastChild.setAttribute('onclick', `AdminPanel.closerepRequest(${report_number})`);
    }



    /*misc*/
    static cur_cont;
    static switchContainer(idx) {
        this.cur_cont = idx;
        idx++;
        var parent = document.getElementById('admin-panel-containers');
        Array.from(parent.children).forEach(child => child.style.display = 'none');
        parent.children[idx].style.display = 'flex';
        var back = document.getElementById('admin-panel-bottom').firstElementChild;
        back.style = idx == 0 ? 'visibility:hidden;pointer-events:none;' : '';
        back.parentElement.className = idx == 3 ? 'bottom-report' : 'bottom-default';
    }

    static copyCommand(id) {
        var text = document.getElementById(`${id}-4-action-0`).innerText.split(',')[0];
        var input = document.createElement('input');
        input.setAttribute('value', text);
        document.body.appendChild(input);
        input.select();
        var result = document.execCommand('copy');
        document.body.removeChild(input);
        return result;
     }



    /*requests*/
    static searchRequest(string) {
        mp.trigger('AdminPanel::SearchPlayer', string);
    }

    static actionRequest(id) {
        mp.trigger('AdminPanel::Action', id);
        // id = 0, 2, 3, 4 -> AdminPanel.fillActionInformation(id, data);
        // id = 1 -> AdminPanel.showCurrentReport(title)
    }

    static amnestyRequest(id) {
        mp.trigger('AdminPanel::AmnestyPunishment', id);
    }

    static reportRequest(id) {
        mp.trigger('AdminPanel::ShowReport', id);
    }

    static anticheatRequest(action, id) {
        mp.trigger('AdminPanel::AnticheatAction', action, id);
    }

    static employeeRequest(action, id) {
        mp.trigger('MenuFrac::EmployeeAction', action, id);
    }

    static playerRequest(action, id) {
        mp.trigger('AdminPanel::ManipulatePlayerAction', action, id);
        // id = 8 -> AdminPanel.showCurrentReport(title)
        // id = 9 -> AdminPanel.fillActionInformation(1, data, full_name);
    }

    static closerepRequest(id) {
        mp.trigger('AdminPanel::Report::Close', id);
    }

    static backRequest() {
        mp.trigger('AdminPanel::Back', this.cur_cont);
    }
}

AdminPanel.draw(['Модератор [1]', 10]);

var reports_data = [
    [3000, "23:59", "Annlynn Recanter", "Annlynn Recanter"],
    [3001, "23:59", "Annlynn Recanter", "Annlynn Recanter"],
    [3002, "23:59", "Annlynn Recanter", "Annlynn Recanter"],
]
var history_data = [
    [3000, true,  "Бан", "25.02.2023 12:38", "Annlynn Recanter", "Annlynn Recanter cheated"]
]
var anticheat_data = [
    [3000, "23:59", "Annlynn Recanter", "Annlynn Recanter cheated"],
    [3001, "23:59", "Annlynn Recanter", "Annlynn Recanter cheated"],
    [3002, "23:59", "Annlynn Recanter", "Annlynn Recanter cheated"],
]
var admins_data = [
    [3000, true, "Annlynn Recanter",  "25.02.2023 12:38", "1 - Модератор"],
    [3001, false, "Annlynn Recanter",  "25.02.2023 12:38", "2 - Администратор"],
    [3002, true, "Annlynn Recanter",  "25.02.2023 12:38", "3 - Владелец"],
]
var commands_data = [
    [3000, "/teleport, /tp", "PID (uint)", "Телепортироваться к игроку"]
]