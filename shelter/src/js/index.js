'use strict';

const preventedKeys = ['ArrowUp', 'ArrowDown', 'Tab'];

const burger = document.querySelector('.burger');
const navbar = document.querySelector('.navbar');

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
  navbar.classList.remove('navbar_menu-showed');
}

const showMenu = () => {
  window.addEventListener('resize', hideMenu, { once: true })
  document.body.addEventListener('keydown', preventScrollByKeys);
  navbar.addEventListener('wheel', preventScroll);
  burger.classList.add('burger_light');
  burger.classList.add('burger_activated');
  navbar.classList.add('navbar_menu-showed');
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
  if (target.classList.contains('navbar_menu-showed') ||
    target.classList.contains('navbar__link')) {
    hideMenu();
  }

  // if (target.classList.closest())
  // console.log(e.target);
});