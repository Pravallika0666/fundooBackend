/****************************************************************************************
 * @description :Fundoo
 * @overview : fundoo where the API are created
 * @author : Pravallika S K <skpravallikachowdary2@gmail.com>
 * @version : 12.13.0
 * @since : 15 November 2019
 ******************************************************************************************/
require('dotenv').config()

const express=require('express');

const bodyParser=require('body-parser');
const routerUser=require('./router/userRouter');
const dbConnect=require('../server/configuration/dbConfig')
const expressValidator=require('express-validator');

const app=express();

app.use(bodyParser.json());     
app.use(bodyParser.urlencoded({extended:true}))
app.use(expressValidator());

app.use('/',routerUser)
console.log("process.env",process.env.PORT);

//Initalizing the app port number,Telling frame work to start service
app.listen(process.env.PORT, () => {
    console.log("Server is listing on port 4000")
    dbConnect.dbConnection();
}); 

module.exports = app