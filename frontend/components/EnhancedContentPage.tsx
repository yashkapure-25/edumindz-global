'use client';
import {
  FileCheck2,
  Wallet,
  Home,
  ShieldCheck,
} from 'lucide-react';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, CheckCircle2, GraduationCap, Globe2, BookOpen,
  Plane, MessageCircle, Compass, ClipboardList, Languages, BriefcaseBusiness, Building2,
} from 'lucide-react';

const pageContent = {
  'about-us': {
    title: 'Education and career assistance since 2011.',
    eyebrow: 'ABOUT EDUMINDZ',
    intro: 'A renowned institution for education and career assistance, headquartered in Navi Mumbai.',
    lead: 'EduMindz is a renowned institution for education and career assistance, founded in 2011 with its headquarters in Navi Mumbai.',
    paragraphs: [
      'We help secondary and high school students preparing for and succeeding in competitive exams like the NEET, IIT-JEE, and the Math and Science Olympiads.',
      'More than 1000 candidates for the IIT-JEE, NEET, and CET have been taught and prepared by Edumindz.',
      'Aspirants who want to study abroad can also benefit from our comprehensive consultation and counselling services in countries including the United States, the United Kingdom, Central Europe, Scandinavia, Singapore, Canada, Australia, and New Zealand.',
    ],
    cards: [
      { icon: GraduationCap, title: 'Education guidance', text: 'Explore courses, destinations and study pathways that match your goals.' },
      { icon: BookOpen, title: 'Academic coaching', text: 'Find information about school-level coaching and competitive exam preparation.' },
      { icon: BriefcaseBusiness, title: 'Career development', text: 'Explore career guidance, professional skills and employment assistance.' },
      { icon: Globe2, title: 'Student support', text: 'Get guidance on applications and practical steps connected with studying abroad.' },
    ],
    highlights: ['Overseas education counselling', 'Academic and competitive exam coaching', 'English test preparation', 'Career counselling and employment assistance', 'Corporate and professional training', 'Visa, travel and student support'],
    cta: 'Talk to the EduMindz team',
  },
  'study-abroad': {
    title: 'Make your study abroad plans with clarity.',
    eyebrow: 'STUDY ABROAD',
    intro: 'Explore international education destinations and get support through the stages of your application journey.',
    lead: 'From choosing a course and destination to preparing an application, EduMindz lists a range of services to support students planning overseas education.',
    paragraphs: [
      'The destinations featured on the existing EduMindz website include Dubai, Singapore, New Zealand, Ireland, Italy, France, Germany, Canada, the USA, Georgia, Uzbekistan, Australia, Russia and the United Kingdom. Course availability and entry requirements vary by institution and intake.',
      'The team can help you understand the steps involved in course selection, application preparation and post-admission planning. Always verify university entry requirements, fees, scholarships and immigration rules with the relevant official sources before making a decision.',
    ],
    cards: [
      { icon: Compass, title: 'Course & destination planning', text: 'Compare study destinations and identify courses that fit your academic interests.' },
      { icon: ClipboardList, title: 'Application preparation', text: 'Get guidance on resumes, statements of purpose, essays and recommendation letters.' },
      { icon: FileCheck2, title: 'Admission support', text: 'Prepare your profile and understand application steps and university interviews.' },
      { icon: Plane, title: 'After your offer', text: 'Explore guidance on visa preparation, insurance, travel and accommodation.' },
    ],
    highlights: ['Course and university selection guidance', 'Destination and intake planning', 'Standardised test planning', 'Resume, SOP and essay guidance', 'LOR guidance and admission profiling', 'University interview preparation', 'Scholarship and grant information', 'Visa, loans, forex, insurance and travel guidance'],
    cta: 'Discuss your study plans',
  },
  'test-preparation': {
    title: 'Test preparation, coaching and learning support.',
    eyebrow: 'TEST PREPARATION & COACHING',
    intro: 'Explore test preparation, school-level academic coaching, competitive exam coaching and professional services offered by EduMindz.',
    lead: 'EduMindz supports learners across school education, competitive examinations, eligibility tests and professional development.',
    paragraphs: [
      'Eligibility test preparation includes IELTS, TOEFL, PTE, OET, Duolingo English Test, LanguageCert, CELPIP, GRE, GMAT and SAT.',
      'Competitive test preparation includes NEET, IIT-JEE, CET, and the Math and Science Olympiads. Coaching programs also include SNAP, NMAT, CMAT and MHCET.',
      'Academic coaching is for school students from Grade 1 to Grade 12, across SSC, HSC, ICSE and CBSE boards. Foreign language learning, corporate training, management consultancy and employment assistance are also listed among the services.',
      'Please contact EduMindz to confirm the subjects, languages, batches, schedules, delivery modes and current availability for each programme.',
    ],
    cards: [
      { icon: ClipboardList, title: 'Eligibility Test Preparation', text: 'IELTS, TOEFL, PTE, OET, Duolingo English Test, LanguageCert, CELPIP, GRE, GMAT and SAT.' },
      { icon: Languages, title: 'Foreign Languages', text: 'Foreign language learning and preparation. Contact EduMindz for the languages and batches currently available.' },
      { icon: GraduationCap, title: 'Competitive Test Preparation', text: 'NEET, IIT-JEE, CET, and Math and Science Olympiads.' },
      { icon: BookOpen, title: 'Coaching Programs', text: 'SNAP Coaching, NMAT Coaching, CMAT Coaching and MHCET Coaching.' },
      { icon: BookOpen, title: 'Academic Coaching – Grades 1 to 12', text: 'School-level academic coaching for SSC, HSC, ICSE and CBSE students.' },
      { icon: BriefcaseBusiness, title: 'Corporate Training', text: 'Training support for corporate and professional learning needs.' },
      { icon: Building2, title: 'Management Consultancy', text: 'Management consultancy services. Contact EduMindz for details of the current offering.' },
      { icon: Compass, title: 'Employment Assistance', text: 'Employment assistance and career-related support.' },
    ],
    highlights: ['IELTS', 'TOEFL', 'PTE', 'OET', 'Duolingo English Test', 'LanguageCert', 'CELPIP', 'GRE', 'GMAT', 'SAT', 'NEET', 'IIT-JEE', 'CET', 'Math and Science Olympiads', 'SNAP', 'NMAT', 'CMAT', 'MHCET', 'SSC, HSC, ICSE and CBSE – Grades 1 to 12', 'Foreign Languages', 'Corporate Training', 'Management Consultancy', 'Employment Assistance'],
    cta: 'Ask about test preparation',
  },
  'visa-and-travel': {
    title: 'Get ready for the next stage of your journey.',
    eyebrow: 'VISA & TRAVEL SUPPORT',
    intro: 'Explore practical support listed by EduMindz for students preparing to travel for education.',
    lead: 'An admission offer is one milestone. Students may also need to plan documentation, finances, insurance, travel and accommodation.',
    paragraphs: [
      'The existing EduMindz website lists visa and passport assistance, education loan and foreign exchange guidance, university fee-transfer support, insurance help, travel ticketing and student accommodation among its services.',
      'Visa requirements depend on your nationality, destination, course and personal circumstances, and they change over time. EduMindz can explain the support it offers, but students should verify current rules, document checklists, fees and processing times with the relevant official government or visa-authority website.',
    ],
    cards: [
      { icon: FileCheck2, title: 'Visa & documents', text: 'Understand the documentation and preparation steps relevant to your destination.' },
      { icon: Wallet, title: 'Loans & forex', text: 'Ask about education loan, foreign exchange and university fee-transfer guidance.' },
      { icon: ShieldCheck, title: 'Insurance', text: 'Explore student insurance guidance for your planned destination.' },
      { icon: Home, title: 'Travel & accommodation', text: 'Ask about travel ticketing and student accommodation assistance.' },
    ],
    highlights: ['Visa and passport process guidance', 'Education loan and forex guidance', 'University fee-transfer support', 'Student insurance guidance', 'Travel and ticketing assistance', 'Student accommodation support'],
    cta: 'Ask about visa and travel support',
  },
} as const;

export type ContentPageSlug = keyof typeof pageContent;

export default function EnhancedContentPage({ slug }: { slug: ContentPageSlug }) {
  const page = pageContent[slug];
  return (
    <main className="content-page">
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Education, training & career guidance</span>
          <div>
            <a href="tel:+919702430873">+91 9702430873</a>
            <a href="mailto:info@edumindzglobal.com">info@edumindzglobal.com</a>
          </div>
        </div>
      </div>

      <header className="header">
        <div className="container nav-wrap">
          <Link href="/" className="brand" aria-label="EduMindz Global home">
            <Image src="/images/edumindz-logo.png" alt="EduMindz Education & Training Consultants" width={2030} height={775} priority />
          </Link>
          <nav className="nav-links page-nav" aria-label="Main navigation">
            <Link href="/">Home</Link>
            <Link href="/about-us">About</Link>
            <Link href="/study-abroad">Study Abroad</Link>
            <Link href="/test-preparation">Test Preparation</Link>
            <Link href="/visa-and-travel">Visa & Travel</Link>
            <Link href="/#contact" className="nav-cta">Contact us <ArrowRight size={15} /></Link>
          </nav>
        </div>
      </header>

      <section className="content-hero">
        <div className="container">
          <div className="eyebrow light"><span /> {page.eyebrow}</div>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/#contact">Enquire now <ArrowRight size={18} /></Link>
            <Link className="btn btn-glass" href="/">Back to homepage</Link>
          </div>
        </div>
      </section>

      <section className="section content-intro-section">
        <div className="container content-grid">
          <div className="content-main">
            <div className="eyebrow"><span /> EDUMINDZ GLOBAL</div>
            <h2>{page.lead}</h2>
            {page.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <h3>How we can help</h3>
            <div className="content-checks">
              {page.highlights.map((item) => (
                <div key={item}><CheckCircle2 size={18} /><span>{item}</span></div>
              ))}
            </div>
            <Link className="btn btn-dark" href="/#contact">{page.cta} <MessageCircle size={17} /></Link>
          </div>
          <aside className="content-aside">
            <div className="aside-icon"><Globe2 size={30} /></div>
            <h3>Take your next step with EduMindz</h3>
            <p>Share your goals with the team and ask about the services currently available for your needs.</p>
            <Link className="text-link" href="/#contact">Contact EduMindz <ArrowRight size={17} /></Link>
            <div className="aside-links">
              <Link href="/study-abroad"><GraduationCap /> Study Abroad</Link>
              <Link href="/test-preparation"><BookOpen /> Test Preparation</Link>
              <Link href="/visa-and-travel"><Plane /> Visa & Travel</Link>
              <Link href="/about-us"><Building2 /> About EduMindz</Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="section content-services-section">
        <div className="container">
          <div className="section-heading centered">
            <div className="eyebrow"><span /> EXPLORE OUR SUPPORT</div>
            <h2>Support at every <em>stage.</em></h2>
            <p>Explore the areas listed on the EduMindz website and contact the team to confirm current availability.</p>
          </div>
          <div className="content-service-grid">
            {page.cards.map(({ icon: Icon, title, text }) => (
              <article className="content-service-card" key={title}>
                <div className="service-icon"><Icon size={24} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-cta-section">
        <div className="container content-cta-inner">
          <div>
            <div className="eyebrow light"><span /> START A CONVERSATION</div>
            <h2>Have questions about your next step?</h2>
            <p>Contact EduMindz to discuss your goals and ask about available guidance.</p>
          </div>
          <Link className="btn btn-primary" href="/#contact">Get in touch <ArrowRight size={18} /></Link>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <Image src="/images/edumindz-logo.png" alt="EduMindz" width={2030} height={775} />
            <p>Education, training and career development guidance for learners and aspiring global students.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <Link href="/about-us">About us</Link>
            <Link href="/study-abroad">Study destinations</Link>
            <Link href="/test-preparation">Test preparation</Link>
          </div>
          <div>
            <h4>Support</h4>
            <Link href="/visa-and-travel">Visa & travel</Link>
            <Link href="/competitive-exam-preparation">Competitive exam preparation</Link>
            <Link href="/academic-coaching">Academic coaching</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
          <div className="footer-contact">
            <h4>Get in touch</h4>
            <a href="tel:+919702430873">+91 9702430873</a>
            <a href="mailto:info@edumindzglobal.com">info@edumindzglobal.com</a>
            <p className="footer-address">Office 1 & 2, Shiv Shrishti Apt., Plot 8A, Sector 9, Vitthal Mandir Road, Airoli, Navi Mumbai, Maharashtra – 400708.</p>
            <span>Mumbai · Thane · Nanded · Akola · Kolkata · Delhi</span>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} EduMindz Global. All rights reserved.</span>
          <span>Education & Training Consultants.</span>
        </div>
      </footer>
    </main>
  );
}
