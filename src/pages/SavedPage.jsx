import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import { removeItem } from '../store/savedSlice'

function SavedPage() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const savedItems = useSelector((state) => state.saved.items)

	if (savedItems.length === 0) {
		return (
			<Container maxWidth="lg" sx={{ py: 4 }}>
				<Typography variant="h4" gutterBottom>
					Saved Items
				</Typography>
				<Typography color="text.secondary">
					You haven't saved anything yet. Search for a food and save it from the detail page.
				</Typography>
			</Container>
		)
	}

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<Typography variant="h4" gutterBottom>
				Saved Items ({savedItems.length})
			</Typography>
			<Grid container spacing={3}>
				{savedItems.map((product) => (
					<Grid item xs={12} sm={6} md={4} key={product.id}>
						<Card>
							<CardContent>
								<Typography variant="h6" gutterBottom>
									{product.product_name || 'Unknown Product'}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{product.brands || 'Unknown Brand'}
								</Typography>
							</CardContent>
							<CardActions>
								<Button onClick={() => navigate(`/product/${product.id}`, { state: { product } })}>View Details</Button>
								<Button color="error" onClick={() => dispatch(removeItem(product.id))}>
									Remove
								</Button>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</Container>
	)
}

export default SavedPage
