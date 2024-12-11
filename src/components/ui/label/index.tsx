import React from 'react'
import { cn } from '@/lib/utils/cn'
import styles from './styles.module.css'

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label ref={ref} className={cn(styles.label, className)} {...props} />
))

Label.displayName = 'Label'

export default Label
