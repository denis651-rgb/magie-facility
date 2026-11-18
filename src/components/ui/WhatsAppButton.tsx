"use client";
import type { Locale } from "@/i18n/config";
import { publicMessages } from "@/i18n/public-messages";

import { useEffect, useId, useRef, useState } from "react";
import { buildWhatsAppUrl } from "../../lib/whatsapp";

type Props = {
  phone: string;
  message: string;
  label?: string;
  className?: string;
  welcomeText?: string;
  locale?: Locale;
};

export function WhatsAppButton({
  phone,
  message,
  label,
  className,
  welcomeText,
  locale = "es",
}: Props) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const panelID = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const t = publicMessages[locale];

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  const close = () => {
    setOpen(false);
    trigger.current?.focus();
  };

  return (
    <div
      className="whatsapp-widget"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          close();
        }
      }}
    >
      {open && (
        <section
          className="whatsapp-widget__panel"
          id={panelID}
          role="dialog"
          aria-label={t.widgetContact}
        >
          <div className="whatsapp-widget__welcome">
            <button
              className="whatsapp-widget__close"
              type="button"
              onClick={close}
              aria-label={t.close}
            >
              ×
            </button>
            <p>{welcomeText || t.widgetWelcome}</p>
          </div>
          <div className="whatsapp-widget__body">
            <p className="whatsapp-widget__greeting">
              {label || t.widgetHello}
            </p>
            <label htmlFor={panelID + "-message"}>{t.yourMessage}</label>
            <textarea
              ref={input}
              id={panelID + "-message"}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              maxLength={2000}
              rows={3}
              placeholder={message}
            />
            <a
              className="whatsapp-widget__send"
              href={buildWhatsAppUrl(phone, draft.trim() || message)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.continueWhatsApp} <span aria-hidden="true">↗</span>
            </a>
            <small>{t.conversationContinues}</small>
          </div>
        </section>
      )}
      <button
        ref={trigger}
        className={className}
        type="button"
        aria-expanded={open}
        aria-controls={panelID}
        onClick={() => (open ? close() : setOpen(true))}
      >
        <svg
          viewBox="0 0 24 24"
          width="21"
          height="21"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M21 11.5a9 9 0 0 1-13 8.1L3 21l1.4-5A9 9 0 1 1 21 11.5Z" />
          <path d="M8 7c0 5 4 8 8 8l1-2-3-1-1 1c-2-1-3-2-4-4l1-1-1-2Z" />
        </svg>
        {label || t.widgetHello}
      </button>
    </div>
  );
}
