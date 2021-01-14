const { buildCCPOrg2,buildCCPOrg1,buildCCPOrg3 } = require("./AppUtils")

exports.getCCP = (org1) => {
    console.log(typeof org1)
    let ccp;
    switch (org1) {

        case 1:
            ccp = buildCCPOrg1();
            break;
        case 2:
            ccp = buildCCPOrg2();
            break;
        case 3:
            ccp = buildCCPOrg3();
            break;
    }
    return ccp;
}