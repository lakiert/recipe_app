import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./RecipeDetails.css";

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

  if (isLoading){
    return <div>Loading...</div>
  }

  if(!recipe){
    return <div>No recipe found.</div>
  }

  return (
    <>
      <div className="rd-header">
        <img src="../src/img/logo.png"></img>
      </div>
      <div className="rd-results">
        <div className="rd-the-meal">the meal</div>
        <div className="rd-the-descriptions">
          <div className="rd-ingredients">ingredients</div>
          <div className="rd-instructions">instructions</div>
        </div>
      </div>
    </>
  );
}
