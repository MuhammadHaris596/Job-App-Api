    const express = require('express')
    const app = express()
    const mongoose = require('mongoose')
    const cookieParser = require('cookie-parser')


    //dotenv config
    require('dotenv').config()


    //db-connection
    mongoose.connect(process.env.MONGODB_URL)
            .then(() => console.log('db connected'))
            .catch((err) => console.log(err))

    //middleware
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cookieParser())
    

    
    app.use('/',require('./routes/frontend'))
    app.use('/admin',require('./routes/admin'))
    app.use('/auth',require('./routes/auth'))




    //server-listen
    app.listen(process.env.PORT, () => {
        console.log(`server is running on port ${process.env.PORT}`)
    })



