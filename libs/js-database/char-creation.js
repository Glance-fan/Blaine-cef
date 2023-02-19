var chcreate_navs = {
    full: {
        left: ['chcreate-left-nav', ['data', 'parents', 'hair', 'colors', 'appearance', 'clothes'], 'left-nav/', 0],
        right: ['chcreate-right-nav', ['eyes', 'nose', 'eyebrows', 'chin', 'lips'], 'right-nav/', 1],
        hair: ['chcreate-hair-nav', ['hair_sel', 'eyebrows_sel', 'beard_sel', 'chest_sel'], 'hair/', 2],
        appearance: ['chcreate-appearance-nav', ['features', 'makeup'], 'appearance/', 3],
    },
    partial: {
        left: ['chcreate-left-nav', ['parents', 'appearance'], 'left-nav/', 0],
        right: ['chcreate-right-nav', ['eyes', 'nose', 'eyebrows', 'chin', 'lips'], 'right-nav/', 1],
    }
    
}

var chcreate_choices = {
    pic: {},
    frame: {},
    slider: {},
    color_box: {},
};

var chcreate_content = {
    left_data: {
        hair: {
            girl: 44,
            boy: 42,
            eyebrows: 35,
            beard: 30,
            chest: 18,
        },
        sliders: {
            parents: [
                ['left-content', 'Сходство с родителями', 'Отец', 'Мать'],
                ['left-content', 'Оттенок кожи', 'Отец', 'Мать'],
            ],
            makeup: [
                ['left-content', 'Насыщенность помады', 'тусклее', 'ярче'],
                ['left-content', 'Насыщенность румян', 'тусклее', 'ярче'],
                ['left-content', 'Насыщенность макияжа', 'тусклее', 'ярче'],
            ],
        },
        frames: {
            parents: {
                static: ['chcreate-parents-container', 'Выбор родителей', ['father', 'mother'],
                    ['отец', 'мать'], 'chcreate_content.left_data.frames.parents.'
                ],
                father: [
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 42, 43, 44],
                    ['Бенджамин', 'Дэниель', 'Джошуа', 'Ноа', 'Эндрю', 'Джоан', 'Алекс', 'Исаак', 'Эван', 'Итан', 'Винсент', 'Энджел', 'Диего', 'Адриан', 'Махмуд', 'Майкл', 'Сантьяго', 'Кевин', 'Луиз', 'Сэмюэл', 'Энтони', 'Джон', 'Нико', 'Клод'],
                ],
                mother: [
                    [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 45],
                    ['Ханна', 'Обри', 'Джасмин', 'Жизель', 'Амелия', 'Изабелла', 'Зои', 'Ава', 'Камилла', 'Виолет', 'София', 'Эвелина', 'Николь', 'Эшли', 'Грейс', 'Брианна', 'Натали', 'Оливия', 'Элизабет', 'Шарлотта', 'Эмма', 'Мисти'],
                ]
            },
            clothes: {
                boy: {
                    top: {
                        static: ['chcreate-clothes-container', 'Верхняя одежда', ['headdress', 'outerwear'],
                            ['шапка', 'верх'], 'chcreate_content.left_data.frames.clothes.boy.top.'
                        ],
                        headdress: [
                            [...Array(4).keys()].map(n => n - 1),
                            ['Нет', 'Шапка', 'Панама', 'Шляпа']
                        ],
                        outerwear: [
                            [...Array(4).keys()].map(n => n - 1),
                            ['Нет', 'Олимпийка', 'Футболка', 'Рубашка']
                        ],
                    },
                    bottom: {
                        static: ['chcreate-clothes-container', 'Нижняя одежда', ['underwear', 'footwear'],
                            ['штаны', 'обувь'], 'chcreate_content.left_data.frames.clothes.boy.bottom.'
                        ],
                        underwear: [
                            [...Array(4).keys()].map(n => n - 1),
                            ['Нет', 'Джинсы', 'Штаны', 'Бриджи']
                        ],
                        footwear: [
                            [...Array(4).keys()].map(n => n - 1),
                            ['Нет', 'Кроссовки', 'Кеды', 'Тапки']
                        ],
                    }
                },
                girl: {
                    top: {
                        static: ['chcreate-clothes-container', 'Верхняя одежда', ['headdress', 'outerwear'],
                            ['шапка', 'верх'], 'chcreate_content.left_data.frames.clothes.girl.top.'
                        ],
                        headdress: [
                            [...Array(4).keys()].map(n => n - 1),
                            ['Нет', 'Шапка', 'Кепка', 'Шляпа']
                        ],
                        outerwear: [
                            [...Array(4).keys()].map(n => n - 1),
                            ['Нет', 'Олимпийка', 'Майка', 'Футболка']
                        ],
                    },
                    bottom: {
                        static: ['chcreate-clothes-container', 'Нижняя одежда', ['underwear', 'footwear'],
                            ['штаны', 'обувь'], 'chcreate_content.left_data.frames.clothes.girl.bottom.'
                        ],
                        underwear: [
                            [...Array(4).keys()].map(n => n - 1),
                            ['Нет', 'Джинсы', 'Юбка', 'Шорты']
                        ],
                        footwear: [
                            [...Array(4).keys()].map(n => n - 1),
                            ['Нет', 'Кроссовки', 'Кеды', 'Каблуки']
                        ],
                    }
                },
            },
            appearance: {
                features: {
                    fuzz: {
                        static: ['chcreate-features-container', 'Виски', 'chcreate_content.left_data.frames.appearance.features.fuzz.'],
                        fuzz: [
                            [...Array(37).keys()],
                            ['Нет'].concat(Array.from({
                                length: 36
                            }, (_, i) => `Вариант #${i+1}`)),
                        ],
                    },
                    aging: {
                        static: ['chcreate-features-container', 'Старение', 'chcreate_content.left_data.frames.appearance.features.aging.'],
                        aging: [
                            [...Array(16).keys()],
                            ['Нет', 'Морщины #1', 'Первые признаки старения', 'Средний возраст', 'Морщины #2', 'Морщины #3', 'Морщины #4', 'Поживший', 'В возрасте', 'Выветрившийся', 'Морщины #4', 'Жесткая жизнь', 'Старый', 'На пенсии', 'Наркоман', 'Пожилой'],
                        ],
                    },
                    flaws: {
                        static: ['chcreate-features-container', 'Недостатки лица', 'chcreate_content.left_data.frames.appearance.features.flaws.'],
                        flaws: [
                            [...Array(25).keys()],
                            ['Нет', 'Корь', 'Прыщи #1', 'Пятна', 'Прыщи #2', 'Угри', 'Открытые поры', 'Прыщи #3', 'Прыщи #4', 'Прыщи #5', 'Прыщи #6', 'Сыпь на щеках', 'Сыпь на лице', 'Прыщи #7', 'Пубертат', 'Бельмо', 'Сыпь на подбородке', 'Двуликий', 'Прыщи #8', 'Сальное лицо', 'Отметина', 'Прыщи #9', 'Прыщи #10', 'Герпес', 'Импетиго'],
                        ],
                    },
                    burns: {
                        static: ['chcreate-features-container', 'Солнечные ожоги', 'chcreate_content.left_data.frames.appearance.features.burns.'],
                        burns: [
                            [...Array(11).keys()],
                            ['Нет'].concat(Array.from({
                                length: 10
                            }, (_, i) => `Вариант #${i+1}`)),
                        ],
                    },
                    moles: {
                        static: ['chcreate-features-container', 'Родинки/Веснушки', 'chcreate_content.left_data.frames.appearance.features.moles.'],
                        moles: [
                            [...Array(18).keys()],
                            ['Нет'].concat(Array.from({
                                length: 17
                            }, (_, i) => `Вариант #${i+1}`)),
                        ],
                    },
                },
                makeup: {
                    lipstick: {
                        static: ['chcreate-makeup-container', 'Помада', 'chcreate_content.left_data.frames.appearance.makeup.lipstick.'],
                        lipstick: [
                            [...Array(11).keys()],
                            ['Нет', 'Средняя матовая', 'Средняя глянцевая', 'Матовая', 'Глянцевая', 'Насыщенная матовая', 'Насыщенная глянцевая', 'Стёртая матовая', 'Стёртая глянцевая', 'Размазанная', 'Гейша'],
                        ],
                    },
                    blush: {
                        static: ['chcreate-makeup-container', 'Румяна', 'chcreate_content.left_data.frames.appearance.makeup.blush.'],
                        blush: [
                            [...Array(8).keys()],
                            ['Нет', 'Полностью', 'По углам', 'Вокруг', 'Горизонтально', 'От глаз', 'Сердечки', 'Восьмидесятые'],
                        ],
                    },
                    makeup: {
                        static: ['chcreate-makeup-container', 'Макияж', 'chcreate_content.left_data.frames.appearance.makeup.makeup.'],
                        makeup: [
                            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 33, 35, 36, 37, 38, 39, 40, 41, 42],
                            ['Нет', 'Дымчатый чёрный', 'Бронзовый', 'Мягкий серый', 'Ретро', 'Естественный', 'Кошачьи глазки', 'Чола', 'Вамп', 'Вайнвудский гламур', 'Бабблгам', 'Аква дрим', 'Пин ап', 'Фиолетовая страсть', 'Дымчатый кошачий глаз', 'Тлеющий рубин', 'Поп-принцесса', 'Гайлайнер', 'Кровавые слёзы', 'Хэви метал', 'Скорбь', 'Принц тьмы', 'Легкая тушь', 'Гот', 'Панк', 'Потекшая тушь'],
                        ],
                    }
                }
            },
        },
    },
    right_data: {
        eyes: [
            ['right-content', 'Размер глаз', 'меньше', 'больше'],
        ],
        nose: [
            ['right-content', 'Ширина носа', 'уже', 'шире'],
            ['right-content', 'Высота носа', 'ниже', 'выше'],
            ['right-content', 'Длина кончика носа ', 'короче', 'длинее'],
            ['right-content', 'Глубина моста носа', 'внутрь', 'наружу'],
            ['right-content', 'Высота кончика носа', 'ниже', 'выше'],
            ['right-content', 'Поломаность носа', 'лево', 'право'],
        ],
        eyebrows: [
            ['right-content', 'Высота бровей', 'ниже', 'выше'],
            ['right-content', 'Глубина бровей', 'внутрь', 'наружу'],
        ],
        chin: [
            ['right-content', 'Высота подбородка', 'ниже', 'выше'],
            ['right-content', 'Глубина подбородка', 'внутрь', 'наружу'],
            ['right-content', 'Ширина подбородка', 'уже', 'шире'],
            ['right-content', 'Отступ подбородка ', 'выше', 'ниже'],
            ['right-content', 'Ширина челюсти', 'уже', 'шире'],
            ['right-content', 'Форма челюсти', 'меньше', 'больше'],
            ['right-content', 'Шея', 'уже', 'шире'],
        ],
        lips: [
            ['right-content', 'Толщина губ', 'уже', 'шире'],
            ['right-content', 'Высота скул', 'ниже', 'выше'],
            ['right-content', 'Ширина скул', 'уже', 'шире'],
            ['right-content', 'Глубина щеки', 'внутрь', 'наружу'],
        ],
    },
    color_box: {
        hair: {
            hair: ['chcreate-colors-container', 'left-content', 'Прическа (основной)', 'hair'],
            extra_hair: ['chcreate-colors-container', 'left-content', 'Прическа (акцент)', 'hair'],
            beard: ['chcreate-colors-container', 'left-content', 'Борода', 'hair'],
            chest: ['chcreate-colors-container', 'left-content', 'Волосы на груди', 'hair'],
        },
        makeup: {
            lipstick: ['chcreate-makeup-container', 'left-content', 'Цвет помады', 'makeup'],
            blush: ['chcreate-makeup-container', 'left-content', 'Цвет румян', 'makeup'],
        },
        eyes: ['chcreate-right-container', 'right-content', 'Цвет глаз', 'eyes'],
        eyebrows: ['chcreate-right-container', 'right-content', 'Брови', 'hair'],
        colors: {
            eyes: [
                '#1d5224', '#1d5224', '#535959', '#452209', '#2e190b', '#211005', '#c45b18', '#3d4545', '#576363', '#b514a2', '#bfba1b', '#2c26c9', '#000000', '#595961', '#c45b18'
            ],
            hair: [
                '#1c1f21', '#272a2c', '#312e2c', '#35261c', '#4b321f', '#5c3b24', '#6d4c35', '#6b503b', '#765c45', '#7f684e', '#99815d', '#a79369', '#af9c70', '#bba063', '#d6b97b', '#dac38e', '#9f7f59', '#845039', '#682b1f', '#61120c', '#640f0a', '#7c140f', '#a02e19', '#b64b28', '#a2502f', '#aa4e2b', '#626262', '#808080', '#aaaaaa', '#c5c5c5', '#463955', '#5a3f6b', '#763c76', '#ed74e3', '#eb4b93', '#f299bc', '#04959e', '#025f86', '#023974', '#3fa16a', '#217c61', '#185c55', '#b6c034', '#70a90b', '#439d13', '#dcb857', '#e5b103', '#e69102', '#f28831', '#fb8057', '#e28b58', '#e28b58', '#ce3120', '#ad0903', '#880302', '#1f1814', '#291f19', '#2e221b', '#37291e', '#2e2218', '#231b15', '#020202', '#706c66', '#9d7a50'
            ],
            makeup: [
                '#992532', '#c8395d', '#bd516c', '#b8637a', '#a6526b', '#b1434c', '#7f3133', '#a4645d', '#c18779', '#cba096', '#c6918f', '#ab6f63', '#b06050', '#a84c33', '#b47178', '#ca7f92', '#ed9cbe', '#e775a4', '#de3e81', '#b34c6e', '#712739', '#4f1f2a', '#aa222f', '#de2034', '#cf0813', '#e55470', '#dc3fb5', '#c227b2', '#a01ca9', '#6e1875', '#731465', '#56165c', '#6d1a9d', '#1b3771', '#1d4ea7', '#1e74bb', '#21a3ce', '#25c2d2', '#23cca5', '#27c07d', '#1b9c32', '#148604', '#70d041', '#c5ea34', '#e1e32f', '#ffdd26', '#fac026', '#f78a27', '#fe5910', '#be6e19', '#f7c97f', '#fbe5c0', '#f5f5f5', '#b3b4b3', '#919191', '#564e4e', '#180e0e', '#58969e', '#4d6f8c', '#1a2b55', '#a07e6b', '#826355', '#6d5346', '#3e2d27'
            ],
        },

    }
}

var chcreate_senders = {
    pic: {
        boy: ['Hair'],
        girl: ['Hair'],
        eyebrows: ['HeadOverlay', 1],
        beard: ['HeadOverlay', 2],
        chest: ['HeadOverlay', 10],
    },
    frame: {
        headdress: ['Clothes', 0],
        outerwear: ['Clothes', 1],
        underwear: ['Clothes', 2],
        footwear: ['Clothes', 3],
        father: ['Parents', 'father'],
        mother: ['Parents', 'mother'],
        fuzz: ['HairOverlay'],
        burns: ['HeadOverlay', 7],
        aging: ['HeadOverlay', 3],
        flaws: ['HeadOverlay', 0],
        moles: ['HeadOverlay', 9],
        makeup: ['HeadOverlay', 4],
        blush: ['HeadOverlay', 5],
        lipstick: ['HeadOverlay', 8],
    },
    slider: {
        eyes: [
            [11, true], 'FaceFeature'
        ],
        nose: [
            [0, false],
            [1, true],
            [2, true],
            [3, true],
            [4, true],
            [5, false], 'FaceFeature'
        ],
        eyebrows: [
            [6, true],
            [7, false], 'FaceFeature'
        ],
        chin: [
            [15, false],
            [16, false],
            [17, false],
            [18, false],
            [13, false],
            [14, false],
            [19, false], 'FaceFeature'
        ],
        lips: [
            [12, true],
            [8, true],
            [9, false],
            [10, true], 'FaceFeature'
        ],
        makeup: [
            [8, false],
            [5, false],
            [4, false], 'HeadOverlayOpacity'
        ]
    },
    color: {
        eyes: ['Eye'],
        hair: ['Hair', true],
        extra_hair: ['Hair', false],
        lipstick: ['HeadOverlay', 8],
        blush: ['HeadOverlay', 5],
        beard: ['HeadOverlay', 1],
        eyebrows: ['HeadOverlay', 2],
        chest: ['HeadOverlay', 10]
    }
}