export default function ButtonConnect() {
  return (
    <button className="group relative inline-flex h-14 w-20 items-center justify-center btn-primary hover:w-[22rem] outline-none">
      <span className="inline-flex whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-x-3 group-hover:opacity-100 font-accent ">
        Connect with Metamask
      </span>
      <div className="absolute right-3.5">
        <img src="/metamask.svg" alt="Logo metamask" className="size-12" />
      </div>
    </button>
  );
}
