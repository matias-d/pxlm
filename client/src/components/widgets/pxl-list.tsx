import PxlCard from "../ui/pxl-card";

const pxlItems = [1, 2, 3, 5];

export default function PxlList() {
  return (
    <section className="grid grid-cols-4 gap-4">
      {pxlItems.map((pxl) => (
        <PxlCard key={pxl} />
      ))}
    </section>
  );
}
