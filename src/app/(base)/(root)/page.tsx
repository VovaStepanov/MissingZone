"use client";

import { HeroHighlight, Highlight } from "./_components/HeroHighlight";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex-1">
            <HeroHighlight>
                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: [20, -5, 0],
                    }}
                    transition={{
                        duration: 0.5,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}
                    className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
                >

                    Допоможемо Вам знайти зниклих людей{" "}
                    <Highlight className="text-black dark:text-white">
                        в зоні бойових дій та ТОТ України.
                    </Highlight>

                </motion.h1>
                <div className="mt-4 flex justify-center">
                    <Button>
                        <Link href="/register" className="font-semibold">Розпочати</Link>
                        <svg className="w-4 h-4 ml-3 fill-current" viewBox="0 0 20 20">
                            <path
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clip-rule="evenodd" fill-rule="evenodd"></path>
                        </svg>
                    </Button>
                </div>
            </HeroHighlight>


        </div>

    );

}
