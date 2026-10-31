# Confirmed EduMindz decisions — 30 October 2026

- Primary AI provider: Groq.
- Counsellor handoff: CRM enquiry plus WhatsApp.
- Content source: current live `https://edumindzglobal.com/`.
- Hosting: defer until implementation and content review are complete.

## Implementation details
- Backend defaults to Groq and reads `GROQ_API_KEY` and `GROQ_MODEL` from server environment variables.
- The website enquiry form requires explicit consent and posts to the CRM.
- After a successful CRM submission, the student can continue to the published EduMindz WhatsApp contact number.
- Mindzy chat does not store raw chat transcripts or automatically extract personal details from chat.
- Hosting is not configured and no deployment has been performed.
