const express = require("express");

const app = express();
const bodyparser = require("body-parser");

const channelName = "mychannel";
const chaincodeName = "basic";
const tx = require("./tx");
const query = require("./query");
const { registerUser } = require("./registerUser");

app.use(bodyparser.json());

app.listen(4000, () => console.log("server started"));

app.post("/tx", async (req, res) => {
  try {
    var request = {
      chaincodeName: chaincodeName,
      channelName: channelName,
      userId: req.body.userId,
      org: req.body.orgMSP,
      data:req.body.data
    };
    var result = await tx(request);
    res.send({message:"Successfully stored in ledger"});
  } catch (error) {
    res.send(error);
  }
});

app.post("/register", async (req, res) => {

  try {
    let orgMSP = req.body.orgMSP;
    let userId = req.body.userId;
    let result = await registerUser({ OrgMSP: orgMSP, userId: userId });
    res.send(result);
  } catch (error) {
    res.send(error)
  }

});

app.post("/query", async (req, res) => {

  try {
    var request = {
      chaincodeName: chaincodeName,
      channelName: channelName,
      userId: req.body.userId,
      org: req.body.orgMSP,
      data: req.body.data
    };
    var result = await query(request);
    res.send(JSON.parse(result.toString()))
  } catch (error) {
    res.send(error)
  }

});


function prettyJSONString(inputString) {
  return JSON.stringify(JSON.parse(inputString), null, 2);
}