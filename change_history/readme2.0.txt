/*death*/
переименованы функции:
updateSecs -> death_updateSecs
switchButton -> death_switchButton

/*retail*/
функции: retail_requestBank, retail_requestCash
показ (после render) switchTemplate('retail', data); (пример даты и retail libs/js-database/retail.js)

/*shop*/
переименованы функции:
fillContainer -> shop_fillContainer
navigaitonRequest -> shop_navRequest
variantRequest -> shop_variantRequest
cashRequest -> shop_cashRequest
bankRequest -> shop_bankRequest
quitRequest -> shop_quitRequest
changeableRequest -> shop_changeableRequest

/*inventory*/
action-box вынесена в новый template
удалена функция createActionBox
удалена функция removeActionBox теперь на кнопку отмена вызывается requestABclose(); 
теперь надо вызывать document.querySelector('.Inventory').style.pointerEvents = 'none'; если вызывается показ, при открытом инвентаре, и вызывать document.querySelector('.Inventory').style.pointerEvents = 'unset'; при закрытии


/*menu*/
requestCollect -> requestCollectGift

/*hud*/
вырезана строка, которая отслеживала нажатие "E" при нажатии: document.body.setAttribute('onkeyup', 'requestHudInteract(event)');
