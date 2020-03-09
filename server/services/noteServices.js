const noteModel = require('../model/noteModel')
const redisCache = require('../helper/redisCache')
const labelModels = require('../model/labelModel')
const collaboratorModel = require('../model/collaboratorModel')
const elasticSearch = require('../helper/elasticSearch')
/**********************************************************
 * @desc Gets the input from front end pass to model
 * @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
***********************************************************/
//exports add a note
exports.addNote = async (request) => {
    try {
        return new Promise(await ((resolve, reject) => {
            console.log(request.body, "ssssssssssssssssssssssssssss");

            let note = new noteModel.notes(request.body)

            note.save((err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                    //deleting notes from rediscache
                    redisCache.deleteRedisNote(request.decoded.payload.id, (err, data) => {
                        if (err) console.log('error while deleting from redis cache');
                        else console.log('Successfully deleted the notes', data);
                    })
                }
            })
        }))
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
//Gets all notes
exports.getAllnote = (request) => {
    try {
        return new Promise((resolve, reject) => {
            //get the notes from the redis cache
            redisCache.getRedisNote(request.decoded.payload.id, (err, data) => {
                if (data) {
                    resolve(data), console.log('Data in cache');
                    elasticSearch.document(data)
                }
                else {
                    //finds the notes by using user id of each user
                    noteModel.notes.find({ userId: request.decoded.payload.id }, (err, data) => {
                        if (data) {
                            resolve(data)
                            let cache = {}
                            cache.id = request.decoded.payload.id;
                            cache.notes = data
                            redisCache.setRedisNote(cache, (err, data) => {
                                if (data) console.log('Notes in cache', data),
                                    //Adding a elastic search document
                                    elasticSearch.document(data)
                                else console.log("Error in cache", err);
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
 * @desc Gets the input from front end pass to model
 * @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
***********************************************************/
//To delete the notes
exports.isTrash = (request) => {
    try {
        return new Promise((resolve, reject) => {
            //find the note by id and delete and update it
            console.log("uefgesfhielw", request.body);

            noteModel.notes.findByIdAndUpdate({ _id: request.body.noteId }, { $set: { isDeleted: request.body.isDeleted } }, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                    console.log("resulttttt", result);

                }
                //delete the notes from redis cache
                redisCache.deleteRedisNote(request.decoded.payload.id)
                console.log("Delete the notes redis cache and update the trash");
            })
        })
    }
    catch (e) {
        console.log(e)
    }
}
/**********************************************************
 * @desc Gets the input from front end pass to model
 * @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
***********************************************************/
//exports get delete note
exports.unTrash = (request) => {
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
 * @desc Gets the input from front end pass to model
 * @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
***********************************************************/
//exports update note
exports.updateNote = (request) => {
    try {
        return new Promise((resolve, reject) => {
            //find by id and update the note
            noteModel.notes.findByIdAndUpdate({ _id: request.body.noteId }, { $set: { title: request.body.title, description: request.body.description } }, (err, data) => {
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
 * @desc Gets the input from front end pass to model
 * @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
***********************************************************/
//exports archive
exports.archive = (request) => {
    try {
        return new Promise((resolve, reject) => {
            //set the notes to the archive
            noteModel.notes.findByIdAndUpdate({ _id: request.body.noteId }, { $set: { isArchived: request.body.isArchived } }, (err, result) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(result)
                }
            })
            redisCache.deleteRedisNote(request.decoded.payload.id)
            console.log("Delete the data from redis cache and update archive");
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
exports.getArchiveNote = async (request) => {
    try {
        return new Promise(await ((resolve, reject) => {
            //get archive notes by userId
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
        }))
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
//exports remainder
exports.addReminder = (request) => {
    try {
        return new Promise((resolve, reject) => {
            noteModel.notes.findOneAndUpdate({ _id: request.body.noteId }, { Reminder: request.body.Reminder }, (err, result) => {
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
            noteModel.notes.updateOne({ _id: request.body.noteId }, { $unset: { Reminder: "" } }, (err, result) => {
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
            labelDetails.save((err, data) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(data)
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
//exports get labels
exports.getLabels = async (request) => {
    try {
        return new Promise(await ((resolve, reject) => {
            labelModels.label.find({ userId: request.decoded.payload.id }, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    if (!data.length == 0) {
                        resolve(data)
                        console.log("resullt-->", data);

                    } else {
                        console.log("Notesssss");
                        reject("Nooo notes available")
                    }
                }
            })
        }))
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
//exports update label
exports.updateLabels = (request) => {
    try {
        return new Promise((resolve, reject) => {
            labelModels.label.updateOne({ _id: request.body._id }, { nameLabel: request.body.nameLabel }, (err, data) => {
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
 * @desc Gets the input from front end pass to model
 * @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
***********************************************************/
//exports delete label
exports.deleteLabels = (request) => {
    try {
        return new Promise((resolve, reject) => {
            labelModels.label.findOneAndDelete({
                _id: request.body._id,
                userId: request.decoded.payload.id
            }, (err, data) => {
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
 * @desc Gets the input from front end pass to model
 * @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
***********************************************************/
//exports add collaborator
exports.addCollaborator = (request) => {
    try {
        return new Promise((resolve, reject) => {
            if (request.decoded.payload.id != request.body.collaboratorEmail) {
                collaboratorModel.collaborator.findOne({ noteId: request.body.noteId }, (err, data) => {
                    // console.log("rrrrrr", request.body);
                    if (err || data == null) {
                        let newcollaborator = new collaboratorModel.collaborator({
                            "userId": request.decoded.payload.id,
                            "noteId": request.body.noteId,
                            "collaboratorEmail": request.body.collaboratorEmail
                        })
                        newcollaborator.save((err, data) => {
                            console.log("dataa1", data);
                            if (err) {
                                reject(err)
                            } else {
                                resolve(data)
                            }
                        })
                    } else {
                        console.log("Add on array");
                        if (data.collaboratorEmail.includes(request.body.collaboratorEmail)) {
                            console.log("data", data)
                            reject('Existing collaborator! Already exists');
                        } else {
                            collaboratorModel.collaborator.findOneAndUpdate({
                                "noteId": request.body.noteId
                            },
                                {
                                    $push: {
                                        "collaboratorEmail": request.body.collaboratorEmail
                                    }
                                }, (err, data) => {
                                    console.log("collaborator email", request.body.collaboratorEmail);

                                    if (err) {
                                        reject(err)
                                    } else {
                                        resolve(data)
                                    }
                                })
                        }
                    }
                })
            }
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
//exports delete collaborator
exports.deleteCollaborator = (request) => {
    try {
        return new Promise((resolve, reject) => {
            collaboratorModel.collaborator.deleteMany({ _id: request.decoded.payload.id }, (err, data) => {
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
 * @desc Gets the input from front end pass to model
 * @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
***********************************************************/
//exports get collaborator
exports.getCollaborator = (request) => {
    try {
        return new Promise((resolve, reject) => {
            collaboratorModel.collaborator.find({ _id: request.body.noteId }, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                    console.log("data", data)
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
exports.color = (request) => {
    try {
        console.log("requestcolor", request.body)
        return new Promise((resolve, reject) => {
            noteModel.notes.findOneAndUpdate({ _id: request.body.noteId }, { $set: { color: request.body.color } }, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    console.log("dataaaaaaaa", data);
                    resolve(data)
                }
            })
        })
    } catch (e) {
        console.log(e);

    }
}



// exports.search = (notes) => {
//     let getData = {
//         'userId': notes._id
//     };
//     let findData = {
//         'description': {
//             $regex: notes.key,
//             $options: 'i'
//         }
//     }
//     let array = [];
//     return new Promise((resolve, reject) => {
//         noteModel.notes.find(notes, (err, data) => {
//             if (data) {
//                 data.forEach((element) => {
//                     if (element.userId === notes.userId) {
//                         array.push(element);
//                     }
//                 })
//                 let reversedArray = array.reverse();
//                 resolve(reversedArray);
//             }
//             else {
//                 reject(err)
//             }
//         })
//     })
// }
/**********************************************************
 * @desc Gets the input from front end pass to model
 * @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
***********************************************************/
exports.search = (getData) => {
    return new Promise((resolve, reject) => {
        noteModel.notes.findOne({
            $or: [{
                'title': {
                    $regex: getData.key,
                    $options: 'i'
                }
            },
            {
                'description': {
                    $regex: getData.key,
                    $options: 'i'
                }
            }
            ]
        }, (err, data) => {
            if (data !== null) {
                resolve(data)
                console.log("dataaaaa", data);
            }
            else {
                reject(err)
            }
        }).catch((err) => {
            console.log(err);

        })
    })
}
