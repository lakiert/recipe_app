import "./Card.css";
import { useNavigate } from "react-router-dom";

export default function Card({ imgSource, category, foodName, idMeal }) {
  const navigate = useNavigate();

  function showRecipeDetails(idMeal) {
    navigate(`/recipe/${idMeal}`, "_blank");
  }

  return (
    <div className="card">
      <div className="card-div-img">
        <img alt={`image of ${foodName}`} src={imgSource} onClick={() => showRecipeDetails(idMeal)}></img>
      </div>
      <div className="card-div-description">
        <h4>{category}</h4>
        <h3 onClick={() => showRecipeDetails(idMeal)}>{foodName}</h3>
        {/* <a href={`/recipe/${idMeal}`}>View Recipe</a> */}
      </div>
    </div>
  );
}
