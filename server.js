require('dotenv').config();
const express=require("express");
const app=express();
const path=require("path");
const bodyParser=require("body-parser");
const exhps=require("express-handlebars");
const PORT=process.env.PORT || 8000;
const Gigs=require("./routes/Gigs");
const gig=require("./models/Gigs");
const morgan=require("morgan");
//Database
const db=require("./db/db");
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.render("index",{layouts:'landing'});
})
app
//Gigs routes
app.use("/gigs",Gigs);
//handlebars
app.engine("handlebars",exhps({defaultLayout:"main"}));
app.set("view engine","handlebars");
app.use(express.static(path.join(__dirname,"public")));
// Option 1: Passing parameters separately

//run migrations
//migrate.sync()
//Test DB
(async()=>{
await gig.sync();
db.authenticate()
.then(()=>console.log('connected'))
.catch(err=>console.log('error' + err.message) );
app.listen(PORT,()=>{
    console.log(`server running on port${PORT}`)
})



})();


