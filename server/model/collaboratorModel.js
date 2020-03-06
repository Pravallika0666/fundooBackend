//collaborator model
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

var Schema = mongoose.Schema
const collaboratorModel = new Schema({
    userId: {
        type: String,
        required: true,
        ref: "users"
    },
    noteId: {
        type: String,
        required: true,
        ref: "notes"
    },
    "collaboratorEmail": [{
        type: String,
        required: true,
        ref:'users'
    }]

},
    {
        timestamps: true
    })

exports.collaborator = mongoose.model("collaboratorsModel", collaboratorModel)