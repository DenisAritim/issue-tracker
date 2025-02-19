import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { RxTrash } from "react-icons/rx";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    return (
        <Link href={`/issues/${issueId}/edit`}>
            <Button color="red">
                <RxTrash />
                Delete Issue
            </Button>
        </Link>
    );
};

export default DeleteIssueButton;
