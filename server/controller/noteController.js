const noteServices = require('../services/noteServices')
/**********************************************************
 *  @desc Gets the input from front end pass to model
 *  @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
***********************************************************/
exports.addNote = (request, res) => {
    request.checkBody('title', 'title is invalid').notEmpty()
    request.checkBody('description', 'description is invalid').notEmpty()
    var error = request.validationError()
    var response = {}
    if (error) {
        response.error = error
        response.success = false
        res.status(422).send(response)
    }
    else {
        noteServices.addNote(request)
            .then((data) => {

                console.log("In conttoller");
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
        noteServices.getAllnote(request)
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
        var error = request.validationError()
        var response = {}
        if (error) {
            response.error = error;
            response.success = false;
            res.status(422).send(response)
        } else {
            noteServices.deleteNote(request)
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
exports.updateNote=(request,res)=>{
    try{
        let response={}
        noteServices.updateNote(request)
        .then((data)=>{
            response.status=true;
            response.data=data
            res.status(200).send(response)
        })
        .catch((err)=>{
            response.success=false;
            response.err=err
            res.status(404).send(response)
        })
    }catch(e){
        console.log(e)
    }
}