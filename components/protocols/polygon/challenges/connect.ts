import {ethers} from 'ethers';

declare let window: {
  ethereum: ethers.providers.ExternalProvider;
};

const connect = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    if (provider) {
      await provider.send('eth_requestAccounts', [])  // this will 00 bring up a Metamask dialog, asking user to unlock their Metamask if it is locked
      //                                              //           01 or if Metamask is unlocked, open page @ connect an account

      const signer  = await provider.getSigner()  // get :signer aka the `current connected account`
      const address = await signer.getAddress()   // get signer's account hash/address  //CAUTION pls mind the await keyword

      return {
        address,
      }

    } else {
      return {error: 'Please install Metamask at https://metamask.io'}
    }
  } catch (error) {
    return {error: 'An unexpected error occurs'}
  }
};
export default connect;
