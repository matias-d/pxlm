import { toast } from "sonner";

export function copyItemUrl(url: string) {
  if (!navigator.clipboard) {
    const textarea = document.createElement("textarea");
    textarea.value = url;
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    document.body.removeChild(textarea);
    return;
  }

  navigator.clipboard
    .writeText(url)
    .then(() => toast?.success("URL copied!", { duration: 1300 }))
    .catch(() => toast?.error("Failed to copy URL"));
}
