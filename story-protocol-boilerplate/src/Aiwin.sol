// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.23;

import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import {IPAssetRegistry} from "@story-protocol/protocol-core/contracts/registries/IPAssetRegistry.sol";
import {SPG} from "@story-protocol/protocol-periphery/contracts/lib/SPG.sol";
import {Metadata} from "@story-protocol/protocol-periphery/contracts/lib/Metadata.sol";
import {StoryProtocolGateway} from "@story-protocol/protocol-periphery/contracts/StoryProtocolGateway.sol";
import {RegistrationModule} from "@story-protocol/protocol-core/contracts/modules/RegistrationModule.sol";
contract Aiwin is ERC721URIStorage {
    IPAssetRegistry public ipAssetRegistry;
    RegistrationModule public registerationModule;
    StoryProtocolGateway public spg;

    uint256 public tokenID;


    constructor(address registerationModuleAddress, address ipAssetRegistry_, address spg_) ERC721("AI Win", "AIW") {
        spg = StoryProtocolGateway(spg_);
        ipAssetRegistry = IPAssetRegistry(ipAssetRegistry_);
        registerationModule = RegistrationModule(registerationModuleAddress);
        // Approve the SPG to take actions for IPHolder
        //ipAssetRegistry.setApprovalForAll(address(spg_), true);
        tokenID = 0;
    }

    function f() public returns(bool) {
        return true;
    }

    function mintAI(string memory tokenURI) public returns(uint256){
        tokenID += 1;
        _mint(msg.sender, tokenID);
        _setTokenURI(tokenID, tokenURI);
        
        return tokenID;
    }

    function reg(string memory name, string memory tokenURI, uint256 policyId, bytes32 hash, uint256 id) public {
        address ipId = registerationModule.registerRootIp(policyId, address(this), id, name, hash, tokenURI);
        //_transfer(address(this), msg.sender, tokenID);
    }
}
