var Shop = class Shop {
    static cash = document.getElementById('shop-cash');
    static bank = document.getElementById('shop-bank');
    static right_side = document.querySelector('.shop-right-side');
    static right_rect = this.right_side.children[0];
    static lastNav = null;
    static indexChoice = null;
    static lastChoices = Array(2).fill(0);
    static items_data = {};
    static search_arr;
    static containerIndex;
    static vehshop = false;
    static cur_variant_arr = [];

    static draw(which) {
        this.right_rect.style.opacity = '0';
        this.switchMoney(false);
        var shop;
        switch (which) {
            case 0: //clothes
            case 1: //clothes
            case 2: //clothes
                shop = [shops[which], clothesShop_rows, clothesShop_nav]
                break;
            case 4: //jewelery
                shop = [shops[which], jeweleryShop_rows, jeweleryShop_nav];
                break;
            case 3: //mask
            case 5: //bag
            case 6: //auto
            case 7: //auto
            case 8: //auto
            case 9: //moto
            case 10: //boat
            case 11: //helic
                shop = [shops[which], null, null];
                break;
        }
        this.fillRect(shop[0], 0);
        if (which > 5 && which < 12) this.showVehLeft();
        this.fillMenu();
        this.drawNavigation(shop[1], shop[2]);
    }

    static fillRect(data, index) {
        var rect = document.getElementsByClassName('rect-inside')[index];
        rect.parentElement.style.opacity = '1';
        rect.innerHTML = data[0] + `<p>${data[1]}</p>`;
    }

    static showVehLeft() {
        this.right_side.children[0].style.display = 'none';
        this.right_side.children[1].style.display = 'none';
        this.right_side.children[2].style.display = 'block';
        this.right_side.children[3].style.display = 'block';
        var menu = document.querySelector('.shop-menu-right');
        menu.innerHTML = /*html*/ `<button id="shop-testdrive" class="red-button" onclick="Shop.testdriveRequest()" style="margin-bottom: 10px;">${shop_svgs.misc.testdrive}</button>${menu.innerHTML}`
        menu.firstElementChild.style.display = 'none';
        this.vehshop = true;
    }

    static fillMenu() {
        this.cash.innerHTML = shop_svgs.misc.cash + `<p></p>`;
        this.bank.innerHTML = shop_svgs.misc.bank + `<p></p>`;
        document.getElementById('shop-quit').innerHTML = shop_svgs.misc.exit;
    }

    static drawNavigation(allowed_rows, nav_svg) {
        document.querySelector('.shop-nav').innerHTML = '';
        if (allowed_rows == null) {
            document.querySelector('.shop-nav').innerHTML += /*html*/ `<span id="0-shop-nav" onclick="Shop.navigate(this)"><span>`
            document.querySelector('.shop-nav').style.height = '540px';
            var container = this.newContainer(0);
            container.style.display = 'block';
            return;
        }

        var svg_index = 0;
        for (var i = 0; i < allowed_rows.length; i++) {
            var row = document.createElement('div');
            row.classList.add('shop-nav-row');
            document.querySelector('.shop-nav').append(row);
            for (var j = 0; j < allowed_rows[i]; j++)
                this.newNavElem(row, nav_svg, svg_index++);
        }
        this.lastChoices = Array(svg_index + 1).fill(0);
    }

    static drawSearch(index) {
        this.search_arr = this.items_data[index];
        this.containerIndex = index;
        var search_block = document.querySelector('.shop-search-block');
        search_block.style.display = 'flex';
        search_block.innerHTML = shop_svgs.misc.search;
        var search_bar = document.createElement('input');
        search_bar.placeholder = 'Поиск';
        search_bar.spellcheck = false;
        search_bar.autocomplete = false;
        search_bar.id = 'shop-search';
        search_bar.setAttribute('onblur', 'Shop.blurSearch(this)')
        search_bar.setAttribute('oninput', 'Shop.inputSearch(this)')
        search_block.append(search_bar);
    }

    static in_search = false;
    static focusSearch(block) {
        block.style.animation = '5s ease 0s infinite normal none running selected';
        block.querySelector('input').focus();
        this.in_search = true;
    }

    static blurSearch(search) {
        search.parentElement.style.animation = '';
        this.in_search = false;
    }

    static inputSearch(search) {
        var data = this.search_arr;
        var temp_data = [];
        for (var index = 0; index < this.search_arr.length; index++) {
            if (data[index][1].toLowerCase().includes(search.value.toLowerCase().replace(/\s+/g, ' ').trim())) temp_data.push(data[index])
        }
        this.fillContainer(this.containerIndex, temp_data, true);
        if (this.lastChoices[this.containerIndex] != 0) try {
            document.getElementById(this.lastChoices[this.containerIndex]).click();
        } catch (error) {

        }
    }

    static newContainer(id) {
        var container = document.createElement('div');
        this.items_data[id] = [];
        container.id = id + '-shop-container';
        container.setAttribute('name', '0-choice');
        document.querySelector('.shop-containers').firstElementChild.append(container);
        return container;
    }

    static newNavElem(parent, svgs, id) {
        var elem = document.createElement('div');
        elem.classList.add('shop-nav-elem', 'dark-gray');
        parent.append(elem);
        elem.innerHTML = svgs[id];
        elem.id = id + '-shop-nav';
        elem.setAttribute('onclick', 'Shop.navigate(this)');
        elem.setAttribute('onmouseenter', 'Shop.brighter(this)');
        elem.setAttribute('onmouseleave', 'Shop.darker(this)');
        this.newContainer(id);
    }

    static navigate(elem) {
        if (elem == this.lastNav) return;
        document.getElementById('variants-container').innerHTML = '';
        var index = elem.id.split('-')[0];
        var container = document.getElementById(index + '-shop-container');
        container.style.display = 'block';
        if (this.items_data[index]) {
            this.fillContainer(index, this.items_data[index], true)
            this.drawSearch(index);
            document.querySelector('#shop-search').value = '';
        } else document.querySelector('.shop-search-block').style.display = 'none';
        var choice = document.getElementById(this.lastChoices[index]);
        this.colorNavElem(elem);

        this.navigationRequest(parseInt(index));
        var shop_selection = container.parentElement.parentElement;
        if (!!choice) {
            choice.click();
            shop_selection.scrollTo({
                top: choice.offsetTop - 155,
                behavior: 'smooth'
            })
        } else {
            this.right_rect.style.opacity = '0';
            this.switchMoney(false);
        }

        if (container.scrollHeight > container.clientHeight) {
            shop_selection.style.paddingLeft = '5px';
            shop_selection.style.marginLeft = '-5px';
        } else {
            shop_selection.style.paddingLeft = '0px';
            shop_selection.style.marginLeft = '0px';
        }
    }

    //items[i] = [id, 'name', cost, variants || maxspeed, chageable(t|f) || [slots, weight] || maxtank, cruise, autopilot, maxtrunk, maxweight]  
    static fillContainer(id, items, refill) {
        var var_container = document.getElementById(`variants-container`);
        var_container.parentElement.style.height = `525px`;
        var_container.innerHTML = '';
        document.querySelector('.shop-right-side').querySelector('.top-rect').style.opacity = 0;
        var container = document.getElementById(`${id}-shop-container`);
        container.innerHTML = '';
        for (var i = 0; i < items.length; i++) {
            if (!refill) this.items_data[id].push(items[i]);
            this.newChoiceElem(container, items[i][0], items[i][1], items[i].slice(2, items[i].length));
        }
        if (this.vehshop && !this.in_search) container.firstElementChild.click();
        if (Array.from(container.parentElement.children).length == 1)
            document.getElementById('0-shop-nav').click();
        
        setTimeout(()=>{
            var blur_heigth = items.length > 0 ? container.lastElementChild.offsetTop - 155 : 0;
            container.parentElement.style.height = blur_heigth > 525 ? `${blur_heigth}px` : `525px`;
        }, 0)
    }

    static newChoiceElem(parent, id, name, params) {
        if (!!parent.lastChild) parent.lastChild.setAttribute('style', 'margin-bottom:5px')
        var choice = document.createElement('div');
        choice.classList.add('shop-choice', 'dark-gray');
        parent.append(choice);
        if (id != 'clear') choice.id = id;
        else choice.id = `${id}-${parent.id.replace('-shop-container', '')}`;
        choice.innerText = name;

        if (this.cur_variant_arr[id]) choice.cur_variant = this.cur_variant_arr[id];
        else choice.cur_variant = '0-variant';

        choice.setAttribute('onclick', 'Shop.selectChoiceElem(this)');
        choice.setAttribute('cost', params[0]);
        if (!this.vehshop) {
            choice.setAttribute('variants', params[1]);
            choice.setAttribute('changeable', params[2]);
            choice.setAttribute('type', typeof params[2]);
        } else {
            choice.setAttribute('maxspeed', params[1]);
            choice.setAttribute('maxtank', params[2]);
            choice.setAttribute('cruise', params[4]);
            choice.setAttribute('autopilot', params[4]);
            choice.setAttribute('maxtrunk', params[5]);
            choice.setAttribute('maxweight', params[6]);
        }
    }

    static selectChoiceElem(choice) {
        this.colorSelected(choice);
        if (this.vehshop) {
            mp.trigger("Shop::Choose", choice.id);
            var show = choice.getAttribute('maxtrunk') == 0 ? false : true;
            document.querySelector('.shop-menu-right').firstElementChild.style.display = 'block';
            var container = document.querySelector('.shop-veh-rect');
            container.style = show ? 'display: block;' : 'display: flex;flex-direction: column;justify-content: center;';
            container.innerHTML = /*html*/ `
            <div>${shop_svgs.misc.sett}</div>
            <div>
                <span style="color:white">Макс. скорость</span>
                <br>${choice.getAttribute('maxspeed')} км/ч
            </div>
            <div>
                <span style="color:white">Емкость бака</span>
                <br>${choice.getAttribute('maxtank')} л.
            </div>
            <div>
                <span style="color:white">Круиз-контроль</span>
                <br>${choice.getAttribute('cruise') === 'true' ? `есть` : `нет`}
            </div>
            <div>
                <span style="color:white">Автопилот</span>
                <br>${choice.getAttribute('autopilot') === 'true' ? `есть` : `нет`}
            </div>
            <div style="padding: 25px 0 10px 0; ${show ? 'display: block;' : 'display: none;'}">${shop_svgs.misc.dots}</div>
            <div style="${show ? 'display: block;' : 'display: none;'}">
                <span style="color:white">Объем багажника</span>
                <br>${choice.getAttribute('maxtrunk')} слотов
            </div>
            <div style="${show ? 'display: block;' : 'display: none;'}">
                <span style="color:white">Максимальный вес</span>
                <br>${choice.getAttribute('maxweight')} кг.
            </div>`;
            document.querySelector('.shop-colorpicker').style.visibility = 'visible';
        } else {
            switch (choice.getAttribute('type')) {
                case 'object':
                    var data = choice.getAttribute('changeable').split(',');
                    right_rect_data[1][1] = /*html*/ `
                    <span style="color:white">Количество слотов</span><br>${data[0]}<br>
                    <span style="color:white">Максимальный вес</span><br>${data[1]} кг.`;
                    this.fillRect(right_rect_data[1], 1);
                    break;
                case 'boolean':
                    if (choice.getAttribute('changeable') === 'true') {
                        this.fillRect(right_rect_data[0], 1);
                        document.querySelector('.changeable').name = choice.id;
                    } else this.right_rect.style.opacity = '0';
                    break;
            }

            var variants = parseInt(choice.getAttribute('variants'))
            var container = document.getElementById('variants-container');
            container.innerText = '';
            container.style.display = 'block';
            for (var index = 0; index < variants; index++)
                this.newVariantElem(container, index, choice.id);

            if (variants == 0) {
                this.switchMoney(false);
                container.parentElement.style.height = `525px`;
                mp.trigger("Shop::ClearChoice");
                return;
            }

            var container_parent = container.parentElement.parentElement;
            var blur_heigth = container.lastElementChild.offsetTop - 155;
            if (blur_heigth > 525) container.parentElement.style.height = `${blur_heigth}px`;
            else container.parentElement.style.height = `525px`;
            document.getElementById(choice.cur_variant).click();
            container_parent.scrollTo({
                top: document.getElementById(choice.cur_variant).offsetTop - 155,
                behavior: 'smooth'
            })
            if (container.scrollHeight > container.clientHeight) {
                container_parent.style.paddingRight = '5px';
                container_parent.style.marginRight = '10px';
            } else {
                container_parent.style.paddingRight = '0px';
                container_parent.style.marginRight = '15px';
            }
        }

        this.switchMoney(true);
        var cost = prettyUSD(parseInt((parseInt(choice.getAttribute('cost')) * this.coef).toFixed(2)));
        this.cash.lastElementChild.innerText = cost;
        this.bank.lastElementChild.innerText = cost;
    }

    static newVariantElem(parent, id, data) {
        if (!!parent.lastChild) parent.lastChild.setAttribute('style', 'margin-bottom:5px')
        var variant = document.createElement('div');
        variant.classList.add('shop-choice', 'dark-gray');
        parent.append(variant);
        variant.id = id + '-variant';
        variant.innerText = 'Вариант #' + (id + 1);
        variant.setAttribute('onclick', 'Shop.selectVariantElem(this)');
        variant.setAttribute('data', data);
    }

    static selectVariantElem(variant) {
        this.colorSelected(variant);
        var id = variant.getAttribute('data');
        this.cur_variant_arr[id] = variant.id;
        document.getElementById(id).cur_variant = variant.id;
        this.variantRequest(id, parseInt(variant.id))
    }

    static colorSelected(elem) {
        this.indexChoice = elem.parentElement.id.split('-')[0];
        this.lastChoice = document.getElementById(this.lastChoices[this.indexChoice]);
        elem.style.color = 'white';
        elem.classList.add('shop-selected')

        if (!!this.lastChoice && this.lastChoice != elem) {
            if (this.lastChoice.getAttribute('style')) this.lastChoice.classList.remove('shop-selected');
            this.lastChoice.style.color = '';
        }

        this.lastChoices[this.indexChoice] = elem.id;
    }

    static colorNavElem(elem) {
        var paths = elem.getElementsByTagName('path');
        elem.classList.add('shop-selected')

        for (var i = 0; i < paths.length; i++)
            if (paths[i].hasAttribute('fill')) paths[i].setAttribute("fill", "#fff");

        if (!!this.lastNav) {
            paths = this.lastNav.getElementsByTagName('path');

            this.lastNav.classList.remove('shop-selected');
            for (var i = 0; i < paths.length; i++)
                if (paths[i].hasAttribute('fill')) paths[i].setAttribute("fill", "#bbb");

            var id = this.lastNav.id.split('-')[0] + '-shop-container';
            document.getElementById(id).style.display = 'none';
        }

        this.lastNav = elem;
    }



    /*misc*/
    static switchHelp(status) {
        var help = document.querySelector('.shop-help');
        if (status) help.style.display = 'block';
        else help.style.display = 'none';
    }

    static switchMoney(status) {
        var money = document.querySelector('.shop-menu-left');
        if (status) money.style.opacity = 1;
        else money.style.opacity = 0;
    }

    static coef = 1;
    static priceCoef(new_coef) {
        this.coef = new_coef;
        if (document.querySelector('.shop-menu-left').style.opacity != 0) {
            var el = document.querySelector('.shop-selected');
            var cost = prettyUSD(parseInt((parseInt(el.getAttribute('cost')) * this.coef).toFixed(2)));
            this.cash.lastElementChild.innerText = cost;
            this.bank.lastElementChild.innerText = cost;
        }
    }

    static brighter(elem) {
        if (!!this.lastNav && elem == this.lastNav) return;
        var paths = elem.getElementsByTagName('path');
        for (var i = 0; i < paths.length; i++)
            if (paths[i].hasAttribute('fill')) paths[i].setAttribute("fill", "#ddd");
    }

    static darker(elem) {
        if (!!this.lastNav && elem == this.lastNav) return;
        var paths = elem.getElementsByTagName('path');
        for (var i = 0; i < paths.length; i++)
            if (paths[i].hasAttribute('fill')) paths[i].setAttribute("fill", "#bbb");
    }

    static oncolorcircle(circle) {
        whoInvoked = circle;
        whoInvoked.scale = shop_tmpl.style.zoom || 1;
        renderTemplate(true, 'colorpicker');
        document.addEventListener('click', this.documentClick);
    }



    /*requests*/
    // sends whenever navigation elem is clicked
    static navigationRequest(nav_id) {
        mp.trigger("Shop::NavChange", nav_id);
    }

    // sends on variant click
    static variantRequest(id, variant) {
        mp.trigger("Shop::Choose", id, variant);
    }

    // sends on changeable click
    static changeableRequest(id) {
        if (document.querySelector('.shop-right-side').querySelector('.top-rect').style.opacity == 0) return;
        mp.trigger("Shop::Action", id);
    }

    // sends on quit button click
    static quitRequest() {
        mp.trigger("Shop::Close");
    }

    //send on bank + cash request
    static payRequest(pay_method) {
        if (document.querySelector('.shop-menu-left').style.opacity == 0) return;
        mp.trigger("Shop::Buy", pay_method);
    }

    static testdriveRequest() {
        mp.trigger("Shop::TestDrive");
    }
}