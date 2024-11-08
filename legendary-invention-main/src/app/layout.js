import "@/styles/globals.css";
// import Providers from "./providers";
// import { headers } from "next/headers";
import AiModal from "@/components/AiModal";
import {
  DynamicContextProvider,
  EthereumWalletConnectors,
} from "@/lib/dynamic";

export const metadata = {
  title: "PowerPlay",
  description: "Web3 gaming arena",
};

export default function RootLayout({ children }) {
  // const cookie = headers().get("cookie");

  return (
    <html lang="en">
      <DynamicContextProvider
        settings={{
          theme: 'dark',
          // Find your environment id at https://app.dynamic.xyz/dashboard/developer
          environmentId: '47c1c3de-d89f-4b94-9783-2c0075cae660',
          walletConnectors: [EthereumWalletConnectors],
        }}
      >
        <body>
          <AiModal />
          {children}
        </body>
      </DynamicContextProvider>
    </html>
  );
}
