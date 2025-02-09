const jwt = require('jsonwebtoken');
const authMiddleware = (req,res,next) => {
   const accessToken = req.header('Authorization')
   const actualToken = accessToken?.split(' ')[1];
   console.log(actualToken);
   if(!actualToken){
    console.log('no token')
    return res.status(403).json({
        success: false,
        message: 'Access denied, no token provided'});
   }
   //decode the token 
   try {
      const decodedTokenInfo = jwt.verify(actualToken, process.env.JWT_SECRET)
      console.log("Decoded token: ",decodedTokenInfo);  
      req.user = decodedTokenInfo; //attaching the users details so that we can access them in the next middleware 
      next()
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: 'Access denied, invalid token'});
        }
} 

module.exports = authMiddleware;