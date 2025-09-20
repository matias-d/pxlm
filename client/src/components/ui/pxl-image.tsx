import { cn } from "../../lib/cn";

interface Props {
  className?: string;
  src: string;
  alt: string;
}

export default function PXLImage({ alt, src, className }: Props) {
  return (
    <div className="group relative inline-flex overflow-hidden">
      <img
        src={src}
        alt={alt}
        className={cn(" object-cover rounded-md shadow", className)}
      />
      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
        <div className="relative h-full w-8 bg-white/20"></div>
      </div>
    </div>
  );
}
