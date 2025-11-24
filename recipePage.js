function renderDifficultyHats(level) {
  const max = 5;
  let hats = "";

  for (let i = 1; i <= max; i++) {
    const cls = i <= level ? "hat-filled" : "hat-empty";
    hats += `<span class="${cls}">🔪</span>`;
  }

  return `<div class="difficulty" aria-label="Difficulty: ${level} out of ${max}">
            ${hats}
          </div>`;
}

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

    // Image
    const imgEl = document.getElementById("recipeImage");
    imgEl.src = recipe.image;
    imgEl.alt = recipe.title;

    // Title + difficulty hats in header container
    const headerEl = document.getElementById("recipeHeader");
    if (headerEl) {
      headerEl.innerHTML = `
        <h1 id="recipeTitle">${recipe.title}</h1>
        ${renderDifficultyHats(recipe.difficulty || 1)}
      `;
    } else {
      // Fallback if header wrapper isn't present
      const titleEl = document.getElementById("recipeTitle");
      if (titleEl) {
        titleEl.innerHTML = `
          ${recipe.title} ${renderDifficultyHats(recipe.difficulty || 1)}
        `;
      }
    }

    // Description
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