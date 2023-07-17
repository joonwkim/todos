'use client'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '@/components/header'
import Providers from '@/components/Providers'
import Footer from '@/components/footer'

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main className='container'>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
