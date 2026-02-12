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
 * POST /api/quote
 *
 * Receives a quote request (JSON) from the ContactForm and sends a
 * branded notification email to the business inbox via Resend.
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
  const quoteEmail = process.env.QUOTE_EMAIL || 'jnornamentaldesign@gmail.com';
  const quoteFromEmail =
    process.env.RESEND_QUOTE_FROM_EMAIL ||
    process.env.RESEND_FROM_EMAIL ||
    process.env.FROM_EMAIL ||
    'JN Ornamental Quotes <leads@quicklaunchweb.us>';

  if (!resendApiKey) {
    console.error('Missing RESEND_API_KEY environment variable');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  try {
    const body = (req.body ?? {}) as Record<string, unknown>;
    const splitLegacy = splitFullName(normalizeText(body.name));

    const firstName = normalizeName(normalizeText(body.firstName) || splitLegacy.firstName);
    const lastName = normalizeName(normalizeText(body.lastName) || splitLegacy.lastName);
    const phone = formatPhoneInput(normalizeText(body.phone));
    const email = normalizeEmail(normalizeText(body.email));
    const service = normalizeText(body.service);
    const message = normalizeText(body.message);
    const website = normalizeText(body.website);
    const parsedFormLoadedAt = Number(body._formLoadedAt);
    const formLoadedAt = Number.isFinite(parsedFormLoadedAt) ? parsedFormLoadedAt : undefined;
    const fullName = buildFullName(firstName, lastName);

    if (!firstName || !lastName || !phone || !email || !service) {
      return res.status(400).json({
        error: 'First name, last name, phone, email, and service are required.',
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
      from: quoteFromEmail,
      to: [quoteEmail],
      reply_to: email,
      subject: `New Quote Request | ${fullName} | ${service}`,
      html: buildQuoteEmail({ name: fullName, phone, email, service, message }),
      text: buildQuoteText({ name: fullName, phone, email, service, message }),
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
          : 'Failed to send quote request. Please try again later.',
        detail: process.env.NODE_ENV === 'production' ? undefined : resendErrorText || `HTTP ${resendResponse.status}`,
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Quote submission error:', err);
    return res.status(500).json({
      error: 'An unexpected error occurred.',
      detail: getDebugDetail(err),
    });
  }
}

function buildQuoteText(data: {
  name: string;
  phone: string;
  email: string;
  service: string;
  message?: string;
}) {
  const { name, phone, email, service, message } = data;

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
    'NEW QUOTE REQUEST',
    `Received: ${timestamp}`,
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Service: ${service}`,
    `Message: ${message || '(none)'}`,
    '',
    '--------------------------------------------------',
    'Powered by QuickLaunchWeb',
  ].join('\n');
}
/* ─────────────────────────────────────────────────────────────────────────────
   "White, Black, Yellow" Industrial Theme
   ───────────────────────────────────────────────────────────────────────────── */
function buildQuoteEmail(data: {
  name: string;
  phone: string;
  email?: string;
  service: string;
  message?: string;
}) {
  const { name, phone, email, service, message } = data;

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
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>New Quote Request</title>
  <style>
    :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#09090b;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;-webkit-font-smoothing:antialiased;">
  
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#09090b;padding:40px 16px;">
    <tr>
      <td align="center">
        
        <!-- MAIN CONTAINER -->
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;min-width:320px;background-color:#18181b;border-radius:8px;overflow:hidden;box-shadow:0 8px 16px rgba(0,0,0,0.4);border:1px solid #27272a;">
          
          <!-- BRAND ACCENT BAR -->
          <tr>
            <td style="height:4px;background-color:#f59e0b;"></td>
          </tr>

          <!-- HEADER -->
          <tr>
            <td style="padding:40px 40px 30px;text-align:center;">
              <p style="margin:0;color:#f59e0b;font-size:12px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;">New Quote Request</p>
              <h1 style="margin:12px 0 8px;font-size:28px;font-weight:700;color:#ffffff;line-height:1.2;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">${name}</h1>
              <p style="margin:0;font-size:14px;color:#a1a1aa;">Sent form from <a href="https://jnornamentaldesign.com" style="color:#71717a;text-decoration:none;">jnornamentaldesign.com</a></p>
            </td>
          </tr>

          <!-- PRIMARY ACTIONS (STACKED) -->
          <tr>
            <td style="padding:0 40px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                
                <!-- CALL BUTTON -->
                <tr>
                  <td align="center">
                    <a href="tel:${phone}" style="display:block;width:100%;background-color:#f59e0b;color:#09090b;font-size:14px;font-weight:800;text-decoration:none;padding:16px 24px;border-radius:6px;text-transform:uppercase;letter-spacing:0.5px;text-align:center;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;box-sizing:border-box;">
                      Call Now
                    </a>
                  </td>
                </tr>

                <!-- SPACER -->
                <tr>
                  <td height="12"></td>
                </tr>

                <!-- EMAIL BUTTON -->
                <tr>
                  <td align="center">
                    ${email ? `
                    <a href="mailto:${email}" style="display:block;width:100%;background-color:#27272a;color:#ffffff;font-size:14px;font-weight:800;text-decoration:none;padding:16px 24px;border-radius:6px;text-transform:uppercase;letter-spacing:0.5px;text-align:center;border:1px solid #3f3f46;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;box-sizing:border-box;">
                      Email Now
                    </a>
                    ` : `
                    <div style="display:block;width:100%;background-color:#27272a;color:#52525b;font-size:14px;font-weight:800;padding:16px 24px;border-radius:6px;text-transform:uppercase;letter-spacing:0.5px;text-align:center;border:1px solid #3f3f46;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;box-sizing:border-box;">
                      No Email
                    </div>
                    `}
                  </td>
                </tr>

              </table>
              <p style="margin:16px 0 0;text-align:center;font-size:12px;color:#52525b;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">
                Tap buttons above to contact directly
              </p>
            </td>
          </tr>

          <!-- DETAILS CARD -->
          <tr>
            <td style="padding:0 40px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#202023;border-radius:8px;border:1px solid #27272a;">
                
                <!-- SERVICE ROW -->
                <tr>
                  <td style="padding:24px 24px 0;">
                    <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#71717a;text-transform:uppercase;letter-spacing:1px;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">Service Interest</p>
                    <p style="margin:0;font-size:16px;color:#ffffff;font-weight:500;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">${service}</p>
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
                    <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#71717a;text-transform:uppercase;letter-spacing:1px;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">Message</p>
                    <p style="margin:0;font-size:15px;line-height:1.6;color:#d4d4d8;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;white-space:pre-wrap;">${message}</p>
                  </td>
                </tr>
                ` : ''}

                <!-- CONTACT DETAILS (SECONDARY) -->
                <tr>
                   <td style="padding:0 24px 24px;">
                      <div style="height:1px;background-color:#3f3f46;margin-bottom:24px;"></div>
                      
                      <p style="margin:0 0 8px;font-size:13px;color:#a1a1aa;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">
                        <strong style="color:#ffffff;">Phone:</strong> <a href="tel:${phone}" style="color:#a1a1aa;text-decoration:none;">${phone}</a>
                      </p>
                      ${email ? `
                      <p style="margin:0 0 8px;font-size:13px;color:#a1a1aa;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">
                        <strong style="color:#ffffff;">Email:</strong> <a href="mailto:${email}" style="color:#a1a1aa;text-decoration:none;">${email}</a>
                      </p>
                      ` : ''}
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
                Powered by <span style="color:#f59e0b;">QuickLaunchWeb</span>
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
