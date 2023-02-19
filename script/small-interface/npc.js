var NPC = class NPC {
	static interval;
	//choices[i] = [enum, 'text'] 
	static fill(name, fulltext, choices) {
		npc_tmpl.lastElementChild.innerHTML = /*html*/ `
			<div style="font-size: 20px;text-align:center">${name}</div>
			<div style="margin-top: 20px;">${fulltext}</div>`;

		var container = document.getElementById('npc-choice-container');
		container.innerHTML = '';
		var parent = container.parentElement;
		parent.style.top = document.body.clientHeight / 100 * (572 / 10.8) + 'px';

		for (var index = 0; index < choices.length; index++) {
			container.innerHTML += /*html*/ `
			<div onmouseover="NPC.onmouseover(this)" class="${!index ? 'npc-selected' : ''}" onclick="mp.trigger('NPC::Dialogue::Reply', ${choices[index][0]})">
				<div class="npc-arrow" style="${!index ? 'visibility: visible' : ''}">►</div>
				<div style="max-width: 370px;word-wrap: break-word;">${choices[index][1]}</div>
			</div>`;
		}
		this.lastChoice = container.firstElementChild;
		document.documentElement.removeEventListener("keydown", this.onkeydown);
		document.documentElement.addEventListener("keydown", this.onkeydown);

		this.interval = setInterval(() => {
			if (parent.offsetParent) {
				while (parent.getBoundingClientRect().bottom > window.innerHeight)
					parent.style.top = parseInt(parent.style.top) * 0.99 + 'px';
				clearInterval(this.interval);
			}
		}, 10)
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
	}

	static onkeydown(event) {
		if (event.keyCode == 13) { //enter
			event.preventDefault();
			NPC.lastChoice.click();
		} else if (event.keyCode == 38) { //arrow-up
			event.preventDefault();
			var container = document.getElementById('npc-choice-container');
			var idx = Array.from(container.children).indexOf(NPC.lastChoice);
			if (idx > 0) NPC.onmouseover(container.children[idx - 1]);
		} else if (event.keyCode == 40) { //arrow-down
			event.preventDefault();
			var container = document.getElementById('npc-choice-container');
			var idx = Array.from(container.children).indexOf(NPC.lastChoice);
			if (idx < container.childElementCount - 1) NPC.onmouseover(container.children[idx + 1]);
		}
	}

}


// a = 'TEXTTEXTTEXT';
// b = 'TEXTTEXTTEXTTEXT';
// c = [
// 	[0, 'Действие 1'],
// 	[1, 'Действqwetoqwie opqriweop iqwie pqweir [qwei qweip ие 2'],
// 	[2, 'Действие 3'],
// 	[3, 'Действие 4'],
// 	[4, 'Действие 5'],
// ]

// NPC.fill(a, b, c)