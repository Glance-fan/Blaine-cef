var Tattoo = class TattooSalon {
    static container = document.getElementById('tattoo-container');
    static var_container = document.getElementById('tattoovar-container');
    static money_block;
    static variants_arr = [];
    static initial_choices = [];
    static lastChoiceId;
    static choices = [];

    static draw(data) {
        document.querySelector('.tattoo-bg').innerHTML = salon_svgs.tattoo;
        this.fillMenu();
        this.fillChoices(data);
        this.container.firstChild.click();
    }

    static fillChoices(choices) {
        choices.forEach(choice => {
            this.newChoice(...choice);
        });        
    }

    static newChoice(id, name, variants, current) {
        this.container.innerHTML += /*html*/ `<div id="${id}" class="tattoo-choice dark-gray" onclick="Tattoo.selectChoice(this)">${name}</div>`;
        this.lastChoiceId = id;
        this.variants_arr[id] = variants;
        this.initial_choices[id] = current;
        this.choices[id] = current;
        this.checkNone();
    }

    static fillVariants(variants) {
        this.var_container.innerHTML = '';
        variants.forEach(variant => {
            this.newVariant(...variant);
        });
    }

    static newVariant(id, name, cost) {
        this.var_container.innerHTML += /*html*/ `<div id="${id}" class="tattoo-choice dark-gray" onclick="Tattoo.selectVariant(this)" cost="${prettyUSD(cost)}">${name}</div>`;
    }

    static fillMenu() {
        var menu = document.getElementById('tattoo-menu').children;
        menu[0].children[0].innerHTML = salon_svgs.cash + `<p id="tattoo-cash"></p>`;
        menu[0].children[1].innerHTML = salon_svgs.bank + `<p id="tattoo-bank"></p>`;
        menu[1].children[0].innerHTML = salon_svgs.exit;
        this.money_block = document.getElementById('tattoo-menu').firstElementChild;
    }

     /*search*/
     static search_arr;
     static drawSearch(variants) {
        this.search_arr = variants;
        var search_block = document.querySelector('.shop-search-block');
        search_block.style.display = 'flex';
        search_block.innerHTML = /*html*/ `${salon_svgs.search}
            <input id="shop-search" placeholder="Поиск" onblur="Tattoo.blurSearch(this)" oninput="Tattoo.inputSearch(this)" spellcheck="false" autocomplete="false"/>`;
    }

    static focusSearch(block) {
        block.style.animation = '5s ease 0s infinite normal none running selected';
        block.querySelector('input').focus();
    }

    static blurSearch(search) {
        search.parentElement.style.animation = '';
    }

    static inputSearch(search) {
        var temp_data = [];
        for (var index = 0; index < this.search_arr.length; index++) {
            if (this.search_arr[index][1].toLowerCase().includes(search.value.toLowerCase().replace(/\s+/g, ' ').trim())) temp_data.push(this.search_arr[index])
        }
        this.fillVariants(temp_data);
        try {
            document.getElementById(this.choices[this.lastChoiceId]).click();
        } catch (error) {}
    }



    /*clicks*/
    static selectChoice(choice) {
        if (this.lastChoiceId != choice.id) this.choiceRequest(choice.id);
        this.lastChoiceId = choice.id;
        this.colorSelected(choice, this.container);
        this.fillVariants(this.variants_arr[choice.id]);
        this.selectVariant(document.getElementById(this.choices[choice.id]));
        this.drawSearch(this.variants_arr[choice.id]);
    }

    static selectVariant(variant) {
        if (this.choices[this.lastChoiceId] != variant.id) this.variantRequest(variant.id);
        this.colorSelected(variant, this.var_container);
        this.choices[this.lastChoiceId] = variant.id;
        this.updateMoney(variant);
    }

   

    /*misc*/
    static colorSelected(elem, container) {
        var last_selected = container.querySelector('.tattoo-selected')
        if (last_selected && last_selected != elem) {
            last_selected.classList.remove('tattoo-selected');
            last_selected.style.color = '';
        }

        elem.style.color = 'white';
        elem.classList.add('tattoo-selected');
    }

    static updateMoney(variant) {
        if (this.initial_choices[this.lastChoiceId] == this.choices[this.lastChoiceId])
            this.setMoney('Приобретено');
        else this.setMoney(variant.getAttribute('cost'))
    }

    static setMoney(val) {
        Array.from(this.money_block.querySelectorAll('p')).forEach(el => {
            el.innerText = val;
            if (val == 'Приобретено') el.parentElement.style.pointerEvents = 'none';
            else el.parentElement.style.pointerEvents = 'unset';
        });
    }

    static checkNone() {
        var none = this.variants_arr[this.lastChoiceId][0];
        if (this.initial_choices[this.lastChoiceId] != none[0]) none[1] = 'Свести татуировку';
        else none[1] = 'Ничего';
    }

    static buyVariant(id, new_initial) {
        this.initial_choices[id] = new_initial;
        this.checkNone();
        document.getElementById(id).click();
    }

    /*requests*/
    static choiceRequest(id) {
        mp.trigger("Shop::Change", id);
    }

    static variantRequest(variant) {
        mp.trigger("Shop::Choose", this.lastChoiceId, variant);
    }

    static payRequest(pay_method) {
        mp.trigger("Shop::Buy", pay_method, this.lastChoiceId);
    }
}

tattoo_data = [
    ['head', 'Голова', [
        ['none', 'Ничего', 3000],
        ['dragon_tattoo_0', 'Дракон', 500],
        ['dragon_tattoo_1', 'Дракончик', 1500],
        ['dragon_tattoo_2', 'Дракончики', 2500],
    ], 'dragon_tattoo_1'],
    ['left_arm', 'Левая рука', [
        ['none', 'Ничего', 2400],
        ['dragon_tattoo_0', 'Дракон', 500],
        ['dragon_tattoo_1', 'Дракончик', 1500],
        ['dragon_tattoo_2', 'Дракончики', 2500],
    ], 'none'],
    ['right_arm', 'Правая рука', [
        ['none', 'Ничего', 3000],
        ['dragon_tattoo_0', 'Дракон', 500],
        ['dragon_tattoo_1', 'Дракончик', 1500],
        ['dragon_tattoo_2', 'Дракончики', 2500],
    ], 'dragon_tattoo_2'],
]