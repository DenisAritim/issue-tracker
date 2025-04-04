import ErrorMessage from "@/app/components/ErrorMessage";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import { z } from "zod";
import StatusSelect from "./StatusSelect";
import dynamic from "next/dynamic";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });
type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
    const router = useRouter();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema),
    });

    const [error, setError] = useState("");
    const [isSubmitting, setSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            console.log(data);

            if (issue) await axios.patch("/api/issues/" + issue.id, data);
            else await axios.post("/api/issues", data);
            router.push("/issues");
        } catch {
            setSubmitting(false);
            setError("An unexpected error occurred");
        }
    });

    return (
        <div className="max-w-xl w-full">
            {error && (
                <Callout.Root color="red" className="mb-5">
                    <Callout.Icon>
                        <MdErrorOutline />
                    </Callout.Icon>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            <form className="space-y-5 w-full" onSubmit={onSubmit}>
                <div className="flex gap-3 justify-between w-full">
                    <div className="me-auto w-full">
                        <TextField.Root
                            defaultValue={issue?.title}
                            placeholder="Title"
                            {...register("title")}
                        />
                    </div>
                    {issue && (
                        <div className="ms-auto">
                            <Controller
                                name="status"
                                control={control}
                                defaultValue={issue.status}
                                render={({ field }) => (
                                    <StatusSelect {...field} value={field.value!} />
                                )}
                            />
                        </div>
                    )}
                </div>

                <ErrorMessage>{errors.title?.message}</ErrorMessage>

                <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => (
                        <SimpleMDE placeholder="Description" {...field} />
                    )}
                />

                <ErrorMessage>{errors.description?.message}</ErrorMessage>

                <Button loading={isSubmitting} className="w-full">
                    {issue ? "Edit Issue" : "Submit New Issue"}
                </Button>
            </form>
        </div>
    );
};

export default IssueForm;
