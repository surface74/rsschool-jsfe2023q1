const PETS_IMG_PATH = '../../assets/images/pets/';

export async function getPetsData(jsonFilePath) {
  const responce = await fetch(jsonFilePath);
  const data = await responce.json();
  data.forEach((item, index) => {
    item.id = index;
    item.img = PETS_IMG_PATH + item.img;
  });
  return data;
}