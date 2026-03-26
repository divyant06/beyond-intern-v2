import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — Beyond Intern",
  description:
    "Read the full Terms of Use for Beyond Intern. These terms govern your access to and use of our website, services, programs, and related platforms.",
};

const SECTIONS = [
  {
    number: "1",
    title: "Eligibility & Account",
    content: `You must be 18 years or older (or have guardian consent) to use the Website. You agree to provide accurate, complete, and current information during registration or inquiry. You are responsible for maintaining the confidentiality of your account credentials and all activities under your account. You must notify us immediately of any unauthorized access or security breach. We may suspend, restrict, or terminate accounts that contain false information or violate these Terms.`,
  },
  {
    number: "2",
    title: "About Our Services",
    content: `Beyond Intern provides career and placement support services, including but not limited to: internship and job placement assistance, resume/CV and LinkedIn profile development, training, workshops, and mentoring, interview preparation and application support, employer connections and opportunity alerts, and career resources and guidance. We are not an employer. Use of the Website alone does not create an employment relationship or guarantee placement.`,
  },
  {
    number: "3",
    title: "Conditional Placement Guarantee",
    content: `Some programs may include a Conditional Placement Guarantee governed by a separate Program Agreement. Website browsing, inquiries, or free resources do not constitute enrollment and do not activate any guarantee. Placement outcomes depend on candidate performance and compliance, employer requirements and decisions, and program rules and guarantee conditions.`,
  },
  {
    number: "4",
    title: "User Conduct & Prohibited Use",
    content: `You agree to use the Website lawfully and professionally. You must NOT: provide false, misleading, or fraudulent information; upload forged or unauthorized documents; impersonate another person or entity; attempt hacking, data scraping, or unauthorized access; introduce malware, viruses, or harmful code; use the Website for illegal, abusive, defamatory, or unethical purposes; interfere with Website operation or security; post content that is offensive, discriminatory, or violates rights of others; or damage the reputation or brand of Beyond Intern. We may take action including content removal, account suspension, legal notice, and reporting to authorities.`,
  },
  {
    number: "5",
    title: "Content Submission & License",
    content: `You remain the owner of your personal content. By submitting User Content, you confirm it is accurate and truthful, you own it or have full legal rights to submit it, and it does not violate any law or third-party rights. You grant Beyond Intern a non-exclusive, worldwide, royalty-free, revocable limited licence to use, store, and process your content for service delivery, share your profile with partner employers for placement purposes, and use anonymised data for service improvement. This licence does not transfer ownership. User Content containing personal data will be processed in accordance with our Privacy Policy and applicable data protection laws, including UK GDPR and the Data Protection Act 2018.`,
  },
  {
    number: "6",
    title: "Fees, Payments & Billing",
    content: `All fees charged by Beyond Intern are solely for training, educational content, mentoring, skill development, and knowledge enhancement services. Fees are not charged for job or internship placement itself. By enrolling in a paid program, you agree to pay all applicable fees in full and on time, follow the agreed payment schedule, provide accurate billing details, and bear any applicable taxes, bank charges, or transaction fees. As fees relate to training and knowledge services, payments are generally non-refundable, except where required by applicable law or explicitly stated in writing. No refund shall be provided for: change of mind after enrolment; failure to attend or complete training; lack of participation or performance; rejection by employer or placement outcome; or personal circumstances or withdrawal.`,
  },
  {
    number: "7",
    title: "Intellectual Property",
    content: `All content on this Website—including logos, trademarks, training materials, videos, course content, and proprietary methods—is the exclusive property of Beyond Intern or its licensors. No ownership rights are transferred to you by accessing or using the Website. You may not copy, reproduce, distribute, sell, or commercially exploit any Company Content without prior written consent. "Beyond Intern", its logo, taglines, program names, and visual identity are registered or unregistered trademarks of the Company. Unauthorized use is strictly prohibited and may lead to legal action.`,
  },
  {
    number: "8",
    title: "Third-Party Links & Employers",
    content: `The Website may include links to third-party sites, employers, or partners for convenience. We do not control or endorse third-party content, policies, or actions. Beyond Intern is not responsible for employer decisions, workplace conditions, compensation, or disputes.`,
  },
  {
    number: "9",
    title: "Privacy & Data Protection",
    content: `Beyond Intern respects your privacy and is committed to protecting your personal data. We may collect personal identification data, educational and professional data, technical and usage data, and payment and transaction data. We process personal data to provide services, connect you with employers, process payments, and comply with legal obligations. We do not sell personal data. We may share limited information with partner employers for placement purposes, service providers, and legal authorities where required by law. We implement reasonable technical and organizational measures to protect your data. Subject to applicable law, you may have the right to access, correct, delete, or port your personal data. Contact us at Info@beyondintern.com for data-related requests.`,
  },
  {
    number: "10",
    title: "Availability & Changes",
    content: `We aim to keep the Website available, but do not guarantee uninterrupted or error-free access. We may modify, suspend, or discontinue any feature, content, or service at any time without prior notice. We may update these Terms; the "Last Updated" date will change. Continued use constitutes acceptance.`,
  },
  {
    number: "11",
    title: "Disclaimer of Warranties",
    content: `The Website, services, programs, and all content are made available on an "as is" and "as available" basis. Beyond Intern does not warrant or guarantee internship, job, or placement outcomes; selection by any employer; specific salary or employment terms; continuous Website availability; or that services will meet your individual expectations. All placement and employment decisions remain solely at the discretion of employers. Nothing in this section shall exclude or limit any non-excludable rights you may have under applicable UK law, including rights under the Consumer Rights Act 2015.`,
  },
  {
    number: "12",
    title: "Limitation of Liability",
    content: `To the fullest extent permitted by law, Beyond Intern shall not be liable for any indirect, incidental, or consequential damages; loss of opportunity, income, data, or reputation; employer or third-party actions; delays, technical failures, or force majeure events. Maximum aggregate liability (if any) is limited to the fees paid to us for the relevant service.`,
  },
  {
    number: "13",
    title: "Indemnification",
    content: `You agree to indemnify, defend, and hold harmless Beyond Intern, its directors, officers, employees, contractors, partners, and affiliates from and against any and all claims, damages, losses, liabilities, costs, and expenses arising out of or related to: your breach of these Terms; your misuse of the Website or Company Content; any false or unlawful information submitted by you; your violation of any applicable law or third-party rights; or any content you upload or share through the Website. This section shall survive termination of your use of the Website.`,
  },
  {
    number: "14",
    title: "Termination & Suspension",
    content: `We may suspend or terminate your access immediately if you violate these Terms, fraud or security risk is detected, payment default or chargeback occurs, or if required by law or authority. Termination may result in loss of access to certain services or data, subject to law.`,
  },
  {
    number: "15",
    title: "Force Majeure",
    content: `We are not responsible for failure or delay due to events beyond our control, including natural disasters, government actions, pandemic, internet or power failures, or third-party outages.`,
  },
  {
    number: "16",
    title: "Dispute Resolution",
    content: `If any dispute arises, the parties agree to first attempt to resolve the matter through good-faith negotiation within 14–30 days. Complaints should be sent to Info@beyondintern.com. If a dispute cannot be resolved through negotiation, the parties may consider ADR such as mediation with a recognised UK ADR provider. If unresolved, either party may initiate legal proceedings. Subject to applicable consumer rights, disputes shall fall under the exclusive jurisdiction of the courts of England and Wales. Any claim must be brought within 12 months from the date the cause of action arises, otherwise it may be barred.`,
  },
  {
    number: "17",
    title: "Governing Law",
    content: `These Terms shall be governed by and construed in accordance with the laws of England and Wales. You agree that the courts of England and Wales shall have exclusive jurisdiction to settle any dispute arising out of or relating to the use of the Website, services provided by Beyond Intern, or interpretation of these Terms. Nothing in these Terms shall limit or exclude any mandatory rights you may have under applicable UK consumer protection laws.`,
  },
  {
    number: "18",
    title: "Severability",
    content: `If any provision is held invalid or unenforceable, the remaining provisions shall remain in full force and effect.`,
  },
  {
    number: "19",
    title: "Entire Agreement",
    content: `These Terms, together with the Privacy Policy and any applicable Program Agreement, constitute the entire agreement between you and Beyond Intern regarding Website use.`,
  },
  {
    number: "20",
    title: "Contact",
    content: `Beyond Intern\nEmail: Info@beyondintern.com\nPhone: +44 7405 483573\nAddress: FF09-JTM Mall Jagatpura, Jaipur.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-navy">
        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 gradient-bg" />
          <div className="absolute top-20 left-1/3 h-80 w-80 rounded-full bg-electric/5 blur-[120px]" />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-electric/10 text-electric-light text-sm font-medium border border-electric/20 mb-5">
              Legal
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Terms of <span className="gradient-text">Use</span>
            </h1>
            <p className="mt-4 text-slate-400">
              Effective Date: <span className="text-white font-medium">11 February 2026</span>
              {" · "}Last Updated: <span className="text-white font-medium">11 February 2026</span>
            </p>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              Welcome to Beyond Intern. These Terms govern your access to and use of our website,
              services, programs, and related platforms. By using the Website, you agree to be
              legally bound by these Terms.
            </p>
          </div>
        </section>

        {/* Sections */}
        <div className="relative mx-auto max-w-3xl px-6 pb-28 space-y-8">
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-electric/20 to-transparent" />

          {SECTIONS.map((section) => (
            <div
              key={section.number}
              className="glass-card rounded-2xl p-7 hover:-translate-y-0.5 transition-transform duration-300"
            >
              <h2 className="flex items-center gap-3 text-lg font-bold text-white mb-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg gradient-electric text-xs font-bold text-white shrink-0">
                  {section.number}
                </span>
                {section.title}
              </h2>
              <div className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))}

          {/* Disclaimer footer */}
          <div className="glass rounded-2xl p-6 border border-electric/10 text-center">
            <p className="text-xs text-slate-400 leading-relaxed">
              By continuing to use Beyond Intern, you acknowledge that you have read, understood,
              and agree to be bound by these Terms of Use.
            </p>
            <p className="text-xs text-slate-500 mt-2">
              For questions: <a href="mailto:Info@beyondintern.com" className="text-electric-light hover:underline">Info@beyondintern.com</a>
              {" · "}+44 7405 483573
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
