"use client"

import {AnimatePresence, motion} from "framer-motion";
import {Facebook, Github, Heart, Instagram, Linkedin, Mail, Twitter} from 'lucide-react'
import React, {useState, useEffect} from "react";
import {useLanguage} from "@/app/language/LanguageProvider";

export function Contact(){
    
    const { t } = useLanguage();
    const GOOGLE_API = process.env.GOOGLE_API;

    const [formData, setFormData] = useState({
        Name: "",
        Email: "",
        Company: "",
        Message: ""
    });
    
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isCompany, setIsCompany] = useState<boolean>(false);
    const [status, setStatus] = useState<"idle" | "invalid" | "sending" | "sent" | "alreadySent" | "alreadySentV2" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    
    useEffect(() => {
        if (status === "sent") {
            const timer = setTimeout(() => {
                setStatus("alreadySent");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [status]);
    useEffect(() => {
        if (!errorMessage) return;
        const timer = setTimeout(() => {
            setErrorMessage("");
        }, 3000);
        return () => clearTimeout(timer);
    }, [errorMessage]);
    
    const validateForm = () => {
        if (!formData.Name.trim()) return "A Name is required";
        if (!formData.Email.trim()) return "Your Email address is required";
        if (!formData.Message.trim()) return "A message is required";
        if (isCompany && !formData.Company.trim()) return "Company is required";
        return "";
    }
    
    const handleToggleCompany = () => {
        const newIsCompany = !isCompany;
        setIsCompany(newIsCompany);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errorMessage) setErrorMessage("");
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!GOOGLE_API) {
            setStatus("error");
            setErrorMessage("Missing GOOGLE_API environment variable");
            return;
        }
        
        const validationError = validateForm();
        if (validationError) {
            setStatus("invalid");
            setErrorMessage(validationError);
            return;
        }
        setErrorMessage("");
        setStatus("sending")
        try {
            await fetch(GOOGLE_API, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData)
            });
            console.log("Submitting form data:", formData);
            setFormData({
                Name: "",
                Email: "",
                Company: "",
                Message: ""
            });
            setIsCompany(false);
            setStatus("sent");
        } catch (error) {
            console.error("Fetch failed:", error);
            setFormSubmitted(false);
            setStatus("error");
        }
    };    
    
    return (
        <section
            id="contact"
            className={`snap-center relative bg-black text-white pt-32 overflow-hidden
                    ${isCompany
                        ? "scroll-mt-[10px]"
                        : "scroll-mt-[10px]"
                    }
            `}
            style={{
                minHeight: '100vh',
            }}
        >
            <div className="container mx-auto px-8 lg:px-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center">
                        <h2
                            className="text-6xl lg:text-7xl mb-4 tracking-wider mb-8"
                            style={{ fontFamily: "Rye" }}
                        >
                            {t.contact.title}
                        </h2>
                        <div className="flex flex-col items-center gap-3 mb-2">
                            <p
                                className="text-sm tracking-[0.3em] uppercase"
                                style={{ fontFamily: "Cinzel" }}
                            >
                                {t.contact.type_contact}
                            </p>
                            <div className="flex items-center justify-center gap-6 mb-8">
                                <div className="w-24 h-[2px] bg-white"/>
                                <button
                                    onClick={() => handleToggleCompany()}
                                    className={`
                                        relative w-32 h-10 border-2 border-white
                                        transition-all duration-500
                                        hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]
                                        ${isCompany ? 'bg-white' : 'bg-black'}
                                    `}
                                >
                                    <motion.div
                                        className={`
                                            absolute top-1 w-12 h-7 border-2
                                            transition-all duration-500
                                            ${isCompany
                                            ? 'bg-black border-black left-[calc(100%-3.25rem)]'
                                            : 'bg-white border-white left-1'
                                        }
                                        `}
                                        layout
                                        transition={{
                                            type: "spring",
                                            stiffness: 500,
                                            damping: 30
                                        }}
                                    />
                                </button>
                                <div className="w-24 h-[2px] bg-white"/>
                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-16">
                        <div className="border-2 border-white p-5 px-8">
                            <form
                                onSubmit={handleSubmit}    
                                className="space-y-8"
                            >
                                <div className="space-y-3">
                                    <label
                                        htmlFor="name"
                                        className="block text-xs tracking-wider uppercase"
                                        style={{ fontFamily: 'Cinzel', fontWeight: "bold" }}
                                    >
                                        {t.contact.name}
                                    </label>
                                    <input
                                        type="text"
                                        name="Name"
                                        value={formData.Name}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-2 border-white px-4 py-2 focus:outline-none focus:bg-white focus:text-black transition-all duration-300"
                                        style={{ fontFamily: 'Cormorant Garamond' }}
                                        placeholder="Jhon Smith"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label
                                        htmlFor="email"
                                        className="block text-xs tracking-wider uppercase"
                                        style={{ fontFamily: 'Cinzel', fontWeight: "bold" }}
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="Email"
                                        value={formData.Email}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-2 border-white px-4 py-2 focus:outline-none focus:bg-white focus:text-black transition-all duration-300"
                                        style={{ fontFamily: 'Cormorant Garamond' }}
                                        placeholder="rhonstudios@gmail.com"
                                    />
                                </div>
                                {isCompany && (
                                    <>
                                        <div className="space-y-3">
                                            <label
                                                htmlFor="company"
                                                className="block text-xs tracking-wider uppercase"
                                                style={{ fontFamily: 'Cinzel', fontWeight: "bold" }}
                                            >
                                                {t.contact.company}
                                            </label>
                                            <input
                                                type="text"
                                                name="Company"
                                                value={formData.Company}
                                                onChange={handleChange}
                                                className="w-full bg-transparent border-2 border-white px-4 py-2 focus:outline-none focus:bg-white focus:text-black transition-all duration-300"
                                                style={{ fontFamily: 'Cormorant Garamond' }}
                                                placeholder="Rhon Studios, Mercadona..."
                                            />
                                        </div>
                                    </>
                                )}
                                <div>
                                    <div className="space-y-3">
                                        <label
                                            htmlFor="message"
                                            className="block text-xs tracking-wider uppercase"
                                            style={{ fontFamily: 'Cinzel', fontWeight: "bold" }}
                                        >
                                            {t.contact.message.title}
                                        </label>
                                        <textarea
                                            name="Message"
                                            value={formData.Message}
                                            onChange={handleChange}
                                            rows={isCompany ? 3 : 4}
                                            className="w-full bg-transparent border-2 border-white px-4 py-2 focus:outline-none focus:bg-white focus:text-black transition-all duration-300"
                                            style={{ fontFamily: 'Cormorant Garamond' }}
                                            placeholder={t.contact.message.placeholder}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    onClick={() => {
                                        if (status === "alreadySent") {
                                            setStatus("alreadySentV2")
                                        }
                                    }}
                                    className="w-full py-4 border-2 border-white text-sm tracking-wider uppercase bg-black hover:bg-white hover:text-black transition-all duration-300"
                                    style={{ fontFamily: 'Cormorant Garamond' }}
                                    disabled={status === "sending" || status === "sent" || status === "alreadySentV2" || status === "invalid"}
                                >
                                    {status === "idle" && t.contact.button.idle}
                                    {status === "invalid" && t.contact.button.invalid}
                                    {status === "sending" && t.contact.button.sending}
                                    {status === "sent" && t.contact.button.sent}
                                    {status === "alreadySent" && t.contact.button.sent}
                                    {status === "alreadySentV2" && t.contact.button.alreadySent}
                                    {status === "error" && t.contact.button.error}
                                </button>
                            </form>
                        </div>
                        <>
                            {isCompany ? (
                                <>
                                    <div className="space-y-8">
                                        <div className="border-2 border-white p-8">
                                            <div className="flex items-center gap-6">
                                                <a
                                                    href="mailto:rhonstudios@gmail.com"
                                                    className="w-15 h-15 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                                                    aria-label="Mail"
                                                >
                                                    <Mail size={20} strokeWidth={2} />
                                                </a>
                                                <div className="flex-1">
                                                    <p
                                                        className="text-xs tracking-wider uppercase mb-3 opacity-60"
                                                        style={{ fontFamily: 'Cinzel', fontWeight: "bold" }}
                                                    >
                                                        EMAIL
                                                    </p>
                                                    <a
                                                        href="mailto:rhonstudios@gmail.com"
                                                        className="text-lg hover:opacity-60 transition-opacity duration-300 block tracking-wide"
                                                        style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                                                    >
                                                        rhonstudios@gmail.com
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border-2 border-white p-8">
                                            <p
                                                className="text-xs tracking-wider uppercase mb-6 opacity-60"
                                                style={{ fontFamily: 'Cinzel', fontWeight: "bold" }}
                                            >
                                                {t.contact.openhours}
                                            </p>
                                            <div
                                                className="space-y-3"
                                                style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                                            >
                                                <div className="flex justify-between text-sm tracking-wide">
                                                    <span>{t.contact.days}</span>
                                                    <span>{t.contact.hours}</span>
                                                </div>
                                                <div className="w-full h-[1px] bg-white/20"></div>
                                                <div className="flex justify-between text-sm tracking-wide">
                                                    <span>{t.contact.weekend}</span>
                                                    <span>{t.contact.appointment}</span>
                                                </div>
                                                <div className="w-full h-[1px] bg-white/20"></div>
                                                <div className="mt-4">
                                                    <a
                                                        className="inline-flex items-center gap-2 text-xs tracking-wider uppercase px-4 py-2 border-2 border-white rounded-md opacity-100  transition-all duration-300"
                                                        style={{ fontFamily: 'Cinzel', fontWeight: 'bold' }}
                                                    >
                                                        <span className="text-lg">←</span>
                                                        <span>{t.contact.button_appointment}</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border-2 border-white p-8">
                                            <div className="flex items-center gap-6">
                                                <a
                                                    href="https://github.com/Rhon-Studios"
                                                    className="w-15 h-15 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                                                    aria-label="GitHub"
                                                >
                                                    <Github size={20} strokeWidth={2} />
                                                </a>
                                                <div className="flex-1">
                                                    <p
                                                        className="text-xs tracking-wider uppercase mb-3 opacity-60"
                                                        style={{ fontFamily: 'Cinzel', fontWeight: "bold" }}
                                                    >
                                                        GITHUB
                                                    </p>
                                                    <a
                                                        href="https://github.com/Rhon-Studios"
                                                        className="text-lg hover:opacity-60 transition-opacity duration-300 block tracking-wide"
                                                        style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                                                    >
                                                        Rhon-Studios
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="space-y-8">
                                        <div className="border-2 border-white p-8 text-center">
                                            <div className="flex justify-center gap-6">
                                                <Heart/>
                                                <h4
                                                    className="text-xl tracking-wider mb-3"
                                                    style={{ fontFamily: 'Cinzel', fontWeight: 'bold' }}
                                                >
                                                    {t.contact.thankscard.title}
                                                </h4>
                                                <Heart/>
                                            </div>
                                            <p 
                                                className="leading-relaxed mb-4 text-left"
                                                style={{ fontFamily: 'Cinzel' }}
                                            >
                                                {t.contact.thankscard.text.p1}
                                            </p>
                                            <p 
                                                className="leading-relaxed mb-4 text-left"
                                                style={{ fontFamily: 'Cinzel' }}
                                            >
                                                {t.contact.thankscard.text.p2}
                                            </p>
                                            <p
                                                className="leading-relaxed mb-4 text-left"
                                                style={{ fontFamily: 'Cinzel' }}
                                            >
                                                <span className="text-lg mr-8">←</span>
                                                <span>{t.contact.thankscard.text.p3}</span>
                                            </p>
                                        </div>
                                        <div className="border-2 border-white p-8">
                                            <h4
                                                className="text-xs tracking-wider uppercase mb-6 text-center"
                                                style={{ fontFamily: 'Cinzel', fontWeight: "bold" }}
                                            >
                                                {t.contact.follow}
                                            </h4>
                                            <div className="flex gap-4 justify-between tracking-wide px-16">
                                                <a
                                                    href="https://instagram.com/rhonstudios"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-14 h-14 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                                                    aria-label="Instagram"
                                                >
                                                    <Instagram size={20} strokeWidth={2} />
                                                </a>
                                                <a
                                                    href="https://x.com/rhonstudios"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-14 h-14 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                                                    aria-label="Twitter"
                                                >
                                                    <Twitter size={20} strokeWidth={2} />
                                                </a>
                                                <a
                                                    href="https://www.facebook.com/people/Rhon-Studios/61588496083607/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-14 h-14 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                                                    aria-label="Facebook"
                                                >
                                                    <Facebook size={20} strokeWidth={2} />
                                                </a>
                                                <a
                                                    href="https://www.linkedin.com/company/rhon-studios"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-14 h-14 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                                                    aria-label="LinkedIn"
                                                >
                                                    <Linkedin size={20} strokeWidth={2} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    </div>
                    <div className="mt-12 flex justify-center">
                        <a
                            href="#"
                            className="inline-flex items-center gap-4 text-xs tracking-wider uppercase px-5 py-2 border-2 border-white/60 rounded-md"
                            style={{ fontFamily: 'Cinzel' }}
                        >
                            <span className="text-l">↓</span>
                            <span>{t.contact.newsLetter}</span>
                            <span className="text-l">↓</span>
                        </a>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {status === "sent" && (
                    <motion.div
                        className="fixed top-10 left-1/2 -translate-x-1/2 z-50"
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{
                            duration: 2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        <div
                            className="bg-black text-white border-2 border-white px-10 py-6 shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                        >
                            <p
                                className="text-xs tracking-[0.3em] uppercase text-center"
                                style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                            >
                                {t.contact.messageSend}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {errorMessage && (
                    <motion.div
                        className="fixed top-10 left-1/2 -translate-x-1/2 z-50"
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div
                            className="bg-black text-white border-2 border-white px-10 py-6 shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                        >
                            <p
                                className="text-xs tracking-[0.3em] uppercase text-center"
                                style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                            >
                                {errorMessage}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}