'use strict';

const burger = document.querySelector('.burger');
const headerNavbar = document.querySelector('.navbar');

burger.addEventListener('click', () => {
  if (burger.classList.contains('burger_activated')) {
    hideMenu();
  } else {
    showMenu();
  }
});

function hideMenu() {
  burger.classList.remove('burger_activated');
  headerNavbar.classList.remove('header_menu-showed');
}

function showMenu() {
  burger.classList.add('burger_activated');
  headerNavbar.classList.add('header_menu-showed');
}