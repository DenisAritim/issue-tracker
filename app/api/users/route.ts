import authOptions from "@/app/auth/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    const users = await prisma.user.findMany({ orderBy: { name: "asc" } });
    return NextResponse.json(users);
}
