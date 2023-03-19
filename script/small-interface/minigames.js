var MG = class MiniGames {
    static OP = class OrangePicking {
        static vw;
        static vh;

        static width = 120;
        static height = 125;

        static oranges = []

        static draw(amount) {
            document.querySelector('.orange-tree').innerHTML = '';
            this.oranges = [];
            this.vw = document.querySelector('.orange-tree').clientWidth;
            this.vh = document.querySelector('.orange-tree').clientHeight;
            this.basket_amount = 0;
            for (var index = 0; index < amount; index++) {
                var orange = this.createOrange(index);
                this.oranges.push(orange);
                this.placeOrange(orange);
            }
        }

        static createOrange(index) {
            var elem = document.createElement('div');
            this.addMovement(elem);
            elem.innerHTML = `<img src="libs/svgs/minigames/orange.svg">`
            document.querySelector('.orange-tree').appendChild(elem);
            elem.className = 'orange-elem';
            elem.style.height = this.height + "px";
            elem.style.width = this.width + "px";


            return {
                elem: elem,
                placed: false,
                width: this.width,
                height: this.height,
                left: 0,
                top: 0,
                right: this.width,
                bottom: this.height
            };
        }

        static createBasketOrange() {
            var parent = document.querySelector('#basket-container'),
                elem = document.createElement('div');
            elem.innerHTML = `<img src="libs/svgs/minigames/orange.svg">`
            elem.className = 'orange';
            parent.appendChild(elem);

            var arr = Array.from(parent.children);
            var need_width = parseInt(parent.offsetWidth / arr.length);
            arr.forEach((elem, idx) => {
                elem.style.left = `${idx * need_width}px`;
            })
        }



        static placeOrange(orange) {
            orange.placed = true;
            orange.left = (Math.random() * (this.vw - orange.width)).toFixed();
            orange.top = (Math.random() * (this.vh - orange.height)).toFixed();
            orange.right = parseInt(orange.left) + parseInt(orange.width);
            orange.bottom = parseInt(orange.top) + parseInt(orange.height);

            for (var index = 0; index < this.oranges.length; index++) {
                var o = this.oranges[index];

                if (o === orange || !o.placed) {
                    continue;
                }

                if (this.intersects(orange, o)) {
                    orange.placed = false;
                    break;
                }
            }

            if (orange.placed) {
                this.showOrange(orange);
            } else {
                this.placeOrange(orange);
            }
        }

        static showOrange(orange) {
            orange.elem.style.left = orange.left + 'px';
            orange.elem.style.top = orange.top + 'px';
        }

        static intersects(a, b) {
            return !(b.left > a.right ||
                b.right < a.left ||
                b.top > a.bottom ||
                b.bottom < a.top);
        }

        static dragItem;
        static basket_amount;
        static addMovement(item) {
            item.onmousedown = function (e) {
                MG.OP.dragItem = item.cloneNode(true);

                var stats = item.getBoundingClientRect();
                var shiftX = stats.width / 2;
                var shiftY = stats.height / 2;
                item.style.position = 'absolute';
                item.style.opacity = '0.7';
                item.style.zIndex = 1000;
                document.body.appendChild(item);

                moveAt(e);

                function moveAt(e) {
                    item.style.left = e.pageX - shiftX + 'px';
                    item.style.top = e.pageY - shiftY + 'px';
                }

                document.onmousemove = function (e) {
                    moveAt(e);
                };


                document.onmouseup = function (e) {
                    var in_basket = false;

                    var elementsUnder = document.elementsFromPoint(e.clientX, e.clientY);
                    basket_check: for (var index = 0; index < elementsUnder.length; index++) {
                        if (elementsUnder[index].className.includes('basket')) {
                            destroyDragable(item, false);
                            MG.OP.createBasketOrange();
                            in_basket = true;
                            MG.OP.basket_amount++;
                            break basket_check;
                        }
                    }

                    if (!in_basket) destroyDragable(item, true);
                    document.onmousemove = null;
                    document.onmouseup = null;
                    if (MG.OP.basket_amount == MG.OP.oranges.length) MG.OP.collectedRequest();
                };
            }

            item.ondragstart = function () {
                return false;
            };

            function destroyDragable(item, redraw) {
                if (redraw) {
                    document.querySelector('.orange-tree').appendChild(MG.OP.dragItem);
                    MG.OP.addMovement(MG.OP.dragItem);
                }
                item.remove();
            }
        }


        static collectedRequest() {
            mp.trigger('MiniGames::OrangesCollected');
        }
    }

    static LP = class LockPicking {
        static lock;
        static zoom = 1;
        static cur_angle = 360;
        static max_deviation = 5;
        static need_deg;
        static lockpick_dur;

        static draw(durability, deg) {
            this.lock = document.getElementById('lock-picking-wrapper');
            document.getElementById('lock-elem').style = '';
            this.need_deg = deg || Math.floor(Math.random() * (450 - 90 + 1) + 90);
            this.lockpick_dur = durability || 20;
            document.onmousemove = this.rotatePin;
            document.onmousedown = this.tryUnlock;
        }

        static rotatePin() {
            var deg = MG.LP.angle(
                (MG.LP.lock.offsetLeft + MG.LP.lock.offsetWidth / 2) * MG.LP.zoom,
                (MG.LP.lock.offsetTop + MG.LP.lock.offsetHeight / 2) * MG.LP.zoom,
                mousePos.x, mousePos.y
            )
            MG.LP.cur_angle = deg + 90;
            document.getElementById('lockpick-elem').style.setProperty('transform', `rotate(${deg + 90}deg)`)
        }

        static async tryUnlock() {
            document.onmousemove = null;
            var lock = document.getElementById('lock-elem');

            var mirrored_angle = MG.LP.need_deg > MG.LP.cur_angle ? 2 * MG.LP.need_deg - MG.LP.cur_angle : MG.LP.cur_angle;
            var rotate_angle = 90 * MG.LP.need_deg / mirrored_angle;
            rotate_angle = rotate_angle > 90 * MG.LP.need_deg / (MG.LP.need_deg + MG.LP.max_deviation) ? 90 : rotate_angle;
            if (rotate_angle != 90) {
                await addShake( /*css*/
                    `@keyframes shake-pin {
                        0% { transform: rotate(${MG.LP.cur_angle}deg); }
                        85% { transform: rotate(${MG.LP.cur_angle - 2}deg); }
                        95% { transform: rotate(${MG.LP.cur_angle + 2}deg); }
                        100% { transform: rotate((${MG.LP.cur_angle}deg); }
                    }`
                );
                var decrease_dur = setInterval(() => {
                    MG.LP.lockpick_dur--;
                    if (MG.LP.lockpick_dur < 1) MG.LP.lockRequest(false, MG.LP.need_deg);
                }, 500);
                var shake_anim = setTimeout(() => {
                    document.getElementById('lockpick-elem').style.animation = `.2s ease 0s infinite normal none running shake-pin`;
                }, 500);
            }
            lock.style.setProperty('transform', `rotate(${rotate_angle}deg)`)

            var unlock_time = setTimeout(() => {
                if (MG.LP.need_deg + MG.LP.max_deviation > MG.LP.cur_angle && MG.LP.need_deg - MG.LP.max_deviation < MG.LP.cur_angle) MG.LP.lockRequest(true);
                document.onmouseup = null;
                document.onmousedown = null;
            }, 1500);

            document.onmouseup = () => {
                lock.style.removeProperty('transform')
                document.getElementById('lockpick-elem').style.animation = ``;
                clearTimeout(shake_anim);
                clearInterval(decrease_dur);
                clearTimeout(unlock_time);
                document.onmousemove = MG.LP.rotatePin;
                document.getElementById('shake-pin').remove();
            }

            async function addShake(css) {
                var elem = document.createElement('style');
                elem.id = 'shake-pin';
                document.head.appendChild(elem).innerHTML = css;
            }
        }

        static angle(cx, cy, ex, ey) {
            var theta = Math.atan2(ey - cy, ex - cx) * 180 / Math.PI;
            if (theta < 0) theta = 360 + theta;
            return theta;
        }
        static lockRequest() {
            mp.trigger('MiniGames::LockPick', ...arguments)
        }
    }
}