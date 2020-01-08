const noteController=require("../controller/noteController");
const noteVerify=require("../middlewares/token")
const express=require('express')
const router=express.Router();

router.post('/addNote',noteVerify.userVerify,noteController.addNote)
router.get('/getAllnote',noteVerify.userVerify,noteController.getAllnote)
router.post('/deleteNote'.noteVerify.userVerify,noteController.deleteNode)