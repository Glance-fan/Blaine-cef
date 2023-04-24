var MusicPlayer = class MusicPlayer {
    static draw(h1, music_id, time, cur_time, max_time, is_paused, volume, is_buttons, btn_status) {
        document.getElementById('mplayer-h1').innerText = h1;
        if (music_id) this.setMusicId(music_id);
        this.updateMplayerPlay(is_paused);
        this.setSliderVal('mplayer-time-value', time || 0);
        this.updateMusicTime(cur_time || '--:--', max_time || '--:--');
        this.setSliderVal('mplayer-volume-value', volume || 0);
        this.showButtons(is_buttons);
        this.setButton(btn_status);
    }

    

    static slider_vals = {};
    static setSliderVal(id, value) {
        this.slider_vals[id] = value;
        var slider = document.getElementById(id);
        slider.value = value;
        var percent = (slider.value - slider.min) * 100 / (slider.max - slider.min);
        slider.style.backgroundSize = percent + '% 100%';
    }



    /*music-id*/
    static setMusicId(music_id) {
        document.getElementById('mplayer-music-id').value = music_id;
    }

    static onfocus(input) {
        input.select();
        input.parentElement.style.animation = '5s ease 0s infinite normal none running selected';
    }

    static oninput(input) {
        if (input.value > 4294967295) input.value = 4294967295;
    }

    static onblur(input) {
        input.parentElement.style.animation = "";
    }


    /*misc*/
    static updateMusicTime(cur, max) {
        var spans = document.getElementById('mplayer-time').children;
        spans[0].innerText = cur;
        if (max) spans[1].innerText = max; 
    }


    static updateMplayerPlay(is_paused) {
        var el = document.getElementById('mplayer-play');
        el.lastChild.src = is_paused ? el.lastChild.src.replace('resume', 'pause') : el.lastChild.src.replace('pause', 'resume');
        el.setAttribute('onclick', `MusicPlayer.playRequest(${is_paused})`);
    }

    static showButtons(status) {
        var btns = document.getElementById('music-player-buttons');
        btns.style.visibility = status ? 'visible' : 'hidden';
    }

    static setButton(status) {
        var btn = document.getElementById('mplayer-access-btn');
        btn.className = status ? 'red-button' : 'green-button';
        btn.innerText = status ? 'Открыть доступ' : 'Закрыть доступ';
        status ?  btn.setAttribute('onclick', `MusicPlayer.onbutton('access', false)`) : btn.setAttribute('onclick', `MusicPlayer.onbutton('access', true)`);
    }

    /*requests*/
    static playRequest(current) {
        mp.trigger('MusicPlayer::', current, document.getElementById('mplayer-music-id').value);
        // this.updateMplayerPlay(!current);
    }

    static rewindRequest(next) {
        mp.trigger('MusicPlayer::', next);
    }

    static sliderRequest(id, value) {
        document.getElementById(id).value = this.slider_vals[id];
        mp.trigger('MusicPlayer::', id, value);
        // this.setSliderVal(id, value);
    }

    static onbutton(action, state) {
        mp.trigger('MusicButton::Action', action, state);
        // this.setButton(action, state)
    }
}