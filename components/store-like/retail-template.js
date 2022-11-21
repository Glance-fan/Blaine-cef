vue_app.component('retail-template', {
    mounted: async function () {
        retail_tmpl = document.getElementById('retail');
        await include_source(scripts.retail);
        // Retail.draw('weapon', test_data, null, null);
        resizeBigger(retail_tmpl);
        onRenderFinished('retail');
    },
    unmounted: function () {
        remove_source(scripts.retail);
        switchTemplate(false, 'retail');
        retail_tmpl = null;
    },
    template:
        /*html*/
        `<div id="retail">
            <div class="retail-left-side">
               <div class="retail-name"></div>
               <div class="retail-options retail-line"></div>
            </div>
            <div class="retail-right-side">
               <div class="assortment-wrapper">
                   <h1 id="assortment-title">Ассортимент</h1>
                   <div class="current-assortment">
                       <div class="scrollbar-bg"></div>
                       <div class="scrollable-assortment" onwheel="Retail.scroll(this, event)"></div>
                   </div>
                   <div class="bottom-assortment">
                       <div>
                           Количество
                           <div style="display: flex;align-items: center;"><input/></div>
                       </div>
                       <div style="justify-content:center">
                           <button class="retail-wear" onclick="Retail.requestTry()">Примерить</button>
                       </div>
                       <div>
                           Общий вес
                           <span id="retail-weight">кг.</span>
                       </div>
                       <div style="width:100px">
                           Стоимость
                           <span id="retail-cost">$</span>
                       </div>
                       <div style="flex-direction:row;width:200px">
                           <button class="retail-btn red-button" id="retail-cash" onmouseover="Retail.onmouseover(this)" onmouseout="Retail.onmouseout(this)" onclick="Retail.payRequest(true)"></button>
                           <button class="retail-btn grey-button" id="retail-bank" onmouseover="Retail.onmouseover(this)" onmouseout="Retail.onmouseout(this)" onclick="Retail.payRequest(false)"></button>
                       </div>
                       <div style="display: none">
                           Стоимость (1 ед.)
                           <div style="display: flex;height: 25px;">
                               <span class="retail-usd">$</span>
                               <input id="retail-personal-cost" maxlength="10" onfocus="this.value = ''" oninput="Retail.setPrice(this)" onblur="Retail.leaveInput(this)"/>
                           </div> 
                       </div>
                       <div style="display:none;justify-content:center">
                            <button class="personal-accept red-button" onclick="Retail.confirmRequest()">Подтвердить</button>
                       </div>
                   </div>
               </div>
            </div>
        </div>`
})