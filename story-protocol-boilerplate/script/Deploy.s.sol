//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {Aiwin} from "../src/Aiwin.sol";
import "./DeployHelpers.s.sol";

contract DeployScript is Script {
    error InvalidPrivateKey(string);

    function run() external {
        //uint256 deployerPrivateKey = setupLocalhostEnv();0x613128e88b568768764824f898C8135efED97fA6
        address registrationModule = 0x613128e88b568768764824f898C8135efED97fA6;
        address iPAssetRegistry = 0x292639452A975630802C17c9267169D93BD5a793;
        address storyProtocolGateway = 0xf82EEe73c2c81D14DF9bC29DC154dD3c079d80a0;
        /*if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        }*/
        vm.startBroadcast();
        Aiwin aiwin = new Aiwin(
            registrationModule,
            iPAssetRegistry,
            storyProtocolGateway
        );
        console.logString(
            string.concat(
                "YourContract deployed at: ",
                vm.toString(address(aiwin))
            )
        );
        vm.stopBroadcast();

        /**
         * This function generates the file containing the contracts Abi definitions.
         * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
         * This function should be called last.
         */
        //exportDeployments();
    }

    //function test() public {}
}
