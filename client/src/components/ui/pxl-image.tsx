import { cn } from "../../lib/cn";

interface Props {
  classNameContainer?: string;
  className?: string;
  src: string;
  alt: string;
}

export default function PXLImage({
  alt,
  src,
  className,
  classNameContainer,
}: Props) {
  return (
    <div
      className={cn(
        "group relative inline-flex overflow-hidden rounded-md ",
        classNameContainer
      )}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn(" object-cover shadow w-full", className)}
      />
      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
        <div className="relative h-full w-8 bg-white/20"></div>
      </div>
    </div>
  );
}
