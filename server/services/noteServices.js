const noteModel = require('../model/noteModel')
const redisCache = require('../helper/redisCache')
const labelModels = require('../model/labelModel')
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
            redisCache.getRedisNote(request.decoded.payload.id, (err, data) => {
                if (data)
                    resolve(data), console.log('data found in cache');
                else {

                    console.log('data not found in cache-->moving to database', request.decoded.payload.id);

                    noteModel.notes.find({ userId: request.decoded.payload.id }, (err, data) => {
                        if (data) {
                            resolve(data)
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
            noteModel.notes.findByIdAndUpdate({ _id: request.decoded.payload.id }, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
                redisCache.deleteRedisNote(request.decoded.payload.id)
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
            noteModel.notes.find({ userId: request.decoded.payload.id }, (err, result) => {
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
/**********************************************************
 *  @desc Gets the input from front end pass to model
 *  @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
***********************************************************/
//exports add collaborator 
exports.addCollaborator = (request) => {
    try {
        return new Promise((resolve, reject) => {
            noteModel.notes.find({ userId: request.decoded.payload.id }, (err, result) => {
                if (err) {
                    reject(err)
                }
                else {
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
//exports get collaborator
exports.getCollaborator = (request) => {
    try {
        return new Promise((resolve, reject) => {
            noteModel.notes.find({ _id: request.decoded.payload.noteId }, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    } catch (err) {
        console.log(err)
    }
}
/**********************************************************
 * @desc Gets the input from front end pass to model
 * @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
***********************************************************/
//exports archive
exports.archive = (request) => {
    try {
        return new Promise((resolve, reject) => {
            noteModel.notes.findByIdAndUpdate({ _id: request.body.noteId }, { $set: { isArchived: request.body.isArchived } }, (err, result) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(result)
                }
            })
            redisCache.deleteRedisNote(request.decoded.payload.id)
            console.log("Data delete from redies cache to update the archive");
        })
    } catch (e) {
        console.log(e)
    }
}
/**********************************************************
 * @desc Gets the input from front end pass to model
 * @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
***********************************************************/
//exports get archive note
exports.getArchiveNote = (request) => {
    try {
        return new Promise((resolve, reject) => {
            noteModel.notes.find({ userId: request.decoded.payload.id }, (err, result) => {
                if (err) {
                    reject(err)
                }
                else {
                    if (!result.length == 0) {
                        resolve(result)
                        console.log("resullt-->", result);

                    } else {
                        console.log("No Notes");
                        reject("No Notes")
                    }
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
//exports remainder
exports.addReminder = (request) => {
    try {
        return new Promise((resolve, reject) => {
            noteModel.notes.findOneAndUpdate({ userId: request.decoded.payload.id }, { $set: { Reminder: request.body.Reminder } }, (err, result) => {
                if (err) {
                    reject(err)
                }
                else {
                    let response = {}
                    response.resolve = result;
                    console.log("resullt-->", result);
                    response.email = request.decoded.payload.email
                    resolve(response)
                }
            })
        })
    } catch (e) {
        console.log(e)
    }
}
/**********************************************************
 * @desc Gets the input from front end pass to model
 * @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
***********************************************************/
//exports delete reminder
exports.deleteReminder = (request) => {
    try {
        return new Promise((resolve, reject) => {
            noteModel.notes.findOne({ _id: request.body.noteId }, { $unset: { Reminder: request.body.Reminder } }, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    } catch (e) {
        console.log(e);

    }
}
/**********************************************************
 * @desc Gets the input from front end pass to model
 * @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
***********************************************************/
//exports create label
exports.labelCreate = (request) => {
    try {
        return new Promise((resolve, reject) => {
            let labelDetails = new labelModels.label({
                "nameLabel": request.body.nameLabel,
                "userId": request.decoded.payload.id
            })

        })
    } catch (e) {
        console.log(e)
    }
}