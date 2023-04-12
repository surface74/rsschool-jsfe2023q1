export async function getPetsData(jsonFilePath) {
  const responce = await fetch(jsonFilePath);
  const data = await responce.json();
  data.forEach((item, index) => item.id = index);
  return data;
}