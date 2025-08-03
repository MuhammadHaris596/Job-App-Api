const jobModel = require('../models/Jobs')
const cloudinary = require('cloudinary').v2;
   const express = require('express')
     const app = express()

const allJobs = async(req, res) => {
   const jobsData = await jobModel.find()
   res.json(jobsData)
}

const addJob = async(req, res) => {
        try{
        
        
    
            if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is required" });
            }
      
        const {title,content,description} = req.body

        const job = new jobModel({
            title,
            content,
            description,
            image: req.file.path,
            imageID: req.file.filename    
        })

        await job.save()
        res.status(201).json({message : "Successfully added job"})
    }catch(err){
        console.log(err)
        res.status(500).json({message : "Unsuccessfull", error: err.message})
    }
}

const updateJob = async (req,res)=>{

    try{
        const {id} = req.params
        const {title,content,description} = req.body

        const job =  await jobModel.findById(id)

        job.title = title || job.title
        job.content = content|| job.content
        job.description = description || job.content

        if(req.file){
            if(job.imageID){
                await cloudinary.uploader.destroy(job.imageID)
                job.imageID = null
                job.image = null
            }

            job.image = req.file.path 
            job.imageID = req.file.filename
        }
        await job.save()
        res.json(job)
    }
    catch(err){
         console.error("🔥 Update Job Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }

}

const deleteJob = async(req,res)=>{
    const {id} = req.params

    try{
        const job = await jobModel.findByIdAndDelete(id)

        if(!job){
            return res.status(404).send('Job not found')
        }

        if(job.imageID){
            await cloudinary.uploader.destroy(job.imageID)
        }
        res.json(job)

    }
    catch(err){
        console.log(err)
        res.status(500).json('Internal Server Error')
    }
}

const SearchByJob = async (req,res)=>{
    const {searchQuery} = req.query

    const jobs = await jobModel.find({
        $or : [
            {title : {$regex : searchQuery , $options: 'i'}},
            {description : {$regex : searchQuery , $options : 'i'}}
        ]
    })

    res.json(jobs)
}


module.exports = {allJobs ,addJob ,updateJob , deleteJob , SearchByJob}