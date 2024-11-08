import Image from "next/image"

export default function SponsorSection() {
  return (
    <section id="sponsor" className="bg-white text-black py-6 pt-8">
      <h1 className="text-[32px] leading-[40px] text-center font-display">Sponsors</h1>
      <div id="sponsors-icon" className="flex flex-row px-16 justify-between w-full items-center my-16">

        <Image src="/logos/scroll-logo.png" alt="scroll logo" width={107} height={41}></Image>

      </div>
    </section>
  )
}