var NPC = class NPC {

	static Sizes = {Small: 125, Medium: 222, Big: 320, Whole: 515};
		
	static Order = [this.Sizes.Small, this.Sizes.Medium, this.Sizes.Big, this.Sizes.Whole];

	static Combinations = [[this.Sizes.Small, this.Sizes.Small, this.Sizes.Small], [this.Sizes.Medium, this.Sizes.Medium], [this.Sizes.Small, this.Sizes.Big], [this.Sizes.Big, this.Sizes.Small], [this.Sizes.Whole]];

    //buttons[i] = [true||false, enum, 'text'] 
    static fill(name, fulltext, buttons) {
        npc_tmpl.innerHTML = /*html*/ `
        <div>
            <div>${name}</div>
            <div style="margin: 25px 0 30px 0">${fulltext}</div>
            <div class="npc-btn-row"></div>
        </div>
        <div></div>`;
		
		var buttonsSizes = [];
		
        for (let index = 0; index < buttons.length; index++) {
            var btn = document.createElement('button');
			
            buttons[index][0] ? btn.classList.add('red-button') : btn.classList.add('grey-button');
            
			btn.innerText = buttons[index][2];
			
            btn.setAttribute('onclick', `mp.trigger('NPC::Dialogue::Reply', ${buttons[index][1]})`);
			
            document.querySelector('.npc-btn-row').append(btn);
			
			buttonsSizes.push({ Btn: btn, Size: this.getPreSize(btn)});
        }

		document.querySelector('.npc-btn-row').remove();
		
		var res = this.getPositions(buttonsSizes);
		
		var curRow;
		
		for (let i = 0; i < res.length; i++)
		{
			curRow = this.createRow(!!curRow ? false : true);
			
			for (let j = 0; j < res[i].length; j++)
			{
				let btn = res[i][j].Btn;
				let size = res[i][j].Size;
				
				btn.style.width = `${size}px`;
				
				curRow.append(btn);
			}
		}
    }

    static createRow(isfirst) {
        var row = document.createElement('div');
		
        row.classList.add('npc-btn-row');
		
        if (!isfirst)
			npc_tmpl.lastElementChild.append(row);
        else
			npc_tmpl.lastElementChild.insertBefore(row, npc_tmpl.lastElementChild.firstChild)
		
        return row;
    }

	static getPreSize(btn) {
        if (btn.offsetWidth <= this.Sizes.Small)
			return this.Sizes.Small;
		
        if (btn.offsetWidth <= this.Sizes.Medium)
			return this.Sizes.Medium;
		
		if (btn.offsetWidth <= this.Sizes.Big)
			return this.Sizes.Big;
		
        return this.Sizes.Whole;
    }
	
	static getSizes(a)
	{
		var arr = [];
		
		for (let i = 0;  i < a.length; i++)
			arr.push(a[i].Size);
		
		return arr;
	}
	
	static isSequenceEqual(a, b)
	{
		if (a.length != b.length)
			return false;
		
		for (let i = 0; i < a.length; i++)
		{
			if (a[i] != b[i])
				return false;
		}
		
		return true;
	}
	
	static isAllowed(combination)
	{
		var sizes = this.getSizes(combination);
		
		for (let i = 0; i < this.Combinations.length; i++)
			if (this.isSequenceEqual(sizes, this.Combinations[i]))
				return true;
			
		return false;
	}
	
	static getBiggerSize(size)
	{
		var idx = this.Order.indexOf(size) + 1;
		
		if (idx > (this.Order.length - 1))
			return size;
		
		return this.Order[idx];
	}
	
	static findNormalPositions(all, idx, state, res)
	{	
		if (idx >= all.length)
		{
			if (this.isAllowed(state))
			{
				var copy = [];
				
				for (let i = 0; i < state.length; i++)
					copy.push({Btn: state[i].Btn, Size: state[i].Size});
				
				res.push(copy);
			}

			return;
		}
		
		for (let i = 0; i < all[idx].length; i++)
		{
			state.push(all[idx][i]);
			
			this.findNormalPositions(all, idx + 1, state, res);
			
			state.pop();
		}
	}
	
	static getNormalPositions(list)
	{
		var posSizes = [];
		
		for (let i = 0; i < list.length; i++)
		{
			var x = list[i];
			var lastSize = x.Size;
			
			var sizes = [{Btn: x.Btn, Size: lastSize}];
			
			while (true)
			{
				var nextSize = this.getBiggerSize(lastSize);
				
				if (nextSize == lastSize)
					break;
					
				lastSize = nextSize;
				
				sizes.push({Btn: x.Btn, Size: lastSize});
			}
			
			posSizes.push(sizes);
		}
		
		var res = [];
		
		this.findNormalPositions(posSizes, 0, [], res);
		
		for (let i = 0; i < this.Combinations.length; i++)
		{
			for (let j = 0; j < res.length; j++)
			{
				if (this.isSequenceEqual(this.Combinations[i], this.getSizes(res[j])))
					return res[j];
			}
		}
		
		return null;
	}
	
	static getPositions(list)
	{
		var result = [];
		
		while (list.length > 0)
		{
			var found = null;
			
			var endOfList = false;
			
			for (let i = 3; i > 0; i--)
			{
				var listToCheck = list.slice(0, i);
				
				if (listToCheck.length < i)
					endOfList = true;
				
				found = this.getNormalPositions(listToCheck);
				
				if (found != null || endOfList)
					break;
			}
			
			if (found != null)
			{
				result.push(found);
				
				for (let i = 0; i < found.length; i++)
					list.shift();
			}
		}
		
		return result;
	}
}