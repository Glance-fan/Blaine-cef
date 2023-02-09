var NPC = class NPC {
    //choices[i] = [enum, 'text'] 
    static fill(name, fulltext, choices) {
        npc_tmpl.lastElementChild.innerHTML = /*html*/ `
			<div style="font-size: 20px;text-align:center">${name}</div>
			<div style="margin-top: 20px;">${fulltext}</div>`;

        var container = document.getElementById('npc-choice-container');
        for (var index = 0; index < choices.length; index++) {
			container.innerHTML += /*html*/ `
			<div onmouseover="NPC.onmouseover(this)" onclick="mp.trigger('NPC::Dialogue::Reply', ${choices[index][0]})">
				<div class="npc-arrow">►</div>
				<div style="max-width: 370px;word-wrap: break-word;">${choices[index][1]}</div>
			</div>`;
        }
		npc_tmpl.firstElementChild.style.top = document.body.clientHeight / 100 * (572/10.8) + 'px';
    }

    static lastChoice;
    static onmouseover(elem) {
		if (this.lastChoice) {
			this.lastChoice.classList.remove('npc-selected');
			this.lastChoice.firstElementChild.style.visibility = 'hidden';
		}
		elem.firstElementChild.style.visibility = 'visible';
		elem.classList.add('npc-selected');
        this.lastChoice = elem;
        elem.firstElementChild.innerHTML = '►';
    }

}


// a = 'TEXTTEXTTEXT';
// b = 'TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT';
// c = [
//     [0, 'Действие 1'],
//     [1, 'Действие 2'],
//     [2, 'Действие 3'],
//     [3, 'Действие 4'],
//     [4, 'Действие 5']
// ]

// NPC.fill(a, b, c)