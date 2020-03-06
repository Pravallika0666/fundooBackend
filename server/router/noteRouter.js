const noteController = require("../controller/noteController");
const noteVerify = require("../middlewares/token")
const express = require('express')
const router = express.Router();
const elasticSearchController = require('../controller/elasticSearchController')

/*route to add a note*/
router.post('/addNote', noteVerify.userVerify, noteController.addNote)
/*route to get all notes*/
router.get('/getAllnote', noteVerify.userVerify, noteController.getAllnote)
/*route to update a note*/
router.put('/updateNote', noteVerify.userVerify, noteController.updateNote)

router.put('/archive', noteVerify.userVerify, noteController.archive)
router.put('/unarchive', noteVerify.userVerify, noteController.unarchive)
router.get('/getArchiveNote', noteVerify.userVerify, noteController.getArchiveNote)
router.put('/isTrash', noteVerify.userVerify, noteController.isTrash)
router.get('/unTrash', noteVerify.userVerify, noteController.unTrash)
router.post('/addReminder', noteVerify.userVerify, noteController.addReminder)
router.put('/deleteReminder', noteVerify.userVerify, noteController.deleteReminder)

/*route to create a label*/
router.post('/labelCreate', noteVerify.userVerify, noteController.labelCreate)
/*route to get all labels*/
router.get('/getLabels', noteVerify.userVerify, noteController.getLabels)
/*route to update a labels*/
router.put('/updateLabels', noteVerify.userVerify, noteController.updateLabels)
/*route to delete a labels*/
router.put('/deleteLabels', noteVerify.userVerify, noteController.deleteLabels)
/*route to add collaborator*/
router.post('/addCollaborator', noteVerify.userVerify, noteController.addCollaborator)
/*route to delete collaborator*/
router.put('/deleteCollaborator', noteVerify.userVerify, noteController.deleteCollaborator)
/*route to get collaborator*/
router.get('/getCollaborator', noteVerify.userVerify, noteController.getCollaborator)
/*route to create my index of elastic search*/
router.post('/createmyIndex', noteVerify.userVerify, elasticSearchController.createmyIndex)
/*route to search of elastic search*/
router.post('/search', noteVerify.userVerify, noteController.search)

router.put('/color', noteVerify.userVerify, noteController.color)



module.exports = router;
