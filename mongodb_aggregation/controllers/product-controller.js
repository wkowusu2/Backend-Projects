const Product = require("../models/Product");
const sampleProducts = require("../data"); 
 
const getProductStats = async (req, res) => {
    try {
        //getting products which are in stock 
        //and their prices are greater than or equal to 100
        const result = await Product.aggregate([{
            //stage 1
            $match: {
                inStock: true,
                price: {
                    $gte: 100,
                }
            },
                //stage 2
                //group documents
                $group: {
                    _id: "$category",
                    avgPrice: {
                        $avg: "$price"
                    },
                    count: {
                        $sum: 1
                    }
            }
        }])
    } catch (error) {
        res.status(401).json({
            success: false, 
            message: "Some error occurred"
        })
    }
}
const getProductAnalysis = async (req,res) => {
    try {
        const result = await Product.aggregate([
            {
                $match:{
                    category: "Electronics"
                }
            }, 
            {
                $group: {
                    _id: null, 
                    totalRevenue: {
                        $sum: "price"
                    },
                    averagePrice: {
                        $avg: "$price"
                    },
                    maxProductPrice: {
                        $max: "$price"
                    },
                    minProductPrice: {
                        $min: "$price"
                    },
                },
            },
            {
                $project:{
                    _id: 0,
                    totalRevenue: 0,
                    averagePrice: 1,
                    maxProductPrice: 1,
                    minProductPrice:1,
                    priceRange: {
                        $subtract: ["maxProductPrice","minProductPrice"]
                    }
                }
            }
        ])

        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "some error occurred"
        })
    }
}
const insertSampleData = async (req, res) => {
    try {
        const result = await Product.insertMany(sampleProducts);
        res.status(201).json({
            status: true, 
            message: "added successfully",
            data: `inserted ${result.length}`
        })
    } catch (error) {
        res.status(401).json({
            success: false, 
            message: "Some error occurred"
        });
    }
}
module.exports = {insertSampleData, getProductStats, getProductAnalysis};