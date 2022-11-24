var MenuBank = class MenuBank {
    static cur_tarrif = null;
    //data = [cur_tarrif, debet_bal, cur_limit, savings_bal, savings_toggle]
    static draw(data) {
        if (data) {
            this.drawNavigation();
            this.setTarrif(...data)
        } else this.drawNavigation(true);
        this.drawTariffs(this.tariffTypes)
    }

    static setTarrif(tarrif_idx, debet_bal, limit, savings_bal, savings_toggle) {
        if (this.cur_tarrif != null) {
            debet_bal = this.setDebetInfo(1, null, true);
            savings_bal = this.setSavingsInfo(1, null, true);
            savings_toggle = menubank_tmpl.querySelector(`input[type="checkbox"]`).checked;
        }
        this.drawDebet(tarrif_idx, debet_bal);
        this.drawSavings(tarrif_idx, savings_bal, savings_toggle);
        this.cur_tarrif = tarrif_idx;
        if (this.cur_tarrif != null) this.setDebetLim(limit ?? this.cur_limit);
    }

    static selectOption(index) {
        document.getElementById(`menubank-${index}`).click();
    }

    static drawNavigation(no_tariff) {
        document.querySelector('#menu-bank-title').innerHTML = menubank_nav[0][0] + menubank_nav[0][1];
        document.querySelector('.menu-bank-options').innerHTML = '';
        if (no_tariff) drawOption(menubank_nav.length - 1)
        else
            for (var index = 1; index < menubank_nav.length; index++)
                drawOption(index)

        function drawOption(index) {
            var opt = document.createElement('div');
            opt.innerHTML = /*html*/ `
                <a id="menubank-${index - 1}" onclick="MenuBank.navigate(this)" href="#">${menubank_nav[index][0]} ${menubank_nav[index][1]}</a>`
            document.querySelector('.menu-bank-options').append(opt);
        }
    }

    static lastNav
    static navigate(opt) {
        if (this.lastNav != null) {
            this.lastNav.style = '';
            this.lastNav.parentElement.classList.remove('current');
            document.getElementById(`${this.lastNav.id}-container`).style.display = 'none';
        }
        opt.parentElement.classList.add('current');
        opt.style.color = 'white';
        document.getElementById(`${opt.id}-container`).style.display = 'flex';
        this.lastNav = opt;
        if (opt.id == 'menubank-2') this.ontariff(document.querySelector('.menubank-tariffs-elem'))
    }


    static tariffTypes = [
        [ //D - appear on debet tab, S - appear on savings tab, P - appear on purchase tab
            `menubank-tariffs-type-0`, //P background
            `standart`, //P name наименование на карточке
            `Базовый`, //D+S+P name_rus наименование на интерфейсе
            25000, //P cost стоимость тарифа 
            1000000, //S+P maxbal макс. баланс сберегательного счета
            10000, //D+P limit лимит на операцию
            5, //D+P cashback кэшбек с покупки
            5000, //D+P maxcashback макс. кэшбек за покупку
            0.7, //S+P percent текущий баланас + текущий баланс * percent  
        ],
        [
            `menubank-tariffs-type-1`, `standart+`, `Расширенный`, 50000, 2400000, 100000, 10, 10000, 1.5
        ],
        [
            `menubank-tariffs-type-2`, `supreme`, `Продвинутый`, 125000, 500000, 700000, 15, 15000, 3.2
        ],
    ]


    //require [name, balance, maxbalance, limit, cashback, maxcashback]
    static drawDebet(index, balance) {
        document.getElementById('menubank-0-container').innerHTML = /*html*/ `
        <div id="menubank-0-content-0">
            <div>
                <div style="font-weight: 700;">Дебетовый счет</div>
                <div id="menubank-debet-info" class="menubank-section"></div>
            </div>
            <div >
                ${menubank_static.debet.at(-1)}
            </div>
        </div>
        <div id="menubank-0-content-1">
            <div style="font-weight: 700;">Пополнение и снятие со счета</div>
            <div class="menubank-section">
                <div>Количество</div>
                <div class="menubank-input-block">
                    $
                    <input id ="0-menubank-input" oninput="MenuBank.oninput(this)" onfocus="MenuBank.onfocus(this)" onblur="MenuBank.onblur(this)" value="" maxlength="10" autocomplete="false" spellcheck="false" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32"/>
                </div>
                <div class="menubank-buttons-block">
                    <button class="red-button" onclick="MenuBank.onbutton('debit-deposit', 0)">Пополнить</button>
                    <button class="grey-button" onclick="MenuBank.onbutton('debit-withdraw', 0)">Снять</button>
                </div>
            </div>
            <div style="font-weight: 700;">Перевод</div>
            <div class="menubank-section">
                <div>CID игрока</div>
                <div class="menubank-input-block">
                    #
                    <input oninput="MenuBank.oncid(this)" onfocus="MenuBank.onfocus(this)" onblur="MenuBank.onblur(this)" value="" maxlength="10" autocomplete="false" spellcheck="false" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32"/>
                </div>
                <div>Количество</div>
                <div class="menubank-input-block">
                    $
                    <input id="1-menubank-input" oninput="MenuBank.oninput(this)" onfocus="MenuBank.onfocus(this)" onblur="MenuBank.onblur(this)" value="" maxlength="10" autocomplete="false" spellcheck="false" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32"/>
                </div>
                <div class="menubank-buttons-block" style="justify-content: center">
                    <button class="red-button" onclick="MenuBank.onbutton('debit-transfer', 1)">Перевести</button>
                </div>
            </div>
        </div>`;
        var data = [this.tariffTypes[index][2], balance, this.tariffTypes[index][5], this.tariffTypes[index][6], this.tariffTypes[index][7]];
        this.fillDebetInfo(data);
    }

    static fillDebetInfo(data) {
        var parent = document.getElementById('menubank-debet-info');
        var static_data = menubank_static.debet;
        for (var index = 0; index < static_data.length - 1; index++) {
            parent.innerHTML += /*html*/ `
            <div>${static_data[index]}<span></span></div>`;
            this.setDebetInfo(index, data[index]);
        }
        this.setMaxCashback(data.at(-1))
    }

    static setDebetInfo(index, value, forced) {
        var span = document.getElementById('menubank-debet-info').children[index].querySelector('span');
        if (forced) return parseInt(span.innerText.replace('$', '').replaceAll(' ', ''));
        switch (index) {
            case 1:
                value = prettyUSD(value);
                break;
            case 2:
                if (value == -1) value = 'Нет'
                else value = `${prettyUSD(this.cur_limit)} / ${prettyUSD(value)}`;
                break;
            case 3:
                value = `${value}%`;
                break;
        }
        span.innerText = value;
    }

    static setMaxCashback(value) {
        document.getElementById('menubank-maxcashback').innerText = prettyUSD(value);
    }

    //require [name, balance, maxbalance, percent, Cash2Debet]
    static drawSavings(index, balance, toggle_state) {
        document.getElementById('menubank-1-container').innerHTML = /*html*/ `
        <div id="menubank-1-content-0">
            <div>
                <div style="font-weight: 700;">Сберегательный счет</div>
                <div id="menubank-savings-info" class="menubank-section"></div>
            </div>
            <div>${menubank_static.savings.at(-1)}</div>
        </div>
        <div id="menubank-1-content-1">
            <div style="font-weight: 700;">Пополнение и снятие со счета</div>
            <div class="menubank-section">
                <div>Количество</div>
                <div class="menubank-input-block">
                    $
                    <input id="2-menubank-input" oninput="MenuBank.oninput(this)" onfocus="MenuBank.onfocus(this)" onblur="MenuBank.onblur(this)" value="" maxlength="10" autocomplete="false" spellcheck="false" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32"/>
                </div>
                <div class="menubank-buttons-block">
                    <button class="red-button" onclick="MenuBank.onbutton('savings-deposit', 2)">Пополнить</button>
                    <button class="grey-button" onclick="MenuBank.onbutton('savings-withdraw', 2)">Снять</button>
                </div>
            </div>
        </div>`;
        var data = [this.tariffTypes[index][2], balance, this.tariffTypes[index][4], this.tariffTypes[index][8], toggle_state];
        this.fillSavingsInfo(data)
    }

    static fillSavingsInfo(data) {
        var parent = document.getElementById('menubank-savings-info');
        var static_data = menubank_static.savings;
        for (var index = 0; index < data.length - 1; index++) {
            parent.innerHTML += /*html*/ `
                <div>${static_data[index]}<span></span></div>`;
            this.setSavingsInfo(index, data[index]);
        }
        parent.innerHTML += /*html*/ `
        <div>
            ${static_data[4]}
            <div class="menubank-checkbox" onclick="MenuBank.onCheckBox(this.firstElementChild)">
                <input type="checkbox" onclick="return false"/>
                <span class="menubank-checkbox-switch"></span>
            </div>
        </div>
        <div>${static_data[5]}</div>`
        this.setCash2Debet(data.at(-1))
    }

    static setSavingsInfo(index, value, forced) {
        var span = document.getElementById('menubank-savings-info').children[index].querySelector('span');
        if (forced) return parseInt(span.innerText.replace('$', '').replaceAll(' ', ''));
        switch (index) {
            case 1:
            case 2:
                value = prettyUSD(value);
                break;
            case 3:
                value = `${value}%`;
                break;
        }
        span.innerText = value;
    }

    static setCash2Debet(state) {
        menubank_tmpl.querySelector(`input[type="checkbox"]`).checked = state;
    }

    //data[i] = [type, cost, maxbal, limit, cashback, maxcashback, percent]
    static drawTariffs(data) {
        document.getElementById('menubank-2-container').innerHTML = /*html*/ `
        <div id="menubank-2-content-0">
            <div style="font-weight: 700;">Пакеты услуг</div>
            <div id="menubank-tariffs-scrollable">
                <div id="menubank-tariffs-container" class="menubank-section"></div>
            </div>
        </div>
        <div id="menubank-2-content-1">
            <div style="font-weight: 700; text-transform:capitalize"></div>
            <div id="menubank-tariffs-info" class="menubank-section"></div>
        </div>`;
        var parent = document.getElementById('menubank-tariffs-container')
        for (var index = 0; index < data.length; index++)
            this.newTariff(parent, index, data[index])
    }

    // require [bg, name, name_rus cost, maxbal, limit, cashback, maxcashback, percent]
    static newTariff(parent, type, data) {
        var tariff = document.createElement('div');
        tariff.classList.add(`menubank-tariffs-elem`, data[0]);
        parent.append(tariff);

        tariff.innerHTML = /*html*/ `
        <div style="justify-content: space-between;">
            <img src="libs/img/logotypes/no-text-logo.png" />
            <div>${data[1]}</div>
        </div>
        <div style="justify-content: center;">${menubank_svgs.chip}</div>`;
        tariff.setAttribute('onclick', `MenuBank.ontariff(this)`);
        tariff.setAttribute('type', type);
        tariff.setAttribute('tariff-title', data[2]);
        tariff.setAttribute('params_0', prettyUSD(data[3]));
        tariff.setAttribute('params_1', prettyUSD(data[4]));
        tariff.setAttribute('params_2', data[5] == 0 ? 'Нет' : prettyUSD(data[5]));
        tariff.setAttribute('params_3', `${data[6]}%`);
        tariff.setAttribute('params_4', prettyUSD(data[7]));
        tariff.setAttribute('params_5', `${data[8]}%`);
    }

    static lastTariff;
    static ontariff(tariff) {
        if (this.lastTariff != null)
            this.lastTariff.classList.remove('menubank-tariffs-selected')
        tariff.classList.add('menubank-tariffs-selected');
        this.lastTariff = tariff;
        var parent = document.getElementById('menubank-2-content-1');
        parent.style.visibility = 'visible';
        parent.firstElementChild.innerText = tariff.getAttribute('tariff-title');
        parent = parent.lastElementChild;
        parent.innerHTML = /*html*/ `<div style="height: 260px;"></div><div></div>`;
        var static_data = menubank_static.tariffs;
        for (var index = 0; index < static_data.length - 1; index++)
            parent.firstElementChild.innerHTML += /*html*/ `
                <div>${static_data[index]}<span>${tariff.getAttribute(`params_${index}`)}</span></div>`;
        if (tariff.getAttribute('type') != this.cur_tarrif)
            parent.lastElementChild.innerHTML = /*html*/ `
            <div>
                ${static_data.at(-1)}
                <button onclick="mp.trigger('MenuBank::BuyTariff', ${parseInt(tariff.getAttribute(`type`))})" class="red-button">${tariff.getAttribute(`params_0`)}</button>
            </div>`;
        else parent.lastElementChild.innerHTML = /*html*/ `
            <div style="justify-content: center;font-weight: 700;font-size: 16px;">Приобретено</div>`;
    }

    static onfocus(input) {
        input.select();
        input.parentElement.style.animation = '5s ease 0s infinite normal none running selected';
    }

    static onblur(input) {
        input.parentElement.style.animation = '';
    }

    static cur_cid = -1;
    static oncid(input) {
        if (input.value == '' || input.value == 0 || input.value.at(0) == 0) {
            input.value = 1;
            input.select();
        }
        this.cur_cid = input.value;
    }

    static oninput(input) {
            if (input.value == '' || input.value == 0 || input.value.at(0) == 0) {
                input.value = 0;
                input.select();
            }
        if (input.value > 999999999) input.value = 999999999;
    }

    static onCheckBox(chbx) {
        mp.trigger('MenuBank::Cash2Debet', !chbx.checked);
    }

    static onbutton(action, idx) {
        var action = action.split('-');
        var val = document.getElementById(`${idx}-menubank-input`).value;
        if (val == '') return;
        mp.trigger('MenuBank::Action', action[0], action[1], parseInt(val), action[1] == 'transfer' ? parseInt(this.cur_cid) : -1);
    }

    static setDebetBal(val){
        this.setDebetInfo(1, val);
    }

    static cur_limit;
    static setDebetLim(limit){
        this.cur_limit = limit;
        this.setDebetInfo(2, limit == -1 ? limit : this.tariffTypes[this.cur_tarrif][5]);
    }

    static setSavingsBal(){
        this.setSavingsInfo(1, val);
    }
}
bank_data = [
    0, 15000, 500, 500000, false
];
// MenuBank.draw(bank_data)
// MenuBank.setDebetInfo(1, 15000)
// MenuBank.setSavingsInfo(1, 25000)

//новые типы тарифов: tariffTypes, новый тип фона тарифов: menu-bank.css в конце по образцу ДО menubank-tariffs-selected 