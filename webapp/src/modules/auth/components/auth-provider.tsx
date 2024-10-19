"use client";

import { SessionProvider } from "next-auth/react";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { useTheme } from "next-themes";
import {
  darkTheme,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export interface AuthContextProps {
  children: React.ReactNode;
}
const queryClient = new QueryClient();

export default function AuthContext({ children }: AuthContextProps) {
  const { theme } = useTheme();
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <RainbowKitSiweNextAuthProvider
          getSiweMessageOptions={() => ({
            statement: process.env.NEXT_PUBLIC_SIGNIN_MESSAGE,
            domain: new URL(
              "https://6cb5-2806-2f0-53e0-b62-ad1f-1600-bdf9-914b.ngrok-free.app"
            ).host, //process.env.NEXT_PUBLIC_APP_URL!).host,
          })}
        >
          <RainbowKitProvider
            theme={theme === "dark" ? darkTheme() : lightTheme()}
            showRecentTransactions
          >
            {children}
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
