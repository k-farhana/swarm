const express = require("express");

const app = express();
const bodyparser = require("body-parser");

const { Wallets } = require("fabric-network");
const FabricCAServices = require("fabric-ca-client");
const path = require("path");
const channelName = "mychannel";
const chaincodeName = "basic";
const mspOrg1 = "Org1MSP";
const walletPath = path.join(__dirname, "wallet");
let org1UserId = "appUser1";
const tx = require("./tx");
const query = require("./query");
const {
  buildCAClient,
  registerAndEnrollUser,
  enrollAdmin,
} = require("./CAUtil.js");
const { buildCCPOrg1, buildWallet } = require("./AppUtils.js");

app.use(bodyparser.json());

app.listen(4000, () => console.log("server started"));

app.post("/tx", async (req, res) => {
  try {
    var request = {
      chaincodeName: chaincodeName,
      channelName: channelName,
      org1UserId: req.body.userId || org1UserId,
    };
    var result = await tx(request);
    console.log(result.toString());
    console.log(prettyJSONString(result.toString()))
    res.json(prettyJSONString(result.toString()));
  } catch (error) {
    res.send(error);
  }
});

app.post("/register", async (req, res) => {
  const ccp = buildCCPOrg1();
  org1UserId = req.body.userId || org1UserId;
  // build an instance of the fabric ca services client based on
  // the information in the network configuration
  const caClient = buildCAClient(FabricCAServices, ccp, "ca.org1.example.com");

  // setup the wallet to hold the credentials of the application user
  const wallet = await buildWallet(Wallets, walletPath);

  // in a real application this would be done on an administrative flow, and only once
  var admin = await enrollAdmin(caClient, wallet, mspOrg1);

  // in a real application this would be done only when a new user was required to be added
  // and would be part of an administrative flow
  var enroll = await registerAndEnrollUser(
    caClient,
    wallet,
    mspOrg1,
    org1UserId,
    "org1.department1"
  );
  res.send({
    admin,
    wallet,
    enroll,
  });
});

app.post("/query", async (req, res) => {
  var request = {
    chaincodeName: chaincodeName,
    channelName: channelName,
    org1UserId: req.body.userId || org1UserId,
  };
  var result=await query(request);
  res.send(result)
});


function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}