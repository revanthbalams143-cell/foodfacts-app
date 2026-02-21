import FoodCard from './FoodCard'

function FoodList({ products }) {
	if (products.length === 0) {
		return <p>No results found. Try a different search.</p>
	}

	return (
		<div className="food-list">
			{products.map((product, index) => (
				<FoodCard key={product.code || `${product.product_name || 'product'}-${index}`} product={product} />
			))}
		</div>
	)
}

export default FoodList
