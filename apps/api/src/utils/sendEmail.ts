import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendEmail = async (receiverEmail: string, firstName: string) => {
  const senderEmail = process.env.SENDGRID_SENDER_EMAIL;
  if (!senderEmail) {
    console.error("SENDGRID_SENDER_EMAIL environment variable not set.");
    throw new Error("Email service is not configured.");
  }

  try {
    const msg = {
      to: receiverEmail,
      from: senderEmail,
      subject: "Welcome to Kairo",
      text: "Welcome to Kairo!",
      html: `
        <h1>Hi ${firstName || "there"},</h1>
        <p>Welcome! We're thrilled to have you join our community.</p>
        <p>You can now log in and start exploring.</p>
        <br>
        <p>Best regards,</p>
        <p>The Team</p>
      `,
    };

    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
  }
};
