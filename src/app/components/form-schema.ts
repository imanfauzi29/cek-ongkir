import * as yup from 'yup'

export const checkPriceSchema = yup.object().shape({
  origin: yup.string().required(),
  destination: yup.string().required(),
  weight: yup.number().required(),
  courier: yup.string().oneOf(['jne', 'pos', 'tiki']).required(),
})

export type CheckPriceSchemaType = yup.InferType<typeof checkPriceSchema>
