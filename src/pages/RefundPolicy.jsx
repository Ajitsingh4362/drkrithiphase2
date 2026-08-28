import React from 'react'
import LegalPageLayout, { LegalSection } from '../components/LegalPageLayout'

export default function RefundPolicy() {
  return (
    <LegalPageLayout
      tag="Legal"
      title="Refund & Cancellation Policy"
      subtitle="Our approach to appointment cancellations, rescheduling and refunds for consultations and programs."
      updated="28 August 2026"
    >
      <LegalSection>
        <p>
          At Mind Motion Matrix, we aim to keep our cancellation and refund process fair and
          transparent for every patient. This policy applies to consultations and program fees paid
          online through our Website (via Razorpay) or at the clinic.
        </p>
      </LegalSection>

      <LegalSection heading="1. Consultation Booking Cancellations">
        <ul style={{ margin: '10px 0 0 20px', lineHeight: 1.9 }}>
          <li>Appointments cancelled or rescheduled at least 24 hours before the scheduled time are eligible for a full refund or a free reschedule, at your preference.</li>
          <li>Cancellations made less than 24 hours before the appointment, or "no-shows", are not eligible for a refund but may be offered a one-time rescheduling at our discretion.</li>
          <li>To cancel or reschedule, please contact us via WhatsApp/phone at +91 90193 72125 or email contact@mindmotionmatrix.com as early as possible.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="2. Program Enrolment Cancellations">
        <p>
          For long-duration programs (e.g., the Fertility Revival, Cancer Recovery, or Chronic
          Illness Reversal programs):
        </p>
        <ul style={{ margin: '10px 0 0 20px', lineHeight: 1.9 }}>
          <li>If a cancellation request is made within 7 days of enrolment and before the first consultation/session has taken place, the full amount paid will be refunded after deducting any payment gateway charges.</li>
          <li>If cancellation is requested after the first consultation or session has been availed, fees already utilised towards consultations, medicines dispensed and services rendered will be deducted, and the balance (if any) will be refunded.</li>
          <li>No refund is applicable once a program has been substantially availed or completed.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="3. Medicines & Physical Materials">
        <p>
          Homeopathic medicines and any physical materials once dispensed cannot be returned or
          refunded, in line with standard pharmaceutical and health/safety practice.
        </p>
      </LegalSection>

      <LegalSection heading="4. Duplicate or Failed Payments">
        <p>
          If you have been charged more than once for the same booking/program due to a technical
          error, or if an amount was debited from your account but the booking/enrolment was not
          confirmed, please share your payment reference ID with us. Verified duplicate or failed
          transactions will be refunded to the original payment method within 7–10 business days.
        </p>
      </LegalSection>

      <LegalSection heading="5. How Refunds Are Processed">
        <p>
          Approved refunds are processed back to the original mode of payment through our payment
          gateway partner, Razorpay. Depending on your bank or payment provider, refunds typically
          reflect in your account within 5–10 business days from the date of approval.
        </p>
      </LegalSection>

      <LegalSection heading="6. Rescheduling Instead of Cancellation">
        <p>
          If you are unable to attend a scheduled consultation, we encourage you to reschedule
          rather than cancel wherever possible, so your care can continue without disruption. There
          is no additional charge for rescheduling when requested with reasonable notice.
        </p>
      </LegalSection>

      <LegalSection heading="7. How to Request a Refund or Cancellation">
        <p>
          Please write to us at{' '}
          <a href="mailto:contact@mindmotionmatrix.com" style={{ color: 'var(--teal)', fontWeight: 600 }}>contact@mindmotionmatrix.com</a>{' '}
          or message us on WhatsApp at{' '}
          <a href="https://wa.me/919019372125" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--teal)', fontWeight: 600 }}>+91 90193 72125</a>{' '}
          with your name, payment reference/transaction ID, and reason for the request. We aim to
          respond to all refund and cancellation requests within 2–3 business days.
        </p>
      </LegalSection>

      <LegalSection heading="8. Changes to This Policy">
        <p>
          We may update this Refund & Cancellation Policy from time to time. The revised version
          will be posted on this page with an updated "Last updated" date.
        </p>
      </LegalSection>
    </LegalPageLayout>
  )
}
