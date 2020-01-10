const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

/*creating a schema of database*/
var Schema = mongoose.Schema
const fundoo = new Schema({
    /** creating schema for registration */
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
        type: String,
        default:false
    },
    isArchived:{
        type:String,
        default:false
    }
},
    {
        timestamps: true
    }
)

exports.notes = mongoose.model("notes", fundoo)