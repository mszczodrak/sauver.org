import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms of Engagement | SAUVER',
  description: 'Terms of service for the Sauver anti AI-slop platform.',
};

export default function TermsPage() {
  return (
    <>
      <Navbar activeSection="" />
      <main className="section-container" style={{ paddingTop: '120px', maxWidth: '800px' }}>
        <article>
          <div className="doc-section">
            <div className="doc-section-label">LEGAL</div>
            <h1 className="doc-h2">TERMS OF ENGAGEMENT <span>[v1.0]</span></h1>
            <p className="doc-p"><strong>Last Updated: March 27, 2026</strong></p>
          </div>

          <hr className="doc-divider" />

          <div className="doc-section">
            <h2 className="doc-h3">1. Alpha Status</h2>
            <p className="doc-p">
              Sauver is currently in <strong>Alpha/Development</strong> phase. By using this site or joining
              the waitlist, you acknowledge that the software is provided &quot;AS-IS&quot; without warranties
              of any kind, express or implied.
            </p>
          </div>

          <hr className="doc-divider" />

          <div className="doc-section">
            <h2 className="doc-h3">2. Limitation of Liability</h2>
            <p className="doc-p">
              Sauver Organization is not liable for any misclassified emails, lost data, or inbox disruptions
              during the testing phase. You use this tool at your own risk. In no event shall our total
              liability exceed the amount you paid for the service, which is zero.
            </p>
          </div>

          <hr className="doc-divider" />

          <div className="doc-section">
            <h2 className="doc-h3">3. Acceptable Use</h2>
            <p className="doc-p">
              You agree not to use Sauver to:
            </p>
            <ul className="doc-p" style={{ paddingLeft: '1.5rem', lineHeight: '1.9' }}>
              <li>Reverse-engineer, decompile, or extract the trap-generation logic for competing products.</li>
              <li>Perform automated load testing or denial-of-service attacks against our infrastructure.</li>
              <li>Submit false or misleading data to our waitlist or reporting systems.</li>
              <li>Use the service to harass individuals rather than respond to unsolicited automated outreach.</li>
            </ul>
          </div>

          <hr className="doc-divider" />

          <div className="doc-section">
            <h2 className="doc-h3">4. Intellectual Property</h2>
            <p className="doc-p">
              Sauver is open-source software released under the <strong>MIT License</strong>. The source code
              is freely available. The Sauver name, logo, and brand identity remain the property of Sauver
              Organization.
            </p>
          </div>

          <hr className="doc-divider" />

          <div className="doc-section">
            <h2 className="doc-h3">5. Termination</h2>
            <p className="doc-p">
              We reserve the right to revoke access to any user attempting to bypass our bot-detection,
              spam our infrastructure, or violate these terms. You may stop using Sauver at any time by
              uninstalling the tool and requesting waitlist removal.
            </p>
          </div>

          <hr className="doc-divider" />

          <div className="doc-section">
            <h2 className="doc-h3">6. Changes</h2>
            <p className="doc-p">
              We may update these terms as Sauver evolves. Material changes will be communicated via the
              waitlist email. Continued use after changes constitutes acceptance.
            </p>
          </div>

          <hr className="doc-divider" />

          <div className="doc-section">
            <h2 className="doc-h3">7. Contact</h2>
            <p className="doc-p">
              Questions about these terms? Reach us at <strong>legal@sauver.org</strong>.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
