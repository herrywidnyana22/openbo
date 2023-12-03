import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import Navbar from './components/navbar/Navbar'
import SignUpModal from './components/modals/SignUpModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './action/getCurrentUser'
import RentModal from './components/modals/RentModal'

const fontBase = Nunito({ 
  subsets: ['latin'] 
})

export const metadata: Metadata = {
  title: 'OpenBO',
  description: 'Booking your favorite hotel and villa',
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body 
        className={fontBase.className}
      >
        <ToasterProvider/>
        <RentModal/>
        <LoginModal/>
        <SignUpModal/>
        <Navbar user={currentUser}/>
        {children}
      </body>
    </html>
  )
}
