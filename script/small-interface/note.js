var Note = class Note {
    static draw(is_owner, text) {
        if (is_owner) {
            note_tmpl.querySelector('textarea').disabled = false;
            note_tmpl.querySelector('button').style.visibility = 'visible';
        }
        if (text) this.setText(text);
    }

    static setText(text) {
        note_tmpl.querySelector('textarea').value = text;
    }

    static onbutton() {
        mp.trigger('Note::UpdateText', note_tmpl.querySelector('textarea').value);
    }
}