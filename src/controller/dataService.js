// Uniquement manipulation des données

import { displayFilteredList, displayTags } from "./domUtils.js";
import { filterWithTags } from "./filterUtils.js";
import service from "../models/service.js";

export const initializeData = async () => {
  const recipes = await service.getRecipes();
  return recipes;
};

export const updateFilterLists = (filteredRecipes) => {
  console.log(filteredRecipes);
  const filteredIngredients = getFilteredIngredients(filteredRecipes);
  const filteredAppliances = getFilteredAppliances(filteredRecipes);
  const filteredUstensils = getFilteredUstensils(filteredRecipes);

  displayFilteredList(
    filteredIngredients,
    document.querySelector("#ingredientsList"),
  );
  displayFilteredList(
    filteredAppliances,
    document.querySelector("#devicesList"),
  );
  displayFilteredList(
    filteredUstensils,
    document.querySelector("#ustensilesList"),
  );
};

const getFilteredIngredients = (recipes) => {
  const ingredientsSet = new Set();

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredientsSet.add(ingredient.ingredient.toLowerCase());
    });
  });

  return Array.from(ingredientsSet);
};

const getFilteredAppliances = (recipes) => {
  const appliancesSet = new Set();

  recipes.forEach((recipe) => {
    appliancesSet.add(recipe.appliance.toLowerCase());
  });

  return Array.from(appliancesSet);
};

const getFilteredUstensils = (recipes) => {
  const ustensilsSet = new Set();

  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      ustensilsSet.add(ustensil.toLowerCase());
    });
  });

  return Array.from(ustensilsSet);
};

export const updateTagsList = (searchWords, recipes) => {
  const tags = getCombinedIngredients(searchWords, recipes);
  displayTags(tags);
  const filteredRecipes = filterWithTags(tags, recipes);
  service.displayRecipes(filteredRecipes);
};

const getCombinedIngredients = (searchWords, recipes) => {
  const combinedIngredients = [];
  const lowerCaseIngredients = service
    .getIngredientsList(recipes)
    .map((ingredient) => ingredient.toLowerCase());

  searchWords.forEach((word) => {
    lowerCaseIngredients.forEach((ingredient) => {
      if (
        ingredient.includes(word) &&
        !combinedIngredients.includes(ingredient)
      ) {
        combinedIngredients.push(ingredient);
      }
    });
  });

  return combinedIngredients;
};

export const searchIngredient = (ingredient, ingredients) => {
  const searchValue = ingredient;
  const filteredIngredients = ingredients.filter((item) =>
    item.toLowerCase().includes(searchValue),
  );
  return filteredIngredients;
};

export const searchAppliance = (appliance, appliances) => {
  const searchValue = appliance;
  const filteredAppliances = appliances.filter((item) =>
    item.toLowerCase().includes(searchValue),
  );
  return filteredAppliances;
};

export const searchUstensil = (ustensil, ustensils) => {
  const searchValue = ustensil;
  const filteredUstensils = ustensils.filter((item) =>
    item.toLowerCase().includes(searchValue),
  );
  return filteredUstensils;
};
