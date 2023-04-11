'use strict';

const pagWrapper = document.querySelector('.pagination__cards');
const pagButtonFastLeft = document.querySelector('.button-paginator_fast-left');
const pagButtonLeft = document.querySelector('.button-paginator_left');
const pagButtonRight = document.querySelector('.button-paginator_right');
const pagButtonFastRight = document.querySelector('.button-paginator_fast-right');
const pagButtonPage = document.querySelector('.button-paginator_page');

const PETS_AMOUNT = pets.length;
const cardsPull = [...shuffle(PETS_AMOUNT), ...shuffle(PETS_AMOUNT),
...shuffle(PETS_AMOUNT), ...shuffle(PETS_AMOUNT),
...shuffle(PETS_AMOUNT), ...shuffle(PETS_AMOUNT)];
let currentPage = 0;
let currentCardsOnPage;
;

const getCardsPerPage = () => {
  const width = document.body.clientWidth;
  if (width > 1200) {
    return 8;
  } else if (width > 740) {
    return 6;
  }
  return 3;
}

const getTotalPages = () => Math.ceil(cardsPull.length / getCardsPerPage());


const fillCard = (card, position) => {
  const index = cardsPull[position];
  card.dataset.id = pets[index].id;
  card.querySelector('.card__image').setAttribute('src', pets[index].img);
  card.querySelector('.card__image').setAttribute('alt', `${pets[index].name}'s photo`);
  card.querySelector('.card__title').innerHTML = pets[index].name;
}

const fillPagination = (page) => {
  const cardsPerPage = getCardsPerPage();
  for (let i = 0; i < cardsPerPage; i++) {
    const index = (page - 1) * cardsPerPage + i;
    fillCard(pagWrapper.children[i], index);
  }
}

const refreshPagButton = () => {
  pagButtonFastLeft.classList.add('disabled');
  pagButtonLeft.classList.add('disabled');
  pagButtonRight.classList.add('disabled');
  pagButtonFastRight.classList.add('disabled');

  if (currentPage > 1) {
    pagButtonFastLeft.classList.remove('disabled');
    pagButtonLeft.classList.remove('disabled');
  }
  if (currentPage != getTotalPages()) {
    pagButtonFastRight.classList.remove('disabled');
    pagButtonRight.classList.remove('disabled');
  }
  pagButtonPage.textContent = currentPage;
}

const initPagination = () => {
  currentPage = 1;
  currentCardsOnPage = getCardsPerPage();
  refreshPagButton();
  fillPagination(currentPage);
}

const moveToPage = (pageNumber) => {
  currentPage = pageNumber;
  refreshPagButton();
  fillPagination(currentPage);
}

function shuffle(elementNumber) {
  const arr = new Array(elementNumber).fill(0).map((item, index) => index);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }
  return arr;
}

pagButtonFastLeft.addEventListener('click', () => moveToPage(1));
pagButtonLeft.addEventListener('click', () => moveToPage(currentPage - 1));
pagButtonRight.addEventListener('click', () => moveToPage(currentPage + 1));
pagButtonFastRight.addEventListener('click', () => moveToPage(getTotalPages()));

window.addEventListener('resize', () => {
  if (currentCardsOnPage != getCardsPerPage()) {
    initPagination();
  }
});

initPagination();


