import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

export function createNFTToastController() {
  const toastId = "nft-progress";

  const start = (initialLabel = "Starting NFT creation...") => {
    toast(
      <div className="flex items-center gap-2">
        <LoaderCircle className="animate-spin text-card" />
        <span>{initialLabel}</span>
      </div>,
      { id: toastId, duration: Infinity }
    );
  };

  // Actualizar label y porcentaje
  const update = (label: string, progress?: number) => {
    toast(
      <div className="flex items-center gap-2">
        <LoaderCircle className="animate-spin text-card" />
        <span>
          {label} {progress !== undefined ? `(${progress}%)` : ""}
        </span>
      </div>,
      { id: toastId, duration: Infinity }
    );
  };

  const success = (message: string) => {
    toast.dismiss(toastId);
    toast.success(message);
  };
  const error = (message: string) => {
    toast.error(message, { id: toastId });
  };

  return { start, update, success, error };
}
