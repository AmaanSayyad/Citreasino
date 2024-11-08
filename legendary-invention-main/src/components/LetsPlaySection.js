import LaunchGameButton from "./LaunchGameButton";
import ConnectWalletButton from "./ConnectWalletButton";

export default function LetsPlaySection() {
  return (
    <section id="let'splay" className="items-center flex flex-col px-36 bg-hotline">
      <div className="font-display flex text-white flex-col text-center items-center gap-4 my-[251px]">
        <h1 className="text-5xl">PowerPlay</h1>
        <h2 className="text-white">Join us in the realm of gaming where every click opens up a world of adventure <br /> and discovery. PowerPlay isn&apos;t just a destination; it&apos;s a gateway to boundless <br /> entertainment</h2>
        <div className="flex gap-8">
          <ConnectWalletButton />
          <LaunchGameButton />
        </div>
      </div>
    </section>
  )
}