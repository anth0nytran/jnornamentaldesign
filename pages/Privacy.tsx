import React from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO } from '../constants';
import SEOHead from '../components/SEOHead';

const Privacy: React.FC = () => {
  return (
    <div className="bg-white font-body selection:bg-amber-500 selection:text-black">
      <SEOHead
        title={`Privacy Policy | ${BUSINESS_INFO.shortName}`}
        description={`Privacy Policy for ${BUSINESS_INFO.name}. Learn how we collect, use, and protect your personal information.`}
        canonical={`https://${BUSINESS_INFO.website}/privacy`}
      />

      {/* Hero */}
      <section className="relative py-24 bg-iron-900 overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)',
        }} />
        <div className="container mx-auto px-4 max-w-4xl relative">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-white/50 mt-4 font-body normal-case">
            Last updated: April 7, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-gray max-w-none normal-case text-gray-700 leading-relaxed space-y-8">

            <div>
              <h2 className="text-2xl font-display font-bold text-iron-900 mb-4">1. Introduction</h2>
              <p>
                {BUSINESS_INFO.name} ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website{' '}
                <strong>{BUSINESS_INFO.website}</strong>, use our services, or interact with us in any way.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-iron-900 mb-4">2. Information We Collect</h2>
              <p>We may collect the following types of personal information:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Contact Information:</strong> Name, email address, phone number, and mailing address.</li>
                <li><strong>Project Details:</strong> Information about your fencing, gate, railing, or access control project needs.</li>
                <li><strong>Employment Information:</strong> Resume, work history, and qualifications if you apply for a position.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, and pages visited.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-iron-900 mb-4">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Respond to your inquiries and provide free estimates.</li>
                <li>Communicate with you about our services, appointments, and project updates.</li>
                <li>Send SMS notifications and marketing messages if you have opted in.</li>
                <li>Process job applications.</li>
                <li>Improve our website and services.</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-iron-900 mb-4">4. SMS/Text Messaging</h2>

              <p className="mt-3">
                <strong>Message Types:</strong> All SMS messages sent through our website are transactional and informational only. Messages include lead submission confirmations, missed call text-backs, appointment follow-ups, after-hours auto-replies, and one-time review requests after completed services.
              </p>

              <p className="mt-3">
                <strong>How You Opt In:</strong> Our website includes a contact/quote form with a phone number field and an unchecked SMS consent checkbox (not pre-checked). You must actively check the box to opt in. The checkbox reads:
              </p>
              <p className="mt-2 pl-4 border-l-4 border-amber-500 italic text-gray-500">
                "I consent to receive SMS appointment reminders, quote follow-ups, project updates &amp; occasional marketing messages from {BUSINESS_INFO.name}. Message frequency may vary (approximately 2-6 messages per month). Message &amp; data rates may apply. Text HELP for assistance. You may reply STOP to unsubscribe at any time. Your information will not be shared with third parties. Privacy Policy &amp; Terms of Service."
              </p>
              <p className="mt-3">
                Consent is voluntary and not required to submit the form or receive service. We capture and store proof of opt-in including timestamp, source page URL, phone number, and checkbox state.
              </p>

              <p className="mt-3">
                <strong>Message Frequency:</strong> Message frequency varies based on activity. Typically 1–5 messages per customer interaction.
              </p>

              <p className="mt-3">
                <strong>Message and Data Rates:</strong> Standard message and data rates from your mobile carrier may apply. We are not responsible for carrier charges. Major US carriers are supported including AT&amp;T, T-Mobile, Verizon, and Sprint.
              </p>

              <p className="mt-3">
                <strong>Opt-Out:</strong> Reply <strong>STOP</strong> to any message to immediately unsubscribe. You will receive a one-time confirmation and no further messages will be sent. To re-subscribe, reply <strong>START</strong>.
              </p>

              <p className="mt-3">
                <strong>Help:</strong> Reply <strong>HELP</strong> to any message for assistance, or email {BUSINESS_INFO.email}.
              </p>

              <p className="mt-3">
                <strong>SMS Data and Privacy:</strong> We do not sell, rent, or share your mobile phone number or SMS consent data with any third parties for their marketing purposes. SMS consent and opt-in data is used solely for sending the transactional messages described in this section. Opt-in records (timestamp, source URL, phone number, consent state) are retained for compliance purposes.
              </p>

              <p className="mt-3 font-semibold text-iron-900 bg-amber-50 border-l-4 border-amber-500 p-4">
                All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties, excluding aggregators and providers of the Text Message services.
              </p>

              <p className="mt-3">
                Carriers are not liable for delayed or undelivered messages.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-iron-900 mb-4">5. Data Sharing and Disclosure</h2>
              <p>
                We do not sell your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, provided they agree to keep your information confidential.
              </p>
              <p className="mt-3 font-semibold text-iron-900 bg-amber-50 border-l-4 border-amber-500 p-4">
                No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. Information sharing to subcontractors in support services, such as customer service, is permitted. All other use case categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-iron-900 mb-4">6. Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-iron-900 mb-4">7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Access, correct, or delete your personal information.</li>
                <li>Opt out of marketing communications at any time.</li>
                <li>Request information about how your data is used.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-iron-900 mb-4">8. Cookies</h2>
              <p>
                Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can set your browser to refuse cookies, but some features of the website may not function properly.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-iron-900 mb-4">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this page periodically.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-iron-900 mb-4">10. Contact Us</h2>
              <p>If you have questions or concerns about this Privacy Policy, please contact us:</p>
              <ul className="list-none mt-3 space-y-2">
                <li><strong>Phone:</strong> {BUSINESS_INFO.phone}</li>
                <li><strong>Email:</strong> {BUSINESS_INFO.email}</li>
                <li><strong>Address:</strong> {BUSINESS_INFO.address}</li>
              </ul>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-400">
                <Link to="/terms" className="text-amber-600 hover:text-amber-500 underline">View our Terms of Service</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
