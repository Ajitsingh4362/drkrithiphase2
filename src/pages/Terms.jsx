import React from 'react'
import { Link } from 'react-router-dom'
import LegalPageLayout, { LegalSection } from '../components/LegalPageLayout'

export default function Terms() {
  return (
    <LegalPageLayout
      tag="Legal"
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before using our website or booking a consultation with Mind Motion Matrix."
      updated="28 August 2026"
    >
      <LegalSection>
        <p>
          These Terms & Conditions ("Terms") govern your use of the website mindmotionmatrix.com
          ("Website") and the services offered by Mind Motion Matrix, operated under the care of
          Dr. Kirthi Kakade ("we", "us", "our", "Clinic"). By accessing the Website, booking a
          consultation, or enrolling in any program, you agree to be bound by these Terms. If you
          do not agree with any part of these Terms, please do not use the Website or our services.
        </p>
      </LegalSection>

      <LegalSection heading="1. About Our Services">
        <p>
          Mind Motion Matrix offers homeopathic consultations, mind-body wellness programs,
          counselling and psychotherapy support, and related integrative healthcare services,
          delivered in-clinic (Bangalore) and, where applicable, online. Program details, duration,
          inclusions and fees are listed on our Programs page and may be updated from time to time.
        </p>
      </LegalSection>

      <LegalSection heading="2. Appointments & Consultations">
        <p>
          Appointments can be booked through the Website, WhatsApp, or phone. We make reasonable
          efforts to honour the requested date and time, but appointments are subject to the
          doctor's availability and may need to be rescheduled with prior notice. Please arrive on
          time; late arrivals may result in a shortened consultation or rescheduling.
        </p>
      </LegalSection>

      <LegalSection heading="3. Not a Substitute for Emergency Care">
        <p>
          Our services are intended for supportive, integrative and complementary care. They are
          not a substitute for emergency medical treatment. In case of a medical emergency, please
          contact your nearest hospital or emergency services immediately.
        </p>
      </LegalSection>

      <LegalSection heading="4. Fees & Payments">
        <p>
          Consultation and program fees are as communicated at the time of booking or enrolment.
          Payments can be made online (via our secure Razorpay payment gateway) or at the clinic.
          All fees are quoted in Indian Rupees (INR) and are inclusive of applicable taxes unless
          stated otherwise. A payment confirmation will be shared with you upon successful
          transaction.
        </p>
      </LegalSection>

      <LegalSection heading="5. Online Payments">
        <p>
          Online payments made through the Website are processed via Razorpay, a PCI-DSS compliant
          third-party payment gateway. We do not store your card, UPI or banking credentials on our
          servers. Please refer to Razorpay's own terms and privacy policy for information about how
          your payment data is handled during the transaction.
        </p>
      </LegalSection>

      <LegalSection heading="6. Refunds & Cancellations">
        <p>
          Our Refund & Cancellation Policy governs how cancellations, rescheduling and refund
          requests are handled. Please refer to the{' '}
          <Link to="/refund-policy" style={{ color: 'var(--teal)', fontWeight: 600 }}>Refund & Cancellation Policy</Link>{' '}
          page for complete details.
        </p>
      </LegalSection>

      <LegalSection heading="7. Patient Responsibilities">
        <p>
          You agree to provide accurate and complete information about your health history and
          current condition, to follow the guidance provided during consultations, and to inform us
          promptly of any change in your condition. Results and outcomes of any treatment or program
          vary from person to person and are not guaranteed.
        </p>
      </LegalSection>

      <LegalSection heading="8. Intellectual Property">
        <p>
          All content on this Website, including text, graphics, logos, images and program
          material, is the property of Mind Motion Matrix / Dr. Kirthi Kakade and is protected by
          applicable intellectual property laws. You may not reproduce, distribute or use this
          content for commercial purposes without our prior written consent.
        </p>
      </LegalSection>

      <LegalSection heading="9. Limitation of Liability">
        <p>
          To the extent permitted by law, Mind Motion Matrix shall not be liable for any indirect,
          incidental or consequential damages arising out of your use of the Website or our
          services, save for any liability that cannot be excluded under applicable law.
        </p>
      </LegalSection>

      <LegalSection heading="10. Changes to These Terms">
        <p>
          We may update these Terms from time to time to reflect changes in our services or legal
          requirements. The updated version will be posted on this page with a revised "Last
          updated" date. Continued use of the Website after changes are posted constitutes
          acceptance of the revised Terms.
        </p>
      </LegalSection>

      <LegalSection heading="11. Governing Law">
        <p>
          These Terms are governed by the laws of India, and any disputes arising from them shall be
          subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka.
        </p>
      </LegalSection>

      <LegalSection heading="12. Contact Us">
        <p>
          For any questions regarding these Terms, please reach out to us at{' '}
          <a href="mailto:contact@mindmotionmatrix.com" style={{ color: 'var(--teal)', fontWeight: 600 }}>contact@mindmotionmatrix.com</a>{' '}
          or call/WhatsApp us at <a href="tel:+919019372125" style={{ color: 'var(--teal)', fontWeight: 600 }}>+91 90193 72125</a>.
        </p>
      </LegalSection>
    </LegalPageLayout>
  )
}
