
'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Globe2,
  GraduationCap,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  X,
  BookOpen,
  Plane,
  BriefcaseBusiness,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EduMindz Global | Education & Training Consultants',
  description:
    'Explore overseas education, career guidance, academic coaching and training with EduMindz Global.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
};

const destinations = [
  'Dubai',
  'Singapore',
  'New Zealand',
  'Ireland',
  'Italy',
  'France',
  'Germany',
  'Canada',
  'USA',
  'Georgia',
  'Uzbekistan',
  'Australia',
  'Russia',
  'United Kingdom',
];

const services = [
  {
    icon: GraduationCap,
    title: 'Overseas Education',
    copy: 'Personalised guidance on university selection, course planning, applications, visas and pre-departure preparation.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Career Guidance',
    copy: 'Explore your strengths, career options and educational pathways with individual guidance.',
  },
  {
    icon: BookOpen,
    title: 'Training, Coaching & More',
    copy: 'Training and coaching programmes designed to build skills, confidence and academic performance.',
  },
  {
    icon: Plane,
    title: 'Visa & Passport Assistance',
    copy: 'Guidance through visa and passport processes, documentation and application steps.',
  },
  {
    icon: BookOpen,
    title: 'Academic Coaching',
    copy: 'Academic support for Grades 6–12 across ICSE, CBSE, IGCSE and IB curricula.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Corporate Training',
    copy: 'Communication, leadership, professional effectiveness and customised workplace training.',
  },
  {
    icon: Globe2,
    title: 'Management Consultancy',
    copy: 'Institutional strategy, operations, compliance, HR, infrastructure and resource planning.',
  },
  {
    icon: MessageCircle,
    title: 'Foreign Language Training',
    copy: 'Language training enquiries and programmes listed among EduMindz services.',
  },
  {
    icon: GraduationCap,
    title: 'Employment Assistance',
    copy: 'Career roadmaps, aptitude guidance, skills development and resume or LinkedIn support.',
  },
];

const serviceGroups = [
  {
    title: 'Education Planning',
    items: [
      ['Course Selection', 'Choose high school, college and university courses tailored to your goals.'],
      ['Intake & Destination', 'Guidance on intake seasons and destinations based on your profile.'],
      ['Standardised Test Planning', 'Plan which tests to take, such as SAT and GRE, and when.'],
      ['Activities Planning', 'Guidance on extracurricular and community service activities.'],
    ],
  },
  {
    title: 'Application Assistance',
    items: [
      ['Resume Building', 'Advice on building and formatting your academic resume.'],
      ['SOP / Essay Writing', 'Support with statements of purpose, essays and motivation letters.'],
      ['LOR Guidance', 'Guidance on identifying and approaching recommenders.'],
      ['Admission Profiling', 'Review and preparation of your profile for university applications.'],
    ],
  },
  {
    title: 'Post-Admission Support',
    items: [
      ['Visa & Passport Assistance', 'Step-by-step help with student visa and passport processes.'],
      ['Loans & Forex', 'Guidance on education loans and foreign exchange.'],
      ['Fee Transfers', 'Support with university fee transfers through authorised banking channels.'],
      ['Insurance Help', 'Guidance on student travel and health insurance.'],
    ],
  },
  {
    title: 'Travel & Accommodation',
    items: [
      ['Travel & Ticketing', 'Assistance with travel planning and student ticketing options.'],
      ['Student Accommodation', 'Help finding suitable housing and hostels near your campus abroad.'],
    ],
  },
  {
    title: 'Career & Professional Development',
    items: [
      ['Career Counselling', 'Explore strengths, interests and education or career pathways.'],
      ['Employment Assistance', 'Career roadmaps, aptitude assessments, communication, teamwork and problem-solving skills.'],
      ['Resume & LinkedIn', 'Support with professional resume and LinkedIn profile development.'],
      ['Corporate Training', 'Workplace communication, leadership, decision-making and professional effectiveness.'],
    ],
  },
  {
    title: 'Academic & Language Training',
    items: [
      ['Academic Coaching', 'Grades 6–12 support across ICSE, CBSE, IGCSE and IB curricula.'],
      ['Competitive Exams', 'IIT-JEE Main & Advanced, NEET, CUET, CET and Math/Science Olympiads.'],
      ['English Test Preparation', 'IELTS, TOEFL, PTE, OET, Duolingo English Test and LanguageCert are listed on the live site.'],
      ['Foreign Languages', 'Foreign language training is listed as a value-added service; confirm current languages and batches.'],
    ],
  },
  {
    title: 'Institutional Services',
    items: [
      ['Management Consultancy', 'Student recruitment, admission cycles and institutional growth planning.'],
      ['Operations & Compliance', 'Operations, compliance, HR and infrastructure planning.'],
      ['Faculty Development', 'Faculty hiring, training, appraisal and retention systems.'],
      ['Budget & Resource Planning', 'Budget planning, audit support, fee structures and resource optimisation.'],
    ],
  },
];

const faqs = [
  [
    'Which competitive exams do you offer coaching for?',
    'We provide coaching for IIT-JEE (Main & Advanced), NEET, CUET, CET and other national-level entrance exams.',
  ],
  [
    'Are classes available online or offline?',
    'Yes. Online and offline coaching options are available, subject to programme and location.',
  ],
  [
    'What is the teaching methodology?',
    'The existing website describes a concept-driven, exam-oriented approach with lectures, problem-solving, daily practice papers and mock tests.',
  ],
  [
    'What study materials are provided?',
    'The existing website lists study materials, practice workbooks, chapter-wise tests and recorded sessions for revision.',
  ],
  [
    'Can school syllabus and competitive preparation be balanced?',
    'Yes. The existing programme information describes batches designed to integrate board and competitive exam preparation.',
  ],
];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [leadNotice, setLeadNotice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [whatsappFallbackUrl, setWhatsappFallbackUrl] = useState('');

  const apiBase =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  async function submitEnquiry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLeadNotice('');
    setWhatsappFallbackUrl('');
    setIsSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      full_name: String(data.get('full_name') || ''),
      email: String(data.get('email') || '') || null,
      phone: String(data.get('phone') || '') || null,
      preferred_country: String(data.get('country') || '') || null,
      preferred_course: String(data.get('course') || '') || null,
      enquiry_summary: 'Website consultation request',
      preferred_contact_method: 'phone',
      consent_to_store: data.get('consent') === 'on',
      consent_policy_version: '2026-10',
    };

    const whatsappMessage = [
  'Hello EduMindz Global,',
  '',
  'I recently submitted an enquiry through your website.',
  '',
  `Name: ${payload.full_name}`,
  `Phone: ${payload.phone}`,
  `Email: ${payload.email || 'Not provided'}`,
  `Destination: ${payload.preferred_country || 'Not specified'}`,
  `Course: ${payload.preferred_course || 'Not specified'}`,
  '',
  'Please contact me regarding the next steps.',
  'Thank you!',
].join('\n');

    const whatsappUrl =
      `https://wa.me/919702430873?text=${encodeURIComponent(whatsappMessage)}`;

    // Open the tab directly from the submit click so browsers are less
    // likely to block it after the asynchronous API request.
    const whatsappWindow = window.open('about:blank', '_blank');

    try {
      const response = await fetch(`${apiBase}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || 'Unable to submit enquiry');
      }

      form.reset();
      setLeadNotice(
        'Your enquiry has been saved successfully. WhatsApp is opening now.'
      );

      if (whatsappWindow) {
        whatsappWindow.location.href = whatsappUrl;
      } else {
        setWhatsappFallbackUrl(whatsappUrl);
      }
    } catch (error) {
      if (whatsappWindow) {
        whatsappWindow.close();
      }

      setLeadNotice(
        error instanceof Error
          ? error.message
          : 'Submission failed. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Education, training & career guidance</span>
          <div>
            <a href="tel:+919702430873">+91 9702430873</a>
            <a href="mailto:info@edumindzglobal.com">
              info@edumindzglobal.com
            </a>
            <span>Mumbai · Thane · Nanded · Akola · Kolkata · Delhi</span>
          </div>
        </div>
      </div>

      <header className="header">
        <div className="container nav-wrap">
          <a href="#home" className="brand" aria-label="EduMindz Global home">
            <Image
              src="/images/edumindz-logo.png"
              alt="EduMindz Education & Training Consultants"
              width={2030}
              height={775}
              priority
            />
          </a>

          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>

          <nav className={mobileOpen ? 'nav-links show' : 'nav-links'}>
            <a href="#home" onClick={() => setMobileOpen(false)}>Home</a>
            <a href="#about" onClick={() => setMobileOpen(false)}>About</a>
            <div className="nav-dropdown">
              <a href="#destinations">
                Destinations <ChevronDown size={14} />
              </a>
            </div>
            <a href="#services" onClick={() => setMobileOpen(false)}>Services</a>
            <a href="#courses" onClick={() => setMobileOpen(false)}>Courses & Coaching</a>
            <a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a>
            <a className="nav-cta" href="#contact">
              Free consultation <ArrowUpRight size={16} />
            </a>
          </nav>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-photo" />
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="eyebrow light">
            <span /> EDUCATION · OPPORTUNITY · FUTURE
          </div>
          <h1>
            We make you win.
            <br />
            <em>Fueling dreams.</em>
          </h1>
          <p>
            Overseas education and career development consultants helping
            learners explore opportunities, build confidence and take their
            next step.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#contact">
              Book a free counselling session <ArrowRight size={18} />
            </a>
            <a className="btn btn-glass" href="#destinations">
              Explore study destinations
            </a>
          </div>
          <div className="hero-note">
            <ShieldCheck size={17} />
            Guidance for every step of your education journey
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-card-icon"><Globe2 /></div>
          <div>
            <strong>Your next chapter starts here</strong>
            <span>Explore study, training and career pathways</span>
          </div>
          <ArrowUpRight size={20} />
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-grid">
          <div><strong>20+ Years</strong><span>Experience</span></div>
          <div><strong>30+ Trainers</strong><span>Professional trainers</span></div>
          <div><strong>1.5+ Lakh</strong><span>Students helped</span></div>
          <div><strong>800+</strong><span>Universities represented</span></div>
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="container about-grid">
          <div className="about-visual">
            <div className="about-image" />
            <div className="about-stamp">
              <span>EDUMINDZ</span>
              <strong>Learning<br />for life.</strong>
            </div>
            <div className="about-caption">
              <Sparkles size={17} /> Helping learners move forward
            </div>
          </div>
          <div className="about-copy">
            <div className="eyebrow"><span /> WHO WE ARE</div>
            <h2>
              A legacy of trust.
              <br />
              <em>A future of possibilities.</em>
            </h2>
            <p>
              EduMindz describes itself as an education, training and
              consulting firm based in Mumbai, with over 20 years of
              experience. The live website states that it is registered with
              the Government of India and lists accreditations with ETS-USA,
              British Council-India, LanguageCert and Pearson-UK. These
              credentials are reproduced as published claims and should be
              reconfirmed by EduMindz before launch.
            </p>
            <p>
              The live website describes its work across training, career
              counselling, overseas education counselling and immigration
              consultancy.
            </p>
            <a className="text-link" href="/about-us">
              Discover EduMindz <ArrowRight size={17} />
            </a>
            <div className="about-values">
              <span><CheckCircle2 /> Quality & excellence</span>
              <span><CheckCircle2 /> Honesty & integrity</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section destinations-section" id="destinations">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><span /> YOUR WORLD, YOUR FUTURE</div>
              <h2>Choose your <em>destination.</em></h2>
              <p>Explore the destinations featured on the existing EduMindz website.</p>
            </div>
            <a className="text-link" href="/study-abroad">
              Explore study abroad <ArrowRight size={17} />
            </a>
          </div>
          <div className="destination-grid">
            {destinations.map((destination, index) => (
              <a
                href="/study-abroad"
                className={`destination-card destination-${index}`}
                key={destination}
              >
                <span className="destination-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="destination-name">{destination}</span>
                <span className="destination-arrow"><ArrowUpRight size={18} /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section services-section" id="services">
        <div className="container">
          <div className="section-heading centered">
            <div className="eyebrow"><span /> HOW WE HELP</div>
            <h2>Guidance for every <em>milestone.</em></h2>
            <p>
              Explore the core services already offered by EduMindz, presented
              in a clearer and more connected experience.
            </p>
          </div>
          <div className="service-grid">
            {services.map(({ icon: Icon, title, copy }, index) => (
              <article className="service-card" key={title}>
                <div className="service-icon"><Icon size={25} /></div>
                <span className="service-number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <a
                  href={index === 0 ? '/study-abroad' : index === 3 ? '/visa-and-travel' : '/contact'}
                  aria-label={`Explore ${title}`}
                >
                  <ArrowUpRight size={19} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section support-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><span /> END-TO-END SUPPORT</div>
              <h2>Every detail. <em>Thoughtfully guided.</em></h2>
              <p>The service categories and descriptions below are retained from the existing website.</p>
            </div>
          </div>
          <div className="support-grid">
            {serviceGroups.map((group, index) => (
              <div className="support-card" key={group.title}>
                <div className="support-head">
                  <span>0{index + 1}</span>
                  <h3>{group.title}</h3>
                </div>
                {group.items.map(([title, copy]) => (
                  <div className="support-item" key={title}>
                    <CheckCircle2 size={17} />
                    <div>
                      <strong>{title}</strong>
                      <p>{copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="courses-section" id="courses">
        <div className="container courses-grid">
          <div>
            <div className="eyebrow light"><span /> LEARN · PREPARE · ACHIEVE</div>
            <h2>
              Build strong foundations.
              <br />
              <em>Reach higher goals.</em>
            </h2>
            <p>
              EduMindz's existing website includes academic coaching,
              school-board support, competitive exam preparation, test
              preparation and training.
            </p>
            <div className="course-pills">
              {[
                'CBSE', 'ICSE', 'IGCSE', 'IB', 'IIT-JEE', 'NEET', 'CUET',
                'CET', 'IELTS', 'TOEFL', 'PTE', 'OET', 'Duolingo English Test',
                'LanguageCert', 'GRE', 'GMAT', 'SAT',
              ].map((course) => <span key={course}>{course}</span>)}
            </div>
            <a className="btn btn-primary" href="/test-preparation">
              Explore courses <ArrowRight size={18} />
            </a>
          </div>
          <div className="courses-photo">
            <div className="photo-label">
              <GraduationCap />
              <span>Academic coaching<br /><strong>and test preparation</strong></span>
            </div>
          </div>
        </div>
      </section>

      <section className="section ai-section">
        <div className="container ai-panel">
          <div className="ai-orb">
            <Sparkles size={42} />
            <span />
          </div>
          <div className="ai-copy">
            <div className="eyebrow"><span /> INTRODUCING MINDZY</div>
            <h2>
              Your study abroad journey,
              <br />
              <em>with an intelligent guide.</em>
            </h2>
            <p>
              Meet Mindzy, the EduMindz AI assistant. Ask general questions
              about services, study destinations and test preparation, then
              connect with a counsellor.
            </p>
            <button
              className="btn btn-dark"
              onClick={() => window.dispatchEvent(new Event('open-mindzy'))}
            >
              Meet Mindzy <MessageCircle size={18} />
            </button>
            <small>
              Mindzy provides general guidance. Confirm admissions, fees and
              visa details with official sources.
            </small>
          </div>
          <div className="ai-chat-preview">
            <div className="chat-top">
              <span className="chat-dot" /> Mindzy <span>AI STUDY GUIDE</span>
            </div>
            <div className="chat-message">
              Hi! I'm Mindzy. What are you planning to study?
            </div>
            <div className="chat-options">
              <span>Explore countries</span>
              <span>Find a course</span>
              <span>Visa questions</span>
            </div>
            <div className="chat-input">
              Ask Mindzy anything… <ArrowUpRight size={16} />
            </div>
          </div>
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><span /> STUDENT EXPERIENCES</div>
              <h2>Stories from the <em>EduMindz community.</em></h2>
              <p>
                The original About Us page publishes these testimonials.
                Display them only after the business confirms permission to
                republish.
              </p>
            </div>
            <a className="text-link" href="/testimonial">
              Read more <ArrowRight size={17} />
            </a>
          </div>
          <div className="testimonial-grid">
            <article className="testimonial-card">
              <p>
                “Personalised support and clear instruction made a real
                difference to my GRE preparation and graduate application
                journey.”
              </p>
              <strong>Gaurang Majithia</strong>
              <span>GRE preparation testimonial </span>
            </article>
            <article className="testimonial-card">
              <p>
                “The courses, flexible learning experience and responsive
                support team helped me with my academic and professional
                growth.”
              </p>
              <strong>Harshpreet Lubane</strong>
              <span>Learning and career testimonial</span>
            </article>
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="container faq-grid">
          <div>
            <div className="eyebrow"><span /> GOOD TO KNOW</div>
            <h2>Questions?<br /><em>We've got answers.</em></h2>
            <p>These questions and answers are carried forward from the current EduMindz website.</p>
            <a className="text-link" href="/contact">
              Talk to our team <ArrowRight size={17} />
            </a>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <div
                className={`faq-item ${openFaq === index ? 'active' : ''}`}
                key={question}
              >
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                  <span>{question}</span>
                  <span className="faq-plus">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && <p>{answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="container contact-grid">
          <div>
            <div className="eyebrow light"><span /> TAKE THE NEXT STEP</div>
            <h2>Dream big.<br /><em>Explore opportunities.</em></h2>
            <p>
              Start your study abroad journey. Share your details and preferred
              destination, and the EduMindz team can guide you on the next
              steps.
            </p>
            <div className="contact-details">
              <a href="tel:+919702430873">+91 9702430873</a>
              <a href="mailto:info@edumindzglobal.com">
                info@edumindzglobal.com
              </a>
              <p>
                Office 1 & 2, Shiv Shrishti Apt., Plot 8A,
                Sector 9, Vitthal Mandir Road, Airoli,
                Navi Mumbai, Maharashtra – 400708.
              </p>
            </div>

            <div className="office-map">
              <iframe
                title="EduMindz Global Main Office Location"
                src="https://maps.google.com/maps?q=Office%201%20%26%202%2C%20Shiv%20Shrishti%20Apt.%2C%20Plot%208A%2C%20Sector%209%2C%20Vitthal%20Mandir%20Road%2C%20Airoli%2C%20Navi%20Mumbai%2C%20Maharashtra%20400708&output=embed"
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <form className="lead-form" onSubmit={submitEnquiry}>
            <h3>Start your study abroad journey</h3>
            <p>Get personalised admission guidance.</p>

            <label>
              Full name
              <input name="full_name" required placeholder="Your full name" />
            </label>

            <div className="form-row">
              <label>
                Email address
                <input name="email" type="email" placeholder="you@example.com" />
              </label>
              <label>
                Phone number
                <input name="phone" required type="tel" placeholder="Your phone number" />
              </label>
            </div>

            <label>
              Preferred destination
              <select name="country" defaultValue="">
                <option value="">Select a country or region</option>
                {destinations.map((destination) => (
                  <option key={destination}>{destination}</option>
                ))}
                <option>Asia</option>
                <option>Europe</option>
              </select>
            </label>

            <label>
              Preferred course
              <input name="course" placeholder="Course or subject" />
            </label>

            <label className="consent-check">
              <input name="consent" required type="checkbox" />
              I agree that EduMindz may store the details I submit to respond
              to my enquiry. I have read the privacy notice.
            </label>

            <button
              className="btn btn-primary form-submit"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
              {!isSubmitting && <ArrowRight size={18} />}
            </button>

            {leadNotice && <small role="status">{leadNotice}</small>}

            {whatsappFallbackUrl && (
              <a
                className="btn btn-dark"
                href={whatsappFallbackUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open WhatsApp <ArrowRight size={16} />
              </a>
            )}

            <small>
              Your information is submitted only after you give consent. Do not
              include sensitive personal information.
            </small>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <Image
              src="/images/edumindz-logo.png"
              alt="EduMindz"
              width={2030}
              height={775}
            />
            <p>
              Education, training and career development guidance for learners
              and aspiring global students.
            </p>
          </div>

          <div>
            <h4>Explore</h4>
            <a href="#about">About us</a>
            <a href="#destinations">Study destinations</a>
            <a href="#services">Our services</a>
            <a href="#courses">Courses & coaching</a>
          </div>

          <div>
            <h4>Support</h4>
            <a href="/study-abroad">Study abroad</a>
            <a href="/test-preparation">Test preparation</a>
            <a href="/competitive-exam-preparation">Competitive exam preparation</a>
            <a href="/academic-coaching">Academic coaching</a>
            <a href="/corporate-training">Corporate training</a>
            <a href="/management-consultancy">Management consultancy</a>
            <a href="/employment-assistance">Employment assistance</a>
            <a href="/foreign-language-training">Foreign languages</a>
            <a href="/visa-and-travel">Visa & travel</a>
            <a href="/privacy">Privacy</a>
            <a href="/testimonial">Testimonials</a>
          </div>

          <div className="footer-contact">
            <h4>Get in touch</h4>

            <a href="tel:+919702430873">+91 9702430873</a>

            <a href="mailto:info@edumindzglobal.com">
              info@edumindzglobal.com
            </a>

            <p className="footer-address">
              Office 1 & 2, Shiv Shrishti Apt., Plot 8A,
              Sector 9, Vitthal Mandir Road, Airoli,
              Navi Mumbai, Maharashtra – 400708.
            </p>

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
