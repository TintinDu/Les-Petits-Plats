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
} from "./domUtils.js";
import { initializeData } from "./dataService.js";
import { toggleFiltersList } from "./filterUtils.js";

const recipes = await initializeData();
initialize(recipes);
initializeFilters(recipes);

document.querySelector("#search").addEventListener("input", () => {
  handleSearch(recipes);
});
document
  .querySelector(".searchBtn")
  .addEventListener("click", () => handleSearch(recipes));

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
  .addEventListener("input", () => handleIngredientSearch(recipes));
document
  .querySelector("#inputAppareil")
  .addEventListener("input", () => handleApplianceSearch(recipes));
document
  .querySelector("#inputUstensile")
  .addEventListener("input", () => handleUstensilSearch(recipes));
document.querySelector(".cancelBtn").addEventListener("click", handleCancel);
