const Services = require('../services/userServices')
const tokenGenerate = require('../middlewares/token')
require('dotenv').config()
/**********************************************************
 *  @desc Gets the input from front end pass to model
 *  @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
***********************************************************/
exports.register = (request, res) => {
    try {
        request.checkBody('firstName', 'firstname is invalid').notEmpty().isAlpha();
        request.checkBody('lastName', 'lastname is invalid').notEmpty().isAlpha();
        request.checkBody('email', 'email is invalid').isEmail().notEmpty();
        request.checkBody('password', 'password is invalid').notEmpty().len(7, 13);
        var error = request.validationErrors()
        var response = {}
        if (error) {
            response.error = error;
            response.success = false;
            res.status(422).send(response);
            console.log("error-register", error);
            console.log("Response", response)
        } else {
            Services.register(request, (err, data) => {
                if (err) {
                    response.success = false;
                    response.data = err;
                    res.status(500).send(response);
                } else {
                    response.success = true;
                    response.data = data;
                    res.status(200).send(response);
                }
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
