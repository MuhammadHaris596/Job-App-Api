const isAdmin = (req,res,next)=>{
    if(req.role === 'admin'){
        return next()
    }else{
        // redirect to user dashbaord
    }
}

module.exports = isAdmin;
