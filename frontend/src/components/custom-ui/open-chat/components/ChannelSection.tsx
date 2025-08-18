import { NavLink } from "react-router-dom";

interface ChannelSectionProps {
  channels: { url: string; name: string }[];
}

export default function ChannelSection({ channels }: ChannelSectionProps) {
  return (
    <nav className="space-y-2 overflow-auto">
      {channels.map(({ url, name }) => (
        <NavLink
          key={url}
          to={url}
          className={({ isActive }) =>
            `block px-2 py-1 rounded ${
              isActive
                ? "bg-primary text-white font-semibold"
                : "text-gray-700 hover:bg-gray-200"
            }`
          }
        >
          {name}
        </NavLink>
      ))}
    </nav>
  );
}
