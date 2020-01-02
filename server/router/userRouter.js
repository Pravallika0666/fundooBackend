const express=require('express')
const router=express.Router()
const userController=require('../controller/userController')
const token=require('../middlewares/token')

router.post('/register',userController.register)//router for the register
router.post('/login',userController.login)//router for the login
router.post('/forgotpassword',userController.forgotpassword)//router for the forgotpassword
router.post('/resetpassword/:token',token.verify,userController.resetpassword)
module.exports=router;