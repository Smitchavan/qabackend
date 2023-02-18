const express = require("express");
const router = express.Router();
const Testcase = require("../models/testModel");

router.post("/", async (req, res) => {
  try {
    let Test = await new Testcase({
      testname: req.body.testname,
      addsteps: req.body.steps,
      testinfo: req.body.testinfo,
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

    console.log("[]", Gettest);
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
router.get("/gettestbyid", async (req, res) => {
  // console.log(req.query);
  let id = req.query.id;
  console.log("GET-TEST-BYID-API=====>", id);
  try {
    let Gettest = await Testcase.findById(id);

    // console.log(Gettest);
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

router.delete("/deltestbyid", async (req, res) => {
  // console.log(req.query);
  let id = req.body.id;

  try {
    let Gettest = await Testcase.findByIdAndDelete(id);

    // console.log(Gettest);
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
