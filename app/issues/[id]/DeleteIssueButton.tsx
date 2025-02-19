"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RxTrash } from "react-icons/rx";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    const router = useRouter();
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color="red">
                    <RxTrash />
                    Delete Issue
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                <AlertDialog.Description>
                    Are you sure to want to delete this issue? The action cannot be
                    undone.
                </AlertDialog.Description>
                <Flex gap="3" justify="end" mt="4" mr="6">
                    <AlertDialog.Cancel>
                        <Button color="gray" variant="soft">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button
                            color="red"
                            onClick={async () => {
                                await axios.delete("/api/issues/" + issueId);
                                router.push("/issues");
                            }}
                        >
                            Delete Issue
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
};

export default DeleteIssueButton;
