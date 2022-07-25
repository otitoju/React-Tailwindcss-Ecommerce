const Product = require("../models/Product");

class ProductController {
    static async CreateNewProduct(req, res) {
        try {
            const {name, price, preview_img, categories, description,  details, } = req.body;

            const productHighlight1 = req.body.highlight1
            const productHighlight2 = req.body.productHighlight2
            const productHighlight3 = req.body.productHighlight3
            const productHighlight4 = req.body.productHighlight4
            const productHighlight5 = req.body.highlight5

            const HighlightModel = [productHighlight1, productHighlight2, productHighlight3, productHighlight4, productHighlight5];
            
            const productModel = {
                name: name,
                price: price,
                preview_img: preview_img,
                categories: categories,
                description: description,
                highlights: HighlightModel,
                details: details,
            }

            const newProduct = await Product.create(productModel);
            return res.json({
                status: 201,
                message: "CREATED",
                info: newProduct
            });
            
        } catch (error) {
            return res.json({
                status: 500,
                message: "INTERNAL_SERVER_ERROR",
                error: error.message
            });
        }
    }

    static async deleteProductWithCorrespondingAllRelationship(req, res, next) {
        try {
            const { productId } = req.params;
            const product = await Product.findOne({ "_id": productId});
            product.remove();
            
            return res.json({
                status: 200,
                message: "DELETED",
                product: product
            });

        } catch (error) {
            next(error)
            return res.json({
                status: 500,
                message: "INTERNAL_SERVER_ERROR",
                error: error.message
            });
        }
    }
}

module.exports = ProductController;