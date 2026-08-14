export function formatKES(n: number): string {
  return `KES ${new Intl.NumberFormat("en-KE", {
    maximumFractionDigits: 0,
  }).format(n)}`;
}

export function waLink(phone: string, text: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export const WHATSAPP_PHONE = "254717043408";