import React from 'react'
import Label from '@/components/ui/label'
import Input from '@/components/ui/input'
import styles from './styles.module.css'
import { cn } from '@/lib/utils/cn'
import { FieldErrors } from 'react-hook-form'

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  rightIcon?: React.ReactNode
  errors?: FieldErrors
}
export default function InputForm({
  label,
  rightIcon,
  errors,
  ...props
}: InputFormProps) {
  return (
    <div>
      <Label htmlFor={props.name}>{label}</Label>
      <div className='relative'>
        <Input name={props.name} id={props.name} {...props} />
        {rightIcon && <div className={cn(styles.icon)}>{rightIcon}</div>}
      </div>
      {errors && (
        <p className={styles.errorText}>
          {errors[props.name as string]?.message as string}
        </p>
      )}
    </div>
  )
}
