"use client";
import React from "react";
import AuthContext from "./auth-provider";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "../../../../web3-config";

type ProviderType = {
  children: React.ReactNode;
};

const Web3Providers = ({ children }: ProviderType) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <AuthContext>{children}</AuthContext>
    </WagmiProvider>
  );
};

export default Web3Providers;
