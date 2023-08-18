import service from "../models/service.js";

export const filterRecipe = (searchWords, recipe) => {

  let ingredientsArrObj = recipe.ingredients;
  let lowerCaseIngredients = [];

  for (let index = 0; index < ingredientsArrObj.length; index++) {
    const ingredient = ingredientsArrObj[index];
    lowerCaseIngredients.push(ingredient.ingredient.toLowerCase());
  }

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
  for (let searchIndex = 0; searchIndex < searchWords.length; searchIndex++) {
    const word = searchWords[searchIndex];
    let found = false;
    for (let ingredientIndex = 0; ingredientIndex < ingredients.length; ingredientIndex++) {
      const ingredient = ingredients[ingredientIndex];
      if (ingredient.includes(word)) {
        found = true;
        break;
      }
    }
    if (!found) {
      return false;
    }
  }
  return true;
};

const searchWithTitle = (searchWords, title) => {
  for (let index = 0; index < searchWords.length; index++) {
    const word = searchWords[index];
    return title.includes(word);
  }
};

const searchWithDescription = (searchWords, description) => {
  for (let index = 0; index < searchWords.length; index++) {
    const word = searchWords[index];
    return description.includes(word);
  }
};

const searchWithIngredients = (searchWords, ingredients) => {
  for (let index = 0; index < searchWords.length; index++) {
    const word = searchWords[index];
    for (let index = 0; index < ingredients.length; index++) {
      const ingredient = ingredients[index];
      return ingredient.includes(word);
    }
  }
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
