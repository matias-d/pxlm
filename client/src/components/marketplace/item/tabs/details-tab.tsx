import { Container, ExternalLink, Sparkle, Sparkles } from "lucide-react";
import DisclousureUI from "@/components/ui/disclousure-ui";
import type { IAttribute } from "@/interfaces/attributes";
import { formatTimestamp } from "@/utils/formatTimestamp";
import { shortenAddress } from "@/utils/shorten-address";
import TraitCard from "../../create/trait-card";
import type { IPxl } from "@/interfaces/pxl";

interface Props {
  selected: IPxl;
}

const formatBonus = (bonus: IAttribute[]) => {
  const bonusTraits = bonus.filter((t) => t.trait_type === "Bonus");

  const bonusCount = bonusTraits.reduce<Record<string, number>>((acc, curr) => {
    acc[curr.value] = (acc[curr.value] || 0) + 1;
    return acc;
  }, {});

  const formattedBonuses = Object.entries(bonusCount).map(([value, count]) => ({
    trait_type: "Bonus",
    value: count > 1 ? `x${count} ${value} Item` : value,
  }));

  return formattedBonuses;
};

const traitsType = ["Hat", "Beard", "Accesory", "Glasses"];

export default function DetailsTab({ selected }: Props) {
  const traits = selected.attributes.filter((attr) =>
    traitsType.includes(attr.trait_type)
  );

  const bonus = formatBonus(selected.attributes);

  return (
    <section className="space-y-2">
      <DisclousureUI
        title="Traits"
        classNamePanel="mt-5"
        icon={<Sparkle size={12} fill="white" />}
        classNameButton="text-base font-display font-semibold"
      >
        <h3 className="text-sm font-display mb-2">
          TRAITS{" "}
          <span className="text-text-secondary font-semibold">
            {traits.length}
          </span>
        </h3>
        {traits.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 ">
            {traits.map((trait) => (
              <TraitCard
                trait={trait}
                key={trait.trait_type}
                className="p-4 w-auto"
              />
            ))}
          </div>
        ) : (
          <div className="h-[3.563rem] flex items-center justify-center">
            <p className="text-text-secondary">This PXL has no traits.</p>
          </div>
        )}
      </DisclousureUI>
      {bonus.length > 0 && (
        <DisclousureUI
          icon={<Sparkles size={12} fill="white" />}
          title="Bonus"
          classNamePanel="mt-5"
          classNameButton="text-base font-display font-semibold"
        >
          <h3 className="text-sm font-display mb-2">
            BONUS{" "}
            <span className="text-text-secondary font-semibold">
              {bonus.length}
            </span>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {bonus.map((item) => (
              <TraitCard trait={item} key={item.value} className="p-4 w-auto" />
            ))}
          </div>
        </DisclousureUI>
      )}

      <DisclousureUI
        classNamePanel="mt-5"
        title="Blockchain details"
        icon={<Container size={12} />}
        classNameButton="text-base font-display font-semibold"
      >
        <div className="space-y-2.5 text-sm">
          <div className="w-full flex items-center justify-between">
            <p className="font-medium text-gray-400">Contract Address</p>{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://etherscan.io/address/${selected.nftAddress}`}
              className="text-blue-400 font-medium font-display flex items-center gap-x-2 hover:text-blue-500 transition-colors"
            >
              {shortenAddress(selected.nftAddress)} <ExternalLink size={16} />
            </a>
          </div>
          <div className="w-full flex items-center justify-between">
            <p className="font-medium text-gray-400">Token ID</p>{" "}
            <p className="text-text-secondary font-medium font-display">
              {selected.tokenId}
            </p>
          </div>
          <div className="w-full flex items-center justify-between">
            <p className="font-medium text-gray-400">Token Minted</p>{" "}
            <p className="text-text-secondary font-medium font-display">
              {formatTimestamp(selected.minted_at)}
            </p>
          </div>
          <div className="w-full flex items-center justify-between">
            <p className="font-medium text-gray-400">Chain</p>{" "}
            <p className="text-text-secondary font-medium font-display">
              Etherum
            </p>
          </div>
        </div>
      </DisclousureUI>
    </section>
  );
}
