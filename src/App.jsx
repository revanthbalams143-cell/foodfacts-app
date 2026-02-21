import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import FoodList from './components/FoodList'

function App() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (query) => {
    setHasSearched(true)
    setLoading(true)

    try {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&json=1&page_size=10`
      const response = await fetch(url)
      const data = await response.json()
      const filteredProducts = (data.products || []).filter(
        (product) => product.product_name && product.product_name.trim() !== '',
      )
      setResults(filteredProducts)
    } catch (error) {
      console.error('Something went wrong:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>🥗 FoodFacts</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {!loading && !hasSearched && <p>Search for a food above to see its nutrition info.</p>}
      {!loading && hasSearched && <FoodList products={results} />}
    </div>
  )
}

export default App
