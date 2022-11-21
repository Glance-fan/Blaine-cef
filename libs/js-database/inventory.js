var prop_container = document.getElementById('trade-property-container');
var pock_container = document.getElementById('trade-pockets-container');
var trade_ready = document.getElementById('trade-ready');
var trade_btn = document.getElementById('trade-btn');
var containers = ['inv-weapon-container', 'inv-pockets-container', 'crate-pockets-container', 'inv-status-container', 'inv-clothes-container', 'inv-accessories-container', 'trade-pockets-container', 'trade-give-container', 'trade-receive-container', 'bag-container', 'crate-crate-container'];

var row_lengths = [1, 5, 5, 3, [1, 2, 1, 1],
    [3, 1, 4, 2], 5, 5, 5
];
var columns_length = [4, 4, 4, 1, 1, 1, 4, 1, 1];

var slots = [
    [3, '-weapon'],
    [20, '-pockets'],
    [5, '-clothes'],
    [10, '-accessories'],
    [3, '-status'],
    [0, '-bag'],
    [0, '-crate'],
    [5, '-give'],
    [5, '-receive']
]

var item_filling = [
    [
        ['Шляпа', inventoryStandart.hat],
        ['Верх', inventoryStandart.top],
        ['Низ', inventoryStandart.under],
        ['Штаны', inventoryStandart.pants],
        ['Обувь', inventoryStandart.shoes]
    ],
    [
        ['Очки', inventoryStandart.glasses],
        ['Маска', inventoryStandart.mask],
        ['Серьги', inventoryStandart.earrings],
        ['Шея', inventoryStandart.neck],
        ['Часы', inventoryStandart.watch],
        ['Браслет', inventoryStandart.bracelet],
        ['Кольцо', inventoryStandart.ring],
        ['Перчатки', inventoryStandart.gloves],
        ['Сумка', inventoryStandart.bag],
        ['Кобура', inventoryStandart.holster]
    ],
    [
        ['Здоровье', inventoryStandart.health],
        ['Сытость', inventoryStandart.food],
        ['Настроение', inventoryStandart.mood]
    ],
    ['-clothes', '-accessories', '-status']
]

//Inventory
/*
Inventory.fillWeapon([
   ["Pistol", 'Assault Riffle', [[1, 'divide']], 100, true],
   ["AssaultRifle", 'Assault Riffle', , 1500, true],
    ["AssaultRifle", 'Assault Riffle', , 20, ]
]);
Inventory.fillVest(["BodyArmour", 'Броня FIB', [[1, 'divide']], 90]);
Inventory.fillPockets('inv', [
   , , , , , , , ,
   ["FishingRod", 'Свободные спортивные штаны и футболка с трусами', [[1, 'divide']], 100, ],
   ["FishingRod", 'Свободные спортивные штаны и футболка', [[1, 'divide']], 100, 0.5],
   , , ,
   ["Ammo5_56", 'Патроны 5.5666666666 5.666666', [[1, 'divide']], 100, ],
   ["FishingRod", 'Патроны 5.5666666666', [[1, 'divide']], 100, ],
   , , ,
   ["Ammo5_56", 'Свободные спортивные штаны', [[1, 'divide']], 100, 0.5],
   ["Ammo5_56", 'Патроны', [[1, 'divide']], 100, 0.5]
]);
Inventory.fillClothes([
   ["Ammo5_56", 'Свободные спортивные штаны и футболка с трусами', [[1, 'divide']]],
   ["Ammo5_56", 'Патроны 5.5666666666 5.666666', [[1, 'divide']]],
   ["Ammo5_56", 'Футболка обычная', [[1, 'divide']]],
   ["Ammo5_56", 'Джинсы Gucci', [[1, 'divide']]],
   ["Ammo5_56", 'Лоферы', [[1, 'divide']]]
]);
Inventory.fillAccessories([
   ["Ammo5_56", 'Свободные спортивные штаны и футболка с трусами', [[1, 'divide']]],
   ["Ammo5_56", 'Патроны 5.5666666666 5.666666', [[1, 'divide']]],
   ["Ammo5_56", 'Футболка обычная', [[1, 'divide']]],
   ["Ammo5_56", 'Джинсы Gucci', [[1, 'divide']]],
   ["Ammo5_56", 'Лоферы', [[1, 'divide']]], , , , , ["Ammo5_56", 'Свободные спортивные штаны и футболка с трусами', [[1, 'divide']]]
]);
Inventory.fillBag('inv', [
   ["Ammo5_56", 'Свободные спортивные штаны и футболка с трусами', [[1, 'divide']], 100, 0.5],
   ,
   ["Ammo5_56", 'Патроны 5.5666666666 5.666666', [[1, 'divide']], 100, 0.5],
   , ,
   ["Ammo5_56", 'Свободные спортивные штаны', [[1, 'divide']], 100, 0.5],
   ["Ammo5_56", 'Патроны', [[1, 'divide']], 100, 0.5]
]);
Inventory.fillAllStatus([[0, 10], [1, 15], [2, 20]]);
Inventory.fillBind([49, 50, , 52, 53, , 55, , , , 65, 66, , , 69, 70, 71, , , 72, 73, 74, 75]);
*/

//crates-Inventory
/*
Inventory.fillPockets('crate', [
   , , , , , , , ,
   ["FishingRod", 'Свободные спортивные штаны и футболка с трусами', [[1, 'divide']], 100, ],
   ["FishingRod", 'Свободные спортивные штаны и футболка', [[1, 'divide']], 100, 0.5],
   , , ,
   ["Ammo5_56", 'Патроны 5.5666666666 5.666666', [[1, 'divide']], 100, ],
   ["FishingRod", 'Патроны 5.5666666666', [[1, 'divide']], 100, ],
   , , ,
   ["Ammo5_56", 'Свободные спортивные штаны', [[1, 'divide']], 100, 0.5],
   ["Ammo5_56", 'Патроны', [[1, 'divide']], 100, 0.5]
]);
Inventory.fillBag('crate', [
   ["Ammo5_56", 'Свободные спортивные штаны и футболка с трусами', [[1, 'divide']], 100, 0.5],
   ,
   ["Ammo5_56", 'Патроны 5.5666666666 5.666666', [[1, 'divide']], 100, 0.5],
   , ,
   ["Ammo5_56", 'Свободные спортивные штаны', [[1, 'divide']], 100, 0.5],
   ["Ammo5_56", 'Патроны', [[1, 'divide']], 100, 0.5]
]);
Inventory.fillCrate('ящик', [
   , , , , , , , ,
   ["FishingRod", 'Свободные спортивные штаны и футболка с трусами', [[1, 'divide']], 100, ],
   ["FishingRod", 'Свободные спортивные штаны и футболка', [[1, 'divide']], 100, 0.5],
   , , ,
   ["Ammo5_56", 'Патроны 5.5666666666 5.666666', [[1, 'divide']], 100, ],
   ["FishingRod", 'Патроны 5.5666666666', [[1, 'divide']], 100, ],
   , , ,
   ["Ammo5_56", 'Свободные спортивные штаны', [[1, 'divide']], 100, 0.5],
   ["Ammo5_56", 'Патроны', [[1, 'divide']], 100, 0.5] ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
]);
*/

//trade
/*
Inventory.fillPockets('trade', [
   , , , , , , , ,
   ["FishingRod", 'Свободные спортивные штаны и футболка с трусами', [[1, 'divide']], 100, ],
   ["FishingRod", 'Свободные спортивные штаны и футболка', [[1, 'divide']], 100, 0.5],
   , , ,
   ["Ammo5_56", 'Патроны 5.5666666666 5.666666', [[1, 'divide']], 100, ],
   ["FishingRod", 'Патроны 5.5666666666', [[1, 'divide']], 100, ],
   , , ,
   ["Ammo5_56", 'Свободные спортивные штаны', [[1, 'divide']], 100, 0.5],
   ["Ammo5_56", 'Патроны', [[1, 'divide']], 100, 0.5]
]);
Inventory.fillTradeLProperties(['house', 'boat', 'car', 'flat', 'plane','house', 'boat', 'car', 'flat', 'plane','house', 'boat', 'car', 'flat', 'plane','house', 'boat', 'car', 'flat', 'plane','house', 'boat', 'car', 'flat', 'plane','house', 'boat', 'car', 'flat', 'plane'])
Inventory.fillTradeGive([["FishingRod", 'Свободные спортивные штаны и футболка', [[1, 'divide']], 100, 0.5], null, null,["Ammo5_56", 'Патроны 5.5666666666 5.666666', [[1, 'divide']], 100, ],["FishingRod", 'Патроны 5.5666666666', [[1, 'divide']], 100, ]])
Inventory.fillTradeReceive([["FishingRod", 'Свободные спортивные штаны и футболка', [[1, 'divide']], 100, 0.5], null, null,["Ammo5_56", 'Патроны 5.5666666666 5.666666', [[1, 'divide']], 100, ],["FishingRod", 'Патроны 5.5666666666', [[1, 'divide']], 100, ]])
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
updatePocketsSlot(2, null, ["Ammo5_56", 'Патроны', [[1, 'divide']], 100, 0.5])
updatePocketsSlot(2, null, ["Ammo5_56", 'Патроны', [[1, 'divide']], 1, 0.5])
updatePocketsSlot(2,null, null)

//this applies for pockets / bag in crate inventory
updatePocketsSlot(2, 'crate', ["Ammo5_56", 'Патроны', [[1, 'divide']], 100, 0.5])
updatePocketsSlot(2, 'crate', ["Ammo5_56", 'Патроны', [[1, 'divide']], 1, 0.5])
updatePocketsSlot(2,'crate', null)
*/