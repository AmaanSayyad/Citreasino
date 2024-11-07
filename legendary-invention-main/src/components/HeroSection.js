import Image from "next/image";
import LaunchGameButton from "./LaunchGameButton";
import ConnectWalletButton from "./ConnectWalletButton";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen items-center flex flex-col pt-36 px-36"
    >
      <div className="font-display flex text-white flex-col text-center items-center gap-4">
        <h1 className="text-5xl">
          Enter the Web3 Gaming <br /> Arena:{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-magic to-blue-magic">
            PowerPlay
          </span>
        </h1>
        <h2 className="text-[#B3B3B3]">
          Dive into the next generation of gaming with PowerPlay – where every
          move is
          <br /> powered by blockchain technology. Discover new games, connect
          with friends, and <br /> unlock endless possibilities.
        </h2>
        <div className="flex gap-8 mt-4">
          <ConnectWalletButton />
          <LaunchGameButton />
        </div>
      </div>
      <Image
        src="/images/HeroImage.png"
        width={863}
        height={487}
        alt="Hero image"
      />
    </section>
  );
}
