import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import IssueFormWrapper from "../../_components/IssueFormWrapper";

interface Props {
    params: Promise<{ id: string }>;
}

const EditIssuePage = async ({ params }: Props) => {
    const { id: idString } = await params;
    const id = parseInt(idString);

    if (isNaN(id)) notFound();

    const issue = await prisma.issue.findUnique({
        where: { id },
    });

    if (!issue) notFound();

    return <IssueFormWrapper issue={issue} />;
};

export async function generateMetadata({ params }: Props) {
    const idString = (await params).id;
    const id = parseInt(idString);

    const issue = await prisma.issue.findUnique({ where: { id } });

    return {
        title: "Issue Tracker - Update Issue " + issue?.id,
        description: `Update the details of the issue titled "${issue?.title}" and modify its status.`,
    };
}

export default EditIssuePage;
