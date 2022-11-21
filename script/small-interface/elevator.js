var Elevator = class Elevator {
    static container = document.getElementById('elevator-container');
    static curfloor = document.getElementById('elevator-wrapper').firstElementChild;
    static btn = document.getElementById('elevator-wrapper').lastElementChild;
    static draw() {
        document.getElementById('elevator').firstElementChild.innerHTML = `${elevator_svgs.main}лифт`
        for (var row = 0; row < elevator.length; row++) {
            this.container.innerHTML += /*html*/ `<div class="elevator-row"></div>`;
            for (var column = 0; column < elevator[row].length; column++) {
                this.container.lastElementChild.innerHTML += /*html*/ `<div>${elevator[row][column]}</div>`;
                if (elevator[row][column] === parseInt(elevator[row][column], 10))
                    this.container.lastElementChild.lastElementChild.setAttribute('onclick', `Elevator.onnumber(this.innerText)`);
            }
        }
        this.container.lastElementChild.lastElementChild.setAttribute('onclick', `Elevator.onerase()`);
        this.container.lastElementChild.firstElementChild.style.pointerEvents='none';
    }

    static onnumber(value) {
        if (this.curfloor.innerText == '' && value == 0) return;
        this.curfloor.innerText += value;
        this.btn.style.visibility = 'visible';
        if (parseInt(this.curfloor.innerText) > 100) this.curfloor.innerText = 100;
    }

    static onerase() {
        this.curfloor.innerText = this.curfloor.innerText.slice(0, -1)
        if (this.curfloor.innerText == '') this.btn.style.visibility = 'hidden';
    }

    static sendfloor() {
        mp.trigger('Elevator::Floor', parseInt(this.curfloor.innerText))
    }
}


var elevator_svgs = {
    'main': `<svg width="23" height="35" viewBox="0 0 23 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.95876 15.2849H20.0412C20.7791 15.2849 21.4553 14.8729 21.7934 14.2169C22.1317 13.5613 22.0753 12.7713 21.6475 12.1701L13.8482 1.21107C13.3075 0.451475 12.4324 0 11.4999 0C10.5674 0 9.6923 0.451334 9.15154 1.21107L1.3524 12.1701C0.924586 12.7714 0.868257 13.5613 1.20651 14.2169C1.54462 14.8729 2.22085 15.2849 2.95876 15.2849Z" fill="white"/><path d="M20.0412 19.7148H2.95876C2.22085 19.7148 1.54462 20.1269 1.20651 20.7828C0.868257 21.4385 0.924586 22.2285 1.3524 22.8297L9.15168 33.7887C9.69244 34.5485 10.5675 34.9998 11.5 34.9998C12.4325 34.9998 13.3076 34.5485 13.8484 33.7887L21.6476 22.8297C22.0755 22.2284 22.1318 21.4385 21.7935 20.7828C21.4553 20.1269 20.7791 19.7148 20.0412 19.7148Z" fill="white"/></svg>`,
    'erase': `<svg width="25" height="15" viewBox="0 0 25 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.5 4.97256e-08H8.01792C7.68956 -6.54544e-05 7.3644 0.0645866 7.06104 0.19026C6.75768 0.315934 6.48207 0.500166 6.24995 0.732422L0.365967 6.61601C-0.122314 7.1043 -0.122314 7.8957 0.365967 8.38359L6.24995 14.2676C6.7187 14.7363 7.35464 15 8.01753 15H22.5C23.8808 15 25 13.8809 25 12.5V2.5C25 1.11914 23.8808 4.97256e-08 22.5 4.97256e-08ZM19.1917 9.92422C19.4359 10.1684 19.4359 10.5641 19.1917 10.8082L18.3082 11.6918C18.064 11.9359 17.6683 11.9359 17.4242 11.6918L15 9.26758L12.5757 11.6918C12.3316 11.9359 11.9359 11.9359 11.6917 11.6918L10.8082 10.8082C10.564 10.5641 10.564 10.1684 10.8082 9.92422L13.2324 7.5L10.8082 5.07578C10.564 4.83164 10.564 4.43594 10.8082 4.1918L11.6917 3.3082C11.9359 3.06406 12.3316 3.06406 12.5757 3.3082L15 5.73242L17.4242 3.3082C17.6683 3.06406 18.064 3.06406 18.3082 3.3082L19.1917 4.1918C19.4359 4.43594 19.4359 4.83164 19.1917 5.07578L16.7675 7.5L19.1917 9.92422Z" fill="white"/></svg>`,
}

var elevator = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ['', 0, elevator_svgs.erase]
]