const express =require('express');
const {engine}=require('express-handlebars')
const app=express()
const Handlebars=require('handlebars');
const methodOverride=require('method-override');
const morgan=require('morgan')
const {success,error,info}=require('consola')
const connectDb=require('./config/db')
const {PORT,NODE_ENV}=require('./config/index')
const errorHandler=require('./middlewares/errorhandling')
//router catch section starts here
const cookieparse=require('cookie-parser')
const vehicleRoute=require('./routes/vehicleRoute')
//router catch section ends here


//middleware section starts here



//method override


//middleware section ends here




//base url starts here

//base url ends here



//mount section starts here


//mount section ends here






//node js server starts here
let starsserver=async()=>{
    try {
        connectDb()
        if(NODE_ENV === "development"){
            app.use(morgan("dev"))
        }
        //mount route always above
        app.use(express.json({extended:true}))
        app.use('/api',vehicleRoute)
        app.use(express.urlencoded({extended:true}))
        
        app.use(cookieparse())
       //error middleware section always below
        app.use(errorHandler)
        app.listen(PORT,err=>{
            if(err) throw err;
            info(`web spider app running on ${PORT}`)
        })
    } catch (error) {
        
    }
}
starsserver()
//node js server ends here