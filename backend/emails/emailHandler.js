import { Resend } from "resend";
import "dotenv/config";
const wechat_link =
  process.env.ENVIROMENT === "development"
    ? process.env.VITE_WECHAT_URL
    : "https://web.whatsapp.com/";

export const resend = new Resend(process.env.VITE_RESEND_API_KEY);

export const sendWelcomeEmail = async (email, name) => {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "new member ^-^",
    html: `<p>Hello <strong>${name}</strong>! <br> don't be shy <a href='${wechat_link}'>click here</a></p>`,
  });

  if (error) {
    // Don't braeak the application for that
    // throw new Error(`Error While Sending Email : ${error.message}`);
    console.warn(`Error While Sending Email ${error.message}`);
  }

  console.log("Our family raised one ^-^", data);
};
