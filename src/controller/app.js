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
import {
  initializeData,
  updateFilterLists,
} from "./dataService.js";
import {
  toggleFiltersList,
  handleIngredientFilter,
  handleApplianceFilter,
  handleUstensilFilter,
} from "./filterUtils.js";
import service from "../models/service.js";

(async () => {
  const recipes = await initializeData();
  const ingredients = service.getIngredientsList(recipes);
  let filteredRecipes = recipes;

  if (recipes.length === filteredRecipes.length) {
    initialize(filteredRecipes);
    initializeFilters(filteredRecipes);
  }

  document
    .querySelector("#search")
    .addEventListener("input", () => {
      const searchValue = document
        .querySelector("#search")
        .value.toLowerCase()
        .trim();
      if (searchValue.length >= 3) {
        filteredRecipes = handleSearch(filteredRecipes);
      } else if (searchValue.length < 3) {
        document.querySelector(".noResults").textContent = "";
        initialize(filteredRecipes);
        updateFilterLists(filteredRecipes);
      }
      document
        .querySelector("#ingredientsList").childNodes
        .forEach((element) =>
          element.addEventListener("click", (event) => {
            filteredRecipes = handleTag(
              filteredRecipes,
              event,
              handleIngredientFilter,
              "ingredients",
            );
          }),
        );

      document
        .querySelector("#devicesList").childNodes
        .forEach((element) =>
          element.addEventListener("click", (event) => {
            filteredRecipes = handleTag(
              filteredRecipes,
              event,
              handleApplianceFilter,
              "devices",
            );
          }),
        );

      document
        .querySelector("#ustensilesList").childNodes
        .forEach((element) =>
          element.addEventListener("click", (event) => {
            filteredRecipes = handleTag(
              filteredRecipes,
              event,
              handleUstensilFilter,
              "ustensiles",
            );
          }),
        );

      document
        .querySelector(".cancelBtn").addEventListener("click", async () => {
          filteredRecipes = await handleCancel(recipes);
        });
    });

  document
    .querySelector(".searchBtn")
    .addEventListener("click", () => {
      const searchValue = document
        .querySelector("#search")
        .value.toLowerCase()
        .trim();
      if (searchValue.length >= 3) {
        filteredRecipes = handleSearch(filteredRecipes);
      } else if (searchValue.length < 3) {
        document.querySelector(".noResults").textContent = "";
        initialize(filteredRecipes);
        updateFilterLists(filteredRecipes);
      }
    });

  document
    .querySelector("#displayIngredientsList")
    .addEventListener("click", () => {
      toggleFiltersList("ingredients", "display");
    });
  document
    .querySelector("#hideIngredientsList")
    .addEventListener("click", () => {
      toggleFiltersList("ingredients", "hide");
    });
  document
    .querySelector("#displayDevicesList")
    .addEventListener("click", () => {
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
  document
    .querySelector("#hideUstensilesList")
    .addEventListener("click", () => {
      toggleFiltersList("ustensiles", "hide");
    });

  document
    .querySelector("#ingredientsList").childNodes
    .forEach((element) =>
      element.addEventListener("click", (event) => {
        filteredRecipes = handleTag(
          filteredRecipes,
          event,
          handleIngredientFilter,
          "ingredients",
        );
      }),
    );
  document
    .querySelector("#devicesList").childNodes
    .forEach((element) =>
      element.addEventListener("click", (event) => {
        filteredRecipes = handleTag(
          filteredRecipes,
          event,
          handleApplianceFilter,
          "devices",
        );
      }),
    );
  document
    .querySelector("#ustensilesList").childNodes
    .forEach((element) =>
      element.addEventListener("click", (event) => {
        filteredRecipes = handleTag(
          filteredRecipes,
          event,
          handleUstensilFilter,
          "ustensiles",
        );
      }),
    );
  document
    .querySelector("#inputIngredient")
    .addEventListener("input", () => {
      handleIngredientSearch(filteredRecipes);
      document
        .querySelector("#ingredientsList").childNodes
        .forEach((element) =>
          element.addEventListener("click", (event) => {
            filteredRecipes = handleTag(
              filteredRecipes,
              event,
              handleIngredientFilter,
              "ingredients",
              ingredients,
            );
          }),
        );
    });
  document
    .querySelector("#inputAppareil")
    .addEventListener("input", () => {
      handleApplianceSearch(filteredRecipes);
      document
        .querySelector("#devicesList").childNodes
        .forEach((element) =>
          element.addEventListener("click", (event) => {
            filteredRecipes = handleTag(
              filteredRecipes,
              event,
              handleApplianceFilter,
              "devices",
            );
          }),
        );
    });
  document
    .querySelector("#inputUstensile")
    .addEventListener("input", () => {
      handleUstensilSearch(filteredRecipes);
      document
        .querySelector("#ustensilesList").childNodes
        .forEach((element) =>
          element.addEventListener("click", (event) => {
            filteredRecipes = handleTag(
              filteredRecipes,
              event,
              handleUstensilFilter,
              "ustensiles",
            );
          }),
        );
    });

})();
