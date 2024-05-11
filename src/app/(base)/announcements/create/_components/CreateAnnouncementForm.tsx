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

const formSchema = z.object({
    firstName: z.string().min(1, { message: "Ім'я є обов'язковим" }),
    lastName: z.string().min(1, { message: "Прізвище є обов'язковим" }),
    fatherName: z.string().min(1, { message: "По батькові є обов'язковим" }),
    city: z.string().min(1, { message: "Місто є обов'язковим" }),
    birthDate: z.string().min(1, { message: "Дата народження є обов'язковою" }),
    photos: z.array(z.string()),
    location: z
        .array(z.number())
        .length(2, { message: "Локація є обовязковою" }),
});

export const CreateAnnouncementForm = () => {
    const { toast } = useToast();

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
            firstName: "",
            lastName: "",
            fatherName: "",
            city: "",
            birthDate: "",
            photos: [],
            location: [],
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
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
                    name="birthDate"
                    render={({ field }) => (
                        <FormItem>
                            <LabelInputContainer className="mb-4">
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
