var ActionBox = class ActionBox {
    //data = [type, fulltext, data]
    static fill(needBG, type, fulltext, data, btn_texts) {
        actionbox.firstElementChild.children[0].innerHTML = this.getBoxData(type) + fulltext;
        // setTimeout(() => {
            // actionbox.style.top = `calc(50% - ${actionbox.offsetHeight/2}px)`
        // }, 0)
        this.drawContainer(type, data, btn_texts);
        if (needBG) document.querySelector('.need-actionbox-bg').classList.add('action-box-bg');
    }

    static getBoxData(which) {
        switch (which) {
            case 0: //choice
                return actionbox_svgs.finger;
            case 1: //input
            case 5: //input-with-text
                return actionbox_svgs.input;
            case 2: //range
            case 4: //text
                return actionbox_svgs.finger;
            case 3: //money
                return hud_left_svgs.cash;
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

//ActionBox.fill(false, 0, 'choice-actionbox', [[17, 'maxblack'], [14, 'jeka'], [13, 'jeka'], [12, 'jeka'], [11, 'jeka']])
//ActionBox.fill(false, 1, 'input-actionbox', [250, 'default-text'])
//ActionBox.fill(false, 2, 'range-actionbox', [1, 4000, 1, 1, 1])
//ActionBox.fill(false, 3, 'money-actionbox', ['TEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERE'])
//ActionBox.fill(false, 4, 'text-actionbox', ['TEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERE'])
//ActionBox.fill(false, 5, 'input-with-text-actionbox', ['TEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEX', 250, 'default-text'])


var actionbox_svgs = {
    finger: `<svg width="22" height="33" viewBox="0 0 22 33" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.65625 5.5625C0.65625 2.54703 3.10953 0.09375 6.125 0.09375C9.14047 0.09375 11.5938 2.54703 11.5938 5.5625C11.5938 7.34203 10.7264 8.91047 9.40625 9.90906V5.5625C9.40625 3.75344 7.93406 2.28125 6.125 2.28125C4.31594 2.28125 2.84375 3.75344 2.84375 5.5625V9.90906C1.52359 8.91047 0.65625 7.34203 0.65625 5.5625ZM19.25 13.2188C18.0425 13.2188 17.0625 14.1988 17.0625 15.4062V14.3125C17.0625 13.105 16.0825 12.125 14.875 12.125C13.6675 12.125 12.6875 13.105 12.6875 14.3125V13.2188C12.6875 12.0113 11.7075 11.0312 10.5 11.0312C9.2925 11.0312 8.3125 12.0113 8.3125 13.2188V5.5625C8.3125 4.355 7.3325 3.375 6.125 3.375C4.9175 3.375 3.9375 4.355 3.9375 5.5625V16.803C3.61484 16.6159 3.24406 16.5 2.84375 16.5C1.63625 16.5 0.65625 17.48 0.65625 18.6875V21.9688C0.65625 22.4653 0.825781 22.9477 1.13531 23.3348L5.03125 29.625H18.1562L20.6642 26.0233C21.0897 25.5978 21.4375 24.7578 21.4375 24.1562V15.4062C21.4375 14.1988 20.4575 13.2188 19.25 13.2188ZM5.03125 30.7188V31.8125C5.03125 32.4162 5.52016 32.9062 6.125 32.9062H17.0625C17.6673 32.9062 18.1562 32.4162 18.1562 31.8125V30.7188H5.03125Z" fill="white"/></svg>`,
    input: `<svg width="35" height="31" viewBox="0 0 35 31" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.1667 0.333252C14.5223 0.333252 14 0.855592 14 1.49992C14 2.14425 14.5223 2.66659 15.1667 2.66659C16.629 2.66659 17.4001 3.13391 17.8631 3.7822C18.3822 4.50892 18.6667 5.67278 18.6667 7.33325V23.6666C18.6667 25.327 18.3822 26.4909 17.8631 27.2177C17.4001 27.8659 16.629 28.3333 15.1667 28.3333C14.5223 28.3333 14 28.8557 14 29.4999C14 30.1442 14.5223 30.6666 15.1667 30.6666C17.2043 30.6666 18.7666 29.9673 19.7619 28.5738C19.7861 28.54 19.8099 28.5057 19.8333 28.4712C19.8567 28.5057 19.8806 28.54 19.9048 28.5738C20.9001 29.9673 22.4623 30.6666 24.5 30.6666C25.1442 30.6666 25.6667 30.1442 25.6667 29.4999C25.6667 28.8557 25.1442 28.3333 24.5 28.3333C23.0377 28.3333 22.2666 27.8659 21.8035 27.2177C21.2844 26.4909 21 25.327 21 23.6666V7.33325C21 5.67278 21.2844 4.50892 21.8035 3.7822C22.2666 3.13391 23.0377 2.66659 24.5 2.66659C25.1442 2.66659 25.6667 2.14425 25.6667 1.49992C25.6667 0.855592 25.1442 0.333252 24.5 0.333252C22.4623 0.333252 20.9001 1.0326 19.9048 2.42597C19.8806 2.45992 19.8567 2.49418 19.8333 2.52869C19.8099 2.49418 19.7861 2.45992 19.7619 2.42597C18.7666 1.0326 17.2043 0.333252 15.1667 0.333252ZM32.6667 9.66659H25.6667V7.33325H32.6667C33.9554 7.33325 35 8.37793 35 9.66659V21.3333C35 22.622 33.9554 23.6666 32.6667 23.6666H25.6667V21.3333H32.6667V9.66659ZM14 7.33325V9.66659H2.33333V21.3333H14V23.6666H2.33333C1.04467 23.6666 0 22.622 0 21.3333V9.66659C0 8.37793 1.04467 7.33325 2.33333 7.33325H14Z" fill="white"/></svg>`,
}