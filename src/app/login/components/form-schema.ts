import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  username: yup.string().min(4).required(),
  password: yup.string().min(8).required(),
})

export type LoginSchema = yup.InferType<typeof loginSchema>
