import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const BASE_URL = "https://slop.oneyoung.com"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Slop — OneYoung's Project Lab",
    template: "%s",
  },
  description:
    "Things I build, break, and occasionally ship. A collection of personal software projects, tools and experiments.",
  openGraph: {
    title: "Slop — OneYoung's Project Lab",
    description: "Things I build, break, and occasionally ship.",
    url: BASE_URL,
    siteName: "Slop",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Slop — OneYoung's Project Lab",
    description: "Things I build, break, and occasionally ship.",
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Header />
        <main id="main-content" className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
