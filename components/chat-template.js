vue_app.component('chat-template', {
  data() {
    return {
      loading: true
    }
  },
  mounted: async function () {
    await include_source(scripts.chat);
    chat_tmpl = document.getElementById('chat');
    onRenderFinished("chat");
  },
  updated: function () {
    if (this.loading && mountedApp.show['chat']) {
      Chat.load();
      this.loading = false;
    }
  },
  unmounted: function () {
    remove_source(scripts.chat);
    this.loading = true;
    chat_tmpl = null;
    switchTemplate(false, 'chat')
  },
  template:
    /*html*/
    `<div id="chat" class="chat">
        <div id="chat-hideable" class="hideChatInput">
          <!--Left bottom commands: /me /do /todo /try-->
          <div class="commands-wrapper">
            <table>
              <tr>
                <td><div id="me" class="command-block" onclick="Messages.updateChannel('/me ')" style="opacity:1;"><span>/me</span></div></td>
                <td><div id="do" class="command-block" onclick="Messages.updateChannel('/do ')" style="opacity:1;"><span>/do</span></div></td>
                <td><div id="todo" class="command-block" onclick="Messages.updateChannel('/todo ')" style="opacity:1;"><span>/todo</span></div></td>
                <td><div id="try" class="command-block" onclick="Messages.updateChannel('/try ')" style="opacity:1;"><span>/try</span></div></td>
              </tr>
            </table>
          </div>
          <!--Right bottom channels-->
          <div class="channel-wrapper">
            <table>
              <tr>
                <td><div id="fraction" class="left-channel" onclick="Messages.updateChannel('/f ')" style="opacity:1;"><span>Фракция</span></div></td>
                <td><div id="general" class="right-channel" onclick="Messages.updateChannel('/say ')" style="opacity:1;"><span>Общий</span></div></td>
              </tr>
              <tr>
                <td><div id="organisation" class="left-channel" onclick="Messages.updateChannel('/o ')" style="opacity:1;"><span>Организация</span></div></td>
                <td><div id="NonRP" class="right-channel" onclick="Messages.updateChannel('/n ')" style="opacity:1;"><span>NonRP</span></div></td>
              </tr>
            </table>
          </div>
          <!--Message input-->
          <form onsubmit="return false;">
            <div class="chat-type" id="chat-block-text"><span id="chat-text"></span></div>
            <input id="chat-message" type="text" placeholder="Введите текст..." oninput="Messages.updateChannel(this.value)" onkeydown="Chat.inputkeydown(event)" onkeypress="Chat.onkeypress()" onkeyup="Chat.onkeyup(event)" autocomplete="off" spellcheck="false" onblur="Chat.blurInput()">
            <div class="send-arrow-wrapper">
              <svg id="send-arrow" onclick="Chat.send()" width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 6.63398C14.1667 7.01888 14.1667 7.98113 13.5 8.36603L5.25 13.1292C4.58333 13.5141 3.75 13.0329 3.75 12.2631L3.75 2.73686C3.75 1.96706 4.58333 1.48593 5.25 1.87083L13.5 6.63398Z" fill="#535A61"/><path d="M15.5 6.63398C16.1667 7.01888 16.1667 7.98113 15.5 8.36603L7.25 13.1292C6.58333 13.5141 5.75 13.0329 5.75 12.2631L5.75 2.73686C5.75 1.96706 6.58333 1.48593 7.25 1.87083L15.5 6.63398Z" fill="#EBEBEB"/></svg>
            </div>
          </form>
        </div>
        <div class="chat-wrapper">
          <div id="chat-container" class="chat-container" tabindex="0" onkeydown="Chat.onkeydown(event)"></div>
        </div>
      </div>`
})