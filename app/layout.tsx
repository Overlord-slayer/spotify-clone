import { Figtree } from 'next/font/google'

import './globals.css'

import SideBar from '@/components/SideBar'
import Player from '@/components/Player'

import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'

import getSongsByUserId from '@/actions/getSongsByUserId'
import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices'


const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Spotify clone',
  description: 'Listen to music',
}

export const revalidate = 0

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const userSongs = await getSongsByUserId()
  const products = await getActiveProductsWithPrices()
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products}/>
            <SideBar songs={userSongs}>
              {children}  
            </SideBar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
