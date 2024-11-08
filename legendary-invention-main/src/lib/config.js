"use client";
import { http } from "wagmi";
import {
  mainnet,
  polygon,
} from "wagmi/chains";
import {
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
const projectId = `64df6621925fa7d0680ba510ac3788df`;

export const citreaChain = {
  id: 5115,
  name: "Citrea Testnet",
  nativeCurrency: { name: "Citrea Testnet", symbol: "CBTC", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.citrea.xyz"] },
  },
  blockExplorers: {
    default: { name: "Testnet", url: "https://explorer.testnet.citrea.xyz/" },
  },
};
const supportedChains = [mainnet, polygon, citreaChain];
export const config = getDefaultConfig({
  appName: "PowerPlay",
  projectId,
  multiInjectedProviderDiscovery: false,
  chains: supportedChains,
  ssr: true,
  transports: supportedChains.reduce(
    (obj, chain) => ({ ...obj, [chain.id]: http() }),
    {}
  ),
});
