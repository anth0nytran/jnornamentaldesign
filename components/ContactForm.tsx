import React, { useState } from 'react';
import { BUSINESS_INFO, SERVICE_CATEGORIES } from '../constants';
import { PhoneIcon, CheckCircleIcon, StarIcon, GoogleIcon } from './Icons';

interface ContactFormProps {
  variant?: 'default' | 'compact' | 'hero';
  title?: string;
  subtitle?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  variant = 'default',
  title = 'Get Your Free Quote',
  subtitle = 'Fill out the form and we\'ll get back to you within 24 hours.',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircleIcon className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-display font-bold text-navy-900 mb-3">
          Thank You!
        </h3>
        <p className="text-navy-600 max-w-md mx-auto mb-6">
          We've received your request and will contact you within 24 hours.
        </p>
        <a
          href={`tel:${BUSINESS_INFO.phone}`}
          className="inline-flex items-center gap-2 text-navy-700 font-semibold hover:text-amber-600 transition-colors"
        >
          <PhoneIcon className="w-5 h-5" />
          Need faster? Call {BUSINESS_INFO.phone}
        </a>
      </div>
    );
  }

  const inputClasses = `w-full bg-white border-2 border-navy-200 px-4 py-3 text-navy-900
    placeholder:text-navy-400 focus:border-amber-500 focus:outline-none transition-colors`;

  const labelClasses = 'block text-sm font-semibold text-navy-700 mb-2';

  return (
    <div>
      {variant !== 'hero' && (
        <div className="mb-8">
          <h3 className="text-2xl font-display font-bold text-navy-900 mb-2">
            {title}
          </h3>
          <p className="text-navy-600">{subtitle}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className={labelClasses}>
              Full Name <span className="text-amber-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className={inputClasses}
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClasses}>
              Phone <span className="text-amber-600">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className={inputClasses}
              placeholder="(281) 555-0123"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className={labelClasses}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label htmlFor="service" className={labelClasses}>
              Service <span className="text-amber-600">*</span>
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
        </div>

        <div>
          <label htmlFor="message" className={labelClasses}>
            Project Details
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

        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold py-4 px-6 transition-colors"
        >
          Request Free Estimate
        </button>

        {/* Stats under button */}
        <div className="flex items-center justify-center gap-6 pt-2">
          <div className="flex items-center gap-2">
            <GoogleIcon className="w-5 h-5" />
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-3.5 h-3.5" filled />
              ))}
            </div>
            <span className="text-sm font-bold text-navy-800">{BUSINESS_INFO.rating}</span>
          </div>
          <div className="h-4 w-px bg-navy-200"></div>
          <div className="text-sm text-navy-600">
            <span className="font-bold text-navy-800">1,500+</span> Projects Done
          </div>
        </div>

        <p className="text-center text-xs text-navy-400 pt-1">
          Your information is secure. We never share your data.
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
