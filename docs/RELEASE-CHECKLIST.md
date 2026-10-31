# EduMindz release checklist — owner inputs required

## Required from EduMindz
- Confirm the official phone numbers, email addresses, branch addresses, business hours and current service availability.
- Provide/approve a complete export or page-by-page copy of the current live website, including all original FAQs, testimonials, images, course details, coaching details and claims. The current redesign content is only a partial migration.
- Supply approved privacy notice, retention period, data controller/contact details and deletion-request procedure.
- Decide whether counsellor handoff should be WhatsApp, email, phone, CRM task, or a combination. The current build provides the CRM lead and a callback enquiry form only.
- Supply the official brand image files and written approval for use of all student photos/testimonials.
- Choose production hosting and provide DNS access when deployment is scheduled.

## Required technical configuration
- PostgreSQL database URL and production database.
- Strong random JWT secret (never send it in chat or commit it).
- Groq or OpenRouter API key, chosen model and approved provider data-processing terms. Set the key only as a backend environment secret.
- Production frontend URL for CORS and `NEXT_PUBLIC_API_URL`.
- Email/WhatsApp provider credentials only if those notification channels are approved.

## Before real student data
- Run schema migration for `lead_activities.due_at` on existing databases.
- Replace browser localStorage JWT with secure HttpOnly cookie sessions and CSRF protection.
- Add API rate limiting, abuse controls, login throttling and CAPTCHA/risk controls.
- Test every role's access to leads and users, consent enforcement, audit logging, backups and restore.
- Review privacy/legal wording and cross-border AI provider processing.
- Perform dependency, application and infrastructure security review.

## Known implementation boundary
The app has a usable development scaffold for CRM, AI FAQ/chat, and consent-based enquiry capture. It has not been deployed, connected to live production services, or end-to-end tested. AI chat does not store chat transcripts or extract personal data into leads. Students submit their contact details through the explicit consent form.


## Live-site audit notes (needs owner sign-off)
- The About Us page says the institution was founded in 2011, while the homepage/study-abroad page says "20+ years". These statements conflict as of 2026; do not silently reconcile. Ask EduMindz which founding/experience statement is approved.
- The live study-abroad page states 20+ years, 30+ professional trainers, 1.5+ lakh students helped and 800+ universities represented. These are business claims and need documentary/owner confirmation before publishing in the redesigned site.
- The homepage says accreditations with ETS-USA, British Council-India, LanguageCert and Pearson-UK. Confirm exact accreditation/authorised-agent wording and current status. The site has spelling variations around LanguageCert.
- The About Us page contains testimonials attributed to Gaurang Majithia and Harshpreet Lubane. Obtain explicit permission to republish the text, names and any images.
- Foreign-language page lists French, Spanish, German and Korean. Confirm live course availability, instructors, formats and fees.
- The site displays Mumbai, Thane, Nanded, Akola, Kolkata and Delhi in the header; confirm which are active offices versus service locations.
- Public site phone/email observed: +91 9702430873 and info@edumindzglobal.com. Confirm these are current and approved for website and WhatsApp handoff.
