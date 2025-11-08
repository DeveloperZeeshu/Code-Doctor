import { NextResponse } from "next/server"

const protectedRoutes = [
    '/tools/bugReport',
    '/tools/codeExplainer',
    '/tools/codeGenerator'
]

const proxy = async (request) => {
    try {
        const refreshToken = request.cookies.get('refresh_token')?.value
        const currentPath = request.nextUrl.pathname

        const isProtected = protectedRoutes.some(path =>
            currentPath.startsWith(path)
        )

        if (isProtected && !refreshToken)
            return NextResponse.redirect(new URL('/auth/login', request.url))

        return NextResponse.next()
    } catch (err) {
        console.log('Middleware error:', err)
        return NextResponse.next()
    }
}

export default proxy

export const config = {
    matcher: [
        '/tools/bugReport/:path*',
        '/tools/codeExplainer/:path*',
        '/tools/codeGenerator/:path*'
    ]
}


