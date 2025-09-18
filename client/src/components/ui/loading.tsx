import { LoaderCircle } from "lucide-react";

interface Props {
  src?: string;
  label: string;
  withIcon?: boolean;
}

export default function Loading({ label, src, withIcon }: Props) {
  return (
    <section className="flex flex-col items-center justify-center gap-y-2 mt-16">
      {withIcon ? (
        <LoaderCircle className="animate-spin  size-8 text-text-secondary" />
      ) : (
        <img src={src} className="size-18 animate-spin dela opacity-50" />
      )}

      <p className="relative  text-text-secondary after:content-[''] after:absolute after:ml-1 after:animate-dots ">
        {label}
      </p>
    </section>
  );
}
