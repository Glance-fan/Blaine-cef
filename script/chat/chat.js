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
    setTimeout(() => {
      this.container.focus();
    }, 0);
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
      setTimeout(() => {
        this.message.focus();
      }, 0);
    } else {
      this.message.disabled = true;
      hideable.classList.add('hideChatInput');
      hideable.classList.remove('showChatInput');
      this.blurInput();
    }
  }

  static blurInput() {
    this.container.tabIndex = 0;
    setTimeout(() => {
      this.container.focus();
    }, 0);
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