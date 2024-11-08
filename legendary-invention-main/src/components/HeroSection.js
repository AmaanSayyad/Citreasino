import Image from "next/image";
import LaunchGameButton from "./LaunchGameButton";
import ConnectWalletButton from "./ConnectWalletButton";

export default function HeroSection() {
  return (
    <section
  id="hero"
  className="min-h-screen items-center flex flex-col pt-36 px-36"
>
  <div className="font-display capitalize flex text-white flex-col text-center items-center gap-6">
    <h1 className="text-6xl font-extrabold leading-tight">
      Enter the Web3 Gaming <br /> Arena:{" "}
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-magic to-blue-magic">
        PowerPlay
      </span>
    </h1>
    <h2 className="text-[#B3B3B3] mt-4 text-xl leading-relaxed max-w-2xl">
      Dive into the next generation of gaming with PowerPlay – where every move is powered by <span className="text-white font-semibold">Citrea Blockchain</span>. Discover new games, connect
      with friends, and unlock endless possibilities.
    </h2>
    <div className="flex gap-6 mt-8">
      <ConnectWalletButton />
      <LaunchGameButton />
    </div>
  </div>
  <Image
    src="/images/HeroImage.png"
    width={863}
    height={487}
    alt="Hero image"
    className="mt-12"
  />
  </section>

  );
}
