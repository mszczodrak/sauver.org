import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Protocol | SAUVER',
  description: 'How Sauver handles your data. No slop, no surveillance, no selling.',
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar activeSection="" />
      <main className="section-container" style={{ paddingTop: '120px', maxWidth: '800px' }}>
        <article>
          <div className="doc-section">
            <div className="doc-section-label">LEGAL</div>
            <h1 className="doc-h2">PRIVACY PROTOCOL <span>[v1.0]</span></h1>
            <p className="doc-p"><strong>Last Updated: March 27, 2026</strong></p>
          </div>

          <hr className="doc-divider" />

          <div className="doc-section">
            <h2 className="doc-h3">1. Data Collection</h2>
            <p className="doc-p">
              We only collect what is strictly necessary to run the Resistance:
            </p>
            <ul className="doc-p" style={{ paddingLeft: '1.5rem', lineHeight: '1.9' }}>
              <li><strong>Identification:</strong> Your email address, provided voluntarily for the waitlist.</li>
              <li><strong>Security:</strong> Device and browser metadata processed via Firebase App Check to prevent bot-flooding.</li>
              <li><strong>Communication:</strong> Timestamps and source tags for waitlist attribution.</li>
            </ul>
          </div>

          <hr className="doc-divider" />

          <div className="doc-section">
            <h2 className="doc-h3">2. Service Providers</h2>
            <p className="doc-p">
              We use <strong>Google Firebase</strong> (Infrastructure) and <strong>Cloud Firestore</strong> (Database).
              Your data is stored on Google&apos;s secure servers. We do not sell, rent, or trade your data to
              third-party slop-merchants.
            </p>
          </div>

          <hr className="doc-divider" />

          <div className="doc-section">
            <h2 className="doc-h3">3. AI &amp; Automated Decision Making (ADMT)</h2>
            <p className="doc-p">
              Sauver is an AI-driven tool. While the landing page only collects emails, the Sauver Engine
              (when deployed) uses LLMs to analyze email headers and content for slop classification.
            </p>
            <p className="doc-p">
              We honor <strong>Global Privacy Control (GPC)</strong> signals and comply with California&apos;s
              2026 ADMT transparency requirements. We do not sell your data, and we do not use it to train
              third-party models.
            </p>
          </div>

          <hr className="doc-divider" />

          <div className="doc-section">
            <h2 className="doc-h3">4. Analytics</h2>
            <p className="doc-p">
              We use Firebase Analytics to understand aggregate usage patterns (page views, feature adoption).
              No personally identifiable information is shared with advertisers. You can block analytics by
              enabling your browser&apos;s Do Not Track or GPC signal.
            </p>
          </div>

          <hr className="doc-divider" />

          <div className="doc-section">
            <h2 className="doc-h3">5. Data Retention</h2>
            <p className="doc-p">
              Waitlist emails are retained until the product launches or you request removal. Security metadata
              processed by App Check is ephemeral and not stored.
            </p>
          </div>

          <hr className="doc-divider" />

          <div className="doc-section">
            <h2 className="doc-h3">6. Your Rights</h2>
            <p className="doc-p">
              You can request to be removed from the waitlist, access your stored data, or ask us to delete
              everything at any time by contacting <strong>legal@sauver.org</strong>.
            </p>
            <p className="doc-p">
              If you are a California resident, you have additional rights under CCPA/CPRA including the right
              to know, delete, correct, and opt-out of the sale or sharing of personal information. We do not
              sell or share your personal information.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
