import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function DetailPage({ saved, dispatch }) {
	const { barcode } = useParams()
	const navigate = useNavigate()

	const [product, setProduct] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		let cancelled = false
		setLoading(true)
		setError(null)

		const fetchProduct = async () => {
			try {
				const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
				if (!cancelled) {
					if (response.data.status === 0 || !response.data.product) {
						setProduct(null)
						setError('Product not found.')
					} else {
						setProduct(response.data.product)
					}
					setLoading(false)
				}
			} catch {
				if (!cancelled) {
					setError('Could not load product details.')
					setLoading(false)
				}
			}
		}

		fetchProduct()

		return () => {
			cancelled = true
		}
	}, [barcode])

	const isSaved = saved.some((savedProduct) => savedProduct.code === barcode)

	const handleSaveToggle = () => {
		if (!product) {
			return
		}

		if (isSaved) {
			dispatch({ type: 'REMOVE', code: barcode })
		} else {
			dispatch({ type: 'ADD', product })
		}
	}

	if (loading) return <p>Loading product details...</p>
	if (error) return <p>{error}</p>
	if (!product) return <p>Product not found.</p>

	return (
		<div className="detail-page">
			<button onClick={() => navigate(-1)}>← Back</button>

			<div className="detail-header">
				{product.image_small_url ? (
					<img src={product.image_small_url} alt={product.product_name || 'Unknown Product'} className="food-image" />
				) : (
					<div className="food-image food-image-fallback">No image</div>
				)}
				<div>
					<h2>{product.product_name || 'Unknown Product'}</h2>
					<p className="brand">Brand: {product.brands || 'Unknown Brand'}</p>
				</div>
			</div>

			<div className="nutrition-table">
				<h3>Nutrition per 100g</h3>
				<p>Calories: {product.nutriments?.['energy-kcal_100g'] ?? 'N/A'} kcal</p>
				<p>Protein: {product.nutriments?.proteins_100g ?? 'N/A'} g</p>
				<p>Carbohydrates: {product.nutriments?.carbohydrates_100g ?? 'N/A'} g</p>
				<p>Fat: {product.nutriments?.fat_100g ?? 'N/A'} g</p>
				<p>Fiber: {product.nutriments?.fiber_100g ?? 'N/A'} g</p>
				<p>Sugars: {product.nutriments?.sugars_100g ?? 'N/A'} g</p>
			</div>

			<button onClick={handleSaveToggle}>{isSaved ? '★ Remove from Saved' : '☆ Save to My List'}</button>
		</div>
	)
}

export default DetailPage
