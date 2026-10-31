
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Globe2,
  BookOpen,
  BriefcaseBusiness,
  Plane,
  Languages,
  MessageCircle
} from 'lucide-react';

const pages = {
  'academic-coaching': {
    title: 'Academic Coaching',
    eyebrow: 'GRADES 6–12',
    intro: 'Structured academic support for learners across national and international school curricula.',
    paragraphs: [
      'The live EduMindz website describes academic coaching for Grades 6–12 across ICSE, CBSE, IGCSE and IB curricula. It highlights board-specific teaching, customised learning plans, concept-led instruction and regular assessments.',
      'The website also describes expert-led sessions, online notes, micro-batch teaching and a zero-homework policy on its About Us page. Please confirm current batch availability, subjects, centres and the applicability of these programme features.'
    ],
    items: [
      'ICSE, CBSE, IGCSE and IB board support',
      'Board-specific learning plans',
      'Conceptual and application-based teaching',
      'Weekly quizzes, chapter tests and mock exams',
      'Online notes and expert-led sessions'
    ]
  },

  'corporate-training': {
    title: 'Corporate Training',
    eyebrow: 'WORKPLACE LEARNING',
    intro: 'Customised professional development and workplace training programmes.',
    paragraphs: [
      'The live website describes corporate training focused on professional effectiveness, leadership and continuous learning. Listed areas include writing and speaking, interpersonal communication, workplace behaviour, team synergy, decision-making and motivation.',
      'It also references training for teaching methods, research and student engagement. Confirm programme scope and current availability with EduMindz.'
    ],
    items: [
      'Business communication',
      'Writing, speaking and interpersonal exchange',
      'Leadership and decision-making',
      'Teamwork and workplace behaviour',
      'Teaching methods and student engagement'
    ]
  },

  'management-consultancy': {
    title: 'Management Consultancy',
    eyebrow: 'INSTITUTIONAL DEVELOPMENT',
    intro: 'Institutional planning and operational support described on the EduMindz website.',
    paragraphs: [
      'The live website lists management consultancy for educational institutions, including student recruitment strategies, admission-cycle improvements, operations, compliance, HR, infrastructure, faculty systems, budgeting and resource optimisation.',
      'The current availability and exact scope of consultancy engagements should be confirmed directly with EduMindz.'
    ],
    items: [
      'Student recruitment and admissions planning',
      'Operations, compliance, HR and infrastructure',
      'Faculty hiring, training, appraisal and retention',
      'Budget planning, audit support and fee structures',
      'Resource optimisation'
    ]
  },

  'competitive-exam-preparation': {
    title: 'Competitive Exam Preparation',
    eyebrow: 'ACADEMIC COACHING',
    intro: 'Structured preparation support for students targeting competitive entrance examinations.',
    paragraphs: [
      'The existing EduMindz website lists coaching for IIT-JEE Main and Advanced, NEET, CUET, CET and other national-level entrance examinations.',
      'Please contact EduMindz to confirm current batches, subjects, teaching format, schedules, centres and fees before enrolling.'
    ],
    items: [
      'IIT-JEE Main',
      'IIT-JEE Advanced',
      'NEET',
      'CUET',
      'CET',
      'Other national-level entrance examinations'
    ]
  },

  'about-us': {
    title: 'About EduMindz',
    eyebrow: 'WHO WE ARE',
    intro: 'Education, training and career guidance for learners planning their next step.',
    paragraphs: [
      'EduMindz Global brings together education guidance, academic coaching, career counselling and support for students exploring international study opportunities.',
      'The existing website presents services across study abroad counselling, competitive exam preparation, test preparation, career guidance, corporate training and student support. This redesigned page brings those areas together in a clearer format.'
    ],
    items: [
      'Overseas education guidance',
      'Academic and competitive exam coaching',
      'Career counselling and professional development',
      'Application and student support'
    ]
  },

  'study-abroad': {
    title: 'Study Abroad',
    eyebrow: 'GLOBAL EDUCATION',
    intro: 'Explore international education opportunities and get guidance throughout your application journey.',
    paragraphs: [
      'EduMindz supports students with course and destination planning, intake guidance, university application preparation and post-admission assistance.',
      'Destinations featured on the existing website include Dubai, Singapore, New Zealand, Ireland, Italy, France, Germany, Canada, USA, Georgia, Uzbekistan, Australia, Russia and the United Kingdom.'
    ],
    items: [
      'Diploma, Bachelor’s and Master’s programme guidance',
      'Course and destination selection',
      'Intake and standardised test planning',
      'Resume, SOP and essay guidance',
      'LOR guidance and admission profiling',
      'Scholarship and grant identification',
      'University interview preparation',
      'Visa, loans, forex and fee-transfer guidance',
      'Insurance, travel and accommodation support'
    ]
  },

  'test-preparation': {
    title: 'Test Preparation',
    eyebrow: 'PREPARE WITH CONFIDENCE',
    intro: 'Preparation pathways for academic progression and international study applications.',
    paragraphs: [
      'The existing EduMindz website references preparation for English-language and standardised tests. The programmes listed include IELTS, TOEFL, PTE, GRE, GMAT and SAT.',
      'Contact EduMindz to confirm current batches, delivery modes, schedules and availability for each programme.'
    ],
    items: [
      'IELTS',
      'TOEFL',
      'PTE',
      'OET',
      'Duolingo English Test',
      'LanguageCert',
      'CELPIP',
      'GRE',
      'GMAT',
      'SAT'
    ]
  },

  'visa-and-travel': {
    title: 'Visa & Travel Assistance',
    eyebrow: 'BEYOND ADMISSION',
    intro: 'Guidance for the practical steps that follow an education decision and admission offer.',
    paragraphs: [
      'EduMindz lists visa and passport assistance as part of its student support services. The existing service information also includes fee transfers, loans and forex, insurance, travel ticketing and student accommodation.',
      'Visa requirements vary by destination and change over time. Students should always verify current requirements with the relevant official government or visa-authority source.'
    ],
    items: [
      'Visa and passport process guidance',
      'Education loan and forex guidance',
      'University fee-transfer support',
      'Student insurance guidance',
      'Travel and ticketing assistance',
      'Student accommodation support'
    ]
  },

  'employment-assistance': {
    title: 'Employment Assistance',
    eyebrow: 'CAREER DEVELOPMENT',
    intro: 'Career guidance and support to help learners prepare for professional opportunities.',
    paragraphs: [
      'The live website describes employment assistance for students and professionals, including career discovery, one-to-one counselling, personalised roadmaps, aptitude assessments and professional skills development.',
      'It also lists resume and LinkedIn profile building. Confirm current services, assessments and eligibility with EduMindz.'
    ],
    items: [
      'Discover interests, strengths and career potential',
      'One-to-one career guidance',
      'Personalised career roadmaps',
      'Logical, numerical, verbal and spatial aptitude assessments',
      'Communication, teamwork, problem-solving and time management',
      'Resume and LinkedIn profile support'
    ]
  },

  'foreign-language-training': {
    title: 'Foreign Language Training',
    eyebrow: 'LANGUAGE LEARNING',
    intro: 'Language learning support as part of education and career development.',
    paragraphs: [
      'The live EduMindz foreign-language page lists French, Spanish, German and Korean, with a focus on speaking, listening and comprehension through structured curricula and interactive sessions.',
      'The page also publishes claims about instructor credentials and learner fluency outcomes. Those claims should be checked and approved by EduMindz before being repeated as marketing statements.'
    ],
    items: [
      'French',
      'Spanish',
      'German',
      'Korean',
      'Speaking, listening and comprehension practice',
      'Structured language curriculum and interactive sessions'
    ]
  },

  'testimonial': {
    title: 'Student Testimonials',
    eyebrow: 'STUDENT EXPERIENCES',
    intro: 'A place for learners to share their experiences with EduMindz.',
    paragraphs: [
      'The existing website includes a testimonials section. We are retaining a dedicated page for student experiences in the redesign.',
      'Verified testimonials and approved student photographs or videos should be migrated here from the original website before launch.'
    ],
    items: [
      'Gaurang Majithia — GRE preparation and graduate admission experience',
      'Harshpreet Lubane — international learning and professional growth experience'
    ]
  },

  'contact': {
    title: 'Contact EduMindz',
    eyebrow: 'LET’S TALK',
    intro: 'Connect with the EduMindz team about study abroad, coaching, training or career guidance.',
    paragraphs: [
      'Phone: +91 9702430873',
      'Email: info@edumindzglobal.com',
      'Locations referenced on the existing website: Mumbai, Thane, Nanded, Akola, Kolkata and Delhi.'
    ],
    items: [
      'Study abroad enquiries',
      'Competitive exam coaching enquiries',
      'Test preparation and training enquiries',
      'Career guidance enquiries'
    ]
  }
} as const;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export default async function ContentPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pages[slug as keyof typeof pages];

  if (!page) notFound();

  return (
    <main className="content-page">
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Education, training & career guidance</span>
          <div>
            <a href="tel:+919702430873">+91 9702430873</a>
            <a href="mailto:info@edumindzglobal.com">
              info@edumindzglobal.com
            </a>
          </div>
        </div>
      </div>

      <header className="header">
        <div className="container nav-wrap">
          <Link href="/" className="brand">
            <Image
              src="/images/edumindz-logo.png"
              alt="EduMindz Education & Training Consultants"
              width={2030}
              height={775}
              priority
            />
          </Link>

          <nav className="nav-links page-nav">
            <Link href="/">Home</Link>
            <Link href="/about-us">About</Link>
            <Link href="/study-abroad">Study Abroad</Link>
            <Link href="/test-preparation">Test Preparation</Link>
            <Link href="/visa-and-travel">Visa & Travel</Link>
            <Link href="/contact" className="nav-cta">
              Contact us <ArrowRight size={15} />
            </Link>
          </nav>
        </div>
      </header>

      <section className="content-hero">
        <div className="container">
          <div className="eyebrow light">
            <span />
            {page.eyebrow}
          </div>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/contact">
              Enquire now <ArrowRight size={18} />
            </Link>
            <Link className="btn btn-glass" href="/">
              Back to homepage
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container content-grid">
          <div className="content-main">
            <div className="eyebrow">
              <span /> EDUMINDZ GLOBAL
            </div>
            <h2>
              Guidance for your <em>next step.</em>
            </h2>

            {page.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}

            <h3>How we can help</h3>

            <div className="content-checks">
              {page.items.map((item) => (
                <div key={item}>
                  <CheckCircle2 size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <Link className="btn btn-dark" href="/contact">
              Speak with our team <MessageCircle size={17} />
            </Link>
          </div>

          <aside className="content-aside">
            <div className="aside-icon">
              <Globe2 size={30} />
            </div>
            <h3>Plan your next step with EduMindz</h3>
            <p>
              Share your goals with our team and ask about the services
              available for your needs.
            </p>
            <Link className="text-link" href="/contact">
              Contact EduMindz <ArrowRight size={17} />
            </Link>

            <div className="aside-links">
              <Link href="/study-abroad">
                <GraduationCap /> Study Abroad
              </Link>
              <Link href="/test-preparation">
                <BookOpen /> Test Preparation
              </Link>
              <Link href="/employment-assistance">
                <BriefcaseBusiness /> Employment Assistance
              </Link>
              <Link href="/foreign-language-training">
                <Languages /> Language Training
              </Link>
              <Link href="/visa-and-travel">
                <Plane /> Visa & Travel
              </Link>
            </div>
          </aside>
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
            <Link href="/about-us">About us</Link>
            <Link href="/study-abroad">Study abroad</Link>
            <Link href="/test-preparation">Test preparation</Link>
          </div>

          <div>
            <h4>Services</h4>
            <Link href="/visa-and-travel">Visa & travel</Link>
            <Link href="/employment-assistance">Employment assistance</Link>
            <Link href="/foreign-language-training">Language training</Link>
            <Link href="/testimonial">Testimonials</Link>
          </div>

          <div>
            <h4>Get in touch</h4>
            <a href="tel:+919702430873">+91 9702430873</a>
            <a href="mailto:info@edumindzglobal.com">
              info@edumindzglobal.com
            </a>
            <Link href="/contact">Contact form</Link>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} EduMindz Global. All rights reserved.
          </span>
          <span>Education & Training Consultants.</span>
        </div>
      </footer>
    </main>
  );
}
