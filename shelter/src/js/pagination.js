'use strict';

const pagWrapper = document.querySelector('.pagination__cards');
const pagButtonFastLeft = document.querySelector('.button-paginator_fast-left');
const pagButtonLeft = document.querySelector('.button-paginator_left');
const pagButtonFastRight = document.querySelector('.button-paginator_right');
const pagButtonRight = document.querySelector('.button-paginator_fast-right');
const pagButtonPage = document.querySelector('.button-paginator_page');

const PETS_AMOUNT = pets.length;
let currentPage = 0;
let cardsPull = [];



const getCardsPerPage = () => {
  const width = document.body.clientWidth;
  if (width > 1200) {
    return 8;
  } else if (width > 740) {
    return 6;
  }
  return 3;
}

const getTotalPage = () => Math.floor(cardsPull.length / getCardsPerPage());

// const removeUsedCards = (arr, number) => {
//   return arr.slice(0, -number);
// }


const fillCard = (card, position) => {
  const index = cardIndexes[position];
  card.dataset.id = pets[index].id;
  card.querySelector('.card__image').setAttribute('src', pets[index].img);
  card.querySelector('.card__image').setAttribute('alt', `${pets[index].name}'s photo`);
  card.querySelector('.card__title').innerHTML = pets[index].name;
}

const fillPagination = () => {
  for (let i = 0; i < pagWrapper.children.length; i++) {
    // fillCard(pagWrapper.children[i + currentPage - 1], index++);
  }
}

const refreshPagButton = () => {
  pagButtonFastLeft.classList.add('.disabled');
  pagButtonFastLeft.classList.add('.disabled');
  pagButtonFastLeft.classList.add('.disabled');
  pagButtonFastLeft.classList.add('.disabled');

  if (currentPage > 1) {
    pagButtonFastLeft.classList.remove('.disabled');
    pagButtonLeft.classList.remove('.disabled');
  }
  if (currentPage != getTotalPage()) {
    pagButtonFastRight.classList.remove('.disabled');
    pagButtonRight.classList.remove('.disabled');
  }
  pagButtonPage.textContent = currentPage;
}

const initPagination = () => {
  cardsPull = [...shuffle(PETS_AMOUNT), ...shuffle(PETS_AMOUNT),
  ...shuffle(PETS_AMOUNT), ...shuffle(PETS_AMOUNT),
  ...shuffle(PETS_AMOUNT), ...shuffle(PETS_AMOUNT)];

  currentPage = 1;
  refreshPagButton();
  fillPagination();
}

const pagMoveLeft = () => {
  --currentPage;
  refreshPagButton();
  fillPagination();
}

const pagMoveFastLeft = () => {
  currentPage = 1;
  refreshPagButton();
  fillPagination();
}

const pagMoveFastRight = () => {
  currentPage = getTotalPage();
  refreshPagButton();
  fillPagination();
}

const pagMoveRight = () => {
  ++currentPage;
  refreshPagButton();
  fillPagination();
}

function shuffle(elementNumber) {
  const arr = new Array(elementNumber).fill(0).map((item, index) => index);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }
  return arr;
}

pagButtonFastLeft.addEventListener('click', pagMoveFastLeft);
pagButtonLeft.addEventListener('click', pagMoveLeft);
pagButtonRight.addEventListener('click', pagMoveRight);
pagButtonFastRight.addEventListener('click', pagMoveFastRight);

initPagination(pagWrapper);


