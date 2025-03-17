import ProductCreation from "./ProductCreation"
import ProductList from './ProductList.jsx'

const Product = () => {
    return (
        <div className="w-full h-[88vh] overflow-y-hidden flex bg-white rounded-lg">
            <div className="w-2/5 pt-2 pl-2">
                <ProductCreation />
            </div>
            <div className="w-3/5">
                <ProductList />
            </div>
        </div>
    )
}

export default Product
