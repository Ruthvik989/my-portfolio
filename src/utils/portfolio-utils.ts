/**
 * Pure utility functions for Ravilla Ruthvik's Portfolio.
 * Decoupled from DOM for fast, deterministic unit testing.
 */

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };
}

/**
 * Validates the contact form inputs client-side with accessible error messages.
 */
export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: ValidationResult['errors'] = {};

  const trimmedName = data.name ? data.name.trim() : '';
  const trimmedEmail = data.email ? data.email.trim() : '';
  const trimmedSubject = data.subject ? data.subject.trim() : '';
  const trimmedMessage = data.message ? data.message.trim() : '';

  if (!trimmedName) {
    errors.name = 'Please enter your name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address (e.g., name@example.com).';
  }

  if (!trimmedSubject) {
    errors.subject = 'Please enter a subject.';
  } else if (trimmedSubject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters.';
  }

  if (!trimmedMessage) {
    errors.message = 'Please enter your message.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Message must be at least 10 characters so I have enough context.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Builds an RFC 6068 compliant mailto URL with properly escaped query parameters.
 */
export function buildMailtoUrl(
  recipient: string,
  data: ContactFormData
): string {
  const cleanRecipient = recipient.trim();
  const subject = `[Portfolio Contact] ${data.subject.trim()}`;
  const body = `Name: ${data.name.trim()}\nEmail: ${data.email.trim()}\n\nMessage:\n${data.message.trim()}`;

  const queryParams = [
    `subject=${encodeURIComponent(subject)}`,
    `body=${encodeURIComponent(body)}`,
  ];

  return `mailto:${cleanRecipient}?${queryParams.join('&')}`;
}

/**
 * Pure transition helper for cycling roles in the typing animation.
 */
export function getNextRoleIndex(currentIndex: number, totalRoles: number): number {
  if (totalRoles <= 0) return 0;
  return (currentIndex + 1) % totalRoles;
}

/**
 * Determines typing animation substring progression.
 */
export function computeTypingStep(
  currentText: string,
  targetWord: string,
  isDeleting: boolean
): { nextText: string; isComplete: boolean } {
  if (isDeleting) {
    const nextText = currentText.slice(0, -1);
    return {
      nextText,
      isComplete: nextText.length === 0,
    };
  } else {
    const nextText = targetWord.slice(0, currentText.length + 1);
    return {
      nextText,
      isComplete: nextText === targetWord,
    };
  }
}

/**
 * Certificate status helper.
 */
export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credlyUrl?: string;
  pdfPath?: string;
  hasPdfUploaded: boolean;
}

export function getCertificateActionStatus(cert: CertificateItem): {
  canVerifyOnline: boolean;
  canViewPdf: boolean;
  statusLabel: string;
} {
  const canVerifyOnline = Boolean(cert.credlyUrl && cert.credlyUrl.startsWith('https://www.credly.com/'));
  const canViewPdf = cert.hasPdfUploaded && Boolean(cert.pdfPath);

  let statusLabel = 'Verified Credential';
  if (!cert.hasPdfUploaded && !canVerifyOnline) {
    statusLabel = 'Course Completed (PDF pending upload)';
  } else if (!cert.hasPdfUploaded && canVerifyOnline) {
    statusLabel = 'Verified on Credly';
  } else if (canViewPdf && canVerifyOnline) {
    statusLabel = 'Verified Credly & PDF Available';
  } else if (canViewPdf) {
    statusLabel = 'Certificate PDF Available';
  }

  return {
    canVerifyOnline,
    canViewPdf,
    statusLabel,
  };
}
