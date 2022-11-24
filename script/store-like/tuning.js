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
        this.tuning_data = data;
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
        parent.innerHTML += /*html*/ `<div class="tuning-nav-elem dark-gray" id="${id}-tuning-nav" onclick="Tuning.navigate(this)" onmouseenter="Tuning.color(this, '#ddd')" onmouseleave="Tuning.color(this, '#bbb')">${svgs[id]}</div>`;
    }

    static fillContainer(data) {
        this.container.innerHTML = '';
        for (var index = 0; index < data.length; index++)
            this.newChoiceElem(...data[index]);
    }

    static fillVariants(type, choice) {
        this.var_container.innerHTML = '';
        this.var_container.style = '';
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
                // addColorPicker(this.var_container, choice.id, data[0], this.colors_arr[choice.id] ?? data[1]);
                addDelete(this.var_container, choice.id, data[2]);
                break;
            case 'color-selection-2':
                this.var_container.style = 'height: 300px;min-height: unset;';
                this.var_container.innerHTML = /*html*/ `<div style="height:150px;"></div>`;
                // addColorPicker(this.var_container.firstElementChild, `${choice.id}-main`, 'Основной цвет', this.colors_arr[choice.id] ?? data[0]);
                // addColorPicker(this.var_container.firstElementChild, `${choice.id}-extra`, 'Дополнительный цвет', this.colors_arr[choice.id] ?? data[1]);
                break;
            case 'color-selection-many':
                this.var_container.style = 'height: 265px;min-height: unset;display: flex;justify-content: space-evenly;flex-direction: column;align-items: center;font-weight: 600;font-size: 14px;color: white;';
                var index = 0;
                data = tuning_colors;
                this.var_container.innerHTML = /*html*/ `<div>Цвет</div><div></div>`;
                for (var i = 0; i < 10; i++) {
                    var row = document.createElement('div');
                    row.classList.add('tuning-color-row');
                    this.var_container.lastElementChild.append(row);
                    for (var j = 0; j < 16; j++) {
                        row.innerHTML += /*html*/ `<div style="background: #${data[index][0]}"></div>`;
                        index++;
                    }
                }
                break;
        }

        function addDelete(parent, id, cost) {
            parent.innerHTML += /*html*/ `
                <div class="tuning-delete-color dark-gray" style="margin-top: 15px;" onclick="Tuning.deleteRequest('${id}')">${tuning_svgs.cross}Удалить (${prettyUSD(cost)})</div>`;
        }

        function addColorPicker(parent, id, title, hex) {
            parent.innerHTML += /*html*/
                `<div class="tuning-color-picker">
                <div>
                    <span>${title}</span>
                    <div hex="${hex}"  class="colorpicker" id="tuning-${id}-colorpicker" source-id="${id}" parent="tuning" onclick="Tuning.oncolorcircle(this)" style="background: ${hex}"></div>
                </div>
            </div>`;
        }
    }

    static variants_arr = [];
    static colors_arr = [];
    static newChoiceElem(id, name, type, params) {
        this.container.innerHTML += /*html*/ `<div id="${id}" class="tuning-choice dark-gray" onclick="Tuning.selectChoiceElem(this)" type="${type}">${name}</div>`;
        this.variants_arr[id] = params;
    }

    static newVariantElem(id, index, cost, name) {
        this.var_container.innerHTML += /*html*/ `<div id="${id}" class="tuning-choice dark-gray" onclick="Tuning.selectVariantElem(this)">${name != null ? name : `Вариант #${index + 1}`}</div>`;
    }

    /*clicks*/
    static navigate(elem) {
        if (elem == this.lastNav) return;
        this.colorNav(elem);
        this.lastNav = elem;

        var index = parseInt(elem.id);
        this.fillContainer(this.tuning_data[index])
        if (this.lastChoices[index]) document.getElementById(this.lastChoices[index]).click();

        this.navigationRequest(index);
    }

    static selectChoiceElem(choice) {
        this.colorSelected(choice);
        this.fillVariants(choice.getAttribute('type'), choice)
        // this.switchMoney(true);
        // var cost = prettyUSD(parse/Int(choice.getAttribute('cost')) * this.coef);
        // this.cash.lastElementChild.innerText = cost;
        // this.bank.lastElementChild.innerText = cost;
    }

    static selectVariantElem(variant) {
        // this.colorSelected(variant);
        // var id = variant.getAttribute('data');
        // this.cur_variant_arr[id] = variant.id;
        // document.getElementById(id).cur_variant = variant.id;
        this.variantRequest(variant.id)
    }

    static oncolorcircle(circle) {
        whoInvoked = circle;
        whoInvoked.scale = tuning_tmpl.style.zoom || 1;
        renderTemplate(true, 'colorpicker');
        document.addEventListener('click', this.documentClick);
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

    static color(elem, color) {
        if (!!this.lastNav && elem == this.lastNav) return;
        var paths = elem.getElementsByTagName('path');
        for (var i = 0; i < paths.length; i++)
            if (paths[i].hasAttribute('fill')) paths[i].setAttribute("fill", color);
    }

    static colorSelected(elem) {
        elem.style.color = 'white';
        elem.classList.add('tuning-selected')

        var lastChoice = document.getElementById(this.lastChoices[parseInt(this.lastNav.id)]);
        if (!!lastChoice && lastChoice != elem) {
            lastChoice.classList.remove('tuning-selected');
            lastChoice.style.color = '';
        }

        this.lastChoices[parseInt(this.lastNav.id)] = elem.id;
    }

    /*requests*/
    static navigationRequest(id) {
        mp.trigger('Tuning::NavChange', id);
    }

    static variantRequest(id) {
        mp.trigger('Tuning::Choose', id);
    }

    static deleteRequest(id) {
        mp.trigger('Tuning::DeleteColor', id)
    }
}

tune_data = [
    [ //Tech
        ['engine', 'Двигатель', 'variants-list', [100, 140, 200]],
        ['breaks', 'Тормоза', 'variants-list', [
            [500, 'Тормоза первые'],
            [430, 'Тормоза вторые'],
            [260, 'Тормоза третьи']
        ]],
        ['transmission', 'Коробка передач', 'variants-list', [1040, 1470, 2030, 1250, 1304, 5041]],
        ['pendant', 'Подвеска', 'variants-list', [1400, 1430, 2005, 5102]],
        ['turbo', 'Турбо-тюнинг', 'variants-list', [1100, 1420, 2300, 510, 5293, 699, 7103, 6010, 602, 1296, 1100, 1420, 2300, 510, 5293, 699, 7103, 6010, 602, 1296]],
    ],
    [ //Style
        ['id1', 'Спойлер', 'variants-list', [1, 1, 1]],
        ['neon', 'Неон', 'color-selection-1', ['Цвет неона', '#E89623', 5000]]
    ],
    [ //Color
        ['paint-type', 'Тип покраски', 'variants-list', [
            [500, 'Обычный'],
            [430, 'Металлик'],
            [260, 'Жемчужный'],
            [2500, 'Матовый'],
            [5430, 'Металлический'],
            [2360, 'Хром'],
        ]],
        ['paint-color', 'Цвета покраски', 'color-selection-2', ['#E89623', '#E89623']],
        ['pearl', 'Перламутр', 'color-selection-many', []],
        ['disks', 'Диски', 'color-selection-many', []],
    ],
    [ //Wheel

    ],
    [ //Misc

    ],
]