const express=require('express')
const router=express.Router()
const userController=require('../controller/userController')

router.post('/register',userController.register)//router for the register
router.post('/login',userController.login)//router for the login
module.exports=router;