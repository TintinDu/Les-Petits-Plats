// filter / map / some pour la recherche avancée
// rester bien sur des tableaux
// pour chaque fonction lui passer les arguments et ne pas avoir plein de tableaux stockés en global

import getRecipeCardDom from "./factories/recipeCardFactory.js";

async function getRecipes() {

  const response = await fetch("./data/recipes.json");
  const data = await response.json();

  return data;
}

async function displayRecipes(recipes) {
  const recipesSection = document.querySelector(".recipes-section");

  recipes.map((recipe) => {
    const recipeCardDom = getRecipeCardDom(recipe);
    recipesSection.appendChild(recipeCardDom);
  });

}

async function initializeRecipes() {
  const recipes = await getRecipes();
  displayRecipes(recipes);
}

initializeRecipes();