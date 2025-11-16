// Get recipe id from URL
const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");

fetch("recipes.json")
  .then(res => res.json())
  .then(recipes => {
    const recipe = recipes.find(r => r.id === recipeId);

    if (!recipe) {
      document.querySelector("main").innerHTML = "<h2>Recipe not found.</h2>";
      return;
    }

    // Fill in main content
    document.getElementById("recipeImage").src = recipe.image;
    document.getElementById("recipeImage").alt = recipe.title;

    document.getElementById("recipeTitle").textContent = recipe.title;
    document.getElementById("recipeDescription").textContent = recipe.description;

    // Ingredients
    const ingredientsList = document.getElementById("ingredientsList");
    ingredientsList.innerHTML = recipe.ingredients
      .map(item => `<li>${item}</li>`)
      .join("");

    // Directions
    const directionsList = document.getElementById("directionsList");
    directionsList.innerHTML = recipe.instructions
      .map(step => `<p>${step}</p>`)
      .join("");
  })
  .catch(err => console.error("Error loading recipe:", err));