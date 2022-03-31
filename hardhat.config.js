/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomiclabs/hardhat-ethers')
require('dotenv').config()

module.exports = {
  solidity: '0.8.1',
  localhost: {
    chainId: 31337,
    accounts: [process.env.ACCOUNT_PRIVATE_KEY]
  },
  networks: {
    rinkeby: {
      url: process.env.ALCHEMY_RINKEBY_URL,
      accounts: [process.env.ACCOUNT_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
}
