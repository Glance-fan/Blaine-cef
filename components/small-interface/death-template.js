vue_app.component('death-template', {
  mounted: async function () {
    await include_source(scripts.death);
    death_tmpl = document.querySelector('.death-container');
    onRenderFinished("death");
  },
  updated: function (){
    Death.resize(death_tmpl);
  },
  unmounted: function () {
    remove_source(scripts.death);
    switchTemplate(false, 'death');
    death_tmpl = null;
  },
  template:
    /*html*/
    `
    <div class="death-container">
      <div>
        <button class="red-button" id="death-die" onclick="Death.request(event, true)">Потерять<br />сознание</button>
        <p><span id="death-secs">30 сек.</span></p>
      </div>
      <button id="death-er" onclick="Death.request(event, false)">Вызвать скорую<br />(+ 5 мин)</button>
    </div>`
})