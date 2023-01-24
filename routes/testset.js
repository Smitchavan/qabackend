const express = require("express");
const router = express.Router();

const TestSet = require("../models/testSetModel");

router.post("/", async (req, res) => {
  try {
    let Testset = await new TestSet({
      testsetname: req.body.testsetname,
      testcases: req.body.testcases,
      assigntoproject: req.body.assigntoproject,
    });

    const TestSett = await Testset.save();
    //console.log(Testy);
    res.send(TestSett);
  } catch (err) {
    console.log(err.message);
    let obj = {
      status: "FAILED",
      err: err.message,
    };
    res.status(226).send(obj);
  }
});

router.get("/gettestsetbyid", async (req, res) => {
  let id = req.query.id;
  try {
    let Result = await TestSet.findById(id);

    res.send(Result);
  } catch (err) {
    console.log(err.message);
    let obj = {
      status: "FAILED",
      err: err.message,
    };
    res.status(226).send(obj);
  }
});

router.post("/inserttestsbyid", async (req, res) => {
  // console.log(req.body);
  console.log("testset-id===>", req.body[0].id);
  console.log("test-cases====>", req.body[1].testcaseinfo);
  let id = req.body[0].id;
  let data = req.body[1].testcaseinfo;
  console.log("type", typeof data);
  try {
    let Result = await TestSet.findById(id);
    Result.testcases.push(data);
    await Result.save();
    console.log("new", Result);
    // return Result;
    res.send(Result);
  } catch (err) {
    //console.log(err.message);
    let obj = {
      status: "FAILED",
      err: err.message,
    };
    res.status(226).send(obj);
  }
});

router.get("/gettestsets", async (req, res) => {
  try {
    let Result = await TestSet.find({});

    res.send(Result);
  } catch (err) {
    //console.log(err.message);
    let obj = {
      status: "FAILED",
      err: err.message,
    };
    res.status(226).send(obj);
  }
});

router.delete("/deltestsetbyid", async (req, res) => {
  console.log(req.body.id);
  let id = req.body.id;
  try {
    let Result = await TestSet.findByIdAndDelete(id);

    res.send(Result);
  } catch (err) {
    //console.log(err.message);
    let obj = {
      status: "FAILED",
      err: err.message,
    };
    res.status(226).send(obj);
  }
});

router.post("/deltestfromid", async (req, res) => {
  // console.log(req.body.data.id);
  let id = req.body.data.testsetId;
  let testid = req.body.data.id;
  // console.log(testid);
  try {
    let Result = await TestSet.updateOne(
      { _id: id },
      { $pull: { testcases: { _id: testid } } }
    );

    res.send(Result);
  } catch (err) {
    //console.log(err.message);
    let obj = {
      status: "FAILED",
      err: err.message,
    };
    res.status(226).send(obj);
  }
});

module.exports = router;

// task.subtasks.push(subtask);
// await task.save();
// return task;
