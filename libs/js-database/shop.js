var shops = [ // defines all the shops
    [shop_svgs.shop.clothes, 'Магазин одежды<br>бюджетного сегмента'],
    [shop_svgs.shop.clothes, 'Магазин одежды<br>премиум сегмента'],
    [shop_svgs.shop.clothes, 'Магазин одежды<br>брендового сегмента'],
    [shop_svgs.shop.mask, 'Магазин<br>масок'],
    [shop_svgs.shop.jewelery, 'Ювелирный<br>салон'],
    [shop_svgs.shop.bag, 'Магазин<br>сумок и рюкзаков'],
    [shop_svgs.shop.auto, 'Автосалон'],
    [shop_svgs.shop.moto, 'Мотосалон'],
    [shop_svgs.shop.boat, 'Лодочный<br>салон'],
    [shop_svgs.shop.helic, 'Салон воздушного<br>транспорта'],
    [shop_svgs.shop.auto, 'Тюнинг-салон'],
];

var right_rect_data = [ // defines right rect states
    [shop_svgs.misc.changeable, 'Этот предмет может<br>менять состояние!'],
    [shop_svgs.misc.sett, null]
]

var clothesShop_rows = [2, 2, 1, 1, 2, 2]; // allowed elements in 1 row in clothes shop
var clothesShop_nav = [shop_svgs.nav.hat, shop_svgs.nav.glasses, shop_svgs.nav.top, shop_svgs.nav.bottom, shop_svgs.nav.neck, shop_svgs.nav.gloves, shop_svgs.nav.pants, shop_svgs.nav.shoe, shop_svgs.nav.watch, shop_svgs.nav.bracelet]; // navigaiton svgs in clothes shop
var jeweleryShop_rows = [1, 1, 1]; // allowed elements in 1 row in jewelery shop
var jeweleryShop_nav = [shop_svgs.nav.necklace, shop_svgs.nav.earrings, shop_svgs.nav.rings]; // navigaiton svgs in jewelery shop
var tuningShop_rows = [1, 2, 1, 1];
var tuningShop_nav = [shop_svgs.nav.tech, shop_svgs.nav.style, shop_svgs.nav.color, shop_svgs.nav.wheel, shop_svgs.nav.other]; 
var mototuning_rows = [1, 2, 2, 1];
var mototuning_nav = [shop_svgs.nav.tech, shop_svgs.nav.style, shop_svgs.nav.color, shop_svgs.nav.motowheel1, shop_svgs.nav.motowheel2, shop_svgs.nav.other]; 
/*
renderTemplate(true, 'shop')
switchTemplate(true, 'shop');
Shop.draw(0); //6
Shop.fillContainer(0, data1);
Shop.fillContainer(1, data2);
*/

var data1 = [
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

var data2 = [
    ['clear', 'Ничего', 0, 0, 0, false],
    [754, 'Рюкзак желтый', 1200, 100, [10, 7]],
    [124, 'Рюкзак черный', 800000, 100, [10, 7]],
    [168, 'Рюкзак белый', 55000, 100, [10, 7]],
    [768, 'Рюкзак фиолетовый', 5000, 100, [10, 7]],
    [63, 'Очки желтые', 3000, 100, [10, 7]],
    [69, 'Очки черные', 1000, 100, [10, 7]],
    [68, 'Очки белые', 30000, 130, [10, 7]],
]

var data3 = [
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