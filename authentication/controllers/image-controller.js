const Image = require('../models/image') 
const {uploadToCloudinary} = require('../helpers/cloudinary-helper')

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
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again.'
        })
    }
}


module.exports = {
    imageController
} 