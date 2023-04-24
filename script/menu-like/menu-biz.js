var MenuBiz = class MenuBusiness {
    static draw(data) {
        this.drawNavigation();
        this.fillInformation(data[0]);
        this.fillManage(data[1]);
        this.fillStats(data[2]);
        this.selectOption(0)
    }

    static selectOption(index) {
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
                            <input value="${data[6]}" max="${data[6]}" oninput="MenuBiz.onCollectAmount(this)" autocomplete="false" spellcheck="false" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32"/>
                        </div>
                    </div>
                    <button onclick="mp.trigger('MenuBiz::Collect', MenuBiz.curCollect)" class="red-button">Забрать</button>                    
                </div>
                <div class="menubiz-info-text" style="margin-top:10px">${menubiz_static.info.at(-1)}</div>
            </div>
            <div style="display:flex; justify-content:center;margin-top: 205px;"><button onclick="mp.trigger('MenuBiz::SellToGov')" class="grey-button">Продать<br>государству</button></div>
        </div>`;
        this.curCollect = data[6];
        container = document.getElementById('menubiz-0-content-0');
        for (var index = 0; index < data.length; index++) {
            container.firstElementChild.innerHTML += /*html*/
                `<div class="menubiz-static-text">${menubiz_static.info[index]}</div>`;
            container.lastElementChild.innerHTML += /*html*/
                `<div style="text-align: right" class="menubiz-nonstatic-text">${data[index]}</div>`;
        }

        container = container.lastElementChild.children;
        container[3].innerText = prettyUSD(container[3].innerText);
        container[4].innerText = prettyUSD(container[4].innerText, true);
        container[5].innerText = `${container[5].innerText}%`;
        container[6].innerText = prettyUSD(container[6].innerText);
        container[7].innerText = prettyUSD(container[7].innerText);
        container[8].innerText = `${container[8].innerText} ед.`;
        container[9].innerText = prettyUSD(container[9].innerText);
        container[10].innerText = prettyUSD(container[10].innerText);
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
        container[6].innerText = prettyUSD(value);

        document.getElementById('menubiz-input-block').querySelector('input').value = value;
        document.getElementById('menubiz-input-block').querySelector('input').max = value;
        this.curCollect = value;
    }

    static setMoneyAccount(value) {
        var container = document.getElementById('menubiz-0-content-0').lastElementChild.children;
        container[7].innerText = prettyUSD(value);
    }

    static setMaterials(value) {
        var container = document.getElementById('menubiz-0-content-0').lastElementChild.children;
        container[8].innerText = `${value} ед.`;
    }

    static setBuyMaterials(value) {
        var container = document.getElementById('menubiz-0-content-0').lastElementChild.children;
        container[9].innerText = prettyUSD(value);
    }

    static setSellMaterials(value) {
        var container = document.getElementById('menubiz-0-content-0').lastElementChild.children;
        container[10].innerText = prettyUSD(value);
    }

    static onCollectAmount(input) {
        if (input.value == 0 || input.value == '') {
            input.value = 1;
            input.select()
        }
        if (parseInt(input.value) > parseInt(input.max)) input.value = input.max;
        this.curCollect = input.value;
    }

    //data = [[cur_charge, max_charge], isWorkers, cash_collect, commission, isOrdered, delivery_1, delivery_2] 
    //delivery_1 = pricePerOne || amount, delivery_2 = delivery_cost || delivery_status
    static amount_elems;
    static cur_charge;
    static max_charge;
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
                                        <input id="menubiz-charge" maxlength="${data[0][1].toString().length + 1}" value="${data[0][0]}" oninput="MenuBiz.onExtraCash(this, ${data[0][1]})" autocomplete="off" spellcheck="false" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32"/>
                                        <div style="height: 100%;display: flex;align-items: center;" onclick="MenuBiz.onPlus(this)">${menubiz_svgs.plus}</div>
                                    </div>
                                    <button onclick="mp.trigger('MenuBiz::ExtraCharge', MenuBiz.cur_charge)" class="red-button" style="height:25px; width:50px">ОК</button>
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
        MenuBiz.cur_charge = data[0][0];
        MenuBiz.max_charge = data[0][1];
        if (this.cur_charge == this.max_charge) this.amount_elems[2].style.opacity = 0;
        if (this.cur_charge == 0) this.amount_elems[0].style.opacity = 0;
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
                <div>${isOrdered ? `${del_1} ед.` : prettyUSD(del_1)}</div>
            </div>
            <div>
                <div>${isOrdered ? `Статус` : `Стоимость<br>доставки`}</div>
                <div>${isOrdered ? `${del_2}` : prettyUSD(del_2)}</div>
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
                    <div id="menubiz-delivery-cost">${prettyUSD(del_1 + del_2)}</div>
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
        document.getElementById('menubiz-delivery-cost').innerHTML = prettyUSD(this.materialAmount * this.materialCost + this.deliveryCost);
    }

    static onExtraCash(input, max) {
        if (input.value == 0 || input.value == '') {
            input.value = 0;
            input.select()
        }
        if (parseInt(input.value) > max) input.value = max;
        if (input.value == max) MenuBiz.amount_elems[2].style.opacity = 0;
        else MenuBiz.amount_elems[2].style.opacity = 1;
        if (input.value == 0) MenuBiz.amount_elems[0].style.opacity = 0;
        else MenuBiz.amount_elems[0].style.opacity = 1;
        MenuBiz.cur_charge = input.value;
    }

    static onPlus() {
        if (parseInt(MenuBiz.amount_elems[1].value) + 1 < MenuBiz.max_charge + 1) {
            MenuBiz.amount_elems[1].style.opacity = 1;
            MenuBiz.amount_elems[1].value++;
        }
        if (MenuBiz.amount_elems[1].value == MenuBiz.max_charge) MenuBiz.amount_elems[2].style.opacity = 0;
        MenuBiz.amount_elems[0].style.opacity = 1;
        MenuBiz.cur_charge = MenuBiz.amount_elems[1].value;
    }

    static onMinus() {
        if (parseInt(MenuBiz.amount_elems[1].value) - 1 > -1) {
            MenuBiz.amount_elems[0].style.opacity = 1;
            MenuBiz.amount_elems[1].value--
        }
        if (MenuBiz.amount_elems[1].value == 0) MenuBiz.amount_elems[0].style.opacity = 0;
        MenuBiz.amount_elems[2].style.opacity = 1;
        MenuBiz.cur_charge = MenuBiz.amount_elems[1].value;
    }

    static onCheckBox(setting) {
        mp.trigger("MenuBiz::CashCollect", !setting.checked);
    }

    static setCharge(value) {
        document.getElementById('menubiz-charge').value = value;
        this.cur_charge = value;
        if (this.cur_charge == this.max_charge) this.amount_elems[2].style.opacity = 0;
        else this.amount_elems[2].style.opacity = 1;
        if (this.cur_charge == 0) this.amount_elems[0].style.opacity = 0;
        else this.amount_elems[0].style.opacity = 1;
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
                                return prettyUSD(context.parsed.y);
                            },
                            title: function (context) {
                                return `День: ${context[0].label}`;
                            },
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        suggestedMax: 10,
                        ticks: {
                            callback: function (value, index, values) {
                                return prettyUSD(value);
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
}