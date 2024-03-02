// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.23;

import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import {IPAssetRegistry} from "@story-protocol/protocol-core/contracts/registries/IPAssetRegistry.sol";
import {IStoryProtocolGateway} from "@story-protocol/protocol-periphery/contracts/interfaces/IStoryProtocolGateway.sol";
import {SPG} from "@story-protocol/protocol-periphery/contracts/lib/SPG.sol";
import {Metadata} from "@story-protocol/protocol-periphery/contracts/lib/Metadata.sol";
import {ILicensingModule} from "@story-protocol/protocol-core/contracts/modules/licensing/LicensingModule.sol";
import {StoryProtocolGateway} from "@story-protocol/protocol-periphery/contracts/StoryProtocolGateway.sol";
import {PILPolicy} from "@story-protocol/protocol-core/contracts/modules/licensing/PILPolicyFrameworkManager.sol";
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
        ipAssetRegistry.setApprovalForAll(address(spg_), true);
        tokenID = 0;
    }

    function mintAI(string memory name, string memory tokenURI, bytes memory licencesUsed, uint256 policyId, bytes32 hash) public {
        _safeMint(msg.sender, tokenID);
        _setTokenURI(tokenID, tokenURI);
        // Metadata.Attribute[] memory attributes = new Metadata.Attribute[](1);
        // attributes[0] = Metadata.Attribute({key: "copyrightType", value: "MLmodel"});
        // Metadata.IPMetadata memory ipMetadata = Metadata.IPMetadata({
        //     name: name,
        //     hash: hash,
        //     url: tokenURI,
        //     customMetadata: attributes
        // });

        //address ipId = registerationModule.registerRootIp(policyId, address(this), tokenID, name, hash, tokenURI);
        tokenID += 1;
    }
}
