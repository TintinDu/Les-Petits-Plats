// faire d'abord la recherche simple puis avancée avec javascript fonctionnel
// filter / map / some pour la recherche avancée
// rester bien sur des tableaux
// pour chaque fonction lui passer les arguments et ne pas avoir plein de tableaux stockés en global

// ensuite passer sur l'algo 2 quand tout fonctionne pour ne pas avoir à faire de modifs

// passer les tests W3C

import getRecipeCardDom from "../views/factories/recipeCardFactory.js";

const getListFromProperty = (recipes, property) => {
  const listSet = new Set();
  recipes.forEach((recipe) => {
    if (property === "ingredients") {
      recipe[property].forEach((ingredient) => {
        listSet.add(ingredient.ingredient);
      });
    } else {
      const propertyValue = getPropertyDeep(recipe, property);
      if (propertyValue) {
        if (Array.isArray(propertyValue)) {
          propertyValue.forEach((item) => {
            listSet.add(item);
          });
        } else {
          listSet.add(propertyValue);
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

const getIngredientsList = (recipes) => getListFromProperty(recipes, "ingredients");
const getUstensilsList = (recipes) => getListFromProperty(recipes, "ustensils");
const getAppliancesList = (recipes) => getListFromProperty(recipes, "appliance");


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
  recipesSection.innerHTML = '';

  recipes.forEach((recipe) => {
    const recipeCardDom = getRecipeCardDom(recipe);
    recipesSection.appendChild(recipeCardDom);
  });
};

const getRecipesNumbers = (recipes) => {
  const numbersHeader = document.querySelector(".recipes-numbers");
  numbersHeader.textContent = `${recipes.length} RECETTES`;
};

const service = {
  getRecipes,
  displayRecipes,
  getRecipesNumbers,
  getIngredientsList,
  getUstensilsList,
  getAppliancesList,
};

export default service;


