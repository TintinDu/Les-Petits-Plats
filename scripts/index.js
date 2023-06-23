// filter / map / some pour la recherche avancée
// rester bien sur des tableaux
// pour chaque fonction lui passer les arguments et ne pas avoir plein de tableaux stockés en global

async function getRecipes() {

  const response = await fetch("./data/recipes.json");
  const data = await response.json();

  return data;
}

async function displayRecipes() {
  const recipes = await getRecipes();
  console.log(recipes);
}

displayRecipes();