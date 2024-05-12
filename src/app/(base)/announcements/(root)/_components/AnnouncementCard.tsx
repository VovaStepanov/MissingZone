import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface AnouncementCardPropsType {
    id: number;
    image: string;
    title: string;
}

export const AnouncementCard: React.FC<AnouncementCardPropsType> = ({
    id,
    image,
    title,
}) => {
    return (
        <Card className="w-full h-full max-w-xs rounded-xl border width">
            <div className="h-full flex flex-col gap-2 sm:gap-4 p-4">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-xl">
                    <Image
                        alt="Product image"
                        className="aspect-[4/5] object-cover border w-full"
                        height="500"
                        src={image}
                        width="400"
                    />
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-xs md:text-base">
                        {title}
                    </h3>
                </div>
                <Button size="sm" className="text-xs sm:text-base" asChild>
                    <Link href={`announcements/${id}`}>Переглянути</Link>
                </Button>
            </div>
        </Card>
    );
};
