"use client";

import Web3Providers from "@/modules/auth/components/web3-providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Web3Providers>{children}</Web3Providers>;
}
