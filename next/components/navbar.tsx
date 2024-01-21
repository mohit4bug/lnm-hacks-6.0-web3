"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTransaction } from "@/contexts/transaction.ctx"
import { TransactionModal } from "@/components/transaction-modal"

export function Navbar() {
  const tx = useTransaction()

  return (
    <nav className="max-h-[6rem] min-h-[6rem] flex justify-between items-center px-8">
      <span className="font-extrabold text-3xl tracking-tight">
        CRYP<span className="text-primary">dash</span>
      </span>
      <div className="flex items-center gap-4">
        <Input placeholder="Search here" />
        {tx.currentAccount ? (
          // <Avatar>
          //   <AvatarImage src="https://github.com/mohit4bug.png" />
          //   <AvatarFallback>MK</AvatarFallback>
          // </Avatar>
          <></>
        ) : (
          <Button onClick={tx.connectWallet}>Connect Wallet</Button>
        )}
        <TransactionModal />
      </div>
    </nav>
  )
}
