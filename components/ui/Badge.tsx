import { cn } from '@/lib/utils'
import type { ArtworkStatus } from '@/types'

interface BadgeProps {
  status: ArtworkStatus
  labelAvailable?: string
  labelSold?: string
  labelUnavailable?: string
  className?: string
}

export function StatusBadge({
  status,
  labelAvailable = 'Disponibile',
  labelSold = 'Venduto',
  labelUnavailable = 'Non disponibile',
  className,
}: BadgeProps) {
  const config = {
    available: {
      label: labelAvailable,
      dot: 'bg-emerald-500',
      text: 'text-emerald-700',
    },
    sold: {
      label: labelSold,
      dot: 'bg-warm-gray-400',
      text: 'text-warm-gray-500',
    },
    unavailable: {
      label: labelUnavailable,
      dot: 'bg-warm-gray-300',
      text: 'text-warm-gray-400',
    },
  }

  const { label, dot, text } = config[status]

  return (
    <span className={cn('inline-flex items-center gap-1.5 font-sans text-xs tracking-wide', text, className)}>
      <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', dot)} />
      {label}
    </span>
  )
}
