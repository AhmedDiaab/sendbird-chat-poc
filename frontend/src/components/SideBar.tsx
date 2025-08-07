import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/users", label: "Users" },
  { path: "/channel-groups", label: "Channel Groups" },
  { path: "/open-channels", label: "Open Channels" },
  { path: "/chat", label: "Chat" },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white p-4 space-y-4">
      <div className="text-xl font-bold">Dashboard</div>
      <nav className="space-y-2">
        {navItems.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `block px-2 py-1 rounded ${
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
  );
}
