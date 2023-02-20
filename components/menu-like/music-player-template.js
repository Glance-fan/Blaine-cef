vue_app.component('music-player-template', {
    mounted: async function () {
        mplayer_tmpl = document.getElementById('music-player');
        await include_source(scripts.music_player);
        resizeBigger(mplayer_tmpl);
        onRenderFinished('music_player');
    },
    unmounted: function () {
        remove_source(scripts.music_player);
        mplayer_tmpl = null;
        switchTemplate(false, 'music_player')
    },
    template: /*html*/ `
        <div id="music-player">
            <div>
                <img src="libs/svgs/misc/music.svg">
                <div id="mplayer-h1">TEXT HERE</div>
                <div class="close-template" onclick="mp.trigger('Menu::Close')">${close_svg}</div>
            </div>
            <div>
                <div id="mplayer-wrapper">
                    <div id="mplayer-container">
                        <div>ID композиции с сайта music.blaine-rp.ru</div>
                        <div id="mplayer-input">
                            #<input id="mplayer-music-id" maxlength="10" autocomplete="false" spellcheck="false" oninput="MusicPlayer.oninput(this)" onfocus="MusicPlayer.onfocus(this)"
                            onblur="MusicPlayer.onblur(this)"/>
                        </div>
                        <div id="mplayer-time-wrapper">
                            <input id="mplayer-time-value" type="range" min="0" max="100" step="1" oninput="MusicPlayer.sliderRequest(this.id, this.value)" style="width: 100%">
                            <div id="mplayer-time">
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div id="mplayer-volume-wrapper">
                            <div id="mplayer-nav">
                                <div onclick="MusicPlayer.rewindRequest(-1)"><img style="transform: scale(-1, 1)" src="libs/svgs/phone/radio/rewind.svg"></div>
                                <div id="mplayer-play"><img src="libs/svgs/phone/radio/resume.svg"></div>
                                <div onclick="MusicPlayer.rewindRequest(1)"><img src="libs/svgs/phone/radio/rewind.svg"></div>        
                            </div>
                            <div>
                                <img src="libs/svgs/phone/radio/less.svg">
                                <input id="mplayer-volume-value" type="range" min="0" max="1" step="0.1" oninput="MusicPlayer.sliderRequest(this.id, this.value)" onkeydown="javascript: return [8,46,37,39].includes(event.keyCode) ? true : !isNaN(Number(event.key)) && event.keyCode!=32"/>
                                <img src="libs/svgs/phone/radio/more.svg">
                            </div>
                        </div>
                    </div>
                    <div id="music-player-buttons">
                        <button onclick="MusicPlayer.onbutton('take')" class="red-button">Забрать</button>
                        <button id="mplayer-access-btn"></button>
                    </div>
                </div>
            </div>
        </div>`
})