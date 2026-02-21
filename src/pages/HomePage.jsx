import { useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
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
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<Typography variant="h4" gutterBottom fontWeight={800}>
				Search Nutrition Info
			</Typography>
			<Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
				Type any food name to see its nutrition facts.
			</Typography>
			<SearchBar onSearch={handleSearch} />
			{loading && (
				<Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
					<CircularProgress color="primary" />
				</Box>
			)}
			{!loading && error && <ErrorMessage message={error} />}
			{!loading && !hasSearched && !error && (
				<Typography color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
					Search for a food above to see nutrition info.
				</Typography>
			)}
			{!loading && hasSearched && !error && <FoodList products={results} />}
		</Container>
	)
}

export default HomePage
