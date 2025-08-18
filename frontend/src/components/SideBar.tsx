import { NavLink } from "react-router-dom";
import AccountSelectorDialog from "./custom-ui/AccountSelectorDialog"; // updated import
import { useListUsers } from "@/hooks/users/useListUsers.hook";
import { useChatStore } from "@/store/chatStore";

const navItems = [
  { path: "/users", label: "Users" },
  { path: "/channel-groups", label: "Channel Groups" },
  { path: "/open-channels", label: "Open Channels" },
  { path: "/chat", label: "Chat" },
  { path: "/open-chat", label: "Open Chat" },
];

export default function Sidebar() {
  const { data } = useListUsers({ token: null });
  const setCurrentUser = useChatStore((s) => s.setCurrentUser);

  const handleAccountChange = (user: any) => {
    if (!data?.users?.length) return;
    setCurrentUser(
      data.users.find((a: any) => a.userId === user.userId) || null
    );
  };

  return (
    <div className="w-64 bg-gray-900 text-white p-4 space-y-4 h-screen flex flex-col justify-between">
      <div className="p-4">
        <div className="text-xl font-bold border-b border-gray-700 mb-4">Dashboard</div>

        <nav className="space-y-2">
          {navItems.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `block py-1 rounded ${
                  isActive
                    ? "bg-primary text-white font-semibold"
                    : "text-gray-300 hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mb-8 border-t border-gray-700">
        <AccountSelectorDialog
          accounts={data?.users || []}
          onSelect={handleAccountChange}
        />
      </div>
    </div>
  );
}
