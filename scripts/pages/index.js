const getRecipesNumbers = recipes => {
  const numbersHeader = document.querySelector(".recipes-numbers");
  numbersHeader.textContent = `${recipes.length} RECETTES`;
};

export default getRecipesNumbers;