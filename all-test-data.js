/*char-selection*/
var auth_data = ["frytech", "17.03.2022", 150, 2, [
    ["Jenny Hezky", 0, 1000, true, 25, "нет фракции", 244.7, 77, true, false, "id", "reason", "00.00.0000 00:00:00", "00.00.0000 00:00:01"],
    ["Olivia Moore", 55555555, 1000, false, 25, "нет", 24, 77, false, true],
    []
]];
// AuthSelect.fillPanel(...auth_data)



/*chat-messages*/
/*
Messages.showNormal(0, '18:00', 'Hezky', '777', '<div>in_div</div>😃')
Messages.showNormal(1, '18:00', 'Hezky', '777', '<div>in_div</div>😃')
Messages.showNormal(2, '18:00', 'Hezky', '777', '<div>in_div</div>😃')
Messages.showOOC('18:00', 'Hezky', '777', '<div>in_div</div>😃')
Messages.showMe('18:00', 'Hezky', '777', '<div>in_div</div>😃')
Messages.showDo('18:00', 'Hezky', '777', '<div>in_div</div>😃')
Messages.showToDo('18:00', 'Hezky', '777', '<div>in_div</div>😃', '<div>in_div</div>😃')
Messages.showTry('18:00', 'Hezky', '777', '<div>in_div</div>😃', true)
Messages.showTry('18:00', 'Hezky', '777', '<div>in_div</div>😃', false)
Messages.showFraction('18:00', 'frytech', 'Hezky', '777', '<div>in_div</div>😃')
Messages.showGoverment('18:00', 'chel', 'frytech', 'Hezky', '777', '<div>in_div</div>😃')
Messages.showOrganisation('18:00', 'frytech', 'Hezky', '777', '<div>in_div</div>😃')

Messages.admin_ban('18:00', 'Hezky', 'Max', 0, '<div>in_div</div>😃')
Messages.admin_mute('18:00', 'Hezky', 'Max', 0, '<div>in_div</div>😃')
Messages.admin_jail('18:00', 'Hezky', 'Max', 0, '<div>in_div</div><div>in_div</div>😃')
Messages.admin_unban('18:00', 'Hezky', 'Max','ne <div>in_div</div>😃')
Messages.admin_unmute('18:00', 'Hezky', 'Max','ne <div>in_div</div>😃')
Messages.admin_unjail('18:00', 'Hezky', 'Max','ne <div>in_div</div>😃')
Messages.admin_message('18:00', 'Hezky', '<div>in_div</div>😃')
Messages.server('18:00', '<div>in_div</div>😃')
Messages.advert('18:00', 'Max-Black', 'Olivia Moore', '<3 <div>in_div</div>😃', '555-555')
Messages.government('18:00', 'Hezky', '<div>in_div</div>😃')
Messages.news('18:00', 'Hezky', '<div>in_div</div>😃')
*/



/*criminal-records*/
var crec_player = ['star butterfly', 3000, '26.03.2023', true, [
    [0, '22.03.23', 10, '123 321 231'],
    [1, '22.03.23', 10, '123 321 231'],
    [2, '22.03.23', 10, '123 321 231'],
    [3, '22.03.23', 10, '123 321 231'],
    [4, '22.03.23', 10, '123 321 231'],
    [5, '22.03.23', 10, '123 321 231'],
    [6, '22.03.23', 10, '123 321 231'],
    [7, '22.03.23', 10, '123 321 231']
]];
// CRecords.fillPlayerInfo(...crec_player)



/*menu-arrest*/
var arrest_arr = [
    [0, "19.03.2023 17:00", "star butterfly", "annlynn recanter"],
    [1, "18.03.2023 15:00", "star butterfly", "annlynn recanter"],
    [2, "19.03.2023 15:00", "star butterfly", "ann recanter"]
];
// MenuArrest.fillArrests(arrest_arr);



/*police-tablet*/
var tablet_data = [
    ['star butterfly', 'Детектив [6]', false, 0, 0],
]
var player_data = ['Star Butterfly', 3000, '03.03.1990', false, false, 123123123, `#123, Палето-Бэй Пацифик Стрит`, null, null, null, []]
var fines_data = [
    [3000, "23:59", 13001, "Annlynn Recanter", "Annlynn Recanter", "2.4 п. ПДД"],
    [3001, "23:59", 13002, "Annlynn Recanter", "Annlynn Recanter", "2.4 п. ПДД"],
    [3002, "23:59", 13003, "Annlynn Recanter", "Annlynn Recanter", "2.4 п. ПДД"],
]
var arrests_data = [
    [3000, "17.03.2023 23:59", "123123123", "Annlynn Recanter", "УБИЙЦА"],
    [3001, "17.03.2023 23:59", "123123123", "Annlynn Recanter", "УБИЙЦА"],
    [3002, "17.03.2023 23:59", "123123123", "Annlynn Recanter", "УБИЙЦА"],
]
var phone_data = [
    [3000, "23:59", "Вызов", "Annlynn Recanter", 2405.4, "Нужна помощь"],
    [3001, "23:59", "Вызов", "Annlynn Recanter", 2405.4, "Нужна помощь"],
    [3002, "23:59", "Вызов", "Annlynn Recanter", 2405.4, "Нужна помощь"],
]
var notifs_data = [
    [3000, "23:59", "Вызов", 2405.4],
    [3001, "23:59", "Вызов", 2405.4],
    [3002, "23:59", "Вызов", 2405.4],
]
var gps_data = [
    [3000, 10, "Bravado Buffalo", "Annlynn Recanter"],
    [3001, 10, "Bravado Buffalo", "Annlynn Recanter"],
    [3002, 10, "Bravado Buffalo", "Annlynn Recanter"],
]
// PoliceTablet.draw('Полиция Палето-Бэй', tablet_data);
// PoliceTablet.fillActionInformation(4, gps_data)



/*animations*/
anims_fill = [
    [
        ['Раздел#1', [
            ['Jump-Anim', 'Jump'],
            ['Dance-Anim', 'Dance'],
            ['Drink#2-Anim', 'Drink#2'],
        ]],
        ['Раздел#2', [
            ['Drink#3-Anim', 'Drink#3'],
            ['Drink#4-Anim', 'Drink#4'],
            ['Drink#5-Anim', 'Drink#5'],
            ['Drnk-Anim', 'Drnk'],
        ]],
        ['Раздел#3', [
            ['Draw#13-Anim', 'Draw#13'],
            ['Draw#14-Anim', 'Draw#14'],
            ['Draw#15-Anim', 'Draw#15'],
            ['Draw-Anim', 'Draw'],
        ]]
    ],
    [
        ['Специальные', [
            ['Eat-Anim', 'Eat'],
            ['Smoke-Anim', 'Smoke'],
            ['Read-Anim', 'Read'],
        ]],
        ['Дополнительные', [
            ['Seat#1-Anim', 'Seat#1'],
            ['Seat#2-Anim', 'Seat#2'],
            ['Feed-Anim', 'Feed'],
            ['Enjoy-Anim', 'Enjoy'],
            ['Enter-Anim', 'Enter'],
        ]],
        ['раздел#69', [
            ['Exit-Anim', 'Exit'],
            ['Fight-Anim', 'Fight'],
            ['Fry-Anim', 'Fry'],
            ['Cook-Anim', 'Cook'],
            ['Expand-Anim', 'Expand'],
        ]],
    ],
    [
        [
            ['Walk-Anim', 'Walk'],
            ['Stand-Anim', 'Stand'],
            ['Fly-Anim', 'Fly'],
        ]
    ],
    [
        [
            ['Anger-Anim', 'Anger'],
            ['Fear-Anim', 'Fear'],
            ['Laugh-Anim', 'Laugh'],
        ]
    ],
    ['Jump-Anim', 'Drink#2-Anim', 'Drink#4-Anim', 'Draw#14-Anim', 'Smoke-Anim', 'Enjoy-Anim', 'Exit-Anim', 'Fry-Anim']
];
// Anims.draw(anims_fill)



/*blips*/
var blips_data = [
    ['Ферма', true, 0, 1, 0.11, 0.91, true],
    ['Ферма', false, 1, 40, 0.21, 0.81, false],
    ['Ферма', true, 2, 43, 0.31, 0.71, false],
    ['Ферма', true, 3, 50, 0.41, 0.61, false],
    ['Ферма', false, 26, 51, 0, 1, true],
    ['Ферма', true, 27, 60, 0.61, 0.41, false],
    ['Ферма', false, 28, 8, 0.71, 0.31, true],
    ['Ферма', true, 29, 36, 0.81, 0.21, true],
    ['Ферма', true, 85, 16, 0.91, 0.11, false],
]
// Blips.fillBlips(blips_data);



/*car-maint*/
var test_prices = [
    [8, 7, 6, 5, 4, 3, 2, 1],
    [80, 70, 60, 50, 40, 30, 20, 10], // 0 (80) - за 1, 1 (70) - за 2, 3 (60) - за 3 ..
    [800, 700, 600, 500, 400, 300, 200, 100],
    [8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000],
    [80000, 70000, 60000, 50000, 40000, 30000, 20000, 10000]
]
// CarMaint.drawGas(true, [100, 500])
// CarMaint.drawPlates(test_prices);



/*estate-agency*/
var estag_data = [
    [
        ['uid#1', 'Дом#1', 100000, 90, 2, 0],
        ['uid#2', 'Дом#2', 200000, 100, 3, 1],
    ],
    [
        ['uid#3', 'Квартира#1', 300000, 110, 4],
        ['uid#4', 'Квартира#2', 400000, 120, 5],
    ],
    [
        ['uid#5', 'Гараж#1', 500000, 130, 6, 5],
        ['uid#6', 'Гараж#2', 600000, 140, 7, 2],
    ],
    [3000, 450, 210]
];
// EstateAgency.draw(estag_data)



/*estate*/
/*
Estate.draw('info', 'house', 4694, ['Jessica Day', 500000, 90, 2, '0'], true)
Estate.draw('info','biz', null, ['Store #1', 'Weapon', null, 500000, 15, 10])
Estate.draw('info','flat', 231, ['Jessica Day', 500000, 90, 10], false)
Estate.draw('info','veh_info', null, ['Bravado Buffalo', '123123', 4, true, true, false, 100, 25]) 

Estate.draw('offer', 'house', 4694, ['Jessica Day', 750000, 500000, 90, 2, 0])
Estate.draw('offer', 'biz', null, ['Jessica Day', 750000, 'Weapon', 500000, 90, 10])
Estate.draw('offer', 'flat', 4694, ['Jessica Day', 750000, 500000, 90, 2])
Estate.draw('offer', 'garage', 4694, ['Jessica Day', 750000, 500000, 90, 2, 0])
Estate.draw('offer', 'veh', null, ['Jessica Day', 750000, 'model', 500000, 80085, 'отсутствует'])

Estate.draw('sell', 'sell', null, ['Jessica Day', [
    ['House', 'Магазин брендовой одежды', '', 'class_range', 550000, 3],
    ['Biz', 'producer', 'model', 'class_range', 550000, 177],
    ['Flat', 'producer', 'model', 'class_range', 550000, 177],
    ['Garage', 'producer', 'model', 'class_range', 550000, 177],
    ['Veh', 'producer', 'model', 'class_range', 1780000],
    ['Moto', 'producer', 'model', 'class_range', 1780000],
    ['Ship', 'producer', 'model', 'class_range', 1780000],
    ['Plane', 'producer', 'model', 'class_range', 1780000],
]])
*/



/*menu-bank*/
var bank_data = [1, 15000, 500, 500000, false];
/*
MenuBank.draw(bank_data)
MenuBank.setDebetInfo(1, 15000)
MenuBank.setSavingsInfo(1, 25000)
*/



/*menu-biz*/
var menubiz_info = ['Магазин премиальной одежды #1', 'Магазин премиальной одежды', 'Jessica Day', 500000, 15, 10, 950, 100000, 0, 1240, 402336]
var menubiz_manage = [
    [100, 150], true, false, 5, true, 2000, 'в пути', true
]
var menubiz_chart = [
    ['27.09', '28.09', '29.09', '30.09', '01.10', '02.10', '03.10', '04.10', '05.10', '06.10', '07.10', '08.10', '09.10', '10.10', '11.10', '12.10', '13.10', '14.10', '15.10', '16.10', '17.10', '18.10', '19.10', '20.10', '21.10', '22.10', '23.10', '24.10', '25.10', '26.10'],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
// MenuBiz.draw([menubiz_info, menubiz_manage, menubiz_chart])



/*menu-frac*/
var frac_data = [
    [ //information
        [ //news
            [
                [0, '0-news\n\nasdf\n\n\n\nf\nf\n\n\n\nf\n\n\nf<div>in_div</div>😃']
            ], null //int || null
        ],
        //info
        ['Больница округа Блэйн', 'Annlynn Recanter', 1000000, 1000, 1]
    ],
    [ //staff
        [true, 0, 'Annlynn Recanter', 3000, '11.11.2024 12:48', 1],
        [false, 1, 'Asdfghjklqwertyu Asdfghjklqwertyu', 3001, '25.02.2023 12:58', 2],
        [true, 2, 'Annlynn Recanter', 3002, '02.01.2023 11:38', 3],
        [false, 0, 'Jessica Recanter', 3003, '15.05.2023 10:38', 4],
        [true, 1, 'Carl Recanter', 3004, '25.03.2023 13:38', 5],
        [false, 2, 'Lynn Recanter', 3005, '23.02.2023 12:35', 1],
    ],
    [ //management
        [ //positions
            [1, 'Уборщик'],
            [2, 'Работник'],
            [3, 'Менеджер'],
            [4, 'Руководитель'],
            [5, 'Начальник'],
        ],
        [ //positions
            [1, '[BCP12ADC]', 1],
            [2, '[BCP12ADC]', 1],
            [3, '[BCP12ADC]', 1],
            [4, '[BCP12ADC]', 1],
            [5, '[BCP12ADC]', 2],
        ],
    ],
];
var edit_data = [
    [1, '1', false],
    [2, '2', true],
    [3, 'Доступ к складу (даже если закрыт)', false],
    [4, 'Доступ к складу (даже если закрыт)', true],
    [5, 'Доступ к складу (даже если закрыт)', false],
];
// MenuFrac.draw(frac_data);



/*menu-garage*/
menugar_data = [
    [100, 'Jessica Day', 5, 200000, 50, true],
    [1, null, 10, 500000, 600, null],
    [222, 'Olivia Moore', 5, 300000, 5000, false],
    [3],
    [4],
    [5],
    [6],
    [7],
    [8],
    [9],
    [10],
    [11],
    [12],
    [13],
    [14],
    [15],
    [16],
    [17],
    [18],
    [19],
    [20],
    [21],
    [22],
    [228, `Abcdefghrtyquwer Abcdefghrtyquwer[#3000]`, 1337, 170402, 2040, true],
    [24],
    [25],
    [26],
    [27],
    [28],
    [29],
    [30],
    [31],
    [32],
    [33],
    [34],
    [35],
    [36],
    [37],
    [38],
    [39],
    [40],
    [41],
    [42],
    [43],
    [44],
    [45],
    [46],
    [47],
    [48],
    [49],
    [50],
    [51],
    [52],
    [53],
    [54],
    [55],
    [56],
    [57],
    [58],
    [59],
    [60],
    [61],
    [62],
    [63],
    [64],
    [65],
    [66],
    [67],
    [68],
    [69],
    [70],
    [71],
    [72],
    [73],
    [74],
    [75],
    [76],
    [77],
    [78],
    [79],
    [80],
    [81],
    [82],
    [83],
    [84],
    [85],
    [86],
    [87],
    [88],
    [89],
    [90],
    [91],
    [92],
    [93],
    [94],
    [95],
    [96],
    [97],
    [98],
]
// MenuGar.draw([69, menugar_data, 228, 150000])



/*menu-home*/
var home_info = [112, 'Jessica Day', 1500000, 40000, 300, 5, 40, [false, true]]
var home_layouts = [
    [
        ['layout-1', 'Home-Layout#1', 150000],
        ['layout-2', 'Home-Layout#2', 250000],
        ['layout-3', 'Home-Layout#3', 350000]
    ],
    'layout-2'
]
var home_roomies = [
    [23, 'Jessica Day', [true, false, true, true, false]],
    [42, 'Olivia Moore', [false, false, true, true, false]],
    [62, 'Annlynn White', [true, true, true, true, true]],
    [27, 'Max Black', [false, false, false, false, false]],
    [92, 'Fry Tech', [false, true, false, false, true]],
]
var home_furniture = [
    [
        [100, 'furn_0', 'Свободные спортивные штаны и футболка с трусами'],
        [101, 'furn_1', 'Кровать двуспальная#2'],
        [102, 'furn_2', 'Позднеренессансное кресло'],
        [103, 'furn_3', 'Стол стеклянный (журнальный)'],
        [108, 'furn_4', 'Комод классический (бежевый)'],
    ],
    [
        [104, 'furn_5', 'Комод классический (черный)'],
        [105, 'furn_6', 'Комод классический (белый)'],
        [106, 'furn_7', 'Комод классический (зеленый)'],
        [107, 'furn_8', 'Комод классический (фиолетовый)'],
    ], 50
]
var home_lights = [
    ['source-1', 'Источник #1', true, '#FF0000'],
    ['source-2', 'Источник #2', false, '#00FF00'],
    ['source-3', 'Источник #3', true, '#0000FF'],
    ['source-11', 'Источник #11', true, '#FFFF00'],
    ['source-12', 'Источник #12', false, '#FF00FF'],
    ['source-13', 'Источник #13', true, '#00FFFF'],
    ['source-21', 'Источник #21', true, '#FFFFFF'],
    ['source-22', 'Источник #22', false, '#F0F0F0'],
    ['source-23', 'Источник #23', true, '#0F0F0F'],
    ['source-31', 'Источник #31', true, '#F0FF0F'],
    ['source-32', 'Источник #32', false, '#000000'],
    ['source-33', 'Источник #33', true, '#F0000F'],
]
// MenuHome.draw(0, [home_info, home_layouts, home_roomies, home_furniture, home_lights])



/*menu*/
/*
Menu.setAllChar(['name', false, 'fraction', 'organisation', 17, 447.5, 'Reg-date', 1000, 100000, [
        [435, 500],
        [125, 200],
        [132, 300],
        [158, 600]
    ],
    [
        ['veh', 'Car', 'producer', 'model', 'class_range', 550000],
        ['veh', 'Car', 'producer', 'model', 'class_range', 550000],
        ['est', 'House', 'producer', 'model', 'class_range', 1780000, 177],
        ['est', 'Business', 'producer', 'model', 'class_range', 5108530, 358],
        ['veh', 'Plane', 'producer', 'model', 'class_range', 45000],
        ['est', 'House', 'producer', 'model', 'class_range', 1780000, 177],
        ['veh', 'Car', 'producer', 'model', 'class_range', 550000],
        ['est', 'House', 'producer', 'model', 'class_range', 1780000, 177],
        ['veh', 'Car', 'producer', 'model', 'class_range', 550000],
        ['est', 'Business', 'producer', 'model', 'class_range', 5108530, 358],
    ]
])
Menu.drawQuests([
    [173, 'Max-black', 'Fuck Alice', 'Go to Alice', 0],
    [174, 'Max-black', 'Eat shava', 'Buy packet', 1]
])
Menu.drawAchievements([
    [130, 'asda', 'purpose', 13, 50],
    [400, 'name2', 'purpo1se', 13, 13]
])
Menu.drawGifts([
    [1, 'source', 'New</br>Gift1'],
    [2, 'source', 'New</br>Gift2'],
    [3, 'source', 'New</br>Gift3'],
    [4, 'source', 'New</br>Gift4']
])
Menu.setPrices([
    [
        [10, 'Смена имя', 20],
        [11, 'Смена внешности', 50],
        [12, 'Смена номерного знака', 100],
        [13, 'Военный билет', 500]
    ],
    [
        [0, 'Снять предупреждение', 150],
        [1, 'Снять тюрьму', 100],
        [2, 'Снять мут', 50]
    ]
])

Menu.setSettings([
    ['sett-time', 'sett-help', 'sett-names', 'sett-cid', 'sett-hud', 'sett-quest', 'sett-filter', 'sett-timestamp', 'sett-interact', 'sett-items', 'sett-reload', 'sett-finger', 'sett-special'],
    ['sett-chat', 'sett-font', 'sett-speak', 'sett-3D'],
    'aim',
    ['hex', 'alpha']
])
Menu.drawControls([
    ['id1', 'Перезапустить голосовой чат', []],
    ['id2', 'Фары', [17, 50]],
    ['id3', 'Открыть чат', [51]],
    ['id4', 'Присесть', [17, 52]],
    ['id6', 'Меню взаимодействия', [38]],
])
Menu.fillHelpRules(0, [['1', test_fulltext],['12', test_fulltext], ['123',test_fulltext], ['1234', test_fulltext]])
test_fulltext = `<p class="help-rule-section">Раздел 1</p>
abc
<p class="help-rule-subsection">abc</p>
abcc
<p class="help-rule-section">Раздел 2</p>
abc
<p class="help-rule-section">Раздел 3</p>
abcasbsdfasdf
<p class="help-rule-subsection">abc</p>
<p class="help-rule-section">Раздел 4</p>
abc`
*/



/*music-player*/
// MusicPlayer.draw('h1', 123, 10, '00:00', '03:00', true, 0.5, true, true);



/*action-box*/
/*
ActionBox.fill(false, 0, 'choice-actionbox', [[17, 'maxblack'], [14, 'jeka'], [13, 'jeka'], [12, 'jeka'], [11, 'jeka']])
ActionBox.fill(false, 1, 'input-actionbox', [250, 'default-text'])
ActionBox.fill(false, 2, 'range-actionbox', [1, 4000, 1, 1, 1])
ActionBox.fill(false, 3, 'money-actionbox', ['TEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERE'])
ActionBox.fill(false, 4, 'text-actionbox', ['TEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTHERE'])
ActionBox.fill(false, 5, 'input-with-text-actionbox', ['TEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEXTEXTHERETEXTHERETEXTHERETEXTHERETEXTHERETEX', 250, 'default-text'])
*/



/*documents*/
var doc_data = [
    ['Jessica', 'Day', 'женский', '13.02.1982', 'свободная', 141, '13.03.2000', true, true], //passport
    ['Poison', 'Ivy', [
        [true, false, true, false, true, true, false],
        [true, false, true, false, false, false, false]
    ]], //licenses
    ['Reagan', 'Ridley', 'здорова', 'ems', 'John Dorian', '19.09.2010'], //medbook
    ['med', 'morgue card', 'Olivia', 'Moore', 'Assistant Medical Examiner'], //fraction
    ['Juliet', `O'hara`, [
        [
            ['Detective', 'LAPD'],
            ['Head Detective', 'SFPD']
        ],
        [] //must be omitted / exists only for example
    ]], //resume
    ['Buggati', 'Walter Mashbourne', 113, 0, '80085', '16.1.2005'] //vehicle
]
var blank = [true, 'Sacramento Police Department', 'Piper Chapman', 'Max Black', '24.04.2004']
var blank2 = [false, 'Sacramento Police Department', 'Piper Chapman', 'Max Black', '24.04.2004', ['qwer', 'tyuiop', 'zxcvb']]



/*NPC*/
var npc_data = ['TEXTTEXTTEXT', 'TEXTTEXTTEXTTEXT', [
    [0, 'Действие 1'],
    [1, 'Действqwetoqwie opqriweop iqwie pqweir [qwei qweip ие 2'],
    [2, 'Действие 3'],
    [3, 'Действие 4'],
    [4, 'Действие 5'],
]]
// NPC.fill(...npc_data)



/*retail*/
var retail_data = [
    [
        [
            ['cola-0', 'Cola'], 'КолаКолаКолаКола КолаКолаКола', '300', '1', '1.17', false
        ],
        [
            ['cola-1', 'Cola'], 'КолаКола КолаКолаКола Кола КолаКола Кола', '600', '222', '1', false
        ],
        [
            ['cola-2', 'Cola'], 'Свободные спортивные штаны и футболка с трусами', '600', '333', '1', false
        ],
        [
            ['cola-3', 'Cola'], 'Кола', '444', '444', '1'
        ],
        [
            ['cola-4', 'Cola'], 'Кола', '555', '555', '1'
        ],
        [
            ['cola-5', 'Cola'], 'Кола', '666', '666', '1'
        ],
        [
            ['cola-6', 'Cola'], 'Кола', '777', '777', '1'
        ],
        [
            ['cola-7', 'Cola'], 'Кола', '888', '888', '1'
        ],
        [
            ['cola-8', 'Cola'], 'Кола', '999', '999', '1'
        ],
        ['Cola', 'Кола', '600', '60', '1', true],
        ['Cola', 'Кола', '600', '60', '1'],
        ['Cola', 'Кола', '600', '60', '1'],
        ['Cola', 'Кола', '600', '60', '1'],
        ['Cola', 'Кола', '600', '60', '1'],
        ['Cola', 'Кола', '600', '60', '1'],
        ['Cola', 'Кола', '600', '60', '1'],
        ['Cola', 'Кола', '600', '60', '1'],
        ['Cola', 'Кола', '600', '60', '1'],
        ['Cola', 'Кола', '600', '60', '1'],
        ['Cola', 'Кола', '600', '60', '1'],
        ['Cola', 'Кола', '600', '60', '1'],
        ['Cola', 'Кола', '600', '60', '1'],
        ['Cola', 'Кола', '600', '60', '1']
    ],
    [
        ['Cola', 'Кола', '600', '60', '1', true],
    ],
    [
        ['Cola', 'Кола', '600', '60', '1'],
    ],
    [
        ['Cola', 'Кола', '600', '60', '1'],
    ],
    [
        ['Cola', 'Кола', '600', '60', '1'],
    ],
    [
        ['Cola', 'Кола', '600', '60', '1'],
    ],
    [
        ['Cola', 'Кола', '600', '60', '1'],
    ],
    [
        ['Cola', 'Кола', '600', '60', '1'],
    ],
    [
        ['Cola', 'Кола', '600', '60', '1'],
    ],
    [
        ['Cola', 'Кола', '600', '60', '1'],
    ],
];



/*salon*/
var salon_data = [
    ['hair', [
            [2, 1000, 51], //hair_id, cost, hairoverlay_initital_id
            [9, 2000, -1],
            [6, 3000, 117],
            [13, 4000, 120]
        ],
        ['hairoverlay_34', 'hair_13', 12, 15], //bought: hairoverlay_id, hair_id, color_1, color_2
        [-1, 23, 34, 41, 51, 46, 72, 87, 98, 120, 151, 172, 131, 143, 145, 117] //hairovelay return ids
    ],
    ['eyebrows', [
            [3, 1000], //hair_id, cost
            [7, 1000],
            [13, 1000]
        ],
        [14, 'eyebrows_7'] //bought: color, hair_id
    ],
    [
        ['lipstick', 'Помада', [
                [500, 'Средняя матовая'],
                [300, 'Матовая'],
                [1000, 'Глянцевая'],
                [500, 'Средняя матовая'],
                [300, 'Матовая'],
                [1000, 'Глянцевая'],
                [500, 'Средняя матовая'],
                [300, 'Матовая'],
                [1000, 'Глянцевая'],
                [500, 'Средняя матовая'],
                [300, 'Матовая'],
                [1000, 'Глянцевая'],
            ],
            [10, 'lipstick_11', 0.4] //bought: color, makeup_id, makeup_opacity; 
        ],
        ['blush', 'Румяна', [
                [500, 'Средняя матовая'],
                [300, 'Матовая'],
                [1000, 'Глянцевая']
            ],
            [15, 'blush_1', 0.7]
        ],
        ['makeup', 'Макияж', [
                [500, 'Средняя матовая'],
                [300, 'Матовая'],
                [1000, 'Глянцевая']
            ],
            [-1, 'makeup_2', 0.1] //if color == -1 -> no colorpicker
        ]
    ]
]
// Salon.draw(salon_data)



/*shop*/
var shop_data1 = [
    ['clear', 'Ничего', 0, 0, false],
    [17, 'Футболка спортивная', 3000, 20, true],
    [14, 'Футболка для дома', 2000, 6, false],
    [18, 'Футболка простая', 1000, 40, false],
    [288, 'Штаны спортивные', 200, 100, true],
    [3, 'Штаны простые', 300, 30, true],
    [45, 'Штаны для дома', 1000, 100, false],
    [612, 'Рубашка спортивная', 2000, 70, true],
    [171, 'Рубашка простая', 2000, 100, false],
    [83, 'Рубашка для дома', 300, 70, true],
    [90, 'Шорты спортивные', 300, 100, false],
    [101, 'Шорты простые', 200, 600, true],
    [131, 'Шорты для дома', 200, 30, false],
    [112, 'Кеды спортивные', 2000, 100, true],
    [15, 'Кеды простые', 2000, 40, false],
    [148, 'Кеды для дома', 3000, 50, true],
    [191, 'Кроссовки 1', 3000, 100, true],
    [192, 'Кроссовки 2', 3000, 100, true],
    [193, 'Кроссовки 3', 3000, 100, true],
    [194, 'Кроссовки 4', 3000, 100, true],
    [195, 'Кроссовки 5', 3000, 100, true],
    [196, 'Кроссовки 6', 3000, 100, true],
    [197, 'Кроссовки 7', 3000, 100, true],
    [198, 'Кроссовки 8', 3000, 100, true],
    [199, 'Кроссовки 9', 3000, 100, true],
    [1910, 'Кроссовки 10', 3000, 100, true],
    [1911, 'Кроссовки 11', 3000, 100, true],
    [1912, 'Кроссовки 12', 3000, 100, true],
    [1913, 'Кроссовки 13', 3000, 100, true],
    [1914, 'Кроссовки 14', 3000, 100, true],
]
var shop_data2 = [
    ['clear', 'Ничего', 0, 0, 0, false],
    [754, 'Рюкзак желтый', 1200, 100, [10, 7]],
    [124, 'Рюкзак черный', 800000, 100, [10, 7]],
    [168, 'Рюкзак белый', 55000, 100, [10, 7]],
    [768, 'Рюкзак фиолетовый', 5000, 100, [10, 7]],
    [63, 'Очки желтые', 3000, 100, [10, 7]],
    [69, 'Очки черные', 1000, 100, [10, 7]],
    [68, 'Очки белые', 30000, 130, [10, 7]],
]
var shop_data3 = [
    [1754, 'Рюкзак желтый', 1200, 150, 200, true, true, 0, 0],
    [1124, 'Рюкзак черный', 800000, 50, 15, true, false, 0, 0],
    [998, 'Рюкзак белый', 55000, 10, 26, false, true, 20, 9],
    [1768, 'Рюкзак фиолетовый', 7000, 462, 200, false, false, 40, 11],
    [163, 'Очки желтые', 3000, 325, 523, true, true, 50, 14],
    [169, 'Очки черные', 1000, 350, 412, true, true, 60, 15],
    [1168, 'Очки белые', 30000, 450, 315, true, true, 0, 0],
    [2168, 'Очки белые#2', 30000, 450, 315, true, true, 70, 61],
    [3168, 'Очки белые#3', 30000, 450, 315, true, true, 70, 61],
    [4168, 'Очки белые#4', 30000, 450, 315, true, true, 70, 61],
    [5168, 'Очки белые#5', 30000, 450, 315, true, true, 70, 61],
    [6168, 'Очки белые#6', 30000, 450, 315, true, true, 70, 61],
    [7168, 'Очки белые#7', 30000, 450, 315, true, true, 70, 61],
    [8168, 'Очки белые#8', 30000, 450, 315, true, true, 70, 61],
]
/*
Shop.draw(0); //6
Shop.fillContainer(0, data1);
Shop.fillContainer(1, data2);
*/



/*tattoo*/
var tattoo_data = [
    ['head', 'Голова', [
        ['none', 'Ничего', 3000],
        ['dragon_tattoo_0', 'Дракон', 500],
        ['dragon_tattoo_1', 'Дракончик', 1500],
        ['dragon_tattoo_2', 'Дракончики', 2500],
    ], 'dragon_tattoo_1'],
    ['left_arm', 'Левая рука', [
        ['none', 'Ничего', 2400],
        ['dragon_tattoo_0', 'Дракон', 500],
        ['dragon_tattoo_1', 'Дракончик', 1500],
        ['dragon_tattoo_2', 'Дракончики', 2500],
    ], 'none'],
    ['right_arm', 'Правая рука', [
        ['none', 'Ничего', 3000],
        ['dragon_tattoo_0', 'Дракон', 500],
        ['dragon_tattoo_1', 'Дракончик', 1500],
        ['dragon_tattoo_2', 'Дракончики', 2500],
    ], 'dragon_tattoo_2'],
]
// Tattoo.draw(salon_data)

/*tuning*/
var tune_data = [
    [ //Tech
        ['engine', 'Двигатель', 'variants-list', [100, 140, 200], 'engine_2'],
        ['breaks', 'Тормоза', 'variants-list', [
            [500, 'Тормоза первые'],
            [430, 'Тормоза вторые'],
            [260, 'Тормоза третьи']
        ], 'breaks_1'],
        ['transmission', 'Коробка передач', 'variants-list', [1040, 1470, 2030, 1250, 1304, 5041], 'transmission_4'],
        ['pendant', 'Подвеска', 'variants-list', [1400, 1430, 2005, 5102], 'pendant_0'],
        ['turbo', 'Турбо-тюнинг', 'variants-list', [1100, 1420, 2300, 510, 5293, 699, 7103, 6010, 602, 1296, 1100, 1420, 2300, 510, 5293, 699, 7103, 6010, 602, 1296], 'turbo_13'],
    ],
    [ //Style
        ['id1', 'Спойлер', 'variants-list', [1, 1, 1], 'id1_2'],
        ['neon', 'Неон', 'color-selection-1', ['Цвет неона', 9000, 5000], '#ff00ff']
    ],
    [ //Color
        ['paint-type', 'Тип покраски', 'variants-list', [
            [500, 'Обычный'],
            [430, 'Металлик'],
            [260, 'Жемчужный'],
            [2500, 'Матовый'],
            [5430, 'Металлический'],
            [2360, 'Хром'],
        ], 'paint-type_3'],
        ['paint-color', 'Цвета покраски', 'color-selection-2', [null, '#eeff33', 18000]],
        ['pearl', 'Перламутр', 'color-selection-many', [true, 27000, 5000], null],
        ['disks', 'Диски', 'color-selection-many', [false, 36000, 5000], 16],
        ['disksc', 'Дым от колес', 'color-selection-1', ['Цвет дыма от колес', 9000, 5000], null],
    ],
    [ //Wheel
        ["wheels_0", "Колеса #1", "variants-list", [100, 200, 300]],
        ["wheels_1", "Колеса #2", "variants-list", [100, 200, 300]],
        ["wheels_2", "Колеса #3", "variants-list", [100, 200, 300]],
        ["wheels_3", "Колеса #14", "variants-list", [100, 200, 300]],
        ["wheels_4", "Колеса #5", "variants-list", [100, 200, 300]],
        ["wheels_5", "Колеса #5", "variants-list", [100, 200, 300]],
        ["wheels_6", "Колеса #5", "variants-list", [100, 200, 300]],
        ["wheels_7", "Колеса #5", "variants-list", [100, 200, 300]],
        ["wheels_8", "Колеса #5", "variants-list", [100, 200, 300]],
        ["wheels_9", "Колеса #5", "variants-list", [100, 200, 300]],
        ["wheels_10", "Колеса #5", "variants-list", [100, 200, 300]],
        ["wheels_11", "Колеса #5", "variants-list", [100, 200, 300]],
        ["wheels_14", "Колеса #5", "variants-list", [100, 200, 300]],
        ["wheels_114", "Колеса #35", "variants-list", [100, 200, 300, 100, 200, 300, 100, 200, 300, 100, 200, 300, 100, 200, 300], 'wheels_114_12'],
        ["wheels_244", "Колеса #5", "variants-list", [100, 200, 300]],
        ["wheels_324", "Колеса #5", "variants-list", [100, 200, 300]],
        ["wheels_514", "Колеса #5", "variants-list", [100, 200, 300]],
    ],
    [ //Wheel
        ["rwheels_0", "Колеса #1", "variants-list", [100, 200, 300]],
        ["rwheels_7", "Колеса #1", "variants-list", [100, 200, 300]],
        ["rwheels_8", "Колеса #1", "variants-list", [100, 200, 300]],
    ],
    [ //Misc
        ["misc", "Колеса #1", "variants-list", [100, 200, 300]],
    ],
]
// Tuning.draw(tune_data);



/*inventory*/
/*
renderTemplate(true, 'full_inventory')
switchTemplate(true, 'inventory')
Inventory.fillWeapon([
   ["Pistol", 'Assault Riffle', [[1, 'divide']], 100, true],
   ["AssaultRifle", 'Assault Riffle', , 1500, true],
    ["AssaultRifle", 'Assault Riffle', , 20, ]
]);
Inventory.fillVest(["BodyArmour", 'Броня FIB', [[1, 'divide']], 90]);
Inventory.fillPockets('inv', [
   , , , , , , , ,
   ["rod_0", 'Свободные спортивные штаны и футболка с трусами', [[1, 'divide']], 100, ],
   ["rod_0", 'Свободные спортивные штаны и футболка', [[1, 'divide']], 100, 0.5],
   , , ,
   ["am_5.56", 'Патроны 5.5666666666 5.666666', [[1, 'divide']], 100, ],
   ["rod_0", 'Патроны 5.5666666666', [[1, 'divide']], 100, ],
   , , ,
   ["am_5.56", 'Свободные спортивные штаны', [[1, 'divide']], 100, 0.5],
   ["am_5.56", 'Патроны', [[1, 'divide']], 100, 0.5]
]);
Inventory.fillClothes([
   ["am_5.56", 'Свободные спортивные штаны и футболка с трусами', [[1, 'divide']]],
   ["am_5.56", 'Патроны 5.5666666666 5.666666', [[1, 'divide']]],
   ["am_5.56", 'Футболка обычная', [[1, 'divide']]],
   ["am_5.56", 'Джинсы Gucci', [[1, 'divide']]],
   ["am_5.56", 'Лоферы', [[1, 'divide']]]
]);
Inventory.fillAccessories([
   ["am_5.56", 'Свободные спортивные штаны и футболка с трусами', [[1, 'divide']]],
   ["am_5.56", 'Патроны 5.5666666666 5.666666', [[1, 'divide']]],
   ["am_5.56", 'Футболка обычная', [[1, 'divide']]],
   ["am_5.56", 'Джинсы Gucci', [[1, 'divide']]],
   ["am_5.56", 'Лоферы', [[1, 'divide']]], , , , , ["am_5.56", 'Свободные спортивные штаны и футболка с трусами', [[1, 'divide']]]
]);
Inventory.fillBag('inv', [
   ["am_5.56", 'Свободные спортивные штаны и футболка с трусами', [[1, 'divide']], 100, 0.5],
   ,
   ["am_5.56", 'Патроны 5.5666666666 5.666666', [[1, 'divide']], 100, 0.5],
   , ,
   ["am_5.56", 'Свободные спортивные штаны', [[1, 'divide']], 100, 0.5],
   ["am_5.56", 'Патроны', [[1, 'divide']], 100, 0.5]
]);
Inventory.fillAllStatus([[0, 10], [1, 15], [2, 20]]);
Inventory.fillBind([49, 50, , 52, 53, , 55, , , , 65, 66, , , 69, 70, 71, , , 72, 73, 74, 75]);
*/

/*crates-Inventory*/
/*
Inventory.fillPockets('crate', [
   , , , , , , , ,
   ["rod_0", 'Свободные спортивные штаны и футболка с трусами', [[1, 'divide']], 100, ],
   ["rod_0", 'Свободные спортивные штаны и футболка', [[1, 'divide']], 100, 0.5],
   , , ,
   ["am_5.56", 'Патроны 5.5666666666 5.666666', [[1, 'divide']], 100, ],
   ["rod_0", 'Патроны 5.5666666666', [[1, 'divide']], 100, ],
   , , ,
   ["am_5.56", 'Свободные спортивные штаны', [[1, 'divide']], 100, 0.5],
   ["am_5.56", 'Патроны', [[1, 'divide']], 100, 0.5]
]);
Inventory.fillBag('crate', [
   ["am_5.56", 'Свободные спортивные штаны и футболка с трусами', [[1, 'divide']], 100, 0.5],
   ,
   ["am_5.56", 'Патроны 5.5666666666 5.666666', [[1, 'divide']], 100, 0.5],
   , ,
   ["am_5.56", 'Свободные спортивные штаны', [[1, 'divide']], 100, 0.5],
   ["am_5.56", 'Патроны', [[1, 'divide']], 100, 0.5]
]);
Inventory.fillCrate('ящик', [
   , , , , , , , ,
   ["rod_0", 'Свободные спортивные штаны и футболка с трусами', [[1, 'divide']], 100, ],
   ["rod_0", 'Свободные спортивные штаны и футболка', [[1, 'divide']], 100, 0.5],
   , , ,
   ["am_5.56", 'Патроны 5.5666666666 5.666666', [[1, 'divide']], 100, ],
   ["rod_0", 'Патроны 5.5666666666', [[1, 'divide']], 100, ],
   , , ,
   ["am_5.56", 'Свободные спортивные штаны', [[1, 'divide']], 100, 0.5],
   ["am_5.56", 'Патроны', [[1, 'divide']], 100, 0.5] ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
]);
*/

/*trade*/
/*
Inventory.fillPockets('trade', [
   , , , , , , , ,
   ["rod_0", 'Свободные спортивные штаны и футболка с трусами', [[1, 'divide']], 100, ],
   ["rod_0", 'Свободные спортивные штаны и футболка', [[1, 'divide']], 100, 0.5],
   , , ,
   ["am_5.56", 'Патроны 5.5666666666 5.666666', [[1, 'divide']], 100, ],
   ["rod_0", 'Патроны 5.5666666666', [[1, 'divide']], 100, ],
   , , ,
   ["am_5.56", 'Свободные спортивные штаны', [[1, 'divide']], 100, 0.5],
   ["am_5.56", 'Патроны', [[1, 'divide']], 100, 0.5]
]);
Inventory.fillTradeLProperties(['house', 'boat', 'car', 'flat', 'plane','house', 'boat', 'car', 'flat', 'plane','house', 'boat', 'car', 'flat', 'plane','house', 'boat', 'car', 'flat', 'plane','house', 'boat', 'car', 'flat', 'plane','house', 'boat', 'car', 'flat', 'plane'])
Inventory.fillTradeGive([["rod_0", 'Свободные спортивные штаны и футболка', [[1, 'divide']], 100, 0.5], null, null,["am_5.56", 'Патроны 5.5666666666 5.666666', [[1, 'divide']], 100, ],["rod_0", 'Патроны 5.5666666666', [[1, 'divide']], 100, ]])
Inventory.fillTradeReceive([["rod_0", 'Свободные спортивные штаны и футболка', [[1, 'divide']], 100, 0.5], null, null,["am_5.56", 'Патроны 5.5666666666 5.666666', [[1, 'divide']], 100, ],["rod_0", 'Патроны 5.5666666666', [[1, 'divide']], 100, ]])
Inventory.fillTradeRProperties('give', ['house', 'boat', 'car', 'flat', 'plane','house', 'boat', 'car', 'flat'])
Inventory.fillTradeRProperties('receive', ['house', 'boat', 'car', 'flat', 'plane','house', 'boat', 'car', 'flat'])
Inventory.updateReceiveMoney(999999999);
*/

//update Commands
/*
//this applies for weapon / clothes / accessories / crate
updateWeaponSlot(2, ["AssaultRifle", 'Assault Riffle', , 1500, true])
updateWeaponSlot(2, ["AssaultRifle", 'Assault Riffle', , 100, false])
updateWeaponSlot(2, null)

//this applies for pockets / bag in basic inventory
updatePocketsSlot(2, null, ["am_5.56", 'Патроны', [[1, 'divide']], 100, 0.5])
updatePocketsSlot(2, null, ["am_5.56", 'Патроны', [[1, 'divide']], 1, 0.5])
updatePocketsSlot(2,null, null)

//this applies for pockets / bag in crate inventory
updatePocketsSlot(2, 'crate', ["am_5.56", 'Патроны', [[1, 'divide']], 100, 0.5])
updatePocketsSlot(2, 'crate', ["am_5.56", 'Патроны', [[1, 'divide']], 1, 0.5])
updatePocketsSlot(2,'crate', null)
*/


/*workbench*/
/*
renderTemplate(true, 'full_inventory')
switchTemplate(true, 'workbench')
Inventory.fillPockets('wb', [
   , , , , , , , ,
   ["rod_0", 'Свободные спортивные штаны и футболка с трусами', [[1, 'divide']], 100, ],
   ["rod_0", 'Свободные спортивные штаны и футболка', [[1, 'divide']], 100, 0.5],
   , , ,
   ["am_5.56", 'Патроны 5.5666666666 5.666666', [[1, 'divide']], 100, ],
   ["rod_0", 'Патроны 5.5666666666', [[1, 'divide']], 100, ],
   , , ,
   ["am_5.56", 'Свободные спортивные штаны', [[1, 'divide']], 100, 0.5],
   ["am_5.56", 'Патроны', [[1, 'divide']], 100, 0.5]
]);
Inventory.fillWbCraft('Кухня',
   [
      ['fire', 'Огонь', [1, 'Использовать']],
      ["am_5.56", 'Патроны', [[1, 'divide']], 100, 0.5],
      ["rod_0", 'Патроны 5.5666666666', [[1, 'divide']], 100, null],
      null,
      ["rod_0", 'Патроны', null,],
   ]);
Inventory.updateResultSlot(["rod_0", 'удОЧКА', [[1, 'Забрать']], 100, 0.5]);
Inventory.updateResultSlot(["rod_0", 'удОЧКА', null, 100, 0.5]);
Inventory.updateResultSlot(null);
Inventory.fillWbTools([
   ['fire', 'Огонь', [1, 'Использовать']], 
   null, 
   ['fire', 'Огонь', [1, 'Использовать']], 
   null, 
   ['fire', 'Огонь', [1, 'Использовать']]
]);
Inventory.fillCraftBtn([null, 'Готовить']) || Inventory.fillCraftBtn('12:00:00')
*/



//