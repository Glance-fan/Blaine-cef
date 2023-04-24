var shops = [ // defines all the shops
    [shop_svgs.shop.clothes, 'Магазин одежды<br>бюджетного сегмента'],
    [shop_svgs.shop.clothes, 'Магазин одежды<br>премиум сегмента'],
    [shop_svgs.shop.clothes, 'Магазин одежды<br>брендового сегмента'],
    [shop_svgs.shop.mask, 'Магазин<br>масок'],
    [shop_svgs.shop.jewelery, 'Ювелирный<br>салон'],
    [shop_svgs.shop.bag, 'Магазин<br>сумок и рюкзаков'],
    [shop_svgs.shop.auto, 'Автосалон<br>бюджетного сегмента'],
    [shop_svgs.shop.auto, 'Автосалон<br>премиум сегмента'],
    [shop_svgs.shop.auto, 'Автосалон<br>брендового сегмента'],
    [shop_svgs.shop.moto, 'Мотосалон'],
    [shop_svgs.shop.boat, 'Лодочный<br>салон'],
    [shop_svgs.shop.helic, 'Салон воздушного<br>транспорта'],
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