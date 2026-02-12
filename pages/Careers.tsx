import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { BUSINESS_INFO } from '../constants';
import {
    CheckCircleIcon,
    MapPinIcon,
    ClockIcon,
    ArrowRightIcon,
    ShieldCheckIcon,
    PhoneIcon,
    StarIcon,
} from '../components/Icons';
import SEOHead from '../components/SEOHead';
import SchemaMarkup from '../components/SchemaMarkup';
import heroImage from '../assets/gallery/starting at my Dad Garage.png';
import {
    formatPhoneInput,
    isValidEmail,
    isValidName,
    isValidPhone,
    normalizeEmail,
    normalizeName,
} from '../utils/formValidation';

/* ─────────── types ─────────── */
interface ApplicationForm {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    position: string;
    message: string;
    website: string; // honeypot — hidden from real users
}

/* ─────────── open positions data ─────────── */
const OPEN_POSITIONS = [
    {
        id: 'fence-fabricator-installer',
        title: 'Fence Fabricator / Installer',
        type: 'Full-Time',
        location: 'Houston, TX',
        description:
            'We are looking for a skilled and reliable Fence Fabricator & Installer to join our growing team. You will fabricate custom iron, wood, and aluminum fences in our shop and install them on-site across the Houston metro area.',
        responsibilities: [
            'Fabricate high-end iron, wood, and aluminum systems in-shop',
            'Interpret technical blueprints and measurements with precision',
            'Execute on-site installations for residential and commercial projects',
            'Master MIG/TIG welding and metal finishing techniques',
            'Operate fabrication machinery and power tools safely',
            'Collaborate with the crew to hit project deadlines',
            'Maintain high standards of shop organization and safety',
        ],
        qualifications: [
            'Proven experience in fence fabrication or installation',
            'Solid welding proficiency (MIG/TIG)',
            'Ability to read tape measures, levels, and plans',
            'Comfortable working outdoors in Houston weather',
            'Valid DL and reliable transportation',
            'Physical ability to lift 50+ lbs',
            'Bilingual (English/Spanish) is a strong plus',
        ],
        benefits: [
            'Top-tier pay based on skill level',
            'Consistent year-round hours (Mon–Sat)',
            'Family-owned culture with zero corporate politics',
            'Real growth potential into foreman roles',
            'Hands-on mentorship and skill acquisition',
        ],
    },
];

/* ─────────── component ─────────── */
const Careers: React.FC = () => {
    const formRef = useRef<HTMLDivElement>(null);

    /* ── form state ── */
    const [formData, setFormData] = useState<ApplicationForm>({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        position: OPEN_POSITIONS[0]?.title ?? '',
        message: '',
        website: '', // honeypot
    });
    const formLoadedAt = useRef(Date.now());
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    /* ── handlers ── */
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (file && file.size > 5 * 1024 * 1024) {
            setErrorMsg('File size must be under 5 MB.');
            setResumeFile(null);
            return;
        }
        setErrorMsg('');
        setResumeFile(file);
    };

    const fileToBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                resolve(result.split(',')[1]); // strip data URI prefix
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        const normalizedData: ApplicationForm = {
            ...formData,
            firstName: normalizeName(formData.firstName),
            lastName: normalizeName(formData.lastName),
            phone: formatPhoneInput(formData.phone),
            email: normalizeEmail(formData.email),
            position: formData.position.trim(),
            message: formData.message.trim(),
        };

        if (
            !normalizedData.firstName ||
            !normalizedData.lastName ||
            !normalizedData.phone ||
            !normalizedData.email ||
            !normalizedData.position
        ) {
            setSubmitStatus('error');
            setErrorMsg('First name, last name, phone, email, and position are required.');
            setFormData((prev) => ({ ...prev, ...normalizedData }));
            return;
        }

        if (!isValidName(normalizedData.firstName)) {
            setSubmitStatus('error');
            setErrorMsg('Enter a valid first name (letters, spaces, hyphens, apostrophes).');
            return;
        }

        if (!isValidName(normalizedData.lastName)) {
            setSubmitStatus('error');
            setErrorMsg('Enter a valid last name (letters, spaces, hyphens, apostrophes).');
            return;
        }

        if (!isValidPhone(normalizedData.phone)) {
            setSubmitStatus('error');
            setErrorMsg('Please enter a valid 10-digit phone number.');
            return;
        }

        if (!isValidEmail(normalizedData.email)) {
            setSubmitStatus('error');
            setErrorMsg('Please enter a valid email address.');
            return;
        }

        if (!resumeFile) {
            setSubmitStatus('error');
            setErrorMsg('Please attach your resume.');
            return;
        }

        setFormData((prev) => ({ ...prev, ...normalizedData }));
        setIsSubmitting(true);

        try {
            let resumeBase64 = '';
            let resumeFilename = '';

            resumeBase64 = await fileToBase64(resumeFile);
            resumeFilename = resumeFile.name;

            const res = await fetch('/api/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...normalizedData,
                    resumeBase64,
                    resumeFilename,
                    _formLoadedAt: formLoadedAt.current,
                }),
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

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    /* ── shared classes ── */
    const inputClasses = `w-full bg-white border-2 border-gray-300 rounded-md px-4 py-3 text-iron-900 font-body normal-case
    placeholder:text-gray-400 focus:border-amber-500 focus:outline-none transition-colors`;
    const labelClasses =
        'block text-sm font-display font-bold text-iron-900 mb-2 uppercase tracking-wider';

    /* ── render ── */
    return (
        <div className="bg-white font-body selection:bg-amber-500 selection:text-black">
            <SEOHead
                title="Careers at JN Ornamental Design | Join Our Team | Houston TX"
                description="Join the JN Ornamental Design team in Houston. We're hiring skilled fence fabricators and installers. Competitive pay, growth opportunities, and a family-owned culture."
                canonical="https://jnornamentaldesign.com/careers"
                keywords="fence installer jobs houston, iron fabricator jobs, welding jobs houston tx, fence company hiring, jn ornamental careers"
            />
            <SchemaMarkup type="LocalBusiness" />

            {/* MOBILE HERO IMAGE (Visible < lg) */}
            <div className="block lg:hidden relative w-full h-[45vh] bg-iron-900 overflow-hidden">
                <img
                    src={heroImage}
                    alt="JN Ornamental fabrication shop"
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-90"
                />
                {/* Gradient Fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-iron-900 via-iron-900/60 to-transparent"></div>
            </div>

            {/* ══════════ HERO ══════════ */}
            <section className="relative min-h-[50vh] lg:min-h-[80vh] flex items-start lg:items-center bg-iron-900 overflow-visible lg:overflow-hidden -mt-6 lg:mt-0 pt-0 lg:py-0">
                {/* Floating Orange Bar at Top of Content */}
                <div className="block lg:hidden absolute top-0 left-0 w-full h-1 bg-amber-500 z-20 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>

                {/* Right side image — visible on lg+ */}
                <div className="hidden lg:block absolute top-0 right-0 w-[60%] h-full z-[1]">
                    <img
                        src={heroImage}
                        alt="JN Ornamental fabrication shop"
                        className="w-full h-full object-cover grayscale opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-iron-900 via-iron-900/50 to-transparent" />
                </div>

                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.02] z-0"
                    style={{
                        backgroundImage: `linear-gradient(0deg, #fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                    }}
                />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-500 z-10" />

                <div className="container mx-auto px-6 max-w-7xl relative z-30 py-0 pb-12 pt-0 lg:py-28">
                    <div className="lg:max-w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-col items-center lg:items-start w-full"
                        >
                            <div className="inline-flex items-center gap-3 bg-amber-500 px-5 py-2 mb-6 -mt-4 relative z-30 shadow-lg shadow-black/20">
                                <span className="text-sm font-display font-bold text-black tracking-widest uppercase">
                                    We&apos;re Hiring
                                </span>
                            </div>

                            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[0.95] mb-6 uppercase">
                                Build Your Career{' '}
                                <span className="text-amber-500">With Us</span>
                            </h1>

                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl mb-8 font-body font-light normal-case mx-auto lg:mx-0">
                                Join Houston&apos;s most trusted ornamental iron crew. We&apos;re looking for
                                skilled craftsmen who take pride in what they build.
                            </p>

                            <button
                                onClick={scrollToForm}
                                className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-black font-display font-bold py-4 px-8 rounded-md uppercase tracking-widest transition-all hover:shadow-lg hover:shadow-amber-500/20 hover:-translate-y-0.5 active:translate-y-0 text-sm mb-10"
                            >
                                View Open Positions
                                <ArrowRightIcon className="w-5 h-5" />
                            </button>

                            {/* Trust Badges */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-8 border-t border-white/20 pt-8 w-full">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-amber-500/20 flex items-center justify-center text-amber-500">
                                        <ClockIcon className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white font-display font-bold text-sm">FULL-TIME HOURS</div>
                                        <div className="text-white/40 text-xs font-body normal-case">Mon – Sat</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-amber-500/20 flex items-center justify-center text-amber-500">
                                        <MapPinIcon className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white font-display font-bold text-sm">HOUSTON, TX</div>
                                        <div className="text-white/40 text-xs font-body normal-case">Shop + Field</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-amber-500/20 flex items-center justify-center text-amber-500">
                                        <ShieldCheckIcon className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white font-display font-bold text-sm">COMPETITIVE PAY</div>
                                        <div className="text-white/40 text-xs font-body normal-case">Based on Experience</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══════════ WHY WORK WITH US ══════════ */}
            <section className="py-20 lg:py-24 bg-iron-50 relative overflow-hidden">
                {/* Subtle crosshatch */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, #1a1a1a 30px, #1a1a1a 31px), repeating-linear-gradient(-45deg, transparent, transparent 30px, #1a1a1a 30px, #1a1a1a 31px)`,
                }} />

                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <div className="text-center mb-14">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="w-12 h-0.5 bg-amber-500" />
                            <span className="text-amber-500 font-display font-bold uppercase tracking-widest text-sm">
                                Why JN Ornamental
                            </span>
                            <div className="w-12 h-0.5 bg-amber-500" />
                        </div>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-iron-900 uppercase">
                            More Than a Job — <span className="text-amber-500">It&apos;s a Trade</span>
                        </h2>
                        <p className="text-gray-500 text-base leading-relaxed mt-4 font-body font-light normal-case max-w-2xl mx-auto">
                            We don&apos;t just hire workers — we invest in craftsmen who want to grow.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {[
                            { title: 'Top-Tier Weekly Pay', desc: 'We pay for talent. Rates are based on your skill level and hustle — no games.' },
                            { title: 'Master Your Craft', desc: 'Sharpen your welding and fabrication skills on custom, high-end projects.' },
                            { title: 'No Corporate BS', desc: 'Family-owned means we look out for our own. You’re a name, not a number.' },
                            { title: 'Career Growth', desc: 'We promote from within. Show us your drive, and we’ll give you the lead.' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className="group flex gap-5 p-8 bg-iron-900 border border-white/5 hover:border-amber-500/50 transition-all duration-300 rounded-sm hover:-translate-y-1 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="font-display font-bold text-6xl text-amber-500">0{i + 1}</span>
                                </div>
                                <div className="relative z-10">
                                    <h4 className="font-display font-bold text-white text-lg mb-2 uppercase tracking-wide group-hover:text-amber-500 transition-colors">{item.title}</h4>
                                    <p className="text-gray-400 text-sm font-body normal-case leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ OPEN POSITIONS ══════════ */}
            <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
                {/* Grid pattern */}
                <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
                    backgroundImage: `linear-gradient(0deg, #000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }} />
                <div className="container mx-auto px-6 max-w-5xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-14"
                    >
                        <span className="text-amber-500 font-display font-bold uppercase tracking-widest text-xs mb-3 block">
                            Open Positions
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-iron-900 uppercase">
                            Current Openings
                        </h2>
                    </motion.div>

                    {OPEN_POSITIONS.map((job) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-lg shadow-2xl overflow-hidden mb-10"
                        >
                            {/* Job Header */}
                            <div className="bg-iron-900 border-b-4 border-amber-500 p-8 md:p-10 text-white">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div>
                                        <h3 className="font-display text-2xl md:text-3xl font-bold uppercase">
                                            {job.title}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-300">
                                            <span className="inline-flex items-center gap-1.5">
                                                <ClockIcon className="w-4 h-4 text-amber-500" />
                                                {job.type}
                                            </span>
                                            <span className="inline-flex items-center gap-1.5">
                                                <MapPinIcon className="w-4 h-4 text-amber-500" />
                                                {job.location}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={scrollToForm}
                                        className="self-start md:self-center bg-amber-500 hover:bg-amber-400 text-black font-display font-bold py-3 px-6 rounded-md uppercase tracking-widest text-sm transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>

                            {/* Job Body */}
                            <div className="p-8 md:p-12 bg-zinc-900">
                                <p className="text-gray-300 font-body normal-case leading-relaxed text-lg mb-12 max-w-3xl">
                                    {job.description}
                                </p>

                                <div className="grid md:grid-cols-2 gap-8 mb-10">
                                    {/* Responsibilities */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                                            <div className="w-1 h-6 bg-amber-500"></div>
                                            <h4 className="font-display font-bold text-white uppercase tracking-widest text-sm">
                                                Responsibilities
                                            </h4>
                                        </div>
                                        <ul className="space-y-4">
                                            {job.responsibilities.map((item, i) => (
                                                <li key={i} className="flex items-start gap-4">
                                                    <span className="text-amber-500 mt-1.5 flex-shrink-0">
                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect width="12" height="12" fill="currentColor" />
                                                        </svg>
                                                    </span>
                                                    <span className="text-gray-400 font-body normal-case text-base leading-relaxed">
                                                        {item}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Qualifications */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                                            <div className="w-1 h-6 bg-amber-500"></div>
                                            <h4 className="font-display font-bold text-white uppercase tracking-widest text-sm">
                                                Qualifications
                                            </h4>
                                        </div>
                                        <ul className="space-y-4">
                                            {job.qualifications.map((item, i) => (
                                                <li key={i} className="flex items-start gap-4">
                                                    <span className="text-amber-500 mt-1.5 flex-shrink-0">
                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect width="12" height="12" fill="currentColor" />
                                                        </svg>
                                                    </span>
                                                    <span className="text-gray-400 font-body normal-case text-base leading-relaxed">
                                                        {item}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* What We Offer (Benefits) */}
                                <div>
                                    <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                                        <div className="w-1 h-6 bg-amber-500"></div>
                                        <h4 className="font-display font-bold text-white uppercase tracking-widest text-sm">
                                            What We Offer
                                        </h4>
                                    </div>
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {job.benefits.map((item, i) => (
                                            <div key={i} className="flex items-start gap-3 bg-white/5 p-4 rounded border border-white/5 hover:border-amber-500/30 transition-colors">
                                                <CheckCircleIcon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-300 font-body normal-case text-sm font-medium leading-relaxed">
                                                    {item}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ══════════ APPLICATION FORM ══════════ */}
            <section ref={formRef} className="py-20 lg:py-28 bg-iron-50 scroll-mt-24">
                <div className="container mx-auto px-6 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {submitStatus === 'success' ? (
                            /* ── Success State ── */
                            <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-10 md:p-14 text-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-green-500" />
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircleIcon className="w-10 h-10 text-green-500" />
                                </div>
                                <h3 className="font-display text-3xl font-bold text-iron-900 mb-3 uppercase">
                                    Application Received!
                                </h3>
                                <p className="text-gray-600 font-body normal-case text-lg mb-8 max-w-md mx-auto">
                                    Thank you for your interest in joining JN Ornamental Design. We'll review your
                                    application and reach out soon.
                                </p>
                                <a
                                    href={`tel:${BUSINESS_INFO.phone}`}
                                    className="inline-flex items-center gap-2 text-iron-900 font-display font-bold hover:text-amber-500 transition-colors"
                                >
                                    <PhoneIcon className="w-5 h-5" />
                                    Questions? Call {BUSINESS_INFO.phone}
                                </a>
                            </div>
                        ) : (
                            /* ── Form ── */
                            <div className="bg-white rounded-lg shadow-2xl shadow-black/10 border border-gray-200 p-8 md:p-12 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-amber-500" />

                                <div className="mb-10 text-center">
                                    <span className="text-amber-500 font-display font-bold uppercase tracking-widest text-xs mb-3 block">
                                        Apply Today
                                    </span>
                                    <h2 className="font-display text-3xl md:text-4xl font-bold text-iron-900 mb-4 uppercase">
                                        Submit Your Application
                                    </h2>
                                    <p className="text-lg text-gray-600 font-body normal-case">
                                        Fill out the form below and attach your resume. We'll be in touch shortly.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label htmlFor="career-firstName" className={labelClasses}>
                                                First Name <span className="text-amber-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="career-firstName"
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
                                            <label htmlFor="career-lastName" className={labelClasses}>
                                                Last Name <span className="text-amber-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="career-lastName"
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

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label htmlFor="career-phone" className={labelClasses}>
                                                Phone <span className="text-amber-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                id="career-phone"
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
                                            <label htmlFor="career-email" className={labelClasses}>
                                                Email <span className="text-amber-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="career-email"
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
                                        <label htmlFor="career-position" className={labelClasses}>
                                            Position <span className="text-amber-500">*</span>
                                        </label>
                                        <select
                                            id="career-position"
                                            name="position"
                                            required
                                            value={formData.position}
                                            onChange={handleChange}
                                            className={inputClasses}
                                        >
                                            {OPEN_POSITIONS.map((job) => (
                                                <option key={job.id} value={job.title}>
                                                    {job.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Resume Upload */}
                                    <div>
                                        <label htmlFor="career-resume" className={labelClasses}>
                                            Resume <span className="text-amber-500">*</span>
                                            <span className="text-gray-400 text-xs font-body normal-case ml-2">
                                                (PDF, DOC, DOCX — max 5 MB)
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                id="career-resume"
                                                name="resume"
                                                required
                                                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                onChange={handleFileChange}
                                                className="block w-full text-sm text-gray-600 font-body normal-case
                          file:mr-4 file:py-3 file:px-5 file:rounded-md file:border-2 file:border-gray-300
                          file:text-sm file:font-display file:font-bold file:uppercase file:tracking-wider
                          file:bg-iron-50 file:text-iron-900
                          hover:file:bg-amber-500/10 hover:file:border-amber-500 hover:file:text-amber-700
                          file:transition-all file:cursor-pointer cursor-pointer"
                                            />
                                            {resumeFile && (
                                                <p className="mt-2 text-sm text-green-600 font-body normal-case flex items-center gap-1.5">
                                                    <CheckCircleIcon className="w-4 h-4" />
                                                    {resumeFile.name} ({(resumeFile.size / 1024 / 1024).toFixed(1)} MB)
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Optional Message */}
                                    <div>
                                        <label htmlFor="career-message" className={labelClasses}>
                                            Additional Notes (Optional)
                                        </label>
                                        <textarea
                                            id="career-message"
                                            name="message"
                                            rows={4}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className={inputClasses}
                                            placeholder="Tell us about your experience, availability, etc."
                                        />
                                    </div>

                                    {/* Honeypot — invisible to real users, bots fill it in */}
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

                                    {/* Error */}
                                    {errorMsg && (
                                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm font-body normal-case">
                                            {errorMsg}
                                        </div>
                                    )}

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full font-display font-bold py-4 px-6 rounded-md uppercase tracking-widest transition-all text-sm
                      ${isSubmitting
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : 'bg-amber-500 hover:bg-amber-400 text-black hover:shadow-lg hover:shadow-amber-500/20 hover:-translate-y-0.5 active:translate-y-0'
                                            }`}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                    </button>

                                    <p className="text-center text-xs text-gray-400 pt-1 font-body normal-case">
                                        Your information is secure. We never share your data with third parties.
                                    </p>
                                </form>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* ══════════ CTA STRIP ══════════ */}
            <section className="bg-iron-900 py-16 relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 21px)`,
                    }}
                />
                <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-white uppercase mb-4">
                        Have Questions About a Position?
                    </h2>
                    <p className="text-gray-300 font-body normal-case text-lg mb-8">
                        Give us a call or send an email. We&apos;d love to hear from you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href={`tel:${BUSINESS_INFO.phone}`}
                            className="inline-flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 text-black font-display font-bold py-4 px-8 rounded-md uppercase tracking-widest text-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <PhoneIcon className="w-5 h-5" />
                            {BUSINESS_INFO.phone}
                        </a>
                        <a
                            href={`mailto:${BUSINESS_INFO.email}?subject=Careers%20Inquiry`}
                            className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white font-display font-bold py-4 px-8 rounded-md uppercase tracking-widest text-sm transition-all border border-white/20"
                        >
                            Email Us
                            <ArrowRightIcon className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </section>
        </div >
    );
};

export default Careers;
