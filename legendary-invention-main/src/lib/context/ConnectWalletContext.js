"use client";
import { createContext, useState, useContext, useRef, useEffect } from "react";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";

const WalletContext = createContext();

// creating one context to share accross the app
export const ConnectWalletProvider = ({ children }) => {
  const { isConnecting, address, isConnected, chain } = useAccount({});
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { disconnect } = useDisconnect();
  const isMounted = useRef(false);

  return (
    <WalletContext.Provider
      value={{
        disconnect,
        isConnected,
        isConnecting,
        address,
        openChainModal,
        isMounted,
        chain,
        openConnectModal,
        openAccountModal,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useConnectWallet = () => useContext(WalletContext);
