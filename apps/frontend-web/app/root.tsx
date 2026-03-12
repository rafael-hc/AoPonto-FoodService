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
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen antialiased bg-slate-50 text-slate-800 font-sans">
        <QueryClientProvider client={queryClient}>
          {isAuthenticated ? (
            <MainLayout />
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

export default function Root() {
  return <Outlet />
}
