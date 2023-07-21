import service from "../models/service.js";

const searchBar = document.querySelector('#search');
// pas d'export, le contrôleur import et appelle les fonctions

const recipes =  await service.getRecipes();
let word;

const initializeRecipes = async (recipes) => {
  service.displayRecipes(recipes);
  service.getRecipesNumbers(recipes);

  return recipes;
};

initializeRecipes(recipes);

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


const search = () => {
  let results = [];

  if (searchBar.value.length >= 3){
    document.querySelector('.recipes-section').innerHTML = "";
    word = searchBar.value;
    recipes.map((recipe) => {

      if (filterWithName(word, recipe) || filterWithDescription(word, recipe) || filterWithIngredients(word, recipe)) {
        results.push(recipe);
      }
    });
    initializeRecipes(results);
    console.log(results);
  }

};

searchBar.addEventListener('keyup', search);




