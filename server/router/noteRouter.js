const noteController=require("../controller/noteController");
const noteVerify=require("../middlewares/token")
const express=require('express')
const router=express.Router();

router.post('/addNote',noteVerify.userVerify,noteController.addNote)
router.get('/getAllnote',noteVerify.userVerify,noteController.getAllnote)
router.put('/deleteNote',noteVerify.userVerify,noteController.deleteNote)
router.put('/updateNote',noteVerify.userVerify,noteController.updateNote)
router.get('/getDeleteNote',noteVerify.userVerify,noteController.getDeleteNote)

router.post('/addCollaborator',noteVerify.userVerify,noteController.addCollaborator)
router.get('/getCollaborator',noteVerify.userVerify,noteController.getCollaborator)

router.put('/archive',noteVerify.userVerify,noteController.archive)
router.put('/unarchive',noteVerify.userVerify,noteController.unarchive)
router.getArchiveNote('/getArchiveNote',noteVerify.userVerify,noteController.getArchiveNote)

module.exports=router;
