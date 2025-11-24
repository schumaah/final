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
fetch("recipes.json")
  .then(res => res.json())
  .then(recipes => {
    const container = document.getElementById("recipeBook");

    recipes.forEach((recipe, index) => {
      const card = document.createElement("div");

      card.className = "recipe" + (index === 0 ? " first" : "");

      card.innerHTML = `
        <a href="recipe.html?id=${recipe.id}">
          <img src="${recipe.image}" alt="${recipe.title}">

          <div class="recipe-header">
            <h2>${recipe.title}</h2>
            ${renderDifficultyHats(recipe.difficulty || 1)}
          </div>

          <p>${recipe.description}</p>
        </a>
      `;

      container.appendChild(card);
    });
  });