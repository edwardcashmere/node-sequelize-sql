const express=require("express");
const router=express.Router();
const db=require("../db/db");
const Gig=require("../models/Gigs");
const Sequelize=require("sequelize");
const Op=Sequelize.Op;
//get gigs list
router.get("/",async(req,res)=>{
 Gig.findAll()
 .then((jobs)=>{
 let data={
        gigs:jobs.map(data=>{
              return {
                     title:data.title,
                     technology:data.technology,
                     budget:data.budget,
                     description:data.description,
                     contact_email:data.contact_email
              }})
 }
 res.render('gig',{gigs:data.gigs})})
 .catch(err=>console.log(err))
});

//get form to add Gigs
router.get('/add',(req,res)=>{
       res.render('add')
});
//add gigs
router.post("/add",async(req,res)=>{

let {title,technology,description,budget,contact_email}=req.body;
let errors=[];
//check for errors
if(!title){
       errors.push({text:'please input a title'})
}
if(!technology){
       errors.push({text:'please input a technology'})
}
if(!description){
       errors.push({text:'please input a description'})
}
if(!contact_email){
       errors.push({text:'please input a contact_email'})
}
if(errors.length>0){
       res.render('add',{
              errors,
              title,
              technology,
              description,
              budget,
              contact_email})
}else{
       if(!budget){
              budget="unknown"
       }else{
              budget=`$${budget}`
       };
//make lowercase and remove space after coma
       technology=technology.toLowercase().replace(/, /g,',');
//insert data

Gig.create({title,technology,budget,description,contact_email})
.then(gig=>res.redirect("/gigs"))
.catch(err=>console.log(err.message))

}
});
router.get('/search',async(req,res)=>{
       let {term}=req.query;
        technology= await term.toLowerCase();


       Gig.findAll({
              where:{
                     technology:{[Op.like]:'%' + technology +'%'}
              }
       })
       .then(data=> {let jobs={
              job:data.map(object=>{
              return{
                     title:object.title,
                     description:object.description,
                     technology:object.technology,
                     budget:object.budget,
                     contact_email:object.contact_email

              }
       })};
       res.render('gig',{gigs:jobs.job});
 
       })
       .catch(err=>console.log(err.message))

});

 




module.exports=router