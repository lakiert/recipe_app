import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./RecipeDetails.css";
import Logo from "./Logo";
import Navbar from "./Navbar";

//rd - recipe details

const recipeDetailsUrl =
  "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipeDetails() {
      try {
        const response = await fetch(`${recipeDetailsUrl}${id}`);
        const data = await response.json();
        if (data.meals) {
          setRecipe(data.meals[0]);
        }

        setIsLoading(false);
      } catch (error) {
        console.log("Error occured: ", error);
        setIsLoading(false);
      }
    }

    fetchRecipeDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="message">
        <p>Loading...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="message">
        <p>No recipe found.</p>
      </div>
    );
  }

  return (
    <div className="recipe-details">
      <nav>
        <Navbar></Navbar>
      </nav>
      <div className="rd-results">
        <div className="rd-the-meal">
          <img
            src={recipe.strMealThumb}
            alt={`image of ${recipe.strMeal}`}
            className="image-thumb"
          ></img>
          <h3>{recipe.strMeal}</h3>
          <h4>{recipe.strCategory}</h4>
        </div>

        <div className="rd-ingredients">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, vitae?
        </div>
        <div className="rd-instructions">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint eligendi
          impedit eos dolorum accusamus voluptatem ut iusto maiores eum
          doloremque.
        </div>
      </div>
    </div>
  );
}
