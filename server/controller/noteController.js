const Services = require('../services/noteServices')

/**********************************************************
 *  @desc Gets the input from front end pass to model
 *  @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
***********************************************************/
exports.addNote = (request, res) => {
    request.checkBody('title', 'title is invalid').notEmpty()
    request.checkBody('description', 'description is invalid').notEmpty()
    var error = request.validationErrors()
    var response = {}
    if (error) {
        response.error = error
        response.success = false
        res.status(422).send(response)
    }
    else {
        Services.addNote(request)
            .then((data) => {
                console.log("In controller");
                response.success = true;
                response.data = data
                res.status(200).send(response)
                console.log(response);

            })
            .catch((err) => {
                response.success = false;
                response.err = err
                res.status(404).send(response)

            })

    }
}
/**********************************************************
 *  @desc Gets the input from front end pass to model
 *  @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
***********************************************************/
exports.getAllnote = (request, res) => {
    try {
        let response = {}
        Services.getAllnote(request)
            .then((data) => {
                response.success = true;
                response.data = data
                res.status(200).send(response)
                console.log(response)
            })
            .catch((err) => {
                response.success = false;
                response.err = err
                res.status(404).send(response)
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
//exports delete note
exports.deleteNote = (request, res) => {
    try {
        request.checkBody('userId', 'userid is invalid').notEmpty()
        var error = request.validationErrors()
        var response = {}
        if (error) {
            response.error = error;
            response.success = false;
            res.status(422).send(response)
        } else {
            Services.deleteNote(request)
                .then((data) => {
                    response.success = true
                    response.data = data
                    res.status(200).send(response)
                })
                .catch((e) => {
                    response.success = false;
                    response.err = err
                    res.status(404).send(response)
                })
        }

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
//exports update note
exports.updateNote = (request, res) => {
    try {
        let response = {}
        Services.updateNote(request)
            .then((data) => {
                response.success = true;
                response.data = data
                res.status(200).send(response)
            })
            .catch((err) => {
                response.success = false;
                response.err = err
                res.status(404).send(response)
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
exports.getDeleteNote = (request, res) => {
    try {
        let response = {}
        Services.getDeleteNote(request)
            .then((data) => {
                response.success = true
                response.data = data
                res.status(200).send(response)
            })
            .catch((err) => {
                response.success = false;
                response.err = err
                res.status(400).send(response)
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
exports.addCollaborator = (request, res) => {
    try {
        let response = {}
        Services.addCollaborator(request)
            .then((data) => {
                response.success = true
                response.data = data
                res.status(200).send(response)
            })
            .catch((err) => {
                response.success = false
                response.err = err
                res.status(400).send(response)
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
        request.checkBody('noteId', 'noteid is invalid').notEmpty()
        let response = {}
        Services.getCollaborator(request)
            .then((data) => {
                response.success = true
                response.data = data
                res.status(200).send(response)
            })
            .catch((err) => {
                response.success = false
                response.err = err
                res.status(400).send(response)
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
//exports archive 
exports.archive = (request, res) => {
    try {
        let response = {}
        Services.archive(request)
            .then((data) => {
                console.log("dataa",data);
                
                response.success = true
                response.data = data
                res.status(200).send(response)
            })
            .catch((err) => {
                response.success = false
                response.err = err
                res.status(400).send(response)
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
//exports get archive note
exports.getArchiveNote = (request, res) => {
    try {
        let response = {}
        Services.getArchiveNote(request)
            .then((data) => {
                response.success = true
                response.data = data
                res.status(200).send(response)
            })
            .catch((err) => {
                response.success = false
                response.err = err
                res.status(400).send(response)
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
exports.addReminder = (request, res) => {
    try {
        let response = {}
        Services.addReminder(request)
            .then((data) => {
                response.success = true
                response.data = data
                res.status(200).send(response)
            })
            .catch((err) => {
                response.success = false
                response.err = err
                res.status(400).send(response)
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
//exports delete reminder
exports.deleteReminder = (request, res) => {
    try {
        let response = {}
        Services.deleteReminder(request)
            .then((data) => {
                response.success = true
                response.data = data
                res.status(200).send(response)
            })
            .catch((err) => {
                response.success = false
                response.err = err
                res.status(400).send(response)
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
//exports create label
exports.labelCreate=(request,res)=>{
    try{
        request.checkBody('labelName','noteName is invalid').notEmpty()
        let response={}
        Services.labelCreate(request)
        .then((data)=>{
            response.success=true
            response.data=data
            res.status(200).send(response)
        })
        .catch((err)=>{
            response.success=false
            response.err=err
            res.status(400).send(response)
        })
    }catch(err){
        console.log(err)
    }
}