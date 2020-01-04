const mongoose = require('mongoose')
const noteModel = require('../model/noteModel')

exports.addNote = (request) => {
    try {
        return new Promise((resolve, reject) => {
            let noteDetails = new noteModel.notes({
                "_userId": request.decoded.payload.id,
                "title": request.body.title,
                "description": request.body.description
            })
            noteDetails.save((err, data) => {
                if (data) {
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    } catch (e) {
        console.log(e)
    }
}
exports.getAllnote=(request)=>{
    try{
        return new Promise((resolve,reject)=>{
            let noteDetails=new noteModel.notes({
                "userId":request.decoded.payload.id,
                "title":request.body.title,
                "description":request.body.description
            })
            noteDetails.save((err,data)=>{
                if(data){
                    resolve(data)
                }else{
                    reject(err)
                }
            })
        })
    }catch(e){
        console.log(e)
    }
}