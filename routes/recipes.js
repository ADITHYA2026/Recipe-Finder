import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  const ingredient = req.query.ingredient;
  if (!ingredient) return res.status(400).json({ error: "Ingredient required" });

  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );

    const meals = response.data.meals || [];

    const recipes = meals.map(meal => ({
      id: meal.idMeal,
      name: meal.strMeal,
      image: meal.strMealThumb,
      link: `https://www.themealdb.com/meal/${meal.idMeal}`
    }));

    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

export default router;
