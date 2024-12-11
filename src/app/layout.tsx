import { Recursive } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Shared/Footer';
import Navbar from '@/components/Shared/Navbar';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/toaster';
// import Providers from '@/components/Providers';
// import { constructMetadata } from '@/lib/utils';


const recursive = Recursive({ subsets: ['latin'] })

// export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={recursive.className}>
          <Navbar />

          <main className='flex grainy-light flex-col min-h-[calc(100vh-3.5rem-1px)]'>
            {children}
            {/* <div className='flex-1 flex flex-col h-full'>
              <Providers>{children}</Providers>
            </div> */}
            <Footer />
          </main>

          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}