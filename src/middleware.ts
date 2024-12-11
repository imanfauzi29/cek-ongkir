import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  const pathname = request.nextUrl.pathname

  if (token === undefined && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (request.nextUrl.pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (pathname !== '/login' && token?.value) {
    const verify = jwt.verify(token.value, process.env.SECRET_KEY as string)
    if (!verify) {
      request.cookies.delete('token')
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login'],
}