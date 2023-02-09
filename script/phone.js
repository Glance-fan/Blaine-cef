var Phone = class Phone {
    static container = document.getElementById('phone-apps-container');
    static showPhone(status) {
        phone_tmpl.style.opacity = status ? 0.99999 : 0;
        phone_tmpl.style.pointerEvents = status ? 'unset' : 'none';
		
		phone_tmpl.style.transform = status ? 'translateX(0)' : 'translateX(100%)';
    }

    /*menu*/
    static drawMenu() {
        drawAppRow(apps[0], 'phone-mm-fav-apps');
        apps.slice(1, apps.length).forEach(app_row => {
            drawAppRow(app_row, 'phone-mm-apps');
        });

        function drawAppRow(app_row, pid) {
            var container = document.getElementById(pid);
            container.innerHTML += /*html*/ `<div class="app-row"></div>`;
            var row = container.lastElementChild;
            app_row.forEach(app => {
                row.innerHTML += /*html*/
                    `<div class="phone-app">
                        <div class="${app[0]}-app-grad phone-app-icon" onclick="Phone.appRequest(this.id)" id="${app[0]}_app"><img src="libs/svgs/phone/apps/${app[0]}_app.svg"></div>
                        <div>${app[1]}</div>
                    </div>`
            })
        }
    }

    static showMenu(status) {
        var menu = document.getElementById('phone-main-menu');
        if (status) {
            menu.style.display = 'flex';
            this.container.style.display = 'none';
            this.container.innerHTML = '';
        } else {
            menu.style.display = 'none';
            this.container.style.display = 'flex';
        }
    }



    /*phone-app*/
    static phone_keys = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        ['*', 0, '#'],
        ['back', 'call', 'erase']
    ]
    static cur_phone;
    static drawPhoneApp(params) {
        this.container.innerHTML = /*html*/ `<div id="phone-app"><div id="phone-app-number"></div></div>`;
        this.cur_phone = document.getElementById('phone-app-number');
        switch (params.length) {
            case 0: //player clicked on phone app
            case 1: //autocomplete phone number
                this.container.innerHTML += /*html*/ `<div id="phone-list" onclick="mp.trigger('Phone::Tab', 0)"><img src="libs/svgs/phone/list.svg"/></div>${this.container.innerHTML}`;
                this.cur_phone = document.getElementById('phone-app-number');
                if (params[0]) this.cur_phone.innerText = params[0];
                this.container.lastElementChild.innerHTML += /*html*/ `<div id="keys-wrapper"></div>`;
                var keys_wrapper = document.getElementById('keys-wrapper');
                for (var row = 0; row < this.phone_keys.length; row++) {
                    keys_wrapper.innerHTML += /*html*/ `<div class="phone-keys-row"></div>`;
                    for (var column = 0; column < this.phone_keys[row].length; column++)
                        if (row != 4)
                            keys_wrapper.lastElementChild.innerHTML += /*html*/ `<div onclick="Phone.onPhoneKey(this.innerText)">${this.phone_keys[row][column]}</div>`;
                        else
                            keys_wrapper.lastElementChild.innerHTML += /*html*/ `<div onclick="Phone.onPhoneKey('${this.phone_keys[row][column]}')"><img src="libs/svgs/phone/${this.phone_keys[row][column]}.svg"></div>`;
                }
                break;
            case 2: //someone is calling player
            case 3: //player's call with status str
                this.cur_phone.innerHTML = params[1];
                this.container.firstElementChild.classList.add('all-absolute');
                this.container.firstElementChild.innerHTML += /*html*/ `
                    <div id="phone-status">${params[0] ? `Входящий вызов` : params[2]}</div>
                    <div id="phone-buttons" style="top: 245px;">
                        <img src="libs/svgs/phone/decline.svg" onclick="Phone.declineRequest()">
                        ${params[0] ? /*html*/ `<img src="libs/svgs/phone/call.svg" style="margin-left: 50px;" onclick="Phone.acceptRequest()">` : ``}
                    </div>`;
                break;
        }
        this.cur_phone = document.getElementById('phone-app-number');
    }

    static updatePhoneStatus(status) {
        document.getElementById('phone-status').innerHTML = status;
    }

    static onPhoneKey(key) {
        switch (key) {
            case 'back':
                this.leaveRequest()
                break;
            case 'call':
                this.callRequest();
                break;
            case 'erase':
                this.cur_phone.innerText = this.cur_phone.innerText.slice(0, -1)
                break;
            default:
                if (this.cur_phone.innerText.length == 10) return;
                this.cur_phone.innerText += key;
        }
    }

    //call_list[i] = [index, phone_number, 'contact' || null]
    static drawCallList(data) {
        this.container.innerHTML = /*html*/ `
            <div class="app-wrapper">
                <div>
                    <div class="apps-h1">История вызовов</div>
                    <div class="app-scrollable empty-container" id="call-list-container" style="height:240px"></div>
                </div>
                <div class="phone-bottom-blur">
                    <img src="libs/svgs/phone/back.svg" style="position: absolute;left: 30px;" onclick="Phone.appRequest('phone_app')">
                    <img src="libs/svgs/phone/block.svg" onclick="mp.trigger('Phone::Tab', 1)">
                </div>
            </div>
            <div class="phone-ttp-wrapper"></div>`;
        this.fillCallList(data);
    }   

    static fillCallList(call_list) {
        var parent = document.getElementById('call-list-container');
        parent.classList.remove('empty-container');
        if (!call_list) {
            parent.classList.add('empty-container');
            parent.innerHTML = /*html*/ `<span>Пока что у Вас нет\nни одного вызова</span>`
        } else {
            parent.innerHTML = '';
            for (var index = 0; index < call_list.length; index++)
                this.addCall(...call_list[index]);
        }
    }

    static addCall(index, phone, name) {
        var parent = document.getElementById('call-list-container');
        parent.innerHTML += /*html*/
            `<div id="${parent.childElementCount}-contact-app" onclick="Phone.showTooltip(this, 'contact', ${parent.childElementCount})" class="contact-elem"><img src="libs/svgs/phone/call_status/${index}.svg">${name || phone}</div>`;
    }

    static drawBlackList(data) {
        this.container.innerHTML = /*html*/ `
            <div class="app-wrapper">
                <div>
                    <div class="apps-h1">Черный список</div>
                    <div class="black-list-wrapper">
                        <div class="app-scrollable empty-container" id="black-list-container" style="height:175px"></div>
                        <input maxlength="10" placeholder="Ввод" autocomplete="false" spellcheck="false" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32"/>
                        <button class="red-button" onclick="Phone.blacklistRequest()">Добавить</button>
                    </div>
                </div>
                <div class="phone-bottom-blur">
                    <img src="libs/svgs/phone/back.svg" onclick="Phone.appRequest('phone_app')">
                </div>
            </div>`;
        this.fillBlackList(data);
    }

    static fillBlackList(call_list) {
        var parent = document.getElementById('black-list-container');
        parent.classList.remove('empty-container');
        if (!call_list) {
            parent.classList.add('empty-container');
            parent.innerHTML = /*html*/ `<span> Пока что Вы не добавили в черный список ни один номер</span>`
        } else {
            parent.innerHTML = '';
            for (var index = 0; index < call_list.length; index++)
                this.addBlackList(...call_list[index]);
        }
    }

    static addBlackList(phone, name) {
        var parent = document.getElementById('black-list-container');
        parent.innerHTML += /*html*/
            `<div id="${parent.childElementCount}-contact-app" class="contact-elem">${name || phone}<img onclick="Phone.tooltipRequest('black-list', 0, ${phone})" src="libs/svgs/phone/cross.svg"></div>`;
    }


    /*contacts-app*/
    static drawContactsApp(data) {
        this.container.innerHTML = /*html*/
            `<div class="app-wrapper">
                <div id="contact-app">
                    <div class="apps-h1"></div>
                    <div id="contacts-container" class="empty-container app-scrollable"></div>
                    <div class="contact-inputs">
                        <div>
                            <div>Имя</div>
                            <input placeholder="Ввод" maxlength="24">
                        </div>
                        <div>
                            <div>Номер телефона</div>
                            <input placeholder="Ввод" maxlength="10" autocomplete="false" spellcheck="false" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32"/>
                        </div>
                    </div>
                </div>
                <div class="phone-bottom-blur"></div>
            </div>
            <div class="phone-ttp-wrapper"></div>`;
        this.fillContacts(data);
        this.showSubContainer('contact-app', false);
    }

    // data[i] = ['name', 'phone']
    static fillContacts(data) {
        var parent = document.getElementById('contacts-container');
        parent.classList.remove('empty-container');
        this.container.querySelector('.apps-h1').innerText = 'Мои контакты';
        this.setBottomContacts(false);
        if (!data) {
            parent.classList.add('empty-container');
            parent.innerHTML = /*html*/ `<span>Пока что у Вас нет ни одного\nсохраненного контакта</span>`
        } else {
            parent.innerHTML = '';
            for (var index = 0; index < data.length; index++)
                this.addContact(...data[index]);
        }
    }

    static addContact(name, phone) {
        var parent = document.getElementById('contacts-container');
        parent.innerHTML += /*html*/
            `<div id="${parent.childElementCount}-contact-app" onclick="Phone.showTooltip(this, 'contact', ${phone})" class="contact-elem">${name} [${phone}]</div>`
    }

    static contactEdit(contact) {
        this.showSubContainer('contact-app', true);
        this.container.querySelector('.apps-h1').innerText = contact ? 'Изменение контакта' : 'Новый контакт';
        this.setBottomContacts(true);
        if (contact) {
            var inputs = document.querySelector('.contact-inputs').querySelectorAll('input');
            inputs[0].value = contact[0];
            inputs[1].value = contact[1];
        }
    }

    static setBottomContacts(isEdit) {
        var bottom = this.container.querySelector('.phone-bottom-blur');
        if (isEdit) bottom.innerHTML = /*html*/ `
            <img src="libs/svgs/phone/back.svg" style="position: absolute;left: 30px;" onclick="Phone.appRequest('contacts_app')">
            <img src="libs/svgs/phone/confirm.svg" onclick="Phone.confirmRequest()">`;
        else bottom.innerHTML = /*html*/ `
            <img src="libs/svgs/phone/back.svg" style="position: absolute;left: 30px;" onclick="Phone.leaveRequest()">
            <img src="libs/svgs/phone/add.svg" onclick="Phone.tabRequest(0)">`;
    }

    static backEdit() {
        this.showSubContainer('contact-app', false);
        this.setBottomContacts(false);
    }


    /*sms-app*/
    static drawSmsApp(data) {
        this.container.innerHTML = /*html*/ `
            <div class="app-wrapper">
                <div>
                    <div class="apps-h1"></div>
                    <div id="last-sms-container" class="app-scrollable"></div>
                    <div id="full-sms-container" class="app-scrollable"></div>
                    <div id="type-sms-container">
                        <div>Кому: <input id="typing-sms-0" placeholder="введите номер" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32" maxlength="20" autocomplete="false" spellcheck="false"></div>
                        <textarea id="typing-sms-1" placeholder="Ввести текст" maxlength="150"></textarea>
                    </div>
                </div>
                <div class="phone-bottom-blur"></div>
            </div>`;
        this.fillLastMessages(data);
    }


    //messages[i] = [phone_number, 'contact' || null, 'date', 'message']
    static fillLastMessages(messages) {
        this.switchTabSms('last-sms', 'Сообщения')
        var parent = document.getElementById('last-sms-container');
        parent.innerHTML = '';
        parent.className = 'app-scrollable';
        if (!messages) {
            parent.style.display = 'flex';
            parent.classList.add('empty-container');
            parent.innerHTML = /*html*/ `<span>Пока что у Вас нет<br>ни одного сообщения</span>`
            return;
        }
        messages.forEach(sms => {
            parent.innerHTML += /*html*/ `<div class="last-sms-elem" onclick="Phone.fullsmsRequest(${sms[0]})"><div><span>${sms[1] || sms[0]}</span><span>${sms[2]}</span></div><div>${sms[3]}</div></div>`
        });
    }

    //data = [phone_number, messages_arr, 'contact' || null]
    //messages_arr[i] = [isOwner, 'text-message', 'date']
    static fillFullSms(data) {
        this.switchTabSms('full-sms', data[2] || data[0], data[0]);
        document.getElementById('full-sms-container').innerHTML = '';
        data[1].forEach(message => {
            this.addNewMessage(...message);
        })
    }

    static addNewMessage(isOwner, text, date) {
		var textDiv = document.createElement('div'),
		    parent = document.getElementById('full-sms-container');
		
		textDiv.className = "sent-sms";
        text = convertGeo(text);
		textDiv.innerText = text[0];
        textDiv.innerHTML += '<br><br>' + text[1];

        parent.innerHTML += /*html*/ `
            <div class="sent-sms-wrapper" style="flex-direction: ${isOwner ? 'row-reverse' : 'row'}">
                <div class="time-sms" style="${isOwner ? 'margin-left: 5px' : 'margin-right: 5px'}">${date}</div>
				${textDiv.outerHTML}
            </div>`;
        
        parent.scrollTop = parent.scrollHeight;

        function convertGeo(str) {
            var coords_str = '';
            str = str.replace(/<GEOL>([^<]+)<\/GEOL>/g, function (string, coords) {
                coords_str +=/*html*/ `<div class="geo-link" onclick="mp.trigger('Phone::SendCoords', '${coords}')">Геолокация</div>`;
                return '';
            });
            return [str, coords_str];
        }
    }

    static fillTyping(phone_number, text) {
        this.switchTabSms('type-sms', 'Новое сообщение');
        document.getElementById('typing-sms-0').value = phone_number ? phone_number : '';
        document.getElementById('typing-sms-1').value = text ? text : '';
    }

    static switchTabSms(id, h1, param) {
        this.switchTab(id, h1);
        this.setBottomSms(id, param);
    }

    static setBottomSms(id, phone_number) {
        var bottom = this.container.querySelector('.phone-bottom-blur');
        switch (id) {
            case 'last-sms':
                bottom.innerHTML = /*html*/ `
                    <img src="libs/svgs/phone/back.svg" style="position: absolute;left: 30px;" onclick="Phone.leaveRequest()">
                    <img src="libs/svgs/phone/sms.svg" onclick="Phone.typingRequest()">`;
                break;
            case 'full-sms':
                bottom.innerHTML = /*html*/ `
                    <img src="libs/svgs/phone/back.svg" style="position: absolute;left: 30px;" onclick="Phone.appRequest('sms_app')">
                    <img src="libs/svgs/phone/sms.svg" onclick="Phone.typingRequest(${phone_number})">
                    <img src="libs/svgs/phone/delete.svg" style="position: absolute;right: 30px;" onclick="Phone.deletesmsRequest(${phone_number})">`;
                break;
            case 'type-sms':
                bottom.innerHTML = /*html*/ `
                    <img src="libs/svgs/phone/back.svg" style="position: absolute;left: 30px;" onclick="Phone.appRequest('sms_app')">
                    <img src="libs/svgs/phone/sms.svg" onclick="Phone.sendsmsRequest()">
                    <img src="libs/svgs/phone/marker.svg" style="position: absolute;right: 30px;" onclick="Phone.sendsmsRequest(true)">`;
                break;
        }
    }



    /*settings-app*/
    static settings = [
        ['Режим "Не беспокоить"', 'switch', 'disturb'],
        ['Выбор обоев', 'click', 'wallpaper'],
    ];
    static drawSettingsApp() {
        this.container.innerHTML = /*html*/
            `<div class="app-wrapper">
                <div>
                    <div class="apps-h1">Настройки</div>
                    <div id="settings-container" class="app-scrollable"></div>
                    <div id="wallpaper-container" class="app-scrollable"></div>
                </div>
                <div class="phone-bottom-blur">
                    <img src="libs/svgs/phone/back.svg" onclick="Phone.leaveRequest()">
                </div>
            </div>`
        this.fillSettings(this.settings);
        this.drawWallpaperTab();
    }

    static fillSettings(settings) {
        var parent = document.getElementById('settings-container');
        parent.innerHTML = '';
        for (var index = 0; index < settings.length; index++) {
            parent.innerHTML += /*html*/ `
                <div><div>
                    <img src="libs/svgs/phone/settings/${index}.svg">
                    ${settings[index][0]}
                </div></div>`;
            switch (settings[index][1]) {
                case 'switch':
                    var id = settings[index][2];
                    console.log(id)
                    parent.lastElementChild.innerHTML += /*html*/ `
                    <label class="phone-checkbox">
                        <input id="${id}" onclick="Phone.onToggle(this)" type="checkbox">
                        <span class="phone-checkbox-switch"></span>
                    </label>`;
                    setTimeout(() => {document.getElementById(id).checked = this.cur_sett[id]}, 0);
                    break;
                case 'click':
                    parent.lastElementChild.innerHTML += /*html*/ `<img onclick="Phone.tabRequest('${settings[index][2]}')" src="libs/svgs/phone/back.svg">`;
                    break;
            }
        }
    }

    static wp_amount = 12;
    static cur_sett = {
        disturb: false,
        wp: 0,
    }
    static drawWallpaperTab() {
        var parent = document.getElementById('wallpaper-container');
        parent.innerHTML = /*html*/ `<div class="wallpaper-row"></div>`;
        var row = parent.lastElementChild;
        for (var index = 0, current = 0; index < this.wp_amount; index++, current++) {
            if (current == 3) {
                parent.innerHTML += /*html*/ `<div class="wallpaper-row"></div>`;
                row = parent.lastElementChild;
                current = 0;
            }
            row.innerHTML += /*html*/ `<div id="${index}-phonewp" onclick="Phone.wallpaperRequest(${index})"><img src="libs/img/phone_wallpapers/${index}.png"></div>`;
        }
        this.updateWallpaper(this.cur_sett.wp);
    }

    static updateWallpaper(index) {
        var el = document.getElementById('wp-select');
        if (el) el.remove();
        document.getElementById(`${index}-phonewp`).innerHTML += /*html*/
            `<div id="wp-select" style="background:url('libs/svgs/phone/wp_select.svg')"></div>`
        this.setWallpaper(index);
    }

    static setWallpaper(index) {
        phone_tmpl.style.background = `url('libs/img/phone_wallpapers/${index}.png')`;
        this.cur_sett.wp = index;
    }

    static switchTabSettings(id, h1) {
        this.switchTab(id, h1)
        var back = this.container.querySelector('.phone-bottom-blur').firstElementChild;
        if (id.includes('settings')) back.setAttribute('onclick', 'Phone.leaveRequest()');
        else back.setAttribute('onclick', 'Phone.switchTabSettings("settings", "Настройки")');
    }

    static updateDisturb(status) {
        this.setToggleState('disturb', status);
        this.setDisturb(status);
    }

    static setDisturb(status) {
        var status_bar = document.getElementById('phone-top').lastChild;
        if (status) status_bar.innerHTML = /*html*/ `<img src="libs/svgs/phone/disturb.svg">${status_bar.innerHTML}`;
        else status_bar.firstChild.remove();
        this.cur_sett.disturb = status;
    }



    /*veh-app*/
    static drawVehApp(data) {
        this.container.innerHTML = /*html*/
            `<div class="app-wrapper">
                <div class="app-scrollable empty-container">
                    <div style=${data[0] ? 'display:block' : 'display:none'}>
                        <div class="apps-h1" style="margin-bottom: 15px">Личный транспорт</div>
                        <div id="veh-owned-container"></div>
                    </div>
                    <div style=${data[1] ? 'display:block' : 'display:none'}>
                        <div class="apps-h1" style="margin-bottom: 15px">Арендованный транспорт</div> 
                        <div id="veh-rented-container"></div>
                    </div>
                    <div style="${!data[0] && !data[1] ? 'display:flex' : 'display:none'}">
                        <span>Вы не владеете и не арендуете ни один транспорт</span>
                    </div>
                </div>
                <div class="phone-bottom-blur">
                    <img src="libs/svgs/phone/back.svg" onclick="Phone.leaveRequest()">
                </div>
            </div>
            <div class="phone-ttp-wrapper"></div>`;
        if (!data[0] && !data[1]) return;
        document.querySelector('.app-scrollable').classList.remove('empty-container');
        if (data[0]) this.fillVehs('veh-owned-container', 'owned', data[0]);
        if (data[1]) this.fillVehs('veh-rented-container', 'rented', data[1]);
        Array.from(document.querySelectorAll('.veh-app-elem')).at(-1).style = 'margin-bottom: 15px';
    }

    static fillVehs(pid, from, vehs) {
        var parent = document.getElementById(pid);
        parent.innerHTML = '';
        for (var index = 0; index < vehs.length; index++)
            parent.innerHTML += /*html*/ `<div id="${index}-${from}-veh-app" class="veh-app-elem" onclick="Phone.showTooltip(this, '${from}', ${vehs[index][0]})">${propertyIcons[vehs[index][2]]}<div>${vehs[index][1]}</div></div>`
    }


    /*bank-app*/
    static stored_menu;
    // data = ['name', bal_d, bal_s] 
    static drawBankApp(data) {
        this.container.innerHTML = /*html*/
            `<div class="app-wrapper">
                <div>
                    <div class="apps-h1">Банк</div>
                    <div id="bank-container">
                        <div id="bank-tariff-info" class="phone-app-info"></div>
                        <div id="bank-menu">
                            <div></div>
                            <div></div>
                        </div>
                        <div id="bank-tab">
                            <div class="apps-h1" style="margin-top: 30px"></div>
                            <div id="bank-tab-container"></div>
                            <button class="red-button" onclick="Phone.transactionRequest(this.parentElement)"></button>
                        </div>
                    </div>
                </div>
                <div class="phone-bottom-blur">
                    <img src="libs/svgs/phone/back.svg" onclick="Phone.leaveRequest()">
                </div>
            </div>`;
        this.fillInfo('bank-tariff-info', data, ['Пакет услуг', 'Баланс (дебет.)', 'Баланс (сберег.)']);
        this.fillBankMenu(this.stored_menu);
    }

    static bank_tabs = ['Переводы', 'Счет дома', 'Счет квартиры', 'Счет гаража', 'Счет бизнеса']
    static fillBankMenu(data) {
        var child, parent = document.getElementById('bank-menu');
        this.showSubContainer('bank-container', false);
        if (data) parent.innerHTML = data;
        else {
            for (var index = 0; index < this.bank_tabs.length; index++) {
                child = index < 3 ? parent.firstElementChild : parent.lastElementChild;
                child.innerHTML += /*html*/ `<div><img onclick="Phone.tabRequest(${index})" src="libs/svgs/phone/bank_app/${index}.svg"><div>${this.bank_tabs[index]}</div></div>`;
            }
            this.stored_menu = parent.innerHTML;
        }
        document.querySelector('.phone-bottom-blur').firstElementChild.setAttribute('onclick', 'Phone.leaveRequest()');
    }

    // params = [balance, rent]
    static drawBankTab(which, params) {
        this.showSubContainer('bank-container', true);
        var parent = document.getElementById('bank-tab');
        parent.querySelector('.apps-h1').innerHTML = which ? `Оплата ${this.bank_tabs[which].split(' ')[1]}` : 'Перевод стредств';
        parent.querySelector('button').innerText = which ? 'Оплатить' : 'Перевести';
        if (which) { //оплата бизнеса
            parent.children[1].innerHTML = /*html*/ `
                <div id="bank-tab-info" class="phone-app-info"></div>
                <div class="phone-app-input">
                        $<input maxlength="10" autocomplete="false" spellcheck="false" placeholder="Сумма" value="${params[1] - params[0] > 0 ? params[1] - params[0] : params[1]}"/>
                </div>`;
            var static_data = [1, 2].includes(which) ? ['Баланс', 'Аренда (в час)'] : ['Баланс', 'Налог (в час)']
            this.fillInfo('bank-tab-info', params, static_data);
            /* */
        } else { //перевод игроку
            parent.children[1].innerHTML = /*html*/ `
                <div class="phone-app-input">
                    #<input maxlength="10" autocomplete="false" spellcheck="false" placeholder="CID игрока"/>
                </div>
                <div class="phone-app-input">
                    $<input maxlength="10" autocomplete="false" spellcheck="false" placeholder="Сумма"/>
                </div>`
        }

        Array.from(parent.querySelectorAll('input')).forEach(input => {
            input.setAttribute('oninput', 'Phone.oninput(this)');
            input.setAttribute('onfocus', 'Phone.onfocus(this)');
            input.setAttribute('onblur', 'this.parentElement.style.animation = ""');
            input.setAttribute('onkeydown', 'javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32');
        })
        document.querySelector('.phone-bottom-blur').firstElementChild.setAttribute('onclick', 'Phone.fillBankMenu(Phone.stored_menu)');
    }



    /*bsim-app*/
    // data = ['phone_number', balance, cost_minute, cost_sms]
    static drawBSimApp(data) {
        this.container.innerHTML = /*html*/
            `<div class="app-wrapper">
                <div>
                    <div class="apps-h1">BSim</div>
                    <div id="bsim-container">
                        <div id="bsim-app-info" class="phone-app-info"></div>
                        <div>
                            <div style="font-weight: 500;font-size: 10px;">Пополнение баланса</div>
                            <div class="phone-app-input">
                                $<input oninput="Phone.oninput(this)" onfocus="Phone.onfocus(this)" onblur="this.parentElement.style.animation = ''" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32" maxlength="10" autocomplete="false" spellcheck="false" placeholder="Сумма"/>
                            </div>
                            <button class="red-button" onclick="Phone.transactionRequest(this.parentElement)">Пополнить</button>
                            <div class="phone-info-text">Пополнение баланса<br>осуществляется<br>через Ваш банковский счет</div>
                        </div>
                    </div>
                </div>
                <div class="phone-bottom-blur">
                    <img src="libs/svgs/phone/back.svg" onclick="Phone.leaveRequest()">
                </div>
            </div>`;
        this.fillInfo('bsim-app-info', data, ['Ваш номер', 'Ваш баланс', '1 мин. разговора', '1 символ SMS']);
    }

    
    /*cab-app*/
    static cab_types = [
        ['Закажите такси прямо сейчас!', ['Ваш ID', 'Улица'], ['Заказать']],
        ['У вас есть активный заказ', ['Статус', 'Дата'], ['Отменить']],
        ['У вас есть активный заказ', ['Статус', 'ID водителя'], ['Написать', 'Позвонить']]
    ] 
    static drawCabApp(type, data) {
        var static_data = this.cab_types[type];
        this.container.innerHTML = /*html*/
            `<div class="app-wrapper">
                <div>
                    <div class="apps-h1">Такси</div>
                    <div id="cab-container">
                        <div>${static_data[0]}</div>
                        <div class="phone-app-info" id="cab-app-info"></div>                        
                    </div>
                    <div id="cab-buttons"></div>
                </div>
                <div class="phone-bottom-blur">
                    <img src="libs/svgs/phone/back.svg" onclick="Phone.leaveRequest()">
                </div>
            </div>`;
        this.fillInfo('cab-app-info', data, static_data[1]);
        var parent = document.getElementById('cab-buttons');
        static_data[2].forEach(btn => {
            parent.innerHTML += /*html*/ `<button onclick="mp.trigger('Phone::CabAction', ${parent.childElementCount})" class="red-button">${btn}</button>`
        })
    }

    /*tooltip*/
    static tooltips = {
        contact: [
            [0, 1, 2, 3],
            ['Позвонить', 'Сообщение', 'Изменить', 'Удалить']
        ],
        owned: [
            [0, 1],
            ['Найти', 'Эвакуировать']
        ],
        rented: [
            [0, 1],
            ['Найти', 'Отказаться от аренды']
        ]
    }

    static inTTP = false;
    static ttp_el;
    static showTooltip(el, from, uid) {
        if (this.inTTP) return;
        this.ttp_el = el;
        this.createTooltip(el, this.tooltips[from], from, uid)
    }

    static createTooltip(elem, data, from, uid) {
        var tooltip = this.container.querySelector('.phone-ttp-wrapper')
        tooltip.innerHTML = /*html*/ `<span class="phone-tooltip-arrow"></span><p class="phone-tooltip"></p>`
        for (var index = 0; index < data[0].length; index++)
            tooltip.lastElementChild.innerHTML += /*html*/ ` 
                <span onclick="Phone.tooltipRequest('${from}', ${data[0][index]}, ${uid})">${data[1][index]}</span>`;
        this.inTTP = true;

        elem.onmouseleave = () => {
            setTimeout(() => {
                var under = document.elementsFromPoint(...Object.values(mousePos));
                for (var index = 0; index < under.length; index++)
                    if (under[index].className == 'phone-ttp-wrapper') return;
                defaultTTP(tooltip);
            }, 100)
        }
        tooltip.onmouseleave = () => {
            defaultTTP(tooltip);
        }
        document.querySelector('.app-scrollable').onscroll = () => {
            defaultTTP(tooltip);
        }


        var dims = elem.getBoundingClientRect();
        var p_dims = tooltip.getBoundingClientRect();
        tooltip.style.top = dims.top + dims.height / 2 - p_dims.top + 'px';
        tooltip.style.left = dims.width / 2 - p_dims.width / 2 + 'px';

        function defaultTTP(ttp) {
            ttp.innerHTML = '';
            ttp.style = '';
            Phone.inTTP = false;
            ttp.onmouseleave = null;
            document.querySelector('.app-scrollable').onscroll = null;
        }
    }


    /*misc*/
    static fillInfo(pid, params, names) {
        var parent = document.getElementById(pid);
        parent.innerHTML = /*html*/ `<div></div><div></div>`;
        for (var index = 0; index < names.length; index++) {
            parent.firstChild.innerHTML += /*html*/ `<div>${names[index]}</div>`;
            parent.lastChild.innerHTML += /*html*/ `<div>${typeof (params[index]) === 'string' ? params[index]  :prettyUSD(params[index])}</div>`;
        }
    }

    // pid = 'bank-tariff-info' || 'bank-tab-info' || 'bsim-app-info' || 'cab-app-info'
    static updateInfoLine(pid, which, value) {
        document.getElementById(pid).lastChild.children[which].innerText = typeof value === 'string' ? value : prettyUSD(value);
    }

    static timeInterval = setInterval(() => {
        this.timeServer()
    }, 1000);
    static timeServer() {
        var date = new Date().toLocaleString('ru', {
            timeZone: "Europe/Moscow"
        }).split(',');
        document.getElementById('phone-time').innerHTML = date[0].replace('.20', '.') + date[1].slice(0, -3);
    }


    static onfocus(input) {
        input.select();
        input.parentElement.style.animation = '5s ease 0s infinite normal none running selected';
    }

    static oninput(input) {
        if (input.value == '' || input.value == 0 || input.value.at(0) == 0) {
            input.value = 0;
            input.select();
        }
        if (input.value > 999999999) input.value = 999999999;
    }

    static showSubContainer(pid, status) {
        if (status) {
            document.getElementById(pid).children[1].style.display = 'none';
            document.getElementById(pid).children[2].style.display = 'flex';
        } else {
            document.getElementById(pid).children[1].style.display = 'flex';
            document.getElementById(pid).children[2].style.display = 'none';
        }
    }

    static switchTab(id, h1) {
        var children = Array.from(document.querySelector('.app-wrapper').firstElementChild.children);
        children[0].innerHTML = h1;
        children.slice(1, children.length).forEach(child => {
            child.style.display = child.id.includes(id) ? 'block' : 'none';
        });
    }

    static setToggleState(id, state) {
        document.getElementById(id).checked = state;
    }


    /*requests*/
    static appRequest(app_id) {
        mp.trigger('Phone::OpenApp', app_id);
        /*response*/
        // Phone.showMenu(false)
        // -> Phone.draw***App(params);
    }

    static transactionRequest(el) {
        mp.trigger('Phone::Transaction', ...Array.from(el.querySelectorAll('input')).map(i => i.value));
        // раскомментируй если хочешь, чтоб инпут очищался после реквеста
        // Array.from(el.querySelectorAll('input')).at(-1).value = ''; 
    }

    static tooltipRequest(from, action, elem_id) {
        mp.trigger('Phone::Tooltip', from, action, elem_id);
        setTimeout(() => {
            this.inTTP = false;
        }, 1000);
        /*response*/
        // from == 'contact'
        // -> action == 0: Phone.drawPhoneApp([phone_number]);
        // -> action == 1: Phone.drawSmsApp(); Phone.fillTyping(phone_number)
        // -> action == 2: Phone.contactEdit(['name', phone_number] || null);
        // -> action == 3: Phone.fillContacts(data);
    }

    static leaveRequest() {
        mp.trigger('Phone::OpenApp', null);
        /*response*/ // -> Phone.showMenu(false)
    }

    // phone-app-requests
    static callRequest() {
        mp.trigger('Phone::Call', this.cur_phone.innerText)
    }

    static declineRequest() {
        mp.trigger('Phone::ReplyCall', false);
    }

    static acceptRequest() {
        mp.trigger('Phone::ReplyCall', true);
    }

    static blacklistRequest() {
        mp.trigger('Phone::AddToBlackList', this.container.querySelector('input').value);
    }

    // contact-app-requests
    static confirmRequest() {
        mp.trigger('Phone::ContactConfrim', ...Array.from(this.container.querySelectorAll('input')).map(i => i.value));
        /*response*/
        // -> Phone.fillContacts(data); || Phone.addContact(data); 
        // Phone.showSubContainer('contact-app', false);
    }

    // bank-tab-request + settings-tab-request
    static tabRequest(id) {
        mp.trigger('Phone::Tab', id);
        /*response*/ // -> Phone.drawBankTab(params);
        /*response*/ // -> Phone.switchTabSettings('wallpaper', 'Выбор обоев');
        /*response*/ // -> Phone.contactEdit();
    }

    // settings request 
    static onToggle(setting) {
        mp.trigger('Phone::UpdateSetting', setting.id, setting.checked);
        setting.checked = !setting.checked;
        /*response*/ // -> Phone.setToggleState('id', state);
    }

    static wallpaperRequest(index) {
        mp.trigger('Phone::UpdateWallpaper', index)
        /*response*/ // -> Phone.updateWallpaper(index);
    }

    // sms request
    static fullsmsRequest(phone_number) {
        mp.trigger('Phone::Tab', 1, phone_number)
        /*response*/ // -> Phone.fillFullSms(data)
    }

    static typingRequest(phone_number) {
        mp.trigger('Phone::Tab', 0, phone_number)
        /*response*/ // -> Phone.fillTyping(phone_number)
    }

    static sendsmsRequest(geo) {
        var inputs = [document.getElementById('typing-sms-0'), document.getElementById('typing-sms-1')]
        mp.trigger('Phone::SmsSend', ...inputs.map(i => i.value), geo);
        // раскомментируй если хочешь, чтоб инпут очищался после реквеста
        // inputs.forEach(i => {
        //     i.value = '';
        // });
    }

    static deletesmsRequest(phone_number) {
        mp.trigger('Phone::SmsDelete', phone_number);
    }
}

apps = [
    [
        ['phone', 'Телефон'],
        ['contacts', 'Контакты'],
        ['sms', 'Сообщения'],
        ['browser', 'Браузер']
    ],
    [
        ['settings', 'Настройки'],
        ['veh', 'Транспорт'],
        ['bank', 'Банк'],
        ['bsim', 'BSim']
    ],
    [
        ['camera', 'Камера'],
        ['gps', 'Навигатор'],
        ['music', 'Музыка'],
        ['cab', 'Такси']
    ]
]

Phone.drawMenu();
Phone.setWallpaper(9);
Phone.showPhone(true);