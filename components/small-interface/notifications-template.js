vue_app.component('notifications-template', {
  mounted: async function () {
    await include_source(scripts.notifications);
    notific_tmpl = document.querySelector('.notification-container');
    resizeBigger(notific_tmpl);
    onRenderFinished('notifications');
  },
  unmounted: function () {
    remove_source(scripts.notifications);
    notific_tmpl = null;
    switchTemplate(false, 'notifications')
  },
  template:
    /*html*/
    `<div class="notification-container"></div>`
})