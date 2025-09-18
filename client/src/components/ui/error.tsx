import { Frown } from "lucide-react";

interface Props {
  title: string;
  action: () => React.ReactNode;
}

export default function Error({ title, action }: Props) {
  return (
    <section className="flex flex-col items-center justify-center mt-16 gap-y-3">
      <Frown size={40} className="text-text-secondary" />
      <p className="text-text-secondary text-lg">{title}</p>
      {action()}
    </section>
  );
}
