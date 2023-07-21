// faire d'abord la recherche simple puis avancée avec javascript fonctionnel
// filter / map / some pour la recherche avancée
// rester bien sur des tableaux
// pour chaque fonction lui passer les arguments et ne pas avoir plein de tableaux stockés en global

// ensuite passer sur l'algo 2 quand tout fonctionne pour ne pas avoir à faire de modifs

// passer les tests W3C

import getRecipeCardDom from "../views/factories/recipeCardFactory.js";

const getRecipes = async () =>  {

  try {
    const response = await fetch("./data/recipes.json");
    const data = await response.json();

    return data;

  } catch (error) {
    console.error(error);
  }

};

const displayRecipes = (recipes) =>  {
  const recipesSection = document.querySelector(".recipes-section");

  recipes.map((recipe) => {
    const recipeCardDom = getRecipeCardDom(recipe);
    recipesSection.appendChild(recipeCardDom);
  });

};

const getRecipesNumbers = (recipes) => {
  const numbersHeader = document.querySelector(".recipes-numbers");
  numbersHeader.textContent = `${recipes.length} RECETTES`;
};

const getIngredientsList = (recipes) => {
  let ingredients = [];

  const ingredientLists = recipes.map((recipe) => {
    return recipe.ingredients;
  });

  ingredientLists.map((ingredientList) => {
    ingredientList.map((ingredient) => {
      if (!ingredients.includes(ingredient.ingredient)) {
        ingredients.push(ingredient.ingredient);
      }
    });
  });

  return ingredients;
};

const getUstensilsList = (recipes) => {
  let ustensiles = [];

  const ustensileLists = recipes.map((recipe) => {
    return recipe.ustensils;
  });

  ustensileLists.map((ustensileList) => {
    ustensileList.map((ustensile) => {
      if (!ustensiles.includes(ustensile)) {
        ustensiles.push(ustensile);
      }
    });
  });

  return ustensiles;
};

const getAppliancesList = (recipes) => {
  let appliances = [];

  recipes.map((recipe) => {
    if (!appliances.includes(recipe.appliance)) {
      appliances.push(recipe.appliance);
    }
  });

  return appliances;
};

const service =  {
  getRecipes,
  displayRecipes,
  getRecipesNumbers,
  getIngredientsList,
  getUstensilsList,
  getAppliancesList,
};

export default service;