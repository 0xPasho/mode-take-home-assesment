"use client";
import React from "react";
import AuthContext from "./auth-provider";
import { config } from "../../../../web3-config";
import { WagmiProvider } from "wagmi";

type ProviderType = {
  children: React.ReactNode;
};

const Web3Providers = ({ children }: ProviderType) => {
  return (
    <WagmiProvider config={config}>
      <AuthContext>{children}</AuthContext>
    </WagmiProvider>
  );
};

export default Web3Providers;
