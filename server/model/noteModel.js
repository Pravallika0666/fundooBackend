const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

/*creating a schema of database*/
var Schema = mongoose.Schema
const fundoo = new Schema({
    /** creating schema for registration */
    _userId: {
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
},
    {
        timestamps: true
    }
)

exports.notes = mongoose.model("notes", fundoo)