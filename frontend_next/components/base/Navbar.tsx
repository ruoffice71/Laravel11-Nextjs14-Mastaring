import { BellIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import SearchInput from "./SearchInput";
import ProfileMenu from "./ProfileMenu";
import MobileSidebar from "./MobileSidebar";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-2 border-b">
      <MobileSidebar/>
      <Image src="/logo.svg" width={120} height={120} alt="logo" />
      <SearchInput/>
      <div className="flex space-x-2 items-center">
        <Button size="icon" variant="secondary" className="rounded-lg">
          <BellIcon className="w-5 h-5" />
        </Button>
        <ProfileMenu/>
      </div>
    </nav>
  );
}
