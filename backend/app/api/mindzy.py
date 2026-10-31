
import logging
import os
import httpx

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field, ConfigDict

from app.ai.knowledge import faq_answer

from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/mindzy", tags=["Mindzy AI"])


class ChatMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")

    role: str
    content: str = Field(min_length=1, max_length=1000)


class ChatInput(BaseModel):
    message: str = Field(min_length=1, max_length=1500)
    history: list[ChatMessage] = Field(default_factory=list, max_length=8)


SYSTEM_PROMPT = """
You are Mindzy, the friendly AI student guidance assistant for EduMindz Global.

Your responsibilities:
- Help students understand study-abroad destinations and education services.
- Explain English tests, competitive exams and academic coaching.
- Ask simple questions to understand a student's education goals.
- Keep conversations natural, friendly and concise.
- Offer to connect students with an EduMindz counsellor when they need
  personalised guidance.

Conversation guidelines:
- Keep replies under 120 words.
- Ask only one question at a time.
- Do not request names, phone numbers, email addresses or other sensitive
  personal details in the chat.
- Never invent university fees, admission criteria, scholarships, visa
  rules, deadlines or course availability.
- If information needs verification, say so and recommend official sources
  or an EduMindz counsellor.
- Do not claim to have submitted an enquiry or contacted a counsellor.
- If a student wants personalised support, explain that they can use the
  enquiry form and choose to consent to sharing their details.
- Do not pretend to be a human counsellor.

Represent EduMindz Global accurately and professionally.
"""


@router.post("/chat")
async def chat(payload: ChatInput):

    # Answer known questions directly from the EduMindz FAQ.
    canned = faq_answer(payload.message)

    if canned:
        return {
            "reply": canned,
            "source": "edumindz_faq"
        }

    provider = os.getenv("MINDZY_PROVIDER", "groq").lower()

    if provider == "groq":
        api_key = os.getenv("GROQ_API_KEY")
        url = "https://api.groq.com/openai/v1/chat/completions"
        model = os.getenv("GROQ_MODEL", "openai/gpt-oss-120b")

    elif provider == "openrouter":
        api_key = os.getenv("OPENROUTER_API_KEY")
        url = "https://openrouter.ai/api/v1/chat/completions"
        model = os.getenv(
            "OPENROUTER_MODEL",
            "meta-llama/llama-3.3-70b-instruct"
        )

    else:
        raise HTTPException(
            status_code=503,
            detail="Configured Mindzy provider is unsupported"
        )

    if not api_key:
        return {
            "reply": (
                "I can help with study destinations, test preparation "
                "and EduMindz services. For personalised guidance, "
                "you can connect with an EduMindz counsellor."
            ),
            "source": "safe_fallback"
        }

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT}
    ]

    # Accept only valid user/assistant messages.
    for item in payload.history[-6:]:
        if item.role in ("user", "assistant"):
            messages.append({
                "role": item.role,
                "content": item.content
            })

    messages.append({
        "role": "user",
        "content": payload.message
    })

    try:
        async with httpx.AsyncClient(timeout=18) as client:
            response = await client.post(
                url,
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": model,
                    "messages": messages,
                    "temperature": 0.3,
                    "max_tokens": 400
                }
            )

            response.raise_for_status()

            data = response.json()
            answer = data["choices"][0]["message"]["content"]

            if not isinstance(answer, str) or not answer.strip():
                raise ValueError("Empty AI response")

            return {
                "reply": answer[:1800],
                "source": provider
            }

    except httpx.TimeoutException:
        logger.warning("Mindzy AI provider timed out")

    except httpx.HTTPStatusError as exc:
        logger.error(
            "Mindzy provider returned HTTP %s",
            exc.response.status_code
        )

    except (httpx.RequestError, ValueError, KeyError, IndexError):
        logger.exception("Mindzy AI response failed")

    except Exception:
        logger.exception("Unexpected Mindzy error")

    return {
        "reply": (
            "I'm having trouble reaching my AI service right now. "
            "I can still help with general EduMindz information, "
            "or you can leave an enquiry for a counsellor."
        ),
        "source": "safe_fallback"
    }
