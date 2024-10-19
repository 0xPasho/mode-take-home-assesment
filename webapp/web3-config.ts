import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http, Config } from "wagmi";
import { polygonAmoy } from "wagmi/chains";

export const wagmiConfig: Config = getDefaultConfig({
  appName: "To-Do By Mode Mobile",
  projectId: "915b1c449a121f99a3a316bf2522ed09", // process.env["NEXT_PUBLIC_WALLET_CONNECT_CLIENT_ID"] ?? "",
  chains: [polygonAmoy],
  ssr: true,
  transports: {
    [polygonAmoy.id]: http("https://polygon-amoy-bor-rpc.publicnode.com"),
  },
});
