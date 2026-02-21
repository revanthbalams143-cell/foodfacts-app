import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { useNavigate } from 'react-router-dom'

function FoodCard({ product }) {
	const navigate = useNavigate()
	const { product_name, brands, nutriments, image_small_url } = product
	const productId = product.id || product.code

	const handleClick = () => {
		if (productId) {
			navigate(`/product/${productId}`, { state: { product: { ...product, id: productId } } })
		}
	}

	return (
		<Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
			<CardActionArea onClick={handleClick} sx={{ flexGrow: 1 }}>
				{image_small_url && (
					<CardMedia
						component="img"
						height="140"
						image={image_small_url}
						alt={product_name || 'Unknown Product'}
						sx={{ objectFit: 'contain', p: 1 }}
					/>
				)}
				<CardContent>
					<Typography variant="h6" gutterBottom>
						{product_name || 'Unknown Product'}
					</Typography>
					<Typography variant="body2" color="text.secondary" gutterBottom>
						{brands || 'Unknown Brand'}
					</Typography>
					{nutriments?.['energy-kcal_100g'] && (
						<Chip
							label={`${Math.round(nutriments['energy-kcal_100g'])} kcal / 100g`}
							size="small"
							color="primary"
							variant="outlined"
						/>
					)}
				</CardContent>
			</CardActionArea>
		</Card>
	)
}

export default FoodCard
