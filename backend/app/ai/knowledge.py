
import re

FAQS = [
    (
        "What services does EduMindz offer?",
        "The live EduMindz website lists overseas education guidance, academic coaching for Grades 6–12, competitive exam preparation, English test preparation, career counselling, employment assistance, corporate training, management consultancy, visa and travel support, and foreign language training."
    ),
    (
        "Which study destinations are listed?",
        "The current EduMindz homepage lists Dubai, Singapore, New Zealand, Ireland, Italy, France, Germany, Canada, USA, Georgia, Uzbekistan, Australia, Russia and the United Kingdom. The study-abroad page also describes guidance for USA, UK, Canada, Australia, Germany, Ireland and New Zealand. Confirm current destination availability with a counsellor."
    ),
    (
        "Which tests are listed?",
        "The live website references IELTS, TOEFL, PTE, OET, Duolingo English Test, LanguageCert, CELPIP, GRE, GMAT and SAT across its service pages. Contact EduMindz to confirm current batches, test coverage and schedules."
    ),
    (
        "Which competitive exams are listed?",
        "EduMindz lists IIT-JEE Main and Advanced, NEET, CUET, CET and Math and Science Olympiads. Its competitive preparation page also describes coaching for MHT-CET, KCET and other state-level exams."
    ),
    (
        "Does EduMindz offer school academic coaching?",
        "The live website describes academic coaching for Grades 6–12 across ICSE, CBSE, IGCSE and IB curricula. Ask EduMindz to confirm current subjects, batches, locations and schedules."
    ),
    (
        "Does EduMindz provide corporate training?",
        "Yes. Corporate training is listed on the live website, with topics including communication, leadership, workplace behaviour, decision-making and professional effectiveness. Confirm current programmes with the team."
    ),
    (
        "How can I speak to a counsellor?",
        "Submit the enquiry form and give consent for EduMindz to store your contact details. After submission, you can continue to WhatsApp or wait for the team to contact you."
    ),
]

PATTERNS = {
    0: (
        "services", "what do you offer", "what does edumindz",
        "programmes", "programs", "courses offered"
    ),
    1: (
        "countries", "destinations", "where can i study",
        "study destinations", "which country", "study abroad"
    ),
    2: (
        "ielts", "toefl", "pte", "oet", "duolingo",
        "languagecert", "celpip", "gre", "gmat", "sat",
        "english test", "language test"
    ),
    3: (
        "jee", "iit jee", "neet", "cuet", "cet",
        "mht cet", "kcet", "olympiad", "competitive exam"
    ),
    4: (
        "school", "academic coaching", "grades",
        "cbse", "icse", "igcse", "ib board"
    ),
    5: (
        "corporate training", "management consultancy",
        "workplace training", "employee training"
    ),
    6: (
        "counsellor", "contact", "speak to",
        "whatsapp", "call me", "talk to someone"
    ),
}


def normalize_text(message: str) -> str:
    return re.sub(r"[^a-z0-9]+", " ", message.lower()).strip()


def faq_answer(message: str):
    question = f" {normalize_text(message)} "

    for idx, terms in PATTERNS.items():
        for term in terms:
            normalized_term = f" {normalize_text(term)} "
            if normalized_term in question:
                return FAQS[idx][1]

    return None
