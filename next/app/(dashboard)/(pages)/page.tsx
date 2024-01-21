"use client"

import { TransactionModal } from "@/components/transaction-modal"
import { useTransaction } from "@/contexts/transaction.ctx"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Line, LineChart, ResponsiveContainer } from "recharts"
import { ethers } from "ethers"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function DashboardPage() {
  type TableData = {
    from: string
    to: string
    amount: string
    message: string
    keyword: string
    time: string
  }
  const [tableData, setTableData] = useState<TableData[]>()
  const tx = useTransaction()

  const fetchTransactions = useCallback(async () => {
    const transactions = await tx.getAllTransactions()
    // Only for chart
    const modifiedChartData = transactions.map((tx) => {
      return {
        ethereum: ethers.utils.formatEther(tx.amount._hex),
      }
    })
    // Only for table
    const modifiedTableData = transactions.map((tx) => {
      return {
        from: tx.from,
        to: tx.receiver,
        amount: ethers.utils.formatEther(tx.amount._hex),
        message: tx.message,
        keyword: tx.keyword,
        time: ethers.utils.formatEther(tx.timestamp._hex),
      } as TableData
    })
    setTableData(modifiedTableData)
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [tx.isLoading])

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ]

  return (
    <main className="py-4 px-8 relative h-full flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="border rounded-md p-6 gap-2 flex flex-col hover:border-primary transition-all bg-card">
          <p className="text-xl font-medium">Total Revenue</p>
          <h3 className="text-4xl font-extrabold">$45,231.89</h3>
          <p className="text-sm text-muted-foreground">
            +20.1% from last month
          </p>
        </div>
        <div className="border rounded-md p-6 gap-2 flex flex-col hover:border-primary transition-all bg-card">
          <p className="text-xl font-medium">Total Revenue</p>
          <h3 className="text-4xl font-extrabold">$45,231.89</h3>
          <p className="text-sm text-muted-foreground">
            +20.1% from last month
          </p>
        </div>
        <div className="border rounded-md p-6 gap-2 flex flex-col hover:border-primary transition-all bg-card">
          <p className="text-xl font-medium">Total Revenue</p>
          <h3 className="text-4xl font-extrabold">$45,231.89</h3>
          <p className="text-sm text-muted-foreground">
            +20.1% from last month
          </p>
        </div>
        <div className="border rounded-md p-6 gap-2 flex flex-col hover:border-primary transition-all bg-card">
          <p className="text-xl font-medium">Total Revenue</p>
          <h3 className="text-4xl font-extrabold">$45,231.89</h3>
          <p className="text-sm text-muted-foreground">
            +20.1% from last month
          </p>
        </div>
      </div>
      <div className="min-h-[30rem] max-h-[30rem]">
        <ResponsiveContainer>
          <LineChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <Line type="monotone" dataKey="pv" stroke="#e11d48" />
            <Line type="monotone" dataKey="uv" stroke="#ffffff" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Amount (ethereum)</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Keyword</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData?.map((data) => (
              <TableRow key={data.time}>
                <TableCell title={data.from}>
                  {data.from.slice(0, 10)}...
                </TableCell>
                <TableCell title={data.to}>{data.to.slice(0, 10)}...</TableCell>
                <TableCell className="flex items-center gap-1">
                  {data.amount} <span className="text-primary text-xl">⟠</span>
                </TableCell>
                <TableCell>{data.message}</TableCell>
                <TableCell>{data.keyword}</TableCell>
                <TableCell>{data.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}
