import { getSendbird } from "@/lib/sendbird";
import type { OpenChannel } from "@sendbird/chat/openChannel";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function ChatSidebar({}) {
  const [navItems, setNavItems] = useState([]);
  
 // use chatgpt to enhance this
  const sb = getSendbird();

  const openChannelListQueryParams = {};

  const openChannelsQuery = sb!.openChannel.createOpenChannelListQuery(
    openChannelListQueryParams
  );

  if (openChannelsQuery.hasNext) {
    openChannelsQuery.next().then(channels => {
        console.log('once')
        console.log(channels);
    });
  }


  return (
    <div className="w-64 border-3 p-4 space-y-4">
      <div className="text-xl font-bold">Groups</div>
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
