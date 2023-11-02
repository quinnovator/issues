"use client";

import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  issueId: z.string().uuid(),
  body: z
    .string()
    .min(2, {
      message: "Comment must be at least 2 characters.",
    })
    .max(2000, {
      message: "Comment must be less than 2000 characters.",
    })
    .regex(/^(?!\s*$).+/, {
      message: "Comment must not be empty.",
    })
    .regex(/^[a-zA-Z0-9\s.,!?]*$/, {
      message: "Comment contains invalid characters.",
    }),
});

export default function AddComment({ issueId }: { issueId: string }) {
  const router = useRouter();
  const mutation = api.issue.createIssueComment.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      issueId,
      body: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values, {
      onSuccess: () => {
        form.resetField("body");
        router.refresh();
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea
                  className="bg-white"
                  placeholder="Add a comment..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
