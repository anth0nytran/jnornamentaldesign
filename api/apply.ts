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
} from './formValidation.js';
import { checkSpam } from './spamGuard.js';

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
<body style="margin:0;padding:0;background-color:#09090b;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;-webkit-font-smoothing:antialiased;">
  
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#09090b;padding:40px 16px;">
    <tr>
      <td align="center">
        
        <!-- MAIN CONTAINER -->
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;min-width:320px;background-color:#18181b;border-radius:8px;overflow:hidden;box-shadow:0 8px 16px rgba(0,0,0,0.4);border:1px solid #27272a;">
          
          <!-- BRAND ACCENT BAR (BLUE FOR APPLICANTS) -->
          <tr>
            <td style="height:4px;background-color:#3b82f6;"></td>
          </tr>

          <!-- HEADER -->
          <tr>
            <td style="padding:40px 40px 30px;text-align:center;">
              <p style="margin:0;color:#3b82f6;font-size:12px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;">New Job Application</p>
              <h1 style="margin:12px 0 8px;font-size:28px;font-weight:700;color:#ffffff;line-height:1.2;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">${name}</h1>
              <p style="margin:0;font-size:14px;color:#a1a1aa;">Applied via <a href="https://jnornamentaldesign.com/careers" style="color:#71717a;text-decoration:none;">jnornamentaldesign.com/careers</a></p>
            </td>
          </tr>

          <!-- PRIMARY ACTIONS -->
          <tr>
            <td style="padding:0 40px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="48%" align="center">
                    <!-- CALL BUTTON -->
                    <a href="tel:${phone}" style="display:block;background-color:#3b82f6;color:#ffffff;font-size:14px;font-weight:800;text-decoration:none;padding:16px 24px;border-radius:6px;text-transform:uppercase;letter-spacing:0.5px;text-align:center;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">
                      Call Now
                    </a>
                  </td>
                  
                  <td width="4%"></td> <!-- SPACER -->

                  <td width="48%" align="center">
                    <!-- EMAIL BUTTON -->
                    <a href="mailto:${email}" style="display:block;background-color:#27272a;color:#ffffff;font-size:14px;font-weight:800;text-decoration:none;padding:16px 24px;border-radius:6px;text-transform:uppercase;letter-spacing:0.5px;text-align:center;border:1px solid #3f3f46;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">
                      Email Now
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:16px 0 0;text-align:center;font-size:12px;color:#52525b;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">
                Review application details below
              </p>
            </td>
          </tr>

          <!-- DETAILS CARD -->
          <tr>
            <td style="padding:0 40px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#202023;border-radius:8px;border:1px solid #27272a;">
                
                <!-- POSITION ROW -->
                <tr>
                  <td style="padding:24px 24px 0;">
                    <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#71717a;text-transform:uppercase;letter-spacing:1px;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">Applying For</p>
                    <p style="margin:0;font-size:16px;color:#ffffff;font-weight:500;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">${position}</p>
                  </td>
                </tr>

                <!-- DIVIDER -->
                <tr>
                  <td style="padding:24px;">
                    <div style="height:1px;background-color:#3f3f46;"></div>
                  </td>
                </tr>

                ${message ? `
                <!-- MESSAGE ROW -->
                <tr>
                  <td style="padding:0 24px 24px;">
                    <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#71717a;text-transform:uppercase;letter-spacing:1px;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">Cover Note</p>
                    <p style="margin:0;font-size:15px;line-height:1.6;color:#d4d4d8;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;white-space:pre-wrap;">${message}</p>
                  </td>
                </tr>
                ` : ''}

                 <!-- RESUME ROW -->
                <tr>
                  <td style="padding:0 24px 24px;">
                     <div style="background-color:#27272a;padding:12px;border-radius:6px;border:1px dashed #52525b;">
                        <p style="margin:0;font-size:13px;color:#d4d4d8;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">
                           ${resumeFilename ? `📎 <strong>${resumeFilename}</strong> (Attached to email)` : '<span style="color:#a1a1aa;font-style:italic;">No resume provided</span>'}
                        </p>
                     </div>
                  </td>
                </tr>

                <!-- CONTACT DETAILS (SECONDARY) -->
                <tr>
                   <td style="padding:0 24px 24px;">
                      <div style="height:1px;background-color:#3f3f46;margin-bottom:24px;"></div>
                      
                      <p style="margin:0 0 8px;font-size:13px;color:#a1a1aa;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">
                        <strong style="color:#ffffff;">Phone:</strong> <a href="tel:${phone}" style="color:#a1a1aa;text-decoration:none;">${phone}</a>
                      </p>
                      <p style="margin:0 0 8px;font-size:13px;color:#a1a1aa;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">
                        <strong style="color:#ffffff;">Email:</strong> <a href="mailto:${email}" style="color:#a1a1aa;text-decoration:none;">${email}</a>
                      </p>
                      <p style="margin:0;font-size:13px;color:#a1a1aa;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">
                        <strong style="color:#ffffff;">Received:</strong> ${timestamp}
                      </p>
                   </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#141417;padding:24px;text-align:center;border-top:1px solid #27272a;">
              <p style="margin:0;font-size:11px;color:#52525b;text-transform:uppercase;letter-spacing:1px;font-weight:700;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">
                Powered by <span style="color:#3b82f6;">QuickLaunchWeb</span>
              </p>
            </td>
          </tr>

        </table>

        <p style="margin:24px 0 0;font-size:12px;color:#52525b;text-align:center;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">
          © ${new Date().getFullYear()} JN Ornamental Design.
        </p>

      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();
}
