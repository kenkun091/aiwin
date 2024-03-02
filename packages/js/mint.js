const ethers = require('ethers');
const fs = require("fs");
var path = require('path');

function bufferFile(relPath) {
    return fs.readFileSync(path.join(__dirname, relPath)); // zzzz....
}

async function f() {
    let contractsDir = "/../foundry/out/AIwin.sol/AIwin.json";
    let address = "0xa121c916fabfcb7407a1008f6c3fbdad607f200a"
    let abi = bufferFile(contractsDir).toString()
    var customHttpProvider = new ethers.providers.JsonRpcProvider("https://rpc.sepolia.org");
    let cont = new ethers.Contract("0xa121c916fabfcb7407a1008f6c3fbdad607f200a", JSON.parse(abi), customHttpProvider)//0xa121c916fabfcb7407a1008f6c3fbdad607f200a
    let r = await customHttpProvider.getBlockNumber()
    console.log(r)
}

f()