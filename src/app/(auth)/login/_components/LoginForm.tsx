"use client";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "@/components/ui/form";
import Link from "next/link";
import { LoginUser } from "@/services/auth.service";
import { useLoginMutation } from "@/mutations/loginMutation";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Вкажіть Email" })
        .email({ message: "Email некоректний" }),
    password: z
        .string()
        .min(1, { message: "Необхідно ввести пароль" })
        .min(8, { message: "Введіть довший пароль" }),
});

export const LoginForm = () => {
    const { toast } = useToast();
    const [, setAccessToken] = useLocalStorage("accessToken", "");
    const [, setRole] = useLocalStorage("role", "");

    const router = useRouter();

    const { mutateAsync: loginUser } = useLoginMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);

        const userData: LoginUser = {
            email: values.email,
            password: values.password,
        };

        try {
            const response = await loginUser(userData);
            setAccessToken(response.token);
            setRole(response.role);
            toast({
                title: "Успіх!",
                description: "Ви авторизувались",
            });
            router.push("/announcements");
        } catch (e) {
            toast({
                title: "Помилка авторизації",
                description: "Щось пішло не так",
                variant: "destructive",
            });
        }
    };

    useEffect(() => {
        if (!form.formState.isValid && form.formState.submitCount !== 0) {
            toast({
                title: "Упс... На жаль,Ви не змогли увійти",
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
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                Вітаємо в MissingZone
            </h2>
            <p className="text-neutral-600 text-base max-w-sm mt-2 dark:text-neutral-300 font-semibold mb-3.5">
                Увійдіть в свій аккаунт
            </p>
            <Form {...form}>
                <form className="my-8" onSubmit={form.handleSubmit(onSubmit)}>
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
                                    <Label htmlFor="password">Пароль</Label>
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

                    <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                        disabled={!form.formState.isValid}
                    >
                        Увійти &rarr;
                        <BottomGradient />
                    </button>
                </form>
            </Form>
            <div className="flex justify-end">
                <Link href="/register" className="text-blue-400 text-sm">
                    Cтворити аккаунт
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
