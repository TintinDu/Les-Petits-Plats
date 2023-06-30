const getRecipeCardDom = recipes => {
  // eslint-disable-next-line no-unused-vars
  const { image, appliance, description, id, ingredients, name, servings, time, ustensils } = recipes;

  console.log(recipes);
  const photoPath = `images/${image}`;

  const article = document.createElement('article');
  const recipeContentDiv = document.createElement('div');
  const divPhoto = document.createElement('div');
  const divTime = document.createElement('div');
  const divRecipe = document.createElement('div');
  const divIngredients = document.createElement('div');

  article.className = "recipe-article";
  recipeContentDiv.className = "recipe-content";
  divPhoto.className = "container__recipe-photo";
  divTime.className = "container__recipe-time";
  divRecipe.className = "container__recipe-text";
  divIngredients.className = "container__recipe-ingredients";

  const recipePhoto = document.createElement('img');
  recipePhoto.setAttribute("src", photoPath);
  recipePhoto.setAttribute("alt", name);
  recipePhoto.className = "recipe-photo";

  const recipeTitle = document.createElement('h3');
  recipeTitle.className = "recipe-title";
  recipeTitle.textContent = name;

  const recipeTime = document.createElement('p');
  recipeTime.className = "recipe-time";
  recipeTime.textContent = `${time}min`;

  const recipeTextTitle = document.createElement('h4');
  recipeTextTitle.className = "recipe-mini-title";
  recipeTextTitle.textContent = "RECETTE";

  const recipeText = document.createElement('p');
  recipeText.className = "recipe-description";
  recipeText.textContent = description;

  const recipeIngredientsTitle = document.createElement('h4');
  recipeIngredientsTitle.className = "recipe-mini-title";
  recipeIngredientsTitle.textContent = "INGRÉDIENTS";

  article.appendChild(divPhoto);
  article.appendChild(divTime);
  article.appendChild(recipeContentDiv);
  recipeContentDiv.appendChild(recipeTitle);
  recipeContentDiv.appendChild(recipeTextTitle);
  recipeContentDiv.appendChild(divRecipe);
  recipeContentDiv.appendChild(recipeIngredientsTitle);
  recipeContentDiv.appendChild(divIngredients);

  divPhoto.appendChild(recipePhoto);
  divRecipe.appendChild(recipeText);
  divTime.appendChild(recipeTime);

  ingredients.forEach((ingredient) => {

    const divIngredient = document.createElement('div');
    divIngredients.appendChild(divIngredient);
    divIngredient.setAttribute("class","div-ingredient");

    const ingredientRecette = document.createElement('p');
    divIngredient.appendChild(ingredientRecette);
    ingredientRecette.setAttribute("class","ingredient");
    ingredientRecette.textContent = ingredient.ingredient;

    const ingredientQuantity = document.createElement('p');
    divIngredient.appendChild(ingredientQuantity);
    ingredientQuantity.setAttribute("class","ingredient-quantity");
    ingredient.unit? ingredientQuantity.textContent = `${ingredient.quantity} ${ingredient.unit}` : ingredientQuantity.textContent = ingredient.quantity;
  });
  return (article);
};

export default getRecipeCardDom;