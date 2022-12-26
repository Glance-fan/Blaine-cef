var Retail = class Retail {
    static isFurniture = false;
    static isPersonal = false;
    static draw(which, data, name, personal) {
        if (which.includes('furniture')) {
            this.isFurniture = true; 
            var furn_id = which.split('-');
        }
        this.drawNavigation(this.isFurniture ?  [retails[furn_id[0]][0], retails[furn_id[0]][1][parseInt(furn_id[1])]] : retails[which], data);
        this.fillBottom();
        if (name) document.getElementById('assortment-title').innerText = `Товары ${name}`;
        if (personal) {
            document.getElementById('assortment-title').innerText = `Выберите товары для продажи`;
            this.isPersonal = true;
        }
        document.querySelector('.retail-options').firstElementChild.lastChild.click();
    }

    static drawNavigation(retail_data, data) {
        document.querySelector('.retail-name').innerHTML = retail_data[0][0] + retail_data[0][1];
        for (var index = 1; index < retail_data.length; index++) {
            var opt = document.createElement('div');
            opt.innerHTML = /*html*/ `
                <a onclick="Retail.navigate(this)" href="#">${retail_data[index][0]} ${retail_data[index][1]}</a>`
            if (this.isFurniture) opt.querySelector('svg').style.margin = `10px 20px 10px 45px`;
            opt.querySelector('a').data = data[index - 1];
            document.querySelector('.retail-options').append(opt);
        }
    }

    //data[index] = [['unique_id', id] || id, 'name', 'price'(str|int), 'amount'(str|int), 'weight'(str|int), wearable(t|f)]
    static fillAssortment(data) {
        document.querySelector('.scrollable-assortment').innerHTML = '';
        var assortment_row = this.createRow();
        for (var index = 0; index < data.length; index++) {
            var assortment_elem = this.createElem(data[index][0], data[index][1], data[index][2], data[index][3], data[index][4], data[index][5], data[index][6]);
            if (assortment_row.childElementCount < 4) assortment_row.append(assortment_elem);
            else {
                assortment_row = this.createRow();
                assortment_row.append(assortment_elem);
                assortment_row.style.marginTop = '25px';
            }
        }
        if (document.querySelector('.scrollable-assortment').childElementCount > 3)
            document.querySelector('.scrollbar-bg').style.display = 'block';
        else document.querySelector('.scrollbar-bg').style.display = 'none';
    }

    static createRow() {
        var row = document.createElement('div');
        row.classList.add('assortment-row');
        document.querySelector('.scrollable-assortment').append(row);
        return row;
    }

    static createElem(id, name, cost, instock, weight, wearable) {
        var elem = document.createElement('div');
        elem.classList.add('assortment-elem');
        if (Array.isArray(id)) {
            elem.id = `${id[0]}-retail`;
            id = id[1];
        } else elem.id = `${id}-retail`;
        elem.instock = instock;
        elem.weight = weight;
        elem.cost = cost * this.coef;
        elem.wearable = wearable;
        elem.descr = retailDescriptions[id];
        elem.innerHTML = /*html*/ `
            <span style="font-size:12px">${name}</span>${id in inventoryItems ? inventoryItems[id] : inventoryItems["NotAssigned"]}
            <span>${prettyUSD(elem.cost)}</span>`;
        if (this.isPersonal) elem.lastElementChild.innerHTML = ``;
        setTimeout(Retail.setTextSize, 0, elem);
        if (this.isPersonal) elem.setAttribute('onclick', `Retail.clickPersonalElem(this)`);
        else elem.setAttribute('onclick', `Retail.clickElem(this)`);
        elem.setAttribute('onmouseover', `Retail.onmouseover(this)`);
        elem.setAttribute('onmouseout', `Retail.onmouseout()`);
        return elem;
    }

    static setTextSize(elem) {
        var span = elem.firstElementChild;
        if (span.scrollWidth > span.offsetWidth || span.scrollHeight > span.offsetHeight)
            while (span.scrollWidth > span.offsetWidth || span.scrollHeight > span.offsetHeight)
                span.style.fontSize = (parseInt(span.style.fontSize) - 1) + "px";
    }

    static personal() {}

    /*clicks-funcs*/
    static lastElem;
    static lastNav;
    static clickElem(elem) {
        if (!!Retail.lastElem) Retail.lastElem.classList.remove('assortment-clicked');
        Retail.lastElem = elem;
        elem.classList.add('assortment-clicked');
        document.querySelector('.bottom-assortment').style.display = 'flex';
        Retail.assortment_amount[1].max = elem.instock;
        Retail.assortment_amount[0].style.opacity = '0';
        Retail.assortment_amount[1].value = 1;
        Retail.assortment_amount[2].style = '';
        Retail.assortment_amount[1].weight = elem.weight;
        Retail.assortment_amount[1].cost = elem.cost;
        this.updateBottom(elem);
    }

    static selectedElems = [];
    static prices = [];
    static amounts = []
    static clickPersonalElem(elem) {
        for (let index = 0; index < this.selectedElems.length; index++) {
            if (this.selectedElems[index] == elem) {
                this.selectedElems[index].classList.remove('assortment-clicked');
                this.selectedElems[index].lastElementChild.innerHTML = '';
                this.selectedElems.splice(index, 1);
                this.prices.splice(index, 1);
                this.amounts.splice(index, 1)
                this.lastElem = this.selectedElems.at(-1);
                if (Retail.selectedElems.length == 0)
                    document.querySelector('.bottom-assortment').style.display = 'none';
                else {
                    document.getElementById('retail-personal-cost').value = this.prices.at(-1);
                    this.assortment_amount[1].value = this.amounts.at(-1);
                    if (Retail.assortment_amount[1].value == 1) Retail.assortment_amount[0].style.opacity = 0;
                    else Retail.assortment_amount[0].style.opacity = 1;
                    Retail.assortment_amount[1].max = this.lastElem.instock;
                    if (Retail.assortment_amount[1].value == Retail.assortment_amount[1].max) Retail.assortment_amount[2].style.opacity = 0;
                    else Retail.assortment_amount[2].style.opacity = 1;
                }
                return;
            }
        }
        this.selectedElems.push(elem);
        this.prices.push(1);
        this.amounts.push(1);
        this.lastElem = elem;
        elem.classList.add('assortment-clicked');
        Retail.assortment_amount[1].max = elem.instock;
        Retail.assortment_amount[0].style.opacity = '0';
        Retail.assortment_amount[1].value = 1;
        Retail.assortment_amount[2].style = '';
        document.getElementById('retail-personal-cost').value = 1;
        elem.lastElementChild.innerHTML = '$1 [x1]';
        document.querySelector('.bottom-assortment').style.display = 'flex';
        this.updateBottom(elem);
    }

    static setPrice(input) {
        const chars = input.value.split('');
        const char = chars.pop();
        if (!/[0-9]/.test(char)) input.value = chars.join('');
        if (input.value.length > 9) input.value = 999999999;
        var elem = this.selectedElems.at(-1);
        if (input.value == '') elem.lastElementChild.innerHTML = '';
        else elem.lastElementChild.innerHTML = `$${parseInt(input.value).toLocaleString('ru')} [x${this.selectedElems.at(-1).lastElementChild.innerHTML.split(' [x')[1].replace(']','')}]`;
        this.prices[this.prices.length - 1] = input.value;
    }

    static leaveInput(input) {
        if (input.value == 0 || input.value == '') {
            Retail.clickPersonalElem(Retail.selectedElems.at(-1))
            if (Retail.selectedElems.length == 0)
                document.querySelector('.bottom-assortment').style.display = 'none';
            else input.value = this.prices.at(-1);
        }
    }

    static navigate(opt) {
        if (Retail.lastNav != null) {
            Retail.lastNav.style = '';
            Retail.lastNav.parentElement.classList.remove('current');
        }
        document.querySelector('.bottom-assortment').style.display = 'none';
        opt.parentElement.classList.add('current');
        opt.style.color = 'white';
        Retail.fillAssortment(opt.data);
        Retail.lastNav = opt;
    }



    static onmouseover(elem) {
        Retail.retailTTP(elem);
    }

    static onmouseout() {
        if (!!document.querySelector('.retail-tooltip')) document.querySelector('.retail-tooltip').remove();
    }

    static scrollStep = 130;
    static curScroll = 0;
    static scroll(container, event) {
        if (container.scrollTop != 0 && container.clientHeight > container.scrollTop) Retail.onmouseout();
        event.preventDefault();
        if (event.deltaY < 0) { //wheel up
            if (Retail.curScroll < 0) Retail.curScroll = 0;
            if (Retail.curScroll != 0) Retail.curScroll -= Retail.scrollStep;
        } else if (!(Math.abs(container.scrollHeight - container.clientHeight - container.scrollTop) < 1)) Retail.curScroll += Retail.scrollStep;
        container.scrollTo({
            top: Retail.curScroll
        });
    }

    static retailTTP(elem) {
        if (document.querySelector('.retail-tooltip') != null || elem.descr === undefined) return;
        var ttp = document.createElement('div');
        ttp.classList.add('retail-tooltip');
        ttp.innerHTML = /*html*/ `
            <div class="retail-tooltip-arrow"></div>
            <div class="retail-tooltip-block">${elem.descr}</div>`
        elem.parentElement.insertBefore(ttp, elem);
        this.moveTTP(elem, ttp);
    }

    static moveTTP(elem, ttp) {
        ttp.style.top = `${ elem.getBoundingClientRect().y - document.getElementById('retail').getBoundingClientRect().y}px`;
        ttp.style.left = `${elem.getBoundingClientRect().x + elem.getBoundingClientRect().width - document.querySelector('.retail-right-side').getBoundingClientRect().x}px`;
    }

    /*retail bottom funcs*/
    static assortment_amount;
    static fillBottom() {
        var bottom = document.querySelector('.bottom-assortment');
        if (this.isFurniture) bottom.children[2].style.opacity = '0';
        var amount = bottom.getElementsByTagName('input')[0].parentElement;
        amount.innerHTML = retail_svgs.misc.minus + /*html*/ `<input maxlength="4" value="1" oninput="Retail.onAmount(this)" onblur="Retail.onAmountBlur(this)" autocomplete="off" spellcheck="false" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32"/>` + retail_svgs.misc.plus;
        this.assortment_amount = [amount.children[0], amount.children[1], amount.children[2]];
        this.assortment_amount[0].style.opacity = 0;
        if (parseInt(Retail.assortment_amount[1].max) == 1) return;
        var buttons = bottom.children[4];
        buttons.firstElementChild.innerHTML = retail_svgs.misc.cash;
        buttons.lastElementChild.innerHTML = retail_svgs.misc.bank;

    }

    static onAmount(elem) {
        console.log(elem.value)
        if (elem.value == 0 || elem.value == '') {
            elem.value = 1;
            elem.select();
        }
        if (parseInt(Retail.assortment_amount[1].value) > parseInt(Retail.assortment_amount[1].max) && Retail.assortment_amount[1].value != '')
            Retail.assortment_amount[1].value = Retail.assortment_amount[1].max;

        if (Retail.assortment_amount[1].value == Retail.assortment_amount[1].max || Retail.assortment_amount[1].value == '')
            Retail.assortment_amount[2].style.opacity = 0;
        else Retail.assortment_amount[2].style.opacity = 1;

        if (Retail.assortment_amount[1].value == 1 || Retail.assortment_amount[1].value == '')
            Retail.assortment_amount[0].style.opacity = 0;
        else Retail.assortment_amount[0].style.opacity = 1;

        Retail.updateBottom(elem)
    }

    static onAmountPlus() {
        if (parseInt(Retail.assortment_amount[1].value) + 1 < parseInt(Retail.assortment_amount[1].max) + 1) {
            Retail.assortment_amount[2].style.opacity = 1;
            Retail.assortment_amount[1].value++;
        }
        if (Retail.assortment_amount[1].value == Retail.assortment_amount[1].max) Retail.assortment_amount[2].style.opacity = 0;
        Retail.assortment_amount[0].style.opacity = 1;
        Retail.updateBottom(this.lastElem)
    }

    static onAmountMinus() {
        if (parseInt(Retail.assortment_amount[1].value) - 1 > 0) {
            Retail.assortment_amount[0].style.opacity = 1;
            Retail.assortment_amount[1].value--;
        }
        if (Retail.assortment_amount[1].value == 1) Retail.assortment_amount[0].style.opacity = 0;
        Retail.assortment_amount[2].style.opacity = 1;
        Retail.updateBottom(this.lastElem)
    }

    static onAmountBlur(elem) {
        if (elem.value == '') {
            elem.value = 1;
            Retail.assortment_amount[2].style.opacity = 1;
        }
        Retail.updateBottom(this.lastElem);
    }

    static updateBottom(elem) {
        var bottom = document.querySelector('.bottom-assortment');
        if (Retail.isPersonal) {
            for (let index = 0; index < bottom.children.length; index++)
                bottom.children[index].style.display = 'none'
            bottom.children[0].style.display = 'flex';
            bottom.children[5].style.display = 'flex';
            bottom.children[6].style.display = 'flex';
            this.selectedElems.at(-1).lastElementChild.innerHTML = `${this.selectedElems.at(-1).lastElementChild.innerHTML.split(' [x')[0]} [x${Retail.assortment_amount[1].value}]`;
            this.amounts[this.amounts.length - 1] = Retail.assortment_amount[1].value;

        }
        if (elem.wearable) {
            bottom.children[0].style.display = 'none';
            bottom.children[1].style.display = 'flex';
        } else {
            bottom.children[0].style.display = 'flex';
            bottom.children[1].style.display = 'none';
        }
        if (parseInt(Retail.assortment_amount[1].max) == 1) {
            Retail.assortment_amount[0].style.opacity = 0;
            Retail.assortment_amount[2].style.opacity = 0;
        }
        document.getElementById('retail-weight').innerText = (Retail.assortment_amount[1].weight * Retail.assortment_amount[1].value).toFixed(2) + ' кг.';
        document.getElementById('retail-cost').innerText = '$' + (Retail.assortment_amount[1].cost * Retail.assortment_amount[1].value).toLocaleString('ru');
    }

    /*requests*/
    static payRequest(pay_method) {
        mp.trigger('Shop::Buy', pay_method, Retail.lastElem.id.replace('-retail', ''), parseInt(Retail.assortment_amount[1].value));
    }

    static requestTry() {
        mp.trigger('Shop::Try', this.lastElem.id.replace('-retail', ''))
    }

    static confirmRequest() {
        var len = Retail.selectedElems.length;
        var sellitems = [];
        for (var index = 0; index < len; index++) {
            sellitems.push([])
            sellitems[index].push(Retail.selectedElems[index].id.replace('-retail', ''));
            sellitems[index].push(Retail.amounts[index]);
            sellitems[index].push(Retail.prices[index])

        }
        mp.trigger('Shop::Confirm', sellitems);
    }

    static coef = 1;
    static priceCoef(new_coef) {
        this.coef = new_coef;
        this.lastNav.click();
    }
}