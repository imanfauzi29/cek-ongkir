'use server'

import { loginSchema, LoginSchema } from '@/app/login/components/form-schema'
import bcrypt from 'bcrypt'
import { errorsCode } from '@/lib/utils/errors'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { responseResult } from '@/lib/utils/response'

// const salt = bcrypt.genSaltSync(10)
const db = {
  username: 'admin',
  password: '$2b$10$xdlwFCpmnW/BQo4yhb4jE.xjQswZ0G.PK8YiyHrRvwU8vB.P.qELa', // password123
}
export async function loginAction(fieldValues: LoginSchema) {
  const response = responseResult

  loginSchema.validateSync(fieldValues, { abortEarly: true })
  const { username, password } = fieldValues

  const checkUser = db.username === username
  const checkPassword = await bcrypt.compare(password, db.password)

  if (!checkUser && !checkPassword) {
    response.message = 'Invalid Credential'
    response.error = errorsCode.INVALID_CREDENTIAL.toString()
    response.statusCode = 401
  } else {
    const token = jwt.sign(
      { username },
      process.env.SECRET_KEY || 'lk2sfEXoC1',
      { expiresIn: '1h' },
    )

    const cookieStore = await cookies()
    cookieStore.set('token', token, {
      httpOnly: true,
      path: '/',
      secure: true,
    })

    response.statusCode = 200
    response.message = 'Login success'
    response.data = { token }
  }

  return response
}
