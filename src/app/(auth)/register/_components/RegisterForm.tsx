"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ImageUpload } from "@/components/shared/imageUpload";
import { Switch } from "@/components/ui/switch";
import { RegisterUser } from "@/services/auth.service";
import { useRegisterMutation } from "@/mutations/registerMutations";
import { useRouter } from "next/navigation";

const formSchema = z
    .object({
        firstName: z.string().min(1, { message: "Ім'я обов'язкове" }),
        lastName: z.string().min(1, { message: "Прізвище обов'язкове" }),
        email: z
            .string()
            .min(1, { message: "Вкажіть Email" })
            .email({ message: "Email некоректний" }),
        password: z
            .string()
            .min(1, { message: "От халепа! :( Введіть пароль" })
            .min(8, { message: "Введіть довший пароль" }),
        confirmPassword: z
            .string()
            .min(1, { message: "Необхідно ввести пароль" })
            .min(8, { message: "Введіть довший пароль" }),

        phoneNumber: z.string().refine(
            (value) => {
                // Regular expression to validate Ukrainian phone number
                const ukrainianPhoneNumberRegex = /^(?:\+380|0)(\d{9})$/;
                return ukrainianPhoneNumberRegex.test(value);
            },
            { message: "Некоректний український номер" },
        ),

        isVolunteer: z.boolean(),

        volunteerOrganizationName: z.string(),

        uploadedPhoto: z
            .array(z.string())
            .length(1, { message: "Потрібно завантажити одне фото" }),
    })
    .refine((schema) => schema.password === schema.confirmPassword, {
        message: "Паролі повинні бути однаковими",
    })
    .refine(
        (schema) => {
            if (schema.isVolunteer) {
                return schema.volunteerOrganizationName.trim() !== "";
            }
            return true;
        },
        {
            message:
                "Назва волонтерської організації є обов'язковою для волонтерів",
        },
    );

export const RegisterForm = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);

    const [isVolunteer, setIsVolunteer] = useState(false);

    const { toast } = useToast();

    const { mutateAsync: registerUser } = useRegisterMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
            isVolunteer: false,
            volunteerOrganizationName: "",
            uploadedPhoto: [],
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values, "asd");

        const userData: RegisterUser = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phone: values.phoneNumber,
            password: values.password,
            photo: values.uploadedPhoto[0],
            organizationName: values.volunteerOrganizationName,
        };

        try {
            const response = await registerUser(userData);
            toast({
                title: "Успіх!",
                description: "Ви зареєструвались",
            });
            router.push("/login");
        } catch (error) {
            toast({
                title: "Помилка реєстрації",
                description: "Щось пішло не так",
                variant: "destructive",
            });
        }
    };

    useEffect(() => {
        if (!form.formState.isValid && form.formState.submitCount !== 0) {
            toast({
                title: "Лишенько... Помилка реєстрації :(",
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
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <div
                className={cn("flex justify-between items-center mb-4", {
                    "justify-end": step === 1,
                })}
            >
                {step === 2 && (
                    <button
                        type="button"
                        className="w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
                        onClick={() => setStep(1)}
                    >
                        <span>Назад</span>
                    </button>
                )}
                <p className="text-sm text-gray-500">Крок {step} з 2</p>
            </div>

            <Form {...form}>
                <form className="my-8" onSubmit={form.handleSubmit(onSubmit)}>
                    {step === 1 && (
                        <>
                            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                                Вітаємо в MissingZone
                            </h2>
                            <p className="text-neutral-600 text-base max-w-sm mt-2 dark:text-neutral-300 font-semibold mb-3.5">
                                Зареєструйтесь, щоб знайти людину
                            </p>

                            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <LabelInputContainer>
                                                <Label htmlFor="firstname">
                                                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                                                    Ім'я
                                                </Label>
                                                <Input
                                                    id="firstname"
                                                    placeholder="Олександр"
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
                                            <LabelInputContainer>
                                                <Label htmlFor="lastname">
                                                    Прізвище
                                                </Label>
                                                <Input
                                                    id="lastname"
                                                    placeholder="Левченко"
                                                    type="text"
                                                    {...field}
                                                />
                                            </LabelInputContainer>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <LabelInputContainer className="mb-4">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                placeholder="Oleksandr.Levchenko@gmail"
                                                type="text"
                                                {...field}
                                            />
                                        </LabelInputContainer>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <LabelInputContainer className="mb-4">
                                            <Label htmlFor="password">
                                                Пароль
                                            </Label>
                                            <Input
                                                id="password"
                                                placeholder="••••••••"
                                                type="password"
                                                {...field}
                                            />
                                        </LabelInputContainer>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <LabelInputContainer className="mb-8">
                                            <Label htmlFor="confirmpassword">
                                                Пароль(повторно)
                                            </Label>
                                            <Input
                                                id="confirmpassword"
                                                placeholder="••••••••"
                                                type="password"
                                                {...field}
                                            />
                                        </LabelInputContainer>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <LabelInputContainer className="mb-8">
                                            <Label htmlFor="phonenumber">
                                                Номер телефону
                                            </Label>
                                            <Input
                                                id="phonenumber"
                                                placeholder="Приклад: +380..."
                                                type="tel"
                                                {...field}
                                            />
                                        </LabelInputContainer>
                                    </FormItem>
                                )}
                            />

                            <button
                                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                                type="button"
                                //validation disabled
                                // onClick={() => form.trigger("firstName")}
                                // disabled={form.formState.isValid}

                                onClick={() => {
                                    setStep(2);
                                }}
                                disabled={form.formState.isValid}
                            >
                                Далі &rarr;
                                <BottomGradient />
                            </button>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <FormField
                                control={form.control}
                                name="uploadedPhoto"
                                render={({
                                    field: { onChange, value, ref, ...rest },
                                }) => (
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
                                name="isVolunteer"
                                render={({
                                    field: { onChange, value, ...rest },
                                }) => (
                                    <FormItem>
                                        <div className="flex space-x-2 items-center mt-4 mb-4">
                                            <Label htmlFor="is-volunteer">
                                                Ви волонтер?
                                            </Label>
                                            <Label htmlFor="is-volunteer">
                                                Ні
                                            </Label>
                                            <Switch
                                                id="is-volunteer"
                                                checked={value}
                                                onCheckedChange={(
                                                    newValue: boolean,
                                                ) => {
                                                    onChange(newValue);
                                                    setIsVolunteer(newValue);
                                                }}
                                                {...rest}
                                            />
                                            <Label htmlFor="is-volunteer">
                                                Так
                                            </Label>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {isVolunteer && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="volunteerOrganizationName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <LabelInputContainer>
                                                    <Label
                                                        htmlFor="volunteerOrganizationName"
                                                        className="mb-1.5"
                                                    >
                                                        Назва волонтерської
                                                        організації:
                                                    </Label>
                                                    <Input
                                                        id="volunteerOrganizationName"
                                                        placeholder="Повернись живим"
                                                        type="text"
                                                        {...field}
                                                    />
                                                </LabelInputContainer>
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}

                            <button
                                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-3.5"
                                type="submit"
                                // disabled={form.formState.isValid}
                            >
                                Зареєструватись!
                                <BottomGradient />
                            </button>
                        </>
                    )}
                </form>
            </Form>
            <div className="flex justify-end">
                <Link href="/login" className="text-blue-400 text-sm">
                    Вже є аккаунт?
                </Link>
            </div>
        </div>
    );
};

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
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
