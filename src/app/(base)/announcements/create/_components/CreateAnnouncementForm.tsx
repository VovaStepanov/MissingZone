"use client";

import { ImageUpload } from "@/components/shared/imageUpload";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "react-quill/dist/quill.snow.css";
import { useCreateAnnouncementMutation } from "@/mutations/createAnnouncementMutation";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false,
});

const formSchema = z.object({
    title: z.string().min(1, { message: "Заголовок є обов'язковим" }),
    firstName: z.string().min(1, { message: "Ім'я є обов'язковим" }),
    lastName: z.string().min(1, { message: "Прізвище є обов'язковим" }),
    fatherName: z.string().min(1, { message: "По батькові є обов'язковим" }),
    city: z.string().min(1, { message: "Місто є обов'язковим" }),
    birthDate: z.string().min(1, { message: "Дата народження є обов'язковою" }),
    description: z.string().min(1, { message: "Опис людини є обовзяковим" }),
    photos: z.array(z.string()),
    location: z
        .array(z.number())
        .length(2, { message: "Локація є обовязковою" }),
    contactInfo: z.string().min(1, { message: "Посилання є обовзяковим" }),
});

export const CreateAnnouncementForm = () => {
    const { toast } = useToast();
    const router = useRouter();

    const Map = useMemo(
        () =>
            dynamic(() => import("./Map"), {
                loading: () => <p>A map is loading</p>,
                ssr: false,
            }),
        [],
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            firstName: "",
            lastName: "",
            fatherName: "",
            city: "",
            birthDate: "",
            photos: [],
            location: [],
            contactInfo: "",
            description: "",
        },
    });

    const { mutateAsync: createAnnouncement } = useCreateAnnouncementMutation();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const dateParts = values.birthDate.split("-");

            // Assuming the string is in the format yyyy-mm-dd
            const year = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10) - 1; // Month is 0-indexed in JavaScript Date objects
            const day = parseInt(dateParts[2], 10);

            // Creating a new Date object
            const date = new Date(year, month, day);
            await createAnnouncement({
                title: values.title,
                description: values.description,
                contents: values.photos,
                coordinates: values.location,
                contactInfo: values.contactInfo,
                userId: JSON.parse(localStorage.getItem("email") ?? ""),
                firstName: values.firstName,
                lastName: values.lastName,
                fatherName: values.fatherName,
                birthDate: date,
                city: values.city,
            });
            toast({
                title: "Успіх",
                description: "Оголошення успішно створене",
            });
            router.replace("/announcements");
        } catch (e) {
            toast({
                title: "Помилка",
                description: "Спробуйте пізніше",
            });
        }
    };

    useEffect(() => {
        if (!form.formState.isValid && form.formState.submitCount !== 0) {
            toast({
                title: "Помилка створення оголошення",
                description: Object.values(form.formState.errors)[0].message,
                variant: "destructive",
            });
        }
    }, [
        form.formState.submitCount,
        form.formState.isValid,
        toast,
        form.formState.errors,
    ]);

    return (
        <Form {...form}>
            <form className="mt-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="title">Заголовок</Label>
                                <Input
                                    id="title"
                                    placeholder="Введіть заголовок"
                                    type="text"
                                    {...field}
                                />
                            </LabelInputContainer>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="firstName">Ім&apos;я</Label>
                                <Input
                                    id="firstName"
                                    placeholder="Введіть ім'я"
                                    type="text"
                                    {...field}
                                />
                            </LabelInputContainer>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="lastName">Прізвище</Label>
                                <Input
                                    id="lastName"
                                    placeholder="Введіть прізвище"
                                    type="text"
                                    {...field}
                                />
                            </LabelInputContainer>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="fatherName"
                    render={({ field }) => (
                        <FormItem>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="fatherName">По батькові</Label>
                                <Input
                                    id="fatherName"
                                    placeholder="Введіть по батькові"
                                    type="text"
                                    {...field}
                                />
                            </LabelInputContainer>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="city">Місто</Label>
                                <Input
                                    id="city"
                                    placeholder="Введіть місто"
                                    type="text"
                                    {...field}
                                />
                            </LabelInputContainer>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="contactInfo"
                    render={({ field }) => (
                        <FormItem>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="contactInfo">
                                    Посилання на тегеграм групу
                                </Label>
                                <Input
                                    id="contactInfo"
                                    placeholder="Введіть посилання"
                                    type="text"
                                    {...field}
                                />
                            </LabelInputContainer>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="description">Опис людини</Label>
                                <ReactQuill
                                    id="description"
                                    className="h-[300px]"
                                    theme="snow"
                                    {...field}
                                />
                            </LabelInputContainer>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                        <FormItem>
                            <LabelInputContainer className="mb-4 mt-14">
                                <Label htmlFor="city">Дата народження</Label>
                                <Input
                                    id="birthDate"
                                    placeholder="Введіть дату народження"
                                    type="date"
                                    {...field}
                                />
                            </LabelInputContainer>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="photos"
                    render={({ field: { onChange, value, ref, ...rest } }) => (
                        <FormItem>
                            <ImageUpload
                                {...rest}
                                onFilesChange={(values) => {
                                    onChange(values);
                                }}
                                filesValue={value}
                                inputRef={ref}
                            />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="location">
                                    Останнє місце знаходження
                                </Label>
                                <Map
                                    onClick={(location) => {
                                        field.onChange(location);
                                    }}
                                />
                            </LabelInputContainer>
                        </FormItem>
                    )}
                />

                <Button type="submit">Створити</Button>
            </form>
        </Form>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
