const noteServices=require('../services')

exports.addNote=(request,res)=>{
    request.checkBody('title','title is invalid').notEmpty()
    request.checkBody('description','description is invalid').notEmpty()
    var error=request.validationError()
    var response={}
    if(error){
        response.error=error
        response.success=false
        res.status(422).send(response)
    }
    else{
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