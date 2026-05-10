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
export default function App() {
    return (
            <div className="bg-black snap-y snap-mandatory">
                <Hero />
                <Highlight/>
                <Games/>
                <OurVision/>
                {/*  <Legacy /> */}
                <About/>
                <Team/> 
                <Contact/>
                <NewsLetter/>
            </div>
    );
}