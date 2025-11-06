import { NextResponse } from "next/server"

const protectedRoutes = [
    '/tools/bugReport',
    '/tools/codeExplainer',
    '/tools/codeGenerator'
]

const middleware = async (request) => {
    try {
        const accessToken = request.cookies.get('access_token')?.value
        const refreshToken = request.cookies.get('refresh_token')?.value
        const currentPath = request.nextUrl.pathname

        const isProtected = protectedRoutes.some(path =>
            currentPath.startsWith(path)
        )

        if (!accessToken && refreshToken && !currentPath.startsWith('/api/auth/refresh')) {
            return NextResponse.rewrite(new URL('/api/auth/refresh', request.url))
        }

        if (isProtected && !accessToken)
            return NextResponse.redirect(new URL('/auth/login', request.url))

        return NextResponse.next()
    } catch (err) {
        console.log('Middleware error:',err)
        return NextResponse.next()
    }
}

export default middleware

export const config = {
    matcher: ['/tools/bugReport/:path*', '/tools/codeExplainer/:path*', '/tools/codeGenerator/:path*']
}


