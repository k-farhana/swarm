const { Gateway, Wallets } = require("fabric-network");
const path = require("path");
const { buildWallet } = require("./AppUtils.js");
const { getCCP } = require("./buildCCP.js");
const walletPath = path.join(__dirname, "wallet");
exports.tx = async (request) => {

  let org = request.org;
  let num = Number(org.match(/\d/g).join(""));
  const ccp = getCCP(num);
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
  let result = await contract.submitTransaction(...data);
  console.log(result.toString())
  return result;
}

