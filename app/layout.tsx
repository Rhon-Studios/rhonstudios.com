import { Header } from "./layout/header";
import { Footer } from "./layout/footer";
import { LanguageProvider } from "@/app/language/LanguageProvider";

import { Rye, Cinzel, Cormorant_Garamond  } from "next/font/google";

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


import './styles/theme.css';
import './styles/tailwind.css'
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