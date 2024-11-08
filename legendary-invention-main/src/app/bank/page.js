import GradientBorderButton from "@/components/GradientBorderButton";
import Navbar from "@/components/Navbar";
import HeaderText from "@/components/HeaderText";
import Container from "@/components/Container";
import Image from "next/image";
import Footer from "@/components/Footer";
import GradientBgButton from "@/components/GradientBgButton";
export default function Page() {
  return (
    <>
      <Navbar />
      <div className="pt-32 bg-sharp-black text-white px-14">
        <HeaderText
          header="The Bank"
          description={
            "Hey champ! hit the bank and get your assets to play the games."
          }
        />
        <div className="w-full justify-end font-display flex py-5">
          <div className="flex items-center px-3 flex-col border-r">
            <h5 className="text-sm">TOTAL CBTC POOL</h5>
            <span className="text-xl text-sharp-purple">203,746</span>
          </div>
          <div className="flex items-center px-3 flex-col">
            <h5 className="text-sm">CBTC</h5>
            <span className="text-xl text-sharp-purple">APY 6.03%</span>
          </div>
          <div className=" w-1/12 flex items-end justify-center">
            <GradientBorderButton classes="w-full h-2/3">
              Lend
            </GradientBorderButton>
          </div>
        </div>
        <div className="w-full h-0.5 magic-gradient"></div>
        <Container heading="Borrow">
          <div className="flex w-full justify-between my-4">
            <div className="magic-gradient p-0.5 rounded-md">
              <div className="bg-dark-pink font-sans flex gap-10 px-4 py-6 rounded-md">
                <div className="flex  flex-col gap-3">
                  <h5 className="text-xl font-sans">CURRENT</h5>
                  <span className="flex items-center mb-5 gap-1">
                    <Image
                      src="/images/Polygon.png"
                      width={35}
                      height={35}
                      alt="polygon"
                    />
                    <p className="font-medium text-3xl">0</p>
                    <p className="text-sm font-sans opacity-50 flex self-end">
                      (Amoy Testnet)
                    </p>
                  </span>
                  <div>
                    <div className="w-fit p-0.5 rounded-md magic-gradient">
                      <input
                        type="text"
                        className="bg-dark-purple w-[250px] focus:outline-none p-1 rounded-md"
                      />
                    </div>
                    <p className="text-sm">Max borrowable: 0.12334345353535</p>
                  </div>
                </div>
                <div className="flex flex-col justify-end gap-4">
                  <GradientBorderButton>Repay</GradientBorderButton>
                  <button className="w-[120px] magic-gradient rounded-sm py-1 font-display">
                    Borrow
                  </button>
                </div>
              </div>
            </div>
            <div className="magic-gradient p-0.5 rounded-md">
              <div className="bg-dark-pink font-sans flex gap-10 px-4 py-6 rounded-md">
                <div className="flex  flex-col gap-3">
                  <h5 className="text-xl font-sans">CURRENT</h5>
                  <span className="flex items-center mb-5 gap-1">
                    <Image
                      src="/images/Avax.png"
                      width={35}
                      height={35}
                      alt="polygon"
                    />
                    <p className="font-medium text-3xl">0</p>
                    <p className="text-sm font-sans opacity-50 flex self-end">
                      (Fuji Testnet)
                    </p>
                  </span>
                  <div>
                    <div className="w-fit p-0.5 rounded-md magic-gradient">
                      <input
                        type="text"
                        className="bg-dark-purple w-[250px] focus:outline-none p-1 rounded-md"
                      />
                    </div>
                    <p className="text-sm">Max borrowable: 0.12334345353535</p>
                  </div>
                </div>
                <div className="flex flex-col justify-end gap-4">
                  <GradientBorderButton>Repay</GradientBorderButton>
                  <GradientBgButton>Borrow</GradientBgButton>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <Container heading="Deposit Collateral">
          <div className="magic-gradient rounded-md mt-5 p-0.5">
            <table className="w-full rounded-lg">
              <thead className="bg-dark-purple border-gradient w-full">
                <tr className=" border-gradient">
                  <th className="text-left py-4 p-10">ASSET</th>
                  <th className="text-left px-5">PRICE</th>
                  <th className="text-left">WALLET BALANCE</th>
                  <th className="text-left px-5">APY</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="bg-dark-pink">
                <tr className="col-span-full h-0.5 w-full"></tr>
                <tr className="">
                  <td className="flex py-4 gap-3 pl-10">
                    <Image
                      src="/images/Polygon.png"
                      width={24}
                      height={24}
                      alt="polygon"
                    />
                    MATIC (Amoy testnet)
                  </td>
                  <td className="px-5">$0.93</td>
                  <td>0.22</td>
                  <td className="px-5">0.94%</td>
                  <td className="flex items-center  justify-center gap-5">
                    <GradientBorderButton>Withdraw</GradientBorderButton>
                    <GradientBgButton>Deposit</GradientBgButton>
                  </td>
                </tr>
                <tr className="py-4">
                  <td className="flex py-4 gap-3 pl-10">
                    <Image
                      src="/images/Polygon.png"
                      width={24}
                      height={24}
                      alt="polygon"
                    />
                    MATIC (Amoy testnet)
                  </td>
                  <td className="px-5">$0.93</td>
                  <td>0.22</td>
                  <td className="px-5">0.94%</td>
                  <td className="flex items-center justify-center gap-5">
                    <GradientBorderButton>Withdraw</GradientBorderButton>
                    <GradientBgButton>Deposit</GradientBgButton>
                  </td>
                </tr>
                <tr className="py-4">
                  <td className="flex py-4 gap-3 pl-10">
                    <Image
                      src="/images/Polygon.png"
                      width={24}
                      height={24}
                      alt="polygon"
                    />
                    MATIC (Amoy testnet)
                  </td>
                  <td className="px-5">$0.93</td>
                  <td>0.22</td>
                  <td className="px-5">0.94%</td>
                  <td className="flex items-center py-4 justify-center gap-5">
                    <GradientBorderButton>Withdraw</GradientBorderButton>
                    <GradientBgButton>Deposit</GradientBgButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
        <Footer />
      </div>
    </>
  );
}
