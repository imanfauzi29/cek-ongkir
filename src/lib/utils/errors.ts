export const errorsCode = {
  INVALID_CREDENTIAL: 401,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
}

export type ErrorCode = keyof typeof errorsCode
