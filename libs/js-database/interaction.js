var char_cur = {
    'interact': 0,
    'i-carry': 1,
    'i-coin': 2,
    'i-handshake': 3,
    'i-kiss': 4,
    'intertrade': 5,
    'property': 6,
    'p-sellhouse': 7,
    'p-sellcar': 8,
    'p-sellbuis': 9,
    'p-settle': 10,
    'money': 11,
    'm-50': 12,
    'm-150': 13,
    'm-300': 14,
    'm-1000': 15,
    'heal': 16,
    'h-pulse': 17,
    'h-bandage': 18,
    'h-cure': 19,
    'charjob': 20,
    'documents': 21,
    'd-vehdoc': 22,
    'd-medbook': 23,
    'd-license': 24,
    'd-passport': 25,
    'close-menu': 26
}

var out_veh_cur = {
    'doors': 0,
    'd-open': 1,
    'd-close': 2,
    'seat': 3,
    's-one': 4,
    's-two': 5,
    's-three': 6,
    's-four': 7,
    's-trunk': 8,
    'trunk': 9,
    't-look': 10,
    't-open': 11,
    't-close': 12,
    'hood': 13,
    'h-look': 14,
    'h-open': 15,
    'h-close': 16,
    'push': 17,
    'other': 18,
    'o-fix': 19,
    'o-putnp': 20,
    'o-remnp': 21,
    'o-junkyard': 22,
    'park': 23,
    'vehdoc': 24,
    'job': 25,
    'gas': 26,
    'close-menu': 27
}

var in_veh_cur = {
    'doors': 0,
    'd-open': 1,
    'd-close': 2,
    'seat': 3,
    's-one': 4,
    's-two': 5,
    's-three': 6,
    's-four': 7,
    's-trunk': 8,
    'trunk': 9,
    't-look': 10,
    't-open': 11,
    't-close': 12,
    'hood': 13,
    'h-look': 14,
    'h-open': 15,
    'h-close': 16,
    'music': 17,
    'passengers': 18,
    'park': 19,
    'vehdoc': 20,
    'job': 21,
    'gas': 22,
    'close-menu': 23
};

var chart_values = {
    '1' :[
        { value: .1 }, { value: .1 }, { value: .1 }, { value: .1 }, { value: .1 },
        { value: .1 }, { value: .1 }, { value: .1 }, { value: .1 }, { value: .1 },
      ],
    '05': [
        { value: .05 }, { value: .05 }, { value: .05 }, { value: .05 }, { value: .05 },
        { value: .05 }, { value: .05 }, { value: .05 }, { value: .05 }, { value: .05 },
        { value: .05 }, { value: .05 }, { value: .05 }, { value: .05 }, { value: .05 },
        { value: .05 }, { value: .05 }, { value: .05 }, { value: .05 }, { value: .05 },
      ],
      '125': [
        { value: .125 }, { value: .125 }, { value: .125 }, { value: .125 },
        { value: .125 }, { value: .125 }, { value: .125 }, { value: .125 },
      ],
      '0625': [
        { value: .0625 }, { value: .0625 }, { value: .0625 }, { value: .0625 },
        { value: .0625 }, { value: .0625 }, { value: .0625 }, { value: .0625 },
        { value: .0625 }, { value: .0625 }, { value: .0625 }, { value: .0625 },
        { value: .0625 }, { value: .0625 }, { value: .0625 }, { value: .0625 },
      ]
}

var inter_main = {
    char_main: [
        'interact1', 'intertrade', 'property', 'money', 'heal', 'charjob', 'documents', 'interact2'
    ],
    out_veh_main: [
        'hood', 'push', 'other', 'park', 'vehdoc', 'job', 'gas', 'doors', 'seat', 'trunk'
    ],
    in_veh_main: [
        'hood', 'music', 'passengers', 'park', 'vehdoc', 'job', 'gas', 'doors', 'seat', 'trunk'
    ]
}

var inter_sections = {
    char_sections: [
        'i-carry', 'i-coin', 'none', 'p-sellhouse', 'p-sellcar', 'p-sellbuis', 'p-settle', 'none', 'h-pulse', 'h-bandage', 'h-cure', 'none', 'none', 'none', 'i-handshake', 'i-kiss', 'none', 'none', 'none', 'none'
    ],
    out_veh_sections: [
        'h-look', 'h-open', 'h-close', 'o-junkyard', 'o-remnp', 'o-putnp', 'o-fix', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'd-open', 'd-close', 'none', 't-look', 't-open', 't-close'
    ],
    in_veh_sections: [
        'h-look', 'h-open', 'h-close', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'd-open', 'd-close', 'none', 't-look', 't-open', 't-close'
    ]
}

var inter_extra_sections = {
    char_sections: [
        'none', 'none', 'none', 'none', 'none', 'm-50', 'm-150', 'm-300', 'm-1000', 'none', 'none', 'd-vehdoc', 'd-medbook', 'd-license', 'd-passport', 'none', 'none', 'none', 'none', 'none'
    ],
    out_veh_sections: [
        'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 's-one', 's-two', 's-three', 's-four', 's-trunk'
    ],
    in_veh_sections: [
        'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 's-one', 's-two', 's-three', 's-four', 's-trunk'
    ]
}

var inter_clicks = {
    char_clicks: [
        'ci-', 'interact1', 'i-carry', 'i-coin', 'intertrade', 'property', 'p-sellhouse', 'p-sellcar', 'p-sellbuis', 'p-settle', 'money', 'm-50', 'm-150', 'm-300', 'm-1000', 'heal', 'h-pulse', 'h-bandage', 'h-cure', 'charjob', 'documents', 'd-vehdoc', 'd-medbook', 'd-license', 'd-passport', 'interact2', 'i-handshake', 'i-kiss'
    ],
    char_mo: [
        'ci-', ['interact', 'interact1'], 'i-carry', 'i-coin', 'intertrade', 'property', 'p-sellhouse', 'p-sellcar', 'p-sellbuis', 'p-settle', 'money', 'm-50', 'm-150', 'm-300', 'm-1000', 'heal', 'h-pulse', 'h-bandage', 'h-cure', 'charjob', 'documents', 'd-vehdoc', 'd-medbook', 'd-license', 'd-passport', 'i-handshake', 'i-kiss'
    ],
    out_veh_clicks: [
        'ov-', 'hood', 'push', 'other', 'o-fix', 'o-putnp', 'o-remnp', 'o-junkyard', 'park', 'vehdoc', 'job', 'gas', 'doors', 'seat', 'trunk', 'h-look', 'h-open', 'h-close', 'd-open', 'd-close', 't-look', 't-open', 't-close', 's-one', 's-two', 's-three', 's-four', 's-trunk'
    ],
    in_veh_clicks: [
        'iv-', 'hood', 'music', 'passengers', 'park', 'vehdoc', 'job', 'gas', 'doors', 'seat', 'trunk', 'h-look', 'h-open', 'h-close', 'd-open', 'd-close', 't-look', 't-open', 't-close', 's-one', 's-two', 's-three', 's-four', 's-trunk'
    ]
}

var inter_svgs = {
    char_svgs: [
        [interact_svgs.interact, interact_svgs.handshake, interact_svgs.kiss, interact_svgs.carry, interact_svgs.coin], interact_svgs.trade,
        [interact_svgs.property, interact_svgs.sellhouse, interact_svgs.sellcar, interact_svgs.sellbuis, interact_svgs.settle],
        [interact_svgs.money, interact_svgs.m_50, interact_svgs.m_150, interact_svgs.m_300, interact_svgs.m_1000],
        [interact_svgs.heal, interact_svgs.pulse, interact_svgs.bandage, interact_svgs.cure], interact_svgs.job,
        [interact_svgs.documents, interact_svgs.vehdoc_2, interact_svgs.medbook, interact_svgs.license, interact_svgs.passport]
    ],
    out_veh_svgs: [
        [interact_svgs.doors, interact_svgs.open, interact_svgs.close],
        [interact_svgs.seat, interact_svgs.seat_one, interact_svgs.seat_two, interact_svgs.seat_three, interact_svgs.seat_four, interact_svgs.seat_trunk],
        [interact_svgs.trunk, interact_svgs.look, interact_svgs.open, interact_svgs.close],
        [interact_svgs.hood, interact_svgs.look, interact_svgs.open, interact_svgs.close], interact_svgs.push,
        [interact_svgs.other, interact_svgs.fix, interact_svgs.putnp, interact_svgs.remnp, interact_svgs.junkyard],
        interact_svgs.park, interact_svgs.vehdoc, interact_svgs.job, interact_svgs.gas
    ],
    in_veh_svgs: [
        [interact_svgs.doors, interact_svgs.open, interact_svgs.close],
        [interact_svgs.seat, interact_svgs.seat_one, interact_svgs.seat_two, interact_svgs.seat_three, interact_svgs.seat_four, interact_svgs.seat_trunk],
        [interact_svgs.trunk, interact_svgs.look, interact_svgs.open, interact_svgs.close],
        [interact_svgs.hood, interact_svgs.look, interact_svgs.open, interact_svgs.close],
        interact_svgs.music, interact_svgs.passengers, interact_svgs.park, interact_svgs.vehdoc, interact_svgs.job, interact_svgs.gas
    ]
}

var inter_strings = {
    char_strings: [
        ['interact', 'ci-interact-section', 'i-handshake', 'i-kiss', 'i-carry', 'i-coin'], 'intertrade',
        ['property', 'ci-property-section', 'p-sellhouse', 'p-sellcar', 'p-sellbuis', 'p-settle'],
        ['money', 'ci-money-section', 'm-50', 'm-150', 'm-300', 'm-1000'],
        ['heal', 'ci-heal-section', 'h-pulse', 'h-bandage', 'h-cure'], 'charjob',
        ['documents', 'ci-documents-section', 'd-vehdoc', 'd-medbook', 'd-license', 'd-passport']
    ],
    out_veh_strings: [
        ['doors', 'ov-doors-section', 'd-open', 'd-close'],
        ['seat', 'ov-seat-section', 's-one', 's-two', 's-three', 's-four', 's-trunk'],
        ['trunk', 'ov-trunk-section', 't-look', 't-open', 't-close'],
        ['hood', 'ov-hood-section', 'h-look', 'h-open', 'h-close'], 'push',
        ['other', 'ov-other-section', 'o-fix', 'o-putnp', 'o-remnp', 'o-junkyard'],
        'park', 'vehdoc', 'job', 'gas'
    ],
    in_veh_strings: [
        ['doors', 'iv-doors-section', 'd-open', 'd-close'],
        ['seat', 'iv-seat-section', 's-one', 's-two', 's-three', 's-four', 's-trunk'],
        ['trunk', 'iv-trunk-section', 't-look', 't-open', 't-close'],
        ['hood', 'iv-hood-section', 'h-look', 'h-open', 'h-close'],
        'music', 'passengers', 'park', 'vehdoc', 'job', 'gas'
    ]
}

var inter_circles = {
    char_circles: [
        ['support-circle', 'documents-circle', 'money-circle', 'interact-circle', 'property-circle', 'heal-circle', 'close-circle'],
        [interact_circles.support, interact_circles.documents, interact_circles.money, interact_circles.interact, interact_circles.property, interact_circles.heal, interact_circles.close]
    ],

    out_veh_circles: [
        ['support-circle', 'doors-circle', 'seat-circle', 'trunk-circle', 'hood-circle', 'other-circle', 'close-circle'],
        [interact_circles.support, interact_circles.doors, interact_circles.seat, interact_circles.trunk, interact_circles.hood, interact_circles.other, interact_circles.close]
    ],

    in_veh_circles: [
        ['support-circle', 'doors-circle', 'seat-circle', 'trunk-circle', 'hood-circle', 'close-circle'],
        [interact_circles.support, interact_circles.doors, interact_circles.seat, interact_circles.trunk, interact_circles.hood, interact_circles.close]
    ]
};

function getInterArgs(index) {
    switch (index) {
        case 0:
            return ['character-interaction', inter_circles['char_circles'], inter_strings['char_strings'], inter_svgs['char_svgs'], document.getElementById('char-text-pics'), inter_clicks['char_clicks'], `sendCharAction(char_cur['`, 'onCharMOnone()', 'onCharMO', inter_clicks['char_mo']];
        case 1:
            return ['out-veh-interaction', inter_circles['out_veh_circles'], inter_strings['out_veh_strings'], inter_svgs['out_veh_svgs'], document.getElementById('ov-text-pics'), inter_clicks['out_veh_clicks'], `sendOVAction(out_veh_cur['`, 'onOVMOnone()', 'onOVMO'];
        case 2:
            return ['in-veh-interaction', inter_circles['in_veh_circles'], inter_strings['in_veh_strings'], inter_svgs['in_veh_svgs'], document.getElementById('iv-text-pics'), inter_clicks['in_veh_clicks'], `sendIVAction(in_veh_cur['`, 'onIVMOnone()', 'onIVMO'];
    }
}