import React from 'react'
import '@/styles/globals.css'

export const metadata = {
  description: 'Find your perfect property with our comprehensive real estate listings.',
  title: 'Real Estate Listings',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
