/*retail*/
- добавлен раздел столы
- у мебельного магаза сделано разделение
теперь для мебельного магазина в draw передается 'furniture-index', index = [0,1..11]

/*estate-agency*/
- теперь последним параметром нужно передавать массив 3х цены  за GPS метки (на каждый раздел)
- добавлена функция changeDefault(id, new_default), где id = ['Дома', 'Квартиры', 'Гаражи'], new_default = [cost_min, cost_max, rooms_min, rooms_max, garages_min, garages_max]

/*menu*/
- шаг размера прицела 0.01 -> 0.1
- добавлены функции createToggle(where, id, descr) и createManyToggles
- добавлена кнопка закрыть
- добавлен код в соответствии с gihtub-issue#5  

/*elevator*/ + /*tuning*/ + /*colorpicker*/
- добавлен/изменен код в соответствии с gihtub-issue#4 

