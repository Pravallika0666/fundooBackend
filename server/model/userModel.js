const mongoose=require('mongoose')
var Schema=mongoose.Schema//schema represents how the data is being organised

const usersData = new Schema({
   firstName:{
       type:String,
       required:true
   },
   lastName:{
       type:String,
       required:true
   },
   email:{
       type:String,
       required:true
   },
   password:{
       type:String,
       required:true 
   },
   imageURl:{
       type:String
   }
}, {
    //returns specific event created at and modified at
    timestamps: true
})
exports.users= mongoose.model("users", usersData);
