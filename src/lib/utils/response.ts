type ResponseResult = {
  message: string | null
  error: string | null
  statusCode: number
  data: unknown
}

export const responseResult: ResponseResult = {
  message: null,
  error: null,
  statusCode: 500,
  data: null,
}
