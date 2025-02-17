import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { RxPencil2 } from "react-icons/rx";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
    return (
        <Link href={`/issues/${issueId}/edit`}>
            <Button>
                <RxPencil2 />
                Edit Issue
            </Button>
        </Link>
    );
};

export default EditIssueButton;
