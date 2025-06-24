import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useInfiniteListUsers } from "@/hooks/users/useInfiniteListUsers.hook"; // You must create this hook using useInfiniteQuery
import { useRef, useEffect } from "react";

export function UserMultiSelect({
  selected,
  setSelected,
  hiddenIds = [],
}: {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  hiddenIds?: string[]; // You can add an array of excluded user IDs to exclude them from the selection
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteListUsers();

  const allUsers = data?.pages.flatMap((page) => page.users) || [];

  const toggleSelection = (userId: string) => {
    setSelected((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Infinite scroll on bottom reach
  useEffect(() => {
    const div = scrollRef.current;
    if (!div) return;

    const handleScroll = () => {
      if (
        div.scrollTop + div.clientHeight >= div.scrollHeight - 20 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    div.addEventListener("scroll", handleScroll);
    return () => div.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {selected.length > 0
            ? `${selected.length} user(s) selected`
            : "Select Users"}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 max-h-72 overflow-y-auto p-0"
        ref={scrollRef}
      >
        <Command>
          <CommandGroup>
            {allUsers
              .filter((user: any) => !hiddenIds?.includes(user.userId))
              .map((user: any) => {
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
                      onClick={(e) => e.stopPropagation()}
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
