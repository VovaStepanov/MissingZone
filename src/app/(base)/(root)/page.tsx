"use client";

import { HeroHighlight, Highlight } from "./_components/HeroHighlight";
import { motion } from "framer-motion";

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
                    With insomnia, nothing&apos;s real. Everything is far away.
                    Everything is a{" "}
                    <Highlight className="text-black dark:text-white">
                        copy, of a copy, of a copy.
                    </Highlight>
                </motion.h1>
            </HeroHighlight>
        </div>
    );
}
