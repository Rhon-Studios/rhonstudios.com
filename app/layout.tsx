import { Header } from "./layout/header";
import { Footer } from "./layout/footer";
import { LanguageProvider } from "@/app/language/LanguageProvider";

import {
    Rye,
    Cinzel,
    Cormorant_Garamond,
    Skranji,
    Cinzel_Decorative,
    IM_Fell_English,
    EB_Garamond,
    Amarante,
    Inter,
    Jua,
    Nunito
} from "next/font/google";

const rye = Rye({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-rye",
});

const cinzel = Cinzel({
    subsets: ["latin"],
    variable: "--font-cinzel",
});

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    variable: "--font-cinzel",
});

const cinzel_decorative = Cinzel_Decorative({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-cinzel_decorative",
})

const skranji = Skranji({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-skranji",
})

const im_fell_english = IM_Fell_English({
    subsets: ["latin"],
    weight: ["400"],
    style: ["normal", "italic"],
    variable: "--font-im-fell",
})

const eb_gramond = EB_Garamond({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-gramond",
})

const amarante = Amarante({
    weight: ["400"],
    subsets: ["latin"],
    variable: "--font-amaranz"
});

const inter = Inter({
    weight: ["400"],
    variable: "--font-inter",
})

const jua = Jua({
    weight: ["400"],
    variable: "--font-jua",
})

const nunito = Nunito({
    weight: ["400"],
    variable: "--font-nunito",
})

export const metadata: Metadata = {
    title: "Rhon Studios",
    description: "Creando mundos que se quedan contigo",
};

import './styles/theme.css';
import './styles/tailwind.css'
import {Metadata} from "next";
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <LanguageProvider>
                    <Header />
                    {children}
                    <Footer />
                </LanguageProvider>
            </body>
        </html>
    );
}