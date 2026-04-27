import express from "express";
import nodemailer from "nodemailer";
import Contact from "../models/contactModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, inquiryType, message } = req.body;

     // ✅ 1. Save to MongoDB
    const newMessage = await Contact.create({
      name,
      email,
      inquiryType,
      message,
    });
    // ✅ 2. Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  // ✅ 3. Send email to YOU
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Message - Blockstay (${inquiryType})`,
      text: `Name: ${name}\nEmail: ${email}\nInquiry Type: ${inquiryType || 'N/A'}\nMessage: ${message}`,
    });
     // ✅ 4. Auto reply to USER
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "We received your message ✅",
      text: `Hi ${name},

Thanks for contacting Blockstay.

We received your message and will reply soon.

- Team Blockstay`,
    });

    console.log("Email sent:", info.response);

    res.status(200).json({ success: true, message: "Message sent successfully" });

  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;