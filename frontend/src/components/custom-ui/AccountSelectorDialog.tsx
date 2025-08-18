import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

type Account = {
  userId: string;
  nickname: string;
};

interface AccountSelectorProps {
  accounts: Account[];
  onSelect: (account: Account) => void;
}

export default function AccountSelectorDialog({
  accounts,
  onSelect,
}: AccountSelectorProps) {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("selectedAccount");
    if (stored) {
      const parsed = JSON.parse(stored);
      setSelectedAccount(parsed);
      onSelect(parsed);
    } else {
      setOpen(true); // Open dialog if no stored account
    }
  }, [onSelect]);

  const handleSelect = (account: Account) => {
    setOpen(false);
    localStorage.setItem("selectedAccount", JSON.stringify(account));
    setSelectedAccount(account);
    onSelect(account);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer">Manage Account</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select an Account</DialogTitle>
        </DialogHeader>

        {accounts.length > 0 ? (
          <ul className="space-y-2 mt-4">
            {accounts.map((acc: any) => (
              <li key={acc.userId}>
                <Button
                  onClick={() => handleSelect(acc)}
                  className={`w-full text-left px-4 py-2 rounded border transition hover:bg-blue-50 ${
                    selectedAccount?.userId === acc.userId
                      ? "bg-gray-100 font-medium text-black"
                      : "bg-white-100 text-black"
                  }`}
                >
                  {selectedAccount?.userId === acc.userId && ">>"}{" "}
                  {acc.nickname}{" "}
                  {selectedAccount?.userId === acc.userId && "<<"}
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm mt-4">No accounts available to select.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
