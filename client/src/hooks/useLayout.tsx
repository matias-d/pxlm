import { useEffect, useState } from "react";

interface Props {
  name: string;
}

export default function useLayout({ name }: Props) {
  const [layout, setLayout] = useState<"grid" | "table">(() => {
    const savedLayout = localStorage.getItem(name);
    return savedLayout === "grid" || savedLayout === "table"
      ? savedLayout
      : "grid";
  });

  useEffect(() => {
    localStorage.setItem(name, layout);
  }, [layout]);

  const onLayout = (layout: "grid" | "table") => setLayout(layout);

  return {
    onLayout,
    layout,
  };
}
