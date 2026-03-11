import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppNav } from './app-nav';
import { useAuthStore } from './store/auth-store';

export function Layout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const { getProfile } = useAuthStore();

  useEffect(() => {
    getProfile();
  }, [getProfile]);
  return (
    <html lang="pt-br">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <QueryClientProvider client={queryClient}>
          <header className="bg-white border-b p-4">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold text-orange-600">AoPonto</h1>
              <AppNav />
            </div>
          </header>
          <main className="max-w-4xl mx-auto p-4">{children}</main>
          <ScrollRestoration />
          <Scripts />
        </QueryClientProvider>
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}
