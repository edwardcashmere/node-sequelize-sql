const Sequelize=require("sequelize");
const db=(require("../db/db"));

const Gig = db.define('gig', {
  title:{
      type: Sequelize.STRING
    },
  technology:{
      type:Sequelize.STRING
    },
  description:{
      type: Sequelize.TEXT
    },
  budget:{
      type:Sequelize.STRING
    },
  contact_email:{
      type:Sequelize.STRING
    }
  })
  


module.exports=Gig