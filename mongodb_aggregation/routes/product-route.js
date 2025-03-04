const express = require('express'); 
const { insertSampleData,getProductStats,getProductAnalysis } = require('../controllers/product-controller')

const router = express.Router(); 

router.post('/add',insertSampleData)
router.get('/stats', getProductStats)
router.get('/analysis', getProductAnalysis)

module.exports = router