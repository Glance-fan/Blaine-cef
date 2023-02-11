vue_app.component('chat-template', {
  data() {
    return {
      loading: true
    }
  },
  mounted: async function () {
    await include_source(scripts.chat);
    chat_tmpl = document.getElementById('chat');
    resizeBigger(chat_tmpl);
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
            <img src="libs/svgs/chat/arrow.svg" id="send-arrow" onclick="Chat.send()">
          </form>
        </div>
        <div class="chat-wrapper">
          <div id="chat-container" class="chat-container" tabindex="0" onkeydown="Chat.onkeydown(event)"></div>
        </div>
      </div>`
})