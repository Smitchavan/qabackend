const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  testname: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 30,
  },

  status: {
    type: String,
    required: true,
  },
  testlevel: {
    type: String,
    required: true,
  },

  testinfo: {
    type: String,
    required: true,
  },
  stepArr: {
    type: Array,
  },
});

const Testcase = mongoose.model("testcase", testSchema);
module.exports = Testcase;
