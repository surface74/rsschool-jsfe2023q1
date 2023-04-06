'use strict';

const burger = document.querySelector('.burger');
const headerNavbar = document.querySelector('.header__navbar');

burger.addEventListener('click', toggleMenu);

function toggleMenu(e) {
  const menuSwitch = e.target;
  console.dir(menuSwitch);

  if (menuSwitch.classList.contains('burger_activated')) {
    hideMenu();
  } else {
    showMenu();
  }
}

function hideMenu() {
  menuSwitch.classList.remove('burger_activated');
  headerNavbar.classList.remove('header_menu-showed');
}

function showMenu() {
  menuSwitch.classList.add('burger_activated');
  headerNavbar.classList.add('header_menu-showed');
}