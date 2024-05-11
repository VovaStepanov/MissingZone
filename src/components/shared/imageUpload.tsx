"use client";
import { UploadCloud, X } from "lucide-react";
import { Card } from "../ui/card";
import {
    ChangeEvent,
    ComponentPropsWithRef,
    Ref,
    useEffect,
    useMemo,
    useState,
} from "react";

interface ImageUploadPropsType extends ComponentPropsWithRef<"input"> {
    onFilesChange: (values: string[]) => void;
    filesValue: string[];
    inputRef: Ref<HTMLInputElement>;
}

async function imageToBase64WithMetadata(imageFile: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => {
            const base64String = reader.result?.toString().split(",")[1];
            if (!base64String) {
                reject(new Error("Failed to read image as base64"));
                return;
            }
            const imageName = imageFile.name;
            const extension = imageName.split(".").pop(); // Get the extension
            const base64WithMetadata = `data:image/${extension};base64,${base64String}`;
            resolve(base64WithMetadata);
        };
        reader.onerror = () => reject(new Error("Error reading image"));
    });
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

export const ImageUpload: React.FC<ImageUploadPropsType> = ({
    onFilesChange,
    filesValue,
    inputRef,
    ...rest
}) => {
    const [images, setImages] = useState<string[]>([]);
    const [imagesObj, setImagesObj] = useState<string[]>([]);

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const baseImage = await imageToBase64WithMetadata(file);
            const newImages = [...images, baseImage];

            setImages(newImages);
            onFilesChange(newImages);
        }
    };

    useEffect(() => {
        if (images.length === 0) {
            setImagesObj([]);
        }
        const res: string[] = [];
        console.log(images, "img");
        images.forEach((image) => {
            base64WithMetadataToBlobURL(image).then((imageObj) => {
                res.push(imageObj);
                setImagesObj(res);
            });
        });
    }, [images, setImagesObj]);

    return (
        <Card className="flex flex-col p-4 w-ful">
            <label htmlFor="file-input" className="cursor-pointer">
                <input
                    onChange={handleChange}
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    id="file-input"
                    {...rest}
                />
                <div className="flex flex-col items-center justify-center gap-2">
                    <p className="font-bold text-xl">Upload photos</p>
                    <UploadCloud className="w-[80px] h-[80px]" />
                </div>
            </label>
            {imagesObj.length > 0 && (
                <div className="flex gap-3 pt-4 mt-2 border-t">
                    {imagesObj?.map((image, index) => (
                        <div
                            key={index}
                            className="w-[50px] aspect-square bg-slate-300 relative"
                        >
                            <img
                                src={image}
                                alt="Selected Image"
                                className="w-full h-full object-cover"
                            />
                            <div
                                onClick={() => {
                                    const newImages = images.filter(
                                        (_, idx) => idx !== index,
                                    );
                                    setImages(newImages);
                                    onFilesChange(newImages);
                                }}
                                className="cursor-pointer absolute top-[-5px] right-[-5px] w-[14px] h-[14px] rounded-full bg-slate-300 flex items-center justify-center"
                            >
                                <X className="w-3 h-3" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
};
