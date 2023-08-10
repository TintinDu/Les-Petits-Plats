// Toutes les manipulations du DOM et les rendus de fonctions ici (lien avec la vue)
import {
  filterRecipe,
  toggleFiltersList,
} from "./filterUtils.js";
import {
  searchIngredient,
  searchAppliance,
  searchUstensil,
  updateFilterLists,
} from "./dataService.js";
import service from "../models/service.js";

const noResultsDiv = document.querySelector(".noResults");
const cancelBtn = document.querySelector(".cancelBtn");
const searchBar = document.querySelector("#search");

export const initialize = async (recipes) => {
  service.displayRecipes(recipes);
};

export const handleSearch = (recipes) => {
  const searchValue = searchBar.value.toLowerCase().trim();
  noResultsDiv.textContent = "";
  cancelBtn.classList.add("visible");

  if (searchValue.length >= 3) {
    const searchWords = searchValue.split(" ").filter((word) => word);
    const filteredRecipes = recipes.filter((recipe) =>
      filterRecipe(searchWords, recipe),
    );

    if (filteredRecipes.length === 0) {
      noResults(searchValue);
      initialize([]);
    }

    updateFilterLists(filteredRecipes);
    initialize(filteredRecipes);
    initializeFilters(filteredRecipes);
    // appeler les fonctions de tri autres avec le nouveau tableau
    return filteredRecipes;
  }

  if (searchValue.length < 3) {
    noResultsDiv.textContent = "";
    initialize(recipes);
    updateFilterLists(recipes);
    return recipes;
  }


};

export const handleIngredientSearch = (recipes) => {
  const searchValue = document
    .querySelector("#inputIngredient")
    .value.toLowerCase()
    .trim();
  searchIngredient(searchValue, service.getIngredientsList(recipes));
};

export const handleApplianceSearch = (recipes) => {
  const searchValue = document
    .querySelector("#inputAppareil")
    .value.toLowerCase()
    .trim();
  searchAppliance(searchValue, service.getAppliancesList(recipes));
};

export const handleUstensilSearch = (recipes) => {
  const searchValue = document
    .querySelector("#inputUstensile")
    .value.toLowerCase()
    .trim();
  return searchUstensil(searchValue, service.getUstensilsList(recipes));
};

export const handleTag = (recipes, event, handleFilterFunction, filters) => {
  const clickedListItem = event.target.closest("div");
  if (clickedListItem) {
    const uncheckFilter = document.createElement("img");
    uncheckFilter.src = "./images/roundedCross.svg";
    uncheckFilter.className = "uncheckFilter";
    clickedListItem.appendChild(uncheckFilter);
    clickedListItem.className = "activeFilterDiv";
    event.stopPropagation();
    const inputValue = clickedListItem.textContent.trim();
    const filteredRecipes = handleFilterFunction(inputValue, recipes);
    const closeTagBtn = displayTags(inputValue, filteredRecipes);

    uncheckFilter.addEventListener("click", () => {
      document.querySelector(".activeFilterDiv").className = "";
      document.querySelector(".uncheckFilter").remove();
      removeTag(document.getElementById(`${clickedListItem.firstChild.textContent}`).parentElement, recipes);
      toggleFiltersList(filters, "hide");
      handleFilterFunction("", recipes);
    });
    closeTagBtn.addEventListener("click", (event) => {
      document.querySelector(".activeFilterDiv").className = "";
      document.querySelector(".uncheckFilter").remove();
      removeTag(event.target.parentElement, recipes);
      handleFilterFunction("", recipes);
    });
    toggleFiltersList(filters, "hide");
    return filteredRecipes;
  }
};

const initializeIngredients = (recipes) => {
  const ingredientsList = document.querySelector("#ingredientsList");
  const inputIngredient = document.querySelector("#inputIngredient");
  ingredientsList.innerHTML = "";

  inputIngredient.addEventListener("input", () => {
    const searchValue = inputIngredient.value.toLowerCase().trim();
    const filteredIngredients = searchIngredient(
      searchValue,
      service.getIngredientsList(recipes),
    );
    displayFilteredList(filteredIngredients, ingredientsList);
  });

  displayFilteredList(service.getIngredientsList(recipes), ingredientsList);
};

const initializeAppliances = (recipes) => {
  const appliancesList = document.querySelector("#devicesList");
  const inputAppareil = document.querySelector("#inputAppareil");
  appliancesList.innerHTML = "";

  inputAppareil.addEventListener("input", () => {
    const searchValue = inputAppareil.value.toLowerCase().trim();
    const filteredAppliances = searchAppliance(
      searchValue,
      service.getAppliancesList(recipes),
    );
    displayFilteredList(filteredAppliances, appliancesList);
  });

  displayFilteredList(service.getAppliancesList(recipes), appliancesList);
};

const initializeUstensils = (recipes) => {
  const ustensilesList = document.querySelector("#ustensilesList");
  const inputUstensile = document.querySelector("#inputUstensile");
  ustensilesList.innerHTML = "";

  inputUstensile.addEventListener("input", () => {
    const searchValue = inputUstensile.value.toLowerCase().trim();
    const filteredUstensils = searchUstensil(
      searchValue,
      service.getUstensilsList(recipes),
    );
    return displayFilteredList(filteredUstensils, ustensilesList);
  });

  return displayFilteredList(service.getUstensilsList(recipes), ustensilesList);
};

export const initializeFilters = (recipes) => {
  initializeIngredients(recipes);
  initializeAppliances(recipes);
  initializeUstensils(recipes);
};

export const displayFilteredList = (filteredList, listContainer) => {
  listContainer.innerHTML = "";
  filteredList.forEach((item) => {
    const div = document.createElement("div");
    const p = document.createElement("p");
    p.innerText = item;
    div.appendChild(p);
    listContainer.appendChild(div);

    listContainer.addEventListener("click", (event) => {
      console.log(event.target);
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

export const noResults = (word) => {
  noResultsDiv.textContent = `Aucune recette ne contient ${word}. Vous pouvez chercher «tarte aux pommes» , «poisson»`;
};

export const handleCancel = (recipes) => {
  searchBar.value = "";
  cancelBtn.classList.remove("visible");
  if (noResultsDiv.textContent) {
    noResultsDiv.textContent = "";
  }
  return initialize(recipes);
};

export const displayTags = (inputValue) => {
  const tagDiv = document.querySelector("#divTags");

  const tagButton = document.createElement("button");
  const tagMiniDiv = document.createElement("div");
  const closeButton = document.createElement("img");
  tagMiniDiv.className = "miniDivTag";
  closeButton.className = "closeBtnTag";
  closeButton.src = "./images/cross.svg";
  tagButton.className = "tag";
  tagButton.textContent = inputValue;
  tagButton.id = inputValue;
  tagDiv.appendChild(tagMiniDiv);
  tagMiniDiv.appendChild(tagButton);
  tagMiniDiv.appendChild(closeButton);

  return closeButton;
};

const removeTag = (tag, recipes) => {
  tag.innerHTML = "";
  initialize(recipes);
};
