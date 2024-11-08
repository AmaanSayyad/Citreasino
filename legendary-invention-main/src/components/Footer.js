import Image from "next/image";
import LaunchGameButton from "./LaunchGameButton";

export default function Footer() {
  return (
    <footer id="footer" className="bg-black text-white py-16 px-8">
      {/* Top Divider */}
      <div className="w-full h-0.5 magic-gradient mb-10"></div>

      {/* Footer Content */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo and Description */}
        <div className="md:pr-6">
          <a href="/" className="logo">
            <Image src="/PowerPlay.png" alt="PowerPlay logo" width={172} height={15} />
          </a>
          <p className="mt-4 text-sm text-white/70">
            PowerPlay is your ultimate destination for Web3 gaming. Experience transparency, fairness,
            and excitement powered by blockchain technology.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="font-bold text-lg mb-4">Navigation</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-[#F39C12]">Home</a>
            </li>
            <li>
              <a href="/game" className="hover:text-[#F39C12]">Game</a>
            </li>
            <li>
              <a href="/bank" className="hover:text-[#F39C12]">Bank</a>
            </li>
            <li>
              <a href="/about" className="hover:text-[#F39C12]">About Us</a>
            </li>
            <li>
              <a href="/faq" className="hover:text-[#F39C12]">FAQs</a>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="font-bold text-lg mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="/contact" className="hover:text-[#F39C12]">Contact Us</a>
            </li>
            <li>
              <a href="/privacy-policy" className="hover:text-[#F39C12]">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms-of-service" className="hover:text-[#F39C12]">Terms of Service</a>
            </li>
            <li>
              <a href="/responsible-gaming" className="hover:text-[#F39C12]">Responsible Gaming</a>
            </li>
          </ul>
        </div>

        {/* Social Media and Launch Button */}
        <div>
          <h3 className="font-bold text-lg mb-4">Stay Connected</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Image src="/icons/twitter.png" alt="Twitter" width={40} height={40} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Image src="/icons/facebook.png" alt="Facebook" width={40} height={40} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Image src="/icons/instagram.png" alt="Instagram" width={40} height={40} />
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" aria-label="Discord">
              <Image src="/icons/discord.png" alt="Discord" width={40} height={40} />
            </a>
          </div>
          <LaunchGameButton />
        </div>
      </div>

      {/* Bottom Divider and Legal */}
      <div className="mt-10 w-full h-0.5 magic-gradient"></div>
      <div className="mt-6 text-sm text-center text-white/60">
        © {new Date().getFullYear()} PowerPlay. All rights reserved. PowerPlay is committed to providing
        a fair and responsible gaming environment.
      </div>
    </footer>
  );
}
