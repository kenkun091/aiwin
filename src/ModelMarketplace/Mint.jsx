// constants
const mpcContract = `signer.canhazgas.testnet`;
const { accountId } = context;
const chainId = 11155111; // SEPOLIA
const nearGas = 300000000000000;

if (!accountId) return <h4>Please Sign In with your Near Account</h4>;

const gasPricePreFetch = fetch(
  `https://sepolia.beaconcha.in/api/v1/execution/gasnow`
);

// if there's a txHash in the url props
let txHash = props.transactionHashes;
if (txHash) {
  txHash = txHash.split(",")[0];
}
// get pending tx or user args path, to address
const baseTx = Storage.privateGet("baseTx");
const txPayload = Storage.privateGet("txPayload");
const to = Storage.privateGet("to");
const path = Storage.privateGet("path");

initState({
  amount: "0.1",
  to,
  path,
});

const flashAlert = (alert, dur) => {
  State.update({
    alert,
  });
  setTimeout(() => State.update({ alert: null }), dur || 3000);
};

const refreshBalance = () => {
  State.update({
    balance: "loading...",
  });
  getEthereumAddress(state.path || path);
};

const getSepoliaProvider = () => {
  return new ethers.providers.JsonRpcProvider(
    "https://ethereum-sepolia.publicnode.com"
  );
};


const registerDerivativeIp = async () => {
  const nftContractAddress = "0x613128e88b568768764824f898C8135efED97fA6"

  const contractAbi = { "abi": [{ "type": "function", "name": "ipResolver", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "contract IPResolver" }], "stateMutability": "view" }, { "type": "function", "name": "registerDerivativeIp", "inputs": [{ "name": "licenseIds", "type": "uint256[]", "internalType": "uint256[]" }, { "name": "tokenContract", "type": "address", "internalType": "address" }, { "name": "tokenId", "type": "uint256", "internalType": "uint256" }, { "name": "ipName", "type": "string", "internalType": "string" }, { "name": "contentHash", "type": "bytes32", "internalType": "bytes32" }, { "name": "externalURL", "type": "string", "internalType": "string" }, { "name": "royaltyContext", "type": "bytes", "internalType": "bytes" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "registerRootIp", "inputs": [{ "name": "policyId", "type": "uint256", "internalType": "uint256" }, { "name": "tokenContract", "type": "address", "internalType": "address" }, { "name": "tokenId", "type": "uint256", "internalType": "uint256" }, { "name": "ipName", "type": "string", "internalType": "string" }, { "name": "contentHash", "type": "bytes32", "internalType": "bytes32" }, { "name": "externalURL", "type": "string", "internalType": "string" }], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "nonpayable" }, { "type": "event", "name": "DerivativeIPRegistered", "inputs": [{ "name": "caller", "type": "address", "indexed": true, "internalType": "address" }, { "name": "ipId", "type": "address", "indexed": true, "internalType": "address" }, { "name": "licenseIds", "type": "uint256[]", "indexed": false, "internalType": "uint256[]" }], "anonymous": false }, { "type": "event", "name": "RootIPRegistered", "inputs": [{ "name": "caller", "type": "address", "indexed": true, "internalType": "address" }, { "name": "ipId", "type": "address", "indexed": true, "internalType": "address" }, { "name": "policyId", "type": "uint256", "indexed": true, "internalType": "uint256" }], "anonymous": false }], "bytecode": { "object": "0x", "sourceMap": "", "linkReferences": {} }, "deployedBytecode": { "object": "0x", "sourceMap": "", "linkReferences": {} }, "methodIdentifiers": { "ipResolver()": "ec4efa39", "registerDerivativeIp(uint256[],address,uint256,string,bytes32,string,bytes)": "17f24885", "registerRootIp(uint256,address,uint256,string,bytes32,string)": "4f52e7a2" }, "rawMetadata": "{\"compiler\":{\"version\":\"0.8.23+commit.f704f362\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"caller\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"ipId\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256[]\",\"name\":\"licenseIds\",\"type\":\"uint256[]\"}],\"name\":\"DerivativeIPRegistered\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"caller\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"ipId\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"policyId\",\"type\":\"uint256\"}],\"name\":\"RootIPRegistered\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"ipResolver\",\"outputs\":[{\"internalType\":\"contract IPResolver\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256[]\",\"name\":\"licenseIds\",\"type\":\"uint256[]\"},{\"internalType\":\"address\",\"name\":\"tokenContract\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"ipName\",\"type\":\"string\"},{\"internalType\":\"bytes32\",\"name\":\"contentHash\",\"type\":\"bytes32\"},{\"internalType\":\"string\",\"name\":\"externalURL\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"royaltyContext\",\"type\":\"bytes\"}],\"name\":\"registerDerivativeIp\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"policyId\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"tokenContract\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"ipName\",\"type\":\"string\"},{\"internalType\":\"bytes32\",\"name\":\"contentHash\",\"type\":\"bytes32\"},{\"internalType\":\"string\",\"name\":\"externalURL\",\"type\":\"string\"}],\"name\":\"registerRootIp\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"events\":{\"DerivativeIPRegistered(address,address,uint256[])\":{\"params\":{\"caller\":\"The address of the caller.\",\"ipId\":\"The address of the IP that was registered.\",\"licenseIds\":\"The licenses that were used to register the derivative IP.\"}},\"RootIPRegistered(address,address,uint256)\":{\"params\":{\"caller\":\"The address of the caller.\",\"ipId\":\"The address of the IP that was registered.\",\"policyId\":\"The policy that identifies the licensing terms of the IP.\"}}},\"kind\":\"dev\",\"methods\":{\"registerDerivativeIp(uint256[],address,uint256,string,bytes32,string,bytes)\":{\"params\":{\"contentHash\":\"The content hash of the IP being registered.\",\"externalURL\":\"An external URI to link to the IP.\",\"ipName\":\"The name assigned to the new IP.\",\"licenseIds\":\"The licenses to incorporate for the new IP.\",\"royaltyContext\":\"The royalty context for the derivative IP.\",\"tokenContract\":\"The address of the NFT bound to the derivative IP.\",\"tokenId\":\"The token id of the NFT bound to the derivative IP.\"}},\"registerRootIp(uint256,address,uint256,string,bytes32,string)\":{\"params\":{\"contentHash\":\"The content hash of the IP being registered.\",\"externalURL\":\"An external URI to link to the IP.\",\"ipName\":\"The name assigned to the new IP.\",\"policyId\":\"The policy that identifies the licensing terms of the IP.\",\"tokenContract\":\"The address of the NFT bound to the root-level IP.\",\"tokenId\":\"The token id of the NFT bound to the root-level IP.\"}}},\"version\":1},\"userdoc\":{\"events\":{\"DerivativeIPRegistered(address,address,uint256[])\":{\"notice\":\"Emitted when a derivative IP is registered.\"},\"RootIPRegistered(address,address,uint256)\":{\"notice\":\"Emitted when a root-level IP is registered.\"}},\"kind\":\"user\",\"methods\":{\"ipResolver()\":{\"notice\":\"Returns the metadata resolver used by the registration module.\"},\"registerDerivativeIp(uint256[],address,uint256,string,bytes32,string,bytes)\":{\"notice\":\"Registers derivative IPs into the protocol. Derivative IPs are IP assets that inherit policies from parent IPs by burning acquired license NFTs.\"},\"registerRootIp(uint256,address,uint256,string,bytes32,string)\":{\"notice\":\"Registers a root-level IP into the protocol. Root-level IPs can be thought of as organizational hubs for encapsulating policies that actual IPs can use to register through. As such, a root-level IP is not an actual IP, but a container for IP policy management for their child IP assets.\"}},\"version\":1}},\"settings\":{\"compilationTarget\":{\"lib/protocol-core/contracts/interfaces/modules/IRegistrationModule.sol\":\"IRegistrationModule\"},\"evmVersion\":\"paris\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@ensdomains/=lib/protocol-periphery/node_modules/@ensdomains/\",\":@ethereum-waffle/=lib/protocol-core/node_modules/@ethereum-waffle/\",\":@openzeppelin/contracts-upgradeable/=lib/openzeppelin-contracts-upgradeable/contracts/\",\":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/\",\":@openzeppelin/openzeppelin-contracts/=lib/openzeppelin-contracts/\",\":@story-protocol/protocol-core/=lib/protocol-core/\",\":@story-protocol/protocol-periphery/=lib/protocol-periphery/\",\":base64-sol/=lib/protocol-core/node_modules/base64-sol/\",\":ds-test/=lib/protocol-core/node_modules/ds-test/src/\",\":erc4626-tests/=lib/openzeppelin-contracts-upgradeable/lib/erc4626-tests/\",\":erc6551/=lib/erc6551/\",\":eth-gas-reporter/=lib/protocol-core/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":hardhat-deploy/=lib/protocol-core/node_modules/hardhat-deploy/\",\":hardhat/=lib/protocol-core/node_modules/hardhat/\",\":openzeppelin-contracts-upgradeable/=lib/openzeppelin-contracts-upgradeable/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\",\":protocol-core/=lib/protocol-core/\",\":protocol-periphery/=lib/protocol-periphery/\",\":solidity-bytes-utils/=lib/solidity-bytes-utils/contracts/\"]},\"sources\":{\"lib/erc6551/interfaces/IERC6551Account.sol\":{\"keccak256\":\"0xda097894cc052f451ad669c5a07a9eda3f53a948f8080714850dc68cc1040b42\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://8ca48dd1eff4f9eee3699a6800c09c4d208d103862f2a55d66286e8eb4b7771e\",\"dweb:/ipfs/QmX2KX2fmUV5rbVoJSAq6BTVVwxK1Jy169dRJN2h8UCNLz\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155Receiver.sol\":{\"keccak256\":\"0x0f8b8696348d5a57b13d44f5cc63894f0368038c06f6d00bdeda6f9aa13127e7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://718159abc22da25c2de7e70f6b7bbbf6b6e20c3db6681893f8049b57f4ee65ce\",\"dweb:/ipfs/QmPJeQ7Qj7mrAwfR69sLjyjUSb44B7yAJXvMG1NFtoTJKv\"]},\"lib/openzeppelin-contracts/contracts/token/ERC721/IERC721Receiver.sol\":{\"keccak256\":\"0xcac5b2622b9876529ca71f56b08a2786e960f0a738a9fcc456b2b8740170f89b\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://36ec9bacdaa2003a4b68d078f55887e7ec763e83d2027aaa1478578ae71c9b66\",\"dweb:/ipfs/QmbXfAcgockJRxMxKe5mt1pQyeafwCJuUpxce6a2ehB8bt\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol\":{\"keccak256\":\"0x6fac27fb1885a1d9fd2ce3f8fac4e44a6596ca4d44207c9ef2541ba8c941291e\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://2079378abdb36baec15c23bc2353b73a3d28d1d0610b436b0c1c4e6fa61d65c9\",\"dweb:/ipfs/QmVZkRFMzKW7sLaugKSTbMNnUBKWF3QDsoMi5uoQFyVMjf\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/ERC165Checker.sol\":{\"keccak256\":\"0xa2a74d4098651d8729e7a83556077e0597d1ee6e2f03b7c94fe87cb5a3a9ee54\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://e389d1cd8e06a8885ca04033dc8008a4268b59aa6841db75349fb736ff227f2f\",\"dweb:/ipfs/QmfFp3Lmvv2d5qGhgTMW5v5msj6dq9rdcK4Yst4GrjFZ9b\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0xc859863e3bda7ec3cddf6dafe2ffe91bcbe648d1395b856b839c32ee9617c44c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a9d5417888b873cf2225ed5d50b2a67be97c1504134a2a580512168d587ad82e\",\"dweb:/ipfs/QmNr5fTb2heFW658NZn7dDnofZgFvQTnNxKRJ3wdnR1skX\"]},\"lib/protocol-core/contracts/access/AccessControlled.sol\":{\"keccak256\":\"0x4d4af89187fb32253968f09bbb1312cb53d099fe01c5c1ed6d967e47ba883449\",\"license\":\"BUSL-1.1\",\"urls\":[\"bzz-raw://b7da4d1064fa9b605388b0df0e9371dd5a17d473d8ee6778541d499e7a2770be\",\"dweb:/ipfs/QmQwfVgnRschNdA6zXVDKdu6Jc8H2rCBXWfcbX78oPCR3e\"]},\"lib/protocol-core/contracts/interfaces/IAccessController.sol\":{\"keccak256\":\"0xfc5bcc7be1b48a771a91acdf28758bf266312e581ab792e68601233f7f10e071\",\"license\":\"BUSL-1.1\",\"urls\":[\"bzz-raw://770a423d8d710444fee10d5be3996c669a45c358f35417d4d0b8a43b5d5d42ce\",\"dweb:/ipfs/QmVbW3TRF1qHTdUXpss8V48h8G8huqGLgm4WSRWkEWyFFM\"]},\"lib/protocol-core/contracts/interfaces/IIPAccount.sol\":{\"keccak256\":\"0xfe893f22f8d1046cf6088c2ae1230fc6464bcd3a60e36296315644b378fb892c\",\"license\":\"BUSL-1.1\",\"urls\":[\"bzz-raw://c9d4b8eeb8a68b841a6cc35c1e7d1397201958ee68c05fff3b8d009b3c622021\",\"dweb:/ipfs/QmUuVonRpWHUwA5euw5Gyb23MLBuGaFJ3yTCQfH2bu52ix\"]},\"lib/protocol-core/contracts/interfaces/modules/IRegistrationModule.sol\":{\"keccak256\":\"0xee7158d608fa842dddfbc72127e263d5d21b301092cb249152e808c10e442f21\",\"license\":\"BUSL-1.1\",\"urls\":[\"bzz-raw://082293842aa16195ba9865471e4d32bdfe285901a4548ce87b903808e4c169b4\",\"dweb:/ipfs/QmSJEvundW92hBFnQcJ4dcQYJUpGmPDgwMJbFhdQpxfqxJ\"]},\"lib/protocol-core/contracts/interfaces/modules/base/IModule.sol\":{\"keccak256\":\"0x5839736cf66e534f2b9588e5ada36b86386529ef1002c0aa7081a0280b813480\",\"license\":\"BUSL-1.1\",\"urls\":[\"bzz-raw://197da011e22a20546536510610056fc636ce73a76f2ebdb6f116fc1d40f5613d\",\"dweb:/ipfs/QmNfiP3GvU47FPs2hrA4U4Zgr3CqF8srdUqooD8Qf3Uyve\"]},\"lib/protocol-core/contracts/interfaces/registries/IIPAccountRegistry.sol\":{\"keccak256\":\"0x68aa5cbaebd58ffc2411222abb47eb57ddd13aba07bff13c6b4e4a737e7c37fe\",\"license\":\"BUSL-1.1\",\"urls\":[\"bzz-raw://8d925137b55bf0cab40167538b1f9f05e1cafec6735d8e284da94f0f11344d71\",\"dweb:/ipfs/QmYzgnCoEUMbtSbUeGVE7u5mqfUJ7YqcEubDhLzUYPmQdn\"]},\"lib/protocol-core/contracts/interfaces/resolvers/IKeyValueResolver.sol\":{\"keccak256\":\"0xeee94f29dc18f339c14a3b57aa08581e7f29b6425f09f4f128962d2f585a88e1\",\"license\":\"BUSL-1.1\",\"urls\":[\"bzz-raw://e89868ed7d22f9758315b18b74bee262f9ecc7461815d09c0de82c0794dce1dc\",\"dweb:/ipfs/QmR2BABukMchQ2kDGVWWGWp53pQmkapip8KLU1t3FAGNn6\"]},\"lib/protocol-core/contracts/interfaces/resolvers/IResolver.sol\":{\"keccak256\":\"0xabd400089a499d9ec46f9c154262beb59d87345d2a41ded5d3246f2e0f0bd750\",\"license\":\"BUSL-1.1\",\"urls\":[\"bzz-raw://52e190c91b45956f23836a2e6538cf0e51b5d8d68238487a138d27779f2cc79c\",\"dweb:/ipfs/QmafcbATNXkK6N5qrRB2HbA89pRDavDCtdKXgXkr98kRT7\"]},\"lib/protocol-core/contracts/lib/AccessPermission.sol\":{\"keccak256\":\"0xd3feb98ad42db751a31295b6aa8e58fb8e7ee588139a77beaeb87acd89dbfa93\",\"license\":\"BUSL-1.1\",\"urls\":[\"bzz-raw://3e5e39ec6dc2fd7039f1c4da555d9ac675210ec78890f7e5030f3b749b6dd6dc\",\"dweb:/ipfs/QmTDpm5xBXgMJEojH54emCHEcQuRxE9wteBBd7KbymaUU8\"]},\"lib/protocol-core/contracts/lib/Errors.sol\":{\"keccak256\":\"0x29ed5c679b7b97b34130195b621e4236734b6211baa8e33caad9bd68f2d37276\",\"license\":\"BUSL-1.1\",\"urls\":[\"bzz-raw://c536d07bf95d11d61e3b1e164ea2deb6cd1b5d393c1e00fa8afd7852e4de1631\",\"dweb:/ipfs/QmYHpbMEhLVi8fZeMb4RDUx4pH51EiZ8Tm9bCPC8rJuNzh\"]},\"lib/protocol-core/contracts/lib/modules/Module.sol\":{\"keccak256\":\"0x2c3345a54240deb6faa24560f64195589e41e1aa88bfac543ca1da55f7028098\",\"license\":\"BUSL-1.1\",\"urls\":[\"bzz-raw://d162ed7cc38967e86482f1e141de568d9549b5d0026aa7445be499e5480ec9c6\",\"dweb:/ipfs/QmR6E5SLu4uM9gbvjEFhMW5kSrnowLUg5SivvV4XfBrS3r\"]},\"lib/protocol-core/contracts/lib/registries/IPAccountChecker.sol\":{\"keccak256\":\"0x057027d7dbba6c02fe827663ad616c6aff339f09210924a5aacfb67fe61a2231\",\"license\":\"BUSL-1.1\",\"urls\":[\"bzz-raw://b5a7b1004b3c096fd9bc29edb200095c3fa3decce1241ec4b42b20c48c0adc5b\",\"dweb:/ipfs/QmezEbLHoFP2w7PY8ux3C8FGEZkW5ETSm9uPLTmN1vYTUs\"]},\"lib/protocol-core/contracts/modules/BaseModule.sol\":{\"keccak256\":\"0x307a2cb5db7164cd0d5e67f35d36784bafd899936ca8006a3bc0a87564730ecd\",\"license\":\"BUSL-1.1\",\"urls\":[\"bzz-raw://c0c0674a1248e658b4275a72e5b36fc6034809e011e69a2bdec03415ba63eaf0\",\"dweb:/ipfs/QmYbv47e7zbJtLPDcTTRo8K4Tihtw3C3G3sEAmtg83wbBf\"]},\"lib/protocol-core/contracts/resolvers/IPResolver.sol\":{\"keccak256\":\"0x71c7c69b0a49d7c5e02109b0e3f959aef6c29f8d3f7a445e9374b368a705d281\",\"license\":\"BUSL-1.1\",\"urls\":[\"bzz-raw://021920519452b59ef7dba879edaaa9617665ba0b01b5de9270572855a2f24de8\",\"dweb:/ipfs/QmPcR7B6YZvHYyBFR4Nynj753xzGoM1GwRDU3b19oVWKJf\"]},\"lib/protocol-core/contracts/resolvers/KeyValueResolver.sol\":{\"keccak256\":\"0x57af8552033f9d57c3b8389d3d6ac9b5fd36f6c2fbb430882aa95023631d3cc8\",\"license\":\"BUSL-1.1\",\"urls\":[\"bzz-raw://5203f21572a0d1abb5bda48a37ebd5d96fda2a9d16786dc43889f5023f230850\",\"dweb:/ipfs/QmQMBVsUsPWk87x3c3TRGmZ63DVGa4npqu5rKni3SD9mtZ\"]},\"lib/protocol-core/contracts/resolvers/ResolverBase.sol\":{\"keccak256\":\"0xe649d150e14b1cd8f949d3165eba46e98da97d17a8fc224bed8983a7cc247327\",\"license\":\"BUSL-1.1\",\"urls\":[\"bzz-raw://b65dd406012358a9ff983269f67842bb05c5bfd92a91464e43eec011a12b56d9\",\"dweb:/ipfs/QmPDsD4Dkm9bxP7FNK6ohP1u82WjBCA3q8AAfZs1MAHokH\"]}},\"version\":1}", "metadata": { "compiler": { "version": "0.8.23+commit.f704f362" }, "language": "Solidity", "output": { "abi": [{ "inputs": [{ "internalType": "address", "name": "caller", "type": "address", "indexed": true }, { "internalType": "address", "name": "ipId", "type": "address", "indexed": true }, { "internalType": "uint256[]", "name": "licenseIds", "type": "uint256[]", "indexed": false }], "type": "event", "name": "DerivativeIPRegistered", "anonymous": false }, { "inputs": [{ "internalType": "address", "name": "caller", "type": "address", "indexed": true }, { "internalType": "address", "name": "ipId", "type": "address", "indexed": true }, { "internalType": "uint256", "name": "policyId", "type": "uint256", "indexed": true }], "type": "event", "name": "RootIPRegistered", "anonymous": false }, { "inputs": [], "stateMutability": "view", "type": "function", "name": "ipResolver", "outputs": [{ "internalType": "contract IPResolver", "name": "", "type": "address" }] }, { "inputs": [{ "internalType": "uint256[]", "name": "licenseIds", "type": "uint256[]" }, { "internalType": "address", "name": "tokenContract", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "string", "name": "ipName", "type": "string" }, { "internalType": "bytes32", "name": "contentHash", "type": "bytes32" }, { "internalType": "string", "name": "externalURL", "type": "string" }, { "internalType": "bytes", "name": "royaltyContext", "type": "bytes" }], "stateMutability": "nonpayable", "type": "function", "name": "registerDerivativeIp" }, { "inputs": [{ "internalType": "uint256", "name": "policyId", "type": "uint256" }, { "internalType": "address", "name": "tokenContract", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "string", "name": "ipName", "type": "string" }, { "internalType": "bytes32", "name": "contentHash", "type": "bytes32" }, { "internalType": "string", "name": "externalURL", "type": "string" }], "stateMutability": "nonpayable", "type": "function", "name": "registerRootIp", "outputs": [{ "internalType": "address", "name": "", "type": "address" }] }], "devdoc": { "kind": "dev", "methods": { "registerDerivativeIp(uint256[],address,uint256,string,bytes32,string,bytes)": { "params": { "contentHash": "The content hash of the IP being registered.", "externalURL": "An external URI to link to the IP.", "ipName": "The name assigned to the new IP.", "licenseIds": "The licenses to incorporate for the new IP.", "royaltyContext": "The royalty context for the derivative IP.", "tokenContract": "The address of the NFT bound to the derivative IP.", "tokenId": "The token id of the NFT bound to the derivative IP." } }, "registerRootIp(uint256,address,uint256,string,bytes32,string)": { "params": { "contentHash": "The content hash of the IP being registered.", "externalURL": "An external URI to link to the IP.", "ipName": "The name assigned to the new IP.", "policyId": "The policy that identifies the licensing terms of the IP.", "tokenContract": "The address of the NFT bound to the root-level IP.", "tokenId": "The token id of the NFT bound to the root-level IP." } } }, "version": 1 }, "userdoc": { "kind": "user", "methods": { "ipResolver()": { "notice": "Returns the metadata resolver used by the registration module." }, "registerDerivativeIp(uint256[],address,uint256,string,bytes32,string,bytes)": { "notice": "Registers derivative IPs into the protocol. Derivative IPs are IP assets that inherit policies from parent IPs by burning acquired license NFTs." }, "registerRootIp(uint256,address,uint256,string,bytes32,string)": { "notice": "Registers a root-level IP into the protocol. Root-level IPs can be thought of as organizational hubs for encapsulating policies that actual IPs can use to register through. As such, a root-level IP is not an actual IP, but a container for IP policy management for their child IP assets." } }, "version": 1 } }, "settings": { "remappings": ["@ensdomains/=lib/protocol-periphery/node_modules/@ensdomains/", "@ethereum-waffle/=lib/protocol-core/node_modules/@ethereum-waffle/", "@openzeppelin/contracts-upgradeable/=lib/openzeppelin-contracts-upgradeable/contracts/", "@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/", "@openzeppelin/openzeppelin-contracts/=lib/openzeppelin-contracts/", "@story-protocol/protocol-core/=lib/protocol-core/", "@story-protocol/protocol-periphery/=lib/protocol-periphery/", "base64-sol/=lib/protocol-core/node_modules/base64-sol/", "ds-test/=lib/protocol-core/node_modules/ds-test/src/", "erc4626-tests/=lib/openzeppelin-contracts-upgradeable/lib/erc4626-tests/", "erc6551/=lib/erc6551/", "eth-gas-reporter/=lib/protocol-core/node_modules/eth-gas-reporter/", "forge-std/=lib/forge-std/src/", "hardhat-deploy/=lib/protocol-core/node_modules/hardhat-deploy/", "hardhat/=lib/protocol-core/node_modules/hardhat/", "openzeppelin-contracts-upgradeable/=lib/openzeppelin-contracts-upgradeable/", "openzeppelin-contracts/=lib/openzeppelin-contracts/", "protocol-core/=lib/protocol-core/", "protocol-periphery/=lib/protocol-periphery/", "solidity-bytes-utils/=lib/solidity-bytes-utils/contracts/"], "optimizer": { "enabled": true, "runs": 200 }, "metadata": { "bytecodeHash": "ipfs" }, "compilationTarget": { "lib/protocol-core/contracts/interfaces/modules/IRegistrationModule.sol": "IRegistrationModule" }, "evmVersion": "paris", "libraries": {} }, "sources": { "lib/erc6551/interfaces/IERC6551Account.sol": { "keccak256": "0xda097894cc052f451ad669c5a07a9eda3f53a948f8080714850dc68cc1040b42", "urls": ["bzz-raw://8ca48dd1eff4f9eee3699a6800c09c4d208d103862f2a55d66286e8eb4b7771e", "dweb:/ipfs/QmX2KX2fmUV5rbVoJSAq6BTVVwxK1Jy169dRJN2h8UCNLz"], "license": "MIT" }, "lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155Receiver.sol": { "keccak256": "0x0f8b8696348d5a57b13d44f5cc63894f0368038c06f6d00bdeda6f9aa13127e7", "urls": ["bzz-raw://718159abc22da25c2de7e70f6b7bbbf6b6e20c3db6681893f8049b57f4ee65ce", "dweb:/ipfs/QmPJeQ7Qj7mrAwfR69sLjyjUSb44B7yAJXvMG1NFtoTJKv"], "license": "MIT" }, "lib/openzeppelin-contracts/contracts/token/ERC721/IERC721Receiver.sol": { "keccak256": "0xcac5b2622b9876529ca71f56b08a2786e960f0a738a9fcc456b2b8740170f89b", "urls": ["bzz-raw://36ec9bacdaa2003a4b68d078f55887e7ec763e83d2027aaa1478578ae71c9b66", "dweb:/ipfs/QmbXfAcgockJRxMxKe5mt1pQyeafwCJuUpxce6a2ehB8bt"], "license": "MIT" }, "lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol": { "keccak256": "0x6fac27fb1885a1d9fd2ce3f8fac4e44a6596ca4d44207c9ef2541ba8c941291e", "urls": ["bzz-raw://2079378abdb36baec15c23bc2353b73a3d28d1d0610b436b0c1c4e6fa61d65c9", "dweb:/ipfs/QmVZkRFMzKW7sLaugKSTbMNnUBKWF3QDsoMi5uoQFyVMjf"], "license": "MIT" }, "lib/openzeppelin-contracts/contracts/utils/introspection/ERC165Checker.sol": { "keccak256": "0xa2a74d4098651d8729e7a83556077e0597d1ee6e2f03b7c94fe87cb5a3a9ee54", "urls": ["bzz-raw://e389d1cd8e06a8885ca04033dc8008a4268b59aa6841db75349fb736ff227f2f", "dweb:/ipfs/QmfFp3Lmvv2d5qGhgTMW5v5msj6dq9rdcK4Yst4GrjFZ9b"], "license": "MIT" }, "lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol": { "keccak256": "0xc859863e3bda7ec3cddf6dafe2ffe91bcbe648d1395b856b839c32ee9617c44c", "urls": ["bzz-raw://a9d5417888b873cf2225ed5d50b2a67be97c1504134a2a580512168d587ad82e", "dweb:/ipfs/QmNr5fTb2heFW658NZn7dDnofZgFvQTnNxKRJ3wdnR1skX"], "license": "MIT" }, "lib/protocol-core/contracts/access/AccessControlled.sol": { "keccak256": "0x4d4af89187fb32253968f09bbb1312cb53d099fe01c5c1ed6d967e47ba883449", "urls": ["bzz-raw://b7da4d1064fa9b605388b0df0e9371dd5a17d473d8ee6778541d499e7a2770be", "dweb:/ipfs/QmQwfVgnRschNdA6zXVDKdu6Jc8H2rCBXWfcbX78oPCR3e"], "license": "BUSL-1.1" }, "lib/protocol-core/contracts/interfaces/IAccessController.sol": { "keccak256": "0xfc5bcc7be1b48a771a91acdf28758bf266312e581ab792e68601233f7f10e071", "urls": ["bzz-raw://770a423d8d710444fee10d5be3996c669a45c358f35417d4d0b8a43b5d5d42ce", "dweb:/ipfs/QmVbW3TRF1qHTdUXpss8V48h8G8huqGLgm4WSRWkEWyFFM"], "license": "BUSL-1.1" }, "lib/protocol-core/contracts/interfaces/IIPAccount.sol": { "keccak256": "0xfe893f22f8d1046cf6088c2ae1230fc6464bcd3a60e36296315644b378fb892c", "urls": ["bzz-raw://c9d4b8eeb8a68b841a6cc35c1e7d1397201958ee68c05fff3b8d009b3c622021", "dweb:/ipfs/QmUuVonRpWHUwA5euw5Gyb23MLBuGaFJ3yTCQfH2bu52ix"], "license": "BUSL-1.1" }, "lib/protocol-core/contracts/interfaces/modules/IRegistrationModule.sol": { "keccak256": "0xee7158d608fa842dddfbc72127e263d5d21b301092cb249152e808c10e442f21", "urls": ["bzz-raw://082293842aa16195ba9865471e4d32bdfe285901a4548ce87b903808e4c169b4", "dweb:/ipfs/QmSJEvundW92hBFnQcJ4dcQYJUpGmPDgwMJbFhdQpxfqxJ"], "license": "BUSL-1.1" }, "lib/protocol-core/contracts/interfaces/modules/base/IModule.sol": { "keccak256": "0x5839736cf66e534f2b9588e5ada36b86386529ef1002c0aa7081a0280b813480", "urls": ["bzz-raw://197da011e22a20546536510610056fc636ce73a76f2ebdb6f116fc1d40f5613d", "dweb:/ipfs/QmNfiP3GvU47FPs2hrA4U4Zgr3CqF8srdUqooD8Qf3Uyve"], "license": "BUSL-1.1" }, "lib/protocol-core/contracts/interfaces/registries/IIPAccountRegistry.sol": { "keccak256": "0x68aa5cbaebd58ffc2411222abb47eb57ddd13aba07bff13c6b4e4a737e7c37fe", "urls": ["bzz-raw://8d925137b55bf0cab40167538b1f9f05e1cafec6735d8e284da94f0f11344d71", "dweb:/ipfs/QmYzgnCoEUMbtSbUeGVE7u5mqfUJ7YqcEubDhLzUYPmQdn"], "license": "BUSL-1.1" }, "lib/protocol-core/contracts/interfaces/resolvers/IKeyValueResolver.sol": { "keccak256": "0xeee94f29dc18f339c14a3b57aa08581e7f29b6425f09f4f128962d2f585a88e1", "urls": ["bzz-raw://e89868ed7d22f9758315b18b74bee262f9ecc7461815d09c0de82c0794dce1dc", "dweb:/ipfs/QmR2BABukMchQ2kDGVWWGWp53pQmkapip8KLU1t3FAGNn6"], "license": "BUSL-1.1" }, "lib/protocol-core/contracts/interfaces/resolvers/IResolver.sol": { "keccak256": "0xabd400089a499d9ec46f9c154262beb59d87345d2a41ded5d3246f2e0f0bd750", "urls": ["bzz-raw://52e190c91b45956f23836a2e6538cf0e51b5d8d68238487a138d27779f2cc79c", "dweb:/ipfs/QmafcbATNXkK6N5qrRB2HbA89pRDavDCtdKXgXkr98kRT7"], "license": "BUSL-1.1" }, "lib/protocol-core/contracts/lib/AccessPermission.sol": { "keccak256": "0xd3feb98ad42db751a31295b6aa8e58fb8e7ee588139a77beaeb87acd89dbfa93", "urls": ["bzz-raw://3e5e39ec6dc2fd7039f1c4da555d9ac675210ec78890f7e5030f3b749b6dd6dc", "dweb:/ipfs/QmTDpm5xBXgMJEojH54emCHEcQuRxE9wteBBd7KbymaUU8"], "license": "BUSL-1.1" }, "lib/protocol-core/contracts/lib/Errors.sol": { "keccak256": "0x29ed5c679b7b97b34130195b621e4236734b6211baa8e33caad9bd68f2d37276", "urls": ["bzz-raw://c536d07bf95d11d61e3b1e164ea2deb6cd1b5d393c1e00fa8afd7852e4de1631", "dweb:/ipfs/QmYHpbMEhLVi8fZeMb4RDUx4pH51EiZ8Tm9bCPC8rJuNzh"], "license": "BUSL-1.1" }, "lib/protocol-core/contracts/lib/modules/Module.sol": { "keccak256": "0x2c3345a54240deb6faa24560f64195589e41e1aa88bfac543ca1da55f7028098", "urls": ["bzz-raw://d162ed7cc38967e86482f1e141de568d9549b5d0026aa7445be499e5480ec9c6", "dweb:/ipfs/QmR6E5SLu4uM9gbvjEFhMW5kSrnowLUg5SivvV4XfBrS3r"], "license": "BUSL-1.1" }, "lib/protocol-core/contracts/lib/registries/IPAccountChecker.sol": { "keccak256": "0x057027d7dbba6c02fe827663ad616c6aff339f09210924a5aacfb67fe61a2231", "urls": ["bzz-raw://b5a7b1004b3c096fd9bc29edb200095c3fa3decce1241ec4b42b20c48c0adc5b", "dweb:/ipfs/QmezEbLHoFP2w7PY8ux3C8FGEZkW5ETSm9uPLTmN1vYTUs"], "license": "BUSL-1.1" }, "lib/protocol-core/contracts/modules/BaseModule.sol": { "keccak256": "0x307a2cb5db7164cd0d5e67f35d36784bafd899936ca8006a3bc0a87564730ecd", "urls": ["bzz-raw://c0c0674a1248e658b4275a72e5b36fc6034809e011e69a2bdec03415ba63eaf0", "dweb:/ipfs/QmYbv47e7zbJtLPDcTTRo8K4Tihtw3C3G3sEAmtg83wbBf"], "license": "BUSL-1.1" }, "lib/protocol-core/contracts/resolvers/IPResolver.sol": { "keccak256": "0x71c7c69b0a49d7c5e02109b0e3f959aef6c29f8d3f7a445e9374b368a705d281", "urls": ["bzz-raw://021920519452b59ef7dba879edaaa9617665ba0b01b5de9270572855a2f24de8", "dweb:/ipfs/QmPcR7B6YZvHYyBFR4Nynj753xzGoM1GwRDU3b19oVWKJf"], "license": "BUSL-1.1" }, "lib/protocol-core/contracts/resolvers/KeyValueResolver.sol": { "keccak256": "0x57af8552033f9d57c3b8389d3d6ac9b5fd36f6c2fbb430882aa95023631d3cc8", "urls": ["bzz-raw://5203f21572a0d1abb5bda48a37ebd5d96fda2a9d16786dc43889f5023f230850", "dweb:/ipfs/QmQMBVsUsPWk87x3c3TRGmZ63DVGa4npqu5rKni3SD9mtZ"], "license": "BUSL-1.1" }, "lib/protocol-core/contracts/resolvers/ResolverBase.sol": { "keccak256": "0xe649d150e14b1cd8f949d3165eba46e98da97d17a8fc224bed8983a7cc247327", "urls": ["bzz-raw://b65dd406012358a9ff983269f67842bb05c5bfd92a91464e43eec011a12b56d9", "dweb:/ipfs/QmPDsD4Dkm9bxP7FNK6ohP1u82WjBCA3q8AAfZs1MAHokH"], "license": "BUSL-1.1" } }, "version": 1 }, "id": 60 }
  const signer = getSepoliaProvider.getSigner();
  console.log(signer)
  const contract = new ethers.Contract(nftContractAddress, contractAbi, signer);

  if (!licenseIds[0] || !nftTokenId) {
    console.error('licenseIds and nftTokenId must be defined');
    return;
  }

  try {
    // Call the registerDerivativeIp function on your contract
    const transaction = await contract.registerDerivativeIp(
      licenseIds,
      nftTokenId,
      ipName,
      contentHash,
      externalUrl,
      royaltyContext,
    );

    // Wait for the transaction to be mined
    await transaction.wait();
    console.log(`Transaction successful with hash: ${transaction.hash}`);
  } catch (error) {
    console.error('Error during the transaction:', error);
  }
};
// spoof Ethereum publicKey to match mock contract
const getEthereumAddress = (path) => {
  const signingKey = new ethers.utils.SigningKey(
    ethers.utils.sha256(ethers.utils.toUtf8Bytes(accountId + "," + path))
  );
  const address = ethers.utils.computeAddress(signingKey.privateKey);
  getSepoliaProvider()
    .getBalance(address)
    .then((balance) => {
      State.update({
        address,
        balance: ethers.utils.formatEther(balance),
      });
    });
};

if (!state.mpcKey) {
  return State.update({
    mpcKey: Near.view(mpcContract, "public_key"),
  });
}

if (!state.address) {
  return getEthereumAddress(state.path || path);
}

const decodeTx = () => {
  if (!baseTx || !txPayload) return;

  const res = fetch(`https://rpc.testnet.near.org`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "EXPERIMENTAL_tx_status",
      params: [txHash, "md1.testnet"],
    }),
  });

  if (!res || !res.ok) {
    return setTimeout(decodeTx, 500);
  }

  console.log("Near TX res", res);

  const args = JSON.parse(
    atob(res.body.result.transaction.actions[0].FunctionCall.args)
  );
  const sigRes = JSON.parse(atob(res.body.result.status.SuccessValue));

  const sig = {
    r: "0x" + sigRes[0].substring(2),
    s: "0x" + sigRes[1],
    v: sigRes[0].substring(0, 2) === "02" ? 0 : 1,
  };
  const recoveredAddress = ethers.utils.recoverAddress(
    args.payload,
    ethers.utils.joinSignature(sig)
  );
  console.log("State Address", state.address);
  console.log("Ethereum Address Recovered", recoveredAddress);
  if (recoveredAddress !== state.address) {
    console.log("signature failed to recover to correct address");
    return;
  }

  if (JSON.stringify(args.payload) !== JSON.stringify(txPayload)) return;

  // console.log("txHex", txHex);
  const signedTx = ethers.utils.serializeTransaction(baseTx, sig);
  console.log("Ethereum Signed TX", signedTx);

  getSepoliaProvider()
    .send("eth_sendRawTransaction", [signedTx])
    .then((hash) => {
      flashAlert(
        "TX Sent! Explorer link will appear soon and balance will update automatically in 30s"
      );
      setTimeout(() => {
        flashAlert(
          <a href={`https://sepolia.etherscan.io/tx/${hash}`} target="_blank">
            Explorer Link
          </a>,
          60000
        );
      }, 4000);
      setTimeout(refreshBalance, 50000);
      setTimeout(refreshBalance, 120000);
    })
    .catch((e) => {
      if (/nonce too low/gi.test(JSON.stringify(e))) {
        console.log("tx has been tried, removing localStorage");
        Storage.privateSet("baseTx", null);
        Storage.privateSet("txPayload", null);
        return;
      }
      if (/gas too low|underpriced/gi.test(JSON.stringify(e))) {
        console.log(e);
        flashAlert(
          "Insufficient funds or gas too low. Try sending a smaller amount."
        );
        return;
      }
      console.log(e);
    });
};

if (!state.decoded && txHash && state.address) {
  decodeTx();
  return State.update({ decoded: true });
}

// Use MPC to sign

try {
  const a = ethers.utils.getAddress("0x");
  console.log(a);
} catch (e) { }

const sign = () => {
  let to = state.to || to;
  try {
    to = ethers.utils.getAddress(to);
  } catch (e) {
    return flashAlert(
      "Invalid to address. Please add a proper Ethereum address to send ETH to."
    );
  }

  getSepoliaProvider()
    .getTransactionCount(state.address)
    .then((nonce) => {
      // Ethereum TX
      const amount = state.amount;
      // 2 gwei + some randomness
      const gasPriceFetch = fetch(
        `https://sepolia.beaconcha.in/api/v1/execution/gasnow`
      );

      const gasPriceData = gasPriceFetch || gasPricePreFetch;
      const { rapid, fast, standard } = gasPriceData.body.data;
      const gasPrice = Math.max(rapid, fast, standard);
      console.log(gasPrice);
      if (!gasPrice)
        return flashAlert(
          "Unable to get gas price. Please refresh and try again."
        );

      const gasLimit = 53000,
        value = ethers.utils.hexlify(ethers.utils.parseUnits(amount));

      if (value === "0x00") {
        return flashAlert("Amount is zero. Please try a non-zero amount.");
      }

      const baseTx = {
        to,
        nonce,
        data: [],
        value: value,
        gasLimit,
        gasPrice,
        chainId,
      };

      // check balance
      if (
        !state.balance ||
        new BN(ethers.utils.parseUnits(state.balance).toString()).lt(
          new BN(ethers.utils.parseUnits(amount).toString()).add(
            new BN(gasPrice).mul(new BN(gasLimit))
          )
        )
      ) {
        return flashAlert("Insufficient funds");
      }

      Storage.privateSet("baseTx", baseTx);
      const unsignedTx = ethers.utils.serializeTransaction(baseTx);
      const txHash = ethers.utils.keccak256(unsignedTx);
      const payload = Object.values(ethers.utils.arrayify(txHash));
      Storage.privateSet("txPayload", payload);

      Near.call(
        mpcContract,
        "sign",
        {
          payload,
          path: state.path || path,
        },
        nearGas
      );
    });
};

const Theme = styled.div`
  box-sizing: border-box;
  margin: auto;
  text-align: center;

  .alert {
    background-color: #eeeeff
  }

  .container {
  text-align: left;
    width: 516px;

  }
  .group {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 16px;
    line-height: 32px;
    > div, > input {
      margin-right: 16px;
    }
    > input {
      border: 1px solid #ddd;
      border-radius: 8px !important;
      padding: 0 4px;
      width: 100px;
    }
    > div:nth-child(1) {
      width: 40px;
    }
    > .address {
      width: 416px;
    }
  }
`;

return (
  <Theme>
    <div className="container">
      {/*
      // Use real kdf with mpcKey
      <iframe
      style={{ display: "none" }}
      src={"https://near-mpc-kdf-iframe.pages.dev/"}
      message={state.message}
      onMessage={(res) => {
        if (res.loaded) {
          State.update({
            message: { publicKey: state.mpcKey, accountId, path },
          });
        }
        if (res.address) {
          State.update({
            address: res.address,
          });
        }
      }}
    />
    */}
      <button onClick={registerDerivativeIp}> click to register</button>
      <h4>Send ETH using Near Account</h4>

      {state.alert && <p className="alert">{state.alert}</p>}

      <p>
        Sending Ethereum Address:
        <br />
        <a
          href={`https://sepolia.etherscan.io/address/${state.address}`}
          target="_blank"
        >
          {state.address}
        </a>
        <br />
        Balance: {state.balance}{" "}
        {state.balance === "0.0" && (
          <span>(fund account before sending from Near)</span>
        )}
      </p>

      <div className="group">
        <div>Path</div>
        <input
          className="amount"
          type="text"
          value={state.path || path}
          onChange={({ target: { value } }) => {
            getEthereumAddress(value);
            Storage.privateSet("path", value);
            State.update({ path: value });
          }}
        />
        <div>
          + &nbsp;<strong>{accountId}</strong>
        </div>
      </div>

      {state.balance && !["0.0", "loading..."].includes(state.balance) ? (
        <>
          <div className="group">
            <div>Send</div>
            <input
              className="amount"
              min={0.01}
              max={1}
              step={0.01}
              type="number"
              value={state.amount}
              onChange={(e) => State.update({ amount: e.target.value })}
            />
            <div>ETH</div>
          </div>
          <div className="group">
            <div>To</div>
            <input
              placeHolder="0x0123456789abcdef..."
              className="address"
              type="text"
              value={state.to || to}
              onChange={({ target: { value } }) => {
                Storage.privateSet("to", value);
                State.update({ to: value });
              }}
            />
          </div>
          <div className="group">
            <div></div>
            <button onClick={sign}>Send</button>
          </div>
        </>
      ) : (
        <button onClick={refreshBalance}>Refresh Balance</button>
      )}
    </div>
  </Theme>
);
