"use client"

import { TransactionProvider as TransactionProvider_ } from "@/contexts/transaction.ctx"

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <TransactionProvider_>{children}</TransactionProvider_>
}
