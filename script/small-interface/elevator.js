var Elevator = class Elevator {
    static container = document.getElementById('elevator-container');
    static curfloor = document.getElementById('elevator-wrapper').firstElementChild;
    static btn = document.getElementById('elevator-wrapper').lastElementChild;
    static maxFloor = 100;
    static setMaxFloor(value) {
        if (value <= 0) value = 1;
        if (parseInt(this.curfloor.innerText) > value) this.curfloor.innerText = value;
        this.maxFloor = value;
    }

    static setCurrentFloor(value) {
        if (value <= 0) value = 1;
        else if (value > this.maxFloor) value = this.maxFloor;
        this.curfloor.innerText = value;
        this.btn.style.visibility = 'visible';
    }

    static draw() {
        document.getElementById('elevator').firstElementChild.innerHTML = `<img src="libs/svgs/misc/elevator.svg">лифт`
        for (var row = 0; row < elevator.length; row++) {
            this.container.innerHTML += /*html*/ `<div class="elevator-row"></div>`;
            for (var column = 0; column < elevator[row].length; column++) {
                this.container.lastElementChild.innerHTML += /*html*/ `<div>${elevator[row][column]}</div>`;
                if (elevator[row][column] === parseInt(elevator[row][column], 10))
                    this.container.lastElementChild.lastElementChild.setAttribute('onclick', `Elevator.onnumber(this.innerText)`);
            }
        }
        this.container.lastElementChild.lastElementChild.setAttribute('onclick', `Elevator.onerase()`);
        this.container.lastElementChild.firstElementChild.style.pointerEvents = 'none';
    }

    static onnumber(value) {
        if (this.curfloor.innerText == '' && value == 0) return;
        this.curfloor.innerText += value;
        this.btn.style.visibility = 'visible';
        if (parseInt(this.curfloor.innerText) > this.maxFloor) this.curfloor.innerText = this.maxFloor;
    }

    static onerase() {
        this.curfloor.innerText = this.curfloor.innerText.slice(0, -1)
        if (this.curfloor.innerText == '') this.btn.style.visibility = 'hidden';
    }

    static sendfloor() {
        mp.trigger('Elevator::Floor', parseInt(this.curfloor.innerText))
    }
}

var elevator = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ['', 0, '<img src="libs/svgs/misc/erase.svg">']
]