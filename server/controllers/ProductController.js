const Product = require("../models/Product");
const SearchUtil = require("../utils/SearchHelper");
const Review = require("../models/Review");
const Color = require("../models/ProductColor");
const Image = require("../models/ProductImage");
const Size = require("../models/ProductSize");

class ProductController {
    static async CreateNewProduct(req, res) {
        try {
            const { name, price, preview_img, category, description, details, inStock } = req.body;

            if(!name || !price || !preview_img || !category || !description || !details || !inStock) {
                return res.json({
                    status: 400,
                    message: "CREATED",
                    info: newProduct
                });
            }
            else {
                const productHighlight1 = req.body.highlight1
                const productHighlight2 = req.body.highlight2
                const productHighlight3 = req.body.highlight3
                const productHighlight4 = req.body.highlight4
                const productHighlight5 = req.body.highlight5
    
    
                const newProduct = await Product.create(req.body);
                await Product.updateOne({ _id: newProduct._id }, {
                    $push: {
                        highlights: [productHighlight1, productHighlight2, productHighlight3, productHighlight4, productHighlight5]
                    }
                });
    
                return res.json({
                    status: 201,
                    message: "CREATED",
                    info: newProduct
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
            const products = await Product.find().sort({ "_id": -1 }).lean().populate("reviews").populate("images").populate("colors").populate("sizes");
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

    static async getAllPublishedProducts(req, res) {
        try {
            const products = await Product.find({ "isPublished": true }).sort({ "_id": -1 }).lean().populate("reviews").populate("images").populate("colors").populate("sizes");
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

    // Product Review controller
    static async AddReview(req, res) {
        try {
            const { productId } = req.params;
            const productInfo = await Product.findOne({ _id: productId });
            if (!productInfo) {
                return res.json({
                    status: 404,
                    message: "NOT_FOUND"
                });
            }
            else {
                // Add review to the productId
                const { username, title, from, content, rating } = req.body;
                if (!username || !title || !from || !content) {
                    return res.json({
                        status: 400,
                        message: "NOT_ALLOWED"
                    });
                }
                else {
                    const reviewInfo = await Review.create(req.body);
                    const productReviews = productInfo.reviews;
                    productReviews.push(reviewInfo);
                    await productInfo.save();
                    return res.json({
                        status: 201,
                        message: "CREATED",
                        reviews: productReviews,
                        productInfo: productInfo
                    });
                }
            }

        } catch (error) {
            return res.json({
                status: 500,
                message: "INTERNAL_SERVER_ERROR",
                error: error.message
            });
        }
    }

    // Product Colors
    static async AddProductColor(req, res) {
        try {
            const { productId } = req.params;
            const productInfo = await Product.findOne({ _id: productId });
            if (!productInfo) {
                return res.json({
                    status: 404,
                    message: "NOT_FOUND"
                });
            }
            else {
                // Add colors
                const { name, className, selectedClass } = req.body;
                if (!name || !className || !selectedClass) {
                    return res.json({
                        status: 400,
                        message: "NOT_ALLOWED"
                    });
                }
                else {
                    const colorInfo = await Color.create(req.body);
                    const productColor = productInfo.colors;
                    productColor.push(colorInfo);
                    await productInfo.save();
                    return res.json({
                        status: 200,
                        message: "CREATED",
                    });
                }
            }
        } catch (error) {
            return res.json({
                status: 500,
                message: "INTERNAL_SERVER_ERROR",
                error: error.message
            });
        }
    }

    // Product Image
    static async AddProductImage(req, res) {
        try {
            const { productId } = req.params;
            const productInfo = await Product.findOne({ _id: productId });
            if (!productInfo) {
                return res.json({
                    status: 404,
                    message: "NOT_FOUND"
                });
            }
            else {
                // Add images
                const { src, alt } = req.body;
                if (!src || !alt) {
                    return res.json({
                        status: 400,
                        message: "NOT_ALLOWED"
                    });
                }
                else {
                    const imageInfo = await Image.create(req.body);
                    const productImage = productInfo.images;
                    productImage.push(imageInfo);
                    await productInfo.save();
                    return res.json({
                        status: 200,
                        message: "CREATED",
                    });
                }
            }
        } catch (error) {
            return res.json({
                status: 500,
                message: "INTERNAL_SERVER_ERROR",
                error: error.message
            });
        }
    }

    // Product Size
    static async AddProductSize(req, res) {
        try {
            const { productId } = req.params;
            const productInfo = await Product.findOne({ _id: productId });
            if (!productInfo) {
                return res.json({
                    status: 404,
                    message: "NOT_FOUND"
                });
            }
            else {
                // Add size
                const { name } = req.body;
                if (!name) {
                    return res.json({
                        status: 400,
                        message: "NOT_ALLOWED"
                    });
                }
                else {
                    const sizeInfo = await Size.create(req.body);
                    const productSize = productInfo.sizes;
                    productSize.push(sizeInfo);
                    await productInfo.save();
                    return res.json({
                        status: 200,
                        message: "CREATED",
                    });
                }
            }
        } catch (error) {
            return res.json({
                status: 500,
                message: "INTERNAL_SERVER_ERROR",
                error: error.message
            });
        }
    }
}

module.exports = ProductController;

// https://kb.objectrocket.com/mongo-db/mongoose-delete-many-by-id-932