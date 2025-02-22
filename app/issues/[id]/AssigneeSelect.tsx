"use client";
import { User } from "@prisma/client";
import { Avatar, Button, Flex, Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AssigneeSelect = () => {
    const {
        data: users,
        error,
        isLoading,
    } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: () => axios.get("/api/users").then((res) => res.data),
        staleTime: 60 * 60 * 1000, //1hr
        retry: 3,
    });

    if (isLoading) return <Button loading />;

    if (error) return null;

    return (
        <Select.Root>
            <Select.Trigger placeholder="Assign..." />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {users?.map((user) => (
                        <Select.Item key={user.id} value={user.id}>
                            <Flex align="center" gapX="2">
                                <Avatar
                                    size="1"
                                    radius="full"
                                    src={user!.image!}
                                    fallback="?"
                                    referrerPolicy="no-referrer"
                                />
                                {user.name}
                            </Flex>
                        </Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default AssigneeSelect;
