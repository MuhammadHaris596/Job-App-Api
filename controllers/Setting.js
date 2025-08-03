const settingModel = require('../models/Setting')
const cloudinary = require('cloudinary').v2;


const settings = async(req,res)=>{
        const settingData = await settingModel.find()
        res.send(settingData)
}


const saveSetting = async(req,res)=>{
    const {web_Title,web_Footer} = req.body
    const file = req.file

    try{
        let setting = await settingModel.findOne()
       
        if(!setting){
            setting = new settingModel({
                web_Title,
                web_Footer,
                web_Logo: file.path,
                web_LogoID: file.filename
            })
        }

            setting.web_Title = web_Title || setting.web_Title
            setting.web_Footer = web_Footer || setting.web_Footer
           
        if(file){
            if(setting.web_LogoID){
                await cloudinary.uploader.destroy(setting.web_LogoID)
                setting.web_Logo = null
                setting.web_LogoID = null
            }
            
            setting.web_Logo= file.path
            setting.web_LogoID = file.filename
        }

        await setting.save()
        res.send(setting)

    }catch(err){
        console.log(err)
    }
}

module.exports = {settings,saveSetting}