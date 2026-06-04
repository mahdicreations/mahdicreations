import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, phone } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Le nom et le téléphone sont obligatoires." },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM || `"Mahdi Créations" <${smtpUser || "no-reply@mahdicreations.com"}>`;
    const contactReceiver = process.env.CONTACT_RECEIVER || "javarx@gmail.com";

    // Format the email content
    let subject = "";
    let htmlContent = "";

    if (type === "callback") {
      const { callDate } = body;
      subject = `📞 Demande de rappel - ${name}`;
      
      let formattedDate = callDate;
      try {
        formattedDate = new Date(callDate).toLocaleString("fr-FR", {
          dateStyle: "long",
          timeStyle: "short",
        });
      } catch (e) {
        // Fallback to raw value
      }

      htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px solid #D4AF37; padding-bottom: 15px;">
            <h1 style="color: #111827; margin: 0; font-size: 24px;">Mahdi Créations</h1>
            <p style="color: #6B7280; margin: 5px 0 0 0; font-size: 14px;">Demande de rappel téléphonique</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; font-weight: bold; color: #374151; width: 35%;">Nom complet :</td>
              <td style="padding: 10px 0; color: #4B5563;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; font-weight: bold; color: #374151;">Téléphone / WhatsApp :</td>
              <td style="padding: 10px 0; color: #4B5563;">
                <a href="tel:${phone}" style="color: #D4AF37; text-decoration: none; font-weight: bold;">${phone}</a>
                <span style="color: #9CA3AF; margin: 0 8px;">|</span>
                <a href="https://wa.me/${phone.replace(/[^0-9+]/g, "")}" target="_blank" style="color: #25D366; text-decoration: none; font-weight: bold;">WhatsApp</a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; font-weight: bold; color: #374151;">Date & Heure :</td>
              <td style="padding: 10px 0; color: #4B5563; font-weight: bold;">${formattedDate}</td>
            </tr>
          </table>
          
          <div style="font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 15px;">
            Ce message a été envoyé depuis le formulaire de rappel de mahdicreations.com.
          </div>
        </div>
      `;
    } else {
      // Default to "contact"
      const { email, service, message } = body;
      subject = `✉️ Nouveau contact - ${name} (${service})`;
      
      htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px solid #D4AF37; padding-bottom: 15px;">
            <h1 style="color: #111827; margin: 0; font-size: 24px;">Mahdi Créations</h1>
            <p style="color: #6B7280; margin: 5px 0 0 0; font-size: 14px;">Nouveau message de contact</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; font-weight: bold; color: #374151; width: 35%;">Nom complet :</td>
              <td style="padding: 10px 0; color: #4B5563;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; font-weight: bold; color: #374151;">Adresse email :</td>
              <td style="padding: 10px 0; color: #4B5563;"><a href="mailto:${email}" style="color: #D4AF37; text-decoration: none;">${email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; font-weight: bold; color: #374151;">Téléphone / WhatsApp :</td>
              <td style="padding: 10px 0; color: #4B5563;">
                <a href="tel:${phone}" style="color: #D4AF37; text-decoration: none; font-weight: bold;">${phone}</a>
                <span style="color: #9CA3AF; margin: 0 8px;">|</span>
                <a href="https://wa.me/${phone.replace(/[^0-9+]/g, "")}" target="_blank" style="color: #25D366; text-decoration: none; font-weight: bold;">WhatsApp</a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; font-weight: bold; color: #374151;">Service souhaité :</td>
              <td style="padding: 10px 0; color: #4B5563; font-weight: bold; text-transform: capitalize;">${service}</td>
            </tr>
          </table>
          
          <div style="background-color: #f9fafb; border-left: 4px solid #D4AF37; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
            <h3 style="margin: 0 0 10px 0; font-size: 14px; color: #374151; font-weight: bold;">Description du projet :</h3>
            <p style="margin: 0; color: #4B5563; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 15px;">
            Ce message a été envoyé depuis le formulaire de contact de mahdicreations.com.
          </div>
        </div>
      `;
    }

    // Check if SMTP is configured
    if (!smtpHost || !smtpUser || !smtpPass) {
      console.warn("⚠️ Configuration SMTP manquante dans l'environnement. Mode simulation activé.");
      console.log("------------------- SIMULATION EMAIL -------------------");
      console.log(`Destinataire : ${contactReceiver}`);
      console.log(`Expéditeur   : ${smtpFrom}`);
      console.log(`Sujet        : ${subject}`);
      console.log("Contenu HTML (sans balises) :\n", htmlContent.replace(/<[^>]*>/g, "").trim().substring(0, 500) + "...");
      console.log("---------------------------------------------------------");
      
      return NextResponse.json({
        success: true,
        message: "Simulation : Formulaire reçu avec succès (SMTP non configuré)."
      });
    }

    // Create transport
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort || "587"),
      secure: smtpPort === "465",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Send email
    await transporter.sendMail({
      from: smtpFrom,
      to: contactReceiver,
      subject: subject,
      html: htmlContent,
    });

    return NextResponse.json({
      success: true,
      message: "Votre message a été envoyé avec succès par email."
    });
  } catch (error: any) {
    console.error("❌ Erreur lors de l'envoi de l'email :", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi du message." },
      { status: 500 }
    );
  }
}
