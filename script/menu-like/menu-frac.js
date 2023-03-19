var MenuFrac = class MenuFraction {
    static draw(data) {
        this.drawNavigation();
        this.selectOption(0);

        this.fillManagment(...data[2]);
        this.fillStaff(data[1])
        this.fillInformation(...data[0]);
    }

    static drawNavigation() {
        var static_nav = ['Информация', 'Сотрудники', 'Управление']
        for (var index = 0; index < static_nav.length; index++) {
            document.querySelector('.menu-frac-options').innerHTML += /*html*/ `
                <div>    
                    <a id="menufrac-${index}" onclick="MenuFrac.navigate(this)" href="#"><img src="libs/svgs/menu-frac/${index}.svg">${static_nav[index]}</a>
                </div>`
            menufrac_tmpl.lastElementChild.innerHTML += /*html*/
                `<div id="menufrac-${index}-container"></div>`
        }
        menufrac_tmpl.lastElementChild.innerHTML += /*html*/
            `<div id="menufrac-${static_nav.length}-container"></div>`
    }

    static selectOption(index) {
        document.getElementById(`menufrac-${index}`).click();
    }

    static lastNav
    static navigate(opt) {
        if (this.lastNav == opt) return;
        if (this.lastNav) {
            if (this.lastNav.id.includes('2')) this.showEdit(false);
            this.lastNav.style = '';
            this.lastNav.parentElement.classList.remove('current');
            document.getElementById(`${this.lastNav.id}-container`).style.display = 'none';
        }
        opt.parentElement.classList.add('current');
        opt.style.color = 'white';
        document.getElementById(`${opt.id}-container`).style.display = 'flex';
        this.lastNav = opt;
    }


    /*information*/
    static now_news;
    static news_btn = /*html*/ `<button class="red-button" onclick="MenuFrac.newsRequest(0)">Добавить</button>`;
    static fillInformation(news, info) {
        document.getElementById('menufrac-0-container').innerHTML = /*html*/ `
            <div id="menu-frac-news-wrapper">
                <h2>Объявления и новости</h2>
                <div class="menu-frac-scrollable" style="width:100%">
                    <div id="menu-frac-no-news" class="menu-frac-section">
                        <img src="libs/svgs/menu-frac/no_news.svg">
                        Пусто
                    </div>
                    <div id="menu-frac-news" class="menu-frac-section" style="display:none"></div>
                    <textarea id="menu-frac-edit-news" class="menu-frac-section" style="display:none"></textarea>
                </div>
                <div class="menu-frac-news-btns">${this.news_btn}</div>
                <div class="menu-frac-ttp-wrapper"></div>
            </div>
            <div id="menu-frac-info-wrapper" class="menu-frac-section">
                <h2>Информация</h2>
                <div id="menu-frac-info"></div>
                <div style="width: 100%;display: flex;justify-content: space-between;">
                    <button id="menu-frac-workbench-btn" class="green-button" style="font-size:10px" onclick="MenuFrac.buttonRequest('workbench', this)">Закрыть<br>верстак</button>
                    <button id="menu-frac-storage-btn" class="green-button" style="font-size:10px" onclick="MenuFrac.buttonRequest('storage', this)">Закрыть<br>склад</button>
                </div>
            </div>`;
        this.fillNews(news.slice(0, news.length - 1), news.at(-1));
        this.fillInfo(info);
    }

    static fillNews(news, pin) {
        var parent = document.getElementById('menu-frac-news');
        parent.innerHTML = '';
        if (news.every(el => !el)) {
            this.now_news = document.getElementById('menu-frac-no-news');
            return;
        } 
        load(news);
        if (pin) this.pinNews(pin);

        async function load(data) {
            data.forEach(el => {
                MenuFrac.addNews(...el);
            });
        }
    }

    static addNews(id, text) {
        var parent = document.getElementById('menu-frac-news');
        var elem = document.createElement('div');
        elem.id = `${id}-news-elem`;
        elem.className = 'menu-frac-news-elem';
        elem.innerText = text;
        elem.setAttribute('onclick', `MenuFrac.showTooltip(this, 'news', ${id},)`)
        parent.append(elem);

        if (parent.childElementCount > 0) {
            this.now_news = parent;
            if (!this.in_edit) {
                document.getElementById('menu-frac-no-news').style.display = 'none';
                parent.style.display = 'block';
            }
        }

    }

    static lastPin;
    static pinNews(pin) {
        if (this.lastPin) this.unpinNews();

        var elem = document.getElementById(`${pin}-news-elem`),
            parent = elem.parentElement,
            pinned = elem.cloneNode(true);
        elem.style = 'display: none';
        pinned.id += '-pinned';
        pinned.setAttribute('onclick', `MenuFrac.showTooltip(this, 'pinned_news', ${parseInt(pinned.id)})`)
        pinned.className += ' menu-frac-news-pinned';
        parent.insertBefore(pinned, parent.firstChild);

        this.lastPin = pin;
    }

    static unpinNews() {
        document.getElementById(`${this.lastPin}-news-elem`).style = 'display: block';
        document.getElementById(`${this.lastPin}-news-elem-pinned`).remove();
        this.lastPin = null;
    }

    static deleteNews(id) {
        if (this.lastPin == id) this.unpinNews();
        var news = document.getElementById(`${id}-news-elem`),
            parent = news.parentElement;
        news.remove();
        
        if (!parent.childElementCount) {
            this.now_news = document.getElementById('menu-frac-no-news');
            if (!this.in_edit) {
                document.getElementById('menu-frac-no-news').style.display = 'flex';
                parent.style.display = 'none';
            }
        }

    }

    static in_edit = false;
    static editNews(show, id) {
        var parent = document.getElementById('menu-frac-edit-news'),
            btn_wrap = document.querySelector('.menu-frac-news-btns');
        if (!show) {
            btn_wrap.style = '';
            parent.style.display = 'none';
            btn_wrap.innerHTML = this.news_btn;
            this.now_news.style.display = this.now_news.id.includes('no') ? 'flex' : 'block';
            this.in_edit = false;
            return;
        }
        this.in_edit = true;
        parent.style.display = 'block';
        this.now_news.style.display = 'none';
        parent.value = id ? document.getElementById(`${id}-news-elem`).innerText : '';
        btn_wrap.style = 'width:355px;position:absolute;left:0;bottom:0;display:flex;justify-content: space-between;';
        btn_wrap.innerHTML = /*html*/ `
            <button class="grey-button" onclick="MenuFrac.newsRequest(2)">Отменить</button>
            <button class="red-button" onclick="MenuFrac.newsRequest(1, id, document.getElementById('menu-frac-edit-news').value)">${id ? 'Применить' : 'Добавить'}</button>
        `;
        parent.focus();
    }

    static updateNews(id, text) {
        document.getElementById(`${id}-news-elem`).innerText = text;
    }

    static fillInfo(params) {
        var parent = document.getElementById('menu-frac-info');
        var names = ['Тип', 'Лидер', 'Денег на счете', 'Материалы', 'Ваша должность'];
        parent.innerHTML = /*html*/ `<div></div><div></div>`;
        for (var index = 0; index < names.length; index++) {
            parent.firstChild.innerHTML += /*html*/ `<div>${names[index]}</div>`;
            parent.lastChild.innerHTML += /*html*/ `<div></div>`;
            this.updateInfoLine(index, params[index]);
        }
    }

    static local_pos;
    static updateInfoLine(which, value) {
        var elem = document.getElementById('menu-frac-info').lastChild.children[which];
        switch (which) {
            case 0:
            case 1:
                elem.innerText = value;
                break;
            case 2:
                elem.innerText = prettyUSD(value);
                break;
            case 3:
                elem.innerText = `${value} ед.`;
                break;
            case 4:
                elem.innerText = `${value} - ${this.positions[value]}`;
                this.local_pos = value;
                break;
        }
    }

    //which = workbench || storage 
    static setButton(which, state) {
        var btn = document.querySelector(`#menu-frac-${which}-btn`);
        var text = btn.innerHTML.split('<br>');
        btn.className = state ? 'red-button' : 'green-button';
        btn.innerHTML = state ? `Открыть<br>${text[1]}` : `Закрыть<br>${text[1]}`;
    }



    /*staff*/
    static all_employees;
    static fillStaff(staff) {
        document.getElementById('menufrac-1-container').innerHTML = /*html*/ `
            <div id="menu-frac-employee-wrapper">
                <h2>
                    <span>
                        Список сотрудников (в сети - <span id="menu-frac-online"></span>)
                    </span>
                    <div class="menu-frac-search-block" onclick="this.lastElementChild.focus()">
                        <img src="libs/svgs/menu-frac/search.svg">
                        <input placeholder="Поиск" oninput="MenuFrac.onsearch(this.value)" onfocus="MenuFrac.onfocus(this.parentElement)" onblur="MenuFrac.onblur(this.parentElement)">
                    </div>
                </h2>
                <div class="menu-frac-static-management menu-frac-section" style="width: 720px;margin-top: 25px;">
                    <div style="margin-right: 38px;">Cтатус</div>
                    <div style="margin-right: 188px">Сотрудник</div>
                    <div style="width:105px; margin-right:50px;">Последний вход</div>
                    <div style="width:115px; margin-right:40px;">Должность</div>
                    <div>Опции</div>
                </div>
                <div class="menu-frac-scrollable" style="width:100%">
                    <div id="menu-frac-employee" class="menu-frac-section"></div>
                </div>
            </div>`;
        this.fillEmployees(staff);
    }

    static fillEmployees(employees) {
        var parent = document.getElementById('menu-frac-employee');
        parent.innerHTML = '';
        this.all_employees = employees
        load(employees);

        async function load(data, forced) {
            data.forEach(el => {
                MenuFrac.addEmployee(...el, forced);
            });
        }
    }

    static addEmployee(online, status, name, cid, date, pos_id) {
        var parent = document.getElementById('menu-frac-employee');
        var elem = document.createElement('div');
        elem.id = `${cid}-employee-elem`;
        elem.className = 'menu-frac-employee-elem';
        elem.innerHTML = /*html*/ `
            <div style="display:flex; width:40px; justify-content:space-between; margin-right: 40px;">
                <div id="${cid}-employee-circle" class="employee-circle ${online ? 'employee-online' : 'employee-offline'}"></div>
                <div id="${cid}-employee-status"></div>
            </div>
            <div style="width:250px; margin-right:6px;" id="${cid}-employee-name">${name}</div>
            <div style="width:105px; margin-right:50px;" id="${cid}-employee-date">${date}</div>
            <div style="width:115px; margin-right:40px;"id="${cid}-employee-pos">${pos_id} - ${this.positions[pos_id]}</div>
            <div style="display:flex;">
                <div class="menu-frac-img-anim" style="height:15px; margin-right:5px;" onclick="MenuFrac.employeeRequest(${cid}, 0)"><img src="libs/svgs/menu-frac/up.svg"></div>
                <div class="menu-frac-img-anim" style="height:15px; margin-right:15px;" onclick="MenuFrac.employeeRequest(${cid}, 1)"><img src="libs/svgs/menu-frac/down.svg"></div>
                <div class="menu-frac-img-anim" style="height:15px" onclick="MenuFrac.employeeRequest(${cid}, 2)"><img src="libs/svgs/menu-frac/kick.svg"></div>
            </div>
        `;
        parent.append(elem);
        this.updateEmployee(cid, 'status', status)
        this.updateOnline();
    }

    // which = 'circle', 'status', 'name', 'date', 'pos'
    static updateEmployee(cid, which, value) {
        var el = document.getElementById(`${cid}-employee-${which}`);
        this.all_employees.filter(emp => emp[3] == cid)[0][
            ['circle', 'status', 'name', null, 'date', 'pos'].indexOf(which)
        ] = value;
        switch (which) {
            case 'circle':
                el.className = value ? el.className.replace('offline', 'online') : el.className.replace('online', 'offline');
                this.updateOnline();
                break;
            case 'status':
                switch (value) {
                    case 0:
                        el.innerHTML =  ``; 
                        break;
                    case 1: 
                        el.innerHTML =  `<img src="libs/svgs/menu-frac/ban.svg">`; 
                        break;
                    case 2:
                        el.innerHTML = `<img src="libs/svgs/menu-frac/jail.svg">`;
                }
                break;
            case 'name':
            case 'date':
                el.innerText = value;
                break;
            case 'pos':
                el.innerText = `${value} - ${this.positions[value]}`;
                break;
        }
    }

    static deleteEmployee(cid) {
        document.getElementById(`${cid}-employee-elem`).remove();
        this.all_employees.splice(this.all_employees.indexOf(this.all_employees.filter(emp => emp[3] == cid)[0]), 1);
        this.updateOnline();
    }

    static updateOnline() {
        document.getElementById('menu-frac-online').innerText = this.all_employees.filter(el => el[0]).length;
    }

    static onfocus(block) {
        block.style.animation = '5s ease 0s infinite normal none running selected';
    }

    static onblur(block) {
        block.style.animation = '';
    }

    static onsearch(search_str) {
        var elems = document.getElementById('menu-frac-employee').children;
        for (var index = 0; index < this.all_employees.length; index++) {
            if (this.all_employees[index][2].toLowerCase().includes(search_str.toLowerCase().replace(/\s+/g, ' ').trim()))
                elems[index].style.display = 'flex';
            else if (this.all_employees[index][4].includes(search_str.trim()))
                elems[index].style.display = 'flex';
            else if (this.positions[this.all_employees[index][5]].toLowerCase().includes(search_str.toLowerCase().replace(/\s+/g, ' ').trim()))
                elems[index].style.display = 'flex';
            else
                elems[index].style.display = 'none';
        }
    }




    /*managment*/
    static fillManagment(positions, vehs) {
        document.getElementById('menufrac-2-container').innerHTML = /*html*/ `
            <div>
                <div id="menu-frac-position-wrapper">
                    <h2>Управление должностями</h2>
                    <div class="menu-frac-static-management menu-frac-section">
                        <div style="width:45px; margin-right: 50px;">Номер</div>
                        <div>Название</div>
                        <div></div>
                    </div>
                    <div class="menu-frac-scrollable" style="width:100%">
                        <div id="menu-frac-position" class="menu-frac-section"></div>
                    </div>
                </div>
                <div id="menu-frac-veh-wrapper">
                    <h2>Управление транспортом</h2>
                    <div class="menu-frac-static-management menu-frac-section">
                        <div style="width:90px; margin-right:15px;">Номер</div>
                        <div style="width:135px; margin-right:30px;">Доступ с должности</div>
                        <div>Опции</div>
                    </div>
                    <div class="menu-frac-scrollable" style="width:100%">
                        <div id="menu-frac-veh" class="menu-frac-section"></div>
                    </div>
                    <div class="menu-frac-dropdown-wrapper"></div>
                </div>
            </div>
            <div></div>`;
        this.fillPositions(positions);
        this.fillVehs(vehs);
    }

    static fillPositions(positions) {
        var parent = document.getElementById('menu-frac-position');
        parent.innerHTML = '';
        load(positions);

        async function load(data) {
            data.forEach(el => {
                MenuFrac.addPosition(...el);
            });
        }
    }

    static positions = {};
    static addPosition(id, text) {
        var parent = document.getElementById('menu-frac-position');
        var elem = document.createElement('div');
        elem.id = `${id}-position-elem`;
        elem.className = 'menu-frac-management-elem';
        elem.innerHTML += /*html*/ `
            <div style="width:45px; margin-right: 50px;">${id}</div>
            <div>${text}</div>
            <div class="menu-frac-img-anim" style="position: absolute; right:20px;" onclick="MenuFrac.editRequest(${id})"><img src="libs/svgs/menu-frac/edit.svg"></div>`;
        parent.append(elem);
        this.positions[id] = text;
    }

    static showEdit(status, data) {
        var children = [document.getElementById('menufrac-2-container'), document.getElementById('menufrac-3-container')];
        if (status) {
            children[1].style = 'display: flex';
            children[0].style = 'display: none';
            this.fillEdit(...data);
        } else {
            children[1].style = 'display: none';
            children[0].style = 'display: flex';
        }
    }

    static fillVehs(vehs) {
        var parent = document.getElementById('menu-frac-veh');
        parent.innerHTML = '';
        load(vehs);

        async function load(data) {
            data.forEach(el => {
                MenuFrac.addVeh(...el);
            });
        }
    }

    static addVeh(id, nums, access) {
        var parent = document.getElementById('menu-frac-veh');
        var elem = document.createElement('div');
        elem.className = 'menu-frac-management-elem';
        elem.innerHTML += /*html*/ `
            <div id="${id}-fracveh-nums" style="width:90px; margin-right: 15px;">${nums}</div>
            <div id="${id}-fracveh-access" style="width:135px; margin-right:30px;" class="menu-frac-dropdown-main" onclick="MenuFrac.showDropdown(this, ${id})">${access} - ${this.positions[access]}</div>
            <div style="display:flex; width:45px; justify-content:space-between;">
                <div class="menu-frac-img-anim" style="height:15px" onclick="MenuFrac.vehRequest(${id}, 0)"><img src="libs/svgs/menu-frac/marker.svg"></div>
                <div class="menu-frac-img-anim" style="height:15px" onclick="MenuFrac.vehRequest(${id}, 1)"><img src="libs/svgs/menu-frac/home.svg"></div>
            </div>`;
        parent.append(elem);
    }

    // which = 'nums', 'access'
    static updateVeh(cid, which, value) {
        var el = document.getElementById(`${cid}-fracveh-${which}`);
        switch (which) {
            case 'nums':
                el.innerText = value;
                break;
            case 'access':
                el.innerText = `${value} - ${this.positions[value]}`;
                break;
        }
    }

    static showDropdown(elem, veh_id) {
        var parent = document.querySelector('.menu-frac-dropdown-wrapper'),
            pos = Object.assign({}, this.positions);
        addChoice(parent, null, elem.innerText, veh_id);
        delete pos[parseInt(elem.innerText)];
        Object.keys(pos).forEach(key => {
            addChoice(parent, key, pos[key], veh_id);
        })
        parent.style.top = elem.getBoundingClientRect().top - parent.getBoundingClientRect().top + 'px';

        document.getElementById('menu-frac-veh-wrapper').querySelector('.menu-frac-scrollable').onscroll = () => {
            this.defaultDropdown();
        }
        document.documentElement.onmouseup = this.defaultDropdown;

        async function addChoice(parent, key, value, veh_id) {
            var choice = document.createElement('div');
            choice.innerText = key != null ? `${key} - ${value}` : value;
            key != null ? choice.setAttribute('onmousedown', `MenuFrac.accessRequest(${veh_id}, ${key})`) : choice.setAttribute('onmousedown', `MenuFrac.accessRequest(${veh_id}, ${parseInt(value)})`);
            parent.append(choice);
        }
    }

    static defaultDropdown() {
        document.documentElement.onmouseup = null;
        document.getElementById('menu-frac-veh-wrapper').querySelector('.menu-frac-scrollable').onscroll = null;
        var dropdown = document.querySelector('.menu-frac-dropdown-wrapper');
        if (!dropdown) return;
        dropdown.innerHTML = '';
        dropdown.style = '';
    }

    static fillEdit(pos_id, permits) {
        document.getElementById('menufrac-3-container').innerHTML = /*html*/ `
            <h2>Управление должностью №${pos_id}</h2>
            <div class="menu-frac-edit-wrapper">
                Название
                <input id="menu-frac-position-name" maxlength="12" value="${this.positions[pos_id]}" autocomplete="false" spellcheck="false"/>
                <button class="red-button" style="height:25px" onclick="MenuFrac.posRequest()">Применить</button>
            </div>
            <div id="menu-frac-permits-wrapper">
            <div class="menu-frac-static-management menu-frac-section" style="width:725px; justify-content:space-between;">
                    <div>Действие</div>
                    <div>Cтатус</div>
                </div>
                <div class="menu-frac-scrollable" style="width:100%">
                    <div id="menu-frac-permits" class="menu-frac-section"></div>
                </div>
            </div>
            <div onclick="MenuFrac.showEdit(false)" id="menu-frac-back">
                <img src="libs/svgs/menu-frac/back.svg">
            </div>`;
        this.fillPermits(permits);
    }

    static fillPermits(permits) {
        var parent = document.getElementById('menu-frac-permits');
        parent.innerHTML = '';
        load(permits);

        async function load(data) {
            data.forEach(el => {
                MenuFrac.addPermit(...el);
            });
        }
    }

    static addPermit(id, text, state) {
        var parent = document.getElementById('menu-frac-permits');
        var elem = document.createElement('div');
        elem.className = 'menu-frac-permit-elem';
        elem.innerText = `${text}`;
        elem.innerHTML += /*html*/
            `<label class="menu-frac-checkbox">
                <input id="${id}-permit-elem" onclick="MenuFrac.ontoggle(this)" type="checkbox">
                <span class="menu-frac-checkbox-switch"></span>
            </label>`;
        parent.append(elem);
        this.setPermit(id, state)
    }

    static setPermit(id, state) {
        var permit = document.getElementById(`${id}-permit-elem`);
        if (permit) permit.checked = state;
    }

    static updatePositionName(key, name) {
        this.positions[key] = name;
        if (this.local_pos == key) this.updateInfoLine(4, key);
        this.all_employees.filter(emp => emp.at(-1) == key).forEach(emp => {
            this.updateEmployee(emp[3], 'pos', key)
        })
        document.getElementById(`${key}-position-elem`).children[1].innerText = name;
        Array.from(document.querySelectorAll(`[id$='-fracveh-access']`)).forEach(elem => {
            if (parseInt(elem.innerText) == key) this.updateVeh(parseInt(elem.id), 'access', key);
        })
    }


    /*tooltip*/
    static tooltips = {
        news: [
            [0, 1, 2],
            ['Закрепить', 'Изменить', 'Удалить']
        ],
        pinned_news: [
            [0, 1, 2],
            ['Открепить', 'Изменить', 'Удалить']
        ],
    }
    static showTooltip(el, from, uid) {
        this.createTooltip(el, this.tooltips[from], from, uid);
    }

    static createTooltip(elem, data, from, uid) {
        var tooltip = document.querySelector('.menu-frac-ttp-wrapper');
        tooltip.innerHTML = /*html*/ `<span class="menu-frac-tooltip-arrow"></span><p class="menu-frac-tooltip"></p>`
        for (var index = 0; index < data[0].length; index++)
            tooltip.lastElementChild.innerHTML += /*html*/ ` 
                <span onmousedown="MenuFrac.tooltipRequest('${from}', ${data[0][index]}, ${parseInt(uid)})">${data[1][index]}</span>`;

        document.querySelector('.menu-frac-scrollable').onscroll = () => {
            this.defaultTTP();
        }
        document.documentElement.onmouseup = this.defaultTTP;

        var dims = elem.getBoundingClientRect();
        var p_dims = tooltip.getBoundingClientRect();
        tooltip.style.top = dims.top + dims.height / 2 - p_dims.top + 'px';
        tooltip.style.left = dims.width / 2 - p_dims.width / 2 + 'px';

    }

    static defaultTTP() {
        document.documentElement.onmouseup = null;
        document.querySelector('.menu-frac-scrollable').onscroll = null;
        var tooltip = document.querySelector('.menu-frac-ttp-wrapper');
        if (!tooltip) return;
        tooltip.innerHTML = '';
        tooltip.style = '';
    }


    /*requests*/
    static tooltipRequest(from, action, elem_id) {
        mp.trigger('MenuFrac::Tooltip', from, action, elem_id);
        /*server-response*/
        // 0 && news -> MenuFrac.pinNews(elem_id);
        // 0 && pinned_news -> MenuFrac.unpinNews();
        // 1 -> MenuFrac.deleteNews(elem_id); 
    }

    static newsRequest(action) {
        mp.trigger('MenuFrac::NewsAction', ...arguments);
        if (action == 2) this.editNews(false);
    }

    static buttonRequest(which, btn) {
        mp.trigger('MenuFrac::AccessButtons', which, btn.className.includes('red') ? true : false);
        /*server-response*/
        // -> MenuFrac.setButton(!state);
        // MenuFrac.setButton(which, !(btn.className.includes('red') ? true : false));
    }

    static employeeRequest(cid, action) {
        mp.trigger('MenuFrac::EmployeeAction', cid, action);
        // action == 2 -> deleteEmployee(cid);
    }

    static editRequest(id) {
        mp.trigger('MenuFrac::EditPosition', id);
        /*server-response*/
        // -> MenuFrac.showEdit(true, [id, edit_data])
        // MenuFrac.showEdit(true, [id, edit_data])
    }

    static vehRequest(id, action) {
        mp.trigger('MenuFrac::Veh', id, action);
    }

    static accessRequest(veh_id, new_access) {
        mp.trigger('MenuFrac::ChangeVehAccess', veh_id, new_access);
        // MenuFrac.updateVeh(veh_id, 'access', new_access)
    }

    static posRequest() {
        mp.trigger('MenuFrac::PositionName', document.getElementById('menu-frac-position-name').value);
        /*server-response*/
        // -> updatePositionName(id, value);
        // MenuFrac.updatePositionName(1, document.getElementById('menu-frac-position-name').value)
    }

    static ontoggle(permit) {
        mp.trigger('MenuFrac::SetPermit', parseInt(permit.id), permit.checked);
        permit.checked = !permit.checked;
        /*server-response*/
        // -> MenuFrac.setPermit(id, state);
        // MenuFrac.setPermit(parseInt(permit.id), !permit.checked);
    }
}

var frac_data = [
    [ //information
        [ //news
            null, null //int || null
        ],
        //info
        ['Больница округа Блэйн', 'Annlynn Recanter', 1000000, 1000, 1]
    ],
    [ //staff
        [true, 0, 'Annlynn Recanter', 3000, '11.11.2024 12:48', 1],
        [false, 1, 'Asdfghjklqwertyu Asdfghjklqwertyu', 3001, '25.02.2023 12:58', 2],
        [true, 2, 'Annlynn Recanter', 3002, '02.01.2023 11:38', 3],
        [false, 0, 'Jessica Recanter', 3003, '15.05.2023 10:38', 4],
        [true, 1, 'Carl Recanter', 3004, '25.03.2023 13:38', 5],
        [false, 2, 'Lynn Recanter', 3005, '23.02.2023 12:35', 1],
    ],
    [ //management
        [ //positions
            [1, 'Уборщик'],
            [2, 'Работник'],
            [3, 'Менеджер'],
            [4, 'Руководитель'],
            [5, 'Начальник'],
        ],
        [ //positions
            [1, '[BCP12ADC]', 1],
            [2, '[BCP12ADC]', 1],
            [3, '[BCP12ADC]', 1],
            [4, '[BCP12ADC]', 1],
            [5, '[BCP12ADC]', 2],
        ],
    ],
];

var edit_data = [
    [1, '1', false],
    [2, '2', true],
    [3, 'Доступ к складу (даже если закрыт)', false],
    [4, 'Доступ к складу (даже если закрыт)', true],
    [5, 'Доступ к складу (даже если закрыт)', false],
];

MenuFrac.draw(frac_data);