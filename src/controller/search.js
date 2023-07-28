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
    return;
  }

  const searchWords = searchValue.split(" ").filter(word => word.length >= 2);
  const filteredRecipes = recipes.filter(recipe => filterRecipe(searchWords, recipe));

  if (filteredRecipes.length === 0) {
    noResults(searchValue);
  }

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

  return hasMatchingTitle || hasMatchingDescription || hasMatchingIngredients || hasMatchingAppliance || hasMatchingUstensils ;
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

  // Add event listeners to filter lists
  const ingredientsList = document.querySelector("#ingredientsList");
  const appliancesList = document.querySelector("#devicesList");
  const ustensilsList = document.querySelector("#ustensilesList");

  ingredientsList.addEventListener("click", handleIngredientFilter);
  appliancesList.addEventListener("click", handleApplianceFilter);
  ustensilsList.addEventListener("click", handleUstensilFilter);

  // Initialize search input event listeners
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
  console.log(ingredient);
  const searchValue = ingredient.trim();
  const filteredIngredients = ingredients.filter((item) =>
    item.toLowerCase().includes(searchValue),
  );
  return filteredIngredients;
};

const searchAppliance = (appliance, appliances) => {
  console.log(appliance);
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
  const inputIngredient = document.querySelector("#inputIngredient"); // New: Get the input element
  ingredientsList.innerHTML = '';

  inputIngredient.addEventListener("input", () => {
    const searchValue = inputIngredient.value.toLowerCase().trim(); // New: Get the search input value
    const filteredIngredients = searchIngredient(searchValue, service.getIngredientsList(recipes));
    displayFilteredList(filteredIngredients, ingredientsList); // New: Display the filtered list
  });

  ingredientsList.addEventListener("click", (event) => {
    const clickedListItem = event.target.closest("div");
    if (clickedListItem) {
      event.stopPropagation();
      const inputValue = clickedListItem.textContent.trim();
      selectedIngredient = inputValue; // Update the selectedAppliance variable
      handleIngredientFilter(); // Trigger the filter when a filter item is clicked
    }
  });

  // Initially display the full ingredients list
  displayFilteredList(service.getIngredientsList(recipes), ingredientsList);
};

const initializeAppliances = () => {
  const appliancesList = document.querySelector("#devicesList");
  const inputAppareil = document.querySelector("#inputAppareil"); // New: Get the input element
  appliancesList.innerHTML = '';

  inputAppareil.addEventListener("input", () => {
    const searchValue = inputAppareil.value.toLowerCase().trim(); // New: Get the search input value
    const filteredAppliances = searchAppliance(searchValue, service.getAppliancesList(recipes));
    displayFilteredList(filteredAppliances, appliancesList); // New: Display the filtered list
  });

  // Add click event listener to update the selectedAppliance variable
  appliancesList.addEventListener("click", (event) => {
    const clickedListItem = event.target.closest("div");
    if (clickedListItem) {
      event.stopPropagation();
      const inputValue = clickedListItem.textContent.trim();
      selectedAppliance = inputValue; // Update the selectedAppliance variable
      handleApplianceFilter(); // Trigger the filter when a filter item is clicked
    }
  });

  // Initially display the full appliances list
  displayFilteredList(service.getAppliancesList(recipes), appliancesList);
};

const initializeUstensils = () => {
  const ustensilesList = document.querySelector("#ustensilesList");
  const inputUstensile = document.querySelector("#inputUstensile"); // New: Get the input element
  ustensilesList.innerHTML = '';

  inputUstensile.addEventListener("input", () => {
    const searchValue = inputUstensile.value.toLowerCase().trim(); // New: Get the search input value
    const filteredUstensils = searchUstensil(searchValue, service.getUstensilsList(recipes));
    displayFilteredList(filteredUstensils, ustensilesList); // New: Display the filtered list
  });

  ustensilesList.addEventListener("click", (event) => {
    const clickedListItem = event.target.closest("div");
    if (clickedListItem) {
      event.stopPropagation();
      const inputValue = clickedListItem.textContent.trim();
      selectedUstensil = inputValue; // Update the selectedAppliance variable
      handleUstensilFilter(); // Trigger the filter when a filter item is clicked
    }
  });

  // Initially display the full ustensils list
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

    // Add click event listener to update the search input value when an item is clicked
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