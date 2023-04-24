var CarMaint = class CarMaintenance {
    static name_block = document.getElementById('car-maintenance').firstChild;
    static wrapper = document.getElementById('car-maintenance-wrapper');
    static container = document.getElementById('car-maintenance-container');
    static buttons = document.getElementById('car-maintenance-buttons');
    static price = null;
    static curLength = 8;
    static curPlate = 0;
    static plate = null;
    static coef = 1;
    static def_price;
    static cur_maint;

    static drawPlates(prices) {
        this.cur_maint = 'plates';
        this.name_block.innerHTML = `${carmaint_svgs.plates}ГОСУДАРСТВЕННЫЕ<br>НОМЕРА`
        this.wrapper.children[0].innerText = 'Выберите вариант номерного знака';
        this.price = prices;
        this.drawButtons(this.price);
        this.drawPlateSelection();
    }

    static drawPlateSelection() {
        this.container.innerHTML = /*html*/ `
        ${carmaint_svgs.left}
        <div id="car-maint-plate"></div>
        ${carmaint_svgs.right}`
        this.plate = document.getElementById('car-maint-plate');
        this.changePlate(0);
    }

    static plateIndex
    static changePlate(index) {
        if (index == 5) this.curPlate = 0;
        else if (index == -1) this.curPlate = 4;
        this.resetPlate(this.curPlate);
    }

    static resetPlate(index) {
        this.plate.className = `plate-type-${index} plate-fade`;
        setTimeout(() => {
            this.plate.classList.remove('plate-fade')
        }, 300)
        this.plate.innerHTML = /*html*/ `
            ${index != 4 ? `<div></div>` : ``}
            <div>${index != 4 ? 'San Andreas' : 'sa exepmt'}</div>
            <div>${'x'.repeat(this.curLength)}</div>`;
        this.updatePlateLength();
    }

    //isGas = true - л., false - кВтч ; data = [max, price]
    static drawGas(isGas, data) {
        this.cur_maint = 'gas';
        this.name_block.innerHTML = `${carmaint_svgs.gas}ЗАПРАВОЧНАЯ<br>СТАНЦИЯ`
        this.wrapper.children[0].innerText = `Выберите необходимое количество ${isGas ? 'топлива' : 'энергии'}`;
        this.drawRange(isGas, data[0]);
        this.drawButtons(data[0] * data[1])
        this.price = data[1];
    }

    static curData;
    static drawRange(isGas, max) {
        this.container.innerHTML = /*html*/ `
        <div style="width: 100%;">
            <input style="${max == 1 ? 'direction: rtl' : ''}" type="range" min="1" max="${max}" value="${max}" step="1" oninput="CarMaint.onrange(this)">
            <div class="car-maint-spans">
                <span>1 ${isGas ? 'л.' : 'кВт⋅ч'}</span>
                <input id="car-maint-range" value="${max}" oninput="CarMaint.onrangeinput(this)" autocomplete="false" spellcheck="false" max="${max}" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32"/>
                <span style="text-align: right;">${max} ${isGas ? 'л.' : 'кВт⋅ч'}</span>
            </div>
        </div>`;
        CarMaint.onrange(this.container.querySelector('input'), document.getElementById('car-maint-range'));
    }

    static onrange(slider, input) {
        if (input && input.value >= input.min) slider.value = input.value;
        else if (!input) document.getElementById('car-maint-range').value = slider.value;
        var percent = (slider.value - slider.min) * 100 / (slider.max - slider.min);
        slider.style.backgroundSize = percent + '% 100%';
        CarMaint.curData = document.getElementById('car-maint-range').value;
        if (!!this.price) document.getElementById('car-maint-price').innerHTML = prettyUSD(parseInt((this.price * this.curData * this.coef).toFixed(2)));
    }

    static onrangeinput(input) {
        if (input.value == 0 || input.value == '') {
            input.value = 1;
            input.select()
        }
        if (parseInt(input.value) > parseInt(input.max)) input.value = input.max;
        CarMaint.onrange(this.container.querySelector('input'), input);
    }

    static amount_elems;
    static drawButtons(price) {
        document.getElementById('close-carmaint').innerHTML = carmaint_svgs.close;
        this.buttons.innerHTML = /*html*/ `
        ${Array.isArray(price) ? /*html*/ `
        <div>
            Кол-во цифр
            <div style="display: flex;align-items: center;">
                <div style="height: 100%;display: flex;align-items: center;" onclick="CarMaint.onMinus(this)">${carmaint_svgs.minus}</div>
                <input maxlength="2" value="8" oninput="CarMaint.onAmount(this)" autocomplete="off" spellcheck="false" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32"/>
                <div style="height: 100%;display: flex;align-items: center;" onclick="CarMaint.onPlus(this)">${carmaint_svgs.plus}</div>
            </div>
        </div>`: ``}
        <div style="width:100px">
            Стоимость
            <span id="car-maint-price" style="font-weight: 600;">$${parseInt(Array.isArray(price) ? price[0][7] : price ).toLocaleString('ru')}</span>
        </div>
        <div style="flex-direction: row; width:200px">
            <button onclick="CarMaint.requestPay(true)" class="red-button">${carmaint_svgs.cash}</button>
            <button onclick="CarMaint.requestPay(false)" class="grey-button">${carmaint_svgs.bank}</button>
        </div>`;
        if (Array.isArray(price)) {
            var parent = this.buttons.querySelector('input').parentElement.children;
            this.amount_elems = [parent[0].firstElementChild, parent[1], parent[2].firstElementChild]
            this.amount_elems[2].style.opacity = 0;
            document.getElementById('car-maint-price').classList.add('car-maint-plate-price');
        } else this.def_price = price;
    }

    static onAmount(input) {
        if (input.value == 0 || input.value == '') {
            input.value = 1;
            input.select()
        }
        if (parseInt(input.value) > 8) input.value = 8;
        if (input.value == 8) CarMaint.amount_elems[2].style.opacity = 0;
        else CarMaint.amount_elems[2].style.opacity = 1;
        if (input.value == 1) CarMaint.amount_elems[0].style.opacity = 0;
        else CarMaint.amount_elems[0].style.opacity = 1;
        this.updatePlateLength();
    }

    static onPlus() {
        if (parseInt(CarMaint.amount_elems[1].value) + 1 < 9) {
            CarMaint.amount_elems[1].style.opacity = 1;
            CarMaint.amount_elems[1].value++;
        }
        if (CarMaint.amount_elems[1].value == 8) CarMaint.amount_elems[2].style.opacity = 0;
        CarMaint.amount_elems[0].style.opacity = 1;
        this.updatePlateLength();
    }

    static onMinus() {
        if (parseInt(CarMaint.amount_elems[1].value) - 1 > 0) {
            CarMaint.amount_elems[0].style.opacity = 1;
            CarMaint.amount_elems[1].value--
        }
        if (CarMaint.amount_elems[1].value == 1) CarMaint.amount_elems[0].style.opacity = 0;
        CarMaint.amount_elems[2].style.opacity = 1;
        this.updatePlateLength();
    }

    static updatePlateLength() {
        this.curLength = this.amount_elems[1].value;
        this.plate.lastElementChild.innerText = 'x'.repeat(this.curLength);
        document.getElementById('car-maint-price').innerHTML = prettyUSD(this.price[this.curPlate][this.curLength -1]);

    }

    static setPlate(plate) {
        this.plate.lastElementChild.innerText = plate;
    }

    static requestPay(pay_method) {
        switch (this.cur_maint) {
            case 'plates':
                mp.trigger('Numberplates::Buy', pay_method, parseInt(this.curPlate), parseInt(this.curLength))
                break;
            case 'gas':
                mp.trigger('Gas::Buy', pay_method, parseInt(this.curData))
                break;
        }
    }

    static priceCoef(new_coef){
        this.coef = new_coef;
        this.onrange(carmaint_tmpl.querySelector('input'));
    }
}