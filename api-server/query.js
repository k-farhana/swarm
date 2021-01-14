const { Gateway, Wallets } = require("fabric-network");
const path = require("path");
const { buildWallet } = require("./AppUtils.js");
const { getCCP } = require("./buildCCP.js");
const walletPath = path.join(__dirname, "wallet");

exports.query = async (request) => {

  let orgMSP = request.org;
  let org = Number(orgMSP.match(/\d/g).join(""));
  const ccp = getCCP(org);

  const wallet = await buildWallet(Wallets, walletPath);
  const gateway = new Gateway();

  await gateway.connect(ccp, {
    wallet,
    identity: request.userId,
    discovery: { enabled: true, asLocalhost: false },
  });
  const network = await gateway.getNetwork(request.channelName);

  const contract = network.getContract(request.chaincodeName);
  let data = Object.values(request.data);
  let result = await contract.evaluateTransaction(...data);

  return result;
}


