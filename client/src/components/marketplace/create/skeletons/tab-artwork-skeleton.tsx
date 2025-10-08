import Loading from "../../../ui/loading";

export default function TabArtworkSkeleton() {
  return (
    <section className="w-[21.438rem] lg:w-[54.625rem] lg:-[30.625rem] rounded-md flex flex-col lg:flex-row items-start gap-x-6 p-6 bg-card mt-2 border border-border gap-4 ">
      <div className="w-[18.625rem] h-[18.625rem] lg:w-[25rem] lg:h-[27.5rem] bg-card-super-light animate-pulse-smooth rounded-md relative">
        <div className="absolute  -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <Loading withIcon label="Generating PXL" />
        </div>
      </div>
      <div className="w-[21.438rem] lg:w-[25rem] lg:h-[27.5rem] flex flex-col justify-between">
        <div className="bg-card-super-light animate-pulse-smooth w-[13.75rem] h-[2rem] mb-4"></div>
        <div>
          <div className="grid grid-cols-2 gap-2 lg:gap-3 lg:w-full w-[18.625rem] mb-4 ">
            <div className="max-w-[8.906rem] lg:max-w-44 rounded-md h-[4.375rem] bg-card-super-light animate-pulse-smooth"></div>
            <div className="max-w-[8.906rem] lg:max-w-44 rounded-md h-[4.375rem] bg-card-super-light animate-pulse-smooth"></div>
            <div className="max-w-[8.906rem] lg:max-w-44 rounded-md h-[4.375rem] bg-card-super-light animate-pulse-smooth"></div>
            <div className="max-w-[8.906rem] lg:max-w-44 rounded-md h-[4.375rem] bg-card-super-light animate-pulse-smooth"></div>
          </div>
          <div className="w-[18.625rem] lg:max-w-full rounded-md h-[4.375rem] bg-card-super-light animate-pulse-smooth"></div>
        </div>
        <div className="flex justify-end w-[18.625rem] lg:w-full mt-4 lg:mt-0">
          <div className="w-[4.25rem] h-[3rem] bg-card-super-light animate-pulse-smooth rounded-md"></div>
        </div>
      </div>
    </section>
  );
}
