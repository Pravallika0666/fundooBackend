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
                "userId": request.decoded.payload.id,
                "title": request.body.title,
                "description": request.body.description
            })
            noteDetails.save((err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                    redisCache.deleteRedisNote(request.decoded.payload.id, (err, data) => {
                        if (err) console.log('err in deleting cache');
                        else console.log('deleted the cached notes', data);
                    })
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
            //checking for data in cache
            redisCache.getRedisNote(request.decoded.payload.id, (err, data) => {
                if (data)
                    resolve(data), console.log('data found in cache');
                else {
                    // if cached data not found, check in database
                    console.log('data not found in cache-->moving to database', request.decoded.payload.id);

                    noteModel.notes.find({ userId: request.decoded.payload.id, isDeleted: false }, (err, data) => {
                        if (data) {
                            resolve(data)
                            //take the data from database and add the same to the cache
                            let cacheNotes = {}
                            cacheNotes.id = request.decoded.payload.id;
                            cacheNotes.notes = data
                            redisCache.setRedisNote(cacheNotes, (err, data) => {
                                if (data) console.log('cached the notes', data);
                                else console.log("error in caching notes", err);
                            })
                        } else {
                            reject(err)
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
            noteModel.notes.findByIdAndUpdate({ _id: request.decoded.payload.id }, { isDeleted: true }, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
                cacheNotes.deleteRedisNote(request.decoded.payload.id)
                console.log("Data delete from redies cache to update the archive");
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
            noteModel.notes.findByIdAndUpdate({ _id: request.body._id }, { title: request.body.title, description: request.body.description }, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
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
            noteModel.notes.find({ userId: request.decoded.payload.id, isDeleted: true, isArchived: false }, (err, result) => {
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