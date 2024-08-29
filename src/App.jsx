import { useEffect, useState } from 'react'
import './App.css'
import Card from './Components/Card'


const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");

  async function searchRecipes(){
    if (query.length > 0){
      try{
        setIsLoading(true);
        const url = apiUrl + query;
        const response = await fetch(url);
        const data = await response.json();
  
        setRecipes(data.meals);
        setIsLoading(false);
      }
      catch(error){
        console.log(`Error occured: ${error}`);
        setIsLoading(false);
      }
    }

  }

  useEffect(() => {
    searchRecipes();
  }, [query])

  return (
    <>
      <div className='search-field'>
        <div>
          <input type="text" placeholder='Search for recipes...' value={query} onChange={(e) => {setQuery(e.target.value)}}/>
        </div>
        <h2>Find your next delicious meal.</h2>
      </div>

      <div className='resultsContainer'>
        {recipes && 
        recipes.map((recipe) => (
          <Card key={recipe.idMeal} foodName={recipe.strMeal} category={recipe.strCategory} imgSource={recipe.strMealThumb}></Card>
        ))}
      </div>


    </>
  )
}

export default App
