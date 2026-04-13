import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import type { Env } from '../config/env.js';

function emailLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 16px">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:8px;overflow:hidden">
        <!-- Header -->
        <tr>
          <td style="background-color:#0066a3;padding:24px 32px;text-align:center">
            <span style="color:#fcba0f;font-size:22px;font-weight:700;letter-spacing:-0.5px">Apio</span>
            <span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px"> systems</span>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px">
            ${content}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px;border-top:1px solid #e4e4e7;text-align:center">
            <p style="margin:0;font-size:12px;color:#a1a1aa">
              <a href="https://www.apio.systems" style="color:#0066a3;text-decoration:none;font-weight:500">Apio systems</a> - Solutions informatiques pour Artisans, TPE et PME
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export class EmailService {
  private transporter: Transporter | null = null;
  private from: string;

  constructor(config: Env) {
    this.from = config.SMTP_FROM ?? 'ping@apio.systems';

    if (config.SMTP_HOST && config.SMTP_PORT) {
      const isLocalhost = ['localhost', '127.0.0.1', '::1'].includes(config.SMTP_HOST);
      this.transporter = nodemailer.createTransport({
        host: config.SMTP_HOST,
        port: config.SMTP_PORT,
        secure: config.SMTP_PORT === 465,
        ...(isLocalhost ? { ignoreTLS: true } : {}),
        auth:
          config.SMTP_USER && config.SMTP_PASS
            ? { user: config.SMTP_USER, pass: config.SMTP_PASS }
            : undefined,
      });
    }
  }

  async sendLeadReply(toEmail: string, subject: string, body: string): Promise<void> {
    if (!this.transporter) return;

    const html = emailLayout(`
      <p style="margin:0 0 16px;font-size:15px;color:#18181b;line-height:1.6">
        ${body.replace(/\n/g, '<br>')}
      </p>
      <p style="margin:16px 0 0;font-size:14px;color:#71717a">
        Cordialement,<br>L&rsquo;équipe Apio systems
      </p>
    `);

    await this.transporter.sendMail({
      from: this.from,
      to: toEmail,
      subject,
      text: body,
      html,
    });
  }

  async sendNewLeadNotification(lead: {
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    company?: string | null;
    needType?: string | null;
    message?: string | null;
  }): Promise<void> {
    if (!this.transporter) return;

    const name = [lead.firstName, lead.lastName].filter(Boolean).join(' ') || 'Anonyme';

    const rows = [
      { label: 'Nom', value: name },
      { label: 'Email', value: lead.email },
      ...(lead.company ? [{ label: 'Entreprise', value: lead.company }] : []),
      ...(lead.needType ? [{ label: 'Besoin', value: lead.needType }] : []),
    ];

    const rowsHtml = rows
      .map(
        (r) => `
      <tr>
        <td style="padding:8px 12px;font-size:13px;color:#71717a;white-space:nowrap;vertical-align:top">${r.label}</td>
        <td style="padding:8px 12px;font-size:14px;color:#18181b;font-weight:500">${r.value}</td>
      </tr>`
      )
      .join('');

    const messageHtml = lead.message
      ? `<div style="margin-top:20px;padding:16px;background-color:#f4f4f5;border-radius:6px">
          <p style="margin:0 0 4px;font-size:13px;color:#71717a;font-weight:600">Message</p>
          <p style="margin:0;font-size:14px;color:#18181b;line-height:1.5;white-space:pre-wrap">${lead.message}</p>
        </div>`
      : '';

    const html = emailLayout(`
      <h2 style="margin:0 0 4px;font-size:18px;color:#18181b;font-weight:600">Nouveau lead</h2>
      <p style="margin:0 0 20px;font-size:14px;color:#71717a">Un contact vient d&rsquo;être soumis sur le site.</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e4e4e7;border-radius:6px;overflow:hidden">
        ${rowsHtml}
      </table>
      ${messageHtml}
    `);

    const text = [
      `Nouveau contact depuis apio.systems`,
      ``,
      `Nom : ${name}`,
      `Email : ${lead.email}`,
      lead.company ? `Entreprise : ${lead.company}` : null,
      lead.needType ? `Besoin : ${lead.needType}` : null,
      lead.message ? `\nMessage :\n${lead.message}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    await this.transporter.sendMail({
      from: this.from,
      to: this.from,
      subject: `Nouveau lead : ${name}${lead.company ? ` (${lead.company})` : ''}`,
      text,
      html,
    });
  }
}
