const getRecipeCardDom = data => {

  // eslint-disable-next-line no-unused-vars
  const { image, appliance, description, id, ingredients, name, servings, time, ustensils } = data;

  const picture = `images/${image}`;
  console.log(picture);

  const article = document.createElement('article');
  article.className = "recipe-article";
  const img = document.createElement('img');
  img.setAttribute("src", picture);
  img.setAttribute("alt", name);
  img.className = "recipe-photo";
  const h2 = document.createElement('h2');
  h2.textContent = name;
  const p = document.createElement('p');
  p.textContent = description;
  article.appendChild(img);
  article.appendChild(h2);
  return (article);
};

export default getRecipeCardDom;