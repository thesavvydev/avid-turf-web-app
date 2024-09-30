"use client";
import { ConfirmModal } from "@/components/confirm-modal";
import initialFormState, {
  TInitialFormState,
} from "@/constants/initial-form-state";
import { useUserContext } from "@/contexts/user";
import { createClient } from "@/utils/supabase/client";
import { Avatar, Button, Card, Spinner, Textarea } from "flowbite-react";
import { SendIcon, Trash2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { twMerge } from "tailwind-merge";
import { CreateJobMessage, DeleteJobMessage } from "./actions";
import { IJobMessage } from "./types";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type TJobMessages = {
  messages: IJobMessage[] | null;
};

function SendMessageButton() {
  const { pending } = useFormStatus();

  return (
    <div className="absolute right-2 top-2 opacity-0 group-focus-within:opacity-100">
      <Button
        disabled={pending}
        size="xs"
        tabIndex={1}
        color="light"
        type="submit"
      >
        {pending ? (
          <Spinner size="sm" />
        ) : (
          <SendIcon className="size-5 text-gray-400" />
        )}
      </Button>
    </div>
  );
}

export default function JobMessagesCard({ messages }: TJobMessages) {
  const supabase = createClient();
  const router = useRouter();
  const { businessId, locationId, jobId } = useParams();
  const { user } = useUserContext();
  const [, action] = useFormState(
    CreateJobMessage<TInitialFormState>,
    initialFormState,
  );

  const ref = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const channel = supabase
      .channel("job_message_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "business_location_job_messages",
          filter: `job_id=eq.${jobId}`,
        },
        () => {
          router.refresh();
          if (textareaRef.current) {
            textareaRef.current.value = "";
          }
        },
      )
      .subscribe();

    if (ref.current) ref.current?.scrollTo(0, ref.current.scrollHeight);

    return () => {
      channel.unsubscribe();
    };
  }, [jobId, router, textareaRef, ref, supabase]);

  return (
    <Card>
      <h6 className="text-lg font-semibold tracking-tighter">Messages</h6>
      <div
        className="flex h-full max-h-80 flex-col-reverse gap-2 overflow-y-auto lg:gap-4"
        ref={ref}
      >
        {messages?.map((message) => {
          const isAuthor = user.id === message.author_id;

          return (
            <div
              className={twMerge(
                isAuthor ? "items-end justify-end" : "items-start",
                "group flex gap-2",
              )}
              id={`message-${message.id}`}
              key={message.id}
            >
              {isAuthor ? null : <Avatar size="sm" rounded />}
              <div className="flex w-[65%] flex-col gap-1">
                <p
                  className={twMerge(
                    isAuthor ? "text-right" : "",
                    "text-xs text-gray-400",
                  )}
                >
                  {message.author
                    ? `${message.author.full_name}, ${dayjs(message.created_at).fromNow()} `
                    : "posted seconds ago"}
                </p>
                <p
                  className={twMerge(
                    isAuthor
                      ? "from-blue-500 to-blue-600 text-blue-100"
                      : "from-gray-100 to-gray-200 dark:bg-gray-800 dark:from-gray-700 dark:to-gray-800",
                    "relative w-full rounded bg-gradient-to-tr text-sm lg:p-3",
                  )}
                >
                  {message.message}
                  {isAuthor && (
                    <button
                      aria-label="Delete"
                      className="absolute right-2 top-2 hidden cursor-pointer rounded bg-white/30 p-1 hover:bg-white group-hover:block dark:bg-gray-800/30 dark:hover:bg-gray-800"
                    >
                      <ConfirmModal
                        description={`Are you sure you want to remove this message?`}
                        onConfirmClick={async () => {
                          await DeleteJobMessage(message.id);
                          router.refresh();
                        }}
                        trigger={(toggle) => (
                          <span onClick={toggle}>
                            <Trash2Icon className="size-4 text-red-500 dark:text-red-600" />
                          </span>
                        )}
                      />
                    </button>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <form action={action} className="group relative">
        <input name="business_id" value={businessId} type="hidden" />
        <input name="location_id" value={locationId} type="hidden" />
        <input name="job_id" value={jobId} type="hidden" />
        <input name="author_id" value={user.id} type="hidden" />
        <Textarea
          ref={textareaRef}
          rows={3}
          className="resize-none rounded-sm pr-14"
          tabIndex={0}
          name="message"
        />
        <SendMessageButton />
      </form>
    </Card>
  );
}
