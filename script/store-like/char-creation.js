var ChCreate = class Char_Creation {
    static default_choices;
    static min_max = {};
    static loading = true;
    static drawing = true;
    static is_full;

    static draw(full){
        this.is_full = full;
        if (full) {
            Object.keys(chcreate_navs.full).forEach(key => {
                ChCreate.drawNavigation(...chcreate_navs.full[key]);
            })
            ChCreate.drawHair();
            ChCreate.navReverseTraverse();
            ChCreate.default_choices = JSON.parse(JSON.stringify(chcreate_choices));
            
            ChCreate.cur_sex = null;
            document.getElementById('chcreate-boy').click();
        } else {
            Object.keys(chcreate_navs.partial).forEach(key => {
                ChCreate.drawNavigation(...chcreate_navs.partial[key]);
            })
            chcreate_tmpl.querySelector('.chcreate-menu').children[0].style.display = 'none';
            chcreate_tmpl.querySelector('.chcreate-menu').children[1].innerText = 'Применить';
        }
        ChCreate.loading = false;
        setTimeout(document.getElementById('char-creation').style.opacity = 1, 0);
    }

    static last_navs = {};
    static drawNavigation(pid, ids, path, puid) {
        var parent = document.getElementById(pid);
        ids.forEach(id => {
            parent.innerHTML += /*html*/ `<div class="chcreate-nav-elem" id="${id}" puid="${puid}" onclick="ChCreate.navigate(this)"><img src="libs/svgs/char-creation/navs/${path}${id}.svg"></div>`;
        });
        this.last_navs[puid] = null;
        this.navigate(parent.firstElementChild)
    }

    static navigate(elem) {
        var lastNav = this.last_navs[elem.getAttribute('puid')];
        if (lastNav == elem) return;
        color(elem, lastNav);
        var container = document.getElementById(`chcreate-${elem.id}-container`);
        if (container)
            if (container.innerHTML == '') this.drawSubContainer(elem.id);
        if (!this.is_full && elem.id == 'appearance' && document.getElementById(`chcreate-features-container`).innerHTML == '')
             this.drawSubContainer(elem.id);

        switch (parseInt(elem.getAttribute('puid'))) {
            case 0:
                if (lastNav) document.getElementById(`chcreate-${lastNav.id}-container`).style.display = 'none';
                container.style.display = 'flex';
                break;
            case 1:
                this.fillSliderContainer('chcreate-right-container', true, chcreate_content.right_data[elem.id], elem.id);
                if (elem.id in chcreate_content.color_box && this.is_full) this.drawColorBox(chcreate_content.color_box[elem.id], elem.id);
                break;
            case 2:
            case 3:
                if (lastNav) document.getElementById(`chcreate-${lastNav.id}-container`).style.display = 'none';
                container.style.display = 'block';
                break;
        }

        function color(elem, last) {
            if (last) last.classList.remove('chcreate-nav-selected');
            elem.classList.add('chcreate-nav-selected');
            ChCreate.last_navs[elem.getAttribute('puid')] = elem;
        }
    }

    static navReverseTraverse() {
        Array.from(document.getElementsByClassName('chcreate-nav-elem')).slice().reverse().forEach(nav => {
            nav.click()
        })
    }

    static showNavAmount(pid, amount) {
        var parent = document.getElementById(pid);
        Array.from(parent.children).forEach(child => {
            child.style.display = 'none'
        });
        for (var index = 0; index < parent.children.length; index++) {
            if (index == amount) return;
            parent.children[index].style = '';
        }
    }


    /*left-side*/
    //data
    static cur_sex = 'boy';
    static sex_change;
    static sexApply(sex) {
        if (this.cur_sex == sex) return;
        this.sex_change = true;
        this.cur_sex = sex;
        color(document.getElementById(`chcreate-${sex}`));
        this.fullReset();
        this.drawClothes(sex);
        this.drawHairContainer(`chcreate-${chcreate_navs.full.hair[1][0]}-container`, sex);
        this.showNavAmount('chcreate-hair-nav', sex == 'boy' ? 4 : 2);
        this.showNavAmount('chcreate-appearance-nav', sex == 'boy' ? 0 : 2);
        this.showNavAmount('chcreate-colors-container', sex == 'boy' ? 4 : 2);
        this.sex_change = false;

        function color(elem) {
            var last = document.querySelector('.chcreate-sex-selected');
            if (last) last.classList.remove('chcreate-sex-selected')
            elem.classList.add('chcreate-sex-selected');
        }
    }

    static fullReset() {
        Object.keys(this.default_choices.pic).forEach(key => {
            this.onhair(document.getElementById(this.default_choices.pic[key]))
        })
        Object.keys(this.default_choices.frame).forEach(key => {
            eval(document.getElementById(`${key}-fname`).getAttribute('reset'));
        })
        Object.keys(this.default_choices.slider).forEach(key => {
            this.setSliderVal(key, this.default_choices.color_box[key]);
        })
        Object.keys(this.default_choices.color_box).forEach(key => {
            this.setColor(this.default_choices.color_box[key]);
        })
        Array.from(chcreate_tmpl.querySelectorAll('[id$="-chcreate"]')).forEach(i => {
            i.value = '';
        })
        chcreate_choices = JSON.parse(JSON.stringify(this.default_choices));
        this.navReverseTraverse();
    }

    static nameSet(name, surname) {
        document.getElementById('name-chcreate').value = name;
        document.getElementById('surname-chcreate').value = surname;
    }

    static onfocus(elem) {
        elem.style.opacity = 1;
        elem.lastElementChild.focus();
    }

    static onblur(elem) {
        elem.parentElement.style.opacity = 0.3;
    }

    //parents
    static drawParents() {
        this.drawFrameBig(...chcreate_content.left_data.frames.parents.static)
        this.fillSliderContainer('chcreate-parents-container', false, chcreate_content.left_data.sliders.parents, 'parents');
    }

    //hair
    static drawHair() {
        this.drawHairContainer(`chcreate-${chcreate_navs.full.hair[1][0]}-container`, this.cur_sex)
        chcreate_navs.full.hair[1].slice(1, 4).forEach(id => {
            this.drawHairContainer(`chcreate-${id}-container`, id.replace('_sel', ''))
        })
    }

    static drawHairContainer(pid, key) {
        var parent = document.getElementById(pid);
        var puid = `${key}-helem`;
        if (!(puid in chcreate_choices.pic)) {
            chcreate_choices.pic[puid] = null;
            this.min_max[puid] = [0, chcreate_content.left_data.hair[key] - 2];
        }
        parent.innerHTML = /*html*/ `<div style="display:flex"></div>`;
        for (var index = 1, amount = 0; index < chcreate_content.left_data.hair[key]; index++, amount++) {
            if (amount == 5) {
                amount = 0;
                parent.innerHTML += /*html*/ `<div style="display:flex;margin-top:5px"></div>`;
            }
            parent.lastChild.innerHTML += /*html*/ `<div id="${index - 1}-${puid}" puid="${puid}" class="chcreate-hair-elem" style="background: url(libs/img/char-creation/hair/${key}/${index}.png);background-size:cover;" onclick="ChCreate.onhair(this)"></div>`;
        }
        this.onhair(document.getElementById(`0-${puid}`));
    }

    static onhair(elem) {
        if (!elem) return;
        var puid = elem.getAttribute('puid');
        var last = document.getElementById(chcreate_choices.pic[puid]);

        if (last) {
            try {
                last.lastChild.remove();
            } catch (error) {}
            last.style.removeProperty('opacity');
        }
        elem.style.opacity = 1
        elem.innerHTML = /*html*/ `<div class="chcreate-hair-selected"></div>`;
        chcreate_choices.pic[puid] = elem.id;
        this.picRequest(elem);
    }

    //colors
    static drawColors() {
        var data = chcreate_content.color_box.hair;
        Object.keys(data).forEach(key => {
            this.drawColorBox(data[key], key);
        })
    }

    //appearance
    static drawFeatures(start) {
        var data = chcreate_content.left_data.frames.appearance.features;
        Object.keys(data).slice(start, Object.keys(data).length).forEach(key => {
            this.drawFrameSmall(...data[key].static, key);
        })
    }

    static drawMakeup() {
        ['lipstick', 'blush', 'makeup'].forEach((key, idx) => {
            this.drawFrameSmall(...chcreate_content.left_data.frames.appearance.makeup[key].static, key);
            this.drawColorBox(chcreate_content.color_box.makeup[key], key);
            this.drawSliderBox(document.getElementById('chcreate-makeup-container'), `${idx}-makeup`, ...chcreate_content.left_data.sliders.makeup[idx]);
        })
    }

    //clothes
    static drawClothes(sex) {
        document.getElementById('chcreate-clothes-container').innerHTML = '';
        this.drawFrameBig(...chcreate_content.left_data.frames.clothes[sex].top.static, sex);
        this.drawFrameBig(...chcreate_content.left_data.frames.clothes[sex].bottom.static, sex);
    }

    //misc
    static drawSubContainer(which) {
        switch (which) {
            case 'parents':
                this.drawParents();
                break;
            case 'colors':
                this.drawColors();
                break;
            case 'features':
                this.drawFeatures(0);
                break;
            case 'makeup':
                this.drawMakeup();
                break;
            case 'appearance':
                if (!this.is_full) this.drawFeatures(1);
        }
    }

    /*right-side*/
    static onrandom() {
        Object.keys(chcreate_choices.pic).forEach(key => {
            if (this.cur_sex == 'girl' && ['boy', 'beard', 'chest'].some(v => {
                    return ~key.indexOf(v)
                })) return;
            if (this.cur_sex == 'boy' && key.includes('girl')) return;
            document.getElementById(`${parseInt(rnd(key))}-${key}`).click();
        });
        Object.keys(chcreate_choices.frame).forEach(key => {
            if (['aging', 'flaws', 'burns'].some(v => {
                    return ~key.indexOf(v)
                })) return;
            if (this.cur_sex == 'boy' && ['lipstick', 'blush', 'makeup'].some(v => {
                    return ~key.indexOf(v)
                })) return;
            eval(document.getElementById(`${key}-fname`).getAttribute('reset').replace('0', parseInt(rnd(key))));
        })
        Object.keys(chcreate_choices.slider).forEach(key => {
            this.setSliderVal(key, rnd(key));
        })
        Object.keys(chcreate_choices.color_box).forEach(key => {
            if (this.cur_sex == 'girl' && ['beard', 'chest'].some(v => {
                    return ~key.indexOf(v)
                })) return;
            if (this.cur_sex == 'boy' && ['lipstick', 'blush'].some(v => {
                    return ~key.indexOf(v)
                })) return;
            this.setColor(`${parseInt(rnd(key))}-${key}`);
        })
        document.getElementById('age-chcreate').value = parseInt(18 + Math.random() * (99 - 18));
        mp.trigger("CharacterCreation::GetRandomName");

        function rnd(key) {
            var nums = ChCreate.min_max[key];
            return (Math.random() * (nums[1] - nums[0]) + nums[0]).toFixed(1);
        }
    }

    /*sliders*/
    //data = ['elem-id', 'left/right', 'description', 'min-text', 'max-text']
    static fillSliderContainer(pid, clear, data, id) {
        this.drawing = true;
        var parent = document.getElementById(pid)
        if (clear) parent.innerHTML = '';
        for (var index = 0; index < data.length; index++)
            this.drawSliderBox(parent, `${index}-${id}`, ...data[index])
        this.drawing = false;
    }

    static drawSliderBox(parent, id, side, h1, min, max) {
        var nums = side.includes('left') ? [0, .5] : [-1, 0];
        if (!(id in chcreate_choices.slider)) {
            chcreate_choices.slider[id] = nums[1];
            this.min_max[id] = [nums[0], 1];
        }
        parent.innerHTML += /*html*/ `
            <div class="chcreate-slider-wrapper chcreate-background ${side}">
                <div class="chcreate-h1">${h1}</div>
                <div class="chcreate-slider">
                    <input id="${id}" type="range" min="${nums[0]}" max="1" value="${chcreate_choices.slider[id]}" step="0.1" oninput="ChCreate.fillSlider(this.id)">
                </div>
                <div class="chcreate-slider-bottom">
                    <span>${min}</span>
                    <span class="center-span" id="${id}-span">${chcreate_choices.slider[id]}</span>
                    <span style="text-align: right;">${max}</span>
                </div>
            </div>`;
        this.fillSlider(id);
    }

    static fillSlider(id) {
        var slider = document.getElementById(id);
        var percent = (slider.value - slider.min) * 100 / (slider.max - slider.min);
        slider.style.backgroundSize = percent + '% 100%';
        document.getElementById(`${id}-span`).innerText = slider.value;
        chcreate_choices.slider[id] = slider.value;
        this.sliderRequest(slider);
    }

    static setSliderVal(id, value) {
        chcreate_choices.slider[id] = value;
        var slider = document.getElementById(id);
        if (!slider) return;
        slider.value = value;
        this.fillSlider(id, slider.parentElement.parentElement)
    }



    /*colors*/
    static drawColorBox(cbox_data, id) {
        if (!cbox_data) return;
        var cbox = drawBox(...cbox_data),
            puid = `${id}-cbox`,
            colors = chcreate_content.color_box.colors[cbox_data.at(-1)];
        for (var index = 0, amount = 0; index < colors.length; index++, amount++) {
            if (amount == 16) {
                amount = 0;
                cbox.innerHTML += /*html*/ `<div class="chcreate-row"></div>`;
            }
            cbox.lastElementChild.innerHTML += /*html*/ `<div id="${index}-${puid}" puid="${puid}" class="chcreate-cbox-elem" style="background: ${colors[index]}" onclick="ChCreate.oncolor(this)"></div>`;
        }
        if (!(puid in chcreate_choices.color_box)) {
            chcreate_choices.color_box[puid] = `0-${puid}`;
            this.min_max[puid] = [0, colors.length - 1];
        }
        this.oncolor(document.getElementById(chcreate_choices.color_box[puid]))


        function drawBox(pid, side, h1) {
            var parent = document.getElementById(pid);
            parent.innerHTML += /*html*/
                `<div class="chcreate-cbox chcreate-background ${side}">
                    <div class="chcreate-h1">${h1}</div>
                    <div class="chcreate-row"></div>
                </div>`;
            return parent.lastElementChild;
        }
    }

    static oncolor(elem) {
        var puid = elem.getAttribute('puid');
        var lastColor = document.getElementById(chcreate_choices.color_box[puid]);

        if (lastColor) lastColor.classList.remove('chcreate-cbox-selected');
        elem.classList.add('chcreate-cbox-selected')
        chcreate_choices.color_box[puid] = elem.id;

        if (/^\d+-hair-cbox$/.test(elem.id)) this.setColor(`${parseInt(elem.id)}-extra_hair-cbox`);
        this.colorRequest(elem);
    }

    static setColor(id) {
        try {
            document.getElementById(id).click();
        } catch (error) {}
    }



    /*frames*/
    static drawFrameBig(pid, h1, ids, labels, from, sex) {
        var parent = document.getElementById(pid);
        parent.innerHTML += /*html*/
            `<div class="chcreate-fbox chcreate-background">
                <div class="chcreate-fbox-h1">${h1}</div>
                <div style="display:flex;justify-content:space-between">
                    <div class="chcreate-fbox-wrapper">
                        <div class="chcreate-frame ${ids[0]}-frame-bg"><img id="${ids[0]}-fpic"></div>
                    </div>
                    <div class="chcreate-fbox-wrapper">
                        <div class="chcreate-frame ${ids[1]}-frame-bg"><img id="${ids[1]}-fpic"></div>
                    </div>
                </div>
            </div>`;
        [0, 1].forEach(idx => {
            this.drawFrameArrows(parent.lastChild.querySelectorAll('.chcreate-fbox-wrapper')[idx], false, labels[idx], from, ids[idx], sex)
        })
    }

    static drawFrameSmall(pid, h1, from, id) {
        var parent = document.getElementById(pid);
        parent.innerHTML += /*html*/
            `<div class="chcreate-fbox-mini chcreate-background">
                <div class="chcreate-fbox-h1">${h1}</div>
            </div>`;
        this.drawFrameArrows(parent.lastChild, true, null, from, id);
    }

    static drawFrameArrows(elem, param, label, from, id, sex) {
        chcreate_choices.frame[id] = 0;
        this.min_max[id] = [0, eval(`${from}${id}[0]`).length - 1];
        elem.innerHTML += /*html*/ `
            <div class="chcreate-frame-nav ${param ? 'frame-nav-mini' : ''}">
				<button class="chcreate-frame-arrow" onclick="ChCreate.minusFrame('${id}', '${from}', ${!param}, '${sex}')">
					<img src="libs/svgs/char-creation/left.svg">
				</button>
				<div class="chcreate-frame-name" id="${id}-fname" reset="ChCreate.showFrame('${id}', 0, '${from}', ${!param}, '${sex}');"></div>
				<button class="chcreate-frame-arrow" onclick="ChCreate.plusFrame('${id}', '${from}', ${!param}, '${sex}')">
                    <img src="libs/svgs/char-creation/right.svg">
				</button>
                ${label ? /*html*/ `<label>${label}</label>` : ``}
			</div>`
        this.showFrame(id, 0, from, !param, sex);
    }


    static showFrame(pid, n, from, draw, sex) {
        var len = eval(`${from}${pid}[0]`).length - 1;
        n = n > len ? 0 : n < 0 ? len : n;
        var id = eval(`${from}${pid}[0][${n}]`);

        if (draw) {
            var img = document.getElementById(`${pid}-fpic`);
            img.style = 'opacity: 0; transition: 0;';
            img.src = sex != 'undefined' && sex ? `libs/img/char-creation/clothes/${sex}/${pid}/${n}.png` : `libs/img/char-creation/${pid}/${n}.png`;
            setTimeout(() => {
                document.getElementById(`${pid}-fpic`).style = 'opacity: 1; transition: .5s;'
            }, 300);
        }
        document.getElementById(`${pid}-fname`).innerText = eval(`${from}${pid}[1][${n}]`);

        chcreate_choices.frame[pid] = n;
        this.frameRequest(id, pid);
    }

    static plusFrame(id, from, draw, sex) {
        this.showFrame(id, chcreate_choices.frame[id] += 1, from, draw, sex);
    }

    static minusFrame(id, from, draw, sex) {
        this.showFrame(id, chcreate_choices.frame[id] -= 1, from, draw, sex);
    }


    /*requests*/
    static sexRequest(sex) {
        mp.trigger('CharacterCreation::SetSex', sex == 'boy' ? true : false);
        // ChCreate.sexApply(sex);
    }

    static playRequest() {
        mp.trigger('CharacterCreation::Create', ...Array.from(chcreate_tmpl.querySelectorAll('[id$="-chcreate"]')).map(i => i.value));
    }

    static quitRequest() {
        mp.trigger('CharacterCreation::OnExit');
    }

    static picRequest(elem) {
        if (this.loading || this.drawing || this.sex_change) return;
        var data = chcreate_senders.pic[elem.id.split('-')[1]];
        mp.trigger(`CharacterCreation::Update::${data[0]}Color`, parseInt(elem.id), data[1]);
    }

    static frameRequest(idx, key) {
        if (this.loading || this.drawing || this.sex_change) return;
        var data = chcreate_senders.frame[key];
        mp.trigger(`CharacterCreation::Update::${data[0]}`, idx, data[1]);
    }

    static sliderRequest(elem) {
        if (this.loading || this.drawing || this.sex_change) return;
        var params = elem.id.split('-');
        if (params[1] == 'makeup' && this.cur_sex == 'boy') return;
        var data = chcreate_senders.slider[params[1]];
        if (!data)
            mp.trigger('CharacterCreation::Update::Parents', JSON.stringify(parseFloat(Math.abs(elem.value - 1).toFixed(2))), `mix-${params[0]}`);
        else mp.trigger(`CharacterCreation::Update::${data.at(-1)}`, data[parseInt(params[0])][1] ? JSON.stringify(-elem.value) : JSON.stringify(+elem.value), data[parseInt(params[0])][0]);
    }

    static colorRequest(elem) {
        if (this.loading || this.drawing || this.sex_change) return;
        var data = chcreate_senders.color[elem.id.split('-')[1]];
        mp.trigger(`CharacterCreation::Update::${data[0]}Color`, parseInt(elem.id), data[1]);
    }
}