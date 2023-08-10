// Initialisation + eventlisteners ici
// C'est le seul fichier qui exécute les fonctions, les autres se contentent d'exporter et de déclarer

// TODO: rappliquer la fonction de la recherche globale sur la recherche dans le filtre

import {
  initialize,
  initializeFilters,
  handleSearch,
  handleCancel,
  handleApplianceSearch,
  handleIngredientSearch,
  handleUstensilSearch,
  handleTag,
} from "./domUtils.js";
import { initializeData } from "./dataService.js";
import { toggleFiltersList, handleIngredientFilter, handleApplianceFilter, handleUstensilFilter } from "./filterUtils.js";

(async () => {
  const recipes = await initializeData();
  let filteredRecipes = recipes;

  if (recipes.length === filteredRecipes.length) {
    initialize(filteredRecipes);
    initializeFilters(filteredRecipes);
  }

  document.querySelector("#search").addEventListener("input", () => {
    filteredRecipes = handleSearch(filteredRecipes);
  });
  document
    .querySelector(".searchBtn")
    .addEventListener("click", () =>  {
      filteredRecipes = handleSearch(filteredRecipes);
    },
    );

  document.querySelector("#ingredientsList").addEventListener("click", (event) => {
    filteredRecipes = handleTag(filteredRecipes, event, handleIngredientFilter, "ingredients");
  });
  document.querySelector("#devicesList").addEventListener("click", (event) => {
    filteredRecipes = handleTag(filteredRecipes, event, handleApplianceFilter, "devices");
  });
  document.querySelector("#ustensilesList").addEventListener("click", (event) => {
    filteredRecipes = handleTag(filteredRecipes, event, handleUstensilFilter, "ustensiles");
  });

  document
    .querySelector("#displayIngredientsList")
    .addEventListener("click", () => {
      toggleFiltersList("ingredients", "display");
    });
  document.querySelector("#hideIngredientsList").addEventListener("click", () => {
    toggleFiltersList("ingredients", "hide");
  });
  document.querySelector("#displayDevicesList").addEventListener("click", () => {
    toggleFiltersList("devices", "display");
  });
  document.querySelector("#hideDevicesList").addEventListener("click", () => {
    toggleFiltersList("devices", "hide");
  });
  document
    .querySelector("#displayUstensilesList")
    .addEventListener("click", () => {
      toggleFiltersList("ustensiles", "display");
    });
  document.querySelector("#hideUstensilesList").addEventListener("click", () => {
    toggleFiltersList("ustensiles", "hide");
  });
  document
    .querySelector("#inputIngredient")
    .addEventListener("input", () => {
      handleIngredientSearch(filteredRecipes);
    });
  document
    .querySelector("#inputAppareil")
    .addEventListener("input", () =>
    {
      handleApplianceSearch(filteredRecipes);
    });
  document
    .querySelector("#inputUstensile")
    .addEventListener("input", () =>
    {
      handleUstensilSearch(filteredRecipes);
    });
  document.querySelector(".cancelBtn").addEventListener("click", () => {
    filteredRecipes = handleCancel(recipes);
  });

})();
