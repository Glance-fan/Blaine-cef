vue_app.component('documents-template', {
    mounted: async function () {
        await include_source(scripts.documents);
        docs_tmpl = document.querySelector('#all-documents');
        resizeBigger(docs_tmpl);
        onRenderFinished('docs');
    },
    unmounted: function () {
        remove_source(scripts.documents);
        docs_tmpl = null;
    },
    template: /*html*/ `
    <div id="all-documents">
        <div class="doc-nav"></div>
        <div id="documents-container">
            <div id="doc-passport-container"></div>
            <div id="doc-licenses-container"></div>
            <div id="doc-medbook-container"></div>
            <div id="doc-fraction-container"></div>
            <div id="doc-resume-container"></div>
            <div id="doc-vehicle-container"></div>
        </div>
        <div id="doc-police-container"></div>
    </div>`
})