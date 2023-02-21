// const { convertLength } = require("@mui/material/styles/cssUtils");
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

router.post("/deletestep", async (req, res) => {
  let id = req.body.data.stepid;
  let testid = req.body.data.id;
  console.log("HII SMit", req.body.data);
  try {
    let Result = await Testcase.updateOne(
      { _id: testid },
      { $pull: { stepArr: { _id: id } } }
    );
    res.send(Result);
  } catch (error) {
    let obj = {
      status: "FAILED",
      err: error.message,
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

router.post("/updatetestwithid", async (req, res) => {
  let id = req.body.data.id;
  let data = req.body.data.data;
  console.log("hii", req.body.data);
  try {
    let Result = await Testcase.findByIdAndUpdate(id, data);
    const response = await Result.save();
    console.log(response);
    res.send(response);
  } catch (error) {
    let obj = {
      err: "typeerror",
      error: error,
    };
    res.send(obj);
    console.log("error", error);
  }
});
router.get("/searchtestcase", async (req, res) => {
  const q = req.query.q;

  try {
    const result = await Testcase.find({
      $or: [
        { testname: { $regex: q, $options: "i" } },
        { testinfo: { $regex: q, $options: "i" } },
      ],
    });
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
