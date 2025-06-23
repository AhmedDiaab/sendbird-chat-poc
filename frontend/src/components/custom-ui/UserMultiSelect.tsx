import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useListUsers } from "@/hooks/users/useListUsers.hook";

export function UserMultiSelect({
  selected,
  setSelected,
}: {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const { data } = useListUsers({ token: null });

  const toggleSelection = (userId: string) => {
    setSelected((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {selected.length > 0
            ? `${selected.length} user(s) selected`
            : "Select Users"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command>
          <CommandGroup>
            {data?.users?.map((user: any) => {
              const isChecked = selected.includes(user.userId);
              return (
                <CommandItem
                  key={user.userId}
                  onSelect={() => toggleSelection(user.userId)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={() => toggleSelection(user.userId)}
                    onClick={(e) => e.stopPropagation()} // prevent double toggle
                  />
                  <span>{user.nickname || "Unnamed User"}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
