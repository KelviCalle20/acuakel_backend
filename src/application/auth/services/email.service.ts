import nodemailer from "nodemailer";

export class EmailService {
  private transporter;

  constructor() {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("EMAIL_USER o EMAIL_PASS no están definidos en el archivo .env");
    }

    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // ← correo de tu .env
        pass: process.env.EMAIL_PASS, // ← clave de aplicación de Gmail
      },
    });
  }

  async enviarCodigo(correo: string, codigo: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER, // usar correo del .env
      to: correo,
      subject: "Código de restablecimiento de contraseña",
      text: `Tu código de restablecimiento es: ${codigo}`,
    };

    return this.transporter.sendMail(mailOptions);
  }
  async enviarCodigos(correo: string, codigo: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER, // usar correo del .env
      to: correo,
      subject: "Cuenta de Administrador principal",
      text: `BIENVENIDO: ${codigo}`,
    };

    return this.transporter.sendMail(mailOptions);
  }

  async sendMail(to: string, subject: string, html: string) {
    const mailOptions = {
      from: `"Backend AcuaKel" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
