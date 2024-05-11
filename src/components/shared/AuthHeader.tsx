"use client";

import { Heart } from "lucide-react";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";

export const AuthHeader = () => {
    return (
        <Container className="flex justify-between items-center py-2">
            <Link href="/" className="mr-6 hidden lg:flex">
                <Heart />
            </Link>
            <ThemeToggle />
        </Container>
    );
};
