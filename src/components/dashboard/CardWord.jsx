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
        {/* Card 1 - User Points */}
        <CarouselItem>
          <Card className="w-[380px] h-40 bg-yellow-400">
            <CardContent className="relative flex w-full h-full items-center justify-center">
              <div className="w-full h-full flex flex-col items-start justify-center text-xl text-primary-foreground font-bold p-3 z-50">
                <h1 className="grow text-8xl">{userPoints}</h1>
                <div className="w-full flex justify-between items-center">
                  <h2>YOUR POINTS</h2>
                  <Button>
                    Get More <ArrowRight />
                  </Button>
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

        {/* Card 2 - Shouting Challenge */}
        <CarouselItem>
          <Card className="w-[380px] h-40 bg-blue-600">
            <CardContent className="flex w-full h-full items-center justify-center">
              <div className="w-full h-full  flex items-center justify-center text-xl font-bold">
                <h1>Shouting Challenge</h1>
              </div>
            </CardContent>
          </Card>
        </CarouselItem>

        {/* Card 3 - Leaderboard */}
        <CarouselItem>
          <Card className="w-[380px] h-40 bg-green-600">
            <CardContent className="flex w-full h-full items-center justify-center">
              <div className="w-full h-full flex items-center justify-center text-xl text-primary-foreground font-bold">
                <h1>Leaderboard</h1>
              </div>
            </CardContent>
          </Card>
        </CarouselItem>

        {/* Card 4 - Rewards */}
        <CarouselItem>
          <Card className="w-[380px] h-40 bg-fuchsia-700">
            <CardContent className="flex w-full h-full items-center justify-center">
              <div className="w-full h-full flex items-center justify-center text-xl font-bold">
                <h1>Rewards</h1>
              </div>
            </CardContent>
          </Card>
        </CarouselItem>

        {/* Card 5 - Achievements */}
        <CarouselItem>
          <Card className="w-[380px] h-40 bg-cyan-700">
            <CardContent className="flex w-full h-full items-center justify-center">
              <div className="w-full h-full flex items-center justify-center text-xl text-primary-foreground font-bold">
                <h1>Achievements</h1>
              </div>
            </CardContent>
          </Card>
        </CarouselItem>

        {/* Card 5 - Achievements */}
        <CarouselItem>
          <Card className="w-[380px] h-40 bg-orange-400">
            <CardContent className="flex w-full h-full items-center justify-center">
              <div className="w-full h-full flex items-center justify-center text-xl text-primary font-bold">
                <h1>Events</h1>
              </div>
            </CardContent>
          </Card>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default CardWord;
