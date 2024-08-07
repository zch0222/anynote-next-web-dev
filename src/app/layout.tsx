import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import FloatButton from "@/components/FloatButton";
import {Providers} from "@/app/providers";
import Message from "@/components/Message";
import Notice from "@/components/notice/Notice";
import './style.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '学习随记',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="zh" suppressHydrationWarning>
      <body className={inter.className}>
      <Providers themeProps={{ attribute: "class", defaultTheme: "auto"}}>
        {children}
        <Message/>
        <FloatButton/>
          <Notice/>
      </Providers>
      </body>
      </html>
  )
}
