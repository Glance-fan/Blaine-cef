var prop_container = document.getElementById('trade-property-container');
var pock_container = document.getElementById('trade-pockets-container');
var trade_ready = document.getElementById('trade-ready');
var trade_btn = document.getElementById('trade-btn');
var containers = ['inv-weapon-container', 'inv-pockets-container', 'crate-pockets-container', 'inv-status-container', 'inv-clothes-container', 'inv-accessories-container', 'trade-pockets-container', 'trade-give-container', 'trade-receive-container', 'wb-pockets-container', 'wb-craft-container', 'wb-result-container', 'wb-tool-container', 'bag-container', 'crate-crate-container'];

var row_lengths = [1, 5, 5, 3, [1, 2, 1, 1],
   [3, 1, 4, 2], 5, 5, 5, 5, 5, 1, 5
];
var columns_length = [4, 4, 4, 1, 1, 1, 4, 1, 1, 4, 1, 1, 1];

var slots = [
   [3, '-weapon'],
   [20, '-pockets'],
   [5, '-clothes'],
   [10, '-accessories'],
   [3, '-status'],
   [0, '-bag'],
   [0, '-crate'],
   [5, '-give'],
   [5, '-receive'],
   [5, '-craft'],
   [1, '-result'],
   [5, '-tool']
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