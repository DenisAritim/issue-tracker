import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import StatusFilterWrap from "./StatusFilterWrap";

const IssueToolbar = () => {
    return (
        <Flex justify="between">
            <StatusFilterWrap />
            <Button>
                <Link href={"/issues/new"}>New Issue</Link>
            </Button>
        </Flex>
    );
};

export default IssueToolbar;
