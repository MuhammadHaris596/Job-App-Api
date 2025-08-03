const userModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


require('dotenv').config()

const Signup = async(req,res)=>{

    const {fullname,username,password} = req.body

    const user = new userModel({
        fullname,
        username,
        password
    })

    try{
        const savedUser = await user.save()
        res.json(savedUser)
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal Server Error'})
    }
}

const Login = async(req,res)=>{
    try{
        const {username,password} = req.body

        const user = await userModel.findOne({username})
        if(!user){
            return res.status(401).json({message: 'Invalid credentials'})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const tokenData = {
            userId: user._id,
            role: user.role,
            username: user.username,
            fullname: user.fullname
        }
       


        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.cookie('token', token, {
            httpOnly: true, 
            maxAge: 60 * 60 * 1000 
        });

        res.json({ message: 'Login successful' });
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal Server Error'})
    }
    }



const Logout = async(req,res)=>{
    res.clearCookie('token');
    // redirect to login page ,kicked the user out of the dashboard if he hit the api.
    res.json({ message: 'Logout successful' });
}


module.exports = {Signup,Login,Logout}