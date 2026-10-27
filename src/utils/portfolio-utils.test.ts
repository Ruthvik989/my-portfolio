import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateContactForm,
  buildMailtoUrl,
  getNextRoleIndex,
  computeTypingStep,
  getCertificateActionStatus,
} from './portfolio-utils.ts';

test('validateContactForm checks required fields and formats', () => {
  // Empty form
  const emptyRes = validateContactForm({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  assert.equal(emptyRes.isValid, false);
  assert.ok(emptyRes.errors.name);
  assert.ok(emptyRes.errors.email);
  assert.ok(emptyRes.errors.subject);
  assert.ok(emptyRes.errors.message);

  // Invalid email and short message
  const invalidRes = validateContactForm({
    name: 'Ruthvik',
    email: 'not-an-email',
    subject: 'Hi',
    message: 'short',
  });
  assert.equal(invalidRes.isValid, false);
  assert.ok(invalidRes.errors.email?.includes('valid email'));
  assert.ok(invalidRes.errors.subject?.includes('at least 3'));
  assert.ok(invalidRes.errors.message?.includes('at least 10'));

  // Valid form
  const validRes = validateContactForm({
    name: 'Jane Recruiter',
    email: 'recruiter@techcorp.com',
    subject: 'Opportunity: Cybersecurity Analyst role',
    message: 'We were impressed by your cyber risk assessment project architecture and would like to connect.',
  });
  assert.equal(validRes.isValid, true);
  assert.deepEqual(validRes.errors, {});
});

test('buildMailtoUrl encodes parameters cleanly', () => {
  const url = buildMailtoUrl('ravillaruthvik0@gmail.com', {
    name: 'Jane & John Doe',
    email: 'jane@example.com',
    subject: 'Discussion: Security & Software',
    message: 'Hello Ruthvik,\nLet\'s talk about your projects & credentials.',
  });

  assert.ok(url.startsWith('mailto:ravillaruthvik0@gmail.com?'));
  assert.ok(url.includes('subject=%5BPortfolio%20Contact%5D%20Discussion%3A%20Security%20%26%20Software'));
  assert.ok(url.includes('body=Name%3A%20Jane%20%26%20John%20Doe'));
});

test('getNextRoleIndex cycles correctly', () => {
  assert.equal(getNextRoleIndex(0, 3), 1);
  assert.equal(getNextRoleIndex(1, 3), 2);
  assert.equal(getNextRoleIndex(2, 3), 0);
  assert.equal(getNextRoleIndex(0, 0), 0);
});

test('computeTypingStep handles forward typing and deletion', () => {
  // Typing
  const step1 = computeTypingStep('', 'Cybersecurity Analyst', false);
  assert.equal(step1.nextText, 'C');
  assert.equal(step1.isComplete, false);

  const stepEnd = computeTypingStep('Cybersecurity Analys', 'Cybersecurity Analyst', false);
  assert.equal(stepEnd.nextText, 'Cybersecurity Analyst');
  assert.equal(stepEnd.isComplete, true);

  // Deleting
  const del1 = computeTypingStep('Cyber', 'Cybersecurity Analyst', true);
  assert.equal(del1.nextText, 'Cybe');
  assert.equal(del1.isComplete, false);

  const delEnd = computeTypingStep('C', 'Cybersecurity Analyst', true);
  assert.equal(delEnd.nextText, '');
  assert.equal(delEnd.isComplete, true);
});

test('getCertificateActionStatus correctly flags Credly and PDF availability', () => {
  // IBM with Credly badge but no local PDF yet
  const ibm = getCertificateActionStatus({
    id: 'ibm-fundamentals',
    title: 'Cybersecurity Fundamentals',
    issuer: 'IBM SkillsBuild',
    date: 'January 3, 2026',
    credlyUrl: 'https://www.credly.com/badges/69fa1ed2-ca93-4c92-9b7a-6fa1b94d317a',
    hasPdfUploaded: false,
  });
  assert.equal(ibm.canVerifyOnline, true);
  assert.equal(ibm.canViewPdf, false);
  assert.equal(ibm.statusLabel, 'Verified on Credly');

  // LinkedIn course completed without local PDF uploaded yet
  const linkedin = getCertificateActionStatus({
    id: 'iam',
    title: 'Introduction to Identity and Access Management',
    issuer: 'LinkedIn Learning',
    date: 'October 17, 2026',
    hasPdfUploaded: false,
  });
  assert.equal(linkedin.canVerifyOnline, false);
  assert.equal(linkedin.canViewPdf, false);
  assert.equal(linkedin.statusLabel, 'Course Completed (PDF pending upload)');

  // Certificate with PDF available
  const withPdf = getCertificateActionStatus({
    id: 'iam-uploaded',
    title: 'Introduction to Identity and Access Management',
    issuer: 'LinkedIn Learning',
    date: 'October 17, 2026',
    pdfPath: 'assets/certificates/Introduction-to-Identity-and-Access-Management.pdf',
    hasPdfUploaded: true,
  });
  assert.equal(withPdf.canViewPdf, true);
  assert.equal(withPdf.statusLabel, 'Certificate PDF Available');
});
