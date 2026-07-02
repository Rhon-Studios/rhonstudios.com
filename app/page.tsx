"use client"

import { Hero } from "@/app/components/hero";
import { About } from "@/app/components/about";
import { Highlight } from "@/app/components/highlight";
import { Games } from "@/app/components/games";
import { Contact } from "@/app/components/contact";
import { Legacy } from "@/app/components/legacy";
import { Team } from "@/app/components/team";
import {NewsLetter} from "@/app/components/newsLetter";
import {OurVision} from "@/app/components/ourvision";
import {usePathname} from "next/navigation";
import {Join} from "@/app/components/join";
import {Community} from "@/app/components/community";
import {FAQ} from "@/app/components/faq";
import {DevBlog} from "@/app/components/devblog";

export default function App() {
    const pathname = usePathname();
    const isHome = pathname === "/"
    return (
            <div className="bg-black">
                <Hero />
                <Highlight/>
                <Games/>
                <OurVision/>
                <DevBlog/>
                {/*  <Legacy /> */}
                <About/>
                <Team/>
                <Community/>
                <Join/>
                <Contact/>
                <FAQ/>
                {/* <NewsLetter/> */}
            </div>
    );
}