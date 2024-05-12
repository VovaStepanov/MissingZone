import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { FC } from "react";

interface AnnoncementsCarouselPropsType {
    images: string[];
}

export const AnnouncemetCarousel: FC<AnnoncementsCarouselPropsType> = ({
    images,
}) => {
    return (
        <Carousel className="w-full max-w-[500px] aspect-square">
            <CarouselContent>
                {images.map((image, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={image as string}
                                        alt="photo"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};
