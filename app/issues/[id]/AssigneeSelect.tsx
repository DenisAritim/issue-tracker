"use client";

import { Issue, User } from "@prisma/client";
import { Avatar, Button, Flex, Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { RxCircleBackslash, RxPerson } from "react-icons/rx";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
    const { data: users, error, isLoading } = useUsers();

    if (isLoading) return <Button loading />;

    if (error) return null;

    const assignIssue = (userId: string) => {
        axios
            .patch("/api/issues/" + issue.id, {
                assignedToUserId: userId || null,
            })
            .catch(() => {
                toast.error("Changes could not be saved");
            });
    };

    return (
        <>
            <Select.Root
                defaultValue={issue.assignedToUserId || (null as unknown as string)}
                onValueChange={assignIssue}
            >
                <Select.Trigger placeholder="Assign..." />
                <Select.Content position="popper">
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value={null as unknown as string}>
                            <Flex align="center" gapX="2">
                                <Avatar
                                    size="1"
                                    radius="full"
                                    src=""
                                    fallback={<RxCircleBackslash color="red" />}
                                />
                                Unassigned
                            </Flex>
                        </Select.Item>
                        {users?.map((user) => (
                            <Select.Item key={user.id} value={user.id}>
                                <Flex align="center" gapX="2">
                                    <Avatar
                                        size="1"
                                        radius="full"
                                        src={user!.image!}
                                        fallback={<RxPerson />}
                                        referrerPolicy="no-referrer"
                                    />
                                    {user.name}
                                </Flex>
                            </Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>
    );
};

const useUsers = () =>
    useQuery<User[]>({
        queryKey: ["users"],
        queryFn: () => axios.get("/api/users").then((res) => res.data),
        staleTime: 60 * 60 * 1000, //1hr
        retry: 3,
    });

export default AssigneeSelect;
