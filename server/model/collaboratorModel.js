const mongoose = require("mongoose")
mongoose.set('useFindAndModify', false)

//creating schema for the collaborator
var Schema = mongoose.Schema
const collModel = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    noteId: {
        type: Schema.Types.ObjectId,
        ref: "notes",
        required: true
    },
    collaboratorEmail: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

exports.collaborator = mongoose.model("user", collModel)