var Estate = class Estate {
    static static_data = [];
    //type = 'info' || 'offer' || 'sell'
    static draw(type, which, num, data, owner) {
        this.fillTop(type, which, num);
        this.fillStatic(type, data);
        this.fillDynamic(type, which, data);
        if (type == 'info') this.fillButtons(which, owner);
    }

    static fillTop(type, which, num) {
        var estname;
        this.container.style.height = '145px';
        switch (type) {
            case 'info':
                estname = estinfo_static[which][0];
                this.static_data = estinfo_static[which][1];
                this.container.style.height = '225px';
                break;
            case 'offer':
                estname = estoffer_static[which][0];
                this.static_data = estoffer_static[which][1];
                break;
            case 'sell':
                estname = `продажа имущества`;
                break;
        }
        var name = num == null ? estname : estname + num;
        estate_tmpl.firstElementChild.innerHTML = `${estate_svgs[which]}${name}`;
    }

    static wrapper = document.getElementById('estate-wrapper');
    static container = document.getElementById('estate-container');
    static buttons = document.getElementById('estate-buttons');
    static fillStatic(type, data) {
        if (type != 'info') this.fillAboveContainer(type, data[0], data[1]);
        this.container = document.getElementById('estate-container');
        this.container.innerHTML = /*html*/ `<div></div><div></div>`;
        for (var index = 0; index < this.static_data.length; index++) {
            this.container.firstElementChild.innerHTML += /*html*/
                `<div style="font-weight: 500;">${this.static_data[index]}</div>`;
        }
    }

    static fillAboveContainer(type, name, price) {
        var new_html, wrapper_html = this.wrapper.innerHTML;
        switch (type) {
            case 'offer':
                new_html = /*html*/ `<div id="estate-wrapper-top">${name} предлагает вам продажу<br><br>Цена для вас: <span style="font-weight: 700">$${price.toLocaleString('ru')}<span></div>`;
                break;
            case 'sell':
                new_html = /*html*/ `<div id="estate-wrapper-top">Выберите одно ваше имущество<br>для продажи <span style="font-weight: 700">${name}</span><br>и укажите его стоимость</div>`;
                break;
        }
        this.wrapper.innerHTML = `${new_html}${wrapper_html}`;
    }

    static fillDynamic(type, which, data) {
        switch (type) {
            case 'info':
                for (var index = 0; index < data.length; index++)
                    this.container.lastElementChild.innerHTML += /*html*/
                    `<div style="font-weight: 700;">${data[index] || 'Государство'}</div>`;
                if (which == 'biz') this.postRender(which, [3, 4, 5]);
                else this.postRender(which, [1, 2]);
                break;
            case 'offer':
                for (var index = 2; index < data.length; index++)
                    this.container.lastElementChild.innerHTML += /*html*/
                    `<div style="font-weight: 700;">${data[index]}</div>`;
                if (which == 'biz') this.postRender(which, [1, 2, 3]);
                else this.postRender(which, [0, 1]);
                break;
            case 'sell':
                this.container.style.overflowX = 'auto';
                this.container.style.alignItems = 'center';
                this.container.innerHTML = '';
                this.container.setAttribute('onwheel', `Estate.scroll(event)`)
                var est_data = data[1];
                for (var index = 0; index < est_data.length; index++) {
                    var elem = est_data[index]
                    this.container.innerHTML += /*html*/ `
                    <h1 class="estate-sell-elem" onclick="Estate.select(this)">
                        <div>
                            <div style="padding-right: 10px;">${estate_svgs[elem[0].toLowerCase()]}</div>
                            <div style="display: flex;flex-direction: column;height:25px;">
                                <span class="sellelem-text-1">${elem[1]}${elem[5] !=null ? `<span class="sellelem-text-2">#${elem[5]}</span>`: ''}</span>
                                <span class="sellelem-text-2">${elem[2]}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span class="sellelem-text-2">Класс</span>
                                <span class="sellelem-text-1">${elem[3]}</span>
                            </div>
                            <div style="text-align: right;">
                                <span class="sellelem-text-2">Цена</span>
                                <span class="sellelem-text-1">${prettyUSD(elem[4])}</span>
                            </div>
                        </div>
                    </h1>`;
                }
                this.drawPrice();
                break;
        }
    }

    static fillButtons(which, owner) {
        switch (which) {
            case 'house':
            case 'flat':
                owner == null ? this.buttons.innerHTML = /*html*/ `<button class="red-button" onclick="Estate.onbutton('enter')">Войти</button><button class="red-button" onclick="Estate.onbutton('buy')">Купить</button>` :
                    owner ? this.buttons.innerHTML = /*html*/ `<button class="red-button" onclick="Estate.onbutton('enter')">Войти</button><button class="grey-button" onclick="Estate.onbutton('mail')">Почта</button>` :
                    this.buttons.innerHTML = /*html*/ `<button class="red-button" onclick="Estate.onbutton('enter')">Войти</button>`
                break;
            case 'biz':
                owner == null ? this.buttons.innerHTML = /*html*/ `<button class="red-button" onclick="Estate.onbutton('buy')">Купить</button>` :
                    owner ? this.buttons.innerHTML = /*html*/ `<button class="red-button" onclick="Estate.onbutton('manage')">Управление</button>` :
                    this.buttons.innerHTML = ``
                break;
            case 'veh_info':
                this.buttons.innerHTML = ``;
                return;
        }
        if (this.buttons.children.length == 1) this.buttons.style.justifyContent = 'center';
        else this.buttons.style.justifyContent = 'space-between';
    }

    static lastEstate = null;
    static select(estate) {
        if (this.lastEstate == estate) return;
        if (this.lastEstate != null) this.lastEstate.classList.remove('estate-selected');
        estate.classList.add('estate-selected')
        this.lastEstate = estate;
        this.wrapper.children[2].children[0].style.visibility = 'visible';
        this.wrapper.querySelector('input').value = 0;
        this.curprice = 0;
        this.wrapper.children[2].children[1].style.visibility = 'visible';
    }

    static drawPrice() {
        document.getElementById('estate-buttons').innerHTML = /*html*/ `
            <div id="estate-price-input">
                Цена
                <div><span>$</span><input onfocus="Estate.onFocus(this)" onblur="Estate.onBlur(this)" oninput="Estate.onInput(this)" value="0" maxlength="10" autocomplete="false" spellcheck="false" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32"/></div>
            </div>
            <button style="visibility: hidden;" onclick="Estate.onbutton('accept')" class="red-button">Принять</button>
            <button onclick="Estate.onbutton('cancel')" class="grey-button">Отменить</button>`;
    }

    static curprice = 0;
    static onInput(input) {
        if (input.value == 0 || input.value == '') {
            input.value = 0;
            input.select()
        }
        if (parseInt(input.value) > 999999999) input.value = 999999999;
        this.curprice = parseInt(input.value);
    }

    static onFocus(input) {
        input.parentElement.style.animation = '5s ease 0s infinite normal none running selected';
        input.select();
    }

    static onBlur(input) {
        input.parentElement.style.animation = '';
    }

    static curScroll = 0;
    static scrollStep = 410;
    static scroll(event) {
        event.preventDefault()
        if (event.deltaY < 0) { //wheel up
            if (this.curScroll < 0) this.curScroll = 0;
            if (this.curScroll != 0) this.curScroll -= this.scrollStep;
        } else if (!(Math.abs(this.container.scrollHeight - this.container.clientHeight - this.container.scrollTop) < 1)) this.curScroll += this.scrollStep;
        this.container.scrollTo(this.curScroll, 0);
    }

    static where;
    static postRender(which, indexes) {
        this.where = this.container.lastElementChild.children;
        if (which == 'veh_info') {
            this.where[1].innerText = `#${this.where[1].innerText}`;
            this.where[2].innerText = `${this.where[2].innerText} улуч.`;
            [3, 4, 5].forEach(idx => {
                this.where[idx].innerText = this.where[idx].innerText == 'true' ? 'есть' : 'нет';
            })
            this.where[6].innerText = `${this.where[6].innerText} л.`;
            this.where[7].innerText = `${this.where[7].innerText} слотов`;
        }
        else if (which == 'veh') {
            this.where[indexes[0] + 1].innerText = prettyUSD(this.where[indexes[0] + 1].innerText);
            this.where[indexes[1] + 1].innerText = `#${this.where[indexes[1] + 1].innerText}`;
        } else {
            this.where[indexes[0]].innerText = prettyUSD(this.where[indexes[0]].innerText);
            this.where[indexes[1]].innerText = prettyUSD(this.where[indexes[1]].innerText, true);
            if (indexes[2] != null) this.where[indexes[2]].innerText = `${this.where[indexes[2]].innerText}%`;
        }
    }

    

    static onbutton(action) {
        mp.trigger('Estate::Action', action, this.curprice, this.lastEstate != null ? Array.from(this.lastEstate.parentNode.children).indexOf(this.lastEstate) : null);
    }
}

// Estate.draw('info', 'house', 4694, ['Jessica Day', 500000, 90, 2, '0'], true)
// Estate.draw('info','biz', null, ['Store #1', 'Weapon', null, 500000, 15, 10])
// Estate.draw('info','flat', 231, ['Jessica Day', 500000, 90, 10], false)
// Estate.draw('info','veh_info', null, ['Bravado Buffalo', '123123', 4, true, true, false, 100, 25]) 

// Estate.draw('offer', 'house', 4694, ['Jessica Day', 750000, 500000, 90, 2, 0])
// Estate.draw('offer', 'biz', null, ['Jessica Day', 750000, 'Weapon', 500000, 90, 10])
// Estate.draw('offer', 'flat', 4694, ['Jessica Day', 750000, 500000, 90, 2])
// Estate.draw('offer', 'garage', 4694, ['Jessica Day', 750000, 500000, 90, 2, 0])
// Estate.draw('offer', 'veh', null, ['Jessica Day', 750000, 'model', 500000, 80085, 'отсутствует'])

// Estate.draw('sell', 'sell', null, ['Jessica Day', [
//     ['House', 'Магазин брендовой одежды', '', 'class_range', 550000, 3],
//     ['Biz', 'producer', 'model', 'class_range', 550000, 177],
//     ['Flat', 'producer', 'model', 'class_range', 550000, 177],
//     ['Garage', 'producer', 'model', 'class_range', 550000, 177],
//     ['Veh', 'producer', 'model', 'class_range', 1780000],
//     ['Moto', 'producer', 'model', 'class_range', 1780000],
//     ['Ship', 'producer', 'model', 'class_range', 1780000],
//     ['Plane', 'producer', 'model', 'class_range', 1780000],
// ]])