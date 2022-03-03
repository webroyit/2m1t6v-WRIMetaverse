// Connection to the blockchain

import abi from "./abi/abi.json" assert {type: "json"};

const connect = new Promise((res, rej) => {
    if(typeof window.ethereum == "undefined") {
        rej("Install Metamask");
    }
    window.ethereum.request({ method: "eth_requestAccounts" });
    
    // Create web3 instance
    // It takes in a provider. (MetaMask Provider)
    let web3 = new Web3(window.ethereum);

    // Instantiate NFT contract
    // It takes in Contract ABI and Address
    let contract = new web3.eth.Contract(abi, "0x9DcbBe83063Fe6CAbb6eCa0CDAfd6057Fd36b3b7");

    // Get ETH address
    web3.eth.getAccounts().then((accounts) => {
        contract.methods
            .totalSupply()
            .call({ from: accounts[0]})
            .then((supply) => {
                contract.methods
                    .getBuilding()
                    .call({ from: accounts[0]})
                    .then((data) => {
                        res({ supply, buildings: data});
                    })
            })
    })
})

export default connect;