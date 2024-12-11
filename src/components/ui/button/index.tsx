import React from 'react'
import styles from './styles.module.css'
import { cn } from '@/lib/utils/cn'
import { ImSpinner2 } from 'react-icons/im'

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { isLoading?: boolean }
>(({ className, children, isLoading, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(styles.button, className)}
    disabled={isLoading || props.disabled}
    {...props}
  >
    {isLoading && <ImSpinner2 className='animate-spin' />}
    {children}
  </button>
))

Button.displayName = 'Button'
export default Button
