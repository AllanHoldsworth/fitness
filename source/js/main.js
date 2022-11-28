/* eslint-disable max-nested-callbacks */
import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import Swiper, {Navigation} from 'swiper';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------
  let toggles = document.querySelectorAll('.tabs__toggle');
  let tabs = document.querySelectorAll('.tabs__content');

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      let currentToggle = toggle;
      let tabId = currentToggle.getAttribute('data-tab');
      let currentTab = document.querySelector(tabId);

      if (!currentToggle.classList.contains('tabs__toggle--active')) {
        toggles.forEach((item) => {
          item.classList.remove('tabs__toggle--active');
        });

        tabs.forEach((tab) => {
          tab.classList.remove('tabs__content--active');
        });

        currentToggle.classList.add('tabs__toggle--active');
        currentTab.classList.add('tabs__content--active');
      }
    });
  });

  Swiper.use([Navigation]);

  const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: '4',
    spaceBetween: 40,

    breakpoints: {
      320: {
        slidesPerView: '1',
        spaceBetween: 0,
        initialSlide: 2,
      },

      766: {
        slidesPerView: '2',
        spaceBetween: 30,
        initialSlide: 2,
      },

      1199: {
        slidesPerView: '4',
        spaceBetween: 40,
        initialSlide: 0,
      },
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
