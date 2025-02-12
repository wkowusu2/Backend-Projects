const express = require('express');
const router = express.Router(); 
const adminMiddleware = require('../middlewares/admin-middleware') 
const authMiddle = require('../middlewares/auth-middle')
const uploadMiddleware = require('../middlewares/upload-middleware');
const upload = require('../middlewares/upload-middleware');
const {imageController} = require('../controllers/image-controller')
const {changePassword} = require('../controllers/auth-controllers')
const {getImagesController} = require('../controllers/image-controller')


//getting all the images
router.get('/all-images',authMiddle, getImagesController)

//upload an image
//only an authenticated admin can upload images 
router.post('/upload', authMiddle, adminMiddleware,upload.single('image'),imageController)
//image is the fieldname in the frontend for the image upload
//changing images by user 
router.post('/change-password', authMiddle, changePassword)

module.exports = router