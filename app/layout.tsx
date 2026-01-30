import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LinkCode - Smart Class Scheduling System",
  description:
    "AI-powered platform connecting students and teachers through intelligent scheduling based on skills and availability",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if Clerk keys are properly configured
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  if (!publishableKey || publishableKey === "your_clerk_publishable_key_here") {
    // Return layout without Clerk provider if keys are not configured
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-gray-900 mb-2">Clerk Setup Required</h1>
                <p className="text-gray-600 mb-4">To use authentication features, please set up your Clerk API keys.</p>
                <div className="text-left bg-gray-50 rounded p-4 mb-4">
                  <h3 className="font-semibold mb-2">Setup Steps:</h3>
                  <ol className="text-sm text-gray-600 space-y-1">
                    <li>
                      1. Go to{" "}
                      <a
                        href="https://clerk.com"
                        target="_blank"
                        className="text-blue-600 hover:underline"
                        rel="noreferrer"
                      >
                        clerk.com
                      </a>
                    </li>
                    <li>2. Create an account and new application</li>
                    <li>3. Copy your API keys from the dashboard</li>
                    <li>4. Add them to your .env.local file:</li>
                  </ol>
                  <pre className="text-xs bg-gray-800 text-green-400 p-2 rounded mt-2 overflow-x-auto">
                    {`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...`}
                  </pre>
                </div>
                <p className="text-xs text-gray-500">Restart your development server after adding the keys.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    )
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
