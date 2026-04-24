import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO, SERVICE_CATEGORIES } from '../constants';
import { formatPhoneInput, isValidEmail, isValidName, isValidPhone, normalizeEmail, normalizeName } from '../utils/formValidation';
import { buildLeadAttributionSummary, trackMarketingEvent } from '../utils/analytics';
import { CheckCircleIcon, GoogleIcon, PhoneIcon, StarIcon } from './Icons';

interface ContactFormProps {
    variant?: 'default' | 'compact' | 'hero';
    title?: string;
    subtitle?: string;
}

interface ContactFormData {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    service: string;
    timeline: string;
    projectDetails: string;
    website: string;
    smsConsent: boolean;
    ageConsent: boolean;
}

const TIMELINE_OPTIONS = [
    'ASAP / Within 2 weeks',
    '2-4 weeks',
    '1-3 months',
    '3+ months',
    'Just planning / Flexible',
];

const validateContactData = (data: ContactFormData): string | null => {
    if (!data.fullName || !data.email || !data.address || !data.service || !data.timeline) {
        return 'Please fill out all required fields.';
    }

    if (!isValidName(data.fullName)) {
        return 'Enter a valid full name (letters, spaces, hyphens, apostrophes).';
    }

    if (data.phone && !isValidPhone(data.phone)) {
        return 'Please enter a valid 10-digit phone number.';
    }

    if (data.smsConsent && !isValidPhone(data.phone)) {
        return 'A valid phone number is required to receive SMS messages.';
    }

    if (!isValidEmail(data.email)) {
        return 'Please enter a valid email address.';
    }

    if (!data.ageConsent) {
        return 'You must confirm you are at least 18 years old to submit this form.';
    }

    return null;
};

const ContactForm: React.FC<ContactFormProps> = ({
    variant = 'default',
    title = 'Get Your Free Quote',
    subtitle = "Fill out the form and we'll get back to you within 24 hours.",
}) => {
    const [formData, setFormData] = useState<ContactFormData>({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        service: '',
        timeline: '',
        projectDetails: '',
        website: '',
        smsConsent: false,
        ageConsent: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const formLoadedAt = useRef(Date.now());
    const formContainerRef = useRef<HTMLDivElement | null>(null);
    const hasTrackedView = useRef(false);
    const hasTrackedStart = useRef(false);

    useEffect(() => {
        const node = formContainerRef.current;
        if (!node || hasTrackedView.current || typeof window === 'undefined') {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (!entry?.isIntersecting || hasTrackedView.current) {
                    return;
                }

                hasTrackedView.current = true;
                trackMarketingEvent('Quote Form Viewed', {
                    placement: variant,
                });
                observer.disconnect();
            },
            { threshold: 0.45 },
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, [variant]);

    const handleFormStart = () => {
        if (hasTrackedStart.current) {
            return;
        }

        hasTrackedStart.current = true;
        trackMarketingEvent('Quote Form Started', {
            placement: variant,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        const normalizedData: ContactFormData = {
            ...formData,
            fullName: normalizeName(formData.fullName),
            phone: formatPhoneInput(formData.phone),
            email: normalizeEmail(formData.email),
            address: formData.address.trim(),
            service: formData.service.trim(),
            timeline: formData.timeline.trim(),
            projectDetails: formData.projectDetails.trim(),
        };

        const validationError = validateContactData(normalizedData);
        if (validationError) {
            trackMarketingEvent('Quote Form Error', {
                placement: variant,
                label: 'validation_error',
                target: validationError,
                service: normalizedData.service || 'not_selected',
            });
            setSubmitStatus('error');
            setErrorMsg(validationError);
            setFormData((prev) => ({ ...prev, ...normalizedData }));
            return;
        }

        setFormData((prev) => ({ ...prev, ...normalizedData }));
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: normalizedData.fullName,
                    phone: normalizedData.phone,
                    email: normalizedData.email,
                    address: normalizedData.address,
                    service: normalizedData.service,
                    timeline: normalizedData.timeline,
                    message: normalizedData.projectDetails,
                    website: normalizedData.website,
                    smsConsent: normalizedData.smsConsent,
                    ageConsent: normalizedData.ageConsent,
                    _formLoadedAt: formLoadedAt.current,
                    _smsConsentSource: window.location.href,
                    _analyticsAttribution: buildLeadAttributionSummary(window.location.pathname),
                }),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.error || 'Something went wrong. Please try again.');
            }

            trackMarketingEvent('Quote Form Submitted', {
                placement: variant,
                service: normalizedData.service,
                target: normalizedData.smsConsent ? 'sms_opt_in' : 'email_only',
            });
            setSubmitStatus('success');
        } catch (err: any) {
            trackMarketingEvent('Quote Form Error', {
                placement: variant,
                label: 'submit_error',
                target: err.message || 'unknown_error',
                service: normalizedData.service || 'not_selected',
            });
            setErrorMsg(err.message || 'Something went wrong. Please try again.');
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            if (name === 'phone') {
                return { ...prev, phone: formatPhoneInput(value) };
            }

            if (name === 'fullName') {
                return { ...prev, fullName: value.replace(/[^A-Za-z' -]/g, '').slice(0, 80) };
            }

            if (name === 'email') {
                return { ...prev, email: value.trimStart() };
            }

            return { ...prev, [name]: value };
        });
    };

    if (submitStatus === 'success') {
        return (
            <div ref={formContainerRef} className="text-center py-12">
                <div className="w-16 h-16 bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircleIcon className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-2xl font-display font-bold text-iron-900 mb-3">
                    THANK YOU!
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6 font-body normal-case">
                    We've received your request and will contact you within 24 hours.
                </p>
                <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    data-analytics-placement={`${variant}_quote_success`}
                    className="inline-flex items-center gap-2 text-iron-900 font-display font-bold hover:text-amber-500 transition-colors"
                >
                    <PhoneIcon className="w-5 h-5" />
                    Need faster? Call {BUSINESS_INFO.phone}
                </a>
            </div>
        );
    }

    const isHero = variant === 'hero';

    const inputClasses = `w-full bg-white border-2 border-gray-300 rounded-md text-iron-900 font-body normal-case
    placeholder:text-gray-400 focus:border-amber-500 focus:outline-none transition-colors ${isHero ? 'px-3 py-2.5 text-sm' : 'px-4 py-3'}`;

    const labelClasses = `block font-display font-bold text-iron-900 uppercase tracking-wider ${isHero ? 'text-xs mb-1.5' : 'text-sm mb-2'}`;

    const requiredMark = <span className="text-amber-500">*</span>;

    return (
        <div ref={formContainerRef}>
            {variant !== 'hero' && (
                <div className="mb-8">
                    <h3 className="text-2xl font-display font-bold text-iron-900 mb-2">
                        {title}
                    </h3>
                    <p className="text-gray-600 font-body normal-case">{subtitle}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} onFocusCapture={handleFormStart} className={isHero ? 'space-y-3' : 'space-y-4'} noValidate>
                <div>
                    <label htmlFor="fullName" className={labelClasses}>
                        Full Name {requiredMark}
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        autoComplete="name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="John Doe"
                        maxLength={80}
                    />
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-2 ${isHero ? 'gap-3' : 'gap-4'}`}>
                    <div>
                        <label htmlFor="phone" className={labelClasses}>
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            autoComplete="tel"
                            inputMode="numeric"
                            value={formData.phone}
                            onChange={handleChange}
                            className={inputClasses}
                            placeholder="(281) 555-0123"
                            maxLength={14}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className={labelClasses}>
                            Email {requiredMark}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={inputClasses}
                            placeholder="john@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="address" className={labelClasses}>
                        Project Address {requiredMark}
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        required
                        autoComplete="street-address"
                        value={formData.address}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="123 Main St, Houston, TX"
                        maxLength={150}
                    />
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-2 ${isHero ? 'gap-3' : 'gap-4'}`}>
                    <div>
                        <label htmlFor="service" className={labelClasses}>
                            Service {requiredMark}
                        </label>
                        <select
                            id="service"
                            name="service"
                            required
                            value={formData.service}
                            onChange={handleChange}
                            className={inputClasses}
                        >
                            <option value="">Select...</option>
                            {SERVICE_CATEGORIES.map((cat) => (
                                <optgroup key={cat.slug} label={cat.title}>
                                    {cat.services.map((service) => (
                                        <option key={service.title} value={service.title}>
                                            {service.title}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="timeline" className={labelClasses}>
                            Timeline {requiredMark}
                        </label>
                        <select
                            id="timeline"
                            name="timeline"
                            required
                            value={formData.timeline}
                            onChange={handleChange}
                            className={inputClasses}
                        >
                            <option value="">Select...</option>
                            {TIMELINE_OPTIONS.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="projectDetails" className={labelClasses}>
                        Project Details (Optional)
                    </label>
                    <textarea
                        id="projectDetails"
                        name="projectDetails"
                        rows={isHero ? 2 : 4}
                        value={formData.projectDetails}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="Tell us about your project..."
                    />
                </div>

                <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    autoComplete="off"
                    tabIndex={-1}
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }}
                />

                <div className="border-2 border-gray-300 rounded-md p-3 bg-gray-50">
                    <p className={`font-display font-bold text-iron-900 uppercase tracking-wider mb-2 ${isHero ? 'text-xs' : 'text-sm'}`}>
                        SMS Communications from {BUSINESS_INFO.name}
                    </p>
                    <div className={`flex items-start ${isHero ? 'gap-2' : 'gap-3'}`}>
                        <input
                            type="checkbox"
                            id="smsConsent"
                            name="smsConsent"
                            checked={formData.smsConsent}
                            onChange={(e) => {
                                const checked = e.target.checked;
                                if (checked) {
                                    trackMarketingEvent('SMS Consent Checked', {
                                        placement: variant,
                                    });
                                }
                                setFormData((prev) => ({ ...prev, smsConsent: checked }));
                            }}
                            className={`mt-0.5 accent-amber-500 cursor-pointer flex-shrink-0 ${isHero ? 'h-3.5 w-3.5' : 'h-4 w-4'}`}
                        />
                        <label htmlFor="smsConsent" className={`text-iron-900 font-body normal-case cursor-pointer ${isHero ? 'text-[11px] leading-snug' : 'text-xs leading-relaxed'}`}>
                            I consent to receive non-marketing text messages from{' '}
                            <strong>{BUSINESS_INFO.name}</strong>. Message frequency may vary
                            (approximately 2-6 messages per month) and may include quote follow-ups, appointment reminders, project updates,
                            missed call text-backs, after-hours auto-replies, and one-time review requests. Message &amp; data rates may apply.
                            Text HELP for assistance. You may reply STOP to unsubscribe at any time. Your information will not be shared with
                            third parties.
                            See our{' '}
                            <Link to="/privacy" className="text-amber-600 underline hover:text-amber-500">Privacy Policy</Link> &amp;{' '}
                            <Link to="/terms" className="text-amber-600 underline hover:text-amber-500">Terms of Service</Link>.
                        </label>
                    </div>

                    <div className={`flex items-start border-t border-gray-200 pt-3 mt-3 ${isHero ? 'gap-2' : 'gap-3'}`}>
                        <input
                            type="checkbox"
                            id="ageConsent"
                            name="ageConsent"
                            required
                            checked={formData.ageConsent}
                            onChange={(e) => setFormData((prev) => ({ ...prev, ageConsent: e.target.checked }))}
                            className={`mt-0.5 accent-amber-500 cursor-pointer flex-shrink-0 ${isHero ? 'h-3.5 w-3.5' : 'h-4 w-4'}`}
                        />
                        <label htmlFor="ageConsent" className={`text-iron-900 font-body normal-case cursor-pointer ${isHero ? 'text-[11px] leading-snug' : 'text-xs leading-relaxed'}`}>
                            I confirm I am at least 18 years old. {requiredMark}
                        </label>
                    </div>
                </div>

                {errorMsg && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm font-body normal-case">
                        {errorMsg}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full font-display font-bold rounded-md uppercase tracking-widest transition-all text-sm
            ${isHero ? 'py-3 px-5' : 'py-4 px-6'}
            ${
                isSubmitting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-amber-500 hover:bg-amber-400 text-black'
            }`}
                >
                    {isSubmitting ? 'Sending...' : 'Request Free Estimate'}
                </button>

                {!isHero && (
                    <div className="flex items-center justify-center gap-6 pt-2">
                        <div className="flex items-center gap-2">
                            <GoogleIcon className="w-5 h-5" />
                            <div className="flex text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} className="w-3.5 h-3.5" filled />
                                ))}
                            </div>
                            <span className="text-sm font-display font-bold text-iron-900">
                                {BUSINESS_INFO.rating}
                            </span>
                        </div>
                        <div className="h-4 w-px bg-gray-300"></div>
                        <div className="text-sm text-gray-600 font-body normal-case">
                            <span className="font-display font-bold text-iron-900">1,500+</span> Projects Done
                        </div>
                    </div>
                )}

                <p className={`text-center text-gray-400 font-body normal-case ${isHero ? 'text-[10px] pt-0.5' : 'text-xs pt-1'}`}>
                    Your information is secure. We never share your data with third parties.
                </p>
            </form>
        </div>
    );
};

export default ContactForm;
