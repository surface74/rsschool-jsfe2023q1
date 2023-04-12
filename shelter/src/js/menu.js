import { preventScroll, preventScrollByKeys } from './scroll-handler.js';

const burger = document.querySelector('.burger');
const navbar = document.querySelector('.aside-navbar');

export const hideMenu = () => {
  document.body.removeEventListener('keydown', preventScrollByKeys);
  navbar.removeEventListener('wheel', preventScroll);
  document.body.style.overflowY = '';
  burger.classList.remove('burger_light');
  burger.classList.remove('burger_activated');
  navbar.classList.remove('aside-navbar_showed');
}

export const showMenu = () => {
  window.addEventListener('resize', hideMenu, { once: true })
  document.body.addEventListener('keydown', preventScrollByKeys);
  navbar.addEventListener('wheel', preventScroll);
  document.body.style.overflowY = 'hidden';
  burger.classList.add('burger_light');
  burger.classList.add('burger_activated');
  navbar.classList.add('aside-navbar_showed');
}
