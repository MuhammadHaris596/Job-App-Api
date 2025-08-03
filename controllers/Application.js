
const applicationModel = require('../models/Application')
const jobModel = require('../models/Jobs')



const applications = async(req,res)=>{

    

    const application = await applicationModel.find()
                                .populate('job',{title:1,description:1,image:1})
                                .populate('user',{fullname:1,email:1})
    res.json(application)
}

const addApplication = async(req,res)=>{
 try{

    //pass this job in frontend to receive the id of the job 
    const jobs = await jobModel.find()

    const {job} = req.body

    const existapplication = await applicationModel.findOne({job,user :  req.id})

      if(existapplication){
        return res.status(400).json({message : "You have already applied for this job"})
    }

    const application = new applicationModel({
        job,
        user : req.id,
        resume: req.file.path,
        resumeID: req.file.filename
    })

  

    await application.save()
    res.json(application)
 }catch(err){
     console.log(err)
     res.status(500).json({message : "Unsuccessfull", error: err.message})
 }
 }

const updateApplication = async(req,res)=>{
    const {id} = req.params

    try{

        const application = await applicationModel.findById(id)

        if(!application){
            return res.status(404).json({message : "Application not found"})
        }

        application.resume = req.file.path
        application.resumeID = req.file.filename

        await application.save()
        res.json(application)
        
    }catch(err){
        console.log(err)
        res.status(500).json({message : "Unsuccessfull", error: err.message})
    }
}


const deleteApplication = async(req,res)=>{


    const {id} = req.params

    try{
        const application = await applicationModel.findByIdAndDelete(id)
        res.json(application)
    }catch(err){
        console.log(err)
        res.status(500).json({message : "Unsuccessfull", error: err.message})
    }
}


module.exports = {applications,addApplication,updateApplication,deleteApplication}





