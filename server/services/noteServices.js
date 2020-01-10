const mongoose = require('mongoose')
const noteModel = require('../model/noteModel')
const redisCache = require('../helper/redisCache')
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
                redisCache.deleteRedisNote(request.decoded.payload.id)
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
            redisCache.getRedisNote(request.decoded.payload.id, (err, data) => {
                if (data)
                    resolve(data),
                        console.log("Data in cache");
                else {
                    noteModel.notes.find({ _userId: request.decoded.payload.id, isDeleted: false, isArchive: false }, (err, result) => {
                        if (err) {
                            reject(err)
                        } else {
                            if (!result.length == 0) {  //this condition to check whether get note is empty or not
                                resolve(result)
                                console.log("resullt-->", result);
                                let valueCache = {};
                                valueCache.id = request.decoded.payload.id;
                                valueCache.result = result;
                                //this called to set Notes in cache.
                                redisCache.setRedisNote(valueCache, (err, data) => {
                                    if (data) {
                                        console.log("seted to cache");
                                    } else {
                                        console.log("not set in cache");
                                    }
                                })
                            } else {
                                console.log("NO Notes");
                                reject("No Notes")
                            }
                        }
                    })
                }

            })
        })
    } catch (e) {
        console.log(e);
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
/**********************************************************
 *  @desc Gets the input from front end pass to model
 *  @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
***********************************************************/
//exports update note
exports.updateNote = (request) => {
    try {
        return new Promise((resolve, reject) => {
            noteModel.notes.findByIdAndUpdate({ _id: req.body._id }, { title: req.body.title, description: req.body.description }, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
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
//exports get delete note
exports.getDeleteNote = (request) => {
    try {
        return new Promise((resolve, reject) => {
            noteModel.notes.find({ _userId: request.decoded.payload.id, isDeleted: true, isArchive: false }, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    if (!result.length == 0) {
                        resolve(result)
                        console.log('result------->', result)
                    }
                    else {
                        reject("No notes")
                    }
                }
            })
        })
    } catch (e) {
        console.log(e)
    }
}