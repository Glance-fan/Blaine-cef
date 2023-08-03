var AuthLogin = class Login {
    static login = document.getElementById('lg-login');
    static password = document.getElementById('lg-password');

    static drawLogin(server, rsName) {
        document.getElementById('login-logotype').innerHTML = /*html*/ `<img src="libs/img/logotypes/${server}.png">`;
        document.getElementById('login-info-text').innerHTML = /*html*/ `<p>Добро пожаловать, ${rsName}!</p><p style="margin-bottom: 25px;">Войдите в Ваш аккаунт</p>`;
        this.drawInputs(['login', 'password']);
        document.getElementById('login-block').innerHTML += /*html*/ `
            <div class="auth-password-forget" onclick="mp.trigger('Auth::ForgotPassword')" onmouseover="this.style.color = 'white'" onmouseleave="this.style.color = '#858585'">Забыли пароль?</div>
            <button class="red-button auth-full-button" onclick="AuthLogin.loginAttempt(this.parentElement)" id="login-button">Войти</button>`;
    }

    static drawNewPassword(server, is_mail, step) {
        document.getElementById('login-logotype').innerHTML = /*html*/ `<img src="libs/img/logotypes/${server}.png">`;
        
        if (step == 0) {
            if (is_mail) {
                document.getElementById('login-info-text').innerHTML = `<p style="margin: 55px 0">Введите почту, которая привязана на<br>Ваш аккаунт</p>`;
                this.drawInputs(['mail']);
            } else {
                document.getElementById('login-info-text').innerHTML = `<p style="margin: 35px 0">Введите почту, которая привязана на<br>Ваш аккаунт, а также код<br>Google Authenticator</p>`;
                this.drawInputs(['mail', 'code']);
            }
        } else {
            document.getElementById('login-info-text').innerHTML = `<p>Введите код, отправленный на<br>Вашу почту</p><p style="margin-bottom: 35px;">Также, введите новый пароль</p>`;
            this.drawInputs(['code', 'new-password']);
        }

        document.getElementById('login-block').innerHTML += /*html*/ `
        <div class="auth-half-buttons">
            <button class="auth-half-button grey-button" onclick="AuthLogin.newPasswordCancel(${is_mail}, ${step})">Отмена</button>
            <button class="auth-half-button red-button" onclick="AuthLogin.newPasswordNext(this.parentElement.parentElement, ${is_mail}, ${step})">Далее</button>
        </div>`;
    }

    static drawCodeConfirm(server, is_mail) {
        document.getElementById('login-logotype').innerHTML = /*html*/ `<img src="libs/img/logotypes/${server}.png">`;
        document.getElementById('login-info-text').innerHTML = /*html*/ `<p>Вы вошли из нового места!</p><p style="margin-bottom: 45px;">${is_mail ? 'Введите код, отправленный на вашу почту' : 'Введите код Google Authenticator'}</p>`;
        this.drawInputs(['code']);
        document.getElementById('login-block').innerHTML += /*html*/ `
            <button style="margin: 45px 0 30px" class="red-button auth-full-button" onclick="AuthLogin.confirmCode(this.parentElement)" id="login-button">Продолжить</button>
            <div id="login-code-text">Если Вы утратили возможность получения данного кода,<br>
            обратитесь на форум проекта<br><div>https://forum.blaine-rp.ru</div></div>`;
    }

    static input_types = {
        'login': ['login', 'login-static', 'Логин', 'text'],
        'password': ['password', 'password-static', 'Пароль', 'password'],
        'code': ['password', 'code-static', 'Код', 'text'],
        'new-password': ['password', 'new-password-static', 'Новый пароль', 'text'],
        'mail': ['mail', 'mail-static', 'Почта', 'text']
    }

    static drawInputs(data) {
        document.getElementById('login-block').innerHTML = '';
        data.forEach(input => {
            this.drawInput(document.getElementById('login-block'), input)
        })
    }

    static drawInput(parent, id) {
        var type = this.input_types[id];
        var input = /*html*/ `
        <div class="auth-input-block" id="login-${id}-input-block" style="opacity:0.3">
            <div class="auth-input-icon"><img src="libs/svgs/auth/${type[0]}.svg"></div>
            <div class="auth-input-static">
                ${id == 'password' ? /*html*/ `<div class="auth-password-show" onclick="AuthLogin.showPassword(true, this)"><img src="libs/svgs/auth/hide-password.svg"></div>` : ''}
                <div class="auth-input-text">${type[2]}</div>
                <input type="${type[3]}" placeholder="Ввод..." onfocus="AuthLogin.onfocus(this.id)" onblur="AuthLogin.onblur(this.id)" autocomplete="off" spellcheck="off" id="login-${id}" ${id == 'password' ? /*html*/ `onkeyup="AuthLogin.checkPassword(event, this)"` : ``}>
                <img src="libs/svgs/auth/${type[1]}.svg">
                ${id == 'password' ? /*html*/ `<div class="auth-warning" id="login-${id}-warning"></div>` : ``}
            </div>
        </div>`;
        parent.innerHTML += input;
    }


    static checkPassword(event, password) {
        var message = document.createElement('p');

        if (/[а-я]/i.test(password.value)) message.innerHTML += 'Русская раскладка!';
        if (event.getModifierState("CapsLock")) {
            if (message.innerHTML) message.innerHTML += '</br>';
            message.innerHTML += 'Включен CAPS Lock!';
        }

        document.getElementById(`${password.id}-warning`).innerHTML = '';
        document.getElementById(`${password.id}-warning`).append(message);

        if (event.keyCode === 13) document.getElementById('login-button').click();
    }


    static onfocus(id) {
        document.getElementById(`${id}-input-block`).style.opacity = 1;
    }

    static onblur(id) {
        document.getElementById(`${id}-input-block`).style.opacity = 0.3;
    }

    static showPassword(state, elem) {
        var [input, img] = [elem.parentElement.querySelector('input'), elem.firstChild];
        setTimeout(() => input.focus(), 0);
        if (state) {
            elem.setAttribute('onclick', 'AuthLogin.showPassword(false, this)');
            img.src = elem.firstChild.src.replace('hide', 'show');
            input.type = 'text';
        } else {
            elem.setAttribute('onclick', 'AuthLogin.showPassword(true, this)');
            img.src = elem.firstChild.src.replace('show', 'hide');
            input.type = 'password';
        }
        setTimeout(() => input.selectionStart = input.selectionEnd = input.value.length, 0)
    }


    static loginAttempt(container) {
        var values = [];
        container.querySelectorAll('input').forEach(i => values.push(i.value));
        if (values[0] == '' || values[1] == '') return;
        mp.trigger('Auth::LoginAttempt', ...values);
    }

    static confirmCode(container) {
        var values = [];
        container.querySelectorAll('input').forEach(i => values.push(i.value));
        if (values[0] == '') return;
        mp.trigger('Auth::ConfirmCode', ...values);
    }

    static newPasswordNext(container, is_mail, step) {
        var values = [];
        container.querySelectorAll('input').forEach(i => values.push(i.value));
        if (values[0] == '') return;
        mp.trigger('Auth::NewPasswordNext', is_mail, step, ...values);
    }

    static newPasswordCancel(is_mail, step) {
        mp.trigger('Auth::NewPasswordCancel', is_mail, step);
    }
}