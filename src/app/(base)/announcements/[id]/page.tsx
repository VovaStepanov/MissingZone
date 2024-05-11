"use client";

import { Container } from "@/components/shared/Container";

import { FC, useMemo } from "react";
import { AnnouncemetCarousel } from "./_components/Slider";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const Map = dynamic(() => import("./_components/Map"), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
});

interface AnnoncementsPagePropsType {
    params: {
        id: string;
    };
}

const AnnouncementPage: FC<AnnoncementsPagePropsType> = ({
    params: { id },
}) => {
    return (
        <Container className="pt-4">
            <div className="flex justify-center gap-16">
                <AnnouncemetCarousel images={["", "", ""]} />
                <div className="flex flex-col max-w-[500px]">
                    <div className="flex-1">
                        <p className="text-3xl font-bold">
                            Розшукується John Doe John
                        </p>
                        <p className="mt-4">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Deserunt, error? Quia in, repudiandae hic nam
                            non eligendi sequi vel cum quo rem eos commodi
                            nostrum ratione unde reiciendis earum architecto.
                            Ipsum eos voluptatem accusamus ullam eum amet
                            mollitia ad quis molestias accusantium,
                            reprehenderit nesciunt! Ullam blanditiis explicabo
                            id! Soluta dicta amet tempora sequi possimus dolores
                            fuga illum repellat beatae qui!
                        </p>
                    </div>
                    {/* <div className="mt-4">
                        <p className="font-bold">
                            Приєднайся до Telegram розшуку
                        </p>
                        <Button className="mt-2 bg-blue-900">
                            Приєднатись
                        </Button>
                    </div> */}
                    {/* <div className="flex-1">
                        <div className="mt-4">
                            <p className="font-bold">
                                В останнє замічений в місті:
                            </p>
                            <div className="flex mt-2">
                                <Card className="shrink px-5 py-2 text-slate-700 dark:text-gray-300">
                                    <p className="text-sm">Львів</p>
                                </Card>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="font-bold">Контактні дані:</p>
                            <div className="flex mt-2">
                                <Card className="shrink px-5 py-2 text-slate-700 dark:text-gray-300">
                                    <p className="text-sm">+380957850733</p>
                                </Card>
                            </div>
                        </div>
                    </div> */}
                    <div className="flex gap-2 mt-4">
                        <Button>Відгукнутись</Button>
                        <Button variant="outline">Telegram</Button>
                    </div>
                </div>
            </div>
            <div>
                <Map />
            </div>
        </Container>
    );
};

export default AnnouncementPage;
