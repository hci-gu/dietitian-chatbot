import { NextRequest, NextResponse } from 'next/server'

export const config = {}

export function middleware(req: NextRequest) {
  return NextResponse.next()
}
// export function middleware(req: NextRequest) {
//   const basicAuth = req.headers.get('authorization')
//   const url = req.nextUrl

//   if (basicAuth) {
//     const authValue = basicAuth.split(' ')[1]
//     const [user, pwd] = atob(authValue).split(':')

//     const validUser = process.env.BASIC_AUTH_USER
//     const validPassWord = process.env.BASIC_AUTH_PASSWORD

//     if (user === validUser && pwd === validPassWord) {
//       return NextResponse.next()
//     }
//   }
//   url.pathname = '/api/basicauth'

//   return NextResponse.rewrite(url)
// }
