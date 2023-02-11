var Chat = class Chat {
  static message = document.getElementById('chat-message');
  static container = document.getElementById('chat-container');
  static currentScrollPos = 0;
  static step = 10;
  static userChatMessages = [];
  static userMessages = [];
  static curFont = 14;
  static backspaceCounter = 1;
  static curChatMessageIndex = -1;
  static justChanged;
  static active_type = 0;
  static needScrollVar;
  static showTime = false;
  static useServerTime = true;

  static load() {
    this.container.focus();
    setTimeout(() => {
      Messages.onChange('say')
    }, 0)
  }

  static setShowTime(value) {
    this.showTime = value;
  }

  static setTime(value) {
    this.useServerTime = value;
  }

  static getTime() {
    var date = new Date();
    if (this.useServerTime)
      return (date.getUTCHours() + 3).toString() + ":" + date.getMinutes().toString() + ":" + date.getSeconds().toString();
    else
      return date.getHours().toString() + ":" + date.getMinutes().toString() + ":" + date.getSeconds().toString();
  }

  /*show/hide bottom chat block funciton*/
  static switchInput(status) {
    var hideable = document.querySelector('.hideChatInput') || document.querySelector('.showChatInput');
    if (status) {
      this.message.disabled = false;
      hideable.classList.add('showChatInput');
      this.message.value = '';
      hideable.classList.remove('hideChatInput');
      this.message.focus();
    } else {
      this.message.disabled = true;
      hideable.classList.add('hideChatInput');
      hideable.classList.remove('showChatInput');
      this.blurInput();
    }
  }

  static blurInput() {
    this.container.tabIndex = 0;
    this.container.focus();
    this.message.tabIndex = 1;
  }

  static switchHeight(newheight) {
    if (newheight > 276) return;
    this.container.parentElement.style.height = newheight + "px";
    this.container.style.maxHeight = newheight + "px";
  }

  static switchFont(newfont) {
    //  if (newfontsize > 30) return;
    var messages = this.container.getElementsByTagName('div');
    for (var i = 0; i < messages.length; i++) {
      messages[i].style.fontSize = newfont + "px";
    }
    for (var i = 0; i < messages.length; i++) {
      if (messages[i].id != "") {
        var newlineHeight = messages[i + 1].clientHeight + 3;
        messages[i].style.height = newlineHeight + "px";
      }
    }
    this.curFont = newfont;
  }

  /*called before sending the message*/
  static needScroll(ignoreIf = false) {
    if ((Math.abs(this.container.scrollHeight - this.container.clientHeight - this.container.scrollTop) < 1)) {
      this.needScrollVar = true;
    } else if (message.parentElement.parentElement.classList.contains("hideChatInput") || ignoreIf)
      this.needScrollVar = true;
    else this.needScrollVar = false;
  }

  /*called after sending the message*/
  static tryScroll() {
    if (this.needScrollVar) this.container.scrollTop = this.container.scrollHeight //[0]
  }

  static inputkeydown(event) {
    if (event.keyCode === 38 || event.keyCode === 9)
      event.preventDefault();
  }

  static onkeydown(event) {
    /*spacebar*/
    if (event.keyCode === 32) {
      event.preventDefault();
    }

    /*PageUp*/
    if (event.keyCode === 33) {
      event.preventDefault();
      if (this.currentScrollPos != 0) {
        this.currentScrollPos -= this.step;
        this.container.scrollTop = this.currentScrollPos;
      }
    }

    /*PageDown*/
    if (event.keyCode === 34) {
      event.preventDefault();
      if (!(Math.abs(this.container.scrollHeight - this.container.clientHeight - this.container.scrollTop) < 1)) {
        this.currentScrollPos += this.step;
        this.container.scrollTop = this.currentScrollPos;
      }
    }
  }

  static onkeypress() {
    this.backspaceCounter = 0;
  }

  static onkeyup(event) {
    event.preventDefault();

    if (event.which == 13) { //enter
      Chat.send();
    }

    if (event.which == 38 && this.curChatMessageIndex > -1) { //arrow up - вниз по массиву
      if (this.curChatMessageIndex - 1 < 0) {
        Messages.updateChannel(this.userChatMessages[this.curChatMessageIndex]);
        this.message.value = this.userMessages[this.curChatMessageIndex];
      } else {
        Messages.updateChannel(this.userChatMessages[this.curChatMessageIndex - 1]);
        this.message.value = this.userMessages[this.curChatMessageIndex - 1];
      }
      if (this.curChatMessageIndex - 1 > -1) this.curChatMessageIndex--;
      this.justChanged = false;
      this.backspaceCounter = 0;
    }

    if (event.which == 40 && this.curChatMessageIndex > -1) { //arrow up - вверх по массиву
      if (this.curChatMessageIndex + 1 == this.userMessages.length || this.curChatMessageIndex == this.userMessages.length) this.message.value = "";
      else {
        Messages.updateChannel(this.userChatMessages[this.curChatMessageIndex + 1]);
        this.message.value = this.userMessages[this.curChatMessageIndex + 1];
      }
      if (this.curChatMessageIndex + 1 < this.userMessages.length || this.curChatMessageIndex < this.userMessages.length) this.curChatMessageIndex++;
      this.justChanged = false;
      this.backspaceCounter = 0;
    }

    /*backspace - вернуть в канал general/say*/
    if (event.which == 8 && this.message.value == "" && this.active_type != 0) {
      this.backspaceCounter++;
      if (this.backspaceCounter == 2) {
        Messages.updateChannel('/say ');
        this.backspaceCounter = 0;
      }
    } else if (event.which == 8 && this.message.value != "" && this.active_type != 0) {
      if (this.justChanged) {
        this.justChanged = false;
        this.backspaceCounter = 0;
      } else this.backspaceCounter = 0;
    }
  }

  static send() {
    if (this.message.value != "") {
      Messages.send(this.active_type, this.message.value);
      if (this.userMessages.length == 0 || this.userChatMessages.length == 0 || (this.userMessages[this.userMessages.length - 1] != this.message.value || this.userChatMessages[this.userChatMessages.length - 1] != Messages.channels[1][this.active_type])) {
        this.userMessages.push(this.message.value);
        this.userChatMessages.push(Messages.channels[1][this.active_type]);
      }
      this.curChatMessageIndex = this.userMessages.length;
      this.message.value = "";
      Messages.updateChannel('/say ');
    } else Messages.send(this.active_type, this.message.value);
  }
}

var chat_svgs = {
  phone: `<div style="position: relative; top: 2px; left:10px;"><svg  width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.48139 4.92891C3.3028 3.75141 4.13436 2.69109 5.40467 2.30203C5.63022 2.233 5.87361 2.25261 6.08519 2.35688C6.29677 2.46115 6.4606 2.64221 6.54327 2.86312L6.95061 3.95062C7.0161 4.12556 7.02784 4.31607 6.98433 4.49772C6.94082 4.67937 6.84403 4.84388 6.70639 4.97016L5.49467 6.08156C5.43491 6.13646 5.39038 6.2059 5.36541 6.28311C5.34044 6.36033 5.33588 6.44269 5.35217 6.52219L5.36295 6.57094L5.39295 6.69328C5.41967 6.79641 5.45998 6.94172 5.5167 7.11516C5.6292 7.45969 5.80873 7.92281 6.07592 8.38547C6.34311 8.84812 6.65436 9.23531 6.89623 9.50484C7.02221 9.64518 7.15388 9.7803 7.29092 9.90984L7.32842 9.94453C7.38903 9.99821 7.46251 10.0353 7.5417 10.0521C7.62089 10.069 7.70309 10.065 7.7803 10.0406L9.34873 9.54703C9.52694 9.49101 9.71781 9.48951 9.89688 9.54271C10.0759 9.59591 10.235 9.70139 10.3537 9.84563L11.0958 10.7466C11.4051 11.1216 11.3686 11.6728 11.0128 12.0042C10.0406 12.9103 8.70373 13.0964 7.77373 12.3483C6.6338 11.4289 5.6728 10.3075 4.93873 9.04031C4.1986 7.77391 3.70417 6.37918 3.48139 4.92937V4.92891ZM6.3342 6.58359L7.34014 5.66109C7.61543 5.40855 7.80899 5.07952 7.89602 4.71622C7.98305 4.35291 7.95956 3.9719 7.82858 3.62203L7.42077 2.53453C7.25439 2.09022 6.92483 1.72608 6.49927 1.51634C6.0737 1.30661 5.58416 1.26707 5.13045 1.40578C3.55311 1.88859 2.28655 3.30281 2.55467 5.06953C2.74217 6.30375 3.17483 7.87266 4.12827 9.51188C4.92002 10.8784 5.9565 12.0876 7.18592 13.0791C8.58045 14.1994 10.4433 13.8173 11.6522 12.69C11.9981 12.3676 12.208 11.9254 12.2391 11.4536C12.2702 10.9817 12.1201 10.5158 11.8195 10.1508L11.0775 9.24984C10.84 8.96129 10.5218 8.75027 10.1636 8.64386C9.80533 8.53746 9.42349 8.54052 9.06702 8.65266L7.7653 9.06234C7.70703 9.00242 7.64999 8.94131 7.5942 8.87906C7.32668 8.58309 7.08999 8.26065 6.8878 7.91672C6.69096 7.56959 6.52998 7.20333 6.40733 6.82359C6.38132 6.7441 6.35694 6.66408 6.3342 6.58359Z" fill="white"/></svg></div>`,
  sms: `<div style="position: relative; top: 2px; left: 15px;"><svg   width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 1.25H2.5C1.8125 1.25 1.25 1.8125 1.25 2.5V13.75L3.75 11.25H12.5C13.1875 11.25 13.75 10.6875 13.75 10V2.5C13.75 1.8125 13.1875 1.25 12.5 1.25ZM12.5 10H3.23125L2.5 10.7312V2.5H12.5V10ZM4.375 5.625H5.625V6.875H4.375V5.625ZM9.375 5.625H10.625V6.875H9.375V5.625ZM6.875 5.625H8.125V6.875H6.875V5.625Z" fill="white"/></svg></div>`
};