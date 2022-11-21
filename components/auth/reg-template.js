vue_app.component('reg-template', {
  mounted: async function () {
    await include_source(scripts.reg);
    reg_tmpl = document.querySelector('.registration-block');
    resizeBigger(reg_tmpl);
    onRenderFinished('reg');
  },
  unmounted: function () {
    remove_source(scripts.reg);
    switchTemplate(false, 'reg');
    reg_tmpl = null;
  },
  template:
    /*html*/
    `<div class="registration-block">
    <div class="rules-block">
      <div class="rules-top">
        <svg width="25" height="31" viewBox="0 0 25 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17.1416 3.16683H3.21973V27.8335H21.7822V7.79183H17.1416V3.16683ZM3.21973 0.0834961H18.6885L24.876 6.25016V27.8335C24.876 28.6512 24.55 29.4355 23.9698 30.0137C23.3896 30.592 22.6027 30.9168 21.7822 30.9168H3.21973C2.39921 30.9168 1.61231 30.592 1.03211 30.0137C0.451924 29.4355 0.125977 28.6512 0.125977 27.8335V3.16683C0.125977 2.34908 0.451924 1.56482 1.03211 0.986583C1.61231 0.408346 2.39921 0.0834961 3.21973 0.0834961ZM6.31348 13.9585H18.6885V17.0418H6.31348V13.9585ZM6.31348 20.1252H18.6885V23.2085H6.31348V20.1252Z"
            fill="white" />
        </svg>
        <svg style="position: absolute; right: 0px;" onclick="AuthReg.closeRules()" width="24" height="24" viewBox="0 0 24 24"
          fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM14.71 13.29C14.8037 13.383 14.8781 13.4936 14.9289 13.6154C14.9797 13.7373 15.0058 13.868 15.0058 14C15.0058 14.132 14.9797 14.2627 14.9289 14.3846C14.8781 14.5064 14.8037 14.617 14.71 14.71C14.617 14.8037 14.5064 14.8781 14.3846 14.9289C14.2627 14.9797 14.132 15.0058 14 15.0058C13.868 15.0058 13.7373 14.9797 13.6154 14.9289C13.4936 14.8781 13.383 14.8037 13.29 14.71L12 13.41L10.71 14.71C10.617 14.8037 10.5064 14.8781 10.3846 14.9289C10.2627 14.9797 10.132 15.0058 10 15.0058C9.86799 15.0058 9.73729 14.9797 9.61543 14.9289C9.49357 14.8781 9.38297 14.8037 9.29 14.71C9.19628 14.617 9.12188 14.5064 9.07111 14.3846C9.02034 14.2627 8.99421 14.132 8.99421 14C8.99421 13.868 9.02034 13.7373 9.07111 13.6154C9.12188 13.4936 9.19628 13.383 9.29 13.29L10.59 12L9.29 10.71C9.1017 10.5217 8.99591 10.2663 8.99591 10C8.99591 9.7337 9.1017 9.4783 9.29 9.29C9.47831 9.1017 9.7337 8.99591 10 8.99591C10.2663 8.99591 10.5217 9.1017 10.71 9.29L12 10.59L13.29 9.29C13.4783 9.1017 13.7337 8.99591 14 8.99591C14.2663 8.99591 14.5217 9.1017 14.71 9.29C14.8983 9.4783 15.0041 9.7337 15.0041 10C15.0041 10.2663 14.8983 10.5217 14.71 10.71L13.41 12L14.71 13.29Z"
            fill="white" />
        </svg>
        <p class="auth-text" style="margin-left: 10px;">
          <span style="font-weight: 600; font-size: 16px;">Правила проекта</span><br>
          <span style="font-weight: 300; font-size: 12px; opacity: 0.5;">Правила едины для всех!</span>
        </p>
      </div>
      <div class="rules-bottom">
        <label class="auth-text" for="check">Подтвердите, что вы ознакомились с правилами проекта</label>
        <svg name="check" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle onclick="AuthReg.rulesChecked(this)" cx="10" cy="10" r="10" fill="#3F3F3F" />
        </svg>
      </div>
      <div class="rules-text auth-text"></div>
    </div>
    <div class="reg-panel">
      <div class="auth-logo"><img id="reg-logo"></div>
      <div class="auth-text hello" id="rg-hello"></div>
      <table class="inputs">
        <tr>
          <td>
            <div>
              <div class="static" id="rg-login-static">
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" y="0.5" width="49" height="49" rx="4.5" fill="white" fill-opacity="0.3"
                    stroke="white" />
                  <path
                    d="M25 26.125C27.7949 26.125 30.0625 23.8574 30.0625 21.0625C30.0625 18.2676 27.7949 16 25 16C22.2051 16 19.9375 18.2676 19.9375 21.0625C19.9375 23.8574 22.2051 26.125 25 26.125ZM29.5 27.25H27.5629C26.7824 27.6086 25.9141 27.8125 25 27.8125C24.0859 27.8125 23.2211 27.6086 22.4371 27.25H20.5C18.0145 27.25 16 29.2645 16 31.75V32.3125C16 33.2441 16.7559 34 17.6875 34H32.3125C33.2441 34 34 33.2441 34 32.3125V31.75C34 29.2645 31.9855 27.25 29.5 27.25Z"
                    fill="white" />
                </svg>
                <svg width="350" height="50" viewBox="0 0 350 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M10.0574 0H3C1.34315 0 0 1.34315 0 3V47C0 48.6569 1.34315 50 3.00001 50H347C348.657 50 350 48.6569 350 47V3C350 1.34315 348.657 0 347 0H69.4136L69.4477 1.99956L69.4218 2H347C347.552 2 348 2.44772 348 3V47C348 47.5523 347.552 48 347 48H3.00001C2.44772 48 2 47.5523 2 47V3C2 2.44772 2.44772 2 3 2H10.0914L10.0573 2.13295e-06L10.0574 0Z"
                    fill="white" />
                </svg>
                <svg class="auth-icon" onmouseenter="AuthReg.showTooltip(0, true)" onmouseleave="AuthReg.showTooltip(0)" width="16" height="16" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346625 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0ZM8 13.1429C7.83048 13.1429 7.66476 13.0926 7.5238 12.9984C7.38284 12.9042 7.27298 12.7703 7.20811 12.6137C7.14323 12.4571 7.12626 12.2848 7.15933 12.1185C7.1924 11.9522 7.27404 11.7995 7.39391 11.6796C7.51378 11.5597 7.66651 11.4781 7.83278 11.445C7.99905 11.412 8.17139 11.4289 8.32802 11.4938C8.48464 11.5587 8.61851 11.6686 8.71269 11.8095C8.80687 11.9505 8.85715 12.1162 8.85715 12.2857C8.85715 12.513 8.76684 12.7311 8.60609 12.8918C8.44535 13.0525 8.22733 13.1429 8 13.1429ZM8.65257 8.712V10.1411H7.36686V7.42857H8.58115C8.94131 7.42857 9.28672 7.2855 9.5414 7.03082C9.79607 6.77615 9.93914 6.43073 9.93914 6.07057C9.93914 5.71041 9.79607 5.36499 9.5414 5.11032C9.28672 4.85565 8.94131 4.71257 8.58115 4.71257H7.724C7.36421 4.71302 7.01927 4.85615 6.76486 5.11057C6.51044 5.36499 6.36731 5.70992 6.36686 6.06971V6.43428H5.08115V6.06971C5.08205 5.36922 5.36084 4.6977 5.85633 4.20254C6.35181 3.70738 7.02351 3.42902 7.724 3.42857H8.58115C9.27469 3.43016 9.9398 3.70436 10.433 4.19201C10.9261 4.67966 11.2078 5.34165 11.2171 6.03513C11.2265 6.72861 10.9629 7.39798 10.4831 7.89878C10.0033 8.39958 9.34582 8.69166 8.65257 8.712Z"
                    fill="white" />
                </svg>
                <div class="auth-tooltip" style="right: -145px;">
                  <div class="auth-tooltip-arrow"></div>
                  <div class="auth-tooltip-block">
                    <p class="auth-text ttp-text">Логин от 5 до 15 букв/цифр</p>
                  </div>
                </div>
                <span class="auth-text up-input-text">Логин</span>
              </div>
              <input class="auth-text" maxlength="15" onfocus="AuthReg.onfocus(this.id)" onblur="AuthReg.onblur(this.id)" autocomplete="off" spellcheck="false"  id="rg-login" type="text" placeholder="Ввод..." />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div style="position:absolute; top: 81px; left:0px">
              <div class="static" id="rg-email-static">
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" y="0.5" width="49" height="49" rx="4.5" fill="white" fill-opacity="0.3"
                    stroke="white" />
                  <path
                    d="M24.6895 19.9493C26.0637 19.9493 27.3586 20.5585 28.3075 21.5108V21.5136C28.3075 21.0563 28.6152 20.7104 29.0404 20.7104H29.1484C29.8195 20.7104 29.9539 21.3432 29.9539 21.5429L29.9567 28.6501C29.9101 29.1158 30.4377 29.3566 30.7307 29.0573C31.8698 27.8856 33.235 23.0279 30.0214 20.2154C27.0244 17.5902 23.002 18.0239 20.8634 19.4976C18.5903 21.0681 17.1374 24.5371 18.5487 27.7973C20.0899 31.3518 24.496 32.4121 27.1184 31.3546C28.4459 30.8185 29.0579 32.6106 27.6781 33.1973C25.5985 34.0844 19.8031 33.9938 17.0963 29.3065C15.2676 26.1402 15.3644 20.5703 20.2165 17.6847C23.9251 15.4758 28.8182 16.0878 31.768 19.1674C34.8505 22.39 34.6722 28.4194 31.6628 30.7634C30.2999 31.8293 28.276 30.7926 28.2906 29.2396L28.2754 28.7333C27.3265 29.6733 26.0637 30.2245 24.6895 30.2245C21.9709 30.2245 19.5775 27.8305 19.5775 25.1148C19.5775 22.3698 21.9709 19.9504 24.6895 19.9504V19.9493ZM28.1089 24.9184C28.006 22.9289 26.5294 21.7308 24.7452 21.7308H24.6777C22.6212 21.7308 21.4787 23.3508 21.4787 25.1873C21.4787 27.2466 22.8586 28.5471 24.6692 28.5471C26.6903 28.5471 28.0172 27.0683 28.114 25.3189L28.1089 24.9184Z"
                    fill="white" />
                </svg>
                <svg width="350" height="51" viewBox="0 0 350 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M69.3 2.15254H347C347.552 2.15254 348 2.60026 348 3.15254V47.1525C348 47.7048 347.552 48.1525 347 48.1525H3.00001C2.44772 48.1525 2 47.7048 2 47.1525V3.15254C2 2.60026 2.44772 2.15254 3 2.15254H10.06V0.152542H3C1.34315 0.152542 0 1.49569 0 3.15254V47.1525C0 48.8094 1.34315 50.1525 3.00001 50.1525H347C348.657 50.1525 350 48.8094 350 47.1525V3.15254C350 1.49569 348.657 0.152542 347 0.152542H69.3V2.15254Z"
                    fill="white" />
                </svg>
                <svg class="auth-icon" onmouseenter="AuthReg.showTooltip(1, true)" onmouseleave="AuthReg.showTooltip(1)" width="16" height="16" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346625 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0ZM8 13.1429C7.83048 13.1429 7.66476 13.0926 7.5238 12.9984C7.38284 12.9042 7.27298 12.7703 7.20811 12.6137C7.14323 12.4571 7.12626 12.2848 7.15933 12.1185C7.1924 11.9522 7.27404 11.7995 7.39391 11.6796C7.51378 11.5597 7.66651 11.4781 7.83278 11.445C7.99905 11.412 8.17139 11.4289 8.32802 11.4938C8.48464 11.5587 8.61851 11.6686 8.71269 11.8095C8.80687 11.9505 8.85715 12.1162 8.85715 12.2857C8.85715 12.513 8.76684 12.7311 8.60609 12.8918C8.44535 13.0525 8.22733 13.1429 8 13.1429ZM8.65257 8.712V10.1411H7.36686V7.42857H8.58115C8.94131 7.42857 9.28672 7.2855 9.5414 7.03082C9.79607 6.77615 9.93914 6.43073 9.93914 6.07057C9.93914 5.71041 9.79607 5.36499 9.5414 5.11032C9.28672 4.85565 8.94131 4.71257 8.58115 4.71257H7.724C7.36421 4.71302 7.01927 4.85615 6.76486 5.11057C6.51044 5.36499 6.36731 5.70992 6.36686 6.06971V6.43428H5.08115V6.06971C5.08205 5.36922 5.36084 4.6977 5.85633 4.20254C6.35181 3.70738 7.02351 3.42902 7.724 3.42857H8.58115C9.27469 3.43016 9.9398 3.70436 10.433 4.19201C10.9261 4.67966 11.2078 5.34165 11.2171 6.03513C11.2265 6.72861 10.9629 7.39798 10.4831 7.89878C10.0033 8.39958 9.34582 8.69166 8.65257 8.712Z"
                    fill="white" />
                </svg>
                <div class="auth-tooltip" style="right: -155px;">
                  <div class="auth-tooltip-arrow"></div>
                  <div class="auth-tooltip-block">
                    <p class="auth-text ttp-text">Почта: не должна содержать<br/>спецсимволы (Только - . _ @)</p>
                  </div>
                </div>
                <span class="auth-text up-input-text">Почта</span>
              </div>
              <input class="auth-text" onfocus="AuthReg.onfocus(this.id)" onblur="AuthReg.onblur(this.id)" autocomplete="off" spellcheck="false" 
                id="rg-email" type="text" placeholder="Ввод..." />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div style="position:absolute; top: 162px; left:0px">
              <div class="static" id="rg-password1-static">
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" y="0.5" width="49" height="49" rx="4.5" fill="white" fill-opacity="0.3"
                    stroke="white" />
                  <path
                    d="M29.5 22H31C31.1989 22 31.3897 22.079 31.5303 22.2197C31.671 22.3603 31.75 22.5511 31.75 22.75V31.75C31.75 31.9489 31.671 32.1397 31.5303 32.2803C31.3897 32.421 31.1989 32.5 31 32.5H19C18.8011 32.5 18.6103 32.421 18.4697 32.2803C18.329 32.1397 18.25 31.9489 18.25 31.75V22.75C18.25 22.5511 18.329 22.3603 18.4697 22.2197C18.6103 22.079 18.8011 22 19 22H20.5V21.25C20.5 20.0565 20.9741 18.9119 21.818 18.068C22.6619 17.2241 23.8065 16.75 25 16.75C26.1935 16.75 27.3381 17.2241 28.182 18.068C29.0259 18.9119 29.5 20.0565 29.5 21.25V22ZM28 22V21.25C28 20.4544 27.6839 19.6913 27.1213 19.1287C26.5587 18.5661 25.7956 18.25 25 18.25C24.2044 18.25 23.4413 18.5661 22.8787 19.1287C22.3161 19.6913 22 20.4544 22 21.25V22H28ZM24.25 26.5V28H25.75V26.5H24.25ZM21.25 26.5V28H22.75V26.5H21.25ZM27.25 26.5V28H28.75V26.5H27.25Z"
                    fill="white" />
                </svg>
                <svg width="350" height="50" viewBox="0 0 350 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M78.4483 2H347C347.552 2 348 2.44772 348 3V47C348 47.5523 347.552 48 347 48H3.00001C2.44772 48 2 47.5523 2 47V3C2 2.44772 2.44772 2 3 2H10.0575V0H3C1.34315 0 0 1.34315 0 3V47C0 48.6569 1.34315 50 3.00001 50H347C348.657 50 350 48.6569 350 47V3C350 1.34315 348.657 0 347 0H78.4483V2Z"
                    fill="white" />
                </svg>
                <svg class="auth-icon" onmouseenter="AuthReg.showTooltip(2, true)" onmouseleave="AuthReg.showTooltip(2)" width="16" height="16" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346625 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0ZM8 13.1429C7.83048 13.1429 7.66476 13.0926 7.5238 12.9984C7.38284 12.9042 7.27298 12.7703 7.20811 12.6137C7.14323 12.4571 7.12626 12.2848 7.15933 12.1185C7.1924 11.9522 7.27404 11.7995 7.39391 11.6796C7.51378 11.5597 7.66651 11.4781 7.83278 11.445C7.99905 11.412 8.17139 11.4289 8.32802 11.4938C8.48464 11.5587 8.61851 11.6686 8.71269 11.8095C8.80687 11.9505 8.85715 12.1162 8.85715 12.2857C8.85715 12.513 8.76684 12.7311 8.60609 12.8918C8.44535 13.0525 8.22733 13.1429 8 13.1429ZM8.65257 8.712V10.1411H7.36686V7.42857H8.58115C8.94131 7.42857 9.28672 7.2855 9.5414 7.03082C9.79607 6.77615 9.93914 6.43073 9.93914 6.07057C9.93914 5.71041 9.79607 5.36499 9.5414 5.11032C9.28672 4.85565 8.94131 4.71257 8.58115 4.71257H7.724C7.36421 4.71302 7.01927 4.85615 6.76486 5.11057C6.51044 5.36499 6.36731 5.70992 6.36686 6.06971V6.43428H5.08115V6.06971C5.08205 5.36922 5.36084 4.6977 5.85633 4.20254C6.35181 3.70738 7.02351 3.42902 7.724 3.42857H8.58115C9.27469 3.43016 9.9398 3.70436 10.433 4.19201C10.9261 4.67966 11.2078 5.34165 11.2171 6.03513C11.2265 6.72861 10.9629 7.39798 10.4831 7.89878C10.0033 8.39958 9.34582 8.69166 8.65257 8.712Z"
                    fill="white" />
                </svg>
                <div class="auth-tooltip" style="right: -163px;">
                  <div class="auth-tooltip-arrow"></div>
                  <div class="auth-tooltip-block">
                    <p class="auth-text ttp-text">Пароль: не должен содержать<br/>спецсимволы (Только - . _ @)</p>
                  </div>
                </div>
                <span class="auth-text up-input-text">Пароль</span>
              </div>
              <input class="auth-text" onfocus="AuthReg.onfocus(this.id)" onblur="AuthReg.onblur(this.id)" autocomplete="off" spellcheck="false" id="rg-password1" type="password" placeholder="Ввод..." />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div style="position:absolute; top: 243px; left:0px">
              <div class="static" id="rg-password2-static">
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" y="0.5" width="49" height="49" rx="4.5" fill="white" fill-opacity="0.3"
                    stroke="white" />
                  <path
                    d="M29.5 22H31C31.1989 22 31.3897 22.079 31.5303 22.2197C31.671 22.3603 31.75 22.5511 31.75 22.75V31.75C31.75 31.9489 31.671 32.1397 31.5303 32.2803C31.3897 32.421 31.1989 32.5 31 32.5H19C18.8011 32.5 18.6103 32.421 18.4697 32.2803C18.329 32.1397 18.25 31.9489 18.25 31.75V22.75C18.25 22.5511 18.329 22.3603 18.4697 22.2197C18.6103 22.079 18.8011 22 19 22H20.5V21.25C20.5 20.0565 20.9741 18.9119 21.818 18.068C22.6619 17.2241 23.8065 16.75 25 16.75C26.1935 16.75 27.3381 17.2241 28.182 18.068C29.0259 18.9119 29.5 20.0565 29.5 21.25V22ZM28 22V21.25C28 20.4544 27.6839 19.6913 27.1213 19.1287C26.5587 18.5661 25.7956 18.25 25 18.25C24.2044 18.25 23.4413 18.5661 22.8787 19.1287C22.3161 19.6913 22 20.4544 22 21.25V22H28ZM24.25 26.5V28H25.75V26.5H24.25ZM21.25 26.5V28H22.75V26.5H21.25ZM27.25 26.5V28H28.75V26.5H27.25Z"
                    fill="white" />
                </svg>
                <svg width="350" height="50" viewBox="0 0 350 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M160.91 2H347C347.552 2 348 2.44772 348 3V47C348 47.5523 347.552 48 347 48H3.00001C2.44772 48 2 47.5523 2 47V3C2 2.44772 2.44772 2 3 2H10.05V0H3C1.34315 0 0 1.34315 0 3V47C0 48.6569 1.34315 50 3.00001 50H347C348.657 50 350 48.6569 350 47V3C350 1.34315 348.657 0 347 0H160.91V2Z"
                    fill="white" />
                </svg>
                <span class="auth-text up-input-text">Повторите пароль</span>
              </div>
              <!--onkeyup="checkMatch()"-->
              <input class="auth-text"  onfocus="AuthReg.onfocus(this.id)"
                onblur="AuthReg.onblur(this.id)" autocomplete="off" spellcheck="false"  id="rg-password2" type="password" placeholder="Ввод..." />
            </div>
          </td>
        </tr>
      </table>
      <div class="confirm">
        <p>Чтобы продолжить регистрацию, прочитайте правила и согласитесь с ними, нажав на галочку</p>
        <svg id="rg-confirm" onclick="AuthReg.showRules()" width="37" height="37" viewBox="0 0 37 37"
          fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="36" height="36" rx="4.5" fill="white" fill-opacity="0.3" stroke="white" />
          <path
            d="M20.7503 10.6668H12.5003V25.3335H23.5003V13.4168H20.7503V10.6668ZM12.5003 8.8335H21.667L25.3337 12.5002V25.3335C25.3337 25.8197 25.1405 26.286 24.7967 26.6299C24.4529 26.9737 23.9866 27.1668 23.5003 27.1668H12.5003C12.0141 27.1668 11.5478 26.9737 11.204 26.6299C10.8601 26.286 10.667 25.8197 10.667 25.3335V10.6668C10.667 10.1806 10.8601 9.71428 11.204 9.37047C11.5478 9.02665 12.0141 8.8335 12.5003 8.8335V8.8335ZM14.3337 17.0835H21.667V18.9168H14.3337V17.0835ZM14.3337 20.7502H21.667V22.5835H14.3337V20.7502Z"
            fill="white" />
        </svg>
      </div>
      <button onclick="AuthReg.registerAttempt()" style="bottom: 29px" class="auth-button red-button" id="rg-button"
        disabled="disabled">Создать</button>
    </div>
  </div>
`
})