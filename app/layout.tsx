import { Header } from "./layout/header";
import { Footer } from "./layout/footer";
import { LanguageProvider } from "@/app/language/LanguageProvider";


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