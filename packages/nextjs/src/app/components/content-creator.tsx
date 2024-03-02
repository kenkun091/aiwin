// Import necessary modules and styles
import { Contract, ContractRunner, ethers } from "ethers";
import styles from "../styles/NftCreator.module.css";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";


// React component for NFT creator form
export default function ContentCreator({ contractAddress, abi, connected,  }: { contractAddress: string, abi: any, connected: boolean }) {
  // Hooks for handling form input and submission
  // const { address, isDisconnected } = useAccount();
  // const { data: signer } = useSigner();
  const [txHash, setTxHash] = useState();
  const [jsonURL, setJsonURL] = useState();
  const [weightsURL, setWeightsURL] = useState();
  const [jsonFile, setJsonFile] = useState();
  const [weightsFile, setWeightsFile] = useState();
  const [docName, setDocName] = useState();
  const [docDescription, setDocDescription] = useState();
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
      !docName ||
      !docDescription
    );
  };

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
      const mintTx = await NFTContract.name();
      // const mintTx = await NFTContract.mintAI(metadataURL, 1);
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

  const onDrop2 = useCallback((acceptedFiles: File[]) => {
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

  // Function for minting the NFT and generating metadata
  const mintDocument = async () => {
    if (formNotFilled()) {
      setError(true);
      return;
    }

    setError(false);
    setIsSubmitting(true);

    try {
      
      const metadataURL: string = await generateMetadata();
      console.log("metadataURL 2 - " + metadataURL );
      setSigner(metadataURL);
      const NFTContract = new Contract(contractAddress, abi, signer);
      const mintTx = await NFTContract.mintAndRegister(metadataURL, 1);
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
      console.log("jwt 3- " + pinata_jwt)
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
    const metadata2 = {docDescription,
      description: docName,
      image: fileURL,
      name: docName,
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
        return res.IpfsHash;
    });

  } catch (error) {
    console.log("Error sending File to IPFS: ")
    console.log(error)
  }

    // Send a POST request to the api/pinJsonToIpfs.js to store the NFT metadata on IPFS
    // const { metadataURL } = await fetch("/api/pinJsonToIpfs", {
    //   method: "POST",
    //   body: JSON.stringify(metadata),
    // }).then((res) => res.json());
  };


  return (
    <>
    <h2>Create Content</h2>
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
                Drop your document json here, <br /> or{" "}
                <span className={styles.dropzone_upload}>upload</span>
              </p>
              {/* <p className={styles.dropzone_text}>Supports .jpg, .jpeg, .png</p> */}
            </div>
          )}
        </div>
        <div className={styles.inputs_container}>
          {/* Input field for NFT name */}
          <div className={styles.input_group}>
            <h3 className={styles.input_label}>Content Name</h3>
            {!txHash ? (
              <input
                className={styles.input}
                value={docName}
                onChange={(e) => setDocName(e.target.value as any)}
                type={"text"}
                placeholder="Content Name"
              />
            ) : (
              <p>{docName}</p>
            )}
          </div>
          {/* Input field for Model description */}
          <div className={styles.input_group}>
            <h3 className={styles.input_label}>Description</h3>
            {!txHash ? (
              <input
                className={styles.input}
                onChange={(e) => setDocDescription(e.target.value as any)}
                value={docDescription}
                placeholder="Content Description"
              />
            ) : (
              <p>{docDescription}</p>
            )}
          </div>
                     {/* Select field for IP License */}
                     <div className={styles.input_group}>
            <h3 className={styles.input_label}>IP License</h3>
            {!txHash ? (
              <select id="ipLicese" name="ipLicese" className={styles.input}>
                  <option value="openDomain">Open Domain</option>
                  <option value="freeWithAttribution">Free with Attribution</option>
                  <option value="paidNoAttribution">Paid, no attribution</option>
                  <option value="noDerivatives">No derivatives</option>
              </select> 
            ) : (
              <p>{IpLicense}</p>
            )}
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
                  onClick={async () => await mintDocument()}
                >
                  {isSubmitting ? "Creating Document" : "Create Document"}
                </button>
                {error ? (
                  <p className={styles.error}>One or more fields is blank</p>
                ) : null}
              </div>
            ) : (
              <div>
                <h3 className={styles.attribute_input_label}>ADDRESS</h3>
                <a
                  href={`https://sepolia.etherscan.io/tx/${txHash}`}
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
