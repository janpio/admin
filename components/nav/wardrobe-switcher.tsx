"use client";

import { useWardrobeModal } from "@/hooks/use-wardrobe-modal";
import { Wardrobe } from "@prisma/client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Crown as WardrobeIcon,
} from "lucide-react";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface WardrobeSwitcherProps extends PopoverTriggerProps {
  items: Wardrobe[];
}

const WardrobeSwitcher = ({ items: wardrobes }: WardrobeSwitcherProps) => {
  const { onOpen } = useWardrobeModal();
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const formattedWardrobes = wardrobes.map(wardrobe => ({
    label: wardrobe.name,
    value: wardrobe.id,
  }));

  const currentWardrobe = formattedWardrobes.find(
    item => item.value === params.wardrobeId
  );

  const onWardrobeChange = (wardrobe: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${wardrobe.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size="sm"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-owns="wardrobe-switcher"
          aria-controls="wardrobe-switcher"
          aria-label="Wardrobe Switcher"
          className={cn("w-[200px] justify-between")}
        >
          <WardrobeIcon size={16} className="mr-2" />
          <span className="truncate">{currentWardrobe?.label}</span>
          <ChevronsUpDown
            size={16}
            className="ml-auto h-4 w-4 shrink-0 opacity-60"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search Wardrobes" />
            <CommandEmpty>No Wardrobes Found</CommandEmpty>
            <CommandGroup heading="Wardrobes">
              {formattedWardrobes.map(wardrobe => (
                <CommandItem
                  key={wardrobe.value}
                  onSelect={() => onWardrobeChange(wardrobe)}
                  className="text-sm"
                >
                  <WardrobeIcon size={16} className="mr-2" />
                  <span className="truncate">{wardrobe.label}</span>
                  {wardrobe.value === params.wardrobeId && (
                    <Check
                      size={16}
                      className="ml-auto h-4 w-4 shrink-0 opacity-60"
                    />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  onOpen();
                }}
              >
                <PlusCircle size={17} className="mr-2" />
                Create new wardrobe
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default WardrobeSwitcher;
