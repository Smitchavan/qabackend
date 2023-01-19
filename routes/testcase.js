const express = require("express");
const router = express.Router();
const Testcase = require("../models/testModel");

router.post("/", async (req, res) => {
  try {
    let Test = await new Testcase({
      testname: req.body.testname,
      addsteps: req.body.steps,
      status: req.body.status,
      testlevel: req.body.testlevel,
      assigntoproject: req.body.assigntoproject,
      stepArr: req.body.stepArr,
    });

    const Testy = await Test.save();
    //console.log(Testy);
    res.send(Testy);
  } catch (err) {
    console.log(err.message);
    let obj = {
      status: "FAILED",
      err: err.message,
    };
    res.status(226).send(obj);
  }
});

router.get("/gettests", async (req, res) => {
  try {
    let Gettest = await Testcase.find({});

    console.log(Gettest);
    res.send(Gettest);
  } catch (err) {
    console.log(err.message);
    let obj = {
      status: "FAILED",
      err: err.message,
    };
    res.status(226).send(obj);
  }
});

module.exports = router;
