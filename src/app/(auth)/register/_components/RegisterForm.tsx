"use client";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "@/components/ui/form";

const formSchema = z
    .object({
        firstName: z.string().min(1, { message: "First name is required" }),
        lastName: z.string().min(1, { message: "Last name is required" }),
        email: z
            .string()
            .min(1, { message: "Email is required" })
            .email({ message: "Email is invalid" }),
        password: z
            .string()
            .min(1, { message: "Password is required" })
            .min(8, { message: "Password is too short" }),
        confirmPassword: z
            .string()
            .min(1, { message: "Password is required" })
            .min(8, { message: "Password is too short" }),

        phoneNumber: z.string().refine((value) => {
            // Regular expression to validate Ukrainian phone number
            const ukrainianPhoneNumberRegex = /^(?:\+380|0)(\d{9})$/;
            return ukrainianPhoneNumberRegex.test(value);
        }, { message: "Invalid Ukrainian phone number" }),
    })
    .refine((schema) => schema.password === schema.confirmPassword, {
        message: "Passwords should be equal",
    });

export const RegisterForm = () => {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
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
                title: "Failed to sign up",
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
                Welcome to Aceternity
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                Login to aceternity if you can because we don&apos;t have a
                login flow yet
            </p>

            <Form {...form}>
                <form className="my-8" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <LabelInputContainer>
                                        <Label htmlFor="firstname">
                                            First name
                                        </Label>
                                        <Input
                                            id="firstname"
                                            placeholder="Tyler"
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
                                            Last name
                                        </Label>
                                        <Input
                                            id="lastname"
                                            placeholder="Durden"
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
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        placeholder="projectmayhem@fc.com"
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
                                    <Label htmlFor="password">Password</Label>
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
                                        Confirm password
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
                                    <Label htmlFor="phonenumber">Phone number</Label>
                                    <Input
                                        id="phonenumber"
                                        placeholder="Ex: +380..."
                                        type="tel"
                                        {...field}
                                    />
                                </LabelInputContainer>
                            </FormItem>
                        )}
                    />


                    <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                    >
                        Sign up &rarr;
                        <BottomGradient />
                    </button>
                </form>
            </Form>
            <div className="flex justify-end">
                <Link href="/login" className="text-blue-400 text-sm">
                    Already have account?
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
