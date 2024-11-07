import MagicBorder from "./MagicBorder";
import Image from "next/image";

export default function FeatureGameSection() {
  return (
    <section
      id="trending-games"
      className="flex flex-col items-center pt-7 pb-14 gap-14"
    >
      <h1 className="font-display text-[32px] leading-[40px] text-white">
        Trending games
      </h1>
      <div className="flex flex-row justify-center gap-[21px] px-[76px]">
        <a className="flex gap-6 flex-col" href="/game/roulette">
          <MagicBorder>
            <Image
              className="rounded-lg"
              src="/images/games/roulette.png"
              alt="roulette"
              width={330}
              height={330}
            />
          </MagicBorder>
          <h1 className="font-display text-2xl leading-[30px] text-white">
            Roulette
          </h1>
        </a>
        <a className="flex gap-6 flex-col" href="/game/poker">
          <MagicBorder>
            <Image
              className="rounded-lg"
              src="/images/games/poker.png"
              alt="poker"
              width={330}
              height={330}
            />
          </MagicBorder>
          <h1 className="font-display text-2xl leading-[30px] text-white">
            Poker
          </h1>
        </a>
        <a className="flex gap-6 flex-col" href="/game/fortune-tiger">
          <MagicBorder>
            <Image
              className="rounded-lg"
              src="/images/games/fortune-tiger.png"
              alt="fortune-tiger"
              width={330}
              height={330}
            />
          </MagicBorder>
          <h1 className="font-display text-2xl leading-[30px] text-white">
            Fortune tiger
          </h1>
        </a>
        <a className="flex gap-6 flex-col" href="/game/gates-of-olympus">
          <MagicBorder>
            <Image
              className="rounded-lg"
              src="/images/games/gates-of-olympus.png"
              alt="gates-of-olympus"
              width={330}
              height={330}
            />
          </MagicBorder>
          <h1 className="font-display text-2xl leading-[30px] text-white">
            Gates of Olympus
          </h1>
        </a>
      </div>
    </section>
  );
}
