'use client';
import {
	DynamicContextProvider,
	DynamicWidget,
  } from "@dynamic-labs/sdk-react-core";
import { http, createStorage, cookieStorage } from 'wagmi'
import { 
   mainnet,
	polygon,
	optimism,
	arbitrum,
	goerli,
	polygonMumbai,
	optimismGoerli,
	arbitrumGoerli,
	polygonZkEvm,
	polygonZkEvmTestnet,
	sepolia,
	avalancheFuji,
} from 'wagmi/chains'
import { Chain, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi';
import {
   QueryClientProvider,
   QueryClient,
 } from "@tanstack/react-query";

const projectId = `64df6621925fa7d0680ba510ac3788df`;

const supportedChains = [
   mainnet,
	polygon,
	arbitrum,
	goerli,
	polygonMumbai,
	arbitrumGoerli,
	polygonZkEvm,
	polygonZkEvmTestnet,
	sepolia,
	avalancheFuji,
];

export const config = getDefaultConfig({
   appName: 'Powerplay',
   projectId,
   multiInjectedProviderDiscovery: false,
   chains: supportedChains,
   ssr: true,
   storage: createStorage({
    storage: cookieStorage,
   }),
  transports: supportedChains.reduce((obj, chain) => ({ ...obj, [chain.id]: http() }), {})
 });