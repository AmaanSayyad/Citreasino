"use client";
import { useEffect, useRef } from "react";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
// import { useAccount, useDisconnect } from "wagmi";
// import "@rainbow-me/rainbowkit/styles.css";
import { useRouter } from "next/navigation";

export default function LaunchGameButton() {
  const router = useRouter();
  // const { isConnecting, address, isConnected, chain } = useAccount();
  // const { openConnectModal } = useConnectModal();
  // const { openAccountModal } = useAccountModal();
  // const { openChainModal } = useChainModal();
  // const { disconnect } = useDisconnect();

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
  }, []);
  return (
    <a
      className="text-white font-display cursor-pointer rounded-xl py-3 px-6 smooth-gradient"
      type="button" href="/game"
    >
      Launch game
    </a>
  );
}
