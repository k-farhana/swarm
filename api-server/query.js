const { Gateway, Wallets } = require("fabric-network");
const path = require("path");
const { buildCCPOrg1, buildWallet } = require("./AppUtils.js");
const walletPath = path.join(__dirname, "wallet");

async function query(request) {
  const ccp = buildCCPOrg1();

  const wallet = await buildWallet(Wallets, walletPath);
  const gateway = new Gateway();

  await gateway.connect(ccp, {
    wallet,
    identity: request.org1UserId,
    discovery: { enabled: true, asLocalhost: false },
  });
  console.log(gateway);
  const network = await gateway.getNetwork(request.channelName);

  const contract = network.getContract(request.chaincodeName);

  let result = await contract.evaluateTransaction("ReadAsset", "asset1");

  return result;
}

module.exports = query;
