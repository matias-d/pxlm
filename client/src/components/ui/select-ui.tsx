import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useDisableScroll } from "@/hooks/useDisabelScroll";
import { ChevronRight, Dot } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

interface Fields {
  id: number;
  label: string;
  value: string;
}

interface Props {
  fields: Fields[];
  placeholder?: string;
  className?: string;
  onSelect: (select: string) => void;
}

export default function SelectUI({
  fields,
  placeholder,
  className,
  onSelect,
}: Props) {
  useDisableScroll(false);

  const [selected, setSelected] = useState<Fields | undefined>(
    placeholder ? undefined : fields[0]
  );

  return (
    <div className={cn("space-y-2 relative", className)}>
      <Listbox
        value={selected}
        onChange={(field: Fields) => {
          setSelected(field);
          onSelect(field.value);
        }}
      >
        {({ open }) => (
          <>
            <ListboxButton className="cursor-pointer font-display flex items-center justify-between  lg:min-w-56 min-w-auto w-72 md:w-auto text-text-secondary hover:text-text-primary lg:px-4 px-3 h-14 lg:gap-x-12 bg-card-light rounded-md border-2 border-border outline-none hover:border-accent-primary/50 transition-colors text-sm lg:text-base">
              {selected?.label || placeholder}
              <ChevronRight
                className={cn(
                  "size-5 transition-transform duration-300 text-accent-primary",
                  open && "rotate-90"
                )}
                aria-hidden="true"
              />
            </ListboxButton>

            <ListboxOptions
              modal={false}
              className="outline-none absolute top-full left-0 right-0 bg-card-light overflow-hidden rounded-md lg:mt-1 border border-border shadow-lg z-50"
            >
              {fields.map((option) => (
                <ListboxOption
                  key={option.id}
                  value={option}
                  className="font-primary text-text-secondary cursor-pointer group"
                >
                  {({ selected }) => (
                    <div
                      className={cn(
                        "h-10 lg:h-12 px-2 lg:px-4 text-xs lg:text-base flex items-center justify-between group-hover:bg-card-super-light transition-colors",
                        selected && "bg-card-super-light text-accent-primary"
                      )}
                    >
                      <span className={cn(selected && "font-medium")}>
                        {option.label}
                      </span>
                      <Dot
                        size={28}
                        className={cn(
                          "text-accent-primary",
                          !selected &&
                            "opacity-0 group-hover:opacity-50 transition-opacity",
                          selected && "opacity-100"
                        )}
                      />
                    </div>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </>
        )}
      </Listbox>
    </div>
  );
}
