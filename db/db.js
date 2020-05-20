
const Sequelize=require("sequelize");

module.exports= new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
  })
// module.exports=async()=>{
//     gig.sync()
// }