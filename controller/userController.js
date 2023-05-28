const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



// _____________________________________

const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        let userExist = await userModel.findOne({ email })
        if (userExist)
            return res.status(404).send({ success: false, message: "User Already Exist" });

        const hashedPassword = await bcrypt.hash(password, 10)
        userExist = await userModel.create({ name, email, password: hashedPassword })

        const token = jwt.sign({ _id: userExist._id }, process.env.JWT_SECRET)
        res.status(201).cookie("token", token, {
            httpOnly: true,
            maxAge: 15*60*1000,
            sameSite: process.env.NODE_ENV === "Development"? "lax":"none",
            secure: process.env.NODE_ENV === "Development"? false : true,
        }).send({ status: true, message: "Registered Successfully" })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

}

// __________________________________________________

const login = async (req, res) => {
    try {

        const { email, password } = req.body

        let checkEmail = await userModel.findOne({ email })
        if (!checkEmail) {
            return res.status(404).send({ status: false, message: "Email id not registered" })
        }

        const comparedPassword = await bcrypt.compare(password, checkEmail.password)
        if(!comparedPassword) 
        return res.status(404).send({status: false, message: "Invailid email or password"})
        const token = jwt.sign({ _id: checkEmail._id }, process.env.JWT_SECRET)

        res.status(200).cookie("token", token, {
            httpOnly: true,
            maxAge: 15*60*1000,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        }).send({ success: true, message: "Login Successfull" })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

}

const getAllUser = async (req, res) => {

try {

    res.status(200).send({ success: true, user: req.user })

} catch (err) {
    return res.status(500).send({success: false, error: err.message })
}

}

// ____________________________________________

const getMyProfile= async (req, res) => {

    const { email, password } = req.body;
    const userData = await userModel.findOne({ email })
    if (!userData)
        return res.status(404).send({ success: false, msg: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, userData.password)
    if(!isMatch) {
        return res.status(404).send({ success: false, msg: "Invalid email or password" });

    }
        res.status(200).send({ success: true, msg: `Welcome back, ${userData.name}` })

}


const logout =  (req, res) => {
res.status(200).cookie("token", "", {expires: new Date(Date.now()), 
sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
secure: process.env.NODE_ENV === "Development" ? false : true
})
.send({success: true, user: req.user})
}


module.exports = { register, login,  getMyProfile, getAllUser, logout }