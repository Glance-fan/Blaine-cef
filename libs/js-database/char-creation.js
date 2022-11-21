//elem = ['elem-id', min, max, value, step, 'description', 'left-content/right-content', 'min-text', 'max-text']
//'left-content' || 'right-content' - строка, к какой стороне принадлежит (ширина: левая > правая)
var scrollableContainers = [
    ['hair-elem-container', false],
    ['eyebrows_hair-elem-container', false],
    ['beard-elem-container', false],
    ['chest-elem-container', false],
    ['colors-container', false],
    ['makeup-container', false],
    ['nose-container', false],
    ['chin-container', false]
];

var allSliders = document.getElementsByClassName('slider');

var right_data = {
    eyes: {
        sliders: [
                ['eyes', -1, 1, 0, 0.1, 'Размер глаз', 'right-content', 'меньше', 'больше']
            ],
        eyesBox: [
                ['eyes-colorBox', 'Цвет глаз', 'eyes-container', 'right-content']
            ],
        eyesColors: [
				'#1d5224', '#1d5224', '#535959', '#452209', '#2e190b', '#211005', '#c45b18', '#3d4545', '#576363', '#b514a2', '#bfba1b', '#2c26c9', '#000000', '#595961', '#c45b18'
			]
    },

    nose: [
        ['nose', -1, 1, 0, 0.1, 'Ширина носа', 'right-content', 'уже', 'шире'],
        ['nose', -1, 1, 0, 0.1, 'Высота носа', 'right-content', 'ниже', 'выше'],
        ['nose', -1, 1, 0, 0.1, 'Длина кончика носа ', 'right-content', 'короче', 'длинее'],
        ['nose', -1, 1, 0, 0.1, 'Глубина моста носа', 'right-content', 'внутрь', 'наружу'],
        ['nose', -1, 1, 0, 0.1, 'Высота кончика носа', 'right-content', 'ниже', 'выше'],
        ['nose', -1, 1, 0, 0.1, 'Поломаность носа', 'right-content', 'лево', 'право']
    ],

    eyebrows: [
        ['eyebrows', -1, 1, 0, 0.1, 'Высота бровей', 'right-content', 'ниже', 'выше'],
        ['eyebrows', -1, 1, 0, 0.1, 'Глубина бровей', 'right-content', 'внутрь', 'наружу']
    ],

    chin: [
        ['chin', -1, 1, 0, 0.1, 'Высота подбородка', 'right-content', 'ниже', 'выше'],
        ['chin', -1, 1, 0, 0.1, 'Глубина подбородка', 'right-content', 'внутрь', 'наружу'],
        ['chin', -1, 1, 0, 0.1, 'Ширина подбородка', 'right-content', 'уже', 'шире'],
        ['chin', -1, 1, 0, 0.1, 'Отступ подбородка ', 'right-content', 'выше', 'ниже'],
        ['chin', -1, 1, 0, 0.1, 'Ширина челюсти', 'right-content', 'уже', 'шире'],
        ['chin', -1, 1, 0, 0.1, 'Форма челюсти', 'right-content', 'меньше', 'больше'],
        ['chin', -1, 1, 0, 0.1, 'Шея', 'right-content', 'уже', 'шире']
    ],

    lips: [
        ['lips', -1, 1, 0, 0.1, 'Толщина губ', 'right-content', 'уже', 'шире'],
        ['lips', -1, 1, 0, 0.1, 'Высота скул', 'right-content', 'ниже', 'выше'],
        ['lips', -1, 1, 0, 0.1, 'Ширина скул', 'right-content', 'уже', 'шире'],
        ['lips', -1, 1, 0, 0.1, 'Глубина щеки', 'right-content', 'внутрь', 'наружу']
    ]
}

var fathers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 42, 43, 44];
var mothers = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 45];
var makeups = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 32, 34, 35, 36, 37, 38, 39, 40, 41];

var left_data = {
    parents: {
        sliders: [
            ['parents', 0, 1, 0.5, 0.1, 'Сходство с родителями', 'left-content', 'Отец', 'Мать'],
            ['parents', 0, 1, 0.5, 0.1, 'Оттенок кожи', 'left-content', 'Отец', 'Мать'],
        ],

        names: {
            father: [
                'Бенджамин',
                'Дэниель',
                'Джошуа',
                'Ноа',
                'Эндрю',
                'Джоан',
                'Алекс',
                'Исаак',
                'Эван',
                'Итан',
                'Винсент',
                'Энджел',
                'Диего',
                'Адриан',
                'Махмуд',
                'Майкл',
                'Сантьяго',
                'Кевин',
                'Луиз',
                'Сэмюэл',
                'Энтони',
                'Джон',
                'Нико',
                'Клод'
            ],

            mother: [
                'Ханна',
                'Обри',
                'Джасмин',
                'Жизель',
                'Амелия',
                'Изабелла',
                'Зои',
                'Ава',
                'Камилла',
                'Виолет',
                'София',
                'Эвелина',
                'Николь',
                'Эшли',
                'Грейс',
                'Брианна',
                'Натали',
                'Оливия',
                'Элизабет',
                'Шарлотта',
                'Эмма',
                'Мисти'
            ]
        }
    },

    hair: {
            boy_hair: [
            ],

            girl_hair: [
            ],

        eyebrows: [
        ],

        beard: [
        ],

        chest: [
        ],
    },

    appearance: {
        features: {
			fuzz: [
				'Нет'
            ],
			
            aging: [
                'Нет',
				'Морщины #1',
				'Первые признаки старения',
				'Средний возраст',
				'Морщины #2',
				'Морщины #3',
				'Морщины #4',
				'Поживший',
				'В возрасте',
				'Выветрившийся',
				'Морщины #4',
				'Жесткая жизнь',
				'Старый',
				'На пенсии',
				'Наркоман',
				'Пожилой'
            ],

            flaws: [
				'Нет',
				'Корь',
				'Прыщи #1',
				'Пятна',
				'Прыщи #2',
				'Угри',
				'Открытые поры',
				'Прыщи #3',
				'Прыщи #4',
				'Прыщи #5',
				'Прыщи #6',
				'Сыпь на щеках',
				'Сыпь на лице',
				'Прыщи #7',
				'Пубертат',
				'Бельмо',
				'Сыпь на подбородке',
				'Двуликий',
				'Прыщи #8',
				'Сальное лицо',
				'Отметина',
				'Прыщи #9',
				'Прыщи #10',
				'Герпес',
				'Импетиго'
            ],

            burns: [
				'Нет'
            ],

            moles: [
				'Нет'
            ]
        },

        makeup: {
            frames: {
                makeup: [
					'Нет',
					'Дымчатый чёрный',
					'Бронзовый',
					'Мягкий серый',
					'Ретро',
					'Естественный',
					'Кошачьи глазки',
					'Чола',
					'Вамп',
					'Вайнвудский гламур',
					'Бабблгам',
					'Аква дрим',
					'Пин ап',
					'Фиолетовая страсть',
					'Дымчатый кошачий глаз',
					'Тлеющий рубин',
					'Поп-принцесса',
					'Гайлайнер',
					'Кровавые слёзы',
					'Хэви метал',
					'Скорбь',
					'Принц тьмы',
					'Легкая тушь',
					'Гот',
					'Панк',
					'Потекшая тушь'
                ],
                blush: [
					'Нет',
					'Полностью',
					'По углам',
					'Вокруг',
					'Горизонтально',
					'От глаз',
					'Сердечки',
					'Восьмидесятые'
                ],
                lipstick: [
					'Нет',
					'Средняя матовая',
					'Средняя глянцевая',
					'Матовая',
					'Глянцевая',
					'Насыщенная матовая',
					'Насыщенная глянцевая',
					'Стёртая матовая',
					'Стёртая глянцевая',
					'Размазанная',
					'Гейша'
                ]
            },

            sliders: [
                ['makeup', 0, 1, 0.5, 0.1, 'Насыщенность помады', 'left-content', 'тусклее', 'ярче'],
                ['makeup', 0, 1, 0.5, 0.1, 'Насыщенность румян', 'left-content', 'тусклее', 'ярче'],
                ['makeup', 0, 1, 0.5, 0.1, 'Насыщенность макияжа', 'left-content', 'тусклее', 'ярче'],
            ]
        }
    },

    colors: {
        hair: {
            hairBox: [
                ['hair-colorBox', 'Прическа (основной)', 'colors-wrapper', 'left-content'],
                ['hair1-colorBox', 'Прическа (акцент)', 'colors-wrapper', 'left-content'],
                ['eyebrows-colorBox', 'Брови', 'eyebrows-container', 'right-content'],
                ['beard-colorBox', 'Борода', 'colors-wrapper', 'left-content'],
                ['chest-colorBox', 'Волосы на груди', 'colors-wrapper', 'left-content']
            ],
            hairColors: [
                '#1c1f21', '#272a2c', '#312e2c', '#35261c', '#4b321f', '#5c3b24', '#6d4c35', '#6b503b', '#765c45', '#7f684e', '#99815d', '#a79369', '#af9c70', '#bba063', '#d6b97b', '#dac38e', '#9f7f59', '#845039', '#682b1f', '#61120c', '#640f0a', '#7c140f', '#a02e19', '#b64b28', '#a2502f', '#aa4e2b', '#626262', '#808080', '#aaaaaa', '#c5c5c5', '#463955', '#5a3f6b', '#763c76', '#ed74e3', '#eb4b93', '#f299bc', '#04959e', '#025f86', '#023974', '#3fa16a', '#217c61', '#185c55', '#b6c034', '#70a90b', '#439d13', '#dcb857', '#e5b103', '#e69102', '#f28831', '#fb8057', '#e28b58', '#e28b58', '#ce3120', '#ad0903', '#880302', '#1f1814', '#291f19', '#2e221b', '#37291e', '#2e2218', '#231b15', '#020202', '#706c66', '#9d7a50'
            ]
        },
        makeup: {
            makeupBox: [
                ['lipstick-colorBox', 'Цвет помады', 'makeup-container', 'left-content'],
                ['blush-colorBox', 'Цвет румян', 'makeup-container', 'left-content'],
            ],
            makeupColors: [
                '#992532', '#c8395d', '#bd516c', '#b8637a', '#a6526b', '#b1434c', '#7f3133', '#a4645d', '#c18779', '#cba096', '#c6918f', '#ab6f63', '#b06050', '#a84c33', '#b47178', '#ca7f92', '#ed9cbe', '#e775a4', '#de3e81', '#b34c6e', '#712739', '#4f1f2a', '#aa222f', '#de2034', '#cf0813', '#e55470', '#dc3fb5', '#c227b2', '#a01ca9', '#6e1875', '#731465', '#56165c', '#6d1a9d', '#1b3771', '#1d4ea7', '#1e74bb', '#21a3ce', '#25c2d2', '#23cca5', '#27c07d', '#1b9c32', '#148604', '#70d041', '#c5ea34', '#e1e32f', '#ffdd26', '#fac026', '#f78a27', '#fe5910', '#be6e19', '#f7c97f', '#fbe5c0', '#f5f5f5', '#b3b4b3', '#919191', '#564e4e', '#180e0e', '#58969e', '#4d6f8c', '#1a2b55', '#a07e6b', '#826355', '#6d5346', '#3e2d27'
            ]
        },
    },

    clothes: {
        boy: {
            headdress: ['Нет', 'Шапка', 'Панама', 'Шляпа'],
            outerwear: ['Нет', 'Олимпийка', 'Футболка', 'Рубашка'],
            underwear: ['Нет', 'Джинсы', 'Штаны', 'Бриджи'],
            footwear: ['Нет', 'Кроссовки', 'Кеды', 'Тапки']
        },

        girl: {
            headdress: ['Нет', 'Шапка', 'Кепка', 'Шляпа'],
            outerwear: ['Нет', 'Олимпийка', 'Майка', 'Футболка'],
            underwear: ['Нет', 'Джинсы', 'Юбка', 'Шорты'],
            footwear: ['Нет', 'Кроссовки', 'Кеды', 'Каблуки']
        }
    }
}

for (var i = 1; i < 44; i++)
    left_data.hair.girl_hair.push([`libs/img/char-creation/hair/hair/girl/Screenshot_${i}.png`]);

for (var i = 1; i < 42; i++)
    left_data.hair.boy_hair.push([`libs/img/char-creation/hair/hair/boy/Screenshot_${i}.png`]);

for (var i = 1; i < 35; i++)
    left_data.hair.eyebrows.push([`libs/img/char-creation/hair/eyebrows/Screenshot_${i}.png`]);

for (var i = 1; i < 30; i++)
    left_data.hair.beard.push([`libs/img/char-creation/hair/beard/Screenshot_${i}.png`]);

for (var i = 2; i < 19; i++)
    left_data.hair.chest.push([`libs/img/char-creation/hair/chest/Screenshot_${i}.png`]);

for (var i = 1; i < 37; i++)
    left_data.appearance.features.fuzz.push("Вариант #" + i);

//for (var i = 1; i < 16; i++)
//left_data.appearance.features.aging.push("Вариант #" + i);

//for (var i = 1; i < 24; i++)
//left_data.appearance.features.flaws.push("Вариант #" + i);

for (var i = 1; i < 11; i++)
    left_data.appearance.features.burns.push("Вариант #" + i);

for (var i = 1; i < 18; i++)
    left_data.appearance.features.moles.push("Вариант #" + i);

//for (var i = 1; i < 75; i++)
//left_data.appearance.makeup.frames.makeup.push("Вариант #" + i);

//for (var i = 1; i < 33; i++)
//left_data.appearance.makeup.frames.blush.push("Вариант #" + i);

var frame_items = ['father-item', 'mother-item', 'fuzz-item', 'aging-item', 'flaws-item', 'burns-item', 'moles-item', 'lipstick-item', 'blush-item', 'makeup-item', 'headdress-item', 'outerwear-item', 'underwear-item', 'footwear-item'];

var clothes = ['headdress', 'outerwear', 'underwear', 'footwear'];

var hairs = ['hair-', 'eyebrows_hair-', 'beard-', 'chest-'];

var colors = ['hair-color-', 'hair1-color-', 'beard-color-', 'chest-color-', 'lipstick-color-', 'blush-color-', 'eyes-color-', 'eyebrows-color-'];

var frame_index = [0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var cr_navBG = `background: linear-gradient(225.72deg, rgb(200, 18, 18) 0%, rgb(133, 23, 23) 100%) 0% 0% / 300% 100%; animation: 5s ease 0s infinite normal none running selected; border-width: 1px; border-style: solid; border-color: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; border-image-source: linear-gradient(268.24deg, rgb(252, 0, 0) 0.37%, rgb(226, 45, 45) 53.3%, rgb(216, 31, 31) 100%);`;

var hairSelected = `width:104px;height:104px;background:linear-gradient(268.24deg, rgba(240, 48, 48, 0.5) 0.37%, rgba(255, 0, 0, 0.5) 53.3%, rgba(243, 9, 9, 0.5) 100%) 0% 0% / 300% 100%;animation: 5s ease 0s infinite normal none running selected;border-radius:5px;`;

function getDB(item, section) {
    switch (item) {
        case 'hair':
            switch (section) {
                case 'sliders':
                    return [];
                default:
                    if (ChCreate.curSex == 'boy')
                        return left_data.hair.boy_hair;
                    else
                        return left_data.hair.girl_hair;
            }
            break;
        case 'eyebrows_hair':
            return left_data.hair.eyebrows;
        case 'beard':
            return left_data.hair.beard;
        case 'chest':
            return left_data.hair.chest;
        case 'eyes':
            return right_data.eyes.sliders;
        case 'nose':
            return right_data.nose;
        case 'eyebrows':
            return right_data.eyebrows;
        case 'chin':
            return right_data.chin;
        case 'lips':
            return right_data.lips;
        case 'parents':
            return left_data.parents.sliders;
        case 'father':
            return left_data.parents.names.father;
        case 'mother':
            return left_data.parents.names.mother;
		case 'fuzz':
            return left_data.appearance.features.fuzz;
        case 'aging':
            return left_data.appearance.features.aging;
        case 'flaws':
            return left_data.appearance.features.flaws;
        case 'burns':
            return left_data.appearance.features.burns;
        case 'moles':
            return left_data.appearance.features.moles;
        case 'headdress':
            if (ChCreate.curSex == 'boy')
                return left_data.clothes.boy.headdress;
            else
                return left_data.clothes.girl.headdress;
        case 'outerwear':
            if (ChCreate.curSex == 'boy')
                return left_data.clothes.boy.outerwear;
            else
                return left_data.clothes.girl.outerwear;
        case 'underwear':
            if (ChCreate.curSex == 'boy')
                return left_data.clothes.boy.underwear;
            else
                return left_data.clothes.girl.underwear;
        case 'footwear':
            if (ChCreate.curSex == 'boy')
                return left_data.clothes.boy.footwear;
            else
                return left_data.clothes.girl.footwear;
        case 'lipstick':
            return left_data.appearance.makeup.frames.lipstick;
        case 'blush':
            return left_data.appearance.makeup.frames.blush;
        case 'makeup':
            switch (section) {
                case 'sliders':
                    return left_data.appearance.makeup.sliders;
                case 'frames':
                    return left_data.appearance.makeup.frames.makeup;
            }
    }
}

var data_color;
var colorsBoxes = ['makeup', 'hair', 'eyes'];

function getColorDB(item) {
    switch (item) {
        case 'makeup':
            data_color = left_data.colors.makeup.makeupColors;
            return left_data.colors.makeup.makeupBox;
        case 'hair':
            data_color = left_data.colors.hair.hairColors;
            return left_data.colors.hair.hairBox;
        case 'eyes':
            data_color = right_data.eyes.eyesColors;
            return right_data.eyes.eyesBox;
    }
}
