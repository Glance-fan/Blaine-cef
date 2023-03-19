var Anims = class Animations {
    static anims_data;
    static anims_dict = [
        [],
        []
    ];


    /*render*/
    static draw(data) {
        this.drawNavigation();
        this.setData(data)
        for (var index = 4; index > 0; index--)
            this.selectOption(index);
        this.makeFavMany(data.at(-1));
        this.selectOption(0);
    }

    static setData(data) {
        this.anims_data = [{
            ids: [],
            anims: [],
        }, null, null, data[2][0], data[3][0]];
        for (var index = 1; index < 3; index++) {
            var temp_data1 = [];
            for (var j = 0; j < data[index - 1].length; j++) {
                var temp_data2 = [data[index - 1][j][0]]
                for (var k = 0; k < data[index - 1][j][1].length; k++) {
                    temp_data2.push(data[index - 1][j][1][k])
                }
                temp_data1.push(temp_data2);
            }
            this.anims_data[index] = temp_data1;
        }
    }

    static drawNavigation() {
        anims_tmpl.firstElementChild.firstElementChild.innerHTML = anim_nav[0][0] + anim_nav[0][1];
        for (var index = 0; index < anim_nav.length - 1; index++)
            anims_tmpl.querySelector('.anims-options').innerHTML += /*html*/ `
                <div>
                    <a id="${index}-animations" href="#" onclick="Anims.navigate(this)">
                        ${anim_nav[index + 1][0]}${anim_nav[index + 1][1]}
                    </a>
                </div>`;
    }

    //data[i] = 'Section-name' || ['id', 'name']
    static container = document.getElementById('animations-container');
    static fillContainer(data, needclear) {
        if (needclear) this.container.innerHTML = ``;
        if (data.length == 0) return;
        var startIndex = Array.isArray(data[0]) ? 0 : 1;
        if (startIndex == 1)
            this.container.innerHTML += /*html*/ `<div class="anims-section">${data[0]}</div>`;
        load(data, startIndex);

        async function load (data, start) { 
            for (var index = start; index < data.length; index++) 
                Anims.newAnimation(...data[index])
        }
    }
    
    static newAnimation(id, name) {
        var elem = document.createElement('div');
        elem.parentId = parseInt(this.lastNav.id);
        elem.id = elem.parentId == 0 ? `${id}-fav` : id;
        elem.classList.add('anims-elem');
        if (this.lastAnims[elem.parentId] == elem.id) elem.classList.add('anims-selected')
        this.container.append(elem);
        var isFav = elem.parentId > 2 ? null : this.anims_data[0].ids.includes(id) || elem.parentId == 0 ? true : false;
        elem.innerHTML = /*html*/ `
            <div class="anims-elem-content"><span>${name}</span>${this.getStar(isFav)}</div>`;
        this.anims_dict[0][id] = name;
        if (this.anims_dict[1][id] == null) this.anims_dict[1][id] = elem.parentId;
        elem.setAttribute('onclick', `Anims.onanim(this)`)
        if (isFav != null) {
            var star = elem.querySelector('svg');
            star.setAttribute('name', elem.id);
            if (isFav) star.setAttribute('onclick', `Anims.onfullstar(this)`);
            else star.setAttribute('onclick', `Anims.onemptystar(this)`);
        }
    }


    /*clicks*/
    static lastNav;
    static navigate(opt) {
        this.container.parentElement.scrollTo(0, 0);
        if (this.lastNav != null) {
            this.lastNav.style = '';
            this.lastNav.parentElement.classList.remove('current');
        }
        this.lastNav = opt;
        var index = parseInt(opt.id);
        this.container.style.display = 'block'
        this.container.innerHTML = ``;
        this.fillCheck(index)

        var lastAnim = this.lastAnims[index];
        if (lastAnim != null)
            try {
                this.addSelection(lastAnim.replace('-fav', ''), true)
            } catch (error) {
                this.lastAnims[index] = null;
            }

        this.drawSearch(index);
        document.getElementById('animations-left-wrapper').style.display = 'block';

        opt.parentElement.classList.add('current');
        opt.style.color = 'white';
        document.getElementById('anim-cur-block').innerText = opt.innerText;

        if (this.container.querySelector('.anims-selected'))
            this.container.parentElement.scrollTo({
                top: this.container.querySelector('.anims-selected').offsetTop - 45,
                behavior: 'smooth'
            })
    }

    static inStar = false;
    static onfullstar(fullstar) {
        var star = this.onstar(true, fullstar);
        star.setAttribute('onclick', `Anims.onemptystar(this)`);
        this.makeFavOne(star.getAttribute('name'), false);
        if (parseInt(this.lastNav.id) == 0 && !this.inSearch) this.fillCheck(0);
        else if (this.inSearch) this.fillContainer(this.searchQuery, true);
    }

    static onemptystar(emptystar) {
        var star = this.onstar(false, emptystar);
        star.setAttribute('onclick', `Anims.onfullstar(this)`);
        this.makeFavOne(star.getAttribute('name'), true);
        if (this.lastAnims[parseInt(this.lastNav.id)] == star.getAttribute('name')) this.doubleColor(star.getAttribute('name'))
    }

    static onstar(wasFav, star) {
        this.inStar = true;
        var elem = document.getElementById(star.getAttribute('name'))
        this.requestStar(elem.id, wasFav);
        elem.querySelector('svg').remove();
        elem.lastElementChild.innerHTML += this.getStar(!wasFav);
        elem.querySelector('svg').setAttribute('name', elem.id);
        setTimeout(() => {
            this.inStar = false
        }, 100);
        return elem.querySelector('svg');
    }

    static onanim(elem) {
        if (this.inStar) return;
        var selected = anims_tmpl.querySelector('.anims-selected');
        if (!!selected)
            if (selected.id == elem.id) {
                this.requestAnimation(elem.id, true);
                return;
            }
        this.requestAnimation(elem.id, false);
    }


    /*search*/
    static search_arr;
    static drawSearch(index) {
        this.search_arr = this.getSearchArr(index)
        this.inSearch = false;
        document.getElementById('animations-left-wrapper').firstElementChild.innerHTML = /*html*/ `
            <span style="text-transform: capitalize;" id="anim-cur-block"></span>
            <div class="anim-search-wrapper">
                ${anims_svgs.search}
                <input id="anims-search" spellcheck="false" autocomplete="false" placeholder = 'Поиск'/>
            <div>`;
        var search = document.getElementById('anims-search');
        search.setAttribute('onfocus', 'Anims.focusSearch(this.parentElement)');
        search.setAttribute('onblur', 'Anims.blurSearch(this.parentElement)');
        search.setAttribute('oninput', 'Anims.inputSearch(this)');
    }

    static inSearch;
    static focusSearch(block) {
        this.inSearch = true;
        block.style.animation = '5s ease 0s infinite normal none running selected';
    }

    static blurSearch(block) {
        block.style.animation = '';
    }

    static searchQuery;
    static inputSearch(search) {
        if (search.value == '') {
            this.inSearch = false;
            this.fillCheck(parseInt(this.lastNav.id));
            return;
        }
        this.inSearch = true;
        var data = this.search_arr;
        this.searchQuery = [];
        for (var index = 0; index < this.search_arr.length; index++) {
            if (data[index][1].toLowerCase().includes(search.value.toLowerCase().replace(/\s+/g, ' ').trim())) this.searchQuery.push(data[index])
        }
        this.fillContainer(this.searchQuery, true);
    }

    static getSearchArr(index) {
        switch (index) {
            case 0:
                return this.anims_data[index].anims;
            case 1:
            case 2:
                var temp = [];
                for (var j = 0; j < this.anims_data[index].length; j++) {

                    for (var k = 1; k < this.anims_data[index][j].length; k++) {
                        temp.push(this.anims_data[index][j][k]);
                    }
                }
                return temp;
            default:
                return this.anims_data[index];
        }
    }


    /*misc*/
    static selectOption(index) {
        document.getElementById(`${index}-animations`).click();
    }

    static colorAnim(id, status) {
        if (status) this.addSelection(id);
        else this.removeSelection(id);
    }

    static lastAnims = Array(5).fill(null);
    static addSelection(id, forced) {
        var index = this.anims_dict[1][id];
        var cur_index = parseInt(this.lastNav.id);
        if (index != cur_index && !this.anims_data[0].ids.includes(id)) {
            if (cur_index == 0 && this.lastAnims[0] != null && (index == 1 || index == 2)) {
                this.removeSelection(this.lastAnims[0])
            }
            if (index == 1 && this.lastAnims[2] != null) {
                this.removeSelection(this.lastAnims[2])
            }
            if (index == 2 && this.lastAnims[1] != null) {
                this.removeSelection(this.lastAnims[1])
            }
            this.lastAnims[index] = id;
            return;
        }

        var elem = document.getElementById(cur_index == 0 ? `${id}-fav` : id);
        if (elem != null) elem.classList.add('anims-selected');

        if (!forced) {
            try {
                document.getElementById(this.lastAnims[cur_index]).classList.remove('anims-selected');
            } catch (error) {

            }
            this.lastAnims[cur_index] = id;
        }

        this.doubleColor(id);
    }

    static removeSelection(id) {
        id = id.replace('-fav', '');
        var index = this.anims_dict[1][id];
        if (index < 3) {
            this.lastAnims[0] = null;
            this.lastAnims[1] = null;
            this.lastAnims[2] = null;
        } else this.lastAnims[index] = null;
        if (parseInt(this.lastNav.id) == 0 && this.anims_data[0].ids.includes(id)) document.getElementById(`${id}-fav`).classList.remove('anims-selected');
        else if (document.getElementById(id) != null)
            document.getElementById(id).classList.remove('anims-selected');
    }

    static doubleColor(id) {
        if (parseInt(this.lastNav.id) < 3) {
            this.lastAnims[0] = null;
            this.lastAnims[1] = null;
            this.lastAnims[2] = null;
        }
        if (this.anims_data[0].ids.includes(id)) {
            var index = this.anims_dict[1][id];
            this.lastAnims[0] = `${id}-fav`
            this.lastAnims[index] = id;
        } else {
            this.lastAnims[parseInt(this.lastNav.id)] = id;
        }
    }

    static makeFavMany(ids) {
        for (var index = 0; index < ids.length; index++)
            this.makeFavOne(ids[index], true)
    }

    static makeFavOne(id, state) {
        id = id.replace('-fav', '');
        var ids_arr = this.anims_data[0].ids;
        var fav_arr = this.anims_data[0].anims;
        if (ids_arr.includes(id) && state) return;
        if (state) {
            ids_arr.push(id);
            fav_arr.push([id, this.anims_dict[0][id]]);
        } else {
            var index = ids_arr.indexOf(id);
            ids_arr.splice(index, 1);
            fav_arr.splice(index, 1);
            if (this.inSearch)
                index_search: for (var j = 0; j < this.searchQuery.length; j++)
                    if (this.searchQuery[j][0] == id) {
                        this.searchQuery.splice(this.searchQuery.indexOf(this.searchQuery[j]), 1);
                        break index_search;
                    }
        }
    }

    static fillCheck(index) {
        var data = this.anims_data[index];
        switch (index) {
            case 0:
                if (data.anims.length > 0) this.fillContainer(data.anims, true);
                else this.container.innerHTML = ``;
                break;
            case 3:
            case 4:
                this.fillContainer(data, true);
                break;
            default:
                this.container.innerHTML = ``;
                for (var j = 0; j < data.length; j++)
                    this.fillContainer(data[j]);
                break;
        }
    }

    static getStar(index) {
        switch (index) {
            case true:
                return anims_svgs.fav;
            case false:
                return anims_svgs.empty_star;
            default:
                return '';
        }
    }


    /*requests*/
    static requestAnimation(id, isPlaying) {
        mp.trigger('Anims::Menu::Choose', parseInt(this.lastNav.id), id.replace('-fav', ''), isPlaying);
        /*response-imitation*/
        // this.colorAnim(id.replace('-fav', ''), !isPlaying);
    }

    static requestStar(id, wasFav) {
        mp.trigger('Anims::Menu::Fav', id.replace('-fav', ''), wasFav);
    }
}

anims_fill = [
    [
        ['Раздел#1', [
            ['Jump-Anim', 'Jump'],
            ['Dance-Anim', 'Dance'],
            ['Drink#2-Anim', 'Drink#2'],
        ]],
        ['Раздел#2', [
            ['Drink#3-Anim', 'Drink#3'],
            ['Drink#4-Anim', 'Drink#4'],
            ['Drink#5-Anim', 'Drink#5'],
            ['Drnk-Anim', 'Drnk'],
        ]],
        ['Раздел#3', [
            ['Draw#13-Anim', 'Draw#13'],
            ['Draw#14-Anim', 'Draw#14'],
            ['Draw#15-Anim', 'Draw#15'],
            ['Draw-Anim', 'Draw'],
        ]]
    ],
    [
        ['Специальные', [
            ['Eat-Anim', 'Eat'],
            ['Smoke-Anim', 'Smoke'],
            ['Read-Anim', 'Read'],
        ]],
        ['Дополнительные', [
            ['Seat#1-Anim', 'Seat#1'],
            ['Seat#2-Anim', 'Seat#2'],
            ['Feed-Anim', 'Feed'],
            ['Enjoy-Anim', 'Enjoy'],
            ['Enter-Anim', 'Enter'],
        ]],
        ['раздел#69', [
            ['Exit-Anim', 'Exit'],
            ['Fight-Anim', 'Fight'],
            ['Fry-Anim', 'Fry'],
            ['Cook-Anim', 'Cook'],
            ['Expand-Anim', 'Expand'],
        ]],
    ],
    [
        [
            ['Walk-Anim', 'Walk'],
            ['Stand-Anim', 'Stand'],
            ['Fly-Anim', 'Fly'],
        ]
    ],
    [
        [
            ['Anger-Anim', 'Anger'],
            ['Fear-Anim', 'Fear'],
            ['Laugh-Anim', 'Laugh'],
        ]
    ],
    ['Jump-Anim', 'Drink#2-Anim', 'Drink#4-Anim', 'Draw#14-Anim', 'Smoke-Anim', 'Enjoy-Anim', 'Exit-Anim', 'Fry-Anim']
];
// Anims.draw(anims_fill)