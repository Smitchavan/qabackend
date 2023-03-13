const mongoose = require("mongoose");
const moment = require("moment");

// const testrunSchema = new mongoose.Schema({
//     testsetname: {
//         type: String,
//         unique: true,
//         required: true,
//     },
//     testcases: {
//         type: Array,
//         required: true
//     },
//     teststeps: {
//         type: Array,
//         required: true
//     },
//     testcaseduration: {
//         type: Number,
//         required: true,
//     },
//     finalstatus: {
// type: String,
// enum: ['passed', 'failed'],
// required: true
//     }
// });

// const testCaseSchema = new mongoose.Schema({
// testSetName: {type:String, required: true},
// testSteps: {type: Array, required: true},
// startTime: { type: Date, required: true },
// pauseTime: { type: Date },
// stopTime: { type: Date },
// duration: { type: Number },
// status: { type: String, enum: ['passed', 'failed'],
// required: true,
// required: true}
// });

// const testSetSchema = new mongoose.Schema({
//     testCases: { type: [testCaseSchema], required: true },
// finalDuration: { type: Number },
// finalStatus: {
//     type: String,
//     enum: ['passed', 'failed'],
//     required: true,
//     required: true
// }
// });
const testRunSchema = new mongoose.Schema({
  testsetname: { type: String, unique: true },
  testcases: [
    {
      testname: {
        type: String,
        unique: true,
      },
      status: {
        type: String,
      },
      testlevel: {
        type: String,
      },
      testinfo: {
        type: String,
      },
      stepArr: [
        {
          steps: {
            type: String,
          },
          result: {
            status: {
              type: String,
            },
            description: {
              type: String,
            },
            checktime: {
              type: String,
            },
          },
        },
      ],
      Timeid: { type: String },
      counttesterTime: [
        {
          time: { type: String },
          type: { type: String },
        },
      ],
      duration: { type: Number },
    },
  ],
  runStartTime: { type: String },
  runEndtime: { type: String },
  finalDuration: { type: Number },
  finalStatus: { type: String },
});

const testRun = mongoose.model("testrun", testRunSchema);
module.exports = testRun;

// const testRun = mongoose.model("testruns", testRunSchema);
// module.exports = testRun;
