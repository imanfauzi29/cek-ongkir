import { NextRequest, NextResponse } from 'next/server'
import { jwtDecode } from 'jwt-decode'

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
    const decoded = jwtDecode(token.value)

    const currentTime = Math.floor(Date.now() / 1000)
    const expirationTime = decoded.exp as number

    if (expirationTime < currentTime) {
      request.cookies.delete('token')
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login'],
}
