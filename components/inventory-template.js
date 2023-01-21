vue_app.component('inventory-template', {
    mounted: async function () {
        await include_source(scripts.inventory);
        inv_tmpl = document.getElementById('main-inv');
        crinv_tmpl = document.getElementById('extra-inv');
        trade_tmpl = document.getElementById('trade-inv');
        wb_tmpl = document.getElementById('workbench-inv');
        resizeSmaller(inv_tmpl);
        resizeSmaller(crinv_tmpl);
        resizeBigger(trade_tmpl);
        resizeBigger(wb_tmpl);
        resizeBigger(document.querySelector('.inv-help'));
        Inventory.drawFull();
        onRenderFinished('full_inventory');
    },
    beforeUnmount: function () {
        remove_source(scripts.inventory);
        switchTemplate(false, 'inventory');
        switchTemplate(false, 'crates_inventory');
        switchTemplate(false, 'trade');
        switchTemplate(false, 'workbench');
        setTimeout(() => {
            inv_tmpl = null;
            crinv_tmpl = null;
            trade_tmpl = null;
            wb_tmpl = null;
        }, 100);
    },
    template:
        /*html*/
        `<div class="inventory-wrapper">
            <div class="inv-help">
                Использовать - ЛКМ
                <br>
                Меню - ПКМ
                <br>
                Разделить - CTRL
                <br>
                Закрыть - ESC
            </div>
            <div class="Inventory inv-part" id="main-inv" style="display: none">
                <div class="upper-inventory">
                    <div class="weapon" style="margin-right: 15px;">
                        <h1>
                            <div class="h1-text">оружие</div>
                            <div class="underline"></div>
                        </h1>
                        <div id="inv-weapon-container"></div>
                    </div>
                    <div class="inv-pockets">
                        <h1>
                            <div class="h1-text">карманы</div>
                            <div class="underline"></div>
                            <div class="weight">
                                <span class="actual-weight"></span>
                                <span class="max-weight"></span>
                            </div>
                        </h1>
                        <div id="inv-pockets-container"></div>
                    </div>
                    <div class="clothes" style="margin: 0 105px 0 105px;">
                        <h1>
                            <div class="h1-text">одежда</div>
                            <div class="underline"></div>
                        </h1>
                        <div id="inv-clothes-container"></div>
                    </div>
                    <div class="accessories">
                        <h1>
                            <div class="h1-text">аксессуары</div>
                            <div class="underline"></div>
                        </h1>
                        <div id="inv-accessories-container"></div>
                    </div>
                </div>
                <div class="lower-inventory">
                    <div class="inv-bag">
                        <h1>
                            <div class="h1-text">Сумка</div>
                            <div class="underline"></div>
                            <div class="weight">
                                <span class="actual-weight"></span>
                                <span class="max-weight"></span>
                            </div>
                        </h1>
                        <div id="inv-bag-container"></div>
                    </div>
                    <div class="status">
                        <h1>
                            <div class="h1-text">статусы</div>
                            <div class="underline"></div>
                        </h1>
                        <div id="inv-status-container"></div>
                    </div>
                </div>
            </div>
            <div class="crates-Inventory inv-part" style="display: none;flex-direction: row;" id="extra-inv">
                <div class="player-slots">
                    <div class="crate-pockets">
                        <h1>
                            <div class="h1-text">карманы</div>
                            <div class="underline"></div>
                            <div class="weight">
                                <span class="actual-weight"></span>
                                <span class="max-weight"></span>
                            </div>
                        </h1>

                        <div id="crate-pockets-container"></div>
                    </div>
                    <div class="crate-bag" style="margin-top: 20px">
                        <h1>
                            <div class="h1-text">cумка</div>
                            <div class="underline"></div>
                            <div class="weight">
                                <span class="actual-weight"></span>
                                <span class="max-weight"></span>
                            </div>
                        </h1>
                        <div id="crate-bag-container"></div>
                    </div>
                </div>
                <div class="crate">
                    <h1>
                        <div class="h1-text"></div>
                        <div class="underline"></div>
                        <div class="weight">
                            <span class="actual-weight"></span>
                            <span class="max-weight"></span>
                        </div>
                    </h1>

                    <div id="crate-crate-container" onwheel="Inventory.updateScrollPos(event, this, 'crate')"></div>
                </div>
            </div>
            <div id="trade-inv" style="display:none">
                <div class="trade inv-part snip1135">
                    <div class="pockets" style="margin-right: 50px;">
                        <h1>
                            <div class="h1-text current" style="margin-right:40px" onclick="Inventory.switchUnderline(0)"><a>карманы</a></div>
                            <div class="h1-text" onclick="Inventory.switchUnderline(1)"><a>имущество</a></div>
                        </h1>
                        <div id="trade-pockets-container"></div>
                        <div id="trade-property-container"></div>
                    </div>
                    <div class="tradeable">
                        <div class="give">
                            <h1>
                                <div class="h1-text current"><a>вы отдаете</a></div>
                            </h1>
                            <div id="trade-give-container"></div>
                        </div>
                        <div class="receive" style="position:absolute; pointer-events: none;">
                            <h1>
                                <div class="h1-text current"><a>вы получаете</a></div>
                            </h1>
                            <div id="trade-receive-container"></div>
                        </div>
                    </div>
                </div>
                <div id="trade-ready">
                    <div id="trade-agree" onclick="Inventory.requestTradeReady(this.firstElementChild)">
                        <div checked="false" id="last-tradechbox" class="trade-checkbox trade-big-checkbox">
                            <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.75 4.75L4.25 8.25L11.25 0.75" stroke="#656565" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div>Я подтверждаю условия обмена</div>
                    </div>
                    <button id="trade-btn" class="red-button" onclick="Inventory.requestTrade()">Обменяться</button>
                </div>
            </div>
            <div id="workbench-inv" class="workbench">
                <div class="wb-pockets">
                    <h1>
                        <div class="h1-text">карманы</div>
                        <div class="underline"></div>
                        <div class="weight">
                            <span class="actual-weight"></span>
                            <span class="max-weight"></span>
                        </div>
                    </h1>
                    <div id="wb-pockets-container"></div>
                </div>
                <div class="wb-craft">
                    <div>
                        <h1>
                            <div class="h1-text">lorem</div>
                            <div class="underline"></div>
                        </h1>
                        <div id="wb-craft-container"></div>
                    </div>
                    <div>
                        <h1>
                            <div class="h1-text">итог</div>
                            <div class="underline"></div>
                        </h1>
                        <div id="wb-result-container"></div>
                    </div>
                    <div>
                        <h1>
                            <div class="h1-text">вспомогательное</div>
                            <div class="underline"></div>
                        </h1>
                        <div id="wb-tool-container"></div>    
                    </div>
                </div>
               <button  id="craft-btn" class="red-button" onclick="Inventory.requestCraft()"></button>
            </div>
        </div>`
})