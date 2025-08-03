const express = require('express')
const Router = express.Router()


const {Signup,Login,Logout} = require('../controllers/Auth')
const verifyToken  = require('../middleware/loggedIn')


Router.post('/signup',Signup)

Router.post('/login',Login)


Router.get('/logout',verifyToken,Logout)

module.exports = Router