var Tuning = class Tuning {
    static left = tuning_tmpl.firstElementChild;
    static right = tuning_tmpl.lastElementChild;
    static container = document.getElementById('tuning-container');
    static var_container = document.getElementById('tuningvar-container');
    static lastChoices;
    static lastNav;
    static tuning_data;

    static draw(data) {
        this.left.firstElementChild.innerHTML = tuning_svgs.main;
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

    static fillVariants(type, choice) {
        this.clear();
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
                addColorPicker(this.var_container, choice.id, data[0], this.choices[choice.id] ?? '#fff');
                this.setMoney(prettyUSD(data[1]));
                if (this.initial_choices[choice.id] != null) addDelete(this.var_container, choice.id, data[2]);
                break;
            case 'color-selection-2':
                this.var_container.style = 'height: 300px;min-height: unset;';
                this.var_container.innerHTML = /*html*/ `<div style="height:150px;"></div>`;
                addColorPicker(this.var_container.firstElementChild, `${choice.id}-main`, 'Основной цвет', this.choices[choice.id] ?? data[0]);
                addColorPicker(this.var_container.firstElementChild, `${choice.id}-extra`, 'Дополнительный цвет', this.choices[choice.id] ?? data[1]);
                this.setMoney(prettyUSD(data[2]));
                break;
            case 'color-selection-many':
                this.var_container.style = 'height: 265px;min-height: unset;';
                this.var_container.innerHTML = /*html*/ `<div class="tuning-many-color"><div>Цвет</div><div></div></div>`;
                var index = 0;
                for (var i = 0; i < 10; i++) {
                    var row = document.createElement('div');
                    row.classList.add('tuning-color-row');
                    document.querySelector('.tuning-many-color').lastElementChild.append(row);
                    for (var j = 0; j < 16; j++) {
                        row.innerHTML += /*html*/ `<div style="background: ${tuning_colors[index]}" id="${index}-tuning-color" onclick="Tuning.oncolor('${choice.id}', this)" class="tuning-color-elem" cost="${prettyUSD(data[1])}"></div>`;
                        index++;
                    }
                }
                if (data[0]) this.right.firstElementChild.style.visibility = 'visible';
                if (this.choices[choice.id] == null) this.choices[choice.id] = 0;
                if (typeof (this.choices[choice.id]) == 'number') this.choices[choice.id] += '-tuning-color'
                document.getElementById(this.choices[choice.id]).click();
                if (this.initial_choices[choice.id] != null) addDelete(this.var_container, choice.id, data[2]);
                break;
        }

        function addDelete(parent, id, cost) {
            parent.innerHTML += /*html*/ `
                <div class="tuning-delete-color dark-gray" style="margin-top: 15px;" onclick="Tuning.deleteRequest('${id}')">${tuning_svgs.cross}Удалить (${prettyUSD(cost)})</div>`;
        }

        function addColorPicker(parent, id, title, hex) {
            parent.innerHTML += /*html*/ `
            <div class="tuning-color-picker">
                <div>
                    <span>${title}</span>
                    <div hex="${hex}"  class="colorpicker" id="tuning-${id}-colorpicker" source-id="${id}" parent="tuning" onclick="Tuning.oncolorcircle(this)" style="background: ${hex}"></div>
                </div>
            </div>`;
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
        this.variants_arr[id] = params;
    }

    static newVariantElem(id, index, cost, name) {
        this.var_container.innerHTML += /*html*/ `<div cost="${prettyUSD(cost)}" id="${id}" class="tuning-choice dark-gray" onclick="Tuning.selectVariantElem(this)">${name != null ? name : `Вариант #${index + 1}`}</div>`;
    }

    static fillMenu() {
        var tune_menu = document.getElementById('tuning-menu').children;
        tune_menu[0].children[0].innerHTML = tuning_svgs.cash + `<p id="tuning-cash"></p>`;
        tune_menu[0].children[1].innerHTML = tuning_svgs.testdrive;
        tune_menu[1].children[0].innerHTML = tuning_svgs.bank + `<p id="tuning-bank"></p>`;
        tune_menu[1].children[1].innerHTML = tuning_svgs.exit;
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
    }

    static selectChoiceElem(choice) {
        this.colorSelected(choice);
        this.fillVariants(choice.getAttribute('type'), choice);
        try {
            if (this.choices[choice.id]) document.getElementById(this.choices[choice.id]).click();
        } catch (error) {}
    }

    static selectVariantElem(variant) {
        this.colorVariant(variant);
        var index = variant.id.split('_')[0]
        if (this.initial_choices[index] == variant.id) this.setMoney('Приобретено');
        else this.setMoney(variant.getAttribute('cost'));
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
        else this.setMoney(elem.getAttribute('cost'));
        this.choices[source_id] = elem.id;
        this.colorRequest(source_id, parseInt(elem.id));
    }


    /*misc*/
    static getNavigation(amount) {
        if (amount == 6) {
            Array.prototype.splice.apply(tuning_nav, [3, tuning_moto.length].concat(tuning_moto));
            return [1, 2, 2, 1];
        } else {
            tuning_nav.splice(4, 1)
            return [1, 2, 1, 1];
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

        var lastChoice = document.getElementById(this.choices[elem.id.split('_')[0]])
        if (!!lastChoice && lastChoice != elem) {
            lastChoice.classList.remove('tuning-selected');
            lastChoice.style.color = '';
        }

    }

    static setMoney(val) {
        document.getElementById('tuning-cash').innerText = val;
        document.getElementById('tuning-bank').innerText = val;
    }

    static clear() {
        this.var_container.innerHTML = '';
        this.var_container.style = '';
        this.right.firstElementChild.style.visibility = 'hidden';
    }

    static switchColor(status, id, value) {
        if (status) {
            this.initial_choices[id] = value;
            document.getElementById(id).click();
        } else {
            this.initial_choices[id] = null;
            document.getElementById(id).click();
        }
    }

    static buyVariant(id) {
        this.initial_choices[id.split('_')[0]] = id;
        document.getElementById(id).click();
    }

    /*requests*/
    static navigationRequest(id) {
        mp.trigger('Tuning::NavChange', id);
    }

    static variantRequest(id) {
        mp.trigger('Tuning::Choose', id);
    }

    static payRequest(pay_method) {
        mp.trigger("Shop::Buy", pay_method);
        /*server-response imitation*/
        //switchColor(true, id, value);
        //buyVariant(id);
    }

    static deleteRequest(id) {
        mp.trigger('Tuning::DeleteColor', id);
        /*server-response imitation*/
        // Tuning.switchColor(false, id);
    }

    static colorRequest(source_id, id) {
        mp.trigger('Tuning::ChangeColor', source_id, id)
    }
}

tune_data = [
    [ //Tech
        ['engine', 'Двигатель', 'variants-list', [100, 140, 200], 'engine_2'],
        ['breaks', 'Тормоза', 'variants-list', [
            [500, 'Тормоза первые'],
            [430, 'Тормоза вторые'],
            [260, 'Тормоза третьи']
        ], 'breaks_1'],
        ['transmission', 'Коробка передач', 'variants-list', [1040, 1470, 2030, 1250, 1304, 5041], 'transmission_4'],
        ['pendant', 'Подвеска', 'variants-list', [1400, 1430, 2005, 5102], 'pendant_0'],
        ['turbo', 'Турбо-тюнинг', 'variants-list', [1100, 1420, 2300, 510, 5293, 699, 7103, 6010, 602, 1296, 1100, 1420, 2300, 510, 5293, 699, 7103, 6010, 602, 1296], 'turbo_9'],
    ],
    [ //Style
        ['id1', 'Спойлер', 'variants-list', [1, 1, 1], 'id1_2'],
        ['neon', 'Неон', 'color-selection-1', ['Цвет неона', 9000, 5000], '#ff00ff']
    ],
    [ //Color
        ['paint-type', 'Тип покраски', 'variants-list', [
            [500, 'Обычный'],
            [430, 'Металлик'],
            [260, 'Жемчужный'],
            [2500, 'Матовый'],
            [5430, 'Металлический'],
            [2360, 'Хром'],
        ], 'paint-type_3'],
        ['paint-color', 'Цвета покраски', 'color-selection-2', [null, '#eeff33', 18000]],
        ['pearl', 'Перламутр', 'color-selection-many', [true, 27000, 5000], null],
        ['disks', 'Диски', 'color-selection-many', [false, 36000, 5000], 100],
    ],
    [ //Wheel

    ],
    [ //Misc

    ],
]