"use client";

import { Container } from "@/components/shared/Container";

import { FC, useEffect, useMemo, useState } from "react";
import { AnnouncemetCarousel } from "./_components/Slider";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAnouncementQuery } from "@/queries/useAnnouncementQuery";
import Link from "next/link";
import { useAnouncementCommentsQuery } from "@/queries/useAnnouncementCommentsQuery";

interface AnnoncementsPagePropsType {
    params: {
        id: string;
    };
}

async function base64WithMetadataToBlobURL(
    base64WithMetadata: string,
): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        // Convert base64 string to binary data
        const binaryString = atob(base64WithMetadata.split(",")[1]);
        const binaryData = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            binaryData[i] = binaryString.charCodeAt(i);
        }

        // Create Blob from binary data
        const mimeType = base64WithMetadata.match(/^data:([^;]+);/)?.[1];
        if (!mimeType) {
            reject(new Error("Failed to determine mime type"));
            return;
        }
        const blob = new Blob([binaryData.buffer], { type: mimeType });

        // Create File from Blob
        const fileName = "image"; // Set a default file name
        const file = new File([blob], fileName, { type: mimeType });

        // Create URL from File
        const fileURL = URL.createObjectURL(file);
        resolve(fileURL);
    });
}

const AnnouncementPage: FC<AnnoncementsPagePropsType> = ({
    params: { id },
}) => {
    const [images, setImages] = useState<string[]>([]);

    const Map = useMemo(
        () =>
            dynamic(() => import("./_components/Map"), {
                loading: () => <p>A map is loading</p>,
                ssr: false,
            }),
        [],
    );

    const { data } = useAnouncementQuery(id);
    const { data: comments } = useAnouncementCommentsQuery(id);

    useEffect(() => {
        const res: string[] = [];
        data?.photos?.forEach(async (image: string) => {
            const imageUrl = await base64WithMetadataToBlobURL(image);
            res.push(imageUrl);
            setImages(res);
        });
    }, [data?.photos]);

    console.log(comments);

    return (
        <Container className="pt-4 pb-10">
            <div className="flex justify-center items-center flex-col lg:flex-row gap-16">
                {images.length !== 0 && <AnnouncemetCarousel images={images} />}
                {images.length === 0 && (
                    <Card className="w-[80%] lg:w-full lg:max-w-[500px] aspect-square flex items-center justify-center">
                        <p>Для цього оголошення немає фото</p>
                    </Card>
                )}
                <div className="flex flex-col w-[80%] lg:max-w-[500px]">
                    <div className="flex-1">
                        <p className="text-3xl font-bold">{data?.title}</p>
                        <div
                            className="mt-4"
                            dangerouslySetInnerHTML={{
                                __html: data?.description,
                            }}
                        ></div>
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
                    <div className="flex gap-2 mt-4 justify-center lg:justify-start">
                        <Button asChild>
                            <Link href={`/announcements/${id}/feedback`}>
                                Відгукнутись
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href={data?.contactInfo ?? ""}>Telegram</Link>
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                <p className="text-center text-3xl font-bold mt-10">
                    В останнє замічено в цій локації
                </p>
                <div className="w-full mt-6">
                    <Map
                        location={
                            data?.location
                                ? JSON.parse(`[${data?.coordinates}]`)
                                : [50, 50]
                        }
                    />
                </div>
            </div>
            {comments?.length > 0 && (
                <div>
                    <p className="text-center text-3xl font-bold mt-10">
                        Відгуки волонтерів
                    </p>
                    <div className="flex flex-col gap-2 mt-4">
                        {comments?.map((comment: any) => (
                            <>
                                <p>
                                    {comment.firstName} {comment.lastName}
                                </p>
                                <Card
                                    className="w-full px-3 py-3"
                                    key={comment.commnetId}
                                >
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: comment.comment,
                                        }}
                                    ></div>
                                </Card>
                            </>
                        ))}
                    </div>
                </div>
            )}
        </Container>
    );
};

export default AnnouncementPage;
