/****************************************************************************************
 * @description :Fundoo
 * @overview : fundoo where the API are created
 * @author : Pravallika S K <skpravallikachowdary2@gmail.com>
 * @version : 12.13.0
 * @since : 15 November 2019
 ******************************************************************************************/
require('dotenv').config()
const elasticSearch=require('../server/helper/elasticSearch')
elasticSearch.ping.ping()

const express = require('express');//allows to setup middlewares
const bodyParser = require('body-parser');//body parsing middleware
const routerUser = require('./router/userRouter');
const routerNote = require('./router/noteRouter')
const dbConnect = require('../server/configuration/dbConfig')
const expressValidator = require('express-validator');//it is a middleware which is used to validate user input
var cors = require('cors')
const app = express(); //creating an express app

app.use(bodyParser.json());//parses the text as JSON and exposes the resulting object to the req.body
app.use(bodyParser.urlencoded({ extended: true }))//parses the urlencoded data and exposes the resulting object to the req.body
app.use(expressValidator());
app.use(cors())
app.use('/', routerUser)
app.use('/note', routerNote)
console.log("process.env", process.env.PORT);

//Initalizing the app port number,Telling frame work to start service
app.listen(process.env.PORT, () => {
    console.log("Server is listening on port 4000")
    dbConnect.dbConnection();
});


module.exports = app