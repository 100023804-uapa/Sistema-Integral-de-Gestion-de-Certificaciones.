'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendCertificateEmailParams {
    to: string;
    studentName: string;
    certificateUrl: string;
    folio: string;
}

export async function sendCertificateEmail({ to, studentName, certificateUrl, folio }: SendCertificateEmailParams) {
    try {
        if (!process.env.RESEND_API_KEY) {
            throw new Error('RESEND_API_KEY is not defined');
        }

        const { data, error } = await resend.emails.send({
            from: 'SIGCE <onboarding@resend.dev>', // Usar dominio verificado o onboarding para pruebas
            to: [to], // En modo prueba solo funciona si 'to' es el correo del dueño de la cuenta de Resend
            subject: `Tu Certificado UAPA está listo - Folio: ${folio}`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #003366;">Hola, ${studentName}</h1>
          <p>Tu certificado del programa de educación continua ha sido generado exitosamente.</p>
          <p>Puedes ver, descargar y validar tu certificado haciendo clic en el siguiente botón:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${certificateUrl}" style="background-color: #e67600; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Ver Mi Certificado
            </a>
          </div>
          <p>O copia y pega este enlace en tu navegador:</p>
          <p><a href="${certificateUrl}">${certificateUrl}</a></p>
          <hr style="border: 1px solid #eee; margin: 30px 0;" />
          <p style="font-size: 12px; color: #666;">Folio del certificado: ${folio}</p>
        </div>
      `,
        });

        if (error) {
            console.error('Error sending email:', error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (error) {
        console.error('SERVER ACTION ERROR:', error);
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
}
