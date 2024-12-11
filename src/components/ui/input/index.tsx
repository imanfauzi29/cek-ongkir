import React from 'react'
import { cn } from '@/lib/utils/cn'
import styles from './styles.module.css'

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { rightIcon?: React.ReactNode }
>(({ className, rightIcon, ...rest }, ref) => (
  <div className={styles.formItem}>
    <input
      ref={ref}
      className={cn(styles.formField, className)}
      style={{ paddingRight: rightIcon ? '2.5rem' : 'auto' }}
      {...rest}
    />
    {rightIcon && <div className={styles.rightIcon}>{rightIcon}</div>}
  </div>
))

Input.displayName = 'Input'

export default Input
