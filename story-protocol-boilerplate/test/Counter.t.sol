// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {Aiwin} from "../src/Aiwin.sol";


import {IPAssetRegistry} from "@story-protocol/protocol-core/contracts/registries/IPAssetRegistry.sol";
//import {SPG} from "@story-protocol/protocol-periphery/contracts/lib/SPG.sol";
//import {Metadata} from "@story-protocol/protocol-periphery/contracts/lib/Metadata.sol";
import {StoryProtocolGateway} from "@story-protocol/protocol-periphery/contracts/StoryProtocolGateway.sol";
import {RegistrationModule} from "@story-protocol/protocol-core/contracts/modules/RegistrationModule.sol";

contract CounterTest is Test {
    address registrationModule = 0x613128e88b568768764824f898C8135efED97fA6;
    address iPAssetRegistry = 0x292639452A975630802C17c9267169D93BD5a793;
    address storyProtocolGateway = 0xf82EEe73c2c81D14DF9bC29DC154dD3c079d80a0;
    //IPAssetRegistry public iPAssetRegistry;
    //StoryProtocolGateway public storyProtocolGateway;
    //RegistrationModule public registrationModule;
    Aiwin public aiwin;

    function setUp() public {
        //iPAssetRegistry = IPAssetRegistry();
        //storyProtocolGateway = new StoryProtocolGateway();
        //registrationModule = new RegistrationModule();
        aiwin = new Aiwin(registrationModule, iPAssetRegistry, storyProtocolGateway);
    }

    
    function test_mint() public {
        string memory uri = "URL";
        uint256 i = aiwin.mintAI(uri);
    }

    function test_mint_and_reg() public {
        string memory uri = "URL";
        uint256 i = aiwin.mintAI(uri);
        aiwin.setApprovalForAll(address(aiwin), true);
        aiwin.reg("name", uri, 1, keccak256(bytes(uri)), i);
    }
}
