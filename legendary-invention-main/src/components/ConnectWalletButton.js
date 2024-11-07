"use client";
import { useEffect } from "react";
// import { useConnectWallet } from "@/lib/context/ConnectWalletContext";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { handleClientScriptLoad } from "next/script";

export default function ConnectWalletButton() {
  
  const { setShowAuthFlow, user, primaryWallet, handleLogout } = useDynamicContext();

  const onClickHandler = () => {
    // setDefaultTabIndex(1); // Set the default tab index to 1, which corresponds to the Ethereum tab
    setShowAuthFlow(true);
  };

  
  return (
    <div className="bg-gradient-to-r from-red-magic to-blue-magic hover-gradient-shadow rounded-xl p-0.5 cursor-pointer">
      {!user ? (
        <div
          className="bg-[#070005] rounded-xl py-3 px-6 h-full flex items-center"
          onClick={onClickHandler}
        >
          Connect wallet
        </div>
      ) : (
        <div
          className="bg-[#070005] rounded-xl py-3 px-6 h-full flex items-center"
          onClick={handleLogout}
        >
          {`${primaryWallet?.address.substring(0, 8)}......${primaryWallet?.address.slice(-6)}`}
        </div>
      )}
    </div>
  );
}
