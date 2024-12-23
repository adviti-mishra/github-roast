import { NextResponse } from "next/server"

export async function GET(req) {
    const user = req.nextUrl.searchParams.get("q")
    if(!user) {
        return NextResponse.json({items: []}, { status: 400 })
    }
    const headers = new Headers({
        "Authorization": `Bearer ${process.env.GIT_API_KEY}`
    })
    const res = await fetch(`https://api.github.com/search/users?q=${user}`, {
        headers: headers
    })
    const json = await res.json()

    return NextResponse.json(json, { status: 200 })
}