import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  //  we need to configure the protected and the public paths
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/signup' || path==='/veridt'
  // token might be there isliye ? use kiya
  const token = request.cookies.get('token')?.value || ""

  // if we have the token and the path is public then we shouldnt see some pages
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  // if URL is not public and token isnt there
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail'
  ],
}