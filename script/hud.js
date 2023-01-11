var Hud = class Hud {
    static timeElem = document.getElementById('hud-time');
    static dayElem = document.getElementById('hud-date');
    static timeInterval = setInterval(() => {
        this.timeServer()
    }, 10000);
    static help_data = [
        [hud_help_svgs.chat, hud_help_svgs.mic, hud_help_svgs.menu, hud_help_svgs.inv, hud_help_svgs.phone, hud_help_svgs.engine, hud_help_svgs.manual],
        ['t', 'tab', 'm', 'i', 'p', 'n', 'f10']
    ]
    static speedometer;
    static canvas = document.getElementById('spd-canvas');
    static spd_first = document.getElementById('speed-first');
    static spd_second = document.getElementById('speed-second');
    static spd_third = document.getElementById('speed-third');
    static fuel_amount = document.getElementById('spd-fuel-amount');
    static lmileadge = document.getElementById('mileage-left');
    static rmileage = document.getElementById('mileage-right');
    static cruise = document.getElementById('cruise-control');
    static spdmtr_states = [document.getElementById('spd-arrow-left'), document.getElementById('spd-arrow-right'), document.getElementById('spd-doors'), document.getElementById('spd-lights'), document.getElementById('spd-belt'), document.getElementById('spd-engine')];
    static beltOffSound = new Audio('libs/sounds/beltoff.mp3');
    static hud_states = [document.getElementById('hud-food'), document.getElementById('hud-mood'), document.getElementById('hud-sick'), document.getElementById('hud-wounded'), document.getElementById('hud-snorkel'), document.getElementById('hud-shield'), document.getElementById('hud-fish')];
    static cash = document.getElementById('hud-cash');
    static bank = document.getElementById('hud-bank');
    static street = document.getElementById('hud-street');
    static city = document.getElementById('hud-city');
    static ammo = document.getElementById('hud-ammo');
    static micro = document.querySelector('.hl-micro');
    static ammo_block = document.querySelector('.hl-ammo');
    static menu = document.getElementById('hud-menu');


    /*top*/
    static setTop(data) {
        this.setServerLogo(data[0]);
        this.setPlayerId(data[1]);
        this.setOnline(data[2]);
        this.setTime(data[3])
    }

    static setServerLogo(string) {
        document.getElementById('hud-logo').src = `libs/img/logotypes/${string}.png`;
    }

    static setPlayerId(id) {
        document.getElementById('player-id').innerText = 'ID:' + id;
    }

    static setOnline(online) {
        document.getElementById('player-online').innerText = online;
    }

    static setTime(status) {
        if (status) {
            clearInterval(this.timeInterval);
            this.timeServer();
            this.timeInterval = setInterval(() => {
                this.timeServer()
            }, 10000);
        } else {
            clearInterval(this.timeInterval);
            this.timeLocal();
            this.timeInterval = setInterval(() => {
                this.timeLocal()
            }, 10000);
        }
    }

    static timeServer() {
        var date = new Date();
        var utc = 3;
        var hours = date.getUTCHours() + utc;
        this.timeElem.innerHTML = hud_top_svgs.server;
        this.timeElem.innerHTML += (hours > 24 ? "0" : "") + (hours > 24 ? hours - 24 : hours) + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

        var today = new Date().toLocaleString("ru", {
            timeZone: "Europe/Moscow"
        });
        this.dayElem.innerHTML = String(today.substr(0, 10));
    }

    static timeLocal() {
        var data = new Date();
        var Hours = data.getHours();
        if (Hours < 10) Hours = "0" + Hours;

        var Minutes = data.getMinutes();
        if (Minutes < 10) Minutes = "0" + Minutes;

        this.timeElem.innerHTML = hud_top_svgs.local;
        this.timeElem.innerHTML += " " + Hours + ":" + Minutes;

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        this.dayElem.innerHTML = dd + '.' + mm + '.' + yyyy;
    }

    /*quest*/
    //quest = ['Квестодатель', 'Название задания', 'Название цели', Тип квеста] 
    static drawQuest(quest) {
        var elem = document.querySelector('.hud-quest-content');
        document.querySelector('.hud-quest-line').className = `hud-quest-line quest-grad-type-${quest[3]}`;
        elem.innerHTML =
            /*html*/
            `<h1 class="hud-quest-top">
                ${hud_quest_svg}
                <div>
                    <p class="hud-quest-text">${quest[0]}</p>
                    <p class="hud-quest-extra-text">${quest[1]}</p>
                </div>
            </h1>
            <p class="hud-quest-middle hud-quest-text">
                <span class="hud-quest-headline">Цель</span>
                <span style="margin-top: 3px;">${quest[2]}</span>
            </p>`;
    }

    /*help*/
    static drawHelp() {
        hud_help.innerHTML = ``;
        for (var index = 0; index < this.help_data[0].length; index++) {
            var row = document.createElement('div');
            row.classList.add('hud-help-row');
            hud_help.append(row);
            row.innerHTML = /*html*/
                `<div class="hud-help-img-block">
                    <div class="hud-help-img-wrapper">${this.help_data[0][index]}</div>
                </div>
                <div class="hud-help-text-block">${this.help_data[1][index]}</div>`;
        }
    }

    static changeHelpKey(index, key){
        this.help_data[1][index] = key;
        this.drawHelp();
    }

    /*speedometer*/
    static createSpeedometer(maxSpeed) {
        this.canvas.setAttribute('height', '225px');
        this.canvas.setAttribute('width', '225px');
        var opts = {
            lines: 12,
            angle: 0.33,
            lineWidth: 0.05,
            pointer: {
                length: 0.9,
                strokeWidth: 0.035,
                color: '#C81212'
            },
            colorStart: '#C81212',
            colorStop: '#C81212',
            strokeColor: '#232323',
            shadowColor: '#232323',
            generateGradient: true
        };
        this.speedometer = new Donut(this.canvas).setOptions(opts);
        this.speedometer.setOptions(opts);
        this.speedometer.maxValue = maxSpeed;
        this.speedometer.setMinValue(0);
        this.speedometer.set(0);
    }

    static updateSpeedometer(maxSpeed) {
        this.speedometer.maxValue = maxSpeed;
    }

    static setSpeed(number) {
        var a = ~~(number / 100);
        var b = ~~((number - a * 100) / 10);
        var c = number - a * 100 - b * 10;
        this.spd_first.innerText = a;
        this.spd_second.innerText = b;
        this.spd_third.innerText = c;
        if (number < 10) {
            this.spd_first.style.color = '#595959';
            this.spd_second.style.color = '#595959';
            this.spd_third.style.color = 'white';
        } else if (number > 9 && number < 100) {
            this.spd_first.style.color = '#595959';
            this.spd_second.style.color = 'white';
            this.spd_third.style.color = 'white';
        } else {
            this.spd_first.style.color = 'white';
            this.spd_second.style.color = 'white';
            this.spd_third.style.color = 'white';
        }
    }

    static setFuel(text) {
        this.fuel_amount.innerText = text + ' л';
    }

    static setMileage(number) {
        var k1 = ~~(number / 1000);
        if (k1 < 10) {
            this.lmileadge.innerText = "00" + k1;
        } else if (k1 > 9 && k1 < 100) {
            this.lmileadge.innerText = "0" + k1;
        } else {
            this.lmileadge.innerText = k1;
        }
        var k2 = number - (k1 * 1000);
        if (k2 < 10) {
            this.rmileage.innerText = "00" + k2;
        } else if (k2 > 9 && k2 < 100) {
            this.rmileage.innerText = "0" + k2;
        } else {
            this.rmileage.innerText = k2;
        }
    }

    static updateSpeed(curSpeed) {
        this.speedometer.set(curSpeed);
        this.setSpeed(curSpeed);
    }

    static switchCruiseControl(status) {
        if (status != null) {
            if (status) this.cruise.style.opacity = 1;
            else this.cruise.style.opacity = 0.4;
        } else this.cruise.style.opacity = 0;
    }

    //0 - left-arrow, 1 - right-arrow, 2 - doors, 3 - lights, 4 - belt, 5 - engine
    static setSpdmtrState(state, status) {
        if (status) this.spdmtr_states[state].style.opacity = 1;
        else this.spdmtr_states[state].style.opacity = 0.4;
    }

    static playBeltOff(status) {
        this.beltOffSound.loop = true;
        this.beltOffSound.volume = 0.15;
        if (status) {
            this.beltOffSound.play();
        } else {
            this.beltOffSound.pause();
            this.beltOffSound.currentTime = 0.0;
        }
    }

    /*left*/
    static setCash(newCash) {
        this.cash.innerText = '$' + Number.parseInt(newCash).toLocaleString('ru');
    }

    static setBank(newBank) {
        this.bank.innerText = '$' + Number.parseInt(newBank).toLocaleString('ru');
    }

    static setLocation(newStreet, newCity) {
        this.street.innerText = newStreet;
        this.city.innerText = newCity;
    }

    static switchMicro(status) {
        if (status != null) {
            if (status) this.micro.innerHTML = hud_left_svgs.microOn;
            else this.micro.innerHTML = hud_left_svgs.microOff;
        } else this.micro.innerHTML = hud_left_svgs.microMute;
    }

    //0 - food, 1 - mood, 2 - sick, 3 - wounded, 4 - snorkel, 5 - sheild, 6 - fish
    static setState(state, status) {
        if (status) this.hud_states[state].style.display = 'block';
        else this.hud_states[state].style.display = 'none';
    }

    static setAmmo(curAmmo) {
        this.ammo.innerText = curAmmo;
    }

    static switchAmmo(status) {
        if (status) this.ammo_block.style.display = 'flex';
        else this.ammo_block.style.display = 'none';
    }

    static changeLBHpos(left, bottom) {
        hud_left.style.left = `${left}%`;
        hud_left.style.bottom = `${bottom}%`;
    }

    /*interact*/
    static drawInteract(content, keycode) {
        hud_interact.firstElementChild.innerText = keycode;        
        hud_interact.lastElementChild.innerText = content;
        setTimeout(() => {
            this.positionInteract(hud_interact)
        }, 0);
    }

    static positionInteract(hud_interact) {
        var shift = hud_interact.getBoundingClientRect().width / 2;
        hud_interact.style.left = `calc(50% - ${shift}px)`;
    }

    static requestInteract(event, keycode) {
        if (event.keyCode != keycode) //btn pressed 
            return;
        mp.trigger("Interaction::Invoke");
    }

    /*menu*/
    //data= [[enum,'action'], [enum2,'action2'], [enum3, 'action3']]
    static drawMenu(data) {
        this.menu.innerHTML = '';
        for (var index = 0; index < data.length; index++)
        this.menu.innerHTML += /*html*/ `<span onclick="mp.trigger('HUD::Menu::Action', ${data[index][0]})">${data[index][1]}</span>`;
    }
    
    static positionMenu(x, y) {
        this.menu.style.left = `${x}px`;
        this.menu.style.top =  `${y}px`;
    }
}