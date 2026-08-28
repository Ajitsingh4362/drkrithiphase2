import React from 'react'
import LegalPageLayout, { LegalSection } from '../components/LegalPageLayout'

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout
      tag="Legal"
      title="Privacy Policy"
      subtitle="Your privacy matters to us. This policy explains what information we collect and how we use it."
      updated="28 August 2026"
    >
      <LegalSection>
        <p>
          Mind Motion Matrix ("we", "us", "our") is committed to protecting the privacy of visitors
          to our website mindmotionmatrix.com ("Website") and our patients. This Privacy Policy
          explains how we collect, use, store and protect your personal information.
        </p>
      </LegalSection>

      <LegalSection heading="1. Information We Collect">
        <p>We may collect the following categories of information:</p>
        <ul style={{ margin: '10px 0 0 20px', lineHeight: 1.9 }}>
          <li>Contact details such as name, phone number, email address and location.</li>
          <li>Appointment and consultation details, including preferred date/time and health concern shared while booking.</li>
          <li>Health-related information you voluntarily share during consultations, required for diagnosis and treatment.</li>
          <li>Payment-related information (transaction ID, amount, payment status) processed via our payment gateway partner, Razorpay. We do not collect or store your full card, UPI PIN or net-banking credentials.</li>
          <li>Technical data such as browser type, device information and pages visited, collected automatically for improving the Website.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="2. How We Use Your Information">
        <ul style={{ margin: '10px 0 0 20px', lineHeight: 1.9 }}>
          <li>To schedule and manage your appointments and consultations.</li>
          <li>To provide clinical care, follow-ups and program support.</li>
          <li>To process payments and share payment confirmations/receipts.</li>
          <li>To respond to your enquiries and send appointment reminders via call, SMS or WhatsApp.</li>
          <li>To improve our Website, services and patient experience.</li>
          <li>To comply with applicable legal and regulatory requirements.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="3. Payment Information">
        <p>
          All online payments on our Website are processed through Razorpay, a secure, PCI-DSS
          compliant payment gateway. When you make a payment, your card/UPI/banking details are
          collected and processed directly by Razorpay and are not stored on our servers. We only
          receive confirmation of the transaction status (success/failure) and a reference ID.
        </p>
      </LegalSection>

      <LegalSection heading="4. Confidentiality of Health Information">
        <p>
          Any medical or health-related information you share with us is treated as strictly
          confidential and is used solely for the purpose of providing you clinical care. It is
          accessed only by the treating doctor and authorised clinic staff, and is not shared with
          any third party without your consent, except where required by law.
        </p>
      </LegalSection>

      <LegalSection heading="5. Sharing of Information">
        <p>We do not sell or rent your personal information. We may share limited information with:</p>
        <ul style={{ margin: '10px 0 0 20px', lineHeight: 1.9 }}>
          <li>Trusted service providers who help us operate the Website, process payments (Razorpay) or send communications (e.g., WhatsApp, email/SMS providers).</li>
          <li>Government or regulatory authorities, where required by applicable law.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="6. Cookies">
        <p>
          Our Website may use cookies and similar technologies to improve browsing experience and
          understand how visitors use the site. You can control or disable cookies through your
          browser settings; however, some features of the Website may not function properly if
          cookies are disabled.
        </p>
      </LegalSection>

      <LegalSection heading="7. Data Security">
        <p>
          We take reasonable administrative and technical measures to protect your personal
          information from unauthorised access, loss or misuse. However, no method of transmission
          over the internet is completely secure, and we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection heading="8. Data Retention">
        <p>
          We retain your personal and health information for as long as necessary to provide
          ongoing care, comply with legal obligations, and maintain accurate clinical records, after
          which it is securely deleted or anonymised.
        </p>
      </LegalSection>

      <LegalSection heading="9. Your Rights">
        <p>
          You may request access to, correction of, or deletion of your personal information held by
          us, subject to our clinical record-keeping obligations, by contacting us using the details
          below.
        </p>
      </LegalSection>

      <LegalSection heading="10. Children's Privacy">
        <p>
          Where consultations involve a minor, information is provided and consented to by a parent
          or legal guardian on the minor's behalf.
        </p>
      </LegalSection>

      <LegalSection heading="11. Changes to This Policy">
        <p>
          We may revise this Privacy Policy periodically. Any changes will be posted on this page
          with an updated "Last updated" date.
        </p>
      </LegalSection>

      <LegalSection heading="12. Contact Us">
        <p>
          For any privacy-related questions or requests, please contact us at{' '}
          <a href="mailto:contact@mindmotionmatrix.com" style={{ color: 'var(--teal)', fontWeight: 600 }}>contact@mindmotionmatrix.com</a>{' '}
          or <a href="tel:+919019372125" style={{ color: 'var(--teal)', fontWeight: 600 }}>+91 90193 72125</a>,
          or write to us at # 4, Sri Muthyalamma Devi Street K, Seppings Road Cross, Bangalore – 560001.
        </p>
      </LegalSection>
    </LegalPageLayout>
  )
}
