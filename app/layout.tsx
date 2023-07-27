'use client'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '@/components/header'
import Providers from '@/components/Providers'
import Footer from '@/components/footer'
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main className='container'>
            {children}
          </main>
          <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
