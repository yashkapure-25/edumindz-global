
'use client';

import { useState } from 'react';
import {
  ArrowUpRight,
  MessageCircle,
  Sparkles,
  X,
  Phone,
} from 'lucide-react';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const PHONE_NUMBER = '+919702430873';

const WHATSAPP_URL =
  'https://wa.me/919702430873?text=' +
  encodeURIComponent(
    'Hello EduMindz! I would like to know more about your education and career guidance services.'
  );

export default function MindzyChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);

  async function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const text = message.trim();
    if (!text || busy) return;

    const previousHistory = history;
    const updatedHistory = [
      ...previousHistory,
      { role: 'user' as const, content: text },
    ];

    setHistory(updatedHistory);
    setMessage('');
    setBusy(true);

    try {
      const response = await fetch(`${API_BASE}/api/mindzy/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: previousHistory.slice(-6),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Mindzy request failed');
      }

      setHistory([
        ...updatedHistory,
        {
          role: 'assistant',
          content: data.reply || 'Please try again.',
        },
      ]);
    } catch {
      setHistory([
        ...updatedHistory,
        {
          role: 'assistant',
          content:
            'Mindzy is temporarily unavailable. Please contact our team through WhatsApp or phone for assistance.',
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Floating WhatsApp and Call buttons */}
      <div className="floating-contact-actions">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-contact-btn floating-whatsapp"
          aria-label="WhatsApp EduMindz"
          title="WhatsApp Us"
        >
          <MessageCircle size={21} />
        </a>

        <a
          href={`tel:${PHONE_NUMBER}`}
          className="floating-contact-btn floating-call"
          aria-label="Call EduMindz"
          title="Call EduMindz"
        >
          <Phone size={20} />
        </a>
      </div>

      {/* Existing Mindzy AI button */}
      <button
        className="floating-ai"
        onClick={() => setIsOpen(true)}
        aria-label="Open Mindzy AI"
      >
        <Sparkles size={19} />
        <span>Ask Mindzy</span>
      </button>

      {/* Mindzy AI chat modal */}
      {isOpen && (
        <div className="modal-backdrop" onClick={() => setIsOpen(false)}>
          <div
            className="mindzy-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close Mindzy"
            >
              <X />
            </button>

            <div className="modal-icon">
              <Sparkles />
            </div>

            <div className="eyebrow">
              <span /> MINDZY AI
            </div>

            <h3>Hi, I'm Mindzy.</h3>

            <p>
              Ask about EduMindz services, study destinations or test
              preparation. Avoid sharing sensitive personal information here.
            </p>

            <div className="mindzy-thread" aria-live="polite">
              {history.map((item, index) => (
                <div
                  key={index}
                  className={
                    item.role === 'user' ? 'mindzy-user' : 'mindzy-answer'
                  }
                >
                  {item.content}
                </div>
              ))}

              {busy && (
                <div className="mindzy-answer">Mindzy is thinking…</div>
              )}
            </div>

            <form className="mindzy-compose" onSubmit={sendMessage}>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask Mindzy a question…"
                maxLength={1500}
                aria-label="Your question"
              />

              <button
                disabled={busy || !message.trim()}
                type="submit"
                aria-label="Send message"
              >
                <ArrowUpRight size={18} />
              </button>
            </form>

            {/* Contact options inside Mindzy */}
            <div className="mindzy-contact-actions">
              <a
                className="btn btn-dark"
                href="/#contact"
                onClick={() => setIsOpen(false)}
              >
                <MessageCircle size={17} />
                Connect with a Counsellor
              </a>

              <a
                className="btn mindzy-whatsapp"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={17} />
                WhatsApp Us
              </a>

              <a
                className="btn mindzy-call"
                href={`tel:${PHONE_NUMBER}`}
              >
                <Phone size={17} />
                Call EduMindz
              </a>
            </div>

            <small>
              AI responses may be incomplete. Verify important decisions with
              official sources.
            </small>
          </div>
        </div>
      )}
    </>
  );
}
