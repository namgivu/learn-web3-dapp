import {ethers} from 'ethers';

declare let window: {
  ethereum: ethers.providers.ExternalProvider;
};

const RECIPIENT = '0xb11D554F2139d843F5c94a3185d17C4d5762a7c7'; // some random test's address
const AMOUNT = '0.001'; // MATIC amount to send  //TODO why chaning this value not get effected to the webapp ie it always do 0.1 MATIC

const transfer = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const sender_account = provider.getSigner().getAddress();

    const gasPrice_current = await provider.getGasPrice();
    const as_int = parseInt(gasPrice_current.toString()); //TODO why need go around from :gasPrice_current to string then to int insteadof direct itself :gasPrice_current?
    const gasPrice = ethers.utils.hexlify(as_int); //TODO why need hexlify() insteadof direct int value? maybe the ethereum api require having all params in hex

    const gasLimit = ethers.utils.hexlify(100000); //TODO why so big at 100 thousands?  //TODO why need hexlify() insteadof direct int value? maybe the ethereum api require having all params in hex

    const transaction = {
      from: sender_account,
      to: RECIPIENT,
      value: ethers.utils.parseEther(AMOUNT), //TODO why need parseEther() insteadof direct value : AMOUNT

      gasPrice: gasPrice,
      gasLimit: gasLimit,
    };

    const tx_sent = await provider.getSigner().sendTransaction(transaction);
    const tx = await tx_sent.wait();

    return {hash: tx.transactionHash};
  } catch (error) {
    return {error: error.message};
  }
};

export default transfer;
