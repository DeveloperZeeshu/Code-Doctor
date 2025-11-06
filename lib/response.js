import { NextResponse } from "next/server"

export const success = (data = '', message = '', status = 200) => {
    return NextResponse.json({ success: true, ...data, message }, { status })
}

export const error = (message, status = 400) => {
    return NextResponse.json({ success: false, message }, { status })
}

