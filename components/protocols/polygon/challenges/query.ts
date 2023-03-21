import {ethers} from 'ethers';

declare let window: {
  ethereum: ethers.providers.ExternalProvider;
};

const query = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // get :network :chainId
    const networkName = await provider.getNetwork().then((r_network) => {
      return r_network.name;
    });
    const chainId = await provider.network.chainId;

    // get latest block :blockInfo at :blockHeight=latest
    const blockHeight = await provider.getBlockNumber();
    const blockInfo = await provider.getBlockWithTransactions(blockHeight);

    // get :gasPriceAsGwei
    const gasPrice = await provider.getGasPrice(); //TODO what unit is this price in?
    const gasPriceAsGwei = await ethers.utils.formatUnits(gasPrice, 'gwei');

    if (!chainId || !blockHeight || !gasPriceAsGwei || !blockInfo) {
      throw new Error('Please complete the code');
    }

    return {
      data: {
        networkName,
        chainId,
        blockHeight,
        gasPriceAsGwei,
        blockInfo,
      },
    };
  } catch (error) {
    return {error: error.message};
  }
};

export default query;
