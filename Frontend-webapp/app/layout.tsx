import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ProjectProvider } from "@/hooks/use-projects"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Project Management App",
  description: "A beautiful project management application with cool hover effects",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ProjectProvider>
            <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">{children}</main>
          </ProjectProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'