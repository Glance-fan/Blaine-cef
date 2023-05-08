var Casino = class Casino {
    //type = 0 - casino_roulette, 1 - casino_slots, 2 - casino_blackjack
    static ret_type; 
    static draw(type, status, balance, max_bet, cur_bet, numbers) {
        this.updateCurBal(balance, true);
        this.updateGameStatus(status);
        document.getElementById('casino-delta-wrapper').style.display = 'block';
        this.setMaxBet(max_bet);
        this.setBet(cur_bet);
        switch (type) {
            case 0: 
                this.fillLastNums(numbers);
                this.ret_type = 'Roulette';
                break;
            case 1: 
                this.showSlots();
                this.ret_type = 'Slots';
                break;
            case 2:
                this.ret_type = 'Blackjack';
                break;
        }
    }

    static showSlots() {
        document.getElementById('casino-game-status').parentElement.firstChild.innerHTML = 'Джекпот';
        document.getElementById('casino-slots').style.display = 'flex';
    }

    static showBJButton(idx, status) {
        document.getElementById('casino-blackjack').querySelectorAll('button')[idx].style.display = status ? 'unset' : 'none';
    }

    static fillLastNums(numbers) {
        numbers.forEach(num => this.addLastNum(num));
    }

    //num = [type, 'text']
    static addLastNum(num) {
        var el = document.createElement('div'),
            parent = document.getElementById('casino-last-numbers');
        el.className = `casino-last-num casino-num-type-${num[0]}`
        el.innerText = num[1];
        if (parent.childElementCount == 10) parent.firstChild.remove();
        parent.append(el);
    }

    static updateGameStatus(text) {
        document.getElementById('casino-game-status').innerHTML = text;
    }

    static hide_delta_timer;
    static updateCurBal(value, hide_delta) {
        var bal_el = document.getElementById('casino-cur-bal'),
            delta_el = document.getElementById('casino-delta-bal'),
            bal_val = parseInt(bal_el.innerText),
            delta = value - bal_val;
        
        if (hide_delta) delta_el.parentElement.style.opacity = '0';
        else {
            delta_el.parentElement.style.opacity = '1';
            delta_el.innerHTML = delta >= 0 ? `+${delta}` : delta; 
            delta_el.className = delta >= 0 ? 'casino-win' : 'casino-lose';
        }

        bal_el.innerHTML = value;
        clearTimeout(this.hide_delta_timer);
        this.hide_delta_timer = setTimeout(()=>{delta_el.parentElement.style.opacity = '0'}, 5000);
    }

    static max_bet;
    static setMaxBet(bet) {
        casino_tmpl.querySelector('input').setAttribute('maxlength', bet.toString().length + 1);
        this.max_bet = bet;
    }

    static setBet(cur_bet) {
        casino_tmpl.querySelector('input').value = cur_bet;
    }

    static onplus() {
        var input = casino_tmpl.querySelector('input');
        if (parseInt(input.value) + 1 < this.max_bet + 1) input.value++;
        this.checkInput(input);
    }

    static onminus() {
        var input = casino_tmpl.querySelector('input');
        if (parseInt(input.value) - 1 > 0) input.value--;
        this.checkInput(input);
    }

    static oninput(input) {
        if (input.value == '' || input.value == 0) {
            input.value = 1;
            input.select();
        }
        if (input.value > this.max_bet) input.value = this.max_bet;
        this.checkInput(input);
    }

    static checkInput(input) {
        var parent = input.parentElement.children;
        if (input.value == 1) parent[0].firstElementChild.style.opacity = 0;
        else parent[0].firstElementChild.style.opacity = 1;
        if (input.value == this.max_bet) parent[2].firstElementChild.style.opacity = 0;
        else parent[2].firstElementChild.style.opacity = 1;
        mp.trigger(`Casino${this.ret_type}::SetBet`, input.value);
    }

    static switchSound(status) {
        document.getElementById('casino-sound').src = `libs/svgs/minigames/sound_${status ? 'on' : 'off'}.svg`; 
    }

    static soundRequest(el) {
        mp.trigger('CasinoSlots::Sound', el.firstChild.src.includes('on') ? false : true)
    }
}