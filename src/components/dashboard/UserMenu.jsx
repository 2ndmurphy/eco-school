import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import {
  BellIcon,
  ListFilter,
  User,
  HelpCircle,
  LogOut,
  Settings2,
  Settings,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserMenu = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (res.ok) {
      router.push("/auth/login");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="avatar rounded-full min-h-10 min-w-10 bg-emerald-600 text-primary font-[700px] flex items-center justify-center">
            <Avatar className="cursor-pointer">
              <AvatarImage src="" alt="UserProfile" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute w-32 -right-4 bg-popover">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User />
              <span className="cursor-pointer">Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BellIcon />
              <span className="cursor-pointer">Notification</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              <span className="cursor-pointer">Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <HelpCircle />
              <span className="cursor-help">Help</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut />
              <span onClick={handleLogout} className="cursor-pointer">
                Log out
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserMenu;
