vue_app.component('login-template', {
  mounted: async function () {
    await include_source(scripts.login);
    login_tmpl = document.querySelector('#login-wrapper');
    resizeBigger(login_tmpl);
    onRenderFinished('login');
  },
  unmounted: function () {
    remove_source(scripts.login);
    switchTemplate(false, 'login');
    login_tmpl = null;
  },
  template: /*html*/ `
  <div id="login-wrapper">
      <div id="login-logotype"></div>
      <div id="login-info-text"></div>
      <div id="login-block"></div>
  </div>`
})