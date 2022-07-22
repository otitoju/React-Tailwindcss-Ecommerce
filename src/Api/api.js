import { Products } from './Products_mock_data';

export async function getAllProducts() {
    try {
        return Products;
    } catch (error) {
        throw error;
    }
}

export async function getProductById(productId) {
    try {
        const product = await Products.filter((el) => {
            return el.id === productId;
        });
        return product[0];
    } catch (error) {
        throw error;
    }
}

export async function getProductByCategory(category) {
    try {
        const filteredProducts = await Products.filter(product => {
            return product.category == category;
        });
        return filteredProducts;
    } catch (error) {
        throw error;
    }
}
