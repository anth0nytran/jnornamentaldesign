const NAME_PATTERN = /^[A-Za-z][A-Za-z' -]{1,49}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const normalizeText = (value: unknown): string =>
  typeof value === 'string' ? value.trim() : '';

export const sanitizeNameInput = (value: string): string =>
  value.replace(/[^A-Za-z' -]/g, '').slice(0, 50);

export const normalizeName = (value: string): string =>
  sanitizeNameInput(value).replace(/\s+/g, ' ').trim();

export const splitFullName = (fullName: string): { firstName: string; lastName: string } => {
  const normalized = normalizeName(fullName);
  if (!normalized) {
    return { firstName: '', lastName: '' };
  }

  const parts = normalized.split(' ');
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '' };
  }

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  };
};

export const buildFullName = (firstName: string, lastName: string): string =>
  `${normalizeName(firstName)} ${normalizeName(lastName)}`.replace(/\s+/g, ' ').trim();

export const isValidName = (value: string): boolean => NAME_PATTERN.test(normalizeName(value));

export const normalizePhoneDigits = (value: string): string => value.replace(/\D/g, '').slice(0, 10);

export const formatPhoneInput = (value: string): string => {
  const digits = normalizePhoneDigits(value);

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

export const isValidPhone = (value: string): boolean => normalizePhoneDigits(value).length === 10;

export const normalizeEmail = (value: string): string => value.trim().toLowerCase();

export const isValidEmail = (value: string): boolean => EMAIL_PATTERN.test(normalizeEmail(value));
