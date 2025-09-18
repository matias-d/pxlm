import { LoaderCircle } from "lucide-react";
import { cn } from "../../lib/cn";

interface Props {
  loading: boolean;
  onLoading: () => void;
}

export default function ButtonConnect({ loading, onLoading }: Props) {
  return (
    <button
      onClick={onLoading}
      disabled={loading}
      className={cn(
        "btn relative inline-flex h-14 w-[4.7rem] items-center justify-center btn-primary outline-none",
        !loading && "group hover:w-[22rem] cursor-pointer",
        loading && "pointer-events-none cursor-default"
      )}
    >
      <span
        className={cn(
          "inline-flex whitespace-nowrap opacity-0 transition-all duration-200 font-accent",
          !loading && "group-hover:-translate-x-3 group-hover:opacity-100"
        )}
      >
        Connect with Metamask
      </span>

      <div className={cn("absolute right-3.5", loading && "right-5.5")}>
        {loading ? (
          <LoaderCircle className="size-8 animate-spin text-center" />
        ) : (
          <img src="/metamask.svg" alt="Logo metamask" className="size-12" />
        )}
      </div>
    </button>
  );
}
