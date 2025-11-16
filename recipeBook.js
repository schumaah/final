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
            <h2>${recipe.title}</h2>
            <p>${recipe.description}</p>
          </a>
        `;

      container.appendChild(card);
    });
  });
