'use client'; // This is a client component 👈🏽

import { ethers } from "ethers";
import { MetaMaskSDK, SDKProvider } from '@metamask/sdk';
import {
  ConnectionStatus,
  EventType,
  ServiceStatus,
} from '@metamask/sdk-communication-layer';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import './SDKContainer.css';
import {
  send_eth_signTypedData_v4,
  send_personal_sign,
} from '@/app/SignHelpers';
import NftCreator from "./components/nft-creator";
import contract from "./abi/contract-abi.json";
import ContentCreator from "./components/content-creator";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Image from 'next/image'

declare global {
  interface Window {
    ethereum?: SDKProvider;
  }
}

export default function SDKContainer() {
  const [sdk, setSDK] = useState<MetaMaskSDK>();
  const [chain, setChain] = useState('');
  const [account, setAccount] = useState<string>('');
  const [response, setResponse] = useState<any>('');
  const [connected, setConnected] = useState(false);
  const [serviceStatus, setServiceStatus] = useState<ServiceStatus>();
  const [activeProvider, setActiveProvider] = useState<SDKProvider>();

  useEffect(() => {
    const doAsync = async () => {
      const clientSDK = new MetaMaskSDK({
        useDeeplink: false,
        communicationServerUrl: process.env.NEXT_PUBLIC_COMM_SERVER_URL,
        checkInstallationImmediately: false,
        i18nOptions: {
          enabled: true
        },
        dappMetadata: {
          name: 'NEXTJS demo',
          url: 'https://localhost:3000',
        },
        logging: {
          developerMode: false,
        },
        storage: {
          enabled: true,
        },
      });
      await clientSDK.init();
      setSDK(clientSDK);
    };
    doAsync();
  }, []);

  useEffect(() => {
    if(!sdk || !activeProvider) {
      return;
    }

    // activeProvider is mapped to window.ethereum.
    console.debug(`App::useEffect setup active provider listeners`);
    if (window.ethereum?.selectedAddress) {
      console.debug(`App::useEffect setting account from window.ethereum `);
      setAccount(window.ethereum?.selectedAddress);
      setConnected(true);
    } else {
      setConnected(false);
    }

    const onChainChanged = (chain: unknown) => {
      console.log(`App::useEfect on 'chainChanged'`, chain);
      setChain(chain as string);
      setConnected(true);
    };

    const onInitialized = () => {
      console.debug(`App::useEffect on _initialized`);
      setConnected(true);
      if (window.ethereum?.selectedAddress) {
        setAccount(window.ethereum?.selectedAddress);
      }

      if (window.ethereum?.chainId) {
        setChain(window.ethereum.chainId);
      }
    };

    const onAccountsChanged = (accounts: unknown) => {
      console.log(`App::useEfect on 'accountsChanged'`, accounts);
      setAccount((accounts as string[])?.[0]);
      setConnected(true);
    };

    const onConnect = (_connectInfo: any) => {
      console.log(`App::useEfect on 'connect'`, _connectInfo);
      setConnected(true);
      setChain(_connectInfo.chainId as string);
    };

    const onDisconnect = (error: unknown) => {
      console.log(`App::useEfect on 'disconnect'`, error);
      setConnected(false);
      setChain('');
    };

    const onServiceStatus = (_serviceStatus: ServiceStatus) => {
      console.debug(`sdk connection_status`, _serviceStatus);
      setServiceStatus(_serviceStatus);
    };

    window.ethereum?.on('chainChanged', onChainChanged);

    window.ethereum?.on('_initialized', onInitialized);

    window.ethereum?.on('accountsChanged', onAccountsChanged);

    window.ethereum?.on('connect', onConnect);

    window.ethereum?.on('disconnect', onDisconnect);

    sdk.on(EventType.SERVICE_STATUS, onServiceStatus);

    return () => {
      console.debug(`App::useEffect cleanup activeprovider events`);
      window.ethereum?.removeListener('chainChanged', onChainChanged);
      window.ethereum?.removeListener('_initialized', onInitialized);
      window.ethereum?.removeListener('accountsChanged', onAccountsChanged);
      window.ethereum?.removeListener('connect', onConnect);
      window.ethereum?.removeListener('disconnect', onDisconnect);
      sdk.removeListener(EventType.SERVICE_STATUS, onServiceStatus);
    }
  }, [activeProvider])

  useEffect(() => {
    if (!sdk?.isInitialized()) {
      return;
    }

    const onProviderEvent = (accounts?: string[]) => {
      if (accounts?.[0]?.startsWith('0x')) {
        setConnected(true);
        setAccount(accounts?.[0]);
      } else {
        setConnected(false);
        setAccount('');
      }
      setActiveProvider(sdk.getProvider());
    };
    // listen for provider change events
    sdk.on(EventType.PROVIDER_UPDATE, onProviderEvent);
    return () => {
      sdk.removeListener(EventType.PROVIDER_UPDATE, onProviderEvent);
    };
  }, [sdk]);

  const connect = () => {
    if (!window.ethereum) {
      throw new Error(`invalid ethereum provider`);
    }

    window.ethereum
      .request({
        method: 'eth_requestAccounts',
        params: [],
      })
      .then((accounts) => {
        if (accounts) {
          console.debug(`connect:: accounts result`, accounts);
          setAccount((accounts as string[])[0]);
          setConnected(true);
        }
      })
      .catch((e) => console.log('request accounts ERR', e));
  };

  const connectAndSign = async () => {
    try {
      const signResult = await sdk?.connectAndSign({
        msg: 'Connect + Sign message'
      });
      setResponse(signResult);
      setAccount(window.ethereum?.selectedAddress ?? '');
      setConnected(true);
      setChain(window.ethereum?.chainId ?? '');

      let signer = null;

      let provider;
      if (window.ethereum == null) {
      
          // If MetaMask is not installed, we use the default provider,
          // which is backed by a variety of third-party services (such
          // as INFURA). They do not have private keys installed,
          // so they only have read-only access
          console.log("MetaMask not installed; using read-only defaults")
          provider = ethers.getDefaultProvider()
      
      } else {
      
          // Connect to the MetaMask EIP-1193 object. This is a standard
          // protocol that allows Ethers access to make all read-only
          // requests through MetaMask.
          provider = new ethers.BrowserProvider(window.ethereum)
      
          // It also provides an opportunity to request access to write
          // operations, which will be performed by the private key
          // that MetaMask manages for the user.
          signer = await provider.getSigner();
      }

    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  const eth_signTypedData_v4 = async () => {
    if (!activeProvider || !activeProvider.chainId) {
      setResponse(`invalid ethereum provider`);
      return;
    }
    const result = await send_eth_signTypedData_v4(activeProvider, activeProvider.chainId);
    setResponse(result);
  };

  const eth_personal_sign = async () => {
    if (!activeProvider) {
      setResponse(`invalid ethereum provider`);
      return;
    }
    const result = await send_personal_sign(activeProvider);
    setResponse(result);
  };

  const sendTransaction = async () => {
    const to = '0x0000000000000000000000000000000000000000';
    const transactionParameters = {
      to, // Required except during contract publications.
      from: activeProvider?.selectedAddress, // must match user's active address.
      value: '0x5AF3107A4000', // Only required to send ether to the recipient from the initiating external account.
    };

    try {
      // txHash is a hex string
      // As with any RPC call, it may throw an error
      const txHash = (await activeProvider?.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      })) as string;

      setResponse(txHash);
    } catch (e) {
      console.log(e);
    }
  };

  const changeNetwork = async (hexChainId: string) => {
    console.debug(`switching to network chainId=${hexChainId}`);
    try {
      const response = await activeProvider?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexChainId }], // chainId must be in hexadecimal numbers
      });
      console.debug(`response`, response);
    } catch (err) {
      console.error(err);
    }
  };

  const addEthereumChain = () => {
    if (!activeProvider) {
      throw new Error(`invalid ethereum provider`);
    }

    activeProvider
      .request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x89',
            chainName: 'Polygon',
            blockExplorerUrls: ['https://polygonscan.com'],
            nativeCurrency: { symbol: 'MATIC', decimals: 18 },
            rpcUrls: ['https://polygon-rpc.com/'],
          },
        ],
      })
      .then((res) => console.log('add', res))
      .catch((e) => console.log('ADD ERR', e));
  };

  const readOnlyCalls = async () => {
    if(!sdk?.hasReadOnlyRPCCalls() && window.ethereum === undefined){
      setResponse('readOnlyCalls are not set and provider is not set. Please set your infuraAPIKey in the SDK Options');
      return;
    }
    try {
      const result = await window.ethereum?.request({
        method: 'eth_blockNumber',
        params: [],
      });
      console.log(`got blockNumber`, result)
      const gotFrom = sdk!!.hasReadOnlyRPCCalls() ? 'infura' : 'MetaMask provider';
      setResponse(`(${gotFrom}) ${result}`);
    } catch (e) {
      console.log(`error getting the blockNumber`, e);
      setResponse('error getting the blockNumber');
    }
  };

  const terminate = () => {
    sdk?.terminate();
    setChain('');
    setAccount('');
    setResponse('');
  };



  return (
    <>
      <Head>
        <title>Lineage.ai</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ textAlign: "center"}}>

      <div style={{ float: "right" }}>
          {connected ? (
            <div>
              <button
                className={"button-danger"}
                style={{ padding: 10, margin: 10, backgroundColor: 'red' }}
                onClick={terminate}
              >
                Disconnect
              </button>
            </div>
          ) : (
            <>
              <button className={"cd "} style={{ padding: 10, margin: 10 }} onClick={connectAndSign}>
                Connect w/ Sign
              </button>
            </>
          )}

        </div>
        <div style={{ float: "right"}}>
          Powered by 
          <div style={{ padding: "10px"}}>
            <Image
              src="/Story_Protocol_Gray.png"
              width={217.8}
              height={18.4}
              alt="Story Protocol"
            /></div>
          <div style={{ padding: "5px", marginTop: "-5px"}}>
            <Image
              src="/full-near-logo.png"
              width={87.5}
              height={22.05 }  
              alt="Near"
            /></div>
          <div style={{ marginTop: "-30px"}}>
            <Image
              src="/MetaMask.svg"
              width={153.6}
              height={86.4}  
              alt="MetaMask"
            />
            </div>
        </div>
        <div style={{ textAlign: "left"}}>
          <Image
            src="/Lineage.png"
            width={439}
            height={83}
            alt="Lineage.ai"
          />
        </div>


        <Tabs>
          <TabList>
            <Tab>Model Cards</Tab>
            <Tab>Documents</Tab>
          </TabList>

          <TabPanel>
            <NftCreator
            abi={contract}
            connected = {connected}
            contractAddress={"0xeE2ed3c2C51497dcb47f9AFFcf69d573E3198CCf"}
          />
          </TabPanel>
          <TabPanel>
            <ContentCreator
            abi={contract.abi}
            connected = {connected}
            contractAddress={"0xeE2ed3c2C51497dcb47f9AFFcf69d573E3198CCf"}
          />
          </TabPanel>
        </Tabs>

      </main>
    </>
  );
}
