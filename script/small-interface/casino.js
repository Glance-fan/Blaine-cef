var Casino = class Casino {
    static draw(numbers, status, balance, max_bet) {
        this.fillLastNums(numbers);
        this.updateGameStatus(status);
        this.updateCurBal(balance);
        this.setMaxBet(max_bet);
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

    static updateCurBal(text) {
        document.getElementById('casino-cur-bal').innerHTML = text;
    }

    static max_bet;
    static setMaxBet(bet) {
        casino_tmpl.querySelector('input').setAttribute('maxlength', bet.toString().length + 1);
        this.max_bet = bet;
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
    }

}