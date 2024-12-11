import styles from '@/app/login/page.module.css'
import LoginForm from '@/app/login/components/form'

export default function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.wrapper}>
        <h1>Login</h1>

        <LoginForm />
      </div>
    </div>
  )
}
