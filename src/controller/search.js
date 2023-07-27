import service from "../models/service.js";

const searchBar = document.querySelector('#search');
const noResultsDiv = document.querySelector(".noResults");
const searchBtn = document.querySelector('.searchBtn');

let recipes = [];
let selectedAppliance = null;
let selectedIngredient = null;
let selectedUstensil = null;

const initializeData = async () => {
  recipes = await service.getRecipes();
  applySearchBarEvents();
};

const applySearchBarEvents = () => {
  searchBar.addEventListener('input', handleSearch);
  searchBtn.addEventListener('click', handleSearch);
};

const handleSearch = () => {
  const searchValue = searchBar.value.toLowerCase().trim();
  noResultsDiv.textContent = "";

  if (searchValue.length < 3) {
    noResultsDiv.textContent = "";
    service.displayRecipes(recipes);
    service.getRecipesNumbers(recipes);
    return;
  }

  const searchWords = searchValue.split(" ").filter(word => word.length >= 2);
  const filteredRecipes = recipes.filter(recipe => filterRecipe(searchWords, recipe));

  if (filteredRecipes.length === 0) {
    noResults(searchValue);
  }

  service.displayRecipes(filteredRecipes);
  service.getRecipesNumbers(filteredRecipes);
};

const filterRecipesBySelectedIngredients = (selectedIngredient) => {
  console.log(selectedIngredient.toString());
  const filteredRecipes = recipes.filter(recipe =>
    recipe.ingredients.some(ingredient =>
      ingredient.ingredient.toLowerCase().includes(selectedIngredient.toString().toLowerCase()),
    ),
  );
  return filteredRecipes;
};

const filterRecipesBySelectedAppliances = (selectedAppliance) => {
  console.log(selectedAppliance.toString());
  const filteredRecipes = recipes.filter(recipe =>
    recipe.appliance.toLowerCase().includes(selectedAppliance.toString().toLowerCase()),
  );
  return filteredRecipes;
};

const filterRecipesBySelectedUstensils = (selectedUstensil) => {
  console.log(selectedUstensil.toString());
  const filteredRecipes = recipes.filter(recipe =>
    recipe.ustensils.some(ustensil =>
      ustensil.toLowerCase().includes(selectedUstensil.toString().toLowerCase()),
    ),
  );
  return filteredRecipes;
};


const filterRecipe = (searchWords, recipe) => {
  const lowerCaseIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
  const lowerCaseAppliance = recipe.appliance.toLowerCase();
  const lowerCaseUstensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());

  const hasMatchingIngredients = searchWithIngredients(searchWords, lowerCaseIngredients);
  const hasMatchingAppliance = searchWithAppliances(searchWords, lowerCaseAppliance);
  const hasMatchingUstensils = searchWithUstensils(searchWords, lowerCaseUstensils);

  return hasMatchingIngredients || hasMatchingAppliance || hasMatchingUstensils;
};

const searchWithIngredients = (searchWords, ingredients) => {
  return searchWords.every(word => ingredients.some(ingredient => ingredient.includes(word)));
};

const searchWithAppliances = (searchWords, appliance) => {
  return searchWords.some(word => appliance.includes(word));
};

const searchWithUstensils = (searchWords, ustensils) => {
  return searchWords.some(word => ustensils.some(ustensil => ustensil.includes(word)));
};

const noResults = (word) => {
  noResultsDiv.textContent = `Aucune recette ne contient ${word}. Vous pouvez chercher «tarte aux pommes» , «poisson»`;
};

const initialize = async () => {
  await initializeData();
  service.displayRecipes(recipes);
  service.getRecipesNumbers(recipes);

  // Add event listeners to filter lists
  const ingredientsList = document.querySelector("#ingredientsList");
  const appliancesList = document.querySelector("#devicesList");
  const ustensilsList = document.querySelector("#ustensilesList");

  ingredientsList.addEventListener("click", handleIngredientFilter);
  appliancesList.addEventListener("click", handleApplianceFilter);
  ustensilsList.addEventListener("click", handleUstensilFilter);

  initializeFilters();
};

document.querySelector("#displayIngredientsList").addEventListener("click", () =>{
  toggleFiltersList("ingredients", "display");
});
document.querySelector("#hideIngredientsList").addEventListener("click", () =>{
  toggleFiltersList("ingredients", "hide");
});
document.querySelector("#displayDevicesList").addEventListener("click", () =>{
  toggleFiltersList("devices", "display");
});
document.querySelector("#hideDevicesList").addEventListener("click", () =>{
  toggleFiltersList("devices", "hide");
});
document.querySelector("#displayUstensilesList").addEventListener("click", () =>{
  toggleFiltersList("ustensiles", "display");
});
document.querySelector("#hideUstensilesList").addEventListener("click", () =>{
  toggleFiltersList("ustensiles", "hide");
});

function toggleFiltersList(block, action) {
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
}

// const filterWithTags = (tag) => {
// filteredRecipes = recipes.filter((recipe) => {
// return recipe.includes(tag)
// })
// };


const handleIngredientFilter = () => {
  const filteredIngredients = searchIngredient(selectedIngredient, service.getIngredientsList(recipes));
  const filteredRecipes = filterRecipesBySelectedIngredients(filteredIngredients);
  service.displayRecipes(filteredRecipes);
};


const handleApplianceFilter = () => {
  const filteredAppliances = searchAppliance(selectedAppliance, service.getAppliancesList(recipes));
  const filteredRecipes = filterRecipesBySelectedAppliances(filteredAppliances);
  service.displayRecipes(filteredRecipes);
};

const handleUstensilFilter = () => {
  const filteredUstensils = searchUstensil(selectedUstensil, service.getUstensilsList(recipes));
  const filteredRecipes = filterRecipesBySelectedUstensils(filteredUstensils);
  service.displayRecipes(filteredRecipes);
};

const searchIngredient = (ingredient, ingredients) => {
  const searchValue = ingredient.toLowerCase().trim();
  const filteredIngredients = ingredients.filter((item) =>
    item.toLowerCase().includes(searchValue),
  );
  return filteredIngredients;
};

const searchAppliance = (appliance, appliances) => {
  const searchValue = appliance.toLowerCase().trim();
  const filteredAppliances = appliances.filter((item) =>
    item.toLowerCase().includes(searchValue),
  );
  return filteredAppliances;
};

const searchUstensil = (ustensil, ustensils) => {
  const searchValue = ustensil.toLowerCase().trim();
  const filteredUstensils = ustensils.filter((item) =>
    item.toLowerCase().includes(searchValue),
  );
  return filteredUstensils;
};

const initializeFilters = () => {
  initializeIngredients();
  initializeAppliances();
  initializeUstensils();
};

const initializeIngredients = () => {
  const ingredientsList = document.querySelector("#ingredientsList");
  ingredientsList.innerHTML = '';
  const ingredients = service.getIngredientsList(recipes);
  ingredients.forEach((ingredient) => {
    const div = document.createElement('div');
    const p = document.createElement("p");
    p.innerText = ingredient;
    div.appendChild(p);
    ingredientsList.appendChild(div);

    div.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedIngredient = ingredient.toLowerCase();
      handleIngredientFilter();
    });
  });
};

const initializeAppliances = () => {
  const devicesList = document.querySelector("#devicesList");
  devicesList.innerHTML = '';
  const appliances = service.getAppliancesList(recipes);
  appliances.forEach((appliance) => {
    const div = document.createElement('div');
    const p = document.createElement("p");
    p.innerText = appliance;
    div.appendChild(p);
    devicesList.appendChild(div);

    div.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedAppliance = appliance.toLowerCase();
      handleApplianceFilter();
    });
  });
};

const initializeUstensils = () => {
  const ustensilesList = document.querySelector("#ustensilesList");
  ustensilesList.innerHTML = '';
  const ustensils = service.getUstensilsList(recipes);
  ustensils.forEach((ustensil) => {
    const div = document.createElement('div');
    const p = document.createElement("p");
    p.innerText = ustensil;
    div.appendChild(p);
    ustensilesList.appendChild(div);

    div.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedUstensil = ustensil.toLowerCase();
      handleUstensilFilter();
    });
  });
};

initialize();