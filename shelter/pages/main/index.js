import { getPetsData } from '../../src/js/db.js';
import {hideMenu, showMenu } from '../../src/js/menu.js';
import { openPopup, closePopup} from '../../src/js/pet-card-popup.js';
import * as carousel from '../../src/js/carousel.js';

const burger = document.querySelector('.burger');
const navbar = document.querySelector('.aside-navbar');
const popup = document.querySelector('.pet-popup');
const slider = document.querySelector('.carousel__cards');

const pets = await getPetsData('/shelter/src/js/pets.json');

const openPopupHandler = (e) => {
  const target = e.target.closest('.card');
  if (!target || target.dataset.id == undefined) {
    return;
  }

  openPopup(target.dataset.id, pets);
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

slider.addEventListener('click', openPopupHandler);

popup.addEventListener('click', (e) => {
  const target = e.target;
  if (target.classList.contains('popup_open') ||
    target.classList.contains('popup__close-button')) {
    closePopup();
  }
});

carousel.buttonLeft.addEventListener('click', carousel.moveLeft);
carousel.buttonRight.addEventListener('click', carousel.moveRight);

carousel.init(pets);