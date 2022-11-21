var AuthSelect = class CharSelection {
    static data = null;
    static active_char = null;

    static fillPanel(login, regDate, bCoins, lastChar, newData) {
        document.querySelector('.char-line').style.height = document.querySelector('.info').offsetHeight + 'px';
        this.data = JSON.parse(newData);
        //this.data = newData;
        document.getElementById('rs-name').innerText = login.toUpperCase();
        document.getElementById('char-reg-date').innerText = regDate;
        document.getElementById('char-bcoins').innerText = bCoins + ' BC';
        this.showCharNames([this.data[0][0], this.data[1][0], this.data[2][0]]);
        this.setPics([this.data[0][3], this.data[1][3], this.data[2][3]]);
        this.clickChoice(document.getElementById(lastChar + '-chselect'));
    }

    static showCharNames(names) {
        for (var index = 0; index < names.length; index++) {
            if (!!names[index]) {
                var id = 'charname-' + (index + 1);
                document.getElementById(id).getElementsByTagName('span')[0].innerText = names[index].toUpperCase();
                document.getElementById(id).style.display = 'block';
            }
        }
    }

    static setPics(sex) {
        for (var index = 0; index < sex.length; index++) {
            if (sex[index] == null) return;
            document.getElementById(`no-char-${index + 1}`).style.display = 'none';
            if (!sex[index]) document.getElementById(`girl-${index + 1}`).style.display = 'block';
            else document.getElementById(`man-${index + 1}`).style.display = 'block';
        }
    }

    static clickChoice(choice) {
        var intId = parseInt(choice.id);
        if (intId == 2 && this.data[0][0] == null) return;
        if (intId == 3 && this.data[1][0] == null) return;
        for (var i = 1; i < 4; i++)
            document.getElementById(i + '-chselect').classList.remove('char-clicked');
        for (var i = 1; i < 4; i++) {
            var parent = document.getElementById(`no-char-${i}`);
            parent.querySelector('path').setAttribute('fill', '#787878');
            parent.lastElementChild.style.color = '#787878';
        }
        this.active_char = intId;
        choice.classList.add('char-clicked');
        document.getElementById('char-num').innerText = `Персонаж #${parseInt(choice.id)}`;
        this.setCharInfo(this.data[intId - 1]);
        var parent = document.getElementById(`no-char-${intId}`);
        parent.querySelector('path').setAttribute('fill', 'white');
        parent.lastElementChild.style.color = 'white';
        document.querySelector('.auth-play').focus();
    }

    static setCharInfo(character) {
        if (!!character[0] && !character[8]) {
            document.querySelector('.char-info').style.display = 'block';
            document.querySelector('.create-info').style.display = 'none';
            document.querySelector('.ban-info').style.display = 'none';
            document.querySelector('.auth-play').style.display = 'block';
            document.querySelector('.auth-play').innerText = 'Играть';
            if (character[9]) this.online();
            else this.offline("Offline");
            this.userdata(character);
        } else if (character[8]) {
            document.querySelector('.char-info').style.display = 'block';
            document.querySelector('.ban-info').style.display = 'block';
            document.querySelector('.create-info').style.display = 'none';
            document.querySelector('.auth-play').style.display = 'none';
            this.offline("Заблокирован");
            this.userdata(character);
        } else {
            document.querySelector('.auth-play').innerText = 'Создать';
            document.getElementById('char-name').innerText = 'Слот свободен!';
            document.querySelector('.char-info').style.display = 'none';
            document.querySelector('.ban-info').style.display = 'none';
            document.querySelector('.create-info').style.display = 'block';
            document.querySelector('.auth-play').style.display = 'block';
        }
    }

    static online() {
        document.getElementById('dot').setAttribute("fill", "#9CDE48");
        document.getElementById('alive').innerText = "Online";
        document.getElementById('alive').style.color = "#9CDE48";
    }

    static offline(string) {
        document.getElementById('dot').setAttribute("fill", "#C81212");
        document.getElementById('alive').innerText = string;
        document.getElementById('alive').style.color = "#C81212";
    }

    static userdata(character) {
        document.getElementById('char-name').innerText = character[0];
        document.getElementById('char-bank-cash').innerText = "$" + character[1].toLocaleString('ru');
        document.getElementById('char-cash').innerText = "$" + character[2].toLocaleString('ru');
        document.getElementById('char-sex').innerText = (character[3] ? "мужской" : "женский") + " пол";
        document.getElementById('char-age').innerText = character[4] + " лет";
        document.getElementById('char-fraction').innerText = character[5];
        document.getElementById('char-played').innerText = character[6] + " часов наиграно";
        document.getElementById('cid').innerText = "#" + character[7];
        if (character[8]) {
            document.querySelector('.bline').style.height = document.querySelector('.info').offsetHeight + 'px';
            document.getElementById('acid').innerText = "#" + character[10];
            document.getElementById('ban-for').innerText = character[11];
            document.getElementById('ban-from').innerText = "От " + character[12];
            document.getElementById('ban-to').innerText = character[13];
        }
    }

    static choiceMOver(choice) {
        switch (choice.id) {
            case '1-chselect':
                choice.classList.add('char-selected');
                break;
            case '2-chselect':
                if (!!this.data[0][0] && this.active_char != 2) choice.classList.add('char-selected');
                break;
            case '3-chselect':
                if (!!this.data[1][0]) choice.classList.add('char-selected');
                break;
        }
    }

    static choiceMOut(choice) {
        choice.classList.remove('char-selected');
    }

    static checkEnter(event) {
        if (event.keyCode === 13 && chselect_tmpl.style.display == 'flex') {
            event.preventDefault();
            document.querySelector('.auth-play').click();
        }
    }

    static play() {
        mp.trigger("Auth::CharacterChooseAttempt", this.active_char);
    }

    static settings() {
        //TBD
    }

}
//"frytech", "17.03.2022", 150, 2,[["Jenny Hezky",0,1000,true,25,"нет фракции",244.7,77, true, false, "id", "reason", "00.00.0000 00:00:00", "00.00.0000 00:00:01"],["Olivia Moore",55555555,1000,false,25,"нет",24,77, false, true],[]]