var AuthReg = class Registration {
    static login = document.getElementById('rg-login');
    static email = document.getElementById('rg-email');
    static pswd1 = document.getElementById('rg-password1');
    static pswd2 = document.getElementById('rg-password2');
    static reg_btn = document.getElementById('rg-button');
    static rules = document.querySelector('.rules-text');
    static ready;

    static fillPanel(server, rsName) {
        document.getElementById('reg-logo').src = `libs/img/logotypes/${server}.png`;
        this.reg_btn.style.pointerEvents = 'none';
        this.reg_btn.style.opacity = 0.5;
        document.getElementById("rg-hello").innerHTML = `<span>Добро пожаловать, ${rsName}!</span><br><span>Зарегистрируйтесь</span>`;
        this.rules.innerHTML = rules_text;
    }

    static showTooltip(id, status) {
        var ttp = document.getElementsByClassName('auth-tooltip')[id];
        if (status) ttp.style.display = 'flex';
        else ttp.style.display = 'none';
    }

    static rulesChecked(btn) {
        if (!btn.classList.contains('auth-checked')) {
            btn.classList.add('auth-checked');
            this.ready = setInterval(this.ready2Reg, 100);
        } else {
            btn.classList.remove('auth-checked');
            clearInterval(this.ready);
            this.disableReg();
        }
    }

    static ready2Reg() {
        if (AuthReg.login.value != '' && AuthReg.email.value != '' && AuthReg.pswd1.value != '' && AuthReg.pswd2.value != '') {
            AuthReg.reg_btn.removeAttribute('disabled');
            AuthReg.reg_btn.style.pointerEvents = "auto";
            AuthReg.reg_btn.style.opacity = 1;
        } else AuthReg.disableReg();
    }

    static disableReg() {
        this.reg_btn.setAttribute('disabled', 'disabled');
        this.reg_btn.style.pointerEvents = "none";
        this.reg_btn.style.opacity = 0.5;
    }

    static showRules() {
        document.querySelector(".confirm").style.opacity = 1;
        this.rules.parentElement.style.display = 'block';
        reg_tmpl.style.width = '1100px';
        reg_tmpl.style.setProperty('left', 'calc(50% - 550px)');
    }

    static closeRules() {
        document.querySelector(".confirm").style.opacity = 0.3;
        this.rules.parentElement.style.display = 'none';
        reg_tmpl.style.removeProperty('width');
        reg_tmpl.style.removeProperty('left');
    }

    static registerAttempt() {
        clearInterval(this.ready)
        mp.trigger("Auth::RegistrationAttempt", this.login.value, this.email.value, this.pswd1.value, this.pswd2.value);
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
}