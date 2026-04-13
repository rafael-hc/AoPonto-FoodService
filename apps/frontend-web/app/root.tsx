import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { MainLayout } from './components/layout/MainLayout'
import { useAuthStore } from './store/auth-store'

import '../styles.css'

export function Layout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  const { getProfile, isAuthenticated } = useAuthStore()

  useEffect(() => {
    getProfile()
  }, [getProfile])

  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://api.dicebear.com; connect-src 'self' http://localhost:3000;"
        />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen antialiased bg-slate-50 text-slate-800 font-sans">
        <QueryClientProvider client={queryClient}>
          {isAuthenticated ? (
            <MainLayout>{children}</MainLayout>
          ) : (
            <main className="max-w-4xl mx-auto p-4">{children}</main>
          )}
          <ScrollRestoration />
          <Scripts />
        </QueryClientProvider>
      </body>
    </html>
  )
}

export function HydrateFallback() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
        <p className="text-sm font-medium text-slate-500 animate-pulse">Carregando AoPonto...</p>
      </div>
    </div>
  )
}

export default function Root() {
  return <Outlet />
}
