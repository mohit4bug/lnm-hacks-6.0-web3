import "@/app/globals.css"
import { fontSans } from "@/lib/fonts"
import { TransactionProvider } from "@/providers/transaction.provider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={fontSans.className}>
        <TransactionProvider>{children}</TransactionProvider>
      </body>
    </html>
  )
}
