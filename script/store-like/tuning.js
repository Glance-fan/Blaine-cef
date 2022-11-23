var Tuning = class Tuning {
    static left = tuning_tmpl.firstElementChild;
    static right = tuning_tmpl.lastElementChild;
    static lastNav;
    static draw(data) {
        this.drawNavigation(data.length);
    }

    static drawNavigation(amount) {
        var tuning_rows = this.getNavigation(amount);

        var svg_index = 0;
        for (var index = 0; index < tuning_rows.length; index++) {
            var row = document.createElement('div');
            row.classList.add('tuning-nav-row');
            document.querySelector('.tuning-nav').append(row);
            for (var j = 0; j < tuning_rows[index]; j++)
                this.newNavElem(row, tuning_nav, svg_index++);
        }
        // this.lastChoices = Array(svg_index + 1).fill(0);

    }

    static newNavElem(parent, svgs, id) {
        parent.innerHTML += /*html*/ `<div class="tuning-nav-elem dark-gray" id="${id}-tuning-nav" onclick="Tuning.navigate(this)" onmouseenter="Tuning.color(this, '#ddd')" onmouseleave="Tuning.color(this, '#bbb')">${svgs[id]}</div>`;
        // this.newContainer(id);
    }

    /*clicks*/
    static navigate(elem) {
        if (elem == this.lastNav) return;
        var index = parseInt(elem.id);
        this.colorNav(elem);
        this.navigationRequest(index);
        this.lastNav = elem;
    }

    /*requests*/
    // sends whenever navigation elem is clicked
    static navigationRequest(nav_id) {
        mp.trigger("Tuning::NavChange", nav_id);
    }

    /*misc*/
    static getNavigation(amount) {
        if (amount == 6) {
            Array.prototype.splice.apply(tuning_nav, [3, tuning_moto.length].concat(tuning_moto));
            return [1, 2, 2, 1];
        } else {
            tuning_nav.splice(4, 1)
            return [1, 2, 1, 1];
        }
    }

    static colorNav(elem) {
        color(elem, '#fff');
        if (!!this.lastNav) color(this.lastNav, '#bbb')

        function color(elem, color) {
            var paths = elem.getElementsByTagName('path');
            !elem.className.includes('tuning-selected') ? elem.classList.add('tuning-selected') : elem.classList.remove('tuning-selected');
            for (var i = 0; i < paths.length; i++)
                if (paths[i].hasAttribute('fill')) paths[i].setAttribute("fill", color);
        }
    }

    static color(elem, color) {
        if (!!this.lastNav && elem == this.lastNav) return;
        var paths = elem.getElementsByTagName('path');
        for (var i = 0; i < paths.length; i++)
            if (paths[i].hasAttribute('fill')) paths[i].setAttribute("fill", color);
    }
}