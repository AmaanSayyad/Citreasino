import HeaderText from "@/components/HeaderText";
import Image from "next/image";
import Roulette from "@/images/games/roulette.png";
import fortune from "@/images/games/fortune-tiger.png";
import goo from "@/images/games/gates-of-olympus.png";
import poker from "@/images/games/poker.png";
import carp from "@/images/games/Carp_diem.png";
import fire from "@/images/games/fire_portal.png";
import revenge from "@/images/games/revenge_of_loki.png";
import rush from "@/images/games/sugar_rush.png";
import MagicBorder from "./MagicBorder";
import crash from "@/images/games/crash.png";
import fire_in_hole from "@/images/games/fire_in_the_hole.png";
import dices from "@/images/games/dices.png";
import mines from "@/images/games/mines.png";
import Link from "next/link";
const MostPlayed = () => {
  const games = [
    { name: "Roulette", img: Roulette, link: "/game/roulette" },
    { name: "Fortune Tiger", img: fortune, link: "/game/fortune-tiger" },
    { name: "Poker", img: poker, link: "/game/poker" },
    { name: "Gates of Olympus", img: goo, link: "/game/gates-of-olympus" },
    { name: "Carp Diem", img: carp, link: "/game/carp-diem" },
    { name: "Fire Portal", img: fire, link: "/game/fire-portal" },
    { name: "Revenge of Loki", img: revenge, link: "/game/revenge-of-loki" },
    { name: "Sugar Rush", img: rush, link: "/game/sugar-rush" },
    { name: "Crash", img: crash, link: "/game/crash" },
    { name: "Fire in the Hole", img: fire_in_hole, link: "/game/fire-in-the-hole" },
    { name: "Dices", img: dices, link: "/game/dices" },
    { name: "Mines", img: mines, link: "/game/mines" },
  ];
  return (
    <div className="my-10 py-10">
      <HeaderText
        header="Most Played Games"
        description="Most Player find themselves in these games"
      />

      <div className="grid mt-5 grid-cols-4 gap-5 mb-10">
        {games?.map((game,i) => (
          <div key={i} className="w-full h-full ">
            <Link href={game.link} className="mb-10">
              <MagicBorder>
                <Image
                  src={game.img}
                  width={0}
                  height={0}
                  className="w-full rounded-lg h-full"
                  alt="Roulette"
                />
              </MagicBorder>
            </Link>

            <span
              className="font-display text-xl leading-10 uppercase "
             
            >
              {game.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostPlayed;