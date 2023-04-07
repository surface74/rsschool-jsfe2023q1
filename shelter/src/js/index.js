'use strict';

const preventedKeys = ['ArrowUp', 'ArrowDown', 'Tab'];

const burger = document.querySelector('.burger');
const navbar = document.querySelector('.aside-navbar');

const preventScroll = (e) => { e.preventDefault(); }

const preventScrollByKeys = (e) => {
  if (preventedKeys.includes(e.key)) {
    e.preventDefault();
  };
}

const hideMenu = () => {
  document.body.removeEventListener('keydown', preventScrollByKeys);
  navbar.removeEventListener('wheel', preventScroll);
  burger.classList.remove('burger_light');
  burger.classList.remove('burger_activated');
  navbar.classList.remove('aside-navbar_showed');
}

const showMenu = () => {
  window.addEventListener('resize', hideMenu, { once: true })
  document.body.addEventListener('keydown', preventScrollByKeys);
  navbar.addEventListener('wheel', preventScroll);
  burger.classList.add('burger_light');
  burger.classList.add('burger_activated');
  navbar.classList.add('aside-navbar_showed');
}


burger.addEventListener('click', () => {
  if (burger.classList.contains('burger_activated')) {
    hideMenu();
  } else {
    showMenu();
  }
});

navbar.addEventListener('click', (e) => {
  const target = e.target;
  if (target.classList.contains('aside-navbar_showed') ||
    target.classList.contains('navbar__link')) {
    hideMenu();
  }

});