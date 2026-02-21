function FoodCard({ product }) {
	const { product_name, brands, nutriments, image_small_url } = product

	return (
		<div className="food-card">
			{image_small_url ? (
				<img src={image_small_url} alt={product_name || 'Unknown Product'} className="food-image" />
			) : (
				<div className="food-image food-image-fallback">No image</div>
			)}
			{product_name ? <h2>{product_name}</h2> : <h2>Unknown Product</h2>}
			<p className="brand">Brand: {brands ? brands : 'Unknown Brand'}</p>
			<p>Calories: {nutriments?.['energy-kcal_100g'] ?? 'N/A'} kcal</p>
			<p>Protein: {nutriments?.proteins_100g ?? 'N/A'} g</p>
			<p>Carbs: {nutriments?.carbohydrates_100g ?? 'N/A'} g</p>
			<p>Fat: {nutriments?.fat_100g ?? 'N/A'} g</p>
		</div>
	)
}

export default FoodCard
