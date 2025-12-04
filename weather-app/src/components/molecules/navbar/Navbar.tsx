"use client";

import { Icon } from "../../atom/Icon/Icon";
import { NavbarProps } from "./navbar.type";
import { Text } from "@/src/components/atom/text/Text";

const Navbar = ({
  className = "",
  isLoggedIn = false,
}: NavbarProps) => {

  return (
    <div
      className={`fixed z-50 flex h-16 min-w-full justify-between items-center
        bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm md:h-20 ${className}`}
    >
        <div className="flex items-center gap-2 ml-4 md:ml-8">
          <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-md">
            <Icon name="CloudIcon" size={"24"} weight={"bold"} className="text-white"  />
          </div>
          <Text styledAs="title" className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent font-bold" as="span">
            Weather-Bot
          </Text>
        </div>
        
        <div className="mr-4 md:mr-8">
          {isLoggedIn ? (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-green-50 to-emerald-50 border border-green-200/50 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <Text styledAs="body" as="span" className="text-green-700 font-medium">
                Logged In
              </Text>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-orange-50 to-red-50 border border-orange-200/50 shadow-sm hover:shadow-md transition-all duration-200">
              <Icon name="LockIcon" size={"24"} weight={"regular"} className="text-orange-700" />
              <Text styledAs="body" as="span" className="text-orange-700 font-medium">
                Please Log In
              </Text>
            </div>
          )}
        </div>
    </div>
  );
};

export default Navbar;