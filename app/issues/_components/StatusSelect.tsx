import { statusMap } from "@/app/components/IssueStatusBadge";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useEffect, useState } from "react";

type StatusSelectProps = {
    value: Status;
    onChange: (value: Status) => void;
    name: string;
};

const StatusSelect = ({ value, onChange }: StatusSelectProps) => {
    const [currentStatus, setCurrentStatus] = useState<Status>(value);

    useEffect(() => {
        setCurrentStatus(value);
    }, [value]);

    const handleStatusChange = (newStatus: string) => {
        const statusValue = newStatus as Status;
        setCurrentStatus(statusValue);
        onChange(statusValue);
    };

    return (
        <Select.Root value={currentStatus} onValueChange={handleStatusChange}>
            <Select.Trigger color={statusMap[currentStatus]?.color} variant="soft" />
            <Select.Content color={statusMap[currentStatus]?.color}>
                <Select.Group>
                    <Select.Label>Status</Select.Label>
                    {Object.entries(statusMap).map(([key, { label }]) => (
                        <Select.Item key={key} value={key}>
                            {label}
                        </Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default StatusSelect;
