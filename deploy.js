const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main(){
    //compile them in our code
    //compile them separately
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    console.log(`${process.env.PRIVATE_KEY}`)
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf-8");
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    //Deploy contract
    console.log("Deploying, please wait!...");
    const contract = await contractFactory.deploy(); //STOP here!. Wait for contract to deploy
    await contract.deployTransaction.wait(1);
    //Get Favorite Number by Interacting with the contract
    const currentFavoriteNumber = await contract.retrieve();
    console.log(`Your initial favorite number is: ${currentFavoriteNumber}`);
    //Update Favorite Number by Interacting with the contract
    const transactionResponse = await contract.store("7");
    const transactionReceipt = await transactionResponse.wait(1);
    const updateFavoriteNumber = await contract.retrieve();
    console.log(`Your update favorite number is: ${updateFavoriteNumber}`);   

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });