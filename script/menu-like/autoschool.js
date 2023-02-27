var AutoSchool = class AutoSchool {
    static cur_idx;
    static draw(idx, price) {
        var parent = document.getElementById('autoschool-0-container');
        this.showNavigation(0);
        parent.innerHTML += school_rules[idx];
        parent.innerHTML += /*html*/ `
            <div class="autoschool-menu">
                <div>
                    Начать тест (${prettyUSD(price)})
                    <button onclick="AutoSchool.payRequest(true)" style="width: 80px" class="red-button"><img src="libs/svgs/misc/cash.svg"></button>
                    <button onclick="AutoSchool.payRequest(false)" style="width: 80px" class="grey-button"><img src="libs/svgs/misc/bank.svg"></button>
                </div>
            </div>`;
        this.cur_idx = idx;
    }

    static selectOption(idx) {
        document.getElementById(`autoschool-${idx}`).click();
    }


    static showNavigation(idx) {
        var children = document.querySelector('.autoschool-options').children;
        Array.from(children).forEach(child => {
            child.style.display = 'none'
        });
        children[idx].style.display = 'unset';
        this.selectOption(idx);
    }

    static lastNav
    static navigate(opt) {
        if (this.lastNav == opt) return;
        if (this.lastNav) {
            this.lastNav.style = '';
            this.lastNav.parentElement.classList.remove('current');
            document.getElementById(`${this.lastNav.id}-container`).style.display = 'none';
        }
        opt.parentElement.classList.add('current');
        opt.style.color = 'white';
        document.getElementById(`${opt.id}-container`).style.display = 'block';
        this.lastNav = opt;
    }

    static questions;
    static drawTest(amount) {
        this.showNavigation(1);
        var parent = document.getElementById('autoschool-1-container').children[1];
        parent.innerHTML = '';
        parent.innerHTML = /*html*/ `
            <div class="autoschool-question-row"></div>
            <div id="autoschool-question-num"></div>
            <div id="autoschool-question-title"></div>
            <div id="autoschool-question-choices"></div>`;
        this.sortQuestions(amount);
        this.drawQuestionCircles(amount);

    }

    static right_answers;
    static choices;
    static cur_answers;
    static sortQuestions(amount) {
        this.questions = rnd(school_questions[this.cur_idx], amount);
        this.right_answers = [];
        this.choices = [];
        this.cur_answers = new Array(amount);

        this.questions.forEach(q => {
            this.right_answers.push(q.at(-1));
            this.choices.push(rnd(q.slice(1, q.length - 1)));
        })

        function rnd(arr, num) {
            return [...arr].sort(() => 0.5 - Math.random()).slice(0, num);
        }
    }


    static drawQuestionCircles(amount) {
        var parent = document.querySelector('.autoschool-question-row');
        for (var index = 0; index < amount; index++)
            parent.innerHTML += /*html*/ `<div class="question-circle" onclick="AutoSchool.showQuestion(this, ${index})">${index + 1}</div>`
        parent.firstChild.click();
    }

    static cur_q;
    static last_q;
    static showQuestion(elem, idx) {
        if (this.last_q == elem) return;
        if (this.last_q) {
            this.last_q.style = ``;
            this.last_q.classList.remove('question-answered-selected');
        }
        this.last_q = elem;
        elem.style = `animation: 5s ease 0s infinite normal none running selected`;
        if (elem.className.includes('answered')) elem.classList.add('question-answered-selected');

        document.querySelector('#autoschool-question-num').innerHTML = `Вопрос #${idx + 1}`;
        document.querySelector('#autoschool-question-title').innerHTML = this.questions[idx][0];
        this.fillChoices(this.choices[idx], idx);
        this.cur_q = idx;
    }

    static fillChoices(choices, idx) {
        var parent = document.querySelector('#autoschool-question-choices');
        parent.innerHTML = '';
        for (var index = 0; index < choices.length; index++)
            parent.innerHTML += /*html*/ `
                <div>
                    <div class="autoschool-choice-checkbox ${AutoSchool.cur_answers[idx] ? AutoSchool.cur_answers[idx].includes(choices[index][1]) ? 'autoschool-choice-checkbox-selected' : '' : ''}" onclick="AutoSchool.selectChoice(this, ${idx}, ${choices[index][1]})"><img src="libs/svgs/autoschool/check.svg"></div>
                    <div>${choices[index][0]}</div>
                </div>`
    }

    static selectChoice(checkbox, idx, id) {
        if (!this.cur_answers[idx]) this.cur_answers[idx] = [];
        if (checkbox.className.includes('selected')) {
            checkbox.classList.remove('autoschool-choice-checkbox-selected');
            this.cur_answers[idx].splice(this.cur_answers[idx].indexOf(id), 1);
            if (!this.cur_answers[idx].length) this.last_q.classList.remove('question-answered', 'question-answered-selected')
        } else {
            checkbox.classList.add('autoschool-choice-checkbox-selected');
            this.cur_answers[idx].push(id);
            this.last_q.classList.add('question-answered', 'question-answered-selected')
        }
        if (Array.from(document.querySelector('.autoschool-question-row').children).every(el => {
                return el.className.includes('answered')
            })) document.getElementById('autoschool-test').innerHTML = 'Завершить';
        else document.getElementById('autoschool-test').innerHTML = 'Далее';
    }

    static onbutton(action) {
        switch (action) {
            case 'Далее':
                var parent = document.querySelector('.autoschool-question-row');
                var start = this.cur_q + 1;
                var child = parent.children[start];
                if (!child) {
                    this.cur_q = -1;
                    start = 0;
                    child = parent.children[start];
                }


                if (child.className.includes('answered')) {
                    this.cur_q++;
                    this.onbutton('Далее');
                    return;
                }

                this.showQuestion(child, this.cur_q = start);
                break;
            case 'Завершить':
                var right_amount = 0;
                this.right_answers.forEach((right, idx) => {
                    var ans = this.cur_answers[idx].sort((a, b) => {
                        return a - b
                    });
                    if (JSON.stringify(ans) == JSON.stringify(right)) right_amount++;
                })
                mp.trigger('AutoSchool::FinishTest', right_amount, this.right_answers.length)
                break;
        }
    }

    static payRequest(pay_method) {
        mp.trigger('AutoSchool::StartText', pay_method);
        /*server-response*/
        // AutoSchool.drawTest(4);
    }
}