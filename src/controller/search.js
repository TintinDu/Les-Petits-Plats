import service from "../models/service.js";

const searchBar = document.querySelector('#search');
// pas d'export, le contrôleur import et appelle les fonctions

const recipes =  await service.getRecipes();

const initializeRecipes = async () => {
  service.displayRecipes(recipes);
  service.getRecipesNumbers(recipes);

  return recipes;
};


const filterRecipes = () => {
  // document.querySelector('.recipes-section').innerHTML = "";
  const word = searchBar.value;
  search(word);

  recipes.map((recipe) => {

    if (recipe.name.toLowerCase().includes(word)) {
      return recipe;
    }
  });
};


const search = (word) => {
  let results = [];

  if (searchBar.value.length >= 3){
    const recipe = filterRecipes(word, recipes);
    results.push(recipe);
  }

  console.log(results);
  return results;
};

searchBar.addEventListener('keyup', filterRecipes);




initializeRecipes();
