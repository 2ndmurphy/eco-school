import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";

const CardWord = ({ userPoints }) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-md"
    >
      <CarouselContent>
        {/* Card 1 - Greeting User */}
        <CarouselItem>
          <Card className="w-[335px] h-40 bg-[#A8D5BA]">
            <CardContent className="relative flex w-full h-full items-center justify-center">
              <div className="w-full h-full flex flex-col text-[#2E604A]">
                <h1 className="text-xl">Selamat Datang!</h1>
                <h1 className="text-xl">Siap jadi bagian dari perubahan?</h1>

                <div className="absolute right-1 -bottom-5 w-[150px] -z-0">
                  <Image
                    src="/images/card/ecosystem.png"
                    width={600}
                    height={600}
                    alt="coin.png"
                  />
                </div>

                <div className="text-sm text-slate-100 ">
                  <p className="line-clamp-4">
                    Ambil tantangan, kumpulkan poin, dan buat dampak nyata bagi
                    lingkungan.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CarouselItem>

        {/* Card 2 - User Points */}
        <CarouselItem>
          <Card className="w-[335px] h-40 bg-yellow-300">
            <CardContent className="relative flex w-full h-full items-center justify-center">
              <div className="w-full h-full flex flex-col items-start justify-center text-xl text-[#FFFFFF] font-bold p-2 z-50">
                <h1 className="grow text-6xl">{userPoints}</h1>
                <div className="w-full">
                  <h2>Poinmu Saat Ini</h2>
                  <p className="text-sm text-slate-100">
                    Lanjutkan aksi hebatmu dan raih lebih banyak reward!
                  </p>
                </div>
              </div>

              <div className="absolute right-4 w-[150px] -z-0">
                <Image
                  src="/images/card/coin.png"
                  width={200}
                  height={200}
                  alt="coin.png"
                />
              </div>
            </CardContent>
          </Card>
        </CarouselItem>

        {/* Card 3 - Challenges */}
        <CarouselItem>
          <Card className="w-[335px] h-40 bg-[#F4A261]">
            <CardContent className="flex w-full h-full items-center justify-center">
              <div className="w-full h-full flex flex-col text-[#4A3F35]">
                <h1 className="text-xl">Tantangan Baru Menantimu!</h1>
                <h1 className="text-xl">Ayo, Ubah Aksi Jadi Prestasi!</h1>

                <div className="text-sm text-slate-100">
                  <p className="line-clamp-4">
                    Ikuti tantangan seru, tingkatkan skor, dan jadilah inspirasi
                    untuk lingkunganmu.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CarouselItem>

        {/* Card 4 - Rewards */}
        <CarouselItem>
          <Card className="w-[335px] h-40 bg-[#FFC857]">
            <CardContent className="flex w-full h-full items-center justify-center">
              <div className="w-full h-full flex flex-col text-[#343434]">
                <h1 className="text-xl">Hadiah untuk Aksi Hebatmu!</h1>
                <h1 className="text-xl">Kumpulkan, Tukarkan, Rayakan!</h1>

                <div className="text-sm text-slate-200">
                  <p className="line-clamp-4">
                    Tukar poinmu dengan hadiah menarik sebagai apresiasi atas
                    kontribusimu menjaga lingkungan.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CarouselItem>

        {/* Card 5 - Leaderboard */}
        <CarouselItem>
          <Card className="w-[335px] h-40 bg-[#3A86FF]">
            <CardContent className="flex w-full h-full items-center justify-center">
              <div className="w-full h-full flex flex-col text-[#FFFFFF]">
                <h1 className="text-xl">Siapa yang Terdepan?</h1>
                <h1 className="text-xl">Lihat Pahlawan Lingkungan Terbaik!</h1>

                <div className="text-sm text-slate-200">
                  <p className="line-clamp-4">
                    Bersaing sehat dan temukan namamu di puncak leaderboard.
                    Jadilah inspirasi bagi komunitas!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CarouselItem>

        {/* Card 5 - Community */}
        <CarouselItem>
          <Card className="w-[335px] h-40 bg-[#9D8DF1]">
            <CardContent className="flex w-full h-full items-center justify-center">
              <div className="w-full h-full flex flex-col text-[#F0F0F0]">
                <h1 className="text-xl">Bersama untuk Lingkungan!</h1>
                <h1 className="text-xl">Temukan Inspirasi dari Sesama</h1>

                <div className="text-sm text-slate-300">
                  <p className="line-clamp-4">
                    Lihat aksi nyata dari komunitas dan bagikan semangat menjaga
                    bumi. Karena bersama, kita lebih kuat!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default CardWord;
