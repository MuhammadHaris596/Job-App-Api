const express = require('express')
const upload = require('../middleware/Cloudinary')
const Router = express.Router()

const verifyToken  = require('../middleware/loggedIn')



//Include Model files
const {settings,saveSetting} = require('../controllers/Setting')
const {allJobs ,addJob ,updateJob , deleteJob,SearchByJob} = require('../controllers/Jobs')
const {index,users,addUser,updateUser,deleteUser,SearchByUser} = require('../controllers/Users')
const {applications} = require('../controllers/Application')


Router.get('/',verifyToken ,index) //for rendering the web page

// users
Router.get('/users',verifyToken ,users)

Router.post('/add-user',verifyToken ,addUser)

Router.put('/update-user/:id',verifyToken ,updateUser)

Router.delete('/delete-user/:id',verifyToken ,deleteUser)


// jobs
Router.get('/jobs',allJobs)

Router.post('/add-job',upload.single('image'),verifyToken ,addJob)

Router.put('/update-job/:id',upload.single('image'),verifyToken ,updateJob)

Router.delete('/delete-job/:id',verifyToken ,deleteJob)


// applications
Router.get('/applications',verifyToken ,applications)


// settings
Router.get('/settings',verifyToken ,settings)
Router.post('/add-setting',upload.single('web_Logo'),verifyToken ,saveSetting)



//search by Job
Router.get('/search',verifyToken,SearchByJob)


//search by user
Router.get('/searchByUser',verifyToken,SearchByUser)




module.exports = Router