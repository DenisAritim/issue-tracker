import { Status } from "@prisma/client";
import { z } from "zod";

export const issueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
    status: z.enum([Status.OPEN, Status.IN_PROGRESS, Status.CLOSED]).optional(),
});
