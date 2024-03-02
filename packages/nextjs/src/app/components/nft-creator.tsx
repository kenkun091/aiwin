// Import necessary modules and styles
import { Contract, ContractRunner, ethers } from "ethers";
import styles from "../styles/NftCreator.module.css";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import 'react-dropdown/style.css';
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

// React component for NFT creator form
export default function NftCreator({ contractAddress, abi, connected,  }: { contractAddress: string, abi: any, connected: boolean }) {
  // Hooks for handling form input and submission
  // const { address, isDisconnected } = useAccount();
  // const { data: signer } = useSigner();
  const [txHash, setTxHash] = useState();
  const [jsonURL, setJsonURL] = useState();
  const [weightsURL, setWeightsURL] = useState();
  const [jsonFile, setJsonFile] = useState();
  const [weightsFile, setWeightsFile] = useState();
  const [ModelName, setNFTName] = useState();
  const [ModelDescription, setModelDescription] = useState();
  const [IpLicense, setIpLicense] = useState();
  const [NFTAttributes, setNFTAttributes] = useState([
    { trait_type: "", value: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  let isDisconnected:boolean = !connected;
  let address : string = "";

  // Function to check if all required form fields are filled
  const formNotFilled = () => {
    return (
      !jsonFile ||
      !ModelName ||
      !ModelDescription
    );
  };

  const options = [
    'one', 'two', 'three'
  ];
  const defaultOption = options[0];

  let signer: ContractRunner | null | undefined = null;

  const setSigner = async () => {
    try {

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
      let metadataURL = "test"
      const NFTContract = new Contract(contractAddress, abi, signer);
      const mintTx = await NFTContract.mintAI(metadataURL);
      console.log("mintTx - " + mintTx );
      setTxHash(mintTx.hash);
      await mintTx.wait();

    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  // Callback function for handling file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setJsonFile(acceptedFiles[0] as any);
    setJsonURL(URL.createObjectURL(acceptedFiles[0]) as any);
  }, []);

  // Hook for handling file upload via drag and drop
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: {
      'application/json': ['.json'],
    },
    onDrop,
  });


  // const updateAttribute = (parameter :string, value : string, index : number) => {
  //   const attributes = [...NFTAttributes];
  //   attributes[index][parameter] = value;
  //   setNFTAttributes(attributes);
  // };

  // Function for minting the NFT and generating metadata
  const mintModel = async () => {
    if (formNotFilled()) {
      setError(true);
      return;
    }

    setError(false);
    setIsSubmitting(true);

    try {
      
      const metadataURL: string = await generateMetadata();
      let contractsDir = "src/app/abi/contract-abi.json";
      let address = "0xeE2ed3c2C51497dcb47f9AFFcf69d573E3198CCf"
      var customHttpProvider = new ethers.JsonRpcProvider("https://rpc.sepolia.org");
      // Your Ethereum wallet private key (NEVER hardcode in production!)
      const privateKey = '8c811930da72bb5647096de0a3acc47317ac9fd74872b97cd4474bceba2fe264';
      // Create a wallet signer
      const wallet = new ethers.Wallet(privateKey, customHttpProvider);
      
      let tokenURI = "ipfs://"+ resData2;
      let policyId = IpLicense;
      let hash = ethers.keccak256(ethers.toUtf8Bytes(tokenURI)); // Example hash
      let contract = new ethers.Contract(address, abi, wallet)//
      
      try {
        let tx = await contract.mintAI(tokenURI, { gasLimit: 500000, gasPrice: ethers.parseUnits('20', 'gwei') });
        console.log("Transaction submitted:", tx.hash);

        // Wait for the transaction to be mined
        const res = await tx.wait();
        console.log("Transaction confirmed:", tx.hash);
        const transferEvent = res.events?.filter((e) => e.event === "Transfer")[0];
        if (transferEvent) {
            const tokenId = transferEvent.args.tokenId; // How you access the tokenId might vary
            let tx2 = await contract.setApprovalForAll(address, true);
            console.log("TokenId:", tokenId.toString());
            const res2 = await tx2.wait();
            console.log("Transaction confirmed:", tx2.hash);
            let tx3 = await contract.reg(ModelName, tokenURI, policyId, hash, tokenId, { gasLimit: 1000000, gasPrice: ethers.parseUnits('20', 'gwei') });
            const res3 = await tx3.wait();
            console.log("Transaction confirmed:", tx3.hash);

        } else {
            console.log("No Transfer event found");
        }

    } catch (error) {
        console.error("Error minting AI:", error);
    }
      const mintTx ="";
      //const mintTx = await NFTContract.mintAndRegister(metadataURL, 1);
      console.log("mintTx - " + mintTx );
      setTxHash(mintTx.hash);
      await mintTx.wait();
     // setTxHash(NULL);
    } catch (e) {
      console.log(e);
      return;
    }
  };
  let fileURL = '';
  let resData2 = '';

  // Async function to generate metadata for the NFT
  const generateMetadata = async () => {
    try {
      const pinata_jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyNGVkNjI2ZC0xZmEwLTQ4NTYtYTA3Yi04ZTg0NzYyOWQ0MmEiLCJlbWFpbCI6Im1vdW50YWlub3Jpb25AcHJvdG9uLm1lIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjljOTVmZWNkNzUxMDY3Y2IyODIzIiwic2NvcGVkS2V5U2VjcmV0IjoiMDEzNDVhNjBiMzQ1NjMyMmQ1YzdkNWY1M2I1YjUxN2E5ZDY4MjQ3Y2M1YTQyMGVjNDYzMTVjZDdlNzBhMDVkMCIsImlhdCI6MTcwOTMzNTAwMH0.m8iFXWEjwIUn5_y_e-aTEGueLTKoBNUy7hxVGnzQ7Ww";
      const formData = new FormData();
      formData.append("file", jsonFile as any);
      const metadata = JSON.stringify({
        name: "File name",
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${pinata_jwt}`,
          },
          body: formData,
        }
      );
      const resData = await res.json();
      console.log(resData);
      fileURL = `https://ipfs.io/ipfs/${resData.IpfsHash}`;

      console.log(fileURL); 

    //Take a look at your Pinata Pinned section, you will see a new file added to you list.   

    // Create a metadata object with the NFT's description, image file URL, name, and attributes
    const metadata2 = {
      description: ModelDescription,
      image: fileURL,
      name: ModelName,
      attributes: NFTAttributes,
    };

    const cid = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      body: JSON.stringify(metadata2),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${pinata_jwt}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        resData2 = res.IpfsHash;
        return res.IpfsHash;
    });

  } catch (error) {
    console.log("Error sending File to IPFS: ")
    console.log(error)
  }
  };

  return (
    <>
    <h2>Create Model Cards</h2>
    <div className={styles.page_flexBox}>
      <div
        // Check if transaction hash exists to change styling of container
        className={
          !txHash ? styles.page_container : styles.page_container_submitted
        }
      >
        <div className={styles.dropzone_container} {...getRootProps()}>
          <input {...getInputProps()}></input>
          {/* Check if an image is uploaded and display it */}
          {jsonURL ? (
            <img
              alt={"NFT Image"}
              className={styles.nft_image}
              src={jsonURL}
            />
          ) : isDragActive ? (
            <p className="dropzone-content">Release to drop the files here </p>
          ) : (
            // Default dropzone content
            <div>
              <p className={styles.dropzone_header}>
                Drop your model json here, <br /> or{" "}
                <span className={styles.dropzone_upload}>upload</span>
              </p>
              {/* <p className={styles.dropzone_text}>Supports .jpg, .jpeg, .png</p> */}
            </div>
          )}
        </div>
        <div className={styles.inputs_container}>
          {/* Input field for NFT name */}
          <div className={styles.input_group}>
            <h3 className={styles.input_label}>Name of Model</h3>
            {!txHash ? (
              <input
                className={styles.input}
                value={ModelName}
                onChange={(e) => setNFTName(e.target.value as any)}
                type={"text"}
                placeholder="Model Name"
              />
            ) : (
              <p>{ModelName}</p>
            )}
          </div>
          {/* Input field for Model description */}
          <div className={styles.input_group}>
            <h3 className={styles.input_label}>Description</h3>
            {!txHash ? (
              <input
                className={styles.input}
                onChange={(e) => setModelDescription(e.target.value as any)}
                value={ModelDescription}
                placeholder="Model Description"
              />
            ) : (
              <p>{ModelDescription}</p>
            )}
          </div>
           {/* Select field for IP License */}
           <div className={styles.input_group}>
            <h3 className={styles.input_label}>IP License</h3>
            {!txHash ? (
              <select id="ipLicese" name="ipLicese" className={styles.input} onChange={(e) => setIpLicense(e.target.value as any)}>
                  <option value="1">Open Domain</option>
                  <option value="2">Free with Attribution</option>
                  <option value="3">Paid, no attribution</option>
                  <option value="4">No derivatives</option>
              </select> 
            ) : (
              <p>{IpLicense}</p>
            )}
          </div>
          <div>

          </div>
          <div>
            {isDisconnected ? (
              <p>Connect your wallet to get started</p>
            ) : !txHash ? (
              <div>
                <button
                  className={
                    isSubmitting
                      ? styles.submit_button_submitting
                      : styles.submit_button
                  }
                  disabled={isSubmitting}
                  onClick={async () => await mintModel()}
                >
                  {isSubmitting ? "Creating Model" : "Create Model"}
                </button>
                {error ? (
                  <p className={styles.error}>One or more fields is blank</p>
                ) : null}
              </div>
            ) : (
              <div>
                <h3 className={styles.attribute_input_label}>ADDRESS</h3>
                <a
                  href={`https://mumbai.polygonscan.com/tx/${txHash}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {/* <div className={styles.address_container}>
                    <div>
                      {txHash.slice(0, 6)}...{txHash.slice(6, 10)}
                    </div>
                    <img
                      src={
                        "https://static.alchemyapi.io/images/cw3d/Icon%20Large/etherscan-l.svg"
                      }
                      width="20px"
                      height="20px"
                    />
                  </div> */}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
