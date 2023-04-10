var Messages = class ChatMessages {
    static specialCount = 0;
    static channels = [
        ['me', 'do', 'todo', 'try', 'fraction', 'general', 'organisation', 'NonRP'],
        ['/say ', '/s ', '/w ', '/n ', '/me ', '/do ', '/todo ', '/try ', '/f ', '/r ', '/o ', '/d ', '/gov ', '/amsg '],
        ['say', 'shout', 'whisper', 'nonrp', 'me', 'do', 'todo', 'try', 'fraction', 'fraction', 'organisation', 'department', 'goverment', 'admin'],
        ['сказал', 'крикнул', 'шепнул']
    ];
    static types = {
        say: [0, 'general', 'Сказать:'], // "/say general chat"
        shout: [1, 'general', 'Крикнуть:'], // "/s general chat"
        whisper: [2, 'general', 'Шепнуть:'], // "/w general chat"
        nonrp: [3, 'NonRP', 'NonRP:'], // "/n ooc(nonrp) chat"
        me: [4, 'me', '/me:'], // "/me chat"
        do: [5, 'do', '/do:'], // "/do chat"
        todo: [6, 'todo', '/todo:'], // "/todo chat"
        try: [7, 'try', '/try:'], // "/try chat"
        fraction: [8, 'fraction', 'Фракция:'], // "/f /r fraction chat"
        organisation: [9, 'organisation', 'Организация:'], // "/o organisation chat"
        department: [10, null, 'Департамент:'], // "/d chat"
        goverment: [11, null, '/gov:'], // "/gov гос волна"
        admin: [12, null, '/amsg'] // "/amsg"
    }

    static updateChannel(value) {
        if (document.getElementById('chat-hideable').classList.contains("showChatInput"))
            for (var index = 0; index < this.channels[1].length; index++)
                if (value.startsWith(this.channels[1][index])) this.onChange(this.channels[2][index])
    }

    static send(type, message) {
        if (type == this.types['todo'][0] && !/^[\sa-zA-ZА-Яа-я0-9_\-\.]*\*[\sa-zA-ZА-Яа-я0-9_\-\.]*$/.test(message)) {
            this.printToDoHelp();
            return;
        }
        message = message.replace(/\s+/g, ' ').trim();
        mp.trigger('Chat::Send', type, message);
    }

    static onChange(channel) {
        var channel_data = this.types[channel];
        this.defaultChannels();
        Chat.active_type = channel_data[0];
        if (channel_data[1] != null)
            if (document.getElementById(channel_data[1]).style.opacity == 1) {
                document.getElementById(channel_data[1]).style.background = `linear-gradient(225deg, #C81212 0%, #851717 100%) 0% 0% / 300% 100%`;
                document.getElementById(channel_data[1]).style.animation =
                    `5s ease 0s infinite normal none running selected`;
            }
        document.getElementById('chat-text').innerHTML = channel_data[2];
        Chat.message.value = '';
    }

    static defaultChannels() {
        for (var index = 0; index < this.channels[0].length; index++)
            document.getElementById(this.channels[0][index]).style.background = 'rgba(22, 22, 22, 0.7)';
        Chat.justChanged = true;
        Chat.backspaceCounter = 1;
    }

    static emptyMessage(text) {
        var msg = document.createElement('div');
        msg.classList.add('sent-message');
        Chat.container.append(msg);
        if (Chat.curFont != 14) Chat.switchFont(Chat.curFont);
        if (Array.isArray(text)) 
            return {
                el: msg,
                text0: convert(text[0]),
                text1: convert(text[1])
            };
        else return {
            el: msg,
            text: convert(text)
        };

        function convert(text) {
            return text.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
        }
    }

    //0 - say, 1 - shout, 2 - whisper
    static showNormal(type, time, fullname, id, message) {
        var msg = this.emptyMessage(message);
        msg.el.innerHTML = /*html*/
            `<span class="normal-text">${time} ${fullname} (${id}) ${this.channels[3][type]}(а): ${msg.text}</span>`;
    }

    static showOOC(time, fullname, id, message) {
        var msg = this.emptyMessage(message);
        msg.el.innerHTML = /*html*/ 
            `<span class="nonrp-text">${time} [OOC] ${fullname} (${id}): ${msg.text}</span>`;
    }

    static showMe(time, fullname, id, message) {
        var msg = this.emptyMessage(message);
        console.log(msg);
        msg.el.innerHTML = /*html*/ 
            `<span class="action-text">${time} ${fullname} (${id}) ${msg.text}</span>`;
    }

    static showDo(time, fullname, id, message) {
        var msg = this.emptyMessage(message);
        msg.el.innerHTML = /*html*/ 
            `<span class="action-text">${time} ${msg.text} - ${fullname} (${id})</span>`;
    }

    static showToDo(time, fullname, id, messageBefore, messageAfter) {
        var msg = this.emptyMessage([messageBefore, messageAfter]);
        msg.el.innerHTML = /*html*/ 
            `<span class="action-text">${time} ${msg.text0}. - сказал(а) ${fullname} (${id}), ${msg.text1}</span>`;
    }

    /*Показать ToDo подсказку*/
    static printToDoHelp() {
        var msg = this.emptyMessage(message);
        msg.innerHTML = /*html*/
            `<span class="normal-text">Используйте: /todo [фраза*действие]</span>`;
        Chat.needScrollVar = true;
        Chat.tryScroll();
    }

    static showTry(time, fullname, id, message, result) {
        var msg = this.emptyMessage(message);
        msg.el.innerHTML = /*html*/ 
            `<span class="action-text">${time} ${fullname} (${id}) ${msg.text} |</span>`
        msg.innerHTML += result ? /*html*/ `<span class="success-text">Удачно</span>` : /*html*/ `<span class="defeat-text">Неудачно</span>`;
    }

    static showFraction(time, position, fullname, id, message) {
        var msg = this.emptyMessage(message);
        msg.el.innerHTML = /*html*/ 
            `<span class="fraction-text">${time} [R] ${position} ${fullname} (${id}): ${msg.text}</span>`;
    }

    static showGoverment(time, department, position, fullname, id, message) {
        var msg = this.emptyMessage(message);
        msg.el.innerHTML = /*html*/ 
            `<span class="goverment-text">${time} [D] ${department} | ${position} ${fullname} (${id}): ${msg.text}</span>`;
    }

    static showOrganisation(time, position, fullname, id, message) {
        var msg = this.emptyMessage(message);
        msg.el.innerHTML = /*html*/
            `<span class="organisation-text">${time} [O] ${position} ${fullname} (${id}): ${msg.text}</span>`;
    }

    static makeSpecial(msg, line) {
        msg.el.innerHTML = /*html*/
            `<div id="${this.specialCount++}-special" class="${line}-line"></div>
            <div></div>`;
        return {
            el: msg.el.lastElementChild,
            text: msg.text
        }
    }

    static setLine(msg) {
        var height = msg.offsetHeight + 3;
        document.getElementById(this.specialCount - 1 + `-special`).style.height = height + 'px';
    }

    static admin_ban(time, admin, player, days, reason) {
        var msg = this.makeSpecial(this.emptyMessage(reason), 'special');
        msg.el.innerHTML = /*html*/
            `<span class="normal-text">${time} Администратор <span class="red-text">${admin}</span> заблокировал игрока <span class="red-text">${player}</span> на ${days} дней. Причина: ${msg.text}.</span>`;
        this.setLine(msg.el);
    }

    static admin_ban_hard(time, admin, player, reason) {
        var msg = this.makeSpecial(this.emptyMessage(reason), 'special');
        msg.el.innerHTML = /*html*/
            `<span class="normal-text">${time} Администратор <span class="red-text">${admin}</span> заблокировал игрока <span class="red-text">${player}</span>. Причина: ${msg.text}.</span>`;
        this.setLine(msg.el);
    }

    static admin_kick(time, admin, player, reason) {
        var msg = this.makeSpecial(this.emptyMessage(reason), 'special');
        msg.el.innerHTML = /*html*/
            `<span class="normal-text">${time} Администратор <span class="red-text">${admin}</span> выгнал с сервера игрока <span class="red-text">${player}</span>. Причина: ${msg.text}.</span>`;
        this.setLine(msg.el);
    }

    static admin_mute(time, admin, player, minutes, reason) {
        var msg = this.makeSpecial(this.emptyMessage(reason), 'special');
        msg.el.innerHTML = /*html*/
            `<span class="normal-text">${time} Администратор <span class="red-text">${admin}</span> выдал мут игроку <span class="red-text">${player}</span> на ${minutes} минут. Причина: ${msg.text}.</span>`;
        this.setLine(msg.el);
    }

    static admin_jail(time, admin, player, minutes, reason) {
        var msg = this.makeSpecial(this.emptyMessage(reason), 'special');
        msg.el.innerHTML = /*html*/
            `<span class="normal-text">${time} Администратор <span class="red-text">${admin}</span> посадил игрока <span class="red-text">${player}</span> в NonRP-тюрьму на ${minutes} минут. Причина: ${msg.text}.</span>`;
        this.setLine(msg.el);
    }

    static admin_warn(time, admin, player, reason) {
        var msg = this.makeSpecial(this.emptyMessage(reason), 'special');
        msg.el.innerHTML = /*html*/
            `<span class="normal-text">${time} Администратор <span class="red-text">${admin}</span> выдал предупреждение игроку <span class="red-text">${player}</span>. Причина: ${msg.text}</span>`;
        this.setLine(msg.el);
    }

    static admin_unban(time, admin, player, reason) {
        var msg = this.makeSpecial(this.emptyMessage(reason), 'special');
        msg.el.innerHTML = /*html*/
            `<span class="normal-text">${time} Администратор <span class="red-text">${admin}</span> разблокировал игрока <span class="red-text">${player}</span>. Причина: ${msg.text}.</span>`;
        this.setLine(msg.el);
    }

    static admin_unmute(time, admin, player, reason) {
        var msg = this.makeSpecial(this.emptyMessage(reason), 'special');
        msg.el.innerHTML = /*html*/
            `<span class="normal-text">${time} Администратор <span class="red-text">${admin}</span> снял мут чата игроку <span class="red-text">${player}</span>. Причина: ${msg.text}.</span>`;
        this.setLine(msg.el);
    }

    static admin_unjail(time, admin, player, reason) {
        var msg = this.makeSpecial(this.emptyMessage(reason), 'special');
        msg.el.innerHTML = /*html*/
            `<span class="normal-text">${time} Администратор <span class="red-text">${admin}</span> освободил игрока <span class="red-text">${player}</span> из тюрьмы. Причина: ${msg.text}.</span>`;
        this.setLine(msg.el);
    }

    static admin_unwarn(time, admin, player, reason) {
        var msg = this.makeSpecial(this.emptyMessage(reason), 'special');
        msg.el.innerHTML = /*html*/
            `<span class="normal-text">${time} Администратор <span class="red-text">${admin}</span> снял предупреждение игроку <span class="red-text">${player}</span>. Причина: ${msg.text}.</span>`;
        this.setLine(msg.el);
    }

    static admin_message(time, admin, message) {
        var msg = this.makeSpecial(this.emptyMessage(message), 'special');
        msg.el.innerHTML = /*html*/
            `<span class="normal-text">${time} Администратор <span class="red-text">${admin}: </span> ${msg.text}</span>`;
        this.setLine(msg.el);
    }

    static server(time, message) {
        var msg = this.makeSpecial(this.emptyMessage(message), 'special');
        msg.el.innerHTML = /*html*/ 
            `<span class="normal-text">${time} ${msg.text}</span>`;
        this.setLine(msg.el);
    }

    static advert(time, redactor, sender, message, number) {
        var msg = this.makeSpecial(this.emptyMessage(message), 'ad');
        msg.el.innerHTML = /*html*/
            `<span class="normal-text">${time} ${msg.text}</span></br><div style="display:flex;"><span class="nonrp-text" style="font-weight: 500;">Редактор: ${redactor}. Отравитель: ${sender}</span> ${chat_svgs.phone}${chat_svgs.sms}</div>`;
        this.setLine(msg.el);
        this.adSetClicks(msg.el, number)
    }

    static government(time, fullname, message) {
        var msg = this.makeSpecial(this.emptyMessage(message), 'gov');
        msg.el.innerHTML = /*html*/ 
            `<span class="normal-text">${time} ${fullname}: ${msg.text}</span>`;
        this.setLine(msg.el);
    }

    static news(time, fullname, message) {
        var msg = this.makeSpecial(this.emptyMessage(message), 'ad');
        msg.el.innerHTML = /*html*/ 
            `<span class="normal-text">${time} ${fullname}: ${msg.text}</span>`;
        this.setLine(msg.el);
    }

    static adSetClicks(msg, number) {
        var svgs = msg.getElementsByTagName('svg');
        for (var index = 0; index < svgs.length; index++)
            svgs[index].parentElement.setAttribute('onclick', `Messages.clickPhone('${number}', ${index})`);

    }

    static clickPhone(number, index) {
        mp.trigger('Chat::Phone', index, number)
    }
}

/*
Messages.showNormal(0, '18:00', 'Hezky', '777', '<div>in_div</div>😃')
Messages.showNormal(1, '18:00', 'Hezky', '777', '<div>in_div</div>😃')
Messages.showNormal(2, '18:00', 'Hezky', '777', '<div>in_div</div>😃')
Messages.showOOC('18:00', 'Hezky', '777', '<div>in_div</div>😃')
Messages.showMe('18:00', 'Hezky', '777', '<div>in_div</div>😃')
Messages.showDo('18:00', 'Hezky', '777', '<div>in_div</div>😃')
Messages.showToDo('18:00', 'Hezky', '777', '<div>in_div</div>😃', '<div>in_div</div>😃')
Messages.showTry('18:00', 'Hezky', '777', '<div>in_div</div>😃', true)
Messages.showTry('18:00', 'Hezky', '777', '<div>in_div</div>😃', false)
Messages.showFraction('18:00', 'frytech', 'Hezky', '777', '<div>in_div</div>😃')
Messages.showGoverment('18:00', 'chel', 'frytech', 'Hezky', '777', '<div>in_div</div>😃')
Messages.showOrganisation('18:00', 'frytech', 'Hezky', '777', '<div>in_div</div>😃')

Messages.admin_ban('18:00', 'Hezky', 'Max', 0, '<div>in_div</div>😃')
Messages.admin_mute('18:00', 'Hezky', 'Max', 0, '<div>in_div</div>😃')
Messages.admin_jail('18:00', 'Hezky', 'Max', 0, '<div>in_div</div><div>in_div</div>😃')
Messages.admin_unban('18:00', 'Hezky', 'Max','ne <div>in_div</div>😃')
Messages.admin_unmute('18:00', 'Hezky', 'Max','ne <div>in_div</div>😃')
Messages.admin_unjail('18:00', 'Hezky', 'Max','ne <div>in_div</div>😃')
Messages.admin_message('18:00', 'Hezky', '<div>in_div</div>😃')
Messages.server('18:00', '<div>in_div</div>😃')
Messages.advert('18:00', 'Max-Black', 'Olivia Moore', '<3 <div>in_div</div>😃', '555-555')
Messages.government('18:00', 'Hezky', '<div>in_div</div>😃')
Messages.news('18:00', 'Hezky', '<div>in_div</div>😃')
*/