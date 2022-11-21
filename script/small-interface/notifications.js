var Notific = class Notification {
    static notifications = [];

    static draw(interval, icon, msginit, text, maxAmount, choice) {
        var notific = document.createElement('div');
        notific.classList.add('notification');
        icon = icon in icons ? icons[icon] : icons["Information"];
        notific.innerHTML = /*html*/ `
        <div style="display:flex">
            <div class="notific-icon">${icon}</div>
            <div class="content">
                <div style="font-size: 16px;">${msginit}</div>
                <div class="notific-gray-text notification-message">${text}</div>
            </div>
        </div>`;
        if (choice) this.addChoice(notific)

        if (this.notifications.length >= maxAmount) this.clearOne(this.notifications.shift())
        this.notifications.push(notific);

        document.querySelector('.notification-container').append(notific);

        setTimeout(() => {
            notific.style.opacity = 1;
        }, 0);

        setTimeout(this.clearOne, interval, notific);
    }

    static addChoice(notific) {
        var choice = document.createElement('div');
        choice.classList.add('notific-choice');

        choice.innerHTML = /*html*/
            `<div class="notific-choice-wrapper">
                <div>
                    <div class="notific-choice-btn" style="margin-right: 10px">Y</div>
                    <div class="notific-gray-text">Принять</div>
                </div>
                <div>
                    <div class="notific-gray-text" style="margin-right: 10px">Отклонить</div>
                    <div class="notific-choice-btn">N</div>
                </div>
            </div>`;
        notific.append(choice);
    }

    static pressedChoice(event) {
        event.preventDefault();
        if (event.keyCode == 78 || event.keyCode == 89) { //89 - Y, 78 - N
            //TBD
        }
    }

    static clearOne(notific) {
        if (notific == null) return;
        notific.style.opacity = 0;
        if (notific.querySelector('.notific-choice')) document.body.removeAttribute('onkeyup');
        setTimeout(() => {
            notific.remove()
        }, 700)
    }

    static clearAll() {
        for (var index = 0; index < this.notifications.length; index++)
            this.clearOne(this.notifications[index]);
        this.notifications = [];
        if (this.nowDialoge) this.clearOne(this.nowDialoge)
    }
}