import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Components/Card";
import RecipeDetails from "./Components/RecipeDetails"

const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");

  async function fetchRecipes(url) {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();

      if (data.meals) {
        setRecipes((prev) => [...prev, ...data.meals]);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(`Error occurred: ${error}`);
      setIsLoading(false);
    }
  }

  function showRandomPage(amount) {
    for (let i = 0; i < amount; i++) {
      fetchRecipes(randomUrl);
    }
  }

  function searchRecipes() {
    const url = apiUrl + query;
    fetchRecipes(url);
  }

  useEffect(() => {
    if (query.length === 0) {
      setRecipes([]);
      showRandomPage(20);
    } else {
      setRecipes([]);
      searchRecipes();
    }
  }, [query]);

  const uniqueRecipes = recipes.filter(
    (recipe, index, self) =>
      index === self.findIndex((r) => r.idMeal === recipe.idMeal)
  );

  return (
    <Router>
      <Routes>

        {/* Main page */}
        <Route
          path="/"
          element={
            <>
              <div className="search-field">
                <div>
                  <input
                    type="text"
                    placeholder="Search for recipes..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="query-input"
                  />
                </div>
                <h2>Find your next delicious meal.</h2>
              </div>

              <div className="results-container">
                {isLoading ? (
                  <div className="message">
                    <p>Loading...</p>
                  </div>
                ) : uniqueRecipes.length > 0 ? (
                  <div className="card-container">
                    {uniqueRecipes.map((recipe) => (
                      <Card
                        key={recipe.idMeal}
                        foodName={recipe.strMeal}
                        category={recipe.strCategory}
                        imgSource={recipe.strMealThumb}
                        idMeal={recipe.idMeal}
                      ></Card>
                    ))}
                  </div>
                ) : (
                  <div className="message">
                    <p>No recipes found.</p>
                  </div>
                )}
              </div>
            </>
          }
        ></Route>

        {/* Recipe details */}
          <Route path="/recipe/:id" element={<RecipeDetails/>}></Route>

      </Routes>
    </Router>
  );
}

