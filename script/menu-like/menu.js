var Menu = class Menu {
    static nowOpen; // current container
    static nowOption; // current nav elem

    static selectOption(id) {
        document.getElementById(id).click();
    }

    static optionClick(option) {
        option.classList.add('current');
        var query = '.' + option.id + '-info';
        document.activeElement.blur();
        if (!!this.nowOpen) {
            if (this.nowOption.id.includes('help')) this.showHelpBlock(-1);
            this.nowOpen.style.display = 'none';
            this.nowOption.classList.remove('current');
            this.nowOption.getElementsByTagName('span')[0].style = '';
        }
        this.nowOpen = document.querySelector(query);
        this.nowOpen.style.display = 'block';
        this.nowOption = option;
        this.nowOption.classList.add('current');
        this.nowOption.getElementsByTagName('span')[0].style.color = 'white';

    }

    static defaultAll(elem) {
        mp.trigger("Menu::DefaultAll", elem.parentElement.classList[0].replace('-info', ''));
    }

    static switchHelp(status) {
        if (status) document.querySelector('.menu-esc').style.display = 'flex';
        else document.querySelector('.menu-esc').style.display = 'none';
    }

    static setCharname(charname) {
        document.getElementById('menu-char-name').innerText = charname;
    }
    static setSexPic(sex) {
        if (sex) document.querySelector('.menu-sex-pic').innerHTML = menu_svgs.male;
        else document.querySelector('.menu-sex-pic').innerHTML = menu_svgs.female;
    }
    /*char*/
    static skills_parent = document.querySelector('.menu-skills');
    static char_skills = [
        ['Сила', menu_svgs.skills['strength'], 'strength-prog', 'strength-label', 'strength-span'],
        ['Стрельба', menu_svgs.skills['shooting'], 'shooting-prog', 'shooting-label', 'shooting-span'],
        ['Кулинария', menu_svgs.skills['cooking'], 'cooking-prog', 'cooking-label', 'cooking-span'],
        ['Рыболовство', menu_svgs.skills['fishing'], 'fishing-prog', 'fishing-label', 'fishing-span']
    ];

    static setAllChar(data) {
        this.setName(data[0]);
        this.setSex(data[1]);
        this.setFraction(data[2]);
        this.setOrganisation(data[3]);
        this.setCID(data[4]);
        this.setPlayed(data[5]);
        this.setRegDate(data[6]);
        this.setCash(data[7]);
        this.setBank(data[8]);
        this.drawSkills(data[9]);
        this.fillProperties(data[10])
    }

    static setName(value) {
        document.getElementById('menu-name').innerText = value;
    }

    static setSex(value) {
        if (value) document.getElementById('menu-sex').innerText = 'Мужской';
        else document.getElementById('menu-sex').innerText = 'Женский';
    }

    static setFraction(value) {
        document.getElementById('menu-fraction').innerText = value;
    }

    static setOrganisation(value) {
        document.getElementById('menu-organisation').innerText = value;
    }

    static setCID(value) {
        document.getElementById('menu-cid').innerText = '#' + value;
    }

    static setPlayed(value) {
        document.getElementById('menu-played').innerText = value + ' ч.';
    }

    static setRegDate(value) {
        document.getElementById('menu-reg-date').innerText = value;
    }

    static setCash(value) {
        document.getElementById('menu-cash').innerText = '$' + Number.parseInt(value).toLocaleString('ru');
    }

    static setBank(value) {
        document.getElementById('menu-bankcash').innerText = '$' + Number.parseInt(value).toLocaleString('ru');
    }

    static drawSkills(data) {
        this.skills_parent.innerHTML = '';
        for (var index = 0; index < data.length; index++)
            this.newSkill(index, data[index])
    }

    static newSkill(index, nums) {
        var data = this.char_skills[index];
        var skill = document.createElement('div');
        nums[0] = nums[0] > nums[1] ? nums[1] : nums[0];
        skill.innerHTML = /*html*/
            `<span class="skill-text">${data[0]}</span>
            ${data[1]}
            <p>
                <progress value="${nums[0]}" max="${nums[1]}" class="skill-bar" name="${data[2]}"></progress>
                <label for="${data[2]}" id="${data[3]}" style="display:flex; justify-content: space-between">
                    <span id="${data[4]}">${nums[0]}</span>
                    <span>${nums[1]}</span>
                </label>
            </p>`;
        this.skills_parent.append(skill);
    }

    static setSkill(index, value) {
        var data = this.char_skills[index];
        document.getElementsByName(data[2])[0].value = value;
        document.getElementById(data[4]).innerText = parseInt(value);
    }

    static fillProperties(data) {
        for (var index = 0; index < data.length; index++)
            this.newProperty(data[index]);
    }

    static newProperty(prop) {
        var table = '.' + prop[0] + '-table';
        var prop_row = document.querySelector(table).getElementsByClassName('prop-row');
        if (prop_row.length == 0) {
            var row = document.createElement('div');
            row.classList.add('prop-row');
            document.querySelector(table).append(row);
        }

        var lastRow = prop_row[prop_row.length - 1];
        lastRow.style.marginBottom = 0;
        if (lastRow.getElementsByClassName('prop-elem').length == 2) {
            lastRow.style.marginBottom = '15px';
            var row = document.createElement('div');
            row.classList.add('prop-row');
            document.querySelector(table).append(row);
            lastRow = prop_row[prop_row.length - 1];
            lastRow.style.marginBottom = 0;
        }

        var elem = document.createElement('div');
        elem.classList.add('prop-elem', 'extra-section-bg');
        lastRow.append(elem);

        elem.innerHTML = /*html*/ `
        <h1 class="menu-elem-top" style="margin: 0">
            <div style="padding-right: 10px;">${propertyIcons[prop[1]]}</div>
            <p style="display: flex;flex-direction: column;height: 25px;">
                <span class="menu-elem-text">
                    ${prop[2]} 
                    ${prop[0] != 'veh' ? `<span class="menu-extra-elem-text">#${prop[6]}</span>` : ``}
                </span>
                <span class="menu-extra-elem-text">${prop[3]}</span>
            </p>
        </h1>`;

        elem.innerHTML += /*html*/ `
        <h1 class="prop-elem-bottom">
            <div style="width: 100%;">
                <h3 style="margin: 0;position: absolute;display: flex;flex-direction: column;">
                    <span class="menu-headline-elem-text">Класс</span>
                    <span class="menu-elem-text">${prop[4]}</span>
                </h3>
                <h3 style="margin: 0;text-align: right;display: flex;flex-direction: column;">
                    <span class="menu-headline-elem-text">Цена</span>
                    <span class="menu-elem-text">$${Number.parseInt(prop[5]).toLocaleString('ru')}</span>
                </h3>
            </div>
        </h1>`;
    }

    static clearPropertyTable(prop) {
        var table = '.' + prop + '-table';
        document.querySelector(table).innerHTML = '';
    }

    /*quests*/
    static requestShowQuest(id) {
        mp.trigger('Menu::Quests::Locate', id.replace('-quest', ''));
    }

    //quests[i] = ['id','quest-giver', 'name', 'goal', quest-type];
    static drawQuests(quests) {
        document.querySelector('.quests-table').innerHTML = '';
        for (var i = 0; i < quests.length; i++)
            this.newQuest(quests[i]);
    }

    static updateQuest(id, goal, progress) {
        this.updateQuestGoal(id, goal);
        this.updateQuestProgress(id, progress);
    }

    static updateQuestGoal(id, new_goal) {
        var goal = document.getElementById(id + '-goal');
        goal.innerText = new_goal;
    }

    static newQuest(quest) {
        var quests_row = document.querySelector('.quests-table').getElementsByClassName('quests-row');
        if (quests_row.length == 0) {
            var row = document.createElement('div');
            row.classList.add('quests-row');
            document.querySelector('.quests-table').append(row);
        }

        var lastRow = quests_row[quests_row.length - 1];
        lastRow.style.marginBottom = 0;
        if (lastRow.getElementsByClassName('quests-elem').length == 4) {
            lastRow.style.marginBottom = '30px';
            lastRow.getElementsByTagName('div')[3].style.marginRight = '15px';
            var row = document.createElement('div');
            row.classList.add('quests-row');
            document.querySelector('.quests-table').append(row);
            lastRow = quests_row[quests_row.length - 1];
            lastRow.style.marginBottom = 0;
        }

        var elem = document.createElement('div');
        elem.classList.add('quests-elem', `quest-grad-type-${quest[4]}`);
        lastRow.append(elem);

        if (lastRow.getElementsByClassName('quests-elem').length == 4)
            lastRow.getElementsByTagName('div')[3].style.marginRight = '15px';


        elem.id = quest[0] + '-quest';
        elem.innerHTML = /*html*/ `
        <h1 class="menu-elem-top">
            <p>${menu_svgs.marker}</p>
            <p style="display:flex; flex-direction:column">
                <span class="menu-elem-text">${quest[1]}</span>
                <span class="menu-extra-elem-text">${quest[2]}</span>
            </p>
        </h1>
        <div class="quest-middle menu-elem-text" style="margin-top: 0">
            <span class="menu-headline-elem-text">Цель</span>
            </br>
            <div style="display: flex; margin-top: 3px;">
                <div style="text-align:justify;">
                    <span id="${elem.id}-goal">${quest[3]}</span>
                </div>
            </div>
        </div>`;
        elem.querySelector('svg').name = elem.id;
    }

    //achievements[i] = [id, 'name', 'purpose', cur-progress, max-progress];
    static drawAchievements(achievements) {
        document.querySelector('.achievements-table').innerHTML = '';
        for (var i = 0; i < achievements.length; i++)
            this.newAchievement(achievements[i]);
    }

    static updateAchProgress(id, progress, max) {
        document.getElementById(id + '-achprog').value = progress;
        document.getElementById(id + '-achspan').innerText = parseInt(progress);
        this.updateAchStar(id, progress == max)
    }

    static updateAchStar(id, status) {
        document.getElementById(id + '-achievement').querySelector('.star').innerHTML = status ? menu_svgs.filled_star : menu_svgs.empty_star;
    }

    static newAchievement(achievement) {
        var achievements_row = document.querySelector('.achievements-table').getElementsByClassName('achievements-row');
        if (achievements_row.length == 0) {
            var row = document.createElement('div');
            row.classList.add('achievements-row');
            document.querySelector('.achievements-table').append(row);
        }

        var lastRow = achievements_row[achievements_row.length - 1];
        lastRow.style.marginBottom = 0;
        if (lastRow.getElementsByClassName('achievements-elem').length == 2) {
            lastRow.style.marginBottom = '35px';
            lastRow.getElementsByTagName('div')[1].style.marginRight = '5px';
            var row = document.createElement('div');
            row.classList.add('achievements-row');
            document.querySelector('.achievements-table').append(row);
            lastRow = achievements_row[achievements_row.length - 1];
            lastRow.style.marginBottom = 0;
        }

        var elem = document.createElement('div');
        elem.classList.add('achievements-elem');
        elem.id = achievement[0] + '-achievement'
        lastRow.append(elem);

        if (lastRow.getElementsByClassName('achievements-elem').length == 2) {
            lastRow.getElementsByTagName('div')[1].style.marginRight = '25px';
        }
        achievement[3] = achievement[3] > achievement[4] ? achievement[4] : achievement[3];
        elem.innerHTML = /*html*/ `
        <p class="star"></p>
        <div style="display: flex;flex-direction: column;height: 25px;">
            <span  style="font-weight: 600;font-size: 20px;">${achievement[1]}</span>
        </div>
        <div class="menu-headline-elem-text">${achievement[2]}</div>
        <p class="prog-wrapper">
            <progress max="${achievement[4]}" value="${achievement[3]}" class="achievement-bar" id="${achievement[0]}-achprog"></progress>
            <label style="margin-top:5px; display:flex; justify-content:space-between">
                <span id="${achievement[0]}-achspan">${achievement[3]}</span>
                <span>${achievement[4]}</span>
            </label>
        </p>`;
        this.updateAchStar(achievement[0], achievement[3] == achievement[4])
    }

    /*gifts*/
    static requestCollectGift(btn) {
        mp.trigger("Menu::GetGift", parseInt(btn.id));
    }

    //gift = [id, 'source', 'name'];
    static drawGifts(gifts) {
        document.querySelector('.gifts-table').innerHTML = '';
        for (var i = 0; i < gifts.length; i++)
            this.newGift(gifts[i]);
    }

    static newGift(gift) {
        var gifts_row = document.querySelector('.gifts-table').getElementsByClassName('gifts-row');
        if (gifts_row.length == 0) {
            row = document.createElement('div');
            row.classList.add('gifts-row');
            document.querySelector('.gifts-table').append(row);
        }

        var lastRow = gifts_row[gifts_row.length - 1];
        lastRow.style.marginBottom = 0;
        if (lastRow.getElementsByClassName('gifts-elem').length == 4) {
            lastRow.style.marginBottom = '30px';
            lastRow.getElementsByTagName('div')[3].style.marginRight = '15px';
            var row = document.createElement('div');
            row.classList.add('gifts-row');
            document.querySelector('.gifts-table').append(row);
            lastRow = gifts_row[gifts_row.length - 1];
            lastRow.style.marginBottom = 0;
        }

        var elem = document.createElement('div');
        elem.id = gift[0] + '-gift';
        elem.classList.add('gifts-elem', 'extra-section-bg');
        lastRow.append(elem);

        if (lastRow.getElementsByClassName('gifts-elem').length == 4) {
            lastRow.getElementsByTagName('div')[3].style.marginRight = '15px';
        }

        elem.innerHTML = /*html*/ `
        <h1 class="menu-elem-top">
            <p>${menu_svgs.gift}</p>
            <p style="display:flex; flex-direction: column">
                <span class="menu-elem-text">Подарок</span>
                <span class="menu-extra-elem-text">${gift[1]}</span>
            </p>
        </h1>
        <p class="gift-middle menu-elem-text"><span>${gift[2]}</span></p>
        <p style="text-align: center; margin-top:10px;"><button class="collect red-button" onclick="Menu.requestCollectGift(this)" id="${elem.id}-btn">Забрать</button></p>`;
    }

    static removeGift(id) {
        var gift = document.getElementById(id + '-gift');
        gift.style.opacity = 0
    }

    /*shop*/
    static course = 100;

    static convert() {
        //TBD
    }

    static deposit() {
        //TBD
    }

    static setCourse(course) {
        this.course = course;
    }

    static updateConvert(bcval) {
        document.getElementById('USD-menu').value = bcval * course;
    }

    static setDepositBonus(bonus) {
        document.getElementById('deposit-bonus').innerHTML = `x${bonus}`;
    }

    static setBalance(balance) {
        document.getElementById('menu-balance').innerText = balance;
    }

    static setPrices(data) {
        var i = -1;
        data.forEach(element => {
            i++;
            var parent = document.getElementsByClassName('menu-price')[i]
            parent.innerHTML = '';
            for (var index = 0; index < element.length; index++) {
                var price = document.createElement('p');
                price.id = element[index][0];
                price.innerHTML = /*html*/ `
                    <span class="menu-left-span">${element[index][1]}</span>
                    <span class="menu-right-span">${element[index][2]} BC</span>`;
                parent.append(price);
            }
        });
    }

    /*settings*/
    //Тоглики чисто))
    static toggles = ['sett-time', 'sett-help', 'sett-names', 'sett-cid', 'sett-hud', 'sett-quest', 'sett-filter', 'sett-timestamp', 'sett-interact', 'sett-items', 'sett-reload', 'sett-finger', 'sett-special']
    static inputs = ['sett-chat', 'sett-font', 'sett-speak', 'sett-3D'];
    static cur_aim;

    static onCheck(setting, curState, event) {
        mp.trigger("Menu::UpdateSetting", setting.id, setting.type == "checkbox" ? setting.checked : setting.value);
        setting.checked = !curState;
    }

    //where = 'main' || 'extra'
    static createManyToggles(where, toggles) {
        for (var index = 0; index < toggles.length; index++) 
            this.createToggle(where, ...toggles[index]);            
    }
    
    static createToggle(where, id, descr) { 
        var parent = document.getElementById(`${where}-toggle-block`);
        parent.innerHTML += /*html*/ `
        <div class="toggle-wrapper">
            <span>${descr}</span>
            <label class="sett-checkbox"  style="margin: 0; position: unset">
                <input type="checkbox" onclick="Menu.onCheck(this, this.checked)" id="sett-${id}">
                <span class="sett-checkbox-switch"></span>
            </label>
        </div>`;        
    }
    
    static setSettings(data) {
        this.setTogglesStates(data[0]);
        this.setTogglesStates(data[1]);
        this.setAim(data[2]);
        this.setColor(data[3][0], data[3][1])
    }

    static setTogglesStates(data) {
        for (var index = 0; index < data.length; index++)
            this.setToggleState(data[index][0], data[index][1]);
    }

    static setToggleState(id, state) {
        document.getElementById(id).checked = state;
    }

    static setInputsValues(data) {
        for (var index = 0; index < data.length; index++)
            this.setToggleState(data[index][0], data[index][1]);
    }

    static setInputValue(id, value) {
        document.getElementById(id).value = value;
    }

    static setAim(aim) {
        document.getElementById('aim-' + aim).click();
    }
	
	static setAimSize(value) {
		var slider = document.getElementById('sett-aimScale');
		slider.value = value;
		this.onrange(slider);
	}

    static onrange(slider) {
        var percent = (slider.value - slider.min) * 100 / (slider.max - slider.min);
        slider.style.backgroundSize = percent + '% 100%';
        document.getElementById('aim-size').innerText = slider.value;
        mp.trigger('Menu::UpdateSetting', "sett-aimScale", parseFloat(slider.value));
    }

    static oncolorcircle(circle){
        whoInvoked = circle;
        whoInvoked.scale = menu_tmpl.style.zoom;
        renderTemplate(true, 'colorpicker');
        document.addEventListener('click', this.documentClick);
    }

    static setColor(hex, alpha){
        hex = parseInt(hex.slice(1, 7), 16);
        menu_tmpl.querySelector('#menu-aim-colorpicker').setAttribute('hex', `rgba(${(hex >> 16) & 255}, ${(hex >> 8) & 255}, ${hex & 255}, ${alpha})`);
        menu_tmpl.querySelector('#menu-aim-colorpicker').style.background = `rgba(${(hex >> 16) & 255}, ${(hex >> 8) & 255}, ${hex & 255}, ${alpha})`;
    }

    static cur_sett;
    static delta;
    static max_value;
    static min_value;

    static setWheel(elem) {
        document.addEventListener('wheel', Menu.addOnWheel);
        this.cur_sett = elem;
        this.delta = this.getDelta(elem.id);
        this.checkLength(elem);
        elem.select();
    }

    static getDelta(id) {
        switch (id) {
            case 'sett-chat':
                this.max_value = 276;
                this.min_value = 0;
                return 10;
            case 'sett-font':
                this.max_value = 30;
                this.min_value = 1;
                return 1;
            case 'sett-speak':
            case 'sett-3D':
                this.max_value = 100;
                this.min_value = 0;
                return 5;
        }
    }

    // down - / up +
    static addOnWheel(event) {
        if (event.deltaY > 0) { //down
            var value = parseInt(Menu.cur_sett.value) - Menu.delta;
            Menu.cur_sett.value = value < Menu.min_value ? Menu.min_value : value;
        } else { //up
            var value = parseInt(Menu.cur_sett.value) + Menu.delta;
            Menu.cur_sett.value = value > Menu.max_value ? Menu.max_value : value;
        }
    }

    static removeWheel(setting) {
        document.removeEventListener('wheel', Menu.addOnWheel);
        this.onCheck(setting, setting.checked, event)
    }


    static checkLength(object) {
        if (object.value == '') {
            object.value = this.min_value;
            object.select();
        }
        if (object.value < this.min_value) {
            object.value = this.min_value;
            object.select();
        }
        if (object.value > this.max_value) {
            object.value = this.max_value;
            object.select();
        }
    }

    static onAim(block) {
        if (!!this.cur_aim) {
            this.cur_aim.removeAttribute("style");
            if (!!this.cur_aim.getElementsByTagName('svg')[0])
                this.cur_aim.getElementsByTagName('svg')[0].getElementsByClassName('aim-change')[0].setAttribute("fill", "rgb(111, 111, 111)")
        }
        this.cur_aim = block;
        block.style = 'background: linear-gradient(250deg, #851717, #C81212, #851717);background-size: 300% 100%;animation: selected 5s ease infinite;';
        if (!!block.getElementsByTagName('svg')[0])
            block.getElementsByTagName('svg')[0].getElementsByClassName('aim-change')[0].setAttribute("fill", "white");
        if (block.id == 'aim-1') document.querySelector('.aim-cp').style.display = 'none';
        else document.querySelector('.aim-cp').style.display = 'block';

        mp.trigger("Menu::UpdateSetting", "sett-aimType", block.id.replace("aim-", ""));
    }

    /*controls*/
    static key;
    static old_key;
    static active_block;
    static isClicked;

    static drawControls(controls) {
        document.querySelector('.controls-table').innerHTML = '';
        for (var i = 0; i < controls.length; i++)
            this.newControl(controls[i]);
    }

    //control = ['id','control-name', ['keybind']];
    static newControl(control) {
        var controls_row = document.querySelector('.controls-table').getElementsByClassName('controls-row');
        if (controls_row.length == 0) {
            var row = document.createElement('div');
            row.classList.add('controls-row');
            document.querySelector('.controls-table').append(row);
        }

        var lastRow = controls_row[controls_row.length - 1];
        lastRow.style.marginBottom = 0;
        if (lastRow.getElementsByClassName('controls-elem').length == 2) {
            lastRow.style.marginBottom = '35px';
            lastRow.getElementsByTagName('div')[1].style.marginRight = '25px';
            var row = document.createElement('div');
            row.classList.add('controls-row');
            document.querySelector('.controls-table').append(row);
            lastRow = controls_row[controls_row.length - 1];
            lastRow.style.marginBottom = 0;
        }

        var elem = document.createElement('div');
        elem.classList.add('controls-elem', 'section-bg');
        lastRow.append(elem);

        if (lastRow.getElementsByClassName('controls-elem').length == 2) {
            lastRow.getElementsByTagName('div')[1].style.marginRight = '25px';
        }

        elem.innerHTML = /*html*/ `
        <div class="controls-middle">
            <div id="${control[0]}" class="controls-block" onclick="Menu.controlClick(this)">
                <span class="controls-text">${Menu.keyByKC(control[2])}</span>
            </div>
            <span class="description-text">${control[1]}</span>
        </div>`;
    }


    static controlClick(block) {
        if (!!this.active_block)
            if (this.active_block.classList.contains('control-animation')) removeSelection();
        this.active_block = block;
        this.active_block.classList.add('control-animation');
        this.key = this.active_block.getElementsByTagName('span')[0];
        this.old_key = this.key.innerText;
        this.key.innerText = 'Новое значение';
        this.isClicked = false;
        document.getElementsByTagName('body')[0].setAttribute("onclick", "Menu.removeSelection()");
        document.getElementsByTagName('body')[0].setAttribute("onkeyup", "Menu.newKey(event)");
    }

    static removeSelection() {
        if (!this.isClicked) {
            this.isClicked = true;
            return;
        }
        if (this.key.innerText == 'Новое значение') this.key.innerText = this.old_key;
        document.getElementsByTagName('body')[0].removeAttribute("onkeyup");
        this.active_block.classList.remove('control-animation');
    }

    static newKey(event) {
        event.preventDefault();

        if (event.keyCode == 27 || event.keyCode == 91) return;

        var modifyKey = -1;

        if (event.ctrlKey && event.keyCode != 8) {
            this.key.innerText = this.keyByKC([17, event.keyCode]);
            modifyKey = 17;
        } else if (event.shiftKey && event.keyCode != 8) {
            this.key.innerText = this.keyByKC([16, event.keyCode]);
            modifyKey = 16;
        } else {
            this.key.innerText = this.keyByKC(event.keyCode);
        }

        document.getElementsByTagName('body')[0].removeAttribute("onkeyup");
        this.active_block.classList.remove('control-animation');

        mp.trigger("Menu::UpdateKeyBind", this.key.parentElement.id, modifyKey, event.keyCode == 8 ? -1 : event.keyCode);
    }

    static keyByKC(keycode) {
        if (keycode.length == 0 || keycode == 8) return 'Не назначено';

        if (keycode.length == 2)
            return keyboardMap[keycode[0]] + ' + ' + keyboardMap[keycode[1]];

        return keyboardMap[keycode];
    }

    /*help*/
    static sendHelp(which) {
        var help_text = menu_tmpl.getElementsByTagName('textarea')[which].value;
        help_text = help_text.replace(/\s+/g, ' ').trim();
        if (help_text == '') return;
        this.updateHelpMessage('');
        mp.trigger('Menu::Report::Send', help_text);
    }
    
    static lastmsg;
    static newHelpMessage(isAdmin, time, name, fulltext) {
        if (this.lastmsg != null) this.lastmsg.style.marginBottom = '25px';
        var classTemp = isAdmin ? 'menu-help-admin' : 'menu-help-user';
        var message = document.createElement('p');
        this.lastmsg = message;
        message.innerHTML = /*html*/ `<span class="${classTemp}">${name}</span>(${time})</br></br>${fulltext.replaceAll('<', '&lt;').replaceAll('>', '&gt;')}`;
        document.getElementById('menu-help-chat').append(message)
    }

    static clearHelpMessages() {
        document.getElementById('menu-help-chat').innerHTML = '';
        this.lastmsg = null;
    }

    static fillHelpRules(parent, data) {
        for (var index = 0; index < data.length; index++)
            this.newRule(parent, ...data[index]);
    }

    static newRule(idx, headline, fulltext) {
        document.querySelectorAll(`.menu-help-block`)[idx].innerHTML += /*html*/ `<div class="menu-help-rule">${headline}</div>`;
        document.querySelectorAll(`.menu-help-block`)[idx].lastChild.setAttribute('onclick', `Menu.openRule(${idx}, this.innerText, '${fulltext}')`)
    }

    static help_blocks = ['Помощь - ', ' Правила - ']
    static openRule(parent, headline, fulltext) {
        this.showHelpBlock(1);
        document.getElementById('menu-help-headline').innerText = this.help_blocks[parent] + headline;
        document.getElementById('menu-help-fulltext').innerHTML = fulltext;
    }

    static showHelpBlock(which) {
        for (var index = 0; index < 3; index++)
            document.getElementById(`menu-help-${index}`).style.display = 'none';
        if (which != -1) document.getElementById(`menu-help-${which}`).style.display = 'block';
    }

    static updateHelpMessage(value){
        var messages = menu_tmpl.querySelectorAll('textarea');
        messages[0].value = value;
        messages[1].value = value;
    }

    static onkeypress(event, which) {
        if (event.keyCode == 13) {
            event.preventDefault();
            Menu.sendHelp(which);
            event.target.blur();
        }
    }
}
test_fulltext = `<p class="help-rule-section">Раздел 1</p>abc<p class="help-rule-subsection">abc</p>abcc<p class="help-rule-section">Раздел 2</p>abc<p class="help-rule-section">Раздел 3</p>abcasbsdfasdf<p class="help-rule-subsection">abc</p><p class="help-rule-section">Раздел 4</p>abc`