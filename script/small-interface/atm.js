var ATM = class ATM {
    static curmoney;
    //data = [curmoney, commis];
    static draw(data) {
        atm_tmpl.firstElementChild.innerHTML = '<img src="libs/svgs/misc/ATM.svg">';
        this.updateBalance(data[0]);
        document.getElementById('atm-cur-money').innerText = prettyUSD(data[0]);
        // atm_tmpl.querySelector('input').value = 0; // parseInt(data[0] * (1 - ((data[1] || 5) / 100)))
        this.curmoney = atm_tmpl.querySelector('input').value;
        document.getElementById('atm-commis').innerText = `${data[1] || 5}%`;
        setTimeout(() => {
            atm_tmpl.querySelector('input').focus();
        }, 0);
    }

    static updateBalance(value) {
        document.getElementById('atm-cur-money').innerText = prettyUSD(value);
    }

    static onfocus(input) {
        input.select();
        input.parentElement.style.animation = '5s ease 0s infinite normal none running selected';
    }

    static oninput(input) {
        if (input.value == '' || input.value == 0) {
            input.value = 0;
            input.select();
        }
        if (input.value > 999999999) input.value = 999999999;
        this.curmoney = input.value;
    }

    static onbutton(action) {
        mp.trigger('ATM::Action', action, parseInt(this.curmoney));
    }
}