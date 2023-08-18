import getRecipeCardDom from "../views/factories/recipeCardFactory.js";

const getListFromProperty = (recipes, property) => {
  const listSet = new Set();
  recipes.forEach((recipe) => {
    if (property === "ingredients") {
      recipe[property].forEach((ingredient) => {
        listSet.add(ingredient.ingredient.toLowerCase());
      });
    } else {
      const propertyValue = getPropertyDeep(recipe, property);
      if (propertyValue) {
        if (Array.isArray(propertyValue)) {
          propertyValue.forEach((item) => {
            listSet.add(item.toLowerCase());
          });
        } else {
          listSet.add(propertyValue.toLowerCase());
        }
      }
    }
  });
  return Array.from(listSet);
};

const getPropertyDeep = (obj, path) => {
  const parts = path.split(".");
  return parts.reduce((acc, part) => acc && acc[part], obj);
};

const getIngredientsList = (recipes) =>
  getListFromProperty(recipes, "ingredients");

const getUstensilsList = (recipes) => getListFromProperty(recipes, "ustensils");
const getAppliancesList = (recipes) =>
  getListFromProperty(recipes, "appliance");

const getRecipes = async () => {
  try {
    const response = await fetch("./data/recipes.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const displayRecipes = (recipes) => {
  const recipesSection = document.querySelector(".recipes-section");
  recipesSection.innerHTML = "";
  const header = document.createElement("h2");
  header.className = "recipes-title-hidden";
  header.innerText = "Nos recettes";
  recipesSection.appendChild(header);

  for (let index = 0; index < recipes.length; index++) {
    const recipe = recipes[index];
    const recipeCardDom = getRecipeCardDom(recipe);
    recipesSection.appendChild(recipeCardDom);
  }

  getRecipesNumbers(recipes);
};

const getRecipesNumbers = (recipes) => {
  document.querySelector(
    ".recipes-numbers",
  ).textContent = `${recipes.length} RECETTES`;
};

const service = {
  getRecipes,
  displayRecipes,
  getIngredientsList,
  getUstensilsList,
  getAppliancesList,
};

export default service;
