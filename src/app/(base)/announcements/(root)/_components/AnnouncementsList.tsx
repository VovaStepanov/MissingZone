import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, FC } from "react";
import { AnouncementCard } from "./AnnouncementCard";
import { Item } from "@/queries/useAnnouncementsQuery";

interface AnnouncementsListPropsType extends ComponentPropsWithoutRef<"div"> {
    items: Item[];
}

export const AnnouncementsList: FC<AnnouncementsListPropsType> = ({
    className,
    items,
    ...rest
}) => {
    return (
        <div
            className={cn(
                "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
                className,
            )}
            {...rest}
        >
            {items?.map((item) => (
                <AnouncementCard
                    id={item.missingPostId}
                    image={
                        item.image ||
                        "https://info.renome.ua/wp-content/uploads/2021/09/placeholder.png"
                    }
                    title={item.title}
                    key={item.missingPostId}
                />
            ))}
        </div>
    );
};
