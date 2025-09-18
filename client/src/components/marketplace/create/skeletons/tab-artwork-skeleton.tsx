import Loading from "../../../ui/loading";

export default function TabArtworkSkeleton() {
  return (
    <section className="w-[47.875rem] h-[28.125rem] rounded-md flex items-start gap-x-6 p-6 bg-card mt-2 border border-border">
      <div className="w-[20rem] h-[25rem] bg-card-super-light animate-pulse-smooth rounded-md relative">
        <div className="absolute  -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <Loading withIcon label="Generating PXL" />
        </div>
      </div>
      <div className="w-[21.125rem] h-[25rem] flex flex-col justify-between">
        <div className="bg-card-super-light animate-pulse-smooth w-[13.75rem] h-[2rem] mb-4"></div>
        <div>
          <div className="grid grid-cols-2 gap-3  w-full mb-4 ">
            <div className="max-w-44 rounded-md h-[4.375rem] bg-card-super-light animate-pulse-smooth"></div>
            <div className="max-w-44 rounded-md h-[4.375rem] bg-card-super-light animate-pulse-smooth"></div>
            <div className="max-w-44 rounded-md h-[4.375rem] bg-card-super-light animate-pulse-smooth"></div>
            <div className="max-w-44 rounded-md h-[4.375rem] bg-card-super-light animate-pulse-smooth"></div>
          </div>
          <div className="max-w-full rounded-md h-[4.375rem] bg-card-super-light animate-pulse-smooth"></div>
        </div>
        <div className="flex justify-end">
          <div className="w-[4.25rem] h-[3rem] bg-card-super-light animate-pulse-smooth rounded-md"></div>
        </div>
      </div>
    </section>
  );
}
