var Blips = class Blips {
    static blipIndex = 0;
    static container = document.getElementById('blips-container');
    static loading = false;
    static creating_blip = {
        'color': null,
        'icon': null,
        'size': 1,
        'opacity': 1,
        'name': null,
        'onradar': true,
    };

    static draw() {
        blips_tmpl.firstElementChild.innerHTML = `${blips_svgs.main} метки`;
        this.fillPics(document.getElementById('blips-color-wrapper').lastElementChild, this.colorsInRow, this.colorsAmount, 'color');
        this.fillPics(document.getElementById('blips-icon-container'), this.iconsInRow, this.iconsAmount, 'icon');
        this.show(false);
    }

    static show(isEdit, color, icon, size, opacity, name, onradar) {
        // this.lastEdit = null;
        this.setColor(color);
        this.setIcon(icon);
        this.fillSettings(isEdit, size, opacity, name, onradar);
        this.fillButtons(isEdit);
    }

    static fillBlips(data) {
        this.container.innerHTML = '';
        this.blipIndex = 0;
        this.loading = true;
        for (var index = 0; index < data.length; index++)
            this.newBlip(data[index][0], data[index][1], data[index][2], data[index][3], data[index][4], data[index][5], data[index][6]);
        if (data.length > 9)
            this.container.style.height = `${this.container.parentElement.scrollHeight - 30}px`;
        this.loading = false;
    }


    static newBlip(name, shown, color, icon, size, opacity, onradar) {
        var blip = document.createElement('div');
        blip.classList.add('blip-elem');
        this.container.append(blip);
        blip.innerHTML = /*html*/ `
        <div class="blip-name"></div>
        <div>
            <div class="blip-checkbox" onclick="Blips.onCheckBox(this.firstElementChild)">
                <input type="checkbox" checked="${shown}" id="${this.blipIndex}-blip-checkbox" onclick="return false"/>
                <span class="blip-checkbox-switch"></span>
            </div>
            <div style="height: 20px;" onmouseenter="Blips.brighter(this)" onmouseleave="Blips.darker(this)" onclick="Blips.onedit(this)">${blips_svgs.edit}</div>
        </div>`;
        blip.querySelector('input').checked = shown;
        this.blipIndex++;
        this.editBlip(this.blipIndex - 1, name, color, icon, size, opacity, onradar);
        document.getElementById('blips-amount').innerText = `Все метки [${this.blipIndex}/50]`;
        if (this.container.children.length > 9)
            this.container.style.height = `${this.container.parentElement.scrollHeight - 30}px`;
    }

    static editBlip(index, name, color, icon, size, opacity, onradar) {
        var elem = this.container.children[index].querySelector('svg').parentElement;
        elem.setAttribute('blip_name', name);
        elem.setAttribute('blip_color', color);
        elem.setAttribute('blip_icon', icon);
        elem.setAttribute('blip_size', size);
        elem.setAttribute('blip_opacity', opacity);
        elem.setAttribute('blip_onradar', onradar)
        this.onedit(this.lastEdit);
        this.container.children[index].querySelector('.blip-name').innerHTML = `<img src="libs/img/blips/Blip_${icon}.png">` + name;
    }

    static removeBlip(index) {
        this.container.children[index].remove();
        this.blipIndex--;
        document.getElementById('blips-amount').innerText = `Все метки [${this.blipIndex}/50]`;
        this.container.style.height = '';
        this.container.parentElement.scrollTop = 0;
        if (this.container.children.length > 9)
            this.container.style.height = `${this.container.parentElement.scrollHeight - 30}px`;
        this.onedit(this.lastEdit)
    }

    static colorsInRow = 8;
    static colorsAmount = 16;
    static iconsInRow = 7;
    static iconsAmount = 308;
    static fillPics(parent, row_len, amount, where) {
        var count = -1;
        for (var index = 0; index < Math.ceil(amount / row_len); index++) {
            parent.innerHTML += /*html*/ `<div class="blips-${where}-row"></div>`;
            for (var j = 0; j < row_len; j++) {
                count++;
                if (count > amount - 1) return;
                parent.lastElementChild.innerHTML += where == 'color' ? /*html*/ `
                    <div class="blips-${where}-elem" onclick="Blips.onpic(this, '${where}')" style="background: url(${blips_colors[count]})"></div>` : /*html*/
                    `<div class="blips-${where}-elem"><img onclick="Blips.onpic(this, '${where}')" src="${blips_icons[count]}"></div>`;
            }
        }
    }

    static fillSettings(isEdit, size, opacity, name, onradar) {
        var parent = document.getElementById('blips-settings-wrapper');
        parent.innerHTML = /*html*/ `
        <div>
            <div>
                <div class="blips-sett-title">Размер</div>
                <input type="range" min="0" max="1" step="0.01" oninput="Blips.onrange(this, 'size')">
                <div class="blips-span-wrapper">
                    <span>0</span>
                    <span id="blip-size"></span>
                    <span>1</span>
                </div>
            </div>
            <div>
                <div class="blips-sett-title">Непрозрачность</div>
                <input type="range" min="0" max="1" step="0.01" oninput="Blips.onrange(this, 'opacity')">
                <div class="blips-span-wrapper">
                    <span>0</span>
                    <span id="blip-opacity"></span>
                    <span>1</span>
                </div>
            </div>
        </div>
        <div>
            <div>
                <div class="blips-sett-title">Название</div>
                <input class="grey-button" autocomplete="false" spellcheck="false" type="text" oninput="Blips.onname(this.value)" onblur="Blips.onblur(this.value)" maxlength="24" onfocus="this.select()">
            </div>
            <div>
                <div class="blips-sett-title">${isEdit ? onradar == 'true' ? 'Показывать всегда' : 'Показывать вблизи' : 'Текущая позиция'}</div>
                <div class="blip-checkbox" onclick="Blips.onCheckBox(this.firstElementChild)">
                    <input type="checkbox" checked="" id="-1-blip-checkbox" onclick="return false"/>
                    <span class="blip-checkbox-switch"></span>
                </div>
            </div>
        </div>`;
        if (isEdit) this.setCheckBoxState(-1, onradar == 'true');
        this.setSlider('size', size);
        this.setSlider('opacity', opacity);
        this.setBlipName(name);
        
    }

    static fillButtons(isEdit) {
        var parent = document.getElementById('blips-button-wrapper');
        parent.innerHTML = /*html*/ `
        <div></div>
        <div style="justify-content:${isEdit ? 'space-between' : 'center'}">
            ${isEdit ? /*html*/ `
            <button class="red-button" onclick="Blips.editedRequest()">Применить</button>
            <button class="grey-button" onclick="Blips.deleteRequest()">Удалить</button>` 
            : this.blipIndex == 50 ? `` : /*html*/ `<button class="red-button" onclick="Blips.createRequest()">Создать</button>`}
        </div>`;
    }

    static setColor(which) {
        var pic = which == null ? 'Blip_colour_0' : `Blip_colour_${which}`;
        document.querySelector(`[style="background: url(libs/img/blips-colour/${pic}.png)"]`).click();
        this.creating_blip['color'] = which == null ? 0 : which;
    }

    static setIcon(which) {
        var pic = which == null ? 'Blip_1' : `Blip_${which}`;
        Array.from(document.querySelectorAll(`[src="libs/img/blips/${pic}.png"]`)).at(-1).click();
        this.creating_blip['icon'] = which == null ? 1 : which;
    }

    static setSlider(which, value) {
        value = value == null ? value = 1 : value;
        var slider = which == 'size' ? blips_tmpl.querySelectorAll('input[type="range"]')[0] : blips_tmpl.querySelectorAll('input[type="range"]')[1];
        slider.value = value;
        this.onrange(slider, which);
    }

    static setBlipName(value) {
        value = value == null ? `Метка #${this.blipIndex + 1}` : value;
        blips_tmpl.querySelector('input[type="text"]').value = value
        this.onname(value);
    }

    static lastEdit = null;
    static onedit(elem) {
        if (!!this.lastEdit) this.darker(this.lastEdit, true);
        if (elem == this.lastEdit) {
            this.lastEdit = null;
            this.show(false);
            return;
        }
        var paths = elem.getElementsByTagName('path');
        for (var i = 0; i < paths.length; i++)
            if (paths[i].hasAttribute('fill')) paths[i].setAttribute("fill", "#fff");


        this.lastEdit = elem;

        this.show(true, elem.getAttribute('blip_color'), elem.getAttribute('blip_icon'), elem.getAttribute('blip_size'), elem.getAttribute('blip_opacity'), elem.getAttribute('blip_name'), elem.getAttribute('blip_onradar'))
    }

    static lastPics = {
        'color': null,
        'icon': null
    }
    static onpic(pic, where) {
        if (this.lastPics[where] != null)
            this.lastPics[where].classList.remove(`blips-${where}-selected`)
        pic.classList.add(`blips-${where}-selected`);

        var id = where == 'color' ? pic.style.background.split('/').at(-1).split('.')[0] :
            pic.src.split('/').at(-1).split('.')[0];
        this.lastPics[where] = pic;
        this.creating_blip[where] = parseInt(id.replace(/[^0-9\.]/g, ''));;

        if (!this.loading) mp.trigger('BlipMenu::Local::SetProperty', where, this.getBlipIndex() ?? -1, this.creating_blip[where]);
    }

    static onrange(slider, where) {
        var percent = (slider.value - slider.min) * 100 / (slider.max - slider.min);
        slider.style.backgroundSize = percent + '% 100%';
        document.getElementById(`blip-${where}`).innerText = slider.value;
        this.creating_blip[where] = parseFloat(slider.value);

        if (!this.loading) mp.trigger('BlipMenu::Local::SetProperty', where, this.getBlipIndex() ?? -1, this.creating_blip[where]);
    }

    static onname(value) {
        this.creating_blip['name'] = value;
    }

    static onblur(value) {
        if (value == "") this.setBlipName();
    }

    static createRequest() {
        mp.trigger('BlipMenu::Local::Create', this.creating_blip.name);
        /*server-response imitation*/
        // Blips.newBlip(this.creating_blip.name, true, this.creating_blip.color, this.creating_blip.icon, this.creating_blip.size, this.creating_blip.opacity, true);
    }

    static editedRequest() {
        mp.trigger('BlipMenu::Local::Edit', this.getBlipIndex(), this.creating_blip.name);
        /*server-response imitation*/
        // Blips.editBlip(this.getBlipIndex(), this.creating_blip.name, this.creating_blip.color, this.creating_blip.icon, this.creating_blip.size, this.creating_blip.opacity, this.creating_blip.onradar);
    }

    static deleteRequest() {
        mp.trigger('BlipMenu::Local::Delete', this.getBlipIndex());
        /*server-response imitation*/
        // Blips.removeBlip(this.getBlipIndex());
    }

    static getBlipIndex() {
        if (this.lastEdit == null) return null;
        var child = this.lastEdit.parentElement.parentElement;
        return Array.from(this.container.children).indexOf(child);
    }

    static setCheckBoxState(id, state) {
        document.getElementById(`${id}-blip-checkbox`).checked = state;
        if (id == -1) {
            var title = document.querySelectorAll('.blips-sett-title')[3];
            title.innerText = this.lastEdit == null ? state ? 'Текущая позиция' : 'Метка на карте' : state ? 'Показывать всегда' : 'Показывать вблизи';
            if (this.lastEdit) this.creating_blip['onradar'] = state;
        }
    }

    static onCheckBox(blip) {
        mp.trigger("BlipMenu::Local::Toggle", this.getBlipIndex() ?? -1, !blip.checked, parseInt(blip.id));
        /*server-response imitation*/
        // Blips.setCheckBoxState(parseInt(blip.id), !blip.checked);
    }

    static brighter(elem) {
        if (this.lastEdit == elem) return;
        var paths = elem.getElementsByTagName('path');
        for (var i = 0; i < paths.length; i++)
            if (paths[i].hasAttribute('fill')) paths[i].setAttribute("fill", "#ddd");
    }

    static darker(elem, forced) {
        if (this.lastEdit == elem && !forced) return;
        var paths = elem.getElementsByTagName('path');
        for (var i = 0; i < paths.length; i++)
            if (paths[i].hasAttribute('fill')) paths[i].setAttribute("fill", "#bbb");
    }
}

blips_data = [
    ['Ферма', true, 0, 1, 0.11, 0.91, true],
    ['Ферма', false, 1, 40, 0.21, 0.81, false],
    ['Ферма', true, 2, 43, 0.31, 0.71, false],
    ['Ферма', true, 3, 50, 0.41, 0.61, false],
    ['Ферма', false, 26, 51, 0, 1, true],
    ['Ферма', true, 27, 60, 0.61, 0.41, false],
    ['Ферма', false, 28, 8, 0.71, 0.31, true],
    ['Ферма', true, 29, 36, 0.81, 0.21, true],
    ['Ферма', true, 85, 16, 0.91, 0.11, false],
]
// Blips.fillBlips(blips_data);