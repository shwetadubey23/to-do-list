const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');


const authantication = async (req, res, next) => {

    try{
        const {token}  = req.cookies  
        if(!token) {
            return res.status(404).send({status: false, msg: "Login first"})
        }
    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await userModel.findById(decodedToken._id)
    
    next()

    } catch(err) {
        return res.status(500).send({success: false, error: err.message })
    }
}


module.exports   =   {authantication}
