import { Status } from "@prisma/client";
import { Card, Flex, Text, Tooltip } from "@radix-ui/themes";
import NextLink from "next/link";

interface Props {
    open: number;
    inProgress: number;
    closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
    const containers: {
        label: string;
        value: number;
        status: Status;
    }[] = [
        { label: "Open Issues", value: open, status: "OPEN" },
        { label: "Issues in Progress", value: inProgress, status: "IN_PROGRESS" },
        { label: "Closed Issues", value: closed, status: "CLOSED" },
    ];

    return (
        <Flex gap="4" justify="center">
            {containers.map((container) => (
                <NextLink
                    key={container.label}
                    href={`/issues?status=${container.status}`}
                    passHref
                >
                    <Tooltip content={"Go to " + container.label.toLowerCase()}>
                        <Card className="hover:bg-[var(--accent-9)] transition  cursor-pointer">
                            <Flex direction="column" gap="2" align="center">
                                <Text className="text-sm font-medium text-center">
                                    {container.label}
                                </Text>
                                <Text size="5" className="font-bold">
                                    {container.value}
                                </Text>
                            </Flex>
                        </Card>
                    </Tooltip>
                </NextLink>
            ))}
        </Flex>
    );
};

export default IssueSummary;
