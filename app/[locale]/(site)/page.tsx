"use client";
import { Hero } from "@/components/home/hero";
import { About } from "@/components/home/about";
import { Highlight } from "@/components/home/highlight";
import { Games } from "@/components/home/games";
import { Contact } from "@/components/home/contact";
// import { Legacy } from "@/components/home/legacy";
import { Team } from "@/components/home/team";
// import { NewsLetter } from "@/components/home/newsLetter";
import { OurVision } from "@/components/home/ourvision";
import { Join } from "@/components/home/join";
import { Community } from "@/components/home/community";
import { FAQ } from "@/components/home/faq";
import { DevBlog } from "@/components/home/devblog";

export default function App() {
  return (
    <div className="bg-black">
      <Hero />
      <Highlight />
      <Games />
      <DevBlog />
      <OurVision />
      {/*  <Legacy /> */}
      <About />
      <Team />
      <Community />
      <Join />
      <Contact />
      <FAQ />
      {/*<NewsLetter/> */}
    </div>
  );
}
