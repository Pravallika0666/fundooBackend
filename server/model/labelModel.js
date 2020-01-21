const mongoose=require('mongoose')
mongoose.set('useFindAndModify',false)

var Schema=mongoose.Schema
const labelModel=new Schema({
    userId:{
        type:String,
        required:true
    },
    noteName:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})

exports.label=mongoose.model("labels",labelModel)