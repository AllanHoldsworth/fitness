import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import Swiper, {Navigation, Keyboard} from 'swiper';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {
  // Utils
  // ---------------------------------
  let toggles = document.querySelectorAll('.tabs__toggle');
  let tabs = document.querySelector('.tabs__head');
  let tabsBody = document.querySelector('.tabs__body');
  let tabsContent = document.querySelectorAll('.tabs__content');
  const anchor = document.querySelector('a[href="#sub"]');
  const video = document.querySelector('.gym__video');
  const playButton = document.querySelector('.gym__play-btn');
  const videoImg = document.querySelector('.gym__video-img');
  const slides = document.querySelectorAll('.slide');
  const carouselSlides = document.querySelectorAll('.carousel-slide');

  if (tabsBody) {
    tabsBody.classList.remove('tabs__body--nojs');
  }


  if (playButton) {
    playButton.classList.add('gym__play-btn--active');
    playButton.addEventListener('click', () => {
      videoImg.style.display = 'none';
      playButton.style.display = 'none';
      video.style.display = 'block';
      video.play();
    });
  }

  if (anchor) {
    anchor.addEventListener('click', (evt) => {
      evt.preventDefault();
      const blockID = anchor.getAttribute('href');
      document.querySelector('' + blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }

  if (tabs) {
    tabs.addEventListener('click', (evt) => {
      let currentToggle = evt.target;
      let tabId = currentToggle.getAttribute('data-tab');
      let currentTab = document.querySelector(tabId);
      if (!currentToggle.classList.contains('tabs__toggle-active')) {
        toggles.forEach((item) => {
          item.classList.remove('tabs__toggle--active');
        });
      }
      tabsContent.forEach((tab) => {
        tab.classList.remove('tabs__content--active');
      });
      currentToggle.classList.add('tabs__toggle--active');
      currentTab.classList.add('tabs__content--active');
    });
  }

  Swiper.use([Navigation]);
  Swiper.use([Keyboard]);

  const swiper = new Swiper('.slider', {
    keyboard: {
      enabled: true,
    },
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
        spaceBetween: 30,
        initialSlide: 0,
      },

      1250: {
        slidesPerView: '4',
        spaceBetween: 40,
        initialSlide: 0,
      },
    },

    navigation: {
      nextEl: '.slider-button-next',
      prevEl: '.slider-button-prev',
    },

    on: {
      init() {
        const duplicates = document.querySelectorAll('.swiper-slide-duplicate');
        duplicates.forEach((duplicate) => {
          duplicate.setAttribute('tabindex', '-1');
        });
      },
    },
  });

  slides.forEach((slide, i) => {
    slide.onfocus = function () {
      if (slides.length - i >= slides.length / 2) {
        swiper.slideTo(i + 4);
      }
    };
  });


  const carousel = new Swiper('.carousel', {
    direction: 'horizontal',
    loop: false,
    slidesPerView: '1',
    spaceBetween: 0,
    navigation: {
      nextEl: '.carousel-button-next',
      prevEl: '.carousel-button-prev',
    },
  });

  carouselSlides.forEach((slide, i) => {
    slide.onfocus = function () {
      swiper.slideTo(i);
    };
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
