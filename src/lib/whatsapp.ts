/** Construye el enlace público. No envía mensajes ni confirma una cotización. */
export function buildWhatsAppUrl(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, '')
  if (!digits) throw new Error('WhatsApp no configurado')
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}
