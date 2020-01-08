const mongoose = require('mongoose')
const noteModel = require('../model/noteModel')
/**********************************************************
 *  @desc Gets the input from front end pass to model
 *  @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
***********************************************************/
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
/**********************************************************
 *  @desc Gets the input from front end pass to model
 *  @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
***********************************************************/
exports.getAllnote = (request) => {
    try {
        return new Promise((resolve, reject) => {
            let noteDetails = new noteModel.notes({
                "userId": request.decoded.payload.id,
                "title": request.body.title,
                "description": request.body.description
            })
            noteDetails.save((err, data) => {
                if (data) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })
        })
    } catch (e) {
        console.log(e)
    }
}
/**********************************************************
 *  @desc Gets the input from front end pass to model
 *  @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
***********************************************************/
exports.deleteNote = (request) => {
    try {
        return new Promise((resolve, reject) => {
            noteModel.notes.findByIdAndUpdate({ _id: request.body.userId }, { isDeleted: true }, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
    catch (e) {
        console.log(e)
    }
}