import authOptions from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchemas";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    const body = await request.json();
    const validation = patchIssueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });

    const { id: idString } = await params;
    const id = parseInt(idString);

    if (isNaN(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const { assignedToUserId, title, description, status } = body;

    if (assignedToUserId) {
        const user = await prisma.user.findUnique({
            where: { id: assignedToUserId },
        });
        if (!user)
            return NextResponse.json({ error: "Invalid user." }, { status: 400 });
    }

    const issue = await prisma.issue.findUnique({
        where: { id },
    });

    if (!issue) return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

    const updatedIssue = await prisma.issue.update({
        where: { id },
        data: {
            title,
            description,
            status,
            assignedToUserId,
        },
    });

    return NextResponse.json(updatedIssue);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    const { id: idString } = await params;
    const id = parseInt(idString);

    if (isNaN(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const issue = await prisma.issue.findUnique({
        where: { id },
    });

    if (!issue) return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

    await prisma.issue.delete({ where: { id } });

    return NextResponse.json({});
}
