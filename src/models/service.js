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


const service =  {
  getRecipes,
  displayRecipes,
  getRecipesNumbers,
};

export default service;