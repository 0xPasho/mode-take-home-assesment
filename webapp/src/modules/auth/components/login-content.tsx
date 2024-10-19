"use client";

import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { BoxIcon } from "@radix-ui/react-icons";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const AuthPage = () => {
  const [mounted, setMounted] = React.useState(false);
  const { address, isConnected } = useAccount();
  const [hasSigned, setHasSigned] = React.useState(false);
  const { openConnectModal } = useConnectModal();
  const session = useSession();
  React.useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (session.status === "authenticated") {
      window.location.href = "/";
    }
  }, [session.status]);

  if (!mounted) return <></>;

  const handleSign = async () => {
    //if (!isConnected) open();
    openConnectModal?.();
    // try {
    //   const message = new SiweMessage({
    //     domain: window.location.host,
    //     uri: window.location.origin,
    //     version: "1",
    //     address: address,
    //     statement: process.env.NEXT_PUBLIC_SIGNIN_MESSAGE,
    //     nonce: await getCsrfToken(),
    //     chainId: polygonAmoy.id,
    //   });

    //   const signedMessage = await signMessageAsync({
    //     message: message.prepareMessage(),
    //   });

    //   setHasSigned(true);

    //   const response = await signIn("Ethereum", {
    //     message: JSON.stringify(message),
    //     signedMessage,
    //     redirect: true,
    //     callbackUrl: "/",
    //   });
    //   if (response?.error) {
    //     console.log("Error occured:", response.error);
    //   }
    // } catch (error) {
    //   console.log("Error Occured", error);
    // }
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
          <h2 className="text-5xl font-semibold text-gray-400  text-center">
            To access the todo app
          </h2>
          <p className="text-xl text-gray-500 mt-2 mb-6">you will need to</p>
          <Button onClick={openConnectModal}>
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
          <h2 className="text-5xl font-semibold text-gray-400 text-center">
            Welcome back {address?.slice(0, 8)}...{" "}
          </h2>
          <div>
            <Button
              onClick={openConnectModal}
              variant="default"
              className="mt-4"
            >
              Sign Message to Login
            </Button>
          </div>
        </>
      )}
      {isConnected && hasSigned && (
        <p>You are being authenticated. Please wait...</p>
      )}
    </main>
  );
};

export default AuthPage;
