const Product = require("../models/Product");
const SearchUtil = require("../utils/SearchHelper");

class ProductController {
    static async CreateNewProduct(req, res) {
        try {
            const { name, price, preview_img, category, description, details, inStock } = req.body;
            
            const productHighlight1 = req.body.highlight1
            const productHighlight2 = req.body.productHighlight2
            const productHighlight3 = req.body.productHighlight3
            const productHighlight4 = req.body.productHighlight4
            const productHighlight5 = req.body.highlight5

            // const HighlightModel = [];

            // HighlightModel.push(productHighlight1);
            // HighlightModel.push(productHighlight2);
            // HighlightModel.push(productHighlight3);

            const productModel = {
                name: name,
                price: price,
                preview_img: preview_img,
                category: category,
                description: description,
                details: details,
                inStock: inStock
            }

            const newProduct = await Product.create(productModel);
            await Product.updateOne({"_id": newProduct._id}, 
            {
                $push: { highlights: req.body.highlight1 }
            }
            )
            await Product.bulkSave();
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
            const product = await Product.findOne({ "_id": productId });
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

    static async getAllProducts(req, res) {
        try {
            const products = await Product.find().sort({ "_id": -1 }).lean();
            if (!products) {
                return res.json({
                    status: 400,
                    message: "NO_RECORD_FOUND",
                });
            }
            else {
                return res.json({
                    status: 200,
                    message: "OK",
                    products: products
                });
            }
        } catch (error) {
            return res.json({
                status: 500,
                message: "INTERNAL_SERVER_ERROR",
                error: error.message
            });
        }
    }

    static async getOneProduct(req, res) {
        try {
            const { productId } = req.params;
            const product = await Product.findOne({ _id: productId });
            if (!product) {
                return res.json({
                    status: 400,
                    message: "NO_RECORD_FOUND",
                });
            }
            else {
                return res.json({
                    status: 200,
                    message: "OK",
                    product: product
                });
            }
        } catch (error) {
            return res.json({
                status: 500,
                message: "INTERNAL_SERVER_ERROR",
                error: error.message
            });
        }
    }

    static async Search(req, res, next) {
        try {
        const pageNo = req.query.pageNo ? parseInt(req.query.pageNo.toString()) - 1 : 0;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : 20;
        const productSearchResult = await SearchUtil.search(req.body, pageNo, pageSize);
        const totalCount = await SearchUtil.countSearch(req.body);
        return res.json({ 
            totalCount: totalCount, 
            records: productSearchResult, 
            pageNo: pageNo, 
            pageSize: pageSize 
        });
        } catch (error) {
            next(error.message);
        }
    }

    // Another search query
    static async SearchQuery(req, res, next) {
        try {
            const { key } = req.params;
            const data = await Product.find({
                "$or": [
                    { name: { $regex: key } },
                    { price: { $regex: key } },
                ]
            });

            return res.json({
                data: data
            });
        } catch (error) {
            next(error.message);
        }
    }
}

module.exports = ProductController;
