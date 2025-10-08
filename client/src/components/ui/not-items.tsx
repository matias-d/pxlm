import { cn } from "@/lib/cn";

interface Props {
  message: string;
  classNameText?: string;
  children?: React.ReactNode;
}

export default function NotItems({ message, classNameText, children }: Props) {
  return (
    <section className="flex items-center justify-center flex-col mt-16">
      <img src="/assets/art-error.svg" className="size-20 opacity-50" />
      <h2
        className={cn(
          "text-text-secondary lg:text-lg max-w-xs text-center my-2 font-display",
          classNameText
        )}
      >
        {message}
      </h2>

      {children}
    </section>
  );
}
