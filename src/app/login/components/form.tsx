'use client'

import { useState } from 'react'
import InputForm from '@/components/forms/input-form'
import styles from '@/app/login/page.module.css'
import { LuEye, LuEyeClosed } from 'react-icons/lu'
import Button from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { loginSchema, LoginSchema } from '@/app/login/components/form-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginAction } from '@/app/login/actions/login-action'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()

  const form = useForm<LoginSchema>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  })

  const handleSubmit = async (fieldValues: LoginSchema) => {
    setIsLoading(true)

    try {
      const response = await loginAction(fieldValues)

      if (response.statusCode !== 200) {
        throw new Error(response.message || 'Authenticated failed')
      }

      toast.success('Login success, redirecting...')
      router.push('/')
    } catch (err) {
      toast.error(`Login failed: ${(err as Error).message}`)
    }

    setIsLoading(false)
  }

  const togglePassword = () => setShowPassword(!showPassword)
  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className={styles.formWrapper}
    >
      <InputForm
        type='text'
        label='Username'
        placeholder='username'
        {...form.register('username')}
        errors={form.formState.errors}
      />

      <InputForm
        type={showPassword ? 'text' : 'password'}
        label='Password'
        placeholder='insert password'
        {...form.register('password')}
        errors={form.formState.errors}
        rightIcon={
          <button
            type='button'
            className={styles.passwordIcon}
            onClick={togglePassword}
          >
            {!showPassword ? (
              <LuEye title='show' />
            ) : (
              <LuEyeClosed title='hide' />
            )}
          </button>
        }
      />

      <Button type='submit' isLoading={isLoading} style={{ marginTop: '1rem' }}>
        Login
      </Button>
    </form>
  )
}
