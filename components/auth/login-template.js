vue_app.component('login-template', {
  mounted: async function () {
    await include_source(scripts.login);
    login_tmpl = document.querySelector('.login-block');
    resizeBigger(login_tmpl);
    onRenderFinished('login');
  },
  unmounted: function () {
    remove_source(scripts.login);
    switchTemplate(false, 'login');
    login_tmpl = null;
  },
  template:
    /*html*/
    `<div class="login-block auth-text">
    <div class="auth-logo"><img id="lg-logo" src="libs/img/auth/logotype.png"></div>
    <div class="auth-text hello" id="lg-hello"></div>
    <table class="inputs">
      <tr>
        <td>
          <div>
            <div class="static" id="lg-login-static">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="49" height="49" rx="4.5" fill="white" fill-opacity="0.3" stroke="white" />
                <path
                  d="M25 26.125C27.7949 26.125 30.0625 23.8574 30.0625 21.0625C30.0625 18.2676 27.7949 16 25 16C22.2051 16 19.9375 18.2676 19.9375 21.0625C19.9375 23.8574 22.2051 26.125 25 26.125ZM29.5 27.25H27.5629C26.7824 27.6086 25.9141 27.8125 25 27.8125C24.0859 27.8125 23.2211 27.6086 22.4371 27.25H20.5C18.0145 27.25 16 29.2645 16 31.75V32.3125C16 33.2441 16.7559 34 17.6875 34H32.3125C33.2441 34 34 33.2441 34 32.3125V31.75C34 29.2645 31.9855 27.25 29.5 27.25Z"
                  fill="white" />
              </svg>
              <svg width="350" height="50" viewBox="0 0 350 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M10.0574 0H3C1.34315 0 0 1.34315 0 3V47C0 48.6569 1.34315 50 3.00001 50H347C348.657 50 350 48.6569 350 47V3C350 1.34315 348.657 0 347 0H69.4136L69.4477 1.99956L69.4218 2H347C347.552 2 348 2.44772 348 3V47C348 47.5523 347.552 48 347 48H3.00001C2.44772 48 2 47.5523 2 47V3C2 2.44772 2.44772 2 3 2H10.0914L10.0573 2.13295e-06L10.0574 0Z"
                  fill="white" />
              </svg>
              <span class="auth-text up-input-text l-text">Логин</span>
            </div>
            <input maxlength="15" class="auth-text" onfocus="AuthLogin.onfocus(this.id)" onblur="AuthLogin.onblur(this.id)" autocomplete="off" spellcheck="false"  id="lg-login" type="text" placeholder="Ввод..." />
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div style="position:absolute; top: 81px; left:0px">
            <div class="inputSize">
              <div class="auth-text warning" id="lg-password-warning"></div>
            </div>
            <div class="static" id="lg-password-static">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="49" height="49" rx="4.5" fill="white" fill-opacity="0.3" stroke="white" />
                <path
                  d="M29.5 22H31C31.1989 22 31.3897 22.079 31.5303 22.2197C31.671 22.3603 31.75 22.5511 31.75 22.75V31.75C31.75 31.9489 31.671 32.1397 31.5303 32.2803C31.3897 32.421 31.1989 32.5 31 32.5H19C18.8011 32.5 18.6103 32.421 18.4697 32.2803C18.329 32.1397 18.25 31.9489 18.25 31.75V22.75C18.25 22.5511 18.329 22.3603 18.4697 22.2197C18.6103 22.079 18.8011 22 19 22H20.5V21.25C20.5 20.0565 20.9741 18.9119 21.818 18.068C22.6619 17.2241 23.8065 16.75 25 16.75C26.1935 16.75 27.3381 17.2241 28.182 18.068C29.0259 18.9119 29.5 20.0565 29.5 21.25V22ZM28 22V21.25C28 20.4544 27.6839 19.6913 27.1213 19.1287C26.5587 18.5661 25.7956 18.25 25 18.25C24.2044 18.25 23.4413 18.5661 22.8787 19.1287C22.3161 19.6913 22 20.4544 22 21.25V22H28ZM24.25 26.5V28H25.75V26.5H24.25ZM21.25 26.5V28H22.75V26.5H21.25ZM27.25 26.5V28H28.75V26.5H27.25Z"
                  fill="white" />
              </svg>
              <svg width="350" height="50" viewBox="0 0 350 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M78.4483 2H347C347.552 2 348 2.44772 348 3V47C348 47.5523 347.552 48 347 48H3.00001C2.44772 48 2 47.5523 2 47V3C2 2.44772 2.44772 2 3 2H10.0575V0H3C1.34315 0 0 1.34315 0 3V47C0 48.6569 1.34315 50 3.00001 50H347C348.657 50 350 48.6569 350 47V3C350 1.34315 348.657 0 347 0H78.4483V2Z"
                  fill="white" />
              </svg>
              <svg id="show-lgpass" onclick="AuthLogin.hidePassword()"
                style="display:none" class="auth-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21.257 10.962C21.731 11.582 21.731 12.419 21.257 13.038C19.764 14.987 16.182 19 12 19C7.818 19 4.236 14.987 2.743 13.038C2.51238 12.7411 2.38719 12.3759 2.38719 12C2.38719 11.6241 2.51238 11.2589 2.743 10.962C4.236 9.013 7.818 5 12 5C16.182 5 19.764 9.013 21.257 10.962V10.962Z"
                  stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <svg id="hide-lgpass" class="auth-icon"
                onclick="AuthLogin.showPassword()" width="24" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.873 17.129C5.028 15.819 3.568 14.115 2.743 13.039C2.5123 12.742 2.38707 12.3766 2.38707 12.0005C2.38707 11.6244 2.5123 11.259 2.743 10.962C4.236 9.013 7.818 5 12 5C13.876 5 15.63 5.807 17.13 6.874"
                  stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M10 18.704C10.6492 18.8972 11.3227 18.9969 12 19C16.182 19 19.764 14.987 21.257 13.038C21.4876 12.7407 21.6127 12.3751 21.6125 11.9988C21.6124 11.6226 21.4869 11.2571 21.256 10.96C20.7313 10.2755 20.1684 9.62112 19.57 9M14.13 9.887C13.8523 9.60467 13.5214 9.38011 13.1565 9.22629C12.7916 9.07246 12.3998 8.99241 12.0038 8.99075C11.6078 8.98909 11.2154 9.06586 10.8491 9.21662C10.4829 9.36738 10.1502 9.58916 9.87016 9.86915C9.5901 10.1492 9.36824 10.4818 9.21739 10.848C9.06654 11.2142 8.98969 11.6066 8.99125 12.0026C8.99282 12.3986 9.07278 12.7904 9.22652 13.1554C9.38026 13.5203 9.60473 13.8512 9.887 14.129L14.13 9.887ZM4 20L20 4L4 20Z"
                  stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span class="auth-text up-input-text p-text">Пароль</span>
            </div>
            <input class="auth-text" onkeyup="AuthLogin.checkPassword(this, event)" onfocus="AuthLogin.onfocus(this.id)" onblur="AuthLogin.onblur(this.id)" autocomplete="off" spellcheck="false"  id="lg-password" type="password" placeholder="Ввод..." />
          </div>
        </td>
      </tr>
    </table>
    <span class="forget" onclick="AuthLogin.forgotPassword()" onmouseover="this.style.color = 'white'" onmouseleave="this.style.color = '#858585'">Забыли пароль?</span>
    <button onclick="AuthLogin.loginAttempt()" class="auth-button red-button" id="lg-button">Войти</button>
  </div>
`
})