var AuthStart = class StartPlace {
    static lastNav;

    static draw(data) {
        document.querySelector('.start-nav').innerHTML = '';
        this.lastNav = null;
        for (var index = 0; index < data.length; index++)
            this.startNavElem(data[index]);
    }

    static selectNav(id) {
        this.navigate(document.getElementById(`${id}-navstart`));
    }

    static startNavElem(id) {
        var elem = document.createElement('div');
        elem.classList.add('auth-nav-elem');
        elem.innerHTML = nav_content[id];
        elem.id = `${id}-navstart`;
        document.querySelector('.start-nav').append(elem);
        elem.setAttribute('onclick', `AuthStart.navRequest(this.id)`);
    }

    static navigate(elem) {
        var paths = elem.getElementsByTagName('path');
        for (var i = 1; i < paths.length; i++)
            paths[i].setAttribute("fill", "#C81212");
        if (!!this.lastNav) {
            paths = this.lastNav.getElementsByTagName('path');
            for (var i = 0; i < paths.length; i++)
                paths[i].setAttribute("fill", "#fff");
        }
        this.lastNav = elem;
    }

    static showConfirm(hide, id) {
        var parent = document.querySelector('.auth-btn-wrapper');
        if (hide) {
            parent.style.display = 'none';
            return
        }
        parent.style.display = 'block';
        this.resizeConfirm();

        var btn = parent.firstChild;
        btn.setAttribute('onclick', `AuthStart.btnRequest(${id})`);
    }

    static resizeConfirm() {
        var height = document.querySelector('.start-place').clientHeight;
        document.querySelector('.auth-btn-wrapper').style.bottom = (height / 100 * 30) + 'px';
    }

    static navRequest(id) {
        mp.trigger("Auth::StartPlace::Select", parseInt(id));
    }

    static btnRequest(id) {
        mp.trigger("Auth::StartPlace::Start", parseInt(id));
    }
}