let schedule = require('node-schedule');
let sns = require('../AWS')
let noteServices = require('../services/noteServices')
let noteController = require('../controller/noteController')

// var date = new Date(2020, 00, 21, 17, 41, 0);

// var j = schedule.scheduleJob(date, function(){
//   console.log('The world is going to end today');
// })

//exports reminderScheduler
exports.reminderScheduler = (request) => {

  console.log("Email:", request.email);
  let details;
  let email = request.email;
  return new Promise((resolve, reject) => {
    let date1 = new Date(request.resolve.reminder);

    var set = new Date(2020, 0, 22, 12, 04, 0);

    console.log("j=====>", set);
    var j = schedule.scheduleJob(date1, function () {

      console.log('Time to work');
      const arr = {
        "index": "someIndex",
        "name": "pravallika"
      }
      sns.notifications(arr, email);
      resolve('Solve')
    })
  });
}
