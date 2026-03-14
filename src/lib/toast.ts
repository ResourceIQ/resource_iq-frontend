import { toast as sonnerToast, type ExternalToast } from 'sonner'

const baseStyle: React.CSSProperties = {
  fontSize: '14px',
  padding: '16px 20px',
  borderRadius: 'var(--radius)',
  border: '1px solid var(--border)',
}

const successStyle: React.CSSProperties = {
  ...baseStyle,
  background: 'var(--card)',
  color: 'var(--card-foreground)',
  borderColor: 'var(--primary)',
}

const errorStyle: React.CSSProperties = {
  ...baseStyle,
  background: 'var(--card)',
  color: 'var(--card-foreground)',
  borderColor: 'var(--destructive)',
}

const infoStyle: React.CSSProperties = {
  ...baseStyle,
  background: 'var(--card)',
  color: 'var(--card-foreground)',
}

const warningStyle: React.CSSProperties = {
  ...baseStyle,
  background: 'var(--card)',
  color: 'var(--card-foreground)',
  borderColor: 'oklch(0.75 0.18 55)',
}

export const toast = {
  success(message: string, options?: ExternalToast) {
    return sonnerToast.success(message, { style: successStyle, ...options })
  },
  error(message: string, options?: ExternalToast) {
    return sonnerToast.error(message, { style: errorStyle, ...options })
  },
  info(message: string, options?: ExternalToast) {
    return sonnerToast.info(message, { style: infoStyle, ...options })
  },
  warning(message: string, options?: ExternalToast) {
    return sonnerToast.warning(message, { style: warningStyle, ...options })
  },
  loading(message: string, options?: ExternalToast) {
    return sonnerToast.loading(message, { style: infoStyle, ...options })
  },
  dismiss(toastId?: string | number) {
    return sonnerToast.dismiss(toastId)
  },
}
