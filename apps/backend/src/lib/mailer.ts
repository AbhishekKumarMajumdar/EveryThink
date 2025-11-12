import nodemailer from 'nodemailer';

type Transporter = nodemailer.Transporter | null;

let transporter: Transporter = null;

const getTransporter = (): nodemailer.Transporter => {
  if (transporter) {
    return transporter;
  }

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : false;

  if (host && port && user && pass) {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass
      }
    });
    return transporter;
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (emailUser && emailPass) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });
    return transporter;
  }

  throw new Error(
    'Email transport is not configured. Set SMTP_* variables or EMAIL_USER/EMAIL_PASS for Gmail credentials.'
  );
};

type VerificationEmailPayload = {
  to: string;
  name: string;
  otp: string;
  verificationUrl: string;
  expiresAt: Date;
};

export const sendVerificationEmail = async ({
  to,
  name,
  otp,
  verificationUrl,
  expiresAt
}: VerificationEmailPayload): Promise<void> => {
  const sender =
    process.env.SMTP_FROM ??
    process.env.EMAIL_FROM ??
    process.env.SMTP_USER ??
    process.env.EMAIL_USER;

  const transporterInstance = getTransporter();

  const expiryMinutes = Math.max(
    1,
    Math.round((expiresAt.getTime() - Date.now()) / 60000)
  );

  const html = `
    <p>Hi ${name},</p>
    <p>Thanks for creating an account. Use the OTP below to verify your email address:</p>
    <h2 style="letter-spacing: 4px;">${otp}</h2>
    <p>This code will expire in approximately ${expiryMinutes} minute(s).</p>
    <p>You can complete verification using this link:</p>
    <p><a href="${verificationUrl}">${verificationUrl}</a></p>
    <p>If you did not request this, you can safely ignore the email.</p>
  `;

  await transporterInstance.sendMail({
    from: sender,
    to,
    subject: 'Verify your email address',
    html
  });
};

