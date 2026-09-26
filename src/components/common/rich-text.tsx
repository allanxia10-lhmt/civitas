import { Fragment } from "react";
import { cn } from "@/lib/utils";

/** Renders `**bold**` spans inside a string. */
export function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}

/** Paragraphs separated by blank lines, with inline bold. */
export function RichText({ text, className }: { text: string; className?: string }) {
  return (
    <div className={cn("prose-lesson text-[15px]", className)}>
      {text.split(/\n\n+/).map((p, i) => (
        <p key={i}>
          <InlineText text={p} />
        </p>
      ))}
    </div>
  );
}
