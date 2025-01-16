import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();
        const hashedPassword = await hash(password, 10);

        // make uuid, set xp to 0
        const response = await sql`
        INSERT INTO users (name, email, password, xp)
        VALUES (${name}, ${email}, ${hashedPassword}, 0)
        `;
    } catch (e) {
        console.log({ e });
    }
    return NextResponse.json({ message: "success"});
}