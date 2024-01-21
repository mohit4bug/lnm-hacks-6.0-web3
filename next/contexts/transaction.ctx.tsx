declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider
  }
}

import { CONTACT_ADDRESS, CONTRACT_ABI } from "@/utils/constants"
import { ethers } from "ethers"
import * as React from "react"

const { ethereum } = window

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  return new ethers.Contract(CONTACT_ADDRESS, CONTRACT_ABI, signer)
}

type TransactionContextType = {
  connectWallet: () => void
  currentAccount: any
  sendTransaction: ({}: {
    addressTo: string
    amount: string
    keyword: string
    message: string
  }) => void
  isLoading: boolean
  getAllTransactions: () => Promise<any[]>
}
const TransactionContext = React.createContext({} as TransactionContextType)
export const useTransaction = () => React.useContext(TransactionContext)

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [currentAccount, setCurrentAccount] = React.useState<any>()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const checkIfWalletIsConnected = async () => {
    try {
      if (ethereum == undefined) return alert("Please install MetaMask")

      if (ethereum.request) {
        const accounts = await ethereum.request({ method: "eth_accounts" })
        if (accounts.length) {
          setCurrentAccount(accounts[0])
        } else {
          console.log("No accounts found")
        }
      }
    } catch (error) {
      // Handle this error
      throw new Error("No ethereum object")
    }
  }

  const connectWallet = async () => {
    try {
      if (ethereum == undefined) return alert("Please install MetaMask")
      if (ethereum.request) {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        })
        setCurrentAccount(accounts[0])
      }
    } catch (error) {
      // Handle this error
      throw new Error("No ethereum object")
    }
  }

  const getAllTransactions = async (): Promise<any[]> => {
    return getEthereumContract().getAllTransactions()
  }

  const sendTransaction = async ({
    addressTo,
    amount,
    keyword,
    message,
  }: {
    addressTo: string
    amount: string
    keyword: string
    message: string
  }) => {
    try {
      setIsLoading(true)

      if (ethereum == undefined) return alert("Please install MetaMask")
      // This will have our all functions in contract
      const transactionContract = getEthereumContract()
      if (ethereum.request) {
        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: addressTo,
              gas: "0x5208",
              value: ethers.utils.parseEther(amount)._hex, // parsed amount
            },
          ],
        })

        const transactionHash = await transactionContract.addToBlockChain(
          addressTo,
          ethers.utils.parseEther(amount)._hex, // parsed amount
          message,
          keyword,
        )
        await transactionHash.wait()

        const transactionCount = await transactionContract.getTransactionCount()
        // We can show transaction count here transactionCount.toNumber()
      }
    } catch (error) {
      // Handle this error
      throw new Error("No ethereum object")
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        sendTransaction,
        isLoading,
        getAllTransactions,
      }}>
      {children}
    </TransactionContext.Provider>
  )
}
