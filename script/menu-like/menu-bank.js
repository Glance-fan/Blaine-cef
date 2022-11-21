var MenuBank = class MenuBank {
    static draw(data) {
        this.drawNavigation();
        this.drawDebet(data[0]);
        this.drawSavings(data[1]);
        this.drawTariffs(data[2])
    }

    static selectOption(index) {
        document.getElementById(`menubank-${index}`).click();
    }

    static drawNavigation() {
        document.querySelector('#menu-bank-title').innerHTML = menubank_nav[0][0] + menubank_nav[0][1];
        for (var index = 1; index < menubank_nav.length; index++) {
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
    }



    //data = ['package', balance, maxbalance, limit, cashback, maxcashback]
    static drawDebet(data) {
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
                    <input oninput="MenuBank.oninput(this)" onfocus="MenuBank.onfocus(this)" onblur="MenuBank.onblur(this)" value="" maxlength="10" autocomplete="false" spellcheck="false" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32"/>
                </div>
                <div class="menubank-buttons-block">
                    <button class="red-button" onclick="MenuBank.onbutton('debit-deposit')">Пополнить</button>
                    <button class="grey-button" onclick="MenuBank.onbutton('debit-withdraw')">Снять</button>
                </div>
            </div>
            <div style="font-weight: 700;">Перевод</div>
            <div class="menubank-section">
                <div>CID игрока</div>
                <div class="menubank-input-block">
                    #
                    <input oninput="MenuBank.oncid(this)" onfocus="MenuBank.onfocus(this, true)" onblur="MenuBank.onblur(this)" value="" maxlength="10" autocomplete="false" spellcheck="false" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32"/>
                </div>
                <div>Количество</div>
                <div class="menubank-input-block">
                    $
                    <input oninput="MenuBank.oninput(this)" onfocus="MenuBank.onfocus(this)" onblur="MenuBank.onblur(this)" value="" maxlength="10" autocomplete="false" spellcheck="false" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32"/>
                </div>
                <div class="menubank-buttons-block" style="justify-content: center">
                    <button class="red-button" onclick="MenuBank.onbutton('debit-transfer')">Перевести</button>
                </div>
            </div>
        </div>`;
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

    static setDebetInfo(index, value) {
        var span = document.getElementById('menubank-debet-info').children[index].querySelector('span');
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

    static setMaxCashback(value) {
        document.getElementById('menubank-maxcashback').innerText = prettyUSD(value);
    }

    //data = ['package', balance, minbal, maxbal, percent, Cash2Debet]
    static drawSavings(data) {
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
                    <input oninput="MenuBank.oninput(this)" onfocus="MenuBank.onfocus(this)" onblur="MenuBank.onblur(this)" value="" maxlength="10" autocomplete="false" spellcheck="false" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32"/>
                </div>
                <div class="menubank-buttons-block">
                    <button class="red-button" onclick="MenuBank.onbutton('savings-deposit')">Пополнить</button>
                    <button class="grey-button" onclick="MenuBank.onbutton('savings-withdraw')">Снять</button>
                </div>
            </div>
        </div>`;
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
            ${static_data[5]}
            <div class="menubank-checkbox" onclick="MenuBank.onCheckBox(this.firstElementChild)">
                <input type="checkbox" onclick="return false"/>
                <span class="menubank-checkbox-switch"></span>
            </div>
        </div>
        <div>${static_data[6]}</div>`
        this.setCash2Debet(data.at(-1))
    }

    static setSavingsInfo(index, value) {
        var span = document.getElementById('menubank-savings-info').children[index].querySelector('span');
        switch (index) {
            case 1:
            case 2:
            case 3:
                value = prettyUSD(value);
                break;
            case 4:
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
        if (data.length < 4) parent.style.height = '470px';
        else parent.style.height = '';
        for (var index = 0; index < data.length; index++) {
            var tariff = data[index];
            this.newTariff(parent, tariff[0], tariff[1], tariff[2], tariff[3], tariff[4], tariff[5], tariff[6])
        }
    }

    static newTariff(parent, type, cost, maxbal, limit, cashback, maxcashback, percent) {
        var tariff_data = this.getTariff(type);
        var tariff = document.createElement('div');
        tariff.classList.add(`menubank-tariffs-elem`, tariff_data.background);
        parent.append(tariff);

        tariff.innerHTML = /*html*/ `
        <div style="justify-content: space-between;">
            <img src="libs/img/logotypes/no-text-logo.png" />
            <div>${tariff_data.name}</div>
        </div>
        <div style="justify-content: center;">${menubank_svgs.chip}</div>`;
        tariff.setAttribute('onclick', `MenuBank.ontariff(this)`);
        tariff.setAttribute('type', type);
        tariff.setAttribute('tariff-title', tariff_data.name_rus);
        tariff.setAttribute('params_0', prettyUSD(cost));
        tariff.setAttribute('params_1', prettyUSD(maxbal));
        tariff.setAttribute('params_2', prettyUSD(limit));
        tariff.setAttribute('params_3', `${cashback}%`);
        tariff.setAttribute('params_4', prettyUSD(maxcashback));
        tariff.setAttribute('params_5', `${percent}%`);
    }

    static getTariff(type) {
        switch (type) {
            case 0:
                return {
                    background: `menubank-tariffs-type-0`,
                    name: `standart`,
                    name_rus: `базовый`
                };
            case 1:
                return {
                    background: `menubank-tariffs-type-1`,
                    name: `standart+`,
                    name_rus: `расширенный`
                };
            case 2:
                return {
                    background: `menubank-tariffs-type-2`,
                    name: `supreme`,
                    name_rus: `продвинутый`
                };
        }
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
        parent.lastElementChild.innerHTML = /*html*/ `
        <div>
            ${static_data.at(-1)}
            <button onclick="mp.trigger('MenuBank::BuyTariff', ${tariff.getAttribute(`type`)})" class="red-button">${tariff.getAttribute(`params_0`)}</button>
        </div>`;
    }

    static onfocus(input, isCid) {
        input.select();
        input.parentElement.style.animation = '5s ease 0s infinite normal none running selected';
        if (this.lastInput != null && !isCid) {
            this.lastInput.value = '';
            this.oninput(this.lastInput, true);
        }
        if (!isCid) this.lastInput = input;
    }

    static lastInput;
    static onblur(input) {
        input.parentElement.style.animation = '';
    }

    static cur_cid;
    static oncid(input) {
        if (input.value == '' || input.value == 0 || input.value.at(0) == 0) {
            input.value = 1;
            input.select();
        }
        this.cur_cid = input.value;
    }

    static oninput(input, forced) {
        if (input.value == '' || input.value == 0 || input.value.at(0) == 0) {
            if (!forced) {
                input.value = 0;
                input.select();
            }
            input.parentElement.parentElement.lastElementChild.style.visibility = 'hidden';
        } else
            input.parentElement.parentElement.lastElementChild.style.visibility = 'visible';
        if (input.value > 999999999) input.value = 999999999;
        this.curmoney = input.value;
    }

    static onCheckBox(chbx) {
        mp.trigger('MenuBank::Cash2Debet', !chbx.checked);
    }

    static onbutton(action) {
        var action = action.split('-')
        mp.trigger('MenuBank::Action', action[0], action[1], this.curmoney, action[1] == 'transfer' ? this.cur_cid : null);
    }
}

bank_data = [
    ['Базовый', 1000000, 300000, 20, 15000],
    ['Базовый', 100000, 250000, 2500000, 1.15, false],
    [
        [0, 25000, 1000000, 10000, 5, 5000, 0.5],
        [1, 35000, 2000000, 20000, 10, 10000, 1],
        [2, 45000, 3000000, 30000, 15, 15000, 1.5]
    ]
]
// MenuBank.draw(bank_data)
// MenuBank.setDebetInfo(0, 'Премиальный')
// MenuBank.setSavingsInfo(0, 'Базовый')

//новые типы тарифов: getTariff, новый тип фона тарифов: menu-bank.css в конце по образцу ДО menubank-tariffs-selected 