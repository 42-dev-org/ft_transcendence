import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server';
import { friends } from "./data/friends";
import { user } from "./interface/user";

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const key = searchParams.get("key");
    if (key)
        return NextResponse.json((friends.filter((friend: user) => friend.username.startsWith(key))));
    return NextResponse.json(friends);
    // return NextResponse.json({key})
}