добавлена функция показа/скрытия switchTemplate с возможностью передачи в нее данных для отображения

/*notifications*/
- нет значимых изменений

/*auth*/
- изменена функция showLoginPanel -> setLoginPanel (убран передаваемый параметр status) 
- изменена функция showRegPanel -> setRegPanel (убран передаваемый параметр status)
- изменена функция showCharSelect -> setCharSelect (убран передаваемый параметр status)
- функция showStartPlace удалена,  функция showCharSelectAgain удалена

!!! вызов всех вышеперечисленных функций теперь не обязателен и не желателен; 
- вместо этого при использовании функции switchTemplate для показа с аргументом login, reg, char_selection, start_place нужно передавать data 
!здесь и далее все остальные передаваемые параметры кроме status остались прежними, поэтому привожу их для напоминания и проверки!
( data /для login/ = ['rsName', 'login', 'token'];
data /для reg/ = 'rsName';
data /для char_selection/ = ['login', 'regDate', bCoins(int), lastChar(int), newData(arr)]
data /для start_place/ = [ int: 0-5, x1-6 ]; )

/*char-creation*/
- нет значимых изменений

/*hud*/
- добавлена функция setServerLogo(string) (script/hud/right.js)
- переименована функция requestAction -> requestHMAction (script/hud/center.js)

- при использовании функции switchTemplate для показа с аргументом hud_top, нужно передать data
( data = ['server-logo', player_id(int||string), online(int||string), time(t|f)] )
- при использовании функции switchTemplate для показа с аргументом hud_quest, нужно передать data 
( data = ['Квестодатель', 'Название задания', 'Название цели', 'Прогресс'] )
- при использовании функции switchTemplate для показа с аргументом hud_interact, нужно передать data 
( data = string //'для взаимодействия' )
- при использовании функции switchTemplate для показа с аргументом hud_menu, нужно передать data 
( data = [[enum,'action'], [enum2,'action2'], [enum3, action3]] )
- удалена функция setSpdMtrVis; 
при использовании функции switchTemplate для показа с аргументом hud_spd, нужно передать 
data ( data = maxSpeed /int: 1-999/ ) 
в дальнейшем используется updSpd для обновления скорости
- удалены функции switchArrowLeft, switchArrowRight, switchDoors, switchLights, switchBelt, switchEngine; вместо них используется setSpdmtrState(state, status) /state = index/ 0 - left-arrow, 1 - right-arrow, 2 - doors, 3 - lights, 4 - belt, 5 - engine, 6 - fish
- переименованы функции setCash -> setHudCash, setBank -> setHudBank
- удалены функции setFood, setMood, setSick, setWounded; вместо них используется setHudState(state, status) /state = index/ 0 - food, 1 - mood, 2 - sick, 3 - wounded, 4 - snorkel, 5 - sheild, 6 - fish

/*chat*/
- удалена функция switchAllChat
- функция focusInput переименована в focusChatInput 
- функция inputBlur переименована в blurChatInput
- функция setTime переименована в setChatTime; функция getTime переименована в getChatTime

/*interaction*/
- удалены функции switchIVVis, switchOVVis, switchCharVis вместо них теперь используется switchTemplate для показа и скрытия
- сохранена функция switchPassengersVis

/*inventory*/
- функция switchInventory удалена
- функция switchHelp переименована в inv_switchHelp

/*shop*/
- функция switchHelp переименована в switchShopHelp
- функция switchMoney переименована в shop_switchMoney
- при использовании функции switchTemplate для показа с аргументом hud_shop, нужно передать data ( data = shopIndex )




