import { issueSchema } from "@/app/validationSchemas";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });

    const { id: idString } = await params;
    const id = parseInt(idString);

    if (isNaN(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const issue = await prisma.issue.findUnique({
        where: { id },
    });

    if (!issue) return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

    const updatedIssue = await prisma.issue.update({
        where: { id },
        data: { title: body.title, description: body.description, status: body.status },
    });

    return NextResponse.json(updatedIssue);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
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
