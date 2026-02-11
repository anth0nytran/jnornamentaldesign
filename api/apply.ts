import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import {
    buildFullName,
    formatPhoneInput,
    isValidEmail,
    isValidName,
    isValidPhone,
    normalizeEmail,
    normalizeName,
    normalizeText,
    splitFullName,
} from '../utils/formValidation';
import { checkSpam } from './spamGuard';

/**
 * POST /api/apply
 *
 * Receives a job application (JSON) and sends it to the business inbox
 * via Resend, with the resume attached.
 */
export const config = {
    runtime: 'nodejs',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const applicationEmail = process.env.APPLICATION_EMAIL || 'jnornamentaldesign@gmail.com';
    const applicationFromEmail =
        process.env.RESEND_APPLICATION_FROM_EMAIL ||
        process.env.RESEND_FROM_EMAIL ||
        process.env.FROM_EMAIL ||
        'JN Ornamental Careers <onboarding@resend.dev>';

    if (!resendApiKey) {
        console.error('Missing RESEND_API_KEY environment variable');
        return res.status(500).json({ error: 'Server configuration error.' });
    }

    const resend = new Resend(resendApiKey);

    try {
        const body = (req.body ?? {}) as Record<string, unknown>;
        const splitLegacy = splitFullName(normalizeText(body.name));

        const firstName = normalizeName(normalizeText(body.firstName) || splitLegacy.firstName);
        const lastName = normalizeName(normalizeText(body.lastName) || splitLegacy.lastName);
        const fullName = buildFullName(firstName, lastName);
        const phone = formatPhoneInput(normalizeText(body.phone));
        const email = normalizeEmail(normalizeText(body.email));
        const position = normalizeText(body.position);
        const message = normalizeText(body.message);
        const resumeBase64 = normalizeText(body.resumeBase64);
        const resumeFilename = normalizeText(body.resumeFilename);
        const website = normalizeText(body.website);
        const parsedFormLoadedAt = Number(body._formLoadedAt);
        const formLoadedAt = Number.isFinite(parsedFormLoadedAt) ? parsedFormLoadedAt : undefined;

        if (!firstName || !lastName || !phone || !email || !position || !resumeBase64 || !resumeFilename) {
            return res.status(400).json({
                error: 'First name, last name, phone, email, position, and resume are required.',
            });
        }

        if (!isValidName(firstName) || !isValidName(lastName)) {
            return res.status(400).json({ error: 'Invalid first name or last name.' });
        }

        if (!isValidPhone(phone)) {
            return res.status(400).json({ error: 'Please enter a valid 10-digit phone number.' });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ error: 'Please enter a valid email address.' });
        }

        const spam = checkSpam({
            name: fullName,
            phone,
            email,
            message,
            website,
            _formLoadedAt: formLoadedAt,
        });
        if (spam.blocked) {
            return res.status(200).json({ success: true });
        }

        const attachments = [{ filename: resumeFilename, content: resumeBase64 }];

        const { error: sendError } = await resend.emails.send({
            from: applicationFromEmail,
            to: [applicationEmail],
            replyTo: email,
            subject: `New Job Application | ${fullName} | ${position}`,
            html: buildApplicationEmail({
                name: fullName,
                phone,
                email,
                position,
                message,
                resumeFilename,
            }),
            text: buildApplicationText({
                name: fullName,
                phone,
                email,
                position,
                message,
                resumeFilename,
            }),
            attachments,
        });

        if (sendError) {
            console.error('Resend API error:', sendError);
            return res.status(500).json({ error: 'Failed to send application. Please try again later.' });
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('Application submission error:', err);
        return res.status(500).json({ error: 'An unexpected error occurred.' });
    }
}

function buildApplicationText(data: {
    name: string;
    phone: string;
    email: string;
    position: string;
    message?: string;
    resumeFilename?: string;
}) {
    const { name, phone, email, position, message, resumeFilename } = data;

    return [
        'New Job Application',
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Position: ${position}`,
        `Resume: ${resumeFilename || '(none)'}`,
        `Message: ${message || '(none)'}`,
    ].join('\n');
}
/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   Industrial-themed email template
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function buildApplicationEmail(data: {
    name: string;
    phone: string;
    email: string;
    position: string;
    message?: string;
    resumeFilename?: string;
}) {
    const { name, phone, email, position, message, resumeFilename } = data;

    return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- â•â•â• TOP ACCENT BAR â•â•â• -->
  <tr><td style="height:4px;background:linear-gradient(90deg,#f59e0b,#d97706);"></td></tr>

  <!-- â•â•â• HEADER â•â•â• -->
  <tr><td style="background:#111111;padding:28px 32px;border-bottom:1px solid #222;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:2px;text-transform:uppercase;">NEW JOB APPLICATION</h1>
          <p style="margin:6px 0 0;font-size:13px;color:#6b7280;letter-spacing:1px;">VIA JNORNAMENTALDESIGN.COM CAREERS</p>
        </td>
        <td align="right" valign="middle">
          <span style="display:inline-block;background:#3b82f6;color:#fff;font-size:11px;font-weight:800;letter-spacing:2px;padding:6px 14px;text-transform:uppercase;">APPLICANT</span>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- â•â•â• QUICK-ACTION CTA BUTTONS â•â•â• -->
  <tr><td style="background:#1a1a1a;padding:20px 32px;border-bottom:1px solid #222;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:0 6px;">
          <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
            <tr>
              <td style="padding:0 8px;">
                <a href="mailto:${email}" style="display:inline-block;background:#f59e0b;color:#000;font-size:13px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;padding:12px 28px;text-decoration:none;border-radius:4px;">âœ‰ï¸&nbsp; EMAIL APPLICANT</a>
              </td>
              <td style="padding:0 8px;">
                <a href="tel:${phone}" style="display:inline-block;background:transparent;color:#f59e0b;font-size:13px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;padding:12px 28px;text-decoration:none;border-radius:4px;border:2px solid #f59e0b;">ðŸ“ž&nbsp; CALL APPLICANT</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- â•â•â• APPLICANT DETAILS â•â•â• -->
  <tr><td style="background:#111111;padding:32px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <tr>
        <td style="padding:14px 16px;border-bottom:1px solid #1f1f1f;font-size:12px;font-weight:700;color:#6b7280;letter-spacing:1.5px;text-transform:uppercase;width:120px;vertical-align:top;">POSITION</td>
        <td style="padding:14px 16px;border-bottom:1px solid #1f1f1f;">
          <span style="display:inline-block;background:#3b82f620;color:#60a5fa;font-size:13px;font-weight:700;padding:5px 14px;border:1px solid #3b82f640;letter-spacing:0.5px;">${position}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 16px;border-bottom:1px solid #1f1f1f;font-size:12px;font-weight:700;color:#6b7280;letter-spacing:1.5px;text-transform:uppercase;vertical-align:top;">NAME</td>
        <td style="padding:14px 16px;border-bottom:1px solid #1f1f1f;font-size:16px;color:#ffffff;font-weight:600;">${name}</td>
      </tr>
      <tr>
        <td style="padding:14px 16px;border-bottom:1px solid #1f1f1f;font-size:12px;font-weight:700;color:#6b7280;letter-spacing:1.5px;text-transform:uppercase;vertical-align:top;">PHONE</td>
        <td style="padding:14px 16px;border-bottom:1px solid #1f1f1f;">
          <a href="tel:${phone}" style="color:#f59e0b;font-size:16px;font-weight:600;text-decoration:none;">${phone}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 16px;border-bottom:1px solid #1f1f1f;font-size:12px;font-weight:700;color:#6b7280;letter-spacing:1.5px;text-transform:uppercase;vertical-align:top;">EMAIL</td>
        <td style="padding:14px 16px;border-bottom:1px solid #1f1f1f;">
          <a href="mailto:${email}" style="color:#f59e0b;font-size:16px;font-weight:600;text-decoration:none;">${email}</a>
        </td>
      </tr>
      ${message ? `
      <tr>
        <td style="padding:14px 16px;border-bottom:1px solid #1f1f1f;font-size:12px;font-weight:700;color:#6b7280;letter-spacing:1.5px;text-transform:uppercase;vertical-align:top;">NOTES</td>
        <td style="padding:14px 16px;border-bottom:1px solid #1f1f1f;font-size:15px;color:#d1d5db;line-height:1.6;white-space:pre-wrap;">${message}</td>
      </tr>
      ` : ''}
      <tr>
        <td style="padding:14px 16px;font-size:12px;font-weight:700;color:#6b7280;letter-spacing:1.5px;text-transform:uppercase;vertical-align:top;">RESUME</td>
        <td style="padding:14px 16px;font-size:15px;color:#d1d5db;">${resumeFilename ? `ðŸ“Ž ${resumeFilename} (attached)` : '<span style="color:#6b7280;">Not provided</span>'}</td>
      </tr>
    </table>
  </td></tr>

  <!-- â•â•â• FOOTER â•â•â• -->
  <tr><td style="background:#0a0a0a;padding:20px 32px;border-top:1px solid #1a1a1a;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <p style="margin:0;font-size:11px;color:#4b5563;letter-spacing:1px;text-transform:uppercase;">JN Ornamental Design LLC</p>
          <p style="margin:4px 0 0;font-size:11px;color:#374151;">Careers â€¢ jnornamentaldesign.com</p>
        </td>
        <td align="right" valign="middle">
          <span style="display:inline-block;width:32px;height:3px;background:#f59e0b;"></span>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- â•â•â• BOTTOM ACCENT BAR â•â•â• -->
  <tr><td style="height:4px;background:linear-gradient(90deg,#d97706,#f59e0b);"></td></tr>

</table>
</td></tr>
</table>
</body>
</html>
    `.trim();
}


