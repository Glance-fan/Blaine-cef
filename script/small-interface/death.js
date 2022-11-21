var Death = class Death {
    static resize(elem) {
        elem.style.bottom = clHeight * 187 + 'px';
        elem.style.zoom = clHeight;
    }

    static updateSecs(secs) {
        document.getElementById('death-secs').innerText = secs > 0 ? secs + " сек." : "";
    }
    //true - initial color; false - black
    //id = death-die || death-er
    static switchButton(id, status) {
        var btn = document.getElementById(id);
        if (!status) {
            btn.style.background = '#161616';
            btn.style.pointerEvents = 'none';
        } else btn.style = '';
    }

    static request(e, status) {
        if (status) mp.trigger("Death::Ressurect");
        else mp.trigger("Death::Wait");
        e.target.blur();
    }
}