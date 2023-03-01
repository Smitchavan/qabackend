const express = require("express");
const router = express.Router();
const TestRun = require("../models/runModel");
// console.log(TestRun)

// POST a new test run
router.post("/", async (req, res) => {
  let { data } = req.body[0];
  //   console.log(data);
  try {
    const testrun = await new TestRun({
      testRun: data,
      finalDuration: 5,
      finalStatus: "",
    });
    const TestRunn = await testrun.save();
    //console.log(Testy);
    res.send(TestRunn);
    console.log(TestRunn);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
});

router.get("/getruns", async (req, res) => {
  try {
    const result = await TestRun.find({});
    res.send(result);
  } catch (err) {
    res.send(err.message);
    console.log(err);
  }
});
router.delete("/deleteruns", async (req, res) => {
  console.log(req.body);
  try {
    let result = await TestRun.deleteOne({ _id: req.body.id });
    res.send(result);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
