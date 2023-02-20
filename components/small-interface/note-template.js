vue_app.component('note-template', {
    mounted: async function () {
        note_tmpl = document.getElementById('note');
        await include_source(scripts.note);
        resizeBigger(note_tmpl);
        onRenderFinished('note');
    },
    unmounted: function () {
        remove_source(scripts.note);
        note_tmpl = null;
        switchTemplate(false, 'note')
    },
    template: /*html*/ `
        <div id="note">
            <div class="note-wrapper">
                <textarea name="text" id="text" disabled></textarea>
            </div>
            <button class="red-button" onclick="Note.onbutton()">Принять</button>
        </div>`
})