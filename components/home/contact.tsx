"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/libs/utils/LanguageProvider";
import { sendEmail } from "@/libs/utils/send-email";
import { SOCIALS, getSocials } from "@/libs/database/socialsData";

const followSocials = getSocials([
  "discord",
  "twitter",
  "youtube",
  "instagram",
  "tiktok",
  "linkedin",
]);

export function Contact() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Company: "",
    Message: "",
  });

  const [isCompany, setIsCompany] = useState<boolean>(false);
  const [status, setStatus] = useState<
    "idle" | "invalid" | "sending" | "sent" | "alreadySent" | "alreadySentV2" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (status === "sent") {
      const timer = setTimeout(() => setStatus("alreadySent"), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  useEffect(() => {
    if (!errorMessage) return;
    const timer = setTimeout(() => setErrorMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  const validateForm = () => {
    if (!formData.Name.trim()) return "A Name is required";
    if (!formData.Email.trim()) return "Your Email address is required";
    if (!formData.Message.trim()) return "A message is required";
    if (isCompany && !formData.Company.trim()) return "Company is required";
    return "";
  };

  const handleToggleCompany = () => setIsCompany((prev) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setStatus("invalid");
      setErrorMessage(validationError);
      return;
    }

    setErrorMessage("");
    setStatus("sending");

    const mailText = [
      `Nombre: ${formData.Name}`,
      `Email: ${formData.Email}`,
      isCompany ? `Empresa: ${formData.Company}` : null,
      `Mensaje: ${formData.Message}`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await sendEmail({
        email: formData.Email,
        subject: isCompany ? `[WP_CF_E] - ${formData.Company}` : `[WP_CF_P] - ${formData.Name}`,
        text: mailText,
      });

      if (res?.messageId) {
        setFormData({ Name: "", Email: "", Company: "", Message: "" });
        setIsCompany(false);
        setStatus("sent");
      } else {
        setStatus("error");
        setErrorMessage("Something went wrong, please try again");
      }
    } catch (error) {
      console.error("Send failed:", error);
      setStatus("error");
      setErrorMessage("Something went wrong, please try again");
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-[10px] relative bg-black text-white pt-16 sm:pt-32 overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      <div className="container mx-auto px-4 sm:px-8 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-2">
            <h2
              className="text-4xl sm:text-5xl lg:text-7xl mb-4 sm:mb-8 tracking-wider"
              style={{ fontFamily: "Rye" }}
            >
              {t.contact.title}
            </h2>
            <div className="flex flex-col items-center gap-3 mb-2">
              <p
                className="text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase"
                style={{ fontFamily: "Cinzel" }}
              >
                {t.contact.type_contact}
              </p>
              <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="w-16 sm:w-24 h-[2px] bg-white" />
                <button
                  onClick={handleToggleCompany}
                  className={`
                                        relative w-28 sm:w-32 h-9 sm:h-10 border-2 border-white
                                        transition-all duration-500
                                        hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]
                                        ${isCompany ? "bg-white" : "bg-black"}
                                    `}
                >
                  <motion.div
                    className={`
                                            absolute top-1 w-10 sm:w-12 h-6 sm:h-7 border-2
                                            transition-all duration-500
                                            ${
                                              isCompany
                                                ? "bg-black border-black left-[calc(100%-2.75rem)] sm:left-[calc(100%-3.25rem)]"
                                                : "bg-white border-white left-1"
                                            }
                                        `}
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
                <div className="w-16 sm:w-24 h-[2px] bg-white" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16">
            <div className="border-2 border-white p-4 sm:p-5 sm:px-8">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div className="space-y-2 sm:space-y-3">
                  <label
                    htmlFor="name"
                    className="block text-xs tracking-wider uppercase"
                    style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                  >
                    {t.contact.name}
                  </label>
                  <input
                    type="text"
                    name="Name"
                    value={formData.Name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-2 border-white px-4 py-2 focus:outline-none focus:bg-white focus:text-black transition-all duration-300 text-sm sm:text-base"
                    style={{ fontFamily: "Cormorant Garamond" }}
                    placeholder="John Smith"
                  />
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <label
                    htmlFor="email"
                    className="block text-xs tracking-wider uppercase"
                    style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-2 border-white px-4 py-2 focus:outline-none focus:bg-white focus:text-black transition-all duration-300 text-sm sm:text-base"
                    style={{ fontFamily: "Cormorant Garamond" }}
                    placeholder="rhonstudios@gmail.com"
                  />
                </div>
                {isCompany && (
                  <div className="space-y-2 sm:space-y-3">
                    <label
                      htmlFor="company"
                      className="block text-xs tracking-wider uppercase"
                      style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                    >
                      {t.contact.company}
                    </label>
                    <input
                      type="text"
                      name="Company"
                      value={formData.Company}
                      onChange={handleChange}
                      className="w-full bg-transparent border-2 border-white px-4 py-2 focus:outline-none focus:bg-white focus:text-black transition-all duration-300 text-sm sm:text-base"
                      style={{ fontFamily: "Cormorant Garamond" }}
                      placeholder="Rhon Studios, Mercadona..."
                    />
                  </div>
                )}
                <div className="space-y-2 sm:space-y-3">
                  <label
                    htmlFor="message"
                    className="block text-xs tracking-wider uppercase"
                    style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                  >
                    {t.contact.message.title}
                  </label>
                  <textarea
                    name="Message"
                    value={formData.Message}
                    onChange={handleChange}
                    rows={isCompany ? 3 : 4}
                    className="w-full bg-transparent border-2 border-white px-4 py-2 focus:outline-none focus:bg-white focus:text-black transition-all duration-300 text-sm sm:text-base"
                    style={{ fontFamily: "Cormorant Garamond" }}
                    placeholder={t.contact.message.placeholder}
                  />
                </div>
                <button
                  type="submit"
                  onClick={() => {
                    if (status === "alreadySent") setStatus("alreadySentV2");
                  }}
                  className="w-full py-3 sm:py-4 border-2 border-white text-xs sm:text-sm tracking-wider uppercase bg-black hover:bg-white hover:text-black transition-all duration-300"
                  style={{ fontFamily: "Cormorant Garamond" }}
                  disabled={
                    status === "sending" ||
                    status === "sent" ||
                    status === "alreadySentV2" ||
                    status === "invalid"
                  }
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
            <div className="space-y-4 sm:space-y-8">
              {isCompany ? (
                <>
                  <div className="border-2 border-white p-5 sm:p-8">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <a
                        href={SOCIALS.mail.url}
                        className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-white flex items-center justify-center flex-shrink-0 hover:bg-white hover:text-black transition-all duration-300"
                        aria-label="Mail"
                      >
                        <SOCIALS.mail.icon size={18} strokeWidth={2} />
                      </a>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-xs tracking-wider uppercase mb-2 opacity-60"
                          style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                        >
                          EMAIL
                        </p>
                        <a
                          href={SOCIALS.mail.url}
                          className="text-sm sm:text-base hover:opacity-60 transition-opacity duration-300 block tracking-wide truncate"
                          style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                        >
                          {SOCIALS.mail.handle}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="border-2 border-white p-5 sm:p-8">
                    <p
                      className="text-xs tracking-wider uppercase mb-4 sm:mb-6 opacity-60"
                      style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                    >
                      {t.contact.openhours}
                    </p>
                    <div className="space-y-3" style={{ fontFamily: "Cinzel", fontWeight: "bold" }}>
                      <div className="flex justify-between text-xs sm:text-sm tracking-wide">
                        <span>{t.contact.days}</span>
                        <span>{t.contact.hours}</span>
                      </div>
                      <div className="w-full h-[1px] bg-white/20"></div>
                      <div className="flex justify-between text-xs sm:text-sm tracking-wide">
                        <span>{t.contact.weekend}</span>
                        <span>{t.contact.appointment}</span>
                      </div>
                      <div className="w-full h-[1px] bg-white/20"></div>
                      <div className="mt-4">
                        <a
                          className="inline-flex items-center gap-2 text-xs tracking-wider uppercase px-3 sm:px-4 py-2 border-2 border-white rounded-md transition-all duration-300"
                          style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                        >
                          <span className="text-base">←</span>
                          <span>{t.contact.button_appointment}</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="border-2 border-white p-5 sm:p-8">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <a
                        href={SOCIALS.github.url}
                        className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-white flex items-center justify-center flex-shrink-0 hover:bg-white hover:text-black transition-all duration-300"
                        aria-label="GitHub"
                      >
                        <SOCIALS.github.icon size={18} strokeWidth={2} />
                      </a>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-xs tracking-wider uppercase mb-2 opacity-60"
                          style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                        >
                          GITHUB
                        </p>
                        <a
                          href={SOCIALS.github.url}
                          className="text-sm sm:text-base hover:opacity-60 transition-opacity duration-300 block tracking-wide"
                          style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                        >
                          {SOCIALS.github.handle}
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="border-2 border-white p-5 sm:p-8 text-center">
                    <div className="flex justify-center items-center gap-4 sm:gap-6 mb-3">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <h4
                        className="text-base sm:text-xl tracking-wider"
                        style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                      >
                        {t.contact.thankscard.title}
                      </h4>
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    </div>
                    <p
                      className="text-sm leading-relaxed mb-3 text-left"
                      style={{ fontFamily: "Cinzel" }}
                    >
                      {t.contact.thankscard.text.p1}
                    </p>
                    <p
                      className="text-sm leading-relaxed mb-3 text-left"
                      style={{ fontFamily: "Cinzel" }}
                    >
                      {t.contact.thankscard.text.p2}
                    </p>
                    <p
                      className="text-sm leading-relaxed mb-3 text-left"
                      style={{ fontFamily: "Cinzel" }}
                    >
                      <span className="text-base mr-4 sm:mr-8">←</span>
                      <span>{t.contact.thankscard.text.p3}</span>
                    </p>
                  </div>

                  <div className="border-2 border-white p-5 sm:p-8">
                    <h4
                      className="text-x tracking-wider uppercase mb-4 sm:mb-6 text-center"
                      style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                    >
                      {t.contact.follow}
                    </h4>
                    <div className="grid grid-cols-3 gap-3 sm:flex sm:gap-4 justify-items-center sm:justify-between tracking-wide sm:px-5">
                      {followSocials.map((social) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={social.id}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                            aria-label={social.name}
                          >
                            <Icon size={18} strokeWidth={2} />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          {/*<div className="mt-8 sm:mt-12 mb-8 sm:mb-0 flex justify-center">
                        <a
                            href="#newsLetter"
                            className="inline-flex items-center gap-3 sm:gap-4 text-xs tracking-wider uppercase px-4 sm:px-5 py-2 border-2 border-white/60 rounded-md"
                            style={{ fontFamily: 'Cinzel' }}
                        >
                            <span>↓</span>
                            <span>{t.contact.newsLetter}</span>
                            <span>↓</span>
                        </a>
                    </div>*/}
        </div>
      </div>
      <AnimatePresence>
        {status === "sent" && (
          <motion.div
            className="fixed top-4 sm:top-10 left-1/2 -translate-x-1/2 z-50 w-[90vw] sm:w-auto"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-black text-white border-2 border-white px-6 sm:px-10 py-4 sm:py-6 shadow-[0_0_30px_rgba(255,255,255,0.08)]">
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
            className="fixed top-4 sm:top-10 left-1/2 -translate-x-1/2 z-50 w-[90vw] sm:w-auto"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-black text-white border-2 border-white px-6 sm:px-10 py-4 sm:py-6 shadow-[0_0_30px_rgba(255,255,255,0.08)]">
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
  );
}
