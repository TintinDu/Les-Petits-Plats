// Toutes les fonctions utilitaires pour le filtrage de recettes et les opérations de recherche

import service from "../models/service.js";

export const filterRecipe = (searchWords, recipe) => {
  const lowerCaseIngredients = recipe.ingredients.map((ingredient) =>
    ingredient.ingredient.toLowerCase(),
  );
  const lowerCaseTitle = recipe.name.toLowerCase();
  const lowerCaseDescription = recipe.description.toLowerCase();

  const hasMatchingTitle = searchWithTitle(searchWords, lowerCaseTitle);
  const hasMatchingDescription = searchWithDescription(
    searchWords,
    lowerCaseDescription,
  );
  const hasMatchingIngredients = searchWithIngredients(
    searchWords,
    lowerCaseIngredients,
  );

  const hasMatchingCombinedIngredients = searchWithCombinedIngredients(
    searchWords,
    lowerCaseIngredients,
  );

  return (
    hasMatchingTitle || (
      hasMatchingIngredients ||
      hasMatchingCombinedIngredients) &&
      hasMatchingDescription
  );
};

const searchWithCombinedIngredients = (searchWords, ingredients) => {
  return searchWords.every((word) =>
    ingredients.some((ingredient) => ingredient.includes(word)),
  );
};

const searchWithTitle = (searchWords, title) => {
  return searchWords.every((word) => title.includes(word));
};

const searchWithDescription = (searchWords, description) => {
  return searchWords.every((word) => description.includes(word));
};

const searchWithIngredients = (searchWords, ingredients) => {
  return searchWords.every((word) =>
    ingredients.some((ingredient) => ingredient.includes(word)),
  );
};

const filterRecipesBySelectedIngredient = (selectedIngredient, recipes) => {
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.ingredients.some((ingredient) =>
      ingredient.ingredient
        .toLowerCase()
        .includes(selectedIngredient.toString().toLowerCase()),
    ),
  );
  return filteredRecipes;
};

const filterRecipesBySelectedAppliance = (selectedAppliance, recipes) => {
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.appliance
      .toLowerCase()
      .includes(selectedAppliance.toString().toLowerCase()),
  );
  return filteredRecipes;
};

const filterRecipesBySelectedUstensil = (selectedUstensil, recipes) => {
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.ustensils.some((ustensil) =>
      ustensil.toLowerCase().includes(selectedUstensil.toString().toLowerCase()),
    ),
  );
  return filteredRecipes;
};

export const toggleFiltersList = (block, action) => {
  const filterIngredients = document.getElementById("filterIngredients");
  const filterDevices = document.getElementById("filterDevices");
  const filterUstensiles = document.getElementById("filterUstensiles");

  switch (block) {
    case "ingredients":
      if (action === "display") {
        filterIngredients.classList.add("active");
        filterDevices.classList.remove("active");
        filterUstensiles.classList.remove("active");
      } else if (action === "hide") {
        filterIngredients.classList.remove("active");
      }
      break;
    case "devices":
      if (action === "display") {
        filterDevices.classList.add("active");
        filterIngredients.classList.remove("active");
        filterUstensiles.classList.remove("active");
      } else if (action === "hide") {
        filterDevices.classList.remove("active");
      }
      break;
    case "ustensiles":
      if (action === "display") {
        filterUstensiles.classList.add("active");
        filterIngredients.classList.remove("active");
        filterDevices.classList.remove("active");
      } else if (action === "hide") {
        filterUstensiles.classList.remove("active");
      }
      break;
  }
};

// export const filterWithTags = (selectedTag, recipes) => {
//   let filteredRecipes = recipes;
//   if (selectedTag === "selectedAppliance") {
//     filteredRecipes = filteredRecipes.filter((recipe) =>
//       recipe.appliance.toLowerCase().includes(selectedTag.toLowerCase()),
//     );
//   }
//   if (selectedTag === "selectedIngredient") {
//     filteredRecipes = filteredRecipes.filter((recipe) =>
//       recipe.ingredients.some((ingredient) =>
//         ingredient.ingredient.toLowerCase().includes(selectedTag.toLowerCase()),
//       ),
//     );
//   }
//   if (selectedTag === "selectedUstensil") {
//     filteredRecipes = filteredRecipes.filter((recipe) =>
//       recipe.ustensils.some((ustensil) =>
//         ustensil.toLowerCase().includes(selectedTag.toLowerCase()),
//       ),
//     );
//   }
//   return filteredRecipes;
// };

export const handleIngredientFilter = (selectedIngredient, recipes) => {
  const filteredRecipes = filterRecipesBySelectedIngredient(
    selectedIngredient,
    recipes,
  );
  service.displayRecipes(filteredRecipes);
  return filteredRecipes;
};

export const handleApplianceFilter = (selectedAppliance, recipes) => {
  const filteredRecipes = filterRecipesBySelectedAppliance(
    selectedAppliance,
    recipes,
  );
  service.displayRecipes(filteredRecipes);
  return filteredRecipes;
};

export const handleUstensilFilter = (selectedUstensil, recipes) => {
  const filteredRecipes = filterRecipesBySelectedUstensil(
    selectedUstensil,
    recipes,
  );
  service.displayRecipes(filteredRecipes);
  return filteredRecipes;
};
