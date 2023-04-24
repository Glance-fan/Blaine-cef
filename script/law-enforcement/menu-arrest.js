var MenuArrest = class MenuArrest {
    static all_arrests = [];
    static fillArrests(title, arrests) {
        document.getElementById('menu-arrest-arrests').innerHTML = 'Список всех ' + (title ? 'задержанных' : 'заключенных');
        this.all_arrests = [];
        load(arrests);

        async function load(data) {
            data.forEach(el => MenuArrest.addArrest(...el));
        }
    }

    static addArrest(id, date, name_1, name_2) {
        this.all_arrests.push(Array.from(arguments));
        var parent = document.getElementById('menu-arrest-arrests');
        var elem = document.createElement('div');
        elem.id = `${id}-arrest-elem`;
        elem.className = 'menu-arrest-arrest-elem';
        elem.innerHTML = /*html*/ `
            <div style="width:125px;" id="${id}-arrests-0">${date}</div>
            <div style="width:290px; margin-right:2px;" id="${id}-arrests-1">${name_1}</div>
            <div style="width:275px; margin-right:3px;" id="${id}-arrests-2">${name_2}</div>
            <div class="menu-arrest-img-anim" style="height:15px" onclick="MenuArrest.moreRequest(${id})"><img src="libs/svgs/law-enforcement/more.svg"></div>`;
        parent.append(elem);
    }

    //which = 0,1,2
    static updateArrest(id, which) {
        document.getElementById(`${id}-arrests-${which}`).innerText = value;
        this.all_arrests.filter(el => el[0] == id)[0][which] = value;
    }

    static removeArrest(id) {
        document.getElementById(`${id}-arrest-elem`).remove();
        this.all_arrests.splice(this.all_arrests.indexOf(this.all_arrests.filter(el => el[0] == id)[0]), 1);
    }

    static fillArrestFull(params) {
        this.switchContainer(1);
        var parent = document.getElementById('menu-arrest-full-info');
        var static_info = ['Дата', 'Имя', 'CID', 'Сотрудник', 'Срок', 'Отсижено', 'Статьи', 'Комментарий<br>сотрудника'];
        parent.innerHTML = /*html*/ `<div></div><div></div>`;
        for (var index = 0; index < static_info.length; index++) {
            parent.firstChild.innerHTML += /*html*/ `<div>${static_info[index]}</div>`;
            parent.lastChild.innerHTML += /*html*/ `<div></div>`;
            this.updateInfoLine(index, params[index]);
        }
    }

    static updateInfoLine(which, value) {
        var elem = document.getElementById('menu-arrest-full-info').children[1].children[which];
        elem.innerText = value;
    }

    /*misc*/
    static switchContainer(idx) {
        [0, 1].forEach(idx => document.getElementById(`menuarrest-${idx}-container`).style.display = 'none');
        document.getElementById(`menuarrest-${idx}-container`).style.display = 'flex';
    }

    static onfocus(block) {
        block.style.animation = '5s ease 0s infinite normal none running selected';
    }

    static onblur(block) {
        block.style.animation = '';
    }

    static onsearch(search_str) {
        var elems = document.getElementById('menu-arrest-arrests').children;
        Array.from(elems).forEach(el => el.style = '');
        for (var index = 0, first = true; index < this.all_arrests.length; index++) {
            if (this.all_arrests[index][2].toLowerCase().includes(search_str.toLowerCase().replace(/\s+/g, ' ').trim()) || this.all_arrests[index][3].toLowerCase().includes(search_str.toLowerCase().replace(/\s+/g, ' ').trim()) || this.all_arrests[index][1].includes(search_str.trim())) {
                elems[index].style.display = 'flex';
                if (first) {
                    elems[index].style.margin = '0';
                    first = false;
                }
            } else
                elems[index].style.display = 'none';
        }

    }



    /*requests*/
    static moreRequest(id) {
        mp.trigger('MenuArrest::MoreInfo', id)
    }

    static buttonRequest(action) {
        mp.trigger('MenuArrest::Button', action);
        // action == 0 -> MenuArrest.switchContainer(0);
    }
}

MenuArrest.switchContainer(0);