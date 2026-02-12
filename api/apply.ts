import type { VercelRequest, VercelResponse } from '@vercel/node';
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
} from './formValidation';
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

const getDebugDetail = (error: unknown): string | undefined => {
  if (process.env.NODE_ENV === 'production') {
    return undefined;
  }

  if (!error) {
    return 'Unknown error';
  }

  if (typeof error === 'string') {
    return error;
  }

  if (typeof error === 'object' && 'message' in error && typeof (error as { message?: unknown }).message === 'string') {
    return (error as { message: string }).message;
  }

  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
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
    'JN Ornamental Careers <applications@quicklaunchweb.us>';

  if (!resendApiKey) {
    console.error('Missing RESEND_API_KEY environment variable');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

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

    if (process.env.SKIP_EMAIL_SEND === '1') {
      return res.status(200).json({ success: true, skipped: true });
    }

    const resendPayload = {
      from: applicationFromEmail,
      to: [applicationEmail],
      reply_to: email,
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
      attachments: [{ filename: resumeFilename, content: resumeBase64 }],
    };

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify(resendPayload),
    });

    if (!resendResponse.ok) {
      const resendErrorText = await resendResponse.text().catch(() => '');
      const resendErrorLower = resendErrorText.toLowerCase();
      const hasDomainVerificationError =
        resendResponse.status === 403 &&
        resendErrorLower.includes('verify a domain');
      console.error('Resend API error:', resendResponse.status, resendErrorText);
      return res.status(500).json({
        error: hasDomainVerificationError
          ? 'Email provider not configured for external recipients. Verify your domain in Resend and set RESEND_FROM_EMAIL.'
          : 'Failed to send application. Please try again later.',
        detail: process.env.NODE_ENV === 'production' ? undefined : resendErrorText || `HTTP ${resendResponse.status}`,
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Application submission error:', err);
    return res.status(500).json({
      error: 'An unexpected error occurred.',
      detail: getDebugDetail(err),
    });
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

  // Get Houston time for the timestamp
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/Chicago',
  };
  const timestamp = new Date().toLocaleString('en-US', dateOptions);

  return [
    'NEW JOB APPLICATION',
    `Received: ${timestamp}`,
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Position: ${position}`,
    `Resume: ${resumeFilename || '(none)'}`,
    `Message: ${message || '(none)'}`,
    '',
    '--------------------------------------------------',
    'Powered by QuickLaunchWeb',
  ].join('\n');
}
/* ─────────────────────────────────────────────────────────────────────────────
   "White, Black, Yellow" Industrial Theme
   ───────────────────────────────────────────────────────────────────────────── */
function buildApplicationEmail(data: {
  name: string;
  phone: string;
  email: string;
  position: string;
  message?: string;
  resumeFilename?: string;
}) {
  const { name, phone, email, position, message, resumeFilename } = data;

  // Get Houston time for the timestamp
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/Chicago',
  };
  const timestamp = new Date().toLocaleString('en-US', dateOptions);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Job Application</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          
          <!-- ── TOP ACCENT BAR ── -->
          <tr>
            <td style="height:6px;background-color:#3b82f6;"></td>
          </tr>

          <!-- ── HEADER ── -->
          <tr>
            <td style="padding:40px 40px 30px;background-color:#ffffff;text-align:center;border-bottom:1px solid #e4e4e7;">
              <h1 style="margin:0;font-size:28px;font-weight:900;color:#18181b;letter-spacing:-0.5px;text-transform:uppercase;line-height:1.2;">NEW APPLICANT</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#71717a;font-weight:500;">RECEIVED VIA JNORNAMENTALDESIGN.COM CAREERS</p>
              
              <!-- BIG TIMESTAMP -->
              <div style="margin-top:24px;display:inline-block;background-color:#18181b;color:#f59e0b;padding:8px 16px;border-radius:4px;font-weight:700;font-size:14px;letter-spacing:0.5px;">
                ${timestamp}
              </div>
            </td>
          </tr>

          <!-- ── ACTION BUTTONS ── -->
          <tr>
            <td style="padding:30px 40px;background-color:#fafafa;border-bottom:1px solid #e4e4e7;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <!-- EMAIL BUTTON -->
                    <a href="mailto:${email}" style="display:inline-block;margin:0 10px;background-color:#18181b;color:#ffffff;font-size:14px;font-weight:800;text-decoration:none;padding:14px 24px;border-radius:6px;text-transform:uppercase;letter-spacing:1px;">
                      Email Applicant
                    </a>
                    
                    <!-- CALL BUTTON -->
                    <a href="tel:${phone}" style="display:inline-block;margin:0 10px;background-color:#f59e0b;color:#000000;font-size:14px;font-weight:800;text-decoration:none;padding:14px 24px;border-radius:6px;text-transform:uppercase;letter-spacing:1px;">
                      Call Applicant
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── DETAILS GRID ── -->
          <tr>
            <td style="padding:40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                
                <tr>
                  <td style="padding-bottom:24px;width:120px;vertical-align:top;">
                    <span style="font-size:11px;font-weight:800;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">POSITION</span>
                  </td>
                  <td style="padding-bottom:24px;vertical-align:top;">
                     <span style="display:inline-block;padding:4px 12px;background-color:#eff6ff;color:#1d4ed8;font-size:12px;font-weight:800;border-radius:99px;text-transform:uppercase;letter-spacing:0.5px;">${position}</span>
                  </td>
                </tr>

                <tr>
                  <td style="padding-bottom:24px;width:120px;vertical-align:top;">
                    <span style="font-size:11px;font-weight:800;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">NAME</span>
                  </td>
                  <td style="padding-bottom:24px;vertical-align:top;">
                    <span style="font-size:16px;font-weight:700;color:#18181b;">${name}</span>
                  </td>
                </tr>

                <tr>
                  <td style="padding-bottom:24px;width:120px;vertical-align:top;">
                    <span style="font-size:11px;font-weight:800;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">PHONE</span>
                  </td>
                  <td style="padding-bottom:24px;vertical-align:top;">
                    <a href="tel:${phone}" style="font-size:16px;font-weight:600;color:#f59e0b;text-decoration:none;">${phone}</a>
                  </td>
                </tr>

                <tr>
                  <td style="padding-bottom:24px;width:120px;vertical-align:top;">
                    <span style="font-size:11px;font-weight:800;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">EMAIL</span>
                  </td>
                  <td style="padding-bottom:24px;vertical-align:top;">
                    <a href="mailto:${email}" style="font-size:16px;font-weight:600;color:#18181b;text-decoration:none;border-bottom:1px solid #e4e4e7;">${email}</a>
                  </td>
                </tr>

                ${message ? `
                <tr>
                  <td style="width:120px;vertical-align:top;padding-top:8px;">
                     <span style="font-size:11px;font-weight:800;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">NOTES</span>
                  </td>
                  <td style="vertical-align:top;padding-top:8px;">
                    <p style="margin:0;font-size:15px;line-height:1.6;color:#52525b;white-space:pre-wrap;">${message}</p>
                  </td>
                </tr>
                ` : ''}

                 <tr>
                  <td style="width:120px;vertical-align:top;padding-top:24px;">
                     <span style="font-size:11px;font-weight:800;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">RESUME</span>
                  </td>
                  <td style="vertical-align:top;padding-top:24px;">
                    <p style="margin:0;font-size:15px;color:#52525b;">${resumeFilename ? `📎 <strong>${resumeFilename}</strong> (Attached)` : '<span style="color:#a1a1aa;font-style:italic;">Not provided</span>'}</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- ── FOOTER ── -->
          <tr>
            <td style="background-color:#18181b;padding:30px;text-align:center;">
              <p style="margin:0 0 10px;font-size:12px;color:#a1a1aa;letter-spacing:0.5px;">
                VN Ornamental Design &bull; Applicant Tracking
              </p>
              <div style="margin-top:20px;border-top:1px solid #27272a;padding-top:20px;">
                <a href="https://quicklaunchweb.com" style="font-size:11px;color:#52525b;text-decoration:none;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;">
                  Powered by <span style="color:#f59e0b;">QuickLaunchWeb</span>
                </a>
              </div>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();
}
