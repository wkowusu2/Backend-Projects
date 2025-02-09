//check if the user's role is admin if not deny the request 
const adminMiddleware = (req,res,next) => {
    const userRole = req.user.role;
    if(userRole != 'admin'){
        res.status(401).json({
            success: false,
            message: 'Not authorized to access this page'
        })
    }
    next()
} 

module.exports = adminMiddleware;