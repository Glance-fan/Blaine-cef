var Passengers = class Passengers {
    static container = document.getElementById('passengers-container');
    static fill(data) {
        passengers_tmpl.firstElementChild.firstElementChild.innerHTML = `<img src="libs/svgs/interaction/pass_title.svg">`;
        this.container.firstElementChild.innerHTML = '';
        this.container.scrollTo({
            top: 0,
        });
        if (data.length > 4) this.container.style.width = '435px';
        else this.container.style = '';
        for (let index = 0; index < data.length; index++) {
            var psngr = document.createElement('div');
            psngr.classList.add('passengers-elem');
            psngr.setAttribute('onclick', `Passengers.onclick(this)`);
            psngr.id = data[index][0] + '-psngr';
            psngr.innerText = data[index][1];
            this.container.firstElementChild.append(psngr);
        }
        this.container.firstElementChild.firstElementChild.click();
    }

    static lastElem;
    static onclick(psngr) {
        if (!!this.lastElem) this.lastElem.classList.remove('passengers-selected');
        psngr.classList.add('passengers-selected');
        this.lastElem = psngr;
        document.querySelector('.passengers-buttons').style.display = 'flex';
    }

    static onbutton(which) {
        mp.trigger('Interaction::PassengersMenuSelect', which, parseInt(this.lastElem.id))
    }
}