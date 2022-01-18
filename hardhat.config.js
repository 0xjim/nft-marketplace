require("@nomiclabs/hardhat-waffle")
const { concat } = require("ethers/lib/utils")
const fs = require('fs')
const privateKey = fs.readFileSync(".secret").toString()
const accountId = fs.readFileSync(".secret1").toString()
const infuraMumbai = "https://polygon-mumbai.infura.io/v3/"
const infuraMain = "https://polygon-mainnet.infura.io/v3/"
const infuraRopsten = "https://ropsten.infura.io/v3/"

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: infuraMumbai.concat(accountId),
      accounts: [privateKey]
    },
    mainnet: {
      url: infuraMain.concat(accountId),
      accounts: [privateKey]
    },
    ropsten: {
      url: infuraRopsten.concat(accountId),
      accounts: [privateKey]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}