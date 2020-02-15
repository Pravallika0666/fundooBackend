const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

/*creating a schema of database*/
var Schema = mongoose.Schema
const fundoo = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    Reminder: {
        type: String
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
        default: "#FFFFFF"
    }
},
    {
        timestamps: true
    }
)

exports.notes = mongoose.model("notes", fundoo)