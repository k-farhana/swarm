const { Gateway, Wallets } = require("fabric-network");
const path = require("path");
const { buildCCPOrg1, buildWallet } = require("./AppUtils.js");
const walletPath = path.join(__dirname, "wallet");
async function tx(request) {
  const ccp = buildCCPOrg1();

  const wallet = await buildWallet(Wallets, walletPath);
  const gateway = new Gateway();

  await gateway.connect(ccp, {
    wallet,
    identity: request.org1UserId,
    eventHandlerOptions: {
      endorseTimeout: 60000,
      commitTimeout: 60000,
    },
    queryHandlerOptions: {
      timeout: 60000,
    },
    discovery: { enabled: true, asLocalhost: false },
  });
  console.log(gateway);
  const network = await gateway.getNetwork(request.channelName);

  const contract = network.getContract(request.chaincodeName);

  var result = await contract.submitTransaction(
    "CreateAsset",
    Date.now().toString(),
    "yellow",
    "5",
    "Tom",
    "1300"
  );
  console.log(result.toString())
  return result;
}

module.exports = tx;
