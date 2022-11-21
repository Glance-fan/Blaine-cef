var ChCreate = class CharCreation {
    static creation_loading = true;
    /*main*/
    static load_creation() {
        this.clothesStartIndex = ChCreate.firstClothesIndex();
        this.renderFrames();
        this.doClicks();
        setTimeout(document.getElementById('char-creation').style.opacity = 1, 0);
        this.setFrameOnClick();
        this.showAllFrames();
        this.creation_loading = false;
        document.getElementById('boy').click();

    }

    static doClicks() {
        document.getElementById('lips').click();
        document.getElementById('chin').click();
        document.getElementById('eyebrows').click();
        document.getElementById('nose').click();
        document.getElementById('eyes').click();
        document.getElementById('clothes').click();
        document.getElementById('colors').click();
        document.getElementById('appearance').click();
        document.getElementById('hair').click();
        document.getElementById('parents').click();
        document.getElementById('data').click();
        document.getElementById('boy').click();
        document.getElementById('chest-elem').click();
        document.getElementById('eyebrows_hair-elem').click();
        document.getElementById('beard-elem').click();
        document.getElementById('hair-elem').click();
        document.getElementById('appearance').click();
        document.getElementById('makeup').click();
        document.getElementById('features').click();
        this.makeupOrder();
        document.getElementById('data').click();
        document.getElementById('name').focus();

    }

    static makeupOrder() {
        this.colorBoxes();
        var makeup_children = document.getElementById('makeup-container').children;
        var order = makeup_children[0].outerHTML + makeup_children[6].outerHTML + makeup_children[3].outerHTML + makeup_children[1].outerHTML + makeup_children[7].outerHTML + makeup_children[4].outerHTML + makeup_children[2].outerHTML + makeup_children[5].outerHTML;
        document.getElementById('makeup-container').innerHTML = order;
    }


    /*navigation*/
    static indexNav;
    static lastNavs = Array(4).fill(0);;

    static navigate(elem) {
        this.colorNav(elem);
        var id = elem.id + '-container';
        document.getElementById(id).style.display = 'block';
        if (elem.id == 'hair' && this.sex_changed) {
            document.getElementById('hair-elem').click();
            this.sex_change = false;
        }
        scrollableContainers.forEach((container) => {
            if (container[0] == id && container[1] == true) {
                document.getElementById(id).scrollTop = 0;
                container[1] = false;
            }
        });

        if (this.needToDraw(elem)) this.draw(elem, id);
    }

    static colorNav(elem) {
        this.indexNav = elem.parentElement.getAttribute('name').split('-')[0];
        var paths = elem.getElementsByTagName('path');
        var lastNav = this.lastNavs[this.indexNav];
        elem.style = cr_navBG;

        for (var i = 0; i < paths.length; i++) {
            if (paths[i].hasAttribute('fill')) paths[i].setAttribute("fill", "#fff");
            if (paths[i].hasAttribute('stroke')) paths[i].setAttribute("stroke", "#fff");
        }
        if (elem.id == 'chin') elem.getElementsByTagName('rect')[1].setAttribute("fill", "white"); //надо найти новую SVG: CHIN
        if (!!lastNav && lastNav != elem) {
            paths = lastNav.getElementsByTagName('path');
            lastNav.style = lastNav.getAttribute('style').replace(cr_navBG, '');
            for (var i = 0; i < paths.length; i++) {
                if (paths[i].hasAttribute('fill')) paths[i].setAttribute("fill", "#bbb");
                if (paths[i].hasAttribute('stroke')) paths[i].setAttribute("stroke", "#bbb");
            }
            if (lastNav.id == 'chin') lastNav.getElementsByTagName('rect')[1].setAttribute("fill", "#BBB"); //надо найти новую SVG: CHIN
            document.getElementById(`${lastNav.id}-container`).style.display = 'none';
        }
        this.lastNavs[this.indexNav] = elem;
    }


    static drawIndex = 0;
    static drawArr = Array(4).fill(true);

    static needToDraw(elem) {
        var temp = elem.parentElement.getAttribute('name').split('-')[0];
        if (this.drawIndex > this.drawArr.length - 1) return false;
        if (parseInt(temp) == this.drawIndex) {
            return this.drawArr[this.drawIndex];
        } else {
            this.drawArr[this.drawIndex] = false;
            this.drawIndex++;
            return this.drawArr[this.drawIndex];
        }
    }

    static draw(elem, container) {
        this.createSliders(getDB(elem.id, 'sliders'));
        var temp = elem.parentElement.getAttribute('name').split('-')[0];
        if (temp == 2) this.drawTable(container);
    }



    /*selecting hair/eyebrows/beard/chest inside Hair block*/
    static lastHairs = Array(Object.keys(left_data.hair).length);
    static indexHairs = 0;

    static selectHairElem(elem) {
        this.indexHairs = parseInt(elem.parentElement.parentElement.getAttribute('name').split('-')[0]);
        var lastHair = this.lastHairs[this.indexHairs];

        if (!!lastHair) {
            lastHair.firstChild.removeAttribute("style");
            lastHair.style.removeProperty('opacity');
        }
        this.lastHairs[this.indexHairs] = elem;

        elem.style.opacity = 1;
        elem.firstChild.style = hairSelected;
        this.sendSquareElemInfo(elem.id);
    }




    /*left-creation*/
    /*clothes*/
    static clothesStartIndex;

    static showClothes(sex) {
        clothes.forEach((elem) => {
            document.getElementById(elem).innerHTML = '';
        });
        for (var i = this.clothesStartIndex; i < clothes.length + this.clothesStartIndex; i++)
            frame_index[i] = 0;

        for (var i = 0; i < clothes.length; i++)
            getDB(clothes[i]).forEach(() => {
                document.getElementById(clothes[i]).innerHTML += `<img class="frame-item ${clothes[i]}-item" src="libs/img/char-creation/clothes/${sex}/${clothes[i]}/${frame_index[i+this.clothesStartIndex]++}.png"/>`;
            });

        for (var i = this.clothesStartIndex; i < frame_items.length; i++)
            this.showSelection(i, frame_index[i], frame_items[i]);
    }

    static firstClothesIndex() {
        var i = 0;
        while (clothes[0] + '-item' != frame_items[i]) {
            i++;
        }
        return i;
    }


    /*colors*/
    static color_id;
    static lastColors;
    static indexColor = 0;

    static colorBoxes() {
        colorsBoxes.forEach((elem) => {
            this.drawColorBox(getColorDB(elem));
        })
        this.lastColors = Array(this.indexColor);
    }

    static drawColorBox(data) {
        if (data == undefined) return;
        data.forEach((elem) => {
            this.newColorBox(elem);
            this.color_id = 0;
            data_color.forEach((color) => {
                this.newColorElem(color, elem[0]);
            });
            this.indexColor++;
        });
    }

    static newColorBox(elem) {
        var colorsBox = document.createElement('div');
        colorsBox.classList.add('background', 'colors-box', elem[3]);
        colorsBox.setAttribute('name', this.indexColor + '-color');
        colorsBox.id = elem[0];
        colorsBox.innerHTML = `<p class="description" style="margin:10px";>${elem[1]}</p>`;
        document.getElementById(elem[2]).append(colorsBox);
    }

    static newColorElem(color, colorBoxId) {
        var color_row = document.getElementById(colorBoxId).getElementsByClassName('colors-row');
        if (color_row.length == 0) {
            var row = document.createElement('div');
            row.classList.add('colors-row');
            document.getElementById(colorBoxId).append(row);
        }

        var lastRow = color_row[color_row.length - 1];
        lastRow.style.marginBottom = 0;
        if (lastRow.getElementsByClassName('colors-elem').length == 16) {
            lastRow.style.marginBottom = '10px';
            var row = document.createElement('div');
            row.classList.add('colors-row');
            document.getElementById(colorBoxId).append(row);
            lastRow = color_row[color_row.length - 1];
            lastRow.style.marginBottom = 0;
        }

        var elem = document.createElement('div');
        elem.classList.add('colors-elem');
        elem.id = colorBoxId.split('B')[0] + '-' + this.color_id++;
        lastRow.append(elem);
        elem.setAttribute('onclick', 'ChCreate.colorClick(this)')
        elem.style.setProperty('background', color);
    }

    static colorClick(elem) {
        this.indexColor = parseInt(elem.parentElement.parentElement.getAttribute('name').split('-')[0]);
        var lastColor = this.lastColors[this.indexColor];

        if (!!lastColor)
            lastColor.style = 'background:' + lastColor.style.background;
        this.lastColors[this.indexColor] = elem;

        elem.style.height = '21px';
        elem.style.width = '21px';
        elem.style.border = '2px solid 	#f11';
        this.sendColorsInfo(elem.id);

        if (elem.parentElement.parentElement.id == 'hair-colorBox') this.colorClick(document.getElementById('hair1-color-' + elem.id.split('-')[2]));
    }

    static setColor(id) {
        document.getElementById(id).click();
    }


    /*hair*/
    static allHairsId = Array(Object.keys(left_data.hair).length).fill(0);
    static indexAllHairs = 0;

    static drawTable(id) {
        var data = this.getHairContent(id);
        for (var i = 0; i < data.length; i++)
            this.drawHairElem(id, data[i]);
    }

    static drawHairElem(id, content) {
        var hairElem_row = document.getElementById(id).getElementsByClassName('hair-row');
        if (hairElem_row.length == 0) {
            var row = document.createElement('div');
            row.classList.add('hair-row');
            document.getElementById(id).append(row);
        }

        var lastRow = hairElem_row[hairElem_row.length - 1];
        lastRow.style.marginBottom = 0;
        if (lastRow.getElementsByClassName('hair-elem').length == 5) {
            lastRow.style.marginBottom = '5px';
            var row = document.createElement('div');
            row.classList.add('hair-row');
            document.getElementById(id).append(row);
            lastRow = hairElem_row[hairElem_row.length - 1];
            lastRow.style.marginBottom = 0;
        }

        var elem = document.createElement('div');
        elem.classList.add('hair-elem');
        lastRow.append(elem);
        elem.setAttribute('onclick', 'ChCreate.selectHairElem(this)');
        elem.id = id.split('-')[0] + '-' + this.allHairsId[this.indexAllHairs]++;

        elem.setAttribute('style', `background: url(${content});background-size:cover;`);
        elem.innerHTML = `<div></div`;
    }

    static getHairContent(id) {
        this.indexAllHairs = parseInt(document.getElementById(id).getAttribute('name').split('-')[0]);
        return getDB(id.split('-')[0]);
    }

    static redrawHair() {
        var id = 'hair-elem-container';
        document.getElementById(id).innerHTML = '';
        this.indexAllHairs = 0;
        this.allHairsId = Array(Object.keys(left_data.hair).length).fill(0);
        this.drawTable(id);
    }

    static setHairFuzz(id) {
        this.setFrame(2, id, frame_items[2]);
    }


    /*personal*/
    static curSex;
    static sex_change = false;
    static sex_changed = false;

    static sexSelect(id) {
        this.sendSexInfo(id);
        // this.sexApply(id);
    }

    static sexApply(id) {
        var sex1, sex2;
        this.curSex = id;
        this.sex_change = true;
        switch (id) {
            case 'boy':
                sex1 = document.getElementById('boy');
                sex2 = document.getElementById('girl');
                try {
                    document.getElementById('beard-colorBox').style.display = 'block';
                    document.getElementById('chest-colorBox').style.display = 'block';
                    document.getElementById('beard-elem').style.display = 'flex';
                    document.getElementById('chest-elem').style.display = 'flex';
                    document.getElementsByClassName('extra-nav')[1].style.display = 'none';
                } catch (e) {}
                break;
            case 'girl':
                sex1 = document.getElementById('girl');
                sex2 = document.getElementById('boy');
                try {
                    document.getElementById('beard-colorBox').style.display = 'none';
                    document.getElementById('chest-colorBox').style.display = 'none';
                    document.getElementById('beard-elem').style.display = 'none';
                    document.getElementById('chest-elem').style.display = 'none';
                    document.getElementsByClassName('extra-nav')[1].style.display = 'flex';
                } catch (e) {}
                break;
        }
        this.fullReset();
        this.sexBG(sex1, sex2);
        this.showClothes(this.curSex);
        this.sex_change = false;
        this.sex_changed = true;
    }

    static sexBG(sex1, sex2) {
        sex1.style = `background: linear-gradient(225.72deg, #C81212 0%, #851717 100%) 0% 0% / 300% 100%;animation: selected 5s ease infinite;`;
        sex1.style.opacity = 1;
        sex1.getElementsByTagName('path')[0].setAttribute('fill', '#F0F0F0');
        sex2.removeAttribute('style');
        sex2.getElementsByTagName('path')[0].setAttribute('fill', '#5E5E5E');
    }

    static toFocus(id) {
        if (document.getElementById(id).value.length == document.getElementById(id).maxLength) document.getElementById(id).select();
        document.getElementById(id).style.opacity = "1";
        id += '-static';
        document.getElementById(id).style.opacity = "1";
    }

    static toBlur(id) {
        document.getElementById(id).style.opacity = "0.3";
        id += '-static';
        document.getElementById(id).style.opacity = "0.3";
    }

    static onInput(elem) {
        elem.value = elem.value.charAt(0).toUpperCase() + elem.value.slice(1);
        const chars = elem.value.split('');
        const char = chars.pop();
        if (!/[A-Za-z]/.test(char)) elem.value = chars.join('');
    }

    static onAge(elem) {
        const chars = elem.value.split('');
        const char = chars.pop();
        if (!/[0-9]/.test(char)) elem.value = chars.join('');
        if (elem.value == 0 && elem.value != '') elem.value = 1;
    }

    static fullReset() {
        this.redrawHair();
        scrollableContainers.forEach((elem) => {
            elem[1] = true;
        });
        for (var i = 0; i < allSliders.length; i++)
            this.setSliderVal(i);
        if (this.curSex == 'girl') this.setSliderVal(20, 1);;
        for (var i = 0; i < frame_items.length; i++)
            this.setFrame(i, 0, frame_items[i]);
        try {
            colors.forEach((elem) => {
                this.setColor(elem + 0);
            });
            hairs.forEach((elem) => {
                document.getElementById(elem + 0).click();
            });
        } catch (e) {}
        document.getElementById('features').click();
        this.nameSet("", "");
        document.getElementById('age').value = "";
    }

    static nameSet(name, surname) {
        document.getElementById('name').value = name;
        document.getElementById('surname').value = surname;
    }




    /*right*/
    static onRandom() {
        const allSliders = document.getElementsByClassName('slider');
        for (var i = 0; i < allSliders.length; i++) {
            var slider = allSliders[i].getElementsByTagName('input')[0];
            var min = parseInt(slider.min);
            var max = parseInt(slider.max);
            slider.value = (Math.random() * (max - min + 1) + min).toFixed(2);
            this.fillSlider(slider, slider.parentElement.parentElement)
        }
        colors.forEach((item) => {
            if (this.curSex == 'boy' && (item == 'lipstick-color-' || item == 'blush-color-')) return;
            if (this.curSex == 'girl' && (item == 'beard-color-' || item == 'chestHair-color-')) return;
            var color_num = parseInt(Math.random() * this.color_amount(item));
            this.setColor(item + color_num);
        });
        for (var i = 0; i < frame_items.length - 4; i++) {
            var item = frame_items[i];
            if (item == 'aging-item' || item == 'flaws-item' || item == 'burns-item') continue;
            if (this.curSex == 'boy' && (item == 'lipstick-item' || item == 'blush-item' || item == 'makeup-item')) continue;
            var rnd = parseInt(Math.random() * getDB(item.split('-')[0], 'frames').length + 1);
            this.setFrame(i, rnd, item);
        }
        hairs.forEach((item) => {
            if (this.curSex == 'girl' && (item == 'beard-' || item == 'chest-')) return;
            var rnd = parseInt(Math.random() * getDB(item.split('-')[0]).length);
            document.getElementById(item + rnd).click()
        });

        for (var i = this.clothesStartIndex; i < clothes.length + this.clothesStartIndex; i++) {
            var item = clothes[i - this.clothesStartIndex];
            var rnd = parseInt(Math.random() * getDB(item).length + 1);
            this.setFrame(i, rnd, item + '-item');
        }
        document.getElementById('age').value = parseInt(18 + Math.random() * (99 - 18));
        mp.trigger("CharacterCreation::GetRandomName");
    }

    static onPlay() {
        mp.trigger("CharacterCreation::Create", document.getElementById('name').value, document.getElementById('surname').value, document.getElementById('age').value);
    }

    static onQuit() {
        mp.trigger("CharacterCreation::OnExit");
    }

    static color_amount(item) {
        switch (item) {
            case 'eyes-color-':
                return right_data.eyes.eyesColors.length;
            default:
                return 64;
        }
    }



    /*elements*/
    /*frames*/
    static plusFrame(index, item) {
        this.showSelection(index, frame_index[index] += 1, item);
    }

    static minusFrame(index, item) {
        this.showSelection(index, frame_index[index] -= 1, item);
    }

    static setFrame(index, n, item) {
        this.showSelection(index, frame_index[index] = n, item);
    }

    static showSelection(index, n, item) {
        var slides = document.getElementsByClassName(item);
        var item = item.split('-')[0];
        for (var i = 0; i < slides.length; i++)
            slides[i].style.display = 'none';
        if (slides.length == 0) slides = getDB(item, 'frames');
        if (n >= slides.length) frame_index[index] = 0;
        else if (n < 0) frame_index[index] = slides.length - 1;

        try {
            slides[frame_index[index]].style.display = 'block';
        } catch (e) {}

        document.getElementsByClassName('frame-name')[index].innerText = getDB(item, 'frames')[frame_index[index]];
        this.sendFrameInfo(item, frame_index[index]);
    }

    static setFrameOnClick() {
        var arrows = document.getElementsByClassName('frame-arrow');

        var minusArrows = [],
            plusArrows = [];
        for (var i = 0; i < arrows.length; i++) {
            if (i % 2 == 0) minusArrows.push(arrows[i]);
            else plusArrows.push(arrows[i]);
        }

        for (var i = 0; i < minusArrows.length; i++) {
            minusArrows[i].setAttribute('onclick', `ChCreate.minusFrame(${i}, '${frame_items[i]}')`);
            plusArrows[i].setAttribute('onclick', `ChCreate.plusFrame(${i}, '${frame_items[i]}')`);
        }
    }

    static showAllFrames() {
        for (var i = 0; i < frame_items.length - 4; i++)
            this.showSelection(i, frame_index[i], frame_items[i]);
    }

    static renderFrames() {
        getDB('father').forEach(() => {
            document.getElementById('father').innerHTML += `<img class="frame-item father-item" src="libs/img/char-creation/father/${frame_index[0]++}.png"/>`;
        });
        getDB('mother').forEach(() => {
            document.getElementById('mother').innerHTML += `<img class="frame-item mother-item" src="libs/img/char-creation/mother/${frame_index[1]++}.png"/>`;
        });
    }


    /*slider*/
    static lastSB;
    static id_num;

    //data = ['elem-id', min, max, value, step, 'description', 'left/right', 'min-text', 'max-text']
    static createSliders(data) {
        if (data == undefined) return;
        this.id_num = 0;
        for (var i = 0; i < data.length; i++)
            this.sliderBox(data[i])
    }

    static sliderBox(data) {
        if (data.length == 0) return;
        var containerId = data[0] + '-container';
        var sliderBox = document.createElement('div');
        sliderBox.classList.add('sliderBox', data[6], 'background');
        document.getElementById(containerId).append(sliderBox);

        sliderBox.innerHTML = `<p class="description">${data[5]}</p>`;
        this.drawSlider(data[0], sliderBox, data[1], data[2], data[3], data[4]);
        sliderBox.innerHTML += /*html*/ `
        <p class="sliderBox-bottom">
            <span class="left-span">${data[7]}</span>
            <span class="center-span">${data[3]}</span>
            <span class="right-span">${data[8]}</span>
        </p>`;

        if (!!this.lastSB) this.lastSB.style.marginBottom = '15px';
        this.lastSB = sliderBox;
    }

    static drawSlider(elem_id, parent, min, max, value, step) {
        var sliderBlock = document.createElement('div');
        sliderBlock.classList.add('slider');
        parent.append(sliderBlock);
        sliderBlock.innerHTML = /*html*/ `
        <input autocomplete="off" spellcheck="false"  id="${elem_id}-${this.id_num++}" type="range" min="${min}" max="${max}" value="${value}" step="${step}" oninput="ChCreate.fillSlider(this, this.parentElement.parentElement)" style="width: ${parent.offsetWidth - 20}px; outline:none;">`;
        this.fillSlider(sliderBlock.getElementsByTagName('input')[0], parent.parentElement);
    }

    static fillSlider(slider, parent) {
        const min = slider.min,
            max = slider.max,
            val = slider.value;
        var percent = (val - min) * 100 / (max - min);
        slider.style.backgroundSize = percent + '% 100%';
        var span = parent.getElementsByTagName('span')[1];
        if (!!span) span.innerText = slider.value;
        this.sendSliderInfo(slider.id, slider.value);
    }

    static setSliderVal(index, value) {
        var slider = allSliders[index].getElementsByTagName('input')[0];
        if (value == undefined) {
            var min = parseInt(slider.min);
            var max = parseInt(slider.max);
            slider.value = (max + min) / 2;
        } else {
            slider.value = value;
        }
        this.fillSlider(slider, slider.parentElement.parentElement)
    }



    /*senders*/
    //Отправляет информацию о выборе пола
    static sendSexInfo(sex) {
        if (this.creation_loading) return;
        mp.trigger("CharacterCreation::SetSex", sex == "boy" ? true : false);
    }

    //Отправляет информацию с каждого ползунка (левого и правого под-меню)
    static sendSliderInfo(id, value) {
        if (this.creation_loading || this.sex_change) return;
        var params = id.split('-');
        if (this.curSex == 'boy' && params[0] == 'makeup') return;
        id = -1;
        value = parseFloat(value);
        switch (params[0]) {
            case "eyes":
                id = 11;
                value = -value;
                break;
            case "nose":
                switch (params[1]) {
                    case "0":
                        id = 0;
                        break;
                    case "1":
                        id = 1;
                        value = -value;
                        break;
                    case "2":
                        id = 2;
                        value = -value;
                        break;
                    case "3":
                        id = 3;
                        value = -value;
                        break;
                    case "4":
                        id = 4;
                        value = -value;
                        break;
                    case "5":
                        id = 5;
                        break;
                }
                break;
            case "eyebrows":
                switch (params[1]) {
                    case "0":
                        id = 6;
                        value = -value;
                        break;
                    case "1":
                        id = 7;
                        break;
                }
                break;
            case "chin":
                switch (params[1]) {
                    case "0":
                        id = 15;
                        break;
                    case "1":
                        id = 16;
                        break;
                    case "2":
                        id = 17;
                        break;
                    case "3":
                        id = 18;
                        break;
                    case "4":
                        id = 13;
                        break;
                    case "5":
                        id = 14;
                        break;
                    case "6":
                        id = 19;
                        break;
                }
                break;
            case "lips":
                switch (params[1]) {
                    case "0":
                        id = 12;
                        value = -value;
                        break;
                    case "1":
                        id = 8;
                        value = -value;
                        break;
                    case "2":
                        id = 9;
                        break;
                    case "3":
                        id = 10;
                        value = -value;
                        break;
                }
                break;
            case "parents":
                mp.trigger("CharacterCreation::Update::Parents", "mix-" + params[1], JSON.stringify(parseFloat(Math.abs(value - 1).toFixed(2))));
                break;
            case "makeup":
                if (params[1] == "0")
                    mp.trigger("CharacterCreation::Update::HeadOverlayOpacity", 8, JSON.stringify(value));
                else if (params[1] == "1")
                    mp.trigger("CharacterCreation::Update::HeadOverlayOpacity", 5, JSON.stringify(value));
                else if (params[1] == "2")
                    mp.trigger("CharacterCreation::Update::HeadOverlayOpacity", 4, JSON.stringify(value));
                break;
        }
        if (id != -1)
            mp.trigger("CharacterCreation::Update::FaceFeature", id, JSON.stringify(value));
    }

    //Отправляет информацию из выбора фрейма (в формате одежда, номер одежды)
    static sendFrameInfo(item, index) {
        if (this.creation_loading || this.sex_change) return;
        if (item == 'outerwear' || item == 'headdress' || item == 'underwear' || item == 'footwear') {
            var cType = item == 'headdress' ? 0 : (item == 'outerwear' ? 1 : (item == 'underwear' ? 2 : 3));
            mp.trigger("CharacterCreation::Update::Clothes", cType, index - 1);
        }
        if (item == 'father' || item == 'mother') mp.trigger("CharacterCreation::Update::Parents", item, item == 'father' ? fathers[index] : mothers[index]);
        else if (item == 'fuzz') mp.trigger("CharacterCreation::Update::HairOverlay", index);
        else {
            var id = -1;

            switch (item) {
                case "burns":
                    id = 7;
                    break;
                case "aging":
                    id = 3;
                    break;
                case "flaws":
                    id = 0;
                    break;
                case "moles":
                    id = 9;
                    break;
                case "makeup":
                    id = 4;
                    if (index != 0)
                        index = makeups[index - 1] + 1;
                    break;
                case "blush":
                    id = 5;
                    break;
                case "lipstick":
                    id = 8;
                    break;
            }
            if (id != -1)
                mp.trigger("CharacterCreation::Update::HeadOverlay", id, index);
        }
    }

    //Отправляют информацию (id=секция-номер) из выборов представленных в форме квадрата 
    static sendSquareElemInfo(id) {
        if (this.creation_loading || this.sex_change) return;
        var params = id.split('-');
        var num = parseInt(params[1]);
        if (params[0] == "hair") mp.trigger("CharacterCreation::Update::Hair", num);
        else {
            if (params[0] == "beard") mp.trigger("CharacterCreation::Update::HeadOverlay", 1, num);
            else if (params[0] == "eyebrows_hair") mp.trigger("CharacterCreation::Update::HeadOverlay", 2, num);
            else if (params[0] == "chest") mp.trigger("CharacterCreation::Update::HeadOverlay", 10, num);
        }
    }

    //Отправляют информацию о выборе цвета ('item=секция+порядковый номер цвета' + rgb) 
    static sendColorsInfo(item) {
        if (this.creation_loading || this.sex_change) return;
        var params = item.split('-');
        var colorId = parseInt(params[2]);
        if (params[0] == "eyes") mp.trigger("CharacterCreation::Update::EyeColor", colorId);
        else if (params[0] == "hair" || params[0] == "hair1") mp.trigger("CharacterCreation::Update::HairColor", colorId, params[0] == "hair" ? true : false);
        else {
            if (params[0] == "lipstick") mp.trigger("CharacterCreation::Update::HeadOverlayColor", 8, colorId);
            else if (params[0] == "blush") mp.trigger("CharacterCreation::Update::HeadOverlayColor", 5, colorId);
            else if (params[0] == "beard") mp.trigger("CharacterCreation::Update::HeadOverlayColor", 1, colorId);
            else if (params[0] == "eyebrows") mp.trigger("CharacterCreation::Update::HeadOverlayColor", 2, colorId);
            else if (params[0] == "chest") mp.trigger("CharacterCreation::Update::HeadOverlayColor", 10, colorId);
        }
    }
}