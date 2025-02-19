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

export default EditIssuePage;
