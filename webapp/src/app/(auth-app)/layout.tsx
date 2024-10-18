"use client";

import Web3Providers from "@/modules/auth/components/web3-providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Web3Providers>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Web3Providers>
  );
}
