import React from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO } from '../constants';
import SEOHead from '../components/SEOHead';

const Terms: React.FC = () => {
  return (
    <div className="bg-white font-body selection:bg-amber-500 selection:text-black">
      <SEOHead
        title={`Terms of Service | ${BUSINESS_INFO.shortName}`}
        description={`Terms of Service for ${BUSINESS_INFO.name}. Review the terms and conditions for using our website and services.`}
        canonical={`https://${BUSINESS_INFO.website}/terms`}
      />

      {/* Hero */}
      <section className="relative py-24 bg-iron-900 overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)',
        }} />
        <div className="container mx-auto px-4 max-w-4xl relative">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Terms of Service
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
              <h2 className="text-2xl font-display font-bold text-iron-900 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the website of {BUSINESS_INFO.name} ("we," "us," or "our") at{' '}
                <strong>{BUSINESS_INFO.website}</strong>, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-iron-900 mb-4">2. Services</h2>
              <p>
                {BUSINESS_INFO.name} provides custom fencing, gates, railings, access control installation, and related metalwork services in the Houston, TX metropolitan area. All estimates provided through our website are free and non-binding until a formal agreement is signed.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-iron-900 mb-4">3. SMS/Text Messaging Terms</h2>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 space-y-4">
                <p>
                  <strong>Program Name:</strong> {BUSINESS_INFO.name} SMS Program
                </p>

                <p>
                  <strong>Program Description:</strong> When you submit a contact or quote request form on our website and opt in to SMS by checking the consent checkbox, you may receive the following types of text messages:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Lead submission confirmations</li>
                  <li>Appointment coordination and follow-ups</li>
                  <li>Missed call text-back notifications</li>
                  <li>Review requests after a completed service</li>
                  <li>After-hours auto-reply messages</li>
                </ul>

                <p>
                  These are service-related, non-marketing text messages only.
                </p>

                <p>
                  You can cancel the SMS service at any time. Simply text <strong>"STOP"</strong> to the number you received messages from. Upon sending "STOP," we will confirm your unsubscribe status via SMS. Following this confirmation, you will no longer receive SMS messages from us. To rejoin, sign up as you did initially, and we will resume sending SMS messages to you.
                </p>

                <p>
                  If you experience issues with the messaging program, reply with the keyword <strong>HELP</strong> for more assistance, or reach out directly to{' '}
                  <a href={`mailto:${BUSINESS_INFO.email}`} className="text-amber-600 underline hover:text-amber-500">{BUSINESS_INFO.email}</a>.
                </p>

                <p>
                  Carriers are not liable for delayed or undelivered messages.
                </p>

                <p>
                  As always, message and data rates may apply for messages sent to you from us and to us from you. Message frequency varies. For questions about your text plan or data plan, contact your wireless provider.
                </p>

                <p>
                  For privacy-related inquiries, please refer to our{' '}
                  <Link to="/privacy" className="text-amber-600 underline hover:text-amber-500">Privacy Policy</Link>.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-iron-900 mb-4">4. Use of Website</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Use the website for any unlawful purpose.</li>
                <li>Attempt to gain unauthorized access to any part of the website.</li>
                <li>Submit false or misleading information through our forms.</li>
                <li>Interfere with or disrupt the website or its servers.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-iron-900 mb-4">5. Intellectual Property</h2>
              <p>
                All content on this website, including text, images, logos, and design, is the property of {BUSINESS_INFO.name} and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our written consent.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-iron-900 mb-4">6. Limitation of Liability</h2>
              <p>
                {BUSINESS_INFO.name} shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website. Our liability is limited to the maximum extent permitted by law.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-iron-900 mb-4">7. Disclaimers</h2>
              <p>
                The website and its content are provided "as is" without warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted or error-free.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-iron-900 mb-4">8. Governing Law</h2>
              <p>
                These Terms of Service are governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law principles.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-iron-900 mb-4">9. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of the website constitutes acceptance of the updated terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-iron-900 mb-4">10. Contact Us</h2>
              <p>If you have questions about these Terms of Service, please contact us:</p>
              <ul className="list-none mt-3 space-y-2">
                <li><strong>Phone:</strong> {BUSINESS_INFO.phone}</li>
                <li><strong>Email:</strong> {BUSINESS_INFO.email}</li>
                <li><strong>Address:</strong> {BUSINESS_INFO.address}</li>
              </ul>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-400">
                <Link to="/privacy" className="text-amber-600 hover:text-amber-500 underline">View our Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
