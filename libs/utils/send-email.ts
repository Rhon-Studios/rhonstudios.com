"use server"

import nodemailer from "nodemailer";

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;
const SITE_MAIL_RECEIVER = process.env.SITE_MAIL_RECEIVER;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: SMTP_SERVER_HOST,
    port: 587,
    secure: false,
    auth: {
        user: SMTP_SERVER_USERNAME,
        pass: SMTP_SERVER_PASSWORD,
    },
});

export async function sendEmail({
    email,
    subject,
    text,
    html,
}: {
    email: string;
    subject: string;
    text: string;
    html?: string;
}) {
    try {
        const info = await transporter.sendMail({
            from: email,
            to: SITE_MAIL_RECEIVER,
            subject,
            text,
            html: html || '',
        });
        console.log("Message sent:", info.messageId);
        return info;
    } catch (error) {
        console.error("Sending email failed:", error);
    }
}
