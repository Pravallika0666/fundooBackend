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
    },
    imageURl: {
        type: String
    },

},
    {
        timestamps: true
    }
)

exports.notes = mongoose.model("notes", fundoo)
// var notes=mongoose.model("notes",fundoo)
// notes.findOne({ "" : { $regex: /notes/ , $options: 'i' } },
// function (err, note) {
//        if (err) return handleError(err);
//        console.log('%s %s is a %s.', note.title.first, note.title.last, title.occupation);

// });
// var notes=mongoose.model("notes",fundoo)
// class notes {
//     find(noteData) {
//         return new Promise((resolve, reject) => {
//             notes.find({
//                 $or: [{
//                     'title': {
//                         $regex: noteData.key,
//                         $options: 'i'
//                     }
//                 },
//                 {
//                     'description': {
//                         $regex: noteData.key,
//                         $options: 'i'
//                     }
//                 }
//                 ]
//             })
//                 .then((data) => {
//                     console.log("dataaaa", data);

//                     if (data !== null) {
//                         resolve(data)
//                     } else {
//                         console.log("error");

//                     }
//                 })
//                 .catch((error) => {
//                     reject(error)
//                 })
//         })
//     }
// }
