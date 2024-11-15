import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserItem = ({ username, email, profile }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="avatar rounded-full min-h-10 min-w-10 bg-emerald-600 text-primary font-[700px] flex items-center justify-center">
        <Avatar>
          <AvatarImage src={profile} alt="UserProfile" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="UserInfo">
        <h1 className="text-[18px] text-primary-foreground font-bold">{username}</h1>
        <p className="text-[12px] text-secondary">{email}</p>
      </div>
    </div>
  );
};

export default UserItem;
