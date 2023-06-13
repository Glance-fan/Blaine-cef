var ActionBox = class ActionBox {
    //data = [type, fulltext, data]
    static fill(needBG, type, fulltext, data, btn_texts) {
        actionbox.firstElementChild.children[0].innerHTML = this.getBoxData(type) + fulltext;
        this.drawContainer(type, data, btn_texts);
        if (needBG) document.querySelector('.need-actionbox-bg').classList.add('action-box-bg');
    }

    static getBoxData(which) {
        switch (which) {
            case 0: //choice
            case 2: //range
            case 4: //text
                return `<img src="libs/svgs/action-box/finger.svg">`;
            case 1: //input
            case 5: //input-with-text
                return `<img src="libs/svgs/action-box/input.svg">`;
            case 3: //money
                return `<img src="libs/svgs/misc/cash.svg">`;
        }
    }

    static container;
    static drawContainer(which, data, btn_texts) {
        this.container = document.getElementById('action-box-container');
        switch (which) {
            case 0: //choice
                this.container.classList.add('action-box-choice');
                if (data.length > 4) this.container.style.width = '435px';
                else this.container.style = '';
                for (let index = 0; index < data.length; index++)
                    this.container.firstElementChild.innerHTML += /*html*/ `
                <div class="action-box-choice-elem" onclick="ActionBox.onclick(this)" id="${data[index][0]}-action-box-choice">${data[index][1]}</div>`
                this.container.firstElementChild.firstElementChild.click();
                break;
            case 1: //input
                this.container.innerHTML = /*html*/ `<textarea autocomplete="off" spellcheck="false" oninput="ActionBox.curData = this.value" maxlength="${data[0] || 250}" class="action-box-textarea" placeholder="Введите текст..."></textarea>`;
                ActionBox.curData = data[1];
                if (data[1])
                    setTimeout(() => {
                        this.container.firstElementChild.focus();
                        this.container.firstElementChild.value = data[1];
                    }, 0)
                break;
            case 2: //range
                this.container.parentElement.style.top = `calc(50% - 27px)`;
                this.container.innerHTML = /*html*/ `
                <input style="${data[1] <= data[0] ? 'direction: rtl' : ''}" type="range" min="${data[0]}" max="${data[1]}" value="${data[2] || data[1]}" step="${data[3]}" oninput="ActionBox.onrange(this)">
                <div class="action-box-span-wrapper">
                    <span>${data[4] == 1 ? prettyUSD(data[0]) : data[0]}</span>
                    <input id="action-box-range" value="${data[2] || data[1]}" oninput="ActionBox.onrangeinput(this)" autocomplete="false" spellcheck="false" min="${data[0]}" max="${data[1]}" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32"/>
                    <span style="text-align: right;">${data[4] == 1 ? prettyUSD(data[1]) : data[1]}</span>
                </div>`;
                if (data[4] == 1) remake_buttons(null, 2);
                ActionBox.onrange(this.container.firstElementChild, document.getElementById('action-box-range'));
                break;
            case 3: //money
                this.container.innerHTML = /*html*/ `<div class="actionbox-text">${data[0]}</div> `;
                remake_buttons();
                this.container.parentElement.innerHTML += /*html*/ `
                <div class="action-box-buttons" style="justify-content: center;padding-top:25px">
                    <button class="grey-button" onclick="ActionBox.onbutton(2)">Отменить</button>
                </div>`;
                break;
            case 4: //text
                this.container.innerHTML = /*html*/ `<div class="actionbox-text">${data[0]}</div> `;
                break;
            case 5: //input-with-text
                this.container.innerHTML = /*html*/
                    `<div class="actionbox-text">${data[0]}</div>
                    <input autocomplete="off" spellcheck="false" oninput="ActionBox.curData = this.value" maxlength="${data[1] || 250}" id="action-box-input" placeholder="Введите текст...">`;
                ActionBox.curData = data[2];
                if (data[2] != null)
                    setTimeout(() => {
                        this.container.lastElementChild.focus();
                        this.container.lastElementChild.value = data[2];
                    }, 0);
                break;
        }
        if (btn_texts) remake_buttons(btn_texts);

        function remake_buttons(data, type) {
            var btns = actionbox.querySelectorAll('button');
            if (!data) { //money-buttons
                btns[0].innerHTML = hud_left_svgs.cash;
                btns[1].innerHTML = hud_left_svgs.bank;
                btns.forEach(btn => {
                    btn.style.width = '80px';
                });
                if (type == 2) btns[0].parentElement.style.width = '260px';
            } else {
                btns[0].innerText = data[0] || 'Принять';
                btns[1].innerText = data[1] || 'Отменить';
            }
        }
    }

    static onrangeinput(input) {
        if (input.value == 0 || input.value == '') {
            input.value = 1;
            input.select()
        }
        if (parseInt(input.value) > parseInt(input.max)) input.value = input.max;
        ActionBox.onrange(this.container.firstElementChild, input);
    }

    static onrange(slider, input) {
        if (input && input.value >= input.min) slider.value = input.value;
        else if (!input) document.getElementById('action-box-range').value = slider.value;
        var percent = (slider.value - slider.min) * 100 / (slider.max - slider.min);
        slider.style.backgroundSize = percent + '% 100%';
        ActionBox.curData = document.getElementById('action-box-range').value;
    }

    static lastElem;
    static onclick(elem) {
        if (!!this.lastElem) this.lastElem.classList.remove('action-box-choice-selected');
        elem.classList.add('action-box-choice-selected');
        this.lastElem = elem;
        this.curData = parseInt(elem.id);
    }

    static curData;
    static onbutton(which) {
        mp.trigger('ActionBox::Reply', which, ActionBox.curData);
    }
}