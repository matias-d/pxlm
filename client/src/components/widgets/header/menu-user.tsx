import { MenuButton, MenuItem, MenuItems, Menu } from "@headlessui/react";
import { CircleUserRound, Group, RotateCcw, WalletMinimal } from "lucide-react";
import { shortenAddress } from "@/utils/shorten-address";
import useMarketplace from "@/hooks/useMarketplace";
import AvatarUI from "@/components/ui/avatar-ui";
import Card from "@/components/ui/card";
import { Link } from "react-router";

export default function MenuUser() {
  const { account, getAccount } = useMarketplace();

  return (
    <Menu>
      <MenuButton className="cursor-pointer hover:opacity-80 transition-opacity">
        <AvatarUI username={account?.address} />
      </MenuButton>
      <MenuItems
        modal={false}
        transition
        anchor="bottom end"
        className="mt-2 z-20 transition duration-100 ease-out focus:outline-none data-closed:scale-95 data-closed:opacity-0"
      >
        <div></div>
        <Card className="p-0 pt-1  h-[8.8rem] flex flex-col overflow-hidden">
          <MenuItem>
            <p className="px-4 py-2  text-xs text-accent-fifthy flex items-center gap-x-1">
              <CircleUserRound size={16} />
              {account?.address && shortenAddress(account?.address)}
            </p>
          </MenuItem>
          <MenuItem>
            <p className="px-4 py-2   text-xs text-text-primary/60 flex items-center gap-x-1">
              <WalletMinimal size={16} />
              {account?.balance && account.balance} TBNB
            </p>
          </MenuItem>

          <hr className="w-full border-border mt-1" />
          <MenuItem>
            <Link
              className="  text-xs text-accent flex items-center gap-x-1 transition-colors px-4 py-2 hover:bg-card-super-light transiton-all "
              to="/marketplace/collection"
            >
              <Group size={16} />
              Collection
            </Link>
          </MenuItem>
          <MenuItem>
            <button
              onClick={getAccount}
              className="cursor-pointer text-xs text-accent-firthy flex items-center gap-x-1 transition-colors px-4 py-2 hover:bg-card-super-light transiton-all "
            >
              <RotateCcw size={16} />
              Reload Account
            </button>
          </MenuItem>
        </Card>
      </MenuItems>
    </Menu>
  );
}
