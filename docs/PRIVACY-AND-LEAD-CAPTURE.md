# Mindzy lead capture rules
- Students may chat without registering.
- Mindzy should ask before collecting a contact profile.
- The lead form must explain purpose, categories of data, access by EduMindz counsellors,
  retention/deletion route and privacy contact.
- `POST /api/leads` rejects submissions unless `consent_to_store` is true.
- Save only fields voluntarily provided and needed for counselling.
- Store a concise conversation summary, not raw full transcripts by default.
- Do not send phone, email or education identifiers to model providers unless strictly needed.
