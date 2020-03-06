var elastic = require('elasticsearch');

//create a client instance for the elastic search
var elasticCli = new elastic.Client({
    host: 'localhost:9200'
});
//ping
exports.ping = {
    ping: function (request, res) {
        elasticCli.ping({
            requestTimeout: 30000,
        }, function (error) {
            if (error) {
                console.log('Elastic search has an error')
            } else {
                console.log('Everything is okay')
            }
        })
    }
}
//creating an index of elastic search
exports.createmyIndex = (request) => {
    try {
        let index = request.decoded.payload.id
        //checks whether index exists
        elasticCli.indices.exists({
            index: index
        }, (exists) => {
            if (exists) {
                console.log('User Exists!!!')
            } else {
                //create an index
                //An index consists of one or more documents
                elasticCli.indices.create({ 'index': index }, (err, result) => {
                    if (err) {
                        console.log('Error', err)
                    } else {
                        console.log('Elastic search result', result)
                    }
                })
            }
        })
    } catch (e) {
        console.log(e)
    }
}

//adding a document to the index 
exports.document = (getNoteDetails) => {
    try {
        let array = [];
        getNoteDetails.forEach(ele => {
            array.push({
                index: {
                    _index: ele._id,
                    type: "getNoteDetails"
                }
            })
            let data = {
                "id": ele._id,
                "title": ele.title,
                "description": ele.description
            }
            array.push(data)
        })
        //bulk is a way of adding multiple documents in elastic search
        elasticCli.bulk({
            body: array
        }).then(function (resp) {
            // res.status(200)
            // return res.json(resp)
            console.log('success');

        }, function (err) {
            // res.status(400)
            // return res.json(err)
            console.log('error in bulk');

        })

    } catch (e) {
        console.log(e)
    }
}
//elastic search
exports.search = (request, callback) => {
    try {
        let userId = request.decoded.payload._id
        let body = {
            query: {
                query_string: {
                    //query to search 
                    query: `*${request.body.search}*`,
                    analyze_wildcard: true,
                    fields: ["title", "description"]//fields to search in notes
                }
            }
        }
        elasticCli.search({
            index: userId,
            body: body,
            type: "getNoteDetails"
        }, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
                console.log("search data",data);
                
            }
        })
    } catch (e) {
        console.log(e)
    }
}

