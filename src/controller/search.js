import service from "../models/service.js";

const searchBar = document.querySelector('#search');
const noResultsDiv = document.querySelector(".noResults");
const searchBtn = document.querySelector('.searchBtn');

let recipes = [];
let tags = null;
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
    return;
  }

  const searchWords = searchValue.split(" ").filter(word => word.length >= 2);
  const filteredRecipes = recipes.filter(recipe => filterRecipe(searchWords, recipe));

  if (filteredRecipes.length === 0) {
    noResults(searchValue);
  }

  updateTagsList(searchWords);
  service.displayRecipes(filteredRecipes);
};

const filterRecipesBySelectedIngredients = (selectedIngredient) => {
  const filteredRecipes = recipes.filter(recipe =>
    recipe.ingredients.some(ingredient =>
      ingredient.ingredient.toLowerCase().includes(selectedIngredient.toString().toLowerCase()),
    ),
  );
  return filteredRecipes;
};

const filterRecipesBySelectedAppliances = (selectedAppliance) => {
  const filteredRecipes = recipes.filter(recipe =>
    recipe.appliance.toLowerCase().includes(selectedAppliance.toString().toLowerCase()),
  );
  return filteredRecipes;
};

const filterRecipesBySelectedUstensils = (selectedUstensil) => {
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
  const lowerCaseTitle = recipe.name.toLowerCase();
  const lowerCaseDescription = recipe.description.toLowerCase();

  const hasMatchingTitle = searchWithTitle(searchWords, lowerCaseTitle);
  const hasMatchingDescription = searchWithDescription(searchWords, lowerCaseDescription);
  const hasMatchingIngredients = searchWithIngredients(searchWords, lowerCaseIngredients);
  const hasMatchingAppliance = searchWithAppliances(searchWords, lowerCaseAppliance);
  const hasMatchingUstensils = searchWithUstensils(searchWords, lowerCaseUstensils);

  const hasMatchingCombinedIngredients = searchWithCombinedIngredients(searchWords, lowerCaseIngredients);

  return hasMatchingTitle || hasMatchingDescription || hasMatchingIngredients || hasMatchingAppliance || hasMatchingUstensils || hasMatchingCombinedIngredients;
};

const searchWithCombinedIngredients = (searchWords, ingredients) => {
  return searchWords.every(word => ingredients.some(ingredient => ingredient.includes(word)));
};

const searchWithTitle = (searchWords, title) => {
  return searchWords.every(word => title.includes(word));
};

const searchWithDescription = (searchWords, description) => {
  return searchWords.every(word => description.includes(word));
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

  const ingredientsList = document.querySelector("#ingredientsList");
  const appliancesList = document.querySelector("#devicesList");
  const ustensilsList = document.querySelector("#ustensilesList");

  ingredientsList.addEventListener("click", handleIngredientFilter);
  appliancesList.addEventListener("click", handleApplianceFilter);
  ustensilsList.addEventListener("click", handleUstensilFilter);

  const inputIngredient = document.querySelector("#inputIngredient");
  const inputAppareil = document.querySelector("#inputAppareil");
  const inputUstensile = document.querySelector("#inputUstensile");

  inputIngredient.addEventListener("input", handleIngredientSearch);
  inputAppareil.addEventListener("input", handleApplianceSearch);
  inputUstensile.addEventListener("input", handleUstensilSearch);

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

const filterWithTags = () => {
  let filteredRecipes = recipes;
  if (selectedAppliance) {
    filteredRecipes = filteredRecipes.filter(recipe =>
      recipe.appliance.toLowerCase().includes(selectedAppliance.toLowerCase()),
    );
  }
  if (selectedIngredient) {
    filteredRecipes = filteredRecipes.filter(recipe =>
      recipe.ingredients.some(ingredient =>
        ingredient.ingredient.toLowerCase().includes(selectedIngredient.toLowerCase()),
      ),
    );
  }
  if (selectedUstensil) {
    filteredRecipes = filteredRecipes.filter(recipe =>
      recipe.ustensils.some(ustensil =>
        ustensil.toLowerCase().includes(selectedUstensil.toLowerCase()),
      ),
    );
  }
  return filteredRecipes;
};

const updateTagsList = (searchWords) => {
  tags = getCombinedIngredients(searchWords);
  displayTags();
  const filteredRecipes = filterWithTags();
  service.displayRecipes(filteredRecipes);
};

const getCombinedIngredients = (searchWords) => {
  const combinedIngredients = [];
  const lowerCaseIngredients = service.getIngredientsList(recipes).map(ingredient => ingredient.toLowerCase());

  searchWords.forEach(word => {
    lowerCaseIngredients.forEach(ingredient => {
      if (ingredient.includes(word) && !combinedIngredients.includes(ingredient)) {
        combinedIngredients.push(ingredient);
      }
    });
  });

  return combinedIngredients;
};

const displayTags = () => {
  const tagDiv = document.querySelector("#divTags");
  tagDiv.innerHTML = '';
  tags.forEach(tag => {
    const tagButton = document.createElement('button');
    tagButton.className = 'tag';
    tagButton.textContent = tag;
    tagDiv.appendChild(tagButton);
    tagButton.addEventListener('click', removeTag);
  });
};

const removeTag = (event) => {
  const clickedTag = event.target.textContent;
  tags = tags.filter(tag => tag !== clickedTag);
  displayTags();
  handleSearch();
};


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
  const searchValue = ingredient.trim();
  const filteredIngredients = ingredients.filter((item) =>
    item.toLowerCase().includes(searchValue),
  );
  return filteredIngredients;
};

const searchAppliance = (appliance, appliances) => {
  const searchValue = appliance.trim();
  const filteredAppliances = appliances.filter((item) =>
    item.toLowerCase().includes(searchValue),
  );
  return filteredAppliances;
};

const searchUstensil = (ustensil, ustensils) => {
  const searchValue = ustensil.trim();
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
  const inputIngredient = document.querySelector("#inputIngredient");
  ingredientsList.innerHTML = '';

  inputIngredient.addEventListener("input", () => {
    const searchValue = inputIngredient.value.toLowerCase().trim();
    const filteredIngredients = searchIngredient(searchValue, service.getIngredientsList(recipes));
    displayFilteredList(filteredIngredients, ingredientsList);
  });

  ingredientsList.addEventListener("click", (event) => {
    const clickedListItem = event.target.closest("div");
    if (clickedListItem) {
      event.stopPropagation();
      const inputValue = clickedListItem.textContent.trim();
      selectedIngredient = inputValue;
      handleIngredientFilter();
    }
  });

  displayFilteredList(service.getIngredientsList(recipes), ingredientsList);
};

const initializeAppliances = () => {
  const appliancesList = document.querySelector("#devicesList");
  const inputAppareil = document.querySelector("#inputAppareil");
  appliancesList.innerHTML = '';

  inputAppareil.addEventListener("input", () => {
    const searchValue = inputAppareil.value.toLowerCase().trim();
    const filteredAppliances = searchAppliance(searchValue, service.getAppliancesList(recipes));
    displayFilteredList(filteredAppliances, appliancesList);
  });

  appliancesList.addEventListener("click", (event) => {
    const clickedListItem = event.target.closest("div");
    if (clickedListItem) {
      event.stopPropagation();
      const inputValue = clickedListItem.textContent.trim();
      selectedAppliance = inputValue;
      handleApplianceFilter();
    }
  });

  displayFilteredList(service.getAppliancesList(recipes), appliancesList);
};

const initializeUstensils = () => {
  const ustensilesList = document.querySelector("#ustensilesList");
  const inputUstensile = document.querySelector("#inputUstensile");
  ustensilesList.innerHTML = '';

  inputUstensile.addEventListener("input", () => {
    const searchValue = inputUstensile.value.toLowerCase().trim();
    const filteredUstensils = searchUstensil(searchValue, service.getUstensilsList(recipes));
    displayFilteredList(filteredUstensils, ustensilesList);
  });

  ustensilesList.addEventListener("click", (event) => {
    const clickedListItem = event.target.closest("div");
    if (clickedListItem) {
      event.stopPropagation();
      const inputValue = clickedListItem.textContent.trim();
      selectedUstensil = inputValue;
      handleUstensilFilter();
    }
  });

  displayFilteredList(service.getUstensilsList(recipes), ustensilesList);
};

const displayFilteredList = (filteredList, listContainer) => {
  listContainer.innerHTML = '';
  filteredList.forEach((item) => {
    const div = document.createElement('div');
    const p = document.createElement("p");
    p.innerText = item;
    div.appendChild(p);
    listContainer.appendChild(div);

    listContainer.addEventListener("click", (event) => {
      const clickedListItem = event.target.closest("div");
      if (clickedListItem) {
        event.stopPropagation();
        const inputValue = item.toLowerCase();
        const inputElement = listContainer.previousElementSibling;
        inputElement.value = inputValue;
        inputElement.dispatchEvent(new Event("input"));
      }
    });
  });
};

const handleIngredientSearch = () => {
  const searchValue = document.querySelector("#inputIngredient").value.toLowerCase().trim();
  const filteredIngredients = searchIngredient(searchValue, service.getIngredientsList(recipes));
  const filteredRecipes = filterRecipesBySelectedIngredients(filteredIngredients);
  service.displayRecipes(filteredRecipes);
};

const handleApplianceSearch = () => {
  const searchValue = document.querySelector("#inputAppareil").value.toLowerCase().trim();
  const filteredAppliances = searchAppliance(searchValue, service.getAppliancesList(recipes));
  const filteredRecipes = filterRecipesBySelectedAppliances(filteredAppliances);
  service.displayRecipes(filteredRecipes);
};

const handleUstensilSearch = () => {
  const searchValue = document.querySelector("#inputUstensile").value.toLowerCase().trim();
  const filteredUstensils = searchUstensil(searchValue, service.getUstensilsList(recipes));
  const filteredRecipes = filterRecipesBySelectedUstensils(filteredUstensils);
  service.displayRecipes(filteredRecipes);
};


initialize();