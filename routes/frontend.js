const express = require('express')
const Router = express.Router()
const upload = require('../middleware/Cloudinary')


//Include Model files
const {allJobs,SearchByJob} = require('../controllers/Jobs')
const {addApplication,updateApplication,deleteApplication} = require('../controllers/Application')
const verifyToken  = require('../middleware/loggedIn')

//Jobs

Router.get('/jobs',verifyToken,allJobs)

//Applications
Router.post('/add-application',upload.single('resume'),verifyToken,addApplication)
Router.put('/update-application/:id',upload.single('resume'),verifyToken,updateApplication)
Router.delete('/delete-application/:id',verifyToken,deleteApplication)


//search by Job

Router.get('/search',verifyToken,SearchByJob)

module.exports = Router