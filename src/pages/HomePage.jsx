import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import FoodList from '../components/FoodList'
import ErrorMessage from '../components/ErrorMessage'
import useFoodSearch from '../hooks/useFoodSearch'

function HomePage() {
	const { results, loading, error, searchFood } = useFoodSearch()
	const [hasSearched, setHasSearched] = useState(false)

	const handleSearch = async (query) => {
		setHasSearched(true)
		await searchFood(query)
	}

	return (
		<div className="page">
			<h2>Search Nutrition Info</h2>
			<SearchBar onSearch={handleSearch} />
			{loading && <p>Loading...</p>}
			{!loading && error && <ErrorMessage message={error} />}
			{!loading && !hasSearched && !error && <p>Search for a food above to see its nutrition info.</p>}
			{!loading && hasSearched && !error && <FoodList products={results} />}
		</div>
	)
}

export default HomePage
