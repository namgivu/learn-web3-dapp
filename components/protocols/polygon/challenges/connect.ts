import {ethers} from 'ethers';

declare let window: {
  ethereum: ethers.providers.ExternalProvider;
};

const connect = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    if (provider) {
      await provider.send('eth_requestAccounts', []); // this will 00 bring up a Metamask dialog, asking user to unlock their Metamask if it is locked
      //                                               //           01 or if Metamask is unlocked, connect an account to the page

      const signer = provider.getSigner(); // get :signer the current connected account
      const address = await signer.getAddress(); // CAUTION mind the await keyword is required

      return {
        address,
      };
    } else {
      return {
        error: 'Please install Metamask at https://metamask.io',
      };
    }
  } catch (error) {
    return {
      error: 'An unexpected error occurs',
    };
  }
};
export default connect;
