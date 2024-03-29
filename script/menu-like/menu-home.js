var MenuHome = class MenuHome {
    static draw(type, data) {
        this.drawNavigation(type);
        this.drawInfo(type, data[0]);
        this.fillLayout(data[1]);
        this.fillRoomies(data[2]);
        this.fillFurniture(data[3]);
        this.fillLights(data[4]);
        this.selectOption(0)
    }

    static selectOption(index) {
        document.getElementById(`menuhome-${index}`).click();
    }

    static drawNavigation(type) {
        document.querySelector('#menu-home-title').innerHTML = menuhome_nav[0][type][0] + menuhome_nav[0][type][1];
        for (var index = 1; index < menuhome_nav.length; index++) {
            var opt = document.createElement('div');
            opt.innerHTML = /*html*/ `
                <a id="menuhome-${index - 1}" onclick="MenuHome.navigate(this)" href="#">${menuhome_nav[index][0]} ${menuhome_nav[index][1]}</a>`
            document.querySelector('.menu-home-options').append(opt);
        }
    }

    static lastNav
    static navigate(opt) {
        if (this.lastNav == opt) return;
        document.getElementById('menuhome-0-extracontainer').style.display = 'none';
        if (this.lastNav != null) {
            this.lastNav.style = '';
            this.lastNav.parentElement.classList.remove('current');
            document.getElementById(`${this.lastNav.id}-container`).style.display = 'none';
        }
        opt.parentElement.classList.add('current');
        opt.style.color = 'white';
        document.getElementById(`${opt.id}-container`).style.display = 'flex';
        this.lastNav = opt;
    }



    //data = [id, 'owner', balance, tax, rooms, garage]
    static drawInfo(type, data) {
        document.getElementById('menuhome-0-container').innerHTML = /*html*/ `
        <div id="menuhome-0-content-0">
            <div style="font-weight: 700;">${type == 0 ? `Дом` : `Квартира`} #${data.shift()}</div>
            <div id="menu-home-info" class="menuhome-section"></div>
        </div>
        <div id="menuhome-0-content-1">
            <div style="height: 270px;">
                <div style="font-weight: 700;">Управление</div>
                <div id="menuhome-info-buttons" class="menuhome-section">
                    <div style="justify-content:space-between">
                        <button onclick="MenuHome.onbutton('entry', this.className == 'red-button')" id="menuhome-entry-btn" class="red-button">Закрыть\nвход</button>
                        <button onclick="MenuHome.onbutton('closet', this.className == 'red-button')" id="menuhome-closet-btn" class="red-button">Закрыть\nшкафы</button>
                    </div>
                    <div style="justify-content:center">
                        <button onclick="MenuHome.switchContainer('extra')" class="grey-button">Изменить<br>планировку</button>
                    </div>
                </div>
            </div>
            <div style="justify-content:center"><button onclick="MenuHome.onbutton('sell2gov')" class="red-button">Продать<br>государству</button></div>
        </div>`;
        this.fillInfo(type, data);
    }

    static fillInfo(type, data) {
        var parent = document.getElementById('menu-home-info');
        var static_data = menuhome_static.info;
        for (var index = 0; index < data.length - type - 1; index++) {
            parent.innerHTML += /*html*/ `
            <div>${static_data[index]}<span></span></div>`;
            this.setInfo(index, data[index]);
        }
        MenuHome.setButton('entry', data.at(-1)[0])
        MenuHome.setButton('closet', data.at(-1)[1])
    }

    static setInfo(index, value) {
        var span = document.getElementById('menu-home-info').children[index].querySelector('span');
        switch (index) {
            case 1:
            case 2:
                value = prettyUSD(value);
                break;
            case 3:
                value = prettyUSD(value, true);
                break;
        }
        span.innerText = value;
    }

    //which = 'entry, closet'
    static setButton(which, status) {
        var btn = menuhome_tmpl.querySelector(`#menuhome-${which}-btn`);
        var text = btn.innerText.split('\n');
        if (status) {
            btn.className = 'red-button';
            btn.innerText = `Открыть\n${text[1]}`;
        } else {
            btn.className = 'green-button';
            btn.innerText = `Закрыть\n${text[1]}`;
        }
    }



    //data = [layout_arr, 'cur_layout'], layout_arr[i] = ['id', 'name', cost] 
    static fillLayout(data) {
        document.getElementById('menuhome-0-extracontainer').innerHTML = /*html*/ `
        <div id="menuhome-0-extracontent-0">
            <div style="font-weight: 700;">Планировка</div>
            <div id="menuhome-layouts-scrollable">
                <div id="menu-home-layouts" class="menuhome-section"></div>
            </div>
            <div onclick="MenuHome.switchContainer('')">${menuhome_svgs.back}</div>
        </div>
        <div id="menuhome-0-extracontent-1">
            <div class="menuhome-section">
                
            </div>
        </div>`;
        this.fillLayoutElems(data[0], data[1]);
    }

    static checkForSale(state, cost) {
        var parent = document.getElementById('menuhome-0-extracontent-1').firstElementChild;
        if (state) {
            parent.innerHTML = /*html*/ `
                <button style="font-size: 12px;" class="red-button" onclick="MenuHome.onbutton('browse', MenuHome.lastLayout.id)">Посмотреть</button>
                <div style="width: 100%; height:135px;    align-items: center;">
                    <div style="font-weight: 500">Приобрести</div>
                    <div style="font-weight: 600" id="menuhome-layout-cost">${cost}</div>
                    <div style="display:flex; justify-content:space-between; width: 100%;">
                        <button style="width: 80px" class="red-button" onclick="MenuHome.onbutton('cash', MenuHome.lastLayout.id)">${hud_left_svgs.cash}</button>
                        <button style="width: 80px" class="grey-button" onclick="MenuHome.onbutton('bank', MenuHome.lastLayout.id)">${hud_left_svgs.bank}</button>
                    </div>
                </div>`
            parent.style = '';
        } else {
            parent.innerHTML = /*html*/ `<div style="font-weight: 500">Приобретено</div>`;
            parent.style = 'justify-content:center;';
        }

    }

    static currentLayout;
    static setCurLayout(layout) {
        this.currentLayout = layout;
        MenuHome.scrollLayout();
    }

    static fillLayoutElems(data, current) {
        var parent = document.getElementById('menu-home-layouts');
        for (var index = 0; index < data.length; index++)
            this.newLayoutElem(parent, data[index][0], data[index][1], data[index][2]);
        this.setCurLayout(current);
    }

    static newLayoutElem(parent, id, name, cost) {
        var layout = document.createElement('div');
        layout.id = id;
        layout.setAttribute('cost', prettyUSD(cost));
        layout.style.background = `url('libs/img/house_layouts/${id}.png')`;
        layout.innerHTML = /*html*/ `<div class="menuhome-layout-bg"><p>${name}</p></div>`;
        parent.append(layout);
        layout.setAttribute('onclick', `MenuHome.onlayout(this)`);
    }

    static lastLayout;
    static onlayout(elem) {
        if (this.lastLayout != null) {
            if (elem.id == this.lastLayout.id) return;
            this.lastLayout.querySelector('div').classList.remove('menuhome-selected-layout');
        }
        this.lastLayout = elem;
        elem.querySelector('div').classList.add('menuhome-selected-layout');
        this.checkForSale(elem.id != this.currentLayout, elem.getAttribute('cost'))
    }

    static switchContainer(which) {
        document.getElementById('menuhome-0-container').style.display = 'none';
        document.getElementById('menuhome-0-extracontainer').style.display = 'none';
        document.getElementById(`menuhome-0-${which}container`).style.display = 'flex';
        if (which == 'extra') MenuHome.scrollLayout();
    }

    static scrollLayout() {
        this.onlayout(this.lastLayout ?? document.getElementById(this.currentLayout));
        var parent = document.getElementById('menuhome-layouts-scrollable');
        parent.scrollTo({
            top: parent.querySelector('.menuhome-selected-layout').offsetTop - 115,
            behavior: 'smooth'
        })
    }


    /*roommates*/
    //data[i] = [id, 'name', [light(t|f), doors(t|f), closet(t|f), wardrobe(t|f), fridge(t|f)]]
    static fillRoomies(data) {
        document.getElementById('menuhome-1-container').innerHTML = /*html*/ `
        <div id="menuhome-1-content-0">
            <div style="font-weight: 700;" id="menuhome-rommies-title">Сожители</div>
            <div id="menuhome-rommies-scrollable">
                <div id="menuhome-rommies-info"  class="menuhome-section"></div>
            </div>
        </div>
        <div id="menuhome-1-content-1">
            <div style="height:300px">
                <div style="font-weight: 700;">Права доступа</div>
                <div id="menuhome-permits-container"  class="menuhome-section"></div>
            </div>
            <div style="align-items: center;">
                <button style="font-size: 12px" class="grey-button" onclick="MenuHome.onbutton('expel', parseInt(MenuHome.lastMate.id))">Выписать</button>
            </div>
        </div>`;
        this.fillAllPermits();
        this.fillAllRommates(data);
    }

    static fillAllPermits() {
        var parent = document.getElementById('menuhome-permits-container');
        parent.innerHTML = ``;
        var static_data = menuhome_static.permits;
        for (var index = 0; index < static_data.length; index++) {
            parent.innerHTML += /*html*/ `
            <div>
                ${static_data[index][0]}
                <div class="menuhome-checkbox" onclick="MenuHome.onCheckBox([this.firstElementChild.id.split('-')[1], !this.firstElementChild.checked, parseInt(MenuHome.lastMate.id)])">
                    <input type="checkbox" id="${static_data[index][1]}" onclick="return false"/>
                    <span class="menuhome-checkbox-switch"></span>
                </div>
            </div>`;
        }
    }

    static permits = ['light', 'doors', 'closet', 'wardrobe', 'fridge']
    static setAllPermits(data) {
        var static_data = menuhome_static.permits;
        for (var index = 0; index < data.length; index++)
            this.setCheckBox(static_data[index][1], data[index]);
    }

    static setPermit(id, state, index){
        this.permits_arr[index][id] = state;
        this.setCheckBox(`menuhome-${this.permits[id]}-permit`, state);
    }

    static setCheckBox(id, state) {
        document.getElementById(id).checked = state;
    }

    static fillAllRommates(data) {
        this.resetRoommate();
        var parent = document.getElementById('menuhome-rommies-info');
        parent.innerHTML = ``;
        for (var index = 0; index < data.length; index++)
            this.newRoommate(...data[index]);
        try {
            parent.firstElementChild.click();
        } catch (error) {}
    }

    static permits_arr = {};
    static newRoommate(id, name, permits) {
        var mate = document.createElement('div');
        mate.id = `${id}-menuhome-roommate`;
        mate.innerText = `${name}`;
        mate.classList.add('menuhome-rommies-elem');
        mate.setAttribute('onclick', `MenuHome.onRoommate(this)`);
        document.getElementById('menuhome-rommies-info').append(mate);
        this.permits_arr[id] = permits;
        mate.click();
    }

    static lastMate;
    static onRoommate(mate) {
        this.resetRoommate();
        document.getElementById('menuhome-1-content-1').style.display = 'flex';
        this.lastMate = mate;
        mate.classList.add('menuhome-selected-roommate')
        this.setAllPermits(this.permits_arr[parseInt(mate.id)]);
        var temparr = Array.from(mate.parentElement.children);
        document.getElementById('menuhome-rommies-title').innerText = `Сожители [${temparr.indexOf(mate) + 1}/${temparr.length}]`
    }

    static removeRoommate(id) {
        document.getElementById(`${id}-menuhome-roommate`).remove();
        this.resetRoommate();
        try {
            document.getElementById('menuhome-rommies-info').firstElementChild.click();
        } catch (error) {}
    }

    static resetRoommate() {
        document.getElementById('menuhome-1-content-1').style.display = 'none';
        if (this.lastMate != null) this.lastMate.classList.remove('menuhome-selected-roommate');
        this.lastMate = null;
        document.getElementById('menuhome-rommies-title').innerText = `Сожители`;
        this.setAllPermits(Array(5).fill(false));
    }


    /*furniture*/
    static max_furn;
    static fillFurniture(data) {
        this.max_furn = data[2];
        document.getElementById('menuhome-2-container').innerHTML = /*html*/ `
        <div>
            <div style="font-weight: 700;" id="menuhome-furniture-title-1">Установленная мебель [${data[0].length} / ${this.max_furn}]</div>
            <div class="menuhome-furniture-scrollable">
                <div id="menuhome-furniture-installed"  class="menuhome-section"></div>
            </div>
            <div style="justify-content:space-between;" id="menuhome-furniture-installed-btns">
                <button class="red-button" onclick="MenuHome.onbutton('locate', MenuHome.lastFurniture['installed'].id.replace('-menuhome-furniture', ''))">Найти</button>
                <button class="red-button" onclick="MenuHome.onbutton('rearrange', MenuHome.lastFurniture['installed'].id.replace('-menuhome-furniture', ''))">Переставить</button>
                <button class="grey-button" onclick="MenuHome.onbutton('remove', MenuHome.lastFurniture['installed'].id.replace('-menuhome-furniture', ''))">Убрать</button>
            </div>
        </div>
        <div>
            <div style="font-weight: 700;" id="menuhome-furniture-title-2">Можно установить [${data[1].length}]</div>
            <div class="menuhome-furniture-scrollable">
                <div id="menuhome-furniture-possible"  class="menuhome-section"></div>
            </div>
            <div style="justify-content:space-evenly;" id="menuhome-furniture-possible-btns">
                <button class="red-button" onclick="MenuHome.onbutton('rearrange', MenuHome.lastFurniture['possible'].id.replace('-menuhome-furniture', ''))">Поставить</button>
                <button class="grey-button" onclick="MenuHome.onbutton('sellfurn', MenuHome.lastFurniture['possible'].id.replace('-menuhome-furniture', ''))">Продать</button>
            </div>
        </div>`;
        this.fillFurnitureContainer('installed', data[0]);
        this.fillFurnitureContainer('possible', data[1]);
    }

    //which = 'possible' || 'installed'
    static fillFurnitureContainer(which, data) {
        var parent = document.getElementById(`menuhome-furniture-${which}`);
        parent.innerHTML = ``;
        for (var index = 0; index < data.length; index++)
            this.newFurnitureElem(which, ...data[index]);
        try {
            parent.firstElementChild.click();
        } catch (error) {}
    }

    static newFurnitureElem(which, uid, id, name) {
        var parent = document.getElementById(`menuhome-furniture-${which}`);
        var elem = document.createElement('div');
        parent.append(elem);
        elem.id = `${uid}-menuhome-furniture`;
        elem.innerHTML = /*html*/ `
            <div>${name}</div>
            <div>${inventoryItems[id]}</div>`
        elem.classList.add('menuhome-furniture-elem');
        elem.setAttribute('onclick', `MenuHome.onFurniture(this, '${parent.id.split('-').at(-1)}')`);
        elem.click();
        parent.parentElement.scrollTo({
            top: parent.parentElement.scrollHeight,
            behavior: 'smooth'
        })
    }

    static lastFurniture = [];
    static onFurniture(elem, from) {
        if (this.lastFurniture[from] != null) this.lastFurniture[from].classList.remove('menuhome-selected-furniture');
        this.lastFurniture[from] = elem;
        elem.classList.add('menuhome-selected-furniture');

        document.getElementById(`menuhome-furniture-${from}-btns`).style.visibility = 'visible';
        var temparr = Array.from(elem.parentElement.children);
        if (from == 'installed') {
            document.getElementById('menuhome-furniture-title-1').innerText = `Установленная мебель [${temparr.length} / ${this.max_furn}]`
        } else {
            document.getElementById('menuhome-furniture-title-2').innerText = `Можно установить [${temparr.length}]`
        }
    }

    static removeFurniture(which, id) {
        document.getElementById(`${id}-menuhome-furniture`).remove();
        this.resetFurniture(which == 'installed' ? 0 : 1, which)
        try {
            document.getElementById(`menuhome-furniture-${which}`).firstElementChild.click();
        } catch (error) {}
    }

    static resetFurniture(index, which) {
        if (which) reset(index, which);
        else {
            reset(0, 'installed');
            reset(1, 'possible');
        }

        function reset(index, which) {
            document.getElementById(`menuhome-furniture-${which}-btns`).style.visibility = 'hidden';
            if (MenuHome.lastFurniture[`${which}`] != null)
                MenuHome.lastFurniture[`${which}`].classList.remove('menuhome-selected-furniture');
            MenuHome.lastFurniture[`${which}`] = null;
            document.getElementById(`menuhome-furniture-title-${index + 1}`).innerText = index == 0 ? `Установленная мебель` : `Можно установить`;
            var elem = document.getElementsByClassName('menuhome-furniture-scrollable')[index]
            elem.parentElement.replaceChild(elem, elem);
        }
    }


    //data[i] = ['id', 'name', isOn(t|f), 'hex']
    static fillLights(data) {
        document.getElementById('menuhome-3-container').innerHTML = /*html*/ `
        <div>
            <div style="font-weight: 700;" id="menuhome-lights-title-1">Свет [${data.length}]</div>
            <div id="menuhome-lights-scrollable">
                <div id="menuhome-lights-container"  class="menuhome-section"></div>
            </div>
        </div>
        <div id="menuhome-lights-color-wrapper">
            <div style="font-weight: 700;" id="menuhome-lights-title-2"></div>
            <div class="menuhome-section" style="align-items: center">
                <div class="colorpicker" parent="menu_home" id="menuhome-lights-colorpicker" onclick="MenuHome.oncolorcircle(this)"></div>
                <div style="width: 100%;display: flex;justify-content: space-between;">
                    <button class="red-button" onclick="MenuHome.onbutton('apply-color', [MenuHome.nowSource, MenuHome.colorpicker.getAttribute('cur-hex')])">Применить</button>
                    <button class="grey-button" onclick="MenuHome.onbutton('reset-color', MenuHome.nowSource)">Сбросить</button>
                </div>
            </div>
        </div>`;
        this.fillLightsContainer(data)
        this.colorpicker = document.getElementById('menuhome-lights-colorpicker');
    }

    static fillLightsContainer(data) {
        var parent = document.getElementById(`menuhome-lights-container`);
        for (var index = 0; index < data.length; index++)
            this.newLightsElem(parent, ...data[index]);
        setTimeout(() => {
            try {
                parent.querySelector('svg').onclick()
            } catch (error) {
                document.getElementById('menuhome-3').style.display = 'none';
            }
        }, 0);
    }

    static newLightsElem(parent, id, name, isOn, hex) {
        var light = document.createElement('div');
        light.classList.add('menuhome-lights-elem');
        light.innerHTML = /*html*/ `
        <div>${name}</div>
        <div style="width: 100px;">
            <div class="menuhome-checkbox" onclick="MenuHome.onCheckBox([this.firstElementChild.id, !this.firstElementChild.checked])">
                <input type="checkbox" id="${id}" onclick="return false"/>
                <span class="menuhome-checkbox-switch"></span>
            </div>
            ${menuhome_svgs.palette}
        </div>`;
        parent.append(light);
        this.setCheckBox(id, isOn);
        var palette = light.querySelector('svg');
        palette.setAttribute('light-id', id);
        palette.setAttribute('name', name);
        palette.setAttribute('hex', hex);
        palette.setAttribute('onclick', `MenuHome.onLight(this)`)
    }

    static nowSource;
    static colorpicker;
    static lastLight
    static onLight(light) {
        this.resetLight();
        this.lastLight = light;
        light.style.opacity = 1;

        document.getElementById('menuhome-lights-title-2').innerText = `${light.getAttribute('name')} - Цвет`;
        document.getElementById('menuhome-lights-color-wrapper').style.visibility = 'visible';
        var hex = light.getAttribute('hex');
        this.nowSource = light.getAttribute('light-id');
        this.colorpicker.style.background = hex;
        this.colorpicker.setAttribute('source-id', this.nowSource);
        this.colorpicker.setAttribute('hex', hex);
        this.colorpicker.setAttribute('cur-hex', hex);
    }

    static applyColor(id, hex) {
        document.querySelector(`[light-id="${id}"]`).setAttribute('hex', hex);
        if (id == this.nowSource) {
            this.colorpicker.style.background = hex;
            this.colorpicker.setAttribute('hex', hex);
        }
    }

    static resetLight() {
        document.getElementById('menuhome-lights-scrollable').scrollTo(0, 0);
        document.getElementById('menuhome-lights-color-wrapper').style.visibility = 'hidden';
        if (this.lastLight != null) this.lastLight.style.opacity = '0.7';
        this.lastLight = null
    }

    static oncolorcircle(circle) {
        whoInvoked = circle;
        whoInvoked.scale = menuhome_tmpl.style.zoom || 1;
        renderTemplate(true, 'colorpicker');
        document.addEventListener('click', this.documentClick);
    }


    static onCheckBox(params) {
        mp.trigger("MenuHome::CheckBox", ...params);
        /*server-responce*/
        //MenuHome.setCheckBox(setting.id, !setting.checked);
    }

    static onbutton(action, param) {
        mp.trigger('MenuHome::Action', action, ...(Array.isArray(param) ? param : [param]));
        // MenuHome.setButton(action, state) //if action == 'entry' || 'closet'
        // MenuHome.applyColor(id, hex) //if action == 'apply-color' || 'reset-color'
        // if (action == 'expel') this.removeRoommate(param);
    }
}