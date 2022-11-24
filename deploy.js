const ethers = require("ethers");
const fs = require("fs-extra");

async function main(){
    //compile them in our code
    //compile them separately
    const provider = new ethers.providers.JsonRpcProvider("http://172.24.112.1:7545");
    const wallet = new ethers.Wallet("37410e0012d077ff74a9a61d4ff35d67033facf35ed8937c62a3e9c596726199", provider);
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf-8");
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("Deploying, please wait!...");
    const contract = await contractFactory.deploy(); //STOP here!. Wait for contract to deploy
    console.log(contract);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });