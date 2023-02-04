var Salon = class Salon {
    static container = document.getElementById('salon-container');
    static var_container = document.getElementById('salonvar-container');
    static right = salon_tmpl.lastElementChild;
    static pic_paths = [];
    static lastChoices;
    static lastChoiceId;
    static initial_choices = {};
    static overlay_choices = {};
    static variants_arr = [];
    static choices = [];
    static money_block;
    static cur_sex;
    static salon_data;
    static lastNav;



    static draw(data) {
        document.querySelector('.salon-bg').innerHTML = salon_svgs.main;
        this.drawNavigation(data.length);
        this.fillMenu();
        this.salon_data = data;
        this.navigate(document.getElementById('0-salon-nav'));
    }

    /*navigation*/
    static drawNavigation(amount) {
        var rows = this.getNavigation(amount);
        var svg_index = 0;
        for (var index = 0; index < rows.length; index++) {
            var row = document.createElement('div');
            row.classList.add('salon-nav-row');
            document.querySelector('.salon-nav').append(row);
            for (var j = 0; j < rows[index]; j++)
                this.newNavElem(row, svg_index++);
        }
        this.lastChoices = Array(amount).fill(null);
    }

    static newNavElem(parent, id) {
        parent.innerHTML += /*html*/ `<div class="salon-nav-elem dark-gray" id="${id}-salon-nav" onclick="Salon.navigate(this)" onmouseenter="Salon.onmouse(this, '#ddd')" onmouseleave="Salon.onmouse(this, '#bbb')">${salon_nav[id]}</div>`;
    }

    /*pics-elems*/
    static fillWithPics(id, data, initial, hairoverlay) {
        this.container.innerHTML = '';
        this.container.style = 'width: 130px;padding: 26.25px 85px;'
        if (initial && !this.lastChoices[parseInt(this.lastNav.id)] && !this.initial_choices[id]) {
            this.initial_choices[id] = initial;
            this.initial_choices[id] = JSON.parse(JSON.stringify(this.initial_choices[id]));
            this.lastChoices[parseInt(this.lastNav.id)] = this.initial_choices[id][1];
            this.choices[id] = initial;
        }
        for (var index = 0; index < data.length; index++)
            this.newPicElem(id, ...data[index]);

        if (!hairoverlay) this.var_container.className = '';
        else this.fillHairVariants(hairoverlay);
        this.var_container.parentElement.style = 'height: 347px';
        this.var_container.style = 'min-height: unset';
        this.lastChoiceId = id;

        if (hairoverlay)
            this.drawColorSelection(this.right.firstElementChild, `${id}-main`, salon_colors['hair']);
        this.drawColorSelection(this.right.children[1], hairoverlay ? `${id}-extra` : id, salon_colors['hair']);
    }

    static newPicElem(id, idx, price, overlay) {
        var path, hair_id = `${id}_${idx}`;
        if (id.includes('hair')) {
            path = this.cur_sex ? 'hair/boy' : 'hair/girl';
            if (!(hair_id in this.overlay_choices)) this.overlay_choices[hair_id] = overlay;
        }
        this.container.innerHTML += /*html*/
            `<div id="${hair_id}" class="salon-pic-elem" onclick="Salon.selectPicElem(this)" style="background: url(libs/img/char-creation/hair/${path || id}/${idx}.png);background-size: cover;" cost="${price}"><div></div></div>`;
    }

    /*choices-elems*/
    static fillWithChoices(data) {
        this.container.innerHTML = '';
        this.container.style = '';
        for (var index = 0; index < data.length; index++)
            this.newChoiceElem(...data[index]);
    }

    static newChoiceElem(id, name, variants, initial) {
        this.container.innerHTML += /*html*/ `<div id="${id}" class="salon-choice dark-gray" onclick="Salon.selectChoiceElem(this)">${name}</div>`;
        if (!(id in this.initial_choices)) {
            if (initial == null) initial = [0, `${id}_0`, 0.5]
            this.initial_choices[id] = initial;
            this.initial_choices[id] = JSON.parse(JSON.stringify(this.initial_choices[id]));
            this.choices[id] = initial;

        }
        this.variants_arr[id] = variants;
    }

    /*misc-selection*/
    static drawColorSelection(parent, where, colors) {
        if (this.choices[this.lastChoiceId][0] == -1) return;
        parent.innerHTML = /*html*/ `
            <div class="salon-color-block salon-bg">
                <div>${where.includes('main') ? 'Цвет (Основной)' : where.includes('extra') ? 'Цвет (Акцент)' : 'Цвет'}</div>
                <div class="salon-color-wrapper"></div>
            </div>${parent.innerHTML}`;
        var wrapper = parent.querySelector('.salon-color-wrapper');
        var color_id = 0;
        for (var rows = 0; rows < Math.ceil(colors.length / 16); rows++) {
            wrapper.innerHTML += /*html*/ `<div class="salon-color-row"></div>`;
            var row = wrapper.lastElementChild;
            for (var index = 0; index < 16; index++) {
                row.innerHTML += /*html*/
                    `<div class="salon-color-elem" id="${color_id}-${where}-color" style="background: ${colors[color_id]}" onclick="Salon.oncolor(this)"></div>`;
                color_id++;
            }
        }
        if (this.choices[this.lastChoiceId]) {
            if (where.includes('main') || where.includes('extra')) {
                where.includes('main') ?
                    document.getElementById(`${this.choices[this.lastChoiceId][2]}-${where}-color`).classList.add('salon-color-selected') :
                    document.getElementById(`${this.choices[this.lastChoiceId][3]}-${where}-color`).classList.add('salon-color-selected');
            } else document.getElementById(`${this.choices[this.lastChoiceId][0]}-${where}-color`).classList.add('salon-color-selected');
        }
    }

    static drawRange(value) {
        this.var_container.parentElement.style = 'height: 391px';
        this.right.children[1].innerHTML += /*html*/
            `<div class="salon-slider-block salon-bg">
                <div>Насыщенность</div>
                <div class="salon-slider-wrapper">
                    <input id="" type="range" min="0" max="1" value="${value}" step="0.1" oninput="Salon.onrange(this)">
                    <div class="salon-span-wrapper">
                        <span>тусклее</span>
                        <span style="text-align:center" id="cur-salon-range">${value}</span>
                        <span style="text-align:right">ярче</span>
                    </div>
                </div>
            </div>`;
        this.var_container = document.getElementById('salonvar-container');
        this.onrange(salon_tmpl.querySelector('input'));
    }

    /*variant-elems*/
    static fillVariants(id) {
        var data = this.variants_arr[id];
        this.var_container.innerHTML = '';
        if (data.length > 10) this.var_container.style = 'min-height: unset';
        for (var index = 0; index < data.length; index++)
            this.newVariantElem(`${id}_${index}`, ...data[index]);
    }

    static newVariantElem(id, cost, name) {
        this.var_container.innerHTML += /*html*/ `<div cost="${cost}" id="${id}" class="salon-choice dark-gray" onclick="Salon.selectVariantElem(this)">${name}</div>`;
    }

    static fillHairVariants(data) {
        if (data.length < 9) this.var_container.style = 'min-height: 347px';
        for (var index = 0; index < data.length; index++)
            this.var_container.innerHTML += /*html*/ `<div id="hairoverlay_${data[index]}" class="salon-choice dark-gray" onclick="Salon.selectVariantElem(this)">${index == 0 ? `Без висков` : `Виски #${index}`}</div>`;
    }

    /*menu*/
    static fillMenu() {
        var menu = document.getElementById('salon-menu').children;
        menu[0].children[0].innerHTML = salon_svgs.cash + `<p id="salon-cash"></p>`;
        menu[0].children[1].innerHTML = salon_svgs.bank + `<p id="salon-bank"></p>`;
        menu[1].children[0].innerHTML = salon_svgs.exit;
        this.money_block = document.getElementById('salon-menu').firstElementChild;
    }



    /*clicks*/
    static navigate(elem) {
        if (elem == this.lastNav) return;
        this.clear();

        var index = parseInt(elem.id);
        this.navigationRequest(index);

        this.colorNav(elem);
        this.lastNav = elem;

        if (!elem.parentElement.nextSibling) this.fillWithChoices(this.salon_data.at(-1));
        else this.fillWithPics(...this.salon_data[index]);

        if (this.lastChoices[index]) document.getElementById(this.lastChoices[index]).click();
        else this.selectChoiceElem(this.container.firstElementChild);

        try {
            this.container.parentElement.scrollTo({
                top: document.querySelector('.salon-pic-selected').offsetTop - 181,
                behavior: 'smooth'
            })
        } catch (error) {}
    }

    static selectPicElem(pic) {
        if (this.choices[this.lastChoiceId][1] != pic.id) this.picRequest(pic.id);
        this.choices[this.lastChoiceId][1] = pic.id;
        this.colorPicSelected(pic);
        if (pic.id.includes('hair')) {
            pic.id == this.initial_choices['hair'][1] ?
                document.getElementById(this.initial_choices['hair'][0]).click() :
                document.getElementById(`hairoverlay_${this.overlay_choices[pic.id]}`).click();
            document.getElementById('salon-right-scrollable').scrollTo({
                top: this.right.querySelector('.salon-selected').offsetTop - 333,
                behavior: 'smooth'
            })

        }
        this.updateVariantMoney(pic);
    }

    static selectChoiceElem(choice) {
        this.lastChoiceId = choice.getAttribute('id');
        this.clear();
        this.colorChoiceSelected(choice);
        this.drawColorSelection(this.right.firstElementChild, choice.id, salon_colors['makeup']);
        this.fillVariants(choice.id);
        if (this.choices[choice.id][1]) document.getElementById(this.choices[choice.id][1]).click();
        this.drawRange(this.choices[this.lastChoiceId][2]);
        this.var_container.parentElement.scrollTo({
            top: document.getElementById(this.choices[choice.id][1]).offsetTop - 155,
            behavior: 'smooth'
        })
    }

    static selectVariantElem(variant) {
        if (this.choices[this.lastChoiceId][1] != variant.id) this.variantRequest(variant.id);
        this.colorVariantSelected(variant);
        this.choices[this.lastChoiceId][variant.id.includes('hair') ? 0 : 1] = variant.id;
        this.updateVariantMoney(variant.id.includes('hair') ? salon_tmpl.querySelector('.salon-pic-selected').parentElement : variant);
    }

    static oncolor(elem) {
        if (elem.id.includes('main') || elem.id.includes('extra')) {
            this.oncolorhair(elem, elem.id.includes('main') ? 2 : 3);
            return;
        }
        if (this.choices[this.lastChoiceId][0] != parseInt(elem.id)) this.colorRequest(parseInt(elem.id));
        if (this.choices[this.lastChoiceId][0] != null)
            document.querySelector('.salon-color-selected').classList.remove('salon-color-selected');
        elem.classList.add('salon-color-selected');
        this.choices[this.lastChoiceId][0] = parseInt(elem.id);
        this.updateVariantMoney(Salon.var_container.querySelector('.salon-selected') || salon_tmpl.querySelector('.salon-pic-selected').parentElement);
    }

    static oncolorhair(elem, idx) {
        if (this.choices[this.lastChoiceId][idx] != null)
            document.querySelectorAll('.salon-color-wrapper')[idx == 2 ? 0 : 1].querySelector('.salon-color-selected').classList.remove('salon-color-selected');
        elem.classList.add('salon-color-selected');
        if (this.choices[this.lastChoiceId][idx] != parseInt(elem.id))
            this.colorRequest(parseInt(elem.id), idx == 2 ? 'main' : 'extra');
        if (idx == 2) {
            if (this.choices[this.lastChoiceId][3] != null)
                this.right.children[1].querySelector('.salon-color-selected').classList.remove('salon-color-selected');
            if (this.choices[this.lastChoiceId][3] != parseInt(elem.id))
                this.colorRequest(parseInt(elem.id), 'extra');
            document.getElementById(elem.id.replace('main', 'extra')).classList.add('salon-color-selected');
            this.choices[this.lastChoiceId][3] = parseInt(elem.id);
        }
        this.choices[this.lastChoiceId][idx] = parseInt(elem.id);
        this.updateVariantMoney(salon_tmpl.querySelector('.salon-pic-selected').parentElement);
    }

    static onrange(slider) {
        if (this.choices[this.lastChoiceId][2] != slider.value) this.rangeRequest(parseFloat(slider.value));
        var percent = (slider.value - slider.min) * 100 / (slider.max - slider.min);
        slider.style.backgroundSize = percent + '% 100%';
        document.getElementById('cur-salon-range').innerText = slider.value;
        this.choices[this.lastChoiceId][2] = parseFloat(slider.value);
        this.updateVariantMoney(this.var_container.querySelector('.salon-selected'));
    }



    /*misc*/
    static getNavigation(amount) {
        switch (amount) {
            case 5: //male
                this.cur_sex = true;
                salon_nav[3] = salon_svgs.chest;
                return [2, 2, 1];
            case 3: //female
                this.cur_sex = false;
                salon_nav.splice(2, 2);
                return [2, 1];
        }
    }

    static updateVariantMoney(variant) {
        if (JSON.stringify(this.initial_choices[this.lastChoiceId]) === JSON.stringify(this.choices[this.lastChoiceId]))
            this.setMoney('Приобретено');
        else this.setMoney(prettyUSD(parseInt((parseInt(variant.getAttribute('cost')) * this.coef).toFixed(2))))
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
        var el;
        try {
            el = this.container.querySelector('.salon-pic-selected').parentElement
        } catch (e) {
            el = this.var_container.querySelector('.salon-selected')  
        }
        this.updateVariantMoney(el)
    }

    static colorNav(elem) {
        color(elem, '#fff');
        if (!!this.lastNav) color(this.lastNav, '#bbb');

        function color(elem, color) {
            var paths = elem.getElementsByTagName('path');
            !elem.className.includes('salon-selected') ? elem.classList.add('salon-selected') : elem.classList.remove('salon-selected');
            for (var i = 0; i < paths.length; i++)
                if (paths[i].hasAttribute('fill')) paths[i].setAttribute("fill", color);
        }
    }

    static colorPicSelected(elem) {
        var lastChoice = document.getElementById(this.lastChoices[parseInt(this.lastNav.id)]);
        if (lastChoice && lastChoice != elem) {
            lastChoice.firstChild.classList.remove('salon-pic-selected');
            lastChoice.style.removeProperty('opacity');
        }

        elem.style.opacity = 1;
        elem.firstChild.classList.add('salon-pic-selected');

        this.lastChoices[parseInt(this.lastNav.id)] = elem.id;
    }

    static colorChoiceSelected(elem) {
        elem.style.color = 'white';
        elem.classList.add('salon-selected');

        var lastChoice = document.getElementById(this.lastChoices[parseInt(this.lastNav.id)]);
        if (lastChoice && lastChoice != elem) {
            lastChoice.classList.remove('salon-selected');
            lastChoice.style.color = '';
        }

        this.lastChoices[parseInt(this.lastNav.id)] = elem.id;
    }

    static colorVariantSelected(elem) {
        elem.style.color = 'white';
        elem.classList.add('salon-selected');

        var idx = this.lastChoiceId.includes('hair') ? 0 : 1;
        var lastChoice = document.getElementById(this.choices[this.lastChoiceId][idx])
        if (!!lastChoice && lastChoice != elem) {
            lastChoice.classList.remove('salon-selected');
            lastChoice.style.color = '';
        }
    }

    static onmouse(elem, color) {
        if (!!this.lastNav && elem == this.lastNav) return;
        var paths = elem.getElementsByTagName('path');
        for (var i = 0; i < paths.length; i++)
            if (paths[i].hasAttribute('fill')) paths[i].setAttribute("fill", color);
    }

    static clear() {
        document.querySelectorAll('.salon-color-block').forEach((el) => {
            el.remove()
        })
        this.right.children[1].innerHTML = /*html*/ `<div id="salon-right-scrollable"><div class="salon-bg" id="salonvar-container"></div></div>`;
        this.var_container = document.getElementById('salonvar-container');
        this.container.parentElement.style = '';
        this.var_container.parentElement.style = '';
    }

    static buyVariant(id, new_initial) {
        this.initial_choices[id] = new_initial;
        document.getElementById(new_initial[1]).click();
    }



    /*requests*/
    static navigationRequest(id) {
        mp.trigger('Shop::NavChange', parseInt(id));
    }

    static picRequest(id) {
        mp.trigger('Shop::Choose', id);
    }

    static variantRequest(id) {
        mp.trigger('Shop::Choose', 'variant', id, this.lastChoiceId);
    }

    static rangeRequest(value) {
        mp.trigger('Shop::Choose', 'opacity', value, this.lastChoiceId);
    }

    static colorRequest(id, prior) {
		if (!!prior)
			mp.trigger('Shop::Choose', 'colour', id, this.lastChoiceId, prior);
		else
			mp.trigger('Shop::Choose', 'colour', id, this.lastChoiceId);
    }

    static payRequest(pay_method) {
        mp.trigger("Shop::Buy", pay_method, this.lastChoiceId);
    }
}

salon_data = [
    ['hair', [
            [2, 1000, 51], //hair_id, cost, hairoverlay_initital_id
            [9, 2000, -1],
            [6, 3000, 117],
            [13, 4000, 120]
        ],
        ['hairoverlay_34', 'hair_13', 12, 15], //bought: hairoverlay_id, hair_id, color_1, color_2
        [-1, 23, 34, 41, 51, 46, 72, 87, 98, 120, 151, 172, 131, 143, 145, 117] //hairovelay return ids
    ],
    ['eyebrows', [
            [3, 1000], //hair_id, cost
            [7, 1000],
            [13, 1000]
        ],
        [14, 'eyebrows_7'] //bought: color, hair_id
    ],
    [
        ['lipstick', 'Помада', [
                [500, 'Средняя матовая'],
                [300, 'Матовая'],
                [1000, 'Глянцевая'],
                [500, 'Средняя матовая'],
                [300, 'Матовая'],
                [1000, 'Глянцевая'],
                [500, 'Средняя матовая'],
                [300, 'Матовая'],
                [1000, 'Глянцевая'],
                [500, 'Средняя матовая'],
                [300, 'Матовая'],
                [1000, 'Глянцевая'],
            ],
            [10, 'lipstick_11', 0.4] //bought: color, makeup_id, makeup_opacity; 
        ],
        ['blush', 'Румяна', [
                [500, 'Средняя матовая'],
                [300, 'Матовая'],
                [1000, 'Глянцевая']
            ],
            [15, 'blush_1', 0.7]
        ],
        ['makeup', 'Макияж', [
                [500, 'Средняя матовая'],
                [300, 'Матовая'],
                [1000, 'Глянцевая']
            ],
            [-1, 'makeup_2', 0.1] //if color == -1 -> no colorpicker
        ]
    ]
]