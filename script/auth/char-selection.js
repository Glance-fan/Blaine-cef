var AuthSelect = class CharSelection {
    static data = null;
    static active_char = null;

    static fillPanel(login, regDate, bCoins, lastChar, newData) {
        document.querySelector('.char-line').style.height = document.querySelector('.info').offsetHeight + 'px';
        // this.data = JSON.parse(newData);
        this.data = newData;
        document.getElementById('rs-name').innerText = login.toUpperCase();
        document.getElementById('char-reg-date').innerText = regDate;
        document.getElementById('char-bcoins').innerText = bCoins + ' BC';
        this.showCharNames([this.data[0][0], this.data[1][0], this.data[2][0]]);
        this.setPics([this.data[0][3], this.data[1][3], this.data[2][3]]);
        this.clickChoice(document.getElementById(lastChar + '-chselect'));
    }

    static showCharNames(names) {
        for (var index = 0; index < names.length; index++) {
            if (!!names[index]) {
                var id = 'charname-' + (index + 1);
                document.getElementById(id).getElementsByTagName('span')[0].innerText = names[index].toUpperCase();
                document.getElementById(id).style.display = 'block';
            }
        }
    }

    static setPics(sex) {
        for (var index = 0; index < sex.length; index++) {
            if (sex[index] == null) return;
            document.getElementById(`no-char-${index + 1}`).style.display = 'none';
            if (!sex[index]) document.getElementById(`girl-${index + 1}`).style.display = 'block';
            else document.getElementById(`man-${index + 1}`).style.display = 'block';
        }
    }

    static clickChoice(choice) {
        var intId = parseInt(choice.id);
        if (intId == 2 && this.data[0][0] == null) return;
        if (intId == 3 && this.data[1][0] == null) return;
        for (var i = 1; i < 4; i++)
            document.getElementById(i + '-chselect').classList.remove('char-clicked');
        for (var i = 1; i < 4; i++) {
            var parent = document.getElementById(`no-char-${i}`);
            parent.querySelector('path').setAttribute('fill', '#787878');
            parent.lastElementChild.style.color = '#787878';
        }
        this.active_char = intId;
        choice.classList.add('char-clicked');
        document.getElementById('char-num').innerText = `Персонаж #${parseInt(choice.id)}`;
        this.setCharInfo(this.data[intId - 1]);
        var parent = document.getElementById(`no-char-${intId}`);
        parent.querySelector('path').setAttribute('fill', 'white');
        parent.lastElementChild.style.color = 'white';
        document.querySelector('.auth-play').focus();
    }

    static setCharInfo(character) {
        if (!!character[0] && !character[8]) {
            document.querySelector('.char-info').style.display = 'block';
            document.querySelector('.create-info').style.display = 'none';
            document.querySelector('.ban-info').style.display = 'none';
            document.querySelector('.auth-play').style.display = 'block';
            document.querySelector('.auth-play').innerText = 'Играть';
            if (character[9]) this.online();
            else this.offline("Offline");
            this.userdata(character);
        } else if (character[8]) {
            document.querySelector('.char-info').style.display = 'block';
            document.querySelector('.ban-info').style.display = 'block';
            document.querySelector('.create-info').style.display = 'none';
            document.querySelector('.auth-play').style.display = 'none';
            this.offline("Заблокирован");
            this.userdata(character);
        } else {
            document.querySelector('.auth-play').innerText = 'Создать';
            document.getElementById('char-name').innerText = 'Слот свободен!';
            document.querySelector('.char-info').style.display = 'none';
            document.querySelector('.ban-info').style.display = 'none';
            document.querySelector('.create-info').style.display = 'block';
            document.querySelector('.auth-play').style.display = 'block';
        }
    }

    static online() {
        document.getElementById('dot').setAttribute("fill", "#9CDE48");
        document.getElementById('alive').innerText = "Online";
        document.getElementById('alive').style.color = "#9CDE48";
    }

    static offline(string) {
        document.getElementById('dot').setAttribute("fill", "#C81212");
        document.getElementById('alive').innerText = string;
        document.getElementById('alive').style.color = "#C81212";
    }

    static userdata(character) {
        document.getElementById('char-name').innerText = character[0];
        document.getElementById('char-bank-cash').innerText = "$" + character[1].toLocaleString('ru');
        document.getElementById('char-cash').innerText = "$" + character[2].toLocaleString('ru');
        document.getElementById('char-sex').innerText = (character[3] ? "мужской" : "женский") + " пол";
        document.getElementById('char-age').innerText = character[4] + " лет";
        document.getElementById('char-fraction').innerText = character[5];
        document.getElementById('char-played').innerText = character[6] + " часов наиграно";
        document.getElementById('cid').innerText = "#" + character[7];
        if (character[8]) {
            document.querySelector('.bline').style.height = document.querySelector('.info').offsetHeight + 'px';
            document.getElementById('acid').innerText = "#" + character[10];
            document.getElementById('ban-for').innerText = character[11];
            document.getElementById('ban-from').innerText = "От " + character[12];
            document.getElementById('ban-to').innerText = character[13];
        }
    }

    static choiceMOver(choice) {
        switch (choice.id) {
            case '1-chselect':
                choice.classList.add('char-selected');
                break;
            case '2-chselect':
                if (!!this.data[0][0] && this.active_char != 2) choice.classList.add('char-selected');
                break;
            case '3-chselect':
                if (!!this.data[1][0]) choice.classList.add('char-selected');
                break;
        }
    }

    static choiceMOut(choice) {
        choice.classList.remove('char-selected');
    }

    static checkEnter(event) {
        if (event.keyCode === 13 && chselect_tmpl.style.display == 'flex') {
            event.preventDefault();
            document.querySelector('.auth-play').click();
        }
    }

    static play() {
        mp.trigger("Auth::CharacterChooseAttempt", this.active_char);
    }

    static settings(state) {
        if (state) {
            // elem.setAttribute('onclick', 'AuthSelect.settings(false, this)');
            document.querySelector('.char-select-settings').style = 'display: block';
            document.querySelector('.select-option').style = 'display: none';
            document.querySelector('.settings-info-panel').style = 'display: block';
            document.querySelector('.char-info-panel').style = 'display: none';
        } else {
            // elem.setAttribute('onclick', 'AuthSelect.settings(true, this)');
            document.querySelector('.char-select-settings').style = 'display: none';
            document.querySelector('.select-option').style = 'display: flex';
            document.querySelector('.settings-info-panel').style = 'display: none';
            document.querySelector('.char-info-panel').style = 'display: block';
        }
    }

    static fillSettings(email, date, ip, has_otp, sc_name, ) {
        ['mail', 'date', 'ip', 'otp', 'scname'].forEach((field, idx) => this.changeSettingsField(field, arguments[idx]));
        this.showSettingsBlock('nothing');
    }

    //field = 'mail', 'date', 'ip', 'otp', 'scname' 
    static changeSettingsField(field, state) {
        if (field == 'otp') {
            var color = state ? `#9CDE48` : `#C81212`;
            document.getElementById('cs-settings-otp').innerHTML = /*html*/ `<div style="color: ${color}"><div class="settings-dot" style="background: ${color}"></div>${state ? `Подключено` : `Не подключено`}</div>`;
        } else {
            document.getElementById(`cs-settings-${field}`).innerText = state;
        }
    }

    //which = 'mail', 'otp' / option = 0, 1
    static showButton(which, state, option) {
        document.getElementById(`cs-settings-btn-${which}`).style.display = state ? 'block' : 'none';
        if (which == 'otp') document.getElementById(`cs-settings-btn-${which}`).innerText = option == 0 ? 'Подключить' : 'Отключить';
    }

    static settings_type = {
        'nothing': ['Нажмите на шестеренку (вверху справа)<br>еще раз, чтобы вернуться<br>к выбору персонажа', 'display: flex;justify-content: center;align-items: center;'],
        'dis_secure': [/*html*/ `<div style="margin-bottom: 70px;">Для отключения данной защиты<br>введите код, отправленный на Вашу почту<br>и код из приложения <span style="font-weight:600;">Google Authenticator</span></div>`, '', ['mail-code', 'app-code'], 45],
        'ena_secure': [/*html*/ `<div class="settings-ena-secure">Для подключения данной защиты скачайте<br>следующее приложений на ваш смартфон<div style="font-weight:700;margin:17px 0;">Google Authenticator</div>Далее, войдите в приложение и<br>отсканируйте QR-код или введите вручную<div id="settings-qr-secret">111</div><img id="settings-qrcode">В завершение, введите сгенерированный<br>в приложении код</div>`, '', ['app-code'], 15],
        'mail_change': [/*html*/ `<div style="margin-bottom: 50px">Для смены почты<br>введите код, отправленный<br>на Вашу текущую почту</div>`, '', ['mail-code', 'new-mail'], 45],
        'otp_mail_change': [/*html*/ `<div style="margin-bottom: 50px">Для смены почты<br>введите код, отправленный<br>на Вашу текущую почту<br>и код из приложения <span style="font-weight:600;">Google Authenticator</span></div>`, '', ['mail-code', 'app-code', 'new-mail'], 40]
    };

    static input_types = {
        'mail-code': ['password', 'mail-code-static', 'Код из почты'],
        'app-code': ['password', 'app-code-static', 'Код из приложения'],
        'new-mail': ['mail', 'new-mail-static', 'Новая почта'],
    }

    //type = 'nothing', 'dis_secure', 'ena_secure', 'mail_change', 'otp_mail_change'
    static showSettingsBlock(type, secret, qr) {
        var setting = this.settings_type[type];
        var parent = document.querySelector('.settings-info-block');
        parent.innerHTML = setting[0];
        parent.style = setting[1];
        if (type != 'nothing') {
            parent.innerHTML += /*html*/ `<div class="settings-input-wrapper" style="margin-bottom: ${setting[3]}px"></div>`;
            this.drawInputs(parent.lastChild, setting[2]);
            parent.innerHTML += /*html*/ `<button class="red-button" onclick="AuthSelect.settingsButton('${type}', this.parentElement)">Продолжить</button>`
        }
        if (type == 'ena_secure') {
            document.getElementById('settings-qr-secret').innerText = secret;
            document.getElementById('settings-qrcode').src = qr;
        }
    }

    static drawInputs(parent, data) {
        data.forEach(input => {
            this.drawInput(parent, input)
        })
    }

    static drawInput(parent, id) {
        var type = this.input_types[id];
        var input = /*html*/ `
        <div class="settings-input-block" id="settings-${id}-input-block" style="opacity:0.3">
            <div class="settings-input-icon"><img src="libs/svgs/auth/${type[0]}.svg"></div>
            <div class="settings-input-static">
                <div class="settings-input-text">${type[2]}</div>
                <input type="${type[3]}" placeholder="Ввод..." onfocus="AuthSelect.onfocus(this.id)" onblur="AuthSelect.onblur(this.id)" autocomplete="off" spellcheck="off" id="settings-${id}">
                <img src="libs/svgs/auth/${type[1]}.svg">
            </div>
        </div>`;
        parent.innerHTML += input;
    }

    static onfocus(id) {
        document.getElementById(`${id}-input-block`).style.opacity = 1;
    }

    static onblur(id) {
        document.getElementById(`${id}-input-block`).style.opacity = 0.3;
    }

    static settingsButton(type, container) {
        var values = [];
        container.querySelector('.settings-input-wrapper').querySelectorAll('input').forEach(i => values.push(i.value));
        mp.trigger('Auth::SettingsNext', type, ...values);
    }
}