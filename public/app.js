async function findRecipes() {
  const ingredients = document.getElementById("ingredients").value;
  const res = await fetch(`/api/recipes?ingredient=${encodeURIComponent(ingredients)}`);
  const data = await res.json();
  const results = document.getElementById("results");

  results.innerHTML = "";
  if (data.length === 0) {
    results.innerHTML = "<p>No recipes found</p>";
  } else {
    data.forEach(recipe => {
      results.innerHTML += `
        <div class="recipe">
          <img src="${recipe.image}" alt="${recipe.name}">
          <h3>${recipe.name}</h3>
          <a href="${recipe.link}" target="_blank">View Full Recipe</a>
        </div>
      `;
    });
  }
}
