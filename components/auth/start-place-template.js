vue_app.component('start-place-template', {
  mounted: async function () {
    await include_source(scripts.start_place);
    start_tmpl = document.querySelector('.start-place');
    resizeSmaller(start_tmpl);
    onRenderFinished("start_place");
  },
  unmounted: function () {
    remove_source(scripts.start_place);
    switchTemplate(false, 'start_place');
    start_tmpl = null;
  },
  template:
    /*html*/
    `<div class="start-place">
        <p class="all-text start-text">Выберите место<br>Вашего появления</p>
        <div class="auth-btn-wrapper"><button class="confirm-nav red-button">Подтвердить</button></div>
        <div class="start-nav"></div>
    </div>`
})