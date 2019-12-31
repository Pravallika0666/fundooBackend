const Services = require('../services/userServices')
const tokenGenerate = require('../middlewares/token')
const nodeMail=require('../middlewares/sendMailer')
require('dotenv').config()
/**********************************************************
 *  @desc Gets the input from front end pass to model
 *  @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
***********************************************************/
//exports register
exports.register = (request, res) => {
    try {
        request.checkBody('firstName', 'firstname is invalid').notEmpty().isAlpha();
        request.checkBody('lastName', 'lastname is invalid').notEmpty().isAlpha();
        request.checkBody('email', 'email is invalid').isEmail().notEmpty();
        request.checkBody('password', 'password is invalid').notEmpty().len(7, 13);
        request.checkBody('confirmpassword','confirmpassword is invalid').notEmpty().len(7, 13).equals(request.body.password);

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
//exports login
exports.login = (request, res) => {
    console.log("Login")
    request.checkBody('email', 'Email is invalid').isEmail().notEmpty();
    request.checkBody('password', 'Password is Invalid').notEmpty().len(7, 13);
    var error = request.validationErrors();
    var response = {};
    if (error) {
        response.error = error;
        response.success = false;
        res.status(422).send(response)
    } else {
        Services.login(request, (err, data) => {
            if (err) {
                response.success = false;
                response.data = err;

                res.status(404).send(response);
            } else {
                response.success = true;
                let data1 = []
                let newToken = tokenGenerate.generateToken({
                    "email": request.body.email,
                    "id": data._id
                })
                console.log("NEW TOKEN", newToken);

                let value = newToken.token;
                data1.push(newToken);
                data1.push(data)
                console.log("Generated token with paste login data--->", data1);
                response.data = data1
                res.status(200).send(response);
            }
        })
    }
}

/**********************************************************
 *  @desc Gets the input from front end pass to model
 *  @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
***********************************************************/
//exports forgotpassword
exports.forgotpassword=((request,res)=>{
    try {
        console.log('Forgot password')
            //request for the email,password and new password
        request.checkBody('email', 'email is invalid').notEmpty().isEmail()
        var error = request.validationErrors()
        var response = {}
        if (error) {
            response.error = error
            response.failure = false
            res.status(422).send(response);
        } else {
            Services.forgotpassword(request, (err, data) => {
                if (err) {
                    response.failure = false
                    response.data = err
                    res.status(402).send(response)
                } else {
                    console.log('data')
                    let payLoad = data._id;//takes the id from the data 
                    let obj = tokenGenerate.generateToken(payLoad);
                    console.log("controller pay load", obj);
                    let url = `http://localhost:4000/resetPassword/${obj.token}`

                    console.log("controller pay load", url);
                    console.log("email", request.body.email)
                    nodeMail.sendMailer(url, request.body.email)//send a mail from node mailer
                    response.sucess = true;
                    response.data = data;
                    res.status(200).send(response);
                }
            })
        }


    } catch (e) {
        console.log(e)
    }
})