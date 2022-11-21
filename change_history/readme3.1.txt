/*global*/
- возвращена функция include_source и добавлена remove_js для подключению 2+ скриптов

/*inventory*/
- inv_switchHelp -> switchInvHelp
- добавлен trade
- для вызова используется renderTemplate(true, 'full_inventory') 
switchTemplate(true, 'trade')
- показ карманов по принципу crates_inventory
- новые функции request
- новые функции fill: script/inventory/item-actions/fill.js
fillTradeLProperties, fillTradeGiveItems, fillTradeReceiveItems, fillTradeRProperties
- новые функции update: script/inventory/item-actions/update.js
updateGiveSlot, updateReceiveSlot, updateReceiveMoney

/*shop*/
- shop_switchHelp -> switchShopHelp
- shop_cashRequest, shop_bankRequest - функции удалены, заменены функцией payShopRequest
(проверь lastUseCash, я не понял че это такое)
- shop_changeableRequest -> changeableShopRequest
- shop_variantRequest -> variantShopRequest
- shop_navRequest -> navShopRequest
- shop_quitRequest -> quitShopRequest