import type { ReactNode } from "react";

const drawings: Record<string, ReactNode> = {
  mission: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  vision: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  responsibility: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V2h6v2M8 13l3 3 5-6" />
    </>
  ),
  punctuality: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  commitment: (
    <path d="M12 21 3.8 13a5.4 5.4 0 0 1 7.6-7.6l.6.6.6-.6a5.4 5.4 0 0 1 7.6 7.6Z" />
  ),
  quality: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="m8 14-2 8 6-3 6 3-2-8M9 9l2 2 4-4" />
    </>
  ),
  safety: (
    <>
      <path d="m12 2 8 3v6c0 5-4 9-8 11-4-2-8-6-8-11V5Z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  environment: (
    <>
      <path d="M20 3c-1 5 2 12-5 16a7 7 0 0 1-10-9c4-6 10-3 15-7Z" />
      <path d="M3 22c2-6 7-10 13-13" />
    </>
  ),
};

const names: Record<string, string> = {
  mission: "mission",
  vision: "vision",
  responsabilite: "responsibility",
  responsabilita: "responsibility",
  ponctualite: "punctuality",
  puntualita: "punctuality",
  impegno: "commitment",
  qualite: "quality",
  qualita: "quality",
  securite: "safety",
  sicurezza: "safety",
  "respect de l’environnement": "environment",
  "respect de l'environnement": "environment",
  "rispetto dell’ambiente": "environment",
  "rispetto dell'ambiente": "environment",
  responsabilidad: "responsibility",
  verantwortung: "responsibility",
  puntualidad: "punctuality",
  punktlichkeit: "punctuality",
  compromiso: "commitment",
  engagement: "commitment",
  calidad: "quality",
  qualitat: "quality",
  seguridad: "safety",
  sicherheit: "safety",
  "respeto al medio ambiente": "environment",
  umweltbewusstsein: "environment",
};

export default function ValueIcon({ label }: { label: string }) {
  const normalized = label
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .trim()
    .toLowerCase();
  return (
    <svg
      viewBox="0 0 24 24"
      width="30"
      height="30"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {drawings[names[normalized]] || (
        <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z" />
      )}
    </svg>
  );
}
