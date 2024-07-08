import { Header } from '@/components/header'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { SidebarDesktop } from '@/components/sidebar-desktop'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/providers'
import { TailwindIndicator } from '@/components/tailwind-indicator'

import '@/app/globals.css'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'font-sans antialiased',
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-col flex-1 bg-muted/50">
              <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
                <SidebarDesktop />
                <div className="group w-full overflow-auto pl-0 animate-in duration-300 ease-in-out peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
                  {children}
                </div>
              </div>
            </main>
          </div>
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  )
}
