const express = require("express") 
const app = express()
const dotenv = require("dotenv").config() 
const mongoose = require("mongoose")
const morgan = require('morgan')
const authController = require("./controllers/auth.js");
const indexController = require("./controllers/index.routes.js");
const partsController = require("./controllers/parts.js");
const session = require('express-session');
const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");
const methodOverride = require('method-override') // Method from Canvas

app.use(express.static('public')) 
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passUserToView)

// Database Connection Function
async function connectToDB(){ 
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch(error){
        console.log("Error Occurred",error)
    }
}


connectToDB() 














// Routes go here
app.use('/auth',authController)
app.use('/',indexController)


// PROTECTED ROUTES:
app.use(isSignedIn)
// Everything under the user NEEDS to be logged in to se
app.use('/parts', partsController)







app.listen(3000,()=>{
    console.log('App is working')
}) // Listen on Port 3000
