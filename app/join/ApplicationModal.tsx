"use client"

import {useLanguage} from "@/app/language/LanguageProvider";
import {useEffect, useState} from "react";
import {opportunitiesData, projectsData} from "@/app/DataBases/oportunitiesData";
import { motion } from "framer-motion";
import {sendEmail} from "@/libs/send-email";

interface ModalState {
    projectID: string;
    roleTitle: string;
}

export function ApplicationModal({ initial, onClose }: { initial: ModalState; onClose: () => void }) {
    const { t } = useLanguage();
    const [selectedProject, setSelectedProject] = useState(initial.projectID);
    const [formData, setFormData] = useState({
        Name: "",
        Email: "",
        Role: initial.roleTitle,
        Portfolio: "",
        Message: "",
        accepted: false,
    });
    const [errorMessage, setErrorMessage] = useState("");
    const rolesForProject = opportunitiesData.filter(
        (o) => o.projectId === selectedProject && o.status === "open"
    );
    const [status, setStatus] = useState<"idle" | "invalid" | "sending" | "sent" | "alreadySent" | "alreadySentV2" | "error">("idle");
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
        if (!formData.Role.trim()) return "A role is required";
        if (!formData.Portfolio.trim()) return "A portfolio is required";
        if (!formData.Message.trim()) return "A message is required";
        if (!formData.accepted) return "You need to accept our conditions first";
        return "";
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errorMessage) setErrorMessage("");
    };
    const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProject(e.target.value);
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setStatus("invalid");
            setErrorMessage(("validationError"));
            return;
        }
        setErrorMessage("");
        setStatus("sending");
        const mailText = [
            `Nombre: ${formData.Name}`,
            `Email: ${formData.Email}`,
            `Role: ${formData.Role}`,
            `Portfolio: ${formData.Portfolio}`,
            `Message: ${formData.Message}`,
        ].filter(Boolean).join("\n");
        try {
            const res = await sendEmail({
                email: formData.Email,
                subject: "WP_JOIN",
                text: mailText,
            });
            if (res?.messageId) {
                setFormData({ Name: "", Email: "", Role: "", Portfolio: "", Message: "", accepted: false });
                setStatus("sent");
            } else {
                setStatus("error");
                setErrorMessage("Something went wrong, please try again.");
            }
        } catch (error) {
            console.error("Send failed:", error);
            setStatus("error");
            setErrorMessage("Something went wrong, please try again.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black text-white">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="relative bg-black border-2 border-white w-full max-w-xl max-h-[90vh] overflow-y-auto p-8"
            >
                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                    <div className="space-y-2 sm:space-y-3">
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
                            className="w-full bg-transparent border-2 border-white px-4 py-2 focus:outline-none focus:bg-white focus:text-black transition-all duration-300 text-sm sm:text-base"
                            style={{ fontFamily: 'Cormorant Garamond' }}
                            placeholder="John Smith"
                        />
                    </div>
                    <div className="space-y-2 sm:space-y-3">
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
                            className="w-full bg-transparent border-2 border-white px-4 py-2 focus:outline-none focus:bg-white focus:text-black transition-all duration-300 text-sm sm:text-base"
                            style={{ fontFamily: 'Cormorant Garamond' }}
                            placeholder="rhonstudios@gmail.com"
                        />
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                        <label
                            htmlFor="project"
                            className="block text-xs tracking-wider uppercase"
                            style={{ fontFamily: 'Cinzel', fontWeight: 'bold' }}
                        >
                            Proyecto
                        </label>
                        <select
                            name="project"
                            value={selectedProject}
                            onChange={handleProjectChange}
                            required
                            className="w-full bg-transparent border-2 border-white px-4 py-2 focus:outline-none focus:bg-white focus:text-black transition-all duration-300 text-sm sm:text-base"
                            style={{ fontFamily: 'Cormorant Garamond' }}
                        >
                            {projectsData.map((p) => {
                                const projectT = t.join.projects[p.id as keyof typeof t.join.projects];
                                return(
                                    <option key={p.id} value={p.id}>
                                        {projectT.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                        <label
                            htmlFor="role"
                            className="block text-xs tracking-wider uppercase"
                            style={{ fontFamily: 'Cinzel', fontWeight: 'bold' }}
                        >
                            Rol de interés
                        </label>

                        <select
                            name="role"
                            value={formData.Role}
                            onChange={handleProjectChange}
                            required
                            className="w-full bg-transparent border-2 border-white px-4 py-2 focus:outline-none focus:bg-white focus:text-black transition-all duration-300 text-sm sm:text-base"
                            style={{ fontFamily: 'Cormorant Garamond' }}
                        >
                            <option value="">Selecciona un rol</option>
                            {rolesForProject.map((opp) => {
                                const oppT = t.join.opportunities[opp.id as keyof typeof t.join.opportunities];
                                return (
                                    <option key={opp.id} value={oppT.title}>
                                        {oppT.title}
                                    </option>
                                );
                            })}
                            {rolesForProject.length === 0 && (
                                <option disabled value="">No hay roles abiertos en este proyecto</option>
                            )}
                        </select>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                        <label
                            htmlFor="portfolio"
                            className="block text-xs tracking-wider uppercase"
                            style={{ fontFamily: 'Cinzel', fontWeight: 'bold' }}
                        >
                            Portfolio / GitHub / LinkedIn
                        </label>

                        <input
                            type="text"
                            name="Portfolio"
                            value={formData.Portfolio}
                            onChange={handleChange}
                            placeholder="https://"
                            className="w-full bg-transparent border-2 border-white px-4 py-2 focus:outline-none focus:bg-white focus:text-black transition-all duration-300 text-sm sm:text-base"
                            style={{ fontFamily: 'Cormorant Garamond' }}
                        />
                    </div>
                    <div className="space-y-2 sm:space-y-3">
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
                            rows={3}
                            className="w-full bg-transparent border-2 border-white px-4 py-2 focus:outline-none focus:bg-white focus:text-black transition-all duration-300 text-sm sm:text-base"
                            style={{ fontFamily: 'Cormorant Garamond' }}
                            placeholder={t.contact.message.placeholder}
                        />
                    </div>
                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            name="accepted"
                            id="accepted"
                            checked={formData.accepted}
                            onChange={handleChange}
                            required
                            className="mt-1 h-4 w-4 border-2 border-white bg-transparent accent-white"
                        />

                        <label
                            htmlFor="accepted"
                            className="text-xs leading-relaxed"
                            style={{
                                fontFamily: 'Cormorant Garamond',
                            }}
                        >
                            He leído y acepto las condiciones de colaboración voluntaria
                            descritas en esta página. Entiendo que esto no constituye una
                            relación laboral.
                        </label>
                    </div>
                    <button
                        type="submit"
                        onClick={() => {
                            if (status === "alreadySent") setStatus("alreadySentV2");
                        }}
                        className="w-full py-3 sm:py-4 border-2 border-white text-xs sm:text-sm tracking-wider uppercase bg-black hover:bg-white hover:text-black transition-all duration-300"
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
            </motion.div>
        </div>
    );
}