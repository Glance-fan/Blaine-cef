var MenuBiz = class MenuBusiness {
    static draw(data) {
        this.drawNavigation();
        this.fillInformation(data[0]);
        this.fillManage(data[1]);
        this.fillStats(data[2]);
    }

    static selectOption(index){
        document.getElementById(`menubiz-${index}`).click();
    }

    static drawNavigation() {
        document.querySelector('.menu-biz-title').innerHTML = menubiz_nav[0][0] + menubiz_nav[0][1];
        for (var index = 1; index < menubiz_nav.length; index++) {
            var opt = document.createElement('div');
            opt.innerHTML = /*html*/ `
                <a id="menubiz-${index - 1}" onclick="MenuBiz.navigate(this)" href="#">${menubiz_nav[index][0]} ${menubiz_nav[index][1]}</a>`
            document.querySelector('.menu-biz-options').append(opt);
        }
    }

    static lastNav
    static navigate(opt) {
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

    //data = ['name', 'type', 'owner', cost, tax, sales_tax, money_register, money_account, supplies]
    static curCollect;
    static fillInformation(data) {
        var container = document.getElementById('menubiz-0-container')
        container.innerHTML = /*html*/ `
        <div>
            <div class="menubiz-section-title">Информация</div>
            <div id="menubiz-0-content-0" class="menubiz-section">
                <div></div>
                <div></div>
            </div>
        </div>
        <div style="margin-left:25px">
            <div class="menubiz-section-title">Касса</div>
            <div id="menubiz-0-content-1" class="menubiz-section">
                <div>
                    <div>
                        <span class="menubiz-static-text">Кол-во</span>
                        <div id="menubiz-input-block">
                            <span>$</span>
                            <input value="${data[7]}" max="${data[7]}" oninput="MenuBiz.onCollectAmount(this)" autocomplete="false" spellcheck="false" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32"/>
                        </div>
                    </div>
                    <button onclick="mp.trigger('MenuBiz::Collect', MenuBiz.curCollect)" class="red-button">Забрать</button>                    
                </div>
                <div class="menubiz-info-text" style="margin-top:10px">${menubiz_static.info.at(-1)}</div>
            </div>
            <div style="display:flex; justify-content:center;margin-top: 205px;"><button onclick="mp.trigger('MenuBiz::SellToGov')" class="grey-button">Продать<br>государству</button></div>
        </div>`;
        this.curCollect = data[7];
        container = document.getElementById('menubiz-0-content-0');
        for (var index = 0; index < data.length; index++) {
            container.firstElementChild.innerHTML += /*html*/
                `<div class="menubiz-static-text">${menubiz_static.info[index]}</div>`;
            container.lastElementChild.innerHTML += /*html*/
                `<div style="text-align: right" class="menubiz-nonstatic-text">${data[index]}</div>`;
        }

        container = container.lastElementChild.children;
        container[3].innerText = this.prettyUSD(container[3].innerText);
        container[4].innerText = this.prettyUSD(container[4].innerText, true);
        container[5].innerText = `${container[5].innerText}%`;
        container[6].innerText = this.prettyUSD(container[6].innerText);
        container[7].innerText = this.prettyUSD(container[7].innerText);
        container[8].innerText = `${container[8].innerText} ед.`;

    }

    static setBizName(value) {
        var container = document.getElementById('menubiz-0-content-0').lastElementChild.children;
        container[0].innerText = value;
    }

    static setSalesTax(value) {
        var container = document.getElementById('menubiz-0-content-0').lastElementChild.children;
        container[5].innerText = `${value}%`;
    }

    static setMoneyRegister(value) {
        var container = document.getElementById('menubiz-0-content-0').lastElementChild.children;
        container[6].innerText = this.prettyUSD(value);
    }

    static setMoneyAccount(value) {
        var container = document.getElementById('menubiz-0-content-0').lastElementChild.children;
        container[7].innerText = this.prettyUSD(value);
        
        document.getElementById('menubiz-input-block').querySelector('input').value = value;
        document.getElementById('menubiz-input-block').querySelector('input').max = value;
        this.curCollect = value;
    }

    static setSalesTax(value) {
        var container = document.getElementById('menubiz-0-content-0').lastElementChild.children;
        container[8].innerText = `${value} ед.`;
    }

    static onCollectAmount(input) {
        if (input.value == 0 || input.value == '') {
            input.value = 1;
            input.select()
        }
        if (parseInt(input.value) > parseInt(input.max)) input.value = input.max;
        this.curCollect = input.value;
    }

    //data = [extra_charge, isWorkers, cash_collect, commission, isOrdered, delivery_1, delivery_2] 
    //delivery_1 = pricePerOne || amount, delivery_2 = delivery_cost || delivery_status
    static amount_elems;
    static cur_extra;
    static fillManage(data) {
        var container = document.getElementById('menubiz-1-container');
        container.innerHTML = /*html*/ `
        <div id="menubiz-1-wrapper">
            <div style="display: flex;justify-content: space-between;">
                <div>
                    <div class="menubiz-section-title">Наценка на продукцию</div>
                    <div id="menubiz-1-content-0" class="menubiz-section">
                        <div>
                            <div class="menubiz-nonstatic-text menubiz-input-wrapper">
                                Наценка (%)
                                <div style="display: flex;width: 160px;justify-content: space-between;">
                                    <div style="display: flex;align-items: center;">
                                        <div style="height: 100%;display: flex;align-items: center;" onclick="MenuBiz.onMinus(this)">${menubiz_svgs.minus}</div>
                                        <input maxlength="4" value="${data[0]}" oninput="MenuBiz.onExtraCash(this)" autocomplete="off" spellcheck="false" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32"/>
                                        <div style="height: 100%;display: flex;align-items: center;" onclick="MenuBiz.onPlus(this)">${menubiz_svgs.plus}</div>
                                    </div>
                                    <button onclick="mp.trigger('MenuBiz::ExtraCharge', MenuBiz.cur_extra)" class="red-button" style="height:25px; width:50px">ОК</button>
                                </div>
                            </div>
                            <div class="menubiz-info-text" style="margin: 15px 0">
                                ${data[1] ? menubiz_static.manage[0][1] : menubiz_static.manage[0][0]}
                            </div>
                            <div class="menubiz-nonstatic-text" style="display:flex;justify-content: space-between;">
                                Инкассация кассы
                                <div class="menubiz-checkbox" onclick="MenuBiz.onCheckBox(this.firstElementChild)">
                                    <input type="checkbox" id="menubiz-cash_collect" onclick="return false"/>
                                    <span class="menubiz-checkbox-switch"></span>
                                </div>
                            </div>
                            <div class="menubiz-info-text" style="margin-top: 15px">
                                ${menubiz_static.manage[1]}
                                <span style="font-weight: 500" id="biz-commis">${data[3]}%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="menubiz-section-title">Доставка материалов</div>
                    <div id="menubiz-1-content-1" class="menubiz-section"></div>
                </div>
            </div>
            <div class="menubiz-info-text">${menubiz_static.manage.at(-1)}</div>
        </div>`
        this.fillDelivery(data[4], data[5], data[6])
        this.setCashCollect(data[2]);
        var parent = container.querySelector('input').parentElement.children;
        this.amount_elems = [parent[0].firstElementChild, parent[1], parent[2].firstElementChild];
        MenuBiz.cur_extra = data[0];
        if (data[0] == 100) this.amount_elems[2].style.opacity = 0.5;
        if (data[0] == 1) this.amount_elems[0].style.opacity = 0.5;
    }

    static setCommission(new_commision) {
        document.getElementById('biz-commis').innetText = `${new_commision}%`;
    }

    static deliveryCost;
    static materialCost;
    static materialAmount = 1;
    static fillDelivery(isOrdered, del_1, del_2) {
        var container = document.getElementById('menubiz-1-content-1');
        container.innerHTML = /*html*/ `
        <div>
            <div>
                <div>${isOrdered ? `Ваш заказ` :`Цена за 1 ед.`}</div>
                <div>${isOrdered ? `${del_1} ед.` : this.prettyUSD(del_1)}</div>
            </div>
            <div>
                <div>${isOrdered ? `Статус` : `Стоимость<br>доставки`}</div>
                <div>${isOrdered ? `${del_2}` : this.prettyUSD(del_2)}</div>
            </div>
            <div style="height: 90px;flex-direction: column;align-items: unset;${isOrdered ? `justify-content: center` : `justify-content: space-between;`}">
                ${isOrdered ? /*html*/ `<span class="menubiz-info-text">${menubiz_static.manage[2]}</span>` : 
                /*html*/`
                <div id="delivery-input-wrapper" style="width:unset;">
                    <span class="menubiz-nonstatic-text">Нужное кол-во (ед.)</span>
                    <input value ="1" oninput="MenuBiz.onMaterialAmount(this)" onfocus="this.select()" autocomplete="false" spellcheck="false" maxlength="9" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32"/>
                </div>
                <div style="align-items: center;justify-content: center;width: unset;">
                    <div>Стоимость</div>
                    <div id="menubiz-delivery-cost">${this.prettyUSD(del_1 + del_2)}</div>
                </div>`}
            </div>
            <div><button onclick="${isOrdered ? `mp.trigger('MenuBiz::Delivery', 'cancel')` : `mp.trigger('MenuBiz::Delivery', 'pay', MenuBiz.materialAmount)`}" class="red-button">${isOrdered ? `Отменить<br>заявку` : `Оплатить<br>заказ`}</button></div>
        </div>`
        this.materialCost = del_1;
        this.deliveryCost = del_2;
    }

    static onMaterialAmount(input) {
        if (input.value == 0 || input.value == '') {
            input.value = 1;
            input.select()
        }
        this.materialAmount = input.value;
        document.getElementById('menubiz-delivery-cost').innerHTML = this.prettyUSD(this.materialAmount * this.materialCost + this.deliveryCost);
    }

    static onExtraCash(input) {
        if (input.value == 0 || input.value == '') {
            input.value = 1;
            input.select()
        }
        if (parseInt(input.value) > 100) input.value = 100;
        if (input.value == 100) MenuBiz.amount_elems[2].style.opacity = 0.5;
        else MenuBiz.amount_elems[2].style.opacity = 1;
        if (input.value == 1) MenuBiz.amount_elems[0].style.opacity = 0.5;
        else MenuBiz.amount_elems[0].style.opacity = 1;
        MenuBiz.cur_extra = input.value;
    }

    static onPlus() {
        if (parseInt(MenuBiz.amount_elems[1].value) + 1 < 101) {
            MenuBiz.amount_elems[1].style.opacity = 1;
            MenuBiz.amount_elems[1].value++;
        }
        if (MenuBiz.amount_elems[1].value == 100) MenuBiz.amount_elems[2].style.opacity = 0.5;
        MenuBiz.amount_elems[0].style.opacity = 1;
        MenuBiz.cur_extra = MenuBiz.amount_elems[1].value;
    }

    static onMinus() {
        if (parseInt(MenuBiz.amount_elems[1].value) - 1 > 0) {
            MenuBiz.amount_elems[0].style.opacity = 1;
            MenuBiz.amount_elems[1].value--
        }
        if (MenuBiz.amount_elems[1].value == 1) MenuBiz.amount_elems[0].style.opacity = 0.5;
        MenuBiz.amount_elems[2].style.opacity = 1;
        MenuBiz.cur_extra = MenuBiz.amount_elems[1].value;
    }

    static onCheckBox(setting) {
        mp.trigger("MenuBiz::CashCollect", !setting.checked);
    }

    static setCashCollect(state) {
        document.getElementById('menubiz-cash_collect').checked = state;
    }

    //data = [labels_arr, cash_arr]
    static fillStats(data) {
        var container = document.getElementById('menubiz-2-container')
        container.innerHTML += /*html*/
            `<div id="menu-biz-graph-wrapper"><canvas id="menubiz-graph" width="835" height="450"></canvas>`;
        var ctx = document.getElementById('menubiz-graph').getContext('2d');
        var gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgb(200, 18, 18)');
        gradient.addColorStop(1, 'rgb(133, 23, 23)');

        var labels = data[0];
        var chartdata = {
            labels: labels,
            datasets: [{
                backgroundColor: 'rgb(255, 255, 255)',
                borderColor: gradient,
                pointBorderWidth: 5,
                pointHitRadius: 5,
                pointBorderColor: '#ffffff',
                color: '#ffffff',
                data: data[1],
            }]
        };
        var config = {
            type: 'line',
            data: chartdata,
            options: {
                tooltips: {
                    displayColors: false,
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        displayColors: false,
                        callbacks: {
                            label: function (context) {
                                return MenuBiz.prettyUSD(context.parsed.y);
                            },
                            title: function (context) {
                                return `День: ${context[0].label}`;
                            },
                        },
                    },
                },
                scales: {
                    y: {
                        ticks: {
                            callback: function (value, index, values) {
                                return MenuBiz.prettyUSD(value);
                            },
                        },
                    },
                    x: {
                        ticks: {
                            color: '#D5D4D4'
                        },
                    },
                },
            },
        };

        Chart.defaults.font.family = "Montserrat";
        Chart.defaults.color = '#ffffff';
        Chart.defaults.font.weight = "500";
        Chart.defaults.font.size = '14';
        new Chart(ctx, config);
    }

    static prettyUSD(text, countDay) {
        var num = parseInt(text);
        if (countDay) return `$${num.toLocaleString('ru')} / $${(num * 24).toLocaleString('ru')}`
        else return `$${num.toLocaleString('ru')}`
    }
}


menubiz_info = ['Магазин 24/7 #1', 'Магазин 24/7', 'Jessica Day', '500000', '15', '10', '0', '100000', '0']
menubiz_manage = [100, false, false, 5, true, 2000, 'в пути']
menubiz_chart = [
    ['27.09', '28.09', '29.09', '30.09', '01.10', '02.10', '03.10', '04.10', '05.10', '06.10', '07.10', '08.10', '09.10', '10.10', '11.10', '12.10', '13.10', '14.10', '15.10', '16.10', '17.10', '18.10', '19.10', '20.10', '21.10', '22.10', '23.10', '24.10', '25.10', '26.10'],
    [10000000, 20000000, 30000000, 80000000, 90000000, 150000000, 1000000, 110000000, 40000000, 60000000, 999999999, 9999, 1235, 99999999, 888888888, 612351, 777777777, 13456789, 987654321, 156987435, 15987643, 567894236, 338899077, 856479132, 759846321, 753945688, 654789321, 621135462, 346462346, 995511243]
]
MenuBiz.draw([menubiz_info, menubiz_manage, menubiz_chart])