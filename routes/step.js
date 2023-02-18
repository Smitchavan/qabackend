const express = require("express");
const router = express.Router();
const Step = require("../models/stepModel");
const auth = require("../middleware/check-auth");
router.post("/", async (req, res) => {
  try {
    let StepRes = await new Step({
      steps: req.body.steps,
    });

    const Stepy = await StepRes.save();
    console.log(Stepy);
    res.send(Stepy);
  } catch (err) {
    console.log(err.message);
    let obj = {
      status: "FAILED",
      err: err.message,
    };
    res.status(226).send(obj);
  }
});
router.get("/getstep", auth, async (req, res) => {
  try {
    let Stepres = await Step.find({});
    res.send(Stepres);
    console.log(Stepres);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/deletestep", async (req, res) => {
  try {
    let Stepres = await Step.deleteOne({ _id: req.body.id });
    res.send(Stepres);
    console.log(Stepres);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
