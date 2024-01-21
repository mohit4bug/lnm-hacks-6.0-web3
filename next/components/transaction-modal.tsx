"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useTransaction } from "@/contexts/transaction.ctx"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreditCard, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const walletAddressRegex = new RegExp("^(0x)?[0-9a-fA-F]{40}$")

const formSchema = z.object({
  addressTo: z.string().refine((val) => walletAddressRegex.test(val), {
    message: "Invalid wallet address",
  }),
  amount: z.coerce
    .number()
    .positive()
    .transform((val) => val.toString()),
  keyword: z.string(),
  message: z.string(),
})

export function TransactionModal() {
  const tx = useTransaction()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
    mode: "onChange",
  })

  const handleTransaction = form.handleSubmit((data) => {
    tx.sendTransaction(data)
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Pay using Ethereum
          <CreditCard className="w-6 h-6 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete Transaction</DialogTitle>
          <Form {...form}>
            <form onSubmit={handleTransaction} className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="addressTo"
                render={({ field: { value, ...others } }) => (
                  <FormItem>
                    <FormLabel>Recipient's Wallet Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Recipient's wallet address"
                        {...others}
                        defaultValue={value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field: { value, ...others } }) => (
                  <FormItem>
                    <FormLabel>Transaction Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Transaction amount"
                        {...others}
                        defaultValue={value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="keyword"
                render={({ field: { value, ...others } }) => (
                  <FormItem>
                    <FormLabel>Security Keyword</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Keyword of your choice"
                        {...others}
                        defaultValue={value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field: { value, ...others } }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Message"
                        {...others}
                        defaultValue={value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={tx.isLoading}>
                {tx.isLoading && (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                )}
                Continue
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
