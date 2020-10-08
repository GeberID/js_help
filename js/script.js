"use strict";
document.addEventListener('DOMContentLoaded', () => {
    // Tabs
    const tabcontent = document.querySelectorAll('.tabcontent'),
        tabParent = document.querySelector('.tabheader__items'),
        tabs = tabParent.querySelectorAll('.tabheader__item ');

    function hide() {
        tabcontent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show');
        });
        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function show(i = 0) {
        tabcontent[i].classList.add('show');
        tabcontent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    hide();
    show();
    tabParent.addEventListener('click', (event) => {
        const itemTarget = event.target;
        if (itemTarget && itemTarget.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (itemTarget == item) {
                    hide();
                    show(i);
                }
            });
        }
    });

    // Timer

    const deadLine = '2020-12-31';

    function mathTime(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }



    setClock('.timer', deadLine);

    function plusZero(endtime) {
        if (endtime >= 0 && endtime < 10) {
            return `0${endtime}`;
        } else {
            return endtime;
        }
    }

    function setClock(selector, endtime) {
        let time = document.querySelector(selector),
            days = time.querySelector('#days'),
            hours = time.querySelector('#hours'),
            minutes = time.querySelector('#minutes'),
            seconds = time.querySelector('#seconds'),
            interval = setInterval(upClock, 1000);

        function upClock() {
            const t = mathTime(endtime);
            days.textContent = plusZero(t.days);
            hours.textContent = plusZero(t.hours);
            minutes.textContent = plusZero(t.minutes);
            seconds.textContent = plusZero(t.seconds);
            if (t.total <= 0) {
                clearInterval(interval);
            }
        }
        upClock();
    }

    //modal
    const btns = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal')
    //modalClose = document.querySelector('[data-close]');

    btns.forEach((item) => {
        item.addEventListener('click', (event) => {
            let target = event.target;
            openModal(modal);
            //modal.style ='display:block';
        });
    });
    /*modalClose.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.classList.contains('modal__close')) {
            //modal.style ='display:none';
            closeModal(modal);
        }
    });*/
    modal.addEventListener('click', (event) => {
        let target = event.target;
        if (target === modal || event.target.getAttribute('data-close') == '') {
            closeModal(modal);
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.code == "Escape" && modal.classList.contains('show')) {
            closeModal(modal);
        }
    });

    function openModal(obj) {
        obj.classList.add('show');
        obj.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal(obj) {
        obj.classList.add('hide');
        obj.classList.remove('show');
        document.body.style.overflow = 'scroll';
    }

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
            openModal(modal);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    const modalTimerId = setTimeout(openModal, 50000, modal);
    window.addEventListener('scroll', showModalByScroll);

    // классы
    class MenuCard {
        constructor(src, alt, title, descr, totalCost, parents, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.totalCost = totalCost;
            this.classes = classes;
            this.parents = document.querySelector(parents);
        }
        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach((className) => {
                    element.classList.add(className);
                });
            }

            element.innerHTML =
                `
            
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.totalCost}</span> грн/день</div>
                    </div>

            `;
            this.parents.append(element);
        }
    }
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        234,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        570,
        '.menu .container',
        'menu__item'
    ).render();
    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        430,
        '.menu .container'
    ).render();

    //forms
    const forms = document.querySelectorAll('form');
    forms.forEach((item) => {
        postForm(item);
    });
    const message = {
        success: "success",
        load: "img/form/spinner.svg",
        error: 'error'
    };

    function postForm(item) {
        item.addEventListener("submit", (element) => {
            element.preventDefault();

            const newMessage = document.createElement('img');
            newMessage.src = message.load;
            newMessage.style.cssText = `
            dislpay:block;
            margin: 0 auto;
            `;

            //item.append(newMessage);
            item.insertAdjacentElement('afterend', newMessage);
            const request = new XMLHttpRequest();
            request.open("POST", 'server.php');
            request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(item);
            let obj = {};

            formData.forEach((value, key) => {
                obj[key] = value;
            });

            let json = JSON.stringify(obj);
            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    item.reset();
                    showThanksModal(message.success);

                    newMessage.remove();
                } else {
                    showThanksModal(message.error);
                }
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialof = document.querySelector('.modal__dialog');
        prevModalDialof.classList.add('hide');
        openModal(modal);
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class='modal__content'>
                <div class='modal__close' data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialof.classList.add('show');
            prevModalDialof.classList.remove('hide');
            closeModal(modal);
        }, 5000);
    }


});
