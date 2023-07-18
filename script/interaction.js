var Interaction = class Interaction {
    static main_wheel;
    static sub_wheel;
    static selected_idx = 0;
    static main_labels;
    static extra_labels;
    static which;

    static w_data = {
        style: {
            slices: {
                default: {
                    'fill': '#222222',
                    'stroke': '#222222',
                    "fill-opacity": 1,
                    "stroke-width": 0.85,
                    'opacity': 0.95
                },
                    selected: {
                    'fill': '#C81212',
                    'stroke': '#C81212',
                    "fill-opacity": 1,
                    "stroke-width": 0.85,
                    'opacity': 0.95
                }
            },
            titles: {
                'fill': '#ffffff',
                'stroke': 'none',
            },
            icons: {
                width: 90,
                height: 90
            }
        },
        wheels: {
            w_0: {
                navAngle: 270,
                minRadiusPercent: 1 - 440 / 700,
                maxRadiusPercent: 1 - 220 / 700,
            },
            w_1: {
                navAngle: 261,
                minRadiusPercent: 1 - 220 / 700,
                maxRadiusPercent: 1,
            }
        }
    };

    static draw(which, main_labels, extra_labels) {
        this.which = which;
        this.main_labels = main_labels;
        this.extra_labels = extra_labels;
        this.w_data.wheels.w_1.navAngle = main_labels.length == 10 ? 261 : 281;
        this.drawWheel(false, 0, main_labels);
        this.setClicks(this.main_wheel, this.main_labels);
        this.setMouseOvers();
        this.closeHandlers();
    }

    static drawWheel(is_sub, idx, labels) {
        var wheel, wheelStyle = this.w_data.style,
            wheelData = this.w_data.wheels[`w_${idx}`];
        if (is_sub) {
            wheel = new wheelnav('sub-inter-wheel', this.main_wheel.raphael);
            this.sub_wheel = wheel;
        } else {
            wheel = new wheelnav('inter-wheel', null);
            this.main_wheel = wheel;
        }

        wheel.navAngle = wheelData.navAngle;
        wheel.clickModeRotate = false;
        wheel.slicePathFunction = slicePath().DonutSlice;
        wheel.slicePathCustom = slicePath().DonutSliceCustomization();

        wheel.slicePathCustom.minRadiusPercent = wheelData.minRadiusPercent;
        wheel.slicePathCustom.maxRadiusPercent = wheelData.maxRadiusPercent;

        wheel.sliceInitPathCustom = wheel.slicePathCustom;
        wheel.sliceHoverPathCustom = wheel.slicePathCustom;
        wheel.sliceSelectedPathCustom = wheel.slicePathCustom;

        wheel.slicePathAttr = wheelStyle.slices.default;
        wheel.sliceHoverAttr = wheelStyle.slices.selected;
        wheel.sliceSelectedAttr = wheelStyle.slices.selected;

        wheel.titleWidth = wheelStyle.icons.width;
        wheel.titleHeight = wheelStyle.icons.height;
        wheel.titleAttr = wheelStyle.titles;
        wheel.titleHoverAttr = wheelStyle.titles;
        wheel.titleSelectedAttr = wheelStyle.titles;

        wheel.initWheel(labels.map((l) => `imgsrc:./libs/svgs/interaction/${l}.svg`));
        if (this.which == 'char' && !is_sub) {
            wheel.navItems[0].sliceAngle = 360 / 8 * 2;
            wheel.navItems[0].titleWidth = 130;
            wheel.navItems.slice(1, 7).forEach(item => item.sliceAngle = 360 / 8)
            wheel.navItemsContinuous = true;
        }
        wheel.createWheel();
        wheel.navItems[0].selected = false;
        wheel.refreshWheel();
    }

    static removeWheel(id) {
        document.querySelectorAll(`[id*="${id}"]`).forEach(e => e.remove());
    }

    static setMouseOvers() {
        this.main_wheel.navItems.forEach(item => item.navSlice.mouseover(mo));

        function mo(event) {
            var idx = event.target.id.at(-1),
                label_vals = Interaction.extra_labels[idx];

            if (Interaction.selected_idx > Interaction.main_wheel.navItems.length) Interaction.selected_idx = 0;
            Interaction.main_wheel.navItems[Interaction.selected_idx].selected = false;
            Interaction.main_wheel.navItems[idx].selected = true;
            Interaction.selected_idx = idx;
            Interaction.main_wheel.refreshWheel();

            if (Interaction.sub_wheel) Interaction.removeWheel('sub-inter-wheel');
            if (!label_vals) return;

            Interaction.drawWheel(true, 1, label_vals);
            Interaction.setClicks(Interaction.sub_wheel, label_vals);

            Interaction.sub_wheel.navItems.forEach(i => i.navigateFunction = function () {
                setTimeout(() => {
                    i.selected = false;
                    Interaction.sub_wheel.refreshWheel()
                }, 0);
            })

            Interaction.sub_wheel.navItems.forEach(item => {
                if (item.title.includes('none')) item.navItem.hide()
            });
            Interaction.setMouseOuts();
        }
    }

    static setMouseOuts() {
        [this.main_wheel, this.sub_wheel].forEach(w => w.navItems.forEach(i => i.navSlice.mouseout(mout)))

        function mout(event) {
            logMouseMove(event);
            var els = document.elementsFromPoint(mousePos.x, mousePos.y);
            for (var index = 0; index < els.length; index++)
                if (els[index].id.includes('wheelnav')) return;

            if (Interaction.sub_wheel) Interaction.removeWheel('sub-inter-wheel');
            Interaction.unselect();
        }
    }

    static setClicks(wheel, ids) {
        wheel.navItems.forEach((i, idx) => i.navSlice.mousedown((event) => {
            if (event.which == 3) return;
            var id = ids[idx];
            if (!this.main_labels.includes(id)) {
                if (this.sub_wheel) this.removeWheel('sub-inter-wheel');
                this.unselect();
                mp.trigger(`Interaction::Select`, this.which, this.main_labels[this.selected_idx], id);
            } else mp.trigger(`Interaction::Select`, this.which, id);
        }));
    }

    static closeHandlers() {
        var el = document.querySelector('.close-interaction');
        el.addEventListener('mouseover', onmo);
        el.addEventListener('click', onclick);

        function onmo() {
            if (Interaction.sub_wheel) Interaction.removeWheel('sub-inter-wheel');
            Interaction.unselect();
        }

        function onclick() {
            mp.trigger('Interaction::Close')
        };
    }

    static unselect() {
        this.main_wheel.navItems[this.selected_idx].selected = false;
        this.main_wheel.refreshWheel();
    }

}

const IN_VEH_INTERACTION = {
    which: 'in_veh',
    main_labels: ['doors', 'seat', 'trunk', 'hood', 'music', 'passengers', 'park', 'vehdoc', 'job', 'gas'],
    extra_labels: [
        ['open', 'close', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
        ['none', 's_one', 's_two', 's_three', 's_four', 's_trunk', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
        ['none', 'none', 'none', 'look', 'open', 'close', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
        ['none', 'none', 'none', 'none', 'none', 'none', 'look', 'open', 'close', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'], null, null, null, null, null, null
    ]
};

const OUT_VEH_INTERACTION = {
    which: 'out_veh',
    main_labels: ['doors', 'seat', 'trunk', 'hood', 'push', 'other', 'park', 'vehdoc', 'job', 'gas'],
    extra_labels: [
        ['open', 'close', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
        ['none', 's_one', 's_two', 's_three', 's_four', 's_trunk', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
        ['none', 'none', 'none', 'look', 'open', 'close', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
        ['none', 'none', 'none', 'none', 'none', 'none', 'look', 'open', 'close', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'], null,
        ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'junkyard', 'remove_np', 'put_np', 'fix', 'none', 'none', 'none', 'none', 'none', 'none', 'none'], null, null, null, null
    ]
};

const CHAR_INTERACTION = {
    which: 'char',
    main_labels: ['interact', 'trade', 'property', 'money', 'heal', 'char_job', 'documents'],
    extra_labels: [
        ['carry', 'coin', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'handshake', 'kiss'],
        null,
        ['none', 'none', 'none', 'sell_house', 'sell_car', 'sell_buis', 'settle', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
        ['none', 'none', 'none', 'none', 'none', 'money_50', 'money_150', 'money_300', 'money_1000', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
        ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'pulse', 'bandage', 'cure', 'none', 'none', 'none', 'none', 'none'],
        ['take_license', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'fraction_invite', 'police_search', 'cuffs', 'police_escort', 'prison', 'fine'],
        ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'char_veh', 'medbook', 'resume', 'license', 'passport']
    ]
};
// Interaction.draw(...Array.from(Object.keys(CHAR_INTERACTION)).map(key => CHAR_INTERACTION[key]));
