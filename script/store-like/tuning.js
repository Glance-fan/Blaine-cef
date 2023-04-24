var Tuning = class Tuning {
    static left = tuning_tmpl.firstElementChild;
    static right = tuning_tmpl.lastElementChild;
    static container = document.getElementById('tuning-container');
    static var_container = document.getElementById('tuningvar-container');
    static lastChoices;
    static lastNav;
    static tuning_data;
    static lastChoiceId;

    static draw(data) {
        document.querySelector('.tuning-bg').innerHTML = tuning_svgs.main;
        this.drawNavigation(data.length);
        this.fillMenu();
        this.tuning_data = data;
        this.navigate(document.getElementById('0-tuning-nav'));
    }

    static drawNavigation(amount) {
        var tuning_rows = this.getNavigation(amount);

        var svg_index = 0;
        for (var index = 0; index < tuning_rows.length; index++) {
            var row = document.createElement('div');
            row.classList.add('tuning-nav-row');
            document.querySelector('.tuning-nav').append(row);
            for (var j = 0; j < tuning_rows[index]; j++)
                this.newNavElem(row, tuning_nav, svg_index++);
        }
        this.lastChoices = Array(amount).fill(null);

    }

    static newNavElem(parent, svgs, id) {
        parent.innerHTML += /*html*/ `<div class="tuning-nav-elem dark-gray" id="${id}-tuning-nav" onclick="Tuning.navigate(this)" onmouseenter="Tuning.onmouse(this, '#ddd')" onmouseleave="Tuning.onmouse(this, '#bbb')">${svgs[id]}</div>`;
    }

    static fillContainer(data) {
        this.container.innerHTML = '';
        for (var index = 0; index < data.length; index++)
            this.newChoiceElem(...data[index]);
    }
    
    static default_color;
    static fillVariants(type, choice) {
        this.clear();
        this.default_color = choice.id == 'neon' ? `#000000` : `#FFFFFF`;
        var data = this.variants_arr[choice.id];
        switch (type) {
            case 'variants-list':
                for (var index = 0; index < data.length; index++) {
                    var params = Array.isArray(data[index]) ? data[index] : [data[index]];
                    this.newVariantElem(`${choice.id}_${index}`, index, ...params);
                }
                break;
            case 'color-selection-1':
                this.var_container.style = 'height: 150px;min-height: unset;';
                if (this.initial_choices[choice.id] == null) this.choices[choice.id] = null;
                addColorPicker(this.var_container, choice.id, data[0], this.choices[choice.id] ?? this.default_color, data[1]);
                if (this.initial_choices[choice.id] != this.default_color) addDelete(this.var_container, choice.id, data[2]);
                else this.initial_choices[choice.id] = this.default_color;
                this.setColorCost(choice.id);
                if (this.choices[choice.id] == this.default_color) this.money_block.style.visibility = 'hidden';;
                break;
            case 'color-selection-2':
                this.var_container.style = 'height: 300px;min-height: unset;';
                this.var_container.innerHTML = /*html*/ `<div style="height:150px;"></div>`;
                addColorPicker(this.var_container.firstElementChild, `${choice.id}-main`, 'Основной цвет', this.choices[`${choice.id}-main`] ?? data[0], data[2]);
                addColorPicker(this.var_container.firstElementChild, `${choice.id}-extra`, 'Дополнительный цвет', this.choices[`${choice.id}-extra`] ?? data[1], data[2]);
                this.setColorCost([`${choice.id}-main`, `${choice.id}-extra`]);
                break;
            case 'color-selection-many':
                this.var_container.style = 'height: 265px;min-height: unset;';
                this.var_container.innerHTML = /*html*/ `<div class="tuning-many-color"><div>Цвет</div><div></div></div>`;
                var index = 16;
                for (var i = 1; i < 10; i++) {
                    var row = document.createElement('div');
                    row.classList.add('tuning-color-row');
                    document.querySelector('.tuning-many-color').lastElementChild.append(row);
                    for (var j = 0; j < 16; j++) {
                        row.innerHTML += /*html*/ `<div style="background: ${tuning_colors[index]}" id="${index}-tuning-color" onclick="Tuning.oncolor('${choice.id}', this)" class="tuning-color-elem" cost="${data[1]}"></div>`;
                        index++;
                    }
                }
                if (data[0]) this.right.firstElementChild.style.visibility = 'visible';
                if (typeof (this.choices[choice.id]) == 'number') this.choices[choice.id] += '-tuning-color';
                if (this.initial_choices[choice.id] != null) addDelete(this.var_container, choice.id, data[2]);
                break;
        }

        function addDelete(parent, id, cost) {
            parent.innerHTML += /*html*/ `
                <div class="tuning-delete-color dark-gray" style="margin-top: 15px;" onclick="Tuning.deleteRequest('${id}')">${tuning_svgs.cross}Удалить (${parseInt((cost * Tuning.coef).toFixed(2))})</div>`;
        }

        function addColorPicker(parent, id, title, hex, cost) {
            parent.innerHTML += /*html*/ `
            <div class="tuning-color-picker">
                <div>
                    <span>${title}</span>
                    <div hex="${hex}"  class="colorpicker" id="tuning-${id}-colorpicker" source-id="${id}" parent="tuning" cost="${cost}" onclick="Tuning.oncolorcircle(this)" style="background: ${hex}"></div>
                </div>
            </div>`;
            if (Tuning.initial_choices[id] == null) Tuning.initial_choices[id] = (hex ?? this.default_color).toUpperCase();
            else Tuning.initial_choices[id] = Tuning.initial_choices[id].toUpperCase();
            Tuning.choices[id] = (hex ?? this.default_color).toUpperCase();
        }
    }

    static variants_arr = [];
    static choices = [];
    static initial_choices = [];
    static newChoiceElem(id, name, type, params, initial) {
        this.container.innerHTML += /*html*/ `<div id="${id}" class="tuning-choice dark-gray" onclick="Tuning.selectChoiceElem(this)" type="${type}">${name}</div>`;
        if (!(id in this.initial_choices)) {
            this.initial_choices[id] = initial;
            this.choices[id] = initial;
        }
        if (id.includes('wheel') && initial != null && this.lastChoices[parseInt(this.lastNav.id)] == null)
            this.lastChoices[parseInt(this.lastNav.id)] = id;
        this.variants_arr[id] = params;
    }

    static newVariantElem(id, index, cost, name) {
        this.var_container.innerHTML += /*html*/ `<div cost="${cost}" id="${id}" class="tuning-choice dark-gray" onclick="Tuning.selectVariantElem(this)">${name != null ? name : `Вариант #${index + 1}`}</div>`;
    }

    static fillMenu() {
        var tune_menu = document.getElementById('tuning-menu').children;
        tune_menu[0].children[0].innerHTML = tuning_svgs.cash + `<p id="tuning-cash"></p>`;
        tune_menu[0].children[1].innerHTML = tuning_svgs.bank + `<p id="tuning-bank"></p>`;
        tune_menu[1].children[0].innerHTML = tuning_svgs.exit;
    }


    /*clicks*/
    static navigate(elem) {
        if (elem == this.lastNav) return;
        this.clear();

        var index = parseInt(elem.id);
        this.navigationRequest(index);

        this.colorNav(elem);
        this.lastNav = elem;

        this.fillContainer(this.tuning_data[index]);
        if (this.lastChoices[index]) document.getElementById(this.lastChoices[index]).click();
        else this.selectChoiceElem(this.container.firstElementChild);

        this.container.parentElement.scrollTo({
            top: document.querySelector('.tuning-selected').offsetTop - 155,
            behavior: 'smooth'
        })
    }

    static money_block;
    static selectChoiceElem(choice) {
        this.money_block = document.getElementById('tuning-menu').firstElementChild;
        this.money_block.style.visibility = 'hidden';
        this.lastChoiceId = choice.getAttribute('id');
        this.colorSelected(choice);
        this.fillVariants(choice.getAttribute('type'), choice);
        try {
            if (this.choices[choice.id]) document.getElementById(this.choices[choice.id]).click();
            this.var_container.parentElement.scrollTo({
                top: document.getElementById(this.choices[choice.id]).offsetTop - 155,
                behavior: 'smooth'
            })
        } catch (error) {}
    }

    static selectVariantElem(variant) {
        this.colorVariant(variant);
        var index = this.getVariantId(variant.id);
        if (variant.id.includes('wheel'))
            Object.keys(Tuning.choices).filter(key => key.startsWith(variant.id.split('_')[0])).forEach(key => {
                Tuning.choices[key] = null;
            });
        if (this.initial_choices[index] == variant.id) this.setMoney('Приобретено');
        else this.setMoney(prettyUSD(parseInt((parseInt(variant.getAttribute('cost')) * this.coef).toFixed(2))));
        this.choices[index] = variant.id;
        this.variantRequest(variant.id)
    }

    static oncolorcircle(circle) {
        whoInvoked = circle;
        whoInvoked.scale = tuning_tmpl.style.zoom || 1;
        renderTemplate(true, 'colorpicker');
        document.addEventListener('click', this.documentClick);
    }

    static oncolor(source_id, elem) {
        if (this.choices[source_id] != null)
            document.getElementById(this.choices[source_id]).classList.remove(`tuning-color-selected`);
        elem.classList.add(`tuning-color-selected`);
        if (this.initial_choices[source_id] == parseInt(elem.id)) this.setMoney('Приобретено');
        else this.setMoney(prettyUSD(parseInt((parseInt(elem.getAttribute('cost')) * this.coef).toFixed(2))));
        this.choices[source_id] = elem.id;
        this.colorRequest(source_id, parseInt(elem.id));
    }


    /*misc*/
    static getNavigation(amount) {
        switch (amount) {
            case 6:
                Array.prototype.splice.apply(tuning_nav, [3, tuning_moto.length].concat(tuning_moto));
                return [1, 2, 2, 1];
            case 5:
                tuning_nav.splice(4, 1);
                return [1, 2, 1, 1];
            case 4:
                tuning_nav.splice(3, 2);
                return [1, 2, 1];
        }
    }

    static colorNav(elem) {
        color(elem, '#fff');
        if (!!this.lastNav) color(this.lastNav, '#bbb')

        function color(elem, color) {
            var paths = elem.getElementsByTagName('path');
            !elem.className.includes('tuning-selected') ? elem.classList.add('tuning-selected') : elem.classList.remove('tuning-selected');
            for (var i = 0; i < paths.length; i++)
                if (paths[i].hasAttribute('fill')) paths[i].setAttribute("fill", color);
        }
    }

    static onmouse(elem, color) {
        if (!!this.lastNav && elem == this.lastNav) return;
        var paths = elem.getElementsByTagName('path');
        for (var i = 0; i < paths.length; i++)
            if (paths[i].hasAttribute('fill')) paths[i].setAttribute("fill", color);
    }

    static colorSelected(elem) {
        elem.style.color = 'white';
        elem.classList.add('tuning-selected');

        var lastChoice = document.getElementById(this.lastChoices[parseInt(this.lastNav.id)]);
        if (!!lastChoice && lastChoice != elem) {
            lastChoice.classList.remove('tuning-selected');
            lastChoice.style.color = '';
        }

        this.lastChoices[parseInt(this.lastNav.id)] = elem.id;
    }

    static colorVariant(elem) {
        elem.style.color = 'white';
        elem.classList.add('tuning-selected');

        var lastChoice = document.getElementById(this.choices[this.getVariantId(elem.id)])
        if (!!lastChoice && lastChoice != elem) {
            lastChoice.classList.remove('tuning-selected');
            lastChoice.style.color = '';
        }

    }

    static setColorCost(id) {
        if (Array.isArray(id)) {
            if (this.choices[id[0]] == this.initial_choices[id[0]] && this.choices[id[1]] == this.initial_choices[id[1]])
                this.setMoney('Приобретено');
            else this.setMoney(prettyUSD(parseInt((parseInt(document.querySelector(`[source-id="${id[0]}"]`).getAttribute('cost')) * this.coef).toFixed(2))));
        } else {
            if (this.choices[id] == this.initial_choices[id])
                this.setMoney('Приобретено');
            else this.setMoney(prettyUSD(parseInt((parseInt(document.querySelector(`[source-id="${id}"]`).getAttribute('cost')) * this.coef).toFixed(2))));
        }
    }

    static setMoney(val) {
        this.money_block.style.visibility = 'visible';
        Array.from(this.money_block.querySelectorAll('p')).forEach(el => {
            el.innerText = val;
            if (val == 'Приобретено') el.parentElement.style.pointerEvents = 'none';
            else el.parentElement.style.pointerEvents = 'unset';
        });
    }

    static coef = 1;
    static priceCoef(new_coef) {
        this.coef = new_coef;
        document.getElementById(this.lastChoiceId).click();
        // this.updateVariantMoney(el)
    }

    static clear() {
        this.var_container.innerHTML = '';
        this.var_container.style = '';
        this.right.firstElementChild.style.visibility = 'hidden';
    }

    static switchColor(status, id, value) {
        if (status) {
            if (id == "colour") {
                var cols = value.split('_');

                this.initial_choices["colour-main"] = cols[0];
                this.initial_choices["colour-extra"] = cols[1];

                document.getElementById(id).click();
            } else {
                this.initial_choices[id] = value;
                document.getElementById(id).click();
            }
        } else {
            this.initial_choices[id] = null;
            this.choices[id] = null;
            document.getElementById(id).click();
            this.money_block.style.visibility = 'hidden';
        }
    }

    static buyVariant(id) {
        this.initial_choices[this.getVariantId(id)] = id;
        document.getElementById(id).click();
    }

    static getVariantId(id) {
        return id.split('_').slice(0, -1).join('_');
    }

    /*requests*/
    static navigationRequest(id) {
        mp.trigger('Shop::NavChange', parseInt(id));
    }

    static variantRequest(id) {
        mp.trigger('Shop::Choose', id, this.lastChoiceId);
    }

    static payRequest(pay_method) {
        mp.trigger("Shop::Buy", pay_method, this.lastChoiceId);
        /*server-response imitation*/
        //switchColor(true, id, value);
        //buyVariant(id);
    }

    static deleteRequest(id) {
        mp.trigger('Shop::Choose', `${id}_${-1}`)
        /*server-response imitation*/
        // Tuning.switchColor(false, id);
    }

    static colorRequest(source_id, id) {
        mp.trigger('Shop::Choose', `${source_id}_${parseInt(id)}`)
    }
}