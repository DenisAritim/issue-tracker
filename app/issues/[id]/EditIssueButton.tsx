import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { RxPencil2 } from "react-icons/rx";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
    return (
        <Button asChild>
            <Link href={`/issues/${issueId}/edit`}>
                <RxPencil2 />
                Edit Issue
            </Link>
        </Button>
    );
};

export default EditIssueButton;
