import "@/styles/globals.css";
// import Providers from "./providers";
// import { headers } from "next/headers";
import AiModal from "@/components/AiModal";
export const metadata = {
  title: "PowerPlay",
  description: "Web3 gaming arena",
};
import Providers from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body>
          <AiModal />
          {children}
        </body>
        </Providers>
    </html>
  );
}
