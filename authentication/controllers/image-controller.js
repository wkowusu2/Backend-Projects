const Image = require('../models/image') 
const {uploadToCloudinary} = require('../helpers/cloudinary-helper')
const fs = require('fs')   
const cloudinary = require('../config/cloudinary') 

const imageController = async (req, res) => {
    try {
         //the request object will hold the file(filepath)
         //check if the file does not exist
         if(!req.file){
            return res.status(400).json({
                success: false,
                message: 'File is required. Please upload an image'
            })
         }
         //upload to cloudinary 
        //  console.log(req.file)
        //  console.log(req.user)
         const {url,publicId} = await uploadToCloudinary(req.file.path)
         console.log(url,publicId)
         //store the image url and publicId along with the uploaded userId in the database
         const newImage = new Image({
            url,
            publicId,
            uploadedBy: req.user.id
         })

         await newImage.save()
         res.status(200).json({
            success: true,
            message: 'Image saved successfully',
            image: newImage
         })
         fs.unlinkSync('/uploads')

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again.'
        })
    }
}

const getImagesController = async (req, res) => {
    const images = await Image.find({})
    if(!images) {
        return res.status(404).json({
            success: false,
            message: 'There is no image in the database'
        })
    }
    return res.status(200).json({
        success: true,
        data: images
    })
}

const deleteImageController = async (req,res) => {
    try {
        const getCurrentImageToBeDeleted = req.params.id
        const userId = req.user.id
        const image = await Image.findByIdAndDelete(getCurrentImageToBeDeleted)
        if(!image){
            return res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }

        //check if the image was uploaded by the current user who wants to delete it
        if(userId !== image.uploadedBy.toString()) {
            return res.status(401).json({
                success: false,
                message: 'You are not authorized to delete this image'
            });
        }

        //delete the image from cloudinary
        await cloudinary.uploader.destroy(image.publicId)

        //now delete from mongodb
        await Image.findByIdAndDelete(getCurrentImageToBeDeleted); 
        res.status(200).json({
            success: true,
            message: 'Image deleted successfully'
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again.'
        })
    }
}

module.exports = {
    imageController,
    deleteImageController,
    getImagesController
} 