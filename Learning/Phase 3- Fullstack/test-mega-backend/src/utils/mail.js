import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendMail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://mailgen.js/",
    },
  });

  var emailText = mailGenerator.generatePlaintext(options.mailGenContent);
  var emailHtml = mailGenerator.generate(options, mailGenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    // send mail with defined transport object

    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error("Email failed", error);
  }
};

export const emailVerificationMailGenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to Mailgen! We're very excited to have you on board.",
    },
    action: {
      instructions: "To get started with our app, please click here:",
      button: {
        color: "#22BC66", // Optional action button color
        text: "Verify your email",
        link: verificationUrl,
      },
    },
    outro:
      "Need help, or have questions? Just reply to this email, we'd love to help.",
  };
};

export const forgotPasswordMailGenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset your password.",
    },
    action: {
      instructions: "To get change your password, please click here:",
      button: {
        color: "#22BC66", // Optional action button color
        text: "Reset Password.",
        link: passwordResetUrl,
      },
    },
    outro:
      "Need help, or have questions? Just reply to this email, we'd love to help.",
  };
};

// sendMail({
//   email: user.email,
//   subject: "FEFEF",
//   mailGenContent: emailVerificationMailGenContent(username, "sfsdf"),
// });
