var MenuGar = class MenuGarage {
    static static_info = ['Кол-во мест', 'Владелец', 'Стоимость', 'Налог (час/сутки)']
    static garageIndex;
    static freeAmount;
    static personal_id = null;
    static account_money = null;
    static container = document.getElementById('menugar-container');

    //data = [name, garage_array, personal_id || null]
    static draw(data) {
        this.fillName(data[0])
        this.fillAllGarages(data[1])
        if (data[2] != null) this.personal(data[2], data[3]);
    }

    static fillName(id) {
        document.getElementById('menu-garage').firstElementChild.innerHTML = `${menugar_svgs.main} гаражный<br>комплекс #${id}`;
        menugar_tmpl.querySelector('.close-template').innerHTML = `${menugar_svgs.close}`
    }

    static personal(id, money) {
        this.personal_id = id;
        this.account_money = money || 0;
        var el = document.getElementById(`${id}-garelem`)
        this.selectGarage(el);
        this.container.parentElement.scrollTo({
            top: el.offsetTop - 105,
            behavior: 'smooth'
        })
    }

    //data[i] = [id, 'owner' || null, capacity, cost, tax, isLocked(t|f|null)]
    static fillAllGarages(data) {
        this.container.innerHTML = '';
        this.garageIndex = 0;
        this.freeAmount = 0;
        for (var index = 0; index < Math.ceil(data.length / 8); index++) {
            this.container.innerHTML += /*html*/ `<div class="menugar-row"></div>`;
            for (var j = 0; j < 8; j++)
                try {
                    this.newGarage(this.container.lastElementChild, data[this.garageIndex][0], data[this.garageIndex][1], data[this.garageIndex][2], data[this.garageIndex][3], data[this.garageIndex][4], data[this.garageIndex][5]);
                } catch (error) {
                    break;
                }
        }
        if (data.length > 80)
            this.container.style.height = `${this.container.parentElement.scrollHeight - 5}px`;
        document.getElementById('menugar-amount').innerText = `Все гаражи [${this.freeAmount}/${data.length}]`;
        document.getElementById('menugar-wrapper').lastElementChild.style.visibility = 'hidden';
    }

    static newGarage(parent, id, owner, capacity, cost, tax, locked) {
        var el = document.createElement('div');
        el.innerText = id;
        el.id = `${id}-garelem`;
        el.classList.add('menugar-elem');
        owner != null ? el.classList.add('garelem-owned') : this.freeAmount++;
        el.setAttribute('onclick', `MenuGar.selectGarage(this)`);
        el.setAttribute('capacity', capacity);
        el.setAttribute('cost', cost);
        el.setAttribute('tax', tax);
        el.setAttribute('locked', locked);
        el.setAttribute('owner', owner || 'Государство');
        parent.append(el);
        this.garageIndex++;
    }

    static lastGar = null;
    static selectGarage(el) {
        if (this.lastGar == el) return;
        if (this.lastGar != null) this.lastGar.classList.remove('garelem-selected');
        this.lastGar = el;
        el.classList.add('garelem-selected');
        this.fillGarInfo(parseInt(el.id), [el.getAttribute('capacity'), el.getAttribute('owner'), prettyUSD(el.getAttribute('cost')), prettyUSD(el.getAttribute('tax'), true)]);
        document.getElementById('menugar-wrapper').lastElementChild.style.visibility = 'visible';
        this.fillButtons(el);
    }

    static fillGarInfo(id, data) {
        document.getElementById('menugar-garage').innerText = `Гараж #${id}`;
        var info = document.getElementById('menugar-info');
        info.style.height = '120px';
        info.innerHTML = /*html*/ `<div></div><div style="align-items: flex-end; white-space:nowrap"></div>`
        for (var index = 0; index < this.static_info.length; index++) {
            info.firstElementChild.innerHTML += /*html*/
                `<div style="font-weight: 500; white-space:nowrap">${this.static_info[index]}</div>`
            info.lastElementChild.innerHTML += /*html*/
                `<div style="font-weight: 700; white-space:nowrap">${data[index]}</div>`
        }
        if (id == this.personal_id) {
            info.firstElementChild.innerHTML += /*html*/
                `<div style="font-weight: 500; white-space:nowrap">Денег на счете</div>`
            info.lastElementChild.innerHTML += /*html*/
                `<div style="font-weight: 700; white-space:nowrap" id="menugar-account">${prettyUSD(this.account_money)}</div>`
            info.style.height = '150px';
        }
    }

    static setAccountMoney(money) {
        this.account_money = money || 0;
        if (parseInt(this.lastGar.id) == this.personal_id) 
            document.getElementById('menugar-account').innerText = prettyUSD(money);
    }

    static fillButtons(el) {
        var container = document.getElementById('menugar-info-wrapper-2');
        var id = parseInt(el.id)
        container.innerHTML = /*html*/ `
            ${el.getAttribute('owner') == 'Государство' ? /*html*/ `   
            <div>
                <button class="red-button" onclick="MenuGar.onbutton('enter', ${id})">Войти</button>
                <button class="red-button" onclick="MenuGar.onbutton('buy',  ${id})">Купить</button>
            </div>` : /*html*/ `
            <div style="justify-content: center;">
                ${el.getAttribute('locked') === 'false' || id == this.personal_id ? /*html*/ `<button class="red-button" onclick="MenuGar.onbutton('enter',  ${id})">Войти</button>`: ``}
            </div>
            ${id == this.personal_id ? /*html*/ `
            <div>
                ${el.getAttribute('locked') === 'true' ? /*html*/ `
                    <button class="red-button" onclick="MenuGar.onbutton('open',  ${id})">Открыть<br>вход</button>` : /*html*/` 
                    <button class="red-button" onclick="MenuGar.onbutton('close',  ${id})">Закрыть<br>вход</button>` }
                <button class="grey-button" onclick="MenuGar.onbutton('sell',  ${id})">Продать<br>государству</button>
            </div>` : ``}
            ` }`
    }

    static changeLocked(id, locked){
        var el = document.getElementById(`${id}-garelem`)
        el.setAttribute('locked', locked);
        this.fillButtons(el);
    }
    
    static onbutton(action, id) {
        mp.trigger('MenuGar::Action', action, id);
    }
}

var menugar_svgs = {
    main: `<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34.3298 7.3017L31.4661 0.938008C31.2093 0.367079 30.6414 0 30.0154 0H4.98489C4.35881 0 3.79096 0.367079 3.53408 0.938008L0.670416 7.3017C0.448853 7.79404 0.492127 8.36497 0.785175 8.81838C1.07822 9.2718 1.58138 9.54554 2.12123 9.54554V33.4091C2.12123 34.2877 2.83354 35 3.71216 35H10.0758H24.9245H31.2882C32.1668 35 32.8791 34.2877 32.8791 33.4091V9.54554C33.4189 9.54554 33.9219 9.27169 34.215 8.81838C34.5082 8.36508 34.5514 7.79393 34.3298 7.3017ZM6.01348 3.18185H28.9867L30.4185 6.36348H4.58175L6.01348 3.18185ZM11.6668 22.2726H23.3335V25.4545H11.6668V22.2726ZM23.3335 19.0908H11.6668V15.909H23.3335V19.0908ZM11.6668 31.8182V28.6363H23.3335V31.8182H11.6668ZM29.6972 31.8182H26.5154V14.3181C26.5154 13.4395 25.8031 12.7272 24.9245 12.7272H10.0758C9.19724 12.7272 8.48493 13.4395 8.48493 14.3181V31.8182H5.30308V9.54554H29.6972V31.8182Z" fill="white"/></svg>`,
    close: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51808 4.3459 0.761205 6.17317C0.00432903 8.00043 -0.193704 10.0111 0.192148 11.9509C0.578 13.8907 1.53041 15.6725 2.92893 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM12.71 11.29C12.8037 11.383 12.8781 11.4936 12.9289 11.6154C12.9797 11.7373 13.0058 11.868 13.0058 12C13.0058 12.132 12.9797 12.2627 12.9289 12.3846C12.8781 12.5064 12.8037 12.617 12.71 12.71C12.617 12.8037 12.5064 12.8781 12.3846 12.9289C12.2627 12.9797 12.132 13.0058 12 13.0058C11.868 13.0058 11.7373 12.9797 11.6154 12.9289C11.4936 12.8781 11.383 12.8037 11.29 12.71L10 11.41L8.71 12.71C8.61704 12.8037 8.50644 12.8781 8.38458 12.9289C8.26272 12.9797 8.13201 13.0058 8 13.0058C7.86799 13.0058 7.73728 12.9797 7.61542 12.9289C7.49356 12.8781 7.38296 12.8037 7.29 12.71C7.19627 12.617 7.12188 12.5064 7.07111 12.3846C7.02034 12.2627 6.9942 12.132 6.9942 12C6.9942 11.868 7.02034 11.7373 7.07111 11.6154C7.12188 11.4936 7.19627 11.383 7.29 11.29L8.59 10L7.29 8.71C7.1017 8.5217 6.99591 8.2663 6.99591 8C6.99591 7.7337 7.1017 7.4783 7.29 7.29C7.4783 7.1017 7.7337 6.99591 8 6.99591C8.2663 6.99591 8.5217 7.1017 8.71 7.29L10 8.59L11.29 7.29C11.4783 7.1017 11.7337 6.99591 12 6.99591C12.2663 6.99591 12.5217 7.1017 12.71 7.29C12.8983 7.4783 13.0041 7.7337 13.0041 8C13.0041 8.2663 12.8983 8.5217 12.71 8.71L11.41 10L12.71 11.29Z" fill="white"/></svg>`,
}

// menugar_data = [[100, 'Jessica Day', 5, 200000, 50, true],[1, null, 10, 500000, 600, null],[222, 'Olivia Moore', 5, 300000, 5000, false],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20],[21],[22],[228, `Jenny Hezky[#3000]`, 1337, 170402, 2040, true],[24],[25],[26],[27],[28],[29],[30],[31],[32],[33],[34],[35],[36],[37],[38],[39],[40],[41],[42],[43],[44],[45],[46],[47],[48],[49],[50],[51],[52],[53],[54],[55],[56],[57],[58],[59],[60],[61],[62],[63],[64],[65],[66],[67],[68],[69],[70],[71],[72],[73],[74],[75],[76],[77],[78],[79],[80],[81],[82],[83],[84],[85],[86],[87],[88],[89],[90],[91],[92],[93],[94],[95],[96],[97],[98],]
// MenuGar.draw([69, menugar_data, 228, 150000])