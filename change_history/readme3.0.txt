/*global*/
- вызов switchTemplate(false, template) при вызове renderTemplate(false, template) у всех template
- удалены функции include_source и include_css
- переделаны все svg в словари
- изменена анимация в меню и ретейле

/*interaction*/
- char_interaction, ov_interaction, iv_interaction объединены в единый template, 
вызвается renderTemplate(true, 'interaction')  затем switchTemplate(true, 'char_interaction') || switchTemplate(true, 'ov_interaction') || switchTemplate(true, 'iv_interaction')

/*inventory*/
- inventory и crates_inventory объединены в единый template, 
вызывается renderTemplate(true, 'full_inventory') затем switchTemplate(true, 'inventory') || switchTemplate(true, 'crates_inventory')

/*actionbox*/
- добавлен передаваемый параметр status: true - показать фон/ false - скрыть фон, 
изменена передаваемая дата соотвественно: data = [status, action, name, amount (функцию можно посмотреть в script/inventory/action-box.js)

/*death*/
- изменена функция death_switchButton, теперь необходимо передавать id как строку: 'death-die' || 'death-er'
