import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import FoodCard from './FoodCard'

function FoodList({ products }) {
	if (products.length === 0) {
		return (
			<Typography color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
				No results found. Try a different search.
			</Typography>
		)
	}

	return (
		<Grid container spacing={3} sx={{ mt: 1 }}>
			{products.map((product, index) => {
				const productId = product.id || product.code || `${product.product_name || 'product'}-${index}`
				return (
					<Grid item xs={12} sm={6} md={4} key={productId}>
						<FoodCard product={{ ...product, id: productId }} />
					</Grid>
				)
			})}
		</Grid>
	)
}

export default FoodList
