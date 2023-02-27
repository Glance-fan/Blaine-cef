var MenuGar = class MenuGarage {
    static static_info = ['Кол-во мест', 'Владелец', 'Стоимость', 'Налог (час/сутки)']
    static garageIndex;
    static freeAmount;
    static personal_id = null;
    static account_money = null;
    static container = document.getElementById('menugar-container');

    //data = [name, garage_array, personal_id || null]
    static draw(data) {
        document.getElementById('menu-garage').firstElementChild.innerHTML = /*html*/ 
            `<img src="libs/svgs/misc/garage.svg"> гаражный<br>комплекс #${data[0]}`;
        this.fillAllGarages(data[1])
        if (data[2] != null) this.personal(data[2], data[3]);
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
        info.innerHTML = /*html*/ `<div></div><div style="position: absolute;right:10px;align-items: flex-end; white-space:nowrap"></div>`
        for (var index = 0; index < this.static_info.length; index++) {
            info.firstElementChild.innerHTML += /*html*/
                `<div style="font-weight: 500; white-space:nowrap">${this.static_info[index]}</div>`
            info.lastElementChild.innerHTML += /*html*/
                `<div style="font-weight: 700; white-space:nowrap;height: 18px;max-width:250px;display:flex;align-items: center;">${data[index]}</div>`
            var el = info.lastElementChild.lastChild, fs = 14;
            while (el.scrollWidth > el.offsetWidth) {
                el.style.fontSize = `${fs--}px`;
            }
        }
        if (id == this.personal_id) {
            info.firstElementChild.innerHTML += /*html*/
                `<div style="font-weight: 500; white-space:nowrap">Денег на счете</div>`
            info.lastElementChild.innerHTML += /*html*/
                `<div style="font-weight: 700; white-space:nowrap; height: 18px;" id="menugar-account">${prettyUSD(this.account_money)}</div>`
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

// menugar_data = [[100, 'Jessica Day', 5, 200000, 50, true],[1, null, 10, 500000, 600, null],[222, 'Olivia Moore', 5, 300000, 5000, false],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20],[21],[22],[228, `Abcdefghrtyquwer Abcdefghrtyquwer[#3000]`, 1337, 170402, 2040, true],[24],[25],[26],[27],[28],[29],[30],[31],[32],[33],[34],[35],[36],[37],[38],[39],[40],[41],[42],[43],[44],[45],[46],[47],[48],[49],[50],[51],[52],[53],[54],[55],[56],[57],[58],[59],[60],[61],[62],[63],[64],[65],[66],[67],[68],[69],[70],[71],[72],[73],[74],[75],[76],[77],[78],[79],[80],[81],[82],[83],[84],[85],[86],[87],[88],[89],[90],[91],[92],[93],[94],[95],[96],[97],[98],]
// MenuGar.draw([69, menugar_data, 228, 150000])