var Docs = class Documents {
    static alldocs = ['passport', 'licenses', 'medbook', 'fraction', 'resume', 'vehicle'];
    static docsname = ['identification card', 'license card', 'medical card', null, 'employment history', 'vehicle registration certificate'];
    static docnav = document.querySelector('.doc-nav');
    static show(showNav, index, data) {
        this.draw();
        this.fillPassport(data[0]);
        this.fillLicense(data[1]);
        this.fillMedbook(data[2]);
        this.fillFraction(data[3]);
        this.fillResume(data[4]);
        this.fillVehicle(data[5]);
        if (!showNav) {
            this.docnav.children[index].click();
            this.docnav.style.display = 'none';
        } else {
            this.docnav.firstElementChild.click();
            this.docnav.style.display = 'flex';
        }
    }

    static draw() {
        this.docnav.parentElement.style.left = `calc(50% - 262.5px)`;
        this.docnav.parentElement.style.top = `calc(50% - 162.5px)`;
        this.docnav.innerHTML = '';
        var svgs = documents_svgs.nav;
        for (var index = 0; index < this.alldocs.length; index++) {
            var elem = this.createNav(index);
            if (index != 5) {
                elem.innerHTML = svgs[this.alldocs[index]];
                elem.classList.add('doc-nav-elem');
            }
        }
    }

    static createNav(index) {
        var elem = document.createElement('div');
        elem.id = `doc-${this.alldocs[index]}`;
        elem.setAttribute('onclick', 'Docs.navigate(this)');
        this.docnav.append(elem);
        return elem;
    }

    static lastNav;
    static navigate(elem) {
        if (!!this.lastNav) {
            this.lastNav.classList.remove('doc-nav-selected');
            document.getElementById(`${this.lastNav.id}-container`).style.display = 'none';
        }
        elem.classList.add('doc-nav-selected');
        this.lastNav = elem;
        document.getElementById(`${elem.id}-container`).style.display = 'block';
        if (this.isRotate && elem.id == 'doc-resume') this.rotate.style.display = 'block';
        else if (this.rotate) this.rotate.style.display = 'none';
    }

    static fillDocTop(container, title) {
        if (!isNaN(title)) title = this.docsname[title];
        container.innerHTML += /*html*/
            `<div class="doc-top">${documents_svgs.misc.bird}<div>blaine county<br>${title}</div>${documents_svgs.misc.mountain}</div>`;
    }
    //data = ['name', 'surname', 'sex', 'birthday', 'relship', id, 'dateofissue', visa, military]
    static fillPassport(data) {
        if (data == null) return;
        var doc = document.getElementById('doc-passport-container');
        doc.innerHTML = /*html*/ `<div class="doc-bg">${documents_svgs.doc.passport.main}</div>`
        this.fillDocTop(doc, 0);
        var military = data[7] ? documents_svgs.doc.passport.military : ``;
        var visa = data[8] ? documents_svgs.doc.passport.visa : ``;
        doc.innerHTML += /*html*/ `
        <div class="doc-data">
            ${documents_svgs.misc.portrait}
            <div style="height: 155px;">
                <div><p class="doc-static-text">Имя</p><p class="doc-nonstatic-text">${data[0]}</p></div>
                <div><p class="doc-static-text">Фамилия</p><p class="doc-nonstatic-text">${data[1]}</p></div>
                <div><p class="doc-static-text">Пол</p><p class="doc-nonstatic-text" style="margin-bottom: 0px">${data[2]}</p></div>
            </div>
            <div>
                <div><p class="doc-static-text">Дата рождения</p><p class="doc-nonstatic-text">${data[3]}</p></div>
                <div><p class="doc-static-text">Статус</p><p class="doc-nonstatic-text">${data[4]}</p></div>
                <div><p class="doc-static-text">Подпись</p><p class="doc-nonstatic-text doc-signature" style="margin-bottom: 0px">${data[1]}</p></div>
            </div>
            <div style="display:flex; flex-direction:column; justify-content:space-between;">${military}${visa}</div>
        </div>
        <div class="doc-bottom">
                <div><p class="doc-static-text">Идентификационный номер</p><p class="doc-nonstatic-text">${data[5]}</p></div>
                <div><p class="doc-static-text">Дата выдачи</p><p class="doc-nonstatic-text">${data[6]}</p></div>
        </div>`;
    }
    //data = ['name', 'surname', [[true || false x7], [true || false x7]]
    static licenseTables = [
        ['M | Мопеды', 'А | Мотоциклы', 'B | Легковые', 'C | Грузовые', 'D | Автобусы', 'F | Воздушные', 'S | Водные'],
        ['Оружие', 'Бизнес', 'Промысел (охота)', 'Адвокатура', '', '', '']
    ]
    static fillLicense(data) {
        if (data == null) return;
        var doc = document.getElementById('doc-licenses-container');
        doc.innerHTML = /*html*/ `<div class="doc-bg">${documents_svgs.doc.license}</div>`
        this.fillDocTop(doc, 1);
        doc.innerHTML += /*html*/ `
        <div class="doc-data">
            ${documents_svgs.misc.portrait}
            <div style="width:135px" id="doc-table-0">
                <div><p class="doc-static-text">Имя</p><p class="doc-nonstatic-text">${data[0]}</p></div>
            </div>
            <div style="width:135px" id="doc-table-1">
                <div><p class="doc-static-text">Фамилия</p><p class="doc-nonstatic-text">${data[1]}</p></div>
            </div>
        </div>`
        for (var index = 0; index < 2; index++) {
            var table = document.getElementById(`doc-table-${index}`);
            var rows = this.licenseTables[index];
            var ticks = data[2][index];
            for (var j = 0; j < rows.length; j++) {
                var isTick = ticks[j] ? documents_svgs.misc.tick : ``;
                var notFirst = j == 0 ? `` : `border-top: 0;`;
                table.innerHTML += /*html*/ `
                <div class="doc-table">
                    <p style="${notFirst}">${rows[j]}</p>
                    <p style="${notFirst}">${isTick}</p>
                </div>`;
            }
        }
    }
    //data = ['name', 'surname', 'diagnose', 'issued', 'doctor', 'dateofissue']
    static fillMedbook(data) {
        if (data == null) {
            document.getElementById('doc-medbook').style.display = 'none';
            return;
        }
        var doc = document.getElementById('doc-medbook-container');
        doc.innerHTML = /*html*/ `<div class="doc-bg">${documents_svgs.doc.medbook}</div>`
        this.fillDocTop(doc, 2);
        doc.innerHTML += /*html*/ `
        <div class="doc-data">
            ${documents_svgs.misc.portrait}
            <div style="width: 135px;height: 155px;">
                <div><p class="doc-static-text">Имя</p><p class="doc-nonstatic-text">${data[0]}</p></div>
                <div style="margin-top: 40px;"><p class="doc-static-text">Диагноз</p><p class="doc-nonstatic-text">${data[2]}</p></div>
            </div>
            <div style="width: 135px">
                <div><p class="doc-static-text">Фамилия</p><p class="doc-nonstatic-text">${data[1]}</p></div>
                <div style="margin-top: 40px;"><p class="doc-static-text">Выдано</p><p class="doc-nonstatic-text">${data[3]}</p></div>
            </div>
        </div>
        <div class="doc-bottom">
            <div><p class="doc-static-text">Врач</p><p class="doc-nonstatic-text">${data[4]}</p></div>
            <div><p class="doc-static-text">Дата выдачи</p><p class="doc-nonstatic-text">${data[5]}</p></div>
        </div>`;
    }
    //data = ['fraction', 'fraction-title', 'name', 'surname', 'position']
    static fillFraction(data) {
        if (data == null) {
            document.getElementById('doc-fraction').style.display = 'none';
            return;
        }
        var doc = document.getElementById('doc-fraction-container');
        doc.innerHTML = /*html*/ `<div class="doc-bg">${documents_svgs.doc[data[0]]}</div>`
        this.fillDocTop(doc, data[1]);
        doc.innerHTML += /*html*/ `
        <div class="doc-data">
            ${documents_svgs.misc.portrait}
            <div style="width: 200px;height: 155px;">
                <div><p class="doc-static-text">Имя</p><p class="doc-nonstatic-text">${data[2]}</p></div>
                <div><p class="doc-static-text">Фамилия</p><p class="doc-nonstatic-text">${data[3]}</p></div>
                <div><p class="doc-static-text">Должность</p><p class="doc-nonstatic-text" style="white-space: nowrap">${data[4]}</p></div>
            </div>
            <div style="display: flex;align-items: center;">
                ${documents_svgs.misc.chip}
            </div>
        </div>
        <div class="doc-bottom">
            <div><p class="doc-static-text">Подпись</p><p class="doc-nonstatic-text doc-signature">${data[3]}</p></div>
        </div>`;
    }
    //data = ['name', 'surname', [['position', 'organisation'] x11, ['position', 'organisation'] x11]]
    //if second arr of data[2] is null -- it must be omitted || replace with null
    static isRotate;
    static rotate;
    static fillResume(data) {
        if (data == null) return;
        var doc = document.getElementById('doc-resume-container');
        doc.innerHTML = /*html*/ `<div class="doc-bg">${documents_svgs.doc.resume}</div>`
        this.fillDocTop(doc, 4);
        doc.innerHTML += /*html*/ `
        <div class="doc-data" style="margin-top: 25px;">
            <div>
                <div><p class="doc-static-text">Имя</p><p class="doc-nonstatic-text">${data[0]}</p></div>
                <div><p class="doc-static-text">Фамилия</p><p class="doc-nonstatic-text">${data[1]}</p></div>
            </div>
            <div style="width: 305px">
                <div id="doc-table-2"></div>
                <div id="doc-table-3" style="display:none"></div>
            </div>
        </div>`;
        for (var index = 0; index < data[2].length; index++) {
            var table = document.getElementById(`doc-table-${index+2}`);
            var allrows = data[2][index]
            if (allrows == null) return;
            for (var j = 0; j < 11; j++) {
                var row = allrows[j];
                var notFirst = j == 0 ? `` : `border-top: 0;`;
                if (row == null) row = ['', ''];
                table.innerHTML += /*html*/ `
                <div class="doc-table">
                    <p style="justify-content: center;width: 200px;${notFirst}">${row[0]}</p>
                    <p style="width: 105px;${notFirst}">${row[1]}</p>
                </div>`;
            }
        }
        if (data[2].length == 2 && !this.rotate) {
            this.rotateCreate(doc.parentElement);
            this.isRotate = true;
        } else this.isRotate = false;
    }

    static rotateResume(index) {
        document.getElementById(`doc-table-${index}`).style.display = 'block';
        index = index == 2 ? 3 : 2;
        Docs.rotate.setAttribute('onclick', `Docs.rotateResume(${index})`);
        document.getElementById(`doc-table-${index}`).style.display = 'none';
    }

    static rotateCreate(parent) {
        this.rotate = document.createElement('p');
        this.rotate.setAttribute('onclick', 'Docs.rotateResume(3)');
        this.rotate.id = 'doc-rotate';
        this.rotate.innerHTML = documents_svgs.misc.rotate;
        this.rotate.style.display = 'none';
        parent.append(this.rotate);
    }
    //data = ['veh-name', 'owner', serial, owners, 'lisence plate', 'dateofissue']
    static fillVehicle(data) {
        if (data == null) return;
        var doc = document.getElementById('doc-vehicle-container');
        doc.innerHTML = /*html*/ `<div class="doc-bg">${documents_svgs.doc.vehicle}</div>`
        this.fillDocTop(doc, 5);
        doc.innerHTML += /*html*/ `
        <div class="doc-data">
            <div>
                <div><p class="doc-static-text">Название</p><p class="doc-nonstatic-text">${data[0]}</p></div>
                <div><p class="doc-static-text">Серийный номер</p><p class="doc-nonstatic-text">${data[2]}</p></div>
                <div style="margin-top: 60px;"><p class="doc-static-text">Номерной знак</p><p class="doc-nonstatic-text">${data[4]}</p></div>
            </div>
            <div>
                <div><p class="doc-static-text">Владелец</p><p class="doc-nonstatic-text">${data[1]}</p></div>
                <div><p class="doc-static-text">Было владельцев</p><p class="doc-nonstatic-text">${data[3]}</p></div>
                <div style="margin-top: 60px;"><p class="doc-static-text">Дата выдачи</p><p class="doc-nonstatic-text">${data[5]}</p></div>
            </div>
        </div>`
    }
    //data = [isCop, 'title', 'criminal', 'officer', 'date', ['text', 'text', 'text'] || null]
    static policeBlank(data) {
        var doc = document.getElementById('doc-police-container');
        this.docnav.parentElement.style.left = `calc(50% - 228px)`;
        this.docnav.parentElement.style.top = `calc(50% - 283px)`;
        doc.style.display = 'block';
        var isDisabled = data[0] ? `` : `disabled`;
        var texts = data[5];
        if (!Array.isArray(texts)) texts = Array(3).fill('');  
        //console.log(texts)       
        doc.innerHTML = /*html*/ `
        <div>blaine county<br>${data[1]}</div>
        <div>
            <div><p>Преступник:</p><p>${data[2]}</p></div>
            <div style="padding-top:15px"><p>Нарушена статья:</p><input value="${texts[0]}" ${isDisabled} autocomplete="off" spellcheck="false"/></div>
            <div style="padding-top:15px"><p>Срок ареста:</p><input value="${texts[1]}" ${isDisabled} autocomplete="off" spellcheck="false"/></div>
            <div style="padding:65px 0"><p>Комментарий<br>сотрудника:</p><textarea style="height: 85px;" maxlength="125" ${isDisabled}>${texts[2]}</textarea></div>
            <div><p>Сотрудник:</p><p>${data[3]}</p></div>
            <div style="padding-top:15px"><p>Подпись:</p><p style="color: #2537DB" class="doc-signature">${data[3].split(' ')[1]}</p></div>
            <div style="padding-top:15px"><p>Дата:</p><p>${data[4]}</p></div>
        </div>`;
        if (data[0])
            doc.lastElementChild.innerHTML += /*html*/ `
            <div class="doc-btn-wrapper">
                <button class="red-button" onclick="Docs.policeClick(0)">Подтвердить</button>
                <button class="grey-button" onclick="Docs.policeClick(1)">Отмена</button>
            </div>`;
    }

    static policeClick(which){
        var doc =  document.getElementById('doc-police-container');
        var text1 = doc.getElementsByTagName('input')[0].value;
        var text2 =doc.getElementsByTagName('input')[1].value;
        var text3 = doc.querySelector('textarea').value;
        mp.trigger('Docs::Police', which, text1, text2, text3)
    }
}

doc_data = [
    ['Jessica', 'Day', 'женский', '13.02.1982', 'свободная', 141, '13.03.2000', true, true], //passport
    ['Poison', 'Ivy', [
        [true, false, true, false, true, true, false],
        [true, false, true, false, false, false, false]
    ]], //licenses
    ['Reagan', 'Ridley', 'здорова', 'ems', 'John Dorian', '19.09.2010'], //medbook
    ['med', 'morgue card', 'Olivia', 'Moore', 'Assistant Medical Examiner'], //fraction
    ['Juliet', `O'hara`, [
        [
            ['Detective', 'LAPD'],
            ['Head Detective', 'SFPD']
        ],
        [] //must be omitted / exists only for example
    ]], //resume
    ['Buggati', 'Walter Mashbourne', 113, 0, '80085', '16.1.2005'] //vehicle
]

blank = [true, 'Sacramento Police Department', 'Piper Chapman', 'Max Black', '24.04.2004']
blank2 = [false, 'Sacramento Police Department', 'Piper Chapman', 'Max Black', '24.04.2004', ['qwer','tyuiop','zxcvb']]