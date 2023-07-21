import service from "../models/service.js";

const searchBar = document.querySelector('#search');
const noResultsDiv = document.querySelector(".noResults");
const recipesSection = document.querySelector('.recipes-section');
const searchBtn = document.querySelector('.searchBtn');
// pas d'export, le contrôleur import et appelle les fonctions

const recipes =  await service.getRecipes();
let ingredients = [];
let ustensils = [];
let appliances = [];

let word;

const initializeRecipes = async (recipes) => {
  service.displayRecipes(recipes);
  service.getRecipesNumbers(recipes);
  ingredients = service.getIngredientsList(recipes);
  ustensils = service.getUstensilsList(recipes);
  appliances = service.getAppliancesList(recipes);

  return recipes;
};

const initializeIngredients = async (ingredients) => {
  ingredients.map((ingredient) => {
    const p = document.createElement("p");
    p.innerText = ingredient;
    document.querySelector("#ingredientsList").appendChild(p);

  });
};

const initializeAppliances = async (appliances) => {
  appliances.map((appliance) => {
    const p = document.createElement("p");
    p.innerText = appliance;
    document.querySelector("#devicesList").appendChild(p);

  });
};

const initializeUstensils = async (ustensils) => {
  ustensils.map((ustensile) => {
    const p = document.createElement("p");
    p.innerText = ustensile;
    document.querySelector("#ustensilesList").appendChild(p);

  });
};

initializeRecipes(recipes);
initializeIngredients(ingredients);
initializeAppliances(appliances);
initializeUstensils(ustensils);

const filterWithName = (word, recipe) => {
  return recipe.name.toLowerCase().includes(word);
};

const filterWithDescription = (word, recipe) => {
  return recipe.description.toLowerCase().includes(word);
};

const filterWithIngredients = (word, recipe) => {
  let results = [];
  recipe.ingredients.map((array) => {
    results = array.ingredient.toLocaleLowerCase().includes(word);
  });
  return results;
};

// const filterWithTags = () => {

// };

const noResults = (word) => {
  noResultsDiv.setAttribute("class","noResults");
  noResultsDiv.textContent = `Aucune recette ne contient ${word}. Vous pouvez chercher «tarte aux pommes» , «poisson»`;
};


const search = () => {
  let results = [];
  noResultsDiv.textContent = "";

  if (searchBar.value.length < 3) {
    noResultsDiv.textContent = "";
    initializeRecipes(recipes);
  }
  if (searchBar.value.length >= 3){
    noResultsDiv.textContent = "";
    recipesSection.innerHTML = "";
    word = searchBar.value;
    recipes.map((recipe) => {

      if (filterWithName(word, recipe) || filterWithDescription(word, recipe) || filterWithIngredients(word, recipe)) {
        results.push(recipe);
      }
    });
    initializeRecipes(results);
  }
  if(results.length === 0) {
    noResults(word);
    word = searchBar.value;
  }
  if(searchBar.value.length < 3) {
    noResultsDiv.textContent = "";
  }
};

searchBar.addEventListener('keyup', search);
searchBtn.addEventListener('click', search);

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
  switch (block) {
    case "ingredients":

      if (action === "display") {
        document.getElementById("filterIngredients").classList.add("active");
        document.getElementById("filterDevices").classList.remove("active");
        document.getElementById("filterUstensiles").classList.remove("active");
      }else if(action === "hide"){
        document.getElementById("filterIngredients").classList.remove("active");
      }
      break;
    case "devices":

      if (action === "display") {
        document.getElementById("filterDevices").classList.add("active");
        document.getElementById("filterIngredients").classList.remove("active");
        document.getElementById("filterUstensiles").classList.remove("active");
      }else if(action === "hide"){
        document.getElementById("filterDevices").classList.remove("active");
      }
      break;
    case "ustensiles":

      if (action === "display") {
        document.getElementById("filterUstensiles").classList.add("active");
        document.getElementById("filterIngredients").classList.remove("active");
        document.getElementById("filterDevices").classList.remove("active");
      }else if(action === "hide"){
        document.getElementById("filterUstensiles").classList.remove("active");
      }
      break;
  }
}




