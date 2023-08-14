import {
  initialize,
  initializeFilters,
  handleSearch,
  handleCancel,
  handleApplianceSearch,
  handleIngredientSearch,
  handleUstensilSearch,
  handleTag,
  handleSelectedListElement,
  removeTag,
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

(async () => {

  const recipes = await initializeData();
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
        .querySelector(".cancelBtn").addEventListener("click", async () => {
          if (!(document.querySelector(".tag"))) {
            filteredRecipes = await handleCancel(recipes);
            updateFilterLists(filteredRecipes);
          } else {
            filteredRecipes = await handleCancel(filteredRecipes);
            updateFilterLists(filteredRecipes);
          }
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
  document
    .querySelector("#hideDevicesList")
    .addEventListener("click", () => {
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
    .querySelector("#ingredientsList")
    .addEventListener("click", async (event) => {
      const clickedListItem = event.target.closest("div");
      if (clickedListItem && clickedListItem.className !== "filterList") {
        let {closeTagBtn, newRecipes} = handleTag(
          filteredRecipes,
          event,
          handleIngredientFilter,
          "ingredients",
        );

        filteredRecipes = newRecipes;

        const filterId = handleSelectedListElement(
          event,
        );

        updateFilterLists(filteredRecipes);

        const activeFilterDiv = document.querySelector(`[data-filter-id="${filterId}"]`);
        if (activeFilterDiv) {
          activeFilterDiv.classList.add("activeFilterDiv");
          const uncheckFilter = document.createElement("img");
          uncheckFilter.src = "./images/roundedCross.svg";
          uncheckFilter.className = "uncheckFilter";
          activeFilterDiv.appendChild(uncheckFilter);
          if (uncheckFilter) {
            uncheckFilter.addEventListener("click", async () => {
              activeFilterDiv.classList.remove("activeFilterDiv");
              uncheckFilter.remove();
              const tagText = activeFilterDiv.querySelector("p").innerText.trim();
              filteredRecipes = await removeTag(document.getElementById(`${tagText}`).parentElement, filteredRecipes);
              toggleFiltersList("ingredients", "hide");
            });
          }
        }
        closeTagBtn.addEventListener("click", async (event) => {
          if(document.querySelector(".activeFilterDiv")){
            document.querySelector(".activeFilterDiv").className = "";
          }
          if(document.querySelector(".uncheckFilter")) {
            document.querySelector(".uncheckFilter").remove();
          }
          filteredRecipes = await removeTag(event.target.parentElement, filteredRecipes);
          toggleFiltersList("ingredients", "hide");
        });
      }
    });

  document
    .querySelector("#devicesList")
    .addEventListener("click", (event) => {
      const clickedListItem = event.target.closest("div");
      if (clickedListItem && clickedListItem.className !== "filterList") {
        let {closeTagBtn, newRecipes} = handleTag(
          filteredRecipes,
          event,
          handleApplianceFilter,
          "devices",
        );

        filteredRecipes = newRecipes;

        const filterId = handleSelectedListElement(
          event,
        );

        updateFilterLists(filteredRecipes);

        const activeFilterDiv = document.querySelector(`[data-filter-id="${filterId}"]`);
        if (activeFilterDiv) {
          activeFilterDiv.classList.add("activeFilterDiv");
          const uncheckFilter = document.createElement("img");
          uncheckFilter.src = "./images/roundedCross.svg";
          uncheckFilter.className = "uncheckFilter";
          activeFilterDiv.appendChild(uncheckFilter);
          if (uncheckFilter) {
            uncheckFilter.addEventListener("click", async () => {
              activeFilterDiv.classList.remove("activeFilterDiv");
              uncheckFilter.remove();
              const tagText = activeFilterDiv.querySelector("p").innerText.trim();
              filteredRecipes = await removeTag(document.getElementById(`${tagText}`).parentElement, filteredRecipes);
              toggleFiltersList("devices", "hide");
            });
          }
        }
        closeTagBtn.addEventListener("click", async (event) => {
          if(document.querySelector(".activeFilterDiv")){
            document.querySelector(".activeFilterDiv").className = "";
          }
          if(document.querySelector(".uncheckFilter")) {
            document.querySelector(".uncheckFilter").remove();
          }
          filteredRecipes = await removeTag(event.target.parentElement, filteredRecipes);
          toggleFiltersList("devices", "hide");
        });
      }}),

  document
    .querySelector("#ustensilesList")
    .addEventListener("click", (event) => {
      const clickedListItem = event.target.closest("div");
      if (clickedListItem && clickedListItem.className !== "filterList") {
        let {closeTagBtn, newRecipes} = handleTag(
          filteredRecipes,
          event,
          handleUstensilFilter,
          "ustensiles",
        );

        filteredRecipes = newRecipes;

        const filterId = handleSelectedListElement(
          event,
        );

        updateFilterLists(filteredRecipes);

        const activeFilterDiv = document.querySelector(`[data-filter-id="${filterId}"]`);
        if (activeFilterDiv) {
          activeFilterDiv.classList.add("activeFilterDiv");
          const uncheckFilter = document.createElement("img");
          uncheckFilter.src = "./images/roundedCross.svg";
          uncheckFilter.className = "uncheckFilter";
          activeFilterDiv.appendChild(uncheckFilter);
          if (uncheckFilter) {
            uncheckFilter.addEventListener("click", async () => {
              activeFilterDiv.classList.remove("activeFilterDiv");
              uncheckFilter.remove();
              const tagText = activeFilterDiv.querySelector("p").innerText.trim();
              filteredRecipes = await removeTag(document.getElementById(`${tagText}`).parentElement, filteredRecipes);
              toggleFiltersList("ustensiles", "hide");
            });
          }
        }
        closeTagBtn.addEventListener("click", async (event) => {
          if(document.querySelector(".activeFilterDiv")){
            document.querySelector(".activeFilterDiv").className = "";
          }
          if(document.querySelector(".uncheckFilter")) {
            document.querySelector(".uncheckFilter").remove();
          }
          filteredRecipes = await removeTag(event.target.parentElement, filteredRecipes);
          toggleFiltersList("ustensiles", "hide");
        });
      }}),

  document
    .querySelector("#inputIngredient")
    .addEventListener("input", () => {
      handleIngredientSearch(filteredRecipes);
      document.querySelector("#cancelIngredient").addEventListener("click", () => {
        document
          .querySelector("#inputIngredient").value = "";
      });
    });
  document
    .querySelector("#inputAppareil")
    .addEventListener("input", () => {
      handleApplianceSearch(filteredRecipes);
      document.querySelector("#cancelAppliance").addEventListener("click", () => {
        document
          .querySelector("#inputAppliance").value = "";
      });
    });
  document
    .querySelector("#inputUstensile")
    .addEventListener("input", () => {
      handleUstensilSearch(filteredRecipes);
      document.querySelector("#cancelUstensil").addEventListener("click", () => {
        document
          .querySelector("#inputUstensil").value = "";
      });
    });
})();

