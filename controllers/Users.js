const userModel = require('../models/User')


const index= async(req,res)=>{}

const  users = async(req, res) => {
    const users  = await userModel.find()
    res.json(users)
}


const addUser = async(req,res)=>{
  
    const {fullname,username,role,password} = req.body

   try{
    const user = new userModel(
        {
            fullname,
            username,
            password,
            role
        })

    await user.save()
    res.json(user)

   }catch(err){
       console.log(err)
       res.status(500).json({message: 'Internal Server Error'})
   }
}


const updateUser = async(req,res)=>{
    const {id} = req.params
    const {fullname,username,role,password} = req.body
    
    if(!id){
        return res.status(400).json({message: 'User id is required'})
    }

    try{
        const user = await userModel.findById(id)

        user.fullname = fullname || user.fullname
        user.username = username || user.username
        user.role = role || user.role
        user.password = password || user.password

        await user.save()
        res.json(user)
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal Server Error'})
    }
}


const deleteUser = async(req,res)=>{
    const {id} = req.params
    if(!id){
        return res.status(400).json({message: 'User id is required'})
    }
    try{
        const user = await userModel.findByIdAndDelete(id)
        res.json(user)
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal Server Error'})
    }
}


//search by user
const SearchByUser =async (req,res)=>{

    const {searchQuery} = req.query
    const user = await userModel.findOne({
        $or: [
            {fullname : {$regex: searchQuery , $options : 'i'}},
            {username : {$regex: searchQuery , $options : 'i'}},

        ]
    })
    res.json(user)
}


module.exports= {index,users,addUser,updateUser,deleteUser,SearchByUser}