import { cn } from "../../lib/cn";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  label?: string;
}

export default function Textarea({ className, label, ...props }: Props) {
  return (
    <label>
      {label && (
        <span className="text-sm text-text-secondary  mb-1 block font-display">
          {label}
        </span>
      )}
      <textarea
        {...props}
        className={cn(
          "bg-card-super-light px-4 py-3 resize-noneh h-24  w-full rounded-md border-2 border-border text-text-primary  disabled:text-text-secondary hover:shadow focus:shadow outline-none  focus:border-accent",
          className
        )}
      />
    </label>
  );
}
