import { cn } from '@/lib/utils'
import { forwardRef, type TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, rows = 4, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block label-caps mb-2">{label}</label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={cn('textarea-field', error && 'border-red-400', className)}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-red-500 font-sans">{error}</p>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'
