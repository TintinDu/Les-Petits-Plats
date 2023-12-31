import {
  filterRecipe,
  toggleFiltersList,
} from "./filterUtils.js";
import {
  searchIngredient,
  searchAppliance,
  searchUstensil,
  updateFilterLists,
  initializeData,
} from "./dataService.js";
import service from "../models/service.js";

const noResultsDiv = document.querySelector(".noResults");
const cancelBtn = document.querySelector(".cancelBtn");
const searchBar = document.querySelector("#search");

export const initialize = async (recipes) => {
  service.displayRecipes(recipes);
  return recipes;
};

export const handleSearch = (recipes) => {
  const searchValue = searchBar.value.toLowerCase().trim();
  noResultsDiv.textContent = "";
  cancelBtn.classList.add("visible");

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
  return filteredRecipes;
};

export const handleIngredientSearch = (recipes) => {
  const searchValue = document
    .querySelector("#inputIngredient")
    .value.toLowerCase()
    .trim();
  const cancelFilterBtn = document.querySelector("#cancelIngredient");
  searchValue ? cancelFilterBtn.classList.add("active") : cancelFilterBtn.classList.remove("active");
  const ingredientsList = document.querySelector("#ingredientsList");
  const filteredIngredients = searchIngredient(searchValue, service.getIngredientsList(recipes));
  return displayFilteredList(filteredIngredients, ingredientsList);
};

export const handleApplianceSearch = (recipes) => {
  const searchValue = document
    .querySelector("#inputAppareil")
    .value.toLowerCase()
    .trim();
  const cancelFilterBtn = document.querySelector("#cancelAppliance");
  searchValue ? cancelFilterBtn.classList.add("active") : cancelFilterBtn.classList.remove("active");
  const appliancesList = document.querySelector("#devicesList");
  const filteredAppliances = searchAppliance( searchValue, service.getAppliancesList(recipes));
  return displayFilteredList(filteredAppliances, appliancesList);
};

export const handleUstensilSearch = (recipes) => {
  const searchValue = document
    .querySelector("#inputUstensile")
    .value.toLowerCase()
    .trim();
  const cancelFilterBtn = document.querySelector("#cancelUstensil");
  searchValue ? cancelFilterBtn.classList.add("active") : cancelFilterBtn.classList.remove("active");
  const ustensilesList = document.querySelector("#ustensilesList");
  const filteredUstensils = searchUstensil(searchValue, service.getUstensilsList(recipes));
  return displayFilteredList(filteredUstensils, ustensilesList);
};

export const handleTag = (recipes, event, handleFilterFunction, filterType) => {
  const clickedListItem = event.target.closest("div");
  if (clickedListItem) {
    const inputValue = clickedListItem.textContent.trim();
    let newRecipes = handleFilterFunction(inputValue, recipes);
    const closeTagBtn = displayTags(inputValue, newRecipes);
    toggleFiltersList(filterType, "hide");
    return {closeTagBtn, newRecipes};
  }
};

export const handleSelectedListElement = (event) => {
  const clickedListItem = event.target.closest("div");
  if (clickedListItem) {
    const filterId = clickedListItem.getAttribute("data-filter-id");
    const uncheckFilter = document.createElement("img");
    uncheckFilter.src = "./images/roundedCross.svg";
    uncheckFilter.className = "uncheckFilter";
    clickedListItem.appendChild(uncheckFilter);
    clickedListItem.classList.add("activeFilterDiv");

    return filterId;
  }
};


const initializeIngredients = (recipes) => {
  const ingredientsList = document.querySelector("#ingredientsList");
  ingredientsList.innerHTML = "";

  displayFilteredList(service.getIngredientsList(recipes), ingredientsList);
};

const initializeAppliances = (recipes) => {
  const appliancesList = document.querySelector("#devicesList");
  appliancesList.innerHTML = "";

  displayFilteredList(service.getAppliancesList(recipes), appliancesList);
};

const initializeUstensils = (recipes) => {
  const ustensilesList = document.querySelector("#ustensilesList");
  ustensilesList.innerHTML = "";

  displayFilteredList(service.getUstensilsList(recipes), ustensilesList);
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
    div.setAttribute("data-filter-id", `${p.innerText}`);
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

export const removeTag = async (tag, recipes) => {
  tag.innerHTML = "";
  const filteredRecipes = initialize(recipes);
  updateFilterLists(recipes);

  if(!(document.querySelector(".tag"))&& (searchBar.value.length === 0)){
    const reinitializedRecipes = await initializeData();
    initialize(reinitializedRecipes);
    updateFilterLists(reinitializedRecipes);
    return reinitializedRecipes;
  }


  return filteredRecipes;

};
