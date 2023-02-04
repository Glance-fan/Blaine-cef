var Inventory = class Inventory {
    /*draw-funcs*/
    static slotIndex = 0;
    static drawFull() {
        for (var i = 0; i < containers.length - 2; i++) {
            if (!Array.isArray(row_lengths[i]))
                this.drawTable([containers[i], row_lengths[i], columns_length[i]]);
            else {
                for (var j = 0; j < row_lengths[i].length; j++)
                    this.drawTable([containers[i], row_lengths[i][j], columns_length[i]]);
            }
            this.slotIndex = 0;
        }
        this.drawTradeRow(containers[7]);
        this.drawTradeRow(containers[8]);

        for (var i = 0; i < item_filling.length - 1; i++) {
            var filling_index = 0;
            item_filling[i].forEach((elem) => {
                var slot = document.getElementById(`${filling_index}-inv${item_filling[3][i]}`);
                slot.querySelector('.item-content').style.position = 'absolute';
                slot.querySelector('.item-standart').innerHTML = elem[1];
                slot.querySelector('.item-standart').innerHTML += `<p class="item-standart-text">${elem[0]}</p>`;
                filling_index++;
            });
            filling_index = 0;
        }

        document.getElementById('3-inv-weapon').querySelector('.item-standart').innerHTML = inventoryStandart.vest;
        document.getElementById('3-inv-weapon').querySelector('.item-standart').innerHTML += `<p class="item-standart-text">Броня</p>`;
        this.fillVest();

        for (var i = 0; i < 3; i++)
            document.getElementsByClassName('inventory-item')[i].classList.add('long-item');
        document.getElementsByClassName('inventory-item')[2].style.display = 'none';
    }

    static drawTable(data) {
        for (var i = 0; i < data[2]; i++)
            this.drawRow(data[0], data[1]);
    }

    static drawRow(parent, row_length) {
        var row = document.createElement('div');
        row.classList.add('inventory-row');
        document.getElementById(parent).append(row);
        for (var i = 0; i < row_length; i++) {
            var slot = document.createElement('div');
            slot.classList.add('inventory-item');
            slot.setAttribute('onclick', 'Inventory.clickSlot(event, this)');
            slot.setAttribute('oncontextmenu', 'Inventory.clickRBM(event, this)')
            slot.id = `${this.slotIndex++}-${parent.replace('-container', '')}`;
            row.append(slot);
            this.emptySlot(slot)
        }
    }

    static drawTradeRow(parent) {
        var row = document.createElement('div');
        row.classList.add('inventory-row', 'trade-row');
        document.getElementById(parent).append(row);
        parent = parent.split('-')[1];

        var money_wrapper = document.createElement('div');
        money_wrapper.classList.add('trade-money');
        row.append(money_wrapper);
        money_wrapper.innerHTML = /*html*/
            `<span class="trade-usd">$</span>
        <input id="${'money-' + parent}" maxlength="9" value="0" onfocus="Inventory.inTradeMoney(this)" onblur="Inventory.outTradeMoney(this)" oninput="Inventory.checkTradeMoney(this)" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32">`;

        var property = document.createElement('div');
        property.classList.add('inventory-item', 'long-trade');
        row.append(property);
        property.id = 'property-' + parent
    }

    static emptySlot(slot, standart) {
        var parent = slot.id.split('-')[2];
        slot.innerHTML = /*html*/ `
            <div class="item-content">
                    <p class="item-bind" style="margin: -3px 0 0 -3px;"></p>
                    <p class="item-top-text"></p>
                    <p class="item-visual"></p>
                    <p class="item-standart"></p>
            </div>
            <div class="item-tooltip"></div>`;
        if (parent == 'status') slot.querySelector('.item-content').style.position = 'absolute';
        try {
            if (standart.innerHTML != '' && !!standart) {
                slot.querySelector('.item-standart').innerHTML = standart.innerHTML;
                slot.querySelector('.item-content').style.position = 'absolute';
            }
        } catch (e) {}
        slot.querySelector('.item-standart').style.display = 'flex';
        slot.classList.remove('inventory-filled');
        if ((parent == 'pockets' && !slot.id.includes('wb')) || (parent == 'weapon' && slot.id != '3-inv-weapon'))
            slot.querySelector('.item-tooltip').setAttribute('data', "0,Бинд");
    }

    static setInventoryItem(slot, item_data) {
        var item = document.getElementById(slot);
        var standart = item.querySelector('.item-standart');
        this.emptySlot(item, standart);

        item.querySelector('.item-standart').style.display = 'none';
        item.querySelector('.item-content').style.position = 'unset';
        item.classList.add('inventory-filled');

        var top_text = item.querySelector('.item-top-text');
        var item_visual = item.querySelector('.item-visual')
        var tooltip = item.querySelector('.item-tooltip');
        item_visual.innerHTML = item_data[0];
        item_visual.innerHTML += /*html*/ `<span class="item-visual-text" style="font-size:12px;">${item_data[1]}</span>`;

        if (slot != '3-inv-weapon') {
            top_text_if: if (item_data[3] == undefined && item_data[4] == undefined)
                    break top_text_if;
                else if (item_data[4] == undefined)
                top_text.innerHTML = `<span>x${item_data[3]}</span>`;
            else {
                if (typeof item_data[4] == 'boolean') {
                    top_text.innerHTML = `x${item_data[3]}`;
                    if (item_data[4]) item.classList.add('weapon-selected');
                    else item.classList.remove('weapon-selected');
                } else top_text.innerHTML = /*html*/ `<span>${(item_data[3]*item_data[4]).toFixed(2)} кг</span> </br> <span>x${item_data[3]}</span>`;
            }

            var id = `-${slot.split('-')[2]}`;
            if (item_data[2] != undefined)
                if (id == slots[0][1] || id == slots[1][1] && !slot.includes('wb'))
                    tooltip.setAttribute('data', item_data[2] + ",0,Бинд");
                else if ([slots[1][1], slots[2][1], slots[3][1], slots[5][1], slots[6][1], slots[9][1], slots[10][1], slots[11][1]].includes(id))
                tooltip.setAttribute('data', item_data[2]);
        }
        else {
            this.setPercent(item, item_data[3]);
            if (item_data[2] != undefined) tooltip.setAttribute('data', item_data[2]);
        }

        setTimeout(this.setTextSize, 70, item);
    }

    static setTextSize(item) {
        var span = item.querySelector('.item-visual-text')
        if (span == null) return;
        var item_visual = item.querySelector('.item-visual');
        item_visual.style.display = 'flex';

        if (span.scrollHeight < 30) {
            span.style.marginTop = (27 - span.scrollHeight > 0 ? 27 - span.scrollHeight : 0) + 'px';
            span.style.marginBottom = '3px';
        }

        if (span.scrollWidth > span.offsetWidth || span.scrollHeight > span.offsetHeight) {
            while (span.scrollWidth > span.offsetWidth || span.scrollHeight > span.offsetHeight) {
                span.style.fontSize = (parseInt(span.style.fontSize) - 1) + "px";
            }
            span.style.marginBottom = '3px';
            span.style.marginTop = (27 - span.offsetHeight) + 'px';
        }

        item_visual.firstChild.setAttribute('name', item_visual.parentElement.parentElement.id)
        Inventory.addMovement(item_visual.firstChild);
    }

    static duplicate_pic(pic_1) {
        var item_visual = document.getElementById(pic_1.getAttribute('name')).querySelector('.item-visual');
        if (item_visual.children.length == 2) return;
        var pic_2 = pic_1.cloneNode(true);
        pic_2.removeAttribute('style');
        item_visual.insertBefore(pic_2, item_visual.lastChild);
        pic_2.setAttribute('name', pic_1.getAttribute('name'))
        Inventory.addMovement(pic_2);
    }



    /*fill-funcs*/
    //items[i] = [svg, 'name', [enum, 'action-i'], ammo, selected(t|f)]
    static fillWeapon(items) {
        for (var i = 0; i < slots[0][0]; i++)
            this.updateWeaponSlot(i, items[i]);
    }

    //items[0] = [svg, 'name', [enum, 'action-i'], %]
    static fillVest(items) {
        var id = `3-inv${slots[0][1]}`
        if (items == undefined)
            this.emptySlot(document.getElementById(id), document.getElementById(id).querySelector('.item-standart'));
        else {
            items[0] = items[0] in inventoryItems ? inventoryItems[items[0]] : inventoryItems["NotAssigned"];
            this.setInventoryItem(id, items);
        }
    }

    static setVestPercent(percent) {
        this.setPercent(document.getElementById(`3-inv${slots[0][1]}`), percent);
    }

    //items[i] = [svg, 'name', [enum, 'action-i'], amount, weight], where = 'trade' || 'crate' || 'inv'
    static fillPockets(where, items, maxWeight) {
        var id = `-${where}${slots[1][1]}`;
        if (where != 'trade') this.fillWeight(id.slice(1), items, maxWeight);
        for (var i = 0; i < slots[1][0]; i++)
            this.updatePocketsSlot(i, where, items[i])
    }

    //items[i] = [svg, 'name', [enum, 'action-i']]
    static fillClothes(items) {
        for (var i = 0; i < slots[2][0]; i++)
            this.updateClothesSlot(i, items[i])
    }

    //items[i] = [svg, 'name', [[enum, 'action-i']]
    static fillAccessories(items) {
        for (var i = 0; i < slots[3][0]; i++)
            this.updateAccessoriesSlot(i, items[i])
    }

    //items[i] = [[type, percent], [type, percent], [type, percent]] type=0,1,2
    static fillAllStatus(items) {
        items.forEach((item) => {
            document.getElementById(`${item[0]}-inv${slots[4][1]}`).classList.add('inventory-filled');
            this.setStatusPercent(item);
        })
    }

    //status = [type, percent]
    static setStatusPercent(status) {
        this.setPercent(document.getElementById(`${status[0]}-inv${slots[4][1]}`), status[1])
    }

    static setPercent(item, percent) {
        var top_text = item.querySelector('.item-top-text');
        top_text.innerHTML = `${percent}%`;
        top_text.setAttribute('style', `text-align: center; padding: 0; padding-top:2px`)
    }

    //items[i] = [svg, 'name', [enum, 'action-i'], amount, weight]
    //where = 'crate' || 'inv' 
    static fillBag(where, items, maxWeight) {
        var inventory_class;
        if (where == 'crate') inventory_class = '.crates-Inventory';
        else inventory_class = '.Inventory';
        var bag_class = `.${where}-bag`;
        var bag_container = `${where}-${containers[13]}`;
        var bag_id = `-${where}${slots[5][1]}`

        if (items == undefined) {
            this.switchBag(false, bag_class);
            return;
        }
        this.switchBag(true, bag_class);
        document.getElementById(bag_container).innerHTML = '';
        var bagColumns = this.calcColumns(items.length);
        for (var i = 0; i < bagColumns.length; i++)
            this.drawTable([bag_container, bagColumns[i], 1]);
        this.fillWeight(bag_id.slice(1), items, maxWeight)
        for (var i = 0; i < items.length; i++)
            this.updateBagSlot(i, where, items[i]);
        this.showBagWeight(bag_class);
        setTimeout(this.position, 0, inventory_class);
        this.slotIndex = 0;
    }

    static showBagWeight(bag_class) {
        var h1 = document.querySelector(bag_class).children[0].children;
        h1[2].style.top = 0;
        var delta = h1[0].getBoundingClientRect().top - h1[2].getBoundingClientRect().top;
        h1[2].style.top = delta + 'px';
    }

    //items = [key_1, key_2, key_3, ... , key_22, key_23]
    static fillBind(items) {
        for (var i = 0; i < 3; i++)
            if (items[i] != undefined) {
                var bind = document.getElementById(`${i}-inv${slots[0][1]}`).querySelector('.item-bind');
                bind.style.display = 'flex';
                bind.innerText = Inventory.keyByKС(items[i]);
            }
        for (var i = 3; i < items.length; i++)
            if (items[i] != undefined) {
                var bind = document.getElementById(`${i - 3}-inv${slots[1][1]}`).querySelector('.item-bind');
                bind.style.display = 'flex';
                bind.innerText = Inventory.keyByKС(items[i]);
            }
    }

    //name can be lowercase
    //items[i] = [svg, 'name', [enum, 'action-i'], amount, weight]
    static fillCrate(name, items, maxWeight) {
        document.querySelector('.crate').querySelector('.h1-text').innerHTML = name;
        document.getElementById(containers[14]).innerHTML = '';
        var crateColumns = this.calcColumns(items.length);
        for (var i = 0; i < crateColumns.length; i++)
            this.drawTable([containers[14], crateColumns[i], 1])
        this.fillWeight('crate', items, maxWeight)
        for (var i = 0; i < items.length; i++)
            this.updateCrateSlot(i, items[i]);
        setTimeout(this.position, 0, '.crates-Inventory');
        this.slotIndex = 0;
    }

    //data = ['house', 'boat', 'car', 'flat', 'plane' ..]
    static fillTradeLProperties(data) {
        prop_container.innerHTML = '';
        for (var index = 0; index < data.length; index++) {
            var prop = document.createElement('div');
            prop.classList.add('trade-property-elem');
            prop.innerHTML = /*html*/ `
                <div class="trade-checkbox" checked="false" onclick="Inventory.requestProperty(this)" id="${index}-tradechbox">${tradeCheckbox}</div>
                <div style="margin-left:15px">${data[index]}</div>`;
            prop_container.append(prop);
        }
    }

    //item = [svg, 'name', null, amount, weight]
    static fillTradeGive(items) {
        for (var i = 0; i < slots[1][0]; i++)
            this.updateGiveSlot(i, items[i])
    }

    //item = [svg, 'name', null, amount, weight]
    static fillTradeReceive(items) {
        for (var i = 0; i < slots[2][0]; i++)
            this.updateReceiveSlot(i, items[i])
    }

    //id = 'give' || 'receive' 
    //data = ['house', 'boat', 'car', 'flat', 'plane' ..]
    static fillTradeRProperties(id, data) {
        var prop = document.getElementById(`property-${id}`);
        prop.innerHTML = /*html*/ `<div class="tradeable-property-wrapper" onwheel="Inventory.updateScrollPos(event, this, '${id}')"></div>`;
        prop = prop.firstElementChild;
        for (var index = 0; index < data.length; index++)
            prop.innerHTML += `<p>${data[index]}</p>`
    }

    static fillCheckBox(id, status) {
        var checkbox = document.getElementById(`${id}-tradechbox`);
        // checkbox.checked = checkbox.checked == null ? false : !checkbox.checked;
        if (checkbox.checked == null) checkbox.checked = false;
        checkbox.checked = status;
        if (status) {
            checkbox.classList.add('trade-checkbox-selected');
            checkbox.querySelector('path').setAttribute('stroke', 'white')
        } else {
            checkbox.classList.remove('trade-checkbox-selected');
            checkbox.querySelector('path').setAttribute('stroke', '#656565')
        }
    }

    //item = [svg, 'name', [enum, 'action-i'], amount, weight]
    static fillWbCraft(name, items) {
        document.querySelector('.wb-craft').querySelector('.h1-text').innerHTML = name;
        for (var i = 0; i < slots[9][0]; i++)
            this.updateCraftSlot(i, items[i])
    }

    //item = id, где id = 'wbi_0', ..
    static fillWbTools(items) {
        for (var i = 0; i < slots[11][0]; i++)
            this.updateToolSlot(i, items[i])
    }

    static arrayW = Array(3).fill([]);
    static fillWeight(id, items, max) {
        var maxW = document.querySelector('.' + id).querySelector('.max-weight');
        var index = this.getInvIndex(id);
        this.arrayW[index] = [];
        for (var i = 0; i < items.length; i++)
            this.arrayW[index].push(0)
        maxW.innerText = ' / ' + max + ' кг';
    }



    /*update-funcs*/
    //item = [svg, 'name', [enum, 'action-i'], ammo, selected(t|f)]
    static updateWeaponSlot(slot, item) {
        var id = `${slot}-inv${slots[0][1]}`;
        if (item != null) {
            item[0] = item[0] in weaponItems ? weaponItems[item[0]] : weaponItems["NotAssigned"];
            this.setInventoryItem(id, item);
        } else {
            this.emptySlot(document.getElementById(id));
            document.getElementById(id).classList.remove('weapon-selected');
        }
    }

    //where = 'crate' || 'inv' || 'trade'
    //item = [svg, 'name', [enum, 'action-i'], amount, weight]
    static updatePocketsSlot(slot, where, item) {
        var id = `${slot}-${where}${slots[1][1]}`;
        var weightId = where + slots[1][1]
        this.updateSlot(id, item);
        if (where != 'trade') this.updateWeight(weightId, slot, item);
    }

    static updatePocketsTooltip(slot, where, newTooltip) {
        var id = `${slot}-${where}${slots[1][1]}`;
        this.updateTooltip(id, newTooltip);
    }

    static updateTooltip(slot, newTooltip) {
        var item = document.getElementById(slot);
        var tooltip = item.querySelector('.item-tooltip');

        var id = `-${slot.split('-')[2]}`;
        if (newTooltip)
            if (id == slots[0][1] || id == slots[1][1] && !slot.includes('wb'))
                tooltip.setAttribute('data', newTooltip + ",0,Бинд");
            else if ([slots[1][1], slots[2][1], slots[3][1], slots[5][1], slots[6][1], slots[9][1], slots[10][1], slots[11][1]].includes(id))
            tooltip.setAttribute('data', newTooltip);
    }

    //item = [svg, 'name', [enum, 'action-i']]
    static updateClothesSlot(slot, item) {
        this.updateSlot(`${slot}-inv${slots[2][1]}`, item);
    }

    //item = [svg, 'name', [enum, 'action-i']]
    static updateAccessoriesSlot(slot, item) {
        this.updateSlot(`${slot}-inv${slots[3][1]}`, item);
    }

    //where = 'crate' || 'inv'
    //item = [svg, 'name', [enum, 'action-i'], ammo, selected(t|f)]
    static updateBagSlot(slot, where, item) {
        var weightId = where + slots[5][1]
        var id = `${slot}-${where}${slots[5][1]}`;
        this.updateSlot(id, item);
        this.updateWeight(weightId, slot, item);
    }

    //item = [svg, 'name', [enum, 'action-i']]
    static updateCrateSlot(slot, item) {
        this.updateSlot(`${slot}-crate${slots[6][1]}`, item);
        this.updateWeight('crate', slot, item)
    }

    //item = [svg, 'name', null, amount, weight]
    static updateGiveSlot(slot, item) {
        this.updateSlot(`${slot}-trade${slots[7][1]}`, item);
    }

    //item = [svg, 'name', null, amount, weight]
    static updateReceiveSlot(slot, item) {
        this.updateSlot(`${slot}-trade${slots[8][1]}`, item);
    }

    //item = [svg, 'name', [enum, 'action-i'], amount, weight] 
    static updateCraftSlot(slot, item) {
        this.updateSlot(`${slot}-wb${slots[9][1]}`, item);
    }

    //item = [svg, 'name', [enum, 'action-i'], amount, weight]
    static updateResultSlot(item) {
        var id;
        if (item) id = item[0];
        this.updateSlot('0-wb-result', item);
        var slot_ch = document.getElementById('0-wb-result');
        var slot_p = slot_ch.parentElement;
        if (!slot_p.querySelector('.item-tooltip').getAttribute('data')) { //not finish - info ttp
            slot_p.setAttribute('onmouseover', `Inventory.infoTooltip(this.firstElementChild, '${id}');`);
            slot_p.onmouseout = () => {
                if (document.querySelector('.info-tooltip')) 
                    document.querySelector('.info-tooltip').remove();
            }
            slot_p.classList.remove('wb-result-finished');
            slot_ch.style.pointerEvents = 'none';
        } else {
            slot_p.onmouseout = null;
            slot_p.onmouseover = null;
            slot_ch.style.pointerEvents = 'unset';
            slot_p.classList.add('wb-result-finished'); //finished - default ttp
        } 

    }

    //item = [svg, 'name', [enum, 'action-i']]
    static updateToolSlot(slot, item) {
        this.updateSlot(`${slot}-wb${slots[11][1]}`, item);
    }

    //value -> int
    static updateReceiveMoney(value) {
        document.getElementById('money-receive').value = value.toLocaleString('ru');
    }

    static updateGiveMoney(value) {
        document.getElementById('money-give').value = value;
    }

    static updateSlot(id, item) {
        if (item != null) {
            item[0] = item[0] in inventoryItems ? inventoryItems[item[0]] : inventoryItems["NotAssigned"];
            this.setInventoryItem(id, item);
        } else {
            try {
                var slot = document.getElementById(id);
                var standart = slot.querySelector('.item-standart');
                if (standart == null) emptyItem(slot);
                else this.emptySlot(slot, standart);
            } catch (e) {}
        }
    }

    static updateWeight(id, slot, item) {
        var actualW = document.querySelector('.' + id).querySelector('.actual-weight');
        var index = this.getInvIndex(id);
        if (!!item) {
            if (!!item[4])
                this.arrayW[index][slot] = item[3] * item[4];
        } else this.arrayW[index][slot] = 0;
        actualW.innerText = +this.arrayInvCalc(this.arrayW[index]).toFixed(2);
    }

    static curScroll;
    static scrollStep;

    static updateScrollPos(event, container, where) {
        try {
            event.preventDefault()
        } catch (e) {}
        if (event.deltaY < 0) { //wheel up
            if (Inventory.curScroll[where] < 0) Inventory.curScroll[where] = 0;
            if (Inventory.curScroll[where] != 0) Inventory.curScroll[where] -= Inventory.scrollStep;
        } else if (!(Math.abs(container.scrollHeight - container.clientHeight - container.scrollTop) < 1)) Inventory.curScroll[where] += Inventory.scrollStep;
        container.scrollTo(0, Inventory.curScroll[where]);
    }




    /*click-funcs*/
    static curSlot;
    static curTTP;
    static slotReady = false;
    static isLBM = false;

    static clickSlot(event, slot) {
        slot.style.zIndex = 'unset';
        if (slot.id.split('-')[2] == 'status') return;
        if (!!Inventory.curSlot) Inventory.defaultSlot()
        Inventory.isLBM = true;
        slot.style.zIndex = '1000';
        slot.classList.add('inventory-selected');
        slot.setAttribute('onmouseup', 'Inventory.clickLBM(event, this)')
        document.documentElement.setAttribute('onmouseup', 'Inventory.outClick(event)');
        Inventory.curSlot = slot;
    }

    static clickLBM(event, slot) {
        if (new Date() - this.timer > 500) return;
        if (event.which != 1 || this.checkInTTP(event)) return;
        var data = slot.lastChild.getAttribute('data');
        if (data == 'undefined' || data == undefined) return;
        data = data.split(',')[0];
        if (data != 0) this.requestAction(data, slot.id);
    }

    static clickRBM(event, slot) {
        event.preventDefault();
        if (slot == this.curSlot && this.curTTP) {
            this.removeTooltip(this.curSlot);
            this.curTTP = false;
            return;
        }
        Inventory.clickSlot(event, slot)
        Inventory.showTooltip(slot)
    }

    static defaultSlot(slot) {
        if (slot == undefined)
            slot = Inventory.curSlot;
        if (slot == undefined)
            return;
        Inventory.removeTooltip(slot);
        document.documentElement.removeAttribute('onmouseup');
        slot.classList.remove('inventory-selected');
        slot.removeAttribute('onmouseup');
        slot.style.zIndex = 'unset';
        Inventory.isLBM = false;
    }

    static outClick(event) {
        if (this.checkInTTP(event) || this.checkInContainer(event)) return;
        this.defaultSlot();
    }

    static inTradeMoney(money) {
        this.defaultSlot();
        money.parentElement.classList.add('inventory-selected');
        money.select();
    }

    static checkTradeMoney(money) {
        if (money.value == '' || money.value == 0) {
            money.value = 0;
            money.select();
        }
        this.requestMoney(money.value);
    }

    static outTradeMoney(money) {
        money.parentElement.classList.remove('inventory-selected');
    }



    /*movement*/
    static elementsUnder;
    static timer;
    static dragItem;
    static addMovement(item) {
        this.dragItem = item;
        var slot = document.getElementById(item.getAttribute('name')).querySelector('.item-content')
        slot.onmousedown = function (e) {
            if (e.which == 3) return;
            Inventory.timer = new Date();
            setTimeout(Inventory.duplicate_pic, 0, item)

            var nowSlot = document.getElementById(item.getAttribute('name'));
            if (nowSlot != Inventory.curSlot && !!Inventory.curSlot) Inventory.defaultSlot()

            if (document.querySelector('.inventory-selected')) document.querySelector('.inventory-selected').classList.remove('inventory-selected');
            document.getElementById(item.getAttribute('name')).classList.add('inventory-selected');

            if (nowSlot.parentElement.parentElement.id == 'crate-crate-container')
                document.body.setAttribute('onwheel', `Inventory.updateScrollPos(event, document.getElementById('crate-crate-container'), 'crate')`);

            var stats = item.getBoundingClientRect();
            var shiftX = stats.width / 2;
            var shiftY = stats.height / 2;
            item.style.position = 'absolute';
            item.style.opacity = '0.7';
            item.style.zIndex = 1000;
            document.body.appendChild(item);

            moveAt(e);

            function moveAt(e) {
                item.style.left = e.pageX - shiftX + 'px';
                item.style.top = e.pageY - shiftY + 'px';
                Inventory.elementsUnder = document.elementsFromPoint(e.clientX, e.clientY);
            }

            document.onmousemove = function (e) {
                moveAt(e);
            };


            document.onmouseup = function (e) {
                if (Inventory.checkInContainer(e, Inventory.elementsUnder)) {
                    move_request: for (var i = 0; i < Inventory.elementsUnder.length; i++)
                        if (Inventory.elementsUnder[i].classList.contains('inventory-item')) {
                            var id = item.getAttribute('name')
                            var nowSlot = document.getElementById(id);
                            if (id == Inventory.elementsUnder[i].id) { // inside slot
                                if (Inventory.isLBM && nowSlot == Inventory.curSlot)
                                    if (!!Inventory.curSlot) Inventory.clickLBM(e, Inventory.curSlot);
                                if (e.which == 1)
                                    Inventory.clickSlot(e, nowSlot);
                                break move_request;
                            }
                            Inventory.requestMove(Inventory.elementsUnder[i].id, id);
                            Inventory.defaultSlot(nowSlot)
                            break move_request;
                        }
                }
                else {
                    var id = item.getAttribute('name');
                    Inventory.requestThrow(id);
                    Inventory.defaultSlot(nowSlot)
                    document.getElementById(id).classList.remove('inventory-selected');
                }


                Inventory.destroyDragable(item);
                document.onmousemove = null;
                document.onmouseup = null;
                document.body.removeAttribute('onwheel')
            };
        }

        item.ondragstart = function () {
            return false;
        };
    }

    static destroyDragable(item) {
        item.remove();
        this.dragItem = null;
    }



    /*ttp-funcs*/
    static showTooltip(slot) {
        if (slot.id.includes('trade')) return;

        var data = slot.lastElementChild.getAttribute('data');
        if (data == 'undefined' || data == undefined) return;

        this.createTooltip(slot, data);
        this.curTTP = true;
    }

    static createTooltip(item, data) {
        item.querySelector('.item-tooltip').innerHTML = '';

        var item_actions = data.split(',');
        var arrow = document.createElement('span');
        arrow.classList.add('tooltip-arrow');
        var tooltip = document.createElement('p');
        tooltip.setAttribute('name', item.id);
        tooltip.classList.add('tooltip', 'inventory-selected');

        var action_enum = [],
            action_name = [];
        for (var i = 0; i < item_actions.length; i++) {
            if (i % 2 == 0) action_enum.push(item_actions[i]);
            else action_name.push(item_actions[i]);
        }

        for (var i = 0; i < item_actions.length / 2; i++)
            tooltip.innerHTML += /*html*/ ` 
                <span onclick="Inventory.requestAction(${action_enum[i]}, this.parentElement.getAttribute('name'))">${action_name[i]}</span>`;
        item.lastChild.append(arrow);
        item.lastChild.append(tooltip);
    }

    static removeTooltip(slot) {
        slot.lastChild.removeAttribute('style');
        slot.lastChild.innerHTML = '';
        Inventory.curTTP = false;
    }

    static infoTooltip(elem, id) {
        if (document.querySelector('.info-tooltip') != null || !itemDescriptions[id])
            return;
        var ttp = document.createElement('div');
        ttp.classList.add('info-tooltip');
        ttp.innerHTML = /*html*/ `
            <div class="info-tooltip-arrow"></div>
            <div class="info-tooltip-block">${itemDescriptions[id]}</div>`
        elem.parentElement.append(ttp);

        ttp.style.top = `${ elem.getBoundingClientRect().y - document.querySelector('.workbench').getBoundingClientRect().y}px`;
        ttp.style.left = `${elem.getBoundingClientRect().x + elem.getBoundingClientRect().width - document.querySelector('.workbench').getBoundingClientRect().x}px`;
    }


    /*bind-funcs*/
    static lastBind;
    static nowBind;
    static bindSlot(slot) {
        this.nowBind = document.getElementById(slot).querySelector('.item-bind');
        this.nowBind.setAttribute('name', slot);
        this.lastBind = this.nowBind.innerText;
        this.nowBind.innerText = '';
        this.nowBind.style.display = 'flex';

        document.body.setAttribute("onmousedown", "Inventory.removeSelection(Inventory.nowBind)");
        document.body.setAttribute("onkeyup", "Inventory.newBind(event, Inventory.nowBind)");
    }

    static removeSelection(bind) {
        if (bind.innerText == '' && Inventory.lastBind != '') {
            bind.innerText = lastBind;
            Inventory.lastBind = null;
        } else bind.style.display = 'none';

        document.body.removeAttribute("onclick");
        document.body.removeAttribute("onkeyup");
        document.body.removeAttribute("onmousedown");

        Inventory.requestBind(27, bind.getAttribute('name'));
    }

    static newBind(event, bind) {
        switch (event.keyCode) {
            case 8: //BACKSPACE
                Inventory.lastBind = '';
                Inventory.removeSelection(bind);
                Inventory.requestBind(event.keyCode, bind.getAttribute('name'));
                return;
            case 27: //ESC
                Inventory.removeSelection(bind);
                return;
        }
        if (event.keyCode < 48 || event.keyCode > 90) return;
        bind.innerText = Inventory.keyByKС(event.keyCode);

        document.body.removeAttribute("onmousedown");
        document.body.removeAttribute("onclick");
        document.body.removeAttribute("onkeyup");

        Inventory.requestBind(event.keyCode, bind.getAttribute('name'));
    }

    static keyByKС(keyCode) {
        return keyboardMap[keyCode];
    }




    /*request-func*/
    static ctrlOn = false;
    static switchCtrl(toggle) {
        this.ctrlOn = toggle;
    }

    /*Request to move item to slot*/
    static requestMove(destination, source) {
        if (destination == source || destination == 'property-give') return;
        var paramsDest = destination.split('-');
        var paramsSrc = source.split('-');
        if (paramsSrc[2] == "status" || paramsDest[2] == "status")
            return;
        if (!this.ctrlOn)
            mp.trigger("Inventory::Replace", paramsDest[2], parseInt(paramsDest[0]), paramsSrc[2], parseInt(paramsSrc[0]), -1);
        else
            mp.trigger("Inventory::Action", 1, paramsSrc[2], parseInt(paramsSrc[0]), paramsDest[2], parseInt(paramsDest[0]));
    }

    /*Request to throw item from slot*/
    static requestThrow(source) {
        if (source.includes('trade')) return;
        var paramsSrc = source.split('-');
        if (paramsSrc[2] == "status")
            return;
        mp.trigger("Inventory::Action", 2, paramsSrc[2], parseInt(paramsSrc[0]));
    }

    /*Request to bind slot on keyCode*/
    static requestBind(keyCode, source) {
        var paramsSrc = source.split('-');
        mp.trigger("Inventory::Bind", parseInt(keyCode), paramsSrc[2], parseInt(paramsSrc[0]));
    }

    /*Request action from item tooltip*/
    static requestAction(action, source) {
        var paramsSrc = source.split('-');
        if (paramsSrc[2] == "status")
            return;
        if (Inventory.curTTP) setTimeout(Inventory.defaultSlot, 0)
        mp.trigger("Inventory::Action", parseInt(action), paramsSrc[2], parseInt(paramsSrc[0]));
    }

    /*Request sends on money input*/
    static requestMoney(value) {
        mp.trigger("Trade::UpdateLocal", 0, parseInt(value));
    }

    /*Request on check box click*/
    static requestProperty(checkbox) {
        mp.trigger("Trade::UpdateLocal", 1, parseInt(checkbox.id), !checkbox.checked);
    }

    static requestTradeReady(checkbox) {
        //this.fillCheckBox('last', !checkbox.checked)
        //this.switchTradeBtn(!checkbox.checked);
        mp.trigger("Trade::UpdateLocal", 2, !checkbox.checked);
    }

    static requestTrade() {
        if (trade_btn.style.opacity == 0) return;
        mp.trigger("Trade::UpdateLocal", 3);
    }

    static requestCraft() {
        mp.trigger('Workbench::TryCraft');
    }



    /*misc-funcs*/
    static lastSlot;
    static checkInContainer(event, findElements) {
        if (findElements == undefined)
            findElements = document.elementsFromPoint(event.clientX, event.clientY);
        for (var i = 0; i < findElements.length; i++)
            if (findElements[i].id.split('-').at(-1) == 'container')
                return true;
        return false;
    }

    static checkInTTP(event) {
        var findElements = document.elementsFromPoint(event.clientX, event.clientY);
        for (var i = 0; i < findElements.length; i++)
            if (findElements[i].classList.contains('tooltip'))
                return true;
        return false;
    }

    static position(invclass) {
        if (invclass == '.Inventory')
            document.querySelector('.lower-inventory').style.marginLeft = (document.querySelector('.weapon').getBoundingClientRect().width + 15) + 'px';
        var inventory = document.querySelector(invclass);
        var top_shift = inventory.getBoundingClientRect().height / 2;
        var left_shift = inventory.getBoundingClientRect().width / 2
        inventory.style.setProperty('top', `calc(50% - ${top_shift}px)`);
        inventory.style.setProperty('left', `calc(50% - ${left_shift}px)`);
        Inventory.scrollStep = 101;
        Inventory.curScroll = {
            'crate': 0,
            'receive': 0,
            'give': 0
        };
        if (invclass == '.trade') {
            var shift = inventory.getElementsByClassName('inventory-row')[2].getBoundingClientRect().top;
            var receive = document.querySelector('.receive');
            receive.style.top = 0;
            shift -= (receive.firstElementChild.offsetHeight + receive.getBoundingClientRect().top + 10);
            receive.style.top = shift + 'px';
            trade_ready.style.top = document.querySelector('.trade').getBoundingClientRect().y + document.querySelector('.trade').getBoundingClientRect().height + (document.documentElement.clientHeight / 100 * (40 / 10.8)) + 'px';
            trade_ready.style.left = `calc(50% - ${trade_ready.clientWidth/2}px)`;
            trade_btn.style.marginTop = (document.documentElement.clientHeight / 100 * (40 / 10.8)) + 'px';
            Inventory.scrollStep = 90;
        }
    }

    static calcColumns(amount) {
        var columns = [];
        var whole = parseInt(amount / 5)
        if (whole != 0) {
            for (var i = 0; i < whole; i++) {
                columns.push(5)
                amount -= 5;
            }
            if (amount != 0) columns.push(amount)
        } else columns.push(amount)
        return columns;
    }

    static arrayInvCalc(array) {
        var res = 0;
        for (var i = 0; i < array.length; i++)
            res += array[i];
        return res;
    }

    static getInvIndex(id) {
        switch (id) {
            case 'inv-bag':
            case 'crate-bag':
                return 0;
            case 'crate-pockets':
            case 'inv-pockets':
            case 'wb-pockets':
                return 1;
            case 'crate-crate':
                return 2;
        }
    }

    static switchHelp(status) {
        if (status) document.querySelector('.inv-help').style.display = 'block';
        else document.querySelector('.inv-help').style.display = 'none';
    }

    static switchThirdWeapon(status) {
        if (status) document.getElementById(`2-inv${slots[0][1]}`).style.display = 'block';
        else document.getElementById(`2-inv${slots[0][1]}`).style.display = 'none';
    }

    static switchBag(status, bag_class) {
        var where = bag_class.replace('-bag', '').substring(1);
        var children = document.querySelector(bag_class).children;
        if (status) {
            for (var i = 0; i < children.length; i++)
                children[i].style.display = 'block';
        } else {
            document.getElementById(`${where}-${containers[13]}`).innerHTML = '';
            for (var i = 0; i < children.length; i++)
                children[i].style.display = 'none';
        }
    }

    static switchUnderline(index) {
        var order = Inventory.getContainer(index);
        order[0].style.display = 'block';
        order[1].style.display = 'none';
    }

    static getContainer(index) {
        var temp = trade_tmpl.getElementsByClassName('h1-text');
        temp[index].classList.add('current');
        switch (index) {
            case 0:
                temp[index + 1].classList.remove('current');
                return [pock_container, prop_container];
            case 1:
                temp[index - 1].classList.remove('current');
                return [prop_container, pock_container];
        }
    }

    static switchTradeBtn(status) {
        if (status) {
            document.querySelector('.trade').style.pointerEvents = 'none';
            trade_btn.style.opacity = 1;
        } else {
            document.querySelector('.trade').style.pointerEvents = 'unset';
            trade_btn.style.opacity = 0;
        }
    }

    static fillCraftBtn(params) {
        var btn = document.getElementById('craft-btn');
        if (Array.isArray(params)) { //craft ready 
            btn.className = 'red-button craft-btn-ready'; 
            btn.innerHTML = params[0];
            if (params[1]) btn.innerHTML += /*html*/ `<span>(${params[1]})</span>`;
        } else { //craft in progress
            btn.className = 'grey-button craft-btn-cancel'; 
            btn.innerHTML = /*html*/ `${params}<span>(Отменить)</span>`;
        }
    } 
}