// https://eth-sepolia.g.alchemy.com/v2/aAqBAUNjrW2mUY2SfSLiUtY3ZIxh4M-Z

require("@nomiclabs/hardhat-waffle")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/aAqBAUNjrW2mUY2SfSLiUtY3ZIxh4M-Z",
      accounts: [
        "07b558122b1e2a119926ec544e8352ee421720358620c9b01187729f7d48df5b",
      ],
      gas: "auto",
    },
  },
}
