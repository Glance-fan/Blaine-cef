var AuthLogin = class Login {
    static login = document.getElementById('lg-login');
    static password = document.getElementById('lg-password');

    static fillPanel(server, rsName, login, token) {
        /*html*/
        document.getElementById('lg-hello').innerHTML = `<span>Добро пожаловать, ${rsName}!</span><br><span>Войдите в Ваш аккаунт</span>`;
        document.getElementById('lg-logo').src = `libs/img/logotypes/${server}.png`;
        this.login.value = login;
        this.password.value = token;
        document.getElementById('lg-login').focus();
    }

    static checkPassword(password, event) {
        event.preventDefault();
        var passwordRegEx = /[а-я]/i.test(password.value); //false - good; true - bad
        var id = password.id + '-warning';
        if (!passwordRegEx && !event.getModifierState("CapsLock")) {
            document.getElementById(id).innerHTML = '';
        } else if (passwordRegEx && !event.getModifierState("CapsLock")) {
            document.getElementById(id).innerHTML = `<p>Русская раскладка!`;
        } else if (!passwordRegEx && event.getModifierState("CapsLock")) {
            document.getElementById(id).innerHTML = `<p>Включен CAPS Lock!</p>`;
        } else if (passwordRegEx && event.getModifierState("CapsLock")) {
            document.getElementById(id).innerHTML = `<p>Русская раскладка!</br>Включен CAPS Lock!</p>`;
        }
        if (event.keyCode === 13) document.getElementById("lg-button").click();
    }

    static loginAttempt() {
        if (this.login.value == '' && this.password.value == '')
            return;
        mp.trigger("Auth::LoginAttempt", this.login.value, this.password.value);
    }

    static forgotPassword() {
        //TBD
    }

    static onfocus(id) {
        document.getElementById(id).style.opacity = "1";
        id += '-static';
        document.getElementById(id).style.opacity = "1";
    }
    
    static onblur(id) {
        document.getElementById(id).style.opacity = "0.3";
        id += '-static';
        document.getElementById(id).style.opacity = "0.3";
    }

    static showPassword() {
        this.password.focus();
        this.password.type = 'text';
        document.getElementById('hide-lgpass').style.display = 'none';
        document.getElementById('show-lgpass').style.display = 'block';
        setTimeout(()=>{
            this.password.selectionStart = this.password.selectionEnd = this.password.value.length;
        }, 0)
    }

    static hidePassword() {
        this.password.focus();
        this.password.type = 'password';
        document.getElementById('hide-lgpass').style.display = 'block';
        document.getElementById('show-lgpass').style.display = 'none';
        setTimeout(()=>{
            this.password.selectionStart = this.password.selectionEnd = this.password.value.length;
        }, 0)
    }
}