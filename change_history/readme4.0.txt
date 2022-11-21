/*global*/
- функция include_js изменена на include_source: теперь поддерживает добавление css;
функция remove_js изменена на remove_source: теперь поддерживает удаление css


/*shop*/
- js функции преобразованы в класс Shop
- добавлен search
- изменение анимаций
- удалена передача данных в template,
теперь необходимо вызывать Shop.draw со старыми параметрами
- добавлены скроллы справа и слева у элементов и прокрутка к последнему выбранному

/*auth*/
- удалена передача данных во все template

//login
- добавлена возможность установки логотипа сервера
- теперь необходимо вызывать AuthLogin.fillPanel(server, rsName, login, token) добавлен передаваемый строковый параметр, отвечающий за логотип  
- убрано условие ненулевого login и token
- изменено поведение кнопки показать/скрыть пароль
- изменена анимация кнопки войти

//reg 
- идентичные login изменения

//char_selection
- идентичные login изменения

//start_place
- идентичные login изменения


/*hud*/
- все teplate объединены в один блок render.hud
- удалена передача данных во все template
- js функции преобразованы в класс Hud -> некоторые функции переименованы
- названия функций изменены:
drawQuest, setCash, setBank, setState, drawInteract, requestInteract, drawMenu,requestAction - удалено Hud посередине 

//top
- изменен шрифт
- добавлена функция setTop, которая устанавливает сразу все возможные передаваемые значения
//speedometer

- установка шрифта Roboto: исправлен дрыгобаг
- изменен шрифт
- createSpdMtr -> createSpeedometer, updSpd -> updateSpeed
- новая функция updateSpeedometer, чтобы не перерисовывать speedometer

//menu
-теперь не может выйти за границы экрана


/*chat*/
- новый класс Messages, объединяющий все сообщения чата
- старые функии -> новая функция:
showMessage, showShout, showWhisper -> showNormal(type, time, fullname, id, message)


/*notifications*/
- js функции преобразованы в класс Notific -> все функции были переименнованы
- переименнована функция вызова: Notific.draw со старыми параметрами
- добавлена функция NPC


/*actionbox*/
- js функции преобразованы в класс ActionBox -> все функции были переименнованы
- удалена передача данных в template,
теперь необходимо вызывать ActionBox.fill(status, type, action, name, amount, standart)
type = 0 - with buttons || 1 - input only; standart - value for input in type 1 
- фикс багов анимаций


/*death*/
- js функции преобразованы в класс Death -> изменены названия функций: 
death_updateSecs -> updateSecs, death_switchButton -> switchButton 
- изменены анимации кнопок


/*menu*/
//вкладка Персонаж
- Menu.setAllChar изменены передаваемые данные: 
-- параметры 9-12 объединены в массив из 4 массивов двух переменных -> data[9] = [[value, max], [value, max], [value, max], [value, max]] (value & max now can be int)
-- параметры 13-14 объединены в единый массив имуществ: передавать можно в любом порядке 
(пример в конце script/menu.js) 
- удалены все функции устанавливающие значения навыков т.к.:
добавлена функция setSkill(index, value, max) // index = 0 - strength, 1 - shooting, 2 - cooking, 3 - fishing
- fillProperties - заполнить имущество массивом (удалить все предыдущее clearPropertyTable('veh'||'est')) / newProperty - заполнить одно имущество

//вкладка Задания
- добавлен id при передачи квеста: quest = [id, 'quest-giver', 'name', 'goal', 'progress']

//вкладка Достижения
- добавлен id при передачи достижения: achievement = [id, 'name', 'purpose', curprog, maxprog]

//вкладка Достижения
- добавлен id при передачи подарка: gift = [id, 'source', 'name']

//вкладка Магазин
- добавлены функции:
deposit - при нажатии на пополнение
setCource - установить курс BC к $ 
setDepositBonus - установить множитель
setPrices - установить BC цены (пример передаваемой даты в конце script/menu.js)

//вкладка Настроек
- удалены все функции устанавливающие значения toggle барам: 
добавлена setTogglesStates и setToggleState, для установки всех и 1 значения соотвественно
- тоже самое для input
- теперь чтобы установить все настройки вызывается setSettings(data) //data - [[checkboxes],[inputs],aim,hex]

//вкладка Управления
- нарисовать все настройки: drawControls

//вкладка Помощь
- все добавлено по фигме 

/*interaction*/
- добавлен класс пассажиров

/*inventory*/
- все js функции преобразованы в класс Inventory
//trade
- изменена анимация кнопки
- изменено отображение денег по фигме
- теперь при нажатии на checkbox имущества сначала идет requestProperty, а потом необходимо вызвать fillCheckBox(id, status) 

/*retail*/
- все js функции преобразованы в класс retail
- добавлено подключение к свг инвенторя
- добавлен магазин: furniture
- добавлена кнопка примерить
- добавлена торговая точка 
продажа: Retail.draw('market', data, 'name') / выставка на продажу: Retail.draw('market', data, null, true)