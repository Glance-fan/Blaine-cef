var EstAgency = class Real_Estate_Agency {
    static full_data = {
        'Дома': [],
        'Квартиры': [],
        'Гаражи': [],
    }

    static filtered_data = {
        'Дома': [],
        'Квартиры': [],
        'Гаражи': [],
    }

    static defaultFilters = {
        'Дома': [0, 999999999, 0, 99, 0, 99],
        'Квартиры': [0, 999999999, 0, 99],
        'Гаражи': [0, 999999999, 0, 99, 1],
    }

    static curFilters = {}

    static draw(data) {
        this.setData(data);
        this.drawNavigation();
        this.fillInformation();
        // this.selectOption('', 0);
    }

    /*data[0][i] = [uid(str||int), 'name', cost, tax, rooms, garages]
      data[1][i] = [uid(str||int), 'name', cost, tax, rooms]
      data[2][i] = [uid(str||int), 'name', cost, tax, garages]*/
    static setData(data) {
        this.full_data['Дома'] = data[0];
        this.full_data['Квартиры'] = data[1];
        this.full_data['Гаражи'] = data[2];
        this.full_data['gps'] = data[3];
    }

    static selectOption(id, index) {
        document.getElementsByClassName(`estagency${id}`)[index].click();
    }

    static drawNavigation() {
        document.querySelector('#estate-agency-title').innerHTML = estagency_nav[0][0] + estagency_nav[0][1];
        for (var index = 1; index < estagency_nav.length; index++)
            document.querySelector('.estate-agency-options').innerHTML += /*html*/ `
            <div>
                <a class="${index == 1 ? 'estagency-info' : 'estagency'}" onclick="EstAgency.navigate(this)" href="#">
                    ${estagency_nav[index][0]} ${estagency_nav[index][1]}
                </a>
            </div>`
    }

    static lastNav
    static navigate(opt) {
        if (this.lastNav != null) {
            this.lastNav.style = '';
            this.lastNav.parentElement.classList.remove('current');
            document.getElementById(`${this.lastNav.className}-wrapper`).style.display = 'none';
        }
        opt.parentElement.classList.add('current');
        opt.style.color = 'white';
        document.getElementById(`${opt.className}-wrapper`).style.display = 'flex';
        if (opt.className == 'estagency') EstAgency.fillWrapper(opt.innerText);
        this.lastNav = opt;
    }

    static fillInformation() {
        document.getElementById('estagency-info-wrapper').innerHTML = /*html*/ `
            <div class="estagency-section-title">Информация</div>
            <div id="estagency-info-container" class="estagency-section">${estagency_info}</div>`;
    }

    static wrapper = document.getElementById('estagency-wrapper');
    static curOpen;
    static fillWrapper(which) {
        this.resetFilters();
        this.wrapper.querySelector('.estagency-section-title').innerText = `Свободные ${which.toLowerCase()}`;
        this.curOpen = which;
        this.fillContainer(this.full_data[which]);
        this.fillFilters();
    }

    //id = ['Дома', 'Квартиры', 'Гаражи'], new_default = [cost_min, cost_max, rooms_min, rooms_max, garages_min, garages_max]
    static changeDefault(id, new_default) {
        this.defaultFilters[id] = new_default;
        this.resetFilters();
        try { this.lastNav.click(); } catch (error) {};
    }

    static resetFilters() {
        this.curFilters = JSON.parse(JSON.stringify(this.defaultFilters));
    }

    static container = document.getElementById('estagency-container')
    static async fillContainer(data) {
        this.container.innerHTML = '';
        this.stored_elems = [];
        this.output.innerHTML = '';
        this.container.style = '';
      
        await load();

        async function load() {
            data.forEach(el => EstAgency.drawElem(...el));
        }


        var elem = this.lastChoices[this.curOpen];
        if (elem != null) {
            // this.container.parentElement.scrollTo(0, 0)
            try {
                document.querySelector(`[uid="${elem.getAttribute('uid')}"]`).click();
                this.container.parentElement.scrollTo({
                    top: this.lastChoices[this.curOpen].offsetTop - 85,
                    behavior: 'smooth'
                })
            } catch (error) {}
        }
    }

    static drawElem(uid, name, cost, tax, param_3, param_4) {
        var elem = document.createElement('div');
        elem.setAttribute('uid', typeof uid == 'number' ? `${uid}-estagelem` : uid);
        elem.setAttribute('param_1', prettyUSD(cost));
        elem.setAttribute('param_2', prettyUSD(tax, true));
        elem.setAttribute('param_3', param_3);
        elem.setAttribute('param_4', param_4);
        elem.setAttribute('onclick', 'EstAgency.onEstate(this)')
        elem.className = 'estagency-elem';
        elem.innerHTML = name;
        this.container.append(elem);
    }

    static lastChoices = {};
    static onEstate(elem) {
        if (this.lastChoices[this.curOpen] != null)
            this.lastChoices[this.curOpen].classList.remove('estagency-elem-selected');
        elem.classList.add('estagency-elem-selected');
        this.fillOutput(elem);
        this.lastChoices[this.curOpen] = elem;
    }

    static fillFilters() {
        var filters = document.getElementById('estagency-filter');
        filters.innerHTML = '';
        var data = estagency_filters[this.curOpen];
        for (var index = 0; index < data.length; index++) {
            filters.innerHTML += /*html*/
                `<div>
                    <div style="font-weight:500">${data[index][0]}</div>
                    ${this.getFilterElem(data[index][1], data[index][2])}
                </div>`;
            if (data[index][1] == 1) this.checkSmallInput(filters.lastElementChild.querySelector('input'));
        }
    }

    static getFilterElem(type, id) {
        switch (type) {
            case 0:
                return /*html*/ `
                <div class="estagency-filter-type-0">
                    ${this.curOpen == 'Гаражи' && id.includes(4) ? '#' : '$'}
                    <input oninput="EstAgency.onAnyInput(this, ${EstAgency.defaultFilters[EstAgency.curOpen][1]})" onfocus="EstAgency.onCostFocus(this)" onblur="this.parentElement.style.animation = '';" value="${EstAgency.curFilters[EstAgency.curOpen][parseInt(id)]}" id="${id}" maxlength="10" autocomplete="false" spellcheck="false" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32"/>
                </div>`;
            case 1:
                return /*html*/ `
                <div class="estagency-filter-type-1">
                    <div onclick="EstAgency.onMinus(this.parentElement)">${estagency_svgs.minus}</div>
                    <input oninput="EstAgency.onSmallInput(this)" value="${EstAgency.curFilters[EstAgency.curOpen][parseInt(id)]}" id="${id}" maxlength="3" autocomplete="false" spellcheck="false" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32"/>
                    <div onclick="EstAgency.onPlus(this.parentElement)">${estagency_svgs.plus}</div>
                </div>`;
        }
    }

    static onCostFocus(input) {
        input.select();
        input.parentElement.style.animation = '5s ease 0s infinite normal none running selected';
    }

    static applyFilters() {
        var search_arr = this.full_data[this.curOpen];
        var filters = this.curFilters[this.curOpen];
        search_arr = search_arr.filter(elem => elem[2] >= filters[0]);
        search_arr = search_arr.filter(elem => elem[2] <= filters[1]);
        search_arr = search_arr.filter(elem => elem[4] >= filters[2]);
        search_arr = search_arr.filter(elem => elem[4] <= filters[3]);
        if (this.curOpen == 'Дома') {
            search_arr = search_arr.filter(elem => elem[5] >= filters[4]);
            search_arr = search_arr.filter(elem => elem[5] <= filters[5]);
        }
        if (this.curOpen == 'Гаражи') search_arr = search_arr.filter(elem => elem[5] == filters[4]);
        this.fillContainer(search_arr);
    }

    static onSmallInput(input) {
        this.onAnyInput(input, this.getMaxXtrm(parseInt(input.id)));
        this.checkSmallInput(input);
    }

    static onPlus(parent) {
        var input = parent.querySelector('input');
        if (parseInt(input.value) + 1 < 100) input.value++;
        this.checkSmallInput(input);
    }

    static onMinus(parent) {
        var input = parent.querySelector('input');
        if (parseInt(input.value) - 1 > -1) input.value--;
        this.checkSmallInput(input);
    }

    static checkSmallInput(input) {
        var parent = input.parentElement.children;
        var xtrms = this.getXtrms(parseInt(input.id));
        if (input.value == xtrms[0]) parent[0].firstElementChild.style.opacity = 0;
        else parent[0].firstElementChild.style.opacity = 1;
        if (input.value == xtrms[1]) parent[2].firstElementChild.style.opacity = 0;
        else parent[2].firstElementChild.style.opacity = 1;
        this.curFilters[this.curOpen][parseInt(input.id)] = parseInt(input.value);
        this.applyFilters();
    }

    static getXtrms(num) {
        var temp_arr = this.defaultFilters[this.curOpen];
        if (num % 2 == 0) return [temp_arr[num], temp_arr[num + 1]];
        else return [temp_arr[num - 1], temp_arr[num]];
    }

    static getMaxXtrm(num) {
        var temp_arr = this.defaultFilters[this.curOpen];
        if (num % 2 == 0) return temp_arr[num + 1];
        else return temp_arr[num];
    }

    static onAnyInput(input, max) {
        if (input.value == '' || input.value == 0) {
            input.value = 0;
            input.select();
        }
        if (input.value > max) input.value = max;
        this.curFilters[this.curOpen][parseInt(input.id)] = parseInt(input.value);
        this.applyFilters();
    }

    static output = document.getElementById('estagency-output-wrapper');
    static fillOutput(elem) {
        this.output.innerHTML = /*html*/ `<div id="estagency-output"><div></div><div></div></div>`;
        var output = this.output.firstElementChild;
        var data = estagency_output[this.curOpen]
        for (var index = 0; index < data.length; index++) {
            output.firstElementChild.innerHTML += /*html*/
                `<div style="font-weight:500">${data[index]}</div>`;
            output.lastElementChild.innerHTML += /*html*/
                `<div style="font-weight:700">${elem.getAttribute(`param_${index + 1}`)}</div>`;
        }
        var gps_id = Array.from(estagency_tmpl.querySelector('.current').parentElement.children).indexOf(estagency_tmpl.querySelector('.current')) - 1;
        this.output.innerHTML += /*html*/ `<div>
            GPS-метка
            <button onclick="EstAgency.gpsRequest()" class="red-button">${prettyUSD(this.full_data['gps'][gps_id])}</button>
        </div>`;
    }

    static gpsRequest() {
        mp.trigger('EstAgency::GPS', this.lastChoices[this.curOpen].getAttribute('uid').replace('-estagelem', ''));
    }
}