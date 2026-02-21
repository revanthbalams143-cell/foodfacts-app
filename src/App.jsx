import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import FoodList from './components/FoodList'

function App() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (query) => {
    setLoading(true)

    try {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&json=1&page_size=10`
      const response = await fetch(url)
      const data = await response.json()
      const filteredProducts = (data.products || []).filter(
        (product) => product.product_name && product.product_name.trim() !== '',
      )
      setResults(filteredProducts)
    } catch (error) {
      console.error('Something went wrong:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>🥗 FoodFacts</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      <FoodList products={results} />
    </div>
  )
}

export default App
