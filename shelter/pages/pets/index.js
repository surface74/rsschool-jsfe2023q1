import { getPetsData } from '../../src/js/db.js';
import '../../src/js/menu.js';
import * as popup from '../../src/js/pet-card-popup.js';
import * as pagination from '../../src/js/pagination.js';

const pets = await getPetsData('/shelter/src/js/pets.json');

popup.init(pets);
pagination.init(pets);
