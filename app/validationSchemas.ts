import { Status } from "@prisma/client";
import { z } from "zod";

export const issueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(65535),
    status: z.enum([Status.OPEN, Status.IN_PROGRESS, Status.CLOSED]).optional(),
});

export const patchIssueSchema = z.object({
    title: z.string().min(1).max(255).optional(),
    description: z.string().min(1).max(65535).optional(),
    status: z.enum([Status.OPEN, Status.IN_PROGRESS, Status.CLOSED]).optional(),
    assignedToUserId: z
        .string()
        .min(1, "AssignedToUserId is required")
        .max(255)
        .optional()
        .nullable(),
});
