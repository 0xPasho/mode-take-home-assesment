"use client";
import React from "react";
import { SiweMessage } from "siwe";
import { polygonMumbai } from "viem/chains";
import { useAccount, useSignMessage } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import { getCsrfToken, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { BoxIcon } from "@radix-ui/react-icons";

const AuthPage = () => {
  const [mounted, setMounted] = React.useState(false);
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { signMessageAsync } = useSignMessage();
  const [hasSigned, setHasSigned] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <></>;

  const handleSign = async () => {
    if (!isConnected) open();
    try {
      const message = new SiweMessage({
        domain: window.location.host,
        uri: window.location.origin,
        version: "1",
        address: address,
        statement: process.env.NEXT_PUBLIC_SIGNIN_MESSAGE,
        nonce: await getCsrfToken(),
        chainId: polygonMumbai.id,
      });

      const signedMessage = await signMessageAsync({
        message: message.prepareMessage(),
      });

      setHasSigned(true);

      const response = await signIn("web3", {
        message: JSON.stringify(message),
        signedMessage,
        redirect: true,
        callbackUrl: "/",
      });
      if (response?.error) {
        console.log("Error occured:", response.error);
      }
    } catch (error) {
      console.log("Error Occured", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {!isConnected && (
        <>
          <div>
            <img
              src="https://cdn.prod.website-files.com/61c25b8fda22538c7d02b8ae/64109452b73a8648ed02afee_mode-logo.svg"
              className="w-72 max-w-full"
            />
          </div>
          <h2 className="text-5xl font-semibold text-gray-400">
            To access the todo app
          </h2>
          <p className="text-xl text-gray-500 mt-2 mb-6">you will need to</p>
          <Button onClick={() => open()}>
            <BoxIcon /> Connect Wallet
          </Button>
        </>
      )}
      {isConnected && !hasSigned && (
        <>
          <div>
            <img
              src="https://cdn.prod.website-files.com/61c25b8fda22538c7d02b8ae/64109452b73a8648ed02afee_mode-logo.svg"
              className="w-72 max-w-full"
            />
          </div>
          <p className="text-xl font-semibold text-gray-400">
            Welcome back {address?.slice(0, 8)}...
          </p>
          <Button onClick={handleSign} variant="default" className="mt-4">
            Sign Message to Login
          </Button>
          <Button onClick={() => open()} variant="ghost" className="mt-4">
            Disconnect Wallet
          </Button>
        </>
      )}
      {isConnected && hasSigned && (
        <p>You are being authenticated. Please wait...</p>
      )}
    </main>
  );
};

export default AuthPage;
