import Image from "next/image"
import LaunchGameButton from "./LaunchGameButton"

export default function Footer() {
  return (
    <footer id="footer">
      <div className="w-full h-0.5 magic-gradient"></div>
      <div className="flex w-full items-center justify-between py-[120px] px-8">
        <a href="/" className="logo">
          <Image src="/PowerPlay.png" alt="powerplay image" width={172} height={15}></Image>
        </a>
        <div className="font-display flex gap-12">
          <a className="text-hover-gradient-home" href="/">Home</a>
          <a className="text-hover-gradient-game" href="/game">Game</a>
          <a className="text-hover-gradient-bank" href="/bank">Bank</a>
        </div>
        <LaunchGameButton />
      </div>
    </footer>
  )
}