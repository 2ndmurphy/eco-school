import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserItem = ({ username, profile }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="avatar rounded-full min-h-10 min-w-10 bg-emerald-600 text-primary font-[700px] flex items-center justify-center">
        <Avatar>
          <AvatarImage src={profile} alt="UserProfile" />
          <AvatarFallback className="text-2xl">
            {username.username?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default UserItem;
