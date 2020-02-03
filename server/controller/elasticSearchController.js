const elasticClient = require('../helper/elasticSearch')
/**********************************************************
 *  @desc Gets the input from front end pass to model
 *  @param request request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
***********************************************************/
exports.createmyIndex = (request, res) => {
    try {
        let response = {}
        elasticClient.createmyIndex(request, (err, data) => {
            if (err) {
                response.success = false
                response.err = err
                res.status(400).send(response)
            } else {
                response.success = true
                response.data = data
                res.status(200).send(response)
            }
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
//exports elastic search 
exports.search = (request, res) => {
    try {
        let response={}
        elasticClient.search(request, (err, data) => {
            if (err) {
                response.success = false
                response.err = err
                res.status(400).send(response)
            } else {
                response.success = true
                response.data = data
                res.status(200).send(response)
            }
        })
    } catch (e) {
        console.log(e)
    }
}