import React, { useRef, useState } from 'react';
import { BUSINESS_INFO, SERVICE_CATEGORIES } from '../constants';
import { formatPhoneInput, isValidEmail, isValidName, isValidPhone, normalizeEmail, normalizeName } from '../utils/formValidation';
import { CheckCircleIcon, GoogleIcon, PhoneIcon, StarIcon } from './Icons';

interface ContactFormProps {
    variant?: 'default' | 'compact' | 'hero';
    title?: string;
    subtitle?: string;
}

interface ContactFormData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    service: string;
    message: string;
    website: string;
}

const validateContactData = (data: ContactFormData): string | null => {
    if (!data.firstName || !data.lastName || !data.phone || !data.email || !data.service) {
        return 'First name, last name, phone, email, and service are required.';
    }

    if (!isValidName(data.firstName)) {
        return 'Enter a valid first name (letters, spaces, hyphens, apostrophes).';
    }

    if (!isValidName(data.lastName)) {
        return 'Enter a valid last name (letters, spaces, hyphens, apostrophes).';
    }

    if (!isValidPhone(data.phone)) {
        return 'Please enter a valid 10-digit phone number.';
    }

    if (!isValidEmail(data.email)) {
        return 'Please enter a valid email address.';
    }

    return null;
};

const ContactForm: React.FC<ContactFormProps> = ({
    variant = 'default',
    title = 'Get Your Free Quote',
    subtitle = "Fill out the form and we'll get back to you within 24 hours.",
}) => {
    const [formData, setFormData] = useState<ContactFormData>({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        service: '',
        message: '',
        website: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const formLoadedAt = useRef(Date.now());

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        const normalizedData: ContactFormData = {
            ...formData,
            firstName: normalizeName(formData.firstName),
            lastName: normalizeName(formData.lastName),
            phone: formatPhoneInput(formData.phone),
            email: normalizeEmail(formData.email),
            service: formData.service.trim(),
            message: formData.message.trim(),
        };

        const validationError = validateContactData(normalizedData);
        if (validationError) {
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
                body: JSON.stringify({ ...normalizedData, _formLoadedAt: formLoadedAt.current }),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.error || 'Something went wrong. Please try again.');
            }

            setSubmitStatus('success');
        } catch (err: any) {
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

            if (name === 'firstName' || name === 'lastName') {
                return { ...prev, [name]: value.replace(/[^A-Za-z' -]/g, '').slice(0, 50) };
            }

            if (name === 'email') {
                return { ...prev, email: value.trimStart() };
            }

            return { ...prev, [name]: value };
        });
    };

    if (submitStatus === 'success') {
        return (
            <div className="text-center py-12">
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
                    className="inline-flex items-center gap-2 text-iron-900 font-display font-bold hover:text-amber-500 transition-colors"
                >
                    <PhoneIcon className="w-5 h-5" />
                    Need faster? Call {BUSINESS_INFO.phone}
                </a>
            </div>
        );
    }

    const inputClasses = `w-full bg-white border-2 border-gray-300 rounded-md px-4 py-3 text-iron-900 font-body normal-case
    placeholder:text-gray-400 focus:border-amber-500 focus:outline-none transition-colors`;

    const labelClasses =
        'block text-sm font-display font-bold text-iron-900 mb-2 uppercase tracking-wider';

    return (
        <div>
            {variant !== 'hero' && (
                <div className="mb-8">
                    <h3 className="text-2xl font-display font-bold text-iron-900 mb-2">
                        {title}
                    </h3>
                    <p className="text-gray-600 font-body normal-case">{subtitle}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className={labelClasses}>
                            First Name <span className="text-amber-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                            autoComplete="given-name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={inputClasses}
                            placeholder="John"
                            maxLength={50}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className={labelClasses}>
                            Last Name <span className="text-amber-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            required
                            autoComplete="family-name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={inputClasses}
                            placeholder="Doe"
                            maxLength={50}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="phone" className={labelClasses}>
                            Phone <span className="text-amber-500">*</span>
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
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
                            Email <span className="text-amber-500">*</span>
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
                    <label htmlFor="service" className={labelClasses}>
                        Service <span className="text-amber-500">*</span>
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
                    <label htmlFor="message" className={labelClasses}>
                        Project Details (Optional)
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
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

                {errorMsg && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm font-body normal-case">
                        {errorMsg}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full font-display font-bold py-4 px-6 rounded-md uppercase tracking-widest transition-all text-sm
            ${
                isSubmitting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-amber-500 hover:bg-amber-400 text-black'
            }`}
                >
                    {isSubmitting ? 'Sending...' : 'Request Free Estimate'}
                </button>

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

                <p className="text-center text-xs text-gray-400 pt-1 font-body normal-case">
                    Your information is secure. We never share your data.
                </p>
            </form>
        </div>
    );
};

export default ContactForm;
