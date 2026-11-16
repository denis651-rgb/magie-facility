import { buildWhatsAppUrl } from '../../lib/whatsapp'

type Props = { phone: string; message: string; label?: string }
export function WhatsAppButton({ phone, message, label = 'Solicitar cotización' }: Props) {
  const href = buildWhatsAppUrl(phone, message)
  return <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
}
