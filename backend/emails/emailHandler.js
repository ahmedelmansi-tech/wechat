import { Resend } from "resend";
import "dotenv/config";
// console.log("ENV FROM EMAIlHANDELEER", process.env.VITE_RESEND_API_KEY);

export const resend = new Resend(process.env.VITE_RESEND_API_KEY);

export const sendWelcomeEmail = async (email, name) => {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "new member ^-^",
    html: `<p>Hello <strong>${name}</strong>!</p>`,
  });

  if (error) {
    throw new Error(`Error While Sending Email : ${error.message}`);
  }

  console.log("Our family raised one ^-^", data);
};
