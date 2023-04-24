var CRecords = class CriminalRecords {
    //args = 'fullname', id, 'birthday', sex(t|f), [[id, 'date', period, 'section'], ]
    static fillPlayerInfo() {
        var static_info = ['Имя Фамилия', 'Идентификационный номер', 'Дата рождения', 'Пол'];
        var parent = document.getElementById('crec-player-info');
        parent.innerHTML = `<div></div><div></div>`;
        for (var index = 0, cont = 0; index < static_info.length; index++) {
            if (index == 2) cont = 1;
            parent.children[cont].innerHTML += index % 2 == 0 ? /*html*/ 
                `<div>
                    <span style="color: #868686">${static_info[index]}</span>
                    <span style="color: #FFFFFF; text-transform:uppercase;"></span>
                    <span style="color: #FFFFFF; height:17px;text-transform:uppercase;"></span>
                </div>` 
                : /*html*/
                `<div>
                    <span style="color: #868686">${static_info[index]}</span>
                    <span style="color: #FFFFFF"></span>
                </div>`;
            this.updatePlayerInfo(index, arguments[index]);
        }
        this.fillCRecords(arguments[4]);
    }

    static updatePlayerInfo(idx, value) {
        var parent = document.getElementById('crec-player-info');
        switch (idx) {
            case 0:
                var p = parent.children[0].children[0];
                value = value.split(' ');
                p.children[1].innerText = value[0];
                p.children[2].innerText = value[1];
                break;
            case 1: 
                var p = parent.children[0].children[1];
                p.lastElementChild.innerText = `#${value}`;
                break;
            case 2:
                var p = parent.children[1].children[0];
                p.children[1].innerText = value;
                break;
            case 3:
                var p = parent.children[1].children[1];
                p.lastElementChild.innerText = value ? 'Мужской' : 'Женский';
                break;
        }
    }

    static fillCRecords(data) {
        document.getElementById('crec-wrapper').innerHTML = '';
        console.log(data)

        load(data);

        async function load(data) {
            data.forEach(el => CRecords.addCRecords(...el));
        }
    }

    static addCRecords(id, date, period, section) {
        var parent = document.getElementById('crec-wrapper');
        var elem = document.createElement('div');
        elem.id = `${id}-crec-elem`;
        elem.className = 'crec-information-elem';
        elem.innerHTML = /*html*/ `
            <div style="width:150px; margin-right:2px;" id="${id}-crec-0">${date}</div>
            <div style="width:110px; margin-right:2px;" id="${id}-crec-1">${period}</div>
            <div style="width:360px; margin-right:1px;"id="${id}-crec-2">${section}</div>
            <button class="red-button" onclick="CRecords.payoffRequest(${id})">Погасить</button>`;
        parent.append(elem);
    }

    //which = 0,1,2
    static updateCRecords(id, which, value) {
        document.getElementById(`${id}-crec-${which}`).innerText = value;
    }

    static deleteCRecords(id) {
        var el = document.getElementById(`${id}-crec-elem`)
        if (el) el.remove();
    }

    static switchContainer(idx) {
        [0,1].forEach(idx => document.getElementById(`crec-${idx}-container`).style.display = 'none');
        document.getElementById(`crec-${idx}-container`).style.display = 'flex';
    }

    /*requests*/
    static searchRequest(string) {
        mp.trigger('CriminalRecords::SearchPlayer', string);
    }

    static payoffRequest(id) {
        mp.trigger('CriminalRecords::PayOff', id);
    }

    static backRequest() {
        mp.trigger('CriminalRecords::Back');
        this.switchContainer(0);
    }
}

CRecords.switchContainer(0);