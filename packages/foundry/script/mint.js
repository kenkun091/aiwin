const ethers = require('ethers');
const fs = require("fs");
var path = require('path');

function bufferFile(relPath) {
    return fs.readFileSync(path.join(__dirname, relPath)); // zzzz....
}

const example_json = {
    "model_id": "0x91CfC8d11E02723F7335D00ec60A9d309ef30772",
    "model_name": "distilBert-sentiment-classifier",
    "model_description": "This model is finetuned upon the distilled version of the BERT base model .",
    "python_requirements":
    {
        "python": "3.9.13",
        "requirements":
        {
            "accelerate": "0.27.2",
            "pytorch": "1.12.1",
            "transformers": "4.38.2",
            "datasets": "2.17.1",
            "huggingface-hub": "0.21.3",
            "numpy": "1.23.4",
            "pandas": "1.5.2",
            "tokenizers": "0.15.2",
            "torch": "2.2.0",
            "tqdm": "4.66.2"
        }
    },
    "finetuning_parameters": {
        "batch_size": 8,
        "learning_rate": 5e-5,
        "num_epochs": 3,
        "random_seed": 42
    },
    "finetune_data_hash": "36bbafbde8fc67c03221f17face0e64136cb04d059a3d6936e35fcda6891ce02",
    "finetuned_model_hash": "dd2a7a30f0822b2d5d6a4b1ead1ceafea2cc15867fc3650b7f5348e64f3818e0",
    "finetuned_from": "0x91CfC8d11E02723F7335D00ec60A9d309ef30773",
    "model_weight_uri": "ipfs://QmNuTrsbCTQFoWcMqHtnoBa8N8SStiqmEn5VSqrC3tq1no",
    "model_logo": "https://i.postimg.cc/38psKg0k/DALL-E-2024-02-28-10-02-54-An-image-of-a-playful-robot-sitting-on-the-floor-its-body-made-of-colo.webp",
    "model_owner_address": "0x91CfC8d11E02723F7335D00ec60A9d309ef30772"
};


// function mintAI(string memory name, string memory tokenURI, bytes memory licencesUsed, uint256 policyId, bytes32 hash) public {
async function f() {
    let contractsDir = "/../out/AIwin.sol/GameItem.json";
    let address = "0xa121c916fabfcb7407a1008f6c3fbdad607f200a"
    let abi = bufferFile(contractsDir).toString()
    var customHttpProvider = new ethers.providers.JsonRpcProvider("https://rpc.sepolia.org");
    // Your Ethereum wallet private key (NEVER hardcode in production!)
    const privateKey = '8c811930da72bb5647096de0a3acc47317ac9fd74872b97cd4474bceba2fe264';
    // Create a wallet signer
    const wallet = new ethers.Wallet(privateKey, customHttpProvider);

    let name = "distilBert-sentiment-classifier";
    let tokenURI = "ipfs://Qmc5wrp8BGG1BhmbUSXWqmeB6nacS1hL4epxXdipgGLbtQ";
    let licencesUsed = ethers.utils.toUtf8Bytes(""); // Convert string to bytes
    let policyId = 1;
    let hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("hash input")); // Example hash
    let contract = new ethers.Contract(address, JSON.parse(abi).abi, wallet)//
    // const gasEstimate = await contract.estimateGas.mintAI(name, tokenURI, licencesUsed, policyId, hash);
    // c

    // Adding a margin to the estimated gas limit (optional but recommended)
    // const gasLimit = gasEstimate.add(gasEstimate.div(6)); // Adding ~10% buffer

    try {
        let tx = await contract.mintAI(name, tokenURI, licencesUsed, policyId, hash, { gasLimit: ethers.utils.parseUnits('0.001', 'ether') });
        console.log("Transaction submitted:", tx.hash);

        // Wait for the transaction to be mined
        await tx.wait();
        console.log("Transaction confirmed:", tx.hash);
    } catch (error) {
        console.error("Error minting AI:", error);
    }
    // let r = await customHttpProvider.getBlockNumber()
    // console.log(r)
}

f()
